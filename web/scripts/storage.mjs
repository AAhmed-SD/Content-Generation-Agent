// Films and slides in Supabase Storage (public bucket "renders"), so the hosted desk can play them and Blotato can
// fetch them. The Mac worker renders locally, then uploads here. Paths mirror remotion/out: "bank/offload-x.mp4",
// "carousels/<id>/01.png". Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (secret; web/.env.local and the host).
import fs from "node:fs";
import path from "node:path";

const TYPES = { ".mp4": "video/mp4", ".png": "image/png", ".jpg": "image/jpeg" };

export const storageReady = (get) => Boolean(get("SUPABASE_URL") && get("SUPABASE_SERVICE_ROLE_KEY"));
export const publicUrl = (base, key) => `${base.replace(/\/$/, "")}/storage/v1/object/public/renders/${key.split("/").map(encodeURIComponent).join("/")}`;

/** Upload one file (overwriting), and return its public URL. */
export async function store(get, file, key) {
  const base = get("SUPABASE_URL");
  const secret = get("SUPABASE_SERVICE_ROLE_KEY");
  if (!base || !secret) throw new Error("Storage is not set up: put SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in web/.env.local.");
  const type = TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  for (let i = 0; ; i++) {
    try {
      const res = await fetch(`${base.replace(/\/$/, "")}/storage/v1/object/renders/${key.split("/").map(encodeURIComponent).join("/")}`, {
        method: "POST",
        headers: { authorization: `Bearer ${secret}`, apikey: secret, "content-type": type, "x-upsert": "true", "cache-control": "max-age=300" },
        body: fs.readFileSync(file),
      });
      if (!res.ok) throw new Error(`Storage upload ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return publicUrl(base, key);
    } catch (e) {
      if (i >= 2) throw e;
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
}
