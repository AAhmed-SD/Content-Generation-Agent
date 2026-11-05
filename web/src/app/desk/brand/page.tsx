import { redirect } from "next/navigation";

/** Brand is one tabbed page; the first tab is the brand file. */
export default function BrandPage() {
  redirect("/desk/brand/brand");
}
