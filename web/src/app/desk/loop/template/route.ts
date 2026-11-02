import { readDesk } from "@/lib/desk";
import { WEEK } from "@/lib/pipeline";
import { readSession } from "@/lib/session";

const checkpoints = ["1h", "24h", "72h", "7d"];

export async function GET() {
  const person = await readSession();
  if (!person) return new Response("Sign in first.", { status: 401 });
  const lines = ["week,piece_id,channel,checkpoint,views,completion,shares,comments,saves,live_url"];
  for (const piece of readDesk()) {
    for (const checkpoint of checkpoints) {
      lines.push(`${WEEK},${piece.id},all,${checkpoint},,,,,${piece.liveUrl}`);
    }
  }
  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="offload-${WEEK}.csv"`,
    },
  });
}
