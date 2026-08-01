import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'fr', 'es', 'pt'] as const
export type Locale = (typeof locales)[number]
const defaultLocale: Locale = 'en'

// Datacenter bot filter. GA4 showed Singapore as the #1 "country" with a 1.8s
// average session and 1% engagement (roughly 25% of all traffic): pure
// datacenter bots, not a real market for a European pet-travel site. We 403
// them at the edge so they stop polluting analytics and wasting compute.
// Country comes from Vercel's x-vercel-ip-country header (null in local dev, so
// dev is never blocked). Extend BLOCKED_COUNTRIES only for confirmed non-market
// bot sources.
const BLOCKED_COUNTRIES = new Set(['SG'])

// Real search / social crawlers are ALWAYS allowed through, whatever their geo,
// so this never touches SEO indexing. Googlebot crawls from Google IPs (not SG)
// anyway, this is just belt-and-braces.
const ALLOWED_CRAWLER_UA =
  /(googlebot|google-inspectiontool|storebot-google|bingbot|bingpreview|slurp|duckduckbot|baiduspider|yandex(bot)?|applebot|petalbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot)/i

function isBlockedBot(request: NextRequest): boolean {
  const country = request.headers.get('x-vercel-ip-country') ?? ''
  if (!BLOCKED_COUNTRIES.has(country)) return false
  const ua = request.headers.get('user-agent') ?? ''
  if (ALLOWED_CRAWLER_UA.test(ua)) return false
  return true
}

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const preferred = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()
  return locales.includes(preferred as Locale) ? (preferred as Locale) : defaultLocale
}

export function middleware(request: NextRequest) {
  // Edge bot filter runs first, for every matched request (all locales), before
  // any locale redirect or rendering happens.
  if (isBlockedBot(request)) {
    // Confirmed source: a scraper fleet on Tencent Cloud Singapore (AS132203),
    // rotating spoofed user-agents, walking destination pages. Country SG catches
    // it. 403 before any render.
    return new NextResponse('Access denied', {
      status: 403,
      headers: { 'x-blocked-reason': 'geo-bot-filter', 'cache-control': 'no-store' },
    })
  }

  const { pathname } = request.nextUrl

  // Skip if pathname already has a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (hasLocale) return

  // Skip Next.js internals and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.\w+$/.test(pathname)
  ) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'],
}
