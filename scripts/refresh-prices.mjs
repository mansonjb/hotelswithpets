/**
 * Price & pet-fee refresh script
 *
 * Visits each hotel page with real dates to scrape actual prices.
 * Booking.com only shows prices when checkin/checkout are specified.
 *
 * Usage:
 *   node scripts/refresh-prices.mjs              → refresh all hotels
 *   node scripts/refresh-prices.mjs amsterdam    → one destination only
 *   node scripts/refresh-prices.mjs --dry        → show what would change without writing
 *
 * Output:
 *   data/hotels.json   updated with real priceFrom + petFee
 */

import { chromium } from 'playwright'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HOTELS_JSON = path.join(__dirname, '..', 'data', 'hotels.json')

// ─── Date helpers ─────────────────────────────────────────────────────────────

/** Next Monday from today — weekday rates = "from" prices, not peak weekend */
function nextCheckin() {
  const d = new Date()
  d.setDate(d.getDate() + 7) // at least 1 week out so hotels show normal rates
  // Move to next Monday (day 1)
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1)
  return d
}

function formatDate(d) {
  return d.toISOString().split('T')[0]
}

function addDays(d, n) {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

const NIGHTS = 1 // 1-night stay = price shown = per-night rate

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise(r => setTimeout(r, ms))
const rand = (min, max) => min + Math.random() * (max - min)

function buildHotelUrl(bookingUrl, checkin, checkout) {
  // Strip any existing params, add date + pet params
  const base = bookingUrl.split('?')[0]
  const params = new URLSearchParams({
    checkin: formatDate(checkin),
    checkout: formatDate(checkout),
    group_adults: '2',
    no_rooms: '1',
    with_pets: '1',
    lang: 'en-gb',
    selected_currency: 'EUR',
  })
  return `${base}?${params.toString()}`
}

// ─── Browser setup ────────────────────────────────────────────────────────────

async function createBrowser() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1440,900',
    ],
  })

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    locale: 'en-GB',
    timezoneId: 'Europe/London',
    extraHTTPHeaders: { 'Accept-Language': 'en-GB,en;q=0.9' },
  })

  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] })
    Object.defineProperty(navigator, 'languages', { get: () => ['en-GB', 'en'] })
    window.chrome = { runtime: {} }
  })

  return { browser, context }
}

// ─── Price scraper ────────────────────────────────────────────────────────────

