import Link from "next/link";
import { competitors } from "@/lib/data/competitors";
import { relationshipsForCompetitor } from "@/lib/data/relationships";
import { GoldenBrandChip } from "@/components/ui/Badges";

const TIER_ORDER = ["Primary", "Secondary", "Emerging Threat", "Product-Specific", "Marketing", "Retail", "Aspirational"];

export default function CompetitorsPage() {
  const sorted = [...competitors].sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier));
  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Automatically classified, human-overridable</p>
        <h1 className="text-3xl mt-1">Competitors</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">
          {competitors.length} competitors tracked across Dr. Marty Pets, Badlands Ranch, and Ultimate Pet Nutrition's combined category, customer, and marketing footprint.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((c) => {
          const rels = relationshipsForCompetitor(c.id);
          return (
            <Link key={c.id} href={`/competitors/${c.slug}`} className="card card-hover p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink-900 text-brass-200 font-display text-sm shrink-0">{c.initials}</span>
                  <div>
                    <h2 className="text-[16px] font-semibold text-ink-900">{c.name}</h2>
                    <p className="text-xs text-ink-400">{c.hq} · est. {c.founded}</p>
                  </div>
                </div>
                <span className="pill bg-ink-100 text-ink-600 shrink-0">{c.tier}</span>
              </div>
              <p className="text-sm text-ink-500 mt-3 leading-relaxed line-clamp-3">{c.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {rels.map((r) => (
                  <GoldenBrandChip key={r.goldenBrandId} id={r.goldenBrandId} level={r.band} />
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
