/**
 * Discover pet-friendly hotels near a destination via the Apify Google Places
 * crawler (compass/crawler-google-places). Mirrors the Le Mans circuit fetcher.
 *
 * For a destination slug (read from data/destinations.json): searches Apify for
 * pet/dog-friendly accommodation near the city, filters to hotels within range,
 * downloads one photo each into public/images/hotels/, and writes a review
 * manifest at scripts/_apify-hotels-{slug}.json (NOT into hotels.json directly).
 *
 * ~$0.0015/place scraped, so a city is a few cents vs ~$0.04/photo on Google.
 *
 *   node scripts/fetch-hotels-apify.mjs <destinationSlug>
 *   node scripts/fetch-hotels-apify.mjs <destinationSlug> --max=20
 */
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const slug = process.argv[2];
const maxArg = process.argv.find((a) => a.startsWith("--max="));
const MAX_PER_SEARCH = maxArg ? parseInt(maxArg.split("=")[1], 10) : 20;
if (!slug) {
  console.error("Usage: node scripts/fetch-hotels-apify.mjs <destinationSlug> [--max=20]");
  process.exit(1);
}

const destinations = JSON.parse(await readFile(path.join(ROOT, "data/destinations.json"), "utf-8"));
const dest = destinations.find((d) => d.slug === slug);
if (!dest) {
  console.error(`Unknown destination "${slug}".`);
  process.exit(1);
}
if (!dest.lat || !dest.lng) {
  console.error(`Destination "${slug}" has no lat/lng.`);
  process.exit(1);
}

async function loadToken() {
  if (process.env.APIFY_TOKEN) return process.env.APIFY_TOKEN;
  const env = await readFile(path.join(ROOT, ".env.local"), "utf-8");
  const m = env.match(/APIFY_TOKEN=(.+)/);
  if (!m) throw new Error("No APIFY_TOKEN in .env.local");
  return m[1].trim();
}

const slugify = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const toRad = (d) => (d * Math.PI) / 180;
function km(aLat, aLng, bLat, bLng) {
  const R = 6371;
  const dLat = toRad(bLat - aLat), dLng = toRad(bLng - aLng);
  const x = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}

const isHotel = (cat = "") => /hotel|resort|motel|inn|hostel|guest house|guesthouse|b&b|bed & breakfast|aparthotel|lodge/i.test(cat);

async function runActor(token) {
  const input = {
    searchStringsArray: [
      `pet friendly hotels in ${dest.name}`,
      `dog friendly hotels in ${dest.name}`,
    ],
    maxCrawledPlacesPerSearch: MAX_PER_SEARCH,
    language: "en",
    maxImages: 1,
    skipClosedPlaces: true,
  };
  console.log(`  scraping Apify for ${slug} (${dest.name}) …`);
  const res = await fetch(
    `https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${token}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) }
  );
  if (!res.ok) throw new Error(`Apify HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

async function downloadPhoto(url, outPath) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`img ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await sharp(buf)
    .resize(800, 500, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(outPath);
}

const token = await loadToken();
const raw = await runActor(token);
console.log(`  ${raw.length} raw places`);

const OUT_IMG = path.join(ROOT, "public", "images", "hotels");
await mkdir(OUT_IMG, { recursive: true });

const seen = new Set();
const out = [];
for (const p of raw) {
  if (!isHotel(p.categoryName)) continue;
  const loc = p.location;
  if (!p.title || !loc?.lat) continue;
  const hslug = slugify(p.title);
  if (seen.has(hslug)) continue;
  seen.add(hslug);
  const distKm = km(dest.lat, dest.lng, loc.lat, loc.lng);
  if (distKm > 25) continue; // keep it in/around the city

  let photo = false;
  const img = (p.imageUrls || [])[0] || p.imageUrl;
  if (img) {
    try {
      const out_jpg = path.join(OUT_IMG, `${hslug}.jpg`);
      if (!existsSync(out_jpg)) await downloadPhoto(img, out_jpg);
      photo = true;
    } catch {}
    await sleep(60);
  }
  out.push({
    name: p.title,
    slug: hslug,
    destinationSlug: slug,
    stars: p.hotelStars || null,
    rating: p.totalScore || null,
    reviewCount: p.reviewsCount || null,
    address: p.address || null,
    city: p.city || null,
    lat: loc.lat,
    lng: loc.lng,
    distKm,
    website: p.website || null,
    googleUrl: p.url || null,
    photo,
    photoFile: photo ? `/images/hotels/${hslug}.jpg` : null,
  });
}

out.sort((a, b) => a.distKm - b.distKm);
const manifest = path.join(__dirname, `_apify-hotels-${slug}.json`);
await writeFile(manifest, JSON.stringify(out, null, 2));

console.log(`\n${"─".repeat(50)}`);
console.log(`✅ ${out.length} pet-friendly hotels near ${dest.name}`);
console.log(`📸 photos: ${out.filter((h) => h.photo).length}/${out.length}`);
console.log(`💾 ${manifest}`);
console.log(`💰 ~$${(raw.length * 0.0015).toFixed(3)} Apify (${raw.length} places scraped)`);
