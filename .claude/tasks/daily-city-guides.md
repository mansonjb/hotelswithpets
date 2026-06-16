# Daily City Guide Generator — HotelsWithPets.com
# Version 5 — Full-pipeline task (incorporates lessons from manual Rotterdam/Marseille/27-city batches)

## 0. ROLE & MISSION

You are a **senior pet-travel editor** producing city guides for **HotelsWithPets.com**. Your output is public SEO content in FOUR languages (EN/FR/ES/PT) indexed by Google. **Every factual claim is a legal and reputational liability**, accuracy is non-negotiable.

Mission: produce **1–2 high-quality, research-backed, trilingual city destinations per run** that reach full Amsterdam-level parity — NOT just a JSON file.

**Project root:** `/Users/jean-baptistemanson/Desktop/CLAUDE NEW SESSION/hotelswithpets`

---

## 1. IMMUTABLE CONSTRAINTS

1. **No fabrication.** Never invent a restaurant, park, vet, address, phone number, price, or transport rule. If a section cannot be verified from ≥2 independent sources (or 1 official source), set `"introEn": "Content coming soon."` and `"places": []` for that section.
2. **Stay22 config is frozen.** Never touch `AID: eijeanbaptistemanson` or `lmaID: 69e08b99d5ab79f03e163885`.
3. **Schema fidelity.** The ground-truth schema is `data/city-guides/amsterdam.json`. Match it exactly.
4. **No force push.** If `git push` is rejected, stop and report.
5. **Max 2 cities per run, treated sequentially.** Finish city 1 entirely before starting city 2. NEVER launch parallel agents — they timeout on large JSON writes.
6. **Max 3 places per section, 2-sentence descriptions, 3 tips / 3 FAQs per language.** These limits exist to avoid stream timeouts.

---

## 2. THE COMPLETE PIPELINE (NEW — must be done for EVERY city)

A destination is NOT "done" until ALL 9 steps below are complete. Partial work = warning in audit = not shipped.

### Step 1 — Preflight

```bash
cd "/Users/jean-baptistemanson/Desktop/CLAUDE NEW SESSION/hotelswithpets"
git status                       # must be clean
git pull --rebase
node scripts/audit-destinations.mjs | tail -5   # baseline count
ls data/city-guides/ | grep -v _evidence | sort | head -20   # what exists
```

### Step 2 — Pick cities

- Choose 1–2 European cities with population ≥ 50 000 NOT in `data/destinations.json`.
- Priority: (a) countries already represented, (b) tourist demand, (c) abundant EN/FR/ES web content.

### Step 3 — Research each city (sequentially)

Run ≥2 distinct web searches per section. Minimum 8 sections per city:
restaurants, parks, transport, beaches, vets, tips, attractions, petsitting.

### Step 4 — Write the city-guide JSON

Create `data/city-guides/{slug}.json` matching amsterdam.json structure exactly, with the compact limits from Section 1.

**CRITICAL — never write the full JSON in a single `Write` call.** The complete file (8 sections × 3 places × 3 languages + tips/faqs) exceeds the 32 000 output-token ceiling and the call crashes with `API Error: Claude's response exceeded the 32000 output token maximum`, losing the in-memory research. Procedure:

1. `Write` the shell only: `{"city":"{Name}","country":"{Country}","flag":"🇫🇷","guides":{}}`.
2. Add each of the 8 sections (restaurants, parks, transport, beaches, vets, tips, attractions, petsitting) via a SEPARATE `Edit` call — one section per tool call. Each Edit emits ~3–4k tokens, well under the cap.
3. If a single section is still large, split it: first Edit adds the section key with 1 place, subsequent Edits append the remaining places.

### Step 5 — Add to destinations.json

```json
{
  "slug": "city-slug",
  "name": "City Name",
  "country": "Country",
  "countryCode": "XX",
  "flag": "🇫🇷",
  "categoryCount": 5,
  "heroImage": "/images/destinations/{slug}.jpg",
  "lat": 00.0000,
  "lng": 00.0000,
  "weather": {
    "jan": {"temp": 5, "desc": "Cool & overcast", "icon": "🌧️"},
    "feb": {...}, ... "dec": {...}
  }
}
```

All 12 months of weather required — use climate averages from reliable sources (Meteoblue, Weatherspark).

### Step 6 — Download the hero image (via Apify, NOT Google)

Photos now come from the Apify Google Places crawler (~$0.0015/place) instead of the Google Places Photo API (~$0.04/photo). The Apify scripts read the destination from `data/destinations.json` directly, so no TARGETS array to edit.

