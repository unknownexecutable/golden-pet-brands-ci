import type { GoldenBrand } from "@/lib/types";

// Re-verified against goldenpetbrands.com (About, Our Brands, Leadership,
// Newsroom pages) and each brand's own site, live, on 2026-08-19, following
// a CEO-readiness accuracy pass. Every `officialClaims` entry is Golden's
// own verbatim or near-verbatim language, cited. Every `analystPositioning`
// entry is OUR read, never phrased as something Golden said — see the
// distinction enforced in the brand detail page UI.
//
// Corporate context (applies to all three brands): Golden Pet Brands is a
// vertically integrated pet nutrition company headquartered in El Segundo,
// CA, founded in 2017, formerly part of the Golden Hippo family of
// companies. It operates two U.S. manufacturing facilities — Germantown,
// WI (BRC AA+ rated) and Seward, NE (SQF certified, FDA registered, the
// former Petsource facility acquired May 8, 2026). CEO Apu Mody and CFO
// John Meloun were appointed April 30, 2026. All three brands launched
// direct-to-consumer, expanded into independent/neighborhood pet stores in
// 2021, and entered national pet specialty retail (Petco) in 2026 — none
// of the three is DTC-only today. Source: goldenpetbrands.com/about.html,
// /our-brands.html, /leadership, /newsroom (live-fetched 2026-08-19).
export const goldenBrands: GoldenBrand[] = [
  {
    id: "dr-marty",
    slug: "dr-marty",
    name: "Dr. Marty Pets",
    shortName: "Dr. Marty",
    tagline: "Premium Freeze Dried Raw Dog & Cat Food",
    color: "golden-drmarty",
    description:
      "Freeze-dried raw dog and cat food built around Brand Champion Dr. Marty Goldstein, DVM's 50+ years in integrative veterinary practice, with TV/media dog trainer Cesar Millan as a second Brand Champion. Sold direct-to-consumer and, per Golden Pet Brands' own site, also at Petco and Amazon — not DTC-only.",
    founded: "2018",
    foundedNote: "Search-derived (Medium confidence) — Golden's own official pages don't separately date Dr. Marty Pets' brand launch, only Golden Pet Brands' 2017 corporate founding. Third-party coverage (e.g. Dogster) puts the brand's own launch in 2018, Woodland Hills, CA.",
    coreCustomer: "Health-anxious owners of aging or sensitive dogs, often arriving via vet-authority or educational content",
    priceTier: "Super-Premium",
    distribution: ["DTC (drmartypets.com)", "Petco", "Amazon"],
    productLine: ["Nature's Blend (freeze-dried raw dog food, 7 recipes)", "Nature's Feast (cat)", "ProPower Plus (senior support)", "Cod Cracklers, Bark Stoppers, Better Life Chews (treats)"],
    champions: [
      { name: "Dr. Marty Goldstein, DVM", role: "Brand Champion, Dr. Marty Pets" },
      { name: "Cesar Millan", role: "Brand Champion, Dr. Marty Pets" }
    ],
    officialClaims: [
      { text: "Vet-Designed", sourceUrl: "https://drmartypets.com", sourceLabel: "drmartypets.com" },
      { text: "More than 50 years of veterinary experience", sourceUrl: "https://drmartypets.com", sourceLabel: "drmartypets.com" },
      { text: "Every freeze-dried lot runs through High-Pressure Processing (HPP), a gold-standard food safety technology", sourceUrl: "https://goldenpetbrands.com/about.html", sourceLabel: "goldenpetbrands.com" }
    ],
    analystPositioning: ["Veterinarian authority as the primary trust signal", "Minimally processed, freeze-dried format", "Direct-response education content", "Now dual-channel (DTC + Petco/Amazon), not DTC-exclusive"],
    categories: ["Freeze-Dried Food", "Toppers", "Treats"],
    pricingFacts: [
      { label: "Nature's Blend, regular price", value: "$59.95/bag" },
      { label: "Nature's Blend, free-account price", value: "$30.95/bag (~48% off)" },
      { label: "Max discount with account", value: "Up to 55% off" },
      { label: "Free shipping threshold", value: "$50+" }
    ],
    sourceNote: "Homepage and product page live-fetched from drmartypets.com; corporate/product-line facts from goldenpetbrands.com (About, Our Brands).",
    sourceUrl: "https://goldenpetbrands.com/our-brands.html",
    capturedAt: "2026-08-19"
  },
  {
    id: "badlands-ranch",
    slug: "badlands-ranch",
    name: "Badlands Ranch",
    shortName: "Badlands Ranch",
    tagline: "Every dog deserves clean, healthy food.",
    color: "golden-badlands",
    description:
      "Air-dried \"Superfood Complete\" dog food, launched in 2022 with Emmy-winning actress and animal-welfare advocate Katherine Heigl as Brand Champion, plus Dr. Ambika Vaid-Sidhu, DVM as Veterinary Advisor. Also makes a supplement-chew line (Super Daily Wellness, Super Skin & Coat, Super Calm, Super Mobility) — not food-only.",
    founded: "2022",
    coreCustomer: "Quality-conscious mainstream dog owners drawn in by celebrity trust and clean-label claims",
    priceTier: "Premium",
    distribution: ["DTC (badlandsranch.com)", "Petco", "Chewy", "Amazon"],
    productLine: ["Superfood Complete (air-dried, 5 recipes)", "Superfood Bites (freeze-dried single-ingredient treats)", "Superfood Nuggets (freeze-dried toppers)", "Super Daily Wellness, Super Skin & Coat, Super Calm, Super Mobility (supplement chews)"],
    champions: [
      { name: "Katherine Heigl", role: "Brand Champion, Badlands Ranch" },
      { name: "Dr. Ambika Vaid-Sidhu, DVM", role: "Veterinary Advisor, Badlands Ranch" }
    ],
    officialClaims: [
      { text: "Every dog deserves clean, healthy food.", sourceUrl: "https://goldenpetbrands.com/our-brands.html", sourceLabel: "goldenpetbrands.com" },
      { text: "87% animal protein. 34 superfood ingredients, including lion's mane mushroom, pumpkin, and blueberries. Zero corn, soy, wheat, or artificial preservatives.", sourceUrl: "https://goldenpetbrands.com/our-brands.html", sourceLabel: "goldenpetbrands.com" }
    ],
    analystPositioning: ["Celebrity-fronted trust (Katherine Heigl)", "\"Low and slow\" air-drying process", "Clean-label, whole-ingredient framing", "Food and supplement lines together, not food-only"],
    categories: ["Air-Dried Food", "Toppers", "Joint Supplements", "Skin & Coat Supplements"],
    pricingFacts: [
      { label: "Superfood Complete Beef, 1 bag", value: "$59.95" },
      { label: "Superfood Complete Beef, member price", value: "$40.95 (~32% off)" },
      { label: "Free shipping threshold", value: "$49+" },
      { label: "Guarantee", value: "90-day refund, unused portion" }
    ],
    sourceNote: "Homepage and product page live-fetched from badlandsranch.com; brand/product-line facts from goldenpetbrands.com (Our Brands).",
    sourceUrl: "https://goldenpetbrands.com/our-brands.html",
    capturedAt: "2026-08-19"
  },
  {
    id: "upn",
    slug: "ultimate-pet-nutrition",
    name: "Ultimate Pet Nutrition",
    shortName: "UPN",
    tagline: "Vet-Developed, Pet-Approved.",
    color: "golden-upn",
    description:
      "Freeze-dried raw food and veterinarian-formulated supplements, built around Brand Champion Dr. Gary Richter, MS, DVM — author of The Ultimate Pet Health Guide, Longevity for Dogs, and Longevity for Cats — with Rob Lowe as Chief Pet Advocate. Golden Pet Brands identifies Nutra Complete (freeze-dried raw food) as UPN's flagship product; Nutra Thrive is the brand's daily supplement.",
    founded: "2017",
    foundedNote: "Search-derived (Medium confidence) — Golden's own official pages don't separately date UPN's brand launch. Third-party coverage attributes founding to Dr. Gary Richter in 2017.",
    coreCustomer: "Owners looking for a comprehensive daily supplement or a freeze-dried raw food backed by a named veterinary formulator",
    priceTier: "Premium",
    distribution: ["DTC (ultimatepetnutrition.com / nutrathrivefordogs.com)", "Petco", "Chewy", "Amazon", "Pet Supplies Plus (~650 stores, per 2025 retail expansion)"],
    productLine: ["Nutra Complete (freeze-dried raw dog food — flagship)", "Nutra Thrive (daily supplement)", "Nutra Bites (freeze-dried treats)"],
    champions: [
      { name: "Dr. Gary Richter, MS, DVM", role: "Brand Champion, Ultimate Pet Nutrition" },
      { name: "Rob Lowe", role: "Chief Pet Advocate, Ultimate Pet Nutrition" }
    ],
    officialClaims: [
      { text: "Vet-Developed, Pet-Approved.", sourceUrl: "https://goldenpetbrands.com/our-brands.html", sourceLabel: "goldenpetbrands.com" },
      { text: "Longevity is not more years. It is more healthy years.", sourceUrl: "https://goldenpetbrands.com/our-brands.html", sourceLabel: "goldenpetbrands.com" },
      { text: "Nutra Thrive supports canine gut health, immune function, and overall wellness", sourceUrl: "https://goldenpetbrands.com/our-brands.html", sourceLabel: "goldenpetbrands.com" },
      { text: "For Hip & Joint, Immune, Antioxidant & Heart Support", sourceUrl: "https://nutrathrivefordogs.com", sourceLabel: "nutrathrivefordogs.com (DTC product page)" }
    ],
    analystPositioning: ["Comprehensive, multi-ingredient supplement formula", "Veterinarian formulation as the core authority claim", "Longevity framing is an official Golden position for this brand, not just a competitor narrative", "DTC-to-retail expansion, now spanning Petco/Chewy/Amazon plus a dedicated Pet Supplies Plus push"],
    categories: ["Freeze-Dried Food", "Joint Supplements", "Gut Health Supplements", "Multivitamin Supplements", "Skin & Coat Supplements"],
    pricingFacts: [
      { label: "Nutra Thrive, one-time purchase", value: "$69.95/jar" },
      { label: "Subscribe & Save range", value: "$49.95–$263.76 (29–47% off, by volume)" },
      { label: "Free shipping threshold", value: "$49+" },
      { label: "Guarantee", value: "90-day money-back" }
    ],
    sourceNote: "Product funnel live-fetched from nutrathrivefordogs.com; brand/flagship-product and \"longevity\" positioning facts from goldenpetbrands.com (Our Brands) — note Nutra Complete, not Nutra Thrive, is Golden's own stated flagship.",
    sourceUrl: "https://goldenpetbrands.com/our-brands.html",
    capturedAt: "2026-08-19"
  }
];

export function getGoldenBrand(id: string): GoldenBrand | undefined {
  return goldenBrands.find((b) => b.id === id || b.slug === id);
}
