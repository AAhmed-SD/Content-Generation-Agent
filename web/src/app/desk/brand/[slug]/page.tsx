import { notFound, redirect } from "next/navigation";
import { saveBrandPage } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { Markdown } from "@/components/markdown";
import { BrandTabs } from "@/components/brand-tabs";
import { PendingButton } from "@/components/pending-button";
import { brandDoc, brandFileEditable, readBrandFile } from "@/lib/brand";
import { readSession } from "@/lib/session";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

const savedNote: Record<string, string> = {
  "1": "Saved. The next script reads this file.",
  empty: "Write something, or upload a markdown file.",
  type: "Upload a file that ends in .md.",
  big: "That file is too big.",
};

export default async function BrandDocPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const person = await readSession();
  if (!person) redirect("/");
  const { slug } = await params;
  const query = await searchParams;
  const doc = brandDoc(slug);
  if (!doc) notFound();
  const text = readBrandFile(doc.file);
  const editable = brandFileEditable(slug);
  const note =
    query.saved === "1" && (slug === "motion" || slug === "sound")
      ? "Saved."
      : (savedNote[query.saved ?? ""] ?? "");

  return (
    <DeskFrame person={person} current="brand" doc={slug}>
      {doc.group === "Niches" ? <p className="file-no">Account</p> : <BrandTabs current={slug} />}
      <Markdown text={text} />
      {editable ? (
        <details className="brand-edit-toggle" open={Boolean(note)}>
        <summary>Edit this file</summary>
        <form action={saveBrandPage} className="stack-form brand-edit">
          <input type="hidden" name="slug" value={slug} />
          <label>
            Markdown
            <textarea className="md-edit" name="markdown" rows={18} defaultValue={text} spellCheck={false} />
          </label>
          <label>
            Upload a markdown file
            <input type="file" name="file" accept=".md,text/markdown,text/plain" />
          </label>
          <p className="split">An uploaded file is what gets saved.</p>
          {note ? <p className={query.saved === "1" ? "split" : "error"}>{note}</p> : null}
          <PendingButton idle="Save" pending="Saving" />
        </form>
        </details>
      ) : null}
    </DeskFrame>
  );
}
