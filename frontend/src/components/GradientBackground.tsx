export default function GradientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-indigo-400/25 via-violet-400/25 to-fuchsia-400/25 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-sky-300/20 via-emerald-300/20 to-teal-300/20 blur-3xl" />
    </div>
  );
}

