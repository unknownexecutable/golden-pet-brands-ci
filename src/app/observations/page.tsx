import Link from "next/link";
import { observations } from "@/lib/data/observations";
import { getCompetitor } from "@/lib/data/competitors";
import { PriorityBadge, GoldenBrandChip, EvidenceTypeBadge } from "@/components/ui/Badges";
import { WhyItMatters, ShowEvidence, SignificanceExplainer } from "@/components/ui/Evidence";
import type { Priority } from "@/lib/types";

const PRIORITIES: { value: Priority | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "high", label: "🔴 High priority" },
  { value: "watch", label: "🟡 Worth watching" },
  { value: "routine", label: "🟢 Routine" }
];

export default function ObservationsPage({ searchParams }: { searchParams: { priority?: string } }) {
  const filter = (searchParams.priority as Priority | undefined) ?? "all";
  const list = [...observations]
    .filter((o) => filter === "all" || o.priority === filter)
    .sort((a, b) => b.significance - a.significance);

  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Verified, single-point-in-time facts — not a fabricated change feed</p>
        <h1 className="text-3xl mt-1">Observations</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">
          Every item here was captured from a live source on the date shown, with a significance score that filters noise from what actually matters.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {PRIORITIES.map((p) => (
          <Link
            key={p.value}
            href={p.value === "all" ? "/observations" : `/observations?priority=${p.value}`}
            className={`pill border ${filter === p.value ? "bg-ink-900 text-white border-ink-900" : "bg-white text-ink-600 border-ink-200"}`}
          >
            {p.label}
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((o) => {
          const c = getCompetitor(o.competitorId);
          return (
            <div key={o.id} className="card p-5">
              <div className="flex items-center gap-2 flex-wrap">
                <PriorityBadge priority={o.priority} />
                <EvidenceTypeBadge type={o.evidenceType} />
                <Link href={`/competitors/${c?.slug}`} className="text-xs font-semibold text-ink-600 hover:text-brass-600">
                  {c?.name}
                </Link>
                <span className="text-xs text-ink-400">{o.category} · {o.page}</span>
                <span className="text-xs text-ink-300">{o.eventDate ?? o.capturedAt}</span>
              </div>
              <h3 className="text-lg mt-2">{o.headline}</h3>
              <p className="text-sm text-ink-600 mt-1 leading-relaxed">{o.quote}</p>
              {o.goldenRelevance.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {o.goldenRelevance.map((g) => (
                    <GoldenBrandChip key={g.brandId} id={g.brandId} level={g.level} />
                  ))}
                </div>
              )}
              <WhyItMatters>{o.whyItMatters}</WhyItMatters>
              <ShowEvidence quote={o.quote} url={o.url} capturedAt={o.capturedAt} page={o.page} />
              <SignificanceExplainer factors={o.significanceFactors} total={o.significance} />
              {o.suggestedAction && (
                <p className="text-xs text-brass-700 bg-brass-50 rounded-md px-3 py-2 mt-3">
                  <strong>Consider:</strong> {o.suggestedAction}
                </p>
              )}
            </div>
          );
        })}
        {list.length === 0 && <p className="text-sm text-ink-400">No observations match this filter.</p>}
      </div>
    </div>
  );
}
