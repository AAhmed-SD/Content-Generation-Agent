// The content agent: turn one accepted proposal into a finished film.
//
//   node scripts/agent.mjs <content-id> [--note "what to change"]     (from web/, on the Mac)
//
// 1. Claude (Opus, brand context cached) writes script.json and spec.json for the proposal, in the exact shape of an
//    existing film in the same format and that format's TypeScript type.
// 2. Checks: the spec matches the example's shape, every time ref lands on a real word, no retired theme, line ids
//    run L1, L2, ... If a check fails, Claude gets the errors back and fixes them (two retries).
// 3. The film is written to remotion/src/world/bank/<id>/, voiced (one male voice), rendered, and the content row
//    moves to 'rendered' with media_url = bank/offload-<id>.mp4 (served by the desk's /desk/library/file route).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import postgres from "postgres";
import { ourNumbers } from "./our-numbers.mjs";
import { checkBudget } from "./budget.mjs";
import { storageReady, store } from "./storage.mjs";

const web = process.cwd();
const root = path.join(web, "..");
const remotion = path.join(root, "remotion");
const bank = path.join(remotion, "src", "world", "bank");
const env = Object.fromEntries(
  (fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "")
    .split("\n")
    .map((l) => l.match(/^\s*([A-Z_]+)\s*=\s*"?(.*?)"?\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);
const get = (k) => process.env[k] || env[k];
const sql = postgres({ host: get("MARKETING_DB_HOST"), port: Number(get("MARKETING_DB_PORT") || 6543), database: "postgres", username: get("MARKETING_DB_USER"), password: get("MARKETING_DB_PASSWORD"), ssl: "require", prepare: false, max: 1, connection: { search_path: "marketing" } });

const VOICE = { voice: "bm_fable*0.65+bm_george*0.35", lang: "en-gb", speed: 0.98, gap: 0.38, takes: "line", master: true };
const SILENT = new Set(["pov", "chat"]); // no narrator: timing comes from spec.duration
// retired themes (brand/scripting.md): colour-coding, rereading, and the paused delay jokes
const RETIRED = /colou?r(-| )?cod|colou?ring (it )?in|re-?read|start(ing)? later|getting ready to start|afternoon disappeared|\bdelayed\b/i;
const PREFIX = { clinical: "clinical", analytical: "analytical", gcsealevel: "gcse", mentalhealth: "time" };
const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "");
const brand = (f) => read(path.join(root, f));

// ---------- the format's type and an example film ----------

/** The `export type ...` statement for a format, from the kit files (or the scene Spec in Film.tsx). */
function formatType(format) {
  const files = ["kit.tsx", "kit2.tsx", "kit3.tsx", "kit4.tsx", "kit5.tsx"].map((f) => path.join(remotion, "src", "world", "formats", f));
  const film = path.join(remotion, "src", "world", "bank", "Film.tsx");
  const grab = (src, start) => {
    const lines = src.split("\n");
    let i = start;
    while (i > 0 && !lines[i].startsWith("export type")) i--;
    let depth = 0;
    const out = [];
    for (let j = i; j < lines.length; j++) {
      out.push(lines[j]);
      for (const ch of lines[j]) depth += ch === "{" ? 1 : ch === "}" ? -1 : 0;
      if (depth <= 0 && lines[j].trim().endsWith(";")) break;
    }
    return out.join("\n");
  };
  if (format === "scene") {
    const src = read(film);
    return grab(src, src.split("\n").findIndex((l) => l.startsWith("export type Spec =")));
  }
  for (const f of files) {
    const src = read(f);
    const idx = src.split("\n").findIndex((l) => l.includes(`format: "${format}"`));
    if (idx >= 0) return grab(src, idx);
  }
  return "";
}

/** The newest film already in the bank with this format: its script and spec are the shape to copy. */
function example(format) {
  const dirs = fs.readdirSync(bank, { withFileTypes: true }).filter((d) => d.isDirectory());
  const match = dirs
    .map((d) => ({ id: d.name, spec: JSON.parse(read(path.join(bank, d.name, "spec.json")) || "{}"), mtime: fs.statSync(path.join(bank, d.name)).mtimeMs }))
    .filter((d) => (d.spec.format ?? "scene") === format)
    .sort((a, b) => b.mtime - a.mtime)[0];
  if (!match) return null;
  return { id: match.id, spec: match.spec, script: JSON.parse(read(path.join(bank, match.id, "script.json")) || "null") };
}

// ---------- checks ----------

const REF = /^(L\d+)(\$?)(?::([^#@]+))?(?:#(\d+))?(?:@([+-]?\d*\.?\d+))?$/;
const norm = (w) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const kind = (v) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);

/** The spec must have the example's keys with the same kinds of value (deep, using the first array item). */
function shapeErrors(example, spec, at = "spec") {
  const errs = [];
  if (kind(example) !== kind(spec)) return [`${at} should be ${kind(example)}, got ${kind(spec)}`];
  if (kind(example) === "array") {
    if (!spec.length && example.length) errs.push(`${at} is empty`);
    if (example.length && spec.length) for (const [i, item] of spec.entries()) errs.push(...shapeErrors(example[0], item, `${at}[${i}]`));
  } else if (kind(example) === "object") {
    for (const k of Object.keys(example)) {
      if (k === "id") continue;
      if (!(k in spec)) {
        errs.push(`${at}.${k} is missing`);
        continue;
      }
      // a time ref and a plain number both mean "when"; allow either where the example used a ref
      if (typeof example[k] === "string" && REF.test(example[k]) && typeof spec[k] === "string") continue;
      errs.push(...shapeErrors(example[k], spec[k], `${at}.${k}`));
    }
  }
  return errs;
}

function refErrors(spec, lines) {
  const said = Object.fromEntries(lines.map((l) => [l.id, l.say.split(/\s+/).map(norm)]));
  const errs = [];
  const walk = (o, at) => {
    if (Array.isArray(o)) o.forEach((v, i) => walk(v, `${at}[${i}]`));
    else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) walk(v, `${at}.${k}`);
    else if (typeof o === "string" && REF.test(o)) {
      const [, id, , word, nth] = o.match(REF);
      if (!said[id]) errs.push(`${at} = "${o}": there is no line ${id}`);
      else if (word && said[id].filter((w) => w === norm(word)).length < Number(nth || 1)) errs.push(`${at} = "${o}": "${word}" is not spoken in ${id} ("${lines.find((l) => l.id === id).say}")`);
    }
  };
  walk(spec, "spec");
  return errs;
}

function check(draft, ex, format) {
  const errs = [];
  if (!SILENT.has(format)) {
    if (!Array.isArray(draft.lines) || draft.lines.length < 3) errs.push("lines: need at least 3 spoken lines");
    else
      draft.lines.forEach((l, i) => {
        if (l.id !== `L${i + 1}`) errs.push(`lines[${i}].id should be L${i + 1}`);
        if (!l.say?.trim()) errs.push(`lines[${i}].say is empty`);
        if (l.say && l.say.length > 140) errs.push(`lines[${i}].say is too long (${l.say.length} characters; keep under 140 so the voice holds)`);
      });
  }
  if (ex) errs.push(...shapeErrors(ex.spec, draft.spec).slice(0, 15));
  if (!SILENT.has(format) && Array.isArray(draft.lines)) errs.push(...refErrors(draft.spec, draft.lines).slice(0, 15));
  if (RETIRED.test(JSON.stringify(draft))) errs.push("uses a retired theme (colour-coding or rereading)");
  return errs;
}

// ---------- Claude ----------

const PRICE = { "claude-opus-5-5": [4, 20, 5, 0.2], "claude-sonnet-5-5": [2, 10, 2.5, 0.1] };
async function claude({ stable, system, messages, schema, maxTokens = 16000, light = false, task = "agent-script" }) {
  await checkBudget(sql, 0.05);
  // light: Sonnet, half the price, for reviewing and captions; heavy: Opus, for writing
  const model = light ? get("ANTHROPIC_MODEL_LIGHT") || "claude-sonnet-5-5" : get("ANTHROPIC_MODEL_HEAVY") || get("ANTHROPIC_MODEL") || "claude-opus-5-5";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": get("ANTHROPIC_API_KEY"), "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      thinking: { type: "adaptive" },
      system: [{ type: "text", text: stable, cache_control: { type: "ephemeral" } }, { type: "text", text: system }],
      messages,
      output_config: { format: { type: "json_schema", schema } },
    }, (_k, v) => (typeof v === "string" ? v.toWellFormed() : v)),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || `Claude returned ${res.status}`);
  const u = json.usage ?? {};
  const p = PRICE[model];
  const usd = p ? ((u.input_tokens ?? 0) * p[0] + (u.output_tokens ?? 0) * p[1] + (u.cache_creation_input_tokens ?? 0) * p[2] + (u.cache_read_input_tokens ?? 0) * p[3]) / 1e6 : null;
  await sql`insert into runs (kind, detail) values ('claude', ${sql.json({ task, model, input: u.input_tokens ?? 0, output: u.output_tokens ?? 0, write5m: u.cache_creation_input_tokens ?? 0, write1h: 0, read: u.cache_read_input_tokens ?? 0, usd: usd && Math.round(usd * 10000) / 10000 })})`;
  if (json.stop_reason === "refusal") throw new Error("Claude declined to write this film.");
  // cut off (thinking used the room): once, with double the room, rather than failing the whole film
  if (json.stop_reason === "max_tokens") {
    if (maxTokens >= 48000) throw new Error(`Claude ran out of room (${task}).`);
    return claude({ stable, system, messages, schema, maxTokens: maxTokens * 2, light, task });
  }
  const text = (json.content ?? []).filter((b) => b.type === "text").map((b) => b.text).join("");
  return JSON.parse(text);
}

