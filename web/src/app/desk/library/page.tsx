import Link from "next/link";
import { redirect } from "next/navigation";
import { rebuildLibrary } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { RejectButton } from "@/components/reject-button";
import { readCatalogue, readPulled } from "@/lib/library";
import { readSession } from "@/lib/session";

const TABS = [
  { id: "templates", label: "Templates" },
  { id: "films", label: "Films" },
  { id: "stills", label: "Stills and carousels" },
  { id: "pulled", label: "Pulled in" },
] as const;
const NICHES: Record<string, string> = { clinical: "Clinical", analytical: "Analytical", gcse: "GCSE and A-level", time: "Time" };
const file = (p: string) => `/desk/library/file/${p.split("/").map(encodeURIComponent).join("/")}`;

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ tab?: string; niche?: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const query = await searchParams;
  const tab = TABS.some((t) => t.id === query.tab) ? query.tab : "templates";
  const niche = query.niche && NICHES[query.niche] ? query.niche : "all";
  const lib = readCatalogue();
  const pulled = readPulled();

  return (
    <DeskFrame person={person} current="library">
      <p className="file-no">Library{lib ? ` · built ${new Date(lib.at).toLocaleString("en-GB")}` : ""}</p>
      <h2 className="page-title">Start from something that works.</h2>
      <p className="split">
        Every template we have built, every film made from one, and what we have pulled in from outside. Pick a format here before writing anything new: copy its example and change the words. The same list is in docs/library.md for the script writer.
      </p>
      <form action={rebuildLibrary} className="phase-actions">
        <PendingButton idle="Rebuild the list" pending="Rebuilding" />
      </form>
      <nav className="lib-tabs" aria-label="Library sections">
        {TABS.map((t) => (
          <Link key={t.id} href={`/desk/library?tab=${t.id}`} className={tab === t.id ? "pack-link" : "quiet-link"}>
            {t.label}
          </Link>
        ))}
      </nav>

      {!lib ? <p className="split">No list yet. Press Rebuild, or run node scripts/library.mjs from the repo root.</p> : null}

      {lib && tab === "templates" ? (
        <ul className="lib-grid">
          {lib.formats.map((f) => (
            <li key={f.id} className="lib-card">
              {f.thumb && f.video ? (
                <a href={file(f.video)} target="_blank" rel="noreferrer" className="lib-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.thumb} alt="" loading="lazy" />
                </a>
              ) : (
                <div className="lib-thumb is-empty">No film yet</div>
              )}
              <p className="file-no">
                {f.id} · {f.voice ? "voiced" : "no voice"} · {f.examples.length} film{f.examples.length === 1 ? "" : "s"}
              </p>
              <h3>{f.name}</h3>
              <p>{f.shape}</p>
              <p className="lib-chips">
                {f.styles.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </p>
              <p className="lib-path">remotion/src/world/{f.kit}</p>
              <div className="lib-actions">
                <RejectButton kind="format" value={f.id} label="Reject template" />
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {lib && tab === "films" ? (
        <>
          <nav className="lib-tabs" aria-label="Accounts">
            {["all", ...Object.keys(NICHES)].map((n) => (
              <Link key={n} href={`/desk/library?tab=films&niche=${n}`} className={niche === n ? "pack-link" : "quiet-link"}>
                {n === "all" ? "All" : NICHES[n]}
              </Link>
            ))}
          </nav>
          <ul className="lib-grid">
            {lib.films
              .filter((f) => niche === "all" || f.niche === niche)
              .map((f) => (
                <li key={f.id} className="lib-card">
                  {f.thumb && f.video ? (
                    <a href={file(f.video)} target="_blank" rel="noreferrer" className="lib-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.thumb} alt="" loading="lazy" />
                    </a>
                  ) : (
                    <div className="lib-thumb is-empty">Not rendered</div>
                  )}
                  <p className="file-no">
                    {NICHES[f.niche] ?? f.niche} · {f.format}
                  </p>
                  <h3>{f.hook || f.id}</h3>
                  <p className="lib-path">bank/{f.id}</p>
                  <div className="lib-actions">
                    <RejectButton kind="film" value={f.id} />
                  </div>
                </li>
              ))}
          </ul>
        </>
      ) : null}

      {lib && tab === "stills" ? (
        <>
          <ul className="lib-grid is-stills">
            {lib.stills.map((s) => (
              <li key={s.file} className="lib-card">
                <a href={file(s.file)} target="_blank" rel="noreferrer" className="lib-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={file(s.file)} alt="" loading="lazy" />
                </a>
                <p className="file-no">{s.kind}</p>
                <h3>{s.name}</h3>
                <div className="lib-actions">
                  <RejectButton kind="still" value={s.file} />
                </div>
              </li>
            ))}
          </ul>
          {lib.carousels.map((c) => (
            <section key={c.name} className="phase-block">
              <h3>Carousel · {c.name}</h3>
              <div className="lib-strip">
                {c.slides.map((s) => (
                  <a key={s} href={file(s)} target="_blank" rel="noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={file(s)} alt="" loading="lazy" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </>
      ) : null}

      {tab === "pulled" ? (
        <>
          <p className="split">{pulled.note}</p>
          <ul className="lib-grid">
            {pulled.items.map((p) => (
              <li key={`${p.source}:${p.name}`} className="lib-card">
                {p.image ? (
                  <a href={p.url} target="_blank" rel="noreferrer" className="lib-thumb is-wide">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
                  </a>
                ) : null}
                <p className="file-no">
                  {p.source} · {p.status}
                </p>
                <h3>{p.url ? <a href={p.url} target="_blank" rel="noreferrer">{p.name}</a> : p.name}</h3>
                <p>{p.fit}</p>
                <div className="lib-actions">
                  <RejectButton kind="pulled" value={p.url} name={p.name} />
                </div>
              </li>
            ))}
          </ul>
          {lib?.references.length ? (
            <section className="phase-block">
              <h3>Design references</h3>
              <p className="split">Read for craft: spacing, type, motion, glass. Never copy a brand.</p>
              <ul>
                {lib.references.map((r) => (
                  <li key={r.file}>
                    <strong>{r.name}</strong> · {r.file}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      ) : null}
    </DeskFrame>
  );
}
