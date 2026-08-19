import type { Strategy } from "@/lib/types";

// Every "evidenceQuote" below is a real excerpt captured from the named
// sourceUrl on 2026-08-19 (see src/lib/data/competitors.ts and
// src/lib/data/observations.ts for the underlying captures). These
// strategies describe TODAY's observable positioning across competitors —
// not a trend over time, since this build has no historical monitoring.
export const strategies: Strategy[] = [
  {
    id: "vet-authority-table-stakes",
    slug: "vet-authority-table-stakes",
    name: "Veterinary Authority Is Now Table Stakes",
    category: "Positioning",
    description:
      "A veterinarian-formulated or vet-founded claim currently appears across most tracked competitors regardless of format or price tier. As of today, this makes vet authority a category baseline rather than a differentiator — which matters directly to Dr. Marty and UPN, both of whom lead with exactly this claim.",
    competitors: [
      { competitorId: "sundays-for-dogs", emphasis: "Core Pillar", evidenceQuote: "\"Vet-founded and formulated air-dried dog food\" — homepage claim.", sourceUrl: "https://sundaysfordogs.com" },
      { competitorId: "instinct", emphasis: "Core Pillar", evidenceQuote: "\"Vet-Formulated Recipes\" — homepage claim, paired with proprietary SafeRaw™ testing.", sourceUrl: "https://www.instinctpetfood.com" },
      { competitorId: "fera-pet", emphasis: "Core Pillar", evidenceQuote: "\"Vet the Label\" — secondary homepage message crediting formulator Dr. Dulake.", sourceUrl: "https://www.ferapets.com" },
      { competitorId: "the-farmers-dog", emphasis: "Present", evidenceQuote: "Widely reported as \"vet developed\" fresh meal plans in third-party coverage.", sourceUrl: "https://www.petfoodindustry.com/news-newsletters/pet-food-news/news/15820583/the-farmers-dog-launches-on-walmartcom-with-personalized-meal-plans" }
    ],
    channelsObserved: ["Website", "Press / Legal"],
    confidence: 88,
    confidenceBand: "High",
    goldenExposure: [
      { brandId: "dr-marty", level: "High", rationale: "Dr. Marty's entire brand rests on \"Vet-Designed\" authority; that claim is now shared by at least 4 tracked competitors across every price tier." },
      { brandId: "upn", level: "High", rationale: "UPN's Dr. Gary Richter formulation claim faces the same crowding, compounded by Nutramax's 2026 settlement putting the whole category's clinical-authority claims under a harsher spotlight." }
    ],
    analystNote:
      "Being vet-formulated no longer separates a brand from the pack — it separates a brand from the handful of competitors who don't claim it at all. Differentiation likely needs to come from what the vet-authority claim is used to say (a specific mechanism, a named formulator, a public evidence standard), not the claim itself."
  },
  {
    id: "comprehensive-multi-benefit-formulas",
    slug: "comprehensive-multi-benefit-formulas",
    name: "Comprehensive, Multi-Benefit Formulas Over Single-Purpose Products",
    category: "Product",
    description:
      "Rather than selling narrow, single-benefit chews, several supplement competitors are currently built around one broad formula (or a broad catalog) spanning joint, gut, skin/coat, and immune support at once — the same structural bet UPN's Nutra Thrive already makes.",
    competitors: [
      { competitorId: "zesty-paws", emphasis: "Core Pillar", evidenceQuote: "Product range spans \"immune support, gut health, joint mobility, skin/coat, and behavior\" in one catalog.", sourceUrl: "https://www.zestypaws.com" },
      { competitorId: "fera-pet", emphasis: "Prominent", evidenceQuote: "Blends \"Eastern and Western\" ingredient philosophies across joint, probiotic, mushroom, and fiber products under one formulator's name.", sourceUrl: "https://www.ferapets.com" }
    ],
    channelsObserved: ["Website", "Product"],
    confidence: 78,
    confidenceBand: "Medium",
    goldenExposure: [
      { brandId: "upn", level: "Very High", rationale: "This is the exact structural bet Nutra Thrive makes (30+ actives, one jar). Zesty Paws proves the same bet can also work as a broad catalog at a much lower price point — the real question for UPN is which structure wins at retail." }
    ],
    analystNote:
      "Two different versions of \"comprehensive\" are competing: one jar with many actives (UPN, Fera Pets) vs. one broad catalog of single-purpose products under one brand (Zesty Paws). Worth a deliberate point of view on which model UPN is actually betting on as it enters Pet Supplies Plus shelves next to both."
  },
  {
    id: "certified-human-grade-claims",
    slug: "certified-human-grade-claims",
    name: "Certified / Verifiable Ingredient-Quality Claims",
    category: "Positioning",
    description:
      "A subset of competitors back their ingredient-quality claims with a named, checkable standard (certified human-grade, third-party certifications, public Certificate-of-Analysis lookups) rather than adjective-only language like \"clean\" or \"natural.\"",
    competitors: [
      { competitorId: "honest-kitchen", emphasis: "Core Pillar", evidenceQuote: "\"The first human grade pet food\" (est. 2002), made in a human food facility, B Corp certified.", sourceUrl: "https://www.thehonestkitchen.com" },
      { competitorId: "open-farm", emphasis: "Prominent", evidenceQuote: "\"100% traceable, ethically sourced recipes\" with OceanWise, Certified Humane, and B Corp certifications.", sourceUrl: "https://openfarmpet.com" },
      { competitorId: "fera-pet", emphasis: "Present", evidenceQuote: "Public Certificate of Analysis lookup for batch-level ingredient verification.", sourceUrl: "https://www.ferapets.com" }
    ],
    channelsObserved: ["Website"],
    confidence: 85,
    confidenceBand: "High",
    goldenExposure: [
      { brandId: "badlands-ranch", level: "High", rationale: "Badlands' current \"clean, no fillers/artificial additives\" language is adjective-based, not certification-based — Honest Kitchen and Open Farm are both making sharper, third-party-checkable versions of a similar promise." },
      { brandId: "dr-marty", level: "Medium", rationale: "Same gap: \"biologically appropriate\" is a claim, not a certification." }
    ],
    analystNote:
      "The gap between \"we say it's clean\" and \"a third party can verify it's clean\" is real and currently open — Honest Kitchen and Open Farm own the certified end of this spectrum, and neither Golden brand currently holds an equivalent named certification."
  },
  {
    id: "current-promotional-intensity",
    slug: "current-promotional-intensity",
    name: "Current Promotional Intensity Snapshot",
    category: "Pricing & Promotion",
    description:
      "As of today, several competitors are running unusually deep or explicitly time-boxed first-order discounts simultaneously. This is a single-point-in-time snapshot, not a measured trend — a second check weeks from now would be needed to say whether any of this is escalating.",
    competitors: [
      { competitorId: "open-farm", emphasis: "Core Pillar", evidenceQuote: "Four simultaneous offers live at once: up to 25% off Autoship, 20% off first order, 25%+free shipping on cat, 50% off select freeze-dried.", sourceUrl: "https://openfarmpet.com" },
      { competitorId: "ollie", emphasis: "Prominent", evidenceQuote: "\"50% off your first box\" plus free puzzle and treats.", sourceUrl: "https://www.ollie.com" },
      { competitorId: "honest-kitchen", emphasis: "Prominent", evidenceQuote: "Explicitly dated 20% sitewide discount (8/17–8/21) stacked with a standing 35%-off subscription code.", sourceUrl: "https://www.thehonestkitchen.com" },
      { competitorId: "sundays-for-dogs", emphasis: "Present", evidenceQuote: "\"30% off first box for new subscribers.\"", sourceUrl: "https://sundaysfordogs.com" }
    ],
    channelsObserved: ["Pricing", "Website"],
    confidence: 90,
    confidenceBand: "High",
    goldenExposure: [
      { brandId: "badlands-ranch", level: "Medium", rationale: "Multiple format-adjacent competitors are currently offering 30-50% first-order discounts, well above Badlands' member pricing depth (~32%)." },
      { brandId: "dr-marty", level: "Medium", rationale: "Open Farm's stacked 50%-off freeze-dried offer is a real current price signal in Dr. Marty's exact format." }
    ],
    analystNote:
      "This is real, current pricing pressure — but calling it \"escalation\" would require a second observation weeks apart to confirm, which this build intentionally does not fabricate. Treat this as a benchmark to re-check, not a confirmed trend."
  },
  {
    id: "dtc-testing-mass-retail",
    slug: "dtc-testing-mass-retail",
    name: "Premium DTC Brands Are Testing Mass Retail",
    category: "Distribution",
    description:
      "The Farmer's Dog — arguably the brand that defined the premium-DTC-subscription playbook for fresh pet food — broke from that model for the first time in 2026, launching on Walmart.com. This is the single clearest real distribution-strategy signal in the current dataset.",
    competitors: [
      { competitorId: "the-farmers-dog", emphasis: "Core Pillar", evidenceQuote: "\"The Farmer's Dog launches on Walmart.com with personalized meal plans\" — first retail partnership after a decade DTC-only, announced March 24, 2026.", sourceUrl: "https://www.petfoodindustry.com/news-newsletters/pet-food-news/news/15820583/the-farmers-dog-launches-on-walmartcom-with-personalized-meal-plans" }
    ],
    channelsObserved: ["Retail", "Press / Legal"],
    confidence: 82,
    confidenceBand: "High",
    goldenExposure: [
      { brandId: "badlands-ranch", level: "High", rationale: "Badlands already sells through Chewy and Amazon; this is real evidence that mass big-box retail is viable for a premium DTC-rooted brand without diluting the brand story." },
      { brandId: "dr-marty", level: "Medium", rationale: "Dr. Marty remains the only major tracked brand still fully DTC-only — worth an explicit, deliberate decision on whether that stays a strength or becomes a growth ceiling." }
    ],
    analystNote:
      "One real, well-documented data point — not yet a \"trend\" with multiple competitors, but a significant single mover worth tracking for a second example before calling this a category pattern."
  }
];

export function getStrategy(idOrSlug: string): Strategy | undefined {
  return strategies.find((s) => s.id === idOrSlug || s.slug === idOrSlug);
}

export function strategiesForCompetitor(competitorId: string): Strategy[] {
  return strategies.filter((s) => s.competitors.some((c) => c.competitorId === competitorId));
}
