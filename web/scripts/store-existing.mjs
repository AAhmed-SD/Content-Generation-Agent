#!/usr/bin/env node
// One-off: put every film and carousel the desk shows into Supabase Storage, so the hosted desk can play them.
//   node scripts/store-existing.mjs      (from web/)
import fs from "node:fs";
import path from "node:path";
import { get, root, sql } from "./lead/lib.mjs";
import { storageReady, store } from "./storage.mjs";

if (!storageReady(get)) {
  console.log("Put SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in web/.env.local first.");
  process.exit(1);
}
const out = path.join(root, "remotion", "out");
const rows = await sql`select kind, media_url, spec from content where media_url is not null and status <> 'rejected'`;
const files = new Set();
for (const r of rows) {
  if (r.kind === "carousel") for (const f of [...(r.spec?.files ?? []), ...(r.spec?.tiktok ?? [])]) files.add(f);
  else files.add(r.media_url);
}
let done = 0;
for (const key of files) {
  const file = path.join(out, key);
  if (!fs.existsSync(file)) continue;
  await store(get, file, key).then(() => done++).catch((e) => console.error(key, e.message));
}
console.log(`stored ${done} of ${files.size} files`);
await sql.end();
