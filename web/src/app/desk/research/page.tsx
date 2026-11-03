import { redirect } from "next/navigation";
import { runResearch } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { niches } from "@/lib/accounts";
import { readResearch } from "@/lib/pipeline";
import { readSession } from "@/lib/session";

export default async function ResearchPage() {
  const person = await readSession();
  if (!person) redirect("/");
  const research = readResearch();

  return (
    <DeskFrame person={person} current="research">
      <p className="file-no">1 · Research</p>
      <h2 className="page-title">What they are saying.</h2>
      <p className="split">This uses the brand, the four accounts, and the four kinds of content pinned above. It does not write the scripts.</p>
      <form action={runResearch}>
        <PendingButton idle={research ? "Look again" : "Run research"} pending="Reading" />
      </form>
      {research ? (
        niches.map((niche) => {
          const themes = research.themes.filter((theme) => theme.niche === niche.id);
          const sources = research.sources.filter((source) => source.niche === niche.id);
          return (
            <section key={niche.id} className="phase-block">
              <h3>{niche.who}</h3>
              <p className="file-no">{sources.map((source) => `${source.name} ${source.status}`).join(" · ")}</p>
              {themes.length ? (
                <ul>
                  {themes.slice(0, 6).map((theme) => (
                    <li key={theme.text}>{theme.text}</li>
                  ))}
                </ul>
              ) : (
                <p className="split">No theme kept for this account.</p>
              )}
            </section>
          );
        })
      ) : (
        <p className="split">Nothing has been gathered for this week yet.</p>
      )}
    </DeskFrame>
  );
}