```
node scripts/fetch-destination-photos-apify.mjs --slug=new-city
```

It skips existing heros and downloads only what is missing. Requires `APIFY_TOKEN` in `.env.local`. The legacy `scripts/fetch-destination-photos.mjs` (Google) is kept only as a fallback — do NOT use it routinely; it is the source of the Google Cloud bill.

### Step 7 — Add destContextByLocale entries (4 languages: EN/FR/ES/PT)

In `lib/editorial.ts`, add EN + FR + ES + **PT** entries for the new city in EACH of the 5 `*ByLocale` Records. Template:

```typescript
// In the `en:` block (around line 244)
slug: {
  personality: 'one of the most [adjective] cities in [country]',
  highlight: '[Park A], [Park B], and [Trail C]',
  area: '[Neighborhood 1], [Neighborhood 2], and [Neighborhood 3]',
},
// Repeat same structure in fr:, es:, AND pt: blocks with natural translations
```

`editorial.ts` has 5 `*ByLocale` Records (destContextByLocale, catIntrosByLocale, catTipsByLocale, bestSeasonByLocale, testimonialsByLocale). Each one has 4 locale blocks: `en`, `fr`, `es`, `pt`. **Never skip the `pt:` block** — `/pt/destinations/{slug}` pages fall back to EN if PT is missing, which leaks English into Portuguese pages.

If slug has a dash (e.g. `san-sebastian`), wrap the key in quotes: `'san-sebastian':`.

### Step 8 — Add cityContent entry

**Insert entries alphabetically by slug**, NOT at the end. The file is sorted A→Z to make it maintainable — appending to the end creates a mess.

To insert `newcity`:
1. Find the slug that comes AFTER yours alphabetically (ex: for `newcity`, find `nice:` or the next one)
2. Use Edit with `old_string = "  {next-slug}: {"` and `new_string = "  newcity: { ... },\n\n  {next-slug}: {"` — making sure the full entry is valid

