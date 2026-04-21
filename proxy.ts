import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "vistacare";
const COOKIE_NAME = "vc_admin";

export const expectedSession = () => btoa(`${ADMIN_USER}:${ADMIN_PASSWORD}`);

function hasValidSession(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  return !!cookie && cookie === expectedSession();
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login page + login API are public
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/")) {
    return NextResponse.next();
  }

  // Other admin routes — require session cookie, redirect to login
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!hasValidSession(req)) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // API routes — never run i18n
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/",
    "/(en|vi)/:path*",
    "/admin/:path*",
    "/admin",
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
