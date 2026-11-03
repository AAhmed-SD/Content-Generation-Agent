import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const safeName = /^[\w.-]+\.(png|jpe?g|webp)$/i;

export type TextLine = { text: string; x: number; y: number; w: number; h: number };

export function boardPath(name: string) {
  if (!safeName.test(name)) return "";
  const full = path.join(process.cwd(), "public", "board", name);
  return existsSync(full) ? full : "";
}

export function editPath(name: string) {
  if (!boardPath(name)) return "";
  const stem = name.replace(/\.[^.]+$/, "");
  return path.join(process.cwd(), "data", "renders", "edits", `${stem}.jpg`);
}

export function workingPath(name: string) {
  const edit = editPath(name);
  if (edit && existsSync(edit)) return edit;
  return boardPath(name);
}

export function readPictureText(name: string) {
  const file = workingPath(name);
  if (!file) return { width: 0, height: 0, lines: [] as TextLine[] };
  const result = spawnSync("tesseract", [file, "stdout", "--psm", "11", "tsv"], {
    encoding: "utf8",
    maxBuffer: 8_000_000,
  });
  const size = spawnSync("magick", ["identify", "-format", "%w %h", file], { encoding: "utf8" });
  const [width, height] = size.stdout.trim().split(/\s+/).map(Number);
  return {
    width: Number.isFinite(width) ? width : 0,
    height: Number.isFinite(height) ? height : 0,
    lines: result.status === 0 ? linesFromTsv(result.stdout) : [],
  };
}

function linesFromTsv(tsv: string): TextLine[] {
  const words: TextLine[] = [];
  for (const row of tsv.split("\n").slice(1)) {
    const col = row.split("\t");
    if (col.length < 12 || col[0] !== "5") continue;
    const text = col[11]?.trim() ?? "";
    const conf = Number(col[10]);
    if (!text || conf < 0) continue;
    const x = Number(col[6]);
    const y = Number(col[7]);
    const w = Number(col[8]);
    const h = Number(col[9]);
    if (![x, y, w, h].every(Number.isFinite) || w < 2 || h < 2) continue;
    words.push({ text, x, y, w, h });
  }
  words.sort((a, b) => a.y - b.y || a.x - b.x);
  const groups: TextLine[][] = [];
  for (const word of words) {
    const mid = word.y + word.h / 2;
    const group = groups.find((items) => {
      const top = Math.min(...items.map((item) => item.y));
      const bottom = Math.max(...items.map((item) => item.y + item.h));
      return mid >= top - 4 && mid <= bottom + 4;
    });
    if (group) group.push(word);
    else groups.push([word]);
  }
  return groups
    .map((items) => {
      items.sort((a, b) => a.x - b.x);
      const x = Math.min(...items.map((item) => item.x));
      const y = Math.min(...items.map((item) => item.y));
      const right = Math.max(...items.map((item) => item.x + item.w));
      const bottom = Math.max(...items.map((item) => item.y + item.h));
      return { text: items.map((item) => item.text).join(" "), x, y, w: right - x, h: bottom - y };
    })
    .filter((line) => /[A-Za-z0-9]/.test(line.text));
}
