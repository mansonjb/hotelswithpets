import type { MetadataRoute } from 'next'

/**
 * Crawlers commerciaux sans valeur SEO ni GEO : outils de backlink, scrapers
 * de data B2B, agregateurs. Ils n'envoient ni trafic ni citation, mais ils
 * crawlent en volume sur un site de 50 000 URLs, et chaque hit sur une page
 * ISR expiree declenche une regeneration facturee (ISR Writes + Fast Origin
 * Transfer). Les bloquer est une pure economie, sans perte de visibilite.
 */
const COST_HOSTILE_BOTS = [
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'DataForSeoBot',
  'Barkrowler',
  'SeekportBot',
  'serpstatbot',
  'ZoominfoBot',
  'MegaIndex.ru',
  'SiteAuditBot',
  'Bytespider',
  'PetalBot',
  'ImagesiftBot',
  'magpie-crawler',
  'YisouSpider',
  'VelenPublicWebCrawler',
  'Timpibot',
  'Diffbot',
  'omgili',
  'omgilibot',
  'TurnitinBot',
  'SEOkicks',
  'linkdexbot',
  'spbot',
  'trendictionbot',
  'AwarioBot',
]

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
      // Crawlers IA / LLM : bienvenus, on veut etre cite dans les reponses.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: COST_HOSTILE_BOTS, disallow: '/' },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.hotelswithpets.com/sitemap.xml',
  }
}
