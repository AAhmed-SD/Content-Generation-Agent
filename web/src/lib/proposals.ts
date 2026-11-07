import { ourNumbers } from "../../scripts/our-numbers.mjs";
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
/** What a storyboard frame shows. Each one is drawn on the Hooks page, so it must be one of these. */
export const VISUALS = ["text", "curve", "curves", "bars", "notes", "flashcards", "question", "paper", "phone", "calendar", "chat", "list", "poster", "board", "chaos", "clock", "receipt", "stamp", "end"] as const;
export type Visual = (typeof VISUALS)[number];
export type Frame = { voice: string; screen: string; text?: string; visual?: Visual; ground?: "dark" | "paper" | "blue"; motion?: string };
export type Proposal = {
  id: string;
  niche: Niche;
  format: string;
  hookStyle: string;
  pillar: string;
  theme: string;
  title: string;
  openers: string[];
  look: string;
  storyboard: Frame[];
  reasoning: string;
  status: string;
  mediaUrl: string | null;
  rejections: { by: string; reason: string; at: string }[];
  createdAt: string;
  /** the script lead behind it */
  truth: string | null;
  shape: string | null;
  pattern: string | null;
  lead: "trend" | "truth" | null;
  trend: { name: string; recipe?: string | null; keep_swap?: string | null; example?: string | null } | null;
};
export type Message = { id: string; role: "person" | "desk"; author: string; text: string; revised: boolean; at: string };

// retired themes (brand/scripting.md): colour-coding, rereading, and the paused delay jokes
const RETIRED = /colou?r(-| )?cod|colou?ring (it )?in|re-?read|start(ing)? later|getting ready to start|afternoon disappeared|\bdelayed\b/i;
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
  pillar: (r.pillar as string) ?? "",
  theme: (r.theme as string) ?? "",
  title: (r.title as string) ?? "",
  openers: (r.openers as string[]) ?? [],
  look: (r.look as string) ?? "",
  storyboard: (r.storyboard as Frame[]) ?? [],
  reasoning: (r.reasoning as string) ?? "",
  status: r.status as string,
  mediaUrl: (r.media_url as string) ?? null,
  rejections: (r.rejections as Proposal["rejections"]) ?? [],
  createdAt: new Date(r.created_at as string).toISOString(),
  truth: (r.truth_text as string) ?? null,
  shape: (r.shape_name as string) ?? null,
  pattern: (r.pattern_text as string) ?? null,
  lead: (r.lead as Proposal["lead"]) ?? null,
  trend: (r.trend as Proposal["trend"]) ?? null,
});

export async function listProposals(status: "proposed" | "accepted" | "rejected", niche?: string) {
  // accepted means everything past the proposal: being made, rendered, approved, posted
  const rows = await db()`select c.*, t.text as truth_text, s.name as shape_name, h.pattern as pattern_text
    from content c left join truths t on t.id = c.truth_id left join shapes s on s.id = c.shape left join hook_patterns h on h.id = c.hook_pattern_id
    where c.kind = 'film'
    and (case when ${status} = 'accepted' then c.status not in ('proposed','rejected') else c.status = ${status} end)
    and (${niche ?? null}::text is null or c.niche = ${niche ?? null}) order by c.created_at desc limit 120`;
  return rows.map(toProposal);
}

/** Films per account per day (docs/architecture.md, Launch volume). */
export const FILMS_PER_DAY = 3;

/** Films started today (accepted, in the making, or further on), per account. London day. */
export async function startedToday() {
  const rows = await db()`select niche, count(*) as n from content where kind = 'film' and status not in ('proposed','rejected')
    and updated_at >= (date_trunc('day', now() at time zone 'Europe/London') at time zone 'Europe/London') group by niche`;
  return Object.fromEntries(rows.map((r) => [r.niche, Number(r.n)])) as Record<string, number>;
}

