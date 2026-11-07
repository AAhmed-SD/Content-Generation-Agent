import Link from "next/link";
import { redirect } from "next/navigation";
import { postAction } from "@/app/actions";
import { AutoRefresh } from "@/components/auto-refresh";
import { DeskFrame } from "@/components/desk-frame";
import { accountDetail, accountTable, liveSummary, NICHE_LABEL, PLATFORM_LABEL, PLATFORMS, POST_SORTS, postTable, topOfFunnel, type PostSort } from "@/lib/funnel";
import { readSession } from "@/lib/session";
import { spend } from "@/lib/claude-stream";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

const RANGES = [7, 30, 90];
const NICHES = ["clinical", "analytical", "gcsealevel", "mentalhealth"];
const n = (v: number) => v.toLocaleString("en-GB");
const KIND: Record<string, string> = { founder: "Founder", outreach: "Outreach officer", brand: "Company page" };

const when = (iso: string) => new Date(iso).toLocaleString("en-GB", { timeZone: "Europe/London", weekday: "short", hour: "numeric", minute: "2-digit", hour12: true }).replace(" am", "am").replace(" pm", "pm");
const ago = (iso: string) => {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60000);
  return m < 1 ? "just now" : m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
};

export default async function DataPage({ searchParams }: { searchParams: Promise<{ days?: string; niche?: string; platform?: string; account?: string; view?: string; sort?: string; from?: string; to?: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const q = await searchParams;
  const days = RANGES.includes(Number(q.days)) ? Number(q.days) : 30;
  // chosen dates (London, inclusive) override the 7 / 30 / 90 day buttons
  const isDay = (v?: string) => Boolean(v && /^\d{4}-\d{2}-\d{2}$/.test(v));
  const from = isDay(q.from) ? q.from : undefined;
  const to = from && isDay(q.to) && q.to! >= from ? q.to : from;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
  const pretty = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const rangeLabel = from ? (from === to ? pretty(from) : `${pretty(from)} to ${pretty(to!)}`) : `the last ${days} days`;
  const niche = q.niche && (NICHES.includes(q.niche) || q.niche === "all") ? q.niche : undefined;
  const platform = q.platform && (PLATFORMS as readonly string[]).includes(q.platform) ? q.platform : undefined;
  const view = q.view === "post" ? "post" : "account";
  const sort: PostSort = (POST_SORTS as readonly string[]).includes(q.sort ?? "") ? (q.sort as PostSort) : "posted";
  const link = (over: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams();
    const merged = { days, from, to: from && to !== from ? to : undefined, niche, platform, account: q.account, view: view === "post" ? "post" : undefined, sort: view === "post" && sort !== "posted" ? sort : undefined, ...over };
    for (const [k, v] of Object.entries(merged)) if (v !== undefined && v !== "") p.set(k, String(v));
    return `/desk/data?${p.toString()}`;
  };

  const [live, rows, top, detail, postLines] = await Promise.all([
    liveSummary(days, 20, from, to),
    accountTable({ days, niche, platform, from, to }),
    topOfFunnel(days),
    q.account && view === "account" ? accountDetail(q.account, days, from, to) : Promise.resolve(null),
    view === "post" ? postTable({ days, niche, platform, sort, from, to }) : Promise.resolve([]),
  ]);
  const claude = await spend(days);
  const claudeTotal = claude.reduce((t, r) => t + r.usd, 0);
  const totals = rows.reduce((t, r) => ({ posts: t.posts + r.posts, views: t.views + r.views, likes: t.likes + r.likes, shares: t.shares + r.shares, follows: t.follows + r.follows }), { posts: 0, views: 0, likes: 0, shares: 0, follows: 0 });
  const maxDaily = Math.max(1, ...top.daily.map((d) => d.signals + d.virlo + d.inspiration));

  return (
    <DeskFrame person={person} current="numbers">
      <div className="data-head">
        <div>
          <h2 className="page-title">Numbers.</h2>
          <p className="split">
            What our posts are doing, straight from Blotato and kept up to date: first the latest posts, then each account on each platform. LinkedIn numbers still come from a CSV. What is coming in from outside (signals, Virlo, research) is folded at the bottom.
          </p>
        </div>
        <nav className="data-filters" aria-label="Range">
          {RANGES.map((d) => (
            <Link key={d} href={link({ days: d, from: undefined, to: undefined })} className={!from && d === days ? "is-on" : undefined} scroll={false}>
              {d} days
            </Link>
          ))}
        </nav>
        <details className="date-custom" open={Boolean(from)}>
          <summary className={from ? "is-on" : undefined}>{from ? `Custom: ${rangeLabel}` : "Custom"}</summary>
        <form method="get" action="/desk/data" className="date-pick" aria-label="Choose dates">
          {niche ? <input type="hidden" name="niche" value={niche} /> : null}
          {platform ? <input type="hidden" name="platform" value={platform} /> : null}
          {view === "post" ? <input type="hidden" name="view" value="post" /> : null}
          <label>
            From
            <input type="date" name="from" defaultValue={from ?? today} max={today} />
          </label>
          <label>
            To
            <input type="date" name="to" defaultValue={to ?? from ?? today} max={today} />
          </label>
          <button type="submit">Show</button>
          {from ? (
            <Link href={link({ from: undefined, to: undefined })} className="text-button" scroll={false}>
              Clear dates
            </Link>
          ) : null}
        </form>
        </details>
      </div>


      <AutoRefresh seconds={60} />
      <section aria-labelledby="live-h" className="data-section live">
        <div className="home-row">
          <h3 id="live-h" className="home-h">
            Our posts, live from Blotato
          </h3>
          <form action={postAction} className="live-check">
            <span className="data-note">{live.lastSync ? `Last checked with Blotato ${ago(live.lastSync)}` : "Not checked with Blotato yet"}. It checks every 20 minutes.</span>
            <button type="submit" name="what" value="sync" className="text-button">
              Check now
            </button>
          </form>
        </div>
        <div className="live-cards">
          <div>
            <span className="data-note">Live</span>
            <strong>{n(live.live)}</strong>
            <span className="data-note">posts out</span>
          </div>
          <div>
            <span className="data-note">Coming up</span>
            <strong>{n(live.scheduled)}</strong>
            <span className="data-note">scheduled at Blotato</span>
          </div>
          <div>
            <span className="data-note">Views</span>
            <strong>{n(live.totals.views)}</strong>
            <span className="data-note">{rangeLabel}</span>
          </div>
          <div>
            <span className="data-note">Likes · comments · shares</span>
            <strong>
              {n(live.totals.likes)} · {n(live.totals.comments)} · {n(live.totals.shares)}
            </strong>
          </div>
          {live.failed ? (
            <div className="is-bad">
              <span className="data-note">Failed</span>
              <strong>{n(live.failed)}</strong>
              <Link href="/desk#to-post">see why</Link>
            </div>
          ) : null}
        </div>
        {live.byLead.length ? (
          <p className="data-note">
            {live.byLead.map((g) => `${g.lead}: ${n(g.posts)} posts, ${n(Math.round(g.views / Math.max(1, g.posts)))} views each on average`).join(" · ")}
          </p>
        ) : null}
        {live.posts.length ? (
          <div className="doc-table data-table">
            <table>
              <thead>
                <tr>
                  <th>Posted</th>
                  <th>Film</th>
                  <th>Account</th>
                  <th>Platform</th>
                  <th className="num">Views</th>
                  <th className="num">Likes</th>
                  <th className="num">Comments</th>
                  <th className="num">Shares</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {live.posts.map((p) => (
                  <tr key={p.id}>
                    <td>{when(p.postedAt)}</td>
                    <td>{p.title}</td>
                    <td>{NICHE_LABEL[p.niche] ?? p.niche}</td>
                    <td>{PLATFORM_LABEL[p.platform as keyof typeof PLATFORM_LABEL] ?? p.platform}</td>
                    <td className="num">{p.checkedAt ? n(p.views) : "…"}</td>
                    <td className="num">{p.checkedAt ? n(p.likes) : "…"}</td>
                    <td className="num">{p.checkedAt ? n(p.comments) : "…"}</td>
                    <td className="num">{p.checkedAt ? n(p.shares) : "…"}</td>
                    <td>{p.url ? <a href={p.url} target="_blank" rel="noreferrer">open</a> : null}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="data-note">Nothing went out on {rangeLabel}. Posts appear here as soon as Blotato reports them live; numbers follow within the hour.</p>
        )}
      </section>

      <section aria-labelledby="bottom-h" className="data-section">
        <div className="home-row">
          <h3 id="bottom-h" className="home-h">
            By account and platform
          </h3>
          <span className="data-links">
            <Link href="/desk/loop">Import a CSV</Link>
            <a href={`/desk/data/export?days=${days}&view=${view}${niche ? `&niche=${niche}` : ""}${platform ? `&platform=${platform}` : ""}`}>Export CSV</a>
          </span>
        </div>
        <nav className="data-views" aria-label="View">
          <Link href={link({ view: undefined, sort: undefined })} className={view === "account" ? "is-on" : undefined} scroll={false}>
            By account
          </Link>
          <Link href={link({ view: "post", account: undefined })} className={view === "post" ? "is-on" : undefined} scroll={false}>
            By post
          </Link>
        </nav>
        <nav className="data-filters is-left" aria-label="Filter accounts">
          <Link href={link({ niche: undefined, account: undefined })} className={!niche ? "is-on" : undefined} scroll={false}>
            All accounts
          </Link>
          {[...NICHES, "all"].map((x) => (
            <Link key={x} href={link({ niche: x, account: undefined })} className={niche === x ? "is-on" : undefined} scroll={false}>
              {NICHE_LABEL[x]}
            </Link>
          ))}
          <span className="data-sep" aria-hidden="true" />
          <Link href={link({ platform: undefined, account: undefined })} className={!platform ? "is-on" : undefined} scroll={false}>
            Every platform
          </Link>
          {PLATFORMS.map((p) => (
            <Link key={p} href={link({ platform: p, account: undefined })} className={platform === p ? "is-on" : undefined} scroll={false}>
              {PLATFORM_LABEL[p]}
            </Link>
          ))}
        </nav>
        {view === "account" ? (
        <div className="doc-table data-table">
          <table>
            <thead>
              <tr>
                <th>Account</th>
                <th>Platform</th>
                <th className="num">Posts</th>
                <th className="num">Views</th>
                <th className="num">Likes</th>
                <th className="num">Comments</th>
                <th className="num">Shares</th>
                <th className="num">Saves</th>
                <th className="num">Follows</th>
                <th>Last post</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={q.account === r.id ? "is-on" : undefined}>
                  <td>
                    <Link href={link({ account: r.id })} scroll={false}>
                      {r.platform === "linkedin" ? KIND[r.kind] : NICHE_LABEL[r.niche]}
                    </Link>
                    {!r.connected ? <span className="data-chip">not connected</span> : null}
                  </td>
                  <td>{PLATFORM_LABEL[r.platform]}</td>
                  <td className="num">{n(r.posts)}</td>
                  <td className="num">{n(r.views)}</td>
                  <td className="num">{n(r.likes)}</td>
                  <td className="num">{n(r.comments)}</td>
                  <td className="num">{n(r.shares)}</td>
                  <td className="num">{n(r.saves)}</td>
                  <td className="num">{n(r.follows)}</td>
                  <td>{r.lastPosted ? new Date(r.lastPosted).toLocaleDateString("en-GB") : "—"}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>All shown</td>
                <td className="num">{n(totals.posts)}</td>
                <td className="num">{n(totals.views)}</td>
                <td className="num">{n(totals.likes)}</td>
                <td className="num" />
                <td className="num">{n(totals.shares)}</td>
                <td className="num" />
                <td className="num">{n(totals.follows)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
        ) : (
          <div className="doc-table data-table">
            <table>
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Account</th>
                  <th>Platform</th>
                  <th>Format</th>
                  <th>Opener</th>
                  {(
                    [
                      ["posted", "Posted", false],
                      ["views", "Views", true],
                      ["likes", "Likes", true],
                      ["comments", "Comments", true],
                      ["shares", "Shares", true],
                      ["saves", "Saves", true],
                      ["follows", "Follows", true],
                      ["engagement", "Eng. %", true],
                    ] as const
                  ).map(([key, label, num]) => (
                    <th key={key} className={num ? "num" : undefined} aria-sort={sort === key ? "descending" : undefined}>
                      <Link href={link({ sort: key === "posted" ? undefined : key })} scroll={false} className="data-sort">
                        {label}
                        {sort === key ? " ↓" : ""}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {postLines.length ? (
                  postLines.map((p) => (
                    <tr key={p.id}>
                      <td>{p.url ? <a href={p.url} target="_blank" rel="noreferrer">{p.title}</a> : p.title}</td>
                      <td>{p.platform === "linkedin" ? KIND[p.kind] : NICHE_LABEL[p.niche]}</td>
                      <td>{PLATFORM_LABEL[p.platform]}</td>
                      <td>{p.format ?? "—"}</td>
                      <td>{p.opener ?? "—"}</td>
                      <td>{p.postedAt ? new Date(p.postedAt).toLocaleDateString("en-GB") : p.status}</td>
                      <td className="num">{n(p.views)}</td>
                      <td className="num">{n(p.likes)}</td>
                      <td className="num">{n(p.comments)}</td>
                      <td className="num">{n(p.shares)}</td>
                      <td className="num">{n(p.saves)}</td>
                      <td className="num">{n(p.follows)}</td>
                      <td className="num">{p.views ? `${p.engagement}%` : "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={13}>No posts match these filters yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {view === "account" && totals.posts === 0 ? <p className="data-note">Nothing posted in this range yet. Rows fill in as Blotato reports each post at 1 hour, 24 hours, 72 hours and 7 days.</p> : null}
      </section>

      <details className="data-section data-fold">
        <summary className="home-h">What is coming in: signals, Virlo and research</summary>
        <div className="data-daily" role="img" aria-label={`Items collected per day over ${days} days`}>
          {top.daily.map((d) => (
            <span key={d.day} title={`${d.day}: ${d.signals} signals, ${d.virlo} Virlo, ${d.inspiration} inspiration`}>
              <i style={{ height: `${((d.signals + d.virlo + d.inspiration) / maxDaily) * 100}%` }} />
            </span>
          ))}
        </div>
        <p className="data-note">Items collected per day: signals, Virlo and inspiration.</p>
        <div className="data-niches">
          {top.niches.map((t) => (
            <article key={t.niche} className="data-niche">
              <h4>{NICHE_LABEL[t.niche]}</h4>
              <dl className="data-counts">
                <div>
                  <dt>Signals</dt>
                  <dd>{n(t.signals)}</dd>
                </div>
                <div>
                  <dt>Virlo</dt>
                  <dd>{t.virlo ? n(t.virlo) : "—"}</dd>
                </div>
                <div>
                  <dt>Research</dt>
                  <dd>{n(t.research)}</dd>
                </div>
              </dl>
              {t.topSignals.length ? (
                <ol className="data-hooks">
                  {t.topSignals.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noreferrer">
                        {s.hook || "Untitled"}
                      </a>
                      <span>
                        @{s.account} · {s.ratio}× usual
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="data-note">No signals in this range.</p>
              )}
              {t.topHooks.length ? (
                <ol className="data-hooks">
                  {t.topHooks.map((h, i) => (
                    <li key={i}>
                      {h.url ? (
                        <a href={h.url} target="_blank" rel="noreferrer">
                          {h.hook}
                        </a>
                      ) : (
                        h.hook
                      )}
                      <span>Virlo · {n(h.views)} views</span>
                    </li>
                  ))}
                </ol>
              ) : null}
            </article>
          ))}
        </div>
      </details>
      <p className="data-note">
        Claude spend: ${claudeTotal.toFixed(2)} in the last {days} days. The full breakdown and the daily cap are in <Link href="/desk/settings">Settings</Link>.
      </p>

      {detail ? (
        <section aria-labelledby="detail-h" className="data-section data-detail">
          <div className="home-row">
            <h3 id="detail-h" className="home-h">
              {detail.account.platform === "linkedin" ? KIND[detail.account.kind] : NICHE_LABEL[detail.account.niche]} on {PLATFORM_LABEL[detail.account.platform]}
            </h3>
            <Link href={link({ account: undefined })} scroll={false}>
              Close
            </Link>
          </div>
          <div className="data-split">
            <div>
              <h4>Views by checkpoint, average per post</h4>
              {detail.curve.length ? (
                <ul className="home-bars">
                  {detail.curve.map((c) => (
                    <li key={c.checkpoint}>
                      <span>{c.checkpoint}</span>
                      <span className="home-bar">
                        <span style={{ width: `${(c.views / Math.max(1, ...detail.curve.map((x) => x.views))) * 100}%` }} />
                      </span>
                      <span className="home-bar-n">{n(c.views)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="data-note">No checkpoints yet.</p>
              )}
            </div>
            <div>
              <h4>Opener A against B, on this platform</h4>
              {detail.openers.length ? (
                <ul className="home-bars">
                  {detail.openers.map((o) => (
                    <li key={o.opener}>
                      <span>
                        Opener {o.opener} · {o.posts}
                      </span>
                      <span className="home-bar">
                        <span style={{ width: `${(o.perPost / Math.max(1, ...detail.openers.map((x) => x.perPost))) * 100}%` }} />
                      </span>
                      <span className="home-bar-n">{n(o.perPost)} a post</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="data-note">No A/B posts yet. One week of A against B is a sample, not a verdict.</p>
              )}
            </div>
          </div>
          <div className="doc-table data-table">
            <table>
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Format</th>
                  <th>Opener</th>
                  <th>Posted</th>
                  <th className="num">Views</th>
                  <th className="num">Likes</th>
                  <th className="num">Comments</th>
                  <th className="num">Shares</th>
                  <th className="num">Saves</th>
                </tr>
              </thead>
              <tbody>
                {detail.posts.length ? (
                  detail.posts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.url ? <a href={p.url} target="_blank" rel="noreferrer">{p.title}</a> : p.title}</td>
                      <td>{p.format ?? "—"}</td>
                      <td>{p.opener ?? "—"}</td>
                      <td>{p.postedAt ? new Date(p.postedAt).toLocaleDateString("en-GB") : p.status}</td>
                      <td className="num">{n(p.views)}</td>
                      <td className="num">{n(p.likes)}</td>
                      <td className="num">{n(p.comments)}</td>
                      <td className="num">{n(p.shares)}</td>
                      <td className="num">{n(p.saves)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>No posts on this account in the range.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </DeskFrame>
  );
}
