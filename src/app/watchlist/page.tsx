"use client";

import Link from "next/link";
import { useWatchlist } from "@/lib/watchlist";
import type { WatchTargetType } from "@/lib/types";

const TARGET_HREF: Record<WatchTargetType, (id: string) => string> = {
  Competitor: (id) => `/competitors/${id}`,
  Strategy: (id) => `/strategies/${id}`,
  Product: () => `/products`,
  Territory: () => `/territories`
};

export default function WatchlistPage() {
  const { items, remove } = useWatchlist();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="kicker">Stored locally in this browser</p>
        <h1 className="text-3xl mt-1">Watchlist</h1>
        <p className="text-ink-500 mt-2">
          Click <span className="pill bg-ink-100 text-ink-600">☆ Watch</span> on any competitor or strategy page to track it here.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="card p-8 text-center text-ink-400">
          Nothing on your watchlist yet. Visit a{" "}
          <Link href="/competitors" className="text-brass-600 hover:underline">
            competitor
          </Link>{" "}
          or{" "}
          <Link href="/strategies" className="text-brass-600 hover:underline">
            strategy
          </Link>{" "}
          page to add one.
        </div>
      ) : (
        <div className="card divide-y divide-ink-100">
          {items.map((i) => (
            <div key={i.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <Link href={TARGET_HREF[i.targetType](i.targetId)} className="font-medium text-ink-900 hover:text-brass-600">
                  {i.label}
                </Link>
                <p className="text-xs text-ink-400 mt-0.5">
                  {i.targetType} · added {i.addedAt}
                </p>
              </div>
              <button onClick={() => remove(i.id)} className="text-xs text-ink-400 hover:text-signal-high">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
