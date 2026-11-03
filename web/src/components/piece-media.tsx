import type { Piece } from "@/lib/desk";

export function PieceMedia({ piece }: { piece: Piece }) {
  if (piece.render.status !== "ready") return null;
  const src = `/desk/${piece.niche}/${piece.id}/media`;
  if (piece.format === "still") {
    return <img className="piece-thumb" src={src} alt="" />;
  }
  return <video className="piece-thumb" src={src} controls preload="metadata" />;
}
