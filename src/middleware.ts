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
  // api/refresh is excluded too: Vercel Cron calls it once a day with no
  // session cookie (it has its own optional CRON_SECRET check instead),
  // and it doesn't expose or change anything sensitive — worst case a
  // stranger triggers a redundant fetch of public competitor websites.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|intro|api/auth|api/refresh|gpb-logo.svg).*)"]
};
