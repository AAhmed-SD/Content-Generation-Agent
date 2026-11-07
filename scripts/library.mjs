#!/usr/bin/env node
/**
 * The template library. One pass over what has been built, written two ways:
 *   web/data/library.json   for the desk's Library page
 *   docs/library.md         a short catalogue a writer (or Claude) reads instead of the code
 * and a thumbnail per film in web/public/library/.
 *
 *   node scripts/library.mjs           (from the repo root; re-run after adding a film or a template)
 *
 * Reading docs/library.md first is what saves tokens: pick a format and an example spec from it, copy the
 * example's spec.json, and only open the kit file if a field is unclear.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const bank = path.join(root, "remotion", "src", "world", "bank");
const out = path.join(root, "remotion", "out");
const thumbs = path.join(root, "web", "public", "library");
mkdirSync(thumbs, { recursive: true });

/** Every template, by hand: what it is, when to use it, which hook styles it suits. Keep in step with the kits. */
const formats = [
  { id: "scene", name: "Scene film", kit: "bank/Film.tsx", voice: true, shape: "Spoken lines over scenes: week, doc, chart, quiz, choice, clip, stack. The general-purpose film.", styles: ["call-out", "hot take", "story", "quiz"] },
  { id: "myth-fact", name: "Myth and fact", kit: "formats/kit.tsx", voice: true, shape: "A myth stamped, the fact slides up in blue, a handwritten sheet, a loop to the hook.", styles: ["myth"] },
  { id: "three-things", name: "Three things", kit: "formats/kit.tsx", voice: true, shape: "A giant numeral and a colour per tip, hard cuts, then one product card.", styles: ["hot take", "call-out"] },
  { id: "pov", name: "POV phone", kit: "formats/kit.tsx", voice: false, shape: "Text on a phone: a list fills, messages arrive, a cut to the app's Today screen.", styles: ["relatable POV"] },
  { id: "tier-list", name: "Tier list", kit: "formats/kit2.tsx", voice: true, shape: "S to F rows; each item flies into its row on its word; a verdict.", styles: ["hot take", "joke"] },
  { id: "chat", name: "Group chat", kit: "formats/kit2.tsx", voice: false, shape: "A message thread with typing dots; the app arrives as a glass notification.", styles: ["relatable POV", "joke"] },
  { id: "search", name: "Search bar", kit: "formats/kit2.tsx", voice: true, shape: "A query types, suggestions drop, one is picked, an answer card.", styles: ["call-out", "confession"] },
  { id: "receipt", name: "Receipt", kit: "formats/kit2.tsx", voice: true, shape: "A thermal receipt prints line by line, totalled and stamped.", styles: ["joke", "call-out"] },
  { id: "whiteboard", name: "Whiteboard", kit: "formats/kit2.tsx", voice: true, shape: "Marker title, lines written, a strike, a circle, a sticky note.", styles: ["hot take", "myth"] },
  { id: "lockscreen", name: "Lock screen", kit: "formats/kit3.tsx", voice: true, shape: "Glass notifications stack at night, then clear for one from the app.", styles: ["relatable POV", "confession"] },
  { id: "inbox", name: "Inbox", kit: "formats/kit3.tsx", voice: true, shape: "An inbox fills, is swiped clear, one glass mail opens.", styles: ["call-out", "relatable POV"] },
  { id: "exampaper", name: "Exam paper", kit: "formats/kit3.tsx", voice: true, shape: "A question, a handwritten answer, red-pen ticks and a stamp.", styles: ["quiz", "myth"] },
  { id: "battery", name: "Battery", kit: "formats/kit3.tsx", voice: true, shape: "A battery draining day by day.", styles: ["relatable POV", "confession"] },
  { id: "weather", name: "Weather", kit: "formats/kit3.tsx", voice: true, shape: "A week's forecast, sun to storm.", styles: ["joke", "relatable POV"] },
  { id: "terms", name: "Terms and conditions", kit: "formats/kit3.tsx", voice: true, shape: "Clause by clause, signed and stamped.", styles: ["joke", "accusation"] },
  { id: "dialog", name: "Error dialog", kit: "formats/kit3.tsx", voice: true, shape: "System error dialogs, then a plain answer card.", styles: ["joke", "call-out"] },
  { id: "satnav", name: "Sat-nav", kit: "formats/kit3.tsx", voice: true, shape: "A route, a missed turn, a reroute, arrival.", styles: ["satisfying"] },
  { id: "departures", name: "Departures board", kit: "formats/kit3.tsx", voice: true, shape: "A split-flap board; one line delayed, then on time.", styles: ["satisfying", "joke"] },
  { id: "recipe", name: "Recipe card", kit: "formats/kit3.tsx", voice: true, shape: "What you need, then the method.", styles: ["satisfying", "hot take"] },
  { id: "missing", name: "Missing poster", kit: "formats/kit3.tsx", voice: true, shape: "A missing poster taped to a wall.", styles: ["joke", "call-out"] },
  { id: "kanban", name: "Kanban board", kit: "formats/kit3.tsx", voice: true, shape: "To do, doing, done; cards move.", styles: ["satisfying"] },
  { id: "blockfall", name: "Tetris calendar", kit: "formats/kit4.tsx", voice: true, shape: "A paper week. Grey shifts, blue study blocks fall and lock; a missed one cracks red and re-drops into a free slot. Everything fits.", styles: ["satisfying"] },
  { id: "evidence", name: "Evidence board", kit: "formats/kit4.tsx", voice: true, shape: "Exhibits pinned and strung on kraft, a GUILTY stamp, the sentence.", styles: ["accusation", "call-out"] },
  { id: "split", name: "Expectation vs reality", kit: "formats/kit4.tsx", voice: true, shape: "Expectation over reality, pair by pair, then one line.", styles: ["joke"] },
  { id: "science", name: "The science, shown", kit: "formats/kit5.tsx", voice: true, shape: "Dark explainer of one learning method or finding: forgetting and spacing curves, bars comparing methods (relative, study named), a blurt sheet that shows the gaps, the Feynman loop, an applied exam-style question, method steps.", styles: ["myth", "hot take", "quiz", "satisfying"] },
  { id: "jail", name: "Study police (jail series)", kit: "formats/kit4.tsx", voice: true, shape: "An app type is booked: front and side mugshots with flashes, a charge sheet, cell bars slam down, then Offload's three beats tick in. Suspects are archetypes (the flashcard app, the pretty planner), never a named brand.", styles: ["accusation", "joke"] },
  { id: "wrapped", name: "Wrapped", kit: "formats/kit4.tsx", voice: true, shape: "Full-bleed colour cards with a circular wipe and a progress bar: a week, wrapped.", styles: ["story", "confession", "satisfying"] },
];

