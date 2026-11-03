import { redirect } from "next/navigation";
import { approveScript, rejectScript, writeTheScripts } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { niches, readDesk } from "@/lib/desk";
import { readSession } from "@/lib/session";

export default async function ScriptsPage() {
  const person = await readSession();
  if (!person) redirect("/");
  const pieces = readDesk();

  return (
    <DeskFrame person={person} current="scripts">
      <p className="file-no">2 · Scripts</p>
      <h2 className="page-title">Claude writes. You keep or send back.</h2>
      <p className="split">Each script is written from the brand, the account, the content type, and this week’s research. A rejection is kept. The next script is written against it.</p>
      <form action={writeTheScripts}>
        <PendingButton idle="Write the scripts" pending="Writing" />
      </form>
      {niches.map((niche) => (
        <section key={niche.id} className="phase-block">
          <h3>{niche.who}</h3>
          <ul className="yes-list">
            {pieces
              .filter((piece) => piece.niche === niche.id)
              .map((piece) => (
                <li key={piece.id}>
                  <div>
                    <strong>{piece.part}</strong>
                    <p>{piece.script.source === "claude" ? piece.script.onScreen : "Not written yet."}</p>
                    {piece.rejections.length ? <p className="file-no">Sent back: {piece.rejections.at(-1)}</p> : null}
                  </div>
                  {piece.script.source === "claude" && !piece.approved ? (
                    <form action={approveScript}>
                      <input type="hidden" name="id" value={piece.id} />
                      <PendingButton idle="Approve" pending="Saving" />
                    </form>
                  ) : null}
                  {piece.approved ? <span className="quiet-state">Approved</span> : null}
                  <form action={rejectScript} className="stack-form">
                    <input type="hidden" name="id" value={piece.id} />
                    <label>
                      Send back
                      <input type="text" name="reason" maxLength={180} placeholder="What to change" required />
                    </label>
                    <PendingButton idle="Reject" pending="Saving" />
                  </form>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </DeskFrame>
  );
}
