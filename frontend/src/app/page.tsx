import Link from "next/link";

export default function Home() {
  return (
    <section className="relative mx-auto max-w-6xl py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500" />
            Discover your unique profile
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Uncover your personality and unlock your potential
          </h1>
          <p className="text-base sm:text-lg text-black/70 dark:text-white/70">
            Take a quick, science‑inspired personality test and get insights
            into your strengths, growth areas, and ideal paths.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-3 font-medium hover:opacity-90 transition shadow-sm"
            >
              Start the test
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 font-medium border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              I already have an account
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 -z-10 rounded-[28px] bg-gradient-to-tr from-indigo-400/25 via-violet-400/25 to-fuchsia-400/25 blur-2xl" />
          <div className="aspect-[4/3] rounded-[28px] border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur p-6 shadow-xl">
            <div className="grid grid-cols-3 gap-3 h-full">
              <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500/90" />
              <div className="rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500/90" />
              <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500/90" />
              <div className="rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500/90" />
              <div className="rounded-xl bg-gradient-to-br from-orange-500 to-rose-500/90" />
              <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-500/90" />
              <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500/90" />
              <div className="rounded-xl bg-gradient-to-br from-lime-500 to-emerald-500/90" />
              <div className="rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-500/90" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {["2 min", "Adaptive", "Actionable"].map((t) => (
          <div
            key={t}
            className="rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur p-4 text-sm"
          >
            <div className="font-semibold mb-1">{t}</div>
            <p className="text-black/70 dark:text-white/70">
              {t === "2 min"
                ? "Finish quickly and get instant results."
                : t === "Adaptive"
                ? "Smart questions that learn as you go."
                : "Clear recommendations you can use today."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
