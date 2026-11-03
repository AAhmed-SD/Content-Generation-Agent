import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { scriptContext } from "@/lib/brand";
import { niches, type Piece } from "@/lib/desk";
import { layoutFor } from "@/lib/pin-layouts";

export function claudePrompt(piece: Piece, brief: string) {
  const niche = niches.find((item) => item.id === piece.niche);
  return [
    "Write one Offload advertisement. The excerpts below are the brand file and the product facts. Do not ask for files that are not pasted here.",
    "What Offload is: a paper card a student returns to. One sentence, then the fact, then stop.",
    "Capabilities, and only these: FSRS, the 4 phases, rescheduling, remediation deck, calendar sync. Do not explain how any of them work. Do not add a capability.",
    "Relate to the audience's struggle with study or time. Do not teach their subject. Do not give advice in their field. Do not describe how Offload works.",
    "Beats are short sentences the student reads. Do not mention paper, colour, type, or the word offload.",
    "The trial CTA is a caption the desk adds later. Leave it out of this reply.",
    "Do not add a number, a name, a cure, or a diagnosis. Do not explain. Reply in the shape at the end and nothing else.",
    `The picture is ${layoutFor(piece.niche).name}. One sentence. The desk places it. Do not describe the object.`,
    "",
    scriptContext(piece.niche, piece.format, piece.part),
    "",
    `Account: ${niche?.name ?? piece.niche}`,
    `Format: ${piece.format}, ${piece.part}`,
    `Card line: ${piece.line}`,
    `Card note: ${piece.note}`,
    "",
    "Brief:",
    brief || "No brief has been written yet. Stay with the card line.",
    "",
    piece.rejections.length ? `Rejections already given. Do not repeat them.\n${piece.rejections.map((reason) => `- ${reason}`).join("\n")}` : "",
    "Reply in this shape only. Each beat is under twelve words.",
    "on screen:",
    "narration:",
    "beat 1:",
    "beat 2:",
    "beat 3:",
  ].join("\n");
}

export function renderPaths(piece: Piece) {
  const renders = path.join(process.cwd(), "data", "renders");
  const ext = piece.format === "still" ? "png" : "mp4";
  return {
    renders,
    props: path.join(renders, `${piece.id}.props.json`),
    output: path.join(renders, `${piece.id}.${ext}`),
    log: path.join(renders, `${piece.id}.log`),
    desk: path.join(process.cwd(), "data", "desk.json"),
    job: path.join(process.cwd(), "..", "remotion", "render-job.mjs"),
  };
}

export function renderInput(piece: Piece) {
  const niche = niches.find((item) => item.id === piece.niche);
  const line = piece.script.onScreen || piece.line;
  const note = piece.note;
  const account = niche?.name ?? piece.niche;
  if (piece.format === "still") {
    return {
      composition: "OffloadPin" as const,
      line,
      note,
      niche: account,
      layout: layoutFor(piece.niche).id,
      stamp: "FILED",
    };
  }
  return {
    composition: "OffloadCard" as const,
    line,
    note,
    niche: account,
    narration: piece.script.narration || piece.note,
    beats: piece.script.beats,
    format: piece.format,
  };
}

export function queueRender(piece: Piece) {
  const paths = renderPaths(piece);
  mkdirSync(paths.renders, { recursive: true });
  writeFileSync(paths.props, JSON.stringify(renderInput(piece), null, 2));
  const child = spawn(process.execPath, [paths.job, piece.id, paths.props, paths.output, paths.desk, paths.log], {
    detached: true,
    stdio: "ignore",
  });
  child.unref();
}
