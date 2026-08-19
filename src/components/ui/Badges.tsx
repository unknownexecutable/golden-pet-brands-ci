import type { ConfidenceBand, ConnectorStatus, EvidenceType, Priority, RelevanceLevel, TerritoryPresence } from "@/lib/types";

export function PriorityBadge({ priority }: { priority: Priority }) {
  const map: Record<Priority, { label: string; cls: string; dot: string }> = {
    high: { label: "High Priority", cls: "bg-signal-highBg text-signal-high", dot: "bg-signal-high" },
    watch: { label: "Worth Watching", cls: "bg-signal-watchBg text-signal-watch", dot: "bg-signal-watch" },
    routine: { label: "Routine", cls: "bg-signal-routineBg text-signal-routine", dot: "bg-signal-routine" }
  };
  const m = map[priority];
  return (
    <span className={`pill ${m.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

export function ConfidenceBadge({ confidence, band }: { confidence: number; band: ConfidenceBand }) {
  const cls =
    band === "High" ? "bg-ink-50 text-ink-700 border-ink-200" : band === "Medium" ? "bg-brass-50 text-brass-700 border-brass-200" : "bg-ink-50 text-ink-400 border-ink-100";
  return (
    <span className={`pill border ${cls}`} title={`Confidence: ${confidence}%`}>
      {band} confidence
    </span>
  );
}

export function EvidenceTypeBadge({ type }: { type: EvidenceType }) {
  const map: Record<EvidenceType, string> = {
    FACT: "bg-ink-800 text-white",
    INFERENCE: "bg-brass-500 text-white",
    HYPOTHESIS: "bg-ink-100 text-ink-500"
  };
  return <span className={`pill ${map[type]} font-semibold tracking-wide`}>{type}</span>;
}

export function RelevanceBadge({ band }: { band: RelevanceLevel }) {
  const map: Record<RelevanceLevel, string> = {
    "Very High": "bg-signal-highBg text-signal-high",
    High: "bg-brass-100 text-brass-700",
    Medium: "bg-ink-100 text-ink-600",
    Low: "bg-ink-50 text-ink-400",
    Minimal: "bg-ink-50 text-ink-300"
  };
  return <span className={`pill ${map[band]}`}>{band} relevance</span>;
}

export function PresenceBadge({ presence }: { presence: TerritoryPresence }) {
  const map: Record<TerritoryPresence, string> = {
    Strong: "bg-ink-800 text-white",
    Present: "bg-brass-200 text-brass-800",
    Emerging: "bg-ink-100 text-ink-600",
    "Not Observed": "bg-ink-50 text-ink-300"
  };
  return <span className={`pill ${map[presence]}`}>{presence}</span>;
}

export function ConnectorBadge({ status }: { status: ConnectorStatus }) {
  return status === "Connected" ? (
    <span className="pill bg-signal-routineBg text-signal-routine">
      <span className="h-1.5 w-1.5 rounded-full bg-signal-routine" /> Connected
    </span>
  ) : (
    <span className="pill bg-ink-50 text-ink-400">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-300" /> Not Connected
    </span>
  );
}

export function GoldenBrandChip({ id, level }: { id: "dr-marty" | "badlands-ranch" | "upn"; level?: RelevanceLevel }) {
  const names: Record<string, string> = { "dr-marty": "Dr. Marty", "badlands-ranch": "Badlands Ranch", upn: "UPN" };
  const colors: Record<string, string> = { "dr-marty": "border-golden-drmarty text-golden-drmarty", "badlands-ranch": "border-golden-badlands text-golden-badlands", upn: "border-golden-upn text-golden-upn" };
  return (
    <span className={`pill border ${colors[id]} bg-white`}>
      {names[id]}
      {level ? <span className="text-ink-400">· {level}</span> : null}
    </span>
  );
}
