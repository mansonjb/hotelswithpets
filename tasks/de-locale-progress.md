# German (de) locale: progress + resume playbook

Branch: `feat/de-locale` (NOT pushed, no Vercel deploy). Base: main @ b0d84b38.
Last commit: 82a94002. Verify build: `npm run build` (exit 0), then
`npx next start -p 4517` and hit `http://localhost:4517/de`.

## Architecture (how de is wired)
- `Locale` derives from the `dictionaries` object in `app/[locale]/dictionaries.ts`.
  Adding `de:` there made `Locale`, `locales`, `hasLocale`, hreflang and sitemap
  pick it up. Everything else is either a `Record<Locale>` (tsc forces the key) or
  a hardcoded locale array (grep-and-sync).
- Safety net = EN fallback everywhere de is missing, so build stays green and
  native translation is purely additive. Patterns used:
  - `COPY[locale] ?? COPY.en` (codemod ran on app/ pages).
  - `Record<Locale, X>` widened to `Record<string, X>` in home components so a
    missing de key is legal; access falls back to `.en`.
  - editorial.ts and cityContent.ts ALREADY fall back to en for any non-fr/es/pt
    locale (`... ?? ['en']`, and `const lang = ... : 'en'`). So de renders English
    there today; adding `de:` blocks activates automatically. NO code change needed.

## DONE (native German, Sie form, haustierfreundlich/hundefreundlich)
- [x] Wiring: dictionaries.ts, middleware.ts (the 307 fix), sitemap.ts,
      page.tsx + about JSON-LD inLanguage/knowsLanguage, PetMap/Stay22Map lang,
      Header localeLabels (DE switcher), layout.tsx metadata + og:locale de_DE.
- [x] `dictionaries/de.json`: full UI chrome (all pages).
- [x] Home above-the-fold: `app/[locale]/page.tsx` title+description+hreflang,
      `components/home/Hero.tsx` (HEADLINES/REVIEW/TRUST + inline labels + lang
      extended to include de), `data/categories.json` nameDe (chip names).

## TODO native German (priority order) -- each is additive, build stays green
1. **Lower homepage sections** (still EN fallback). Files, each has a COPY /
   per-locale Record needing a `de:` block:
   - components/home/HomeFaq.tsx (FAQ + FAQPage schema)
   - components/home/HomeSeoContent.tsx (COPY + ~12 label maps + CITY_LABELS)
   - components/home/TopHotels.tsx, PetTravelTips.tsx (tips + headings),
     PopularSearches.tsx, CategoryGrid.tsx, DestinationsGrid.tsx, FeaturedCombos.tsx
   - components/layout/Footer.tsx (ternary `locale === 'fr' ? ... : en`, add de branch)
   - app/[locale]/page.tsx month-planner COPY (line ~117). NOTE: also needs German
     month names -- the `lang` var forces en, so month name is English. Do the
     German month array at the same time or the section reads half-German.
2. **categories.json descriptionDe** (8) + wire the nameDe/descriptionDe lookup in
   the OTHER category components (CategoryGrid, category pages) the way Hero does.
3. **editorial.ts**: add `de` blocks to destContextByLocale (per city) +
   catIntrosByLocale/catTipsByLocale/bestSeasonByLocale/testimonialsByLocale
   (per category). Auto-activates via existing EN fallback. Big (per-city).
4. **cityContent.ts**: add de to `desc`/`history`/`petTips`/`practicalInfo`
   (Record<string,...>) per city AND extend the inner accessor in
   `app/[locale]/destinations/[slug]/page.tsx` (~line 600) to include de. Biggest
   surface (~3700 blocks). Do via parallel Sonnet agents, batches of ~19 cities,
   each writing a JSON patch, merge by slug with EN fallback (see
   ref_add_locale_playbook memory). 64K output cap: keep batches small.
5. **Per-page guide COPY** (~43 pages in app/[locale]/guides + paris): each has a
   local COPY with en/fr/es/pt. Add de. Currently EN fallback via `?? COPY.en`.
   Many are France-specific (chien) -- decide which deserve a de version at all.

## Gotchas
- No em-dash anywhere (run `grep -c "—"` as a STANDALONE command).
- data/city-guides/*.json are EN/FR/ES/PT strict JSON (double quotes); cityContent.ts
  is TS (backticks to avoid apostrophe escaping).
- Do NOT add de to sitemap exposure decisions casually: once pushed, de URLs get
  indexed. Keep EN-fallback pages out of the pushed sitemap until content is native
  enough, OR accept English /de indexing. Currently de IS in sitemap.ts (fine on
  branch; revisit before the first push).
- Ports 3020/3099 are taken by other local projects; use a high port (4517).
