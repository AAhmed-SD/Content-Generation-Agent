import { redirect } from "next/navigation";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

/** Brand is one tabbed page; the first tab is the brand file. */
export default function BrandPage() {
  redirect("/desk/brand/brand");
}
