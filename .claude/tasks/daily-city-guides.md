# Daily City Guide Generator — HotelsWithPets.com

## Mission
Generate deeply-researched, SEO-optimised pet travel guides for European cities.
Each city gets 6 guide pages (restaurants, parks, transport, beaches, vets, tips).
Target: 1–10 cities per day. All 3 locales (EN/FR/ES) generated simultaneously.

## Project location
`/Users/jean-baptistemanson/Desktop/CLAUDE NEW SESSION/hotelswithpets`

## STEP 1 — Pick cities to process today

Read `data/destinations.json` to get all 43 destination slugs.
Read the `data/city-guides/` directory to see which slugs already have a JSON file.
**Prioritise cities with the most hotels** (cross-reference `data/hotels.json` by `destinationSlug`).
Pick between 3 and 8 cities that don't yet have a guide file (or whose `lastUpdated` is older than 30 days).

If all cities are done, re-process the 3 oldest `lastUpdated` files to refresh their content.

Output a simple list: "Processing today: paris, berlin, barcelona"

---

## STEP 2 — For each city, do deep web research

For each city slug, find its `name`, `country`, and `flag` from `data/destinations.json`.

**Search the web for EACH of the 6 guide sections.** Use specific, targeted search queries:

### 2a. Restaurants
Search queries to run:
- `"pet-friendly restaurants {city}" site:timeout.com OR site:thinfatcat.com OR site:bringfido.com`
- `"dog friendly cafe {city}" OR "dogs allowed restaurant {city}"`
- `"chiens bienvenus restaurant {city}"` (for French sources)
- `"{city} hunde willkommen restaurant"` (German sources for German/Austrian/Swiss cities)

Extract for each place found:
- Name (exact)
- Address / neighborhood
- Pet policy (exact wording from source)
- Price range (€, €€, €€€, €€€€)
- Must-try dish or drink
- Opening hours
- Google Maps search URL

**Find minimum 4, ideally 6 restaurants. Prefer places you can confirm from 2+ sources.**

### 2b. Parks & Walks
Search queries:
- `"dog park {city}" OR "off-leash {city}" OR "{city} dog walking"`
- `"parcs chiens {city}"` / `"Hundeparks {city}"`
- `"{city} best dog walk" site:bringfido.com OR site:dogfriendly.co.uk`
- Local tourism site for the city (e.g. iamsterdam.com, parisinfo.com)

Extract for each park:
- Name, size/area if available
- Off-leash allowed? (yes/no, and where exactly)
- Best features for dogs
- Transport access
- Swimming spots if any

**Find minimum 4 parks/walks.**

### 2c. Transport
Search queries:
- `"{city} public transport dogs rules" OR "{city} metro dogs allowed"`
- `"{city} train pets policy"` — check national rail operator website
- `"{city} taxi dogs"` OR `"{city} pet taxi"`
- `"{city} airport pets"` — check airport website

For each transport mode (metro/tram, bus, train, taxi, bicycle, airport):
- Exact policy (free? ticket needed? carrier required?)
- Size/weight limits
- Cost
- Practical tip

### 2d. Beaches (or Lakes/Rivers for inland cities)
Check if city is coastal (within 50km of sea) or inland.
- Coastal: search `"dog beach near {city}"` OR `"{city} dog beach"` OR `"plage chien {city}"`
- Inland: search `"{city} dog swimming lake"` OR `"lac baignade chien {city}"`

Extract:
- Distance from city
- Season/rules (dogs allowed when?)
- Off-leash areas
- Facilities

**For inland cities (Paris, Berlin, Prague, Vienna etc): pivot to river banks, lakes, forest pools.**

### 2e. Vets & Emergency Care
Search queries:
- `"emergency vet {city}" OR "24h vet {city}"`
- `"vétérinaire urgence {city}"` / `"Tierarzt Notfall {city}"`
- `"{city} animal hospital 24 hours"`
- Check national pet travel requirements (EU TRACES system, NVWA, etc.)

Extract for each vet clinic:
- Name, address, phone
- Opening hours (24h? weekdays only?)
- English-speaking? (important for tourists)
- Type (general, emergency, specialist)

**Always include: pet entry requirements for the country (EU passport rules, non-EU rules).**

