import { existsSync, readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

/** The signal stream: web/data/signals.jsonl, appended by web/scripts/signals.py. */
const root = path.join(process.cwd(), "..");
const stream = path.join(process.cwd(), "data", "signals.jsonl");
const python = path.join(root, "tools", ".venv", "bin", "python");
const script = path.join(process.cwd(), "scripts", "signals.py");

export type Outlier = {
  type: "outlier";
  at: string;
  niche: string;
  platform: "youtube" | "tiktok";
  account: string;
  id: string;
  url: string;
  title: string;
  views: number;
  usual: number;
  ratio: number;
  hook: string;
};
export type Run = { type: "run"; at: string; accounts: number; outliers: number; failed: { account: string; error: string }[] };
export type Signal = Outlier | Run;

export function readSignals(): Signal[] {
  if (!existsSync(stream)) return [];
  return readFileSync(stream, "utf8")
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as Signal];
      } catch {
        return [];
      }
    });
}

export function outliers(since?: string): Outlier[] {
  return readSignals()
    .filter((s): s is Outlier => s.type === "outlier" && (!since || s.at > since))
    .sort((a, b) => b.at.localeCompare(a.at) || b.ratio - a.ratio);
}

export function lastRun(): Run | undefined {
  return readSignals().filter((s): s is Run => s.type === "run").at(-1);
}

let running = false;
/** Start one collection run in the background. Returns false if one is already going. */
export function startRun() {
  if (running || !existsSync(python)) return false;
  running = true;
  const child = spawn(python, ["-I", script], { cwd: root, stdio: "ignore" });
  child.on("exit", () => (running = false));
  child.on("error", () => (running = false));
  return true;
}
export const isRunning = () => running;
