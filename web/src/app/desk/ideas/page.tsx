import { redirect } from "next/navigation";
import { addIdeaAction, rejectIdeaAction, saveStoryboard, setIdeaStatusAction } from "@/app/actions";
import { Storyboard } from "@/components/storyboard";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { LeaveForm } from "@/components/reject-button";
import { IDEA_STATUS, readIdeas } from "@/lib/library";
import { readSession } from "@/lib/session";

const LABEL: Record<string, string> = { new: "New", accepted: "Accepted", building: "Building", made: "Made" };
const NICHES: Record<string, string> = { all: "All accounts", clinical: "Clinical", analytical: "Analytical", gcsealevel: "GCSE and A-level", mentalhealth: "Time" };
const KINDS = ["Film format", "Series", "Engagement", "Launch", "Product", "LinkedIn", "Rule", "Idea"];

export default async function IdeasPage() {
  const person = await readSession();
  if (!person) redirect("/");
  const { ideas } = readIdeas();

  return (
    <DeskFrame person={person} current="ideas">
      <p className="file-no">Ideas · {ideas.length}</p>
      <h2 className="page-title">What Offload could make next.</h2>
      <p className="split">Formats, series and launch ideas that fit the brand. Accept the ones worth making and reject the rest; a rejected idea is deleted. Move an accepted one to Building when someone starts it, and to Made when it is in the Library.</p>

      <form action={addIdeaAction} className="phase-block lib-add">
        <h3>Add an idea</h3>
        <input name="title" placeholder="The idea, in one line" aria-label="Title" required />
        <textarea name="pitch" rows={3} placeholder="What it looks like, and why it fits Offload" aria-label="Pitch" />
        <div className="phase-actions">
          <select name="kind" aria-label="Kind" defaultValue="Film format">
            {KINDS.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
          <select name="niche" aria-label="Account" defaultValue="all">
            {Object.entries(NICHES).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
          <PendingButton idle="Add" pending="Adding" />
        </div>
      </form>

      {IDEA_STATUS.map((status) => {
        const group = ideas.filter((i) => i.status === status);
        if (!group.length) return null;
        return (
          <section key={status}>
            <p className="side-label">{LABEL[status]} · {group.length}</p>
            <ul className="lib-grid idea-grid">
              {group.map((idea) => (
                <li key={idea.id} className="lib-card">
                  <p className="file-no">
                    {idea.kind} · {NICHES[idea.niche] ?? idea.niche} · {idea.by}, {idea.at}
                  </p>
                  <h3>{idea.title}</h3>
                  <p>{idea.pitch}</p>
                  <Storyboard frames={idea.frames ?? []} />
                  <details className="sb-edit">
                    <summary>{idea.frames?.length ? "Edit storyboard" : "Add a storyboard"}</summary>
                    <form action={saveStoryboard}>
                      <input type="hidden" name="id" value={idea.id} />
                      <textarea name="frames" rows={5} defaultValue={(idea.frames ?? []).join("\n")} placeholder="One frame per line" aria-label="Storyboard frames, one per line" />
                      <PendingButton idle="Save storyboard" pending="Saving" />
                    </form>
                  </details>
                  <div className="lib-actions">
                    <form action={setIdeaStatusAction} className="lib-chips">
                      <input type="hidden" name="id" value={idea.id} />
                      {status === "new" ? (
                        <button type="submit" name="status" value="accepted" className="accept-button">
                          Accept
                        </button>
                      ) : (
                        IDEA_STATUS.filter((s) => s !== status && s !== "new").map((s) => (
                          <button key={s} type="submit" name="status" value={s} className="text-button">
                            {LABEL[s]}
                          </button>
                        ))
                      )}
                    </form>
                    <LeaveForm action={rejectIdeaAction} fields={{ id: idea.id }}>
                      <button type="submit" className="reject-button">
                        Reject
                      </button>
                    </LeaveForm>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </DeskFrame>
  );
}
