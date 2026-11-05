import Link from "next/link";
import { redirect } from "next/navigation";
import { DeskFrame } from "@/components/desk-frame";
import { PieceMedia } from "@/components/piece-media";
import { isReady, niches, readDesk } from "@/lib/desk";
import { WEEK } from "@/lib/pipeline";
import { readSession } from "@/lib/session";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

export default async function PostsPage() {
  const person = await readSession();
  if (!person) redirect("/");
  const ready = readDesk().filter((piece) => isReady(piece));

  return (
    <DeskFrame person={person} current="posts">
      <p className="file-no">4 · Posts</p>
      <h2 className="page-title">Ready to post.</h2>
      <p className="split">Open the week, then the account. Each card is the pack.</p>
      <details className="week-drop" open>
        <summary>{WEEK}</summary>
        {niches.map((niche) => {
          const cards = ready.filter((piece) => piece.niche === niche.id);
          return (
            <details key={niche.id} className="week-drop">
              <summary>
                {niche.name}
                <span>{cards.length}</span>
              </summary>
              {cards.length ? (
                <ul className="yes-list">
                  {cards.map((piece) => (
                    <li key={piece.id} className={piece.render.status === "ready" ? "with-media" : undefined}>
                      <PieceMedia piece={piece} />
                      <Link href={`/desk/${piece.niche}/${piece.id}`}>
                        <strong>{piece.script.onScreen || piece.line}</strong>
                      </Link>
                      <a className="pack-link" href={`/desk/${piece.niche}/${piece.id}/pack`}>
                        Pack
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="split">Nothing in this account has both the script and the approval.</p>
              )}
            </details>
          );
        })}
      </details>
    </DeskFrame>
  );
}
