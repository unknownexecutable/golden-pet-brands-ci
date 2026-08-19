"use client";

import { useEffect, useState } from "react";

function greetingFor(hour: number): string {
  if (hour < 5) return "Still up?";
  if (hour < 12) return "Good morning.";
  if (hour < 18) return "Good afternoon.";
  return "Good evening.";
}

export function Greeting() {
  // Avoid a server/client hydration mismatch: render a neutral, time-agnostic
  // heading on first paint, then swap to the visitor's actual local time
  // once mounted in the browser.
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    setText(greetingFor(new Date().getHours()));
  }, []);

  return <h1 className="text-3xl md:text-4xl mt-1">{text ?? "Welcome back."}</h1>;
}
