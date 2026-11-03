"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/app/actions";
import type { Person } from "@/lib/people";

export type DeskStep = "research" | "scripts" | "yes" | "posts" | "numbers" | "layouts" | "editor" | "brand" | "week" | "loop";

const steps = [
  { href: "/desk/research", step: "research", label: "Research" },
  { href: "/desk/scripts", step: "scripts", label: "Scripts" },
  { href: "/desk", step: "yes", label: "Approval" },
  { href: "/desk/posts", step: "posts", label: "Posts" },
  { href: "/desk/loop", step: "numbers", label: "Numbers" },
] as const;

const files = [
  {
    label: "Brand",
    links: [
      { href: "/desk/brand/brand", slug: "brand", label: "Brand" },
      { href: "/desk/brand/product-facts", slug: "product-facts", label: "Product facts" },
      { href: "/desk/layouts", slug: "layouts", label: "Layouts" },
      { href: "/desk/brand/motion", slug: "motion", label: "Motion" },
      { href: "/desk/brand/sound", slug: "sound", label: "Sound" },
      { href: "/desk/brand/hook", slug: "hook", label: "Hook" },
      { href: "/desk/brand/payoff", slug: "payoff", label: "Payoff" },
      { href: "/desk/brand/still", slug: "still", label: "Still" },
      { href: "/desk/brand/carousel", slug: "carousel", label: "Carousel" },
    ],
  },
  {
    label: "Accounts",
    links: [
      { href: "/desk/brand/clinical", slug: "clinical", label: "offload.clinical" },
      { href: "/desk/brand/analytical", slug: "analytical", label: "offload.analytical" },
      { href: "/desk/brand/mentalhealth", slug: "mentalhealth", label: "offload.mentalhealth" },
      { href: "/desk/brand/gcsealevel", slug: "gcsealevel", label: "offload.gcsealevel" },
    ],
  },
] as const;

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
  const [open, setOpen] = useState(true);
  return (
    <div className={open ? "sheet desk-shell" : "sheet desk-shell is-shut"}>
      <aside className="side">
        <p className="wordmark">
          {open ? (
            <>
              offload <span>desk</span>
            </>
          ) : (
            "o"
          )}
        </p>
        <button type="button" className="text-button side-fold" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
          {open ? "Hide" : "Show"}
        </button>
        {open ? (
          <nav aria-label="The week">
            <ol className="side-sequence">
              {steps.map((link, index) => (
                <li key={link.href}>
                  <Link href={link.href} aria-current={current === link.step ? "page" : undefined}>
                    <span>{index + 1}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {open ? (
          <div className="side-person">
            <nav className="side-files" aria-label="Brand files">
              {files.map((group) => (
                <div key={group.label}>
                  <p className="side-label">{group.label}</p>
                  {group.links.map((link) => (
                    <Link
                      key={link.slug}
                      href={link.href}
                      className="sub"
                      aria-current={doc === link.slug || (link.slug === "layouts" && current === "layouts") ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
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
