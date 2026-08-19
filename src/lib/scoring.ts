import type { RelevanceBreakdown, RelevanceLevel } from "@/lib/types";

// ---------------------------------------------------------------------------
// Explainable scoring models. These are analytical methodologies applied to
// verified real facts — every number the app surfaces can be decomposed back
// into human-readable factors. See "Do not use arbitrary black-box scores."
// ---------------------------------------------------------------------------

export const RELEVANCE_WEIGHTS = {
  categoryOverlap: 30,
  customerOverlap: 22,
  priceOverlap: 15,
  marketingOverlap: 12,
  retailOverlap: 8,
  searchOverlap: 5
} as const;

export const RELEVANCE_MAX =
  RELEVANCE_WEIGHTS.categoryOverlap +
  RELEVANCE_WEIGHTS.customerOverlap +
  RELEVANCE_WEIGHTS.priceOverlap +
  RELEVANCE_WEIGHTS.marketingOverlap +
  RELEVANCE_WEIGHTS.retailOverlap +
  RELEVANCE_WEIGHTS.searchOverlap; // 92

export function relevanceScore(b: RelevanceBreakdown): number {
  return (
    b.categoryOverlap +
    b.customerOverlap +
    b.priceOverlap +
    b.marketingOverlap +
    b.retailOverlap +
    b.searchOverlap
  );
}

export function relevanceBand(score: number): RelevanceLevel {
  const pct = (score / RELEVANCE_MAX) * 100;
  if (pct >= 78) return "Very High";
  if (pct >= 58) return "High";
  if (pct >= 36) return "Medium";
  if (pct >= 18) return "Low";
  return "Minimal";
}

export const RELEVANCE_BAND_COLOR: Record<RelevanceLevel, string> = {
  "Very High": "text-signal-high",
  High: "text-brass-600",
  Medium: "text-ink-600",
  Low: "text-ink-400",
  Minimal: "text-ink-300"
};

// ---- Significance model (per observation) -----------------------------------
// A snapshot-appropriate model: it scores how significant a single verified,
// point-in-time fact is. It deliberately does NOT include "novelty" or
// "persistence" dimensions, because scoring those honestly requires a change
// history this MVP does not have (see types.ts data-honesty contract).

export interface SignificanceInput {
  strategicRelevance: number; // 0-35 : does it touch a core positioning/pricing pillar
  distinctiveness: number; // 0-25 : how unusual or differentiated vs. the category norm
  goldenExposure: number; // 0-25 : how directly it touches a Golden brand's territory
  evidenceStrength: number; // 0-15 : directness/reliability of the source
}

export const SIGNIFICANCE_MAX = 35 + 25 + 25 + 15; // 100

export function significanceScore(i: SignificanceInput): number {
  return i.strategicRelevance + i.distinctiveness + i.goldenExposure + i.evidenceStrength;
}

export function priorityFromSignificance(score: number): "high" | "watch" | "routine" {
  if (score >= 65) return "high";
  if (score >= 35) return "watch";
  return "routine";
}

export function confidenceBand(pct: number): "High" | "Medium" | "Low" {
  if (pct >= 80) return "High";
  if (pct >= 55) return "Medium";
  return "Low";
}
