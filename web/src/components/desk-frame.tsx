"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/app/actions";
import type { Person } from "@/lib/people";

export type DeskStep =
  | "home"
  | "research"
  | "scripts"
  | "yes"
  | "posts"
  | "numbers"
  | "layouts"
  | "editor"
  | "brand"
  | "week"
  | "loop"
  | "signals"
  | "library"
  | "inspiration"
  | "ideas"
  | "linkedin";

type NavLink = { href: string; key: string; label: string; n?: number };
type Section = { id: string; label: string; links: NavLink[] };

const sections: Section[] = [
  {
    id: "loop",
    label: "Content generation loop",
    links: [
      { href: "/desk/signals", key: "signals", label: "Signals", n: 1 },
      { href: "/desk/research", key: "research", label: "Research", n: 2 },
      { href: "/desk/scripts", key: "scripts", label: "Scripts", n: 3 },
      { href: "/desk", key: "yes", label: "Approval", n: 4 },
      { href: "/desk/posts", key: "posts", label: "Posts", n: 5 },
      { href: "/desk/loop", key: "numbers", label: "Numbers", n: 6 },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    links: [{ href: "/desk/brand", key: "brand", label: "Brand files" }],
  },
  {
    id: "make",
    label: "Make",
    links: [
      { href: "/desk/library", key: "library", label: "Library" },
      { href: "/desk/layouts", key: "layouts", label: "Layouts" },
      { href: "/desk/inspiration", key: "inspiration", label: "Inspiration" },
      { href: "/desk/ideas", key: "ideas", label: "Ideas" },
      { href: "/desk/linkedin", key: "linkedin", label: "LinkedIn" },
    ],
  },
  {
    id: "accounts",
    label: "Accounts",
    links: [
      { href: "/desk/brand/clinical", key: "clinical", label: "offload.clinical" },
      { href: "/desk/brand/analytical", key: "analytical", label: "offload.analytical" },
      { href: "/desk/brand/mentalhealth", key: "mentalhealth", label: "offload.mentalhealth" },
      { href: "/desk/brand/gcsealevel", key: "gcsealevel", label: "offload.gcsealevel" },
    ],
  },
];

const ACCOUNTS = new Set(["clinical", "analytical", "mentalhealth", "gcsealevel"]);

const Chevron = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ transform: `rotate(${open ? 90 : 0}deg)`, transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
    <path d="M4 2.5 7.5 6 4 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PanelIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <rect x="2" y="3" width="14" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d={open ? "M7 3v12" : "M5.5 3v12"} stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/** Remembered on this browser: whether the sidebar is open, and which sections are folded. */
function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {}
  }, [key]);
  const set = (next: T) => {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  };
  return [value, set] as const;
}

export function DeskFrame({
  current,
  doc,
  children,
}: {
  person: Person;
  current?: DeskStep;
  doc?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useStored("desk.side.open", true);
  const [folded, setFolded] = useStored<string[]>("desk.side.folded", []);
  const active = (link: NavLink) => (ACCOUNTS.has(link.key) ? doc === link.key : link.key === current || (link.key === "brand" && current === "brand" && !ACCOUNTS.has(doc ?? "")));

  return (
    <div className={open ? "sheet desk-shell" : "sheet desk-shell is-shut"}>
      <aside className="side">
        <div className="side-top">
          <Link href="/desk/home" className="wordmark side-mark" aria-label="Offload Marketing desk, home">
            {open ? (
              <>
                offload <span>marketing desk</span>
              </>
            ) : (
              "o"
            )}
          </Link>
          <button type="button" className="side-fold" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Hide the sidebar" : "Show the sidebar"} title={open ? "Hide the sidebar" : "Show the sidebar"}>
            <PanelIcon open={open} />
          </button>
        </div>
        {open ? (
          <nav className="side-nav" aria-label="Desk">
            <Link href="/desk/home" className="side-home" aria-current={current === "home" ? "page" : undefined}>
              Home
            </Link>
            {sections.map((section) => {
              const isOpen = !folded.includes(section.id);
              return (
                <div key={section.id} className="side-section">
                  <button
                    type="button"
                    className="side-section-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`side-${section.id}`}
                    onClick={() => setFolded(isOpen ? [...folded, section.id] : folded.filter((id) => id !== section.id))}
                  >
                    <Chevron open={isOpen} />
                    {section.label}
                  </button>
                  <div id={`side-${section.id}`} className="side-section-body" data-open={isOpen}>
                    <div>
                      {section.links.map((link) => (
                        <Link key={link.href} href={link.href} aria-current={active(link) ? "page" : undefined}>
                          {link.n ? <span className="side-n">{link.n}</span> : null}
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        ) : null}
        <div className="who">
          <form action={signOut}>
            <button type="submit" className="text-button">
              {open ? "Sign out" : "Out"}
            </button>
          </form>
        </div>
      </aside>
      <div className="desk-main">{children}</div>
    </div>
  );
}
