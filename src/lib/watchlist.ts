"use client";

import { useEffect, useState, useCallback } from "react";
import type { WatchItem, WatchTargetType } from "@/lib/types";

const KEY = "gpb-ci-watchlist";

function read(): WatchItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as WatchItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: WatchItem[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("gpb-watchlist-changed"));
}

export function useWatchlist() {
  const [items, setItems] = useState<WatchItem[]>([]);

  useEffect(() => {
    setItems(read());
    const handler = () => setItems(read());
    window.addEventListener("gpb-watchlist-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("gpb-watchlist-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const isWatched = useCallback((targetType: WatchTargetType, targetId: string) => items.some((i) => i.targetType === targetType && i.targetId === targetId), [items]);

  const toggle = useCallback((targetType: WatchTargetType, targetId: string, label: string) => {
    const current = read();
    const exists = current.find((i) => i.targetType === targetType && i.targetId === targetId);
    const next = exists
      ? current.filter((i) => !(i.targetType === targetType && i.targetId === targetId))
      : [...current, { id: `${targetType}-${targetId}-${Date.now()}`, targetType, targetId, label, addedAt: new Date().toISOString().slice(0, 10) }];
    write(next);
    setItems(next);
  }, []);

  const remove = useCallback((id: string) => {
    const next = read().filter((i) => i.id !== id);
    write(next);
    setItems(next);
  }, []);

  return { items, isWatched, toggle, remove };
}
