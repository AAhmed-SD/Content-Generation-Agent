#!/usr/bin/env node
// Virlo: what is working in short video, into marketing.virlo_items, for the script lead.
//   - hooks: the top education hooks of the week (and, weekly, hooks found with each account's own phrases)
//   - videos: UK outlier videos per account, with the transcript of the top three (the script, to learn shapes from)
//   - formats: content trends, the repeatable formats creators are copying (weekly)
// scripts/lead/hooks.mjs turns hooks into hook patterns; scripts/lead/trend-shapes.mjs turns transcripts and formats
// into trend shapes. Runs from scripts/refresh.sh; at most once a day. Per account: outlier search and the top three
// scripts daily, a hook search every other day. Across all: top education hooks and copied formats weekly.
// About $0.82 a day on average, roughly $25 a month.
//
//   node scripts/virlo.mjs [--force]        (from web/)
//
// API: https://api.virlo.ai/v1, Bearer key, spec at https://api.virlo.ai/openapi.json. Prices from the spec
// (2026-11-07): hooks $0.25, video search $0.05 a page, transcript $0.01, content trends $0.25.
// A floor (VIRLO_MIN_CREDITS, default 300 = $3) stops the pull before the balance gets low.
import { get, NICHES, sql } from "./lead/lib.mjs";

const key = get("VIRLO_API_KEY");
if (!key) {
  console.log("virlo: no VIRLO_API_KEY, skipped");
  await sql.end();
  process.exit(0);
}
const force = process.argv.includes("--force");
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
const [{ ran }] = await sql`select count(*)::int as ran from runs where kind = 'virlo' and detail->>'day' = ${today}`;
if (ran && !force) {
  console.log("virlo: already pulled today");
  await sql.end();
  process.exit(0);
}
const [{ weekly }] = await sql`select count(*)::int = 0 as weekly from runs where kind = 'virlo' and (detail->>'weekly')::boolean and at > now() - interval '6.5 days'`;

