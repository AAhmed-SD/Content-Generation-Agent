// Our own numbers, read back into the agent: how our films did, per account and platform.
//
// Used by the proposals (web/src/lib/proposals.ts) and the film writer (web/scripts/agent.mjs). Each post is scored
// against its own account's usual on that platform (views ÷ the median of that account-platform in the window), so a
// new account and an old one can be compared. Test posts are left out. Platforms are never mixed in a comparison.
//
// The numbers are for choosing what to make. They never go on a card or into a line.

const MIN = 3; // fewer posts than this in a group is a hint, not a verdict

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : 0;
};
const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

/** Each live post's latest numbers, with what the film was. */
export async function postRows(sql, niches, days = 30) {
  return sql`
    select p.id, p.opener, p.posted_at, a.niche, a.platform, c.id as content_id, coalesce(c.hook, c.openers->>0, c.title) as hook,
      c.openers, c.format, c.hook_style, c.pillar, c.lead, m.views, m.likes, m.comments, m.shares, m.saves, m.follows, m.completion, m.checkpoint
    from posts p
    join accounts a on a.id = p.account_id
    join content c on c.id = p.content_id
    join lateral (select * from metrics where post_id = p.id order by taken_at desc limit 1) m on true
    where not p.test and p.status = 'published' and a.niche = any(${niches})
      and coalesce(p.posted_at, p.created_at) > now() - make_interval(days => ${days})`;
}

/** Score each row against its account-platform usual. */
export function scored(rows) {
  const usual = {};
  for (const r of rows) (usual[`${r.niche}|${r.platform}`] ??= []).push(Number(r.views ?? 0));
  const med = Object.fromEntries(Object.entries(usual).map(([k, v]) => [k, median(v)]));
  return rows.map((r) => {
    const views = Number(r.views ?? 0);
    const m = med[`${r.niche}|${r.platform}`] || 1;
    const opener = r.opener === "B" || (Array.isArray(r.openers) && r.openers[1] && r.opener === r.openers[1]) ? "B" : "A";
    return { ...r, views, ratio: views / m, engaged: views ? (Number(r.shares ?? 0) + Number(r.saves ?? 0)) / views : 0, opener };
  });
}

/** Average ratio per value of `key`, per platform, best first. */
function byKey(rows, key) {
  const out = {};
  for (const r of rows) {
    const v = r[key];
    if (!v) continue;
    const g = ((out[r.platform] ??= {})[v] ??= { n: 0, sum: 0 });
    g.n++;
    g.sum += r.ratio;
  }
  return Object.fromEntries(
    Object.entries(out).map(([p, g]) => [
      p,
      Object.entries(g)
        .map(([v, x]) => ({ v, n: x.n, avg: x.sum / x.n }))
        .sort((a, b) => b.avg - a.avg),
    ]),
  );
}

const line = (r) =>
  `- [${r.niche} · ${r.platform}] ${round(r.ratio)}x usual · ${r.format ?? "?"} · ${r.hook_style ?? "?"} · opener ${r.opener}: “${String(r.hook ?? "").slice(0, 120)}”` +
  (r.engaged ? ` (shares+saves ${round(r.engaged * 100)}% of views)` : "");

/**
 * The brief the agent reads: what worked and what did not, for the given accounts. Returns "" when nothing is back yet,
 * so the prompt says so plainly instead of inventing a winner.
 */
export async function ourNumbers(sql, niches, { days = 30, top = 6 } = {}) {
  const rows = scored(await postRows(sql, niches, days));
  if (!rows.length) return "";
  const sorted = [...rows].sort((a, b) => b.ratio - a.ratio);
  const groups = (title, data) => {
    const body = Object.entries(data)
      .map(([p, list]) => `  ${p}: ` + list.map((x) => `${x.v} ${round(x.avg)}x (${x.n}${x.n < MIN ? ", too few" : ""})`).join(", "))
      .join("\n");
    return body ? `${title}\n${body}` : "";
  };
  const ab = byKey(rows, "opener");
  return [
    `${rows.length} of our posts in the last ${days} days. Each is scored against its own account's usual views on that platform (1x = usual). Groups with fewer than ${MIN} posts are hints, not verdicts. Compare within one platform only.`,
    `Did best:\n${sorted.slice(0, top).map(line).join("\n")}`,
    sorted.length > top ? `Did worst:\n${sorted.slice(-Math.min(top, sorted.length - top)).reverse().map(line).join("\n")}` : "",
    groups("By format, per platform:", byKey(rows, "format")),
    groups("By hook style, per platform:", byKey(rows, "hook_style")),
    groups("By pillar, per platform:", byKey(rows, "pillar")),
    groups("Trend-led vs truth-led, per platform:", byKey(rows, "lead")),
    Object.values(ab).some((l) => l.length > 1) ? groups("Opener A vs B, per platform:", ab) : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}
