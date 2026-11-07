import type { DayPlan } from "@/lib/posting";

const PLATFORM: Record<string, string> = { tiktok: "TT", instagram: "IG", facebook: "FB", youtube: "YT" };
const time = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "numeric", minute: "2-digit", hour12: true }).replace(" am", "am").replace(" pm", "pm");

/**
 * Today's and tomorrow's posting against the target: 3 films per account, at least 4 hours apart, and one carousel
 * each on Instagram, TikTok and Facebook. Red when a target is missed or two films are too close.
 */
export function PostingPlan({ plan, target = 3 }: { plan: DayPlan[]; target?: number }) {
  return (
    <section className="plan" aria-labelledby="plan-h">
      <h3 id="plan-h" className="home-h">
        Posting plan
      </h3>
      <p className="data-note">Every account: {target} videos a day, at least 4 hours apart, and a carousel a day on Instagram, TikTok and Facebook.</p>
      {plan.map((d) => {
        const full = d.niches.every((n) => n.videos.length >= target && Object.values(n.carousels).every(Boolean) && !n.videos.some((v) => v.tooClose));
        return (
          <div key={d.day} className="plan-day">
            <h4 className="plan-day-h">
              {d.label} <span className={full ? "plan-ok" : "plan-miss"}>{full ? "on target" : "not on target yet"}</span>
            </h4>
            <table className="plan-table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Videos</th>
                  <th>Carousel (IG · TT · FB)</th>
                </tr>
              </thead>
              <tbody>
                {d.niches.map((n) => (
                  <tr key={n.niche}>
                    <td>{n.handle}</td>
                    <td>
                      <div className="plan-slots">
                        {Array.from({ length: target }, (_, i) => {
                          const v = n.videos[i];
                          return v ? (
                            <span key={i} className={`plan-slot is-${v.status === "published" ? "live" : "set"}${v.tooClose ? " is-close" : ""}`} title={`${v.title} · ${v.platforms.map((p) => PLATFORM[p]).join(" ")}${v.tooClose ? " · within 4 hours of another film" : ""}`}>
                              {time(v.at)}
                              <small>{v.platforms.map((p) => PLATFORM[p]).join(" ")}</small>
                            </span>
                          ) : (
                            <span key={i} className="plan-slot is-empty">
                              open
                            </span>
                          );
                        })}
                        {n.videos.length > target ? <span className="plan-slot is-close">+{n.videos.length - target} over</span> : null}
                      </div>
                    </td>
                    <td>
                      <div className="plan-slots">
                        {Object.entries(n.carousels).map(([p, c]) => (
                          <span key={p} className={c ? `plan-slot is-${c.status === "published" ? "live" : "set"}` : "plan-slot is-empty"} title={c ? `${c.title} · ${time(c.at)}` : "no carousel yet"}>
                            {PLATFORM[p]}
                            <small>{c ? time(c.at) : "none"}</small>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </section>
  );
}
