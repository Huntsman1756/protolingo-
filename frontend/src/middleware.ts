import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register']
const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'pt', 'de', 'it'] as const
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
  const hasRefreshToken = req.cookies.has('refresh_token')
  const isPublic = PUBLIC_ROUTES.some((r) =>
    req.nextUrl.pathname.startsWith(r)
  )

  const response =
    !hasRefreshToken && !isPublic
      ? NextResponse.redirect(new URL('/login', req.url))
      : NextResponse.next()

  // Set NEXT_LOCALE cookie if not already present
  if (!req.cookies.has('NEXT_LOCALE')) {
    const locale = detectLocale(req)
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next|favicon\.ico|api|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
