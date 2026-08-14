import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search crawlers: allow everything EXCEPT the auto-generated Next.js
      // opengraph-image routes. In GSC these surfaced as ~3,600 URLs stuck in
      // "Crawled, currently not indexed" (they are images, not pages), and
      // Googlebot kept re-fetching them, starving crawl budget from the real
      // combo pages that are still "Discovered, currently not indexed".
      // Blocking them here reclaims that budget. Social scrapers
      // (facebookexternalhit, Twitterbot, LinkedInBot, Slackbot, WhatsApp, ...)
      // fall through to the '*' group below, so link-preview images keep working.
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
        disallow: '/*opengraph-image',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.hotelswithpets.com/sitemap.xml',
  }
}