const BASE = "https://api.virlo.ai/v1";
async function call(method, pathname, body) {
  const res = await fetch(BASE + pathname, {
    method,
    headers: { authorization: `Bearer ${key}`, accept: "application/json", ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(90_000),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`${method} ${pathname.split("?")[0]}: ${res.status} ${json?.message ?? ""}`.trim());
  return json;
}

// each account's searches: every topic item must match; "|" separates alternatives. Two per account, used on
// alternate days. Neurodivergent students are the time account's audience only.
const TOPICS = {
  clinical: [
    ["medical school|med school|medical student|medicine|dental student|dentistry|nursing student|radiography", "revision|exam|study|osce|placement"],
    ["pharmacy|midwifery|physiotherapy|biomedical science|biology degree|healthcare student|science degree", "revision|exam|study|uni|placement"],
  ],
  analytical: [
    ["engineering|physics|maths|math|mathematics", "study|revision|exam|problem sheet|uni"],
    ["statistics|data science|computer science|economics|further maths|a level maths", "study|revision|exam|uni"],
  ],
  gcsealevel: [
    ["gcse|year 10|year 11", "revision|exam|study|mocks"],
    ["a level|a-level|year 12|year 13|sixth form", "revision|exam|study|mocks"],
  ],
  mentalhealth: [
    ["adhd|autism|autistic|neurodivergent|dyslexia|executive dysfunction", "study|revision|student|uni|homework|school"],
    ["procrastination|time management|time blindness|getting started|focus", "study|revision|student|uni|homework"],
  ],
};
// each account's phrases for the hook search, one per run, in rotation
const PHRASES = {
  clinical: ["medical school", "med student", "nursing student", "dental student", "osce", "placement"],
  analytical: ["engineering student", "physics", "maths", "problem sheet", "data science"],
  gcsealevel: ["gcse", "a level", "revision", "mocks", "year 11"],
  mentalhealth: ["procrastinating", "adhd", "autistic", "executive dysfunction", "can't start"],
};
const dayNo = Math.floor(Date.parse(today) / 864e5);
const hookDay = dayNo % 2 === 0; // the per-account hook search runs every other day

const counts = { hooks: 0, videos: 0, transcripts: 0, formats: 0 };
async function save(kind, niche, it, extra = {}) {
  // one row per item: a hook by its text (the same hook comes back day after day), a video or format by its id
  const id = kind === "hook" ? `${niche}:${String(extra.hook ?? "").toLowerCase().replace(/\s+/g, " ").slice(0, 200)}` : String(extra.id ?? it.id ?? extra.url ?? "");
  await sql`insert into virlo_items (kind, niche, platform, region, external_id, title, hook, url, views, score, payload)
    values (${kind}, ${niche}, ${extra.platform ?? it.platform ?? null}, ${extra.region ?? null}, ${id},
      ${String(extra.title ?? "").slice(0, 300)}, ${String(extra.hook ?? "").slice(0, 600)}, ${extra.url ?? null},
      ${Number(extra.views) || null}, ${Number(extra.score) || null}, ${sql.json(it)})
    on conflict (kind, external_id) do update set payload = excluded.payload, views = excluded.views, score = excluded.score, collected_at = now()`;
}

try {
  const bal = await call("GET", "/account/balance");
  const credits = Number(bal?.data?.credits_remaining);
  const floor = Number(get("VIRLO_MIN_CREDITS") || 300);
  if (Number.isFinite(credits) && credits < floor) throw new Error(`${credits} credits left, under the floor of ${floor}; top up or lower VIRLO_MIN_CREDITS`);

  // 1. weekly: the top education hooks across all of Virlo
  const top = !(weekly || force) ? null : await call("GET", "/hooks/trending?category=education&language=en&days=7&limit=100&content_type=video");
  for (const h of top?.data ?? []) {
    await save("hook", "all", h, { platform: h.platform, hook: h.hook_text, url: h.video?.url, views: h.video?.views ?? h.video?.stats?.views, score: h.weighted_score, title: h.hook_type });
    counts.hooks++;
  }

  for (const niche of NICHES) {
    // 2. UK outliers for this account, and the scripts of the top three
    const found = await call("POST", "/search/videos", { scope: "virlo_library", topics: TOPICS[niche][dayNo % 2], regions: ["GB"], languages: ["en"], outliers_only: true, sort: "most_viral", posted_after: new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10) }).catch((e) => (console.error(`virlo ${niche} search: ${e.message}`), null));
    const videos = found?.data?.videos ?? [];
    for (const [i, v] of videos.entries()) {
      let transcript = null;
      if (i < 3 && (v.platform === "tiktok" || v.platform === "youtube") && v.url) {
        const t = await call("GET", `/raw/${v.platform}/video/transcript?url=${encodeURIComponent(v.url)}`).catch(() => null);
        if (t?.data?.has_transcript && t.data.text) {
          transcript = t.data.text;
          counts.transcripts++;
        }
      }
      await save("video", niche, { ...v, transcript }, { platform: v.platform, region: v.upload_region, title: v.description, hook: v.intelligence?.hook ?? v.description, url: v.url, views: v.views, score: v.virality_score });
      counts.videos++;
    }
    // 3. every other day: hooks built on one of this account's phrases
    if (hookDay || force) {
      const phrase = PHRASES[niche][Math.floor(dayNo / 2) % PHRASES[niche].length];
      const s = await call("GET", `/hooks/search?q=${encodeURIComponent(phrase)}&language=en&limit=50`).catch((e) => (console.error(`virlo ${niche} hooks: ${e.message}`), null));
      for (const h of s?.data ?? []) {
        await save("hook", niche, h, { platform: h.platform, hook: h.hook_text, url: h.video?.url, views: h.video?.views, score: h.weighted_score, title: h.hook_type });
        counts.hooks++;
      }
    }
  }

  // 4. weekly: the formats creators are copying, brand-safe, new or rising
  if (weekly || force) {
    const f = await call("GET", "/content-trends?lifecycle=new,rising&brand_safety=safe&language=en&limit=50&examples=2").catch((e) => (console.error(`virlo formats: ${e.message}`), null));
    for (const t of f?.data ?? []) {
      await save("format", "all", t, { title: t.name, hook: t.recipe, views: t.views_total, score: t.creators_7d, region: t.region });
      counts.formats++;
    }
  }

  const after = await call("GET", "/account/balance").catch(() => null);
  const left = Number(after?.data?.credits_remaining);
  const spent = Number.isFinite(credits) && Number.isFinite(left) ? (credits - left) / 100 : null;
  await sql`insert into runs (kind, detail) values ('virlo', ${sql.json({ day: today, weekly: weekly || force, counts, spent, credits_left: left })})`;
  console.log(`virlo: ${JSON.stringify(counts)}, spent $${spent?.toFixed(2)}, ${left} credits left`);
} catch (e) {
  console.error(`virlo: ${e.message}`);
}
await sql.end();
