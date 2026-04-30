import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register']

export function proxy(req: NextRequest) {
  const hasRefreshToken = req.cookies.has('refresh_token')
  const isPublic = PUBLIC_ROUTES.some((r) =>
    req.nextUrl.pathname.startsWith(r)
  )

  if (!hasRefreshToken && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}
