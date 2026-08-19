import type { GoldenBrandId, StrategicMove } from "@/lib/types";

// A feed of real, press-confirmed strategic moves only — no speculative
// "possible launch" signals requiring sitemap/trademark monitoring this
// build doesn't have. Each entry is independently verifiable at its
// sourceUrl. Includes Golden Pet Brands' own moves for "Golden vs. Market"
// context, flagged via isGoldenBrand + relatedGoldenBrands.
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
      "The brand that arguably defined the premium-DTC-subscription fresh-food category just proved mass retail and premium DTC positioning aren't mutually exclusive — directly relevant to Badlands Ranch's distribution roadmap, and consistent with the same DTC-to-retail path all three Golden Pet Brands have already taken (independents in 2021, Petco nationally in 2026, per goldenpetbrands.com).",
    sourceUrl: "https://www.petfoodindustry.com/news-newsletters/pet-food-news/news/15820583/the-farmers-dog-launches-on-walmartcom-with-personalized-meal-plans",
    sourceLabel: "Pet Food Industry",
    confidence: 93,
    confidenceBand: "High"
  },
  {
    id: "move-upn-psp",
    competitorId: "golden-pet-brands",
    isGoldenBrand: true,
    relatedGoldenBrands: ["upn"],
    title: "Ultimate Pet Nutrition's largest retail expansion to date: 650 Pet Supplies Plus stores",
    eventDate: "2025-06-11",
    summary:
      "UPN announced Nutra Complete (freeze-dried food) and Nutra Thrive (daily supplement) would launch across 650 Pet Supplies Plus locations nationwide — its largest retail expansion to date at the time, and reportedly the first time Nutra Thrive had reached a physical retail shelf rather than DTC/e-commerce only.",
    whyItMatters:
      "This is Golden's own move, included for context: it puts UPN on the exact retail shelf Zesty Paws already dominates (see Strategy: Comprehensive, Multi-Benefit Formulas) and is the reason the Zesty Paws pricing/positioning comparison in this app matters operationally, not just academically.",
    sourceUrl: "https://www.prnewswire.com/news-releases/ultimate-pet-nutrition-nutra-complete-and-nutra-thrive-launch-in-650-pet-supplies-plus-stores-302478617.html",
    sourceLabel: "PR Newswire",
    confidence: 95,
    confidenceBand: "High"
  },
  {
    id: "move-gpb-petco-national",
    competitorId: "golden-pet-brands",
    isGoldenBrand: true,
    relatedGoldenBrands: ["dr-marty", "badlands-ranch", "upn"],
    title: "All three Golden brands entered national pet specialty retail (Petco) in 2026",
    eventDate: "2026", // Golden's own page states only the year, not a specific date — shown as-is rather than inventing day-level precision
    summary:
      "Per Golden Pet Brands' own official \"About\" page: \"The brands launched direct-to-consumer, then entered retail through neighborhood and independent pet stores in 2021 and national pet specialty, including Petco, in 2026.\" Exact month not specified. This means none of Golden's three brands is DTC-only today — Dr. Marty Pets, Badlands Ranch, and Ultimate Pet Nutrition are all sold at Petco (and, per brand, also Amazon/Chewy).",
    whyItMatters:
      "This directly reframes how to read every competitor DTC-to-retail move in this dataset (e.g. The Farmer's Dog's Walmart launch): Golden's own brands already made a comparable, deliberate, staged transition from DTC-only to national retail — this isn't a gap Golden needs to close, it's a transition Golden already executed.",
    sourceUrl: "https://goldenpetbrands.com/about.html",
    sourceLabel: "goldenpetbrands.com (official About page)",
    confidence: 96,
    confidenceBand: "High"
  },
  {
    id: "move-gpb-petsource",
    competitorId: "golden-pet-brands",
    isGoldenBrand: true,
    relatedGoldenBrands: ["dr-marty", "badlands-ranch", "upn"],
    title: "Golden Pet Brands acquired the Petsource manufacturing facility in Seward, Nebraska",
    eventDate: "2026-05-08",
    summary:
      "Golden Pet Brands — the vertically integrated pet nutrition company (formerly Golden Hippo Holdco Inc.) that owns Dr. Marty Pets, Badlands Ranch, and Ultimate Pet Nutrition, headquartered in El Segundo, CA — closed its acquisition of the 170,000-sq-ft Petsource production facility on May 8, 2026 (announced May 11). The SQF-certified, FDA-registered site brings ~100 employees into Golden Pet Manufacturing and becomes Golden's second owned U.S. facility alongside its BRC AA+ rated Germantown, Wisconsin plant.",
    whyItMatters:
      "Vertical integration into manufacturing is a real structural advantage over DTC competitors who depend on co-packers — relevant context for how Golden can move faster than most of the competitors tracked here on reformulation or new-SKU speed.",
    sourceUrl: "https://goldenpetbrands.com/newsroom.html",
    sourceLabel: "goldenpetbrands.com (official Newsroom)",
    confidence: 96,
    confidenceBand: "High"
  },
  {
    id: "move-gpb-leadership",
    competitorId: "golden-pet-brands",
    isGoldenBrand: true,
    relatedGoldenBrands: ["dr-marty", "badlands-ranch", "upn"],
    title: "Golden Pet Brands named a new CEO and CFO, completing its leadership team",
    eventDate: "2026-04-30",
    summary:
      "Golden Pet Brands announced Apu Mody as CEO (25+ years in CPG, previously President of Mars Food Americas and Middle East, and SVP/Managing Director of Consumer Products at Del Monte Foods) and John Meloun as CFO (previously CFO at Xponential Fitness for ~8 years). Per goldenpetbrands.com/leadership, the full executive team also includes Alex Block (CMO), Hayley Hicks (VP Technology), Luke Koele (VP Manufacturing), Andrew Klucznik (VP Operations), and Dan Markenson (VP Retail).",
    whyItMatters:
      "A newly completed, CPG-veteran leadership team (rather than founder-led) is a real signal of Golden's next phase — worth knowing before any competitive brief reaches the CEO's desk, since Apu Mody is that CEO.",
    sourceUrl: "https://goldenpetbrands.com/leadership.html",
    sourceLabel: "goldenpetbrands.com (official Leadership page)",
    confidence: 97,
    confidenceBand: "High"
  },
  {
    id: "move-gpb-dtc-award",
    competitorId: "golden-pet-brands",
    isGoldenBrand: true,
    relatedGoldenBrands: ["badlands-ranch", "upn"],
    title: "Golden Pet Brands swept the 2026 Pet Innovation Awards — 3 wins across the portfolio",
    eventDate: "2026-08-11",
    summary:
      "On August 11, 2026 (8 days before this brief), Golden Pet Brands was named 2026 Pet DTC Company of the Year at the 8th Annual Pet Innovation Awards. Badlands Ranch's Superfood Complete won 2026 Dog Food Air Dried Product of the Year, and UPN's Nutra Complete won 2026 Dog Food Freeze Dried Product of the Year. (Not yet listed on Golden's own Newsroom page as of this brief — sourced independently via Pet Food Industry / PR Newswire.)",
    whyItMatters:
      "Independent, real, and very recent validation across the portfolio — useful context when comparing Golden's current DTC-plus-retail playbook against competitors testing their own retail expansion.",
    sourceUrl: "https://www.prnewswire.com/news-releases/golden-pet-brands-named-2026-pet-dtc-company-of-the-year-in-8th-annual-pet-innovation-awards-302847950.html",
    sourceLabel: "PR Newswire",
    confidence: 90,
    confidenceBand: "High"
  }
];

export function movesForCompetitor(id: string): StrategicMove[] {
  return strategicMoves.filter((m) => m.competitorId === id);
}

export function movesForGoldenBrand(brandId: GoldenBrandId): StrategicMove[] {
  return strategicMoves.filter((m) => m.isGoldenBrand && m.relatedGoldenBrands?.includes(brandId));
}

export function allMovesSorted(): StrategicMove[] {
  return [...strategicMoves].sort((a, b) => (a.eventDate < b.eventDate ? 1 : -1));
}
