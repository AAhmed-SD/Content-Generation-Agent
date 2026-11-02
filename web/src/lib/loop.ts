import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { niches, type Checkpoint, type MetricRow, type Piece } from "@/lib/desk";
import { WEEK } from "@/lib/pipeline";

const file = path.join(process.cwd(), "data", "loop.json");

const checkpoints: Checkpoint[] = ["1h", "24h", "72h", "7d"];
const channels = new Set(["tiktok", "instagram", "youtube", "facebook", "all"]);

export type CsvRow = {
  week: string;
  pieceId: string;
  channel: string;
  checkpoint: Checkpoint;
  views: string;
  completion: string;
  shares: string;
  comments: string;
  saves: string;
  liveUrl: string;
};

type Snapshot = {
  at: string;
  source: "csv" | "typed";
  rows: CsvRow[];
};

type LoopFile = {
  current: Snapshot | null;
  previous: Snapshot | null;
  lessons: Record<string, string>;
};

export type Bar = { label: string; value: number; display: string };
export type Move = { label: string; from: string; to: string; delta: string };

function empty(): LoopFile {
  return { current: null, previous: null, lessons: {} };
}

export function readLoop(): LoopFile {
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as LoopFile;
    return {
      current: parsed.current ?? null,
      previous: parsed.previous ?? null,
      lessons: parsed.lessons ?? {},
    };
  } catch {
    return empty();
  }
}

function writeLoop(loop: LoopFile) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(loop, null, 2));
}

