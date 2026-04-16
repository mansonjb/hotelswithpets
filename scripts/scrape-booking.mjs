/**
 * Booking.com pet-friendly hotel scraper
 *
 * Usage:
 *   node scripts/scrape-booking.mjs                  → all destinations
 *   node scripts/scrape-booking.mjs amsterdam        → one destination
 *   node scripts/scrape-booking.mjs amsterdam paris  → multiple
 *
 * Output:
 *   data/hotels.json          updated with real scraped data
 *   public/images/hotels/     hotel photos compressed to 800×500 JPEG 85%
 */

import { chromium } from 'playwright'
import sharp from 'sharp'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'hotels')
const HOTELS_JSON = path.join(__dirname, '..', 'data', 'hotels.json')

// ─── Config ──────────────────────────────────────────────────────────────────

const MAX_HOTELS_PER_DEST = 5
const DELAY_MIN = 2000
const DELAY_MAX = 4000

const DESTINATIONS = [
  { slug: 'amsterdam',  name: 'Amsterdam',  country: 'Netherlands',   flag: '🇳🇱', categoryCount: 8, intro: "Amsterdam is one of Europe's most dog-friendly cities, with parks, canals, and welcoming hotels." },
  { slug: 'paris',      name: 'Paris',      country: 'France',        flag: '🇫🇷', categoryCount: 7, intro: "Paris welcomes pets in many hotels, cafés, and even some restaurants." },
  { slug: 'biarritz',   name: 'Biarritz',   country: 'France',        flag: '🇫🇷', categoryCount: 6, intro: "Biarritz is a paradise for dogs and their owners, with beach access and pet-friendly hotels." },
  { slug: 'barcelona',  name: 'Barcelona',  country: 'Spain',         flag: '🇪🇸', categoryCount: 7, intro: "Barcelona has a growing pet-friendly scene with many hotels welcoming dogs of all sizes." },
  { slug: 'berlin',     name: 'Berlin',     country: 'Germany',       flag: '🇩🇪', categoryCount: 9, intro: "Berlin is one of the most dog-friendly capitals in Europe, with extensive parks and pet-welcoming accommodation." },
  { slug: 'lisbon',     name: 'Lisbon',     country: 'Portugal',      flag: '🇵🇹', categoryCount: 6, intro: "Lisbon's mild climate and relaxed culture make it ideal for travelling with your pet." },
  { slug: 'rome',       name: 'Rome',       country: 'Italy',         flag: '🇮🇹', categoryCount: 6, intro: "Rome combines ancient grandeur with a surprisingly relaxed attitude toward pets." },
  { slug: 'madrid',     name: 'Madrid',     country: 'Spain',         flag: '🇪🇸', categoryCount: 6, intro: "Madrid is one of Europe's most dog-obsessed capitals." },
  { slug: 'prague',     name: 'Prague',     country: 'Czech Republic', flag: '🇨🇿', categoryCount: 6, intro: "Prague's compact old town and riverside parks make it an underrated gem for dog travel." },
  { slug: 'vienna',     name: 'Vienna',     country: 'Austria',       flag: '🇦🇹', categoryCount: 6, intro: "Vienna's grand parks and dog-friendly cafés make it a top pet destination in Central Europe." },
  { slug: 'copenhagen', name: 'Copenhagen', country: 'Denmark',       flag: '🇩🇰', categoryCount: 6, intro: "Copenhagen leads Europe on pet welfare — dogs travel free on public transport." },
  { slug: 'stockholm',  name: 'Stockholm',  country: 'Sweden',        flag: '🇸🇪', categoryCount: 6, intro: "Stockholm's archipelago setting and dog-welcoming culture make it ideal for pet travel." },
  { slug: 'munich',     name: 'Munich',     country: 'Germany',       flag: '🇩🇪', categoryCount: 6, intro: "Munich's English Garden and beer garden culture make it ideal for a city break with your pet." },
  { slug: 'zurich',     name: 'Zurich',     country: 'Switzerland',   flag: '🇨🇭', categoryCount: 6, intro: "Zurich has some of Europe's highest standards for pet welfare." },
  { slug: 'nice',       name: 'Nice',       country: 'France',        flag: '🇫🇷', categoryCount: 6, intro: "Nice's Mediterranean climate and terrace restaurants make it superb for pets year-round." },
  { slug: 'bordeaux',   name: 'Bordeaux',   country: 'France',        flag: '🇫🇷', categoryCount: 6, intro: "Bordeaux pairs world-class wine country with a relaxed, dog-friendly urban culture." },
  { slug: 'lyon',       name: 'Lyon',       country: 'France',        flag: '🇫🇷', categoryCount: 6, intro: "Lyon's gastronomic culture extends to its terrace restaurants, many of which welcome dogs." },
  { slug: 'bruges',     name: 'Bruges',     country: 'Belgium',       flag: '🇧🇪', categoryCount: 6, intro: "Bruges is one of Belgium's most charming cities for a pet-friendly break." },
  { slug: 'budapest',   name: 'Budapest',   country: 'Hungary',       flag: '🇭🇺', categoryCount: 6, intro: "Budapest's riverside parks and affordable luxury hotels make it a rising star for pet travel." },
  { slug: 'dubrovnik',  name: 'Dubrovnik',  country: 'Croatia',       flag: '🇭🇷', categoryCount: 6, intro: "Dubrovnik's dramatic coastline and boutique hotels offer a memorable setting for pet owners." },
  { slug: 'porto',      name: 'Porto',      country: 'Portugal',      flag: '🇵🇹', categoryCount: 6, intro: "Porto's hilly streets and river esplanades make it one of Portugal's most welcoming cities for dogs." },
  // Tier 2
  { slug: 'seville',    name: 'Seville',    country: 'Spain',         flag: '🇪🇸', categoryCount: 6, intro: "Seville's orange-tree lined streets and riverside promenades make it one of Andalusia's most dog-friendly cities." },
  { slug: 'valencia',   name: 'Valencia',   country: 'Spain',         flag: '🇪🇸', categoryCount: 6, intro: "Valencia's sunny climate and Turia river park make it a superb year-round destination for pet travel." },
  { slug: 'malaga',     name: 'Malaga',     country: 'Spain',         flag: '🇪🇸', categoryCount: 6, intro: "Malaga combines a sunny Mediterranean climate with a relaxed attitude toward dogs." },
  { slug: 'florence',   name: 'Florence',   country: 'Italy',         flag: '🇮🇹', categoryCount: 6, intro: "Florence's Renaissance beauty is matched by a surprisingly welcoming attitude toward dogs." },
  { slug: 'venice',     name: 'Venice',     country: 'Italy',         flag: '🇮🇹', categoryCount: 6, intro: "Venice is surprisingly dog-friendly — dogs travel on the vaporetto and are welcomed in many trattorias." },
  { slug: 'ghent',      name: 'Ghent',      country: 'Belgium',       flag: '🇧🇪', categoryCount: 6, intro: "Ghent is one of Belgium's most progressive cities — ideal for dog owners." },
  { slug: 'antwerp',    name: 'Antwerp',    country: 'Belgium',       flag: '🇧🇪', categoryCount: 6, intro: "Antwerp's dog-welcoming culture and boutique hotel scene make it Belgium's most exciting city for pet travel." },
  { slug: 'edinburgh',  name: 'Edinburgh',  country: 'United Kingdom', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', categoryCount: 6, intro: "Edinburgh's dramatic hills and dog-welcoming pub culture make it one of Britain's best cities for a break with your dog." },
  { slug: 'dublin',     name: 'Dublin',     country: 'Ireland',       flag: '🇮🇪', categoryCount: 6, intro: "Dublin's pub gardens, Phoenix Park, and warm Irish welcome extend to dogs." },
  { slug: 'reykjavik',  name: 'Reykjavik',  country: 'Iceland',       flag: '🇮🇸', categoryCount: 6, intro: "Reykjavik's clean air and dog-welcoming culture make it a unique destination for adventurous pet owners." },
  { slug: 'ljubljana',  name: 'Ljubljana',  country: 'Slovenia',      flag: '🇸🇮', categoryCount: 6, intro: "Ljubljana is one of the continent's most walkable and dog-welcoming small cities." },
  { slug: 'riga',       name: 'Riga',       country: 'Latvia',        flag: '🇱🇻', categoryCount: 6, intro: "Riga's Art Nouveau architecture and affordable hotels make it an emerging gem for pet-friendly breaks." },
  { slug: 'tallinn',    name: 'Tallinn',    country: 'Estonia',       flag: '🇪🇪', categoryCount: 6, intro: "Tallinn's medieval old town and dog-friendly hotels make it a hidden gem for pet travel in Northern Europe." },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const sleep = (min, max) => new Promise(r => setTimeout(r, min + Math.random() * (max - min)))

// ─── Stealth browser ─────────────────────────────────────────────────────────

async function createBrowser() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1440,900',
    ],
  })

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    locale: 'en-GB',
    timezoneId: 'Europe/London',
    extraHTTPHeaders: {
      'Accept-Language': 'en-GB,en;q=0.9',
    },
  })

  // Mask automation fingerprint
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] })
    Object.defineProperty(navigator, 'languages', { get: () => ['en-GB', 'en'] })
    window.chrome = { runtime: {} }
  })

  return { browser, context }
}

