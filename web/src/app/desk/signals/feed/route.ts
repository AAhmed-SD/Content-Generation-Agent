import { NextResponse } from "next/server";
import { isRunning, lastRun, outliers } from "@/lib/signals";
import { readSession } from "@/lib/session";

/** New outliers since ?since=, for the live list on /desk/signals. */
export async function GET(request: Request) {
  if (!(await readSession())) return NextResponse.json({ error: "Sign in" }, { status: 401 });
  const since = new URL(request.url).searchParams.get("since") ?? undefined;
  return NextResponse.json({ outliers: outliers(since), lastRun: lastRun() ?? null, running: isRunning() });
}
