import { redirect } from "next/navigation";
import { AutoRefresh } from "@/components/auto-refresh";
import { DeskFrame } from "@/components/desk-frame";
import { FilmQueue } from "@/components/film-queue";
import { listFilms } from "@/lib/films";
import { blotatoReady, linkedAccounts, postingPlan, postsFor } from "@/lib/posting";
import { PostingPlan } from "@/components/posting-plan";
import { readSession } from "@/lib/session";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

export default async function DeskPage({ searchParams }: { searchParams: Promise<{ post_error?: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const q = await searchParams;
  const films = await listFilms();
  const approvedIds = films.filter((f) => f.status === "approved").map((f) => f.id);
  const [linked, posts, plan] = await Promise.all([linkedAccounts(), postsFor(approvedIds), postingPlan(2)]);

  return (
    <DeskFrame person={person} current="yes">
      <p className="file-no">4 · Approval</p>
      <h2 className="page-title">Approve it, then post.</h2>
      <p className="split">Watch each film or carousel, then approve it, send it back with a note, or reject it. One approval is enough: approving schedules it on every linked platform at the account's next best slot (films: 3 a day, 4 hours apart; carousels: one a day on Instagram, TikTok and Facebook).</p>
      {/* while anything is out at Blotato, re-read the page every minute so the status stays current */}
      {posts.some((p) => ["planned", "publishing", "scheduled"].includes(p.status)) ? <AutoRefresh seconds={60} /> : null}
      {q.post_error ? <p className="error">Not posted: {q.post_error}</p> : null}
      <PostingPlan plan={plan} />
      <FilmQueue films={films} me={person.name} linked={linked} posts={posts} blotato={blotatoReady()} />
    </DeskFrame>
  );
}
