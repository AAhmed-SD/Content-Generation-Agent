// Posting through Blotato, run by the Mac worker (the films live on this Mac).
//
//   publish(sql, get, postIds)  upload each film once, then create one Blotato post per posts row
//   syncPosts(sql, get)         post status, public URLs, and metric snapshots back into the DB
import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { blotato, target, metricsOf } from "./blotato.mjs";

const OUT = path.join(process.cwd(), "..", "remotion", "out");

/**
 * What each platform takes for a short vertical video (checked 2026-11). Every film must be 9:16, at least
 * 720x1280, H.264, and within the platform's length. A film that fails is not posted; the post shows why.
 */
export const SPECS = {
  tiktok: { min: 3, max: 600, label: "TikTok" },
  instagram: { min: 3, max: 180, label: "Instagram Reels" },
  facebook: { min: 3, max: 90, label: "Facebook Reels" },
  youtube: { min: 1, max: 180, label: "YouTube Shorts" },
};
const probed = new Map();
function probe(file) {
  if (!probed.has(file)) {
    const r = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,codec_name:format=duration", "-of", "json", file], { encoding: "utf8" });
    const j = JSON.parse(r.stdout || "{}");
    const v = j.streams?.[0] ?? {};
    probed.set(file, { width: v.width, height: v.height, codec: v.codec_name, duration: Number(j.format?.duration) });
  }
  return probed.get(file);
}
/** Why this film cannot go to this platform, or null if it can. */
export function unfit(file, platform) {
  const s = SPECS[platform];
  if (!s) return null;
  const m = probe(file);
  if (!m.width || !m.height) return "The film file could not be read.";
  if (Math.abs(m.width / m.height - 9 / 16) > 0.01) return `${s.label} needs 9:16; this film is ${m.width}x${m.height}.`;
  if (m.width < 720) return `${s.label} needs at least 720x1280; this film is ${m.width}x${m.height}.`;
  if (m.codec !== "h264") return `${s.label} needs H.264 video; this film is ${m.codec}.`;
  if (m.duration < s.min || m.duration > s.max) return `${s.label} takes ${s.min} to ${s.max} seconds; this film is ${Math.round(m.duration)}.`;
  return null;
}

/**
 * A carousel: several images in one post. Instagram and Facebook get the 4:5 slides, TikTok the 9:16 copies.
 * Each image is uploaded once and its Blotato URL kept on the content row (blotato_media_urls), per set.
 */
async function postCarousel(sql, api, r) {
  const set = r.platform === "tiktok" ? "tiktok" : "files";
  const files = (r.spec?.[set] ?? []).map((f) => path.join(OUT, f));
  if (!files.length || files.some((f) => !fs.existsSync(f))) throw new Error("The carousel's slide images are missing on this Mac.");
  if (/\[[^\]]*(cta|not yet set|placeholder|todo|tbc)[^\]]*\]/i.test(r.caption ?? "")) throw new Error("The caption still has a placeholder in square brackets. Edit it out and post again.");
  for (const f of files) {
    const bad = unfitImage(f, r.platform);
    if (bad) throw new Error(bad);
  }
  const cache = r.blotato_media_urls ?? {};
  let urls = cache[set];
  if (!urls?.length) {
    urls = [];
    for (const f of files) urls.push(await api.upload(f));
    cache[set] = urls;
    await sql`update content set blotato_media_urls = ${sql.json(cache)} where id = ${r.cid}`;
    r.blotato_media_urls = cache;
  }
  if (!r.blotato_account_id) throw new Error("This account is not linked to Blotato.");
  const when = r.scheduled_at && new Date(r.scheduled_at) > new Date(Date.now() + 60_000) ? new Date(r.scheduled_at).toISOString() : undefined;
  // image posts: no reel media type
  const t = target(r.platform, { title: r.title || "Offload", pageId: r.blotato_page_id, test: r.test });
  delete t.mediaType;
  delete t.shareToFeed;
  const res = await api.post({ accountId: r.blotato_account_id, content: { text: r.caption ?? "", mediaUrls: urls, platform: r.platform }, target: t }, when);
  await sql`update posts set status = ${when ? "scheduled" : "publishing"}, blotato_submission_id = ${res.postSubmissionId}, error = null where id = ${r.id}`;
  const back = await api.status(res.postSubmissionId).catch(() => null);
  if (back) await sql`update posts set blotato_status = ${back.status ?? null}, synced_at = now(), scheduled_at = coalesce(${back.scheduledTime ?? null}::timestamptz, scheduled_at) where id = ${r.id}`;
}

