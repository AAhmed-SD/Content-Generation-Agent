import { db, ensureWorker, queueJob } from "@/lib/db";
import { blotato } from "../../scripts/blotato.mjs";

/** Posting films through Blotato. The desk links accounts and queues posts; the Mac worker uploads and posts. */

export const FILM_PLATFORMS = ["tiktok", "instagram", "facebook", "youtube"] as const;
export type FilmPlatform = (typeof FILM_PLATFORMS)[number];
export const NICHES: Record<string, { handle: string; label: string }> = {
  clinical: { handle: "offload.clinical", label: "Clinical" },
  analytical: { handle: "offload.analytical", label: "Analytical" },
  gcsealevel: { handle: "offload.gcsealevel", label: "GCSE and A-level" },
  mentalhealth: { handle: "offload.mentalhealth", label: "Time" },
};

export const blotatoReady = () => Boolean(process.env.BLOTATO_API_KEY);
const api = () => blotato(() => process.env.BLOTATO_API_KEY);

export type BlotatoAccount = { id: string; platform: string; fullname: string; username: string; pages: { id: string; name: string }[] };

/** Everything connected in Blotato, with Facebook Pages listed under their account. */
export async function blotatoAccounts(): Promise<BlotatoAccount[]> {
  const items = (await api().accounts()) as Omit<BlotatoAccount, "pages">[];
  return Promise.all(
    items.map(async (a) => ({
      ...a,
      pages: a.platform === "facebook" ? ((await api().subaccounts(a.id).catch(() => [])) as { id: string; name: string }[]) : [],
    })),
  );
}

export type Linked = { id: string; niche: string; platform: string; blotatoAccountId: string | null; blotatoPageId: string | null; username: string | null };

export async function linkedAccounts(): Promise<Linked[]> {
  const rows = await db()`select * from accounts where kind = 'brand' order by niche, platform`;
  return rows.map((r) => ({ id: r.id, niche: r.niche, platform: r.platform, blotatoAccountId: r.blotato_account_id, blotatoPageId: r.blotato_page_id, username: r.blotato_username }));
}

/** Point one of our accounts (niche × platform) at a Blotato account, or clear it. */
export async function linkAccount(niche: string, platform: string, value: string) {
  const sql = db();
  if (!value) {
    await sql`update accounts set blotato_account_id = null, blotato_page_id = null, blotato_username = null, status = 'created' where niche = ${niche} and platform = ${platform} and kind = 'brand'`;
    return;
  }
  // value is "accountId" or "accountId:pageId", plus "|username" for display
  const [ids, username = ""] = value.split("|");
  const [accountId, pageId = null] = ids.split(":");
  // a Blotato account belongs to one of our accounts at a time
  await sql`update accounts set blotato_account_id = null, blotato_page_id = null, blotato_username = null, status = 'created'
    where blotato_account_id = ${accountId} and coalesce(blotato_page_id, '') = ${pageId ?? ""} and not (niche = ${niche} and platform = ${platform})`;
  await sql`insert into accounts (niche, platform, kind, handle, blotato_account_id, blotato_page_id, blotato_username, status)
    values (${niche}, ${platform}, 'brand', ${NICHES[niche]?.handle ?? niche}, ${accountId}, ${pageId}, ${username}, 'connected')
    on conflict (niche, platform, kind) do update set blotato_account_id = excluded.blotato_account_id, blotato_page_id = excluded.blotato_page_id,
      blotato_username = excluded.blotato_username, status = 'connected'`;
}

/** The platform's caption from one base caption (brand/platforms.md). No links, no prices. */
export function captionFor(platform: string, niche: string, base: string) {
  const text = base.replace(/\s+/g, " ").trim();
  const cut = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");
  const n = NICHES[niche] ?? { handle: niche, label: niche };
  if (platform === "tiktok") return cut(text, 220);
  if (platform === "instagram") return `${base.trim()}\n\n#offload`;
  if (platform === "youtube") return cut(`${n.label}: ${text}`, 200);
  if (platform === "facebook") return `${text} Filed under ${n.handle}.`;
  return text;
}

/** The starting caption for a film: its hook, then its second line. */
export function baseCaption(film: { hook?: string | null; lines: { say: string }[] }) {
  const first = film.hook || film.lines[0]?.say || "";
  const second = film.lines.find((l) => l.say !== first)?.say ?? "";
  return [first, second].filter(Boolean).join("\n");
}

