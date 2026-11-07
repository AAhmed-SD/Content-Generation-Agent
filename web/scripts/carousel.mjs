#!/usr/bin/env node
// The carousel agent: one carousel a day per account, for Instagram, TikTok and Facebook.
//
//   node scripts/carousel.mjs                 (from web/) every account that has no carousel in the last 20 hours
//   node scripts/carousel.mjs clinical --force
//
// 1. Claude writes 6 to 8 slides from what students are searching for this week (research), the truth bank, the
//    lessons and brand/posts/carousel.md: useful on its own, Offload one line at most.
// 2. Slides render at 1080x1350 (Instagram and Facebook, 4:5) with remotion/scripts/stills.mjs, and a 1080x1920
//    copy for TikTok (9:16) is padded with each slide's own background colour, never black bars.
// 3. A content row (kind 'carousel', status 'rendered') goes to Approval with captions for the three platforms.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { brand, claude, get, LABEL, NICHES, root, sql } from "./lead/lib.mjs";
import { storageReady, store } from "./storage.mjs";

const remotion = path.join(root, "remotion");
const specs = path.join(remotion, "src", "world", "posters", "carousels");
const out = path.join(remotion, "out", "carousels");
const HANDLE = { clinical: "offload.clinical", analytical: "offload.analytical", gcsealevel: "offload.gcsealevel", mentalhealth: "offload.mentalhealth" };

const SLIDE = {
  type: "object",
  description: "One slide. Fill only the fields its kind uses; leave the others as empty strings or empty lists.",
  properties: {
    kind: { type: "string", enum: ["point", "list", "card", "science", "end"] },
    kicker: { type: "string", description: "point: a 1-3 word label above the headline" },
    head: { type: "string", description: "point: the headline, under 12 words; use \\n for line breaks" },
    body: { type: "string", description: "point: one supporting sentence, optional" },
    note: { type: "string", description: "point: a handwritten sticky note, 2-6 words, optional" },
    stamp: { type: "string", description: "point: a one-word stamp, optional" },
    title: { type: "string", description: "list: the list's title" },
    rows: { type: "array", items: { type: "object", properties: { text: { type: "string" }, mark: { type: "string", enum: ["tick", "cross", ""] } }, required: ["text", "mark"], additionalProperties: false }, description: "list: 3 to 5 rows" },
    deck: { type: "string", description: "card: the deck name, e.g. 'Pharmacology'" },
    q: { type: "string", description: "card: a flashcard question" },
    a: { type: "string", description: "card: its answer" },
    technique: { type: "string", description: "science: the method's name (spacing, testing effect, blurting...)" },
    source: { type: "string", description: "science: a well-known study or source for the method, only if certain; else empty" },
    chart: { type: "string", enum: ["spacing", "testing", ""], description: "science: which chart" },
    lead: { type: "string", description: "end: a short line, e.g. 'Save this for mock week'" },
  },
  required: ["kind", "kicker", "head", "body", "note", "stamp", "title", "rows", "deck", "q", "a", "technique", "source", "chart", "lead"],
  additionalProperties: false,
};
const SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string", description: "Working title" },
    topic: { type: "string", description: "What students are looking up that this answers" },
    slides: { type: "array", items: SLIDE, description: "6 to 8 slides: a point slide as the cover (the question or promise), then the useful part, then an end slide" },
    captions: {
      type: "object",
      properties: { instagram: { type: "string" }, tiktok: { type: "string" }, facebook: { type: "string" } },
      required: ["instagram", "tiktok", "facebook"],
      additionalProperties: false,
    },
  },
  required: ["title", "topic", "slides", "captions"],
  additionalProperties: false,
};

/** The slide as the template takes it: only the fields its kind uses. */
function clean(s) {
  const keep = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== "" && !(Array.isArray(v) && !v.length)));
  if (s.kind === "point") return keep({ kind: "point", kicker: s.kicker, head: s.head, body: s.body, note: s.note, stamp: s.stamp });
  if (s.kind === "list") return { kind: "list", title: s.title, rows: s.rows.map((r) => keep({ text: r.text, mark: r.mark })) };
  if (s.kind === "card") return { kind: "card", deck: s.deck || "Revision", q: s.q, a: s.a, side: "back" };
  if (s.kind === "science") return { kind: "science", technique: s.technique, body: s.body || s.head, source: s.source || "", chart: s.chart || "spacing" };
  return { kind: "end", lead: s.lead || "Save this for later", pill: "offload" };
}

/** The colour of a slide's edge, for padding the TikTok copy. */
function edge(png) {
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", png, "-vf", "crop=1:1:4:4", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], { encoding: "buffer" });
  const b = r.stdout ?? Buffer.from([243, 239, 228]);
  return `0x${[b[0], b[1], b[2]].map((x) => (x ?? 0).toString(16).padStart(2, "0")).join("")}`;
}

