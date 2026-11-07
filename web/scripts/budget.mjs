// The daily Claude budget. Every Claude call on the desk, the agent and the script lead checks it first, so the
// desk can never spend more than the cap set in Settings (marketing.settings 'claude_daily_cap', dollars per London
// day). A call that would start over the cap is refused with a clear message.
//
// The cap is for running the desk. One-off work building the engine (research dossiers, the first truth bank, the
// shapes library) is logged and shown in Settings, but does not count against the daily cap. A run that tops the
// truth bank up (--grow) is running cost, so it is tagged "truths-grow" and does count.

export const BUILD_TASKS = "^(dossier|truths-(?!grow)|shapes|probe)";

export class BudgetReached extends Error {
  constructor(spent, cap) {
    super(`Today's Claude budget is used up ($${spent.toFixed(2)} of $${cap.toFixed(2)}). The agent carries on tomorrow, or raise the cap in Settings.`);
    this.name = "BudgetReached";
  }
}

/** Today's running spend, one-off build spend, and the cap, London day. */
export async function budget(sql) {
  const [r] = await sql`select
      coalesce((select (value #>> '{}')::numeric from settings where key = 'claude_daily_cap'), 4)::float as cap,
      coalesce(sum((detail->>'usd')::numeric) filter (where coalesce(detail->>'task', '') !~ ${BUILD_TASKS}), 0)::float as spent,
      coalesce(sum((detail->>'usd')::numeric) filter (where coalesce(detail->>'task', '') ~ ${BUILD_TASKS}), 0)::float as build
    from runs where kind = 'claude' and at >= date_trunc('day', now() at time zone 'Europe/London') at time zone 'Europe/London'`;
  return { cap: r.cap, spent: r.spent, build: r.build, left: Math.max(0, r.cap - r.spent) };
}

/** Throw if today's running budget is used up. `need` reserves room for the call about to be made. */
export async function checkBudget(sql, need = 0) {
  const b = await budget(sql);
  if (b.spent + need > b.cap) throw new BudgetReached(b.spent, b.cap);
  return b;
}
