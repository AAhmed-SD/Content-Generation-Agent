import { redirect } from "next/navigation";
import { linkedinDraft, linkedinReject, linkedinStatus } from "@/app/actions";
import { CopyButton } from "@/components/copy-button";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { LeaveForm } from "@/components/reject-button";
import { ACCOUNTS, readPosts } from "@/lib/linkedin";
import { readSession } from "@/lib/session";

const NEXT: Record<string, { status: string; label: string } | null> = {
  draft: { status: "approved", label: "Approve" },
  approved: { status: "posted", label: "Mark posted" },
  posted: null,
};

export default async function LinkedInPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const { posts } = readPosts();
  const { error } = await searchParams;

  return (
    <DeskFrame person={person} current="linkedin">
      <h2 className="page-title">LinkedIn, ready to paste.</h2>
      <p className="split">Two posts a day for each account. Approve, copy, paste into LinkedIn, then mark it posted. Blotato can schedule these too once it is connected: it posts to personal profiles and company pages. The voices are in brand/linkedin.md.</p>
      <form action={linkedinDraft} className="phase-actions">
        <PendingButton idle="Draft six more" pending="Drafting" />
      </form>
      {error ? <p className="error">{error}</p> : null}
      <div className="li-columns">
        {ACCOUNTS.map((a) => {
          const list = posts.filter((p) => p.account === a.id && p.status !== "posted");
          const done = posts.filter((p) => p.account === a.id && p.status === "posted").length;
          return (
            <section key={a.id} className="li-column" aria-label={a.label}>
              <h3>
                {a.label} <span>{a.who}</span>
              </h3>
              {list.length === 0 ? <p className="split">Nothing waiting. Draft six more.</p> : null}
              <ul className="li-posts">
                {list.map((p) => (
                  <li key={p.id} className="lib-card li-post" data-status={p.status}>
                    <p className="li-meta">
                      <span className="li-status">{p.status}</span> {p.text.length.toLocaleString("en-GB")} characters
                    </p>
                    <div className="li-text">{p.text}</div>
                    <div className="lib-actions">
                      <CopyButton text={p.text} />
                      {NEXT[p.status] ? (
                        <form action={linkedinStatus}>
                          <input type="hidden" name="id" value={p.id} />
                          <button type="submit" name="status" value={NEXT[p.status]!.status} className="accept-button">
                            {NEXT[p.status]!.label}
                          </button>
                        </form>
                      ) : null}
                      <LeaveForm action={linkedinReject} fields={{ id: p.id }}>
                        <button type="submit" className="reject-button">
                          Reject
                        </button>
                      </LeaveForm>
                    </div>
                  </li>
                ))}
              </ul>
              {done ? <p className="li-done">{done} posted</p> : null}
            </section>
          );
        })}
      </div>
    </DeskFrame>
  );
}
