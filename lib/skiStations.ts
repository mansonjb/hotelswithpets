/**
 * Ski stations that have a matching resort page on bestsnowhotels.com (our
 * sister ski-hotels site, same /en/destinations/{slug} URL pattern).
 *
 * Only destinations listed here render the "snow report & resort conditions"
 * cross-link on their guide pages — this guarantees the link never points at a
 * bestsnowhotels.com 404. Maps our destination slug → the bestsnowhotels.com
 * resort slug (identical for all current stations).
 *
 * Verified present on bestsnowhotels.com (Jun 2026). Interlaken is intentionally
 * absent — it is a Jungfrau base town, not a resort page there.
 */
export const SKI_STATIONS: Record<string, string> = {
  'zermatt': 'zermatt',
  'st-moritz': 'st-moritz',
  'grindelwald': 'grindelwald',
  'chamonix': 'chamonix',
  'morzine': 'morzine',
  'kitzbuhel': 'kitzbuhel',
  'mayrhofen': 'mayrhofen',
  'cortina-d-ampezzo': 'cortina-d-ampezzo',
  'ortisei': 'ortisei',
  'selva-val-gardena': 'selva-val-gardena',
}

export function bestSnowHotelsUrl(slug: string): string | null {
  const bsh = SKI_STATIONS[slug]
  return bsh ? `https://www.bestsnowhotels.com/en/destinations/${bsh}` : null
}
