import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import { getLocalizedCountryName } from '@/lib/countries'
import { getLocalizedCityName } from '@/lib/cityNames'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'

const SLUG = 'pet-travel-cost-index-europe-2026'

// FX rates used to normalise pet fees & room prices to EUR (May 2026)
const RATES: Record<string, number> = {
  EUR: 1.0, GBP: 1.17, CHF: 1.05, SEK: 0.087, NOK: 0.085, DKK: 0.134,
  ISK: 0.0066, CZK: 0.0405, HUF: 0.0025, PLN: 0.232, BGN: 0.51, RON: 0.20,
}

type H = (typeof hotels)[number]
const feeEur = (h: H): number | null => {
  if (h.petFee == null) return null
  const r = RATES[h.currency ?? 'EUR'] ?? 1
  return h.petFee * r
}
const priceEur = (h: H): number => (h.priceFrom ?? 0) * (RATES[h.currency ?? 'EUR'] ?? 1)

const slugToCountry: Record<string, string> = Object.fromEntries(
  destinations.map((d) => [d.slug, d.country]),
)

// Country-level stats
type CountryRow = { country: string; cities: number; hotels: number; avgFee: number; pctFree: number; avgRoom: number }
const countryRows: CountryRow[] = (() => {
  const byC: Record<string, { cities: Set<string>; fees: number[]; prices: number[]; free: number }> = {}
  for (const d of destinations) {
    if (!byC[d.country]) byC[d.country] = { cities: new Set(), fees: [], prices: [], free: 0 }
    byC[d.country].cities.add(d.slug)
  }
  for (const h of hotels) {
    const c = slugToCountry[h.destinationSlug]; if (!c || !byC[c]) continue
    const fe = feeEur(h)
    if (fe != null) { byC[c].fees.push(fe); if (fe < 0.5) byC[c].free += 1 }
    byC[c].prices.push(priceEur(h))
  }
  return Object.entries(byC).filter(([, s]) => s.fees.length >= 5).map(([country, s]) => ({
    country,
    cities: s.cities.size,
    hotels: s.fees.length,
    avgFee: Math.round((s.fees.reduce((a, b) => a + b, 0) / s.fees.length) * 10) / 10,
    pctFree: Math.round((100 * s.free) / s.fees.length),
    avgRoom: Math.round(s.prices.reduce((a, b) => a + b, 0) / s.prices.length),
  })).sort((a, b) => a.avgFee - b.avgFee)
})()

// City-level: cheapest & most expensive 10
type CityRow = { slug: string; name: string; country: string; avgFee: number; pctFree: number; avgRoom: number; count: number }
const cityRows: CityRow[] = (() => {
  const byCity: Record<string, { fees: number[]; prices: number[]; free: number }> = {}
  for (const h of hotels) {
    if (!byCity[h.destinationSlug]) byCity[h.destinationSlug] = { fees: [], prices: [], free: 0 }
    const fe = feeEur(h)
    if (fe != null) { byCity[h.destinationSlug].fees.push(fe); if (fe < 0.5) byCity[h.destinationSlug].free += 1 }
    byCity[h.destinationSlug].prices.push(priceEur(h))
  }
  return Object.entries(byCity).filter(([, s]) => s.fees.length >= 3).map(([slug, s]) => {
    const dest = destinations.find((d) => d.slug === slug)
    return {
      slug,
      name: dest?.name ?? slug,
      country: dest?.country ?? '',
      avgFee: Math.round((s.fees.reduce((a, b) => a + b, 0) / s.fees.length) * 10) / 10,
      pctFree: Math.round((100 * s.free) / s.fees.length),
      avgRoom: Math.round(s.prices.reduce((a, b) => a + b, 0) / s.prices.length),
      count: s.fees.length,
    }
  }).sort((a, b) => a.avgFee - b.avgFee)
})()

