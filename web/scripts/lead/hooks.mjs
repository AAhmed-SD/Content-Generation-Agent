#!/usr/bin/env node
// Step 4 of the script lead: hooks from trends. Turns what is over-performing right now (our TikTok outliers, and
// Virlo's trending hooks once VIRLO_API_KEY is in) into hook patterns per account: the reusable shape of the opening
// line, with blanks, never the words. Run weekly (scripts/refresh.sh); patterns older than 45 days retire.
//
//   node scripts/lead/hooks.mjs [niche ...] [--per 30]     (from web/)
import { brand, claude, LABEL, NICHES, sql } from "./lib.mjs";

const SCHEMA = {
  type: "object",
  properties: {
    patterns: {
      type: "array",
      items: {
        type: "object",
        properties: {
          pattern: { type: "string", description: "The opening line's shape with [blanks], e.g. 'The [subject] question everyone gets wrong in [month]'" },
          why: { type: "string", description: "The mechanic: why it stops the scroll, in one line" },
          example: { type: "string", description: "One filled-in opening line for this account, under 12 words, spoken" },
          source: { type: "string", description: "The trending hook it was learnt from, paraphrased in a few words (no account names)" },
          ratio: { type: "number", description: "The source's views ÷ usual, or 0 if from Virlo" },
        },
        required: ["pattern", "why", "example", "source", "ratio"],
        additionalProperties: false,
      },
    },
  },
  required: ["patterns"],
  additionalProperties: false,
};

const args = process.argv.slice(2);
const per = Number(args[args.indexOf("--per") + 1]) || 30;
const which = args.filter((a) => NICHES.includes(a));

await sql`update hook_patterns set status = 'retired' where status = 'live' and created_at < now() - interval '45 days'`;
// what is working: every niche's outliers (a hook shape travels across niches), strongest first
const signals = await sql`select niche, ratio, coalesce(nullif(hook, ''), title) as text from signals
  where niche <> 'motion' and collected_at > now() - interval '30 days' and coalesce(nullif(hook, ''), title) is not null
  order by ratio desc limit 120`;
for (const niche of which.length ? which : NICHES) {
  // this account's Virlo finds first (its outliers and its own hook searches), then the education-wide ones
  const virlo = await sql`select niche, coalesce(nullif(hook, ''), title) as text, score from virlo_items
    where kind in ('hook', 'video') and niche in (${niche}, 'all') and collected_at > now() - interval '14 days'
    order by (niche = ${niche}) desc, score desc nulls last limit 80`.catch(() => []);
  const have = await sql`select pattern from hook_patterns where niche = ${niche} and status = 'live'`;
  // learn from every new pull: when 10 or more trending items arrived since this account's newest pattern,
  // add 10 patterns even if the account already has enough, so new data is never left unused
  const [{ fresh }] = await sql`select (select count(*) from virlo_items where niche in (${niche}, 'all') and kind in ('hook','video')
      and collected_at > coalesce((select max(created_at) from hook_patterns where niche = ${niche}), 'epoch'))
    + (select count(*) from signals where niche = ${niche} and collected_at > coalesce((select max(created_at) from hook_patterns where niche = ${niche}), 'epoch')) as fresh`;
  const need = Math.max(per - have.length, Number(fresh) >= 10 ? 10 : 0);
  if (need <= 0) {
    console.log(`${niche}: ${have.length} live patterns, nothing new to learn from`);
    continue;
  }
  const out = await claude({
    task: `hooks-${niche}`,
    schema: SCHEMA,
    maxTokens: 16000,
    prompt: `Learn the hook patterns from what is trending, and adapt them to this account: ${LABEL[niche]}.

A pattern is the shape of the first spoken line with [blanks]: the mechanic, never the words. It must make sense to a viewer in under two seconds, be specific once filled, and work for this audience. Write ${need} patterns, the strongest first, each learnt from a different trending hook where you can. Follow the hook styles and their sharp-edge rules, and the safety file. Never name a creator, brand or account.

Trending now on UK TikTok (views ÷ that account's usual, then the opening):
${signals.map((s) => `- ${s.ratio}x [${s.niche}] ${String(s.text).slice(0, 160)}`).join("\n")}
${virlo.length ? `\nTrending on Virlo:\n${virlo.map((v) => `- [${v.niche}] ${String(v.text).slice(0, 160)}`).join("\n")}` : ""}

Live patterns already (do not repeat):
${have.map((h) => `- ${h.pattern}`).join("\n") || "(none)"}

--- The account's dossier, for what fills the blanks ---
${brand(`brand/niches/${niche}-dossier.md`).slice(0, 40000)}

--- brand/hook-styles.md ---
${brand("brand/hook-styles.md")}

--- brand/safety.md ---
${brand("brand/safety.md")}`,
  });
  let added = 0;
  for (const p of out.patterns ?? []) {
    const r = await sql`insert into hook_patterns (niche, pattern, why, example, source, source_ratio)
      values (${niche}, ${String(p.pattern).slice(0, 200)}, ${String(p.why).slice(0, 300)}, ${String(p.example).slice(0, 200)}, ${String(p.source).slice(0, 200)}, ${Number(p.ratio) || null})
      on conflict (niche, lower(pattern)) do nothing returning id`;
    added += r.length;
  }
  // at most 60 live per account: the oldest retire first
  await sql`update hook_patterns set status = 'retired' where id in (select id from hook_patterns where niche = ${niche} and status = 'live' order by created_at desc offset 60)`;
  console.log(`${niche}: +${added} hook patterns`);
}
await sql.end();
