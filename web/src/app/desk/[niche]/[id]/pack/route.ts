import { findPiece, isReady, readDesk } from "@/lib/desk";
import { readSession } from "@/lib/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ niche: string; id: string }> },
) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const { id } = await params;
  const piece = findPiece(readDesk(), id);
  if (!piece) return new Response("Missing piece.", { status: 404 });
  if (!isReady(piece)) return new Response("This pack is still closed.", { status: 409 });

  const body = [
    `post id: ${piece.id}`,
    `slot: ${piece.slot}`,
    `file: render/${piece.id}.mp4 — Remotion has not rendered this yet`,
    piece.researchNote ? `research: ${piece.researchNote}` : "research: none",
    "",
    "tiktok",
    piece.captions.tiktok,
    "",
    "instagram",
    piece.captions.instagram,
    "",
    "youtube",
    piece.captions.youtube,
    "",
    "facebook",
    piece.captions.facebook,
    "",
    "first comment",
    piece.firstComment,
    "",
    "after you post, paste the live URL back on the piece",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${piece.id}.txt"`,
    },
  });
}
