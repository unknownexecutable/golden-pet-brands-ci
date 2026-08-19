import Link from "next/link";
import { notFound } from "next/navigation";
import { competitors, getCompetitor } from "@/lib/data/competitors";
import { relationshipsForCompetitor } from "@/lib/data/relationships";
import { observationsForCompetitor } from "@/lib/data/observations";
import { productsForCompetitor } from "@/lib/data/products";
import { strategiesForCompetitor } from "@/lib/data/strategies";
import { movesForCompetitor } from "@/lib/data/strategicMoves";
import { sourcesForCompetitor } from "@/lib/data/sources";
import { GoldenBrandChip, PriorityBadge, ConnectorBadge } from "@/components/ui/Badges";
import { SourceCite, WhyItMatters, ShowEvidence, SignificanceExplainer } from "@/components/ui/Evidence";
import { WatchButton } from "@/components/ui/WatchButton";

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export default function CompetitorDetail({ params }: { params: { slug: string } }) {
  const c = getCompetitor(params.slug);
  if (!c) return notFound();

  const rels = relationshipsForCompetitor(c.id);
  const obs = observationsForCompetitor(c.id);
  const prods = productsForCompetitor(c.id);
  const strats = strategiesForCompetitor(c.id);
  const moves = movesForCompetitor(c.id);
  const srcs = sourcesForCompetitor(c.id);

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-ink-900 text-brass-200 font-display text-xl shrink-0">{c.initials}</span>
          <div>
            <p className="kicker">{c.tier} · {c.hq} · est. {c.founded}</p>
            <h1 className="text-3xl mt-1">{c.name}</h1>
            {c.currentHeroHeadline && <p className="text-lg text-ink-500 mt-1 italic">“{c.currentHeroHeadline}”</p>}
          </div>
        </div>
        <WatchButton targetType="Competitor" targetId={c.id} label={c.name} />
      </div>

      <p className="text-ink-600 max-w-3xl leading-relaxed">{c.description}</p>
      <SourceCite url={c.sourceUrl} capturedAt={c.capturedAt} label={c.sourceNote} />

      <section>
        <h2 className="text-xl mb-3">Competes most strongly with</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {rels.map((r) => (
            <Link key={r.goldenBrandId} href={`/brands/${r.goldenBrandId === "upn" ? "ultimate-pet-nutrition" : r.goldenBrandId}`} className="card card-hover p-4">
              <GoldenBrandChip id={r.goldenBrandId} level={r.band} />
              <p className="text-sm text-ink-500 mt-2">{r.primaryOverlapCategory}</p>
              <p className="text-xs text-ink-400 mt-1">Score: {r.score}/92</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">Verified facts</h2>
        <div className="space-y-3">
          {obs.map((o) => (
            <div key={o.id} className="card p-5">
              <div className="flex items-center gap-2 flex-wrap">
                <PriorityBadge priority={o.priority} />
                <span className="text-xs text-ink-400">{o.category} · {o.page}</span>
                <span className="text-xs text-ink-300">· {o.eventDate ?? o.capturedAt}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-ink-900 mt-2">{o.headline}</h3>
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
            </div>
          ))}
          {obs.length === 0 && <p className="text-sm text-ink-400">No observations captured for this competitor yet.</p>}
        </div>
      </section>

      {prods.length > 0 && (
        <section>
          <h2 className="text-xl mb-3">Products</h2>
          <div className="overflow-x-auto card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs text-ink-400">
                  <th className="p-3 font-medium">Product</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Price</th>
                  <th className="p-3 font-medium">Retailers</th>
                </tr>
              </thead>
              <tbody>
                {prods.map((p) => (
                  <tr key={p.id} className="border-b border-ink-50 last:border-0 align-top">
                    <td className="p-3 font-medium text-ink-900">{p.name}</td>
                    <td className="p-3 text-ink-500">{p.category}</td>
                    <td className="p-3">
                      <span className={p.priceVerified ? "text-ink-800" : "text-ink-400 italic"}>{p.priceDisplay}</span>
                      {p.priceNote && <p className="text-xs text-ink-400 mt-0.5">{p.priceNote}</p>}
                    </td>
                    <td className="p-3 text-ink-500">{p.retailers.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {strats.length > 0 && (
        <section>
          <h2 className="text-xl mb-3">Strategies</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {strats.map((s) => {
              const usage = s.competitors.find((u) => u.competitorId === c.id)!;
              return (
                <Link key={s.id} href={`/strategies/${s.slug}`} className="card card-hover p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-ink-900">{s.name}</h3>
                    <span className="pill bg-ink-100 text-ink-600">{usage.emphasis}</span>
                  </div>
                  <p className="text-sm text-ink-500 mt-1 italic">“{usage.evidenceQuote}”</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {moves.length > 0 && (
        <section>
          <h2 className="text-xl mb-3">Strategic moves</h2>
          <div className="space-y-3">
            {moves.map((m) => (
              <div key={m.id} className="card p-4">
                <p className="text-xs text-ink-400">{m.eventDate}</p>
                <h3 className="text-[15px] font-semibold text-ink-900 mt-1">{m.title}</h3>
                <p className="text-sm text-ink-600 mt-1">{m.summary}</p>
                <SourceCite url={m.sourceUrl} label={m.sourceLabel} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl mb-3">Source connectivity for this competitor</h2>
        <div className="card divide-y divide-ink-100">
          {srcs.map((s) => (
            <div key={s.id} className="p-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-ink-800">{s.type}</p>
                <p className="text-xs text-ink-400">{s.captureMethod}</p>
              </div>
              <ConnectorBadge status={s.status} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
