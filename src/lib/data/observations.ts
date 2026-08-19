import type { Observation, ObservationCategory, GoldenRelevanceTag } from "@/lib/types";
import { significanceScore, priorityFromSignificance, confidenceBand, type SignificanceInput } from "@/lib/scoring";

// Every quote below is a real, paraphrased-at-most excerpt from a page this
// app fetched live, or a fact returned by a live web search, on 2026-08-19
// (unless `eventDate` names an earlier real event, e.g. a press announcement).
// No before/after, no invented deltas — see the data-honesty contract in
// src/lib/types.ts.

interface ObsInput {
  id: string;
  competitorId: string;
  page: string;
  url: string;
  category: ObservationCategory;
  channel: Observation["channel"];
  capturedAt: string;
  eventDate?: string;
  headline: string;
  quote: string;
  evidenceType: Observation["evidenceType"];
  factors: SignificanceInput;
  confidence: number;
  goldenRelevance: GoldenRelevanceTag[];
  whyItMatters: string;
  suggestedAction?: string;
}

const FACTOR_LABELS: { key: keyof SignificanceInput; label: string; max: number }[] = [
  { key: "strategicRelevance", label: "Touches a core positioning/pricing pillar", max: 35 },
  { key: "distinctiveness", label: "Unusual vs. category norm", max: 25 },
  { key: "goldenExposure", label: "Directness of Golden brand exposure", max: 25 },
  { key: "evidenceStrength", label: "Source directness / reliability", max: 15 }
];

function obs(i: ObsInput): Observation {
  const significance = significanceScore(i.factors);
  return {
    id: i.id,
    competitorId: i.competitorId,
    page: i.page,
    url: i.url,
    category: i.category,
    channel: i.channel,
    capturedAt: i.capturedAt,
    eventDate: i.eventDate,
    headline: i.headline,
    quote: i.quote,
    evidenceType: i.evidenceType,
    significance,
    significanceFactors: FACTOR_LABELS.map((f) => ({ label: f.label, points: i.factors[f.key], max: f.max })),
    priority: priorityFromSignificance(significance),
    confidence: i.confidence,
    confidenceBand: confidenceBand(i.confidence),
    goldenRelevance: i.goldenRelevance,
    whyItMatters: i.whyItMatters,
    suggestedAction: i.suggestedAction
  };
}