const read = (file) => {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
};

function duration(file) {
  const r = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" });
  return Number.parseFloat(r.stdout) || 0;
}

function thumb(video, name) {
  const dest = path.join(thumbs, `${name}.jpg`);
  if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(video).mtimeMs) return `/library/${name}.jpg`;
  const at = Math.max(0.5, duration(video) * 0.45).toFixed(2);
  const r = spawnSync("ffmpeg", ["-v", "error", "-y", "-ss", at, "-i", video, "-frames:v", "1", "-vf", "scale=360:-2", "-q:v", "4", dest]);
  return r.status === 0 ? `/library/${name}.jpg` : null;
}

/** Five stills across a format's example film, for the Hooks page storyboards. */
function strip(videoRel, format) {
  if (!videoRel) return [];
  const video = path.join(out, videoRel);
  if (!existsSync(video)) return [];
  const dir = path.join(thumbs, "strip");
  mkdirSync(dir, { recursive: true });
  const d = duration(video);
  return [0.06, 0.26, 0.46, 0.66, 0.84].map((k, n) => {
    const dest = path.join(dir, `${format}-${n + 1}.jpg`);
    if (!(existsSync(dest) && statSync(dest).mtimeMs >= statSync(video).mtimeMs))
      spawnSync("ffmpeg", ["-v", "error", "-y", "-ss", (d * k).toFixed(2), "-i", video, "-frames:v", "1", "-vf", "scale=200:-2", "-q:v", "5", dest]);
    return existsSync(dest) ? `/library/strip/${format}-${n + 1}.jpg` : null;
  }).filter(Boolean);
}

