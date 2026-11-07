import Link from "next/link";
import { postAction } from "@/app/actions";
import type { Film } from "@/lib/films";
import { baseCaption, type Linked, type PostRow } from "@/lib/posting";

const PLATFORM: Record<string, string> = { tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook", youtube: "YouTube" };
const STATUS: Record<string, string> = { planned: "Uploading", publishing: "Posting", scheduled: "Scheduled", published: "Live", failed: "Failed" };
// the same way Blotato writes it: "Sat 7 Nov, 7:00pm"
const london = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { timeZone: "Europe/London", weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true }).replace(" am", "am").replace(" pm", "pm");
const clock = (iso: string) => new Date(iso).toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" });

/** Post one approved film to its niche's linked accounts, now or at a time, and show how each post is doing. */
export function PostFilm({ film, linked, posts, blotato }: { film: Film; linked: Linked[]; posts: PostRow[]; blotato: boolean }) {
  // a carousel goes to Instagram, TikTok and Facebook only
  const mine = linked.filter((a) => a.niche === film.niche && a.blotatoAccountId && (film.kind !== "carousel" || ["instagram", "tiktok", "facebook"].includes(a.platform)));
  return (
    <div className="post-film">
      {posts.length ? (
        <ul className="post-status">
          {posts.map((p) => (
            <li key={p.id} className={`is-${p.status}`}>
              <strong>{PLATFORM[p.platform] ?? p.platform}</strong>
              {p.test ? " (test, private)" : ""}: {STATUS[p.status] ?? p.status}
              {p.status === "scheduled" && p.scheduledAt ? ` for ${london(p.scheduledAt)} (London)` : ""}
              {p.syncedAt ? <span className="data-note"> · Blotato says {p.blotatoStatus ?? "?"}, checked {clock(p.syncedAt)}</span> : p.status !== "failed" ? <span className="data-note"> · not yet confirmed by Blotato</span> : null}
              {p.views !== null ? ` · ${p.views.toLocaleString("en-GB")} views` : ""}
              {p.url ? (
                <>
                  {" · "}
                  <a href={p.url} target="_blank" rel="noreferrer">
                    open
                  </a>
                </>
              ) : null}
              {p.error ? <span className="post-error"> {p.error}</span> : null}
              {p.status === "failed" ? (
                <form action={postAction} className="inline-form">
                  <input type="hidden" name="post" value={p.id} />
                  <button type="submit" name="what" value="retry" className="text-button">
                    Try again
                  </button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {!blotato ? (
        <p className="data-note">Posting needs Blotato: put BLOTATO_API_KEY in web/.env.local and restart the desk.</p>
      ) : !mine.length ? (
        <p className="data-note">
          No account for this niche is linked yet. <Link href="/desk/accounts">Link them on Blotato links.</Link>
        </p>
      ) : (
        <details className="post-box" open={!posts.length}>
          <summary>{posts.length ? "Post again" : "Post this film"}</summary>
          <form action={postAction}>
            <input type="hidden" name="id" value={film.id} />
            {film.captions ? (
              mine.map((a) => (
                <label key={a.platform} className="post-field">
                  {PLATFORM[a.platform]} caption
                  <textarea name={`caption_${a.platform}`} rows={a.platform === "instagram" ? 5 : 3} defaultValue={film.captions?.[a.platform] ?? ""} />
                </label>
              ))
            ) : (
              <label className="post-field">
                Caption
                <textarea name="caption" rows={3} defaultValue={baseCaption(film)} required />
                <span className="data-note">This older film has no captions written for it, so each platform gets this one, adjusted. No links or prices.</span>
              </label>
            )}
            <fieldset className="post-accounts">
              <legend>Accounts</legend>
              {mine.map((a) => (
                <label key={a.id}>
                  <input type="checkbox" name="account" value={a.id} defaultChecked /> {PLATFORM[a.platform]} {a.username ? `(${a.username})` : ""}
                </label>
              ))}
            </fieldset>
            <fieldset className="post-accounts">
              <legend>When</legend>
              <label>
                <input type="radio" name="timing" value="best" defaultChecked /> At each platform&apos;s best time
              </label>
              <label>
                <input type="radio" name="timing" value="pick" /> Now, or at this time (London):
                <input type="datetime-local" name="when" />
              </label>
            </fieldset>
            <div className="film-actions">
              <button type="submit" name="what" value="post" className="accept-button">
                Post
              </button>
              <button type="submit" name="what" value="test" className="text-button">
                Test privately first (TikTok only me, YouTube private)
              </button>
            </div>
          </form>
        </details>
      )}
    </div>
  );
}
