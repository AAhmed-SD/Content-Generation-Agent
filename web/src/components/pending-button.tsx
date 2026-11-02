"use client";

import { useFormStatus } from "react-dom";

export function PendingButton({ idle, pending }: { idle: string; pending: string }) {
  const status = useFormStatus();
  return (
    <button type="submit" disabled={status.pending}>
      {status.pending ? pending : idle}
    </button>
  );
}
