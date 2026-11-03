import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const text = readFileSync(path.join(root, "brand", "sound.md"), "utf8");
const rate = 44100;

function section(heading) {
  const lines = text.split("\n");
  const start = lines.findIndex((line) => line.trim().toLowerCase() === `## ${heading}`.toLowerCase());
  if (start < 0) return "";
  const body = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith("## ")) break;
    body.push(lines[index]);
  }
  return body.join("\n").trim();
}

const length = Number(section("Length").split("\n")[0]);
const cues = section("Cues")
  .split("\n")
  .map((line) => line.match(/^-\s+(\d+(?:\.\d+)?)\s+(click|impact|whoosh|tick|tone)\s*$/))
  .filter(Boolean)
  .map((match) => ({ t: Number(match[1]), kind: match[2] }));

if (!Number.isFinite(length) || length <= 0) throw new Error("Sound file has no length.");
if (!cues.length) throw new Error("Sound file has no cues.");

const total = Math.ceil(length * rate);
const samples = new Float32Array(total);

function add(start, dur, fn) {
  const from = Math.max(0, Math.floor(start * rate));
  const count = Math.floor(dur * rate);
  for (let i = 0; i < count && from + i < total; i += 1) {
    samples[from + i] += fn(i / rate, dur);
  }
}

function click(t) {
  add(t, 0.05, (u) => Math.sin(2 * Math.PI * 1680 * u) * Math.exp(-u * 70) * 0.28);
}

function impact(t) {
  add(t, 0.22, (u) => {
    const body = Math.sin(2 * Math.PI * 78 * u) * Math.exp(-u * 14);
    const knock = (Math.random() * 2 - 1) * Math.exp(-u * 40) * 0.35;
    return (body * 0.55 + knock) * 0.7;
  });
}

function whoosh(t) {
  add(t, 0.28, (u, dur) => {
    const n = Math.random() * 2 - 1;
    const env = Math.sin(Math.PI * (u / dur)) ** 1.4;
    return n * env * 0.16;
  });
}

function tick(t) {
  add(t, 0.04, (u) => Math.sin(2 * Math.PI * 2400 * u) * Math.exp(-u * 90) * 0.2);
}

function tone(t) {
  add(t, 0.7, (u) => Math.sin(2 * Math.PI * 392 * u) * Math.sin(Math.PI * Math.min(1, u / 0.7)) * 0.12);
}

for (const cue of cues) {
  if (cue.kind === "click") click(cue.t);
  if (cue.kind === "impact") impact(cue.t);
  if (cue.kind === "whoosh") whoosh(cue.t);
  if (cue.kind === "tick") tick(cue.t);
  if (cue.kind === "tone") tone(cue.t);
}

let peak = 0;
for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
const gain = peak > 0.9 ? 0.9 / peak : 1;
const pcm = Buffer.alloc(total * 2);
for (let i = 0; i < total; i += 1) {
  const value = Math.max(-1, Math.min(1, samples[i] * gain));
  pcm.writeInt16LE(Math.round(value * 32767), i * 2);
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

const out = path.join(root, "remotion", "public", "goal-score.wav");
mkdirSync(path.dirname(out), { recursive: true });
writeFileSync(out, Buffer.concat([header, pcm]));
console.log(`${cues.length} cues, ${length}s, ${out}`);
