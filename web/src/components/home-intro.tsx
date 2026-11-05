"use client";

import { useEffect, useRef, useState } from "react";

/** The opening: the end card's dot and splash, once per visit, then it lifts away. Skipped for reduced motion. */
export function HomeIntro() {
  const [state, setState] = useState<"off" | "on" | "leaving">("off");
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("desk.intro") === "seen") return;
    sessionStorage.setItem("desk.intro", "seen");
    setState("on");
  }, []);
  const leave = () => {
    setState("leaving");
    window.setTimeout(() => setState("off"), 650);
  };
  if (state === "off") return null;
  return (
    <div className={state === "leaving" ? "home-intro is-leaving" : "home-intro"} onClick={leave} role="presentation">
      <video ref={video} src="/intro/offload-intro.mp4" autoPlay muted playsInline onEnded={leave} onError={leave} />
      <button type="button" className="home-intro-skip" onClick={leave}>
        Skip
      </button>
    </div>
  );
}
