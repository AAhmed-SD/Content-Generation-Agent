import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import type { Person } from "@/lib/people";

/** Desk accounts: scrypt passwords in marketing.desk_users. Admins add people and reset passwords. */

const hashOf = (password: string, salt: string) => scryptSync(password, salt, 32).toString("hex");
const toPerson = (r: Record<string, unknown>): Person => ({
  id: r.username as string,
  username: r.username as string,
  name: r.name as string,
  title: (r.title as string) ?? "",
  role: r.role as Person["role"],
  mustChange: Boolean(r.must_change),
});

export async function findUser(username: string): Promise<Person | null> {
  const [r] = await db()`select * from desk_users where username = ${username} and active`;
  return r ? toPerson(r) : null;
}

export async function checkPassword(username: string, password: string): Promise<Person | null> {
  const [r] = await db()`select * from desk_users where username = ${username.trim().toLowerCase()} and active`;
  if (!r) {
    hashOf(password, "0000000000000000"); // same work either way, so a wrong name and a wrong password look alike
    return null;
  }
  const actual = Buffer.from(hashOf(password, r.salt), "hex");
  const expected = Buffer.from(r.hash, "hex");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  await db()`update desk_users set last_seen = now() where username = ${r.username}`;
  return toPerson(r);
}

export const passwordProblem = (p: string) => (p.length < 10 ? "Use at least 10 characters." : null);

export async function setPassword(username: string, password: string, mustChange = false) {
  const salt = randomBytes(16).toString("hex");
  await db()`update desk_users set salt = ${salt}, hash = ${hashOf(password, salt)}, must_change = ${mustChange} where username = ${username}`;
}

/** A readable one-time password, shown once to the admin. */
export const tempPassword = () => `Desk-${randomBytes(6).toString("base64url")}`;

export async function listUsers() {
  const rows = await db()`select username, name, title, role, active, must_change, last_seen, created_at from desk_users order by active desc, role, name`;
  return rows.map((r) => ({ ...toPerson(r), active: Boolean(r.active), lastSeen: r.last_seen ? new Date(r.last_seen).toISOString() : null }));
}

export async function addUser(input: { username: string; name: string; title: string; role: "admin" | "member" }) {
  const temp = tempPassword();
  const salt = randomBytes(16).toString("hex");
  await db()`insert into desk_users (username, name, title, role, salt, hash, must_change)
    values (${input.username}, ${input.name}, ${input.title}, ${input.role}, ${salt}, ${hashOf(temp, salt)}, true)`;
  return temp;
}

export async function setActive(username: string, active: boolean) {
  // never leave the desk without an admin
  if (!active) {
    const [{ n }] = await db()`select count(*)::int as n from desk_users where role = 'admin' and active and username <> ${username}`;
    const [u] = await db()`select role from desk_users where username = ${username}`;
    if (u?.role === "admin" && n === 0) throw new Error("The desk needs at least one active admin.");
  }
  await db()`update desk_users set active = ${active} where username = ${username}`;
}
