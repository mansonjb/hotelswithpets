# Redesign "On part ensemble" : TODO (branche feat/redesign)

Regles: restylage visuel uniquement (jamais contenu, data, routes, metadata, hreflang). Zero tiret cadratin.
git add avec chemins explicites. Pas de deploy, pas de merge vers main, pas de force push.
Un seul deploy final quand tout le site est refait et teste.

## Fait (Phase 0 + Phase 1)
- [x] Tokens: variables CSS + theme Tailwind v4 dans app/globals.css (electric, ink, night, lime, coral, lavender, lavender-soft, cream, slate, line, shadow-hard, font-display/sans/mono)
- [x] Polices auto-hebergees dans public/fonts: Clash Display 500/600/700, General Sans 400/500/600 (Fontshare), Space Mono 400/700 (Google, latin). Inter retire du layout.
- [x] Composants partages dans components/ui: Button, Eyebrow, Section, Card, Badge, Chip, Pagination, SearchBar (+SearchField), HotelCard, PawLogo
- [x] Header (logo patte, nav, bouton Contact en pill sombre, switch langue mono) et Footer (fond presque noir, accents lime)
- [x] Home: Hero, bandeaux planner/hiver, CategoryGrid, HowItWorks, TopHotels, DestinationsGrid, FeaturedCombos, PetTravelTips, HomeSeoContent, HomeFaq, PopularSearches (via script de remapping de classes + retouches)
- [x] 7 pages assurance (pet-insurance, assurance-animaux, seguro-mascotas, seguro-animais, tierkrankenversicherung, dierenverzekering, assicurazione-animali)

## Fait (Phase 2-3, run automatique)
- [x] Phase 2a: template ville (destinations/[slug]), fiche hotel (hotels/[slug]), HotelCard, HotelRankedCard, NearbyHotelCard, DestinationCard, TopHotelsStrip, StickyHotelCTA, RelatedDestinations (commit 9fbb99a)
- [x] Phase 2b/3: [destination]/[category], destinations (liste + [guide]), categories (+[slug]), countries (+[slug]), about, contact, privacy, mentions-affiliees, affiliate-disclosure, not-found/error/loading, ContactCTA/ContactForm/SisterSites/AmazonProductCard, guides/** (sauf 1, voir plus bas), accessoires-*, dog-parks, dog-friendly-villas, hoteles-pet-friendly
- [x] Outils: scripts/restyle-map.mjs (remap de classes), lib/brandTone.ts (degrades pilotes par la donnee -> aplats de palette)

## Reste a faire (mis a jour)
Fait (run polish 2026-11-13):
- [x] guides/where-to-go-uk-school-holidays-2027: rendu restyle a la main (tokens + aplats lavande/lime/corail/electric), plus de gradient
- [x] Gradients restants remplaces par aplats: CTA inline orange->bleu (guides, villas, TopHotelsStrip, StickyHotelCTA) en electric, heros Paris en night, overlays radiaux decoratifs supprimes. Gardes volontairement: scrims noir->transparent sur photos (lisibilite), fade blanc du StickyHotelCTA, images OG (opengraph-image.tsx), tuiles deja en aplats via lib/brandTone
- [x] Preload polices (Clash 600/700, General Sans 400/500) dans app/[locale]/layout.tsx
- [x] Coherence contraste: TopHotels badge lime en encre; classes cassees par le remap corrigees (bg-lime/300/20, hover:bg-lime/30/60); text-orange-50/100 -> lavande
- [x] CTA assureurs (7 pages assurance): couleur de marque INTENTIONNELLEMENT laissee telle quelle

Reste pour la QA visuelle finale (proprietaire):
- [ ] Contraste fin 4.5:1 en navigateur (texte sur lime/lavande, heros night, tuiles electric/night/ink)
- [ ] Mobile 375px (guide vacances UK 2027, tuiles, tables assurance)
- [ ] Verification des 7 locales en navigateur (next start + curl, lesson 2026-08-28); images Stay22/carte
- [ ] Verifier le preload police dans l'onglet Network (pas de warning "preloaded but not used") et le CLS
- [ ] Composants racine non migres vers components/ui (HotelCard racine restyle seulement)
- [ ] Space Mono latin-ext absent; remplacement eventuel par une mono Fontshare
- [ ] Puis UN seul deploy

## Reste a faire (ancien)
### Phase 2
- [ ] Template ville/destination (app/[locale]/destinations/[slug] + [guide]) et pages [destination]/[category]
- [ ] Fiche hotel (app/[locale]/hotels/...)
- [ ] Pages categorie (categories, categories/[slug]), countries, destinations (listing)
- [ ] Migrer components/HotelCard.tsx, HotelRankedCard.tsx, NearbyHotelCard.tsx, DestinationCard.tsx, TopHotelsStrip.tsx, StickyHotelCTA.tsx, RelatedDestinations.tsx vers components/ui (ou les restyler)
### Phase 3
- [ ] Guides (app/[locale]/guides/**), accessoires-*, dog-parks, dog-friendly-villas, hoteles-pet-friendly
- [ ] about, contact, privacy, affiliate-disclosure, mentions-affiliees, not-found, error, loading
- [ ] Composants racine: ContactCTA, ContactForm, SisterSites, AmazonProductCard, BrandLogo
### Transverse
- [ ] Les pages non migrees gardent des utilitaires Tailwind par defaut (gray/blue...) : coherents mais pas encore au nouveau look. Eventuellement passer par scripts/restyle (mapping de classes) comme pour Home.
- [ ] Assurance: les boutons CTA gardent la couleur de marque de chaque assureur (style inline) : a harmoniser (lime/encre)?
- [ ] Tuiles categories/destinations Home: gradients remplaces par aplats (data/categories.json non touche)
- [ ] Audit contraste 4.5:1 sur toutes les pages migrees, test mobile 375px, verification des 7 locales
- [ ] Space Mono: seul le sous-ensemble latin est charge (pas latin-ext). Les labels mono avec accents rares tombent sur monospace systeme.
- [ ] Preload des polices (next/font/local ou <link rel=preload>) pour limiter le CLS
- [ ] Remplacer Space Mono si on prefere une mono Fontshare
- [ ] QA finale (next start + curl, lesson 2026-08-28), puis UN deploy
