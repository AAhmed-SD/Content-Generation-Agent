import { existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { revalidatePath } from "next/cache";
import { askClaude, parseScript } from "@/lib/claude";
import { fillCaptions, needsScript, readDesk, writeDesk, type Piece } from "@/lib/desk";
import { kokoroPaths } from "@/lib/local";
import { compileBriefs, gatherResearch, readBriefs, readResearch } from "@/lib/pipeline";
import { claudePrompt, queueRender } from "@/lib/studio";

const lockDir = path.join(process.cwd(), "data", "prepare.lock");
const holdFile = path.join(process.cwd(), "data", "research-hold.txt");

function takeLock() {
  try {
    mkdirSync(lockDir);
    return true;
  } catch {
    try {
      const age = Date.now() - statSync(lockDir).mtimeMs;
      if (age < 20 * 60 * 1000) return false;
      rmSync(lockDir, { recursive: true, force: true });
      mkdirSync(lockDir);
      return true;
    } catch {
      return false;
    }
  }
}

function releaseLock() {
  rmSync(lockDir, { recursive: true, force: true });
}

function takeQueueLock(lock: string) {
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

function researchCooling() {
  try {
    const at = Date.parse(statSync(holdFile).mtime.toISOString());
    return Number.isFinite(at) && Date.now() - at < 30 * 60 * 1000;
  } catch {
    return false;
  }
}

function speak(piece: Piece) {
  const renders = path.join(process.cwd(), "data", "renders");
  mkdirSync(renders, { recursive: true });
  const textPath = path.join(renders, `${piece.id}.narration.txt`);
  const wav = path.join(renders, `${piece.id}.wav`);
  writeFileSync(textPath, piece.script.narration || piece.note);
  return new Promise<void>((resolve) => {
    const child = spawn(kokoroPaths.python, [path.join(process.cwd(), "..", "scripts", "speak.py"), textPath, wav], {
      stdio: "ignore",
    });
    const timer = setTimeout(() => {
      child.kill();
      resolve();
    }, 60000);
    child.on("close", () => {
      clearTimeout(timer);
      resolve();
    });
    child.on("error", () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

export async function writeScripts() {
  const pieces = readDesk();
  const briefs = readBriefs();
  for (const piece of pieces) {
    if (!needsScript(piece)) continue;
    const brief = briefs?.briefs.find((item) => item.niche === piece.niche);
    try {
      const reply = await askClaude(claudePrompt(piece, brief?.text ?? ""));
      const script = parseScript(reply);
      if (!script) throw new Error("shape");
      piece.script = { ...script, source: "claude" };
      piece.line = script.onScreen;
      piece.note = script.narration;
      piece.approved = false;
      piece.draftedFrom = "claude";
      piece.researchNote = "";
      piece.render = { status: "idle", file: "", error: "", at: "" };
      fillCaptions(piece);
    } catch {
      piece.draftedFrom = "held";
      piece.researchNote = new Date().toISOString();
    }
    writeDesk(pieces);
  }
  revalidatePath("/desk/scripts");
}

export async function prepareWeek() {
  if (!takeLock()) return;
  try {
    if (!readResearch() && !researchCooling()) {
      try {
        const research = await gatherResearch();
        compileBriefs(research);
      } catch {
        writeFileSync(holdFile, new Date().toISOString());
      }
    }
    const pieces = readDesk();
    const briefs = readBriefs();
    for (const piece of pieces) {
      if (!needsScript(piece)) continue;
      const brief = briefs?.briefs.find((item) => item.niche === piece.niche);
      try {
        const reply = await askClaude(claudePrompt(piece, brief?.text ?? ""));
        const script = parseScript(reply);
        if (!script) throw new Error("shape");
        piece.script = { ...script, source: "claude" };
        piece.line = script.onScreen;
        piece.note = script.narration;
        piece.draftedFrom = "claude";
        piece.researchNote = "";
        piece.render = { status: "idle", file: "", error: "", at: "" };
        fillCaptions(piece);
      } catch {
        piece.draftedFrom = "held";
        piece.researchNote = new Date().toISOString();
      }
      writeDesk(pieces);
    }
    if (existsSync(kokoroPaths.voiceModel) && existsSync(kokoroPaths.python)) {
      for (const piece of pieces) {
        if (piece.script.source !== "claude") continue;
        const wav = path.join(process.cwd(), "data", "renders", `${piece.id}.wav`);
        if (existsSync(wav)) continue;
        await speak(piece);
      }
    }
    const queueLock = path.join(process.cwd(), "data", "render.queue.lock");
    if (takeQueueLock(queueLock)) {
      try {
        const current = readDesk();
        let moved = false;
        for (const piece of current) {
          if (piece.render.status !== "rendering") continue;
          const at = Date.parse(piece.render.at);
          if (Number.isFinite(at) && Date.now() - at < 20 * 60 * 1000) continue;
          piece.render = {
            status: "failed",
            file: piece.render.file,
            error: "The render stopped before it finished.",
            at: new Date().toISOString(),
          };
          moved = true;
        }
        if (moved) writeDesk(current);
        if (!current.some((piece) => piece.render.status === "rendering")) {
          const next = current.find((piece) => piece.approved && piece.script.source === "claude" && piece.render.status === "idle");
          if (next) {
            next.render = { status: "rendering", file: "", error: "", at: new Date().toISOString() };
            writeDesk(current);
            queueRender(next);
          }
        }
      } finally {
        rmSync(queueLock, { recursive: true, force: true });
      }
    }
    revalidatePath("/desk");
  } finally {
    releaseLock();
  }
}
