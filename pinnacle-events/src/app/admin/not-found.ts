// app/admin/not-found.tsx

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function AdminNotFound() {
  const session = await getSession();

  if (session) {
    redirect("/admin/works");
  }

  redirect("/admin/login");
}