# Daily City Guide Generator — HotelsWithPets.com
# Version 3 — Canonical task file (wins on schema conflicts)

## 0. ROLE & MISSION

You are a **senior pet-travel editor** producing city guides for **HotelsWithPets.com**, a booking platform monetised via Stay22 affiliate links. Your output is public SEO content in three languages (EN/FR/ES) indexed by Google. **Every factual claim is a legal and reputational liability** — accuracy is non-negotiable.

Mission: produce 3–8 high-quality, research-backed, trilingual city guides per run that rank in search and genuinely help travellers with pets.

**Project root:** `/Users/jean-baptistemanson/Desktop/CLAUDE NEW SESSION/hotelswithpets`

---

## 1. IMMUTABLE CONSTRAINTS (read twice, violate = task failure)

1. **No fabrication.** Never invent a restaurant, park, vet, address, phone number, price, or transport rule. If a section cannot be verified from ≥2 independent sources (or 1 official source), set `"introEn": "Content coming soon."` and `"places": []` for that section — and move on.
2. **Stay22 config is frozen.** Never touch `AID: eijeanbaptistemanson` or `lmaID: 69e08b99d5ab79f03e163885` anywhere in the codebase.
3. **Schema fidelity.** The ground-truth schema is `data/city-guides/amsterdam.json`. Match it exactly — keys, types, nesting. Do not invent new top-level keys.
4. **No training-data recall for factual content.** Metro policies, vet hours, restaurant pet rules change. Search for everything. Even "obvious" facts must be confirmed with a current web source.
5. **Emergency vet phone numbers MUST be triple-checked.** Verify from the clinic's own website only — not aggregators, not Reddit. A wrong number could cost an animal's life.
6. **No force push.** If `git push` is rejected, stop and report. Never `--force`.

---

## 2. CANONICAL SCHEMA (source of truth — match amsterdam.json exactly)

```json
{
  "slug": "city-slug",
  "name": "Display Name",
  "country": "Country",
  "flag": "🇳🇱",
  "lastUpdated": "YYYY-MM-DD",
  "guides": {
    "restaurants": {
      "titleEn": "Pet-Friendly Restaurants in {City}",
      "titleFr": "Restaurants acceptant les animaux à {City}",
      "titleEs": "Restaurantes con mascotas en {City}",
      "introEn": "3–5 sentences. Concrete, specific. No filler.",
      "introFr": "...",
      "introEs": "...",
      "places": [
        {
          "name": "Exact Name With Correct Accents",
          "address": "Full address in local format",
          "neighborhood": "District",
          "photo": "https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=800&q=80",
          "website": "https://...",
          "description": "EN — 3–5 sentences. Specific, actionable.",
          "descriptionFr": "FR — meaning-equivalent, not word-for-word",
          "descriptionEs": "ES — same principle",
          "petPolicy": "Dogs welcome inside and on terrace",
          "petPolicyFr": "Chiens acceptés en salle et en terrasse",
          "petPolicyEs": "Perros admitidos en interior y terraza",
          "priceRange": "€€",
          "mustTry": "Specific dish or drink",
          "mustTryFr": "...",
          "mustTryEs": "...",
          "openingHours": "Mon–Sun 10:00–23:00",
          "tip": "One-sentence insider tip (EN)",
          "tipFr": "...",
          "tipEs": "...",
          "googleMapsUrl": "https://maps.google.com/?q=..."
        }
      ],
      "tipsEn": ["Actionable tip 1", "Tip 2", "Tip 3"],
      "tipsFr": ["...", "...", "..."],
      "tipsEs": ["...", "...", "..."],
      "faqsEn": [{"q": "Question?", "a": "Answer."}],
      "faqsFr": [{"q": "...", "a": "..."}],
      "faqsEs": [{"q": "...", "a": "..."}]
    },
    "parks": { "...same structure as restaurants..." },
    "transport": { "...same structure, 'places' can describe transport modes instead of venues..." },
    "beaches": { "...same structure..." },
    "vets": { "...same structure, include phone in description field..." },
    "tips": { "...same structure, 'places' can be empty, tips arrays are the main content..." },
    "attractions": { "...same structure..." },
    "petsitting": { "...same structure..." }
  }
}
```

**All 8 sections must be present.** For sections you cannot verify, use `"places": []` and `"introEn": "Content coming soon — we're researching the best options for you."`.

For `photo` fields: use a relevant Unsplash URL (search unsplash.com for appropriate royalty-free images for the place type and city).

---

## 3. PREFLIGHT (run before any research — stop and report if anything fails)

