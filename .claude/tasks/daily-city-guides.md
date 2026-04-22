# Daily City Guide Generator — HotelsWithPets.com
# Version 5 — Full-pipeline task (incorporates lessons from manual Rotterdam/Marseille/27-city batches)

## 0. ROLE & MISSION

You are a **senior pet-travel editor** producing city guides for **HotelsWithPets.com**. Your output is public SEO content in three languages (EN/FR/ES) indexed by Google. **Every factual claim is a legal and reputational liability** — accuracy is non-negotiable.

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

### Step 6 — Download the hero image

Edit `scripts/fetch-destination-photos.mjs` to add your new city to the `TARGETS` array with a landmark query:

```js
{ slug: 'new-city', query: 'Iconic Landmark New City' },
```

Then run: `node scripts/fetch-destination-photos.mjs` — it will skip existing and download only new.

### Step 7 — Add destContextByLocale entries (3 languages)

In `lib/editorial.ts`, add EN + FR + ES entries for the new city. Template:

```typescript
// In the `en:` block (around line 244)
slug: {
  personality: 'one of the most [adjective] cities in [country]',
  highlight: '[Park A], [Park B], and [Trail C]',
  area: '[Neighborhood 1], [Neighborhood 2], and [Neighborhood 3]',
},
// Repeat same structure in fr: and es: blocks with natural translations
```

If slug has a dash (e.g. `san-sebastian`), wrap the key in quotes: `'san-sebastian':`.

### Step 8 — Add cityContent entry

**Insert entries alphabetically by slug**, NOT at the end. The file is sorted A→Z to make it maintainable — appending to the end creates a mess.

To insert `newcity`:
1. Find the slug that comes AFTER yours alphabetically (ex: for `newcity`, find `nice:` or the next one)
2. Use Edit with `old_string = "  {next-slug}: {"` and `new_string = "  newcity: { ... },\n\n  {next-slug}: {"` — making sure the full entry is valid

In `lib/cityContent.ts`, add a full entry with this structure:

```typescript
slug: {
  history: { fr: `150-word narrative`, en: `...`, es: `...` },
  sights: [
    { name: 'Sight 1', emoji: '🌳', petFriendly: true, desc: { fr: '...', en: '...', es: '...' } },
    // 6 sights total
  ],
  petTips: { fr: [5 tips], en: [...], es: [...] },
  practicalInfo: { fr: [5 items], en: [...], es: [...] },
},
```

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

### Step 10 — Download hotel + place photos

```bash
node scripts/fetch-hotel-photos-google.mjs           # new hotels auto-detected
node scripts/fetch-city-guide-photos.mjs --city=slug  # all places for this city
```

### Step 11 — Validate & audit

```bash
# Structural integrity check (critical — the audit doesn't catch these)
grep -c "^export default cityContent" lib/cityContent.ts   # must return 1
grep -c "^}$" lib/cityContent.ts                            # top-level closing brace intact

# Full build (catches both TS syntax errors AND import issues — the only reliable pre-commit check)
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

- `scripts/fetch-destination-photos.mjs` — hero image per city
- `scripts/fetch-hotel-photos-google.mjs` — hotel photos (auto-detects new entries)
- `scripts/fetch-city-guide-photos.mjs [--city=slug]` — place photos for each venue
- `scripts/audit-destinations.mjs` — full parity audit, 0 errors = shippable
- `scripts/check-i18n.mjs` — pre-build i18n validation

---

## 6. WHAT HAS CHANGED SINCE VERSION 3

**Before (v3)**: task only produced a JSON file. Cities ended up in audit "warnings" (no cityContent, no hotels, no hero image, no destContextByLocale entry). English intros leaked on French pages.

**Now (v5)**: 12-step pipeline covers EVERYTHING. Same quality as the 50 manually curated cities. Max 2 cities/run to avoid timeouts. Uses proven scripts.
