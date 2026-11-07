#!/usr/bin/env node
/**
 * Suggest three new ideas for the desk's Ideas page, each with a storyboard, from what is working now.
 * Reads signals, kept inspiration and existing ideas from Supabase; writes the new ideas there.
 *
 *   node scripts/suggest-ideas.mjs            (from web/)
 *   node scripts/suggest-ideas.mjs --weekly   (only if the last suggestion is a week old; for the schedule)
 *   node scripts/suggest-ideas.mjs --template (one new film template, once a day; for the schedule)
 *
 * Reads: the UK signal hooks, kept inspiration, the retired themes and the hook styles. Never raw account names in the pitch.
 * Needs ANTHROPIC_API_KEY in web/.env.local.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import postgres from "postgres";

const root = path.join(process.cwd(), "..");
const env = Object.fromEntries(
  (existsSync(".env.local") ? readFileSync(".env.local", "utf8") : "")
    .split("\n")
    .map((l) => l.match(/^\s*([A-Z_]+)\s*=\s*"?(.*?)"?\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);
const key = process.env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY;
const get = (k) => process.env[k] || env[k];
const sql = postgres({ host: get("MARKETING_DB_HOST"), port: Number(get("MARKETING_DB_PORT") || 6543), database: "postgres", username: get("MARKETING_DB_USER"), password: get("MARKETING_DB_PASSWORD"), ssl: "require", prepare: false, max: 1, connection: { search_path: "marketing" } });
const data = { ideas: await sql`select id, title, to_char(at, 'YYYY-MM-DD') as at, by from ideas` };
const TEMPLATE = process.argv.includes("--template");
const BY = TEMPLATE ? "Claude (daily template)" : "Claude (weekly)";
const [lastRow] = await sql`select to_char(max(at), 'YYYY-MM-DD') as at from ideas where by = ${BY}`;
const last = lastRow?.at;
const londonToday = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
if (TEMPLATE && last === londonToday) {
  console.log(`template: already suggested today`);
  await sql.end();
  process.exit(0);
}
if (process.argv.includes("--weekly") && last && Date.now() - Date.parse(last) < 6.5 * 864e5) {
  console.log(`ideas: last suggested ${last}, not due`);
  await sql.end();
  process.exit(0);
}
if (!key) {
  console.error("ideas: ANTHROPIC_API_KEY is empty");
  process.exit(1);
}
const read = (f) => (existsSync(f) ? readFileSync(f, "utf8") : "");
const signals = (await sql`select niche, ratio, coalesce(nullif(hook, ''), title) as text from signals where niche <> 'motion' order by ratio desc limit 25`)
  .map((s) => `- [${s.niche}] ${s.ratio}x: ${String(s.text).slice(0, 140)}`)
  .join("\n");
const pulled = (await sql`select name, fit from pulled order by created_at desc limit 15`).map((p) => `- ${p.name}: ${p.fit}`).join("\n");
const existing = data.ideas.map((i) => `- ${i.title}`).join("\n");
const scripting = read(path.join(root, "brand", "scripting.md"));
const hooks = read(path.join(root, "brand", "hook-styles.md"));
// the formats we already have, so a template suggestion is genuinely new
const library = read(path.join(root, "docs", "library.md"));
const formats = (library.match(/^\| `[a-z0-9-]+` \|.*$/gm) ?? []).map((l) => { const c = l.split("|").map((x) => x.trim()); return `- ${c[1]} ${c[2]}: ${c[4]}`; }).join("\n");
const copied = (await sql`select title, hook from virlo_items where kind = 'format' and collected_at > now() - interval '21 days' order by score desc nulls last limit 15`)
  .map((f) => `- ${f.title}: ${String(f.hook ?? "").slice(0, 220)}`)
  .join("\n");
const templatePrompt = `You design new film templates for Offload, a UK study app (four TikTok accounts: clinical, analytical, GCSE and A-level, and a time account for students who struggle to start). A template is a reusable visual format, built once in Remotion and filled with a new script each time: an everyday object, screen or system that a study problem can be shown through (like the receipt, departures board, exam paper or Tetris calendar we already have).

Suggest exactly ONE new template that is not on the list below and not a near-copy of one. It must be simple flat shapes and type that can be animated in code: no photos, no characters, no real brands or apps. Say how it moves, which hook styles it suits, and what it would show for one of the accounts. Follow the scripting rules and the retired themes. Learn the shape of what is working; never copy words or name another creator or brand.

Reply with only a JSON array with one item: [{"title": "<template name>", "kind": "Film format", "niche": "all" | "clinical" | "analytical" | "gcsealevel" | "mentalhealth", "pitch": "two or three sentences: what it is, how it moves, why it suits short video", "frames": ["<frame 1: what we see and hear>", "..."]}] with 4 to 6 frames for one example film.

Templates we already have:
${formats}

What is working on UK TikTok now:
${signals}

Formats creators are copying right now (from Virlo; learn the mechanic, never copy):
${copied || "(none yet)"}

Pieces we kept from inspiration:
${pulled}

Ideas already on the list:
${existing}

--- scripting.md ---
${scripting}

--- hook-styles.md ---
${hooks}`;
const prompt = TEMPLATE ? templatePrompt : `You suggest new content ideas for Offload, a UK study app (four TikTok accounts: clinical, analytical, GCSE and A-level, and a time account for students who struggle to start). Suggest exactly three new ideas that are not already on the list. Each needs a storyboard of 3 to 6 short frames. Follow the scripting rules and the retired themes. Learn the shape of what is working; never copy words, never name another creator or brand.

Reply with only a JSON array: [{"title": "...", "kind": "Film format" | "Series" | "Engagement" | "Launch", "niche": "all" | "clinical" | "analytical" | "gcsealevel" | "mentalhealth", "pitch": "two sentences", "frames": ["...", "..."]}]

What is working on UK TikTok now:
${signals}

Pieces we kept from inspiration:
${pulled}

Already on the list:
${existing}

--- scripting.md ---
${scripting}

--- hook-styles.md ---
${hooks}`;
// never past today's cap (Settings)
const { checkBudget } = await import("./budget.mjs");
try {
  await checkBudget(sql, 0.1);
} catch (e) {
  console.log(`ideas: ${e.message}`);
  await sql.end();
  process.exit(0);
}
const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
  body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || env.ANTHROPIC_MODEL || "claude-opus-5-5", max_tokens: 4000, thinking: { type: "adaptive" }, messages: [{ role: "user", content: prompt }] }),
});
const json = await res.json();
if (!res.ok) {
  console.error("ideas:", json.error?.message || res.status);
  process.exit(1);
}
const text = (json.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
const items = JSON.parse(text.match(/\[[\s\S]*\]/)?.[0] || "[]");
const today = new Date().toISOString().slice(0, 10);
let added = 0;
for (const [k, it] of items.slice(0, TEMPLATE ? 1 : 3).entries()) {
  if (!it.title || !Array.isArray(it.frames)) continue;
  await sql`insert into ideas (id, title, kind, niche, pitch, status, frames, by, at)
    values (${"i" + Date.now().toString(36) + k}, ${String(it.title).slice(0, 140)}, ${TEMPLATE ? "Film format" : it.kind || "Idea"}, ${it.niche || "all"}, ${String(it.pitch || "").slice(0, 800)}, 'new',
      ${sql.json(it.frames.slice(0, 8).map((f) => String(f).slice(0, TEMPLATE ? 500 : 200)))}, ${BY}, ${TEMPLATE ? londonToday : today})`;
  added++;
}
console.log(`${TEMPLATE ? "template" : "ideas"}: added ${added}`);
await sql.end();
