import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register', '/terms', '/privacy', '/forgot-password', '/reset-password', '/verify-email']
const PUBLIC_EXACT = ['/']
const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'pt', 'de', 'it', 'pl', 'nl', 'ro', 'ru'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

function detectLocale(req: NextRequest): Locale {
  // 1. Cookie already set — respect user choice
  const cookie = req.cookies.get('NEXT_LOCALE')?.value
  if (cookie && (SUPPORTED_LOCALES as readonly string[]).includes(cookie)) {
    return cookie as Locale
  }

  // 2. Parse Accept-Language header (e.g. "es-ES,es;q=0.9,en;q=0.8")
  const accept = req.headers.get('accept-language') ?? ''
  for (const part of accept.split(',')) {
    const lang = part.split(';')[0].trim().split('-')[0].toLowerCase()
    if ((SUPPORTED_LOCALES as readonly string[]).includes(lang)) {
      return lang as Locale
    }
  }

  // 3. Default to English
  return 'en'
}

export function middleware(req: NextRequest) {
  // Detect locale first so we can forward it as a request header.
  // This is needed because request.ts reads incoming request headers/cookies;
  // a cookie set only on the response is not visible on that same request cycle.
  const locale = detectLocale(req)

  const hasRefreshToken = req.cookies.has('refresh_token')
  const isPublic =
    PUBLIC_EXACT.includes(req.nextUrl.pathname) ||
    PUBLIC_ROUTES.some((r) => req.nextUrl.pathname.startsWith(r))

  if (!hasRefreshToken && !isPublic) {
    const response = NextResponse.redirect(new URL('/login', req.url))
    if (!req.cookies.has('NEXT_LOCALE')) {
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
      })
    }
    return response
  }

  // Inject locale as a request header so request.ts picks it up immediately
  // (even on the very first visit when no NEXT_LOCALE cookie exists yet)
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-next-locale', locale)

  const response = NextResponse.next({ request: { headers: requestHeaders } })

  // Persist as cookie for subsequent requests
  if (!req.cookies.has('NEXT_LOCALE')) {
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next|favicon\.ico|api|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
