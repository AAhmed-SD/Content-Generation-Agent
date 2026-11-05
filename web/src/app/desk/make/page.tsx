import { redirect } from "next/navigation";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

export default function MakePage() {
  redirect("/desk");
}
