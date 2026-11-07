#!/usr/bin/env node
// Step 2 of the script lead: the truth bank. Every film starts from one truth: a specific, recognisable moment in the
// viewer's life. 400 per account, 50 in each of eight categories, written from the account's dossier.
//
//   node scripts/lead/truths.mjs [niche ...] [--per 50]     (from web/)
//   node scripts/lead/truths.mjs --grow                     (for the schedule: when an account has fewer than 150
//                                                            fresh truths left, add 25 more to every category)
//
// Re-running tops each category up to --per; it never duplicates (unique on the text).
import { brand, claude, LABEL, NICHES, sql } from "./lib.mjs";

export const CATEGORIES = {
  calendar: "Moments tied to a point in their year: a term, a placement block, mocks, results day, applications, a holiday, the week before an exam. Say when.",
  assessments: "Moments with a specific assessment they actually sit, by its real name or format (a paper, an OSCE station, a problem sheet, a practical, coursework, a progress test).",
  habits: "What they actually do when they sit down to study, and what they do instead: the real, specific habits, good and bad.",
  tools: "Moments with the screens, apps, notes, question banks, past papers, recordings, tabs and group chats they study with.",
  life: "Life around study: shifts, part-time jobs, commutes, family, housing, money, friends, sport, sleep, food, the group chat.",
  beliefs: "Things they believe about memory, revision, exams and time, stated the way they would say it, some true and some not.",
  feelings: "Self-talk and feelings: what they tell themselves, what makes them feel behind, the quiet panic, the guilt, the relief.",
  wins: "Small wins and moments of being on top of it: the good days, the click of understanding, the plan that held.",
  neuro: "(Time account only.) Moments neurodivergent students know (ADHD, autism, dyslexia, executive-function struggles): time that slips, starting being the hard part, too many open loops, switching between tasks, sensory overload in the library, the plan that only works on a good day. Describe the experience in their words; never name a condition as the viewer's, never diagnose, never joke about it.",
};
const PILLARS = ["know-what-you-know", "methods", "life-around-study", "starting"];

const SCHEMA = {
  type: "object",
  properties: {
    truths: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: { type: "string", description: "One concrete moment, 8 to 28 words, in plain UK English, the way the viewer would recognise it" },
          months: { type: "array", items: { type: "integer" }, description: "Months (1-12) when it is most true; empty if any time of year" },
          pillar: { type: "string", enum: PILLARS },
          feeling: { type: "string", description: "The feeling in one or two words" },
          offload: { type: "string", description: "How Offload answers it in one plain line, using only product-facts; or 'none' if it does not" },
        },
        required: ["text", "months", "pillar", "feeling", "offload"],
        additionalProperties: false,
      },
    },
  },
  required: ["truths"],
  additionalProperties: false,
};

function stable(niche) {
  return [
    `You build the truth bank for one Offload account: ${LABEL[niche]}. A truth is one specific, recognisable moment from the viewer's real life that a short film can open on. The viewer should think "that is literally me". Every film on this account will start from one of these, so they must be varied, specific, true, and safe.`,
    `Rules for every truth:
- One moment, not a category. "Opening the problem sheet at 10:58pm for the 9am tutorial" beats "leaving work late".
- Specific to this audience and to the UK: their courses, exams, places, words. Real assessment names are good. No made-up facts.
- No statistics, percentages, grades or counts presented as facts. Clock times, days and weeks are fine.
- Never name a creator, a person, a school, a university, a company or another app. Generic tool types are fine ("the question bank", "the flashcard app", "past papers").
- Retired themes, never: colour-coding or making a timetable pretty; rereading notes or worked solutions; "delay" jokes ("I'll start later", "getting ready to start", "the afternoon disappeared").
- Safety: follow safety.md. On the time account never diagnose or imply a condition. GCSE and A-level viewers are often under 18.
- Vary the wording: do not start more than a few with the same words.`,
    "--- The account's dossier ---\n" + brand(`brand/niches/${niche}-dossier.md`),
    "--- The account file ---\n" + brand(`brand/niches/${niche}.md`),
    "--- brand/pillars.md ---\n" + brand("brand/pillars.md"),
    "--- brand/safety.md ---\n" + brand("brand/safety.md"),
    "--- brand/product-facts.md (the only claims for the 'offload' field) ---\n" + brand("brand/product-facts.md").slice(0, 30000),
  ].join("\n\n");
}

