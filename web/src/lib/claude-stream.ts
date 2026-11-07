import { db } from "@/lib/db";

/**
 * The desk's Claude calls. Streaming (long answers never time out), raw HTTP like the rest of the desk.
 *
 * Cost controls:
 * - Two models. HEAVY (Opus) for work where quality decides the output: proposals, scripts. LIGHT (Sonnet, half the
 *   price) for chat, LinkedIn and other light drafting. Override with ANTHROPIC_MODEL_HEAVY / ANTHROPIC_MODEL_LIGHT.
 * - Prompt caching. `stable` is the large, unchanging brand context; it goes first in the system prompt with a cache
 *   marker, so repeat calls read it at 5% of the input price. Everything that changes per call goes in `messages`.
 * - Every call's tokens and cost are logged to marketing.runs (kind 'claude'), so spend is visible, not guessed.
 */

export type Tier = "heavy" | "light";
export const model = (tier: Tier) =>
  tier === "heavy" ? process.env.ANTHROPIC_MODEL_HEAVY?.trim() || process.env.ANTHROPIC_MODEL?.trim() || "claude-opus-5-5" : process.env.ANTHROPIC_MODEL_LIGHT?.trim() || "claude-sonnet-5-5";

/** USD per million tokens (platform.claude.com pricing, read 2026-11-05). */
const PRICE: Record<string, { in: number; out: number; w5m: number; w1h: number; read: number }> = {
  "claude-opus-5-5": { in: 4, out: 20, w5m: 5, w1h: 8, read: 0.2 },
  "claude-sonnet-5-5": { in: 2, out: 10, w5m: 2.5, w1h: 4, read: 0.1 },
  "claude-haiku-5-5": { in: 0.1, out: 0.5, w5m: 0.125, w1h: 0.2, read: 0.01 },
};

type Usage = { input: number; output: number; write5m: number; write1h: number; read: number };
const cost = (m: string, u: Usage) => {
  const p = PRICE[m];
  if (!p) return null;
  return Math.round(((u.input * p.in + u.output * p.out + u.write5m * p.w5m + u.write1h * p.w1h + u.read * p.read) / 1e6) * 10000) / 10000;
};

type Msg = { role: "user" | "assistant"; content: string };
export type CallArgs = {
  task: string;
  tier: Tier;
  /** Large, unchanging context: cached. Must be byte-identical between calls to hit the cache. */
  stable?: string;
  /** Short instructions for this kind of call (after the cached block). */
  system: string;
  messages: Msg[];
  maxTokens?: number;
  schema?: Record<string, unknown>;
  /** "1h" for bursty chat; "5m" (default) when calls come in quick runs. */
  cacheTtl?: "5m" | "1h";
};

export async function claudeText(args: CallArgs) {
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  if (!key) throw new Error("ANTHROPIC_API_KEY is empty.");
  // never past today's cap (Settings)
  const { checkBudget } = await import("../../scripts/budget.mjs");
  await checkBudget(db(), args.tier === "heavy" ? 0.3 : 0.05);
  const m = model(args.tier);
  const system = [
    ...(args.stable ? [{ type: "text", text: args.stable, cache_control: args.cacheTtl === "1h" ? { type: "ephemeral", ttl: "1h" } : { type: "ephemeral" } }] : []),
    { type: "text", text: args.system },
  ];
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: m,
      max_tokens: args.maxTokens ?? 8000,
      thinking: { type: "adaptive" },
      stream: true,
      system,
      messages: args.messages,
      ...(args.schema ? { output_config: { format: { type: "json_schema", schema: args.schema } } } : {}),
    }, (_k, v) => (typeof v === "string" ? v.toWellFormed() : v)),
  });
  if (!response.ok || !response.body) {
    const body = await response.text().catch(() => "");
    let message = `Claude returned ${response.status}.`;
    try {
      message = (JSON.parse(body) as { error?: { message?: string } }).error?.message || message;
    } catch {}
    throw new Error(message);
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const usage: Usage = { input: 0, output: 0, write5m: 0, write1h: 0, read: 0 };
  let buffer = "";
  let text = "";
  let stop = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let cut;
    while ((cut = buffer.indexOf("\n\n")) >= 0) {
      const event = buffer.slice(0, cut);
      buffer = buffer.slice(cut + 2);
      const data = event.split("\n").find((l) => l.startsWith("data: "));
      if (!data) continue;
      let json: {
        type: string;
        message?: { usage?: Record<string, unknown> };
        delta?: { type?: string; text?: string; stop_reason?: string };
        usage?: { output_tokens?: number };
        error?: { message?: string };
      };
      try {
        json = JSON.parse(data.slice(6));
      } catch {
        continue;
      }
      if (json.type === "message_start" && json.message?.usage) {
        const u = json.message.usage as { input_tokens?: number; cache_read_input_tokens?: number; cache_creation_input_tokens?: number; cache_creation?: { ephemeral_5m_input_tokens?: number; ephemeral_1h_input_tokens?: number } };
        usage.input = u.input_tokens ?? 0;
        usage.read = u.cache_read_input_tokens ?? 0;
        usage.write5m = u.cache_creation?.ephemeral_5m_input_tokens ?? (args.cacheTtl === "1h" ? 0 : u.cache_creation_input_tokens ?? 0);
        usage.write1h = u.cache_creation?.ephemeral_1h_input_tokens ?? (args.cacheTtl === "1h" ? u.cache_creation_input_tokens ?? 0 : 0);
      }
      if (json.type === "content_block_delta" && json.delta?.type === "text_delta") text += json.delta.text ?? "";
      if (json.type === "message_delta") {
        if (json.delta?.stop_reason) stop = json.delta.stop_reason;
        if (json.usage?.output_tokens) usage.output = json.usage.output_tokens;
      }
      if (json.type === "error") throw new Error(json.error?.message || "Claude stream error");
    }
  }
  await logCall(args.task, m, usage).catch(() => {});
  if (stop === "refusal") throw new Error("Claude declined this request.");
  if (stop === "max_tokens" && !text.trim()) throw new Error("Claude ran out of room before answering.");
  return text;
}

/** Structured output: the API guarantees the reply is JSON matching `schema` (every object needs additionalProperties: false). */
export async function claudeJson<T>(args: CallArgs & { schema: Record<string, unknown> }): Promise<T> {
  const text = await claudeText(args);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Claude's answer was cut off; try again with fewer at a time.");
  }
}

async function logCall(task: string, m: string, u: Usage) {
  const sql = db();
  await sql`insert into runs (kind, detail) values ('claude', ${sql.json({ task, model: m, ...u, usd: cost(m, u) })})`;
}

/** Spend over the last `days`, by task and model, from the call log. */
export async function spend(days = 30) {
  const rows = await db()`select detail->>'task' as task, detail->>'model' as model, count(*) as calls,
      sum((detail->>'input')::bigint) as input, sum((detail->>'output')::bigint) as output,
      sum((detail->>'read')::bigint) as read, sum((detail->>'write5m')::bigint + (detail->>'write1h')::bigint) as written,
      sum((detail->>'usd')::numeric) as usd
    from runs where kind = 'claude' and at > now() - make_interval(days => ${days})
    group by 1, 2 order by usd desc nulls last`;
  return rows.map((r) => ({ task: r.task, model: r.model, calls: Number(r.calls), input: Number(r.input), output: Number(r.output), read: Number(r.read), written: Number(r.written), usd: Number(r.usd ?? 0) }));
}
