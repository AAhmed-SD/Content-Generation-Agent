import Link from "next/link";
import { redirect } from "next/navigation";
import { DeskFrame } from "@/components/desk-frame";
import { brandDocs, listBriefs } from "@/lib/brand";
import { readSession } from "@/lib/session";

export default async function BrandPage() {
  const person = await readSession();
  if (!person) redirect("/");
  const groups = ["System", "Niches", "Content", "Generated", "This week"] as const;
  const docs = [...brandDocs, ...listBriefs()];

  return (
    <DeskFrame person={person} current="brand">
      <p className="file-no">Brand files</p>
      <h2 className="page-title">The identity the engine repeats.</h2>
      <p className="split">
        These pages are the markdown in the brand folder. The prompt on every card is built from the niche file and
        the piece file, plus that week’s brief.
      </p>
      {groups.filter((group) => docs.some((doc) => doc.group === group)).map((group) => (
        <section key={group} className="phase-block">
          <h3>{group}</h3>
          <ul className="library">
            {docs
              .filter((doc) => doc.group === group)
              .map((doc) => (
                <li key={doc.slug}>
                  <Link href={`/desk/brand/${doc.slug}`}>{doc.title}</Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </DeskFrame>
  );
}
