/**
 * People on the desk. Accounts live in marketing.desk_users (see src/lib/users.ts); Hadiqa and Laiba are admins.
 * `directory` is only a fallback for display names in older parts of the desk.
 */
export const directory = [
  { id: "hadiqa", name: "Hadiqa Ahmed", title: "" },
  { id: "laiba", name: "Laiba Ahmed", title: "Marketing and operations lead" },
] as const;

export type PersonId = string;

export type Person = {
  id: PersonId;
  name: string;
  title: string;
  username: string;
  role: "admin" | "member";
  mustChange: boolean;
};

/** A well-formed username. Whether the account exists and is active is checked against the database. */
export function isPersonId(value: string): value is PersonId {
  return /^[a-z0-9._-]{2,40}$/.test(value);
}

export function personName(id: PersonId) {
  return directory.find((person) => person.id === id)?.name ?? id;
}
