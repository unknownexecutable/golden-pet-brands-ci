# Data honesty contract

Every file in this directory is either:

1. **Directly captured** — the app (or the Claude session that built this MVP) fetched the named URL live and recorded what it found, with a `capturedAt` date; or
2. **Search-derived** — a live web search returned the fact, cited to a real article/press release, with a note that it's search-derived rather than a direct fetch (treated as Medium confidence); or
3. **Explicitly marked unavailable** — `priceVerified: false` / `status: "Not Connected"` / `notConnectedReason: "..."` rather than a invented value.

Nothing in this dataset is fabricated. There is deliberately **no price history, no week-over-week social cadence, no ad-rotation duration, and no before/after website diff** — producing any of that honestly requires a monitoring pipeline that has actually been running over time, which does not exist on day one of a new build. See `src/lib/types.ts` for the full contract and `/sources` in the running app for exactly which channels are live-connected.

## Files

| File | What it holds | How it's grounded |
|---|---|---|
| `goldenBrands.ts` | Dr. Marty, Badlands Ranch, UPN profiles + real pricing | Live-fetched brand sites |
| `competitors.ts` | 12 tracked competitors | Live-fetched sites, or live search where a fetch was blocked (noted per record) |
| `relationships.ts` | Competitive Relevance Score (0–92) per competitor × Golden brand | Analytical methodology (see `scoring.ts`) applied to the real facts above |
| `observations.ts` | Verified, single-point-in-time facts | Live-fetched pages / live search, each with a real quote + source URL |
| `strategies.ts` | Cross-competitor positioning patterns | Composed from real observations across ≥1 competitor |
| `strategicMoves.ts` | Press-confirmed, dated events only (no speculative "possible launch" signals) | Live search of trade press / PR wires |
| `narrative.ts` | Market narrative map (qualitative occupancy, not a fabricated trend) | Real claims quoted per competitor |
| `products.ts` | Product/price comparison | Verified prices where found; explicit `priceVerified: false` + `priceNote` where not |
| `sources.ts` | Connector registry (Connected vs. Not Connected, and why) | Reflects exactly what this build can and cannot reach |

## Extending this to a real production pipeline

The MVP-vs-Next-vs-Later plan (see project root `README.md`) covers this in detail. In short:

- **Now**: `Brand Website` + `Press / News` channels are live (direct fetch or live search).
- **Next**: wire the Meta Ad Library API, an approved social-listening provider, and retailer partner feeds — the `Source` / `ConnectorStatus` model in `types.ts` and the registry in `sources.ts` are already shaped for this; a new connector just flips `status` to `"Connected"` and starts populating real `Observation` records.
- **Later**: once a monitoring pipeline has run for weeks, reintroduce time-series types (`PriceHistory`, `SocialSignal` with real deltas, `WebsiteChange` with real before/after) — these were deliberately removed from this build rather than faked.
