import { redirect } from "next/navigation";
import { findPiece, readDesk } from "@/lib/desk";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

export default async function StudioPiecePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const piece = findPiece(readDesk(), id);
  if (!piece) redirect("/desk");
  redirect(`/desk/${piece.niche}/${piece.id}`);
}
