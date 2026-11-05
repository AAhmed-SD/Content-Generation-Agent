import Link from "next/link";
import { redirect } from "next/navigation";
import { runResearch } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { niches } from "@/lib/accounts";
import { readResearch } from "@/lib/pipeline";
import { outliers } from "@/lib/signals";
import { readSession } from "@/lib/session";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

export default async function ResearchPage() {
  const person = await readSession();
  if (!person) redirect("/");
  const research = readResearch();
  const signals = (await outliers());

  return (
    <DeskFrame person={person} current="research">
      <p className="file-no">1 · Research</p>
      <h2 className="page-title">What they are saying.</h2>
      <p className="split">Two inputs, kept apart. The top half feeds carousels. The bottom half feeds videos. Neither writes a script: the writer reads the week&apos;s brief.</p>
      <form action={runResearch}>
        <PendingButton idle={research ? "Look again" : "Run research"} pending="Reading" />
      </form>

      <section className="research-half">
        <h3 className="research-title">For carousels: what students are looking up</h3>
        <p className="split">
          Carousels are free, data-backed and useful even to someone who never downloads Offload. Each title below is a question students are already asking. Answer it properly in six slides: the method, the evidence, the mistake to avoid. Offload gets one line at the end, at most.
        </p>
        {research ? (
          <div className="research-grid">
            {niches.map((niche) => {
              const themes = research.themes.filter((theme) => theme.niche === niche.id && theme.source !== "virlo");
              const sources = research.sources.filter((source) => source.niche === niche.id && source.name !== "Virlo");
              return (
                <article key={niche.id} className="phase-block">
                  <h3>{niche.who}</h3>
                  <p className="file-no">{sources.map((source) => `${source.name} ${source.status}`).join(" · ")}</p>
                  {themes.length ? (
                    <ul>
                      {themes.slice(0, 6).map((theme) => (
                        <li key={theme.text}>{theme.text}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="split">Nothing kept for this account this week.</p>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="split">Nothing has been gathered for this week yet.</p>
        )}
      </section>

      <div className="research-divider" role="separator" aria-label="Videos below">
        <span>Videos</span>
      </div>

      <section className="research-half">
        <h3 className="research-title">For videos: what is going viral in the UK</h3>
        <p className="split">UK accounts only, on the right qualification: UK medicine, dentistry, nursing and radiography; UK maths, economics and computer science; GCSE and A-level; UK students who lose time to starting. Each is a video at two times or more its account's usual views. Study the shape. Never copy the words. The patterns are written up in each account's file under Accounts.</p>
        <div className="research-grid">
          {niches.map((niche) => {
            const virlo = research?.themes.filter((theme) => theme.niche === niche.id && theme.source === "virlo") ?? [];
            const status = research?.sources.find((source) => source.niche === niche.id && source.name === "Virlo");
            const own = signals.filter((s) => s.niche === niche.id).sort((a, b) => b.ratio - a.ratio).slice(0, 5);
            return (
              <article key={niche.id} className="phase-block">
                <h3>{niche.who}</h3>
                <p className="file-no">Virlo {status?.status ?? "not run"}{own.length ? ` · Signals ${own.length}` : ""}</p>
                {virlo.length ? (
                  <ul>
                    {virlo.slice(0, 6).map((theme) => (
                      <li key={theme.text}>{theme.text}</li>
                    ))}
                  </ul>
                ) : null}
                {own.length ? (
                  <ul>
                    {own.map((o) => (
                      <li key={o.id}>
                        <a href={o.url} target="_blank" rel="noreferrer">
                          {o.hook || o.title}
                        </a>{" "}
                        · {o.ratio}× usual
                      </li>
                    ))}
                  </ul>
                ) : null}
                {!virlo.length && !own.length ? <p className="split">Nothing yet for this account.</p> : null}
              </article>
            );
          })}
        </div>
        {!research?.sources.some((s) => s.name === "Virlo" && s.status === "hit") ? (
          <p className="split">
            Virlo is not connected yet. When the trial starts, put its key in web/.env.local as VIRLO_API_KEY and press Look again. Until then this half shows our own <Link href="/desk/signals">Signals</Link>.
          </p>
        ) : null}
      </section>
    </DeskFrame>
  );
}