const SCHEMA = {
  type: "object",
  properties: {
    lines: {
      type: "array",
      description: "The spoken lines in order, ids L1, L2, ... Empty for silent formats (pov, chat).",
      items: { type: "object", properties: { id: { type: "string" }, say: { type: "string" }, after: { type: "number" } }, required: ["id", "say", "after"], additionalProperties: false },
    },
    spec_json: { type: "string", description: "The film's spec.json as a JSON string, in exactly the example's shape and the format's type." },
    notes: { type: "string", description: "One line on any choice the person should know about." },
  },
  required: ["lines", "spec_json", "notes"],
  additionalProperties: false,
};

// ---------- the job ----------

async function setStatus(id, status, extra = {}) {
  await sql`update content set status = ${status}, updated_at = now(),
    bank_id = coalesce(${extra.bank_id ?? null}, bank_id), media_url = coalesce(${extra.media_url ?? null}, media_url),
    script = coalesce(${extra.script ? sql.json(extra.script) : null}, script), spec = coalesce(${extra.spec ? sql.json(extra.spec) : null}, spec)
    where id = ${id} and status <> 'rejected'`; // rejected while it was being made: leave it rejected
}

function slug(row) {
  const base = `${PREFIX[row.niche] ?? row.niche}-${(row.title || row.theme || row.format).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32)}`;
  let id = base;
  for (let n = 2; fs.existsSync(path.join(bank, id)); n++) id = `${base}-${n}`;
  return id;
}

