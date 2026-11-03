import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { niches, type NicheId } from "@/lib/accounts";
import type { PersonId } from "@/lib/people";

export { niches, type NicheId };
export type Format = "video" | "still" | "carousel";

export type Checkpoint = "1h" | "24h" | "72h" | "7d";

export type MetricRow = {
  views: string;
  completion: string;
  shares: string;
  comments: string;
  saves: string;
};

export type CardScript = {
  onScreen: string;
  narration: string;
  beats: string[];
  source: "template" | "claude";
};

export type RenderInfo = {
  status: "idle" | "rendering" | "ready" | "failed";
  file: string;
  error: string;
  at: string;
};

export type Piece = {
  id: string;
  niche: NicheId;
  format: Format;
  part: string;
  line: string;
  note: string;
  captions: {
    tiktok: string;
    instagram: string;
    youtube: string;
    facebook: string;
  };
  firstComment: string;
  slot: string;
  lead: PersonId;
  needsSecond: boolean;
  stamps: PersonId[];
  liveUrl: string;
  researchNote: string;
  draftedFrom: string;
  metrics: Record<Checkpoint, MetricRow>;
  script: CardScript;
  approved: boolean;
  rejections: string[];
  render: RenderInfo;
};

export function emptyMetric(): MetricRow {
  return { views: "", completion: "", shares: "", comments: "", saves: "" };
}

const file = path.join(process.cwd(), "data", "desk.json");

function seed(): Piece[] {
  return [
    piece("clinical", "hook", "video", "Hook", "The list is still open.", "Medicine, dentistry, nursing, radiology. The reading does not finish itself.", "18:00", []),
    piece("clinical", "payoff", "video", "Payoff", "Come back to the card.", "Offload is the card you return to. It is not advice.", "18:05", []),
    piece("clinical", "card", "still", "Card", "One card before the shift.", "The exam can be OSCE or UKMLA. The post is the revision.", "18:10", []),
    piece("clinical", "cards", "carousel", "Three cards", "Read it. Leave it. Come back.", "Three cards about the workload. No patient.", "18:15", []),
    piece("analytical", "hook", "video", "Hook", "The problem set is still open.", "Maths, economics, computer science. The method has to be reused.", "18:20", []),
    piece("analytical", "payoff", "video", "Payoff", "Keep the method.", "Offload holds the card. It does not work the question.", "18:25", []),
    piece("analytical", "card", "still", "Card", "One card for the method.", "The workload is the struggle. The answer is not on this card.", "18:30", []),
    piece("analytical", "cards", "carousel", "Three cards", "Attempt. Leave it. Come back.", "Three cards about unfinished problems.", "18:35", []),
    piece("mentalhealth", "hook", "video", "Hook", "The afternoon disappeared.", "Too many starts, and the day is gone.", "18:40", []),
    piece("mentalhealth", "payoff", "video", "Payoff", "The next card only.", "Offload is for the next block of time. It is not treatment.", "18:45", []),
    piece("mentalhealth", "card", "still", "Card", "One block of time.", "A hard day, and the next card. The post is about time.", "18:50", []),
    piece("mentalhealth", "cards", "carousel", "Three cards", "Start. Stop. Start again.", "Three cards about managing time.", "18:55", []),
    piece("gcsealevel", "hook", "video", "Hook", "The paper has a date.", "GCSE and A-level. The revision is the struggle.", "19:00", []),
    piece("gcsealevel", "payoff", "video", "Payoff", "Come back before the paper.", "Offload holds what they still have to know.", "19:05", []),
    piece("gcsealevel", "card", "still", "Card", "One card for the paper.", "Syllabus-true. No named student. No invented grade.", "19:10", []),
    piece("gcsealevel", "cards", "carousel", "Three cards", "One card. One mark.", "Comments are kept as themes, never as profiles.", "19:15", ["laiba"]),
  ];
}

function piece(
  niche: NicheId,
  slug: string,
  format: Format,
  part: string,
  line: string,
  note: string,
  slot: string,
  stamps: PersonId[],
): Piece {
  const meta = niches.find((item) => item.id === niche)!;
  const code = { clinical: "CLN", analytical: "ANL", mentalhealth: "MH", gcsealevel: "GCS" }[niche];
  return {
    id: `${niche}-${slug}`,
    niche,
    format,
    part,
    line,
    note,
    captions: {
      tiktok: `${line} ${note}`,
      instagram: `${line}\n${note}\n#offload`,
      youtube: `${meta.label}: ${line} ${note}`,
      facebook: `${line} ${note} Filed under ${meta.name}.`,
    },
    firstComment: `Filed this week. Code ${code}-W45.`,
    slot: `Monday 2 Nov, ${slot}`,
    lead: meta.lead,
    needsSecond: meta.needsSecond,
    stamps,
    liveUrl: "",
    researchNote: "",
    draftedFrom: "",
    metrics: {
      "1h": emptyMetric(),
      "24h": emptyMetric(),
      "72h": emptyMetric(),
      "7d": emptyMetric(),
    },
    script: {
      onScreen: line,
      narration: note,
      beats: [line, note, ""],
      source: "template",
    },
    approved: false,
    rejections: [],
    render: { status: "idle", file: "", error: "", at: "" },
  };
}

export function fillCaptions(piece: Piece) {
  const meta = niches.find((item) => item.id === piece.niche)!;
  piece.captions = {
    tiktok: `${piece.line} ${piece.note}`.slice(0, 220),
    instagram: `${piece.line}\n${piece.note}\n#offload`,
    youtube: `${meta.label}: ${piece.line} ${piece.note}`.slice(0, 200),
    facebook: `${piece.line} ${piece.note} Filed under ${meta.name}.`,
  };
}

