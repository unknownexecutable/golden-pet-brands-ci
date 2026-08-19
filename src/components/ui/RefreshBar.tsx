"use client";

import { useEffect, useState } from "react";
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
  const [expanded, setExpanded] = useState(false);

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
      setExpanded(true);
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
    <div className="rounded-md border border-ink-100 bg-white px-4 py-2.5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-ink-500">
          {results ? (
            <>
              <button onClick={() => setExpanded((v) => !v)} className="font-medium text-ink-700 hover:text-brass-700">
                {reachable}/{results.length} live sources reachable, {changed} changed
              </button>{" "}
              · checked {checkedAt ? timeAgo(checkedAt) : ""}
            </>
          ) : checkedAt ? (
            `Live sources last checked ${timeAgo(checkedAt)}`
          ) : (
            "Live competitor sources haven't been checked yet"
          )}
        </p>
        <button
          onClick={refresh}
          disabled={loading}
          className="rounded-full bg-ink-900 text-white px-3.5 py-1.5 text-xs font-medium hover:bg-ink-800 disabled:opacity-50 shrink-0"
        >
          {loading ? "Checking…" : "🔄 Refresh"}
        </button>
      </div>

      {error && <p className="text-xs text-signal-high mt-1.5">Refresh failed: {error}</p>}

      {results && expanded && (
        <div className="mt-2.5 pt-2.5 border-t border-ink-50 flex flex-wrap gap-1.5">
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
      )}
    </div>
  );
}
