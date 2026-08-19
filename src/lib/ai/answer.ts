import { competitors, getCompetitor } from "@/lib/data/competitors";
import { observations } from "@/lib/data/observations";
import { strategies } from "@/lib/data/strategies";
import { strategicMoves } from "@/lib/data/strategicMoves";
import { relationshipsForBrand } from "@/lib/data/relationships";
import type { GoldenBrandId } from "@/lib/types";

// ---------------------------------------------------------------------------
// The "AI Analyst" here is deterministic retrieval + templated composition
// over the verified evidence base — NOT a call to an external LLM (this
// environment has no LLM API key configured server-side). It cannot
// hallucinate an unsupported claim because every sentence it produces is
// built directly from a stored record, and every answer carries real
// citations back to that record's source. This is intentionally the
// "Tier 0/1" layer described in the architecture notes; wiring an actual
// LLM in for Tier 3 free-form synthesis is a documented next step — see
// /sources.
// ---------------------------------------------------------------------------

export interface Citation {
  label: string;
  url: string;
}

export interface AnswerResult {
  answer: string;
  citations: Citation[];
}

function matchBrand(query: string): GoldenBrandId | undefined {
  const q = query.toLowerCase();
  if (q.includes("dr. marty") || q.includes("dr marty")) return "dr-marty";
  if (q.includes("badlands")) return "badlands-ranch";
  if (q.includes("upn") || q.includes("ultimate pet nutrition") || q.includes("nutra thrive") || q.includes("nutra complete")) return "upn";
  return undefined;
}

function matchCompetitor(query: string) {
  const q = query.toLowerCase();
  return competitors.find((c) => q.includes(c.name.toLowerCase()) || q.includes(c.slug.replace(/-/g, " ")));
}

const brandName: Record<GoldenBrandId, string> = { "dr-marty": "Dr. Marty Pets", "badlands-ranch": "Badlands Ranch", upn: "Ultimate Pet Nutrition" };