In `lib/cityContent.ts`, add a full entry with this structure (FOUR languages: EN/FR/ES/**PT**):

```typescript
slug: {
  history: { fr: `150-word narrative`, en: `...`, es: `...`, pt: `...` },
  sights: [
    { name: 'Sight 1', emoji: '🌳', petFriendly: true, desc: { fr: '...', en: '...', es: '...', pt: '...' } },
    // 6 sights total
  ],
  petTips: { fr: [5 tips], en: [...], es: [...], pt: [...] },
  practicalInfo: { fr: [5 items], en: [...], es: [...], pt: [...] },
},
```

**Use backticks** for any string containing apostrophes (avoids the `'L\'extérieur'` escape trap). Always include the `pt:` key in every locale-keyed object — `/pt/destinations/{slug}` pages prerender Portuguese content directly from cityContent.ts; missing PT = English fallback = broken Portuguese page.

Include at least one pet-SPECIFIC local rule per section (transport policy, summer heat warning, beach seasonal ban, emergency vet number, etc.).

### Step 9 — Add 5 real hotels to hotels.json

Research on Booking.com for each hotel:
- Exact name
- Stars (1–5)
- Guest rating (out of 10)
- Review count
- Price from (EUR/GBP/etc)
- Booking.com URL
- Pet fee per night (check House rules)
- Pet policy (2-3 sentences)
- 3 highlights

Categories to pick from: `dog-friendly`, `cat-friendly`, `near-parks`, `luxury-pet-friendly`, `budget-pet-friendly`, `dogs-stay-free` (if petFee=0), `boutique-pet-friendly`.

Mix price points: 1 luxury + 2–3 mid-range + 1–2 budget.

**Verify every hotel's pet policy via web search before adding.** If you cannot verify pets are allowed, DO NOT include the hotel.

### Step 10 — Download hotel + place photos (via Apify, NOT Google)

```bash
node scripts/fetch-city-place-photos-apify.mjs --city=slug   # all missing places for this city
```

For hotel photos near a city, use the Apify discovery fetcher (writes a review manifest, does not touch hotels.json):

```bash
node scripts/fetch-hotels-apify.mjs slug    # discover pet-friendly hotels + photos near the city
```

The legacy Google scripts (`fetch-hotel-photos-google.mjs`, `fetch-city-guide-photos.mjs`, `fetch-destination-photos.mjs`) are kept as fallback only — they bill the Google Cloud account at ~$0.04/photo and must NOT be used routinely. Apify is ~13x cheaper.

### Step 11 — Validate & audit

```bash
# Structural integrity check (critical — the audit doesn't catch these)
grep -c "^export default cityContent" lib/cityContent.ts   # must return 1
grep -c "^}$" lib/cityContent.ts                            # top-level closing brace intact

# Full build (catches both TS syntax errors AND import issues — the only reliable pre-commit check)
# `npm run build` auto-runs `scripts/translate-to-pt.py` first to add PT fields to any new
# city-guide JSON (ES→PT mechanical translation, idempotent — re-runs are no-ops). No manual
# PT step needed when adding new cities.
npm run build

# Additional validation
node scripts/check-i18n.mjs
node scripts/audit-destinations.mjs | tail -5
python3 -m json.tool data/destinations.json > /dev/null
```

If `npm run build` fails or any grep returns 0, **FIX BEFORE COMMITTING**. The audit doesn't catch:
- Unescaped apostrophes in TS single-quoted strings
- Missing `export default cityContent` at end of file (common when inserting new entries before the closing brace)
- Broken imports downstream

**Two gotchas that have broken production Vercel builds**:

1. **Apostrophe trap**: TypeScript single-quoted strings require `\'` for every internal apostrophe. Example mistake: `'L\'extérieur signé Gehry et la sculpture 'Puppy' de Koons'` breaks because `'Puppy'` isn't escaped. Use `\'Puppy\'` or switch to backticks.

2. **Missing export default**: When inserting a new city entry at the end of `lib/cityContent.ts`, always insert BEFORE the final `}` that closes the object literal — NEVER below it (that would put your entry after the `export default` or erase it). The correct end-of-file must always be:
```
  },  // last city entry

}

export default cityContent
```

### Step 12 — Commit & push (ONE COMMIT + PUSH PER CITY)

**Commit AND push city 1 before starting city 2.** If city 2 crashes (timeout, token limit, research gap), city 1 is already live on production. Never batch two cities into one commit, and never defer the push until the end.

```bash
# After city 1's Steps 1–11 pass:
git add data/ lib/ public/images/ scripts/
git commit -m "feat: add {city1} — full parity with hotels, cityContent, photos"
git push origin main

# THEN proceed to city 2, repeat Steps 1–11 for it, then:
git add data/ lib/ public/images/ scripts/
git commit -m "feat: add {city2} — full parity with hotels, cityContent, photos"
git push origin main
```

---

## 3. ANTI-TIMEOUT RULES (critical for cloud execution)

- **Write one file at a time.** Never try to write multiple large JSONs in one tool call.
- **For large JSONs (>40KB) use Edit with small chunks** rather than Write.
- **After each section of a JSON, save the file** — progress preserves even if timeout hits.
- **Never spawn parallel sub-agents** — they timeout on concurrent large writes.
- **Do city 1 completely through Step 12 before starting city 2.** That way at minimum one city ships.

---

## 4. FINAL REPORT (print at end)

```
=== DAILY RUN — {YYYY-MM-DD} ===

Cities completed: {N}/2
  - {city}: ✅ all 12 pipeline steps, audit PASS
  - {city}: ⚠️ stopped at step X because {reason}

Audit result: {N}/50 parity-compliant ({delta} vs baseline)
Commit: {short-sha}
Pushed: YES/NO
Remaining warnings: {list}
```

---

## 5. KEY SCRIPTS (use these, don't reinvent)

- `scripts/fetch-destination-photos-apify.mjs [--slug=x]` — hero image per city (Apify, cheap) ← USE THIS
- `scripts/fetch-city-place-photos-apify.mjs [--city=slug]` — fills missing place photos (Apify, cheap) ← USE THIS
- `scripts/fetch-hotels-apify.mjs <slug>` — discover pet-friendly hotels + photos near a city (Apify)
- `scripts/fetch-destination-photos.mjs` / `fetch-hotel-photos-google.mjs` / `fetch-city-guide-photos.mjs` — LEGACY Google (expensive, fallback only)
- `scripts/audit-destinations.mjs` — full parity audit, 0 errors = shippable
- `scripts/check-i18n.mjs` — pre-build i18n validation

---

## 6. WHAT HAS CHANGED SINCE VERSION 3

**Before (v3)**: task only produced a JSON file. Cities ended up in audit "warnings" (no cityContent, no hotels, no hero image, no destContextByLocale entry). English intros leaked on French pages.

**Now (v5)**: 12-step pipeline covers EVERYTHING. Same quality as the 50 manually curated cities. Max 2 cities/run to avoid timeouts. Uses proven scripts.
