"use client";

import { useEffect, useState } from "react";

export function ViewingDate() {
  // SSR renders nothing to avoid a hydration mismatch; the real, live date
  // fills in on the client. This is deliberately separate from the fixed
  // "data captured" date elsewhere on the page — that date should NOT move
  // forward with the calendar, since it marks when the facts were verified,
  // not when the page happens to be viewed.
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    setText(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
  }, []);

  if (!text) return null;
  return <span className="text-ink-300">· viewing today, {text}</span>;
}
