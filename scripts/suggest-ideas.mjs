#!/usr/bin/env node
/**
 * Suggest three new ideas for the desk's Ideas page, each with a storyboard, from what is working now.
 *
 *   node scripts/suggest-ideas.mjs            (from the repo root)
 *   node scripts/suggest-ideas.mjs --weekly   (only if the last suggestion is a week old; for the schedule)
 *
 * Reads: the UK signal hooks, kept inspiration, the retired themes and the hook styles. Never raw account names in the pitch.
 * Needs ANTHROPIC_API_KEY in web/.env.local.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const ideasFile = path.join(root, "web", "research", "ideas.json");
const env = Object.fromEntries(
  (existsSync(path.join(root, "web", ".env.local")) ? readFileSync(path.join(root, "web", ".env.local"), "utf8") : "")
    .split("\n")
    .map((l) => l.match(/^\s*([A-Z_]+)\s*=\s*"?(.*?)"?\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);
const key = process.env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY;
const data = JSON.parse(readFileSync(ideasFile, "utf8"));
const last = data.ideas.filter((i) => i.by === "Claude (weekly)").map((i) => i.at).sort().at(-1);
if (process.argv.includes("--weekly") && last && Date.now() - Date.parse(last) < 6.5 * 864e5) {
  console.log(`ideas: last suggested ${last}, not due`);
  process.exit(0);
}
if (!key) {
  console.error("ideas: ANTHROPIC_API_KEY is empty");
  process.exit(1);
}
const read = (f) => (existsSync(f) ? readFileSync(f, "utf8") : "");
const signals = read(path.join(root, "web", "data", "signals.jsonl"))
  .split("\n")
  .filter(Boolean)
  .map((l) => {
    try {
      return JSON.parse(l);
    } catch {
      return null;
    }
  })
  .filter((s) => s && s.type === "outlier" && s.niche !== "motion")
  .sort((a, b) => b.ratio - a.ratio)
  .slice(0, 25)
  .map((s) => `- [${s.niche}] ${s.ratio}x: ${(s.hook || s.title).slice(0, 140)}`)
  .join("\n");
const pulled = JSON.parse(read(path.join(root, "web", "research", "pulled.json")) || '{"items":[]}').items.slice(0, 15).map((p) => `- ${p.name}: ${p.fit}`).join("\n");
const existing = data.ideas.map((i) => `- ${i.title}`).join("\n");
const scripting = read(path.join(root, "brand", "scripting.md"));
const hooks = read(path.join(root, "brand", "hook-styles.md"));
const prompt = `You suggest new content ideas for Offload, a UK study app (four TikTok accounts: clinical, analytical, GCSE and A-level, and a time account for students who struggle to start). Suggest exactly three new ideas that are not already on the list. Each needs a storyboard of 3 to 6 short frames. Follow the scripting rules and the retired themes. Learn the shape of what is working; never copy words, never name another creator or brand.

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
let n = Math.max(0, ...data.ideas.map((i) => Number(String(i.id).slice(1)) || 0));
const today = new Date().toISOString().slice(0, 10);
for (const it of items.slice(0, 3)) {
  if (!it.title || !Array.isArray(it.frames)) continue;
  data.ideas.unshift({ id: `i${++n}`, title: String(it.title).slice(0, 140), kind: it.kind || "Idea", niche: it.niche || "all", pitch: String(it.pitch || "").slice(0, 800), status: "new", by: "Claude (weekly)", at: today, frames: it.frames.slice(0, 8).map((f) => String(f).slice(0, 200)) });
}
writeFileSync(ideasFile, JSON.stringify(data, null, 2) + "\n");
console.log(`ideas: added ${Math.min(3, items.length)}`);
