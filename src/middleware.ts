import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, computeSessionToken } from "@/lib/auth";

// Gates every page and API route except the intro/login page itself, the
// auth endpoint, and static assets. Not hardened security (no rate
// limiting, no lockout) — a soft access gate for an internal preview, as
// requested.
export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const expected = await computeSessionToken();
  if (token === expected) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/intro";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|intro|api/auth|gpb-logo.svg).*)"]
};
