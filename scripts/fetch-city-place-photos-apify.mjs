/**
 * Fill MISSING city-place photos via the Apify Google Places crawler
 * (compass/crawler-google-places), replacing the Google Places Photo API.
 *
 * Scans every city-guide for places whose `photo` path is absent on disk,
 * groups them by city, and runs ONE Apify search per city (one query per
 * missing place, 1 result each), fuzzy-matches results back to place names,
 * and downloads the photo to its expected path.
 *
 *   node scripts/fetch-city-place-photos-apify.mjs            # all missing
 *   node scripts/fetch-city-place-photos-apify.mjs --city=hvar
 *
 * ~$0.0015/place scraped. Skips places whose photo already exists.
 */
import sharp from "sharp";
import { mkdir, readFile, writeFile, readdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const onlyCity = (process.argv.find((a) => a.startsWith("--city=")) || "").split("=")[1];

async function loadToken() {
  if (process.env.APIFY_TOKEN) return process.env.APIFY_TOKEN;
  const env = await readFile(path.join(ROOT, ".env.local"), "utf-8");
  const m = env.match(/APIFY_TOKEN=(.+)/);
  if (!m) throw new Error("No APIFY_TOKEN in .env.local");
  return m[1].trim();
}

const norm = (s) =>
  (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

// token-overlap similarity 0..1
function sim(a, b) {
  const A = new Set(norm(a).split(" ").filter(Boolean));
  const B = new Set(norm(b).split(" ").filter(Boolean));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / Math.min(A.size, B.size);
}

async function runActor(token, queries) {
  const input = {
    searchStringsArray: queries,
    maxCrawledPlacesPerSearch: 1,
    language: "en",
    maxImages: 1,
    skipClosedPlaces: false,
  };
  const res = await fetch(
    `https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${token}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) }
  );
  if (!res.ok) throw new Error(`Apify HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function downloadPhoto(url, outPath) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`img ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await sharp(buf)
    .resize(800, 600, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(outPath);
}

// Build the missing-photo worklist, grouped by city
const guidesDir = path.join(ROOT, "data/city-guides");
const files = (await readdir(guidesDir)).filter((f) => f.endsWith(".json"));
const work = {}; // citySlug -> { name, items: [{placeName, photoPath}] }
for (const f of files) {
  const citySlug = f.replace(".json", "");
  if (onlyCity && citySlug !== onlyCity) continue;
  const d = JSON.parse(await readFile(path.join(guidesDir, f), "utf-8"));
  const cityName = d.name || citySlug;
  for (const g of Object.values(d.guides || {})) {
    for (const p of g.places || []) {
      const ph = p.photo;
      if (!ph) continue;
      if (existsSync(path.join(ROOT, "public", ph))) continue;
      (work[citySlug] ||= { name: cityName, items: [] }).items.push({
        placeName: p.name,
        photoPath: path.join(ROOT, "public", ph),
        rel: ph,
      });
    }
  }
}

const cities = Object.keys(work);
if (!cities.length) {
  console.log("No missing city-place photos. Nothing to do.");
  process.exit(0);
}
const totalMissing = cities.reduce((n, c) => n + work[c].items.length, 0);
console.log(`Missing photos: ${totalMissing} across ${cities.length} cities`);

const token = await loadToken();
await mkdir(path.join(ROOT, "public/images/city-places"), { recursive: true });

let filled = 0, scraped = 0;
for (const citySlug of cities) {
  const { name, items } = work[citySlug];
  const queries = items.map((it) => `${it.placeName} ${name}`);
  let raw;
  try {
    raw = await runActor(token, queries);
  } catch (e) {
    console.log(`  ${citySlug}: actor error ${e.message}`);
    continue;
  }
  scraped += raw.length;
  // greedy fuzzy assign each result to best-matching unfilled item
  const used = new Set();
  for (const r of raw) {
    const img = (r.imageUrls || [])[0] || r.imageUrl;
    if (!img) continue;
    let best = -1, bestScore = 0.34; // require minimal overlap
    items.forEach((it, i) => {
      if (used.has(i)) return;
      const sc = sim(r.title, it.placeName);
      if (sc > bestScore) { bestScore = sc; best = i; }
    });
    if (best < 0) continue;
    try {
      await downloadPhoto(img, items[best].photoPath);
      used.add(best);
      filled++;
    } catch {}
    await sleep(60);
  }
  console.log(`  ${citySlug}: ${used.size}/${items.length} filled (${raw.length} scraped)`);
}

console.log(`\n${"─".repeat(50)}`);
console.log(`✅ filled ${filled}/${totalMissing} missing photos`);
console.log(`💰 ~$${(scraped * 0.0015).toFixed(3)} Apify (${scraped} places scraped)`);
