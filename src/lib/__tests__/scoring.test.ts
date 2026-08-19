import { describe, expect, it } from "vitest";
import {
  RELEVANCE_MAX,
  confidenceBand,
  priorityFromSignificance,
  relevanceBand,
  relevanceScore,
  significanceScore
} from "@/lib/scoring";
import { relationships } from "@/lib/data/relationships";
import { observations } from "@/lib/data/observations";
import { competitors } from "@/lib/data/competitors";
import { goldenBrands } from "@/lib/data/goldenBrands";
import { products } from "@/lib/data/products";
import { sources } from "@/lib/data/sources";

describe("relevance scoring", () => {
  it("sums the six weighted dimensions", () => {
    const score = relevanceScore({
      categoryOverlap: 10,
      customerOverlap: 10,
      priceOverlap: 10,
      marketingOverlap: 10,
      retailOverlap: 10,
      searchOverlap: 10,
      rationale: { category: "", customer: "", price: "", marketing: "", retail: "", search: "" }
    });
    expect(score).toBe(60);
  });

  it("never exceeds the documented max of 92", () => {
    const max = relevanceScore({
      categoryOverlap: 30,
      customerOverlap: 22,
      priceOverlap: 15,
      marketingOverlap: 12,
      retailOverlap: 8,
      searchOverlap: 5,
      rationale: { category: "", customer: "", price: "", marketing: "", retail: "", search: "" }
    });
    expect(max).toBe(RELEVANCE_MAX);
  });

  it("bands scores monotonically (higher score never yields a lower band)", () => {
    const bandRank = { Minimal: 0, Low: 1, Medium: 2, High: 3, "Very High": 4 } as const;
    for (let s = 0; s < RELEVANCE_MAX; s++) {
      expect(bandRank[relevanceBand(s + 1)]).toBeGreaterThanOrEqual(bandRank[relevanceBand(s)]);
    }
  });

  it("every stored relationship's score matches recomputing it from its own breakdown", () => {
    for (const r of relationships) {
      expect(relevanceScore(r.breakdown)).toBe(r.score);
      expect(relevanceBand(r.score)).toBe(r.band);
    }
  });
});

describe("significance scoring", () => {
  it("sums the four weighted dimensions", () => {
    const score = significanceScore({ strategicRelevance: 10, distinctiveness: 5, goldenExposure: 5, evidenceStrength: 5 });
    expect(score).toBe(25);
  });

  it("priority thresholds are ordered and non-overlapping", () => {
    expect(priorityFromSignificance(0)).toBe("routine");
    expect(priorityFromSignificance(34)).toBe("routine");
    expect(priorityFromSignificance(35)).toBe("watch");
    expect(priorityFromSignificance(64)).toBe("watch");
    expect(priorityFromSignificance(65)).toBe("high");
    expect(priorityFromSignificance(100)).toBe("high");
  });

  it("every stored observation's significance and priority match recomputing from its own factors", () => {
    for (const o of observations) {
      const recomputed = o.significanceFactors.reduce((sum, f) => sum + f.points, 0);
      expect(recomputed).toBe(o.significance);
      expect(priorityFromSignificance(o.significance)).toBe(o.priority);
      expect(o.significanceFactors.every((f) => f.points <= f.max && f.points >= 0)).toBe(true);
    }
  });
});

describe("confidence banding", () => {
  it("bands at the documented thresholds", () => {
    expect(confidenceBand(79)).toBe("Medium");
    expect(confidenceBand(80)).toBe("High");
    expect(confidenceBand(54)).toBe("Low");
    expect(confidenceBand(55)).toBe("Medium");
  });

  it("every stored observation's confidenceBand matches its confidence value", () => {
    for (const o of observations) {
      expect(o.confidenceBand).toBe(confidenceBand(o.confidence));
    }
  });
});

describe("data integrity / provenance", () => {
  it("has no duplicate observation ids", () => {
    const ids = observations.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has no duplicate competitor ids or slugs", () => {
    expect(new Set(competitors.map((c) => c.id)).size).toBe(competitors.length);
    expect(new Set(competitors.map((c) => c.slug)).size).toBe(competitors.length);
  });

  it("every observation references a real competitor", () => {
    const ids = new Set(competitors.map((c) => c.id));
    for (const o of observations) expect(ids.has(o.competitorId)).toBe(true);
  });

  it("every relationship references a real competitor and a real Golden brand", () => {
    const competitorIds = new Set(competitors.map((c) => c.id));
    const brandIds = new Set(goldenBrands.map((b) => b.id));
    for (const r of relationships) {
      expect(competitorIds.has(r.competitorId)).toBe(true);
      expect(brandIds.has(r.goldenBrandId)).toBe(true);
    }
  });

  it("every product references a real competitor, and unverified prices carry an explanatory note", () => {
    const ids = new Set(competitors.map((c) => c.id));
    for (const p of products) {
      expect(ids.has(p.competitorId)).toBe(true);
      if (!p.priceVerified) expect(p.priceNote).toBeTruthy();
    }
  });

  it("every 'Not Connected' source carries a reason (data honesty contract)", () => {
    for (const s of sources) {
      if (s.status === "Not Connected") expect(s.notConnectedReason).toBeTruthy();
    }
  });

  it("capturedAt and eventDate are always valid, parseable dates", () => {
    // Note: eventDate is not required to precede capturedAt — some observations
    // (e.g. a promotion tied to an upcoming holiday) are legitimately dated
    // for a real future event relative to the day they were captured.
    for (const o of observations) {
      expect(Number.isNaN(Date.parse(o.capturedAt))).toBe(false);
      if (o.eventDate) expect(Number.isNaN(Date.parse(o.eventDate))).toBe(false);
    }
  });
});
