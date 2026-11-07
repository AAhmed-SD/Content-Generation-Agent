#!/usr/bin/env node
// One-off (2026-11-07): films already scheduled at Blotato were rendered before the safe area. For each one,
// soonest first: re-render it, upload the new mp4, and point its Blotato schedules at it. Times and captions stay.
//
//   node scripts/rerender-scheduled.mjs      (from web/)
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { get, root, sql } from "./lead/lib.mjs";
import { blotato } from "./blotato.mjs";

const remotion = path.join(root, "remotion");
const api = blotato(() => get("BLOTATO_API_KEY"));
const H = { "blotato-api-key": get("BLOTATO_API_KEY"), "content-type": "application/json" };
// the network drops now and then: try each call three times
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

const films = await sql`select c.id, c.title, c.bank_id, c.media_url, c.blotato_media_url, min(p.scheduled_at) as first
  from posts p join content c on c.id = p.content_id
  where c.kind = 'film' and not p.test and p.status in ('scheduled','publishing') and p.scheduled_at > now() + interval '10 minutes' and c.bank_id is not null
  group by c.id order by first`;
console.log(`${films.length} scheduled films to redo`);
for (const f of films) {
  const t0 = Date.now();
  const out = `out/bank/offload-${f.bank_id}.mp4`;
  const fresh = fs.existsSync(path.join(remotion, out)) && fs.statSync(path.join(remotion, out)).mtimeMs > Date.parse(process.env.FRESH_AFTER ?? "2026-11-07T13:20:00Z");
  const r = fresh ? { status: 0 } : spawnSync("npx", ["remotion", "render", "src/world/index.ts", `Bank-${f.bank_id}`, out, "--log=error"], { cwd: remotion, encoding: "utf8" });
  if (r.status !== 0 || !fs.existsSync(path.join(remotion, out))) {
    console.log(`FAIL render ${f.title}: ${(r.stderr || "").slice(-300)}`);
    continue;
  }
  let url;
  for (let i = 0; !url; i++) url = await api.upload(path.join(remotion, out)).catch((e) => (i >= 2 ? Promise.reject(e) : null));
  // this film's schedules at Blotato, matched on account, time and platform (Blotato keeps its own copy of the URL)
  const posts = await sql`select a.blotato_account_id, a.platform, p.scheduled_at from posts p join accounts a on a.id = p.account_id
    where p.content_id = ${f.id} and not p.test and p.status in ('scheduled','publishing')`;
  const items = (await (await call("https://backend.blotato.com/v2/schedules?limit=100", { headers: H })).json()).items ?? [];
  const mine = items.filter((s) => posts.some((p) => String(p.blotato_account_id) === String(s.draft?.accountId) && p.platform === s.draft?.target?.targetType && new Date(p.scheduled_at).getTime() === new Date(s.scheduledAt).getTime()));
  let patched = 0;
  for (const s of mine) {
    const draft = { ...s.draft, content: { ...s.draft.content, mediaUrls: [url] } };
    const p = await call(`https://backend.blotato.com/v2/schedules/${s.id}`, { method: "PATCH", headers: H, body: JSON.stringify({ patch: { draft } }) });
    if (p.status < 300) patched++;
  }
  await sql`update content set blotato_media_url = ${url} where id = ${f.id}`;
  console.log(`ok ${f.title}: ${patched}/${mine.length} schedules updated, ${Math.round((Date.now() - t0) / 1000)}s`);
}
await sql.end();
