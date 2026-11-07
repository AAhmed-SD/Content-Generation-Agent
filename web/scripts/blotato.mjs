// Blotato's REST API (https://backend.blotato.com/v2), shared by the desk (linking accounts) and the
// Mac worker (uploading films, posting, status and numbers). The key is BLOTATO_API_KEY in
// web/.env.local (and the host's env when the desk is hosted). It never leaves the server.
//
// Shapes are from help.blotato.com (read 2026-11-06): accounts, media uploads, posts, post status, analytics.
import fs from "node:fs";

const BASE = "https://backend.blotato.com/v2";

/** @param {() => string | undefined} key */
export function blotato(key) {
  async function call(method, route, body, tries = 3) {
    const k = key();
    if (!k) throw new Error("Blotato is not connected: set BLOTATO_API_KEY in web/.env.local.");
    for (let n = 1; ; n++) {
      const res = await fetch(BASE + route, {
        method,
        headers: { "blotato-api-key": k, ...(body ? { "content-type": "application/json" } : {}) },
        body: body ? JSON.stringify(body) : undefined,
      });
      const text = await res.text();
      let json = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {}
      if (res.ok) return json;
      // 429 says how long to wait ("retry in 49 seconds"); 5xx gets a short bounded retry
      if ((res.status === 429 || res.status >= 500) && n < tries) {
        const wait = Number(String(json?.message ?? "").match(/retry in (\d+)/)?.[1] ?? 5 * n);
        await new Promise((r) => setTimeout(r, Math.min(wait, 70) * 1000));
        continue;
      }
      const why = json?.message ?? (text.slice(0, 300) || res.statusText);
      if (res.status === 401) throw new Error("Blotato rejected the API key (401). Check BLOTATO_API_KEY, including any trailing '='.");
      if (res.status === 403) throw new Error(`Blotato says the plan does not allow this (403): ${why}`);
      throw new Error(`Blotato ${method} ${route} failed (${res.status}): ${typeof why === "string" ? why : JSON.stringify(why)}`);
    }
  }

  return {
    me: () => call("GET", "/users/me"),
    /** @returns {Promise<{id:string, platform:string, fullname:string, username:string}[]>} */
    accounts: async (platform) => (await call("GET", `/users/me/accounts${platform ? `?platform=${platform}` : ""}`))?.items ?? [],
    /** Facebook Pages, LinkedIn company pages, YouTube playlists. */
    subaccounts: async (accountId) => (await call("GET", `/users/me/accounts/${accountId}/subaccounts`))?.items ?? [],

    /** Upload a local file (an mp4) and return the public URL Blotato can post from. */
    async upload(file) {
      const name = file.split("/").pop();
      const { presignedUrl, publicUrl } = await call("POST", "/media/uploads", { filename: name });
      const mime = name.endsWith(".mp4") ? "video/mp4" : name.endsWith(".png") ? "image/png" : name.endsWith(".jpg") ? "image/jpeg" : "application/octet-stream";
      const put = await fetch(presignedUrl, { method: "PUT", headers: { "content-type": mime }, body: fs.readFileSync(file) });
      if (!put.ok) throw new Error(`Uploading ${name} to Blotato failed (${put.status}): ${(await put.text()).slice(0, 200)}`);
      return publicUrl;
    },

    /** One post to one account. scheduledTime is ISO 8601 with Z, or omitted to post now. */
    post: (post, scheduledTime) => call("POST", "/posts", { post, ...(scheduledTime ? { scheduledTime } : {}) }, 2),
    /** { status: in-progress | scheduled | published | failed, publicUrl?, errorMessage?, scheduledTime? } */
    status: (submissionId) => call("GET", `/posts/${submissionId}`),
    /** Published posts with their latest metrics. */
    /** Every post Blotato holds, with its real state ("scheduled", "published", ...) and public URL. */
    posts: async () => {
      const out = [];
      for (let page = 0; page < 10; page++) {
        const r = await call("GET", `/posts?limit=100&offset=${out.length}`);
        const items = r?.items ?? [];
        const fresh = items.filter((x) => !out.some((y) => y.id === x.id));
        out.push(...fresh);
        if (items.length < 100 || !fresh.length) break;
      }
      return out;
    },
    analytics: async ({ since, platform, limit = 100 } = {}) => {
      const q = new URLSearchParams({ limit: String(limit), ...(since ? { since } : {}), ...(platform ? { platform } : {}) });
      return (await call("GET", `/analytics?${q}`))?.items ?? [];
    },
  };
}

/** The target block per platform, for a short vertical film. `test` keeps it private. */
export function target(platform, { title, pageId, test }) {
  if (platform === "tiktok")
    return { targetType: "tiktok", privacyLevel: test ? "SELF_ONLY" : "PUBLIC_TO_EVERYONE", disabledComments: false, disabledDuet: false, disabledStitch: false, isBrandedContent: false, isYourBrand: false, isAiGenerated: false }; // no AI or promotional label (decided 2026-11-07)
  if (platform === "instagram") return { targetType: "instagram", mediaType: "reel", shareToFeed: true };
  if (platform === "facebook") {
    if (!pageId) throw new Error("This Facebook account has no Page linked. Link the Page on the Accounts page.");
    return { targetType: "facebook", pageId, mediaType: "reel" };
  }
  if (platform === "youtube")
    return { targetType: "youtube", title: title.slice(0, 100), privacyStatus: test ? "private" : "public", shouldNotifySubscribers: !test, isMadeForKids: false, containsSyntheticMedia: false };
  throw new Error(`Films do not post to ${platform}.`);
}

/** Metric snapshot from Blotato's camelCase strings. */
export function metricsOf(m) {
  const n = (v) => (v === undefined || v === null || v === "" ? null : Number(v));
  return { views: n(m?.viewsCount), likes: n(m?.likesCount), comments: n(m?.commentsCount), shares: n(m?.sharesCount), saves: n(m?.savesCount), reach: n(m?.reachCount) };
}
