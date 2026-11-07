import { cookies } from "next/headers";
import { isPersonId, type Person, type PersonId } from "@/lib/people";
import { findUser } from "@/lib/users";
import { openToken, seal } from "@/lib/token";

export const COOKIE = "offload_desk";

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET is missing");
  return value;
}

export async function readSession(): Promise<Person | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const id = await openToken(secret(), token);
  if (!id || !isPersonId(id)) return null;
  return findUser(id); // a removed account is signed out on its next page
}

export async function sessionCookieValue(id: PersonId) {
  return seal(secret(), id);
}
