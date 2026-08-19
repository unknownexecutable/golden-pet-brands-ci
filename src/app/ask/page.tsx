"use client";

import { useState } from "react";
import Link from "next/link";
import { answerQuestion, SUGGESTED_QUESTIONS, type Citation } from "@/lib/ai/answer";

interface Turn {
  question: string;
  answer: string;
  citations: Citation[];
}

function AnswerText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-sm text-ink-700 leading-relaxed whitespace-pre-line">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink-900">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

function CitationLink({ c }: { c: Citation }) {
  if (c.url.startsWith("/")) {
    return (
      <Link href={c.url} className="pill bg-ink-100 text-ink-600 hover:bg-ink-200">
        {c.label}
      </Link>
    );
  }
  return (
    <a href={c.url} target="_blank" rel="noreferrer" className="pill bg-ink-100 text-ink-600 hover:bg-ink-200">
      {c.label} ↗
    </a>
  );
}

export default function AskPage() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");

  function ask(question: string) {
    if (!question.trim()) return;
    const { answer, citations } = answerQuestion(question);
    setTurns((t) => [...t, { question, answer, citations }]);
    setInput("");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <p className="kicker">Grounded retrieval over the verified evidence base — not a general-purpose chatbot</p>
        <h1 className="text-3xl mt-1">Ask the analyst</h1>
        <p className="text-ink-500 mt-2 leading-relaxed">
          Every answer is composed directly from stored Observations, Strategies, and Strategic Moves and carries real citations. If nothing in the
          evidence base matches your question, it says so instead of guessing.
        </p>
      </div>

      {turns.length === 0 && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button key={q} onClick={() => ask(q)} className="pill border border-ink-200 bg-white text-ink-600 hover:border-brass-300 hover:text-brass-700">
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-5">
        {turns.map((t, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-end">
              <div className="bg-ink-900 text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%] text-sm">{t.question}</div>
            </div>
            <div className="card p-5">
              <AnswerText text={t.answer} />
              {t.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-ink-100 flex flex-wrap gap-1.5">
                  {t.citations.map((c, ci) => (
                    <CitationLink key={ci} c={c} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="sticky bottom-4 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a brand, competitor, pricing, or strategy…"
          className="flex-1 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm shadow-card focus:outline-none focus:ring-2 focus:ring-brass-300"
        />
        <button type="submit" className="rounded-full bg-ink-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-ink-800">
          Ask
        </button>
      </form>
    </div>
  );
}