// ---------- the script editor ----------

const REVIEW = {
  type: "object",
  properties: {
    cold: {
      type: "object",
      description: "What a first-time viewer, who has never heard of Offload, takes from one watch",
      properties: { about: { type: "string" }, do: { type: "string" }, offload: { type: "string" } },
      required: ["about", "do", "offload"],
      additionalProperties: false,
    },
    scores: {
      type: "object",
      description: "1 (bad) to 5 (excellent)",
      properties: {
        hook: { type: "integer", description: "Clear and stopping in under two seconds; matches the hook pattern" },
        truth: { type: "integer", description: "Opens on the truth and stays specific to this audience; within the first two lines it says out loud that this is about studying (revision, homework, coursework, an exam) and assumes nothing; on the time account it names the condition and explains the executive function behind the struggle" },
        one_idea: { type: "integer", description: "One idea, one takeaway, no 'and also'" },
        clarity: { type: "integer", description: "Every line a complete, concrete thought; no riddles; follows on one listen; and the picture shows what the words say (a 'packed week' or 'only free day' looks packed, chaos looks chaotic). Read the spec to judge it." },
        shape: { type: "integer", description: "Follows the shape's beats; something changes every 2-3 seconds" },
        useful: { type: "integer", description: "The viewer gets something useful before the product" },
        explain: { type: "integer", description: "Offload explained in plain, shown beats that answer this film's truth; only real claims" },
        ending: { type: "integer", description: "A clean ending that fits the style" },
      },
      required: ["hook", "truth", "one_idea", "clarity", "shape", "useful", "explain", "ending"],
      additionalProperties: false,
    },
    contradictions: {
      type: "array",
      items: { type: "string" },
      description:
        "Go through every line and check each claim against the spec, element by element: words like only, every, all, none, empty, busy, free, first, last; counts; days, times and subjects. List each place the screen contradicts the voice (e.g. the voice says 'your only free day' or 'your only study session' while the spec already shows other free days or other study blocks). Quote the line and name the spec element. Only list a contradiction a first-time viewer would notice on one watch (a wrong count, a false 'only', a day or subject that does not match, chaos over a calm screen); ignore wording nuances such as 'first days' against 'day one', and put style points in fixes instead. Empty if the picture backs up the words.",
    },
    fixes: { type: "array", items: { type: "string" }, description: "Specific line-level fixes, quoting the line, most important first; empty if none" },
    verdict: { type: "string", enum: ["ship", "rewrite"] },
  },
  required: ["cold", "scores", "contradictions", "fixes", "verdict"],
  additionalProperties: false,
};

