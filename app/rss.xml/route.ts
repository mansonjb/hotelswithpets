import { NextResponse } from 'next/server'
import { readFileSync, statSync } from 'fs'
import { join } from 'path'
import destinations from '@/data/destinations.json'

/**
 * RSS feed listing the 30 most recently-updated destination guides.
 * Bing uses RSS as a freshness/discovery signal, Google ignores it but
 * relies on the sitemap. Cheap to generate, helps Bing keep up.
 */
export const dynamic = 'force-static'

const SITE_URL = 'https://www.hotelswithpets.com'

function safeMtime(path: string): Date {
  try { return statSync(path).mtime } catch { return new Date(0) }
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  // Pick the 30 most-recently-updated destinations based on their city-guide
  // JSON mtime. Falls back to destinations.json mtime when the guide doesn't
  // exist yet.
  const guideDir = join(process.cwd(), 'data/city-guides')
  const items = destinations
    .map((d) => {
      const guidePath = join(guideDir, `${d.slug}.json`)
      const mtime = safeMtime(guidePath)
      return { dest: d, mtime }
    })
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
    .slice(0, 30)

  const channelUpdated = items[0]?.mtime ?? new Date()
  const lastBuildDate = channelUpdated.toUTCString()

  const itemXml = items.map(({ dest, mtime }) => {
    const link = `${SITE_URL}/en/destinations/${dest.slug}`
    const title = escapeXml(`Pet-friendly hotels in ${dest.name}, ${dest.country}`)
    const description = escapeXml(dest.intro || `Pet-friendly hotels and city guide for ${dest.name}.`)
    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${mtime.toUTCString()}</pubDate>
      <description>${description}</description>
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HotelsWithPets, latest pet-friendly destination guides</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Pet-friendly hotels and city guides across Europe, newest and recently-updated destinations.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${itemXml}
  </channel>
</rss>
`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
