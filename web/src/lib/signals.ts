import { existsSync, readFileSync } from "node:fs";
import { db, isLocal, queueJob, syncToDb } from "@/lib/db";
import { spawn } from "node:child_process";
import path from "node:path";

/** The signal stream: signals.py writes web/data/signals.jsonl on the Mac; scripts/sync-to-db.mjs copies it into Supabase. */
const root = path.join(process.cwd(), "..");
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

/** The accounts on the watch list now. Niche videos count only from these, so a removed (non-UK) account drops out. */
function watched() {
  try {
    const list = JSON.parse(readFileSync(path.join(process.cwd(), "research", "watchlist.json"), "utf8")) as { accounts: { handle: string }[] };
    return new Set(list.accounts.map((a) => a.handle));
  } catch {
    return null;
  }
}

/** Outliers from Supabase (marketing.signals), newest first. */
export async function outliers(since?: string): Promise<Outlier[]> {
  const now = watched();
  const rows = since
    ? await db()`select * from signals where collected_at > ${since} order by collected_at desc, ratio desc limit 2000`
    : await db()`select * from signals order by collected_at desc, ratio desc limit 2000`;
  return rows
    .filter((r) => !now || now.has(r.account))
    .map((r) => ({
      type: "outlier" as const,
      at: new Date(r.collected_at).toISOString(),
      niche: r.niche,
      platform: r.platform,
      account: r.account ?? "",
      id: String(r.id).split(":").pop() ?? r.id,
      url: r.url ?? "",
      title: r.title ?? "",
      views: Number(r.views ?? 0),
      usual: Number(r.usual ?? 0),
      ratio: Number(r.ratio ?? 0),
      hook: r.hook ?? "",
    }));
}

export async function lastRun(): Promise<Run | undefined> {
  const [row] = await db()`select at, detail from runs where kind = 'signals' order by at desc limit 1`;
  return row ? ({ type: "run", at: new Date(row.at).toISOString(), ...(row.detail as Omit<Run, "type" | "at">) } as Run) : undefined;
}

let running = false;
/** Start one collection run in the background. Returns false if one is already going. */
export async function startRun(args: string[] = []) {
  if (!isLocal()) {
    await queueJob("signals", { args });
    return true;
  }
  if (running || !existsSync(python)) return false;
  running = true;
  const child = spawn(python, ["-I", script, ...args], { cwd: root, stdio: "ignore" });
  child.on("exit", () => {
    running = false;
    void syncToDb();
  });
  child.on("error", () => (running = false));
  return true;
}
export const isRunning = () => running;
