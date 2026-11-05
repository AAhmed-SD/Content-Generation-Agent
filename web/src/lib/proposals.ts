import { readFileSync } from "node:fs";
import path from "node:path";
import { claudeJson } from "@/lib/claude-stream";
import { db } from "@/lib/db";
import { readCatalogue } from "@/lib/library";

/**
 * Hooks: video proposals. Each one is a hook (openers A and B), a theme, a hook style, a format from the library,
 * the look in one line, and a storyboard. People accept or reject them, and talk to the desk about each one.
 */

export const NICHES = ["clinical", "analytical", "gcsealevel", "mentalhealth"] as const;
export type Niche = (typeof NICHES)[number];
export type Frame = { voice: string; screen: string };
export type Proposal = {
  id: string;
  niche: Niche;
  format: string;
  hookStyle: string;
  theme: string;
  title: string;
  openers: string[];
  look: string;
  storyboard: Frame[];
  reasoning: string;
  status: string;
  rejections: { by: string; reason: string; at: string }[];
  createdAt: string;
};
export type Message = { id: string; role: "person" | "desk"; author: string; text: string; revised: boolean; at: string };

const RETIRED = /colou?r(-| )?cod|colou?ring (it )?in|re-?read/i;
const brand = (f: string) => {
  try {
    return readFileSync(path.join(process.cwd(), "..", f), "utf8");
  } catch {
    return "";
  }
};

const toProposal = (r: Record<string, unknown>): Proposal => ({
  id: r.id as string,
  niche: r.niche as Niche,
  format: (r.format as string) ?? "",
  hookStyle: (r.hook_style as string) ?? "",
  theme: (r.theme as string) ?? "",
  title: (r.title as string) ?? "",
  openers: (r.openers as string[]) ?? [],
  look: (r.look as string) ?? "",
  storyboard: (r.storyboard as Frame[]) ?? [],
  reasoning: (r.reasoning as string) ?? "",
  status: r.status as string,
  rejections: (r.rejections as Proposal["rejections"]) ?? [],
  createdAt: new Date(r.created_at as string).toISOString(),
});

export async function listProposals(status: "proposed" | "accepted" | "rejected", niche?: string) {
  const rows = await db()`select * from content where kind = 'film' and status = ${status}
    and (${niche ?? null}::text is null or niche = ${niche ?? null}) order by created_at desc limit 120`;
  return rows.map(toProposal);
}

export async function proposalCounts() {
  const rows = await db()`select status, count(*) as n from content where kind = 'film' and status in ('proposed','accepted','rejected') group by status`;
  return Object.fromEntries(rows.map((r) => [r.status, Number(r.n)])) as Record<string, number>;
}

export async function messagesFor(ids: string[]) {
  if (!ids.length) return {} as Record<string, Message[]>;
  const rows = await db()`select id, content_id, role, coalesce(author, '') as author, text, revised, created_at from messages where content_id = any(${ids}) order by created_at`;
  const out: Record<string, Message[]> = {};
  for (const r of rows) (out[r.content_id] ??= []).push({ id: String(r.id), role: r.role, author: r.author, text: r.text, revised: r.revised, at: new Date(r.created_at).toISOString() });
  return out;
}

/**
 * The stable part: brand rules, all four account files and the format list. Identical bytes on every call (all four
 * niches always, fixed order), so it is cached and re-read at 5% of the input price.
 */
async function stableContext() {
  const cat = await readCatalogue();
  const formats = (cat?.formats ?? []).map((f) => `- ${f.id} (${f.name}): ${f.shape} Suits: ${f.styles.join(", ")}.`).join("\n");
  return [
    "You are the producer on the Offload Marketing desk. Offload is a UK study app with four TikTok-first accounts: offload.clinical (medicine, dentistry, nursing, radiography), offload.analytical (maths, economics, computer science), offload.gcsealevel (GCSE and A-level, many under 18), offload.mentalhealth (the time account: students who struggle to start). You make short vertical videos. Follow the brand files exactly: one natural male narrator, the three-beat Offload explainer, the retired themes (never colour-coding or rereading), safety rules, and claims only from product-facts.",
    "--- brand/brand.md ---\n" + brand("brand/brand.md"),
    "--- brand/scripting.md ---\n" + brand("brand/scripting.md"),
    "--- brand/hook-styles.md ---\n" + brand("brand/hook-styles.md"),
    "--- brand/safety.md ---\n" + brand("brand/safety.md"),
    "--- brand/product-facts.md (claims allowed) ---\n" + brand("brand/product-facts.md").slice(0, 24000),
    ...NICHES.map((n) => `--- brand/niches/${n}.md ---\n${brand(`brand/niches/${n}.md`)}`),
    "--- Formats you may use (the format id must be one of these) ---\n" + formats,
  ].join("\n\n");
}

