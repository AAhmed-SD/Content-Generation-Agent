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
        src: `/board/${encodeURIComponent(name)}`,
        name: name.replace(/\.[^.]+$/, "").replaceAll("-", " "),
      }));
  } catch {
    return [];
  }
}

const layouts = [
  { src: "/pins/calendar.jpg", name: "Circled day", who: "Time and ADHD", line: "One day circled. A new sentence each time." },
  { src: "/pins/folder.jpg", name: "Confidential folder", who: "Medicine, dentistry, nursing, radiology", line: "Kraft folder, one sentence, red stamp." },
  { src: "/pins/drawer.jpg", name: "The drawer", who: "Any account", line: "One card pulled forward." },
  { src: "/pins/calculator.jpg", name: "The calculator", who: "Maths, economics, computer science", line: "The sentence, then the note on the screen." },
  { src: "/pins/file.jpg", name: "The file", who: "GCSE and A-level", line: "A folder with three rows." },
  { src: "/pins/type.jpg", name: "Big type", who: "Any account", line: "The sentence, large. Offload in blue once." },
];

export default async function LayoutsPage() {
  const person = await readSession();
  if (!person) redirect("/");
  const added = boardPins();

  return (
    <DeskFrame person={person} current="layouts">
      <p className="file-no">Layouts</p>
      <h2 className="page-title">The picture stays. The sentence changes.</h2>
      <p className="split">
        These six are already Offload. A pin saved into web/public/board shows below as a reference. It becomes a layout when the same setup is photographed again with an Offload sentence.
      </p>
      <ul className="layout-grid">
        {layouts.map((layout) => (
          <li key={layout.src}>
            <img src={layout.src} alt="" />
            <strong>{layout.name}</strong>
            <em>{layout.who}</em>
            <span>{layout.line}</span>
          </li>
        ))}
      </ul>
      {added.length > 0 ? (
        <>
          <h3 className="audience-title">Added from the board</h3>
          <ul className="layout-grid">
            {added.map((pin) => (
              <li key={pin.src}>
                <img src={pin.src} alt="" />
                <strong>{pin.name}</strong>
                <em>Reference. Not an Offload layout yet.</em>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="split">No new pins in web/public/board yet.</p>
      )}
    </DeskFrame>
  );
}
