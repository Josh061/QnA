"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "@/components/AuthCard";
import { auth } from "@/lib/firebaseAuth";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { googleProvider, applyPersistence } from "@/lib/firebaseAuth";

const RegisterSchema = z
  .object({
    name: z.string().min(2, "Enter your name"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "At least 6 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });

type RegisterValues = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit = async (values: RegisterValues) => {
    await applyPersistence(true);
    const cred = await createUserWithEmailAndPassword(auth, values.email, values.password);
    if (values.name) {
      await updateProfile(cred.user, { displayName: values.name });
    }
    alert("Account created. You can now log in.");
  };

  return (
    <div className="mx-auto max-w-6xl py-12 sm:py-16">
      <AuthCard title="Create your account" subtitle="It only takes a minute">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Full name</label>
            <input
              type="text"
              className="w-full rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Jane Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
            )}
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <div>
              <label className="mb-1 block text-sm font-medium">Confirm</label>
              <input
                type="password"
                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                {...register("confirm")}
              />
              {errors.confirm && (
                <p className="mt-1 text-xs text-rose-600">{errors.confirm.message}</p>
              )}
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className="w-full rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitting ? "Creating…" : "Create account"}
          </button>
          <button
            type="button"
            onClick={async () => {
              await applyPersistence(true);
              await signInWithPopup(auth, googleProvider);
            }}
            className="w-full rounded-md border mt-2 border-black/10 dark:border-white/15 px-4 py-2.5 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-black/70 dark:text-white/70">
          Already have an account?{" "}
          <Link href="/login" className="underline-offset-4 hover:underline">
            Log in
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}

