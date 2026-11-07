import { db } from "@/lib/db";

/** What the desk spends: Virlo credits (live balance), Claude (logged per call in marketing.runs), and the flat fees. */

export type VirloState = { ok: boolean; credits: number | null; dollars: number | null; autoTopUp: { enabled: boolean; amount: number; below: number } | null; error?: string };

/** Virlo's live balance. Free to call. Warn under 800 credits ($8), and say plainly when auto top-up will charge. */
export async function virloState(): Promise<VirloState> {
  const key = process.env.VIRLO_API_KEY;
  if (!key) return { ok: false, credits: null, dollars: null, autoTopUp: null, error: "No VIRLO_API_KEY in web/.env.local." };
  try {
    const res = await fetch("https://api.virlo.ai/v1/account/balance", { headers: { authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(8000), cache: "no-store" });
    const j = await res.json();
    if (!res.ok) return { ok: false, credits: null, dollars: null, autoTopUp: null, error: j?.message ?? `Virlo returned ${res.status}` };
    const d = j.data ?? {};
    const credits = Number(d.credits_remaining);
    const t = d.auto_top_up;
    return { ok: true, credits, dollars: credits / 100, autoTopUp: t ? { enabled: Boolean(t.enabled), amount: Number(t.amount_credits) / 100, below: Number(t.when_below_credits) / 100 } : null };
  } catch (e) {
    return { ok: false, credits: null, dollars: null, autoTopUp: null, error: (e as Error).message };
  }
}

export const VIRLO_WARN = 800;
export const VIRLO_FLOOR = Number(process.env.VIRLO_MIN_CREDITS || 300);

/** This calendar month's spend from the run log. */
export async function monthSpend() {
  const sql = db();
  const [c] = await sql`select coalesce(sum((detail->>'usd')::numeric), 0)::float as usd, count(*)::int as calls
    from runs where kind = 'claude' and at >= date_trunc('month', now())`;
  const [v] = await sql`select coalesce(sum((detail->>'spent')::numeric), 0)::float as usd, count(*)::int as pulls
    from runs where kind = 'virlo' and at >= date_trunc('month', now())`;
  return { claude: c.usd as number, claudeCalls: c.calls as number, virlo: v.usd as number, virloPulls: v.pulls as number };
}

/** Tasks that build the engine (one-off), as opposed to running it every day. */
const BUILD = /^(dossier|truths-(?!grow)|shapes|probe)/; // same rule as scripts/budget.mjs
const LABEL: [RegExp, string][] = [
  [/^dossier/, "Research dossiers (one-off)"],
  [/^truths/, "Truth bank"],
  [/^shapes/, "Shapes library (one-off)"],
  [/^proposals/, "Proposals on Hooks"],
  [/^agent-script/, "Writing, editing and captioning films"],
  [/^hooks-/, "Hook patterns from trends"],
  [/^trend-shapes/, "Trend shapes from Virlo"],
  [/chat/, "Talking to the desk"],
  [/linkedin/i, "LinkedIn"],
];
const labelOf = (task: string) => LABEL.find(([re]) => re.test(task))?.[1] ?? task;

export type LiveSpend = {
  days: { day: string; claude: number; virlo: number }[];
  byTask: { label: string; usd: number; calls: number; build: boolean }[];
  today: number;
  monthToDate: number;
  build: number;
  running: number;
  dailyRun: number;
  projection: { claude: number; virlo: number; blotato: number; total: number; daysLeft: number };
  nextMonth: { claude: number; virlo: number; blotato: number; total: number };
};

/**
 * This month's spend, live: by day, by task, and projected to the month end. The projection uses the running cost
 * of the last seven days (one-off build work excluded), or the planned rate at full volume if that is higher, since
 * launch volume starts on 16 November.
 */
export async function liveSpend(): Promise<LiveSpend> {
  const sql = db();
  const rows = await sql`select to_char(at at time zone 'Europe/London', 'YYYY-MM-DD') as day, kind, detail->>'task' as task,
      coalesce((detail->>'usd')::numeric, 0)::float as usd, coalesce((detail->>'spent')::numeric, 0)::float as spent
    from runs where kind in ('claude', 'virlo') and at >= date_trunc('month', now() at time zone 'Europe/London') at time zone 'Europe/London'`;
  const days = new Map<string, { claude: number; virlo: number }>();
  const tasks = new Map<string, { usd: number; calls: number; build: boolean }>();
  let build = 0;
  let running = 0;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
  const weekAgo = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date(Date.now() - 7 * 864e5));
  let lastWeekRun = 0;
  for (const r of rows) {
    const d = days.get(r.day) ?? { claude: 0, virlo: 0 };
    if (r.kind === "claude") {
      d.claude += r.usd;
      const isBuild = BUILD.test(r.task ?? "");
      const t = tasks.get(labelOf(r.task ?? "")) ?? { usd: 0, calls: 0, build: isBuild };
      t.usd += r.usd;
      t.calls++;
      tasks.set(labelOf(r.task ?? ""), t);
      if (isBuild) build += r.usd;
      else {
        running += r.usd;
        if (r.day > weekAgo) lastWeekRun += r.usd;
      }
    } else {
      d.virlo += r.spent;
      running += r.spent;
      if (r.day > weekAgo) lastWeekRun += r.spent;
    }
    days.set(r.day, d);
  }
  const now = new Date(`${today}T12:00:00Z`);
  const daysInMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).getUTCDate();
  const daysLeft = daysInMonth - now.getUTCDate();
  // planned full-volume rates: Claude about $2.60 a day, Virlo about $0.82 a day
  const PLAN = { claude: 2.6, virlo: 0.82 };
  const observed = lastWeekRun / 7;
  const dailyRun = Math.max(observed, PLAN.claude + PLAN.virlo);
  const claudeMtd = [...days.values()].reduce((t, d) => t + d.claude, 0);
  const virloMtd = [...days.values()].reduce((t, d) => t + d.virlo, 0);
  const share = PLAN.claude / (PLAN.claude + PLAN.virlo);
  const projection = {
    claude: claudeMtd + dailyRun * share * daysLeft,
    virlo: virloMtd + dailyRun * (1 - share) * daysLeft,
    blotato: 97,
    total: 0,
    daysLeft,
  };
  projection.total = projection.claude + projection.virlo + projection.blotato;
  const nextMonth = { claude: dailyRun * share * 31, virlo: dailyRun * (1 - share) * 31, blotato: 97, total: 0 };
  nextMonth.total = nextMonth.claude + nextMonth.virlo + nextMonth.blotato;
  return {
    days: [...days.entries()].sort().map(([day, v]) => ({ day, ...v })),
    byTask: [...tasks.entries()].map(([label, v]) => ({ label, ...v })).sort((a, b) => b.usd - a.usd),
    today: (days.get(today)?.claude ?? 0) + (days.get(today)?.virlo ?? 0),
    monthToDate: claudeMtd + virloMtd + 97,
    build,
    running,
    dailyRun,
    projection,
    nextMonth,
  };
}

/** Today's Claude spend against the cap set in Settings. */
export async function claudeToday() {
  const { budget } = await import("../../scripts/budget.mjs");
  return (await budget(db())) as { cap: number; spent: number; build: number; left: number };
}

export async function setClaudeCap(dollars: number, by: string) {
  await db()`insert into settings (key, value, updated_by) values ('claude_daily_cap', ${db().json(dollars)}, ${by})
    on conflict (key) do update set value = excluded.value, updated_by = excluded.updated_by, updated_at = now()`;
}
