import { SITEMAP_LOCALES, type SitemapLocale, sitemapEntriesForLocale, renderUrlset } from '@/lib/sitemap-entries'

// Per-locale child sitemaps at /sitemaps/<locale>.xml (e.g. /sitemaps/it.xml).
// Listed by the index at /sitemap.xml. Each holds one locale's ~8.5k URLs.
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return SITEMAP_LOCALES.map((locale) => ({ file: `${locale}.xml` }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const locale = file.replace(/\.xml$/, '') as SitemapLocale
  if (!SITEMAP_LOCALES.includes(locale)) {
    return new Response('Not found', { status: 404 })
  }
  const xml = renderUrlset(sitemapEntriesForLocale(locale))
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
