"use client";
import { useEffect, useMemo, useState } from "react";

type Question = {
  id: string;
  question: string;
  options?: string[];
  type?: string;
};

type Section = {
  title: string;
  questions: { question: string; options?: string[]; type?: string }[];
};

export default function TestPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sections, setSections] = useState<Section[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [hasPaid, setHasPaid] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/survey", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load survey");
        }
        setQuestions(data.questions || []);
        if (Array.isArray(data.sections) && data.sections.length > 0) {
          setSections(data.sections);
        } else {
          setSections(null);
        }
        // If resume param is present, hydrate answers from localStorage
        try {
          const params = new URLSearchParams(window.location.search);
          const resumeId = params.get("resume");
          if (resumeId) {
            const raw = localStorage.getItem("orangesv_results");
            if (raw) {
              const list = JSON.parse(raw) as Array<{ id: string; answers?: Record<string, string>; summary?: { sectionsUnlocked?: boolean } }>;
              const found = list.find((r) => r.id === resumeId);
              if (found) {
                setAnswers(found.answers || {});
                if (found.summary?.sectionsUnlocked) {
                  setHasPaid(true);
                }
              }
            }
          }
        } catch {}
      } catch (e) {
        const message = (e as Error).message || "Failed to load survey";
        console.error("/api/survey error:", message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const entry = {
        id: `${Date.now()}`,
        createdAt: Date.now(),
        answers,
        summary: {
          totalAnswered: Object.keys(answers || {}).length,
          sectionsUnlocked: Boolean(hasPaid),
        },
      };
      const raw = localStorage.getItem("orangesv_results");
      const list: Array<{ id: string }> = raw ? JSON.parse(raw) : [];
      const next = [entry, ...list].slice(0, 50);
      localStorage.setItem("orangesv_results", JSON.stringify(next));
    } catch {}
    alert("Submitted! Redirecting to your dashboard.");
    window.location.href = "/dashboard";
  };

  type FlatQuestion = { id: string; question: string; options?: string[]; sectionTitle?: string };
  const flatQuestions: FlatQuestion[] = useMemo(() => {
    if (sections && sections.length > 0) {
      const out: FlatQuestion[] = [];
      sections.forEach((section, sIndex) => {
        section.questions.forEach((q, qIndex) => {
          const id = `${sIndex + 1}-${qIndex + 1}`;
          const options = q.options && q.options.length > 0 ? q.options : ["True", "False"];
          out.push({ id, question: q.question, options, sectionTitle: section.title });
        });
      });
      return out;
    }
    return questions.map((q) => ({ id: q.id, question: q.question, options: q.options && q.options.length > 0 ? q.options : ["True", "False"] }));
  }, [sections, questions]);

  const firstSectionEndIndex = useMemo(() => {
    if (sections && sections.length > 0) {
      const firstSectionCount = sections[0]?.questions?.length || 0;
      if (firstSectionCount > 0) {
        return firstSectionCount - 1;
      }
    }
    return null;
  }, [sections]);

  const totalSteps = Math.max(1, flatQuestions.length);
  const current = flatQuestions[Math.min(step, Math.max(0, totalSteps - 1))];
  const canProceed = current ? Boolean(answers[current.id]) : false;

  const goNext = () => {
    if (!(step < totalSteps - 1 && canProceed)) return;
    if (firstSectionEndIndex !== null && step === firstSectionEndIndex && !hasPaid) {
      setShowPaywall(true);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep((p) => p + 1);
  };

  const goPrev = () => {
    if (step > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStep((p) => p - 1);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl py-12 sm:py-16">Loading survey…</div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl py-12 sm:py-16 text-rose-600">{error}</div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-12 sm:py-16">
      {showPaywall && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-md rounded-xl bg-white dark:bg-[#0b0b0f] border border-black/10 dark:border-white/10 p-6 shadow-2xl">
            <h2 className="text-lg font-semibold">Unlock full test</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Complete a quick demo payment to continue to the next sections.
            </p>
            <div className="mt-4 rounded-lg border border-black/10 dark:border-white/10 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-base font-medium">OrangeSV Premium</span>
                <span className="text-xl font-semibold">$1.00</span>
              </div>
              <p className="text-xs text-black/60 dark:text-white/60 mt-1">Demo plan for testing only</p>
              <ul className="mt-3 text-sm list-disc pl-5 space-y-1 text-black/70 dark:text-white/70">
                <li>Unlock all remaining sections</li>
                <li>Instant access to results</li>
                <li>Cancellable anytime (demo)</li>
              </ul>
            </div>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPaywall(false)}
                className="rounded-md px-4 py-2.5 font-medium transition border border-black/10 dark:border-white/20"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={async () => {
                  setIsProcessingPayment(true);
                  await new Promise((r) => setTimeout(r, 1200));
                  setHasPaid(true);
                  setShowPaywall(false);
                  setIsProcessingPayment(false);
                  // Advance to next question after payment
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setStep((p) => Math.min(p + 1, Math.max(0, totalSteps - 1)));
                }}
                disabled={isProcessingPayment}
                className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {isProcessingPayment ? "Processing…" : "Pay $1.00 to continue"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-semibold">Your Test</h1>
        <div className="mt-2 flex items-center justify-between text-sm text-black/70 dark:text-white/70">
          <span>Question {Math.min(step + 1, totalSteps)}</span>
          <span>
            {Object.keys(answers).length} answered
          </span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-black/10 dark:bg-white/15 overflow-hidden">
          <div
            className="h-full bg-black dark:bg-white transition-all"
            style={{ width: `${Math.round(((step + (canProceed ? 1 : 0)) / Math.max(1, totalSteps)) * 100)}%` }}
          />
        </div>
        {current?.sectionTitle && (
          <div className="mt-3 text-sm font-medium text-black/80 dark:text-white/80">{current.sectionTitle}</div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {current && (
          <div className="rounded-xl border border-black/10 dark:border-white/15 p-4 card-hover animate-fade-in">
            <p className="font-medium mb-3">{current.question}</p>
            {current.options && current.options.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {current.options.map((opt) => {
                  const checked = answers[current.id] === opt;
                  return (
                    <label
                      key={opt}
                      className={`relative flex items-center justify-between gap-3 cursor-pointer rounded-lg border p-3 transition ${checked ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-500/10" : "border-black/10 dark:border-white/15 hover:border-indigo-300/80"}`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={current.id}
                          value={opt}
                          checked={checked}
                          onChange={(e) => setAnswer(current.id, e.target.value)}
                          className="h-4 w-4 accent-indigo-600"
                        />
                        <span className="select-none">{opt}</span>
                      </div>
                      <span className={`h-2 w-2 rounded-full ${checked ? "bg-indigo-600 animate-pulse-soft" : "bg-black/10 dark:bg-white/20"}`} />
                    </label>
                  );
                })}
              </div>
            ) : (
              <input
                type="text"
                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                value={answers[current.id] || ""}
                onChange={(e) => setAnswer(current.id, e.target.value)}
                placeholder="Type your answer"
              />
            )}
          </div>
        )}

        {totalSteps > 0 && (
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={step === 0}
              className="rounded-md px-4 py-2.5 font-medium transition border border-black/10 dark:border-white/20 disabled:opacity-50"
            >
              Previous
            </button>

            {step < totalSteps - 1 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canProceed}
                className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 font-medium hover:opacity-90 transition"
              >
                Submit
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}


