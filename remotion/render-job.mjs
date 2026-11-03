import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [id, propsPath, outputPath, deskPath, logPath] = process.argv.slice(2);

function update(status, error) {
  const pieces = JSON.parse(readFileSync(deskPath, "utf8"));
  const piece = pieces.find((item) => item.id === id);
  if (!piece) return;
  piece.render = {
    status,
    file: status === "ready" ? outputPath : piece.render?.file ?? "",
    error: error ?? "",
    at: new Date().toISOString(),
  };
  writeFileSync(deskPath, JSON.stringify(pieces, null, 2));
}

const props = JSON.parse(readFileSync(propsPath, "utf8"));
const composition = props.composition === "OffloadPin" ? "OffloadPin" : "OffloadCard";
const still = composition === "OffloadPin" || props.format === "still";
const args = still
  ? ["remotion", "still", "src/index.ts", composition, outputPath, "--frame=0", `--props=${propsPath}`]
  : ["remotion", "render", "src/index.ts", composition, outputPath, `--props=${propsPath}`];

const accounts = {
  clinical: "offload.clinical",
  analytical: "offload.analytical",
  mentalhealth: "offload.mentalhealth",
  gcsealevel: "offload.gcsealevel",
};

function takeQueueLock(lock) {
  try {
    mkdirSync(lock);
    return true;
  } catch {
    try {
      const age = Date.now() - statSync(lock).mtimeMs;
      if (age < 2 * 60 * 1000) return false;
      rmSync(lock, { recursive: true, force: true });
      mkdirSync(lock);
      return true;
    } catch {
      return false;
    }
  }
}

function claimNext() {
  const lock = path.join(path.dirname(deskPath), "render.queue.lock");
  if (!takeQueueLock(lock)) return null;
  try {
    const pieces = JSON.parse(readFileSync(deskPath, "utf8"));
    if (pieces.some((item) => item.render?.status === "rendering")) return null;
    const next = pieces.find((item) => item.approved && item.script?.source === "claude" && item.render?.status === "idle");
    if (!next) return null;
    next.render = { status: "rendering", file: "", error: "", at: new Date().toISOString() };
    writeFileSync(deskPath, JSON.stringify(pieces, null, 2));
    return next;
  } finally {
    rmSync(lock, { recursive: true, force: true });
  }
}

function launch(piece) {
  if (!piece) return;
  const renders = path.join(path.dirname(deskPath), "renders");
  const stillPiece = piece.format === "still";
  const ext = stillPiece ? "png" : "mp4";
  const propsPath = path.join(renders, `${piece.id}.props.json`);
  const outputPath = path.join(renders, `${piece.id}.${ext}`);
  const nextLog = path.join(renders, `${piece.id}.log`);
  const account = accounts[piece.niche] || piece.niche;
  const line = piece.script?.onScreen || piece.line;
  const home = { clinical: "folder", analytical: "calculator", mentalhealth: "calendar", gcsealevel: "file" };
  mkdirSync(renders, { recursive: true });
  writeFileSync(
    propsPath,
    JSON.stringify(
      stillPiece
        ? { composition: "OffloadPin", line, note: piece.note, niche: account, layout: home[piece.niche] || "card", stamp: "FILED" }
        : {
            composition: "OffloadCard",
            line,
            note: piece.note,
            niche: account,
            narration: piece.script?.narration || piece.note,
            beats: piece.script?.beats || [],
            format: piece.format,
          },
      null,
      2,
    ),
  );
  const child = spawn(process.execPath, [fileURLToPath(import.meta.url), piece.id, propsPath, outputPath, deskPath, nextLog], {
    detached: true,
    stdio: "ignore",
  });
  child.unref();
}

const result = spawnSync("npx", args, {
  cwd: path.dirname(fileURLToPath(import.meta.url)),
  encoding: "utf8",
  maxBuffer: 20 * 1024 * 1024,
});

const log = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.slice(-4000);
writeFileSync(logPath, log);
if (result.status === 0) update("ready", "");
else update("failed", (result.stderr || result.stdout || "Remotion failed").slice(-500));
launch(claimNext());
