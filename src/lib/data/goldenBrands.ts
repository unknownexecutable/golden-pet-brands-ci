import type { GoldenBrand } from "@/lib/types";

// All facts below were captured via a live fetch of the cited URL on the
// date shown. Nothing here is invented — see the data-honesty contract in
// src/lib/types.ts.
export const goldenBrands: GoldenBrand[] = [
  {
    id: "dr-marty",
    slug: "dr-marty",
    name: "Dr. Marty Pets",
    shortName: "Dr. Marty",
    tagline: "Premium Freeze Dried Raw Dog & Cat Food",
    color: "golden-drmarty",
    description:
      "Freeze-dried raw dog and cat food positioned as \"Vet-Designed\" and \"Biologically Appropriate.\" Live homepage copy emphasizes gentle freeze-drying over heat-based processing (\"Never Kibbled™\") and cites over 20,000 five-star reviews. Sold direct-to-consumer only.",
    founded: "2018",
    coreCustomer: "Health-anxious owners of aging or sensitive dogs, often arriving via vet referral or advertorial content",
    priceTier: "Super-Premium",
    distribution: ["DTC (drmartypets.com)"],
    positioningPillars: [
      "Vet-Designed authority",
      "Biologically appropriate, minimally processed",
      "Freeze-dried (\"Never Kibbled\")",
      "Subscribe & Save direct-response funnel"
    ],
    categories: ["Freeze-Dried Food", "Toppers", "Treats"],
    pricingFacts: [
      { label: "Nature's Blend, regular price", value: "$59.95/bag" },
      { label: "Nature's Blend, free-account price", value: "$30.95/bag (~48% off)" },
      { label: "Max discount with account", value: "Up to 55% off" },
      { label: "Free shipping threshold", value: "$50+" }
    ],
    sourceNote: "Homepage and product page live-fetched from drmartypets.com.",
    sourceUrl: "https://drmartypets.com",
    capturedAt: "2026-08-19"
  },
  {
    id: "badlands-ranch",
    slug: "badlands-ranch",
    name: "Badlands Ranch",
    shortName: "Badlands Ranch",
    tagline: "Every Dog Deserves Clean, Healthy Food",
    color: "golden-badlands",
    description:
      "Air-dried \"Superfood Complete\" dog food, fronted by actress Katherine Heigl. Live homepage copy centers on \"clean\" ingredients — responsibly-raised beef, organ meat, omega-packed salmon, nourishing superfoods — with zero fillers, added grains, artificial flavors, or preservatives.",
    founded: "2023",
    coreCustomer: "Quality-conscious mainstream dog owners drawn in by celebrity trust and clean-label claims",
    priceTier: "Premium",
    distribution: ["DTC (badlandsranch.com)", "Chewy", "Amazon", "Regional co-ops / independents"],
    positioningPillars: [
      "Celebrity-fronted trust (Katherine Heigl)",
      "\"Clean\" ingredient claims (no fillers/artificial additives)",
      "Air-dried process",
      "Member subscription pricing"
    ],
    categories: ["Air-Dried Food", "Toppers"],
    pricingFacts: [
      { label: "Superfood Complete Beef, 1 bag", value: "$59.95" },
      { label: "Superfood Complete Beef, member price", value: "$40.95 (~32% off)" },
      { label: "Free shipping threshold", value: "$49+" },
      { label: "Guarantee", value: "90-day refund, unused portion" }
    ],
    sourceNote: "Homepage and product page live-fetched from badlandsranch.com.",
    sourceUrl: "https://badlandsranch.com",
    capturedAt: "2026-08-19"
  },
  {
    id: "upn",
    slug: "ultimate-pet-nutrition",
    name: "Ultimate Pet Nutrition",
    shortName: "UPN",
    tagline: "Nutra Thrive — For Hip & Joint, Immune, Antioxidant & Heart Support",
    color: "golden-upn",
    description:
      "Supplement line (Nutra Thrive, Nutra Complete) formulated around 30+ active ingredients — grass-fed bovine collagen, mushrooms, CoQ10, milk thistle — spanning hip/joint, immune, antioxidant, and heart support in one product. Founded on veterinarian Dr. Gary Richter's formulation; recently expanded from DTC into roughly 650 Pet Supplies Plus stores.",
    founded: "2020",
    coreCustomer: "Owners looking for one comprehensive daily supplement rather than single-benefit chews",
    priceTier: "Premium",
    distribution: ["DTC (ultimatepetnutrition.com / nutrathrivefordogs.com)", "Pet Supplies Plus (~650 stores)"],
    positioningPillars: [
      "Comprehensive, multi-system formula (30+ actives)",
      "Veterinarian formulation (Dr. Gary Richter)",
      "Celebrity advocate (Rob Lowe, \"Chief Pet Advocate\")",
      "DTC-to-retail expansion"
    ],
    categories: ["Joint Supplements", "Gut Health Supplements", "Multivitamin Supplements", "Skin & Coat Supplements"],
    pricingFacts: [
      { label: "Nutra Thrive, one-time purchase", value: "$69.95/jar" },
      { label: "Subscribe & Save range", value: "$49.95–$263.76 (29–47% off, by volume)" },
      { label: "Free shipping threshold", value: "$49+" },
      { label: "Guarantee", value: "90-day money-back" }
    ],
    sourceNote: "Product funnel live-fetched from nutrathrivefordogs.com (ultimatepetnutrition.com blocked automated fetch); retail expansion per PR Newswire / Pet Food Industry coverage.",
    sourceUrl: "https://nutrathrivefordogs.com",
    capturedAt: "2026-08-19"
  }
];

export function getGoldenBrand(id: string): GoldenBrand | undefined {
  return goldenBrands.find((b) => b.id === id || b.slug === id);
}
