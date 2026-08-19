function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function SourceCite({ url, capturedAt, label }: { url: string; capturedAt?: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-brass-600 underline decoration-ink-200 underline-offset-2"
    >
      {label ?? hostOf(url)}
      {capturedAt ? <span className="text-ink-300">· verified {capturedAt}</span> : null}
    </a>
  );
}

export function WhyItMatters({ children }: { children: React.ReactNode }) {
  return (
    <details className="group mt-3 rounded-md border border-ink-100 bg-ink-50/60 open:bg-white">
      <summary className="cursor-pointer list-none px-3 py-2 text-xs font-semibold text-ink-600 flex items-center justify-between select-none">
        Why should I care?
        <span className="text-ink-300 group-open:rotate-180 transition-transform">⌄</span>
      </summary>
      <div className="px-3 pb-3 text-sm text-ink-700 leading-relaxed">{children}</div>
    </details>
  );
}

export function ShowEvidence({ quote, url, capturedAt, page }: { quote: string; url: string; capturedAt: string; page?: string }) {
  return (
    <details className="group mt-2 rounded-md border border-ink-100">
      <summary className="cursor-pointer list-none px-3 py-2 text-xs font-semibold text-ink-500 flex items-center justify-between select-none">
        Show evidence
        <span className="text-ink-300 group-open:rotate-180 transition-transform">⌄</span>
      </summary>
      <div className="px-3 pb-3 text-sm">
        <blockquote className="border-l-2 border-brass-300 pl-3 text-ink-700 italic">“{quote}”</blockquote>
        <div className="mt-2 flex items-center gap-2 text-xs text-ink-400">
          {page ? <span>{page} ·</span> : null}
          <SourceCite url={url} capturedAt={capturedAt} />
        </div>
      </div>
    </details>
  );
}

export function SignificanceExplainer({ factors, total, max = 100 }: { factors: { label: string; points: number; max: number }[]; total: number; max?: number }) {
  return (
    <details className="group mt-2">
      <summary className="cursor-pointer list-none text-xs font-semibold text-ink-500 flex items-center gap-1 select-none">
        Significance: {total}/{max}
        <span className="text-ink-300 group-open:rotate-180 transition-transform">⌄</span>
      </summary>
      <ul className="mt-2 space-y-1">
        {factors.map((f) => (
          <li key={f.label} className="flex items-center justify-between text-xs text-ink-500">
            <span>{f.label}</span>
            <span className="font-mono text-ink-700">
              {f.points}/{f.max}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function RelevanceExplainer({ breakdown }: { breakdown: { label: string; points: number; max: number; rationale: string }[] }) {
  return (
    <details className="group mt-2">
      <summary className="cursor-pointer list-none text-xs font-semibold text-ink-500 flex items-center gap-1 select-none">
        How this score was calculated
        <span className="text-ink-300 group-open:rotate-180 transition-transform">⌄</span>
      </summary>
      <ul className="mt-2 space-y-2">
        {breakdown.map((f) => (
          <li key={f.label} className="text-xs">
            <div className="flex items-center justify-between text-ink-600 font-semibold">
              <span>{f.label}</span>
              <span className="font-mono">
                {f.points}/{f.max}
              </span>
            </div>
            <p className="text-ink-400 mt-0.5">{f.rationale}</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