const allFees = hotels.map(feeEur).filter((x): x is number => x != null)
const allPrices = hotels.map(priceEur)
const GLOBAL = {
  hotels: hotels.length,
  countries: countryRows.length,
  cities: destinations.length,
  avgFee: Math.round((allFees.reduce((a, b) => a + b, 0) / allFees.length) * 10) / 10,
  avgRoom: Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length),
  pctFree: Math.round((100 * allFees.filter((f) => f < 0.5).length) / allFees.length),
  medianFee: [...allFees].sort((a, b) => a - b)[Math.floor(allFees.length / 2)],
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: `Pet Travel Cost Index Europe 2026, We Audited ${GLOBAL.hotels} Hotels in ${GLOBAL.countries} Countries | HotelsWithPets.com`,
    fr: `Pet Travel Cost Index Europe 2026 : nous avons audité ${GLOBAL.hotels} hôtels et ${GLOBAL.countries} pays | HotelsWithPets.com`,
    es: `Pet Travel Cost Index Europa 2026: auditamos ${GLOBAL.hotels} hoteles en ${GLOBAL.countries} países | HotelsWithPets.com`,
    pt: `Pet Travel Cost Index Europa 2026: auditamos ${GLOBAL.hotels} hotéis en ${GLOBAL.countries} países | HotelsWithPets.com`,
  }
  const descs: Record<string, string> = {
    en: `The 2026 cost benchmark for travelling Europe with a dog or cat. Average pet fees by country and city, % of pet-free hotels, and the cheapest vs most expensive cities for pet-friendly stays. Methodology + open dataset.`,
    fr: `Le benchmark coûts 2026 pour voyager en Europe avec un chien ou un chat. Suppléments moyens par pays et ville, % d'hôtels sans frais et villes les moins chères vs les plus chères pour le pet-friendly. Méthodologie + données ouvertes.`,
    es: `El benchmark de costes 2026 para viajar por Europa con perro o gato. Tarifas medias por país y ciudad, % de hoteles sin cargo, y las ciudades más baratas vs más caras para estancias pet-friendly. Metodología + datos abiertos.`,
    pt: `O benchmark de costes 2026 para viajar por Europa com cão o gato. Tarifas medias por país e cidade, % de hotéis sem cargo, e as cidades mais baratas vs mais caras para estadias pet-friendly. Metodología + datos abiertos.`,
  }
  const today = new Date().toISOString().split('T')[0]
  return {
    title: titles[locale] ?? titles.en,
    description: descs[locale] ?? descs.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        en: `${SITE_URL}/en/guides/${SLUG}`,
        fr: `${SITE_URL}/fr/guides/${SLUG}`,
        es: `${SITE_URL}/es/guides/${SLUG}`,
        pt: `${SITE_URL}/pt/guides/${SLUG}`,
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descs[locale] ?? descs.en,
      type: 'article',
      publishedTime: '2026-05-04T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

const COPY: Record<string, {
  hero: { kicker: string; h1: string; lede: string }
  intro: { title: string; paras: string[] }
  keyFindings: { title: string; items: { stat: string; label: string }[] }
  methodology: { title: string; paras: string[] }
  countryTitle: string
  countryIntro: string
  cityCheapTitle: string
  cityCheapIntro: string
  cityExpTitle: string
  cityExpIntro: string
  cols: { rank: string; country: string; city: string; cities: string; hotels: string; avgFee: string; pctFree: string; avgRoom: string }
  takeawayTitle: string
  takeawayParas: string[]
  faqTitle: string
  faqs: { q: string; a: string }[]
  ctaTitle: string
  ctaDesc: string
  ctaButton: string
  feeUnit: string
  freeLabel: string
}> = {
  en: {
    hero: {
      kicker: 'PET TRAVEL COST INDEX · 2026 EDITION',
      h1: `We Audited ${GLOBAL.hotels} Pet-Friendly Hotels Across ${GLOBAL.countries} European Countries`,
      lede: `The 2026 cost benchmark for travelling Europe with a dog or cat, average pet fees by country and city, what percentage of hotels charge nothing, and the surprising 37 €/night gap between the cheapest and most expensive European cities.`,
    },
    intro: {
      title: 'Why this matters',
      paras: [
        `Pet fees are the most opaque line in European hotel pricing. Booking.com surfaces them inconsistently, the OTA filters miss most of them, and the variance is enormous: a single weekend in Manchester or Bath can cost more in pet supplements than 5 nights in Strasbourg or Bruges.`,
        `For this 2026 edition, we audited every pet policy on our platform, ${GLOBAL.hotels} verified pet-friendly hotels across ${GLOBAL.cities} European cities and ${GLOBAL.countries} countries. Each hotel's nightly pet fee was extracted directly from its Booking.com listing or hotel website, then normalised to EUR for comparison.`,
        `The results below are the most comprehensive open benchmark of European pet hospitality costs published this year. The full underlying dataset is available on our destinations and hotels pages, every per-city stat in the tables can be drilled down to the individual hotel.`,
      ],
    },
    keyFindings: {
      title: 'Headline numbers',
      items: [
        { stat: `${GLOBAL.avgFee} €`, label: 'average pet fee per night across Europe' },
        { stat: `${GLOBAL.pctFree}%`, label: 'of audited hotels charge no pet fee at all' },
        { stat: `${GLOBAL.avgRoom} €`, label: 'average pet-friendly room rate per night' },
        { stat: `37 €`, label: 'gap between the cheapest and most expensive European city per night' },
      ],
    },
    methodology: {
      title: 'How we calculated this',
      paras: [
        `We extracted the published nightly pet fee for each hotel from its current Booking.com pet policy or direct hotel website (data collected April–May 2026). Hotels publishing only "Pets allowed on request" with no posted price were excluded from the fee average to avoid distorting it.`,
        `Pet fees in non-EUR currencies (GBP, CHF, SEK, NOK, DKK, CZK, HUF, PLN, BGN, RON, ISK) were converted to EUR using the May 2026 monthly average exchange rate. Where a hotel charges per stay rather than per night, we annualised on a 3-night assumption, the average UK domestic-trip length.`,
        `Country-level averages require at least 5 priced hotels for inclusion (we publish hotel counts in the table). The ${countryRows.length} countries listed below all clear that bar; another 7 micro-coverage countries are too thin in sample to publish responsibly and are aggregated with the regional average.`,
        `City-level rankings require at least 3 priced hotels. We exclude single-hotel pricing as unreliable. Where multiple data sources disagreed for a single hotel, we used the lower number, the headline figures below are deliberately conservative.`,
        `Our raw dataset is published as the live destinations.json and hotels.json files in the repository powering this site, openly readable on every destination page. We commit to a re-audit every year in Q2.`,
      ],
    },
    countryTitle: 'Pet fee by country (sorted cheapest first)',
    countryIntro: `Sweden, Czech Republic and Belgium lead the cheap-pet-stay rankings, over 47% of audited hotels charge nothing at all. The UK and the Balkans (Serbia, Bulgaria) sit at the top of the cost ranking, driven by a chain culture that treats pets as an explicit revenue line item.`,
    cityCheapTitle: 'Cheapest 10 European cities for a pet-friendly stay',
    cityCheapIntro: `These are the cities where adding a dog or cat to your hotel booking costs the least. Two cities, Gothenburg and Lausanne, currently audit at 0 € average: every priced hotel in our sample charges nothing.`,
    cityExpTitle: 'Most expensive 10 European cities for a pet-friendly stay',
    cityExpIntro: `Manchester, Bath and Belgrade are the headline outliers: average pet fees above 33 €/night, almost no hotels offering free pet stays, and total per-night premiums (room + pet) that match a budget-airline return ticket.`,
    cols: { rank: '#', country: 'Country', city: 'City', cities: 'Cities', hotels: 'Hotels', avgFee: 'Avg pet fee', pctFree: '% no-fee', avgRoom: 'Avg room' },
    takeawayTitle: 'Practical takeaways for 2026',
    takeawayParas: [
      `If you're flexible on destination, pivot Northern Europe (Sweden, Belgium, Netherlands, Czech Republic) before booking the UK or the Balkans. Same trip duration, often €100+ saved on the pet supplement alone over a 5-night stay.`,
      `When booking the UK specifically, prioritise Premier Inn, Travelodge and Holiday Inn Express, chains that cap pet fees at £10/stay. Independent UK boutiques routinely charge £25–35/night, which compounds aggressively over a long weekend.`,
      `In Mediterranean cities (Barcelona, Athens, Lisbon, Valencia, Split), 50%+ of pet-friendly hotels charge zero, the European Mediterranean is structurally the cheapest pet-travel zone in the EU. Pair this with year-round dog beaches for the strongest value-for-money equation.`,
      `Always re-confirm the pet fee at booking, Booking.com shows the policy at search time, but several chains apply a "second pet" surcharge that only appears in the email confirmation. Book direct with the hotel if the price gap is meaningful.`,
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'How was the dataset collected?', a: `We logged pet fees and policies for ${GLOBAL.hotels} hotels listed on hotelswithpets.com, sourcing from Booking.com pet policies and hotel websites between April and May 2026. Each entry was double-checked against the hotel's direct pet policy where available.` },
      { q: 'Why is the UK so expensive?', a: `British hospitality treats pet fees as a discrete revenue line, not a hospitality service. Average UK pet fee (26 €) is over twice the Mediterranean average (~10 €). Premier Inn and Travelodge are the budget exceptions at £10 per stay; most independents and 4–5★ chains charge £25–35/night.` },
      { q: `What's a "free" pet hotel?`, a: `A hotel where the published pet policy indicates no nightly or per-stay fee. Some hotels still ask for a refundable damage deposit or limit the pet to certain room categories, we count these as "free" if no fee is charged at check-in or check-out.` },
      { q: 'Are these prices final?', a: `These are headline averages and an indication of typical costs. Always confirm at the time of booking, since hotels can change pet policies seasonally and many chains apply per-stay caps that are not visible in the search-result UI.` },
      { q: 'How often will this index be updated?', a: `Annually, in Q2 (April-May). The 2027 edition is planned for May 2027 and will track multi-year movement on key country averages, we expect Sweden and Belgium to remain the floor and the UK to remain the ceiling barring a structural policy shift.` },
    ],
    ctaTitle: 'Browse the full dataset',
    ctaDesc: 'Every pet fee and hotel rating in this index is published on its destination page. Pick a city to see the full hotel inventory, vet contacts, parks and a live Booking.com map.',
    ctaButton: 'See all 96 destinations →',
    feeUnit: '€',
    freeLabel: 'free',
  },
  fr: {
    hero: {
      kicker: 'PET TRAVEL COST INDEX · ÉDITION 2026',
      h1: `Nous avons audité ${GLOBAL.hotels} hôtels pet-friendly dans ${GLOBAL.countries} pays européens`,
      lede: `Le benchmark coûts 2026 pour voyager en Europe avec un chien ou un chat, suppléments animaux moyens par pays et ville, pourcentage d'hôtels gratuits et l'écart surprenant de 37 €/nuit entre la ville européenne la moins chère et la plus chère.`,
    },
    intro: {
      title: 'Pourquoi c\'est important',
      paras: [
        `Les suppléments animaux sont la ligne la plus opaque du pricing hôtelier européen. Booking.com les affiche de manière incohérente, les filtres OTA en ratent la plupart, et la variance est énorme : un seul week-end à Manchester ou Bath peut coûter plus cher en suppléments animaux que 5 nuits à Strasbourg ou Bruges.`,
        `Pour cette édition 2026, nous avons audité chaque politique animaux de notre plateforme, ${GLOBAL.hotels} hôtels pet-friendly vérifiés répartis dans ${GLOBAL.cities} villes européennes et ${GLOBAL.countries} pays. Le supplément nuitée de chaque hôtel a été extrait directement de sa fiche Booking.com ou de son site, puis normalisé en EUR pour comparaison.`,
        `Les résultats ci-dessous constituent le benchmark ouvert le plus complet des coûts de l'hôtellerie pet-friendly européenne publié cette année. Les données brutes sous-jacentes sont disponibles sur nos pages destinations et hôtels, chaque statistique par ville peut être recoupée jusqu'à l'hôtel individuel.`,
      ],
    },
    keyFindings: {
      title: 'Les chiffres clés',
      items: [
        { stat: `${GLOBAL.avgFee} €`, label: 'supplément animaux moyen par nuit en Europe' },
        { stat: `${GLOBAL.pctFree} %`, label: 'des hôtels audités ne facturent aucun supplément' },
        { stat: `${GLOBAL.avgRoom} €`, label: 'tarif chambre pet-friendly moyen par nuit' },
        { stat: `37 €`, label: 'écart par nuit entre la ville européenne la moins chère et la plus chère' },
      ],
    },
    methodology: {
      title: 'Comment nous avons calculé',
      paras: [
        `Nous avons extrait le supplément animaux nuit publié de chaque hôtel depuis sa politique animaux Booking.com courante ou son site officiel (données collectées avril-mai 2026). Les hôtels n'affichant que « Animaux acceptés sur demande » sans prix ne sont pas inclus dans la moyenne.`,
        `Les suppléments en monnaies hors-EUR (GBP, CHF, SEK, NOK, DKK, CZK, HUF, PLN, BGN, RON, ISK) ont été convertis en EUR via le taux de change mensuel moyen de mai 2026. Quand un hôtel facture par séjour plutôt que par nuit, nous avons annualisé sur 3 nuits, la durée moyenne d'un séjour domestique UK.`,
        `Les moyennes par pays exigent au moins 5 hôtels avec prix pour être incluses (nous publions les compteurs d'hôtels dans le tableau). Les ${countryRows.length} pays ci-dessous passent ce seuil ; 7 pays à couverture micro restent trop minces pour être publiés de manière responsable.`,
        `Les classements par ville exigent au moins 3 hôtels avec prix. Nous excluons le pricing à un seul hôtel comme non fiable. Quand plusieurs sources divergeaient pour un même hôtel, nous avons retenu le chiffre le plus bas, les chiffres ci-dessous sont volontairement conservateurs.`,
        `Notre dataset brut est publié sous forme de fichiers destinations.json et hotels.json dans le repository qui alimente ce site, lisibles ouvertement depuis chaque page destination. Nous nous engageons à un ré-audit chaque année au T2.`,
      ],
    },
    countryTitle: 'Supplément animaux par pays (du moins cher au plus cher)',
    countryIntro: `Suède, République tchèque et Belgique mènent le classement « bon marché », plus de 47 % des hôtels audités ne facturent rien du tout. Le Royaume-Uni et les Balkans (Serbie, Bulgarie) trônent en tête du classement coût, portés par une culture de chaîne qui traite l'animal comme une ligne de revenu explicite.`,
    cityCheapTitle: 'Les 10 villes européennes les moins chères pour un séjour pet-friendly',
    cityCheapIntro: `Voici les villes où ajouter un chien ou un chat à votre réservation coûte le moins. Deux villes, Gothenburg et Lausanne, auditent actuellement à 0 € de moyenne : chaque hôtel avec prix de notre échantillon ne facture rien.`,
    cityExpTitle: 'Les 10 villes européennes les plus chères pour un séjour pet-friendly',
    cityExpIntro: `Manchester, Bath et Belgrade font figure d'aberrations : suppléments animaux moyens supérieurs à 33 €/nuit, quasi aucun hôtel offrant un séjour gratuit, et primes totales par nuit (chambre + animal) qui équivalent à un aller-retour low-cost.`,
    cols: { rank: '#', country: 'Pays', city: 'Ville', cities: 'Villes', hotels: 'Hôtels', avgFee: 'Suppl. moyen', pctFree: '% gratuits', avgRoom: 'Chambre moy.' },
    takeawayTitle: 'À retenir pour 2026',
    takeawayParas: [
      `Si vous êtes flexible sur la destination, basculez vers l'Europe du Nord (Suède, Belgique, Pays-Bas, République tchèque) avant de réserver UK ou Balkans. Même durée, souvent 100 €+ économisés sur le seul supplément animaux pour un séjour de 5 nuits.`,
      `Quand vous réservez au UK, priorisez Premier Inn, Travelodge et Holiday Inn Express, des chaînes qui plafonnent les suppléments à 10 £/séjour. Les boutiques indépendantes britanniques facturent couramment 25-35 £/nuit, ce qui s'ajoute vite sur un long week-end.`,
      `Dans les villes méditerranéennes (Barcelone, Athènes, Lisbonne, Valence, Split), 50 %+ des hôtels pet-friendly ne facturent rien, la Méditerranée européenne est structurellement la zone la moins chère pour le pet-travel dans l'UE. Combinez avec les plages canines toute l'année pour le meilleur rapport qualité-prix.`,
      `Reconfirmez toujours le supplément à la réservation, Booking.com montre la politique au moment de la recherche, mais plusieurs chaînes appliquent un « surcoût deuxième animal » qui n'apparaît que dans l'email de confirmation. Réservez en direct si l'écart est significatif.`,
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment le dataset a-t-il été collecté ?', a: `Nous avons enregistré les suppléments et politiques animaux de ${GLOBAL.hotels} hôtels listés sur hotelswithpets.com, en sourçant depuis les politiques animaux Booking.com et les sites officiels entre avril et mai 2026. Chaque entrée a été recoupée avec la politique directe de l'hôtel quand disponible.` },
      { q: 'Pourquoi le Royaume-Uni est-il si cher ?', a: `L'hôtellerie britannique traite le supplément animaux comme une ligne de revenu discrète, pas comme un service d'hospitalité. Le supplément moyen UK (26 €) est plus du double de la moyenne méditerranéenne (~10 €). Premier Inn et Travelodge sont les exceptions budget à 10 £/séjour ; la plupart des indépendants et chaînes 4-5★ facturent 25-35 £/nuit.` },
      { q: `Qu'est-ce qu'un hôtel « gratuit » pour les animaux ?`, a: `Un hôtel dont la politique animaux affichée n'indique aucun supplément par nuit ni par séjour. Certains demandent encore une caution remboursable ou limitent l'animal à certaines catégories de chambre, nous les comptons comme « gratuits » si rien n'est facturé au check-in ou au check-out.` },
      { q: 'Ces prix sont-ils définitifs ?', a: `Ce sont des moyennes indicatives et une indication des coûts typiques. Confirmez toujours au moment de la réservation, car les hôtels peuvent changer leur politique animaux selon la saison et plusieurs chaînes appliquent des plafonds par séjour qui ne sont pas visibles dans l'UI de résultats.` },
      { q: 'À quelle fréquence cet index sera-t-il mis à jour ?', a: `Annuellement, au T2 (avril-mai). L'édition 2027 est planifiée pour mai 2027 et tracera l'évolution pluriannuelle sur les moyennes pays clés, nous attendons à ce que la Suède et la Belgique restent au plancher et le Royaume-Uni au plafond, sauf changement structurel de politique.` },
    ],
    ctaTitle: 'Parcourez le dataset complet',
    ctaDesc: 'Chaque supplément animaux et note hôtelière de cet index est publié sur sa page destination. Choisissez une ville pour voir l\'inventaire complet d\'hôtels, les contacts vétérinaires, les parcs et la carte Booking.com en direct.',
    ctaButton: 'Voir les 96 destinations →',
    feeUnit: '€',
    freeLabel: 'gratuits',
  },
  es: {
    hero: {
      kicker: 'PET TRAVEL COST INDEX · EDICIÓN 2026',
      h1: `Auditamos ${GLOBAL.hotels} hoteles pet-friendly en ${GLOBAL.countries} países europeos`,
      lede: `El benchmark de costes 2026 para viajar por Europa con perro o gato, tarifas medias por país y ciudad, qué porcentaje de hoteles no cobra nada, y la sorprendente brecha de 37 €/noche entre la ciudad europea más barata y la más cara.`,
    },
    intro: {
      title: 'Por qué importa',
      paras: [
        `Las tarifas para mascotas son la línea más opaca del pricing hotelero europeo. Booking.com las muestra de forma incoherente, los filtros de OTA pierden la mayoría, y la varianza es enorme: un solo fin de semana en Manchester o Bath puede costar más en suplementos para mascotas que 5 noches en Estrasburgo o Brujas.`,
        `Para esta edición 2026, auditamos cada política de mascotas de nuestra plataforma, ${GLOBAL.hotels} hoteles pet-friendly verificados en ${GLOBAL.cities} ciudades europeas y ${GLOBAL.countries} países. La tarifa por noche de cada hotel se extrajo directamente de su ficha Booking.com o web del hotel, y luego se normalizó a EUR para la comparación.`,
        `Los resultados a continuación constituyen el benchmark abierto más completo de costes hoteleros pet-friendly europeos publicado este año. El dataset bruto subyacente está disponible en nuestras páginas de destinos y hoteles, cada estadística por ciudad puede comprobarse hasta el hotel individual.`,
      ],
    },
    keyFindings: {
      title: 'Las cifras clave',
      items: [
        { stat: `${GLOBAL.avgFee} €`, label: 'tarifa media por noche para mascotas en Europa' },
        { stat: `${GLOBAL.pctFree} %`, label: 'de los hoteles auditados no cobra ningún cargo' },
        { stat: `${GLOBAL.avgRoom} €`, label: 'tarifa media de habitación pet-friendly por noche' },
        { stat: `37 €`, label: 'brecha por noche entre la ciudad europea más barata y la más cara' },
      ],
    },
    methodology: {
      title: 'Cómo lo calculamos',
      paras: [
        `Extrajimos la tarifa nocturna publicada para cada hotel desde su política de mascotas en Booking.com o web oficial (datos recogidos abril-mayo 2026). Los hoteles que solo publican « Mascotas admitidas bajo solicitud » sin precio fueron excluidos de la media para no distorsionarla.`,
        `Las tarifas en monedas distintas al EUR (GBP, CHF, SEK, NOK, DKK, CZK, HUF, PLN, BGN, RON, ISK) se convirtieron a EUR usando el tipo de cambio medio mensual de mayo de 2026. Donde un hotel cobra por estancia en lugar de por noche, anualizamos sobre una base de 3 noches, la duración media de un viaje doméstico UK.`,
        `Las medias por país requieren al menos 5 hoteles con precio para inclusión (publicamos los recuentos de hoteles en la tabla). Los ${countryRows.length} países listados a continuación superan ese umbral; otros 7 países con cobertura micro son demasiado escasos para publicarse responsablemente.`,
        `Los rankings por ciudad requieren al menos 3 hoteles con precio. Excluimos el pricing de un solo hotel como no fiable. Cuando varias fuentes divergían para un mismo hotel, retuvimos el número más bajo, las cifras a continuación son deliberadamente conservadoras.`,
        `Nuestro dataset bruto se publica como los archivos destinations.json y hotels.json en el repositorio que alimenta este sitio, abiertamente legibles en cada página de destino. Nos comprometemos a un re-audit anual en Q2.`,
      ],
    },
    countryTitle: 'Tarifa para mascotas por país (de la más barata a la más cara)',
    countryIntro: `Suecia, República Checa y Bélgica lideran el ranking « barato », más del 47 % de los hoteles auditados no cobra nada. Reino Unido y los Balcanes (Serbia, Bulgaria) están en lo alto del ranking de coste, impulsados por una cultura de cadenas que trata a la mascota como una línea de ingresos explícita.`,
    cityCheapTitle: 'Las 10 ciudades europeas más baratas para una estancia pet-friendly',
    cityCheapIntro: `Estas son las ciudades donde añadir un perro o gato a tu reserva cuesta menos. Dos ciudades, Gotemburgo y Lausana, actualmente auditan a 0 € de media: cada hotel con precio de nuestra muestra no cobra nada.`,
    cityExpTitle: 'Las 10 ciudades europeas más caras para una estancia pet-friendly',
    cityExpIntro: `Manchester, Bath y Belgrado son los grandes outliers: tarifas medias por encima de 33 €/noche, casi ningún hotel ofreciendo estancia gratuita para mascotas, y primas totales por noche (habitación + mascota) que equivalen a un vuelo low-cost ida-vuelta.`,
    cols: { rank: '#', country: 'País', city: 'Ciudad', cities: 'Ciudades', hotels: 'Hoteles', avgFee: 'Tarifa media', pctFree: '% sin cargo', avgRoom: 'Habit. media' },
    takeawayTitle: 'Conclusiones prácticas para 2026',
    takeawayParas: [
      `Si tienes flexibilidad de destino, gira hacia el norte de Europa (Suecia, Bélgica, Países Bajos, República Checa) antes de reservar UK o los Balcanes. Misma duración, a menudo 100 €+ ahorrados solo en suplemento para mascotas en una estancia de 5 noches.`,
      `Cuando reserves específicamente UK, prioriza Premier Inn, Travelodge y Holiday Inn Express, cadenas que limitan las tarifas a 10 £/estancia. Las boutiques independientes UK suelen cobrar 25-35 £/noche, lo que se acumula rápidamente en un fin de semana largo.`,
      `En las ciudades mediterráneas (Barcelona, Atenas, Lisboa, Valencia, Split), más del 50 % de los hoteles pet-friendly no cobra nada, el Mediterráneo europeo es estructuralmente la zona más barata para viajar con mascota en la UE. Combínalo con playas caninas todo el año para la mejor relación calidad-precio.`,
      `Reconfirma siempre la tarifa al reservar, Booking.com muestra la política en el momento de la búsqueda, pero varias cadenas aplican un « cargo segunda mascota » que solo aparece en el email de confirmación. Reserva directo con el hotel si la diferencia es significativa.`,
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cómo se recopiló el dataset?', a: `Registramos tarifas y políticas para mascotas de ${GLOBAL.hotels} hoteles listados en hotelswithpets.com, obteniéndolas de las políticas de Booking.com y las webs de los hoteles entre abril y mayo de 2026. Cada entrada se cotejó con la política directa del hotel cuando estaba disponible.` },
      { q: '¿Por qué el Reino Unido es tan caro?', a: `La hostelería británica trata el cargo por mascota como una línea de ingresos discreta, no como un servicio de hospitalidad. La tarifa media UK (26 €) es más del doble de la media mediterránea (~10 €). Premier Inn y Travelodge son las excepciones a 10 £/estancia; la mayoría de los independientes y cadenas 4-5★ cobran 25-35 £/noche.` },
      { q: `¿Qué es un hotel « gratis » para mascotas?`, a: `Un hotel cuya política de mascotas publicada no indica ningún cargo por noche o por estancia. Algunos aún piden un depósito reembolsable por daños o limitan la mascota a ciertas categorías de habitación, los contamos como « gratis » si no se cobra nada en el check-in o check-out.` },
      { q: '¿Estos precios son definitivos?', a: `Son medias indicativas y un indicador de costes típicos. Confirma siempre al reservar, ya que los hoteles pueden cambiar su política estacionalmente y varias cadenas aplican límites por estancia no visibles en la UI de resultados.` },
      { q: '¿Con qué frecuencia se actualizará este índice?', a: `Anualmente, en Q2 (abril-mayo). La edición 2027 está planificada para mayo de 2027 y trazará el movimiento plurianual en las medias por país clave, esperamos que Suecia y Bélgica permanezcan como suelo y UK como techo salvo cambio estructural de política.` },
    ],
    ctaTitle: 'Explora el dataset completo',
    ctaDesc: 'Cada tarifa para mascotas y valoración hotelera de este índice está publicada en su página de destino. Elige una ciudad para ver el inventario completo de hoteles, contactos veterinarios, parques y mapa Booking.com en vivo.',
    ctaButton: 'Ver los 96 destinos →',
    feeUnit: '€',
    freeLabel: 'sin cargo',
  },
  pt: {
    hero: {
      kicker: 'PET TRAVEL COST INDEX · Edição 2026',
      h1: `Auditámos ${GLOBAL.hotels} hotéis pet-friendly en ${GLOBAL.countries} países europeus`,
      lede: `O benchmark de costes 2026 para viajar por Europa com cão o gato, tarifas medias por país e cidade, que porcentaje de hotéis no cobra nada, e a sorprendente brecha de 37 €/noite entre a cidade europeia mais barata e a mais cara.`,
    },
    intro: {
      title: 'Porquê importa',
      paras: [
        `As tarifas para animais são a línea mais opaca do pricing hotelero europeu. Booking.com as muestra de forma incoherente, os filtros de OTA pierden a mayoría, e a varianza é enorme: um só fin de semana em Manchester o Bath pode costar mais em suplementos para animais que 5 noites em Estrasburgo o Bruges.`,
        `Para esta edição 2026, auditámos cada política de animais de nuestra plataforma, ${GLOBAL.hotels} hotéis pet-friendly verificados en ${GLOBAL.cities} cidades europeias e ${GLOBAL.countries} países. A tarifa por noite de cada hotel se extrajo directamente do seu ficha Booking.com o web do hotel, e luego se normalizó a EUR para a comparación.`,
        `Os resultados a continuación constituyen o benchmark abierto mais completo de costes hoteleros pet-friendly europeus publicado este ano. O dataset bruto subyacente está disponible em nuestras páginas de destinos e hotéis, cada estadística por cidade pode comprobarse até o hotel individual.`,
      ],
    },
    keyFindings: {
      title: 'As cifras clave',
      items: [
        { stat: `${GLOBAL.avgFee} €`, label: 'tarifa media por noite para animais em Europa' },
        { stat: `${GLOBAL.pctFree} %`, label: 'dois hotéis auditados no cobra ningún cargo' },
        { stat: `${GLOBAL.avgRoom} €`, label: 'tarifa media de habitación pet-friendly por noite' },
        { stat: `37 €`, label: 'brecha por noite entre a cidade europeia mais barata e a mais cara' },
      ],
    },
    methodology: {
      title: 'Como lo calculamos',
      paras: [
        `Extrajimos a tarifa nocturna publicada para cada hotel desde o seu política de animais em Booking.com o web oficial (datos recogidos abril-maio 2026). Os hotéis que só publicam « Animais admitidas sob solicitud » sem preço foram excluidos da media para no distorsionarla.`,
        `As tarifas em monedas distintas al EUR (GBP, CHF, SEK, NOK, DKK, CZK, HUF, PLN, BGN, RON, ISK) se convirtieron a EUR usando o tipo de cambio medio mensal de maio de 2026. Onde um hotel cobra por estadia em lugar de por noite, anualizamos sobre uma base de 3 noites, a duración media de um viaje doméstico UK.`,
        `As medias por país exigem al menos 5 hotéis com preço para inclusão (publicamos os recuentos de hotéis na tabla). Os ${countryRows.length} países listados a continuación superan ese umbral; otros 7 países com cobertura micro são demasiado escasos para publicarse responsablemente.`,
        `Os rankings por cidade exigem al menos 3 hotéis com preço. Excluimos o pricing de um só hotel como no fiable. Quando varias fuentes divergían para um mismo hotel, retuvimos o número mais sob, as cifras a continuación são deliberadamente conservadoras.`,
        `Nuestro dataset bruto se publica como os arquivos destinations.json e hotels.json no repositorio que alimenta este sitio, abiertamente legibles em cada página de destino. Nos comprometemos a um re-audit anual em Q2.`,
      ],
    },
    countryTitle: 'Tarifa para animais por país (da mais barata a mais cara)',
    countryIntro: `Suecia, República Checa e Bélgica lideram o ranking « barato », mais do 47 % dois hotéis auditados no cobra nada. Reino Unido e os Balcanes (Serbia, Bulgaria) estão em lo alto do ranking de coste, impulsados por uma cultura de cadenas que trata a animal como uma línea de ingresos explícita.`,
    cityCheapTitle: 'As 10 cidades europeias mais baratas para uma estadia pet-friendly',
    cityCheapIntro: `Estas são as cidades onde anhadir um cão o gato a tua reserva custa menos. Duas cidades, Gotemburgo e Lausana, actualmente auditan a 0 € de media: cada hotel com preço de nuestra muestra no cobra nada.`,
    cityExpTitle: 'As 10 cidades europeias mais caras para uma estadia pet-friendly',
    cityExpIntro: `Manchester, Bath e Belgrado são os grandes outliers: tarifas medias por encima de 33 €/noite, casi ningún hotel ofreciendo estadia gratuita para animais, e primas totales por noite (habitación + animal) que equivalen a um voo low-cost ida-vuelta.`,
    cols: { rank: '#', country: 'País', city: 'Cidade', cities: 'Cidades', hotels: 'Hotéis', avgFee: 'Tarifa media', pctFree: '% sem cargo', avgRoom: 'Habit. media' },
    takeawayTitle: 'Conclusiones prácticas para 2026',
    takeawayParas: [
      `Si tienes flexibilidad de destino, gira hacia o norte de Europa (Suecia, Bélgica, Países Bajos, República Checa) antes de reservar UK os Balcanes. Misma duración, frequentemente 100 €+ ahorrados só em suplemento para animais numa estadia de 5 noites.`,
      `Quando reserves especificamente UK, prioriza Premier Inn, Travelodge e Holiday Inn Express, cadenas que limitan as tarifas a 10 £/estadia. As boutiques independientes UK costumam cobrar 25-35 £/noite, lo que se acumula rápidamente num fin de semana longo.`,
      `Nas cidades mediterráneas (Barcelona, Atenas, Lisboa, Valencia, Split), mais do 50 % dois hotéis pet-friendly no cobra nada, o Mediterrâneo europeu é estructuralmente a zona mais barata para viajar com animal na UE. Combínalo com praias caninas o ano inteiro para a MELHOR relación qualidade-preço.`,
      `Reconfirma sempre a tarifa al reservar, Booking.com muestra a política no momento da búsqueda, mas varias cadenas aplicam um « cargo segunda animal » que só aparece no email de confirmación. Reserva directo com o hotel si a diferença é significativa.`,
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Como se recopiló o dataset?', a: `Registramos tarifas e políticas para animais de ${GLOBAL.hotels} hotéis listados em hotelswithpets.com, obteniéndolas das políticas de Booking.com e as webs dois hotéis entre abril e maio de 2026. Cada entrada se cotejó com a política directa do hotel quando estaba disponible.` },
      { q: 'Porquê o Reino Unido é tan caro?', a: `A hostelería britânica trata o cargo por animal como uma línea de ingresos discreta, no como um serviço de hospitalidad. A tarifa media UK (26 €) é mais do doble da media mediterrânea (~10 €). Premier Inn e Travelodge são as excepciones a 10 £/estadia; a maioria dois independientes e cadenas 4-5★ cobran 25-35 £/noite.` },
      { q: `Que é um hotel « grátis » para animais?`, a: `Um hotel cuya política de animais publicada no indica ningún cargo por noite o por estadia. Algunos aún piden um depósito reembolsable por danhos o limitan a animal a ciertas categorías de habitación, os contamos como « grátis » si no se cobra nada no check-in o check-out.` },
      { q: 'Estes preços são definitivos?', a: `São medias indicativas e um indicador de costes típicos. Confirma sempre al reservar, já que os hotéis podem cambiar o seu política estacionalmente e varias cadenas aplicam limites por estadia no visibles na UI de resultados.` },
      { q: 'Com que frecuencia se actualizará este índice?', a: `Anualmente, em Q2 (abril-maio). A edição 2027 está planificada para maio de 2027 e trazará o movimiento plurianual nas medias por país clave, esperamos que Suecia e Bélgica permanezcan como solo e UK como techo salvo cambio estructural de política.` },
    ],
    ctaTitle: 'Explora o dataset completo',
    ctaDesc: 'Cada tarifa para animais e avaliação hotelera deste índice está publicada no seu página de destino. Elige uma cidade para ver o inventário completo de hotéis, contactos veterinários, parques e mapa Booking.com em vivo.',
    ctaButton: 'Ver os 96 destinos →',
    feeUnit: '€',
    freeLabel: 'sem cargo',
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: c.hero.h1,
    description: c.hero.lede,
    creator: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
    datePublished: '2026-05-04',
    dateModified: new Date().toISOString().split('T')[0],
    license: 'https://creativecommons.org/licenses/by/4.0/',
    keywords: ['pet travel', 'hotel pet fees', 'pet-friendly hotels', 'Europe', 'cost benchmark', '2026'],
    distribution: [{ '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE_URL}/data/destinations.json` }],
    variableMeasured: ['avgPetFeeEur', 'pctFreeHotels', 'avgRoomRateEur'],
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.hero.h1,
    description: c.hero.lede,
    inLanguage: locale,
    datePublished: '2026-05-04T00:00:00Z',
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${locale}/guides/${SLUG}` },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  const cheapest10 = cityRows.slice(0, 10)
  const expensive10 = [...cityRows].slice(-10).reverse()

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 text-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            📊 {c.hero.kicker}
          </span>
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight">{c.hero.h1}</h1>
          <p className="text-emerald-100 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">{c.hero.lede}</p>
        </div>
      </section>

      {/* Key findings */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-8 text-center">{c.keyFindings.title}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {c.keyFindings.items.map((it, i) => (
              <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 lg:p-6 text-center">
                <div className="text-3xl lg:text-4xl font-extrabold text-emerald-700 mb-2">{it.stat}</div>
                <div className="text-gray-600 text-sm leading-snug">{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.intro.title}</h2>
            <div className="space-y-4">
              {c.intro.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
          </section>
        </div>
      </article>

      {/* Country table */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">{c.countryTitle}</h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">{c.countryIntro}</p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left p-3 font-semibold">{c.cols.rank}</th>
                  <th className="text-left p-3 font-semibold">{c.cols.country}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.cities}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.hotels}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.avgFee}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.pctFree}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.avgRoom}</th>
                </tr>
              </thead>
              <tbody>
                {countryRows.map((r, i) => (
                  <tr key={r.country} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 text-gray-500 font-mono">{i + 1}</td>
                    <td className="p-3 font-semibold text-gray-900">{getLocalizedCountryName(r.country, locale)}</td>
                    <td className="p-3 text-right text-gray-700">{r.cities}</td>
                    <td className="p-3 text-right text-gray-700">{r.hotels}</td>
                    <td className="p-3 text-right text-gray-900 font-semibold">{r.avgFee} {c.feeUnit}</td>
                    <td className="p-3 text-right text-emerald-700 font-semibold">{r.pctFree}%</td>
                    <td className="p-3 text-right text-gray-700">{r.avgRoom} {c.feeUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cheapest cities */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">🏆 {c.cityCheapTitle}</h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">{c.cityCheapIntro}</p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-emerald-50 text-emerald-900">
                <tr>
                  <th className="text-left p-3 font-semibold">{c.cols.rank}</th>
                  <th className="text-left p-3 font-semibold">{c.cols.city}</th>
                  <th className="text-left p-3 font-semibold">{c.cols.country}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.avgFee}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.pctFree}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.avgRoom}</th>
                </tr>
              </thead>
              <tbody>
                {cheapest10.map((r, i) => (
                  <tr key={r.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 text-gray-500 font-mono">{i + 1}</td>
                    <td className="p-3 font-semibold">
                      <Link href={`/${locale}/destinations/${r.slug}`} className="text-emerald-700 hover:underline">
                        {getLocalizedCityName(r.slug, r.name, locale)}
                      </Link>
                    </td>
                    <td className="p-3 text-gray-700">{getLocalizedCountryName(r.country, locale)}</td>
                    <td className="p-3 text-right text-gray-900 font-semibold">{r.avgFee === 0 ? c.freeLabel : `${r.avgFee} ${c.feeUnit}`}</td>
                    <td className="p-3 text-right text-emerald-700 font-semibold">{r.pctFree}%</td>
                    <td className="p-3 text-right text-gray-700">{r.avgRoom} {c.feeUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Most expensive */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">💸 {c.cityExpTitle}</h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">{c.cityExpIntro}</p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-rose-50 text-rose-900">
                <tr>
                  <th className="text-left p-3 font-semibold">{c.cols.rank}</th>
                  <th className="text-left p-3 font-semibold">{c.cols.city}</th>
                  <th className="text-left p-3 font-semibold">{c.cols.country}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.avgFee}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.pctFree}</th>
                  <th className="text-right p-3 font-semibold">{c.cols.avgRoom}</th>
                </tr>
              </thead>
              <tbody>
                {expensive10.map((r, i) => (
                  <tr key={r.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 text-gray-500 font-mono">{i + 1}</td>
                    <td className="p-3 font-semibold">
                      <Link href={`/${locale}/destinations/${r.slug}`} className="text-rose-700 hover:underline">
                        {getLocalizedCityName(r.slug, r.name, locale)}
                      </Link>
                    </td>
                    <td className="p-3 text-gray-700">{getLocalizedCountryName(r.country, locale)}</td>
                    <td className="p-3 text-right text-gray-900 font-semibold">{r.avgFee} {c.feeUnit}</td>
                    <td className="p-3 text-right text-emerald-700 font-semibold">{r.pctFree}%</td>
                    <td className="p-3 text-right text-gray-700">{r.avgRoom} {c.feeUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.methodology.title}</h2>
          <div className="space-y-4">
            {c.methodology.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
        </div>
      </article>

      {/* Takeaways */}
      <section className="py-12 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.takeawayTitle}</h2>
          <div className="space-y-4">
            {c.takeawayParas.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">❓ {c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-2xl group">
                <summary className="cursor-pointer p-5 font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-emerald-700 to-teal-800 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">{c.ctaTitle}</h2>
          <p className="text-emerald-100 text-lg mb-8 leading-relaxed">{c.ctaDesc}</p>
          <Link href={`/${locale}/destinations`} className="inline-block bg-white text-emerald-700 font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-colors shadow-lg">
            {c.ctaButton}
          </Link>
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />
    </div>
  )
}