function splitCsv(line: string) {
  const parts: string[] = [];
  let current = "";
  let quoted = false;
  for (const char of line) {
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      parts.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  parts.push(current);
  return parts;
}

function cell(value: string) {
  const text = value.trim().replaceAll(",", "");
  if (!text) return "";
  if (!/^[0-9]{1,9}%?$/.test(text)) return null;
  return text;
}

function numberOf(value: string) {
  const parsed = Number(value.replace("%", ""));
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseMetricsCsv(text: string, knownIds: Set<string>) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  const header = splitCsv(lines[0] ?? "").map((part) => part.trim().toLowerCase());
  const expected = ["week", "piece_id", "channel", "checkpoint", "views", "completion", "shares", "comments", "saves", "live_url"];
  if (expected.some((name, index) => header[index] !== name)) {
    return { rows: [] as CsvRow[], error: "The header row does not match the template." };
  }
  const rows: CsvRow[] = [];
  for (const line of lines.slice(1)) {
    const parts = splitCsv(line);
    const views = cell(parts[4] ?? "");
    const completion = cell(parts[5] ?? "");
    const shares = cell(parts[6] ?? "");
    const comments = cell(parts[7] ?? "");
    const saves = cell(parts[8] ?? "");
    const liveUrl = (parts[9] ?? "").trim();
    if (!views && !completion && !shares && !comments && !saves) continue;
    if (views === null || completion === null || shares === null || comments === null || saves === null) {
      return { rows: [] as CsvRow[], error: "A number was not readable. Use digits, and a % only on completion." };
    }
    const pieceId = (parts[1] ?? "").trim();
    const channel = (parts[2] ?? "").trim().toLowerCase();
    const checkpoint = (parts[3] ?? "").trim() as Checkpoint;
    if (!knownIds.has(pieceId) || !channels.has(channel) || !checkpoints.includes(checkpoint)) {
      return { rows: [] as CsvRow[], error: `A row names a piece, channel, or checkpoint the desk does not have (${pieceId || "blank"}).` };
    }
    if (liveUrl && !/^https?:\/\/\S+$/.test(liveUrl)) {
      return { rows: [] as CsvRow[], error: "A live URL has to start with http:// or https://." };
    }
    rows.push({
      week: (parts[0] ?? "").trim() || WEEK,
      pieceId,
      channel,
      checkpoint,
      views: views ?? "",
      completion: completion ?? "",
      shares: shares ?? "",
      comments: comments ?? "",
      saves: saves ?? "",
      liveUrl,
    });
  }
  if (rows.length === 0) return { rows, error: "The file has headers and no numbers yet." };
  return { rows, error: "" };
}

function rowsFor(rows: CsvRow[], pieceId: string, checkpoint: Checkpoint) {
  const matching = rows.filter((row) => row.pieceId === pieceId && row.checkpoint === checkpoint);
  const split = matching.filter((row) => row.channel !== "all");
  return split.length > 0 ? split : matching;
}

function sum(rows: CsvRow[], key: "views" | "shares" | "comments" | "saves") {
  const values = rows.map((row) => numberOf(row[key])).filter((value): value is number => value !== null);
  if (values.length === 0) return "";
  return String(values.reduce((total, value) => total + value, 0));
}

function completionOf(rows: CsvRow[]) {
  const weighted = rows
    .map((row) => {
      const completion = numberOf(row.completion);
      if (completion === null) return null;
      return { completion, weight: numberOf(row.views) ?? 1 };
    })
    .filter((item): item is { completion: number; weight: number } => item !== null);
  if (weighted.length === 0) return "";
  const weight = weighted.reduce((total, item) => total + item.weight, 0);
  const average = weighted.reduce((total, item) => total + item.completion * item.weight, 0) / weight;
  const percent = rows.some((row) => row.completion.includes("%"));
  return `${Math.round(average)}${percent ? "%" : ""}`;
}

export function applyRows(pieces: Piece[], rows: CsvRow[]) {
  for (const piece of pieces) {
    const mine = rows.filter((row) => row.pieceId === piece.id);
    if (mine.length === 0) continue;
    for (const checkpoint of checkpoints) {
      const group = rowsFor(mine, piece.id, checkpoint);
      if (group.length === 0) continue;
      const next: MetricRow = {
        views: sum(group, "views"),
        completion: completionOf(group),
        shares: sum(group, "shares"),
        comments: sum(group, "comments"),
        saves: sum(group, "saves"),
      };
      if (Object.values(next).some(Boolean)) piece.metrics[checkpoint] = next;
    }
    const url = mine.find((row) => row.liveUrl)?.liveUrl;
    if (url && !piece.liveUrl) piece.liveUrl = url;
  }
}

export function storeCsv(rows: CsvRow[]) {
  const loop = readLoop();
  if (loop.current?.rows.length) loop.previous = loop.current;
  loop.current = { at: new Date().toISOString(), source: "csv", rows };
  writeLoop(loop);
}

export function storeTyped(piece: Piece, checkpoint: Checkpoint) {
  const loop = readLoop();
  const current = loop.current ?? { at: new Date().toISOString(), source: "typed" as const, rows: [] };
  const metric = piece.metrics[checkpoint];
  const row: CsvRow = {
    week: WEEK,
    pieceId: piece.id,
    channel: "all",
    checkpoint,
    views: metric.views,
    completion: metric.completion,
    shares: metric.shares,
    comments: metric.comments,
    saves: metric.saves,
    liveUrl: piece.liveUrl,
  };
  current.rows = current.rows.filter(
    (item) => !(item.pieceId === piece.id && item.channel === "all" && item.checkpoint === checkpoint),
  );
  current.rows.push(row);
  current.at = new Date().toISOString();
  loop.current = current;
  writeLoop(loop);
}

export function saveLesson(week: string, lesson: string) {
  const loop = readLoop();
  loop.lessons[week] = lesson.slice(0, 400);
  writeLoop(loop);
}

function latestCheckpoint(rows: CsvRow[]): Checkpoint | null {
  return [...checkpoints].reverse().find((checkpoint) => rows.some((row) => row.checkpoint === checkpoint && row.views)) ?? null;
}

function nicheLabel(id: string) {
  return niches.find((niche) => niche.id === id)?.label ?? id;
}

export function loopPicture() {
  const loop = readLoop();
  const rows = loop.current?.rows ?? [];
  const checkpoint = latestCheckpoint(rows);
  const views: Bar[] = [];
  const completion: Bar[] = [];
  if (checkpoint) {
    for (const niche of niches) {
      const group = rows.filter(
        (row) => row.pieceId.startsWith(`${niche.id}-`) && row.checkpoint === checkpoint && row.views,
      );
      const total = group.reduce((sumViews, row) => sumViews + (numberOf(row.views) ?? 0), 0);
      if (total > 0) views.push({ label: niche.label, value: total, display: total.toLocaleString("en-GB") });
      const rate = completionOf(group);
      const value = numberOf(rate);
      if (value !== null) completion.push({ label: niche.label, value, display: rate });
    }
  }
  return {
    at: loop.current?.at ?? "",
    source: loop.current?.source ?? "",
    rows,
    checkpoint,
    views,
    completion,
    moves: movesWithin(rows),
    versus: movesAgainst(loop.previous?.rows ?? [], rows),
    lesson: loop.lessons[WEEK] ?? "",
    previousAt: loop.previous?.at ?? "",
  };
}

function pieceTitle(row: CsvRow) {
  const niche = nicheLabel(row.pieceId.split("-")[0] ?? "");
  const part = row.pieceId.split("-").slice(1).join(" ");
  const channel = row.channel === "all" ? "" : ` · ${row.channel}`;
  return `${niche} ${part}${channel}`.trim();
}

function movesWithin(rows: CsvRow[]): Move[] {
  const keys = new Map<string, CsvRow[]>();
  for (const row of rows) {
    const key = `${row.pieceId}:${row.channel}`;
    keys.set(key, [...(keys.get(key) ?? []), row]);
  }
  const moves: Move[] = [];
  for (const group of keys.values()) {
    const ordered = checkpoints
      .map((checkpoint) => group.find((row) => row.checkpoint === checkpoint && row.completion))
      .filter((row): row is CsvRow => Boolean(row));
    if (ordered.length < 2) continue;
    const from = ordered[0];
    const to = ordered[ordered.length - 1];
    const deltaValue = (numberOf(to.completion) ?? 0) - (numberOf(from.completion) ?? 0);
    if (deltaValue === 0) continue;
    moves.push({
      label: `${pieceTitle(to)} completion`,
      from: `${from.checkpoint} ${from.completion}`,
      to: `${to.checkpoint} ${to.completion}`,
      delta: `${deltaValue > 0 ? "+" : ""}${Math.round(deltaValue)}`,
    });
  }
  return moves;
}

function movesAgainst(before: CsvRow[], after: CsvRow[]): Move[] {
  const moves: Move[] = [];
  for (const row of after) {
    const prior = before.find(
      (item) => item.pieceId === row.pieceId && item.channel === row.channel && item.checkpoint === row.checkpoint,
    );
    if (!prior) continue;
    const fields = [
      ["views", prior.views, row.views],
      ["completion", prior.completion, row.completion],
      ["saves", prior.saves, row.saves],
    ] as const;
    for (const [name, from, to] of fields) {
      if (!from || !to || from === to) continue;
      const deltaValue = (numberOf(to) ?? 0) - (numberOf(from) ?? 0);
      moves.push({
        label: `${pieceTitle(row)} ${name} at ${row.checkpoint}`,
        from,
        to,
        delta: `${deltaValue > 0 ? "+" : ""}${Math.round(deltaValue)}`,
      });
    }
  }
  return moves.slice(0, 12);
}
