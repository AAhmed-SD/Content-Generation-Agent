import { accountTable, NICHE_LABEL, PLATFORM_LABEL, PLATFORMS, postTable } from "@/lib/funnel";
import { readSession } from "@/lib/session";

/** The bottom-of-funnel table as CSV: one row per account per platform. */
export async function GET(request: Request) {
  if (!(await readSession())) return new Response("Sign in", { status: 401 });
  const params = new URL(request.url).searchParams;
  const days = Number(params.get("days")) || 30;
  const niche = params.get("niche") || undefined;
  const platform = (PLATFORMS as readonly string[]).includes(params.get("platform") ?? "") ? params.get("platform")! : undefined;
  const esc = (v: unknown) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  if (params.get("view") === "post") {
    const posts = await postTable({ days, niche, platform, sort: "posted" });
    const head = ["post", "account", "platform", "kind", "format", "opener", "posted_at", "checkpoint", "views", "likes", "comments", "shares", "saves", "follows", "reach", "engagement_pct", "url"];
    const body = posts.map((p) => [p.title, p.platform === "linkedin" ? p.kind : NICHE_LABEL[p.niche], PLATFORM_LABEL[p.platform], p.kind, p.format ?? "", p.opener ?? "", p.postedAt ?? "", p.checkpoint ?? "", p.views, p.likes, p.comments, p.shares, p.saves, p.follows, p.reach, p.engagement, p.url ?? ""].map(esc).join(","));
    return new Response([head.join(","), ...body].join("\n") + "\n", {
      headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="offload-posts-${days}d.csv"` },
    });
  }
  const rows = await accountTable({ days, niche, platform });
  const head = ["account", "platform", "kind", "posts", "views", "likes", "comments", "shares", "saves", "reach", "follows", "last_posted"];
  const body = rows.map((r) => [r.platform === "linkedin" ? r.kind : NICHE_LABEL[r.niche], PLATFORM_LABEL[r.platform], r.kind, r.posts, r.views, r.likes, r.comments, r.shares, r.saves, r.reach, r.follows, r.lastPosted ?? ""].map(esc).join(","));
  return new Response([head.join(","), ...body].join("\n") + "\n", {
    headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="offload-numbers-${days}d.csv"` },
  });
}