/**
 * Queue a film to the chosen accounts. `when` is an ISO time or null for now. A test post goes only where it
 * can stay private: TikTok (only me) and YouTube (private).
 */
export async function queuePosts(contentId: string, accountIds: string[], base: string | Record<string, string>, when: string | null | "best", test: boolean) {
  const sql = db();
  const [film] = await sql`select niche, status, captions, kind from content where id = ${contentId}`;
  if (!film || film.status !== "approved") throw new Error("Only approved films can be posted.");
  const accounts = await sql`select id, platform, niche from accounts where id in ${sql(accountIds.length ? accountIds : ["00000000-0000-0000-0000-000000000000"])} and blotato_account_id is not null`;
  // carousels go to Instagram, TikTok and Facebook only
  const chosen = accounts.filter((a) => a.niche === film.niche && (!test || a.platform === "tiktok" || a.platform === "youtube") && (film.kind !== "carousel" || (CAROUSEL_PLATFORMS as readonly string[]).includes(a.platform)));
  if (!chosen.length) throw new Error(test ? "A test post needs a linked TikTok or YouTube account for this niche." : "Choose at least one linked account.");
  // the daily rule for films: at most 3 different films per account per London day, at least 4 hours apart
  if (!test && when && when !== "best") await checkFilmSlot(film.niche, contentId, when);
  // never an empty caption: the given one, else the agent's, else one built from the film's own lines
  const [lines] = await sql`select hook, theme, script from content where id = ${contentId}`;
  const fallback = baseCaption({ hook: lines?.hook ?? lines?.theme ?? null, lines: lines?.script?.lines ?? [] }) || String(lines?.theme ?? "");
  const captionOf = (platform: string) => {
    const given = typeof base === "string" ? base : (base[platform] ?? film.captions?.[platform] ?? "");
    return String(given).trim() ? (typeof base === "string" ? captionFor(platform, film.niche, base) : String(given)) : captionFor(platform, film.niche, fallback);
  };
  const ids: string[] = [];
  for (const a of chosen) {
    // "best": each platform gets its own next best-hour slot
    const at = when === "best" ? await nextBestSlot(a.id, contentId) : when;
    const [row] = await sql`insert into posts (content_id, account_id, caption, scheduled_at, status, test)
      values (${contentId}, ${a.id}, ${captionOf(a.platform)}, ${at}, 'planned', ${test}) returning id`;
    ids.push(row.id);
  }
  await queueJob("post", { post_ids: ids });
  await ensureWorker();
  return ids.length;
}

export type PostRow = { id: string; contentId: string; platform: string; niche: string; status: string; scheduledAt: string | null; url: string | null; error: string | null; test: boolean; views: number | null; blotatoStatus: string | null; syncedAt: string | null };

export async function postsFor(contentIds: string[]): Promise<PostRow[]> {
  if (!contentIds.length) return [];
  const sql = db();
  const rows = await sql`select p.*, a.platform, a.niche,
      (select views from metrics m where m.post_id = p.id order by taken_at desc limit 1) as views
    from posts p join accounts a on a.id = p.account_id where p.content_id in ${sql(contentIds)} order by p.created_at desc`;
  return rows.map((r) => ({
    id: r.id,
    contentId: r.content_id,
    platform: r.platform,
    niche: r.niche,
    status: r.status,
    scheduledAt: r.scheduled_at ? new Date(r.scheduled_at).toISOString() : null,
    url: r.url,
    error: r.error,
    test: r.test,
    views: r.views === null ? null : Number(r.views),
    blotatoStatus: r.blotato_status ?? null,
    syncedAt: r.synced_at ? new Date(r.synced_at).toISOString() : null,
  }));
}

/** Retry a failed post: the same row, queued again. */
export async function retryPost(postId: string) {
  const sql = db();
  const [p] = await sql`update posts set status = 'planned', error = null, blotato_submission_id = null where id = ${postId} and status = 'failed' returning id`;
  if (!p) return;
  await queueJob("post", { post_ids: [p.id] });
  await ensureWorker();
}

/** Ask the worker for fresh status and numbers now. */
export async function syncNow() {
  await queueJob("blotato-sync", {});
  await ensureWorker();
}

