import { redirect } from "next/navigation";
import { DeskFrame } from "@/components/desk-frame";
import { Studio } from "@/components/studio";
import { boardPath } from "@/lib/picture-text";
import { readSession } from "@/lib/session";

export default async function EditorFilePage({ params }: { params: Promise<{ file: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const file = decodeURIComponent((await params).file);
  if (!boardPath(file)) redirect("/desk/layouts");
  const title = file.replace(/\.[^.]+$/, "").replaceAll("-", " ");

  return (
    <DeskFrame person={person} current="editor">
      <Studio file={file} title={title} person={person.id} />
    </DeskFrame>
  );
}
