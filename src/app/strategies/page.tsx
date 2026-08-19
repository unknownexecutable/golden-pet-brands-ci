import Link from "next/link";
import { strategies } from "@/lib/data/strategies";
import { ConfidenceBadge, GoldenBrandChip } from "@/components/ui/Badges";

export default function StrategiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Built from today's verified positioning, not projected trends</p>
        <h1 className="text-3xl mt-1">Strategy library</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">
          Cross-competitor patterns visible in the current dataset. Each one names exactly which competitors show the pattern, with a real quote and source per competitor.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strategies.map((s) => (
          <Link key={s.id} href={`/strategies/${s.slug}`} className="card card-hover p-5">
            <div className="flex items-center justify-between">
              <p className="kicker">{s.category}</p>
              <ConfidenceBadge confidence={s.confidence} band={s.confidenceBand} />
            </div>
            <h2 className="text-lg mt-1">{s.name}</h2>
            <p className="text-sm text-ink-500 mt-2 leading-relaxed">{s.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.goldenExposure.map((g) => (
                <GoldenBrandChip key={g.brandId} id={g.brandId} level={g.level} />
              ))}
            </div>
            <p className="text-xs text-ink-400 mt-3">{s.competitors.length} competitors showing this pattern</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
