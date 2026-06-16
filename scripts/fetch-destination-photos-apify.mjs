/**
 * Fetch destination HERO photos via the Apify Google Places crawler
 * (compass/crawler-google-places), replacing the Google Places Photo API.
 *
 * For every destination missing its hero (public/images/destinations/{slug}.jpg),
 * searches Apify for a scenic landmark and downloads one wide photo.
 *
 *   node scripts/fetch-destination-photos-apify.mjs            # all missing
 *   node scripts/fetch-destination-photos-apify.mjs --slug=porto
 *   node scripts/fetch-destination-photos-apify.mjs --force    # re-download
 *
 * ~$0.0015/place scraped.
 */
import sharp from "sharp";
import { mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const onlySlug = (process.argv.find((a) => a.startsWith("--slug=")) || "").split("=")[1];
const FORCE = process.argv.includes("--force");

async function loadToken() {
  if (process.env.APIFY_TOKEN) return process.env.APIFY_TOKEN;
  const env = await readFile(path.join(ROOT, ".env.local"), "utf-8");
  const m = env.match(/APIFY_TOKEN=(.+)/);
  if (!m) throw new Error("No APIFY_TOKEN in .env.local");
  return m[1].trim();
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
    .resize(1200, 800, { fit: "cover", position: "centre" })
    .jpeg({ quality: 84, progressive: true, mozjpeg: true })
    .toFile(outPath);
}

const destinations = JSON.parse(await readFile(path.join(ROOT, "data/destinations.json"), "utf-8"));
const OUT = path.join(ROOT, "public/images/destinations");
await mkdir(OUT, { recursive: true });

const todo = destinations.filter((d) => {
  if (onlySlug && d.slug !== onlySlug) return false;
  if (FORCE) return true;
  return !existsSync(path.join(OUT, `${d.slug}.jpg`));
});

if (!todo.length) {
  console.log("No destination heros missing. Nothing to do.");
  process.exit(0);
}
console.log(`Fetching ${todo.length} destination heros …`);

const token = await loadToken();
let filled = 0, scraped = 0;

// Batch in groups of 10 queries per actor run
for (let i = 0; i < todo.length; i += 10) {
  const batch = todo.slice(i, i + 10);
  // landmark-biased query gives a scenic photo, not a street sign
  const queries = batch.map((d) => `${d.name} ${d.country} old town landmark`);
  let raw;
  try {
    raw = await runActor(token, queries);
  } catch (e) {
    console.log(`  batch ${i / 10}: actor error ${e.message}`);
    continue;
  }
  scraped += raw.length;
  // Apify does NOT guarantee result order matches query order, so match each
  // result to its destination by city-name overlap rather than by index.
  const normHero = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const used = new Set();
  for (const r of raw) {
    const img = (r.imageUrls || [])[0] || r.imageUrl;
    if (!img) continue;
    const title = normHero(`${r.title} ${r.city || ""} ${r.address || ""}`);
    let best = -1, bestScore = 0;
    batch.forEach((d, k) => {
      if (used.has(k)) return;
      const cityN = normHero(d.name);
      const sc = title.includes(cityN) ? cityN.length : 0;
      if (sc > bestScore) { bestScore = sc; best = k; }
    });
    if (best < 0) continue;
    try {
      await downloadPhoto(img, path.join(OUT, `${batch[best].slug}.jpg`));
      used.add(best);
      filled++;
      await sleep(60);
    } catch { console.log(`  ${batch[best].slug}: dl error`); }
  }
  for (let k = 0; k < batch.length; k++) if (!used.has(k)) console.log(`  ${batch[k].slug}: no match`);
  console.log(`  batch ${i / 10 + 1}: ${used.size}/${batch.length} (${raw.length} scraped)`);
}

console.log(`\n${"─".repeat(50)}`);
console.log(`✅ ${filled}/${todo.length} heros fetched`);
console.log(`💰 ~$${(scraped * 0.0015).toFixed(3)} Apify (${scraped} places scraped)`);