const films = readdirSync(bank, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => {
    const spec = read(path.join(bank, d.name, "spec.json")) ?? {};
    const script = read(path.join(bank, d.name, "script.json"));
    const video = path.join(out, "bank", `offload-${d.name}.mp4`);
    const has = existsSync(video);
    const niche = d.name.split("-")[0];
    const lines = Array.isArray(script?.lines) ? script.lines.map((l) => (typeof l === "string" ? l : l.say ?? l.text)).filter(Boolean) : [];
    return {
      id: d.name,
      niche,
      format: spec.format ?? "scene",
      voice: script?.voice ?? null,
      hook: lines[0] ?? spec.title?.text ?? spec.title ?? spec.query?.text ?? "",
      video: has ? `bank/offload-${d.name}.mp4` : null,
      thumb: has ? thumb(video, d.name) : null,
      fields: Object.keys(spec).filter((k) => !["format", "id"].includes(k)),
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const stills = [];
for (const [dir, kind] of [["posters", "Photo poster"], ["posts", "Post"]]) {
  const p = path.join(out, dir);
  if (!existsSync(p)) continue;
  for (const f of readdirSync(p).filter((f) => f.endsWith(".png")).sort()) stills.push({ kind, name: f.replace(/^offload-|\.png$/g, "").replaceAll("-", " "), file: `${dir}/${f}` });
}
const carousels = existsSync(path.join(out, "carousels"))
  ? readdirSync(path.join(out, "carousels"), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => ({ name: d.name, slides: readdirSync(path.join(out, "carousels", d.name)).filter((f) => f.endsWith(".png")).sort().map((f) => `carousels/${d.name}/${f}`) }))
  : [];

const refs = path.join(root, "docs", "design-references");
const references = existsSync(refs)
  ? readdirSync(refs)
      .filter((f) => f.endsWith(".md") && f !== "README.md")
      .map((f) => {
        const text = readFileSync(path.join(refs, f), "utf8");
        const first = text.split("\n").find((l) => l.trim() && !l.startsWith("#") && !l.startsWith("---")) ?? "";
        return { name: f.replace(/\.md$/, ""), file: `docs/design-references/${f}`, line: first.trim().slice(0, 180) };
      })
  : [];

const rejected = read(path.join(root, "web", "research", "rejected.json")) ?? { formats: [] };
const catalogue = formats.filter((f) => !rejected.formats.includes(f.id)).map((f) => {
  const examples = films.filter((x) => x.format === f.id);
  const video = examples.find((x) => x.video)?.video ?? null;
  return { ...f, examples: examples.map((x) => x.id), thumb: examples.find((x) => x.thumb)?.thumb ?? null, video, strip: strip(video, f.id), fields: examples[0]?.fields ?? [] };
});

const at = new Date().toISOString();
writeFileSync(path.join(root, "web", "data", "library.json"), JSON.stringify({ at, formats: catalogue, films, stills, carousels, references }, null, 2) + "\n");

const md = [
  "# Template library",
  "",
  `Generated by \`node scripts/library.mjs\` on ${at.slice(0, 10)}. Do not edit by hand. Read this before opening any kit file: choose a format, copy an example's \`spec.json\` from \`remotion/src/world/bank/<example>/\`, and write new words. Pick the hook style first (\`brand/hook-styles.md\`).`,
  "",
  "| Format | Name | Voice | Shape | Hook styles | Spec fields | Examples |",
  "| --- | --- | --- | --- | --- | --- | --- |",
  ...catalogue.map((f) => `| \`${f.id}\` | ${f.name} | ${f.voice ? "yes" : "none"} | ${f.shape} | ${f.styles.join(", ")} | ${f.fields.map((x) => `\`${x}\``).join(" ") || "see kit"} | ${f.examples.map((x) => `\`${x}\``).join(" ") || "none yet"} |`),
  "",
  "## Films in the bank",
  "",
  "| Film | Format | Voice | Opening line |",
  "| --- | --- | --- | --- |",
  ...films.map((x) => `| \`${x.id}\` | ${x.format} | ${x.voice ?? "none"} | ${String(x.hook).replaceAll("|", "/")} |`),
  "",
  "## Stills",
  "",
  ...stills.map((s) => `- ${s.kind}: ${s.name} (\`remotion/out/${s.file}\`)`),
  ...carousels.map((c) => `- Carousel: ${c.name}, ${c.slides.length} slides`),
  "",
  "## Pulled references",
  "",
  ...references.map((r) => `- \`${r.file}\``),
  "- Saved pieces from the Inspiration feed and Magic UI: `web/research/pulled.json`",
  "",
].join("\n");
writeFileSync(path.join(root, "docs", "library.md"), md);
console.log(`${catalogue.length} formats, ${films.length} films, ${stills.length} stills, ${carousels.length} carousels, ${references.length} references`);
