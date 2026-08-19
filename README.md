# Golden Pet Brands — Competitive Intelligence Command Center

A competitive intelligence tool for Golden Pet Brands (Dr. Marty Pets, Badlands Ranch, Ultimate Pet Nutrition) covering 12 real competitors across freeze-dried/air-dried/fresh food and joint/gut-health/multivitamin supplements.

**Every fact in this build is real**, captured live from competitor websites and live web search — no fabricated data. See [`src/lib/data/README.md`](src/lib/data/README.md) for the full data-honesty contract and [`src/lib/types.ts`](src/lib/types.ts) for the underlying model.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` produces a production build; `npm run test` runs the unit tests in `src/lib/__tests__`.

## Architecture

```
Sources (brand websites, live search)
   │  live fetch / live search, this session
   ▼
Observations   (verified, single-point-in-time facts, with significance scoring)
   │  cross-competitor synthesis
   ▼
Strategies     (patterns visible across ≥1 competitor today)
Strategic Moves (real, press-confirmed, dated events)
Narrative Map  (qualitative territory occupancy)
   │
   ▼
Competitor Relevance Score (explainable 0–92 methodology, per Golden brand)
   │
   ▼
UI: Today / Brands / Competitors / Observations / Strategies / Products /
    Narrative Map / Strategic Moves / Ask AI / Watchlist / Sources
```

- **Data layer**: `src/lib/data/*.ts` — typed, hand-verified records (see honesty contract). Structured so a Prisma-backed Postgres implementation could swap in behind the same shapes without touching a page or component.
- **Scoring**: `src/lib/scoring.ts` — the Competitive Relevance Score and Observation Significance Score are both explainable, weighted sums, never a black-box number.
- **AI Analyst**: `src/lib/ai/answer.ts` — deterministic retrieval + templated composition over the verified evidence base, not a call to an external LLM (no LLM API key is configured in this environment). Every answer cites real records; it says "I don't know" rather than guessing when nothing matches.
- **Live refresh**: `src/app/api/refresh/route.ts` — a real server-side re-fetch of every connected brand website, with real HTTP status and content-hash drift detection. Triggered manually from the Today page or `/sources`, and automatically once a day via the Vercel Cron job in `vercel.json` (optionally secured with a `CRON_SECRET` env var). This is genuinely live, not simulated.

## MVP vs. Next vs. Later

**Shipped in this build (MVP):**
- Golden brand profiles with real, cited pricing/positioning
- Automated-methodology competitor discovery & classification (12 competitors, tier + relevance score)
- Explainable Competitive Relevance Score with full breakdown
- Verified Observations with significance scoring and Fact/Inference/Hypothesis labeling
- Cross-competitor Strategy library grounded in real evidence
- Real, press-confirmed Strategic Moves feed (not speculative launch radar)
- Market Narrative Map (qualitative territory occupancy)
- Product & price comparison, with unverified prices explicitly marked rather than guessed
- Grounded, cited AI Analyst (Ask AI)
- Watchlist (local, client-side)
- Sources/observability page with a real live "Refresh" action

**Next (needs credentials this environment doesn't have):**
- Wire the Meta Ad Library API for real creative intelligence
- Wire an approved social-listening provider (Instagram Graph API / TikTok Research API) for real cadence/engagement baselines
- Wire retailer partner feeds (Chewy, Petco, Amazon, Costco) for real assortment/OOS tracking
- Connect an LLM API key server-side to move the AI Analyst from retrieval-only to full free-form synthesis (Tier 3 in the architecture notes), and to auto-classify newly fetched content into structured Observations
- Background job scheduler (currently the refresh action is manual/on-demand) with idempotent jobs and retry, per-source health alerting in `/sources`
- Auth (this is a local/internal build with no login)

**Later:**
- Historical time-series once the pipeline has actually run for weeks: real price history, real week-over-week social deltas, real before/after website diffs, real ad-rotation duration — all deliberately absent today rather than faked
- Daily/weekly/monthly auto-generated briefs and exports (PDF/Slack/email)
- Multi-user collaboration (comments, @mentions, assignments)
- Natural-language filtering ("show pricing changes from major Dr. Marty competitors in the last 90 days") once real time-series data exists to filter

## Design

Custom design system (not a stock admin template): a warm paper/ink palette with a restrained brass accent, `Fraunces` display serif for headings paired with `Inter`/system sans for UI, and progressive disclosure everywhere (`<details>`-based "Why should I care?" / "Show evidence" / significance breakdowns) so the executive view stays uncluttered while the underlying evidence is always one click away.
