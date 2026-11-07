#!/usr/bin/env node
// One-off (2026-11-07): every film still waiting to post is re-rendered in the full-screen centred layout, and its
// posts are recreated fresh at Blotato (editing scheduled posts in place left some stuck). Soonest film first:
//   1. render the film again and upload it;
//   2. for each of its posts: cancel the Blotato schedule if there is one, mark our row replaced, and queue a new post
//      with the same caption at the same time (a time already past goes out within 10 minutes);
//   3. the worker posts the new rows, unlabelled, with the new video.
// A post whose film already went out on that account is not recreated (no duplicates).
//
//   node scripts/redo-scheduled.mjs      (from web/)
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { get, root, sql } from "./lead/lib.mjs";
import { blotato } from "./blotato.mjs";

const remotion = path.join(root, "remotion");
const api = blotato(() => get("BLOTATO_API_KEY"));
const H = { "blotato-api-key": get("BLOTATO_API_KEY"), "content-type": "application/json" };
async function call(url, init) {
  for (let i = 0; ; i++) {
    try {
      return await fetch(url, init);
    } catch (e) {
      if (i >= 2) throw e;
      await new Promise((r) => setTimeout(r, 3000 * (i + 1)));
    }
  }
}

// posts waiting (scheduled), or stuck (publishing), whose film has not already gone out on that account
const waiting = await sql`select p.*, a.platform, a.blotato_account_id, c.bank_id, c.title
  from posts p join accounts a on a.id = p.account_id join content c on c.id = p.content_id
  where not p.test and c.kind = 'film' and p.status in ('scheduled', 'publishing', 'planned')
    and not exists (select 1 from posts q where q.content_id = p.content_id and q.account_id = p.account_id and q.status = 'published' and not q.test)`;
const superseded = await sql`update posts p set status = 'failed', error = 'Superseded: this film already went out on this account.'
  where not p.test and p.status in ('scheduled', 'publishing', 'planned')
    and exists (select 1 from posts q where q.content_id = p.content_id and q.account_id = p.account_id and q.status = 'published' and not q.test)
  returning id`;
// ONLY="Title one|Title two" limits the run to those films
const only = process.env.ONLY ? new Set(process.env.ONLY.split("|")) : null;
const films = [...new Map(waiting.filter((p) => !only || only.has(p.title)).map((p) => [p.content_id, p])).values()].sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
console.log(`${films.length} films, ${waiting.length} posts to redo; ${superseded.length} duplicate rows closed`);

for (const f of films) {
  const t0 = Date.now();
  const out = `out/bank/offload-${f.bank_id}.mp4`;
  // already rendered in the centred layout this run: do not render again
  const done = fs.existsSync(path.join(remotion, out)) && fs.statSync(path.join(remotion, out)).mtimeMs > Date.parse("2026-11-07T17:20:00Z");
  const r = done ? { status: 0 } : spawnSync("npx", ["remotion", "render", "src/world/index.ts", `Bank-${f.bank_id}`, out, "--log=error"], { cwd: remotion, encoding: "utf8" });
  if (r.status !== 0 || !fs.existsSync(path.join(remotion, out))) {
    console.log(`FAIL render ${f.title}: ${(r.stderr || "").slice(-300)}`);
    continue;
  }
  let url;
  for (let i = 0; !url; i++) url = await api.upload(path.join(remotion, out)).catch((e) => (i >= 2 ? Promise.reject(e) : null));
  await sql`update content set blotato_media_url = ${url} where id = ${f.content_id}`;

  const schedules = (await (await call("https://backend.blotato.com/v2/schedules?limit=100", { headers: H })).json()).items ?? [];
  const fresh = [];
  // one post per account: cancel every Blotato schedule for this film's slot (an old copy and any duplicate),
  // close every row, then create exactly one
  const mine = waiting.filter((x) => x.content_id === f.content_id);
  for (const accountId of [...new Set(mine.map((x) => x.account_id))]) {
    const rows = mine.filter((x) => x.account_id === accountId);
    const p = rows.sort((x, y) => new Date(y.created_at) - new Date(x.created_at))[0];
    const times = new Set(rows.map((x) => new Date(x.scheduled_at).getTime()));
    const matches = schedules.filter((x) => String(x.draft?.accountId) === String(p.blotato_account_id) && x.draft?.target?.targetType === p.platform && times.has(new Date(x.scheduledAt).getTime()));
    let blocked = false;
    for (const sch of matches) {
      // no JSON content-type on a DELETE: Blotato refuses an empty body with one
      const d = await call(`https://backend.blotato.com/v2/schedules/${sch.id}`, { method: "DELETE", headers: { "blotato-api-key": get("BLOTATO_API_KEY") } });
      if (d.status >= 300 && d.status !== 404) blocked = true;
    }
    if (blocked) {
      console.log(`  could not cancel ${p.platform}; left as it is`);
      continue;
    }
    await sql`update posts set status = 'failed', error = 'Replaced: recreated fresh with the centred layout.' where id in ${sql(rows.map((x) => x.id))}`;
    const when = new Date(p.scheduled_at) > new Date(Date.now() + 5 * 60e3) ? new Date(p.scheduled_at).toISOString() : new Date(Date.now() + 10 * 60e3).toISOString();
    const [n] = await sql`insert into posts (content_id, account_id, caption, scheduled_at, status, test) values (${p.content_id}, ${p.account_id}, ${p.caption}, ${when}, 'planned', false) returning id`;
    fresh.push(n.id);
  }
  if (fresh.length) await sql`insert into jobs (kind, payload) values ('post', ${sql.json({ post_ids: fresh })})`;
  console.log(`ok ${f.title}: ${fresh.length} posts recreated, ${Math.round((Date.now() - t0) / 1000)}s`);
}
await sql.end();
