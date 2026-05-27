#!/usr/bin/env node
/**
 * Fetches the main product image URL for each ASIN in
 * `data/amazon-products.ts` and writes it back as the `imageUrl` field.
 *
 * Usage: node scripts/fetch-amazon-images.mjs
 *
 * Why: Amazon's image-widget endpoint (ws-eu.amazon-adsystem.com) returns
 * a 1x1 tracking pixel, not the product image. The legacy CDN pattern
 * `m.media-amazon.com/images/P/{ASIN}.jpg` only works for ~50% of SKUs.
 * The reliable approach is to scrape the actual product page once and
 * cache the og:image URL (served from m.media-amazon.com/images/I/...
 * which never 404s once captured).
 *
 * The script needs a real browser User-Agent because Amazon blocks
 * bot-like requests at the edge.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REGISTRY = resolve(__dirname, '..', 'data', 'amazon-products.ts')

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

async function fetchProductImage(asin) {
  const url = `https://www.amazon.fr/dp/${asin}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${asin}`)
  const html = await res.text()

  // 1) og:image meta tag (most reliable when present)
  const og = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
  if (og?.[1]) return og[1]

  // 2) landingImage data-old-hires attribute
  const hires = html.match(/data-old-hires=["']([^"']+\.jpg)["']/i)
  if (hires?.[1]) return hires[1]

  // 3) First data-a-dynamic-image entry (JSON map of url->dimensions)
  const dyn = html.match(/data-a-dynamic-image=["']({[^"']+})["']/i)
  if (dyn?.[1]) {
    try {
      const decoded = dyn[1].replace(/&quot;/g, '"')
      const parsed = JSON.parse(decoded)
      const first = Object.keys(parsed)[0]
      if (first) return first
    } catch {}
  }

  // 4) Fallback: any /images/I/...jpg URL in the page
  const generic = html.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9+_-]+\._[^"']+\.jpg/)
  if (generic?.[0]) return generic[0]

  throw new Error(`no image found for ${asin}`)
}

async function main() {
  const src = await readFile(REGISTRY, 'utf8')

  // Find all ASIN entries
  const asinMatches = [...src.matchAll(/asin:\s*['"]([A-Z0-9]{10})['"]/g)]
  const asins = [...new Set(asinMatches.map(m => m[1]))]
  console.log(`Found ${asins.length} ASINs in registry.`)

  const results = {}
  for (const asin of asins) {
    process.stdout.write(`  ${asin} ... `)
    try {
      const img = await fetchProductImage(asin)
      results[asin] = img
      console.log('OK')
    } catch (e) {
      console.log(`FAIL (${e.message})`)
    }
    // Be polite, avoid triggering Amazon throttling
    await new Promise(r => setTimeout(r, 700))
  }

  // Write image URLs back into the registry. For each product block, if no
  // imageUrl is present yet, insert one right after the `asin:` line. We
  // keep this as a textual transform to avoid touching anything else.
  let updated = src
  for (const [asin, url] of Object.entries(results)) {
    const blockRe = new RegExp(
      `(asin:\\s*['"]${asin}['"],)([\\s\\S]*?)(\\n\\s*\\})`,
      'g'
    )
    updated = updated.replace(blockRe, (full, head, body, tail) => {
      if (/imageUrl:/.test(body)) return full // already set, don't overwrite
      // Insert imageUrl right before the closing brace, indented like siblings
      const indentMatch = body.match(/\n(\s+)\w/)
      const indent = indentMatch ? indentMatch[1] : '    '
      return `${head}${body}\n${indent}imageUrl: '${url}',${tail}`
    })
  }

  await writeFile(REGISTRY, updated, 'utf8')
  const ok = Object.keys(results).length
  console.log(`\nWrote ${ok}/${asins.length} imageUrl entries to ${REGISTRY}`)
  if (ok < asins.length) {
    console.log('Re-run the script later for the ones that failed.')
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