/** Read the script as a first-time viewer would, score it, and say ship or rewrite. Ship needs 32/40, no score under 3, and no contradiction between the voice and the picture. */
export async function review({ row, lead, draft }) {
  const stable = [
    "You are the script editor for Offload's short films. You are strict and specific. You read each script twice: first as a first-time viewer on a phone who has never heard of Offload and half-listens once, then as an editor against the house rules. You never rewrite the script yourself; you send precise notes.",
    "--- brand/scripting.md ---\n" + brand("brand/scripting.md"),
    "--- brand/hook-styles.md ---\n" + brand("brand/hook-styles.md"),
    "--- brand/safety.md ---\n" + brand("brand/safety.md"),
    "--- brand/product-facts.md (claims allowed) ---\n" + brand("brand/product-facts.md").slice(0, 24000),
  ].join("\n\n");
  const v = await claude({
    light: true,
    task: "script-editor",
    stable,
    system: "Review the script.",
    schema: REVIEW,
    maxTokens: 16000,
    messages: [
      {
        role: "user",
        content: [
          `Account: ${row.niche}. Format: ${row.format}. Hook style: ${row.hook_style}.`,
          lead.truth ? `The truth it must open on: ${lead.truth.text}` : "",
          lead.shape ? `The shape (${lead.shape.id}, ${lead.shape.name}): ${lead.shape.beats.map((b) => `${b.at}: ${b.job}`).join(" | ")}` : "",
          lead.pattern ? `The hook pattern: ${lead.pattern.pattern}` : "",
          row.lead === "trend" && row.trend ? `Trend-led: it should follow the rising trend "${row.trend.name}" (${row.trend.recipe ?? ""}), keeping: ${row.trend.keep_swap ?? ""}. Score "shape" on how well it captures the trend's mechanic and rhythm.` : "",
          `The takeaway the film intends: ${row.theme}`,
          `The script, line by line (seconds of pause after each):\n${draft.lines.map((l) => `${l.id} (${l.after}s): ${l.say}`).join("\n")}`,
          `On screen (from the spec): ${JSON.stringify(draft.spec).slice(0, 6000)}`,
        ]
          .filter(Boolean)
          .join("\n\n"),
      },
    ],
  });
  const total = Object.values(v.scores).reduce((a, b) => a + b, 0);
  const contradictions = v.contradictions ?? [];
  const ok = total >= 32 && Object.values(v.scores).every((x) => x >= 3) && contradictions.length === 0;
  // contradictions lead the notes, so the writer fixes them first
  return { ...v, contradictions, fixes: [...contradictions.map((c) => `Contradiction: ${c}`), ...(v.fixes ?? [])], total, verdict: ok ? "ship" : "rewrite" };
}

// ---------- captions ----------

const CAPTIONS = {
  type: "object",
  properties: {
    tiktok: { type: "string" },
    instagram: { type: "string" },
    youtube_title: { type: "string" },
    youtube: { type: "string", description: "The YouTube Shorts description" },
    facebook: { type: "string" },
  },
  required: ["tiktok", "instagram", "youtube_title", "youtube", "facebook"],
  additionalProperties: false,
};

