import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { DeskFrame } from "@/components/desk-frame";
import { Markdown } from "@/components/markdown";
import { brandDoc, readBrandFile } from "@/lib/brand";
import { readSession } from "@/lib/session";

export default async function BrandDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const { slug } = await params;
  const doc = brandDoc(slug);
  if (!doc) notFound();

  return (
    <DeskFrame person={person} current="brand">
      <p className="file-no">
        <Link href="/desk/brand">Brand</Link> · {doc.group}
      </p>
      <Markdown text={readBrandFile(doc.file)} />
    </DeskFrame>
  );
}
