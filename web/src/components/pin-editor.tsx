"use client";

import { useEffect, useRef, useState } from "react";
import { niches, type NicheId } from "@/lib/accounts";
import { pinLayouts, type PinLayoutId } from "@/lib/pin-layouts";

type Draft = {
  id: string;
  layout: PinLayoutId;
  line: string;
  note: string;
  niche: NicheId;
  savedAt: string;
};

type Captions = {
  tiktok: string;
  instagram: string;
  youtube: string;
  facebook: string;
  firstComment: string;
};

const emptyCaptions: Captions = { tiktok: "", instagram: "", youtube: "", facebook: "", firstComment: "" };

export function PinEditor({
  draft,
  captions,
  reference,
  start,
}: {
  draft?: Draft | null;
  captions?: Captions;
  reference?: { file: string; src: string };
  start?: { layout: PinLayoutId; niche: NicheId };
}) {
  const [line, setLine] = useState(draft?.line ?? "");
  const [note, setNote] = useState(draft?.note ?? "");
  const [layout, setLayout] = useState(draft?.layout ?? start?.layout ?? "type");
  const [niche, setNiche] = useState(draft?.niche ?? start?.niche ?? "clinical");
  const [copy, setCopy] = useState(captions ?? emptyCaptions);
  const [status, setStatus] = useState(draft ? "Saved" : "Type the sentence.");
  const [stamp, setStamp] = useState(draft?.savedAt ?? "");
  const [pinId, setPinId] = useState(draft?.id ?? "");
  const saved = useRef({
    line: draft?.line ?? "",
    note: draft?.note ?? "",
    layout: draft?.layout ?? start?.layout ?? "type",
    niche: draft?.niche ?? start?.niche ?? "clinical",
  });
  const idRef = useRef(draft?.id ?? "");

  useEffect(() => {
    const current = { line, note, layout, niche };
    const same =
      current.line === saved.current.line &&
      current.note === saved.current.note &&
      current.layout === saved.current.layout &&
      current.niche === saved.current.niche;
    if (same) return;
    if (!line.trim()) {
      setStatus("The sentence is missing.");
      return;
    }
    const handle = setTimeout(async () => {
      setStatus("Saving");
      const response = await fetch("/desk/layouts/made", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: idRef.current, reference: reference?.file, ...current }),
      });
      if (!response.ok) {
        setStatus("Not saved.");
        return;
      }
      const body = (await response.json()) as { id: string; captions: Captions; savedAt: string };
      idRef.current = body.id;
      saved.current = current;
      setPinId(body.id);
      setCopy(body.captions);
      setStamp(body.savedAt);
      setStatus("Saved");
    }, 500);
    return () => clearTimeout(handle);
  }, [line, note, layout, niche, reference?.file]);

  return (
    <section className="phase-block">
      <h3>{reference ? reference.file.replace(/\.[^.]+$/, "").replaceAll("-", " ") : "Editor"}</h3>
      <p className="split">The sentence, the note, the layout, and the account save on their own. Download is the picture and the captions, ready to post.</p>
      <div className="editor">
        <form className="stack-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Sentence
            <input value={line} maxLength={90} onChange={(event) => setLine(event.target.value)} />
          </label>
          <label>
            Note
            <input value={note} maxLength={60} onChange={(event) => setNote(event.target.value)} />
          </label>
          <label>
            Layout
            <select value={layout} onChange={(event) => setLayout(event.target.value as PinLayoutId)}>
              {pinLayouts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Account
            <select value={niche} onChange={(event) => setNiche(event.target.value as NicheId)}>
              {niches.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <p className="save-state">{status}</p>
          <a className={status === "Saved" && pinId ? "pack-link" : "pack-link waiting-link"} href={`/desk/layouts/made?id=${pinId}&download=1`}>
            Download the pack
          </a>
        </form>
        <div>
          {reference ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="made-pin" src={reference.src} alt="" />
          ) : null}
          {pinId && stamp && !reference ? (
            // The made route checks the sign-in cookie. The stamp reloads the picture after a save.
            // eslint-disable-next-line @next/next/no-img-element
            <img className="made-pin" src={`/desk/layouts/made?id=${pinId}&v=${encodeURIComponent(stamp)}`} alt="" />
          ) : null}
        </div>
      </div>
      <dl className="captions">
        <div>
          <dt>TikTok</dt>
          <dd>{copy.tiktok}</dd>
        </div>
        <div>
          <dt>Instagram</dt>
          <dd>{copy.instagram}</dd>
        </div>
        <div>
          <dt>YouTube</dt>
          <dd>{copy.youtube}</dd>
        </div>
        <div>
          <dt>Facebook</dt>
          <dd>{copy.facebook}</dd>
        </div>
      </dl>
      <p className="first-comment">First comment: {copy.firstComment}</p>
    </section>
  );
}
