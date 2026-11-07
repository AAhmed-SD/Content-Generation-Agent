import Link from "next/link";
import { redirect } from "next/navigation";
import { setBudget, signOut } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { AddPersonForm, PasswordForm, PersonActions } from "@/components/settings-forms";
import { FILM_PLATFORMS, NICHES, blotatoReady, linkedAccounts } from "@/lib/posting";
import { readSession } from "@/lib/session";
import { AutoRefresh } from "@/components/auto-refresh";
import { VIRLO_FLOOR, VIRLO_WARN, claudeToday, liveSpend, virloState } from "@/lib/spend";
import { listUsers } from "@/lib/users";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

const PLATFORM: Record<string, string> = { tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook", youtube: "YouTube" };
const usd = (n: number | null) => (n === null ? "?" : `$${n.toFixed(2)}`);

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ change?: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const q = await searchParams;
  const admin = person.role === "admin";
  const [users, linked, virlo, live, today] = await Promise.all([admin ? listUsers() : Promise.resolve([]), linkedAccounts(), virloState(), liveSpend(), claudeToday()]);
  const peak = Math.max(0.01, ...live.days.map((d) => d.claude + d.virlo));
  const low = virlo.credits !== null && virlo.credits < VIRLO_WARN;

  return (
    <DeskFrame person={person} current="settings">
      <p className="file-no">Settings</p>
      <h2 className="page-title">Settings.</h2>

      <section className="settings-section" aria-labelledby="s-you">
        <h3 id="s-you" className="home-h">Your account</h3>
        <p className="split">
          Signed in as <strong>{person.name}</strong> ({person.username}), {person.role === "admin" ? "admin" : "member"}.
        </p>
        <PasswordForm first={q.change === "1" || person.mustChange} />
        <form action={signOut}>
          <button type="submit" className="text-button">Sign out</button>
        </form>
      </section>

      {admin ? (
        <section className="settings-section" aria-labelledby="s-people">
          <h3 id="s-people" className="home-h">People</h3>
          <p className="split">Admins add people and reset passwords. One approval from anyone is enough to post.</p>
          <table className="settings-table">
            <tbody>
              {users.map((u) => (
                <tr key={u.username} className={u.active ? undefined : "is-off"}>
                  <td>
                    <strong>{u.name}</strong>
                    <br />
                    <span className="data-note">
                      {u.username} · {u.role}
                      {u.title ? ` · ${u.title}` : ""}
                      {!u.active ? " · turned off" : u.mustChange ? " · has a one-time password" : ""}
                    </span>
                  </td>
                  <td>
                    <PersonActions username={u.username} active={u.active} self={u.username === person.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <details className="settings-add">
            <summary>Add a person</summary>
            <AddPersonForm />
          </details>
        </section>
      ) : null}

      <section className="settings-section" aria-labelledby="s-social">
        <h3 id="s-social" className="home-h">Social accounts</h3>
        {!blotatoReady() ? <p className="error">Blotato is not connected: put BLOTATO_API_KEY in web/.env.local.</p> : null}
        <table className="settings-table settings-grid">
          <thead>
            <tr>
              <th>Account</th>
              {FILM_PLATFORMS.map((p) => (
                <th key={p}>{PLATFORM[p]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(NICHES).map(([niche, n]) => (
              <tr key={niche}>
                <td>{n.handle}</td>
                {FILM_PLATFORMS.map((p) => {
                  const l = linked.find((x) => x.niche === niche && x.platform === p && x.blotatoAccountId);
                  return <td key={p} className={l ? "is-on" : "is-missing"}>{l ? "Connected" : "Not connected"}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="data-note">
          Connect accounts in Blotato, then pick them on <Link href="/desk/accounts">Blotato links</Link>.
        </p>
      </section>

      <section className="settings-section" aria-labelledby="s-spend">
        <AutoRefresh seconds={60} />
        <h3 id="s-spend" className="home-h">Spend, live</h3>
        <p className="data-note">Updates every minute from the desk&apos;s own log of every Claude call and Virlo pull.</p>
        {low ? (
          <p className="error">
            Virlo is low: {virlo.credits} credits ({usd(virlo.dollars)}). {virlo.autoTopUp?.enabled ? `Auto top-up will charge ${usd(virlo.autoTopUp.amount)} when it drops below ${usd(virlo.autoTopUp.below)}.` : "Top up in Virlo, or trend pulls stop."}
          </p>
        ) : null}
        {!virlo.ok ? <p className="error">Virlo: {virlo.error}</p> : null}

        <div className={today.left <= 0 ? "budget-box is-out" : "budget-box"}>
          <p>
            <strong>Claude budget today:</strong> {usd(today.spent)} of {usd(today.cap)} used on running the desk.{" "}
            {today.build > 0 ? `(Plus ${usd(today.build)} of one-off work building the engine, which does not count.) ` : ""}
            {today.left <= 0 ? "Used up: the agent stops until tomorrow (London time)." : `${usd(today.left)} left.`}
          </p>
          {admin ? (
            <form action={setBudget} className="budget-form">
              <label>
                Daily cap in dollars
                <input type="number" name="cap" min={0.5} max={50} step={0.5} defaultValue={today.cap} />
              </label>
              <button type="submit">Save</button>
              <span className="data-note">Every Claude call checks this first. At 12 films a day, about $3–4 is enough.</span>
            </form>
          ) : null}
        </div>
        <div className="spend-cards">
          <div>
            <span className="data-note">Today</span>
            <strong>{usd(live.today)}</strong>
          </div>
          <div>
            <span className="data-note">This month so far</span>
            <strong>{usd(live.monthToDate)}</strong>
            <span className="data-note">incl. Blotato $97</span>
          </div>
          <div>
            <span className="data-note">By month end ({live.projection.daysLeft} days left)</span>
            <strong>{usd(live.projection.total)}</strong>
            <span className="data-note">Claude {usd(live.projection.claude)} · Virlo {usd(live.projection.virlo)} · Blotato $97</span>
          </div>
          <div>
            <span className="data-note">A normal month after this</span>
            <strong>{usd(live.nextMonth.total)}</strong>
            <span className="data-note">no build work, full volume</span>
          </div>
        </div>
        <p className="data-note">
          Building the engine so far: {usd(live.build)} (one-off). Running it: {usd(live.running)}. The projection uses {usd(live.dailyRun)} a day: the last seven days of running costs, or the planned full-volume rate if that is higher.
        </p>

        <h4 className="spend-h">By day</h4>
        <ol className="spend-days">
          {live.days.map((d) => (
            <li key={d.day} title={`${d.day}: Claude ${usd(d.claude)}, Virlo ${usd(d.virlo)}`}>
              <span className="spend-bar">
                <span className="is-claude" style={{ height: `${(d.claude / peak) * 100}%` }} />
                <span className="is-virlo" style={{ height: `${(d.virlo / peak) * 100}%` }} />
              </span>
              <span className="spend-day">{d.day.slice(8)}</span>
              <span className="spend-usd">{usd(d.claude + d.virlo)}</span>
            </li>
          ))}
        </ol>
        <p className="data-note">
          <span className="spend-key is-claude" /> Claude <span className="spend-key is-virlo" /> Virlo
        </p>

        <h4 className="spend-h">What the Claude money went on this month</h4>
        <table className="settings-table">
          <tbody>
            {live.byTask.map((t) => (
              <tr key={t.label}>
                <td>
                  {t.label}
                  {t.build ? <span className="data-note"> · building</span> : null}
                </td>
                <td className="spend-num">{t.calls} calls</td>
                <td className="spend-num">{usd(t.usd)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="settings-spend">
          <div>
            <dt>Virlo balance</dt>
            <dd>
              {usd(virlo.dollars)} <span className="data-note">({virlo.credits ?? "?"} credits; pulls stop under {VIRLO_FLOOR} credits)</span>
            </dd>
          </div>
          <div>
            <dt>Virlo auto top-up</dt>
            <dd>
              {virlo.autoTopUp ? (virlo.autoTopUp.enabled ? `On: charges ${usd(virlo.autoTopUp.amount)} whenever the balance drops below ${usd(virlo.autoTopUp.below)}. Unused credit carries over. Turn it off in Virlo's settings to cap spend.` : "Off: when the credits run out, pulls stop until you top up.") : "?"}
            </dd>
          </div>
          <div>
            <dt>Blotato</dt>
            <dd>$97 a month, flat (Creator plan)</dd>
          </div>
        </dl>
      </section>
    </DeskFrame>
  );
}
