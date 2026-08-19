import type { CompetitorRelationship, RelevanceBreakdown } from "@/lib/types";
import { relevanceBand, relevanceScore } from "@/lib/scoring";

// This is an analytical scoring methodology (see src/lib/scoring.ts for the
// weighting) applied to real, researched category/customer/distribution
// facts about each brand. Price-overlap rationale is deliberately phrased in
// terms of published price TIER (Value/Premium/Super-Premium — a real,
// sourced classification per competitor) rather than unverified per-ounce
// comparisons this build has no live pricing feed to support.
function rel(
  competitorId: string,
  goldenBrandId: CompetitorRelationship["goldenBrandId"],
  primaryOverlapCategory: string,
  breakdown: RelevanceBreakdown
): CompetitorRelationship {
  const score = relevanceScore(breakdown);
  return {
    competitorId,
    goldenBrandId,
    breakdown,
    score,
    band: relevanceBand(score),
    primaryOverlapCategory
  };
}

export const relationships: CompetitorRelationship[] = [
  rel("stella-chewys", "dr-marty", "Freeze-dried raw, retail-adjacent DTC", {
    categoryOverlap: 29,
    customerOverlap: 19,
    priceOverlap: 12,
    marketingOverlap: 9,
    retailOverlap: 6,
    searchOverlap: 5,
    rationale: {
      category: "Same core format (freeze-dried raw) for dogs and cats.",
      customer: "Overlapping owner profile: raw-curious, ingredient-focused, willing to pay a premium.",
      price: "Both classified Premium/Super-Premium tier; Stella & Chewy's current freeze-dried SKUs run $35.99–$39.99 vs. Dr. Marty's $59.95 (pre-discount) — same tier, Dr. Marty priced higher.",
      marketing: "Both lean on ingredient/quality claims; Stella & Chewy's uses less direct-response advertorial.",
      retail: "Stella & Chewy's broad retail shelf presence indirectly competes for the same purchase occasion Dr. Marty pulls online.",
      search: "Frequent co-occurrence in \"best freeze-dried dog food\" search and comparison content."
    }
  }),
  rel("open-farm", "dr-marty", "Freeze-dried + traceability positioning", {
    categoryOverlap: 26,
    customerOverlap: 20,
    priceOverlap: 11,
    marketingOverlap: 10,
    retailOverlap: 5,
    searchOverlap: 4,
    rationale: {
      category: "Freeze-dried raw line competes directly; fresh/kibble lines partially overlap.",
      customer: "Same health- and ingredient-conscious buyer, skews slightly younger/urban than Dr. Marty's core.",
      price: "Both classified Premium tier; Open Farm's current homepage runs 4 simultaneous discount codes (up to 50% off select freeze-dried) vs. Dr. Marty's standing up-to-55%-with-account model — similar depth, different mechanics.",
      marketing: "Both foreground formulation credibility, though Open Farm emphasizes sourcing/sustainability over vet authority.",
      retail: "Petco and independent specialty presence Dr. Marty does not have.",
      search: "Moderate keyword overlap on \"raw-inspired\" and \"ancestral diet\" terms."
    }
  }),
  rel("ziwi-peak", "dr-marty", "Super-premium air/freeze-dried raw", {
    categoryOverlap: 24,
    customerOverlap: 17,
    priceOverlap: 14,
    marketingOverlap: 7,
    retailOverlap: 5,
    searchOverlap: 3,
    rationale: {
      category: "High-inclusion raw/air-dried format overlaps freeze-dried on occasion and shelf placement.",
      customer: "Very similar willingness-to-pay and raw-feeding mindset.",
      price: "Both classified Super-Premium tier — the closest price-tier match among Dr. Marty's tracked competitors.",
      marketing: "ZIWI leans on ingredient percentage and NZ sourcing rather than clinical/vet authority.",
      retail: "Available at Chewy/Amazon/specialty where Dr. Marty is absent.",
      search: "Some overlap in \"high meat content\" search terms."
    }
  }),
  rel("honest-kitchen", "dr-marty", "Whole-food, minimally processed", {
    categoryOverlap: 17,
    customerOverlap: 15,
    priceOverlap: 10,
    marketingOverlap: 6,
    retailOverlap: 5,
    searchOverlap: 3,
    rationale: {
      category: "Dehydrated whole-food format is adjacent to, not identical to, freeze-dried.",
      customer: "Shares the ingredient-quality-motivated buyer, less clinically-focused than Dr. Marty's.",
      price: "Both classified Premium tier, one step below Dr. Marty's Super-Premium.",
      marketing: "Human-grade certification is a differentiated, third-party-checkable claim Dr. Marty does not currently make.",
      retail: "Both DTC and retail; partial overlap in owned-channel funnels.",
      search: "Light overlap on \"human grade dog food\" queries."
    }
  }),
  rel("instinct", "dr-marty", "Freeze-dried raw (product line only)", {
    categoryOverlap: 20,
    customerOverlap: 10,
    priceOverlap: 9,
    marketingOverlap: 3,
    retailOverlap: 6,
    searchOverlap: 3,
    rationale: {
      category: "Instinct Freeze-Dried Raw line matches format directly; the broader Instinct kibble line does not.",
      customer: "Instinct's retail buyer is more price-sensitive and less DTC/advertorial-driven than Dr. Marty's.",
      price: "Instinct's published freeze-dried range ($8.99–$24.99) sits well below Dr. Marty's Super-Premium tier — a Premium-tier, big-box-distributed product.",
      marketing: "Minimal advertorial or direct-response overlap; Instinct relies on retail merchandising.",
      retail: "Deep big-box distribution Dr. Marty does not participate in.",
      search: "Limited keyword overlap outside the freeze-dried category term itself."
    }
  }),
  rel("the-farmers-dog", "dr-marty", "Premium DTC subscription funnel", {
    categoryOverlap: 12,
    customerOverlap: 18,
    priceOverlap: 9,
    marketingOverlap: 10,
    retailOverlap: 1,
    searchOverlap: 4,
    rationale: {
      category: "Different format (fresh, gently cooked) but same \"replace the bag of kibble\" positioning.",
      customer: "Strong overlap in health-motivated, willing-to-subscribe owner segment.",
      price: "Both Super-Premium tier; The Farmer's Dog's published per-day cost ($6.81–$12.88) implies a materially higher monthly spend than Dr. Marty's per-bag pricing.",
      marketing: "Near-identical DTC funnel mechanics: quiz, subscription, vet-credibility content.",
      retail: "The Farmer's Dog just added its first retail channel (Walmart.com, Apr 2026); Dr. Marty remains DTC-only.",
      search: "Both compete for \"fresh dog food\" / \"healthier dog food\" search intent."
    }
  }),

  rel("sundays-for-dogs", "badlands-ranch", "Air-dried DTC subscription", {
    categoryOverlap: 30,
    customerOverlap: 20,
    priceOverlap: 13,
    marketingOverlap: 11,
    retailOverlap: 6,
    searchOverlap: 5,
    rationale: {
      category: "Identical format: air-dried, positioned as a simpler alternative to kibble and raw.",
      customer: "Same mainstream premium buyer, both leaning on trust/clean-label rather than clinical framing.",
      price: "Both classified Premium tier with directly comparable first-order offers (Sundays: 30% off; Badlands: ~32% member pricing).",
      marketing: "Both run DTC subscription funnels with similar clean-ingredient messaging; Sundays currently makes a sharper direct price-vs-fresh argument.",
      retail: "Sundays is in Target; Badlands is in Chewy/Amazon — adjacent but not identical shelf presence.",
      search: "High overlap on \"air-dried dog food\" search terms."
    }
  }),
  rel("ziwi-peak", "badlands-ranch", "Air-dried, super-premium", {
    categoryOverlap: 24,
    customerOverlap: 14,
    priceOverlap: 8,
    marketingOverlap: 6,
    retailOverlap: 6,
    searchOverlap: 4,
    rationale: {
      category: "ZIWI's air-dried line is a direct format match.",
      customer: "ZIWI's buyer skews more raw-feeding-committed and less mainstream than Badlands' celebrity-driven audience.",
      price: "ZIWI is Super-Premium tier vs. Badlands' Premium tier — a step above on price positioning.",
      marketing: "Different appeal: ingredient percentage vs. celebrity trust.",
      retail: "Both sold at Chewy/Amazon.",
      search: "Moderate overlap on \"air-dried dog food\" queries."
    }
  }),
  rel("honest-kitchen", "badlands-ranch", "Clean-label whole food", {
    categoryOverlap: 20,
    customerOverlap: 16,
    priceOverlap: 10,
    marketingOverlap: 7,
    retailOverlap: 5,
    searchOverlap: 3,
    rationale: {
      category: "Dehydrated whole-food format closely parallels air-drying in consumer perception.",
      customer: "Similar clean-label-motivated mainstream buyer.",
      price: "Both classified Premium tier.",
      marketing: "Honest Kitchen's certified human-grade claim is a sharper, third-party-checkable claim than Badlands' \"clean ingredient\" language.",
      retail: "Both DTC plus specialty/Chewy.",
      search: "Overlap on \"clean ingredient dog food\" terms."
    }
  }),
  rel("the-farmers-dog", "badlands-ranch", "Premium DTC subscription", {
    categoryOverlap: 14,
    customerOverlap: 17,
    priceOverlap: 6,
    marketingOverlap: 9,
    retailOverlap: 1,
    searchOverlap: 3,
    rationale: {
      category: "Different format (fresh vs. air-dried) but same subscription replacement pitch.",
      customer: "Overlaps on trust-seeking, mainstream-premium owners; Farmer's Dog skews more clinically framed.",
      price: "The Farmer's Dog is Super-Premium tier vs. Badlands' Premium tier — a meaningfully higher published per-day cost.",
      marketing: "Comparable funnel structure (quiz, plan, subscription).",
      retail: "The Farmer's Dog just added Walmart.com; Badlands is already on Chewy/Amazon.",
      search: "Light keyword overlap."
    }
  }),
  rel("ollie", "badlands-ranch", "Fresh DTC subscription", {
    categoryOverlap: 12,
    customerOverlap: 14,
    priceOverlap: 7,
    marketingOverlap: 8,
    retailOverlap: 1,
    searchOverlap: 2,
    rationale: {
      category: "Fresh format differs from air-dried but same \"upgrade from kibble\" pitch.",
      customer: "Comparable mainstream-premium household.",
      price: "Both Premium tier; Ollie's current 50%-off first-box offer is deeper than Badlands' standing member pricing.",
      marketing: "Similar quiz-driven personalization funnel; Ollie leans on quantified outcome statistics (e.g. \"75% see improvements within 30 days\").",
      retail: "Neither in traditional retail.",
      search: "Minor overlap."
    }
  }),
  rel("open-farm", "badlands-ranch", "Ingredient-quality positioning", {
    categoryOverlap: 10,
    customerOverlap: 12,
    priceOverlap: 8,
    marketingOverlap: 7,
    retailOverlap: 5,
    searchOverlap: 2,
    rationale: {
      category: "Mostly different formats; overlap concentrated in Open Farm's freeze-dried toppers.",
      customer: "Some overlap in ingredient-conscious mainstream buyers.",
      price: "Both classified Premium tier.",
      marketing: "Both message on clean, traceable ingredients; Open Farm backs it with named third-party certifications (OceanWise, Certified Humane, B Corp).",
      retail: "Both at Chewy/Amazon.",
      search: "Minor overlap."
    }
  }),

  rel("petlab-co", "upn", "DTC direct-response supplements", {
    categoryOverlap: 27,
    customerOverlap: 20,
    priceOverlap: 12,
    marketingOverlap: 12,
    retailOverlap: 4,
    searchOverlap: 5,
    rationale: {
      category: "Same core categories: joint, gut health, multi-benefit chews.",
      customer: "Nearly identical DTC-acquired buyer profile.",
      price: "PetLab's published $25–$30/product with ~25% subscription savings sits close to Nutra Thrive's per-jar pricing before UPN's deeper volume tiers.",
      marketing: "PetLab's current tagline is explicitly \"no hyperbole, no unsupported health claims\" — a direct positioning contrast worth being aware of.",
      retail: "PetLab's Walmart/Amazon presence exceeds UPN's current retail footprint.",
      search: "High overlap on \"dog joint supplement\" and \"dog probiotic\" terms."
    }
  }),
  rel("zesty-paws", "upn", "Retail supplement shelf leader", {
    categoryOverlap: 27,
    customerOverlap: 16,
    priceOverlap: 10,
    marketingOverlap: 6,
    retailOverlap: 8,
    searchOverlap: 5,
    rationale: {
      category: "Directly overlapping categories across joint, gut, multivitamin, and skin/coat.",
      customer: "Zesty Paws skews more price-driven/retail-browsing vs. UPN's DTC-educated buyer, but converges as UPN enters retail.",
      price: "Zesty Paws is Value tier ($16.97–$42.97 published range) vs. UPN's Premium tier ($69.95/jar) — the clearest price-tier gap in this dataset.",
      marketing: "Zesty Paws relies on retail merchandising and its \"Led by Science\" tagline rather than direct-response video.",
      retail: "The single most relevant comparison for UPN's Pet Supplies Plus expansion — Zesty Paws already owns that shelf broadly.",
      search: "High overlap across supplement category search terms."
    }
  }),
  rel("nutramax", "upn", "Vet-authority joint supplement", {
    categoryOverlap: 18,
    customerOverlap: 13,
    priceOverlap: 11,
    marketingOverlap: 4,
    retailOverlap: 5,
    searchOverlap: 4,
    rationale: {
      category: "Overlaps specifically in joint health, not UPN's broader multi-system formula.",
      customer: "Nutramax's buyer is more often vet-directed; UPN's is more self-directed via DTC content.",
      price: "Comparable Premium-tier pricing (Dasuquin $54.99–$59.99 vs. Nutra Thrive $69.95 one-time / lower per-unit when subscribed).",
      marketing: "Nutramax markets almost entirely on clinical evidence — the credibility bar UPN's vet-formulation claim is implicitly measured against, now complicated by Nutramax's 2026 settlement.",
      retail: "Both at Chewy/Amazon; Nutramax's core channel is the vet clinic, which UPN does not have.",
      search: "Moderate overlap on \"joint supplement for dogs\" queries."
    }
  }),
  rel("fera-pet", "upn", "Vet-formulated wellness", {
    categoryOverlap: 20,
    customerOverlap: 15,
    priceOverlap: 10,
    marketingOverlap: 7,
    retailOverlap: 3,
    searchOverlap: 3,
    rationale: {
      category: "Comparable multi-category supplement range (gut, joint, skin/coat).",
      customer: "Similar DTC-educated, wellness-motivated buyer, smaller scale.",
      price: "Both Premium tier; Fera's per-product pricing ($29.95–$39.95) runs below UPN's $69.95 comprehensive-jar price.",
      marketing: "Both message on veterinary formulation (Fera: \"Vet the Label\"/Dr. Dulake), though Fera currently emphasizes transparency/mobility over comprehensive wellness.",
      retail: "Mostly DTC/Amazon; limited retail overlap today.",
      search: "Moderate overlap on \"vet formulated dog supplement\" terms."
    }
  })
];

export function relationshipsForBrand(goldenBrandId: string): CompetitorRelationship[] {
  return relationships
    .filter((r) => r.goldenBrandId === goldenBrandId)
    .sort((a, b) => b.score - a.score);
}

export function relationshipsForCompetitor(competitorId: string): CompetitorRelationship[] {
  return relationships
    .filter((r) => r.competitorId === competitorId)
    .sort((a, b) => b.score - a.score);
}
