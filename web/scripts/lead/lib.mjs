// Shared plumbing for the script lead: env, the database, the brand files, and one Claude call that streams,
// can search the web, can return JSON, and logs its cost to marketing.runs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

export const web = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const root = path.join(web, "..");
const envFile = path.join(web, ".env.local");
const env = Object.fromEntries(
  (fs.existsSync(envFile) ? fs.readFileSync(envFile, "utf8") : "")
    .split("\n")
    .map((l) => l.match(/^\s*([A-Z_]+)\s*=\s*"?(.*?)"?\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);
export const get = (k) => process.env[k] || env[k];
export const sql = postgres({ host: get("MARKETING_DB_HOST"), port: Number(get("MARKETING_DB_PORT") || 6543), database: "postgres", username: get("MARKETING_DB_USER"), password: get("MARKETING_DB_PASSWORD"), ssl: "require", prepare: false, max: 2, connection: { search_path: "marketing" } });

export const brand = (rel) => {
  const f = path.join(root, rel);
  return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "";
};
export const NICHES = ["clinical", "analytical", "gcsealevel", "mentalhealth"];
export const LABEL = {
  clinical: "offload.clinical: UK students on clinical, healthcare and science degrees (medicine, dentistry, nursing, radiography, pharmacy, midwifery, physiotherapy, biomedical science, biology and similar)",
  analytical: "offload.analytical: UK students on engineering, physics, maths and other analysis-based degrees (statistics, data science, computer science, economics), plus A-level maths, further maths and physics",
  gcsealevel: "offload.gcsealevel: UK GCSE and A-level students, many under 18",
  mentalhealth: "offload.mentalhealth (the time account): UK neurodivergent students (ADHD, autism, dyslexia, executive-function struggles) and anyone who struggles with time, planning and starting, of any subject; never diagnosed or treated in a film",
};

const PRICE = { "claude-opus-5-5": [4, 20, 5, 0.4], "claude-sonnet-5-5": [2, 10, 2.5, 0.2] };

/**
 * One Claude call. Streams (long outputs), loops on pause_turn (web search), returns the text, or parsed JSON when a
 * schema is given. `stable` is cached.
 */
export async function claude({ task, stable = "", prompt, schema, search = false, maxTokens = 32000, model = get("ANTHROPIC_MODEL_HEAVY") || "claude-opus-5-5" }) {
  const { checkBudget } = await import("../budget.mjs");
  await checkBudget(sql, 0.1); // never past today's cap
  const messages = [{ role: "user", content: prompt }];
  const tools = search ? [{ type: "web_search_20260209", name: "web_search", max_uses: 12 }] : undefined;
  const totals = { input: 0, output: 0, write: 0, read: 0, searches: 0 };
  let text = "";
  for (let turn = 0; turn < 6; turn++) {
    const body = {
      model,
      max_tokens: maxTokens,
      stream: true,
      thinking: { type: "adaptive" },
      system: stable ? [{ type: "text", text: stable, cache_control: { type: "ephemeral" } }] : undefined,
      messages,
      ...(tools ? { tools } : {}),
      ...(schema ? { output_config: { format: { type: "json_schema", schema } } } : {}),
    };
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": get("ANTHROPIC_API_KEY"), "anthropic-version": "2023-06-01" },
      body: JSON.stringify(body, (_k, v) => (typeof v === "string" ? v.toWellFormed() : v)),
      signal: AbortSignal.timeout(12 * 60_000), // a stream that stalls fails instead of hanging the run
    });
    if (!res.ok) throw new Error(`Claude ${res.status}: ${(await res.text()).slice(0, 400)}`);
    // read the event stream and rebuild the content blocks
    const blocks = [];
    let stop = null;
    const dec = new TextDecoder();
    let buf = "";
    for await (const chunk of res.body) {
      buf += dec.decode(chunk, { stream: true });
      let i;
      while ((i = buf.indexOf("\n\n")) >= 0) {
        const ev = buf.slice(0, i);
        buf = buf.slice(i + 2);
        const data = ev.split("\n").find((l) => l.startsWith("data: "));
        if (!data) continue;
        const e = JSON.parse(data.slice(6));
        if (e.type === "message_start") {
          const u = e.message.usage ?? {};
          totals.input += u.input_tokens ?? 0;
          totals.write += u.cache_creation_input_tokens ?? 0;
          totals.read += u.cache_read_input_tokens ?? 0;
        } else if (e.type === "content_block_start") blocks[e.index] = { ...e.content_block, _json: "" };
        else if (e.type === "content_block_delta") {
          const b = blocks[e.index];
          if (e.delta.type === "text_delta") b.text = (b.text ?? "") + e.delta.text;
          else if (e.delta.type === "thinking_delta") b.thinking = (b.thinking ?? "") + e.delta.thinking;
          else if (e.delta.type === "signature_delta") b.signature = e.delta.signature;
          else if (e.delta.type === "input_json_delta") b._json += e.delta.partial_json;
        } else if (e.type === "message_delta") {
          stop = e.delta.stop_reason;
          totals.output += e.usage?.output_tokens ?? 0;
          totals.searches += e.usage?.server_tool_use?.web_search_requests ?? 0;
        } else if (e.type === "error") throw new Error(`Claude stream: ${e.error?.message}`);
      }
    }
    const content = blocks.filter(Boolean).map(({ _json, ...b }) => (b.type === "server_tool_use" && _json ? { ...b, input: JSON.parse(_json) } : b));
    text += content.filter((b) => b.type === "text").map((b) => b.text).join("");
    if (stop === "pause_turn") {
      messages.push({ role: "assistant", content });
      continue;
    }
    if (stop === "refusal") throw new Error(`Claude declined (${task}).`);
    if (stop === "max_tokens") throw new Error(`Claude ran out of room (${task}).`);
    break;
  }
  const p = PRICE[model];
  const usd = p ? (totals.input * p[0] + totals.output * p[1] + totals.write * p[2] + totals.read * p[3]) / 1e6 + totals.searches * 0.01 : null;
  await sql`insert into runs (kind, detail) values ('claude', ${sql.json({ task, model, input: totals.input, output: totals.output, write5m: totals.write, write1h: 0, read: totals.read, searches: totals.searches, usd: usd && Math.round(usd * 10000) / 10000 })})`;
  process.stderr.write(`  ${task}: ${totals.output} tokens out, ${totals.searches} searches, $${usd?.toFixed(3)}\n`);
  return schema ? JSON.parse(text) : text;
}