function metricRow(value: Partial<MetricRow> | undefined): MetricRow {
  return {
    views: value?.views ?? "",
    completion: value?.completion ?? "",
    shares: value?.shares ?? "",
    comments: value?.comments ?? "",
    saves: value?.saves ?? "",
  };
}

export function normalizePiece(input: Piece): Piece {
  const fromClaude = input.script?.source === "claude";
  return {
    ...input,
    researchNote: input.researchNote ?? "",
    draftedFrom: input.draftedFrom ?? "",
    metrics: {
      "1h": metricRow(input.metrics?.["1h"]),
      "24h": metricRow(input.metrics?.["24h"]),
      "72h": metricRow(input.metrics?.["72h"]),
      "7d": metricRow(input.metrics?.["7d"]),
    },
    approved: Boolean(input.approved) && fromClaude,
    rejections: Array.isArray(input.rejections) ? input.rejections.map(String).map((reason) => reason.trim()).filter(Boolean).slice(0, 12) : [],
    script: fromClaude
      ? {
          onScreen: input.script.onScreen || input.line,
          narration: input.script.narration || input.note,
          beats: [input.script.beats?.[0] ?? "", input.script.beats?.[1] ?? "", input.script.beats?.[2] ?? ""],
          source: "claude",
        }
      : {
          onScreen: input.line,
          narration: input.note,
          beats: [input.line, input.note, ""],
          source: "template",
        },
    render: {
      status: input.render?.status ?? "idle",
      file: input.render?.file ?? "",
      error: input.render?.error ?? "",
      at: input.render?.at ?? "",
    },
  };
}

export function nicheById(id: string) {
  return niches.find((niche) => niche.id === id);
}

const oldLines = new Set([
  "One finding.",
  "We will not say the cure.",
  "For the clinic file.",
  "Source. Finding. What we will not say.",
  "One figure.",
  "Saves, not views.",
  "The number is labeled.",
  "What it did. What it did not.",
  "She remembered.",
  "The day was already circled.",
  "Nothing else was added.",
  "One card. One sentence.",
  "The line they missed.",
  "Paper, then the mark scheme.",
  "What to say.",
  "One card. One mark.",
]);

function openingFor(id: string) {
  return seed().find((piece) => piece.id === id);
}

export function clearScript(piece: Piece) {
  const opening = openingFor(piece.id);
  if (!opening) return;
  piece.line = opening.line;
  piece.note = opening.note;
  piece.script = {
    onScreen: opening.line,
    narration: opening.note,
    beats: [opening.line, opening.note, ""],
    source: "template",
  };
  piece.approved = false;
  piece.draftedFrom = "";
  piece.researchNote = "";
  piece.render = { status: "idle", file: "", error: "", at: "" };
  fillCaptions(piece);
}

export function needsScript(piece: Piece) {
  if (piece.stamps.length > 0) return false;
  if (piece.draftedFrom === "held") {
    const at = Date.parse(piece.researchNote);
    if (Number.isFinite(at) && Date.now() - at < 30 * 60 * 1000) return false;
  }
  const designTalk = /cream paper|black type|blue script/i;
  if (piece.script?.beats?.some((beat) => designTalk.test(beat))) return true;
  return piece.script.source !== "claude";
}

function shelveStale(pieces: Piece[]) {
  let changed = false;
  for (const piece of pieces) {
    const stale = oldLines.has(piece.line) || oldLines.has(piece.script?.onScreen);
    if (!stale) continue;
    if (piece.niche === "gcsealevel" && piece.stamps.length > 0) continue;
    const opening = openingFor(piece.id);
    if (!opening) continue;
    piece.line = opening.line;
    piece.note = opening.note;
    piece.stamps = piece.niche === "gcsealevel" ? piece.stamps : [];
    piece.liveUrl = piece.niche === "gcsealevel" ? piece.liveUrl : "";
    piece.draftedFrom = "";
    piece.researchNote = "";
    piece.script = {
      onScreen: opening.line,
      narration: opening.note,
      beats: [opening.line, opening.note, ""],
      source: "template",
    };
    piece.render = { status: "idle", file: "", error: "", at: "" };
    fillCaptions(piece);
    changed = true;
  }
  if (changed) writeDesk(pieces);
  return pieces;
}

export function readDesk() {
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as Piece[];
    if (Array.isArray(parsed) && parsed.length === 16) return shelveStale(parsed.map(normalizePiece));
  } catch {
    // The first open writes the week below.
  }
  const pieces = seed();
  writeDesk(pieces);
  return pieces;
}

export function writeDesk(pieces: Piece[]) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(pieces, null, 2));
}

export function findPiece(pieces: Piece[], id: string) {
  return pieces.find((piece) => piece.id === id);
}

export function canStamp(piece: Piece, person: PersonId) {
  if (!piece.approved || piece.script.source !== "claude") return false;
  if (piece.stamps.includes(person)) return false;
  if (piece.stamps.length === 0) return piece.lead === person;
  return piece.needsSecond;
}

export function isReady(piece: Piece) {
  return piece.stamps.length >= (piece.needsSecond ? 2 : 1);
}

export function yourStampCount(pieces: Piece[], person: PersonId) {
  return pieces.filter((piece) => canStamp(piece, person)).length;
}