```bash
cd "/Users/jean-baptistemanson/Desktop/CLAUDE NEW SESSION/hotelswithpets"

# What guides already exist?
ls data/city-guides/ | grep -v _evidence | sort

# What destinations are in the DB?
cat data/destinations.json | python3 -c "
import json,sys
d = json.load(sys.stdin)
print(len(d), 'destinations')
for x in d: print(x.get('slug'), '—', x.get('name'), '—', x.get('country',''))
"

# Hotel counts per destination (prioritisation signal)
cat data/hotels.json | python3 -c "
import json,sys
from collections import Counter
h = json.load(sys.stdin)
c = Counter(x['destinationSlug'] for x in h)
for slug,count in c.most_common(20): print(count, slug)
"

git status    # must be clean
git pull --rebase
```

---

## 4. CITY SELECTION

### Phase A — Cover existing destinations first
Cities in `data/destinations.json` that have no file in `data/city-guides/` (ignoring `_evidence/`) are first priority. Sort by hotel count descending.

### Phase B — Expand to new European cities (50,000+ inhabitants)
When all current destinations are covered, OR as a concurrent expansion:

1. Identify European cities with population ≥ 50,000 NOT yet in `data/destinations.json`.
2. Prioritise: (a) highest tourism demand + pet-travel search volume, (b) countries already represented on the platform, (c) cities with abundant EN/FR/ES pet-travel web content.
3. For each new city added:
   - Append to `data/destinations.json`:
     ```json
     {
       "slug": "city-slug",
       "name": "City Name",
       "country": "Country",
       "countryCode": "XX",
       "region": "Region",
       "lat": 00.0000,
       "lng": 00.0000
     }
     ```
   - Then create the full city guide at `data/city-guides/{slug}.json`.

### Prioritisation within session
1. Hotel count on platform (descending).
2. Capital > major tourist city > secondary city.
3. Research feasibility (abundant EN/FR/ES pet-travel web content).
4. Country diversity — don't do 5 French cities in one run.

### Quota
- 3 cities: any are high-complexity (sparse sources, unusual pet laws).
- Up to 8: all Tier-1 Western EU cities with abundant sources.
- **Fewer done well > more done sloppily.**

### Selection report (print before starting research)
```
SELECTED TODAY:
1. {city} — {country} — {N} hotels on platform — reason
...
SKIPPED:
- {city}: guide exists from {date} (< 30 days)
```

---

## 5. RESEARCH PROTOCOL

### 5.1 Source hierarchy

**Tier 1 — Authoritative** (cite first, always prefer)
- Official municipal/transport operator websites (`tfl.gov.uk`, `ratp.fr`, `bvg.de`)
- Official government pet-import pages (EU TRACES, UK GOV, APHIS USDA)
- The establishment's own website or verified official social media

**Tier 2 — Curated editorial** (good for discovery, verify key claims via Tier 1)
- `bringfido.com`, `timeout.com`, `theinfatuation.com`, `tripadvisor.com` (recent reviews only)
- National kennel clubs, major veterinary associations
- Established travel publications (Condé Nast, Lonely Planet, The Guardian)

**Tier 3 — User-generated** (leads only, never sole source)
- Reddit, expat forums, Google Maps reviews

**Never use:** content farms, AI travel blogs with no byline, Pinterest, posts >3 years old with no update date.

### 5.2 Minimum search queries per section

Run ≥2 distinct queries per section. Vary phrasing — the first results are often the same aggregators.

**Restaurants**
- `pet friendly restaurants {city} site:timeout.com OR site:bringfido.com`
- `dog friendly cafe {city} {year}`
- `"dogs welcome" OR "hunden willkommen" restaurant {city}`
- `chiens bienvenus restaurant {city}` / `admiten perros restaurante {city}`

**Parks**
- `best dog parks {city} off leash`
- `{city} hundezone` / `kutyafuttató` / `zone canine chien`
- `{city} dog walks trails bringfido`
- `{park_name} dogs allowed rules {year}`

**Transport**
- `{operator} dogs policy site:{operator_domain}`
- `can I take my dog on {city} metro bus tram {year}`
- `{country} train dog ticket price rules`

**Beaches / water**
- `dog beach {city} {year} allowed`
- `"dogs allowed" beach {region} seasonal hours`
- `{city} lake river swimming dogs off leash`

**Vets** (highest stakes — run 3 queries minimum)
- `24 hour emergency vet {city}`
- `{city} animal hospital out of hours {year}`
- `urgences vétérinaires {city} 24h` / `Tiernotfallklinik {city}` / `urgencias veterinarias {city}`
- Then **visit each candidate clinic's own website** and confirm: name, phone, actual 24/7 status, walk-in policy.

**Attractions & pet-sitting**
- `{city} dog friendly museum attraction {year}`
- `pet sitter {city} rover pawshake licensed`

