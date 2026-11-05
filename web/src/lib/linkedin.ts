import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/** LinkedIn posts: web/research/linkedin.json. Drafted from brand/linkedin.md, approved, copied into LinkedIn. */
const file = path.join(process.cwd(), "research", "linkedin.json");
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

export function readPosts(): { note: string; posts: Post[] } {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return { note: "", posts: [] };
  }
}
function write(data: { note: string; posts: Post[] }) {
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}
export function setStatus(id: string, status: Status) {
  const data = readPosts();
  const p = data.posts.find((x) => x.id === id);
  if (p) p.status = status;
  write(data);
}
export function removePost(id: string) {
  const data = readPosts();
  data.posts = data.posts.filter((x) => x.id !== id);
  write(data);
}
export function savePost(id: string, text: string) {
  const data = readPosts();
  const p = data.posts.find((x) => x.id === id);
  if (p) p.text = text;
  write(data);
}

const read = (f: string) => {
  try {
    return readFileSync(path.join(brand, f), "utf8");
  } catch {
    return "";
  }
};

/** Ask Claude for two new posts per account, in the voices in brand/linkedin.md. */
export async function draftPosts(by: string) {
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  if (!key) throw new Error("ANTHROPIC_API_KEY is empty.");
  const existing = readPosts().posts.slice(0, 12).map((p) => `[${p.account}] ${p.text.split("\n")[0]}`).join("\n");
  const prompt = [
    "Write six LinkedIn posts: two for each account (founder, outreach, brand), following the voices and rules below exactly.",
    "Use only product claims from the product facts. No price. No invented numbers, stories, quotes or names.",
    "Do not repeat these recent openings:\n" + existing,
    "Reply with only a JSON array of objects: {\"account\": \"founder\" | \"outreach\" | \"brand\", \"text\": \"the post\"}.",
    "--- brand/linkedin.md ---\n" + read("linkedin.md"),
    "--- brand/safety.md ---\n" + read("safety.md"),
    "--- brand/product-facts.md ---\n" + read("product-facts.md").slice(0, 30000),
  ].join("\n\n");
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL?.trim() || "claude-opus-5-5",
      max_tokens: 6000,
      thinking: { type: "adaptive" },
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const json = (await response.json()) as { error?: { message?: string }; content?: { type?: string; text?: string }[] };
  if (!response.ok) throw new Error(json.error?.message || `Claude returned ${response.status}.`);
  const text = (json.content ?? []).filter((b) => b.type === "text").map((b) => b.text ?? "").join("");
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error("Claude did not return posts.");
  const items = JSON.parse(match[0]) as { account: string; text: string }[];
  const data = readPosts();
  let n = Math.max(0, ...data.posts.map((p) => Number(p.id.slice(1)) || 0));
  const today = new Date().toISOString().slice(0, 10);
  const fresh = items
    .filter((i) => ACCOUNTS.some((a) => a.id === i.account) && typeof i.text === "string" && i.text.trim())
    .map((i) => ({ id: `p${++n}`, account: i.account as AccountId, text: i.text.trim(), status: "draft" as const, by, at: today }));
  data.posts = [...fresh, ...data.posts];
  write(data);
  return fresh.length;
}
