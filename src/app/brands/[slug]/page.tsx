import Link from "next/link";
import { notFound } from "next/navigation";
import { goldenBrands } from "@/lib/data/goldenBrands";
import { relationshipsForBrand } from "@/lib/data/relationships";
import { getCompetitor } from "@/lib/data/competitors";
import { observations } from "@/lib/data/observations";
import { strategies } from "@/lib/data/strategies";
import { movesForGoldenBrand } from "@/lib/data/strategicMoves";
import { narrativeTerritories } from "@/lib/data/narrative";
import { RelevanceBadge, PriorityBadge } from "@/components/ui/Badges";
import { RelevanceExplainer, SourceCite } from "@/components/ui/Evidence";

function FoundedLine({ founded, foundedNote }: { founded: string; foundedNote?: string }) {
  return (
    <div className="card p-4">
      <p className="kicker">Founded</p>
      <p className="text-sm mt-1 text-ink-700">{founded}</p>
      {foundedNote && <p className="text-xs text-ink-400 mt-1">{foundedNote}</p>}
    </div>
  );
}

export function generateStaticParams() {
  return goldenBrands.map((b) => ({ slug: b.slug }));
}

export default function BrandDetail({ params }: { params: { slug: string } }) {
  const brand = goldenBrands.find((b) => b.slug === params.slug);
  if (!brand) return notFound();

  const rels = relationshipsForBrand(brand.id);
  const relevantObs = observations.filter((o) => o.goldenRelevance.some((g) => g.brandId === brand.id)).sort((a, b) => b.significance - a.significance);
  const relevantStrategies = strategies.filter((s) => s.goldenExposure.some((g) => g.brandId === brand.id));
  const relevantMoves = movesForGoldenBrand(brand.id).sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));
  const territoriesTouched = narrativeTerritories.filter((t) => t.occupants.some((o) => rels.some((r) => r.competitorId === o.competitorId)));

  return (
    <div className="space-y-10">
      <div>
        <p className="kicker">Golden brand profile · verified {brand.capturedAt}</p>
        <h1 className="text-3xl mt-1">{brand.name}</h1>
        <p className="text-lg text-ink-500 mt-1">{brand.tagline}</p>
        <p className="text-ink-600 mt-3 max-w-3xl leading-relaxed">{brand.description}</p>
        <div className="mt-3">
          <SourceCite url={brand.sourceUrl} capturedAt={brand.capturedAt} label={brand.sourceNote} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FoundedLine founded={brand.founded} foundedNote={brand.foundedNote} />
        <div className="card p-4">
          <p className="kicker">Price tier</p>
          <p className="text-sm mt-1 text-ink-700">{brand.priceTier}</p>
        </div>
        <div className="card p-4">
          <p className="kicker">Distribution</p>
          <p className="text-sm mt-1 text-ink-700">{brand.distribution.join(", ")}</p>
        </div>
        <div className="card p-4">
          <p className="kicker">Tracked competitors</p>
          <p className="text-sm mt-1 text-ink-700">{rels.length} ({rels.filter((r) => r.band === "Very High" || r.band === "High").length} High+)</p>
        </div>
      </div>

      <div className="card p-4 bg-ink-50/60">
        <p className="kicker">Analyst read — not an official Golden statement</p>
        <p className="text-sm mt-1 text-ink-700">{brand.coreCustomer}</p>
      </div>

      {brand.champions.length > 0 && (
        <section>
          <h2 className="text-xl mb-3">Brand Champions</h2>
          <p className="text-xs text-ink-400 mb-2">Official titles, per goldenpetbrands.com/leadership</p>
          <div className="flex flex-wrap gap-3">
            {brand.champions.map((c) => (
              <div key={c.name} className="card px-4 py-3">
                <p className="text-sm font-semibold text-ink-900">{c.name}</p>
                <p className="text-xs text-ink-500">{c.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {brand.productLine.length > 0 && (
        <section>
          <h2 className="text-xl mb-3">Product line</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {brand.productLine.map((p) => (
              <li key={p} className="card px-4 py-2.5 text-sm text-ink-700">{p}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-xl mb-3">Real, verified pricing</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {brand.pricingFacts.map((f) => (
            <div key={f.label} className="card p-4">
              <p className="text-xs text-ink-400">{f.label}</p>
              <p className="text-lg font-display mt-1">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">What Golden actually says</h2>
        <p className="text-xs text-ink-400 mb-2">Verbatim or near-verbatim — every claim below is quoted and cited, never paraphrased into a new claim.</p>
        <div className="space-y-2">
          {brand.officialClaims.map((c) => (
            <div key={c.text} className="card p-4">
              <blockquote className="text-sm text-ink-800 italic border-l-2 border-brass-300 pl-3">“{c.text}”</blockquote>
              <div className="mt-2">
                <SourceCite url={c.sourceUrl} label={c.sourceLabel} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">Our positioning read</h2>
        <p className="text-xs text-ink-400 mb-2">Analyst synthesis — our interpretation, not a Golden statement or quote.</p>
        <div className="flex flex-wrap gap-2">
          {brand.analystPositioning.map((p) => (
            <span key={p} className="pill bg-ink-100 text-ink-700">{p}</span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">Competitive environment</h2>
        <div className="card divide-y divide-ink-100">
          {rels.map((r) => {
            const c = getCompetitor(r.competitorId);
            const items = [
              { label: "Category overlap", points: r.breakdown.categoryOverlap, max: 30, rationale: r.breakdown.rationale.category },
              { label: "Customer overlap", points: r.breakdown.customerOverlap, max: 22, rationale: r.breakdown.rationale.customer },
              { label: "Price overlap", points: r.breakdown.priceOverlap, max: 15, rationale: r.breakdown.rationale.price },
              { label: "Marketing overlap", points: r.breakdown.marketingOverlap, max: 12, rationale: r.breakdown.rationale.marketing },
              { label: "Retail overlap", points: r.breakdown.retailOverlap, max: 8, rationale: r.breakdown.rationale.retail },
              { label: "Search overlap", points: r.breakdown.searchOverlap, max: 5, rationale: r.breakdown.rationale.search }
            ];
            return (
              <div key={r.competitorId} className="p-4 flex flex-col md:flex-row md:items-start gap-3">
                <div className="w-40 shrink-0">
                  <Link href={`/competitors/${c?.slug}`} className="font-semibold text-ink-900 hover:text-brass-600">
                    {c?.name}
                  </Link>
                  <p className="text-xs text-ink-400 mt-0.5">{c?.tier}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <RelevanceBadge band={r.band} />
                    <span className="text-sm text-ink-500">{r.score}/92 · {r.primaryOverlapCategory}</span>
                  </div>
                  <RelevanceExplainer breakdown={items} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">What's relevant to {brand.shortName} right now</h2>
        <div className="space-y-3">
          {relevantObs.slice(0, 6).map((o) => {
            const c = getCompetitor(o.competitorId);
            const tag = o.goldenRelevance.find((g) => g.brandId === brand.id)!;
            return (
              <div key={o.id} className="card p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <PriorityBadge priority={o.priority} />
                  <span className="text-xs text-ink-400">{c?.name} · {o.eventDate ?? o.capturedAt}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-ink-900 mt-1.5">{o.headline}</h3>
                <p className="text-sm text-ink-500 mt-1">{tag.rationale}</p>
              </div>
            );
          })}
        </div>
      </section>

      {relevantStrategies.length > 0 && (
        <section>
          <h2 className="text-xl mb-3">Strategies with exposure to {brand.shortName}</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {relevantStrategies.map((s) => {
              const exp = s.goldenExposure.find((g) => g.brandId === brand.id)!;
              return (
                <Link key={s.id} href={`/strategies/${s.slug}`} className="card card-hover p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-ink-900">{s.name}</h3>
                    <RelevanceBadge band={exp.level} />
                  </div>
                  <p className="text-sm text-ink-500 mt-1">{exp.rationale}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {relevantMoves.length > 0 && (
        <section>
          <h2 className="text-xl mb-3">Strategic moves touching {brand.shortName}</h2>
          <div className="space-y-3">
            {relevantMoves.map((m) => (
              <div key={m.id} className="card p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-ink-400">{m.eventDate}</span>
                  {m.isGoldenBrand && <span className="pill bg-ink-900 text-white">Golden</span>}
                </div>
                <h3 className="text-[15px] font-semibold text-ink-900 mt-1">{m.title}</h3>
                <p className="text-sm text-ink-600 mt-1">{m.summary}</p>
                <div className="mt-2">
                  <SourceCite url={m.sourceUrl} label={m.sourceLabel} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {territoriesTouched.length > 0 && (
        <section>
          <h2 className="text-xl mb-3">Narrative territories in {brand.shortName}'s competitive set</h2>
          <div className="flex flex-wrap gap-2">
            {territoriesTouched.map((t) => (
              <Link key={t.id} href="/territories" className="pill bg-ink-100 text-ink-700 hover:bg-ink-200">
                {t.name} · {t.trend}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
