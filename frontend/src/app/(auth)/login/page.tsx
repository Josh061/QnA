"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "@/components/AuthCard";
import { auth } from "@/lib/firebaseAuth";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, applyPersistence } from "@/lib/firebaseAuth";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginValues = z.infer<typeof LoginSchema>;

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (values: LoginValues) => {
    await applyPersistence(Boolean(values.remember));
    await signInWithEmailAndPassword(auth, values.email, values.password);
    const redirectTo = searchParams.get("redirect") || "/test";
    router.push(redirectTo);
  };

  return (
    <div className="mx-auto max-w-6xl py-12 sm:py-16">
      <AuthCard title="Welcome back" subtitle="Log in to continue your test">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>
            )}
          </div>

          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("remember")} className="h-4 w-4 accent-indigo-600" />
            Remember me
          </label>

          <button
            disabled={isSubmitting}
            className="w-full rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
          <button
            type="button"
            onClick={async () => {
              await applyPersistence(true);
              await signInWithPopup(auth, googleProvider);
              const redirectTo = searchParams.get("redirect") || "/test";
              router.push(redirectTo);
            }}
            className="w-full rounded-md border mt-2 border-black/10 dark:border-white/15 px-4 py-2.5 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-black/70 dark:text-white/70">
          No account?{" "}
          <Link href="/register" className="underline-offset-4 hover:underline">
            Create one
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl py-12 sm:py-16">Loading…</div>}>
      <LoginPageInner />
    </Suspense>
  );
}

