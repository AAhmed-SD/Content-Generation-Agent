import Link from "next/link";
import { redirect } from "next/navigation";
import { stampPiece } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { PieceMedia } from "@/components/piece-media";
import { RenderWatch } from "@/components/render-watch";
import { FilmQueue } from "@/components/film-queue";
import { listFilms } from "@/lib/films";
import { canStamp, isReady, needsScript, niches, readDesk, type NicheId, type Piece } from "@/lib/desk";
import { personName, type PersonId } from "@/lib/people";
import { readSession } from "@/lib/session";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

export default async function DeskPage() {
  const person = await readSession();
  if (!person) redirect("/");
  const pieces = readDesk();
  const films = await listFilms();

  const yes = pieces.filter((piece) => canStamp(piece, person.id) && piece.script.source === "claude");
  const post = pieces.filter((piece) => isReady(piece) && !piece.liveUrl);
  const making = pieces.filter(
    (piece) => needsScript(piece) || piece.render.status === "rendering" || (piece.script.source === "claude" && piece.render.status === "idle"),
  );
  const failed = pieces.filter((piece) => piece.render.status === "failed");
  const waiting = pieces.filter((piece) => !isReady(piece) && !canStamp(piece, person.id) && piece.script.source === "claude");
  const visible = yes.length + waiting.length + post.length + failed.length;

  return (
    <DeskFrame person={person} current="yes">
      <RenderWatch active={making.length > 0} />
      <p className="file-no">3 · Approval</p>
      <h2 className="page-title">Approve it, then post.</h2>
      <p className="split">Your name is on the cards you can stamp. Medicine and time still need both of you.</p>
      <FilmQueue films={films} me={person.name} />
      {visible === 0 ? <p className="split">No older cards are waiting on you.</p> : null}
      {niches.map((niche) => (
        <Audience
          key={niche.id}
          nicheId={niche.id}
          who={niche.who}
          about={niche.about}
          yes={yes.filter((piece) => piece.niche === niche.id)}
          waiting={waiting.filter((piece) => piece.niche === niche.id)}
          post={post.filter((piece) => piece.niche === niche.id)}
          failed={failed.filter((piece) => piece.niche === niche.id)}
          personId={person.id}
        />
      ))}
      {making.length > 0 ? <p className="split">Still writing {making.length}. Leave those closed.</p> : null}
    </DeskFrame>
  );
}

function Audience({
  nicheId,
  who,
  about,
  yes,
  waiting,
  post,
  failed,
  personId,
}: {
  nicheId: NicheId;
  who: string;
  about: string;
  yes: Piece[];
  waiting: Piece[];
  post: Piece[];
  failed: Piece[];
  personId: PersonId;
}) {
  if (yes.length + waiting.length + post.length + failed.length === 0) return null;
  return (
    <article className="audience">
      <h3>{who}</h3>
      <p>{about}</p>
      <ul className="yes-list">
        {yes.map((piece) => (
          <CardRow key={piece.id} piece={piece} action="yes" />
        ))}
        {waiting.map((piece) => (
          <CardRow key={piece.id} piece={piece} action="wait" personId={personId} />
        ))}
        {post.map((piece) => (
          <CardRow key={piece.id} piece={piece} action="post" />
        ))}
        {failed.map((piece) => (
          <CardRow key={piece.id} piece={piece} action="failed" />
        ))}
      </ul>
    </article>
  );
}

function CardRow({
  piece,
  action,
  personId,
}: {
  piece: Piece;
  action: "yes" | "wait" | "post" | "failed";
  personId?: PersonId;
}) {
  const other = piece.lead === "hadiqa" ? "laiba" : "hadiqa";
  const waitingOn = piece.stamps.length === 0 ? piece.lead : personId && piece.stamps.includes(personId) ? other : piece.lead;
  return (
    <li className={piece.render.status === "ready" ? "with-media" : undefined}>
      <PieceMedia piece={piece} />
      <Link href={`/desk/${piece.niche}/${piece.id}`}>
        <strong>{piece.script.onScreen || piece.line}</strong>
      </Link>
      {action === "yes" ? (
        <form action={stampPiece}>
          <input type="hidden" name="id" value={piece.id} />
          <PendingButton idle="Approve" pending="Saving" />
        </form>
      ) : action === "wait" ? (
        <span className="quiet-state">With {personName(waitingOn).split(" ")[0]}</span>
      ) : (
        <Link className="pack-link" href={`/desk/${piece.niche}/${piece.id}`}>
          {action === "failed" ? "Picture failed" : "Post"}
        </Link>
      )}
    </li>
  );
}