export async function proposalCounts() {
  const rows = await db()`select case when status in ('proposed','rejected') then status else 'accepted' end as status, count(*) as n
    from content where kind = 'film' group by 1`;
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
  // sorted, so the cached block stays byte-identical between calls
  const shapes = await db()`select id, name, purpose, formats from shapes where status = 'live' order by id`;
  const formats = (cat?.formats ?? []).map((f) => `- ${f.id} (${f.name}): ${f.shape} Suits: ${f.styles.join(", ")}.`).join("\n");
  return [
    "You are the producer on the Offload Marketing desk. Offload is a UK study app with four TikTok-first accounts: offload.clinical (medicine, dentistry, nursing, radiography), offload.analytical (maths, economics, computer science), offload.gcsealevel (GCSE and A-level, many under 18), offload.mentalhealth (the time account: students who struggle to start). You make short vertical videos. Follow the brand files exactly: one natural male narrator, the three-beat Offload explainer, the retired themes (never colour-coding or rereading), safety rules, and claims only from product-facts.",
    "--- brand/pillars.md (what films are about, and the mix) ---\n" + brand("brand/pillars.md"),
    "--- brand/brand.md ---\n" + brand("brand/brand.md"),
    "--- brand/scripting.md ---\n" + brand("brand/scripting.md"),
    "--- brand/hook-styles.md ---\n" + brand("brand/hook-styles.md"),
    "--- brand/safety.md ---\n" + brand("brand/safety.md"),
    "--- brand/product-facts.md (claims allowed) ---\n" + brand("brand/product-facts.md").slice(0, 24000),
    ...NICHES.map((n) => `--- brand/niches/${n}.md ---\n${brand(`brand/niches/${n}.md`)}`),
    ...NICHES.map((n) => `--- brand/niches/${n}-dossier.md (who they really are) ---\n${brand(`brand/niches/${n}-dossier.md`)}`),
    "--- Formats you may use (the format id must be one of these) ---\n" + formats,
    "--- brand/lessons.md (what we have learnt from our own films; this outranks the general rules where they differ) ---\n" + (brand("brand/lessons.md") || "(no lessons yet)"),
    "--- Script shapes (pick one per film by id; the writer follows its beats) ---\n" + shapes.map((x) => `- ${x.id} (${x.name}): ${x.purpose} Formats: ${x.formats.join(", ")}.`).join("\n"),
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
  const ours = await ourNumbers(sql, niches);
  // looks we kept: pieces pulled from Layouts and Inspiration, and recent inspiration not rejected
  const pulled = await sql`select name, fit from pulled where coalesce(status, '') <> 'rejected' order by created_at desc limit 12`;
  const kept = await sql`select title, summary from inspiration_items i where not exists (select 1 from rejected r where r.kind = 'inspiration' and r.value = i.url)
    order by collected_at desc limit 12`;
  const formats = await sql`select title, hook from virlo_items where kind = 'format' and collected_at > now() - interval '21 days' order by score desc nulls last limit 8`;
  // trend-led films start here: the formats creators are copying, and this account's outlier videos (Virlo)
  const trendFormats = await sql`select id, title, payload from virlo_items where kind = 'format' and collected_at > now() - interval '21 days'
    and coalesce((payload->>'is_sound_meme')::boolean, false) = false order by score desc nulls last limit 10`;
  const trendVideos = await sql`select id, niche, views, payload from (
      select v.*, row_number() over (partition by niche order by score desc nulls last) as k from virlo_items v
      where kind = 'video' and niche = any(${niches}) and collected_at > now() - interval '21 days') x where k <= ${niche ? 10 : 5}`;
  // the script lead: fresh truths in season (never one used in the last 60 days) and the live trend hook patterns
  const month = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", month: "numeric" }).format(new Date()));
  const truths = await sql`select id, niche, category, text from (
      select t.*, row_number() over (partition by niche order by uses, random()) as k from truths t
      where niche = any(${niches}) and status <> 'retired' and (cardinality(months) = 0 or ${month} = any(months))
        and not exists (select 1 from content c where c.truth_id = t.id and c.created_at > now() - interval '60 days')
    ) x where k <= ${niche ? 60 : 30} order by niche, id`;
  const patterns = await sql`select id, niche, pattern, why from (
      select h.*, row_number() over (partition by niche order by uses, random()) as k from hook_patterns h where niche = any(${niches}) and status = 'live'
    ) x where k <= ${niche ? 20 : 12} order by niche, id`;
  const trendLines = [
    ...trendFormats.map((t) => {
      const p = t.payload as Record<string, unknown>;
      const ex = ((p.examples as { url?: string; views?: number }[]) ?? [])[0];
      return `- T${t.id} [format · ${p.lifecycle ?? "?"} · ${p.creators_7d ?? "?"} creators this week] ${t.title}: ${String(p.recipe ?? "").slice(0, 260)} Stays the same: ${String(p.constant_part ?? "").slice(0, 160)} Swapped: ${String(p.swapped_part ?? "").slice(0, 120)}${ex?.url ? ` Example: ${ex.url}` : ""}`;
    }),
    ...trendVideos.map((v) => {
      const p = v.payload as Record<string, unknown>;
      const i = (p.intelligence as Record<string, unknown>) ?? {};
      return `- T${v.id} [${v.niche} outlier · ${v.views ?? "?"} views · ${i.content_format ?? "?"} · ${i.visual_format ?? "?"} · ${i.emotional_tone ?? "?"}] ${String(i.summary ?? p.description ?? "").slice(0, 260)}${i.hook_text ? ` Hook: "${String(i.hook_text).slice(0, 120)}"` : ""}${p.transcript ? ` Script opens: "${String(p.transcript).slice(0, 220)}"` : ""}`;
    }),
  ];
  return [
    "--- Trends to build from (trend-led films start from one of these; cite its id without the T) ---\n" + (trendLines.join("\n") || "(none yet)"),
    "--- Truths to build from (each film opens on exactly one; cite its id) ---\n" + (truths.map((t) => `- #${t.id} [${t.niche} · ${t.category}] ${t.text}`).join("\n") || "(the truth bank is empty)"),
    "--- Hook patterns trending now (hook A follows one; cite its id) ---\n" + (patterns.map((h) => `- #${h.id} [${h.niche}] ${h.pattern} (${h.why})`).join("\n") || "(none yet)"),
    "--- How our own posts did (this outranks everything below once groups have 3 or more posts; numbers are for choosing, never for the film) ---\n" +
      (ours || "Nothing back yet. Use the signals and research below."),
    "--- Working on UK TikTok now (shape only, never copy words or name accounts) ---\n" + signals.map((s) => `- [${s.niche}] ${s.ratio}x: ${String(s.text).slice(0, 160)}`).join("\n"),
    "--- What students are looking up this week ---\n" + research.map((r) => `- [${r.niche}] ${r.text}`).join("\n"),
    "--- Accepted ideas ---\n" + ideas.map((i) => `- ${i.title}: ${i.pitch}`).join("\n"),
    "--- Looks we have kept from Layouts and Inspiration (use them for the look and the format; never copy) ---\n" +
      [...pulled.map((p) => `- ${p.name}: ${String(p.fit ?? "").slice(0, 160)}`), ...kept.map((k) => `- ${k.title}${k.summary ? `: ${String(k.summary).slice(0, 140)}` : ""}`)].join("\n"),
    "--- Formats creators are copying right now (Virlo; the mechanic, never the content) ---\n" + (formats.map((f) => `- ${f.title}: ${String(f.hook ?? "").slice(0, 180)}`).join("\n") || "(none yet)"),
    "--- Rejected before, with reasons (learn from these) ---\n" + rejected.map((r) => `- [${r.niche}] ${r.hook} — ${((r.rejections as { reason: string }[]) ?? []).map((x) => x.reason).filter(Boolean).join("; ") || "no reason given"}`).join("\n"),
    "--- Recent hooks (do not repeat) ---\n" + recent.map((r) => `- [${r.niche}] ${r.hook}`).join("\n"),
  ].join("\n\n");
}

/** The schema Claude fills in for one proposal. */
const PROPOSAL_SCHEMA = {
  type: "object",
  properties: {
    niche: { type: "string", enum: ["clinical", "analytical", "gcsealevel", "mentalhealth"] },
    pillar: { type: "string", enum: ["know-what-you-know", "methods", "life-around-study", "starting"], description: "The content pillar from pillars.md" },
    format: { type: "string", description: "A format id from the list" },
    hook_style: { type: "string", description: "One style from hook-styles.md" },
    lead: { type: "string", enum: ["trend", "truth"], description: "trend: the film starts from a rising trend and copies its mechanic; truth: it starts from a moment in our audience's life" },
    trend_id: { type: "integer", description: "For a trend-led film, the id of the trend it starts from (the number after T); 0 for a truth-led film" },
    trend_use: { type: "string", description: "For a trend-led film: what we keep from the trend (structure, rhythm, visual mechanic, the joke's turn) and what we swap in for our audience, in one or two sentences; empty for truth-led" },
    template_fit: { type: "string", enum: ["fits", "needs_new"], description: "Does the chosen format really show this film, or does the trend need a template we do not have yet?" },
    template_idea: { type: "string", description: "When template_fit is needs_new: the template we should build, in two sentences (what it looks like, how it moves); otherwise empty" },
    truth_id: { type: "integer", description: "The id of the truth this film opens on, from the list for this account" },
    shape: { type: "string", description: "The id of the script shape it follows" },
    hook_pattern_id: { type: "integer", description: "The id of the trending hook pattern hook A follows, or 0 if none fits" },
    theme: { type: "string", description: "The takeaway: the one sentence a viewer should be able to repeat after one watch" },
    title: { type: "string", description: "Short working title" },
    openers: { type: "array", items: { type: "string" }, description: "Exactly two: hook A and hook B, two different first spoken lines" },
    look: { type: "string", description: "The visual look in one line: setting, colours, motion" },
    storyboard: {
      type: "array",
      description: "4 to 7 frames, from the hook to the Offload end card",
      items: {
        type: "object",
        properties: {
          voice: { type: "string", description: "What the narrator says" },
          screen: { type: "string", description: "What we see, in one sentence" },
          text: { type: "string", description: "The words on screen in this frame, at most eight; empty if none" },
          visual: {
            type: "string",
            enum: [...VISUALS],
            description:
              "The main picture, so the desk can sketch it: text (big words only), curve (forgetting curve), curves (cram vs spaced), bars, notes (handwritten notes or a blurt list), flashcards, question (exam-style question with options), paper (exam paper with ticks), phone (an app screen), calendar (a week with blocks), chat (message bubbles), list (ticks and crosses), poster, board (evidence board), chaos (things piling up or flying in), clock, receipt, stamp, end (the Offload end card)",
          },
          ground: { type: "string", enum: ["dark", "paper", "blue"], description: "Background: dark (science and launch-film look), paper (object formats), blue" },
          motion: { type: "string", description: "The movement in two to four words, e.g. 'cards flip', 'curve drops', 'screen shakes'" },
        },
        required: ["voice", "screen", "text", "visual", "ground", "motion"],
        additionalProperties: false,
      },
    },
    reasoning: { type: "string", description: "Why this should work: which of our own results, signal, research or idea it answers" },
  },
  required: ["niche", "pillar", "lead", "trend_id", "trend_use", "template_fit", "template_idea", "truth_id", "shape", "hook_pattern_id", "format", "hook_style", "theme", "title", "openers", "look", "storyboard", "reasoning"],
  additionalProperties: false,
};

function frameOf(f: Frame): Frame {
  const visual = (VISUALS as readonly string[]).includes(String(f.visual)) ? f.visual : undefined;
  const ground = ["dark", "paper", "blue"].includes(String(f.ground)) ? f.ground : undefined;
  return { voice: String(f.voice ?? "").slice(0, 300), screen: String(f.screen ?? "").slice(0, 300), text: String(f.text ?? "").slice(0, 80), visual, ground, motion: String(f.motion ?? "").slice(0, 40) };
}

const SHAPE = `{"niche": "clinical|analytical|gcsealevel|mentalhealth", "format": "<a format id from the list>", "hook_style": "<one style from hook-styles.md>", "theme": "<the idea in one line>", "title": "<short working title>", "openers": ["<hook A: the first spoken line>", "<hook B: a different opener for the same film>"], "look": "<the visual look in one line: setting, colours, motion>", "storyboard": [{"voice": "<what the narrator says>", "screen": "<what we see>", "text": "<on-screen words, max 8>", "visual": "<one of the visual kinds>", "ground": "dark|paper|blue", "motion": "<2-4 words>"}], "reasoning": "<why this should work: which of our own results, signal, research or idea it answers>"}`;

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
  const ask = `${await liveInputs(niche)}\n\nPropose ${count} new videos${niche ? ` for ${niche}` : ", spread across all four accounts"}.

Make it a hybrid batch: half TREND-LED and half TRUTH-LED (lead).
- Trend-led: start from one trend in the list (cite trend_id). Keep what makes it work (its structure, its rhythm, its visual mechanic, the turn of its joke) and swap in our audience and a truth from their life; say exactly what you keep and what you swap in trend_use. Our films are faceless motion graphics with one narrator, so rebuild the trend's mechanic on screen (objects, screens, type, diagrams): skip trends that only work with a person on camera, a dance, a real place or a licensed sound. Never copy words, never name the creator.
- Truth-led: as before, start from a truth, with a trending hook pattern where one fits.
- For both: pick the format that really shows the film. If the trend's look needs a template we do not have, set template_fit to needs_new and describe the template in template_idea, then still pick the closest format for now.

Each opens on one truth from the list for its account (cite truth_id; never two films on one truth), follows one script shape (cite shape; vary them), and hook A follows one trending hook pattern for its account where one fits (cite hook_pattern_id). Each needs a hook with two openers (A and B), the takeaway as the theme, a hook style, a format from the list, the look, and a storyboard of 4 to 7 frames that runs from the hook to the Offload end card. Follow the pillar mix in pillars.md: at least three from pillar 1 (know what you actually know), at least two science explainers in the science format (graphs and method demos: forgetting curve, spacing, testing effect, blurting, Feynman, applied questions), at most one from pillar 4 (starting), none of the paused delay jokes, and a mix of looks. Where our own posts show a format, hook style or pillar doing well on a platform, make more like it; drop what keeps doing badly. Keep about a fifth of the batch for new things, so we keep learning.`;
  const out = await claudeJson<{ proposals: Record<string, unknown>[] }>({
    task: "proposals",
    tier: "heavy",
    stable: await stableContext(),
    cacheTtl: "5m",
    system: "Propose videos. Vary hook styles and formats; never repeat a recent hook.",
    messages: [{ role: "user", content: ask }],
    schema: { type: "object", properties: { proposals: { type: "array", items: PROPOSAL_SCHEMA } }, required: ["proposals"], additionalProperties: false },
    maxTokens: 40000,
  });
  let starting = 0;
  const items = (out.proposals ?? []).filter((p) => valid(p, formats) && (p.pillar !== "starting" || starting++ < 1));
  const sql = db();
  const used = new Set<number>();
  for (const p of items) {
    // keep only lead ids that exist and belong to this account
    const [truth] = await sql`select id from truths where id = ${Number(p.truth_id) || 0} and niche = ${String(p.niche)}`;
    const truthId = truth && !used.has(truth.id) ? Number(truth.id) : null;
    if (truthId) used.add(truthId);
    const [shape] = await sql`select id from shapes where id = ${String(p.shape ?? "")}`;
    const [pattern] = await sql`select id from hook_patterns where id = ${Number(p.hook_pattern_id) || 0} and niche = ${String(p.niche)}`;
    if (truthId) await sql`update truths set uses = uses + 1, status = 'used' where id = ${truthId}`;
    if (shape) await sql`update shapes set uses = uses + 1 where id = ${shape.id}`;
    if (pattern) await sql`update hook_patterns set uses = uses + 1 where id = ${pattern.id}`;
    // trend-led: keep a snapshot of the trend it starts from (Virlo), so the writer can follow its rhythm
    const lead = p.lead === "trend" ? "trend" : "truth";
    const [tr] = lead === "trend" ? await sql`select id, kind, niche, title, url, views, payload from virlo_items where id = ${Number(p.trend_id) || 0}` : [];
    const trendSnap = tr
      ? {
          id: Number(tr.id),
          kind: tr.kind,
          name: tr.kind === "format" ? tr.title : ((tr.payload?.intelligence?.primary_topic as string) ?? tr.title),
          recipe: tr.payload?.recipe ?? tr.payload?.intelligence?.summary ?? null,
          keep_swap: String(p.trend_use ?? "").slice(0, 600),
          example: tr.kind === "format" ? (tr.payload?.examples?.[0]?.url ?? null) : tr.url,
          transcript: tr.payload?.transcript ? String(tr.payload.transcript).slice(0, 2000) : null,
          duration: tr.payload?.duration ?? null,
        }
      : null;
    // a trend that needs a look we do not have becomes a template idea on Ideas
    if (p.template_fit === "needs_new" && String(p.template_idea ?? "").trim())
      await sql`insert into ideas (id, title, kind, niche, pitch, status, frames, by, at)
        values (${"t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5)}, ${`Template for: ${String(trendSnap?.name ?? p.title ?? "a trend").slice(0, 100)}`}, 'Film format', ${String(p.niche)},
          ${String(p.template_idea).slice(0, 800)}, 'new', ${sql.json([])}, 'Proposals (trend needs a template)', ${new Date().toISOString().slice(0, 10)})`;
    await sql`insert into content (kind, niche, pillar, lead, trend, truth_id, shape, hook_pattern_id, format, title, hook, hook_style, theme, look, openers, storyboard, reasoning, status, created_by)
      values ('film', ${String(p.niche)}, ${String(p.pillar ?? "") || null}, ${trendSnap ? "trend" : "truth"}, ${trendSnap ? sql.json(trendSnap) : null}, ${truthId}, ${shape?.id ?? null}, ${pattern ? Number(pattern.id) : null}, ${String(p.format)}, ${String(p.title ?? p.theme).slice(0, 140)}, ${String((p.openers as string[])[0]).slice(0, 300)},
        ${String(p.hook_style ?? "")}, ${String(p.theme).slice(0, 400)}, ${String(p.look ?? "").slice(0, 400)},
        ${sql.json((p.openers as string[]).slice(0, 2).map((o) => String(o).slice(0, 300)))},
        ${sql.json((p.storyboard as Frame[]).slice(0, 8).map((f) => frameOf(f)))},
        ${String(p.reasoning ?? "").slice(0, 800)}, 'proposed', ${by})`;
  }
  return items.length;
}