/** One caption per platform, from the film and the captions on this niche's top Virlo videos (brand/platforms.md). */
export async function writeCaptions(row, lines) {
  const top = await sql`select hook, views from virlo_items where kind = 'video' and niche = ${row.niche} and coalesce(hook, '') <> ''
    order by score desc nulls last limit 12`;
  const caps = await claude({
    light: true,
    task: "captions",
    stable: ["You write social captions for Offload's short films. Follow brand/platforms.md exactly.", "--- brand/platforms.md ---\n" + brand("brand/platforms.md"), "--- brand/safety.md ---\n" + brand("brand/safety.md"), "--- brand/product-facts.md (claims allowed) ---\n" + brand("brand/product-facts.md").slice(0, 16000)].join("\n\n"),
    system: "Write the captions. The trial call to action is not written yet: leave it out entirely, with no placeholder, no brackets and no 'link in bio'.",
    schema: CAPTIONS,
    maxTokens: 12000,
    messages: [
      {
        role: "user",
        content: `Account: ${row.niche}. Takeaway: ${row.theme}.\nThe film's voice-over:\n${lines.map((l) => l.say).join("\n")}\n\nCaptions on the top videos in this niche right now (learn what makes them work: the search words, the comment and save prompts, the hashtags; never copy them, never name anyone):\n${top.map((t) => `- (${t.views ?? "?"} views) ${String(t.hook).slice(0, 220)}`).join("\n") || "(none yet)"}`,
      },
    ],
  });
  await sql`update content set captions = ${sql.json(caps)} where id = ${row.id}`;
  return caps;
}