export const observations: Observation[] = [
  obs({
    id: "obs-fd-walmart",
    competitorId: "the-farmers-dog",
    page: "Press / Newsroom",
    url: "https://www.petfoodindustry.com/news-newsletters/pet-food-news/news/15820583/the-farmers-dog-launches-on-walmartcom-with-personalized-meal-plans",
    category: "Retail Distribution",
    channel: "Press / Legal",
    capturedAt: "2026-08-19",
    eventDate: "2026-03-24",
    headline: "The Farmer's Dog took its first-ever retail step, launching on Walmart.com",
    quote: "Announced March 24, 2026: The Farmer's Dog launches personalized meal plans on Walmart.com in April 2026 — its first retail partnership after nearly a decade as a DTC-only subscription brand, giving it access to Walmart's ~150M weekly shoppers.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 30, distinctiveness: 22, goldenExposure: 22, evidenceStrength: 14 },
    confidence: 93,
    goldenRelevance: [
      { brandId: "badlands-ranch", level: "High", rationale: "The category-defining premium-DTC fresh brand just proved that mass retail and premium DTC positioning can coexist — directly relevant as Badlands weighs further retail expansion." },
      { brandId: "dr-marty", level: "Medium", rationale: "Dr. Marty remains the only major player still fully DTC-only in its category; this widens the gap between it and its closest positioning peers on distribution strategy." }
    ],
    whyItMatters: "This is the single most concrete distribution-strategy move observed across all tracked competitors this year: the brand that arguably invented the modern premium-DTC fresh-food playbook has now broken from it entirely.",
    suggestedAction: "Discuss whether Badlands Ranch's existing Chewy/Amazon presence should extend toward a similar large-format mass-retail partnership, and what it would mean for Dr. Marty's DTC-only model if this proves successful."
  }),
  obs({
    id: "obs-nx-settlement",
    competitorId: "nutramax",
    page: "Legal / Press",
    url: "https://openclassactions.com/settlements/cosequin-joint-supplements-for-dogs-class-action-settlement.php",
    category: "Legal / Regulatory",
    channel: "Press / Legal",
    capturedAt: "2026-08-19",
    headline: "Nutramax agreed to an $11.5M settlement over Cosequin marketing claims",
    quote: "Nutramax Laboratories settled a class-action lawsuit alleging it falsely marketed Cosequin's joint-health, mobility, and cartilage-support benefits; the suit cited peer-reviewed studies finding no evidence that glucosamine and chondroitin improve joint health in dogs. Settlement value: $11.5 million.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 28, distinctiveness: 24, goldenExposure: 20, evidenceStrength: 13 },
    confidence: 90,
    goldenRelevance: [
      { brandId: "upn", level: "High", rationale: "Nutramax is the category's clinical-authority benchmark; a legal challenge to its core efficacy claims is a real opening for a comprehensive-formula challenger like UPN — but also a cautionary flag for how UPN words its own hip & joint claims." }
    ],
    whyItMatters: "The incumbent that both UPN and every joint-supplement challenger is implicitly measured against just had its central credibility claim tested in court and settled rather than fully defended.",
    suggestedAction: "Have legal/regulatory review Nutra Thrive's hip & joint claims language against the same evidentiary standard raised in this case, proactively rather than reactively."
  }),
  obs({
    id: "obs-su-positioning",
    competitorId: "sundays-for-dogs",
    page: "Homepage",
    url: "https://sundaysfordogs.com",
    category: "Positioning / Claim",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "Sundays for Dogs' entire pitch is built to undercut Badlands Ranch directly",
    quote: "Homepage hero: “Clean ingredients. Zero fine print.” Supporting claims: vet-founded and formulated, human-grade ingredients with 80%+ meat content, no thawing/prep/refrigeration, and “up to 55% less expensive than frozen fresh alternatives.”",
    evidenceType: "FACT",
    factors: { strategicRelevance: 30, distinctiveness: 16, goldenExposure: 24, evidenceStrength: 14 },
    confidence: 92,
    goldenRelevance: [{ brandId: "badlands-ranch", level: "Very High", rationale: "Same format (air-dried), same clean-label claim territory, and an explicit price-against-fresh argument that also implicitly undercuts anything priced like Badlands." }],
    whyItMatters: "This matters primarily to Badlands Ranch: Sundays for Dogs is making nearly the identical clean-ingredient promise in the identical format, with an explicit value argument Badlands does not currently make on its own homepage.",
    suggestedAction: "Compare Sundays' \"80%+ meat, zero fine print\" claim language directly against Badlands Ranch's current homepage copy for a claim-parity gap check."
  }),
  obs({
    id: "obs-su-offer",
    competitorId: "sundays-for-dogs",
    page: "Homepage",
    url: "https://sundaysfordogs.com",
    category: "Discount / Promotion",
    channel: "Pricing",
    capturedAt: "2026-08-19",
    headline: "Sundays for Dogs is offering 30% off the first box with a 14-day guarantee",
    quote: "\"30% off first box for new subscribers.\" 14-day money-back guarantee. Free shipping to all 50 US states, no threshold mentioned.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 18, distinctiveness: 10, goldenExposure: 16, evidenceStrength: 14 },
    confidence: 88,
    goldenRelevance: [{ brandId: "badlands-ranch", level: "High", rationale: "Directly comparable acquisition offer in the same format category." }],
    whyItMatters: "A single-point-in-time data point on this competitor's acquisition offer depth — useful as a benchmark, not evidence of a trend without a second observation over time.",
  }),
  obs({
    id: "obs-of-positioning",
    competitorId: "open-farm",
    page: "Homepage",
    url: "https://openfarmpet.com",
    category: "Positioning / Claim",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "Open Farm's current pitch is traceability and adventure, not clinical or aging-focused",
    quote: "Homepage hero: “Fuel their adventures.” Supporting claims: “Get raw nutrition, built right in,” “100% traceable, ethically sourced recipes,” humanely-raised proteins, third-party certifications (OceanWise, Certified Humane, B Corp).",
    evidenceType: "FACT",
    factors: { strategicRelevance: 22, distinctiveness: 12, goldenExposure: 16, evidenceStrength: 14 },
    confidence: 90,
    goldenRelevance: [{ brandId: "dr-marty", level: "Medium", rationale: "Freeze-dried format overlap, but Open Farm's current positioning (traceability/adventure) is further from Dr. Marty's vet-authority framing than raw category membership alone would suggest." }],
    whyItMatters: "Useful baseline: as of today, Open Farm is not contesting Dr. Marty on clinical or aging-related claim territory — it's differentiated on sourcing transparency instead."
  }),
  obs({
    id: "obs-of-discounts",
    competitorId: "open-farm",
    page: "Homepage",
    url: "https://openfarmpet.com",
    category: "Discount / Promotion",
    channel: "Pricing",
    capturedAt: "2026-08-19",
    headline: "Open Farm is running an unusually deep, stacked discount structure right now",
    quote: "Simultaneously live: up to 25% off first Autoship (multiple codes, e.g. HELLO25), 20% off first order (WELCOME20), 25% + free shipping on cat recipes, and 50% off select freeze-dried recipes.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 18, distinctiveness: 18, goldenExposure: 18, evidenceStrength: 13 },
    confidence: 85,
    goldenRelevance: [{ brandId: "dr-marty", level: "Medium", rationale: "A 50%-off freeze-dried offer is a meaningful price signal in Dr. Marty's exact format category." }],
    whyItMatters: "Four simultaneous, stackable discount mechanisms is more promotional complexity than most competitors in this set run at once — worth a second look in a month to see if this is standing or seasonal.",
  }),
  obs({
    id: "obs-hk-promo",
    competitorId: "honest-kitchen",
    page: "Homepage",
    url: "https://www.thehonestkitchen.com",
    category: "Discount / Promotion",
    channel: "Pricing",
    capturedAt: "2026-08-19",
    eventDate: "2026-08-17",
    headline: "Honest Kitchen is running a time-boxed 20% sitewide discount, expiring in 2 days",
    quote: "Sitewide banner: “20% off, auto-applied at checkout,” explicitly dated 8/17–8/21. Separately, code SUBSCRIBE35 offers 35% off a first subscription order.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 16, distinctiveness: 18, goldenExposure: 14, evidenceStrength: 15 },
    confidence: 94,
    goldenRelevance: [
      { brandId: "dr-marty", level: "Medium", rationale: "A time-boxed sitewide sale (vs. Honest Kitchen's usual always-on subscription discount) suggests a specific short-term push worth understanding." },
      { brandId: "badlands-ranch", level: "Medium", rationale: "Same relevance — worth checking whether this coincides with a broader August promotional calendar across the category." }
    ],
    whyItMatters: "Explicit start/end dates on a sitewide discount are unusual for this brand and worth revisiting after Aug 21 to see what it reverts to.",
    suggestedAction: "Re-check thehonestkitchen.com after Aug 21 to see whether pricing reverts to a higher baseline — that comparison would be a genuine, verifiable before/after."
  }),
  obs({
    id: "obs-hk-cert",
    competitorId: "honest-kitchen",
    page: "Homepage",
    url: "https://www.thehonestkitchen.com",
    category: "Certification",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "Honest Kitchen's human-grade certification remains its sharpest differentiated claim",
    quote: "“The first human grade pet food,” founded 2002. “Made in a human food facility with superior safety.” B Corp certified. 90-day money-back guarantee.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 18, distinctiveness: 16, goldenExposure: 16, evidenceStrength: 14 },
    confidence: 91,
    goldenRelevance: [
      { brandId: "dr-marty", level: "Medium", rationale: "A certified (not just claimed) human-grade standard is a sharper claim than Dr. Marty currently makes." },
      { brandId: "badlands-ranch", level: "Medium", rationale: "Directly contests Badlands' \"clean ingredient\" language with a third-party-certifiable claim." }
    ],
    whyItMatters: "No other tracked competitor currently holds an equivalent certified human-grade claim — this remains genuine, defensible whitespace Honest Kitchen alone occupies."
  }),
  obs({
    id: "obs-sc-nationaldogday",
    competitorId: "stella-chewys",
    page: "Homepage",
    url: "https://www.stellaandchewys.com",
    category: "Discount / Promotion",
    channel: "Pricing",
    capturedAt: "2026-08-19",
    eventDate: "2026-08-26",
    headline: "Stella & Chewy's is running a National Dog Day promotion ahead of Aug 26",
    quote: "Homepage banner: “Happy National Dog Day! Treat them to the nutrition they deserve.” Offer: 25% off first order plus a free “Snout & About Bundle” with first purchase.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 12, distinctiveness: 10, goldenExposure: 14, evidenceStrength: 14 },
    confidence: 90,
    goldenRelevance: [{ brandId: "dr-marty", level: "Medium", rationale: "Freeze-dried category peer running a calendar-tied acquisition promotion." }],
    whyItMatters: "A seasonal/holiday-tied promotion, not a durable pricing signal — logged for the record, not urgent."
  }),
  obs({
    id: "obs-sc-pricing",
    competitorId: "stella-chewys",
    page: "Product Pages",
    url: "https://www.stellaandchewys.com",
    category: "Pricing",
    channel: "Product",
    capturedAt: "2026-08-19",
    headline: "Stella & Chewy's core freeze-dried line sample pricing",
    quote: "Freeze-dried dinner patties: $35.99–$39.99. Meal mixers: $19.99. Dinner dust toppers: $22.99.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 14, distinctiveness: 6, goldenExposure: 14, evidenceStrength: 12 },
    confidence: 85,
    goldenRelevance: [{ brandId: "dr-marty", level: "Medium", rationale: "Useful current price-band benchmark in the same format category." }],
    whyItMatters: "Baseline pricing reference for the Products comparison view."
  }),
  obs({
    id: "obs-in-positioning",
    competitorId: "instinct",
    page: "Homepage",
    url: "https://www.instinctpetfood.com",
    category: "Positioning / Claim",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "Instinct leans on vet-formulation and a proprietary safety-testing claim",
    quote: "“Vet-Formulated Recipes.” “Empty Bowl Guarantee.” Positions itself as “#1 Category Leader in Raw Research” via proprietary SafeRaw™ testing. 100,000+ pet parents cited.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 12, distinctiveness: 8, goldenExposure: 10, evidenceStrength: 13 },
    confidence: 87,
    goldenRelevance: [{ brandId: "dr-marty", level: "Low", rationale: "Vet-formulation claims are now close to category table stakes rather than a differentiator (see Strategy: Veterinary Authority)." }],
    whyItMatters: "One more data point supporting that vet-formulation claims are now near-universal in this category rather than distinctive."
  }),
  obs({
    id: "obs-in-pricing",
    competitorId: "instinct",
    page: "Product Pages",
    url: "https://www.instinctpetfood.com",
    category: "Pricing",
    channel: "Product",
    capturedAt: "2026-08-19",
    headline: "Instinct's freeze-dried raw line sample pricing",
    quote: "Representative site pricing spans $1.99–$27.99 across formats; freeze-dried meals specifically span $8.99–$24.99.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 10, distinctiveness: 6, goldenExposure: 10, evidenceStrength: 12 },
    confidence: 82,
    goldenRelevance: [{ brandId: "dr-marty", level: "Low", rationale: "Retail-distributed, lower price band than Dr. Marty's DTC super-premium tier." }],
    whyItMatters: "Pricing reference for the Products comparison view."
  }),
  obs({
    id: "obs-zp-positioning",
    competitorId: "ziwi-peak",
    page: "Homepage",
    url: "https://ziwipets.com",
    category: "Positioning / Claim",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "ZIWI's current pitch centers on New Zealand provenance and minimal processing",
    quote: "Homepage hero: “Peak nutrition for pets from pure New Zealand.” “When you feed better, your pet feels better.” Cites an internal stat: “4/5 pet parents see the difference in their pet's overall health & well-being.”",
    evidenceType: "FACT",
    factors: { strategicRelevance: 16, distinctiveness: 10, goldenExposure: 14, evidenceStrength: 13 },
    confidence: 84,
    goldenRelevance: [{ brandId: "dr-marty", level: "Medium", rationale: "Adjacent super-premium raw/air-dried positioning, differentiated on provenance rather than clinical authority." }],
    whyItMatters: "Baseline positioning reference; no lifespan/longevity-specific language observed on the homepage at capture time."
  }),
  obs({
    id: "obs-zp-nopricing",
    competitorId: "ziwi-peak",
    page: "Homepage",
    url: "https://ziwipets.com",
    category: "Pricing",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "ZIWI shows no fixed pricing or promo codes on its homepage",
    quote: "No specific pricing, discount codes, or sale prices appear in the homepage content at capture time — pricing is only visible after clicking into a product and region.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 4, distinctiveness: 8, goldenExposure: 4, evidenceStrength: 10 },
    confidence: 75,
    goldenRelevance: [],
    whyItMatters: "Low-significance observation, included to show the significance model correctly de-prioritizes routine facts rather than surfacing everything as an alert."
  }),
  obs({
    id: "obs-ol-offer",
    competitorId: "ollie",
    page: "Homepage",
    url: "https://www.ollie.com",
    category: "Discount / Promotion",
    channel: "Pricing",
    capturedAt: "2026-08-19",
    headline: "Ollie is offering 50% off the first box plus free items",
    quote: "“50% off your first box” plus a free puzzle and treats. “100% Obsession Guarantee.”",
    evidenceType: "FACT",
    factors: { strategicRelevance: 16, distinctiveness: 12, goldenExposure: 16, evidenceStrength: 14 },
    confidence: 88,
    goldenRelevance: [{ brandId: "badlands-ranch", level: "Medium", rationale: "Another premium DTC subscription competitor with a deep first-order offer, relevant as a category benchmark." }],
    whyItMatters: "A steep first-order discount is a genuine current data point on this competitor's acquisition economics, logged as a single observation rather than a trend."
  }),
  obs({
    id: "obs-ol-claims",
    competitorId: "ollie",
    page: "Homepage",
    url: "https://www.ollie.com",
    category: "Positioning / Claim",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "Ollie leans unusually heavily on quantified outcome statistics",
    quote: "“75% of members see noticeable improvements in weight and digestion within 30 days.” “60% of pet owners report dogs show increased enthusiasm.” “135K+ health check-ins completed.”",
    evidenceType: "FACT",
    factors: { strategicRelevance: 16, distinctiveness: 18, goldenExposure: 12, evidenceStrength: 13 },
    confidence: 83,
    goldenRelevance: [{ brandId: "badlands-ranch", level: "Low", rationale: "A quantified-outcomes claim style Badlands does not currently use." }],
    whyItMatters: "This claim style (specific percentages tied to internal usage data) is more statistically confident than most competitors in this set — worth noting as a differentiated proof pattern, independent of whether it reflects a trend."
  }),
  obs({
    id: "obs-pl-positioning",
    competitorId: "petlab-co",
    page: "Homepage",
    url: "https://thepetlabco.com",
    category: "Positioning / Claim",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "PetLab Co.'s current tagline is explicitly anti-hype",
    quote: "“Just the science. No hyperbole. No unsupported health claims. We deliver exceptional products and honest advice to support your pet's health.”",
    evidenceType: "FACT",
    factors: { strategicRelevance: 26, distinctiveness: 22, goldenExposure: 22, evidenceStrength: 11 },
    confidence: 80,
    goldenRelevance: [{ brandId: "upn", level: "High", rationale: "PetLab Co. is UPN's closest DTC funnel analog; an explicit anti-hyperbole positioning is a direct, quotable contrast point UPN could use or should be aware competitors are now claiming." }],
    whyItMatters: "This is a notable positioning choice for a DTC supplement brand — most competitors in this set lean into big outcome claims, while PetLab is currently positioning against exactly that pattern.",
    suggestedAction: "Confirm this tagline is current (not a one-off homepage test) on a follow-up check, and consider whether UPN's own claims language holds up well by the same \"no hyperbole\" standard."
  }),
  obs({
    id: "obs-pl-pricing",
    competitorId: "petlab-co",
    page: "Product Listings",
    url: "https://thepetlabco.com",
    category: "Pricing",
    channel: "Product",
    capturedAt: "2026-08-19",
    headline: "PetLab Co. supplement pricing runs $25–$30 with ~25% subscription savings",
    quote: "Individual chew products priced $25–$30; subscription option offers roughly 25% savings per the brand's current subscription program.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 14, distinctiveness: 6, goldenExposure: 16, evidenceStrength: 10 },
    confidence: 72,
    goldenRelevance: [{ brandId: "upn", level: "Medium", rationale: "Direct pricing benchmark against Nutra Thrive's subscription tiers." }],
    whyItMatters: "Pricing reference for the Products comparison view; sourced from search aggregation rather than a direct site fetch, so confidence is Medium rather than High."
  }),
  obs({
    id: "obs-zw-positioning",
    competitorId: "zesty-paws",
    page: "Homepage",
    url: "https://www.zestypaws.com",
    category: "Positioning / Claim",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "Zesty Paws pairs a science-forward tagline with the broadest retail footprint tracked",
    quote: "Homepage hero: “Led by Science, Loved by Pets.” NASC-certified, B Corp certified, made in the USA. Product range spans immune, gut health, joint mobility, skin/coat, and behavior.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 24, distinctiveness: 12, goldenExposure: 22, evidenceStrength: 14 },
    confidence: 90,
    goldenRelevance: [{ brandId: "upn", level: "High", rationale: "The most direct retail-shelf comparison for UPN's Pet Supplies Plus expansion — same multi-category breadth, value price tier, and a science-forward tagline UPN will be shelved next to." }],
    whyItMatters: "As UPN's Nutra Thrive and Nutra Complete land on Pet Supplies Plus shelves, this is the exact competitive set and tagline positioning they'll be compared against in-store."
  }),
  obs({
    id: "obs-zw-pricing",
    competitorId: "zesty-paws",
    page: "Product Listings",
    url: "https://www.zestypaws.com",
    category: "Pricing",
    channel: "Product",
    capturedAt: "2026-08-19",
    headline: "Zesty Paws pricing sits well below UPN's per-unit price",
    quote: "Sample pricing: Wild Alaskan Omega-3 from $16.97; Senior Advanced 11-in-1 Multivitamin from $42.97. Free shipping $45+. Subscribe & Save up to 20%.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 18, distinctiveness: 10, goldenExposure: 18, evidenceStrength: 14 },
    confidence: 89,
    goldenRelevance: [{ brandId: "upn", level: "High", rationale: "Zesty Paws' Value-tier pricing vs. UPN's Premium tier is the central pricing contrast UPN's retail buyers will make." }],
    whyItMatters: "A meaningful price gap exists between Zesty Paws (Value tier) and Nutra Thrive (Premium tier) for overlapping categories — worth having a clear answer ready for \"why does UPN cost more\" at retail."
  }),
  obs({
    id: "obs-nx-pricing",
    competitorId: "nutramax",
    page: "Retailer Listings",
    url: "https://openclassactions.com/settlements/cosequin-joint-supplements-for-dogs-class-action-settlement.php",
    category: "Pricing",
    channel: "Product",
    capturedAt: "2026-08-19",
    headline: "Nutramax joint-supplement pricing benchmark",
    quote: "Dasuquin for Large Dogs (84 chewable tablets): ~$54.99 on Amazon, $59.99 on Walmart. Cosequin for Dogs (132-count chewable tablets): $39.99.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 10, distinctiveness: 4, goldenExposure: 12, evidenceStrength: 11 },
    confidence: 78,
    goldenRelevance: [{ brandId: "upn", level: "Medium", rationale: "Vet-channel joint-supplement pricing benchmark." }],
    whyItMatters: "Pricing reference for the Products comparison view."
  }),
  obs({
    id: "obs-fp-positioning",
    competitorId: "fera-pet",
    page: "Homepage",
    url: "https://www.ferapets.com",
    category: "Positioning / Claim",
    channel: "Website",
    capturedAt: "2026-08-19",
    headline: "Fera Pets positions on ingredient transparency, not gut-skin-immune framing",
    quote: "Homepage hero: “Movement Made Easy.” Secondary message “Vet the Label,” crediting formulator Dr. Dulake and a blend of “Eastern and Western” ingredient philosophies. Emphasizes a public Certificate of Analysis lookup for batch-level transparency.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 18, distinctiveness: 14, goldenExposure: 18, evidenceStrength: 14 },
    confidence: 87,
    goldenRelevance: [{ brandId: "upn", level: "Medium", rationale: "Smaller-scale vet-formulated supplement competitor; currently differentiated on batch-level transparency rather than the comprehensive-formula territory UPN occupies." }],
    whyItMatters: "Useful baseline: Fera Pets' current claim territory (transparency/mobility) is adjacent to, but not directly overlapping, UPN's comprehensive-wellness pitch."
  }),
  obs({
    id: "obs-fp-pricing",
    competitorId: "fera-pet",
    page: "Product Listings",
    url: "https://www.ferapets.com",
    category: "Pricing",
    channel: "Product",
    capturedAt: "2026-08-19",
    headline: "Fera Pets supplement pricing benchmark",
    quote: "USDA Organic Probiotics with Prebiotics: $29.95. Hip + Joint Support Chews: $39.95. USDA Organic Mushroom Blend: $34.95. Pumpkin Plus Fiber Support: $34.95.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 10, distinctiveness: 6, goldenExposure: 12, evidenceStrength: 13 },
    confidence: 88,
    goldenRelevance: [{ brandId: "upn", level: "Low", rationale: "Pricing reference only." }],
    whyItMatters: "Pricing reference for the Products comparison view."
  }),
  obs({
    id: "obs-fd-pricing",
    competitorId: "the-farmers-dog",
    page: "Third-party pricing analysis",
    url: "https://www.petful.com/food/the-farmers-dog-cost/",
    category: "Pricing",
    channel: "Product",
    capturedAt: "2026-08-19",
    headline: "The Farmer's Dog costs roughly $6.81–$12.88 per day depending on dog size",
    quote: "Per third-party pricing analysis current as of August 2026: costs range $6.81–$12.88/day for adult dogs; a 15lb dog runs approximately $120/month, a 40lb dog approximately $220/month.",
    evidenceType: "FACT",
    factors: { strategicRelevance: 14, distinctiveness: 8, goldenExposure: 14, evidenceStrength: 9 },
    confidence: 68,
    goldenRelevance: [{ brandId: "badlands-ranch", level: "Medium", rationale: "Reinforces that fresh/subscription-format competitors sit well above Badlands Ranch's per-day cost." }],
    whyItMatters: "Third-party-sourced (not a direct site fetch), so treated as Medium confidence — useful directional pricing context rather than an exact verified number."
  })
];

export function observationsForCompetitor(competitorId: string): Observation[] {
  return observations.filter((o) => o.competitorId === competitorId).sort((a, b) => b.significance - a.significance);
}

export function getObservation(id: string): Observation | undefined {
  return observations.find((o) => o.id === id);
}

export function observationsByPriority(priority: Observation["priority"]): Observation[] {
  return observations.filter((o) => o.priority === priority).sort((a, b) => b.significance - a.significance);
}
