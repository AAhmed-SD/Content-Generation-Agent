// Copy the desk's local files into Supabase (schema `marketing`). Safe to run again: everything is an upsert.
//
//   node scripts/sync-to-db.mjs            signals + inspiration (after each collector run)
//   node scripts/sync-to-db.mjs --all      also ideas, pulled, rejected, LinkedIn posts (the one-off import)
//
// Run from web/. Reads MARKETING_DB_* from .env.local.
import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

const web = process.cwd();
const env = Object.fromEntries(
  (fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "")
    .split("\n")
    .map((l) => l.match(/^\s*([A-Z_]+)\s*=\s*"?(.*?)"?\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);
const get = (k) => process.env[k] || env[k];
const sql = postgres({
  host: get("MARKETING_DB_HOST"),
  port: Number(get("MARKETING_DB_PORT") || 6543),
  database: "postgres",
  username: get("MARKETING_DB_USER"),
  password: get("MARKETING_DB_PASSWORD"),
  ssl: "require",
  prepare: false,
  max: 1,
  connection: { search_path: "marketing" },
});

const readJson = (f, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(web, f), "utf8"));
  } catch {
    return fallback;
  }
};
const readLines = (f) =>
  (fs.existsSync(path.join(web, f)) ? fs.readFileSync(path.join(web, f), "utf8") : "")
    .split("\n")
    .filter(Boolean)
    .flatMap((l) => {
      try {
        return [JSON.parse(l)];
      } catch {
        return [];
      }
    });
const ts = (v) => (v ? new Date(v) : null);
const counts = {};

// Signals: outliers and the latest run
{
  const rows = readLines("data/signals.jsonl");
  let n = 0;
  for (const r of rows.filter((x) => x.type === "outlier")) {
    await sql`insert into signals (id, niche, platform, account, url, title, hook, views, usual, ratio, collected_at)
      values (${`${r.platform}:${r.id}`}, ${r.niche}, ${r.platform}, ${r.account}, ${r.url}, ${r.title}, ${r.hook}, ${r.views}, ${r.usual}, ${r.ratio}, ${ts(r.at)})
      on conflict (id) do nothing`;
    n++;
  }
  const run = rows.filter((x) => x.type === "run").at(-1);
  if (run) {
    const [seen] = await sql`select 1 from runs where kind = 'signals' and at = ${ts(run.at)}`;
    if (!seen) await sql`insert into runs (kind, at, detail) values ('signals', ${ts(run.at)}, ${sql.json({ accounts: run.accounts, outliers: run.outliers, failed: run.failed })})`;
  }
  counts.signals = n;
}

// Inspiration: feed items and the latest run
{
  const rows = readLines("data/inspiration.jsonl");
  let n = 0;
  for (const r of rows.filter((x) => x.type === "item")) {
    const published = r.published && !Number.isNaN(Date.parse(r.published)) ? ts(r.published) : null;
    await sql`insert into inspiration_items (url, source, title, image, summary, published_at, collected_at)
      values (${r.url}, ${r.source}, ${r.title}, ${r.image || null}, ${r.summary || null}, ${published}, ${ts(r.at)})
      on conflict (url) do nothing`;
    n++;
  }
  const run = rows.filter((x) => x.type === "run").at(-1);
  if (run) {
    const [seen] = await sql`select 1 from runs where kind = 'inspiration' and at = ${ts(run.at)}`;
    if (!seen) await sql`insert into runs (kind, at, detail) values ('inspiration', ${ts(run.at)}, ${sql.json({ feeds: run.feeds, new: run.new, failed: run.failed })})`;
  }
  counts.inspiration = n;
}

// Research themes for this week (web/data/research.json, written by the desk's Research step)
{
  const research = readJson("data/research.json", null);
  if (research?.week && Array.isArray(research.themes)) {
    await sql`delete from research_items where week = ${research.week}`;
    for (const t of research.themes) await sql`insert into research_items (week, niche, source, text) values (${research.week}, ${t.niche}, ${t.source}, ${t.text})`;
    counts.research = research.themes.length;
  }
}

// The catalogue (built by scripts/library.mjs on the Mac): kept as the latest 'catalogue' run, for Vercel to read
{
  const cat = readJson("data/library.json", null);
  if (cat) {
    await sql`delete from runs where kind = 'catalogue'`;
    await sql`insert into runs (kind, detail) values ('catalogue', ${sql.json(cat)})`;
    counts.catalogue = `${cat.formats?.length ?? 0} formats, ${cat.films?.length ?? 0} films`;
  }
}

if (process.argv.includes("--all")) {
  const ideas = readJson("research/ideas.json", { ideas: [] }).ideas;
  for (const i of ideas) {
    await sql`insert into ideas (id, title, kind, niche, pitch, status, frames, by, at)
      values (${i.id}, ${i.title}, ${i.kind ?? null}, ${i.niche ?? null}, ${i.pitch ?? null}, ${i.status}, ${sql.json(i.frames ?? [])}, ${i.by ?? null}, ${i.at || null})
      on conflict (id) do nothing`;
  }
  counts.ideas = ideas.length;

  const pulled = readJson("research/pulled.json", { items: [] }).items;
  for (const p of pulled) {
    const [seen] = await sql`select 1 from pulled where name = ${p.name} and coalesce(url, '') = ${p.url ?? ""}`;
    if (!seen) await sql`insert into pulled (source, name, url, image, fit, status) values (${p.source ?? null}, ${p.name}, ${p.url || null}, ${p.image ?? null}, ${p.fit ?? null}, ${p.status ?? "idea"})`;
  }
  counts.pulled = pulled.length;

  const rej = readJson("research/rejected.json", { formats: [], inspiration: [] });
  for (const v of rej.formats ?? []) await sql`insert into rejected (kind, value) values ('format', ${v}) on conflict do nothing`;
  for (const v of rej.inspiration ?? []) await sql`insert into rejected (kind, value) values ('inspiration', ${v}) on conflict do nothing`;
  counts.rejected = (rej.formats?.length ?? 0) + (rej.inspiration?.length ?? 0);

  const li = readJson("research/linkedin.json", { posts: [] }).posts;
  for (const p of li) {
    await sql`insert into linkedin_posts (id, account, text, status, by, at) values (${p.id}, ${p.account}, ${p.text}, ${p.status}, ${p.by ?? null}, ${p.at || null}) on conflict (id) do nothing`;
  }
  counts.linkedin = li.length;
}

const [db] = await sql`select
  (select count(*) from signals) as signals, (select count(*) from inspiration_items) as inspiration,
  (select count(*) from ideas) as ideas, (select count(*) from pulled) as pulled, (select count(*) from rejected) as rejected,
  (select count(*) from linkedin_posts) as linkedin`;
console.log("read from files:", counts);
console.log("now in Supabase:", db);
await sql.end();
