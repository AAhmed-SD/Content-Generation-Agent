import type { PersonId } from "@/lib/people";
import type { Scene } from "@/lib/scene";

export type LiveEvent =
  | { kind: "scene"; revision: number; by: PersonId; savedAt: string; scene: Scene }
  | { kind: "vectra"; revision: number; by: PersonId; savedAt: string; label: string }
  | { kind: "present"; present: PersonId[] };

type Room = {
  revision: number;
  listeners: Set<(event: LiveEvent) => void>;
  present: Map<PersonId, number>;
};

const rooms = (() => {
  const host = globalThis as typeof globalThis & { __offloadLive?: Map<string, Room> };
  if (!host.__offloadLive) host.__offloadLive = new Map();
  return host.__offloadLive;
})();

function room(file: string) {
  let current = rooms.get(file);
  if (!current) {
    current = { revision: 0, listeners: new Set(), present: new Map() };
    rooms.set(file, current);
  }
  return current;
}

function present(current: Room): PersonId[] {
  return [...current.present.keys()];
}

function send(current: Room, event: LiveEvent) {
  for (const listener of current.listeners) listener(event);
}

export function noteRevision(file: string, revision: number) {
  const current = room(file);
  if (revision > current.revision) current.revision = revision;
}

export function publish(file: string, scene: Scene, by: PersonId) {
  const current = room(file);
  current.revision += 1;
  const event: LiveEvent = { kind: "scene", revision: current.revision, by, savedAt: new Date().toISOString(), scene };
  send(current, event);
  return event;
}

export function subscribe(file: string, person: PersonId, listener: (event: LiveEvent) => void) {
  const current = room(file);
  current.listeners.add(listener);
  current.present.set(person, (current.present.get(person) ?? 0) + 1);
  send(current, { kind: "present", present: present(current) });
  return () => {
    current.listeners.delete(listener);
    const count = (current.present.get(person) ?? 1) - 1;
    if (count <= 0) current.present.delete(person);
    else current.present.set(person, count);
    send(current, { kind: "present", present: present(current) });
  };
}

export function readers(file: string) {
  return present(room(file));
}

export function publishVectra(file: string, by: PersonId, label: string, revision: number) {
  const current = room(file);
  const event: LiveEvent = { kind: "vectra", revision, by, savedAt: new Date().toISOString(), label };
  send(current, event);
  return event;
}
