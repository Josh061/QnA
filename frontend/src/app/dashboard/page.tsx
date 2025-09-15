"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type SavedResult = {
  id: string;
  createdAt: number; // epoch ms
  answers: Record<string, string>;
  summary?: {
    totalAnswered: number;
    sectionsUnlocked: boolean;
  };
};

export default function DashboardPage() {
  const [results, setResults] = useState<SavedResult[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("orangesv_results");
      if (raw) {
        const parsed = JSON.parse(raw) as SavedResult[];
        setResults(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      // ignore
    }
  }, []);

  const totalAttempts = results.length;
  const lastAttempt = results[0];
  const totalAnsweredAll = useMemo(
    () => results.reduce((acc, r) => acc + (r.summary?.totalAnswered ?? Object.keys(r.answers || {}).length), 0),
    [results]
  );

  return (
    <div className="mx-auto max-w-6xl py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">Welcome back to OrangeSV. Review your recent tests and continue your journey.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 p-4">
          <div className="text-sm text-black/60 dark:text-white/60">Total attempts</div>
          <div className="mt-1 text-2xl font-semibold">{totalAttempts}</div>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 p-4">
          <div className="text-sm text-black/60 dark:text-white/60">Total questions answered</div>
          <div className="mt-1 text-2xl font-semibold">{totalAnsweredAll}</div>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 p-4">
          <div className="text-sm text-black/60 dark:text-white/60">Last attempt</div>
          <div className="mt-1 text-lg font-medium">{lastAttempt ? new Date(lastAttempt.createdAt).toLocaleString() : "—"}</div>
        </div>
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 p-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-lg font-semibold">Recent tests</h2>
          <div className="flex items-center gap-2">
            {lastAttempt && (
              <Link href={{ pathname: "/test", query: { resume: lastAttempt.id } }} className="rounded-md px-4 py-2.5 border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition">Resume last attempt</Link>
            )}
            <Link href="/test" className="rounded-md bg-black text-white dark:bg:white dark:text-black px-4 py-2.5 font-medium hover:opacity-90 transition">Start new test</Link>
          </div>
        </div>
        <div className="mt-4 divide-y divide-black/10 dark:divide-white/10">
          {results.length === 0 ? (
            <div className="text-sm text-black/60 dark:text-white/60">No attempts yet. Take your first test.</div>
          ) : (
            results.slice(0, 10).map((r) => (
              <div key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">Attempt • {new Date(r.createdAt).toLocaleString()}</div>
                  <div className="text-sm text-black/60 dark:text-white/60">
                    {r.summary?.totalAnswered ?? Object.keys(r.answers || {}).length} answered · {r.summary?.sectionsUnlocked ? "Unlocked" : "Locked"}
                  </div>
                </div>
                <Link href={{ pathname: "/test", query: { resume: r.id } }} className="text-sm underline hover:opacity-80">Resume</Link>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 p-4">
          <h3 className="font-semibold">Tips to improve results</h3>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1 text-black/70 dark:text-white/70">
            <li>Answer consistently and avoid overthinking each item.</li>
            <li>Find a quiet space to stay focused.</li>
            <li>Return to the dashboard to track progress over time.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 p-4">
          <h3 className="font-semibold">What OrangeSV measures</h3>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">Your responses help surface patterns related to cooperation, leadership, planning, and social comfort to guide personal growth.</p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/40 p-4">
          <h3 className="font-semibold">Next steps</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link href="/test" className="rounded-md px-4 py-2.5 border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition text-sm">Retake test</Link>
            <Link href="/login" className="rounded-md px-4 py-2.5 border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg:white/10 transition text-sm">Sign in</Link>
            <Link href="/register" className="rounded-md px-4 py-2.5 border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition text-sm">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


