import Link from "next/link";
import { goldenBrands } from "@/lib/data/goldenBrands";
import { observations, observationsByPriority } from "@/lib/data/observations";
import { allMovesSorted } from "@/lib/data/strategicMoves";
import { relationshipsForBrand } from "@/lib/data/relationships";
import { getCompetitor } from "@/lib/data/competitors";
import { PriorityBadge, GoldenBrandChip, RelevanceBadge } from "@/components/ui/Badges";
import { WhyItMatters, ShowEvidence, SourceCite } from "@/components/ui/Evidence";

const CAPTURE_DATE = "August 19, 2026";

export default function TodayPage() {
  const high = observationsByPriority("high");
  const watch = observationsByPriority("watch").slice(0, 5);
  const moves = allMovesSorted().slice(0, 4);

  return (
    <div className="space-y-10">
      <section>
        <p className="kicker">{CAPTURE_DATE} · Live snapshot</p>
        <h1 className="text-3xl md:text-4xl mt-1">Good morning.</h1>
        <p className="mt-2 max-w-3xl text-ink-500 text-[15px] leading-relaxed">
          {high.length} high-priority findings and {moves.length} confirmed strategic moves are on record right now, drawn from{" "}
          {observations.length} verified, live-captured facts across {new Set(observations.map((o) => o.competitorId)).size} tracked competitors.
          Everything below links back to the exact page and date it was confirmed — this is a snapshot of what's true today, not a fabricated change feed.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goldenBrands.map((b) => {
          const rels = relationshipsForBrand(b.id);
          const veryHighOrHigh = rels.filter((r) => r.band === "Very High" || r.band === "High").length;
          const borderCls =
            b.id === "dr-marty" ? "border-golden-drmarty" : b.id === "badlands-ranch" ? "border-golden-badlands" : "border-golden-upn";
          return (
            <Link key={b.id} href={`/brands/${b.slug}`} className={`card card-hover p-5 border-l-4 ${borderCls}`}>
              <p className="kicker">{b.shortName}</p>
              <h3 className="text-lg mt-1">{b.tagline}</h3>
              <p className="text-sm text-ink-500 mt-2">
                <span className="font-semibold text-ink-800">{veryHighOrHigh}</span> of {rels.length} tracked competitors rated High or Very High relevance
              </p>
            </Link>
          );
        })}
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl">🔴 High priority</h2>
          <Link href="/observations?priority=high" className="text-sm text-brass-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {high.map((o) => {
            const c = getCompetitor(o.competitorId);
            return (
              <div key={o.id} className="card p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <PriorityBadge priority={o.priority} />
                  <span className="text-xs text-ink-400">{c?.name}</span>
                  <span className="text-xs text-ink-300">·</span>
                  <span className="text-xs text-ink-400">{o.eventDate ?? o.capturedAt}</span>
                  {o.goldenRelevance.map((g) => (
                    <GoldenBrandChip key={g.brandId} id={g.brandId} level={g.level} />
                  ))}
                </div>
                <h3 className="text-lg mt-2">{o.headline}</h3>
                <p className="text-sm text-ink-600 mt-1 leading-relaxed">{o.quote}</p>
                <WhyItMatters>{o.whyItMatters}</WhyItMatters>
                <ShowEvidence quote={o.quote} url={o.url} capturedAt={o.capturedAt} page={o.page} />
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl">🟡 Worth watching</h2>
          <Link href="/observations?priority=watch" className="text-sm text-brass-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          {watch.map((o) => {
            const c = getCompetitor(o.competitorId);
            return (
              <div key={o.id} className="card p-4">
                <div className="flex items-center gap-2 text-xs text-ink-400">
                  <span>{c?.name}</span>
                  <span>·</span>
                  <span>{o.eventDate ?? o.capturedAt}</span>
                </div>
                <h3 className="text-[15px] mt-1 font-semibold text-ink-900">{o.headline}</h3>
                <SourceCite url={o.url} capturedAt={o.capturedAt} />
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl">Recent confirmed strategic moves</h2>
          <Link href="/moves" className="text-sm text-brass-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {moves.map((m) => (
            <div key={m.id} className="card p-5 flex flex-col md:flex-row md:items-start gap-3">
              <div className="text-xs font-mono text-ink-400 w-24 shrink-0">{m.eventDate}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {m.isGoldenBrand ? <span className="pill bg-ink-900 text-white">Golden</span> : null}
                  <h3 className="text-[15px] font-semibold text-ink-900">{m.title}</h3>
                </div>
                <p className="text-sm text-ink-600 mt-1 leading-relaxed">{m.summary}</p>
                <div className="mt-2">
                  <SourceCite url={m.sourceUrl} label={m.sourceLabel} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
