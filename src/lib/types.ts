// ---------------------------------------------------------------------------
// Golden Pet Brands — Competitive Intelligence Command Center
// Core domain model.
//
// IMPORTANT — data honesty contract:
// This build contains ZERO fabricated data. Every brand fact, price, claim,
// and quote in src/lib/data/* was captured via a live fetch of the named
// source URL, or a live web search, on the date recorded in `capturedAt` /
// `sourceNote`. Where a fact could not be verified live, the record says so
// explicitly ("Not captured — …") rather than inventing a plausible number.
//
// A consequence of that honesty: this MVP does NOT contain change-over-time
// data (price history, week-over-week social cadence, ad rotation duration,
// homepage before/after diffs). Producing that kind of data honestly requires
// a monitoring pipeline that has actually been running and taking snapshots
// — it cannot exist on day one. The data model below is deliberately a
// SNAPSHOT model: every record is "here is a verified fact, as observed on
// this date" rather than "here is how a fact changed." See
// src/lib/data/README.md and the in-app Sources page for exactly which
// channels are live-connected vs. not yet connected.
// ---------------------------------------------------------------------------

export type ConfidenceBand = "High" | "Medium" | "Low";

export type EvidenceType = "FACT" | "INFERENCE" | "HYPOTHESIS";

export type Priority = "high" | "watch" | "routine";

export type RelevanceLevel = "Very High" | "High" | "Medium" | "Low" | "Minimal";

export type CompetitorTierType =
  | "Primary"
  | "Secondary"
  | "Emerging Threat"
  | "Product-Specific"
  | "Marketing"
  | "Retail"
  | "Aspirational";

export type ChannelType =
  | "Website"
  | "Social"
  | "Advertising"
  | "Pricing"
  | "Retail"
  | "Product"
  | "Press / Legal";

export type GoldenBrandId = "dr-marty" | "badlands-ranch" | "upn";

export interface GoldenBrand {
  id: GoldenBrandId;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  color: string;
  description: string;
  founded: string;
  coreCustomer: string;
  priceTier: "Value" | "Premium" | "Super-Premium";
  distribution: string[];
  positioningPillars: string[];
  categories: string[];
  pricingFacts: PricingFact[];
  sourceNote: string;
  sourceUrl: string;
  capturedAt: string;
}

export interface PricingFact {
  label: string;
  value: string;
}

// ---- Sources & provenance --------------------------------------------------

export type SourceType =
  | "Brand Website"
  | "Social Platform"
  | "Ad Library"
  | "Retailer Listing"
  | "Review Platform"
  | "Press / News"
  | "Search Index";

export type ConnectorStatus = "Connected" | "Not Connected";

export interface Source {
  id: string;
  competitorId: string;
  type: SourceType;
  label: string;
  url: string;
  status: ConnectorStatus;
  captureMethod: string;
  notConnectedReason?: string;
}

// ---- Competitors & relationships ------------------------------------------

export type CompetitorCategory =
  | "Freeze-Dried Food"
  | "Air-Dried Food"
  | "Fresh / Gently Cooked"
  | "Raw Food"
  | "Kibble - Premium"
  | "Toppers"
  | "Treats"
  | "Joint Supplements"
  | "Gut Health Supplements"
  | "Multivitamin Supplements"
  | "Skin & Coat Supplements";

export interface Competitor {
  id: string;
  slug: string;
  name: string;
  initials: string;
  hq: string;
  founded: string;
  website: string;
  description: string;
  currentHeroHeadline?: string;
  priceTier: "Value" | "Premium" | "Super-Premium";
  distribution: string[];
  categories: CompetitorCategory[];
  tier: CompetitorTierType;
  tierOverridden: boolean;
  tierOverrideNote?: string;
  ambassador?: string;
  sourceNote: string;
  sourceUrl: string;
  capturedAt: string;
}

export interface RelevanceBreakdown {
  categoryOverlap: number;
  customerOverlap: number;
  priceOverlap: number;
  marketingOverlap: number;
  retailOverlap: number;
  searchOverlap: number;
  rationale: {
    category: string;
    customer: string;
    price: string;
    marketing: string;
    retail: string;
    search: string;
  };
}

export interface CompetitorRelationship {
  competitorId: string;
  goldenBrandId: GoldenBrandId;
  breakdown: RelevanceBreakdown;
  score: number;
  band: RelevanceLevel;
  primaryOverlapCategory: string;
}

