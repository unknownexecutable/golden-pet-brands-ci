import type { StrategicMove } from "@/lib/types";

// A feed of real, press-confirmed strategic moves only — no speculative
// "possible launch" signals requiring sitemap/trademark monitoring this
// build doesn't have. Each entry is independently verifiable at its
// sourceUrl. Includes Golden Pet Brands' own moves for "Golden vs. Market"
// context, flagged via isGoldenBrand.
export const strategicMoves: StrategicMove[] = [
  {
    id: "move-nx-settlement",
    competitorId: "nutramax",
    isGoldenBrand: false,
    title: "Nutramax's $11.5M Cosequin false-advertising settlement reaches final approval hearing",
    eventDate: "2026-08-13",
    summary:
      "A class-action lawsuit alleged Nutramax falsely marketed Cosequin's joint-health, mobility, and cartilage-support benefits, citing peer-reviewed studies finding no evidence glucosamine/chondroitin improve canine joint health. The $11.5M settlement received preliminary court approval Feb 2, 2026; the final approval hearing was Aug 13, 2026 — six days before this brief.",
    whyItMatters:
      "Nutramax is the clinical-authority benchmark the entire joint-supplement category (including UPN) is implicitly measured against. A court-tested challenge to its core efficacy claims, this recently, is directly relevant to how UPN should word its own hip & joint claims.",
    sourceUrl: "https://www.classaction.org/news/11.5m-nutramax-settlement-ends-litigation-over-allegedly-falsely-advertised-cosequin-canine-supplements",
    sourceLabel: "classaction.org",
    confidence: 92,
    confidenceBand: "High"
  },
  {
    id: "move-fd-walmart",
    competitorId: "the-farmers-dog",
    isGoldenBrand: false,
    title: "The Farmer's Dog launches its first-ever retail partnership, on Walmart.com",
    eventDate: "2026-03-24",
    summary:
      "After nearly a decade as a DTC-subscription-only brand, The Farmer's Dog announced a Walmart.com launch for its personalized meal plans, live in April 2026 — giving it access to Walmart's roughly 150 million weekly shoppers. Walmart's VP of Pets called it \"their first launch into retail.\"",
    whyItMatters:
      "The brand that arguably defined the premium-DTC-subscription fresh-food category just proved mass retail and premium DTC positioning aren't mutually exclusive — directly relevant to Badlands Ranch's distribution roadmap and a live counter-example to Dr. Marty's DTC-only model.",
    sourceUrl: "https://www.petfoodindustry.com/news-newsletters/pet-food-news/news/15820583/the-farmers-dog-launches-on-walmartcom-with-personalized-meal-plans",
    sourceLabel: "Pet Food Industry",
    confidence: 93,
    confidenceBand: "High"
  },
  {
    id: "move-upn-psp",
    competitorId: "upn",
    isGoldenBrand: true,
    title: "Ultimate Pet Nutrition's largest retail expansion to date: 650 Pet Supplies Plus stores",
    eventDate: "2025-06-11",
    summary:
      "UPN announced Nutra Complete (freeze-dried food) and Nutra Thrive (daily supplement) would launch across 650 Pet Supplies Plus locations nationwide — its largest retail expansion to date and the first time Nutra Thrive has been available on a physical shelf rather than DTC-only.",
    whyItMatters:
      "This is Golden's own move, included for context: it puts UPN on the exact retail shelf Zesty Paws already dominates (see Strategy: Comprehensive, Multi-Benefit Formulas) and is the reason the Zesty Paws pricing/positioning comparison in this app matters operationally, not just academically.",
    sourceUrl: "https://www.prnewswire.com/news-releases/ultimate-pet-nutrition-nutra-complete-and-nutra-thrive-launch-in-650-pet-supplies-plus-stores-302478617.html",
    sourceLabel: "PR Newswire",
    confidence: 95,
    confidenceBand: "High"
  },
  {
    id: "move-gpb-petsource",
    competitorId: "upn",
    isGoldenBrand: true,
    title: "Golden Pet Brands acquired the Petsource manufacturing facility in Seward, Nebraska",
    eventDate: "2026-05-08",
    summary:
      "Golden Pet Brands — the standalone company formed from Dr. Marty Pets, Badlands Ranch, and Ultimate Pet Nutrition, spun out of Golden Hippo and headquartered in El Segundo — closed its acquisition of the Petsource production facility on May 8, 2026 (announced May 11), vertically integrating manufacturing for all three brands.",
    whyItMatters:
      "Vertical integration into manufacturing is a real structural advantage over DTC competitors who depend on co-packers — relevant context for how Golden can move faster than most of the competitors tracked here on reformulation or new-SKU speed.",
    sourceUrl: "https://www.petfoodindustry.com/production/pet-food-processing/news/15824988/golden-pet-brands-acquires-petsource-facility-in-nebraska",
    sourceLabel: "Pet Food Industry",
    confidence: 90,
    confidenceBand: "High"
  },
  {
    id: "move-gpb-dtc-award",
    competitorId: "upn",
    isGoldenBrand: true,
    title: "Golden Pet Brands swept the 2026 Pet Innovation Awards — 3 wins across all 3 brands",
    eventDate: "2026-08-11",
    summary:
      "On August 11, 2026 (8 days before this brief), Golden Pet Brands was named 2026 Pet DTC Company of the Year at the 8th Annual Pet Innovation Awards. Badlands Ranch's Superfood Complete won 2026 Dog Food Air Dried Product of the Year, and UPN's Nutra Complete won 2026 Dog Food Freeze Dried Product of the Year.",
    whyItMatters:
      "Independent, real, and very recent validation across all three brands at once — useful context when comparing Golden's current DTC playbook against competitors testing retail expansion, and a good reminder these wins are current, not historical.",
    sourceUrl: "https://www.petfoodindustry.com/news-newsletters/pet-food-news/news/15831983/2026-pet-innovation-awards-recognizes-top-pet-innovators",
    sourceLabel: "Pet Food Industry",
    confidence: 92,
    confidenceBand: "High"
  }
];

export function movesForCompetitor(id: string): StrategicMove[] {
  return strategicMoves.filter((m) => m.competitorId === id);
}

export function allMovesSorted(): StrategicMove[] {
  return [...strategicMoves].sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));
}
