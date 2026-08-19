// Server-only. Never imported by a client component, so this string never
// reaches the browser bundle. Still: this repo is public on GitHub, so
// anyone who reads the source can see the fallback password below. For real
// protection, set SITE_PASSWORD as an environment variable in the Vercel
// project settings (not committed to git) — the fallback exists only so the
// gate works out of the box as requested.
export const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "iluvk9s";

const SALT = "gpb-ci-intro-gate-v1";
export const SESSION_COOKIE = "gpb_session";

// Cross-runtime (this runs in both the Node.js auth route and the Edge
// middleware) — Web Crypto's subtle.digest is available in both.
export async function computeSessionToken(): Promise<string> {
  const data = new TextEncoder().encode(`${SITE_PASSWORD}:${SALT}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
