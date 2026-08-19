import Link from "next/link";
import { goldenBrands } from "@/lib/data/goldenBrands";
import { relationshipsForBrand } from "@/lib/data/relationships";

export default function BrandsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="kicker">Golden Pet Brands</p>
        <h1 className="text-3xl mt-1">Brand profiles</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">Three brands, three customers, three competitive sets. Each gets its own read.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {goldenBrands.map((b) => {
          const rels = relationshipsForBrand(b.id);
          return (
            <Link key={b.id} href={`/brands/${b.slug}`} className="card card-hover p-6 flex flex-col">
              <p className="kicker">{b.priceTier} · est. {b.founded}</p>
              <h2 className="text-xl mt-1">{b.name}</h2>
              <p className="text-sm text-ink-500 mt-2 leading-relaxed flex-1">{b.description}</p>
              <div className="mt-4 pt-4 border-t border-ink-100 text-sm text-ink-600">
                <strong className="text-ink-900">{rels.length}</strong> tracked competitors ·{" "}
                <strong className="text-ink-900">{rels.filter((r) => r.band === "Very High").length}</strong> at Very High relevance
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
