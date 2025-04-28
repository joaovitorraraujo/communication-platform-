// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // ou do Authorization header se usar outro jeito

  const isAuth = !!token;
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Define as rotas protegidas:
export const config = {
  matcher: ["/teams", "/teams/chat", "/"],
};