/** The live part: this week's inputs. Changes every call, so it goes in the message, after the cached block. */
async function liveInputs(niche?: string) {
  const sql = db();
  const niches = niche ? [niche] : [...NICHES];
  const signals = await sql`select niche, ratio, coalesce(nullif(hook, ''), title) as text from signals
    where niche = any(${niches}) and collected_at > now() - interval '30 days' order by ratio desc limit 30`;
  const research = await sql`select niche, text from research_items where niche = any(${niches}) order by collected_at desc limit 24`;
  const ideas = await sql`select title, pitch from ideas where status in ('accepted','building') order by created_at desc limit 10`;
  const rejected = await sql`select niche, coalesce(openers->>0, title) as hook, rejections from content where status = 'rejected' order by updated_at desc limit 15`;
  const recent = await sql`select niche, coalesce(openers->>0, title) as hook from content where kind = 'film' order by created_at desc limit 40`;
  return [
    "--- Working on UK TikTok now (shape only, never copy words or name accounts) ---\n" + signals.map((s) => `- [${s.niche}] ${s.ratio}x: ${String(s.text).slice(0, 160)}`).join("\n"),
    "--- What students are looking up this week ---\n" + research.map((r) => `- [${r.niche}] ${r.text}`).join("\n"),
    "--- Accepted ideas ---\n" + ideas.map((i) => `- ${i.title}: ${i.pitch}`).join("\n"),
    "--- Rejected before, with reasons (learn from these) ---\n" + rejected.map((r) => `- [${r.niche}] ${r.hook} — ${((r.rejections as { reason: string }[]) ?? []).map((x) => x.reason).filter(Boolean).join("; ") || "no reason given"}`).join("\n"),
    "--- Recent hooks (do not repeat) ---\n" + recent.map((r) => `- [${r.niche}] ${r.hook}`).join("\n"),
  ].join("\n\n");
}

/** The schema Claude fills in for one proposal. */
const PROPOSAL_SCHEMA = {
  type: "object",
  properties: {
    niche: { type: "string", enum: ["clinical", "analytical", "gcsealevel", "mentalhealth"] },
    format: { type: "string", description: "A format id from the list" },
    hook_style: { type: "string", description: "One style from hook-styles.md" },
    theme: { type: "string", description: "The idea in one line" },
    title: { type: "string", description: "Short working title" },
    openers: { type: "array", items: { type: "string" }, description: "Exactly two: hook A and hook B, two different first spoken lines" },
    look: { type: "string", description: "The visual look in one line: setting, colours, motion" },
    storyboard: {
      type: "array",
      description: "4 to 7 frames, from the hook to the Offload end card",
      items: { type: "object", properties: { voice: { type: "string" }, screen: { type: "string" } }, required: ["voice", "screen"], additionalProperties: false },
    },
    reasoning: { type: "string", description: "Why this should work: which signal, research or idea it answers" },
  },
  required: ["niche", "format", "hook_style", "theme", "title", "openers", "look", "storyboard", "reasoning"],
  additionalProperties: false,
};

const SHAPE = `{"niche": "clinical|analytical|gcsealevel|mentalhealth", "format": "<a format id from the list>", "hook_style": "<one style from hook-styles.md>", "theme": "<the idea in one line>", "title": "<short working title>", "openers": ["<hook A: the first spoken line>", "<hook B: a different opener for the same film>"], "look": "<the visual look in one line: setting, colours, motion>", "storyboard": [{"voice": "<what the narrator says>", "screen": "<what we see>"}], "reasoning": "<why this should work: which signal, research or idea it answers>"}`;

function valid(p: Record<string, unknown>, formats: Set<string>) {
  const text = JSON.stringify(p);
  return (
    NICHES.includes(p.niche as Niche) &&
    typeof p.theme === "string" &&
    Array.isArray(p.openers) &&
    p.openers.length >= 1 &&
    Array.isArray(p.storyboard) &&
    p.storyboard.length >= 3 &&
    (!formats.size || formats.has(String(p.format))) &&
    !RETIRED.test(text)
  );
}

/** Ask Claude for new proposals and store them as status 'proposed'. Returns how many were kept. */
export async function propose({ count = 8, niche, by }: { count?: number; niche?: string; by: string }) {
  const cat = await readCatalogue();
  const formats = new Set((cat?.formats ?? []).map((f) => f.id));
  const ask = `${await liveInputs(niche)}\n\nPropose ${count} new videos${niche ? ` for ${niche}` : ", spread across all four accounts"}. Each needs a hook with two openers (A and B), a theme, a hook style, a format from the list, the look, and a storyboard of 4 to 7 frames that runs from the hook to the Offload end card.`;
  const out = await claudeJson<{ proposals: Record<string, unknown>[] }>({
    task: "proposals",
    tier: "heavy",
    stable: await stableContext(),
    cacheTtl: "5m",
    system: "Propose videos. Vary hook styles and formats; never repeat a recent hook.",
    messages: [{ role: "user", content: ask }],
    schema: { type: "object", properties: { proposals: { type: "array", items: PROPOSAL_SCHEMA } }, required: ["proposals"], additionalProperties: false },
    maxTokens: 24000,
  });
  const items = (out.proposals ?? []).filter((p) => valid(p, formats));
  const sql = db();
  for (const p of items) {
    await sql`insert into content (kind, niche, format, title, hook, hook_style, theme, look, openers, storyboard, reasoning, status, created_by)
      values ('film', ${String(p.niche)}, ${String(p.format)}, ${String(p.title ?? p.theme).slice(0, 140)}, ${String((p.openers as string[])[0]).slice(0, 300)},
        ${String(p.hook_style ?? "")}, ${String(p.theme).slice(0, 400)}, ${String(p.look ?? "").slice(0, 400)},
        ${sql.json((p.openers as string[]).slice(0, 2).map((o) => String(o).slice(0, 300)))},
        ${sql.json((p.storyboard as Frame[]).slice(0, 8).map((f) => ({ voice: String(f.voice ?? "").slice(0, 300), screen: String(f.screen ?? "").slice(0, 300) })))},
        ${String(p.reasoning ?? "").slice(0, 800)}, 'proposed', ${by})`;
  }
  return items.length;
}

