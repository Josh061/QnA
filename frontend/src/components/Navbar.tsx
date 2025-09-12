"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isAuth = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur supports-[backdrop-filter]:bg-white/50 border-b border-black/5 dark:supports-[backdrop-filter]:bg-black/30 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-bold shadow-sm">P</span>
          <span className="text-sm sm:text-base font-semibold tracking-tight">Persona</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3 text-sm">
          {!isAuth && (
            <>
              <Link href="/login" className="px-3 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition">Log in</Link>
              <Link href="/register" className="px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">Get started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

