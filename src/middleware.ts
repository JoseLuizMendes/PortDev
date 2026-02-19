import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const ADMIN_SESSION_COOKIE = "admin_session"

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  const adminUser = process.env.ADMIN_USER
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminUser || !adminPassword) {
    return new NextResponse("Admin credentials are not configured.", {
      status: 503,
    })
  }

  try {
    const expected = btoa(`${adminUser}:${adminPassword}`)
    const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value

    if (session === expected) {
      return NextResponse.next()
    }

    const loginUrl = new URL("/admin/login", req.url)
    loginUrl.searchParams.set("next", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  } catch {
    const loginUrl = new URL("/admin/login", req.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
