"use client";

import { useWatchlist } from "@/lib/watchlist";
import type { WatchTargetType } from "@/lib/types";

export function WatchButton({ targetType, targetId, label }: { targetType: WatchTargetType; targetId: string; label: string }) {
  const { isWatched, toggle } = useWatchlist();
  const watched = isWatched(targetType, targetId);
  return (
    <button
      onClick={() => toggle(targetType, targetId, label)}
      className={`pill border transition-colors ${
        watched ? "bg-ink-900 text-white border-ink-900" : "bg-white text-ink-500 border-ink-200 hover:border-brass-300"
      }`}
    >
      {watched ? "★ Watching" : "☆ Watch"}
    </button>
  );
}
