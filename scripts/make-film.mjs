import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = readFileSync(path.join(root, "web", ".env.local"), "utf8");
const key = env.match(/^ANTHROPIC_API_KEY=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
const model = env.match(/^ANTHROPIC_MODEL=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "") || "claude-sonnet-5-5";
if (!key) throw new Error("ANTHROPIC_API_KEY is empty.");

function brandFile(name) {
  return readFileSync(path.join(root, "brand", name), "utf8");
}

const given = [
  ["brand.md", "Intro. What Offload is, and the student problems."],
  ["product-facts.md", "Product facts. What the film may claim. No price and no trial sentence, even if this file mentions access."],
  ["safety.md", "Safety. No diagnosis, no treatment, no patient, no grade."],
  ["platforms.md", "Platforms. The trial sentence is unset. Do not invent one. No link. No price."],
  ["goals.md", "Goals. One job for the film."],
  ["pillars.md", "Content pillars. What films are about and in what mix: knowing what you actually know leads."],
  ["scripting.md", "Scripting. Who narrates each account, the shape, the words, the endings."],
  ["hook-styles.md", "Hook styles. Pick one, not the last one this account used. Sharp styles aim at habits, never people."],
  ["niches/clinical.md", "offload.clinical"],
  ["niches/analytical.md", "offload.analytical"],
  ["niches/mentalhealth.md", "offload.mentalhealth"],
  ["niches/gcsealevel.md", "offload.gcsealevel"],
  ["posts/hook.md", "Hook"],
  ["posts/payoff.md", "Payoff"],
  ["posts/still.md", "Still"],
  ["posts/carousel.md", "Carousel"],
  ["briefs/clinical-2026-W45.md", "This week, clinical"],
  ["briefs/analytical-2026-W45.md", "This week, analytical"],
  ["briefs/mentalhealth-2026-W45.md", "This week, mental health"],
  ["briefs/gcsealevel-2026-W45.md", "This week, GCSE and A-level"],
  ["templates.md", "Templates"],
  ["assets.md", "Assets. Do not name a pose or a prop that is not listed."],
  ["motion.md", "Motion. This is the picture for this film. It wins over identity.md."],
  ["identity.md", "Identity. The desk and the still card. Do not paint this film cream. Follow motion.md."],
  ["sound.md", "Sound. Hits on the cuts. Do not describe the sound in the lines."],
];

const packet = given.map(([name, note]) => `\n\n## ${note}\nFile: brand/${name}\n\n${brandFile(name)}`).join("\n");

const banned = /\b(cure|guaranteed|diagnos|suicide|kill myself|onlyfans|escort|nude|porn|hostess|ai-powered|adhd)\b/i;

function clean(value, max) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function parseFilm(text) {
  const json = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  const data = JSON.parse(json);
  const beats = Array.isArray(data.beats) ? data.beats : [];
  if (beats.length < 4 || beats.length > 6) throw new Error("Claude did not return four to six beats.");
  const film = {
    hold: 60,
    endBold: clean(data.endBold, 80),
    endItalic: clean(data.endItalic, 90),
    beats: beats.map((beat, index) => ({
      kicker: clean(beat.kicker, 32),
      issue: clean(beat.issue, 42),
      detail: clean(beat.detail, 48),
      answer: clean(beat.answer, 52),
      move: ["cross", "grid", "circle", "wedge", "squares", "corners"].includes(beat.move)
        ? beat.move
        : ["cross", "grid", "circle", "wedge", "squares", "corners"][index % 6],
    })),
  };
  if (!film.endBold || !film.endItalic) throw new Error("Claude left the ending blank.");
  if (film.beats.some((beat) => !beat.kicker || !beat.issue || !beat.detail || !beat.answer)) {
    throw new Error("Claude left a line blank.");
  }
  const joined = [film.endBold, film.endItalic, ...film.beats.flatMap((beat) => Object.values(beat))].join(" ");
  if (banned.test(joined) || /\d/.test(joined) || /https?:\/\//i.test(joined)) {
    throw new Error("Claude returned a line the film cannot say.");
  }
  return film;
}

function score(seconds, hits) {
  const rate = 44100;
  const total = Math.ceil(seconds * rate);
  const samples = new Float32Array(total);
  const add = (start, dur, fn) => {
    const from = Math.max(0, Math.floor(start * rate));
    const count = Math.floor(dur * rate);
    for (let i = 0; i < count && from + i < total; i += 1) samples[from + i] += fn(i / rate);
  };
  for (const t of hits) {
    add(t, 0.045, (u) => Math.sin(2 * Math.PI * 1680 * u) * Math.exp(-u * 80) * 0.32);
    add(t, 0.12, (u) => Math.sin(2 * Math.PI * 90 * u) * Math.exp(-u * 22) * 0.22);
  }
  add(hits.at(-1) ?? 0, 0.7, (u) => Math.sin(2 * Math.PI * 392 * u) * Math.sin(Math.PI * Math.min(1, u / 0.7)) * 0.14);
  let peak = 0;
  for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
  const gain = peak > 0.9 ? 0.9 / peak : 1;
  const pcm = Buffer.alloc(total * 2);
  for (let i = 0; i < total; i += 1) {
    pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i] * gain)) * 32767), i * 2);
  }
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  writeFileSync(path.join(root, "remotion", "public", "issue-score.wav"), Buffer.concat([header, pcm]));
}

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-api-key": key,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model,
    max_tokens: 2000,
    system:
      "You write the words for one Offload film. Return one JSON object and nothing else. No markdown fence. Do not refuse or apologise.",
    messages: [
      {
        role: "user",
        content: [
          "Write six fast beats for a motion film. Remotion already draws the picture from remotion/src/motion. You pick a move name. You do not write easing, opacity, springs, or frame counts.",
          "Moves, and only these: cross, grid, circle, wedge, squares, corners. Use each once.",
          "Each beat is one student problem, then what Offload does about it. Use only the files below. Do not add a price, a trial, a number, a link, or a diagnosis. Do not say the viewer has a condition. Do not name ADHD.",
          "Each of issue, detail, and answer is at most eight words. Remotion cuts three times per problem: the issue, then the detail on a shape, then the answer. A paragraph will not fit.",
          "JSON shape:",
          '{"endBold":"","endItalic":"","beats":[{"kicker":"","issue":"","detail":"","answer":"","move":"cross"}]}',
          "endBold and endItalic are the last card. The word offload is already drawn. Do not write it.",
          "engine.md and loop.md are not here. engine.md is the week on the desk. loop.md is the numbers sheet. Neither one is a line for the screen.",
          packet,
        ].join("\n"),
      },
    ],
  }),
});

