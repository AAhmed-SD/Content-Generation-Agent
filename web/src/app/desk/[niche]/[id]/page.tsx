import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { saveUrl, stampPiece } from "@/app/actions";
import { PendingButton } from "@/components/pending-button";
import { DeskFrame } from "@/components/desk-frame";
import { RenderWatch } from "@/components/render-watch";
import { canStamp, findPiece, isReady, needsScript, nicheById, readDesk } from "@/lib/desk";
import { personName, type PersonId } from "@/lib/people";
import { readSession } from "@/lib/session";

export default async function PiecePage({
  params,
  searchParams,
}: {
  params: Promise<{ niche: string; id: string }>;
  searchParams: Promise<{ url?: string }>;
}) {
  const person = await readSession();
  if (!person) redirect("/");
  const { niche: nicheId, id } = await params;
  const query = await searchParams;
  const niche = nicheById(nicheId);
  const piece = findPiece(readDesk(), id);
  if (!niche || !piece || piece.niche !== niche.id) notFound();
  const ready = isReady(piece);
  const other: PersonId = person.id === "hadiqa" ? "laiba" : "hadiqa";
  const waitingOn = piece.stamps.includes(person.id) ? other : piece.lead;

  return (
    <DeskFrame person={person} current="week">
      <RenderWatch active={needsScript(piece) || piece.render.status === "rendering"} />
      <article className="piece">
        <p className="file-no">
          <Link href="/desk">Desk</Link>
        </p>
        <p className="status-line">
          <span>{niche.who}</span>
        </p>
        <p className="split">{niche.about}</p>

        <div className="poster">
          <h2>{piece.script.onScreen || piece.line}</h2>
          <p className="script">offload</p>
          <p>{piece.script.narration || piece.note}</p>
          {piece.render.status === "ready" && piece.format === "still" ? (
            // The media route checks the same sign-in cookie, so the picture can sit on the card.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/desk/${piece.niche}/${piece.id}/media`} alt="" />
          ) : null}
          {piece.render.status === "ready" && piece.format !== "still" ? (
            <video src={`/desk/${piece.niche}/${piece.id}/media`} controls />
          ) : null}
        </div>

        {needsScript(piece) ? <p className="split">The desk is still writing this.</p> : null}

        <section className="stamps" aria-label="Approval">
          <p className={piece.stamps.includes(piece.lead) ? "stamp on" : "stamp"}>{personName(piece.lead)}</p>
          {piece.needsSecond ? (
            <p className={piece.stamps.includes(piece.lead === "hadiqa" ? "laiba" : "hadiqa") ? "stamp on" : "stamp"}>
              {personName(piece.lead === "hadiqa" ? "laiba" : "hadiqa")}
            </p>
          ) : null}
          {canStamp(piece, person.id) && piece.script.source === "claude" ? (
            <form action={stampPiece}>
              <input type="hidden" name="id" value={piece.id} />
              <PendingButton idle="Yes" pending="Saving" />
            </form>
          ) : null}
          {!ready && !canStamp(piece, person.id) && !needsScript(piece) ? (
            <p className="waiting">With {personName(waitingOn)}.</p>
          ) : null}
        </section>

        {ready ? (
          <section className="pack">
            <h2>Post it yourself</h2>
            <a className="pack-link" href={`/desk/${piece.niche}/${piece.id}/pack`}>
              Download the pack
            </a>
            {piece.render.status === "ready" ? (
              <a className="pack-link" href={`/desk/${piece.niche}/${piece.id}/media`}>
                Download the {piece.format === "still" ? "picture" : "video"}
              </a>
            ) : (
              <p className="split">The picture is still being made. The words can go out.</p>
            )}
            <dl className="captions">
              <div>
                <dt>TikTok</dt>
                <dd>{piece.captions.tiktok}</dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>{piece.captions.instagram}</dd>
              </div>
              <div>
                <dt>YouTube</dt>
                <dd>{piece.captions.youtube}</dd>
              </div>
              <div>
                <dt>Facebook</dt>
                <dd>{piece.captions.facebook}</dd>
              </div>
            </dl>
            <p className="first-comment">First comment: {piece.firstComment}</p>
            <form action={saveUrl}>
              <input type="hidden" name="id" value={piece.id} />
              <label>
                After you post, paste the link
                <input type="url" name="liveUrl" defaultValue={piece.liveUrl} placeholder="https://" required />
              </label>
              {query.url ? <p className="error">Paste the full http or https link.</p> : null}
              <PendingButton idle="Save the link" pending="Saving" />
            </form>
          </section>
        ) : null}
      </article>
    </DeskFrame>
  );
}
