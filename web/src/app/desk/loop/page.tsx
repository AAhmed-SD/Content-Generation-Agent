import Link from "next/link";
import { redirect } from "next/navigation";
import { importCsv, saveLoopLesson } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { loopPicture, type Bar, type Move } from "@/lib/loop";
import { WEEK } from "@/lib/pipeline";
import { readSession } from "@/lib/session";

const checks = ["Post", "1 hour", "24 hours", "72 hours", "7 days", "Monday note"];

export default async function LoopPage({ searchParams }: { searchParams: Promise<{ csv?: string }> }) {
  const person = await readSession();
  if (!person) redirect("/");
  const query = await searchParams;
  const picture = loopPicture();
  const csvError = csvMessage(query.csv);

  return (
    <DeskFrame person={person} current="loop">
      <p className="file-no">After posting · {WEEK}</p>
      <h2 className="page-title">What the posts did.</h2>
      <p className="split">
        This is the loop. Post by hand, paste the link, then bring the views back here. Virlo can send those numbers when its key is saved. Until then, fill the sheet from the apps and upload it.
      </p>

      <ol className="trail">
        {checks.map((check) => (
          <li key={check}>{check}</li>
        ))}
      </ol>

      <div className="phase-actions">
        <a className="pack-link" href="/desk/loop/template">
          Download the blank CSV
        </a>
        <form action={importCsv} className="stack-form">
          <label>
            Filled CSV
            <input type="file" name="file" accept=".csv,text/csv" required />
          </label>
          {csvError ? <p className="error">{csvError}</p> : null}
          <PendingButton idle="Bring in the CSV" pending="Reading" />
        </form>
      </div>

      {picture.views.length > 0 && picture.checkpoint ? (
        <section className="phase-block">
          <h3>Views by niche at {labelFor(picture.checkpoint)}</h3>
          <Bars bars={picture.views} />
          <p className="file-no">Source: {picture.source === "csv" ? "CSV" : "typed on the cards"} · {WEEK}</p>
        </section>
      ) : null}

      {picture.completion.length > 0 && picture.checkpoint ? (
        <section className="phase-block">
          <h3>Completion by niche at {labelFor(picture.checkpoint)}</h3>
          <Bars bars={picture.completion} unit="%" />
          <p className="file-no">Average, weighted by views when views are filled in · {WEEK}</p>
        </section>
      ) : null}

      {picture.moves.length > 0 ? (
        <section className="phase-block">
          <h3>Movement inside this file</h3>
          <p className="split">Completion from the first check to the latest check on the same post.</p>
          <Moves moves={picture.moves} />
        </section>
      ) : null}

      {picture.versus.length > 0 ? (
        <section className="phase-block">
          <h3>Change since the previous file</h3>
          <Moves moves={picture.versus} />
        </section>
      ) : null}

      {picture.rows.length > 0 ? (
        <section className="phase-block">
          <h3>Every row in this file</h3>
          <div className="metrics">
            <table>
              <thead>
                <tr>
                  <th>Piece</th>
                  <th>Channel</th>
                  <th>When</th>
                  <th>Views</th>
                  <th>Completion</th>
                  <th>Saves</th>
                </tr>
              </thead>
              <tbody>
                {picture.rows.map((row) => (
                  <tr key={`${row.pieceId}-${row.channel}-${row.checkpoint}`}>
                    <th scope="row">{row.pieceId}</th>
                    <td>{row.channel}</td>
                    <td>{row.checkpoint}</td>
                    <td>{row.views}</td>
                    <td>{row.completion}</td>
                    <td>{row.saves}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <p className="split">The charts appear when a row has a view count. Until then the trail above is the loop.</p>
      )}

      <section className="phase-block">
        <h3>Monday note</h3>
        <p className="split">One sentence on what to repeat. It stays with this week.</p>
        <form action={saveLoopLesson} className="stack-form">
          <label>
            What changed
            <textarea name="lesson" rows={3} defaultValue={picture.lesson} />
          </label>
          <PendingButton idle="Save the note" pending="Saving" />
        </form>
        <p>
          <Link href="/desk/brand/loop">How the loop is defined</Link>
        </p>
      </section>
    </DeskFrame>
  );
}

function Bars({ bars, unit = "" }: { bars: Bar[]; unit?: string }) {
  const max = Math.max(...bars.map((bar) => bar.value), 1);
  return (
    <div className="bars" aria-label="Chart">
      {bars.map((bar) => (
        <div key={bar.label} className="bar-row">
          <span>{bar.label}</span>
          <span className="bar">
            <i style={{ width: `${Math.max(4, (bar.value / max) * 100)}%` }} />
          </span>
          <span>
            {bar.display}
            {unit && !bar.display.endsWith("%") ? unit : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

function Moves({ moves }: { moves: Move[] }) {
  return (
    <ul className="moves">
      {moves.map((move) => (
        <li key={`${move.label}-${move.from}-${move.to}`}>
          <strong>{move.label}</strong>
          <span>
            {move.from} → {move.to}
          </span>
          <em className={move.delta.startsWith("-") ? "down" : "up"}>{move.delta}</em>
        </li>
      ))}
    </ul>
  );
}

function labelFor(checkpoint: string) {
  if (checkpoint === "1h") return "1 hour";
  if (checkpoint === "24h") return "24 hours";
  if (checkpoint === "72h") return "72 hours";
  return "7 days";
}

function csvMessage(code: string | undefined) {
  if (!code) return "";
  if (code === "empty") return "Choose a CSV first.";
  if (code === "big") return "That file is too large for the desk.";
  return code.slice(0, 240);
}
