import Link from "next/link";
import { redirect } from "next/navigation";
import { collectInspiration, keepInspiration } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { RejectButton } from "@/components/reject-button";
import { readInspiration, readPulled, readRejected } from "@/lib/library";
import { outliers } from "@/lib/signals";
import { readSession } from "@/lib/session";

export default async function InspirationPage({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const rejected = new Set(readRejected().inspiration);
  const { run, items: all } = readInspiration();
  const motion = outliers().filter((o) => o.niche === "motion" && !rejected.has(o.url)).sort((a, b) => b.ratio - a.ratio);
  const kept = new Set(readPulled().items.map((p) => p.url));
  const items = all.filter((i) => !rejected.has(i.url) && i.image);
  const sources = [...new Set(items.map((i) => i.source))].sort((a, b) => Number(b === "Abduzeedo") - Number(a === "Abduzeedo"));
  const source = (await searchParams).source ?? "Abduzeedo";
  const shown = (source === "all" ? items : items.filter((i) => i.source === source)).slice(0, 80);

  const Keep = ({ url, name, src, image }: { url: string; name: string; src: string; image?: string }) =>
    kept.has(url) ? (
      <span className="insp-kept">Kept</span>
    ) : (
      <form action={keepInspiration}>
        <input type="hidden" name="url" value={url} />
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="source" value={src} />
        <input type="hidden" name="image" value={image ?? ""} />
        <PendingButton idle="Keep" pending="Keeping" />
      </form>
    );

  return (
    <DeskFrame person={person} current="inspiration">
      <div className="insp-head">
        <div>
          <h2 className="page-title">Inspiration.</h2>
          <p className="split">
            Motion, ads and interface craft. Keep what could become an Offload template: it goes to the Library. Take the idea, never the work.
            {run ? ` Last read ${new Date(run.at).toLocaleString("en-GB")}.` : ""}
          </p>
        </div>
        <form action={collectInspiration}>
          <PendingButton idle="Read the feeds and TikTok" pending="Reading" />
        </form>
      </div>

      {motion.length ? (
        <section className="insp-strip-wrap" aria-label="On TikTok">
          <h3 className="insp-h">On TikTok, above usual</h3>
          <ul className="insp-strip">
            {motion.slice(0, 16).map((o) => (
              <li key={o.id} className="lib-card insp-tiktok">
                <iframe src={`https://www.tiktok.com/embed/v2/${o.id}`} title={`@${o.account}`} className="tiktok-embed" allow="encrypted-media; fullscreen" loading="lazy" />
                <div className="insp-tiktok-meta">
                  <strong>@{o.account}</strong>
                  <span>{o.ratio}× usual</span>
                </div>
                <div className="lib-actions">
                  <Keep url={o.url} name={`@${o.account}: ${o.title.slice(0, 80)}`} src="TikTok" />
                  <RejectButton kind="inspiration" value={o.url} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav className="lib-tabs" aria-label="Sources">
        {[...sources, "all"].map((s) => (
          <Link key={s} href={`/desk/inspiration?source=${encodeURIComponent(s)}`} className={source === s ? "pack-link" : "quiet-link"}>
            {s === "all" ? "Everything" : s}
          </Link>
        ))}
      </nav>
      <ul className="insp-wall">
        {shown.map((i) => (
          <li key={i.url} className="lib-card insp-card">
            <a href={i.url} target="_blank" rel="noreferrer" className="insp-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
            </a>
            <div className="insp-body">
              <a href={i.url} target="_blank" rel="noreferrer" className="insp-title">
                {i.title}
              </a>
              <p className="insp-meta">
                {i.source}
                {i.published ? ` · ${new Date(i.published).toLocaleDateString("en-GB")}` : ""}
              </p>
              <div className="lib-actions">
                <Keep url={i.url} name={i.title} src={i.source} image={i.image} />
                <RejectButton kind="inspiration" value={i.url} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </DeskFrame>
  );
}
