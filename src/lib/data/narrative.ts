import type { NarrativeTerritory } from "@/lib/types";

// Presence and evidenceQuote are grounded in the real captures in
// competitors.ts / observations.ts. "trend" describes today's market
// STRUCTURE (how many real, strong occupants a territory has right now) —
// not a change over time, which this build cannot support honestly.
export const narrativeTerritories: NarrativeTerritory[] = [
  {
    id: "vet-authority",
    name: "Veterinary Authority",
    description: "Credibility built on formulation by, or endorsement from, a named veterinarian.",
    trend: "Crowded",
    trendRationale: "At least 4 of 12 tracked competitors make an explicit vet-authority claim today, across every price tier — see Strategy: Veterinary Authority Is Now Table Stakes.",
    occupants: [
      { competitorId: "instinct", presence: "Strong", evidenceQuote: "\"Vet-Formulated Recipes\" — homepage claim." },
      { competitorId: "sundays-for-dogs", presence: "Strong", evidenceQuote: "\"Vet-founded and formulated air-dried dog food.\"" },
      { competitorId: "fera-pet", presence: "Strong", evidenceQuote: "\"Vet the Label\" — crediting formulator Dr. Dulake." },
      { competitorId: "nutramax", presence: "Strong", evidenceQuote: "Markets almost entirely on clinical/vet-channel evidence (though now under legal scrutiny)." },
      { competitorId: "the-farmers-dog", presence: "Present", evidenceQuote: "Widely reported \"vet developed\" meal plans (third-party coverage)." }
    ]
  },
  {
    id: "certified-ingredient-quality",
    name: "Certified / Verifiable Ingredient Claims",
    description: "Ingredient-quality claims backed by a named, checkable standard rather than adjectives alone.",
    trend: "Contested",
    trendRationale: "A handful of competitors hold real, named certifications; most tracked competitors (and both Badlands Ranch and Dr. Marty) currently rely on descriptive language without a third-party-checkable standard.",
    occupants: [
      { competitorId: "honest-kitchen", presence: "Strong", evidenceQuote: "\"The first human grade pet food\"; made in a human food facility; B Corp certified." },
      { competitorId: "open-farm", presence: "Strong", evidenceQuote: "OceanWise, Certified Humane, and B Corp certifications; \"100% traceable\" claim." },
      { competitorId: "the-farmers-dog", presence: "Present", evidenceQuote: "Human-grade, USDA facility, AAFCO-compliant (per third-party coverage)." },
      { competitorId: "ollie", presence: "Present", evidenceQuote: "\"Human-grade recipes developed with vets and chefs\"; USDA meats." },
      { competitorId: "fera-pet", presence: "Present", evidenceQuote: "Public Certificate of Analysis lookup for batch-level verification." }
    ]
  },
  {
    id: "comprehensive-supplement-formulas",
    name: "Comprehensive / Multi-Benefit Supplement Formulas",
    description: "Supplement brands built around one broad formula or catalog spanning joint, gut, skin/coat, and immune support at once.",
    trend: "Contested",
    trendRationale: "Two real structural approaches are visible today: one broad catalog under one brand (Zesty Paws) vs. one multi-ingredient jar (Fera Pets, and UPN's own Nutra Thrive).",
    occupants: [
      { competitorId: "zesty-paws", presence: "Strong", evidenceQuote: "Product range spans immune, gut health, joint mobility, skin/coat, and behavior." },
      { competitorId: "fera-pet", presence: "Present", evidenceQuote: "Blends \"Eastern and Western\" ingredient philosophies across joint, probiotic, mushroom, and fiber products." },
      { competitorId: "petlab-co", presence: "Emerging", evidenceQuote: "Single-benefit chews (hip & joint) remain its core catalog today; no comprehensive multi-system formula observed." },
      { competitorId: "nutramax", presence: "Not Observed", evidenceQuote: "Cosequin/Dasuquin are single-purpose joint formulas, not comprehensive multi-system products." }
    ]
  },
  {
    id: "current-promotional-depth",
    name: "Deep First-Order Discounting",
    description: "How aggressive each brand's publicly visible first-order offer is, right now.",
    trend: "Crowded",
    trendRationale: "Most DTC-subscription competitors tracked here are running a 25%+ first-order offer today; this reflects a single snapshot, not a measured escalation.",
    occupants: [
      { competitorId: "open-farm", presence: "Strong", evidenceQuote: "4 simultaneous offers, up to 50% off select freeze-dried recipes." },
      { competitorId: "ollie", presence: "Strong", evidenceQuote: "\"50% off your first box\" plus free items." },
      { competitorId: "honest-kitchen", presence: "Present", evidenceQuote: "Time-boxed 20% sitewide (Aug 17–21) + standing 35% subscription code." },
      { competitorId: "sundays-for-dogs", presence: "Present", evidenceQuote: "\"30% off first box for new subscribers.\"" },
      { competitorId: "stella-chewys", presence: "Present", evidenceQuote: "25% off + free bundle, tied to National Dog Day (Aug 26)." },
      { competitorId: "ziwi-peak", presence: "Not Observed", evidenceQuote: "No discount codes or promotional pricing visible on the homepage at capture time." }
    ]
  },
  {
    id: "mass-retail-distribution",
    name: "Mass Retail Distribution (beyond DTC)",
    description: "Presence in big-box or mass retail (Walmart, Costco, Target, Petco/PetSmart) rather than DTC-only.",
    trend: "Contested",
    trendRationale: "Several competitors already have deep retail distribution; The Farmer's Dog's 2026 Walmart launch is the most significant real recent shift from DTC-only toward mass retail.",
    occupants: [
      { competitorId: "zesty-paws", presence: "Strong", evidenceQuote: "Costco, Amazon, Chewy, Walmart, Petco." },
      { competitorId: "instinct", presence: "Strong", evidenceQuote: "PetSmart, Petco, Chewy, Amazon, grocery." },
      { competitorId: "nutramax", presence: "Strong", evidenceQuote: "Veterinary clinics, Chewy, Amazon, Walmart." },
      { competitorId: "the-farmers-dog", presence: "Emerging", evidenceQuote: "First-ever retail partner (Walmart.com) launched April 2026, after a decade DTC-only." },
      { competitorId: "sundays-for-dogs", presence: "Emerging", evidenceQuote: "Target and Chewy alongside its core DTC subscription." },
      { competitorId: "ollie", presence: "Not Observed", evidenceQuote: "DTC subscription only; no retail distribution observed." }
    ]
  }
];

export function getTerritory(id: string): NarrativeTerritory | undefined {
  return narrativeTerritories.find((t) => t.id === id);
}
