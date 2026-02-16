import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";


  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  const { pathname } = req.nextUrl;

  // Check if current route is login or signup
  const isAuthPage =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-otp";

  // If user is authenticated and trying to access auth pages, redirect away
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is not authenticated and on protected route, redirect to login
  if (!token && !isAuthPage) {
    const loginUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
