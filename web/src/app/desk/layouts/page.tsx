import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";
import { importLayout } from "@/app/actions";
import { PinEditor } from "@/components/pin-editor";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { niches } from "@/lib/desk";
import { listPins, pinCaptions, readPin } from "@/lib/pin-draft";
import { pinLayouts } from "@/lib/pin-picture";
import { editPath } from "@/lib/picture-text";
import { readSession } from "@/lib/session";

function boardPins() {
  const dir = path.join(process.cwd(), "public", "board");
  try {
    return readdirSync(dir)
      .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
      .sort()
      .map((name) => ({
        file: name,
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
  { src: "/pins/key.jpg", name: "The key", who: "Any account", line: "One key. The sentence is on the tag." },
  { src: "/pins/card.jpg", name: "The index card", who: "Any account", line: "One card. The sentence on the first line." },
  { src: "/pins/withheld.jpg", name: "Withheld", who: "Any account", line: "Black ground. The sentence, then stop." },
];

export default async function LayoutsPage({ searchParams }: { searchParams: Promise<{ made?: string; import?: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const query = await searchParams;
  const made = /^pin-\d+$/.test(query.made ?? "") ? query.made ?? "" : "";
  const draft = made ? readPin(made) : null;
  const added = boardPins();
  const saved = listPins();
  const problem = importMessage(query.import);

  return (
    <DeskFrame person={person} current="layouts">
      <p className="file-no">Layouts</p>
      <h2 className="page-title">The board, in one place.</h2>
      <p className="split">Every download sits here together. This is the look. Edit opens that picture on its own page.</p>
      {added.length > 0 ? (
        <ul className="vision-wall">
          {added.map((pin) => (
            <li key={pin.file} className="vision-card">
              <a href={`/desk/editor/${encodeURIComponent(pin.file)}`}>
                <img src={pin.src} alt="" />
              </a>
              <a className="edit-link" href={`/desk/editor/${encodeURIComponent(pin.file)}`}>
                {existsSync(editPath(pin.file).replace(/\.jpg$/, ".scene.json")) ? "Edited" : "Edit"}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="split">No new pins in web/public/board yet. Save a picture there and it opens in the editor.</p>
      )}
      <form action={importLayout} className="stack-form">
        <label>
          Reference
          <input type="file" name="reference" accept="image/png,image/jpeg,image/webp" required />
        </label>
        <label>
          Sentence
          <input type="text" name="line" maxLength={90} placeholder="One sentence" required />
        </label>
        <label>
          Note
          <input type="text" name="note" maxLength={60} placeholder="The short fact" />
        </label>
        <label>
          Account
          <select name="niche" defaultValue="clinical">
            {niches.map((niche) => (
              <option key={niche.id} value={niche.id}>
                {niche.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Layout
          <select name="layout" defaultValue="type">
            {pinLayouts.map((layout) => (
              <option key={layout.id} value={layout.id}>
                {layout.name}
              </option>
            ))}
          </select>
        </label>
        {problem ? <p className="error">{problem}</p> : null}
        <PendingButton idle="Make the Offload version" pending="Making" />
      </form>
      {draft ? <PinEditor key={draft.id} draft={draft} captions={pinCaptions(draft)} /> : null}
      {saved.length > 0 ? (
        <section className="phase-block">
          <h3>Saved</h3>
          <ul className="saved-pins">
            {saved.map((pin) => (
              <li key={pin.id}>
                <a href={`/desk/layouts?made=${pin.id}`}>{pin.line}</a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
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
    </DeskFrame>
  );
}

function importMessage(code: string | undefined) {
  if (code === "empty") return "Choose a reference picture.";
  if (code === "big") return "That picture is over 6 MB.";
  if (code === "type") return "Use a PNG, JPEG, or WebP.";
  if (code === "text") return "The sentence is missing.";
  if (code === "layout") return "Pick a layout.";
  if (code === "account") return "Pick an account.";
  if (code === "draw") return "The Offload version could not be drawn. The reference is on the board.";
  return "";
}
