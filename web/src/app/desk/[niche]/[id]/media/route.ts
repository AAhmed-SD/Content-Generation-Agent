import { readFileSync } from "node:fs";
import { findPiece, readDesk } from "@/lib/desk";
import { readSession } from "@/lib/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ niche: string; id: string }> },
) {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const { id } = await params;
  const piece = findPiece(readDesk(), id);
  if (!piece || piece.render.status !== "ready" || !piece.render.file) {
    return new Response("This has not been rendered.", { status: 404 });
  }
  const bytes = readFileSync(piece.render.file);
  const still = piece.format === "still";
  return new Response(bytes, {
    headers: {
      "Content-Type": still ? "image/png" : "video/mp4",
      "Content-Disposition": `inline; filename="${piece.id}.${still ? "png" : "mp4"}"`,
    },
  });
}