/** A datetime-local value ("2026-11-06T19:30") read as London time, as an ISO instant. */
export function londonToIso(local: string) {
  const guess = new Date(`${local}:00Z`);
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(guess).map((p) => [p.type, p.value]));
  const shown = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return new Date(guess.getTime() - (shown - guess.getTime())).toISOString();
}

/** The home page's loop counts, from the database: films waiting for a stamp, ready to post, out, and numbers back. */
export async function loopCounts() {
  const sql = db();
  const [c] = await sql`select
      count(*) filter (where status = 'rendered') as waiting,
      count(*) filter (where status = 'approved') as ready
    from content where kind = 'film'`;
  const [p] = await sql`select
      count(*) filter (where status in ('planned','publishing','scheduled')) as queued,
      count(*) filter (where status = 'published') as live
    from posts where not test`;
  const views = await sql`select a.niche, sum(m.views)::bigint as views
    from posts p join accounts a on a.id = p.account_id
    join lateral (select views from metrics where post_id = p.id order by taken_at desc limit 1) m on true
    where not p.test group by a.niche`;
  const [m] = await sql`select count(*) as n from metrics m join posts p on p.id = m.post_id where not p.test`;
  return {
    waiting: Number(c.waiting),
    ready: Number(c.ready),
    queued: Number(p.queued),
    live: Number(p.live),
    snapshots: Number(m.n),
    views: views.map((v) => ({ niche: String(v.niche), views: Number(v.views ?? 0) })),
  };
}

/**
 * The best hours to post (London time) for one account on one platform. From our own posts once there are 30 or more
 * on that platform (views ÷ the account's usual, by hour posted); before that, from when the UK outliers Virlo found
 * for the account were published. Returns the top three hours, best first, and where they came from.
 */
export async function bestHours(niche: string, platform: string): Promise<{ hours: number[]; source: "ours" | "virlo" | "default" }> {
  const sql = db();
  const ours = await sql`select extract(hour from coalesce(p.posted_at, p.scheduled_at) at time zone 'Europe/London')::int as h,
      avg(m.views)::float as v, count(*)::int as n
    from posts p join accounts a on a.id = p.account_id
    join lateral (select views from metrics where post_id = p.id order by taken_at desc limit 1) m on true
    where not p.test and p.status = 'published' and a.niche = ${niche} and a.platform = ${platform} group by 1`;
  if (ours.reduce((t, r) => t + r.n, 0) >= 30) return { hours: ours.filter((r) => r.n >= 2).sort((a, b) => b.v - a.v).slice(0, 3).map((r) => r.h), source: "ours" };
  const virlo = await sql`select extract(hour from (payload->>'publish_date')::timestamptz at time zone 'Europe/London')::int as h, count(*)::int as n,
      avg(score)::float as s
    from virlo_items where kind = 'video' and niche = ${niche} and payload->>'publish_date' is not null
      and collected_at > now() - interval '45 days'
      and extract(hour from (payload->>'publish_date')::timestamptz at time zone 'Europe/London') between 7 and 22
    group by 1`;
  if (virlo.reduce((t, r) => t + r.n, 0) >= 8) return { hours: virlo.sort((a, b) => b.n * b.s - a.n * a.s).slice(0, 3).map((r) => r.h), source: "virlo" };
  // UK students: after school or lectures, and the evening scroll
  return { hours: [19, 17, 21], source: "default" };
}

/** After approval: schedule to every linked account of the niche at its next best slot, with the agent's captions. */
export async function autoSchedule(contentId: string) {
  const sql = db();
  const [c] = await sql`select niche, kind, captions from content where id = ${contentId} and status = 'approved'`;
  if (!c || !blotatoReady()) return 0;
  const [{ n }] = await sql`select count(*)::int as n from posts where content_id = ${contentId} and not test and status <> 'failed'`;
  if (n) return 0; // already posted or scheduled
  const accounts = await sql`select id, platform from accounts where niche = ${c.niche} and kind = 'brand' and blotato_account_id is not null`;
  const ids = accounts.filter((a) => c.kind !== "carousel" || (CAROUSEL_PLATFORMS as readonly string[]).includes(a.platform)).map((a) => a.id as string);
  if (!ids.length) return 0;
  return queuePosts(contentId, ids, (c.captions as Record<string, string>) ?? {}, "best", false);
}