const json = await response.json();
if (!response.ok) {
  const message = String(json.error?.message || response.status).replace(/sk-ant-[A-Za-z0-9_-]+/g, "the saved key");
  throw new Error(message);
}
const text = (json.content || [])
  .map((block) => block.text || "")
  .join("\n")
  .trim();
if (!text) throw new Error(`Claude returned no film (${json.stop_reason || "no stop"}).`);

const film = parseFilm(text);
const propsPath = path.join(root, "web", "data", "renders", "claude-issues.props.json");
const output = path.join(root, "web", "data", "renders", "claude-issues.mp4");
writeFileSync(propsPath, JSON.stringify({ composition: "FastIssues", ...film }, null, 2));
const frames = film.beats.length * film.hold + 54;
const hits = [];
for (let index = 0; index < film.beats.length; index += 1) {
  const start = index * film.hold;
  const slam = Math.round(film.hold * 0.3);
  const shape = Math.round(film.hold * 0.34);
  hits.push(start / 30, (start + slam) / 30, (start + slam + shape) / 30);
}
hits.push((film.beats.length * film.hold) / 30);
score(frames / 30, hits);

const render = spawnSync(
  "npx",
  ["remotion", "render", "src/index.ts", "FastIssues", output, `--props=${propsPath}`],
  { cwd: path.join(root, "remotion"), encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
);
if (render.status !== 0) {
  process.stderr.write((render.stderr || render.stdout || "Remotion failed").slice(-1500));
  process.exit(render.status || 1);
}
console.log(`beats ${film.beats.length}`);
console.log(output);
for (const beat of film.beats) console.log(`- ${beat.kicker}: ${beat.issue}`);
