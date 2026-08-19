import Link from "next/link";
import { notFound } from "next/navigation";
import { strategies } from "@/lib/data/strategies";
import { getCompetitor } from "@/lib/data/competitors";
import { ConfidenceBadge, GoldenBrandChip } from "@/components/ui/Badges";
import { SourceCite } from "@/components/ui/Evidence";
import { WatchButton } from "@/components/ui/WatchButton";

export function generateStaticParams() {
  return strategies.map((s) => ({ slug: s.slug }));
}

const EMPHASIS_ORDER = ["Core Pillar", "Prominent", "Present", "Minor"];

export default function StrategyDetail({ params }: { params: { slug: string } }) {
  const s = strategies.find((x) => x.slug === params.slug);
  if (!s) return notFound();
  const sortedCompetitors = [...s.competitors].sort((a, b) => EMPHASIS_ORDER.indexOf(a.emphasis) - EMPHASIS_ORDER.indexOf(b.emphasis));

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="flex items-start justify-between gap-4">
          <p className="kicker">{s.category}</p>
          <WatchButton targetType="Strategy" targetId={s.id} label={s.name} />
        </div>
        <h1 className="text-3xl mt-1">{s.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <ConfidenceBadge confidence={s.confidence} band={s.confidenceBand} />
          <span className="text-xs text-ink-400">Channels observed: {s.channelsObserved.join(", ")}</span>
        </div>
        <p className="text-ink-600 mt-4 leading-relaxed">{s.description}</p>
      </div>

      <section>
        <h2 className="text-xl mb-3">Golden brand exposure</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {s.goldenExposure.map((g) => (
            <div key={g.brandId} className="card p-4">
              <GoldenBrandChip id={g.brandId} level={g.level} />
              <p className="text-sm text-ink-600 mt-2">{g.rationale}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">Who's using it, and how</h2>
        <div className="card divide-y divide-ink-100">
          {sortedCompetitors.map((u) => {
            const c = getCompetitor(u.competitorId);
            return (
              <div key={u.competitorId} className="p-4">
                <div className="flex items-center justify-between">
                  <Link href={`/competitors/${c?.slug}`} className="font-semibold text-ink-900 hover:text-brass-600">
                    {c?.name}
                  </Link>
                  <span className="pill bg-ink-100 text-ink-600">{u.emphasis}</span>
                </div>
                <blockquote className="border-l-2 border-brass-300 pl-3 text-sm text-ink-600 italic mt-2">“{u.evidenceQuote}”</blockquote>
                <div className="mt-1">
                  <SourceCite url={u.sourceUrl} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">Analyst note</h2>
        <div className="card p-5 bg-brass-50/40 border-brass-100">
          <p className="text-sm text-ink-700 leading-relaxed">{s.analystNote}</p>
        </div>
      </section>
    </div>
  );
}
