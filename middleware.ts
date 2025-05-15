import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path starts with /admin
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // If the user is not authenticated, redirect to the login page
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }

    // Check if the user has the required role
    const userRole = token.role as string
    if (!userRole || !["admin", "superadmin", "editor"].includes(userRole)) {
      // Redirect to unauthorized page or homepage
      return NextResponse.redirect(new URL("/", request.url))
    }

    // For certain admin routes, require superadmin role
    if ((pathname.startsWith("/admin/settings") || pathname.startsWith("/admin/users")) && userRole !== "superadmin") {
      // Redirect to admin dashboard
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // Allow access to setup page only if no admin exists
  if (pathname.startsWith("/setup")) {
    // The actual check is done in the page itself
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/setup"],
}
