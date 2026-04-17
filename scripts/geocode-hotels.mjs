/**
 * Geocode all hotels in hotels.json via Nominatim (OpenStreetMap) — free, no API key needed.
 * Adds lat/lng fields to each hotel. Skips hotels already geocoded.
 *
 * Rate limit: 1 req/s (Nominatim policy).
 * 344 hotels → ~6 min to run if all missing.
 *
 * Usage: node scripts/geocode-hotels.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const NOMINATIM = 'https://nominatim.openstreetmap.org/search'
const DELAY_MS = 1100 // 1 req/s + safety margin
const USER_AGENT = 'HotelsWithPets/1.0 (hotelswithpets.com)'

// Destination name lookup (slug → city name for better geocoding)
const destinations = JSON.parse(readFileSync(join(ROOT, 'data/destinations.json'), 'utf-8'))
const destMap = Object.fromEntries(destinations.map(d => [d.slug, { name: d.name, country: d.country, lat: d.lat, lng: d.lng }]))

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function geocode(hotelName, cityName, countryName, cityLat, cityLng) {
  // Try progressively simpler queries
  const queries = [
    `${hotelName}, ${cityName}, ${countryName}`,
    `${hotelName}, ${cityName}`,
    // Strip common words that confuse Nominatim
    `${hotelName.replace(/\s+(Hotel|Hôtel|by IHG|by Marriott|by Hilton|Autograph Collection|—.*$)/gi, '').trim()}, ${cityName}`,
  ]

  for (const q of queries) {
    try {
      const url = `${NOMINATIM}?format=json&q=${encodeURIComponent(q)}&limit=3&addressdetails=1`
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
      if (!res.ok) continue
      const results = await res.json()

      // Filter: must be within ~15km of city center
      const MAX_KM = 15
      const close = results.filter(r => {
        const dlat = r.lat - cityLat
        const dlng = r.lon - cityLng
        const dist = Math.sqrt(dlat * dlat + dlng * dlng) * 111 // rough km
        return dist < MAX_KM
      })

      if (close.length > 0) {
        return { lat: parseFloat(close[0].lat), lng: parseFloat(close[0].lon) }
      }
    } catch (e) {
      // continue to next query
    }
    await sleep(DELAY_MS)
  }
  return null
}

async function main() {
  const hotelsPath = join(ROOT, 'data/hotels.json')
  const hotels = JSON.parse(readFileSync(hotelsPath, 'utf-8'))

  const missing = hotels.filter(h => !h.lat || !h.lng)
  const already = hotels.filter(h => h.lat && h.lng).length

  console.log(`Hotels total: ${hotels.length}`)
  console.log(`Already geocoded: ${already}`)
  console.log(`To geocode: ${missing.length}`)
  console.log('---')

  let success = 0
  let failed = 0
  let failedNames = []

  for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i]

    // Skip already done
    if (hotel.lat && hotel.lng) continue

    const dest = destMap[hotel.destinationSlug]
    if (!dest) {
      console.warn(`  ⚠ Unknown destination: ${hotel.destinationSlug}`)
      failed++
      failedNames.push(hotel.name)
      continue
    }

    process.stdout.write(`[${i + 1}/${hotels.length}] ${hotel.name.slice(0, 50)}... `)

    const result = await geocode(hotel.name, dest.name, dest.country, dest.lat, dest.lng)

    if (result) {
      hotel.lat = result.lat
      hotel.lng = result.lng
      process.stdout.write(`✓ (${result.lat.toFixed(4)}, ${result.lng.toFixed(4)})\n`)
      success++
    } else {
      // Fallback: use city center + small random offset to avoid all hotels pinned to same point
      const jitter = () => (Math.random() - 0.5) * 0.01
      hotel.lat = parseFloat((dest.lat + jitter()).toFixed(6))
      hotel.lng = parseFloat((dest.lng + jitter()).toFixed(6))
      hotel.latApproximate = true
      process.stdout.write(`~ (city center approx)\n`)
      failed++
      failedNames.push(hotel.name)
    }

    // Save every 10 hotels as checkpoint
    if ((i + 1) % 10 === 0) {
      writeFileSync(hotelsPath, JSON.stringify(hotels, null, 2))
      console.log(`  💾 Checkpoint saved (${i + 1} processed)`)
    }

    await sleep(DELAY_MS)
  }

  // Final save
  writeFileSync(hotelsPath, JSON.stringify(hotels, null, 2))

  console.log('\n=== Done ===')
  console.log(`✓ Geocoded exactly: ${success}`)
  console.log(`~ City center fallback: ${failed}`)
  if (failedNames.length > 0) {
    console.log('Failed hotels:')
    failedNames.forEach(n => console.log('  -', n))
  }
}

main().catch(console.error)
