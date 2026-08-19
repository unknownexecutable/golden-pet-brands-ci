import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, SITE_PASSWORD, computeSessionToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({ password: "" }));
  const password = typeof body?.password === "string" ? body.password : "";

  if (password !== SITE_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const token = await computeSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
  return res;
}
