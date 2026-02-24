import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export default async function middleware(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: isProduction
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
  });
  const { pathname } = req.nextUrl;
  const isAuthPage =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-otp";
  const isPublicPage = pathname === "/" || isAuthPage || pathname === "/share";
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    // Public/auth pages
    "/",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/verify-otp",
    "/share",
    // Add your protected routes below
    "/score/:path*",
    "/upload/:path*",
    "/profile/:path*",
    // ... rest of your protected routes
  ],
};