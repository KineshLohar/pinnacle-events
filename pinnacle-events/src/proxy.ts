import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth/auth";

export default async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/works", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};