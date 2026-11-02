import { cookies } from "next/headers";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { isPersonId, publicPerson, type Person, type PersonId } from "@/lib/people";
import { openToken, seal } from "@/lib/token";

const passwords = {
  hadiqa: {
    salt: "ae84065804c24d63cee10575ffa11885",
    hash: "9075cf6ef3973658474fce66c300c3ea4c5678bc1b472916fe07b00d178b97c3",
  },
  laiba: {
    salt: "ac7d9aa7f51f0b6c29075fc8f06497fc",
    hash: "4d1bec5af6863c7548e30021b7181f4a1fa5a909afecbfb4a65f73999f123566",
  },
} as const;

export const COOKIE = "offload_desk";

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET is missing");
  return value;
}

export function passwordMatches(id: PersonId, password: string) {
  const person = passwords[id];
  const actual = scryptSync(password, person.salt, 32);
  const expected = Buffer.from(person.hash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function readSession(): Promise<Person | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const id = await openToken(secret(), token);
  if (!id || !isPersonId(id)) return null;
  return publicPerson(id);
}

export async function sessionCookieValue(id: PersonId) {
  return seal(secret(), id);
}