export async function makeFilm(contentId, note = "", { renderOnly = false } = {}) {
  const [row] = await sql`select * from content where id = ${contentId}`;
  if (!row) throw new Error(`No content ${contentId}`);
  if (row.status === "rejected" || row.status === "proposed") return { id: contentId, skipped: `it was ${row.status} before it was made` };
  // "Render anyway" on a held film: no writing, just voice and render what is there
  if (renderOnly && row.spec) return renderFilm(row, { lines: row.script?.lines ?? [], spec: Object.fromEntries(Object.entries(row.spec).filter(([k]) => k !== "id")), notes: "" }, SILENT.has(row.format || "scene"));
  const format = row.format || "scene";
  const ex = example(format);
  const type = formatType(format);
  const silent = SILENT.has(format);
  const stable = [
    "You write finished short vertical films for Offload, a UK study app, as data for a Remotion template. Follow the brand files exactly: one natural male narrator, the pacing rules, the three-beat Offload explainer, the retired themes, safety rules, and claims only from product-facts. Never put a number on screen or in a line that is not already in the proposal (durations, percentages, counts, prices); clock times and days are fine. Set a positive tone (\"ok\") on rows that show the good outcome.",
    "--- brand/pillars.md ---\n" + brand("brand/pillars.md"),
    "--- brand/scripting.md ---\n" + brand("brand/scripting.md"),
    "--- brand/hook-styles.md ---\n" + brand("brand/hook-styles.md"),
    "--- brand/lessons.md (what we have learnt from our own films; follow it) ---\n" + (brand("brand/lessons.md") || "(no lessons yet)"),
    "--- brand/safety.md ---\n" + brand("brand/safety.md"),
    "--- brand/product-facts.md (claims allowed) ---\n" + brand("brand/product-facts.md").slice(0, 24000),
    `--- How time refs work ---\nEvery "at" in a voiced spec is a ref to a spoken word: "L2" (start of line 2), "L2$" (end of line 2), "L2:word" (when that word is said), "L2:word#2" (its second time), "L2:word@-0.2" (0.2 s before it). The word must appear in that line's text exactly (case and punctuation ignored). Silent formats (pov, chat) use seconds instead.`,
  ].join("\n\n");
  const ours = await ourNumbers(sql, [row.niche], { top: 4 });
  // the script lead: the truth it opens on, the shape it follows, the trend hook pattern
  const [truth] = row.truth_id ? await sql`select * from truths where id = ${row.truth_id}` : [];
  const [shape] = row.shape ? await sql`select * from shapes where id = ${row.shape}` : [];
  const [pattern] = row.hook_pattern_id ? await sql`select * from hook_patterns where id = ${row.hook_pattern_id}` : [];
  const lead = { truth, shape, pattern };
  const ask = [
    `Write the film for this accepted proposal.`,
    `Proposal: ${JSON.stringify({ account: row.niche, pillar: row.pillar, format, hook_style: row.hook_style, theme: row.theme, title: row.title, openers: row.openers, look: row.look, storyboard: row.storyboard })}`,
    truth ? `The truth this film opens on and stays on (the viewer must recognise it as theirs): ${truth.text}${truth.offload && truth.offload !== "none" ? `\nHow Offload answers it: ${truth.offload}` : ""}` : "",
    shape ? `Follow this shape, beat by beat (${shape.id}, ${shape.name}: ${shape.purpose}):\n${shape.beats.map((b) => `- ${b.at}: ${b.job}. Voice: ${b.voice}. Screen: ${b.screen}`).join("\n")}` : "",
    pattern ? `Hook A follows this trend pattern: ${pattern.pattern} (${pattern.why})` : "",
    // trend-led: the trend leads; the shape only fills gaps
    row.lead === "trend" && row.trend
      ? [
          `THIS FILM IS TREND-LED. It starts from a rising trend: "${row.trend.name}". The trend leads the structure, rhythm and visual mechanic; the shape above only fills gaps.`,
          row.trend.recipe ? `What the trend is: ${row.trend.recipe}` : "",
          row.trend.keep_swap ? `What we keep and what we swap: ${row.trend.keep_swap}` : "",
          row.trend.transcript ? `The trend's own script, for timing and rhythm only (beats, line length, where the turn lands; never copy its words):\n${row.trend.transcript}` : "",
          row.trend.duration ? `It runs about ${Math.round(row.trend.duration)} seconds: aim for a similar length.` : "",
          `Rebuild its mechanic on screen as motion graphics (objects, screens, type, diagrams), faceless, with our one narrator.`,
        ]
          .filter(Boolean)
          .join("\n")
      : "",
    `Every claim in a line must be true of the picture you build: if a line says "only", "every", "empty" or "busy", or names a count, a day, a time or a subject, the spec must show exactly that. Say what is specifically lost or changed (for example "Saturday was the only slot for pharmacology"), not a general claim the screen contradicts.`,
    `Before writing, fix the takeaway in one sentence (the proposal's theme: ${row.theme}). Every line serves it. Follow "Explaining Offload" and "Delivery" in scripting.md.`,
    `Use hook A as line 1. ${silent ? "This format has no narrator: leave lines empty and time everything in seconds." : "Keep every line under about ten words where possible, with after pauses of 0.4 to 1.0 seconds, and end on the three-beat Offload explainer."}`,
    note ? `The person asked for this change: ${note}` : "",
    // a remake edits the current cut instead of starting over, so good work is kept
    note && row.script?.lines?.length && row.spec
      ? `This is a remake. Here is the current film. Change only what the person asked for and anything that change forces; keep every other line, block and timing as it is.\nCurrent lines:\n${JSON.stringify(row.script.lines, null, 1)}\nCurrent spec:\n${JSON.stringify(Object.fromEntries(Object.entries(row.spec).filter(([k]) => k !== "id")), null, 1)}`
      : "",
    `Plan the picture before the words: decide what is on screen in each beat (which blocks, cards or rows, and what changes), then write lines that describe that picture and nothing else.`,
    ours ? `How this account's own posts have done (for choices of pacing, opener and look only; never put these numbers in the film):\n${ours}` : "",
    `The format's TypeScript type:\n${type}\n\nAn existing film in this format to copy the shape of (spec.json):\n${JSON.stringify(ex?.spec ?? {}, null, 1)}`,
    ex?.script ? `Its script.json lines:\n${JSON.stringify(ex.script.lines, null, 1)}` : "",
    `Put the spec in spec_json as a JSON string. Do not include an "id" field.`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const messages = [{ role: "user", content: ask }];
  let draft;
  let errs = [];
  let verdict = null;
  // write, check, then the editor reads it cold; a script under the bar gets one rewrite (cost control: two passes)
  const PASSES = 2;
  for (let pass = 0; pass < PASSES; pass++) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const out = await claude({ stable, system: "Write the film as data.", messages, schema: SCHEMA });
      let spec;
      try {
        spec = JSON.parse(out.spec_json);
      } catch {
        spec = null;
      }
      draft = { lines: out.lines ?? [], spec, notes: out.notes, raw: out };
      errs = spec ? check(draft, ex, format) : ["spec_json is not valid JSON"];
      if (!errs.length) break;
      messages.push({ role: "assistant", content: JSON.stringify(out) }, { role: "user", content: `Fix these problems and return the whole film again:\n- ${errs.join("\n- ")}` });
    }
    if (errs.length) break;
    if (silent) break;
    verdict = await review({ row, lead, draft });
    await sql`update content set review = ${sql.json({ ...verdict, pass: pass + 1, at: new Date().toISOString() })} where id = ${contentId}`;
    if (verdict.verdict === "ship" || pass === PASSES - 1) break;
    messages.push(
      { role: "assistant", content: JSON.stringify(draft.raw) },
      { role: "user", content: `The script editor read this cold and sent it back (score ${verdict.total}/40). Rewrite the whole film to fix every note, keeping the same truth, shape and takeaway:\n- ${verdict.fixes.join("\n- ")}\n\nWhat a first-time viewer took from it: about: ${verdict.cold.about}; do: ${verdict.cold.do}; Offload: ${verdict.cold.offload}` },
    );
  }
  if (errs.length) {
    await sql`update content set status = 'accepted', updated_at = now() where id = ${contentId} and status <> 'rejected'`;
    throw new Error(`The film did not pass its checks: ${errs.slice(0, 5).join("; ")}`);
  }

  // still under the bar after its rewrite: hold it for a person instead of spending a render on it
  if (verdict && verdict.verdict !== "ship") {
    await sql`update content set status = 'held', updated_at = now(), script = ${silent ? null : sql.json({ lines: draft.lines })}, spec = ${sql.json(draft.spec)}
      where id = ${contentId} and status <> 'rejected'`;
    return { id: row.bank_id ?? contentId, held: true, notes: `Held at ${verdict.total}/40` };
  }
  return renderFilm(row, draft, silent);
}

