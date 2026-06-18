/**
 * IndexNow ping — notifies Bing, Yandex, Seznam, DuckDuckGo of sitemap URLs.
 *
 * Runs after each deploy. Fetches the live sitemap, extracts URLs, and POSTs
 * them to the IndexNow shared endpoint (api.indexnow.org), which fans out to
 * every participating engine.
 *
 * Notes:
 * - IndexNow has no Google participation — Google uses the sitemap + its own
 *   crawler. This script speeds up Bing/Yandex/DuckDuckGo/Seznam only.
 * - Free, no account, no quota. Key is validated by fetching
 *   https://www.hotelswithpets.com/{key}.txt and checking the body matches.
 * - Max 10 000 URLs per request. Our sitemap is ~3 500 — one call is enough.
 *
 * Usage: node scripts/indexnow-ping.mjs
 * Exit code 1 on failure so CI can fail loudly.
 */

const KEY = '776cd94dc88003f60b71fbbb078ad1c1'
const HOST = 'www.hotelswithpets.com'
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchSitemapUrls() {
  // The workflow fires on every push and waits a fixed delay for Vercel. If the
  // deploy is slow or a build is mid-flight, the sitemap can transiently return
  // a 5xx/404. Retry a few times before giving up so we don't fail CI (and send
  // a failure email) for a transient deploy window.
  let res
  const ATTEMPTS = 5
  for (let i = 1; i <= ATTEMPTS; i++) {
    try {
      res = await fetch(SITEMAP_URL, { redirect: 'follow' })
      if (res.ok) break
      console.log(`   sitemap attempt ${i}/${ATTEMPTS}: HTTP ${res.status}, retrying…`)
    } catch (e) {
      console.log(`   sitemap attempt ${i}/${ATTEMPTS}: ${e.message}, retrying…`)
    }
    if (i < ATTEMPTS) await sleep(30000)
  }
  if (!res || !res.ok) throw new Error(`Sitemap fetch failed after ${ATTEMPTS} attempts: ${res ? res.status : 'no response'}`)
  const xml = await res.text()
  // Naive but robust: pull every <loc>…</loc>
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim())
  // Dedupe and keep only same-host URLs (IndexNow requirement)
  return [...new Set(urls)].filter(u => {
    try { return new URL(u).host === HOST } catch { return false }
  })
}

async function pingIndexNow(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  return { status: res.status, text: await res.text() }
}

async function main() {
  console.log(`📡 IndexNow ping`)
  console.log(`   Host:     ${HOST}`)
  console.log(`   Sitemap:  ${SITEMAP_URL}`)
  console.log(`   Key file: ${KEY_LOCATION}`)

  const urls = await fetchSitemapUrls()
  console.log(`   URLs found: ${urls.length}`)
  if (urls.length === 0) {
    console.error('❌ No URLs extracted from sitemap — aborting')
    process.exit(1)
  }

  // Split into batches of 10 000 (IndexNow limit), though we're well under.
  const BATCH = 10000
  let ok = 0
  for (let i = 0; i < urls.length; i += BATCH) {
    const chunk = urls.slice(i, i + BATCH)
    const r = await pingIndexNow(chunk)
    // 200 = accepted, 202 = accepted (async), 422 = some invalid URLs (partial OK)
    const good = r.status === 200 || r.status === 202
    console.log(`   Batch ${i / BATCH + 1}: HTTP ${r.status} ${good ? '✅' : '⚠️'}`)
    if (r.text && r.text.length < 500) console.log(`     ${r.text}`)
    if (good) ok += chunk.length
  }

  console.log(`\n✅ IndexNow notified of ${ok}/${urls.length} URLs (Bing, Yandex, Seznam, DuckDuckGo)`)
}

main().catch(e => {
  console.error('❌', e.message)
  process.exit(1)
})
