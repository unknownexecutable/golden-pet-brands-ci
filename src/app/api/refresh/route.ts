import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { sources } from "@/lib/data/sources";

// Real, live server-side re-check of every "Brand Website" source. No
// fabricated results: each source is actually fetched right now, its HTTP
// status is reported as-is, and a content hash is compared against the last
// check (persisted to a cache file) to flag real drift. This is the Tier 0
// layer of the monitoring pipeline described in the Sources page — it does
// NOT re-derive structured facts (that needs an LLM call, which requires an
// API key this environment doesn't have configured; see the Sources page
// for that explanation).
//
// Cache location: serverless platforms (Vercel included) mount the deployed
// project directory read-only and only allow writes to the OS temp dir, so
// the cache lives under os.tmpdir(). That also means the cache is best-effort
// and can reset between deployments or cold-starts on serverless — real
// drift detection at scale belongs in a durable store (e.g. a small
// Postgres/KV table), which is a documented Next step, not faked here.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// The 12 target sites are fetched in parallel (see POST below) specifically
// to stay well under serverless function time limits, but a few slow/blocked
// hosts can still push the total close to the default 10s. Raise the cap
// explicitly — safe on Hobby/Pro, capped by the platform if unsupported.
export const maxDuration = 30;

const CACHE_PATH = path.join(os.tmpdir(), "golden-pet-ci-source-health.json");

interface HealthRecord {
  hash: string;
  checkedAt: string;
  httpStatus: number;
}

function loadCache(): Record<string, HealthRecord> {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function saveCache(data: Record<string, HealthRecord>) {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(data, null, 2));
}

export interface RefreshResult {
  id: string;
  competitorId: string;
  url: string;
  ok: boolean;
  httpStatus: number;
  bytes?: number;
  changedSincePrevious: boolean | null;
  previousCheckedAt: string | null;
  checkedAt: string;
  error?: string;
}

async function checkOne(s: (typeof sources)[number], cache: Record<string, HealthRecord>): Promise<RefreshResult> {
  const checkedAt = new Date().toISOString();
  try {
    const res = await fetch(s.url, {
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GoldenPetBrandsCI/1.0; +internal-monitoring)" }
    });
    const text = await res.text();
    const hash = crypto.createHash("sha256").update(text).digest("hex").slice(0, 16);
    const prev = cache[s.id];
    cache[s.id] = { hash, checkedAt, httpStatus: res.status };
    return {
      id: s.id,
      competitorId: s.competitorId,
      url: s.url,
      ok: res.ok,
      httpStatus: res.status,
      bytes: text.length,
      changedSincePrevious: prev ? prev.hash !== hash : null,
      previousCheckedAt: prev?.checkedAt ?? null,
      checkedAt
    };
  } catch (e) {
    return {
      id: s.id,
      competitorId: s.competitorId,
      url: s.url,
      ok: false,
      httpStatus: 0,
      changedSincePrevious: null,
      previousCheckedAt: cache[s.id]?.checkedAt ?? null,
      checkedAt,
      error: e instanceof Error ? e.message : String(e)
    };
  }
}

export async function POST() {
  const targets = sources.filter((s) => s.type === "Brand Website");
  const cache = loadCache();

  // Fetched in parallel — sequentially, 12 sites x an 8s timeout could take
  // up to 96s and blow past serverless function limits; in parallel the
  // whole batch takes roughly as long as the single slowest site.
  const results = await Promise.all(targets.map((s) => checkOne(s, cache)));

  // Best-effort: a cache-write failure shouldn't turn a successful batch of
  // live checks into a 500 for the user.
  try {
    saveCache(cache);
  } catch {
    // swallow — drift detection just resets on the next check
  }

  return NextResponse.json({ checkedAt: new Date().toISOString(), results });
}

export async function GET() {
  return NextResponse.json({ cache: loadCache() });
}
