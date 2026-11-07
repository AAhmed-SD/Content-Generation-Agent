#!/usr/bin/env node
// The loop's memory: once a week, turn everything we have learnt into brand/lessons.md, which the proposals and the
// film writer both read. Sources, last 30 days:
//   - your decisions: proposals and films rejected (with reasons), films sent back (with notes), approvals
//   - the script editor: its repeated notes and contradictions, and films held under the bar
//   - our own numbers: best and worst posts per platform (scripts/our-numbers.mjs)
// The file says what to do more, what to stop, and the rules learnt, each with the evidence behind it. Sonnet, about
// $0.05 a week. Generated: do not edit by hand (say it in a rejection or a send-back note instead, and it lands here).
//
//   node scripts/lead/lessons.mjs [--force]      (from web/)
import fs from "node:fs";
import path from "node:path";
import { claude, root, sql } from "./lib.mjs";
import { ourNumbers } from "../our-numbers.mjs";

const file = path.join(root, "brand", "lessons.md");
if (!process.argv.includes("--force") && fs.existsSync(file) && Date.now() - fs.statSync(file).mtimeMs < 6.5 * 864e5) {
  console.log("lessons: written this week already");
  await sql.end();
  process.exit(0);
}

const decisions = await sql`select niche, format, shape, hook_style, title, coalesce(openers->>0, hook) as hook, status, rejections
  from content where kind = 'film' and updated_at > now() - interval '30 days' and (status in ('rejected','approved','posted','scheduled','held') or jsonb_array_length(coalesce(rejections, '[]'::jsonb)) > 0)
  order by updated_at desc limit 80`;
const editor = await sql`select niche, format, title, review->>'total' as total, review->>'verdict' as verdict, review->'fixes' as fixes
  from content where review is not null and updated_at > now() - interval '30 days' order by updated_at desc limit 40`;
const numbers = await ourNumbers(sql, ["clinical", "analytical", "gcsealevel", "mentalhealth"], { days: 30, top: 8 });

if (decisions.length + editor.length < 5 && !numbers) {
  console.log("lessons: not enough to learn from yet");
  await sql.end();
  process.exit(0);
}

const reasons = (r) => (r.rejections ?? []).map((x) => x.reason).filter(Boolean).join("; ");
const text = await claude({
  task: "lessons",
  model: "claude-sonnet-5-5",
  maxTokens: 6000,
  prompt: `You keep the lessons file for Offload's content agent: what our own films have taught us. Write brand/lessons.md from the evidence below.

Rules:
- Only lessons the evidence supports. Each lesson cites its evidence briefly (for example "3 films rejected for this", "editor flagged it in 5 of 9 scripts", "2x usual on TikTok, 4 posts").
- A person's rejection reason or send-back note outranks the editor; our numbers outrank both once a group has 3 or more posts.
- Group by: Do more, Stop doing, Rules for the picture and the words, Per account. At most 25 lessons, the most important first, each one line.
- Plain, specific, actionable. No numbers in a lesson that a film should say on screen.

Start with "# Lessons" and one line saying it is generated weekly by web/scripts/lead/lessons.mjs from rejections, send-backs, the script editor and our numbers, and not to edit it by hand.

YOUR DECISIONS (last 30 days; status, then reasons or notes):
${decisions.map((d) => `- [${d.niche} · ${d.format} · ${d.shape ?? "no shape"} · ${d.hook_style}] "${d.title}" (${d.status})${reasons(d) ? `: ${reasons(d)}` : ""}`).join("\n") || "(none)"}

THE SCRIPT EDITOR (score, verdict, top notes):
${editor.map((e) => `- [${e.niche} · ${e.format}] "${e.title}" ${e.total}/40 ${e.verdict}: ${(e.fixes ?? []).slice(0, 3).map((f) => String(f).slice(0, 220)).join(" | ")}`).join("\n") || "(none)"}

OUR NUMBERS:
${numbers || "(nothing posted yet)"}`,
});
fs.writeFileSync(file, text.slice(Math.max(0, text.indexOf("# Lessons"))).trim() + "\n");
console.log(`lessons: wrote ${path.relative(root, file)}`);
await sql.end();
