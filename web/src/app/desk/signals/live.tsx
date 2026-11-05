"use client";

import { useEffect, useState } from "react";
import type { Outlier, Run } from "@/lib/signals";

const NICHES: Record<string, string> = { clinical: "Clinical", analytical: "Analytical", gcsealevel: "GCSE and A-level", mentalhealth: "Time", motion: "Motion" };

/** Polls the stream every 20 seconds and puts new outliers at the top. */
export function LiveSignals({ initial, initialRun }: { initial: Outlier[]; initialRun: Run | null }) {
  const [items, setItems] = useState(initial);
  const [run, setRun] = useState(initialRun);
  const [running, setRunning] = useState(false);
  const [niche, setNiche] = useState("all");

  useEffect(() => {
    const tick = async () => {
      const since = items[0]?.at;
      const res = await fetch(`/desk/signals/feed${since ? `?since=${encodeURIComponent(since)}` : ""}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { outliers: Outlier[]; lastRun: Run | null; running: boolean };
      if (data.outliers.length) setItems((old) => [...data.outliers.filter((o) => !old.some((x) => x.id === o.id)), ...old]);
      setRun(data.lastRun);
      setRunning(data.running);
    };
    const timer = setInterval(tick, 20000);
    return () => clearInterval(timer);
  }, [items]);

  const shown = niche === "all" ? items : items.filter((o) => o.niche === niche);
  return (
    <>
      <p className="file-no">
        {running ? "Collecting now…" : run ? `Last run ${new Date(run.at).toLocaleString("en-GB")} · ${run.accounts} accounts · ${run.outliers} new` : "No run yet"}
        {run?.failed.length ? ` · ${run.failed.length} failed` : ""}
      </p>
      <div className="phase-actions">
        {["all", ...Object.keys(NICHES)].map((n) => (
          <button key={n} type="button" className={niche === n ? "pack-link" : "quiet-link"} onClick={() => setNiche(n)}>
            {n === "all" ? "All" : NICHES[n]}
          </button>
        ))}
      </div>
      <ol className="signals">
        {shown.map((o) => (
          <li key={`${o.platform}:${o.id}`} className="phase-block">
            <p className="file-no">
              {NICHES[o.niche] ?? o.niche} · {o.platform === "youtube" ? "YouTube" : "TikTok"} · @{o.account} · {o.ratio}× usual ({o.views.toLocaleString("en-GB")} views)
            </p>
            <h3>{o.hook || o.title}</h3>
            {o.hook && o.title ? <p className="split">{o.title}</p> : null}
            <a href={o.url} target="_blank" rel="noreferrer">Open the video</a>
          </li>
        ))}
      </ol>
    </>
  );
}
