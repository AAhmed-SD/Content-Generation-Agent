import { canStamp, isReady, needsScript, niches, type Piece } from "@/lib/desk";
import { personName, type PersonId } from "@/lib/people";

export type PieceStatus = {
  label: string;
  waiting: boolean;
};

export function pieceStatus(piece: Piece, person: PersonId): PieceStatus {
  if (needsScript(piece) || piece.render.status === "rendering") {
    return { label: "Being made", waiting: true };
  }
  if (canStamp(piece, person) && piece.script.source === "claude") {
    return { label: "Needs your yes", waiting: false };
  }
  if (!isReady(piece)) {
    const other = piece.lead === "hadiqa" ? "laiba" : "hadiqa";
    const waitingOn = piece.stamps.length === 0 ? piece.lead : piece.stamps.includes(person) ? other : piece.lead;
    return { label: `With ${personName(waitingOn)}`, waiting: true };
  }
  if (!piece.liveUrl) return { label: "Ready to post", waiting: false };
  return { label: "Posted", waiting: true };
}

export function nextPiece(pieces: Piece[], person: PersonId) {
  const order = new Map(niches.map((niche, index) => [niche.id, index]));
  return [...pieces]
    .sort((a, b) => (order.get(a.niche) ?? 0) - (order.get(b.niche) ?? 0) || a.slot.localeCompare(b.slot))
    .find((piece) => {
      const status = pieceStatus(piece, person);
      return !status.waiting && status.label !== "Filed";
    });
}