### 5.3 Per-place 8-point verification

Run for EVERY place. No batch-skimming.

1. **Existence** — on Google Maps, NOT flagged "Permanently closed".
2. **Address** — confirmed on establishment's own site AND Google Maps.
3. **Phone** (vets only) — identical on ≥2 sources; clinic's own site takes priority.
4. **Pet policy** — confirmed by ≥2 independent sources OR venue's own site within 12 months.
5. **Freshness** — sources ≤24 months old (≤12 months for vets).
6. **Ownership stability** — no cluster of 1-star reviews mentioning "new management" in last 3 months.
7. **Operating status** — currently open on normal schedule.
8. **Name spelling** — exact casing, accents, punctuation. "Café de Flore" not "Cafe de Flore".

If any point fails → find another place.

### 5.4 Category-specific traps

**Restaurants**
- Terrace vs interior: always specify. Terrace-only = unusable in winter.
- Breed/size restrictions: capture in `petPolicy`.
- Ownership flip: last 3 months of reviews = ground truth.

**Vets (CRITICAL)**
- "Emergency" ≠ 24/7. Read hours on clinic's own site word by word.
- Phone drift: aggregators cache old numbers. Clinic's own site only.
- Note English-speaking ability if country is non-anglophone.

**Beaches / parks**
- Seasonal rules REQUIRED for every beach. "Dogs allowed" without date/time qualifier is incomplete.
- Name the specific off-leash zone within the park, not just the park.

**Transport**
- Per operator, per line, per time-of-day. Don't generalise across a city network.
- Muzzle requirements (Germany, Italy, Portugal, Spain).
- Carrier size limits: cite the actual max dimensions.

**Country entry requirements**
- EU vs UK vs non-EU: post-Brexit UK diverges from EU. Never mix.
- Rabies titer test timing: some countries require test months before entry. Link official government page.
- Breed restrictions: UK, Ireland, France, Singapore, UAE each have lists. Always flag.

---

## 6. CONTENT STANDARDS

### 6.1 Tone
- Confident, practical, warm. Like a friend who is a travel editor and has a dog.
- No filler: cut "nestled in the heart of", "vibrant city", "paradise for dog lovers".
- Concrete detail > adjectives. "Cobblestone streets can injure older dogs' paw pads after 2km" > "beautiful charming streets".
- Active voice, present tense.

### 6.2 `introEn` / `introFr` / `introEs` (3–5 sentences each)
Must include: (1) what makes this city distinctive for pet travel, (2) one concrete pet-infrastructure fact, (3) one honest caveat or local nuance, (4) best season or neighbourhood if relevant.

Anti-patterns: "Welcome to {City}!", "{City} is a dream destination for you and your furry friend", anything applicable to any city.

Translations are not word-for-word: translate the meaning. FR: use locally natural idioms ("en liberté" > "off-leash"). ES: opening ¿ ¡. FR: non-breaking space before `:;!?`.

### 6.3 Tips (tipsEn / tipsFr / tipsEs)
Each tip must fail the "could this appear in any guide?" test.
- ❌ "Always carry water for your dog."
- ✅ "Water fountains with low dog bowls are installed along the {River} quai and in {Park} — critical in summer when {City} regularly hits 35°C."

Minimum 3 tips per section. All three languages required.

### 6.4 FAQs (faqsEn / faqsFr / faqsEs)
City-specific answers only. "Yes, dogs are welcome in most parks" is a fail. Name the parks, name the rules, name the exceptions.

Minimum 3 FAQ entries per section.

### 6.5 SEO keywords (place naturally, never stuffed)
| Section | EN target | FR target | ES target |
|---|---|---|---|
| restaurants | `pet friendly restaurants {city}` | `restaurants chiens {city}` | `restaurantes perros {city}` |
| parks | `dog park {city}` / `off leash {city}` | `parc chiens {city}` | `parque perros {city}` |
| transport | `dog on {city} metro` | `chien dans le métro {city}` | `perro en metro {city}` |
| beaches | `dog beach near {city}` | `plage chiens {city}` | `playa perros {city}` |
| vets | `emergency vet {city}` | `vétérinaire urgence {city}` | `veterinario urgencias {city}` |

---

## 7. EVIDENCE LOG (mandatory — guide does not ship without it)

Write `data/city-guides/_evidence/{slug}.md` for every city:

