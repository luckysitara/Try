import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const adminPath = "/admin"
  const loginPath = "/admin/login"

  if (request.nextUrl.pathname.startsWith(adminPath) && request.nextUrl.pathname !== loginPath) {
    const token = request.cookies.get("admin_token")?.value

    if (!token) {
      return NextResponse.redirect(new URL(loginPath, request.url))
    }

    // Here you would typically verify the token
    // For this example, we'll just check if it exists
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

