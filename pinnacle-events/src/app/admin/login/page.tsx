import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/admin/auth/login-form";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Restrained brand glow -- per design system: "very subtle gradients, no loud colors" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(198,161,91,0.10) 0%, rgba(9,9,9,0) 70%)",
        }}
      />

      <Suspense>
        <LoginRedirect />
      </Suspense>

      <div className="relative z-10 w-full flex flex-col items-center">
        <Link href="/" className="mb-6 flex flex-col items-center gap-3 group">
          <span className="font-display text-2xl tracking-tight text-text-primary">
            PINNACLE <span className="text-gold-primary">EVENTS</span>
          </span>
          <span className="font-mono-tag text-[11px] text-text-tertiary group-hover:text-gold-primary transition-colors">
            Admin Access
          </span>
        </Link>

        <LoginForm />

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 text-xs text-text-tertiary hover:text-gold-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to pinnacleevents.co.in
        </Link>
      </div>
    </main>
  );
}

export async function LoginRedirect() {
  const session = await getSession();

  if (session) {
    redirect("/admin/works");
  }

  return null;
}