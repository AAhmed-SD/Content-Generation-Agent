import Link from "next/link";
import { redirect } from "next/navigation";
import { decideProposal, proposeVideos } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { ProposalChat } from "@/components/proposal-chat";
import { LeaveForm } from "@/components/reject-button";
import { listProposals, messagesFor, NICHES, proposalCounts } from "@/lib/proposals";
import { readSession } from "@/lib/session";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

const ACCOUNT: Record<string, string> = { clinical: "offload.clinical", analytical: "offload.analytical", gcsealevel: "offload.gcsealevel", mentalhealth: "offload.mentalhealth" };
const TABS = [
  { id: "proposed", label: "Proposed" },
  { id: "accepted", label: "Accepted" },
  { id: "rejected", label: "Rejected" },
] as const;

export default async function HooksPage({ searchParams }: { searchParams: Promise<{ tab?: string; niche?: string; error?: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const q = await searchParams;
  const tab = TABS.some((t) => t.id === q.tab) ? (q.tab as (typeof TABS)[number]["id"]) : "proposed";
  const niche = NICHES.includes(q.niche as (typeof NICHES)[number]) ? q.niche : undefined;
  const [list, counts] = await Promise.all([listProposals(tab, niche), proposalCounts()]);
  const threads = await messagesFor(list.map((p) => p.id));
  const href = (over: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ tab, niche, ...over })) if (v) p.set(k, v);
    return `/desk/hooks?${p.toString()}`;
  };

  return (
    <DeskFrame person={person} current="scripts">
      <div className="data-head">
        <div>
          <h2 className="page-title">Hooks.</h2>
          <p className="split">
            Video proposals: the hook, the theme, the format and how it would look, frame by frame. Accept what should be made, reject the rest with a reason the desk learns from, or talk to the desk under any proposal to change it.
          </p>
        </div>
        <form action={proposeVideos} className="hooks-propose">
          <input type="hidden" name="niche" value={niche ?? ""} />
          <input type="hidden" name="count" value="8" />
          <PendingButton idle={niche ? `Propose 8 for ${ACCOUNT[niche]}` : "Propose 8 videos"} pending="Writing proposals…" />
        </form>
      </div>
      {q.error ? <p className="error">{q.error}</p> : null}

      <nav className="data-views" aria-label="Status">
        {TABS.map((t) => (
          <Link key={t.id} href={href({ tab: t.id })} className={tab === t.id ? "is-on" : undefined} scroll={false}>
            {t.label} <span className="hooks-count">{counts[t.id] ?? 0}</span>
          </Link>
        ))}
      </nav>
      <nav className="data-filters is-left" aria-label="Account">
        <Link href={href({ niche: undefined })} className={!niche ? "is-on" : undefined} scroll={false}>
          All accounts
        </Link>
        {NICHES.map((n) => (
          <Link key={n} href={href({ niche: n })} className={niche === n ? "is-on" : undefined} scroll={false}>
            {ACCOUNT[n]}
          </Link>
        ))}
      </nav>

      {list.length === 0 ? (
        <p className="split">{tab === "proposed" ? "No proposals waiting. Press Propose to get a fresh set, built from what is working on UK TikTok and this week's research." : `Nothing ${tab} yet.`}</p>
      ) : null}

      <ul className="hooks-list">
        {list.map((p) => (
          <li key={p.id} className="lib-card hook-card">
            <div className="hook-meta">
              <span className="hook-account">{ACCOUNT[p.niche]}</span>
              <span>{p.format}</span>
              <span>{p.hookStyle}</span>
            </div>
            <h3 className="hook-title">{p.title || p.theme}</h3>
            <div className="hook-openers">
              {p.openers.map((o, i) => (
                <p key={i}>
                  <span className="hook-ab">{i === 0 ? "A" : "B"}</span>“{o}”
                </p>
              ))}
            </div>
            <dl className="hook-facts">
              <div>
                <dt>Theme</dt>
                <dd>{p.theme}</dd>
              </div>
              <div>
                <dt>Look</dt>
                <dd>{p.look}</dd>
              </div>
            </dl>
            <ol className="hook-board" aria-label="Storyboard">
              {p.storyboard.map((f, i) => (
                <li key={i}>
                  <span className="hook-frame-n">{i + 1}</span>
                  <p className="hook-screen">{f.screen}</p>
                  {f.voice ? <p className="hook-voice">“{f.voice}”</p> : null}
                </li>
              ))}
            </ol>
            {p.reasoning ? (
              <details className="hook-why">
                <summary>Why this should work</summary>
                <p>{p.reasoning}</p>
              </details>
            ) : null}
            {p.rejections.length ? (
              <p className="hook-rejected">
                Rejected by {p.rejections.at(-1)!.by}
                {p.rejections.at(-1)!.reason ? `: ${p.rejections.at(-1)!.reason}` : ""}
              </p>
            ) : null}

            {tab === "proposed" ? (
              <div className="hook-decide">
                <LeaveForm action={decideProposal} fields={{ id: p.id, decision: "accepted" }}>
                  <button type="submit" className="accept-button">
                    Accept
                  </button>
                </LeaveForm>
                <LeaveForm action={decideProposal} fields={{ id: p.id, decision: "rejected" }} className="hook-reject">
                  <input name="reason" placeholder="Why not? (optional, the desk learns from it)" aria-label="Reason for rejecting" />
                  <button type="submit" className="reject-button">
                    Reject
                  </button>
                </LeaveForm>
              </div>
            ) : null}

            <details className="hook-chat" open={(threads[p.id]?.length ?? 0) > 0}>
              <summary>Talk to the desk{threads[p.id]?.length ? ` · ${threads[p.id].length}` : ""}</summary>
              <ProposalChat id={p.id} initial={threads[p.id] ?? []} me={person.name.split(" ")[0]} />
            </details>
          </li>
        ))}
      </ul>
    </DeskFrame>
  );
}
