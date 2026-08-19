"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        router.replace("/");
        router.refresh();
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Something went wrong — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gpb-logo.svg" alt="Golden Pet Brands" className="h-14 w-auto" />
        </div>
        <div className="card p-8">
          <p className="kicker text-center">Internal tool</p>
          <h1 className="text-xl mt-1 text-center">Competitive Intelligence</h1>
          <p className="text-sm text-ink-500 text-center mt-2">Enter the access password to continue.</p>
          <form onSubmit={submit} className="mt-6 space-y-3">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md border border-ink-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brass-300"
            />
            {error && <p className="text-sm text-signal-high">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-md bg-ink-900 text-white py-2.5 text-sm font-medium hover:bg-ink-800 disabled:opacity-50"
            >
              {loading ? "Checking…" : "Enter"}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-ink-300 mt-6">Golden Pet Brands internal tool. Not for external distribution.</p>
      </div>
    </div>
  );
}
