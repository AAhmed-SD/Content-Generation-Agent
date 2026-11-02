export const directory = [
  { id: "hadiqa", name: "Hadiqa Ahmed", title: "" },
  { id: "laiba", name: "Laiba Ahmed", title: "Marketing and operations lead" },
] as const;

export type PersonId = (typeof directory)[number]["id"];

export type Person = {
  id: PersonId;
  name: string;
  title: string;
  username: string;
};

export function isPersonId(value: string): value is PersonId {
  return directory.some((person) => person.id === value);
}

export function personName(id: PersonId) {
  return directory.find((person) => person.id === id)?.name ?? id;
}

export function publicPerson(id: PersonId): Person {
  const person = directory.find((item) => item.id === id)!;
  return { id: person.id, name: person.name, title: person.title, username: person.id };
}
