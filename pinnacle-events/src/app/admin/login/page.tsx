// app/(auth)/login/page.tsx

import { Suspense } from "react";
import { LoginForm } from "@/components/admin/auth/login-form";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Suspense>
        <LoginRedirect />
      </Suspense>

      <LoginForm />
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