/**
 * Accept, reject or put back a proposal. Decisions can be changed: a rejected film that was already made goes straight
 * back to Approval, and a film rejected while it is being made is left alone by the agent. Returns true when the film
 * still has to be made.
 */
export async function decide(id: string, decision: "accepted" | "rejected" | "proposed", by: string, reason = "") {
  const sql = db();
  const [row] = await sql`select status, media_url from content where id = ${id}`;
  if (!row) return false;
  if (decision === "rejected") {
    if (row.status === "scheduled" || row.status === "posted") return false; // already out: take it down on the platform instead
    await sql`update content set status = 'rejected', updated_at = now(),
      rejections = rejections || ${sql.json([{ by, reason: reason.slice(0, 400), at: new Date().toISOString() }])} where id = ${id}`;
    return false;
  }
  if (decision === "proposed") {
    await sql`update content set status = 'proposed', updated_at = now() where id = ${id}`;
    return false;
  }
  // accepting the idea is not a stamp on the film; a film that already exists goes back to Approval without stamps
  if (row.media_url) {
    await sql`update content set status = 'rendered', stamps = '{}', updated_at = now() where id = ${id}`;
    return false;
  }
  await sql`update content set status = 'accepted', updated_at = now() where id = ${id}`;
  return true;
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
  const current = JSON.stringify({ niche: p.niche, pillar: p.pillar, format: p.format, hook_style: p.hookStyle, theme: p.theme, title: p.title, openers: p.openers, look: p.look, storyboard: p.storyboard, reasoning: p.reasoning });
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
    await sql`update content set pillar = ${String(r.pillar ?? p.pillar) || null}, format = ${String(r.format ?? p.format)}, hook_style = ${String(r.hook_style ?? p.hookStyle)}, theme = ${String(r.theme ?? p.theme).slice(0, 400)},
      title = ${String(r.title ?? p.title).slice(0, 140)}, hook = ${String((r.openers as string[])[0]).slice(0, 300)}, look = ${String(r.look ?? p.look).slice(0, 400)},
      openers = ${sql.json((r.openers as string[]).slice(0, 2).map((o) => String(o).slice(0, 300)))},
      storyboard = ${sql.json((r.storyboard as Frame[]).slice(0, 8).map((f) => frameOf(f)))},
      reasoning = ${String(r.reasoning ?? p.reasoning).slice(0, 800)}, updated_at = now() where id = ${id}`;
    revised = true;
  }
  await sql`insert into messages (content_id, role, author, text, revised) values (${id}, 'desk', 'Desk', ${String(out.reply ?? "").slice(0, 3000)}, ${revised})`;
  return { reply: out.reply, revised };
}
