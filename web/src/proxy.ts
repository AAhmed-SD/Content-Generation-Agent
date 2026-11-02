import { NextResponse, type NextRequest } from "next/server";
import { isPersonId } from "@/lib/people";
import { openToken } from "@/lib/token";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("offload_desk")?.value;
  const secret = process.env.AUTH_SECRET ?? "";
  const id = token && secret ? await openToken(secret, token) : null;
  const signedIn = Boolean(id && isPersonId(id));
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/desk") && !signedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname === "/" && signedIn) {
    return NextResponse.redirect(new URL("/desk", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/desk/:path*"],
};
