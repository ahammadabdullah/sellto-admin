import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest, NextResponse } from "next/server";
const { auth } = NextAuth(authConfig as NextAuthConfig);

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const { pathname } = nextUrl;

  const privateRoutes = [
    "/dashboard",
    "/dashboard/:path*",
    "/sellers",
    "/sellers/:path*",
    "/settings",
    "/settings/:path*",
    "/",
  ];
  const publicRoutes = ["/login", "/signup", "/api"];
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (
    !isLoggedIn &&
    privateRoutes.some((route) => pathname.startsWith(route))
  ) {
    console.log("from middleware");
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
