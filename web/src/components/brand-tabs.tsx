import Link from "next/link";
import { brandDocs, listBriefs } from "@/lib/brand";

const ORDER = ["System", "Content", "Picture", "Generated", "This week"] as const;

/** The Brand page's tabs. Accounts (the niche files) live in their own sidebar section, not here. */
export function BrandTabs({ current }: { current: string }) {
  const docs = [...brandDocs, ...listBriefs()].filter((d) => d.group !== "Niches");
  return (
    <nav className="brand-tabs" aria-label="Brand files">
      {ORDER.map((group) => {
        const list = docs.filter((d) => d.group === group);
        if (!list.length) return null;
        return (
          <div key={group} className="brand-tab-group" role="group" aria-label={group}>
            {list.map((d) => (
              <Link key={d.slug} href={`/desk/brand/${d.slug}`} aria-current={d.slug === current ? "page" : undefined}>
                {d.title}
              </Link>
            ))}
          </div>
        );
      })}
    </nav>
  );
}