### 2f. Local Tips & Culture
Search queries:
- `"traveling with dog in {city}" site:reddit.com` (real traveller insights)
- `"dog friendly {city} tips" OR "{city} with dog guide"`
- `"{city} dog laws leash rules"`
- `"best time visit {city} with dog"`
- Check local city tourism site

Extract:
- Leash laws and fines
- Cultural attitude toward dogs (relaxed? strict?)
- Best seasons to visit with a pet
- Must-do activity with a dog
- Practical packing tips

---

## STEP 3 — Structure the data into JSON

For each city, create `data/city-guides/{slug}.json` following this EXACT schema:

```json
{
  "slug": "paris",
  "name": "Paris",
  "country": "France",
  "flag": "🇫🇷",
  "lastUpdated": "YYYY-MM-DD",
  "guides": {
    "restaurants": {
      "titleEn": "Pet-Friendly Restaurants in Paris",
      "titleFr": "Restaurants acceptant les animaux à Paris",
      "titleEs": "Restaurantes con mascotas en París",
      "introEn": "[3-4 sentences. City-specific, factual, includes local culture context. Mention best neighborhoods.]",
      "introFr": "[Same intro in French — natural, not a translation, adapted for French speakers.]",
      "introEs": "[Same intro in Spanish.]",
      "places": [
        {
          "name": "Exact restaurant name",
          "address": "Street address",
          "neighborhood": "District/neighborhood name",
          "description": "2-3 sentences. What makes it great for pet owners? Atmosphere, terrace, dog bowl, breed restrictions?",
          "petPolicy": "Exact policy: dogs welcome inside/outside, on-leash required, etc.",
          "priceRange": "€ / €€ / €€€ / €€€€",
          "mustTry": "Signature dish or drink",
          "openingHours": "Mon–Sun HH:MM–HH:MM",
          "googleMapsUrl": "https://maps.google.com/?q=Restaurant+Name+City"
        }
      ],
      "tipsEn": ["Tip 1 (city-specific, actionable)", "Tip 2", "Tip 3", "Tip 4"],
      "tipsFr": ["Conseil 1", "Conseil 2", "Conseil 3", "Conseil 4"],
      "tipsEs": ["Consejo 1", "Consejo 2", "Consejo 3", "Consejo 4"],
      "faqsEn": [
        {
          "q": "Are dogs allowed in [City] restaurants?",
          "a": "City-specific answer with real rules and neighborhoods mentioned."
        },
        {
          "q": "Second common question about this topic in [City]?",
          "a": "Detailed answer."
        },
        {
          "q": "Third question.",
          "a": "Answer."
        }
      ]
    },
    "parks": {
      "titleEn": "Dog Parks & Walks in [City]",
      "titleFr": "Parcs et balades avec son chien à [City]",
      "titleEs": "Parques y paseos con perros en [City]",
      "introEn": "...",
      "introFr": "...",
      "introEs": "...",
      "places": [
        {
          "name": "Park name",
          "type": "Urban park / Forest / Nature reserve / etc.",
          "size": "X hectares (if known)",
          "description": "What makes it great for dogs. Swimming? Off-leash? Trails?",
          "offLeash": true,
          "offLeashArea": "Specific zone description",
          "tip": "Practical tip for visiting with a dog",
          "googleMapsUrl": "https://maps.google.com/?q=Park+Name+City"
        }
      ],
      "tipsEn": ["...", "...", "..."],
      "tipsFr": ["...", "...", "..."],
      "tipsEs": ["...", "...", "..."],
      "faqsEn": [{"q": "...", "a": "..."}, {"q": "...", "a": "..."}]
    },
    "transport": {
      "titleEn": "Travelling with Pets in [City]",
      "titleFr": "Voyager avec son animal à [City]",
      "titleEs": "Viajar con mascotas en [City]",
      "introEn": "...",
      "introFr": "...",
      "introEs": "...",
      "rules": [
        {
          "mode": "Metro / Tram / Bus",
          "policy": "Exact rule: free/paid, carrier required, restrictions.",
          "tip": "Practical advice."
        },
        {
          "mode": "Intercity Train",
          "policy": "...",
          "tip": "..."
        },
        {
          "mode": "Taxi / Uber",
          "policy": "...",
          "tip": "..."
        },
        {
          "mode": "Airport",
          "policy": "...",
          "tip": "..."
        }
      ],
      "faqsEn": [{"q": "...", "a": "..."}, {"q": "...", "a": "..."}]
    },
    "beaches": {
      "titleEn": "Dog-Friendly Beaches near [City]",
      "titleFr": "Plages/lacs accessibles aux chiens près de [City]",
      "titleEs": "Playas/lagos para perros cerca de [City]",
      "introEn": "...",
      "introFr": "...",
      "introEs": "...",
      "places": [
        {
          "name": "Beach/lake name",
          "distance": "X min by train/car from city centre",
          "description": "...",
          "season": "Year-round / May–Sept / etc.",
          "rules": "Dog rules: when allowed, on-leash or off-leash, designated area",
          "facilities": "Parking, cafés, dog wash station, etc.",
          "googleMapsUrl": "https://maps.google.com/?q=Beach+Name"
        }
      ],
      "faqsEn": [{"q": "...", "a": "..."}, {"q": "...", "a": "..."}]
    },
    "vets": {
      "titleEn": "Vets & Emergency Animal Care in [City]",
      "titleFr": "Vétérinaires et urgences animales à [City]",
      "titleEs": "Veterinarios y urgencias para animales en [City]",
      "introEn": "...",
      "introFr": "...",
      "introEs": "...",
      "entryRequirements": {
        "euPets": "Exact EU pet entry requirements for this country.",
        "nonEuPets": "Requirements for UK, US, Australian pets etc.",
        "emergencyContacts": ["National emergency animal line: +XX XX XXXX XXXX", "City animal welfare: +XX XX XXXX XXXX"]
      },
      "places": [
        {
          "name": "Clinic name",
          "type": "General / Emergency / Specialist",
          "address": "Full address",
          "phone": "+XX XX XXXX XXXX",
          "hours": "24/7 or Mon–Fri HH:MM–HH:MM",
          "englishSpeaking": true,
          "description": "What they handle, reputation, distances.",
          "googleMapsUrl": "https://maps.google.com/?q=Vet+Name+City"
        }
      ],
      "faqsEn": [{"q": "...", "a": "..."}, {"q": "...", "a": "..."}]
    },
    "tips": {
      "titleEn": "Dog-Friendly Tips for [City]",
      "titleFr": "Conseils locaux pour visiter [City] avec son chien",
      "titleEs": "Consejos locales para visitar [City] con tu perro",
      "introEn": "...",
      "introFr": "...",
      "introEs": "...",
      "sections": [
        {
          "titleEn": "Dog Rules & Law",
          "titleFr": "Règles et lois",
          "titleEs": "Normas y leyes",
          "contentEn": "Exact leash laws, fines, restricted areas. Country-specific rules.",
          "contentFr": "...",
          "contentEs": "..."
        },
        {
          "titleEn": "Dog-Friendly Culture",
          "titleFr": "Culture locale",
          "titleEs": "Cultura local",
          "contentEn": "How locals view dogs. Are they welcome in shops? Offices? Markets? What neighbourhoods are most dog-friendly?",
          "contentFr": "...",
          "contentEs": "..."
        },
        {
          "titleEn": "Best Seasons",
          "titleFr": "Meilleures saisons",
          "titleEs": "Mejores temporadas",
          "contentEn": "When to visit with a dog. Crowds, heat, rain. Month-by-month advice.",
          "contentFr": "...",
          "contentEs": "..."
        },
        {
          "titleEn": "Must-Do with Your Dog",
          "titleFr": "L'incontournable avec son chien",
          "titleEs": "Lo imprescindible con tu perro",
          "contentEn": "The single best dog-specific experience in this city. Be specific — name places, routes, times.",
          "contentFr": "...",
          "contentEs": "..."
        }
      ],
      "faqsEn": [
        {"q": "Is [City] good for dogs?", "a": "City-specific, honest answer. What's great, what's not."},
        {"q": "What should I pack for [City] with my dog?", "a": "City-specific packing list."},
        {"q": "Are dogs allowed in [City] museums/monuments?", "a": "Specific answer for this city."}
      ]
    }
  }
}
```