// ─── Search results page ──────────────────────────────────────────────────────

async function scrapeSearch(page, destName) {
  const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destName)}&nflt=pets_allowed%3D1&lang=en-gb&selected_currency=EUR&order=class_descending`
  console.log(`    GET ${url}`)

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await sleep(2000, 3500)

  // Dismiss cookie banner
  try {
    const accept = page.locator('button:has-text("Accept"), #onetrust-accept-btn-handler, [data-testid="accept-button"]').first()
    if (await accept.isVisible({ timeout: 3000 })) {
      await accept.click()
      await sleep(800, 1200)
    }
  } catch {}

  // CAPTCHA detection
  const pageTitle = await page.title()
  if (/captcha|robot|blocked/i.test(pageTitle)) {
    console.warn('    ⚠ CAPTCHA/block detected — skipping')
    return []
  }

  // Wait for property cards
  try {
    await page.waitForSelector('[data-testid="property-card"]', { timeout: 15000 })
  } catch {
    try {
      await page.waitForSelector('[data-testid="property-card-container"]', { timeout: 5000 })
    } catch {
      console.warn('    ⚠ No property cards found')
      return []
    }
  }

  // Wait a bit extra for prices to load (they're async on Booking.com)
  await sleep(3000, 4000)

  const cards = await page.evaluate((max) => {
    const els = document.querySelectorAll('[data-testid="property-card"], [data-testid="property-card-container"]')
    const results = []
    const seenHrefs = new Set()

    for (let i = 0; i < els.length && results.length < max; i++) {
      const card = els[i]

      const name = card.querySelector('[data-testid="title"]')?.textContent?.trim()
      if (!name) continue

      const linkEl = card.querySelector('a[data-testid="title-link"], a[href*="/hotel/"]')
      const href = linkEl?.href
      if (!href) continue

      // Deduplicate by hotel URL (strip query string for comparison)
      const hrefKey = href.split('?')[0]
      if (seenHrefs.has(hrefKey)) continue
      seenHrefs.add(hrefKey)

      // Score: look for decimal like "8.5" in the review score block
      const reviewBlock = card.querySelector('[data-testid="review-score"]')
      const scoreText = reviewBlock?.textContent || ''
      const scoreMatch = scoreText.match(/\b(10\.0|[78]\.\d|9\.\d)\b/)
      const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0

      // Review count — "X,XXX reviews" or "X.XXX Bewertungen" etc.
      const reviewMatch = scoreText.replace(/[.,]/g, '').match(/(\d{2,6})\s*review/i)
      const reviewCount = reviewMatch ? parseInt(reviewMatch[1]) : 0

      // Price — try data-testid first, then €NNN anywhere in card
      const priceEl = card.querySelector('[data-testid="price-and-discounted-price"], [data-testid="recommended-units"] [class*="price"]')
      let price = 0
      if (priceEl) {
        const m = priceEl.textContent.replace(/[,\s]/g, '').match(/[€£$](\d+)/)
        if (m) price = parseInt(m[1])
      }
      if (!price) {
        // Fallback: find any €NNN in the card that's between 30 and 9999
        const allText = card.textContent
        const matches = [...allText.matchAll(/€\s?(\d{2,4})/g)]
        for (const m of matches) {
          const v = parseInt(m[1])
          if (v >= 30 && v <= 9999) { price = v; break }
        }
      }

      // Star rating — property star classification
      const starsEl = card.querySelector('[aria-label*="star"], [aria-label*="étoile"], [class*="Stars"]')
      const starsLabel = starsEl?.getAttribute('aria-label') || starsEl?.textContent || ''
      const starsNum = starsLabel.match(/(\d)/)?.[1]
      const stars = starsNum ? parseInt(starsNum) : 4

      results.push({ name, href, score, reviewCount, price, stars })
    }

    return results
  }, MAX_HOTELS_PER_DEST)

  return cards
}

// ─── Hotel detail page ────────────────────────────────────────────────────────

async function scrapeHotelDetail(page, hotelUrl) {
  const sep = hotelUrl.includes('?') ? '&' : '?'
  const url = `${hotelUrl}${sep}lang=en-gb`

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await sleep(1500, 2500)

  const pageTitle = await page.title()
  if (/captcha|robot|blocked/i.test(pageTitle)) throw new Error('CAPTCHA detected')

  return await page.evaluate(() => {
    // ── Photos — multiple strategies ──
    const photoSources = new Set()

    // Strategy 1: og:image meta tag (always high-res, most reliable)
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
    if (ogImage && ogImage.includes('bstatic')) {
      photoSources.add(ogImage.replace(/max\d+x\d+/, 'max1280x900'))
    }

    // Strategy 2: JSON-LD or __NEXT_DATA__ embedded photo arrays
    const scripts = [...document.querySelectorAll('script[type="application/json"], script#__NEXT_DATA__')]
    for (const sc of scripts) {
      const text = sc.textContent || ''
      const matches = text.match(/"(https:\/\/cf\.bstatic\.com\/xdata\/images\/hotel\/[^"]+)"/g) || []
      for (const m of matches) {
        const url = m.replace(/"/g, '').replace(/max\d+x\d+/, 'max1280x900')
        photoSources.add(url)
      }
    }

    // Strategy 3: visible img tags (upgrade resolution)
    document.querySelectorAll('img[src*="bstatic.com"], img[src*="cf.bstatic.com"]').forEach(img => {
      let src = img.src || img.dataset?.src || ''
      if (!src) return
      src = src
        .replace(/square\d+/, 'max1280x900')
        .replace(/max\d+x\d+/, 'max1280x900')
        .replace(/\/\d+x\d+\//, '/max1280x900/')
      if (src.includes('bstatic.com')) photoSources.add(src)
    })

    // Strategy 4: data-src / data-lazy-src
    document.querySelectorAll('[data-lazy-src*="bstatic"], [data-src*="bstatic"]').forEach(el => {
      const src = (el.dataset.lazySrc || el.dataset.src || '').replace(/max\d+x\d+/, 'max1280x900')
      if (src) photoSources.add(src)
    })

    const photoUrls = [...photoSources].filter(u => u.includes('/images/hotel/')).slice(0, 6)

    // ── Pet policy text ──
    let petPolicy = ''
    const allEls = document.querySelectorAll('li, p, span')
    for (const el of allEls) {
      const text = el.textContent?.trim() || ''
      const lc = text.toLowerCase()
      // Must mention pets/dogs/animals, be a reasonable length, not look like SVG/CSS garbage
      if (
        (lc.includes('pet') || lc.includes('dog') || lc.includes('cat') || lc.includes('animal')) &&
        text.length > 10 && text.length < 250 &&
        el.children.length < 3 &&
        !/cls-|fill:|\.svg|<svg/i.test(text)  // filter SVG artifacts
      ) {
        petPolicy = text
        break
      }
    }

    // ── Highlights / facilities ──
    const highlightSelectors = [
      '[data-testid="facilities-summary"] li',
      '[class*="mostPopularFacilities"] li',
      '[class*="popular_facilities"] li',
    ]
    let highlights = []
    for (const sel of highlightSelectors) {
      const items = [...document.querySelectorAll(sel)]
        .map(el => el.textContent?.trim())
        .filter(t => t && t.length < 60)
        .slice(0, 3)
      if (items.length > 0) { highlights = items; break }
    }

    // ── Stars ──
    const starsEl = document.querySelector('[aria-label*="stars"], [data-testid="rating-stars"]')
    const starsLabel = starsEl?.getAttribute('aria-label') || ''
    const starsMatch = starsLabel.match(/(\d)\s*star/i)
    const stars = starsMatch ? parseInt(starsMatch[1]) : null

    return { photoUrls, petPolicy, highlights, stars }
  })
}

// ─── Image download + compress ────────────────────────────────────────────────

async function downloadPhoto(imageUrl, outPath) {
  const res = await fetch(imageUrl, {
    headers: {
      Referer: 'https://www.booking.com/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const buffer = Buffer.from(await res.arrayBuffer())
  await sharp(buffer)
    .resize(800, 500, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(outPath)

  return Math.round((await import('fs')).statSync(outPath).size / 1024)
}

async function downloadFallback(id, outPath) {
  const res = await fetch(`https://picsum.photos/seed/${id}/1200/800`, {
    redirect: 'follow',
    signal: AbortSignal.timeout(10000),
  })
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf).resize(800, 500, { fit: 'cover' }).jpeg({ quality: 85 }).toFile(outPath)
}

