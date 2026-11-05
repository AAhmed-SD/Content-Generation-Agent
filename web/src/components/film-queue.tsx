import { filmAction } from "@/app/actions";
import { RenderWatch } from "@/components/render-watch";
import { NEEDS_TWO, type Film } from "@/lib/films";

const ACCOUNT: Record<string, string> = { clinical: "offload.clinical", analytical: "offload.analytical", gcsealevel: "offload.gcsealevel", mentalhealth: "offload.mentalhealth" };
const STAGE: Record<string, string> = { accepted: "Writing the script", drafted: "Voicing", voiced: "Rendering", rendered: "Ready to approve", approved: "Approved" };
const file = (p: string) => `/desk/library/file/${p.split("/").map(encodeURIComponent).join("/")}`;

/** The content agent's films on the Approval page: in progress, ready to approve, approved. */
export function FilmQueue({ films, me }: { films: Film[]; me: string }) {
  const making = films.filter((f) => ["accepted", "drafted", "voiced"].includes(f.status) && !f.jobError);
  const ready = films.filter((f) => f.status === "rendered");
  const failed = films.filter((f) => f.jobError && f.status === "accepted");
  const approved = films.filter((f) => f.status === "approved").slice(0, 8);
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
              {f.mediaUrl ? <video src={file(f.mediaUrl)} controls playsInline preload="metadata" className="film-video" /> : null}
              <div className="film-body">
                <div className="hook-meta">
                  <span className="hook-account">{ACCOUNT[f.niche]}</span>
                  <span>{f.format}</span>
                  <span>
                    {f.stamps.length} of {need} stamps
                  </span>
                </div>
                <h4 className="film-title">{f.title}</h4>
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
                        Approve
                      </button>
                    </form>
                  )}
                  <form action={filmAction} className="hook-reject">
                    <input type="hidden" name="id" value={f.id} />
                    <input name="note" placeholder="What to change, and the agent remakes it" aria-label="What to change" required />
                    <button type="submit" name="what" value="remake" className="reject-button">
                      Send back
                    </button>
                  </form>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {approved.length ? (
        <p className="data-note">
          Approved and ready to schedule: {approved.map((f) => f.title).join(", ")}.
        </p>
      ) : null}
    </section>
  );
}