/** Write the film's files, voice it, render it, write its captions. */
async function renderFilm(row, draft, silent) {
  const contentId = row.id;
  const id = row.bank_id && fs.existsSync(path.join(bank, row.bank_id)) ? row.bank_id : slug(row);
  fs.mkdirSync(path.join(bank, id), { recursive: true });
  const spec = { id, ...draft.spec };
  if (silent) {
    fs.rmSync(path.join(bank, id, "script.json"), { force: true });
  } else {
    fs.writeFileSync(path.join(bank, id, "script.json"), JSON.stringify({ id: `bank/${id}`, ...VOICE, lines: draft.lines.map((l) => ({ id: l.id, say: l.say, after: l.after })) }, null, 1));
  }
  fs.writeFileSync(path.join(bank, id, "spec.json"), JSON.stringify(spec, null, 1));
  await setStatus(contentId, "drafted", { bank_id: id, script: silent ? null : { lines: draft.lines }, spec });

  // voice (or just the index for silent films), then render
  const voice = spawnSync(process.execPath, ["scripts/bank.mjs", ...(silent ? [] : [id])], { cwd: remotion, encoding: "utf8" });
  if (voice.status !== 0) throw new Error(`Voicing failed: ${(voice.stderr || voice.stdout).slice(-400)}`);
  await setStatus(contentId, "voiced");
  const out = `out/bank/offload-${id}.mp4`;
  const render = spawnSync("npx", ["remotion", "render", "src/world/index.ts", `Bank-${id}`, out, "--log=error"], { cwd: remotion, encoding: "utf8" });
  if (render.status !== 0 || !fs.existsSync(path.join(remotion, out))) throw new Error(`Rendering failed: ${(render.stderr || render.stdout).slice(-600)}`);
  await setStatus(contentId, "rendered", { media_url: `bank/offload-${id}.mp4` });
  // a copy in storage, so the hosted desk can play it
  if (storageReady(get)) await store(get, path.join(remotion, out), `bank/offload-${id}.mp4`).catch((e) => console.error(`storage: ${e.message}`));
  await writeCaptions(row, draft.lines).catch((e) => console.error(`captions: ${e.message}`));
  await sql`update content set stamps = '{}' where id = ${contentId}`; // a new cut needs fresh stamps
  return { id, notes: draft.notes };
}

// CLI
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve("scripts/agent.mjs")) {
  const id = process.argv[2];
  const noteAt = process.argv.indexOf("--note");
  const note = noteAt > 0 ? process.argv[noteAt + 1] : "";
  if (!id) {
    console.error("usage: node scripts/agent.mjs <content-id> [--note text]");
    process.exit(1);
  }
  try {
    const r = await makeFilm(id, note, { renderOnly: process.argv.includes("--render") });
    console.log(r.held ? "held" : "made", r.id, r.notes ? `— ${r.notes}` : "");
  } catch (e) {
    console.error("failed:", e.message);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
}

export { sql, get, formatType, example, check };
