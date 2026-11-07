// The Mac worker: runs queued jobs from marketing.jobs one at a time (voice and render need this Mac).
//
//   node scripts/worker.mjs            run until the queue has been empty for 10 minutes
//   node scripts/worker.mjs --forever  keep polling (for launchd)
//
// Job kinds: make-film {content_id, note?}, post {post_ids}, blotato-sync, suggest-ideas, inspiration, signals {args}, catalogue.
// While posts are out at Blotato, the worker also checks their status and numbers every 20 minutes, and
// keeps running until none is left publishing or scheduled.
// A lock file stops two workers running at once. Run from web/.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const lock = path.join(os.tmpdir(), "offload-desk-worker.lock");
try {
  const pid = Number(fs.readFileSync(lock, "utf8"));
  if (pid && pid !== process.pid) {
    try {
      process.kill(pid, 0);
      console.log(`worker already running (pid ${pid})`);
      process.exit(0);
    } catch {}
  }
} catch {}
fs.writeFileSync(lock, String(process.pid));
const release = () => {
  try {
    if (Number(fs.readFileSync(lock, "utf8")) === process.pid) fs.rmSync(lock);
  } catch {}
};
process.on("exit", release);
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const { sql, get } = await import(path.join(process.cwd(), "scripts", "agent.mjs"));
const { publish, syncPosts } = await import(path.join(process.cwd(), "scripts", "publish.mjs"));
const SYNC_MS = 20 * 60 * 1000;
let lastSync = 0;
const root = path.join(process.cwd(), "..");
const forever = process.argv.includes("--forever");
const IDLE_MS = 10 * 60 * 1000;
let idleSince = Date.now();

const run = (cmd, args, cwd) => {
  const r = spawnSync(cmd, args, { cwd, encoding: "utf8" });
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || "failed").slice(-400));
};

async function take() {
  // claim the oldest queued job atomically
  const [job] = await sql`update jobs set status = 'running', started_at = now(), attempts = attempts + 1
    where id = (select id from jobs where status = 'queued' order by created_at limit 1 for update skip locked) returning *`;
  return job;
}

async function handle(job) {
  const p = job.payload ?? {};
  switch (job.kind) {
    case "make-film":
    {
      // its own process each time, so a change to the agent's code applies to the very next film
      const r = spawnSync(process.execPath, ["scripts/agent.mjs", p.content_id, ...(p.note ? ["--note", p.note] : []), ...(p.render ? ["--render"] : [])], { cwd: process.cwd(), encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
      if (r.status !== 0) throw new Error((r.stderr || r.stdout || "the agent failed").trim().split("\n").slice(-3).join(" ").slice(0, 600));
      return { id: (r.stdout.match(/(?:made|held) (\S+)/) ?? [])[1] ?? p.content_id };
    }
    case "post":
      return publish(sql, get, p.post_ids ?? []).finally(() => (lastSync = Date.now() - SYNC_MS + 90_000)); // first status check 90s later
    case "blotato-sync":
      lastSync = Date.now();
      return syncPosts(sql, get);
    case "suggest-ideas":
      return run(process.execPath, ["scripts/suggest-ideas.mjs"], process.cwd());
    case "inspiration":
      run("python3", ["-I", "web/scripts/inspiration.py"], root);
      return run(process.execPath, ["scripts/sync-to-db.mjs"], process.cwd());
    case "signals":
      run(path.join(root, "tools", ".venv", "bin", "python"), ["-I", "web/scripts/signals.py", ...(p.args ?? [])], root);
      return run(process.execPath, ["scripts/sync-to-db.mjs"], process.cwd());
    case "catalogue":
      run(process.execPath, ["scripts/library.mjs"], root);
      return run(process.execPath, ["scripts/sync-to-db.mjs"], process.cwd());
    default:
      throw new Error(`Unknown job kind ${job.kind}`);
  }
}

console.log(`worker ${process.pid} started`);
for (;;) {
  const job = await take().catch((e) => {
    console.error("queue:", e.message);
    return null;
  });
  if (job) {
    idleSince = Date.now();
    console.log(`job ${job.id} ${job.kind}`);
    try {
      const out = await handle(job);
      await sql`update jobs set status = 'done', finished_at = now(), error = null where id = ${job.id}`;
      console.log(`job ${job.id} done`, out?.id ?? JSON.stringify(out ?? ""));
    } catch (e) {
      await sql`update jobs set status = 'failed', finished_at = now(), error = ${String(e.message).slice(0, 2000)} where id = ${job.id}`;
      if (job.kind === "make-film" && job.payload?.content_id) {
        await sql`update content set status = 'accepted', updated_at = now(),
          rejections = rejections || ${sql.json([{ by: "Desk", reason: `Making the film failed: ${String(e.message).slice(0, 300)}`, at: new Date().toISOString() }])}
          where id = ${job.payload.content_id} and status <> 'rejected'`;
      }
      console.error(`job ${job.id} failed:`, e.message);
    }
    continue;
  }
  if (Date.now() - lastSync > SYNC_MS) {
    lastSync = Date.now();
    await syncPosts(sql, get).then((r) => console.log("sync", JSON.stringify(r))).catch((e) => console.error("sync:", e.message));
  }
  const [{ n }] = await sql`select count(*)::int as n from posts where status in ('planned','publishing','scheduled')`.catch(() => [{ n: 0 }]);
  if (!forever && !n && Date.now() - idleSince > IDLE_MS) break;
  await new Promise((r) => setTimeout(r, 15000));
}
await sql.end();
console.log("worker idle, stopping");