// ---- Observations (verified, single-point-in-time facts) -------------------
// NOT a change-detection record. Each Observation is a fact confirmed true
// as of `capturedAt`, sourced from a live fetch or live search on that date.

export type ObservationCategory =
  | "Positioning / Claim"
  | "Pricing"
  | "Discount / Promotion"
  | "Guarantee"
  | "Retail Distribution"
  | "Certification"
  | "Legal / Regulatory"
  | "Subscription Terms"
  | "Ingredient / Formulation";

export interface GoldenRelevanceTag {
  brandId: GoldenBrandId;
  level: RelevanceLevel;
  rationale: string;
}

export interface SignificanceFactor {
  label: string;
  points: number;
  max: number;
}

export interface Observation {
  id: string;
  competitorId: string;
  page: string; // e.g. "Homepage", "Product Page — Nature's Blend"
  url: string;
  category: ObservationCategory;
  channel: ChannelType;
  capturedAt: string; // date this was verified live
  eventDate?: string; // if the underlying event has its own real date (e.g. a press announcement) distinct from capture date
  headline: string;
  quote: string; // the real quoted/paraphrased fact from the source
  evidenceType: EvidenceType;
  significance: number;
  significanceFactors: SignificanceFactor[];
  priority: Priority;
  confidence: number;
  confidenceBand: ConfidenceBand;
  goldenRelevance: GoldenRelevanceTag[];
  whyItMatters: string;
  suggestedAction?: string;
}

// ---- Product intelligence ---------------------------------------------------

export interface CompetitorProduct {
  id: string;
  competitorId: string;
  name: string;
  category: CompetitorCategory;
  petType: "Dog" | "Cat" | "Dog & Cat";
  format: string;
  claims: string[];
  priceDisplay: string; // human-readable, exactly as verified (may be a range)
  priceNumeric?: number; // set only when a single verified number exists, for sorting
  packSize?: string;
  subscriptionDetail?: string;
  certifications: string[];
  retailers: string[];
  priceVerified: boolean;
  priceNote?: string; // explains gaps, e.g. "Dynamic personalized pricing — no fixed SKU price published"
  sourceUrl: string;
  capturedAt: string;
}

// ---- Strategy library (grounded in real, currently-observable positioning) --

export interface StrategyCompetitorUsage {
  competitorId: string;
  emphasis: "Core Pillar" | "Prominent" | "Present" | "Minor";
  evidenceQuote: string;
  sourceUrl: string;
}

export interface Strategy {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  competitors: StrategyCompetitorUsage[];
  channelsObserved: ChannelType[];
  confidence: number;
  confidenceBand: ConfidenceBand;
  goldenExposure: GoldenRelevanceTag[];
  analystNote: string; // calibrated, evidence-linked "what this means" — never unsupported speculation
}

// ---- Strategic moves (real, press-confirmed, dated events only) ------------

export interface StrategicMove {
  id: string;
  competitorId: string | "upn" | "dr-marty" | "badlands-ranch"; // competitors or a Golden brand's own move, for "Golden vs Market" context
  isGoldenBrand: boolean;
  title: string;
  eventDate: string; // real date of the announcement/event
  summary: string;
  whyItMatters: string;
  sourceUrl: string;
  sourceLabel: string;
  confidence: number;
  confidenceBand: ConfidenceBand;
}

// ---- Narrative / category territory (qualitative, real-evidence-grounded) ---

export type TerritoryPresence = "Strong" | "Present" | "Emerging" | "Not Observed";

export interface NarrativeTerritory {
  id: string;
  name: string;
  description: string;
  // Structural read of who currently occupies this territory — NOT a
  // trend over time (this build has no historical data to support "growing"
  // or "declining" claims).
  trend: "Crowded" | "Contested" | "Emerging" | "Whitespace";
  trendRationale: string;
  occupants: { competitorId: string; presence: TerritoryPresence; evidenceQuote: string }[];
}

// ---- Watchlist & briefs -------------------------------------------------------

export type WatchTargetType = "Competitor" | "Product" | "Strategy" | "Territory";

export interface WatchItem {
  id: string;
  targetType: WatchTargetType;
  targetId: string;
  label: string;
  addedAt: string;
}

export interface BriefItem {
  headline: string;
  whyItMatters: string;
  observationId?: string;
}

export interface IntelligenceBrief {
  generatedAt: string;
  scope: string;
  keyFindings: BriefItem[];
  watchItems: BriefItem[];
  takeaway: string;
}
