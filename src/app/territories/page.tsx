import Link from "next/link";
import { narrativeTerritories } from "@/lib/data/narrative";
import { getCompetitor } from "@/lib/data/competitors";
import { PresenceBadge } from "@/components/ui/Badges";

const TREND_LABEL: Record<string, string> = {
  Crowded: "🔴 Crowded — many strong occupants today",
  Contested: "🟡 Contested — a few real occupants, no clear owner",
  Emerging: "🟢 Emerging — early signals only",
  Whitespace: "⚪ Whitespace — no meaningful occupant found"
};

export default function TerritoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Who occupies which claim territory today</p>
        <h1 className="text-3xl mt-1">Market narrative map</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">
          Real competitors, real quoted evidence, one snapshot in time. No claim about whether a territory is growing or shrinking — that needs a second look, weeks apart.
        </p>
      </div>
      <div className="space-y-5">
        {narrativeTerritories.map((t) => (
          <div key={t.id} className="card p-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-lg">{t.name}</h2>
              <span className="text-sm text-ink-500">{TREND_LABEL[t.trend]}</span>
            </div>
            <p className="text-sm text-ink-500 mt-1">{t.description}</p>
            <p className="text-xs text-ink-400 mt-1 italic">{t.trendRationale}</p>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {t.occupants.map((o) => {
                const c = getCompetitor(o.competitorId);
                return (
                  <Link key={o.competitorId} href={`/competitors/${c?.slug}`} className="rounded-md border border-ink-100 p-3 hover:border-brass-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-ink-900">{c?.name}</span>
                      <PresenceBadge presence={o.presence} />
                    </div>
                    <p className="text-xs text-ink-400 mt-1 italic">“{o.evidenceQuote}”</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
