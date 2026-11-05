import { readFileSync } from "node:fs";
import { claudeJson } from "@/lib/claude-stream";
import { db } from "@/lib/db";
import path from "node:path";

/** LinkedIn posts in Supabase (marketing.linkedin_posts). Drafted from brand/linkedin.md, approved, copied into LinkedIn. */
const brand = path.join(process.cwd(), "..", "brand");

export const ACCOUNTS = [
  { id: "founder", label: "Founder", who: "Hadiqa Ahmed" },
  { id: "outreach", label: "Outreach officer", who: "Outreach" },
  { id: "brand", label: "Offload", who: "Company page" },
] as const;
export type AccountId = (typeof ACCOUNTS)[number]["id"];
export const STATUS = ["draft", "approved", "posted"] as const;
export type Status = (typeof STATUS)[number];
export type Post = { id: string; account: AccountId; text: string; status: Status; by: string; at: string };

export async function readPosts(): Promise<{ note: string; posts: Post[] }> {
  const rows = await db()`select id, account, text, status, coalesce(by, '') as by, coalesce(to_char(at, 'YYYY-MM-DD'), '') as at from linkedin_posts order by at desc nulls last, id desc`;
  return { note: "", posts: rows.map((r) => ({ id: r.id, account: r.account, text: r.text, status: r.status, by: r.by, at: r.at })) };
}
export async function setStatus(id: string, status: Status) {
  await db()`update linkedin_posts set status = ${status}, posted_at = ${status === "posted" ? new Date() : null} where id = ${id}`;
}
export async function removePost(id: string) {
  await db()`delete from linkedin_posts where id = ${id}`;
}
export async function savePost(id: string, text: string) {
  await db()`update linkedin_posts set text = ${text} where id = ${id}`;
}

const read = (f: string) => {
  try {
    return readFileSync(path.join(brand, f), "utf8");
  } catch {
    return "";
  }
};

/** Ask Claude (the lighter model, brand rules cached) for two new posts per account, in the voices in brand/linkedin.md. */
export async function draftPosts(by: string) {
  const existing = (await readPosts()).posts.slice(0, 12).map((p) => `[${p.account}] ${p.text.split("\n")[0]}`).join("\n");
  const stable = [
    "You write LinkedIn posts for Offload, a UK study app, in the voices and rules below. Use only product claims from the product facts. No price. No invented numbers, stories, quotes or names.",
    "--- brand/linkedin.md ---\n" + read("linkedin.md"),
    "--- brand/safety.md ---\n" + read("safety.md"),
    "--- brand/product-facts.md ---\n" + read("product-facts.md").slice(0, 24000),
  ].join("\n\n");
  const out = await claudeJson<{ posts: { account: string; text: string }[] }>({
    task: "linkedin",
    tier: "light",
    stable,
    cacheTtl: "1h",
    system: "Write the requested posts.",
    messages: [{ role: "user", content: `Write six LinkedIn posts: two for each account (founder, outreach, brand).\n\nDo not repeat these recent openings:\n${existing}` }],
    schema: {
      type: "object",
      properties: { posts: { type: "array", items: { type: "object", properties: { account: { type: "string", enum: ["founder", "outreach", "brand"] }, text: { type: "string" } }, required: ["account", "text"], additionalProperties: false } } },
      required: ["posts"],
      additionalProperties: false,
    },
    maxTokens: 8000,
  });
  const items = out.posts ?? [];
  const today = new Date().toISOString().slice(0, 10);
  const fresh = items
    .filter((i) => ACCOUNTS.some((a) => a.id === i.account) && typeof i.text === "string" && i.text.trim())
    .map((i, k) => ({ id: `p${Date.now().toString(36)}${k}`, account: i.account as AccountId, text: i.text.trim(), status: "draft" as const, by, at: today }));
  const sql = db();
  for (const p of fresh) await sql`insert into linkedin_posts (id, account, text, status, by, at) values (${p.id}, ${p.account}, ${p.text}, 'draft', ${p.by}, ${p.at})`;
  return fresh.length;
}
