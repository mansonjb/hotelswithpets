import { SITEMAP_LOCALES, SITEMAP_BASE_URL } from '@/lib/sitemap-entries'

// Sitemap index at /sitemap.xml (the URL robots.txt and Search Console point at).
//
// The full site is ~59k URLs across 7 locales, over Google's 50,000-URL per-file
// limit, so we serve one child sitemap per locale at /sitemaps/<locale>.xml
// (each ~8.5k URLs) and list them here. Hand-rolled route handlers (not the Next
// metadata `sitemap.ts` convention) because generateSitemaps does not serve a
// working index at /sitemap.xml in this setup (the [locale] catch-all shadows it).
export const dynamic = 'force-static'

export function GET() {
  const now = new Date().toISOString()
  const children = SITEMAP_LOCALES.map(
    (locale) =>
      `  <sitemap>\n    <loc>${SITEMAP_BASE_URL}/sitemaps/${locale}.xml</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`
  ).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${children}\n</sitemapindex>\n`
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
