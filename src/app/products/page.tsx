import Link from "next/link";
import { products } from "@/lib/data/products";
import { getCompetitor } from "@/lib/data/competitors";
import { goldenBrands } from "@/lib/data/goldenBrands";
import { SourceCite } from "@/components/ui/Evidence";
import type { CompetitorCategory } from "@/lib/types";

function groupByCategory() {
  const map = new Map<CompetitorCategory, typeof products>();
  for (const p of products) {
    const list = map.get(p.category) ?? [];
    list.push(p);
    map.set(p.category, list);
  }
  return Array.from(map.entries());
}

export default function ProductsPage() {
  const groups = groupByCategory();
  return (
    <div className="space-y-10">
      <div>
        <p className="kicker">Every price is either directly verified or explicitly marked unverified</p>
        <h1 className="text-3xl mt-1">Product & price intelligence</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">
          Where a competitor doesn't publish a fixed price — personalized quizzes, promo-code-only pricing — that's marked, not guessed.
        </p>
      </div>

      <section>
        <h2 className="text-xl mb-3">Golden Pet Brands pricing</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {goldenBrands.map((b) => (
            <div key={b.id} className="card p-5">
              <Link href={`/brands/${b.slug}`} className="font-semibold text-ink-900 hover:text-brass-600">
                {b.name}
              </Link>
              <div className="mt-2 space-y-1.5">
                {b.pricingFacts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between text-sm">
                    <span className="text-ink-500">{f.label}</span>
                    <span className="text-ink-800 font-medium">{f.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <SourceCite url={b.sourceUrl} capturedAt={b.capturedAt} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {groups.map(([category, list]) => (
        <section key={category}>
          <h2 className="text-xl mb-3">{category}</h2>
          <div className="overflow-x-auto card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs text-ink-400">
                  <th className="p-3 font-medium">Competitor</th>
                  <th className="p-3 font-medium">Product</th>
                  <th className="p-3 font-medium">Price</th>
                  <th className="p-3 font-medium">Claims</th>
                  <th className="p-3 font-medium">Retailers</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => {
                  const c = getCompetitor(p.competitorId);
                  return (
                    <tr key={p.id} className="border-b border-ink-50 last:border-0 align-top">
                      <td className="p-3">
                        <Link href={`/competitors/${c?.slug}`} className="font-medium text-ink-900 hover:text-brass-600">
                          {c?.name}
                        </Link>
                      </td>
                      <td className="p-3 text-ink-700">{p.name}</td>
                      <td className="p-3">
                        <span className={p.priceVerified ? "text-ink-800 font-medium" : "text-ink-400 italic"}>{p.priceDisplay}</span>
                      </td>
                      <td className="p-3 text-ink-500">{p.claims.join("; ")}</td>
                      <td className="p-3 text-ink-500">{p.retailers.join(", ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
