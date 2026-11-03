import type { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/app/actions";
import type { Person } from "@/lib/people";

export type DeskStep = "week" | "layouts" | "editor" | "loop" | "brand";

const groups = [
  {
    label: "The week",
    links: [
      { href: "/desk", step: "week", label: "This week" },
      { href: "/desk/layouts", step: "layouts", label: "Layouts" },
      { href: "/desk/editor", step: "editor", label: "Editor", sub: true },
    ],
  },
  {
    label: "After posting",
    links: [{ href: "/desk/loop", step: "loop", label: "Numbers" }],
  },
  {
    label: "Reference",
    links: [{ href: "/desk/brand", step: "brand", label: "Brand" }],
  },
] as const;

export function DeskFrame({
  person,
  current,
  children,
}: {
  person: Person;
  current?: DeskStep;
  children: ReactNode;
}) {
  return (
    <div className="sheet desk-shell">
      <aside className="side">
        <p className="wordmark">
          offload <span>desk</span>
        </p>
        <nav aria-label="Desk">
          {groups.map((group) => (
            <div key={group.label} className="side-group">
              <p className="side-label">{group.label}</p>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} className={"sub" in link && link.sub ? "sub" : undefined} aria-current={current === link.step ? "page" : undefined}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="who">
          <p>
            <strong>{person.name.split(" ")[0]}</strong>
          </p>
          <form action={signOut}>
            <button type="submit" className="text-button">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="desk-main">{children}</div>
    </div>
  );
}