async function fill(niche, category, per, ctx) {
  const have = await sql`select text from truths where niche = ${niche} and category = ${category}`;
  const need = per - have.length;
  if (need <= 0) return 0;
  const others = await sql`select text from truths where niche = ${niche} and category <> ${category} order by random() limit 120`;
  const out = await claude({
    task: `truths-${process.argv.includes("--grow") ? "grow-" : ""}${niche}-${category}`, // topping up is running cost; the first bank is build
    stable: ctx,
    schema: SCHEMA,
    maxTokens: 24000,
    prompt: `Write ${need} new truths in the category "${category}": ${CATEGORIES[category]}

Spread them across the sub-groups in the dossier and across the year. Mix the pillars, leaning on know-what-you-know where it fits naturally.

Already in this category (do not repeat or near-repeat):
${have.map((h) => `- ${h.text}`).join("\n") || "(none)"}

A sample from other categories (do not repeat these either):
${others.map((h) => `- ${h.text}`).join("\n") || "(none)"}`,
  });
  let added = 0;
  for (const t of out.truths ?? []) {
    const text = String(t.text ?? "").trim();
    if (text.length < 12) continue;
    const r = await sql`insert into truths (niche, text, category, months, pillar, feeling, offload, source)
      values (${niche}, ${text.slice(0, 300)}, ${category}, ${(t.months ?? []).filter((m) => m >= 1 && m <= 12)}, ${PILLARS.includes(t.pillar) ? t.pillar : null},
        ${String(t.feeling ?? "").slice(0, 60)}, ${String(t.offload ?? "").slice(0, 300)}, 'dossier')
      on conflict (niche, lower(text)) do nothing returning id`;
    added += r.length;
  }
  return added;
}

async function niche(n, per) {
  const ctx = stable(n);
  if (!brand(`brand/niches/${n}-dossier.md`)) throw new Error(`no dossier for ${n}: run scripts/lead/dossier.mjs first`);
  // neurodivergent moments belong to the time account only
  const cats = Object.keys(CATEGORIES).filter((c) => c !== "neuro" || n === "mentalhealth");
  // the first call writes the cache; the rest read it
  let total = await fill(n, cats[0], per, ctx);
  const rest = await Promise.all(cats.slice(1).map((c) => fill(n, c, per, ctx).catch((e) => (console.error(`${n}/${c}: ${e.message}`), 0))));
  total += rest.reduce((a, b) => a + b, 0);
  const [{ count }] = await sql`select count(*)::int from truths where niche = ${n}`;
  console.log(`${n}: +${total}, ${count} in the bank`);
}

const args = process.argv.slice(2);
const per = Number(args[args.indexOf("--per") + 1]) || 50;
const which = args.filter((a) => NICHES.includes(a));
for (const n of which.length ? which : NICHES) {
  let target = per;
  if (args.includes("--grow")) {
    const [{ fresh, most }] = await sql`select count(*) filter (where status = 'fresh')::int as fresh,
      coalesce(max(c), 0)::int as most from truths, lateral (select count(*) as c from truths t2 where t2.niche = truths.niche and t2.category = truths.category) x where niche = ${n}`;
    if (fresh >= 150) {
      console.log(`${n}: ${fresh} fresh truths, no top-up needed`);
      continue;
    }
    target = most + 25;
  }
  await niche(n, target).catch((e) => console.error(`${n}: ${e.message}`));
}
await sql.end();
