/**
 * Fetch REAL per-hotel photos via the Apify Google Places crawler
 * (compass/crawler-google-places), writing one photo per hotel to
 * public/images/hotels/{id}.jpg.
 *
 * Unlike fetch-hotels-apify.mjs (which DISCOVERS hotels near a city and names
 * files by the discovered slug), this targets the hotels ALREADY in
 * data/hotels.json by id: it searches "{name} {city} {country}" for each, fuzzy
 * matches the returned place back to the hotel by name-token overlap, and only
 * writes the photo when the match is confident. Low-confidence matches are
 * skipped (the existing image is kept) so a hotel never gets the wrong photo.
 *
 *   node scripts/fetch-hotel-photos-apify.mjs --slugs=tenerife,gozo   # these cities
 *   node scripts/fetch-hotel-photos-apify.mjs --all                   # every hotel
 *   node scripts/fetch-hotel-photos-apify.mjs --slugs=gozo --force    # re-download
 *
 * ~$0.0015/place scraped. Requires APIFY_TOKEN in .env.local.
 */
import sharp from "sharp";
import { mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const slugsArg = (process.argv.find((a) => a.startsWith("--slugs=")) || "").split("=")[1];
const ALL = process.argv.includes("--all");
const FORCE = process.argv.includes("--force");
const MIN_OVERLAP = 0.5; // fraction of hotel-name tokens that must appear in the place title

if (!slugsArg && !ALL) {
  console.error("Usage: node scripts/fetch-hotel-photos-apify.mjs --slugs=a,b | --all [--force]");
  process.exit(1);
}

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
    .resize(800, 533, { fit: "cover", position: "centre" }) // hotel cards render ~300px; keep files light for the deploy-size budget
    .jpeg({ quality: 72, progressive: true, mozjpeg: true })
    .toFile(outPath);
}

const STOP = new Set(["hotel", "hostal", "apartments", "apartment", "apartamentos", "aparthotel",
  "resort", "spa", "suites", "suite", "the", "by", "and", "de", "la", "el", "los", "las", "casa",
  "guesthouse", "house", "b&b", "rooms", "villa", "villas", "boutique"]);
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const tokens = (s) => norm(s).split(" ").filter((t) => t && !STOP.has(t));

// Confidence that a Google place IS this hotel. Returns the token overlap, but
// only if the hotel's FIRST distinctive token (its brand/name word) appears in
// the title — this rejects matches that share only a city/area token, e.g.
// "Galaxy Hotel Argostoli" vs "Argostoli Bay Apartments" (galaxy absent -> 0).
function matchScore(hotelName, placeTitle) {
  const H = tokens(hotelName);
  if (!H.length) return 0;
  const P = new Set(tokens(placeTitle));
  if (!P.has(H[0])) return 0; // brand word must be present
  let hit = 0;
  for (const t of H) if (P.has(t)) hit++;
  return hit / H.length;
}

// Deterministic neutral placeholder (same scheme as download-missing-hotel-images.mjs)
// used when no confident Google match is found, so a hotel never keeps another
// property's photo.
async function picsumFallback(h, outPath) {
  const parts = h.id.split("-");
  const city = parts.slice(0, -1).join("-");
  const num = parts[parts.length - 1];
  const url = `https://picsum.photos/seed/${encodeURIComponent(`${city}-hotel-pet-friendly-${num}`)}/1200/800`;
  await downloadPhoto(url, outPath);
}

const hotels = JSON.parse(await readFile(path.join(ROOT, "data/hotels.json"), "utf-8"));
const destinations = JSON.parse(await readFile(path.join(ROOT, "data/destinations.json"), "utf-8"));
const destBySlug = Object.fromEntries(destinations.map((d) => [d.slug, d]));

const wanted = ALL ? null : new Set(slugsArg.split(",").map((s) => s.trim()).filter(Boolean));
const OUT = path.join(ROOT, "public", "images", "hotels");
await mkdir(OUT, { recursive: true });

let targets = hotels.filter((h) => (ALL || wanted.has(h.destinationSlug)));
if (!FORCE) {
  // still re-fetch even if file exists when FORCE; otherwise only missing
  // (but picsum placeholders already exist, so default behaviour here is to overwrite
  //  targeted hotels regardless — FORCE only matters for --all to skip done ones)
}
if (ALL && !FORCE) targets = targets.filter((h) => !existsSync(path.join(OUT, `${h.id}.jpg`)));

console.log(`Targeting ${targets.length} hotels` + (wanted ? ` in: ${[...wanted].join(", ")}` : " (all)"));

const token = await loadToken();
let filled = 0, scraped = 0, skipped = 0;
const log = [];

for (let i = 0; i < targets.length; i += 10) {
  const batch = targets.slice(i, i + 10);
  const queries = batch.map((h) => {
    const d = destBySlug[h.destinationSlug];
    const city = d ? d.name : h.destinationSlug;
    const country = d ? d.country : "";
    return `${h.name} ${city} ${country}`.trim();
  });
  let raw;
  try {
    raw = await runActor(token, queries);
  } catch (e) {
    console.log(`  batch ${i / 10}: actor error ${e.message}`);
    continue;
  }
  scraped += raw.length;

  const used = new Set();
  // For each returned place, find the best-matching unused hotel in this batch.
  for (const r of raw) {
    const img = (r.imageUrls || [])[0] || r.imageUrl;
    const title = r.title || "";
    if (!img || !title) continue;
    let best = -1, bestScore = 0;
    batch.forEach((h, k) => {
      if (used.has(k)) return;
      const sc = matchScore(h.name, title);
      if (sc > bestScore) { bestScore = sc; best = k; }
    });
    if (best < 0 || bestScore < MIN_OVERLAP) continue; // no confident match -> handled by fallback below
    const h = batch[best];
    try {
      await downloadPhoto(img, path.join(OUT, `${h.id}.jpg`));
      used.add(best);
      filled++;
      log.push(`  ✓ ${h.id}  "${h.name}"  <-  "${title}"  (${(bestScore * 100) | 0}%)`);
      await sleep(60);
    } catch {
      log.push(`  ✗ ${h.id}  dl error`);
    }
  }
  // hotels in this batch that got no confident match -> reset to a neutral
  // placeholder so they never keep a wrong-property photo from a prior run.
  for (let k = 0; k < batch.length; k++) {
    if (used.has(k)) continue;
    const h = batch[k];
    skipped++;
    try {
      await picsumFallback(h, path.join(OUT, `${h.id}.jpg`));
      log.push(`  -  ${h.id}  "${h.name}"  no confident match (neutral placeholder)`);
      await sleep(40);
    } catch {
      log.push(`  -  ${h.id}  "${h.name}"  no match + placeholder failed`);
    }
  }
}

console.log(log.join("\n"));
console.log(`\n${"─".repeat(50)}`);
console.log(`✅ ${filled} real photos written, ${skipped} kept existing`);
console.log(`💰 ~$${(scraped * 0.0015).toFixed(3)} Apify (${scraped} places scraped)`);
