import postgres from "postgres";

/**
 * The desk's database: the `marketing` schema in the Offload Supabase project, reached as the `marketing_desk`
 * login, which can read and write only that schema (never the app's tables). Server-side only.
 *
 * Env: MARKETING_DB_HOST, MARKETING_DB_PORT (6543, the pooler), MARKETING_DB_USER, MARKETING_DB_PASSWORD.
 */
const globalForDb = globalThis as unknown as { marketingSql?: postgres.Sql };

export const hasDb = () => Boolean(process.env.MARKETING_DB_HOST && process.env.MARKETING_DB_USER && process.env.MARKETING_DB_PASSWORD);

function connect() {
  if (!hasDb()) throw new Error("The desk database is not configured: set MARKETING_DB_* in .env.local.");
  return postgres({
    host: process.env.MARKETING_DB_HOST,
    port: Number(process.env.MARKETING_DB_PORT || 6543),
    database: "postgres",
    username: process.env.MARKETING_DB_USER,
    password: process.env.MARKETING_DB_PASSWORD,
    ssl: "require",
    prepare: false, // the transaction pooler does not keep prepared statements
    max: process.env.VERCEL ? 1 : 5,
    idle_timeout: 20,
    max_lifetime: 60 * 5, // recycle connections, so a socket the pooler dropped is not reused for long
    connect_timeout: 10,
    // a query that hangs fails after 30 s instead of holding the page for minutes
    connection: { search_path: "marketing", statement_timeout: 30_000, idle_in_transaction_session_timeout: 30_000 },
  });
}

/** The shared client. Reused across hot reloads in dev and across invocations on Vercel. */
export function db() {
  if (!globalForDb.marketingSql) globalForDb.marketingSql = connect();
  return globalForDb.marketingSql;
}

/** True when this process can run local tools (the Mac), false on Vercel. */
export const isLocal = () => !process.env.VERCEL && !process.env.RENDER && !process.env.HOSTED;

/** Queue work for the Mac worker (voice, render, collectors, agent). */
export async function queueJob(kind: string, payload: Record<string, unknown> = {}) {
  const sql = db();
  const [row] = await sql`insert into jobs (kind, payload) values (${kind}, ${sql.json(payload as postgres.JSONValue)}) returning id`;
  return row.id as string;
}

export async function logRun(kind: string, detail: Record<string, unknown>) {
  const sql = db();
  await sql`insert into runs (kind, detail) values (${kind}, ${sql.json(detail as postgres.JSONValue)})`;
}

/** On the Mac: copy fresh collector output (signals, inspiration, catalogue) into Supabase. */
export function syncToDb() {
  if (!isLocal()) return Promise.resolve();
  return import("node:child_process").then(
    ({ spawn }) =>
      new Promise<void>((resolve) => {
        const child = spawn(process.execPath, ["scripts/sync-to-db.mjs"], { cwd: process.cwd(), stdio: "ignore" });
        child.on("exit", () => resolve());
        child.on("error", () => resolve());
      }),
  );
}

/** On the Mac: make sure a worker is running to take queued jobs (it stops itself after 10 quiet minutes). */
export async function ensureWorker() {
  if (!isLocal()) return;
  const { spawn } = await import("node:child_process");
  const fs = await import("node:fs");
  const out = fs.openSync("data/worker.log", "a");
  const child = spawn(process.execPath, ["scripts/worker.mjs"], { cwd: process.cwd(), detached: true, stdio: ["ignore", out, out] });
  child.unref();
}
