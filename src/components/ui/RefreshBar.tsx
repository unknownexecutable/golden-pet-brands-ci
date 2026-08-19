"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { RefreshResult } from "@/app/api/refresh/route";
import { getCompetitor } from "@/lib/data/competitors";

const LAST_CHECK_KEY = "gpb-ci-last-refresh";

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.round(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function RefreshBar() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RefreshResult[] | null>(null);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(LAST_CHECK_KEY);
    if (stored) setCheckedAt(stored);
  }, []);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/refresh", { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResults(data.results);
      setCheckedAt(data.checkedAt);
      window.localStorage.setItem(LAST_CHECK_KEY, data.checkedAt);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Refresh failed");
    } finally {
      setLoading(false);
    }
  }

  const reachable = results?.filter((r) => r.ok).length;
  const changed = results?.filter((r) => r.changedSincePrevious).length;

  return (
    <div className="card p-5 border-2 border-ink-900/10 bg-gradient-to-br from-brass-50/60 to-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="kicker">Live data</p>
          <h2 className="text-lg mt-0.5">Refresh every connected source, right now</h2>
          <p className="text-sm text-ink-500 mt-1 max-w-xl">
            Re-fetches all 12 tracked competitor websites live and flags real content drift since the last check.{" "}
            {checkedAt && !results ? `Last checked ${timeAgo(checkedAt)}.` : ""} This checks connectivity and drift — it doesn't
            auto-rewrite the analysis below (that's a deliberate human/AI-reviewed step; see{" "}
            <Link href="/sources" className="underline hover:text-brass-700">
              Sources
            </Link>
            ).
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="rounded-full bg-ink-900 text-white px-6 py-3 text-sm font-semibold hover:bg-ink-800 disabled:opacity-50 shrink-0 shadow-raised"
        >
          {loading ? "Checking 12 sources…" : "🔄 Refresh live data"}
        </button>
      </div>

      {error && <p className="text-sm text-signal-high mt-3">Refresh failed: {error}</p>}

      {results && (
        <div className="mt-4 pt-4 border-t border-ink-100">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-ink-700">
              <strong className="text-ink-900">{reachable}</strong>/{results.length} sources reachable
            </span>
            <span className="text-ink-700">
              <strong className="text-ink-900">{changed}</strong> changed since last check
            </span>
            <span className="text-ink-400">checked {checkedAt ? timeAgo(checkedAt) : ""}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {results.map((r) => (
              <span
                key={r.id}
                title={`${r.url} — HTTP ${r.httpStatus || "no response"}`}
                className={`pill ${r.ok ? "bg-signal-routineBg text-signal-routine" : "bg-signal-highBg text-signal-high"}`}
              >
                {r.ok ? "●" : "○"} {getCompetitor(r.competitorId)?.name ?? r.competitorId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