async function make(niche) {
  const research = await sql`select text from research_items where niche = ${niche} order by collected_at desc limit 20`;
  const truths = await sql`select text from truths where niche = ${niche} and status <> 'retired' order by uses, random() limit 25`;
  const recent = await sql`select title from content where kind = 'carousel' and niche = ${niche} order by created_at desc limit 20`;
  const out1 = await claude({
    task: `carousel-${niche}`,
    model: "claude-sonnet-5-5",
    schema: SCHEMA,
    maxTokens: 16000,
    stable: [
      `You write one Instagram, TikTok and Facebook carousel for ${LABEL[niche]}. A carousel is saved and shared because it is genuinely useful, even to someone who never uses Offload. Follow brand/posts/carousel.md, the scripting rules on clarity (say it is about studying, assume nothing, name the thing then explain why), safety, and claims only from product-facts. No prices, no links, no trial call to action (it is not written yet), no invented numbers, no other brand or app named. British English.`,
      "--- brand/posts/carousel.md ---\n" + brand("brand/posts/carousel.md"),
      "--- brand/scripting.md ---\n" + brand("brand/scripting.md"),
      "--- brand/lessons.md ---\n" + (brand("brand/lessons.md") || "(none yet)"),
      "--- brand/platforms.md ---\n" + brand("brand/platforms.md"),
      "--- brand/safety.md ---\n" + brand("brand/safety.md"),
      `--- brand/niches/${niche}.md ---\n` + brand(`brand/niches/${niche}.md`),
      "--- brand/product-facts.md ---\n" + brand("brand/product-facts.md").slice(0, 20000),
    ].join("\n\n"),
    prompt: `Write today's carousel.

What students are looking up this week (pick one and answer it properly):
${research.map((r) => `- ${r.text}`).join("\n") || "(no research this week: answer a common, specific study question for this audience)"}

Moments from their lives, to make it recognisable:
${truths.map((t) => `- ${t.text}`).join("\n")}

Carousels already made (do not repeat):
${recent.map((r) => `- ${r.title}`).join("\n") || "(none)"}

Shape: a cover that names the study problem or promise in plain words; then the useful part (the method, why it works, the mistake most people make), one idea per slide, under 12 words of headline each; then an end slide whose lead tells them to save or send it. Offload gets one plain line at most, before the end slide, or none. Captions follow platforms.md for Instagram, TikTok and Facebook.`,
  });
  const slides = (out1.slides ?? []).map(clean);
  if (slides.length < 4) throw new Error("the carousel came back with too few slides");
  if (slides.at(-1).kind !== "end") slides.push({ kind: "end", lead: "Save this for later", pill: "offload" });

  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
  const slug = `${niche}-${day}-${String(out1.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40)}`;
  fs.mkdirSync(specs, { recursive: true });
  fs.writeFileSync(path.join(specs, `${slug}.json`), JSON.stringify({ handle: HANDLE[niche], slides }, null, 1));
  const r = spawnSync(process.execPath, ["scripts/stills.mjs", slug], { cwd: remotion, encoding: "utf8" });
  if (r.status !== 0) throw new Error(`rendering the slides failed: ${(r.stdout + r.stderr).slice(-400)}`);
  // the TikTok copy: 9:16, padded with the slide's own background
  const dir = path.join(out, slug);
  const files = fs.readdirSync(dir).filter((f) => /^\d+\.png$/.test(f)).sort();
  for (const f of files) {
    const src = path.join(dir, f);
    spawnSync("ffmpeg", ["-v", "error", "-y", "-i", src, "-vf", `pad=1080:1920:0:285:color=${edge(src)}`, path.join(dir, `tt-${f}`)]);
  }
  // copies in storage, so the hosted desk can show them
  if (storageReady(get)) for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".png"))) await store(get, path.join(dir, f), `carousels/${slug}/${f}`).catch((e) => console.error(`storage: ${e.message}`));
  const [row] = await sql`insert into content (kind, niche, title, theme, status, media_url, spec, captions, created_by)
    values ('carousel', ${niche}, ${String(out1.title).slice(0, 140)}, ${String(out1.topic).slice(0, 400)}, 'rendered', ${`carousels/${slug}`},
      ${sql.json({ slides, files: files.map((f) => `carousels/${slug}/${f}`), tiktok: files.map((f) => `carousels/${slug}/tt-${f}`) })},
      ${sql.json(out1.captions)}, 'Carousel agent') returning id`;
  console.log(`${niche}: ${slug} (${files.length} slides) -> ${row.id}`);
}

const args = process.argv.slice(2);
const force = args.includes("--force");
const which = args.filter((a) => NICHES.includes(a));
for (const niche of which.length ? which : NICHES) {
  const [{ n }] = await sql`select count(*)::int as n from content where kind = 'carousel' and niche = ${niche} and status <> 'rejected' and created_at > now() - interval '20 hours'`;
  if (n && !force) {
    console.log(`${niche}: a carousel was made in the last 20 hours`);
    continue;
  }
  await make(niche).catch((e) => console.error(`${niche}: ${e.message}`));
}
await sql.end();
