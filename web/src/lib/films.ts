import { db, ensureWorker, queueJob } from "@/lib/db";

/** Films made by the content agent, from accepted proposal to approved. Clinical and time need both people's stamps. */
export const NEEDS_TWO = new Set(["clinical", "mentalhealth"]);
export type Film = {
  id: string;
  niche: string;
  format: string;
  title: string;
  status: "accepted" | "drafted" | "voiced" | "rendered" | "approved";
  bankId: string | null;
  mediaUrl: string | null;
  lines: { id: string; say: string }[];
  stamps: string[];
  lastNote: string | null;
  jobError: string | null;
  updatedAt: string;
};

export async function listFilms(): Promise<Film[]> {
  const rows = await db()`
    select c.*, (select error from jobs j where j.kind = 'make-film' and j.payload->>'content_id' = c.id::text order by j.created_at desc limit 1) as job_error,
      (select status from jobs j where j.kind = 'make-film' and j.payload->>'content_id' = c.id::text order by j.created_at desc limit 1) as job_status
    from content c where c.kind = 'film' and c.status in ('accepted','drafted','voiced','rendered','approved')
    order by case c.status when 'rendered' then 0 when 'voiced' then 1 when 'drafted' then 1 when 'accepted' then 2 else 3 end, c.updated_at desc limit 80`;
  return rows.map((r) => ({
    id: r.id,
    niche: r.niche,
    format: r.format ?? "",
    title: r.title || r.theme || "Untitled",
    status: r.status,
    bankId: r.bank_id,
    mediaUrl: r.media_url,
    lines: ((r.script as { lines?: { id: string; say: string }[] } | null)?.lines ?? []).map((l) => ({ id: l.id, say: l.say })),
    stamps: r.stamps ?? [],
    lastNote: ((r.rejections as { reason: string }[]) ?? []).at(-1)?.reason ?? null,
    jobError: r.job_status === "failed" ? r.job_error : null,
    updatedAt: new Date(r.updated_at).toISOString(),
  }));
}

/** Stamp a film. It becomes approved once it has the stamps its account needs. */
export async function approveFilm(id: string, by: string) {
  const sql = db();
  const [row] = await sql`update content set stamps = array(select distinct unnest(array_append(stamps, ${by}))), updated_at = now() where id = ${id} returning niche, stamps`;
  if (!row) return;
  if ((row.stamps as string[]).length >= (NEEDS_TWO.has(row.niche) ? 2 : 1)) await sql`update content set status = 'approved' where id = ${id}`;
}

/** Send a film back to the agent with a note; it rewrites, re-voices and re-renders it. */
export async function remakeFilm(id: string, note: string, by: string) {
  const sql = db();
  await sql`update content set status = 'accepted', stamps = '{}', updated_at = now(),
    rejections = rejections || ${sql.json([{ by, reason: note.slice(0, 400), at: new Date().toISOString() }])} where id = ${id}`;
  await queueJob("make-film", { content_id: id, note });
  await ensureWorker();
}

/** Try again after a failed make. */
export async function retryFilm(id: string) {
  await queueJob("make-film", { content_id: id });
  await ensureWorker();
}