// ─── Category inference from scraped text ────────────────────────────────────

function inferCategories(petPolicy, highlights, stars, price) {
  const text = `${petPolicy} ${highlights.join(' ')}`.toLowerCase()
  const cats = ['dog-friendly']

  if (/cat|feline|kitten/.test(text)) cats.push('cat-friendly')
  if (/beach|sea|ocean|coast|waterfront|surf/.test(text)) cats.push('beach-access')
  if (/park|garden|forest|green|vondelpark|tiergarten|botanical/.test(text)) cats.push('near-parks')
  if (/no (extra |additional |pet |charge|fee)|free.*pet|pet.*free|no charge|without.*fee/.test(text)) cats.push('dogs-stay-free')
  if (stars >= 5 || price > 300) cats.push('luxury')

  return [...new Set(cats)]
}

// ─── Scrape one destination ───────────────────────────────────────────────────

async function scrapeDestination(context, dest) {
  console.log(`\n  📍 ${dest.name}`)
  const page = await context.newPage()
  const hotels = []

  try {
    const cards = await scrapeSearch(page, dest.name)
    console.log(`     ${cards.length} hotels in search results`)
    if (!cards.length) { await page.close(); return [] }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const id = `${dest.slug}-${i + 1}`
      const imagePath = path.join(IMAGES_DIR, `${id}.jpg`)

      console.log(`\n     [${i + 1}/${cards.length}] ${card.name}`)
      if (card.score) console.log(`       score: ${card.score} · €${card.price}/night`)

      let petPolicy = 'Pets welcome. Please contact hotel for details.'
      let highlights = ['Free WiFi', 'Pet-friendly', 'Central location']
      let photoUrls = []
      let stars = card.stars

      // ── Detail page ──
      try {
        await sleep(DELAY_MIN, DELAY_MAX)
        const detail = await scrapeHotelDetail(page, card.href)
        if (detail.petPolicy) petPolicy = detail.petPolicy
        if (detail.highlights?.length >= 2) highlights = detail.highlights
        if (detail.photoUrls?.length) photoUrls = detail.photoUrls
        if (detail.stars) stars = detail.stars
        console.log(`       ✓ detail scraped | ${photoUrls.length} photos`)
      } catch (e) {
        console.warn(`       ⚠ detail failed: ${e.message}`)
      }

      // ── Photo ──
      let photoOk = false
      for (const url of photoUrls) {
        try {
          const kb = await downloadPhoto(url, imagePath)
          console.log(`       ✓ photo saved (${kb} KB from Booking.com)`)
          photoOk = true
          break
        } catch {}
      }
      if (!photoOk) {
        try {
          await downloadFallback(id, imagePath)
          console.log(`       ↩ fallback photo (picsum)`)
        } catch {
          console.warn(`       ✗ no photo`)
        }
      }

      const priceFrom = card.price > 0 ? card.price : 120
      const feeMatch = petPolicy.match(/€\s*(\d+)|(\d+)\s*€/)
      const petFee = feeMatch ? parseInt(feeMatch[1] || feeMatch[2]) : 0

      hotels.push({
        id,
        name: card.name,
        destinationSlug: dest.slug,
        categories: inferCategories(petPolicy, highlights, stars, priceFrom),
        stars: stars || 4,
        rating: card.score > 0 ? card.score : 8.5,
        reviewCount: card.reviewCount > 0 ? card.reviewCount : 500,
        priceFrom,
        currency: 'EUR',
        bookingUrl: card.href.split('?')[0],
        petFee,
        petPolicy,
        highlights: highlights.slice(0, 3),
      })

      console.log(`       → ${hotels.at(-1).categories.join(', ')} | petFee: €${petFee}`)
    }

  } catch (e) {
    console.error(`     ✗ ${dest.name}: ${e.message}`)
  } finally {
    await page.close()
  }

  return hotels
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const targets = args.length
    ? DESTINATIONS.filter(d => args.includes(d.slug))
    : DESTINATIONS

  if (!targets.length) {
    console.error('Unknown destinations:', args.join(', '))
    console.error('Available:', DESTINATIONS.map(d => d.slug).join(', '))
    process.exit(1)
  }

  console.log(`\n🐾 Booking.com scraper`)
  console.log(`   Targets: ${targets.map(d => d.name).join(', ')}`)
  console.log(`   Hotels/dest: ${MAX_HOTELS_PER_DEST}`)

  await mkdir(IMAGES_DIR, { recursive: true })

  let allHotels = []
  try { allHotels = JSON.parse(await readFile(HOTELS_JSON, 'utf-8')) } catch {}

  const { browser, context } = await createBrowser()

  try {
    for (let i = 0; i < targets.length; i++) {
      const dest = targets[i]
      const scraped = await scrapeDestination(context, dest)

      if (scraped.length > 0) {
        allHotels = [
          ...allHotels.filter(h => h.destinationSlug !== dest.slug),
          ...scraped,
        ]
      }

      if (i < targets.length - 1) {
        const wait = 3000 + Math.random() * 2000
        console.log(`\n   ⏳ Pause ${(wait / 1000).toFixed(1)}s…`)
        await sleep(wait, wait)
      }
    }
  } finally {
    await browser.close()
  }

  // Sort by destination order
  const order = DESTINATIONS.map(d => d.slug)
  allHotels.sort((a, b) => {
    const d = order.indexOf(a.destinationSlug) - order.indexOf(b.destinationSlug)
    return d !== 0 ? d : a.id.localeCompare(b.id)
  })

  await writeFile(HOTELS_JSON, JSON.stringify(allHotels, null, 2))

  console.log(`\n✅ hotels.json updated — ${allHotels.length} total hotels`)
  targets.forEach(d => {
    const n = allHotels.filter(h => h.destinationSlug === d.slug).length
    console.log(`   ${d.flag} ${d.name}: ${n} hotels`)
  })
}

main().catch(e => { console.error('\n✗ Fatal:', e.message); process.exit(1) })
