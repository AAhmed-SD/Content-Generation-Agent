import { readdirSync } from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";
import { DeskFrame } from "@/components/desk-frame";
import { readSession } from "@/lib/session";

function boardPins() {
  const dir = path.join(process.cwd(), "public", "board");
  try {
    return readdirSync(dir)
      .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
      .sort()
      .map((name) => ({
        file: name,
        name: name.replace(/\.[^.]+$/, "").replaceAll("-", " "),
      }));
  } catch {
    return [];
  }
}

export default async function EditorPage({ searchParams }: { searchParams: Promise<{ open?: string | string[] }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const query = await searchParams;
  const asked = (Array.isArray(query.open) ? query.open : (query.open ?? "").split(",")).map((name) => name.trim()).filter(Boolean);
  const pins = boardPins();
  const open = asked.flatMap((name) => pins.filter((pin) => pin.file === name));
  if (open.length === 1) redirect(`/desk/edit/${encodeURIComponent(open[0].file)}`);

  return (
    <DeskFrame person={person} current="editor">
      <p className="file-no">Editor</p>
      <h2 className="page-title">Open a download on its own page.</h2>
      <p className="split">The board lives under Layouts. Edit opens the picture as its own page: shapes, text, and pasted images are layers on top of it.</p>
      <ul className="layout-grid">
        {pins.map((pin) => (
          <li key={pin.file}>
            <a href={`/desk/edit/${encodeURIComponent(pin.file)}`} target="_blank" rel="noopener">
              <img src={`/board/${encodeURIComponent(pin.file)}`} alt="" />
              <strong>{pin.name}</strong>
            </a>
          </li>
        ))}
      </ul>
    </DeskFrame>
  );
}