/** Refuse a hand-picked time that breaks the daily rule for this account's films. */
export async function checkFilmSlot(niche: string, contentId: string, iso: string) {
  const sql = db();
  const [c] = await sql`select kind from content where id = ${contentId}`;
  if (c?.kind !== "film") return;
  const dayOf = (t: number | Date) => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date(t));
  const t = Date.parse(iso);
  const others = await sql`select distinct on (p.content_id) p.content_id, coalesce(p.scheduled_at, p.posted_at, p.created_at) as at
    from posts p join accounts x on x.id = p.account_id join content k on k.id = p.content_id
    where x.niche = ${niche} and k.kind = 'film' and not p.test and p.status <> 'failed' and p.content_id <> ${contentId}
    order by p.content_id, at`;
  const sameDay = others.filter((o) => dayOf(o.at) === dayOf(t));
  const time = (x: number) => new Date(x).toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "numeric", minute: "2-digit", hour12: true });
  if (sameDay.length >= VIDEOS_PER_DAY) throw new Error(`This account already has ${sameDay.length} films on ${dayOf(t)}, and the limit is ${VIDEOS_PER_DAY} a day. Pick another day, or choose "At each platform's best time" and the desk finds the next free slot.`);
  const near = sameDay.find((o) => Math.abs(new Date(o.at).getTime() - t) < VIDEO_GAP_HOURS * 3600e3);
  if (near) throw new Error(`Another film on this account goes out at ${time(new Date(near.at).getTime())}, within ${VIDEO_GAP_HOURS} hours of ${time(t)}. Films on one account need ${VIDEO_GAP_HOURS} hours between them.`);
}

/** Each account posts at most this many different videos a day, at least this many hours apart. */
export const VIDEOS_PER_DAY = 3;
export const VIDEO_GAP_HOURS = 4;
// every hour 7am to 10pm, the usual student scroll times first, used after the learnt best hours
const FALLBACK_HOURS = [19, 13, 8, 17, 21, 12, 16, 9, 20, 15, 10, 18, 14, 11, 7, 22];

/**
 * When this film should go out on this account. Rules (decided 2026-11-07):
 *   - the same film goes to every platform of the account at the same time (it is one video);
 *   - an account posts at most 3 different films a day, at least 4 hours apart (London time);
 *   - within that, the account's best hours first, then the usual student times; never before 7am or after 10pm.
 */
export async function nextBestSlot(accountId: string, contentId?: string): Promise<string> {
  const sql = db();
  const [a] = await sql`select niche, platform from accounts where id = ${accountId}`;
  // the same film already booked on another platform of this account: same time
  if (contentId) {
    const [same] = await sql`select p.scheduled_at from posts p join accounts x on x.id = p.account_id
      where p.content_id = ${contentId} and x.niche = ${a.niche} and not p.test and p.status in ('planned','scheduled') and p.scheduled_at > now() order by p.created_at limit 1`;
    if (same) return new Date(same.scheduled_at).toISOString();
  }
  const { hours } = await bestHours(a.niche, a.platform);
  const ranked = [...new Set([...hours, ...FALLBACK_HOURS])];
  const [k] = contentId ? await sql`select kind from content where id = ${contentId}` : [{ kind: "film" }];
  if (k?.kind === "carousel") return nextCarouselSlot(accountId, a.niche, ranked);
  // other films already booked or out for this account, by London day
  const booked = await sql`select distinct on (p.content_id) p.content_id, coalesce(p.scheduled_at, p.posted_at, p.created_at) as at
    from posts p join accounts x on x.id = p.account_id join content c on c.id = p.content_id
    where x.niche = ${a.niche} and c.kind = 'film' and not p.test and p.status <> 'failed'
      and coalesce(p.scheduled_at, p.posted_at, p.created_at) > now() - interval '1 day'
      and (${contentId ?? null}::uuid is null or p.content_id <> ${contentId ?? null}::uuid)
    order by p.content_id, at`;
  const dayOf = (t: number) => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date(t));
  const now = Date.now() + 20 * 60_000;
  for (let day = 0; day < 14; day++) {
    const date = dayOf(now + day * 864e5);
    const that = booked.map((b) => new Date(b.at).getTime()).filter((t) => dayOf(t) === date);
    if (that.length >= VIDEOS_PER_DAY) continue;
    for (const h of ranked) {
      const iso = londonToIso(`${date}T${String(h).padStart(2, "0")}:00`);
      const t = Date.parse(iso);
      if (t <= now) continue;
      if (that.every((x) => Math.abs(x - t) >= VIDEO_GAP_HOURS * 3600e3)) return iso;
    }
  }
  return new Date(now).toISOString();
}

