"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { chatProposal } from "@/app/actions";
import type { Message } from "@/lib/proposals";

/** The thread for one proposal: ask a question or ask for a change; the desk answers and may rewrite the proposal. */
export function ProposalChat({ id, initial, me }: { id: string; initial: Message[]; me: string }) {
  const [messages, setMessages] = useState(initial);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const input = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const send = () => {
    const text = input.current?.value.trim() ?? "";
    if (!text || pending) return;
    setError("");
    const now = new Date().toISOString();
    setMessages((m) => [...m, { id: `local-${now}`, role: "person", author: me, text, revised: false, at: now }]);
    if (input.current) input.current.value = "";
    start(async () => {
      const out = await chatProposal(id, text);
      if (!out.ok) {
        setError(out.error);
        return;
      }
      setMessages((m) => [...m, { id: `desk-${Date.now()}`, role: "desk", author: "Desk", text: out.reply, revised: out.revised, at: new Date().toISOString() }]);
      if (out.revised) router.refresh();
    });
  };

  return (
    <div className="chat">
      {messages.length ? (
        <ol className="chat-thread" aria-live="polite">
          {messages.map((m) => (
            <li key={m.id} className={m.role === "desk" ? "is-desk" : "is-person"}>
              <span className="chat-who">{m.role === "desk" ? "Desk" : m.author}</span>
              <p>{m.text}</p>
              {m.revised ? <span className="chat-revised">Proposal updated</span> : null}
            </li>
          ))}
          {pending ? (
            <li className="is-desk is-thinking">
              <span className="chat-who">Desk</span>
              <p>Thinking…</p>
            </li>
          ) : null}
        </ol>
      ) : null}
      <div className="chat-input">
        <textarea
          ref={input}
          rows={2}
          placeholder="Ask about this video, or ask for a change: “make the hook sharper”, “try it as a jail episode”"
          aria-label="Message the desk about this proposal"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button type="button" onClick={send} disabled={pending}>
          {pending ? "Sending" : "Send"}
        </button>
      </div>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}