async function scrapeHotelPrice(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await sleep(rand(2000, 3500))

  // Dismiss cookie banner
  try {
    const accept = page.locator('button:has-text("Accept"), #onetrust-accept-btn-handler, [data-testid="accept-button"]').first()
    if (await accept.isVisible({ timeout: 2000 })) {
      await accept.click()
      await sleep(800)
    }
  } catch {}

  const title = await page.title()
  if (/captcha|robot|blocked/i.test(title)) throw new Error('CAPTCHA detected')

  // Wait for price block to load
  try {
    await page.waitForSelector('[data-testid="price-and-discounted-price"], .prco-wrapper, [class*="totalPrice"]', { timeout: 10000 })
  } catch {
    // Price might not load — try anyway
  }

  await sleep(rand(1000, 2000))

  return await page.evaluate(() => {
    // ── Price extraction — multiple strategies ──
    let price = 0

    // Strategy 1: data-testid price element (most reliable)
    const priceEls = document.querySelectorAll(
      '[data-testid="price-and-discounted-price"], [class*="prco-valign"], .prco-wrapper strong, [class*="bp-price"]'
    )
    for (const el of priceEls) {
      const text = el.textContent?.replace(/[,\s\u00A0]/g, '') || ''
      const m = text.match(/[€£$]?(\d{2,5})/)
      if (m) {
        const v = parseInt(m[1])
        if (v >= 20 && v <= 9999) { price = v; break }
      }
    }

    // Strategy 2: JSON-LD or embedded pricing data
    if (!price) {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      for (const sc of scripts) {
        try {
          const data = JSON.parse(sc.textContent || '')
          const lp = data?.offers?.lowPrice || data?.priceRange
          if (lp && !isNaN(Number(lp))) {
            const v = parseInt(lp)
            if (v >= 20) { price = v; break }
          }
        } catch {}
      }
    }

    // Strategy 3: Any visible EUR amount on the page
    if (!price) {
      // Look in price-specific containers
      const containers = document.querySelectorAll(
        '[class*="price"], [class*="Price"], [id*="price"], [data-price], .av-rooms-table'
      )
      for (const c of containers) {
        const text = c.textContent?.replace(/[,\s\u00A0]/g, '') || ''
        const matches = [...text.matchAll(/€?(\d{2,5})/g)]
        for (const m of matches) {
          const v = parseInt(m[1])
          if (v >= 40 && v <= 2000) { price = v; break }
        }
        if (price) break
      }
    }

    // ── Pet fee extraction ──
    let petFee = null // null = unknown, 0 = confirmed free, N = fee amount

    // Search in policies / facilities sections
    const policySelectors = [
      '[data-testid="property-section--content"]',
      '[class*="policies"], [class*="policy"]',
      '#hp_policies_box',
      '.pet-charges-wrapper',
      '.pet-policy',
      '[class*="policyItem"]',
    ]
    for (const sel of policySelectors) {
      const els = document.querySelectorAll(sel)
      for (const el of els) {
        const text = el.textContent?.toLowerCase() || ''
        if (!text.includes('pet') && !text.includes('dog') && !text.includes('animal')) continue

        // Look for explicit fee amounts: "€25 per night", "25 EUR per stay"
        const feeMatch = text.match(/[€£$]?\s*(\d{1,4})\s*(?:eur|€|per\s+night|per\s+stay|per\s+pet)/i)
        if (feeMatch) {
          const v = parseInt(feeMatch[1])
          if (v > 0 && v < 500) { petFee = v; break }
        }

        // Explicit "free" or "no charge"
        if (
          /pet.*free|free.*pet|no.*charge.*pet|no.*fee.*pet|pets.*complimentary|no\s+extra.*pet/i.test(text)
        ) {
          petFee = 0; break
        }
      }
      if (petFee !== null) break
    }

    // Also scan the full page for pet fees in facility tables
    if (petFee === null) {
      const fullText = document.body?.textContent?.toLowerCase() || ''
      const m = fullText.match(/pets?[^\n.!?]{0,60}(?:[€£$]|eur)?\s*(\d{1,4})\s*(?:eur|€|per night|per stay|per pet)/i)
      if (m) {
        const v = parseInt(m[1])
        if (v > 0 && v < 500) petFee = v
      }
      if (petFee === null) {
        if (/no.{0,30}pet.{0,30}fee|pets?.{0,20}free|free.{0,20}pet/i.test(fullText)) petFee = 0
      }
    }

    // ── Pet policy text (re-scrape, more targeted) ──
    let petPolicy = ''
    const policyTexts = []
    document.querySelectorAll('li, p').forEach(el => {
      const text = el.textContent?.trim() || ''
      const lc = text.toLowerCase()
      if (
        (lc.includes('pet') || lc.includes('dog') || lc.includes('cat') || lc.includes('animal')) &&
        text.length >= 15 && text.length <= 200 &&
        el.children.length < 4 &&
        !/[\{\}<>]|cls-|fill:|\.svg/i.test(text)
      ) {
        policyTexts.push(text)
      }
    })
    // Prefer texts mentioning fee/free/welcome over generic
    const scored = policyTexts.map(t => {
      const lc = t.toLowerCase()
      let score = 0
      if (/fee|charge|free|welcome|allowed|permitted/.test(lc)) score += 2
      if (/\d/.test(t)) score += 1
      if (t.length < 100) score += 1
      return { t, score }
    }).sort((a, b) => b.score - a.score)
    if (scored.length) petPolicy = scored[0].t

    return { price, petFee, petPolicy }
  })
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry')
  const destFilter = args.filter(a => !a.startsWith('--'))

  const hotels = JSON.parse(await readFile(HOTELS_JSON, 'utf-8'))
  const targets = destFilter.length
    ? hotels.filter(h => destFilter.includes(h.destinationSlug))
    : hotels

  const checkin = nextCheckin()
  const checkout = addDays(checkin, NIGHTS) // 1 night → price shown = per-night rate

  console.log(`\n💰 Price refresh — ${targets.length} hotels`)
  console.log(`   Dates: ${formatDate(checkin)} → ${formatDate(checkout)}`)
  if (dryRun) console.log('   DRY RUN — no files will be written\n')

  const { browser, context } = await createBrowser()
  const page = await context.newPage()

  let updated = 0
  let captchaCount = 0

  try {
    for (let i = 0; i < targets.length; i++) {
      const hotel = targets[i]
      const url = buildHotelUrl(hotel.bookingUrl, checkin, checkout)
      const pct = `[${i + 1}/${targets.length}]`

      process.stdout.write(`  ${pct} ${hotel.name.slice(0, 40).padEnd(40)} `)

      try {
        const result = await scrapeHotelPrice(page, url)

        const newPrice = result.price > 0 ? result.price : hotel.priceFrom
        const newFee = result.petFee !== null ? result.petFee : hotel.petFee
        const newPolicy = result.petPolicy || hotel.petPolicy

        const priceChanged = newPrice !== hotel.priceFrom
        const feeChanged = newFee !== hotel.petFee

        process.stdout.write(
          `€${String(newPrice).padStart(4)} ` +
          (result.petFee === 0 ? '✓free  ' : result.petFee !== null ? `fee:€${result.petFee}  ` : 'fee:?   ') +
          (priceChanged ? ` (was €${hotel.priceFrom})` : '') +
          '\n'
        )

        // Update in-place (mutate targets array member which is same ref as hotels array)
        hotel.priceFrom = newPrice
        hotel.petFee = newFee
        if (newPolicy && newPolicy.length > 10 && newPolicy.length < 200) {
          hotel.petPolicy = newPolicy
        }

        if (priceChanged || feeChanged) updated++

        // Pause between requests
        if (i < targets.length - 1) await sleep(rand(2500, 4500))

      } catch (e) {
        if (/captcha/i.test(e.message)) {
          captchaCount++
          console.log(`CAPTCHA (${captchaCount} total)`)
          if (captchaCount >= 3) {
            console.error('\n  ⛔ Too many CAPTCHAs — stopping early. Re-run in a few minutes.')
            break
          }
          await sleep(rand(8000, 15000)) // longer wait after CAPTCHA
        } else {
          console.log(`ERROR: ${e.message.slice(0, 60)}`)
        }
      }
    }
  } finally {
    await browser.close()
  }

  console.log(`\n  ${updated} hotels updated (price or fee changed)`)

  if (!dryRun) {
    await writeFile(HOTELS_JSON, JSON.stringify(hotels, null, 2))
    console.log(`  ✅ hotels.json saved\n`)

    // Summary stats
    const prices = hotels.map(h => h.priceFrom).filter(p => p !== 120)
    const still120 = hotels.filter(h => h.priceFrom === 120).length
    const freeCount = hotels.filter(h => h.petFee === 0).length
    const feeCount = hotels.filter(h => h.petFee > 0).length
    const unknownFee = hotels.filter(h => h.petFee === 0 && still120).length

    console.log(`  📊 Price stats:`)
    console.log(`     Still €120 (fallback): ${still120}/${hotels.length}`)
    if (prices.length) {
      console.log(`     Real prices: €${Math.min(...prices)} – €${Math.max(...prices)}, avg €${Math.round(prices.reduce((a,b)=>a+b)/prices.length)}`)
    }
    console.log(`\n  🐾 Pet fee stats:`)
    console.log(`     Confirmed free: ${freeCount}`)
    console.log(`     Has fee:        ${feeCount}`)
    console.log(`     Unknown:        ${hotels.length - freeCount - feeCount}`)
  }
}

main().catch(e => { console.error('\n✗ Fatal:', e.message); process.exit(1) })
