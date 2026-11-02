import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
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
  const file = path.join(process.cwd(), "data", "renders", `${id}.wav`);
  if (!piece || !existsSync(file)) return new Response("This card has no voice yet.", { status: 404 });
  return new Response(readFileSync(file), {
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": `attachment; filename="${piece.id}.wav"`,
    },
  });
}
