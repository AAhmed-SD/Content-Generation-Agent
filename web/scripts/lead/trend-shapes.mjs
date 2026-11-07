#!/usr/bin/env node
// The script lead, from Virlo: trend shapes. Reads the transcripts of this fortnight's top UK study videos and the
// formats creators are copying (scripts/virlo.mjs), and turns them into shapes in the "trend" family: the structure,
// beat by beat, never the words. Trend shapes retire after 30 days, so the writer always has current ones.
// Runs weekly from scripts/refresh.sh.
//
//   node scripts/lead/trend-shapes.mjs [--per 8] [--force]     (from web/)
import { brand, claude, sql } from "./lib.mjs";

const args = process.argv.slice(2);
const per = Number(args[args.indexOf("--per") + 1]) || 8;
await sql`update shapes set status = 'retired' where id like 'trend-%' and status = 'live' and created_at < now() - interval '30 days'`;
const [{ fresh }] = await sql`select count(*)::int as fresh from shapes where id like 'trend-%' and created_at > now() - interval '6.5 days'`;
if (fresh && !args.includes("--force")) {
  console.log(`trend shapes: ${fresh} made this week already`);
  await sql.end();
  process.exit(0);
}
const scripts = await sql`select niche, title, views, score, payload->>'transcript' as transcript from virlo_items
  where kind = 'video' and payload->>'transcript' is not null and collected_at > now() - interval '14 days' order by score desc nulls last limit 16`;
const formats = await sql`select title, hook as recipe, payload->>'constant_part' as constant, payload->>'swapped_part' as swapped from virlo_items
  where kind = 'format' and collected_at > now() - interval '14 days' order by score desc nulls last limit 12`;
if (!scripts.length && !formats.length) {
  console.log("trend shapes: nothing from Virlo yet");
  await sql.end();
  process.exit(0);
}
const live = await sql`select id, name from shapes where status = 'live'`;
const [cat] = await sql`select detail from runs where kind = 'catalogue' order by at desc limit 1`;
const formatIds = (cat?.detail?.formats ?? []).map((f) => `- ${f.id} (${f.name}): ${f.shape}`).join("\n");

const BEAT = { type: "object", properties: { at: { type: "string" }, job: { type: "string" }, voice: { type: "string" }, screen: { type: "string" } }, required: ["at", "job", "voice", "screen"], additionalProperties: false };
const SCHEMA = {
  type: "object",
  properties: {
    shapes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", description: "kebab-case, starting 'trend-'" },
          name: { type: "string" },
          purpose: { type: "string", description: "What the trending structure does and when we should use it" },
          learnt_from: { type: "string", description: "Which trending script or format it came from, paraphrased, no names" },
          beats: { type: "array", items: BEAT },
          hook_styles: { type: "array", items: { type: "string" } },
          formats: { type: "array", items: { type: "string" } },
          pillars: { type: "array", items: { type: "string", enum: ["know-what-you-know", "methods", "life-around-study", "starting"] } },
          niches: { type: "array", items: { type: "string", enum: ["clinical", "analytical", "gcsealevel", "mentalhealth"] } },
          example: { type: "string", description: "One Offload film in this shape, as a logline" },
        },
        required: ["id", "name", "purpose", "learnt_from", "beats", "hook_styles", "formats", "pillars", "niches", "example"],
        additionalProperties: false,
      },
    },
  },
  required: ["shapes"],
  additionalProperties: false,
};

const out = await claude({
  task: "trend-shapes",
  schema: SCHEMA,
  maxTokens: 24000,
  prompt: `These are the scripts of the top UK study videos of the last fortnight, and the formats creators are copying. Learn the structures that make them work, and write ${per} new script shapes for Offload's films in the "trend" family. A shape keeps the structure (beats by the second, what each beat does, how the turn and payoff land), never the words, jokes or people. Each must work as one of our films: one truth from a student's life, the useful part before the product, Offload explained in plain beats, the end card. Skip anything that would break safety.md or the retired themes in scripting.md.

Top scripts (account it was found for, views, then the transcript):
${scripts.map((s) => `--- [${s.niche}] ${s.views ?? "?"} views: ${String(s.title ?? "").slice(0, 120)}\n${String(s.transcript).slice(0, 1800)}`).join("\n\n") || "(none)"}

Formats being copied (name: recipe; what stays the same / what creators swap):
${formats.map((f) => `- ${f.title}: ${f.recipe} (same: ${f.constant ?? "?"}; swapped: ${f.swapped ?? "?"})`).join("\n") || "(none)"}

Shapes we already have (do not repeat):
${live.map((s) => `- ${s.id}: ${s.name}`).join("\n")}

Formats we can render:
${formatIds}

--- brand/scripting.md ---
${brand("brand/scripting.md")}

--- brand/safety.md ---
${brand("brand/safety.md")}`,
});
let added = 0;
for (const s of out.shapes ?? []) {
  const id = ("trend-" + String(s.id).toLowerCase().replace(/^trend-/, "").replace(/[^a-z0-9-]/g, "-")).slice(0, 60);
  const r = await sql`insert into shapes (id, name, purpose, beats, hook_styles, formats, pillars, niches, example)
    values (${id}, ${s.name}, ${`${s.purpose} Learnt from: ${s.learnt_from}`}, ${sql.json(s.beats)}, ${s.hook_styles}, ${s.formats}, ${s.pillars}, ${s.niches}, ${s.example})
    on conflict (id) do nothing returning id`;
  added += r.length;
}
console.log(`trend shapes: +${added}`);
await sql.end();
