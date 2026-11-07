import { readFileSync } from "node:fs";
import path from "node:path";
import { db } from "@/lib/db";

/** Handles on the watch list now (UK only for the four niches), so removed accounts drop out of the counts. */
function watched(): string[] {
  try {
    const list = JSON.parse(readFileSync(path.join(process.cwd(), "research", "watchlist.json"), "utf8")) as { accounts: { handle: string }[] };
    return list.accounts.map((a) => a.handle);
  } catch {
    return [];
  }
}

/**
 * The funnel, from Supabase. Top: what is happening out there (signals, Virlo, research, inspiration), per niche.
 * Bottom: what our own posts did, per account per platform, from the latest snapshot of each post.
 */

export const PLATFORMS = ["tiktok", "instagram", "facebook", "youtube", "linkedin"] as const;
export type Platform = (typeof PLATFORMS)[number];
export const PLATFORM_LABEL: Record<string, string> = { tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook", youtube: "YouTube Shorts", linkedin: "LinkedIn" };
export const NICHE_LABEL: Record<string, string> = { clinical: "offload.clinical", analytical: "offload.analytical", gcsealevel: "offload.gcsealevel", mentalhealth: "offload.mentalhealth", all: "LinkedIn" };

export type AccountRow = {
  id: string;
  niche: string;
  platform: Platform;
  kind: string;
  handle: string | null;
  status: string;
  connected: boolean;
  posts: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  follows: number;
  lastPosted: string | null;
};

export type Range = { days: number; niche?: string; platform?: string };

/** One row per account (19), with totals over the range from each post's latest snapshot. */
export async function accountTable({ days, niche, platform }: Range): Promise<AccountRow[]> {
  const sql = db();
  const rows = await sql`
    with latest as (
      select distinct on (m.post_id) m.*
      from metrics m join posts p on p.id = m.post_id
      where p.posted_at > now() - make_interval(days => ${days})
      order by m.post_id, m.taken_at desc
    )
    select a.id, a.niche, a.platform, a.kind, a.handle, a.status, a.blotato_account_id is not null as connected,
      count(distinct p.id) filter (where p.posted_at > now() - make_interval(days => ${days})) as posts,
      coalesce(sum(l.views), 0) as views, coalesce(sum(l.likes), 0) as likes, coalesce(sum(l.comments), 0) as comments,
      coalesce(sum(l.shares), 0) as shares, coalesce(sum(l.saves), 0) as saves, coalesce(sum(l.reach), 0) as reach,
      coalesce(sum(l.follows), 0) as follows, max(p.posted_at) as last_posted
    from accounts a
    left join posts p on p.account_id = a.id
    left join latest l on l.post_id = p.id
    where (${niche ?? null}::text is null or a.niche = ${niche ?? null})
      and (${platform ?? null}::text is null or a.platform = ${platform ?? null})
    group by a.id
    order by case a.niche when 'clinical' then 1 when 'analytical' then 2 when 'gcsealevel' then 3 when 'mentalhealth' then 4 else 5 end,
      case a.platform when 'tiktok' then 1 when 'instagram' then 2 when 'facebook' then 3 when 'youtube' then 4 else 5 end, a.kind`;
  return rows.map((r) => ({
    id: r.id,
    niche: r.niche,
    platform: r.platform,
    kind: r.kind,
    handle: r.handle,
    status: r.status,
    connected: r.connected,
    posts: Number(r.posts),
    views: Number(r.views),
    likes: Number(r.likes),
    comments: Number(r.comments),
    shares: Number(r.shares),
    saves: Number(r.saves),
    reach: Number(r.reach),
    follows: Number(r.follows),
    lastPosted: r.last_posted ? new Date(r.last_posted).toISOString() : null,
  }));
}

export type PostRow = { id: string; title: string; format: string | null; opener: string | null; postedAt: string | null; url: string | null; status: string; views: number; likes: number; comments: number; shares: number; saves: number };
export type CheckpointRow = { checkpoint: string; views: number; likes: number; shares: number };
export type OpenerRow = { opener: string; posts: number; views: number; perPost: number };

/** One account's detail: its posts, the checkpoint curve (1h → 7d), and A vs B openers on this platform. */
export async function accountDetail(accountId: string, days: number) {
  const sql = db();
  const [account] = await sql`select id, niche, platform, kind, handle, status from accounts where id = ${accountId}`;
  if (!account) return null;
  const posts = await sql`
    select p.id, coalesce(c.title, c.hook, c.bank_id, 'Untitled') as title, c.format, p.opener, p.posted_at, p.url, p.status,
      coalesce(l.views, 0) as views, coalesce(l.likes, 0) as likes, coalesce(l.comments, 0) as comments, coalesce(l.shares, 0) as shares, coalesce(l.saves, 0) as saves
    from posts p join content c on c.id = p.content_id
    left join lateral (select * from metrics m where m.post_id = p.id order by m.taken_at desc limit 1) l on true
    where p.account_id = ${accountId} and (p.posted_at is null or p.posted_at > now() - make_interval(days => ${days}))
    order by p.posted_at desc nulls first limit 60`;
  const curve = await sql`
    select m.checkpoint, avg(m.views)::bigint as views, avg(m.likes)::bigint as likes, avg(m.shares)::bigint as shares
    from metrics m join posts p on p.id = m.post_id
    where p.account_id = ${accountId} and m.checkpoint in ('1h','24h','72h','7d') and p.posted_at > now() - make_interval(days => ${days})
    group by m.checkpoint order by array_position(array['1h','24h','72h','7d'], m.checkpoint)`;
  const openers = await sql`
    with latest as (select distinct on (post_id) * from metrics order by post_id, taken_at desc)
    select p.opener, count(*) as posts, coalesce(sum(l.views), 0) as views
    from posts p left join latest l on l.post_id = p.id
    where p.account_id = ${accountId} and p.opener is not null and p.posted_at > now() - make_interval(days => ${days})
    group by p.opener order by p.opener`;
  return {
    account,
    posts: posts.map((r) => ({ id: r.id, title: r.title, format: r.format, opener: r.opener, postedAt: r.posted_at ? new Date(r.posted_at).toISOString() : null, url: r.url, status: r.status, views: Number(r.views), likes: Number(r.likes), comments: Number(r.comments), shares: Number(r.shares), saves: Number(r.saves) })) as PostRow[],
    curve: curve.map((r) => ({ checkpoint: r.checkpoint, views: Number(r.views), likes: Number(r.likes), shares: Number(r.shares) })) as CheckpointRow[],
    openers: openers.map((r) => ({ opener: r.opener, posts: Number(r.posts), views: Number(r.views), perPost: Number(r.posts) ? Math.round(Number(r.views) / Number(r.posts)) : 0 })) as OpenerRow[],
  };
}

export type NicheTop = {
  niche: string;
  signals: number;
  topSignals: { hook: string; ratio: number; url: string; account: string }[];
  virlo: number;
  topHooks: { hook: string; views: number; url: string | null }[];
  research: number;
  researchThemes: string[];
};

/** Top of the funnel per niche over the range, plus daily counts for a small trend line. */
export async function topOfFunnel(days: number) {
  const sql = db();
  const handles = watched();
  const niches = ["clinical", "analytical", "gcsealevel", "mentalhealth"];
  const out: NicheTop[] = [];
  for (const n of niches) {
    const [c] = await sql`select
      (select count(*) from signals where niche = ${n} and account = any(${handles}) and collected_at > now() - make_interval(days => ${days})) as signals,
      (select count(*) from virlo_items where niche = ${n} and collected_at > now() - make_interval(days => ${days})) as virlo,
      (select count(*) from research_items where niche = ${n} and collected_at > now() - make_interval(days => ${days})) as research`;
    const top = await sql`select coalesce(nullif(hook, ''), title) as hook, ratio, url, account from signals where niche = ${n} and account = any(${handles}) and collected_at > now() - make_interval(days => ${days}) order by ratio desc limit 3`;
    const hooks = await sql`select coalesce(hook, title) as hook, views, url from virlo_items where niche = ${n} and kind in ('hook','video') and collected_at > now() - make_interval(days => ${days}) order by views desc nulls last limit 3`;
    const themes = await sql`select text from research_items where niche = ${n} order by collected_at desc limit 4`;
    out.push({
      niche: n,
      signals: Number(c.signals),
      topSignals: top.map((r) => ({ hook: String(r.hook ?? "").slice(0, 140), ratio: Number(r.ratio), url: r.url, account: r.account })),
      virlo: Number(c.virlo),
      topHooks: hooks.map((r) => ({ hook: String(r.hook ?? "").slice(0, 140), views: Number(r.views ?? 0), url: r.url })),
      research: Number(c.research),
      researchThemes: themes.map((r) => r.text),
    });
  }
  const daily = await sql`select to_char(d, 'YYYY-MM-DD') as day,
      (select count(*) from signals where collected_at::date = d and account = any(${handles})) as signals,
      (select count(*) from virlo_items where collected_at::date = d) as virlo,
      (select count(*) from inspiration_items where collected_at::date = d) as inspiration
    from generate_series(current_date - (${days} - 1), current_date, interval '1 day') as d order by d`;
  return { niches: out, daily: daily.map((r) => ({ day: r.day, signals: Number(r.signals), virlo: Number(r.virlo), inspiration: Number(r.inspiration) })) };
}

export const POST_SORTS = ["posted", "views", "likes", "comments", "shares", "saves", "follows", "engagement"] as const;
export type PostSort = (typeof POST_SORTS)[number];
export type PostLine = PostRow & { niche: string; platform: Platform; kind: string; follows: number; reach: number; checkpoint: string | null; engagement: number };

/**
 * Every post in the range, one row each, with its account's niche and platform and its latest snapshot.
 * Engagement = (likes + comments + shares + saves) / views, as a percentage.
 */
export async function postTable({ days, niche, platform, sort = "posted" }: Range & { sort?: PostSort }): Promise<PostLine[]> {
  const sql = db();
  const rows = await sql`
    select p.id, coalesce(c.title, c.hook, c.bank_id, 'Untitled') as title, c.format, p.opener, p.posted_at, p.url, p.status,
      a.niche, a.platform, a.kind, l.checkpoint,
      coalesce(l.views, 0) as views, coalesce(l.likes, 0) as likes, coalesce(l.comments, 0) as comments, coalesce(l.shares, 0) as shares,
      coalesce(l.saves, 0) as saves, coalesce(l.follows, 0) as follows, coalesce(l.reach, 0) as reach
    from posts p
    join content c on c.id = p.content_id
    join accounts a on a.id = p.account_id
    left join lateral (select * from metrics m where m.post_id = p.id order by m.taken_at desc limit 1) l on true
    where (p.posted_at is null or p.posted_at > now() - make_interval(days => ${days}))
      and (${niche ?? null}::text is null or a.niche = ${niche ?? null})
      and (${platform ?? null}::text is null or a.platform = ${platform ?? null})
    limit 1000`;
  const lines = rows.map((r) => {
    const views = Number(r.views);
    const acts = Number(r.likes) + Number(r.comments) + Number(r.shares) + Number(r.saves);
    return {
      id: r.id,
      title: r.title,
      format: r.format,
      opener: r.opener,
      postedAt: r.posted_at ? new Date(r.posted_at).toISOString() : null,
      url: r.url,
      status: r.status,
      niche: r.niche,
      platform: r.platform,
      kind: r.kind,
      checkpoint: r.checkpoint,
      views,
      likes: Number(r.likes),
      comments: Number(r.comments),
      shares: Number(r.shares),
      saves: Number(r.saves),
      follows: Number(r.follows),
      reach: Number(r.reach),
      engagement: views ? Math.round((acts / views) * 1000) / 10 : 0,
    } satisfies PostLine;
  });
  const key = sort === "posted" ? null : sort;
  return lines.sort((a, b) => (key ? (b[key] as number) - (a[key] as number) : (b.postedAt ?? "9999").localeCompare(a.postedAt ?? "9999")));
}

export type LivePost = { id: string; title: string; niche: string; platform: string; postedAt: string; url: string | null; views: number; likes: number; comments: number; shares: number; checkedAt: string | null };
export type LiveSummary = {
  lastSync: string | null;
  live: number;
  scheduled: number;
  failed: number;
  totals: { views: number; likes: number; comments: number; shares: number };
  posts: LivePost[];
};

/**
 * What our posts are doing right now, straight from what Blotato last reported: how many are live, coming up or
 * failed, the totals, and the latest posts with their numbers. The worker asks Blotato every 20 minutes.
 */
export async function liveSummary(days: number, limit = 20): Promise<LiveSummary> {
  const sql = db();
  const [last] = await sql`select at from runs where kind = 'blotato-sync' order by at desc limit 1`;
  const [c] = await sql`select count(*) filter (where status = 'published')::int as live,
      count(*) filter (where status in ('planned','scheduled','publishing'))::int as scheduled,
      count(*) filter (where status = 'failed' and coalesce(error, '') not like 'Cancelled:%')::int as failed
    from posts where not test`;
  const rows = await sql`select p.id, coalesce(c.title, c.theme, 'Untitled') as title, a.niche, a.platform, p.posted_at, p.url,
      coalesce(l.views, 0)::int as views, coalesce(l.likes, 0)::int as likes, coalesce(l.comments, 0)::int as comments, coalesce(l.shares, 0)::int as shares, l.taken_at
    from posts p join accounts a on a.id = p.account_id join content c on c.id = p.content_id
    left join lateral (select * from metrics m where m.post_id = p.id order by m.taken_at desc limit 1) l on true
    where not p.test and p.status = 'published' and p.posted_at > now() - make_interval(days => ${days})
    order by p.posted_at desc`;
  const totals = { views: 0, likes: 0, comments: 0, shares: 0 };
  for (const r of rows) {
    totals.views += Number(r.views);
    totals.likes += Number(r.likes);
    totals.comments += Number(r.comments);
    totals.shares += Number(r.shares);
  }
  return {
    lastSync: last ? new Date(last.at).toISOString() : null,
    live: c.live,
    scheduled: c.scheduled,
    failed: c.failed,
    totals,
    posts: rows.slice(0, limit).map((r) => ({
      id: r.id,
      title: r.title,
      niche: r.niche,
      platform: r.platform,
      postedAt: new Date(r.posted_at).toISOString(),
      url: r.url,
      views: r.views,
      likes: r.likes,
      comments: r.comments,
      shares: r.shares,
      checkedAt: r.taken_at ? new Date(r.taken_at).toISOString() : null,
    })),
  };
}