**Quality rules for the JSON:**
- Every `introEn` must be 3–5 sentences, city-specific, not generic
- Every `introFr` and `introEs` must be natural in that language (not literal translations — adapt idioms, references)
- Every place must have a real name and address (no invented places)
- Every FAQ answer must be 2–4 sentences with specific, actionable information
- Every tip must be practical and city-specific (not "bring water for your dog" — that's generic)
- Phone numbers must be in international format with country code
- If you cannot confirm a specific detail (e.g., exact pet fee on a train), say so honestly in the policy text

---

## STEP 4 — Write the JSON file

Save the complete JSON to:
`data/city-guides/{slug}.json`

Validate the JSON is syntactically correct (run `python3 -m json.tool data/city-guides/{slug}.json` to check).

---

## STEP 5 — Update sitemap

The sitemap at `app/sitemap.ts` must include the new guide pages.
Read the current sitemap file. Check if it already handles `data/city-guides/` dynamically.
If not, add this block inside the sitemap function:

```typescript
// City guide sub-pages — 6 sections per city
const guideDir = join(process.cwd(), 'data/city-guides')
if (existsSync(guideDir)) {
  const guideSlugs = readdirSync(guideDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
  
  for (const citySlug of guideSlugs) {
    for (const section of ['restaurants', 'parks', 'transport', 'beaches', 'vets', 'tips']) {
      for (const locale of LOCALES) {
        entries.push({
          url: `${BASE_URL}/${locale}/destinations/${citySlug}/${section}`,
          lastModified: BUILD_DATE,
          changeFrequency: 'monthly' as const,
          priority: 0.75,
        })
      }
    }
  }
}
```

---

## STEP 6 — TypeScript check

Run: `npx tsc --noEmit`
Fix any errors before proceeding.

---

## STEP 7 — Commit & Push

```bash
git add data/city-guides/ app/sitemap.ts
git commit -m "feat: add city guides for {list of cities processed today}

- {city1}: restaurants, parks, transport, beaches, vets, tips
- {city2}: ...
Each guide researched from web sources, 3 locales (EN/FR/ES)
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push
```

---

## Quality checklist before committing

For each city guide, verify:
- [ ] JSON is valid (no syntax errors)
- [ ] At least 4 places per section that has places
- [ ] All 6 sections present
- [ ] FR and ES intros are natural (not machine-translated)
- [ ] FAQ answers are specific to the city, not generic
- [ ] Phone numbers include country code
- [ ] No invented/hallucinated place names — all confirmed from web search
- [ ] `lastUpdated` is today's date

---

## SEO targets per guide page

These are the keyword patterns each guide page should rank for:

| Guide | Primary keyword | Secondary keywords |
|---|---|---|
| restaurants | "pet friendly restaurants {city}" | "dog friendly cafe {city}", "restaurants chiens {city}" |
| parks | "dog park {city}" | "off leash {city}", "best walk with dog {city}" |
| transport | "travelling with dog {city}" | "can I take my dog on metro {city}", "dog train {city}" |
| beaches | "dog beach near {city}" | "where can dogs swim {city}" |
| vets | "emergency vet {city}" | "24 hour vet {city}", "veterinaire urgence {city}" |
| tips | "dog friendly {city} guide" | "visiting {city} with a dog", "{city} with dog tips" |

Each page title, H1, intro, and FAQ answers should naturally include these phrases.

---

## Internal linking to inject

At the bottom of each guide page, link to:
1. The city's main hotel page: `/{locale}/destinations/{slug}`
2. Relevant category combo page: `/{locale}/{slug}/dog-friendly`
3. 2–3 sibling guide sections for this city

This creates a tight internal link mesh that passes PageRank between all city pages.

---

## Notes
- NEVER invent a restaurant or park name. If you can't find enough confirmed places, say "Guide coming soon" in the intro and skip the places array
- For beach sections of clearly inland cities (Prague, Vienna, Warsaw, Budapest): pivot to "rivers & lakes" — Danube, Vltava, Wisła, etc.
- Seasonal beach restrictions vary significantly — always check the local municipality rules for the current year
- Emergency vet phone numbers MUST be verified — wrong phone numbers are dangerous
- The `lmaID` for Stay22 is `69e08b99d5ab79f03e163885`, the AID is `eijeanbaptistemanson` — do NOT modify these
