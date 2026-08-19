import type { Source, SourceType } from "@/lib/types";
import { competitors } from "@/lib/data/competitors";

// Connector registry. "Connected" means this app can and did retrieve real
// data from that channel for this competitor right now. "Not Connected"
// means the channel requires credentials/infrastructure this environment
// does not have — see notConnectedReason. Nothing here is aspirational
// dressed up as live; the Sources page and the Refresh action both operate
// on exactly this registry.
const BLOCKED_DIRECT_FETCH = new Set(["the-farmers-dog", "petlab-co", "nutramax"]);

function buildSources(): Source[] {
  const out: Source[] = [];
  for (const c of competitors) {
    out.push({
      id: `src-${c.id}-web`,
      competitorId: c.id,
      type: "Brand Website",
      label: `${c.name} — brand website`,
      url: `https://${c.website}`,
      status: "Connected",
      captureMethod: BLOCKED_DIRECT_FETCH.has(c.id)
        ? "Direct fetch blocked by site (403/JS shell) — live search fallback used instead"
        : "Live fetch + extraction, this session"
    });
    out.push({
      id: `src-${c.id}-press`,
      competitorId: c.id,
      type: "Press / News",
      label: `${c.name} — press / trade coverage`,
      url: `https://www.google.com/search?q=${encodeURIComponent(c.name + " pet food news")}`,
      status: "Connected",
      captureMethod: "Live web search, this session"
    });
    out.push({
      id: `src-${c.id}-social`,
      competitorId: c.id,
      type: "Social Platform",
      label: `${c.name} — Instagram / TikTok / Facebook`,
      url: `https://instagram.com/${c.slug.replace(/-/g, "")}`,
      status: "Not Connected",
      captureMethod: "Would use each platform's official API or an approved social-listening provider",
      notConnectedReason: "No Instagram Graph API / TikTok Research API / approved social-listening credentials configured in this environment."
    });
    out.push({
      id: `src-${c.id}-adlib`,
      competitorId: c.id,
      type: "Ad Library",
      label: `${c.name} — Meta Ad Library`,
      url: `https://www.facebook.com/ads/library/?q=${encodeURIComponent(c.name)}`,
      status: "Not Connected",
      captureMethod: "Would use the Meta Ad Library API",
      notConnectedReason: "No Meta Ad Library API access token configured in this environment."
    });
    out.push({
      id: `src-${c.id}-retail`,
      competitorId: c.id,
      type: "Retailer Listing",
      label: `${c.name} — retailer product feeds`,
      url: `https://www.chewy.com/s?rh=${encodeURIComponent(c.name)}`,
      status: "Not Connected",
      captureMethod: "Would use retailer partner product-feed APIs (Chewy, Petco, Amazon, Target, Costco)",
      notConnectedReason: "No retailer partner API credentials configured in this environment."
    });
    out.push({
      id: `src-${c.id}-reviews`,
      competitorId: c.id,
      type: "Review Platform",
      label: `${c.name} — aggregated reviews`,
      url: `https://www.trustpilot.com/review/${c.website}`,
      status: "Not Connected",
      captureMethod: "Would use a review-aggregation API (e.g. Trustpilot, Yotpo) under its terms",
      notConnectedReason: "No review-platform API credentials configured in this environment."
    });
  }
  return out;
}

export const sources: Source[] = buildSources();

export function getSource(id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}

export function sourcesForCompetitor(competitorId: string): Source[] {
  return sources.filter((s) => s.competitorId === competitorId);
}

export function connectedSources(): Source[] {
  return sources.filter((s) => s.status === "Connected");
}

export function connectorSummary(): { type: SourceType; connected: number; total: number }[] {
  const types = Array.from(new Set(sources.map((s) => s.type)));
  return types.map((type) => {
    const all = sources.filter((s) => s.type === type);
    return { type, connected: all.filter((s) => s.status === "Connected").length, total: all.length };
  });
}
