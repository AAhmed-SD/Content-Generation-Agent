import Link from "next/link";
import { redirect } from "next/navigation";
import { DeskFrame } from "@/components/desk-frame";
import { HomeIntro } from "@/components/home-intro";
import { Storyboard } from "@/components/storyboard";
import { readCatalogue, readIdeas, readInspiration, readRejected } from "@/lib/library";
import { readPosts } from "@/lib/linkedin";
import { loopCounts, NICHES, postingPlan } from "@/lib/posting";
import { PostingPlan } from "@/components/posting-plan";
import { readResearch } from "@/lib/pipeline";
import { outliers } from "@/lib/signals";
import { proposalCounts } from "@/lib/proposals";
import { readSession } from "@/lib/session";
import { VIRLO_WARN, claudeToday, virloState } from "@/lib/spend";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

const hour = () => new Date().getHours();

export default async function HomePage() {
  const person = await readSession();
  if (!person) redirect("/");
  const first = person.name.split(" ")[0];
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const signals = (await outliers()).filter((o) => o.niche !== "motion" && o.at >= weekAgo);
  const research = readResearch();
  const [counts, virlo, budget, plan] = await Promise.all([loopCounts(), virloState(), claudeToday(), postingPlan(2)]);
  const bars = counts.views.filter((v) => v.views > 0).map((v) => ({ label: NICHES[v.niche]?.label ?? v.niche, value: v.views, display: v.views.toLocaleString("en-GB") }));
  const ideas = (await readIdeas()).ideas.filter((i) => i.status !== "made").slice(0, 3);
  const rejected = new Set((await readRejected()).inspiration);
  const insp = (await readInspiration()).items.filter((i) => i.image && !rejected.has(i.url)).sort((a, b) => Number(b.source === "Abduzeedo") - Number(a.source === "Abduzeedo")).slice(0, 6);
  const motion = (await outliers()).filter((o) => o.niche === "motion").length;
  const films = (await readCatalogue())?.films.filter((f) => f.thumb).length ?? 0;
  const li = (await readPosts()).posts;

  const loop = [
    { href: "/desk/signals", n: 1, label: "Signals", value: signals.length, note: "UK videos above usual, this week" },
    { href: "/desk/research", n: 2, label: "Research", value: research?.themes.length ?? 0, note: research ? "things students are looking up" : "not run this week" },
    { href: "/desk/hooks", n: 3, label: "Hooks", value: (await proposalCounts()).proposed ?? 0, note: "video proposals waiting" },
    { href: "/desk", n: 4, label: "Approval", value: counts.waiting, note: "films waiting for a stamp" },
    { href: "/desk#to-post", n: 5, label: "Posts", value: counts.ready, note: counts.queued || counts.live ? `approved to post · ${counts.queued} queued · ${counts.live} live` : "approved, ready to post" },
    { href: "/desk/loop", n: 6, label: "Numbers", value: counts.live, note: counts.snapshots ? `posts with numbers back (${counts.snapshots} readings)` : "nothing back yet" },
  ];

  return (
    <DeskFrame person={person} current="home">
      <HomeIntro />
      <header className="home-head">
        <h2 className="page-title">
          {hour() < 12 ? "Morning" : hour() < 18 ? "Afternoon" : "Evening"}, {first}.
        </h2>
        <p className="split">
          Offload launches on 16 November. {films} films in the bank, {li.filter((p) => p.status !== "posted").length} LinkedIn posts waiting, {motion} motion videos to study.
        </p>
      </header>

      {budget.left <= 0 ? (
        <p className="error">
          Today&apos;s Claude budget for running the desk is used up ({budget.spent.toFixed(2)} of {budget.cap.toFixed(2)} dollars). The agent carries on tomorrow. <Link href="/desk/settings">Settings</Link>
        </p>
      ) : null}
      {virlo.credits !== null && virlo.credits < VIRLO_WARN ? (
        <p className="error">
          Virlo credits are low ({virlo.credits}). {virlo.autoTopUp?.enabled ? `Auto top-up will charge about ${Math.round(virlo.autoTopUp.amount)} dollars soon.` : "Trend pulls stop when they run out."}{" "}
          <Link href="/desk/settings">Settings</Link>
        </p>
      ) : null}
      <PostingPlan plan={plan} />
      <section aria-labelledby="home-loop">
        <h3 id="home-loop" className="home-h">
          The loop, from data in to data out
        </h3>
        <ol className="home-loop">
          {loop.map((s) => (
            <li key={s.label}>
              <Link href={s.href}>
                <span className="home-loop-n">{s.n}</span>
                <span className="home-loop-label">{s.label}</span>
                <span className="home-loop-value">{s.value}</span>
                <span className="home-loop-note">{s.note}</span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="home-loop-back">Numbers feed the next turn: they go back into Signals and Research.</p>
      </section>

      <div className="home-split">
        <section aria-labelledby="home-ideas">
          <div className="home-row">
            <h3 id="home-ideas" className="home-h">
              Ideas
            </h3>
            <Link href="/desk/ideas">All ideas</Link>
          </div>
          <ul className="home-ideas">
            {ideas.map((i) => (
              <li key={i.id}>
                <p className="home-idea-title">{i.title}</p>
                <Storyboard frames={i.frames ?? []} small />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="home-data">
          <div className="home-row">
            <h3 id="home-data" className="home-h">
              Data out
            </h3>
            <Link href="/desk/loop">Numbers</Link>
          </div>
          {bars.length ? (
            <ul className="home-bars">
              {bars.map((b) => {
                const max = Math.max(...bars.map((x) => x.value));
                return (
                  <li key={b.label}>
                    <span>{b.label}</span>
                    <span className="home-bar">
                      <span style={{ width: `${(b.value / max) * 100}%` }} />
                    </span>
                    <span className="home-bar-n">{b.display}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="split">No numbers back yet. After the first posts, Blotato brings them back every 20 minutes.</p>
          )}
        </section>
      </div>

      <section aria-labelledby="home-insp">
        <div className="home-row">
          <h3 id="home-insp" className="home-h">
            Inspiration
          </h3>
          <Link href="/desk/inspiration">Open the wall</Link>
        </div>
        <ul className="home-insp">
          {insp.map((i) => (
            <li key={i.url}>
              <a href={i.url} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image} alt={i.title} loading="lazy" referrerPolicy="no-referrer" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </DeskFrame>
  );
}