/** Carousel images: 4:5 for Instagram and Facebook, 9:16 for TikTok, at least 1080 wide. */
export function unfitImage(file, platform) {
  const m = probe(file);
  if (!m.width || !m.height) return "A slide image could not be read.";
  const want = platform === "tiktok" ? 9 / 16 : 4 / 5;
  if (Math.abs(m.width / m.height - want) > 0.01) return `${platform === "tiktok" ? "TikTok" : platform === "instagram" ? "Instagram" : "Facebook"} carousel slides need ${platform === "tiktok" ? "9:16" : "4:5"}; this slide is ${m.width}x${m.height}.`;
  if (m.width < 1080) return `Carousel slides need to be at least 1080 wide; this one is ${m.width}.`;
  return null;
}

export async function publish(sql, get, postIds) {
  const api = blotato(() => get("BLOTATO_API_KEY"));
  const rows = await sql`
    select p.*, a.platform, a.blotato_account_id, a.blotato_page_id, c.media_url, c.blotato_media_url, c.blotato_media_urls, c.kind, c.spec, c.hook, c.title, c.captions, c.id as cid
    from posts p join accounts a on a.id = p.account_id join content c on c.id = p.content_id
    where p.id in ${sql(postIds)} and p.status = 'planned'`;
  const failed = [];
  for (const r of rows) {
    try {
      if (r.kind === "carousel") {
        await postCarousel(sql, api, r);
        continue;
      }
      let media = r.blotato_media_url;
      const file = path.join(OUT, r.media_url ?? "");
      if (!r.media_url || !fs.existsSync(file)) throw new Error(`The film file is missing on this Mac (${r.media_url ?? "no render"}).`);
      if (!String(r.caption ?? "").trim()) throw new Error("The caption is empty. Add one and post again.");
      // never post a caption with a placeholder left in it
      if (/\[[^\]]*(cta|not yet set|placeholder|todo|tbc)[^\]]*\]/i.test(r.caption ?? "")) throw new Error("The caption still has a placeholder in square brackets. Edit it out and post again.");
      const bad = unfit(file, r.platform);
      if (bad) throw new Error(bad);
      if (!media) {
        media = await api.upload(file);
        await sql`update content set blotato_media_url = ${media} where id = ${r.cid}`;
        for (const o of rows) if (o.cid === r.cid) o.blotato_media_url = media;
      }
      if (!r.blotato_account_id) throw new Error("This account is not linked to Blotato.");
      const when = r.scheduled_at && new Date(r.scheduled_at) > new Date(Date.now() + 60_000) ? new Date(r.scheduled_at).toISOString() : undefined;
      const res = await api.post(
        {
          accountId: r.blotato_account_id,
          content: { text: r.caption ?? "", mediaUrls: [media], platform: r.platform },
          target: target(r.platform, { title: r.captions?.youtube_title || r.hook || r.title || "Offload", pageId: r.blotato_page_id, test: r.test }),
        },
        when,
      );
      await sql`update posts set status = ${when ? "scheduled" : "publishing"}, blotato_submission_id = ${res.postSubmissionId}, error = null where id = ${r.id}`;
      // read it straight back, so the desk shows what Blotato has, not what we asked for
      const back = await api.status(res.postSubmissionId).catch(() => null);
      if (back) await sql`update posts set blotato_status = ${back.status ?? null}, synced_at = now(), scheduled_at = coalesce(${back.scheduledTime ?? null}::timestamptz, scheduled_at) where id = ${r.id}`;
    } catch (e) {
      failed.push(e.message);
      await sql`update posts set status = 'failed', error = ${String(e.message).slice(0, 600)} where id = ${r.id}`;
    }
  }
  if (failed.length === rows.length && rows.length) throw new Error(`No post went out: ${failed[0]}`);
  return { posted: rows.length - failed.length, failed: failed.length };
}

