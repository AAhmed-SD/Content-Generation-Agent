#!/usr/bin/env node
// Step 3 of the script lead: the shapes library. A shape is a named script structure with beats by the second:
// what happens at 0-2s, 2-6s and so on, and what each beat is for. The writer picks a shape and fills it from a truth,
// instead of improvising. Ten families, eight shapes each. Also writes brand/shapes.md (generated; do not edit).
//
//   node scripts/lead/shapes.mjs [--per 8]      (from web/)
import fs from "node:fs";
import path from "node:path";
import { brand, claude, root, sql } from "./lib.mjs";

const FAMILIES = {
  check: "Check yourself: the viewer tests themselves on screen (a question, a recall prompt, a 'can you do this cold?'), then the reveal. Leads pillar 1, know what you actually know.",
  science: "Show the science: one finding about memory or learning, shown with a picture (a curve, a comparison), then what to do about it.",
  myth: "Myth and fix: a belief they hold, why it fails, what works instead.",
  pov: "POV and turn: a moment from their life, no explanation, then a turn (the twist, the realisation, the fix).",
  week: "The week, before and after: a plan or week that breaks, then the same week that holds.",
  list: "Lists and rankings: three things, a tier list, a ranking, 'the one nobody does', a countdown.",
  verdict: "Verdicts: a habit on trial, a receipt, an error dialog, a report card, a diagnosis of the habit (never of the person).",
  howto: "How to, shown: a method demonstrated step by step on screen, so they can copy it tonight.",
  story: "Tiny stories: a three-beat story about a habit most students share, told in the narrator's voice with no personal claims.",
  versus: "Versus: two ways side by side (cram vs spaced, highlight vs test, tabs vs one question), and which wins.",
};

const SCHEMA = {
  type: "object",
  properties: {
    shapes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", description: "kebab-case id, unique, e.g. 'check-cold-recall'" },
          name: { type: "string" },
          purpose: { type: "string", description: "When to use it and what the viewer should feel or learn, in one or two sentences" },
          beats: {
            type: "array",
            description: "4 to 7 beats from 0s to the end card. Films run 20 to 45 seconds.",
            items: {
              type: "object",
              properties: {
                at: { type: "string", description: "Time range, e.g. '0-2s'" },
                job: { type: "string", description: "What this beat must do" },
                voice: { type: "string", description: "What kind of line the narrator says, with a short example" },
                screen: { type: "string", description: "What the viewer sees; the screen adds to the voice, never repeats it" },
              },
              required: ["at", "job", "voice", "screen"],
              additionalProperties: false,
            },
          },
          hook_styles: { type: "array", items: { type: "string" } },
          formats: { type: "array", items: { type: "string" }, description: "Format ids from the list that suit it" },
          pillars: { type: "array", items: { type: "string", enum: ["know-what-you-know", "methods", "life-around-study", "starting"] } },
          niches: { type: "array", items: { type: "string", enum: ["clinical", "analytical", "gcsealevel", "mentalhealth"] } },
          example: { type: "string", description: "A one-line logline of one film in this shape, for one account" },
        },
        required: ["id", "name", "purpose", "beats", "hook_styles", "formats", "pillars", "niches", "example"],
        additionalProperties: false,
      },
    },
  },
  required: ["shapes"],
  additionalProperties: false,
};

const args = process.argv.slice(2);
const per = Number(args[args.indexOf("--per") + 1]) || 8;
const [cat] = await sql`select detail from runs where kind = 'catalogue' order by at desc limit 1`;
const formats = (cat?.detail?.formats ?? []).map((f) => `- ${f.id} (${f.name}): ${f.shape}`).join("\n");
const ctx = [
  "You design script shapes for Offload's short vertical films (UK study app; four accounts: clinical, analytical, GCSE and A-level, and the time account). A shape is a reusable structure a writer fills from one specific moment in the viewer's life. Good shapes make the film easy to follow on the first watch: the hook is clear in two seconds, there is one idea, something changes every two to three seconds, the useful part comes before the product, and the product is explained in three short beats (it plans for you; it teaches and tests you; you just show up). Every shape ends on the Offload end card.",
  "--- brand/scripting.md ---\n" + brand("brand/scripting.md"),
  "--- brand/hook-styles.md ---\n" + brand("brand/hook-styles.md"),
  "--- brand/pillars.md ---\n" + brand("brand/pillars.md"),
  "--- Formats we can render ---\n" + formats,
].join("\n\n");

async function family(key) {
  const have = await sql`select id, name from shapes where id like ${key + "-%"}`;
  const need = per - have.length;
  if (need <= 0) return 0;
  const all = await sql`select id, name from shapes`;
  const out = await claude({
    task: `shapes-${key}`,
    stable: ctx,
    schema: SCHEMA,
    maxTokens: 24000,
    prompt: `Design ${need} new shapes in the family "${key}": ${FAMILIES[key]}
Every id must start with "${key}-". Make them genuinely different from each other (different mechanics, not different wording). Each should be usable across many films.

Shapes that already exist (do not repeat):
${all.map((s) => `- ${s.id}: ${s.name}`).join("\n") || "(none)"}`,
  });
  let added = 0;
  for (const s of out.shapes ?? []) {
    const id = String(s.id).toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (!id.startsWith(key + "-")) continue;
    const r = await sql`insert into shapes (id, name, purpose, beats, hook_styles, formats, pillars, niches, example)
      values (${id}, ${s.name}, ${s.purpose}, ${sql.json(s.beats)}, ${s.hook_styles}, ${s.formats}, ${s.pillars}, ${s.niches}, ${s.example})
      on conflict (id) do nothing returning id`;
    added += r.length;
  }
  return added;
}

const only = args.filter((a) => FAMILIES[a]);
const keys = Object.keys(FAMILIES);
if (only.length) for (const k of only) await family(k);
else await family(keys[0]);
// three at a time, with one retry each
const rest = only.length ? [] : keys.slice(1);
for (let i = 0; i < rest.length; i += 3)
  await Promise.all(rest.slice(i, i + 3).map((k) => family(k).catch(() => family(k)).catch((e) => console.error(`${k}: ${e.message}`))));

// the readable copy for people
const shapes = await sql`select * from shapes where status = 'live' order by id`;
const md = [
  "# Script shapes",
  "",
  `Generated by \`web/scripts/lead/shapes.mjs\` on ${new Date().toISOString().slice(0, 10)}. Do not edit by hand. ${shapes.length} shapes in ${keys.length} families. The writer picks one per film and fills it from one truth in the account's truth bank.`,
  "",
  ...keys.flatMap((k) => [
    `## ${k}`,
    "",
    FAMILIES[k],
    "",
    ...shapes
      .filter((s) => s.id.startsWith(k + "-"))
      .flatMap((s) => [
        `### ${s.name} (\`${s.id}\`)`,
        "",
        s.purpose,
        "",
        "| When | Job | Voice | Screen |",
        "| --- | --- | --- | --- |",
        ...s.beats.map((b) => `| ${b.at} | ${b.job} | ${b.voice} | ${b.screen} |`.replace(/\n/g, " ")),
        "",
        `Hook styles: ${s.hook_styles.join(", ")}. Formats: ${s.formats.join(", ")}. Accounts: ${s.niches.join(", ")}.`,
        "",
        `Example: ${s.example}`,
        "",
      ]),
  ]),
].join("\n");
fs.writeFileSync(path.join(root, "brand", "shapes.md"), md);
console.log(`${shapes.length} shapes -> brand/shapes.md`);
await sql.end();