export function answerQuestion(query: string): AnswerResult {
  const q = query.toLowerCase();
  const brand = matchBrand(query);
  const competitor = matchCompetitor(query);
  const citations: Citation[] = [];

  // --- "biggest threat" for a Golden brand ---------------------------------
  if (brand && (q.includes("threat") || q.includes("biggest") || q.includes("worried"))) {
    const rels = relationshipsForBrand(brand);
    const top = rels[0];
    if (!top) return { answer: `No relationship data is on record for ${brandName[brand]} yet.`, citations: [] };
    const c = getCompetitor(top.competitorId)!;
    const relevantObs = observations
      .filter((o) => o.competitorId === c.id && o.goldenRelevance.some((g) => g.brandId === brand))
      .sort((a, b) => b.significance - a.significance)[0];
    citations.push({ label: `${c.name} relevance breakdown`, url: c.sourceUrl });
    if (relevantObs) citations.push({ label: relevantObs.headline, url: relevantObs.url });
    return {
      answer: `Based on the current relevance model, **${c.name}** is ${brand}'s highest-scored competitor (${top.score}/92, ${top.band} relevance), primarily on ${top.primaryOverlapCategory.toLowerCase()}.${
        relevantObs ? ` The most significant real, verified fact on record for them right now: "${relevantObs.headline}" — ${relevantObs.whyItMatters}` : ""
      } This is a scored assessment from real, current positioning data, not a prediction — click through to ${c.name}'s profile to see the full breakdown and evidence.`,
      citations
    };
  }

  // --- "is anyone copying X" / strategies touching a brand -----------------
  if (brand && (q.includes("cop") || q.includes("strateg"))) {
    const relevant = strategies.filter((s) => s.goldenExposure.some((g) => g.brandId === brand));
    if (relevant.length === 0) {
      return { answer: `No strategy in the current dataset shows direct exposure to ${brandName[brand]} — check back as more observations are captured.`, citations: [] };
    }
    relevant.forEach((s) => citations.push({ label: s.name, url: `/strategies/${s.slug}` }));
    const lines = relevant
      .map((s) => {
        const exp = s.goldenExposure.find((g) => g.brandId === brand)!;
        const names = s.competitors.map((c) => getCompetitor(c.competitorId)?.name).join(", ");
        return `**${s.name}** (${exp.level} exposure): observed at ${names}. ${exp.rationale}`;
      })
      .join("\n\n");
    return { answer: `${relevant.length} strategy pattern(s) in the current dataset have exposure to ${brandName[brand]}:\n\n${lines}`, citations };
  }

  // --- questions about a specific competitor --------------------------------
  if (competitor) {
    const obs = observations.filter((o) => o.competitorId === competitor.id).sort((a, b) => b.significance - a.significance);
    const top3 = obs.slice(0, 3);
    const moves = strategicMoves.filter((m) => m.competitorId === competitor.id);
    top3.forEach((o) => citations.push({ label: o.headline, url: o.url }));
    moves.forEach((m) => citations.push({ label: m.title, url: m.sourceUrl }));
    const factLines = top3.map((o) => `- ${o.headline} (verified ${o.capturedAt})`).join("\n");
    const moveLines = moves.map((m) => `- ${m.title} (${m.eventDate})`).join("\n");
    return {
      answer: `Here's what's verified about **${competitor.name}** right now:\n\n${factLines}${moveLines ? `\n\nStrategic moves:\n${moveLines}` : ""}\n\n${competitor.description}`,
      citations
    };
  }

  // --- legal / settlement / nutramax specific -------------------------------
  if (q.includes("nutramax") || q.includes("settlement") || q.includes("lawsuit") || q.includes("legal")) {
    const move = strategicMoves.find((m) => m.id === "move-nx-settlement")!;
    citations.push({ label: move.title, url: move.sourceUrl });
    return { answer: `${move.summary}\n\n${move.whyItMatters}`, citations };
  }

  // --- promotional / discount landscape -------------------------------------
  if (q.includes("discount") || q.includes("promo") || q.includes("price war") || q.includes("pricing")) {
    const strat = strategies.find((s) => s.id === "current-promotional-intensity")!;
    strat.competitors.forEach((c) => citations.push({ label: getCompetitor(c.competitorId)?.name ?? c.competitorId, url: c.sourceUrl }));
    const lines = strat.competitors.map((c) => `- ${getCompetitor(c.competitorId)?.name}: "${c.evidenceQuote}"`).join("\n");
    return { answer: `${strat.description}\n\n${lines}\n\n${strat.analystNote}`, citations };
  }

  // --- retail expansion ------------------------------------------------------
  if (q.includes("retail") || q.includes("walmart") || q.includes("costco") || q.includes("expansion")) {
    const relevant = strategicMoves.filter((m) => m.id === "move-fd-walmart" || m.id === "move-upn-psp");
    relevant.forEach((m) => citations.push({ label: m.title, url: m.sourceUrl }));
    const lines = relevant.map((m) => `- **${m.title}** (${m.eventDate}): ${m.summary}`).join("\n\n");
    return { answer: `The clearest real retail-distribution developments on record:\n\n${lines}`, citations };
  }

  // --- new products / launches ------------------------------------------------
  if (q.includes("new product") || q.includes("launch")) {
    const relevant = strategicMoves.filter((m) => !m.isGoldenBrand);
    relevant.forEach((m) => citations.push({ label: m.title, url: m.sourceUrl }));
    return {
      answer:
        relevant.length > 0
          ? `Real, confirmed launches/expansions on record:\n\n${relevant.map((m) => `- **${m.title}** (${m.eventDate}): ${m.summary}`).join("\n\n")}`
          : "No confirmed new product launches are on record yet for tracked competitors. We only surface press-confirmed launches here, not speculative signals.",
      citations
    };
  }

  // --- fallback: generic keyword retrieval -------------------------------------
  const terms = q.split(/\s+/).filter((t) => t.length > 3);
  const scored = observations
    .map((o) => {
      const blob = `${o.headline} ${o.quote} ${o.category}`.toLowerCase();
      const score = terms.reduce((acc, t) => acc + (blob.includes(t) ? 1 : 0), 0);
      return { o, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (scored.length === 0) {
    return {
      answer:
        "I couldn't find a verified fact matching that in the current evidence base. Try asking about a specific brand (Dr. Marty, Badlands Ranch, UPN), a competitor by name, pricing/discounts, retail expansion, or recent strategic moves — everything I answer is grounded in the Observations, Strategies, and Strategic Moves data, with citations.",
      citations: []
    };
  }
  scored.forEach(({ o }) => citations.push({ label: o.headline, url: o.url }));
  const lines = scored.map(({ o }) => `- ${o.headline} (${getCompetitor(o.competitorId)?.name}, verified ${o.capturedAt}): ${o.quote}`).join("\n\n");
  return { answer: `Closest matches from the verified evidence base:\n\n${lines}`, citations };
}

export const SUGGESTED_QUESTIONS = [
  "What's the biggest real threat to Dr. Marty right now?",
  "Is anyone copying Badlands Ranch's positioning?",
  "What happened with Nutramax?",
  "What's the current promotional/discount landscape?",
  "What real retail expansions happened this year?",
  "What is Zesty Paws doing?"
];
