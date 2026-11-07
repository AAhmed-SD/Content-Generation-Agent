import { db, ensureWorker, queueJob } from "@/lib/db";

/** Films made by the content agent, from accepted proposal to approved. Hadiqa and Laiba are both admins: one approval is enough (decided 2026-11-07). */
export const NEEDS_TWO = new Set<string>();
export type Film = {
  id: string;
  niche: string;
  format: string;
  title: string;
  hook: string | null;
  status: "accepted" | "drafted" | "voiced" | "rendered" | "approved" | "held";
  bankId: string | null;
  mediaUrl: string | null;
  lines: { id: string; say: string }[];
  stamps: string[];
  lastNote: string | null;
  jobError: string | null;
  updatedAt: string;
  truth: string | null;
  shape: string | null;
  captions: Record<string, string> | null;
  /** film or carousel; a carousel has its slide images instead of a video */
  kind: "film" | "carousel";
  slides: string[];
  review: { total: number; verdict: string; cold: { about: string; do: string; offload: string }; fixes: string[]; pass: number } | null;
};

export async function listFilms(): Promise<Film[]> {
  const rows = await db()`
    select c.*, (select text from truths t where t.id = c.truth_id) as truth_text, (select name from shapes s where s.id = c.shape) as shape_name, (select error from jobs j where j.kind = 'make-film' and j.payload->>'content_id' = c.id::text order by j.created_at desc limit 1) as job_error,
      (select status from jobs j where j.kind = 'make-film' and j.payload->>'content_id' = c.id::text order by j.created_at desc limit 1) as job_status
    from content c where c.kind in ('film', 'carousel') and c.status in ('accepted','drafted','voiced','rendered','approved','held')
    order by case c.status when 'held' then 0 when 'rendered' then 0 when 'voiced' then 1 when 'drafted' then 1 when 'accepted' then 2 else 3 end, c.updated_at desc limit 80`;
  return rows.map((r) => ({
    id: r.id,
    niche: r.niche,
    format: r.format ?? "",
    title: r.title || r.theme || "Untitled",
    hook: r.hook ?? null,
    status: r.status,
    bankId: r.bank_id,
    mediaUrl: r.media_url,
    lines: ((r.script as { lines?: { id: string; say: string }[] } | null)?.lines ?? []).map((l) => ({ id: l.id, say: l.say })),
    stamps: r.stamps ?? [],
    lastNote: ((r.rejections as { reason: string }[]) ?? []).at(-1)?.reason ?? null,
    jobError: r.job_status === "failed" ? r.job_error : null,
    updatedAt: new Date(r.updated_at).toISOString(),
    truth: r.truth_text ?? null,
    captions: r.captions ?? null,
    kind: r.kind === "carousel" ? "carousel" : "film",
    slides: ((r.spec as { files?: string[] } | null)?.files ?? []) as string[],
    shape: r.shape_name ?? null,
    review: r.review ?? null,
  }));
}

/** Stamp a film. It becomes approved once it has the stamps its account needs. */
export async function approveFilm(id: string, by: string) {
  const sql = db();
  const [row] = await sql`update content set stamps = array(select distinct unnest(array_append(stamps, ${by}))), updated_at = now() where id = ${id} returning niche, stamps`;
  if (!row) return;
  if ((row.stamps as string[]).length >= (NEEDS_TWO.has(row.niche) ? 2 : 1)) {
    await sql`update content set status = 'approved' where id = ${id}`;
    // approve, then it posts: every linked account of this niche, at its next best slot (films 3 a day, 4 hours apart)
    const { autoSchedule } = await import("@/lib/posting");
    await autoSchedule(id).catch((e) => console.error("auto-schedule", (e as Error).message));
  }
}

/** Send a film back to the agent with a note; it rewrites, re-voices and re-renders it. */
export async function remakeFilm(id: string, note: string, by: string) {
  const sql = db();
  await sql`update content set status = 'accepted', stamps = '{}', updated_at = now(),
    rejections = rejections || ${sql.json([{ by, reason: note.slice(0, 400), at: new Date().toISOString() }])} where id = ${id}`;
  await queueJob("make-film", { content_id: id, note });
  await ensureWorker();
}

/** A held film, rendered as it is (no more writing, so no more Claude spend). */
export async function renderHeld(id: string) {
  const sql = db();
  const [r] = await sql`update content set status = 'accepted', updated_at = now() where id = ${id} and status = 'held' returning id`;
  if (!r) return;
  await queueJob("make-film", { content_id: id, render: true });
  await ensureWorker();
}

/** Try again after a failed make. */
export async function retryFilm(id: string) {
  await queueJob("make-film", { content_id: id });
  await ensureWorker();
}
