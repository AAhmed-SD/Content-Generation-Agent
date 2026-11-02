import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export type StageFile = {
  research: string[];
  write: string[];
  voice: string[];
  transcript: string[];
  picture: string[];
  blocked: string[];
};

const root = path.join(process.cwd(), "..");
const python = path.join(root, "tools", ".venv", "bin", "python");
const voiceModel = path.join(root, "tools", "models", "kokoro-v1.0.onnx");
const voiceBin = path.join(root, "tools", "models", "voices-v1.0.bin");

export function readStages(): StageFile {
  return JSON.parse(readFileSync(path.join(root, "brand", "stages.json"), "utf8")) as StageFile;
}

function pythonHas(folder: string) {
  const lib = path.join(root, "tools", ".venv", "lib");
  if (!existsSync(lib)) return false;
  return readdirSync(lib).some((version) => existsSync(path.join(lib, version, "site-packages", folder)));
}

async function ollamaModels() {
  try {
    const response = await fetch("http://127.0.0.1:11434/api/tags", { signal: AbortSignal.timeout(1500) });
    if (!response.ok) return [];
    const json = (await response.json()) as { models?: { name: string }[] };
    return (json.models ?? []).map((model) => model.name);
  } catch {
    return [];
  }
}

export async function localStack() {
  const models = await ollamaModels();
  const chosen = process.env.OLLAMA_MODEL?.trim() || "gemma3:4b";
  const kokoroPackage = pythonHas("kokoro_onnx");
  const voiceFiles = existsSync(voiceModel) && existsSync(voiceBin);
  return {
    stages: readStages(),
    ollama: models.length ? `Running. Desk uses ${chosen}. Installed: ${models.join(", ")}.` : "Not running.",
    ollamaReady: models.includes(chosen),
    whisper: pythonHas("faster_whisper") ? "Installed. Tiny model, on this Mac." : "Not installed.",
    kokoro: voiceFiles && kokoroPackage ? "Installed. British voice bf_emma." : kokoroPackage ? "Package installed. Voice file is not downloaded yet." : "Not installed.",
    kokoroReady: voiceFiles && kokoroPackage,
    claude: process.env.ANTHROPIC_API_KEY?.trim() ? "Key is set." : "No key.",
    virlo: process.env.VIRLO_API_KEY?.trim() ? "Key is set. Keyword pass only." : "No key. The paid agent is not created.",
    youtube: process.env.YOUTUBE_API_KEY?.trim() ? "Key is set." : "No key.",
  };
}

export const kokoroPaths = { python, voiceModel, voiceBin };
