import { filmAction, postAction } from "@/app/actions";
import { RenderWatch } from "@/components/render-watch";
import { PostFilm } from "@/components/post-film";
import { NEEDS_TWO, type Film } from "@/lib/films";
import type { Linked, PostRow } from "@/lib/posting";

const ACCOUNT: Record<string, string> = { clinical: "offload.clinical", analytical: "offload.analytical", gcsealevel: "offload.gcsealevel", mentalhealth: "offload.mentalhealth" };
const STAGE: Record<string, string> = { accepted: "Writing the script", drafted: "Voicing", voiced: "Rendering", rendered: "Ready to approve", approved: "Approved" };
const file = (p: string) => `/desk/library/file/${p.split("/").map(encodeURIComponent).join("/")}`;

/** The content agent's films on the Approval page: in progress, ready to approve, approved. */
export function FilmQueue({ films, me, linked = [], posts = [], blotato = false }: { films: Film[]; me: string; linked?: Linked[]; posts?: PostRow[]; blotato?: boolean }) {
  const making = films.filter((f) => ["accepted", "drafted", "voiced"].includes(f.status) && !f.jobError);
  const ready = films.filter((f) => f.status === "rendered");
  const failed = films.filter((f) => f.jobError && f.status === "accepted");
  const approved = films.filter((f) => f.status === "approved").slice(0, 12);
  const held = films.filter((f) => f.status === "held");
  return (
    <section className="films" aria-labelledby="films-h">
      <RenderWatch active={making.length > 0} />
      <h3 id="films-h" className="home-h">
        Films
      </h3>
      {!films.length ? <p className="split">Nothing yet. Accept a proposal on Hooks and the content agent makes the film here.</p> : null}

      {making.length ? (
        <ul className="films-making">
          {making.map((f) => (
            <li key={f.id}>
              <span className="films-dot" aria-hidden="true" />
              <strong>{f.title}</strong> · {ACCOUNT[f.niche]} · {f.format}
              <span className="films-stage">{STAGE[f.status]}…</span>
            </li>
          ))}
        </ul>
      ) : null}

      {held.map((f) => (
        <div key={f.id} className="films-held lib-card">
          <p>
            <strong>{f.title}</strong> · {ACCOUNT[f.niche]} · {f.format}. Held before rendering: the script editor scored it {f.review?.total ?? "?"}/40 after one rewrite, so it was not rendered (to save money).
          </p>
          {f.review?.fixes?.length ? (
            <ul className="films-held-notes">
              {f.review.fixes.slice(0, 5).map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          ) : null}
          {f.lines.length ? (
            <details>
              <summary>The script as it stands</summary>
              <ol className="film-lines">
                {f.lines.map((l) => (
                  <li key={l.id}>{l.say}</li>
                ))}
              </ol>
            </details>
          ) : null}
          <div className="film-actions">
            <form action={filmAction}>
              <input type="hidden" name="id" value={f.id} />
              <button type="submit" name="what" value="render" className="text-button">
                Render it anyway
              </button>
            </form>
            <form action={filmAction} className="hook-reject">
              <input type="hidden" name="id" value={f.id} />
              <input name="note" placeholder="What to change (one short note works best)" aria-label="What to change" required />
              <button type="submit" name="what" value="remake" className="text-button">
                Remake
              </button>
            </form>
            <form action={filmAction} className="hook-reject">
              <input type="hidden" name="id" value={f.id} />
              <input name="reason" placeholder="Why not? (optional)" aria-label="Reason for rejecting" />
              <button type="submit" name="what" value="reject" className="reject-button">
                Reject
              </button>
            </form>
          </div>
        </div>
      ))}

      {failed.map((f) => (
        <div key={f.id} className="films-failed">
          <p>
            <strong>{f.title}</strong> could not be made: {f.jobError}
          </p>
          <form action={filmAction}>
            <input type="hidden" name="id" value={f.id} />
            <button type="submit" name="what" value="retry" className="text-button">
              Try again
            </button>
          </form>
        </div>
      ))}

      <ul className="films-ready">
        {ready.map((f) => {
          const need = NEEDS_TWO.has(f.niche) ? 2 : 1;
          const mine = f.stamps.includes(me);
          return (
            <li key={f.id} className="lib-card film-card">
              {f.kind === "carousel" ? (
                  <div className="carousel-strip" aria-label="Carousel slides">
                    {f.slides.map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={file(src)} alt="" loading="lazy" />
                    ))}
                  </div>
                ) : f.mediaUrl ? (
                  <video src={file(f.mediaUrl)} controls playsInline preload="metadata" className="film-video" />
                ) : null}
              <div className="film-body">
                <div className="hook-meta">
                  <span className="hook-account">{ACCOUNT[f.niche]}</span>
                  <span>{f.format}</span>
                  {need > 1 ? (
                    <span>
                      {f.stamps.length} of {need} stamps
                    </span>
                  ) : null}
                </div>
                <h4 className="film-title">{f.title}</h4>
                {f.truth ? <p className="film-truth">Truth: {f.truth}{f.shape ? ` · Shape: ${f.shape}` : ""}</p> : null}
                {f.review ? (
                  <details className={f.review.verdict === "ship" ? "film-review is-ship" : "film-review"}>
                    <summary>
                      Script editor: {f.review.total}/40{f.review.verdict === "ship" ? "" : ", still below the bar"}
                      {f.review.pass > 1 ? ` (rewritten ${f.review.pass - 1}×)` : ""}
                    </summary>
                    <p>
                      <strong>A first-time viewer gets:</strong> {f.review.cold.about} <strong>Do:</strong> {f.review.cold.do} <strong>Offload:</strong> {f.review.cold.offload}
                    </p>
                    {f.review.fixes.length ? (
                      <ul>
                        {f.review.fixes.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ul>
                    ) : null}
                  </details>
                ) : null}
                {f.lines.length ? (
                  <ol className="film-lines">
                    {f.lines.map((l) => (
                      <li key={l.id}>{l.say}</li>
                    ))}
                  </ol>
                ) : null}
                <div className="film-actions">
                  {mine ? (
                    <span className="data-note">You stamped this. Waiting for the other stamp.</span>
                  ) : (
                    <form action={filmAction}>
                      <input type="hidden" name="id" value={f.id} />
                      <button type="submit" name="what" value="approve" className="accept-button">
                        Approve and schedule
                      </button>
                    </form>
                  )}
                  <form action={filmAction} className="hook-reject">
                    <input type="hidden" name="id" value={f.id} />
                    <input name="note" placeholder="What to change, and the agent remakes it" aria-label="What to change" required />
                    <button type="submit" name="what" value="remake" className="text-button">
                      Send back to remake
                    </button>
                  </form>
                  <form action={filmAction} className="hook-reject">
                    <input type="hidden" name="id" value={f.id} />
                    <input name="reason" placeholder="Why not? (optional, the desk learns from it)" aria-label="Reason for rejecting" />
                    <button type="submit" name="what" value="reject" className="reject-button">
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {approved.length ? (
        <>
          <h3 className="home-h" id="to-post">Approved, to post</h3>
          {posts.some((p) => ["planned", "publishing", "scheduled", "published"].includes(p.status)) ? (
            <form action={postAction}>
              <button type="submit" name="what" value="sync" className="text-button">
                Check status and numbers now
              </button>
            </form>
          ) : null}
          <ul className="films-ready">
            {approved.map((f) => (
              <li key={f.id} className="lib-card film-card">
                {f.kind === "carousel" ? (
                  <div className="carousel-strip" aria-label="Carousel slides">
                    {f.slides.map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={file(src)} alt="" loading="lazy" />
                    ))}
                  </div>
                ) : f.mediaUrl ? (
                  <video src={file(f.mediaUrl)} controls playsInline preload="metadata" className="film-video" />
                ) : null}
                <div className="film-body">
                  <div className="hook-meta">
                    <span className="hook-account">{ACCOUNT[f.niche]}</span>
                    <span>{f.format}</span>
                    <span>Approved</span>
                  </div>
                  <h4 className="film-title">{f.title}</h4>
                  <PostFilm film={f} linked={linked} posts={posts.filter((p) => p.contentId === f.id)} blotato={blotato} />
                  {!posts.some((p) => p.contentId === f.id && !p.test && p.status !== "failed") ? (
                    <details className="hook-undo">
                      <summary>Change my mind</summary>
                      <form action={filmAction} className="hook-reject">
                        <input type="hidden" name="id" value={f.id} />
                        <input name="reason" placeholder="Why not? (optional, the desk learns from it)" aria-label="Reason for rejecting" />
                        <button type="submit" name="what" value="reject" className="reject-button">
                          Reject
                        </button>
                      </form>
                    </details>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}