export const CAROUSEL_PLATFORMS = ["instagram", "tiktok", "facebook"] as const;

/** A carousel: one a day on each platform, not within an hour of anything else on this account. */
async function nextCarouselSlot(accountId: string, niche: string, ranked: number[]) {
  const sql = db();
  const busy = await sql`select coalesce(p.scheduled_at, p.posted_at) as at, c.kind, p.account_id from posts p join accounts x on x.id = p.account_id join content c on c.id = p.content_id
    where x.niche = ${niche} and not p.test and p.status <> 'failed' and coalesce(p.scheduled_at, p.posted_at) > now() - interval '1 day'`;
  const dayOf = (t: number | Date) => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date(t));
  const now = Date.now() + 20 * 60_000;
  // carousels lead with the middle of the day, when students save things for later
  const order = [...new Set([12, 13, 15, 11, 16, 10, 14, 18, ...ranked])];
  for (let day = 0; day < 14; day++) {
    const date = dayOf(now + day * 864e5);
    if (busy.some((b) => b.kind === "carousel" && b.account_id === accountId && dayOf(b.at) === date)) continue;
    for (const h of order) {
      const iso = londonToIso(`${date}T${String(h).padStart(2, "0")}:30`);
      const t = Date.parse(iso);
      if (t <= now) continue;
      if (busy.every((b) => Math.abs(new Date(b.at).getTime() - t) >= 3600e3)) return iso;
    }
  }
  return new Date(now).toISOString();
}

export type DayPlan = {
  day: string;
  label: string;
  niches: {
    niche: string;
    handle: string;
    videos: { title: string; at: string; status: string; platforms: string[]; tooClose: boolean }[];
    carousels: Record<string, { title: string; at: string; status: string } | null>;
  }[];
};

/**
 * The posting plan for today and tomorrow (London days): per account, the films going out (target 3, at least
 * 4 hours apart) and the carousel on Instagram, TikTok and Facebook (target 1 each). From the posts table, which the
 * worker keeps in step with Blotato.
 */
export async function postingPlan(days = 2): Promise<DayPlan[]> {
  const sql = db();
  const rows = await sql`select p.content_id, c.kind, coalesce(c.title, c.theme, 'Untitled') as title, a.niche, a.platform, p.status,
      coalesce(p.posted_at, p.scheduled_at, p.created_at) as at
    from posts p join accounts a on a.id = p.account_id join content c on c.id = p.content_id
    where not p.test and p.status <> 'failed' and coalesce(p.posted_at, p.scheduled_at, p.created_at) > now() - interval '2 days'`;
  const dayOf = (t: Date | number) => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date(t));
  const out: DayPlan[] = [];
  for (let d = 0; d < days; d++) {
    const day = dayOf(Date.now() + d * 864e5);
    const label = d === 0 ? "Today" : d === 1 ? "Tomorrow" : day;
    out.push({
      day,
      label,
      niches: Object.entries(NICHES).map(([niche, n]) => {
        const mine = rows.filter((r) => r.niche === niche && dayOf(r.at) === day);
        const films = new Map<string, { title: string; at: string; status: string; platforms: string[]; tooClose: boolean }>();
        for (const r of mine.filter((r) => r.kind === "film")) {
          const f = films.get(r.content_id) ?? { title: r.title, at: new Date(r.at).toISOString(), status: r.status, platforms: [] as string[], tooClose: false };
          f.platforms.push(r.platform);
          if (r.status === "published") f.status = "published";
          films.set(r.content_id, f);
        }
        const videos = [...films.values()].sort((a, b) => a.at.localeCompare(b.at));
        for (const v of videos) v.tooClose = videos.some((o) => o !== v && Math.abs(Date.parse(o.at) - Date.parse(v.at)) < VIDEO_GAP_HOURS * 3600e3);
        const carousels = Object.fromEntries(
          CAROUSEL_PLATFORMS.map((p) => {
            const c = mine.find((r) => r.kind === "carousel" && r.platform === p);
            return [p, c ? { title: c.title, at: new Date(c.at).toISOString(), status: c.status } : null];
          }),
        );
        return { niche, handle: n.handle, videos, carousels };
      }),
    });
  }
  return out;
}
