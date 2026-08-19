"use client";

import { useState } from "react";
import { competitors } from "@/lib/data/competitors";
import { sourcesForCompetitor, connectorSummary } from "@/lib/data/sources";
import { ConnectorBadge } from "@/components/ui/Badges";
import type { RefreshResult } from "@/app/api/refresh/route";

export default function SourcesPage() {
  const summary = connectorSummary();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RefreshResult[] | null>(null);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/refresh", { method: "POST" });
      if (!res.ok) throw new Error(`Refresh failed: HTTP ${res.status}`);
      const data = await res.json();
      setResults(data.results);
      setCheckedAt(data.checkedAt);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Refresh failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="kicker">Observability</p>
        <h1 className="text-3xl mt-1">Sources & connectors</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">
          Exactly which channels we can and can't pull real data from, per competitor. Nothing here is aspirational — a channel is only marked Connected
          once real data has actually come back from it.
        </p>
      </div>

      <section className="card p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg">Live re-check</h2>
            <p className="text-sm text-ink-500 mt-1 max-w-xl">
              Re-fetches every connected brand website right now and reports real HTTP status plus whether the page changed since the last check. That's a
              connectivity and drift check, not a rewrite: turning "this page changed" into a new claim or price takes judgment, so that step stays a
              deliberate human (or AI-assisted) review rather than something this button does automatically.
            </p>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="rounded-full bg-ink-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-ink-800 disabled:opacity-50 shrink-0"
          >
            {loading ? "Refreshing…" : "Refresh sources now"}
          </button>
        </div>

        {error && <p className="text-sm text-signal-high mt-3">{error}</p>}

        {results && (
          <div className="mt-4">
            <p className="text-xs text-ink-400 mb-2">Checked {checkedAt}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-left text-xs text-ink-400">
                    <th className="p-2 font-medium">Competitor</th>
                    <th className="p-2 font-medium">HTTP</th>
                    <th className="p-2 font-medium">Content drift</th>
                    <th className="p-2 font-medium">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => {
                    const c = competitors.find((x) => x.id === r.competitorId);
                    return (
                      <tr key={r.id} className="border-b border-ink-50 last:border-0">
                        <td className="p-2 font-medium text-ink-800">{c?.name}</td>
                        <td className="p-2">
                          <span className={r.ok ? "text-signal-routine" : "text-signal-high"}>{r.httpStatus || "no response"}</span>
                        </td>
                        <td className="p-2 text-ink-600">
                          {r.changedSincePrevious === null ? "First check on record" : r.changedSincePrevious ? "Changed since last check" : "No change detected"}
                        </td>
                        <td className="p-2 text-xs text-ink-400">{r.error ?? (r.bytes ? `${r.bytes.toLocaleString()} bytes` : "—")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl mb-3">Connector coverage by channel type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {summary.map((s) => (
            <div key={s.type} className="card p-4">
              <p className="text-xs text-ink-400">{s.type}</p>
              <p className="text-lg font-display mt-1">
                {s.connected}/{s.total} <span className="text-sm text-ink-400 font-sans">connected</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">Per-competitor detail</h2>
        <div className="space-y-4">
          {competitors.map((c) => (
            <div key={c.id} className="card p-4">
              <h3 className="font-semibold text-ink-900">{c.name}</h3>
              <div className="mt-2 divide-y divide-ink-50">
                {sourcesForCompetitor(c.id).map((s) => (
                  <div key={s.id} className="py-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-ink-700">{s.type}</p>
                      <p className="text-xs text-ink-400">{s.status === "Connected" ? s.captureMethod : s.notConnectedReason}</p>
                    </div>
                    <ConnectorBadge status={s.status} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
