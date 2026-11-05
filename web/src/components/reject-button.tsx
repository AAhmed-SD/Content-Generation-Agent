"use client";

import { useRef, useTransition, type ReactNode } from "react";
import { rejectAction } from "@/app/actions";

/** Fade and fold the card away at once, then run the action. The page refreshes behind it without a jump. */
export function LeaveForm({ action, fields, children, className }: { action: (fd: FormData) => Promise<void>; fields: Record<string, string>; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLFormElement>(null);
  const [, start] = useTransition();
  return (
    <form
      ref={ref}
      className={className}
      action={(fd) => {
        const card = ref.current?.closest<HTMLElement>(".lib-card");
        if (card) {
          card.style.height = `${card.offsetHeight}px`;
          card.classList.add("is-leaving");
          window.setTimeout(() => card.classList.add("is-gone"), 320);
        }
        start(() => action(fd));
      }}
    >
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      {children}
    </form>
  );
}

/** Reject a film, still, template, pulled piece or inspiration item. */
export function RejectButton({ kind, value, name, label = "Reject" }: { kind: "film" | "still" | "format" | "pulled" | "inspiration"; value: string; name?: string; label?: string }) {
  return (
    <LeaveForm action={rejectAction} fields={{ kind, value, ...(name ? { name } : {}) }}>
      <button type="submit" className="reject-button">
        {label}
      </button>
    </LeaveForm>
  );
}
