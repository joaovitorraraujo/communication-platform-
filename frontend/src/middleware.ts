import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from "next/server";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "/" },
  { path: "/register", whenAuthenticated: "/" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.find((route) => route.path === pathName);

  const token = request.cookies.get("token");

  if (!token && isPublicRoute) {
    return NextResponse.next();
  }

  if (!token && !isPublicRoute) {
    const redirectURL = request.nextUrl.clone();

    redirectURL.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectURL);
  }

  if (token && isPublicRoute) {
    const redirectURL = request.nextUrl.clone();

    redirectURL.pathname = isPublicRoute.whenAuthenticated;

    return NextResponse.redirect(redirectURL);
  }

  if (token && !isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.webp).*)",
  ],
};