const CHECKPOINTS = [
  ["1h", 3600e3],
  ["24h", 86400e3],
  ["72h", 3 * 86400e3],
  ["7d", 7 * 86400e3],
];

export async function syncPosts(sql, get) {
  if (!get("BLOTATO_API_KEY")) return { skipped: "no key" };
  const api = blotato(() => get("BLOTATO_API_KEY"));
  // 1. status of everything not finished
  const open = await sql`select id, blotato_submission_id, scheduled_at from posts where blotato_submission_id is not null and status in ('publishing','scheduled')`;
  for (const p of open) {
    try {
      const s = await api.status(p.blotato_submission_id);
      // Blotato is the source of truth: its scheduled time and status, and when we last checked
      await sql`update posts set blotato_status = ${s.status ?? null}, synced_at = now(),
        scheduled_at = coalesce(${s.scheduledTime ?? null}::timestamptz, scheduled_at),
        status = case when ${s.status ?? ""} = 'scheduled' then 'scheduled' when ${s.status ?? ""} = 'in-progress' then 'publishing' else status end
        where id = ${p.id}`;
      if (s.status === "published")
        await sql`update posts set status = 'published', url = coalesce(${s.publicUrl ?? null}, url), posted_at = coalesce(posted_at, now()), error = null where id = ${p.id}`;
      else if (s.status === "failed") await sql`update posts set status = 'failed', error = ${String(s.errorMessage ?? "Blotato reported a failure").slice(0, 600)} where id = ${p.id}`;
      else if (s.status === "in-progress" && p.scheduled_at && Date.now() - new Date(p.scheduled_at) > 6 * 3600e3)
        await sql`update posts set error = 'Still in progress at Blotato six hours after its time. Check it in Blotato.' where id = ${p.id}`;
    } catch (e) {
      console.error("status", p.id, e.message);
    }
  }
  // 2. numbers for posts published in the last 30 days, matched on the public URL
  const live = await sql`select p.id, p.url, p.posted_at, p.blotato_post_id, a.platform from posts p join accounts a on a.id = p.account_id
    where p.status = 'published' and p.posted_at > now() - interval '30 days'`;
  if (!live.length) return { open: open.length, measured: 0 };
  const since = new Date(Math.min(...live.map((p) => +new Date(p.posted_at))) - 86400e3).toISOString();
  const items = [];
  for (const platform of [...new Set(live.map((p) => p.platform))]) items.push(...(await api.analytics({ since, platform }).catch(() => [])));
  const norm = (u) => (u ?? "").replace(/[?#].*$/, "").replace(/\/$/, "");
  let measured = 0;
  for (const p of live) {
    const it = items.find((i) => (p.blotato_post_id && i.id === p.blotato_post_id) || (p.url && norm(i.postUrl) === norm(p.url)));
    if (!it) continue;
    if (!p.blotato_post_id || !p.url) await sql`update posts set blotato_post_id = ${it.id}, url = coalesce(url, ${it.postUrl ?? null}) where id = ${p.id}`;
    const m = it.latestMetrics?.metrics;
    if (!m) continue;
    const age = Date.now() - new Date(p.posted_at);
    const cp = [...CHECKPOINTS].reverse().find(([, ms]) => age >= ms)?.[0] ?? "other";
    const x = metricsOf(m);
    // one row per checkpoint; 'other' keeps only the latest
    await sql`delete from metrics where post_id = ${p.id} and checkpoint = ${cp} and source = 'blotato'`;
    await sql`insert into metrics (post_id, taken_at, checkpoint, views, likes, comments, shares, saves, reach, source)
      values (${p.id}, ${it.latestMetrics.fetchedAt ?? new Date().toISOString()}, ${cp}, ${x.views}, ${x.likes}, ${x.comments}, ${x.shares}, ${x.saves}, ${x.reach}, 'blotato')`;
    measured++;
  }
  return { open: open.length, measured };
}
