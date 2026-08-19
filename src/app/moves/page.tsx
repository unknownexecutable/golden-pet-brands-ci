import { allMovesSorted } from "@/lib/data/strategicMoves";
import { getCompetitor } from "@/lib/data/competitors";
import { ConfidenceBadge } from "@/components/ui/Badges";
import { SourceCite } from "@/components/ui/Evidence";

export default function MovesPage() {
  const moves = allMovesSorted();
  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Real, press-confirmed, independently verifiable — no speculative "possible launch" signals</p>
        <h1 className="text-3xl mt-1">Strategic moves</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">
          A feed of significant, dated, real events — product launches, retail expansions, legal developments — each backed by a named, checkable source.
        </p>
      </div>
      <div className="relative pl-6 border-l-2 border-ink-100 space-y-6">
        {moves.map((m) => {
          const c = m.isGoldenBrand ? null : getCompetitor(m.competitorId);
          return (
            <div key={m.id} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-brass-400 border-2 border-paper" />
              <div className="card p-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-ink-400">{m.eventDate}</span>
                  {m.isGoldenBrand ? (
                    <span className="pill bg-ink-900 text-white">Golden Pet Brands</span>
                  ) : (
                    <span className="pill bg-ink-100 text-ink-600">{c?.name}</span>
                  )}
                  <ConfidenceBadge confidence={m.confidence} band={m.confidenceBand} />
                </div>
                <h2 className="text-lg mt-2">{m.title}</h2>
                <p className="text-sm text-ink-600 mt-1 leading-relaxed">{m.summary}</p>
                <p className="text-sm text-brass-700 bg-brass-50 rounded-md px-3 py-2 mt-3">{m.whyItMatters}</p>
                <div className="mt-2">
                  <SourceCite url={m.sourceUrl} label={m.sourceLabel} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