export async function decide(id: string, decision: "accepted" | "rejected", by: string, reason = "") {
  const sql = db();
  if (decision === "rejected") {
    await sql`update content set status = 'rejected', updated_at = now(),
      rejections = rejections || ${sql.json([{ by, reason: reason.slice(0, 400), at: new Date().toISOString() }])} where id = ${id}`;
  } else {
    await sql`update content set status = 'accepted', updated_at = now() where id = ${id}`; // accepting the idea is not a stamp on the film
  }
}

/** A message from a person about one proposal. The desk answers, and rewrites the proposal if asked to. */
export async function chat(id: string, text: string, by: string) {
  const sql = db();
  const [row] = await sql`select * from content where id = ${id}`;
  if (!row) throw new Error("That proposal no longer exists.");
  await sql`insert into messages (content_id, role, author, text) values (${id}, 'person', ${by}, ${text.slice(0, 2000)})`;
  const history = await sql`select role, text from messages where content_id = ${id} order by created_at`;
  const p = toProposal(row);
  const cat = await readCatalogue();
  const formats = new Set((cat?.formats ?? []).map((f) => f.id));
  const current = JSON.stringify({ niche: p.niche, format: p.format, hook_style: p.hookStyle, theme: p.theme, title: p.title, openers: p.openers, look: p.look, storyboard: p.storyboard, reasoning: p.reasoning });
  const messages = history.map((m) => ({ role: (m.role === "person" ? "user" : "assistant") as "user" | "assistant", content: m.text }));
  messages[messages.length - 1].content =
    `${await liveInputs(p.niche)}\n\nThe proposal now:\n${current}\n\n${by} says: ${messages[messages.length - 1].content}\n\n(Set changed to true and fill revision with the whole revised proposal only if ${by} asked for a change; otherwise set changed to false and repeat the current proposal in revision.)`;
  const raw = await claudeJson<{ reply: string; changed: boolean; revision: Record<string, unknown> }>({
    task: "chat",
    tier: "light",
    stable: await stableContext(),
    cacheTtl: "1h",
    system: "You are talking with a person on the desk about one video proposal. Be brief, warm and direct, in British English. Answer questions about it. If they ask for a change, make it and return the whole revised proposal. Keep to the brand files, the retired themes, safety and product facts; if a request would break them, say so and offer the nearest thing that doesn't.",
    messages,
    schema: { type: "object", properties: { reply: { type: "string" }, changed: { type: "boolean" }, revision: PROPOSAL_SCHEMA }, required: ["reply", "changed", "revision"], additionalProperties: false },
    maxTokens: 8000,
  });
  const out = { reply: raw.reply, revision: raw.changed ? raw.revision : null };
  let revised = false;
  if (out.revision && valid({ ...out.revision, niche: out.revision.niche ?? p.niche }, formats)) {
    const r = out.revision;
    await sql`update content set format = ${String(r.format ?? p.format)}, hook_style = ${String(r.hook_style ?? p.hookStyle)}, theme = ${String(r.theme ?? p.theme).slice(0, 400)},
      title = ${String(r.title ?? p.title).slice(0, 140)}, hook = ${String((r.openers as string[])[0]).slice(0, 300)}, look = ${String(r.look ?? p.look).slice(0, 400)},
      openers = ${sql.json((r.openers as string[]).slice(0, 2).map((o) => String(o).slice(0, 300)))},
      storyboard = ${sql.json((r.storyboard as Frame[]).slice(0, 8).map((f) => ({ voice: String(f.voice ?? "").slice(0, 300), screen: String(f.screen ?? "").slice(0, 300) })))},
      reasoning = ${String(r.reasoning ?? p.reasoning).slice(0, 800)}, updated_at = now() where id = ${id}`;
    revised = true;
  }
  await sql`insert into messages (content_id, role, author, text, revised) values (${id}, 'desk', 'Desk', ${String(out.reply ?? "").slice(0, 3000)}, ${revised})`;
  return { reply: out.reply, revised };
}