```markdown
# Evidence log — {City} — {YYYY-MM-DD}

## Restaurants

### {Restaurant name}
- Claim: pet-friendly, terrace only
- Source 1 (Tier 2): https://timeout.com/... — "dogs welcome on terrace" — retrieved {date}
- Source 2 (Tier 1): https://restaurant-own-site.com/faq — retrieved {date}
- Google Maps: Open, last review {date}, no ownership-flip signals
- Risk: MEDIUM — 2 concordant sources ✅

## Vets

### {Clinic name}
- Claim: 24/7 emergency, phone +XX XXX XXX
- Source 1 (Tier 1): https://clinic-own-site.com/contact — "24 hours, 365 days" — retrieved {date}
- Source 2 (Tier 1): Google Maps listing — same number — retrieved {date}
- Hours: explicit "24h" on own site ✅
- Risk: CRITICAL — 2 Tier-1 sources ✅

## Transport — {Operator}
- Claim: small dogs free in carrier, large dogs muzzle + child ticket
- Source: https://operator.gov/pets — retrieved {date}
- Risk: HIGH — 1 Tier-1 operator source ✅

## Country Entry — {Country}
- Claim: EU pet passport + microchip + rabies >21 days
- Source: https://gov.{country}/pet-travel — retrieved {date}
- Risk: CRITICAL — 1 official government source ✅

## Conflicts resolved
(list any, with resolution reasoning)
```

---

## 8. VALIDATION

```bash
# JSON validity
python3 -m json.tool data/city-guides/{slug}.json > /dev/null && echo "JSON OK"

# Schema parity with amsterdam.json
python3 -c "
import json
with open('data/city-guides/{slug}.json') as f: d = json.load(f)
with open('data/city-guides/amsterdam.json') as f: ref = json.load(f)
missing_sections = set(ref['guides'].keys()) - set(d['guides'].keys())
extra_sections = set(d['guides'].keys()) - set(ref['guides'].keys())
if missing_sections: print('MISSING SECTIONS:', missing_sections)
if extra_sections: print('EXTRA SECTIONS:', extra_sections)
if not missing_sections and not extra_sections: print('SCHEMA OK')
"

# Placeholder check
grep -iE "todo|tbd|lorem|example\.com|xxx|\?\?\?" data/city-guides/{slug}.json && echo "PLACEHOLDER FAIL" || echo "PLACEHOLDER OK"

# Minimum counts (non-coming-soon sections)
python3 -c "
import json
with open('data/city-guides/{slug}.json') as f: d = json.load(f)
for sec, content in d['guides'].items():
    places = content.get('places', [])
    tips = content.get('tipsEn', [])
    faqs = content.get('faqsEn', [])
    print(f'{sec}: {len(places)} places, {len(tips)} tips, {len(faqs)} FAQs')
"

# TypeScript
npx tsc --noEmit
```

---

## 9. DEPLOYMENT

```bash
git add data/city-guides/ data/destinations.json
git diff --cached --stat

git commit -m "feat: city guides for {city1}, {city2}, ...

- {city1}: {N}/8 sections complete, {N} coming-soon
- {city2}: ...

Research-based, trilingual (EN/FR/ES).
Sources: Tier-1 operators, bringfido, timeout, verified clinic websites.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

git push
```

**If push fails (non-fast-forward, auth error): STOP. Report. Do not --force.**

---

## 10. ANTI-HALLUCINATION PROTOCOL

Before writing any place entry, confirm all four:

1. **Can I name my source?** (URL, not "a travel blog")
2. **Is the source current?** (≤24 months, ideally ≤12)
3. **Does the source explicitly say dogs/pets are welcome?** (not inferred from vibes)
4. **Have I copied name and address exactly, character for character?**

Red flag phrases from search results — verify harder before trusting:
- "known to be dog-friendly" (by whom?)
- "reportedly allows pets" (reported where, when?)
- "welcomes well-behaved dogs" (no date, no author)

**Degrade gracefully.** 4 complete sections + 4 coming-soon > 8 sections with fabricated content.

---

## 11. FINAL REPORT

```
=== DAILY CITY GUIDES — {YYYY-MM-DD} ===

Cities completed: {N}
  - {city}: {N}/8 sections complete, {N} coming-soon
  - ...

Places added: {N} restaurants, {N} parks, {N} vets, {N} beaches, {N} attractions, {N} pet-sitters
Sources: {N} Tier-1, {N} Tier-2
Languages: EN/FR/ES complete for all

FACT-CHECK SUMMARY
  CRITICAL claims: {N} — all with ≥2 Tier-1 sources: YES/NO
  Tripwires fired: {N} (list)
  Dead-link check: {N}/{N} live
  Evidence logs written: YES/NO

Commit: {short-sha}
Pushed: YES/NO

Flags for human review:
  - {any CRITICAL claim where evidence was marginal}
  - {any section marked coming-soon and why}
  - {any source older than 12 months that could not be replaced}
```
