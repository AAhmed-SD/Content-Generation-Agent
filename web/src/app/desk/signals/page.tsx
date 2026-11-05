import { redirect } from "next/navigation";
import { collectSignals } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { lastRun, outliers } from "@/lib/signals";
import { readSession } from "@/lib/session";
import { LiveSignals } from "./live";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

export default async function SignalsPage() {
  const person = await readSession();
  if (!person) redirect("/");
  return (
    <DeskFrame person={person} current="signals">
      <p className="file-no">Research · the stream</p>
      <h2 className="page-title">What is working out there.</h2>
      <p className="split">
        Videos on the watch list doing three times or more their account&apos;s usual views, with the first words spoken. Study the shape of the hook. Never copy the words. The list lives in web/research/watchlist.json.
      </p>
      <form action={collectSignals} className="phase-actions">
        <PendingButton idle="Collect now" pending="Starting" />
      </form>
      <LiveSignals initial={(await outliers())} initialRun={(await lastRun()) ?? null} />
    </DeskFrame>
  );
}
