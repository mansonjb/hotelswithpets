import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import PetMap from '@/components/PetMap'
import NearbyHotelCard from '@/components/NearbyHotelCard'

const SLUG = 'top-dog-friendly-cities-europe'

// Curated ranking, based on: number of fenced off-leash zones, 24/7 vet coverage,
// public transport rules for dogs, density of dog-friendly hotels, beach/swim access.
// All 20 cities are documented in our destination guides.
const TOP_20: Array<{ slug: string; rank: number; reason: { en: string; fr: string; es: string; pt: string } }> = [
  { slug: 'amsterdam', rank: 1, reason: {
    en: 'Trams accept dogs with a child ticket, the Vondelpark has multiple off-leash zones, and the Jordaan neighbourhood is a low-traffic dog walker\'s paradise.',
    fr: 'Les trams acceptent les chiens avec un billet enfant, le Vondelpark compte plusieurs zones sans laisse, et le Jordaan est un paradis du promeneur de chien à faible circulation.',
    es: 'Los tranvías admiten perros con billete infantil, el Vondelpark tiene varias zonas sin correa y el Jordaan es un paraíso de paseadores con poco tráfico.',
    pt: 'Os elétricos admiten cães com bilhete infantil, o Vondelpark tem varias zonas sem trela e o Jordaan é um paraíso de paseadores com pouco tráfico.',
  }},
  { slug: 'berlin', rank: 2, reason: {
    en: 'An estimated 100,000 registered dogs, dogs on every U-Bahn and S-Bahn line, the 210-hectare Tiergarten and the most dog-tolerant café culture of any major capital.',
    fr: 'Environ 100 000 chiens enregistrés, chiens dans tous les U-Bahn et S-Bahn, les 210 hectares du Tiergarten et la culture café la plus tolérante de toutes les grandes capitales.',
    es: 'Unos 100.000 perros registrados, perros en cada U-Bahn y S-Bahn, las 210 hectáreas del Tiergarten y la cultura de café más tolerante de cualquier gran capital.',
    pt: 'Uns 100.000 cães registrados, cães en cada U-Bahn e S-Bahn, as 210 hectáreas do Tiergarten e a cultura de café mais tolerante de cualquier gran capital.',
  }},
  { slug: 'vienna', rank: 3, reason: {
    en: 'Dogs ride U-Bahn and trams free with a muzzle, the Prater has a 6 km off-leash trail, and most coffee houses welcome dogs by tradition.',
    fr: 'Chiens dans U-Bahn et trams gratuits avec muselière, le Prater offre un sentier sans laisse de 6 km, et la plupart des cafés viennois accueillent les chiens par tradition.',
    es: 'Los perros viajan gratis en U-Bahn y tranvía con bozal, el Prater ofrece un sendero sin correa de 6 km, y la mayoría de las cafeterías vienesas admiten perros por tradición.',
    pt: 'Os cães viajan grátis en U-Bahn e elétrico com bozal, o Prater ofrece um trilho sem trela de 6 km, e a maioria das cafeterías vienesas admiten cães por tradición.',
  }},
  { slug: 'munich', rank: 4, reason: {
    en: 'The 375-hectare English Garden is bigger than Central Park, beer gardens explicitly welcome dogs (water bowls everywhere), and the Isar river has 14 km of off-leash trails.',
    fr: 'Les 375 hectares du Jardin Anglais sont plus grands que Central Park, les biergartens accueillent explicitement les chiens (gamelles partout), et l\'Isar offre 14 km de sentiers sans laisse.',
    es: 'Las 375 hectáreas del Jardín Inglés son más grandes que Central Park, los biergartens admiten explícitamente perros (boles de agua por todas partes) y el Isar ofrece 14 km de senderos sin correa.',
    pt: 'As 375 hectáreas do Jardim Inglês são mais grandes que Central Park, os biergartens admiten explícitamente cães (boles de água por todas partes) e o Isar ofrece 14 km de trilhos sem trela.',
  }},
  { slug: 'copenhagen', rank: 5, reason: {
    en: 'Dogs travel free on Metro and S-tog with a muzzle, the Fælledparken has multiple off-leash zones, and Danish café culture is built around terrace-with-dog rituals.',
    fr: 'Chiens gratuits dans le métro et S-tog avec muselière, le Fælledparken compte plusieurs zones sans laisse, et la culture café danoise est centrée sur le rituel terrasse-avec-chien.',
    es: 'Los perros viajan gratis en metro y S-tog con bozal, el Fælledparken tiene varias zonas sin correa y la cultura del café danesa se basa en el ritual terraza-con-perro.',
    pt: 'Os cães viajan grátis no metro e S-tog com bozal, o Fælledparken tem varias zonas sem trela e a cultura do café danesa se basa no ritual esplanada-com-cão.',
  }},
  { slug: 'paris', rank: 6, reason: {
    en: 'Over 500,000 dogs share the city. The Bois de Boulogne (850 ha), the Bois de Vincennes (995 ha) and the Canal Saint-Martin make Paris a dog-walker\'s pleasure despite tight spaces.',
    fr: 'Plus de 500 000 chiens partagent la ville. Le Bois de Boulogne (850 ha), le Bois de Vincennes (995 ha) et le Canal Saint-Martin font de Paris un plaisir du promeneur de chien malgré les espaces étroits.',
    es: 'Más de 500.000 perros comparten la ciudad. El Bois de Boulogne (850 ha), el Bois de Vincennes (995 ha) y el Canal Saint-Martin hacen de París un placer para paseadores a pesar de los espacios estrechos.',
    pt: 'Mais de 500.000 cães comparten a cidade. O Bois de Boulogne (850 ha), o Bois de Vincennes (995 ha) e o Canal Saint-Martin hacen de París um placer para paseadores apesar dos espacios estrechos.',
  }},
  { slug: 'hamburg', rank: 7, reason: {
    en: '14% of the city is parks and gardens, 56 official off-leash zones, the famous Elbstrand urban beaches and a port culture where dogs ride ferries and nap on café terraces.',
    fr: '14 % de la ville en parcs et jardins, 56 zones sans laisse officielles, les célèbres plages urbaines de l\'Elbstrand et une culture portuaire où les chiens prennent les ferries et dorment sur les terrasses.',
    es: '14 % de la ciudad en parques y jardines, 56 zonas sin correa oficiales, las famosas playas urbanas del Elbstrand y una cultura portuaria donde los perros cogen ferris y duermen en terrazas.',
    pt: '14 % da cidade en parques e jardins, 56 zonas sem trela oficiais, as famosas praias urbanas do Elbstrand e uma cultura portuaria onde os cães cogen ferris e duermen en esplanadas.',
  }},
  { slug: 'helsinki', rank: 8, reason: {
    en: '60,000 registered dogs (one of Europe\'s highest per-capita ratios), 80+ fenced koira-aitaus enclosures, dogs ride trams and ferries free, and the Seurasaari nature reserve is reachable by bus.',
    fr: '60 000 chiens enregistrés (l\'un des plus hauts ratios par habitant d\'Europe), 80+ enclos koira-aitaus clôturés, chiens gratuits dans tram et ferry, et la réserve naturelle de Seurasaari accessible en bus.',
    es: '60.000 perros registrados (uno de los ratios per cápita más altos de Europa), 80+ recintos koira-aitaus vallados, perros gratis en tranvía y ferri, y la reserva natural de Seurasaari accesible en bus.',
    pt: '60.000 cães registrados (uno dos ratios per cápita mais altos de Europa), 80+ recintos koira-aitaus vallados, cães grátis no elétrico e ferri, e a reserva natural de Seurasaari acessível en bus.',
  }},
  { slug: 'zurich', rank: 9, reason: {
    en: 'Switzerland\'s dog-tolerance is legendary: trams, buses and trains accept all dogs, restaurants by default, and the Uetliberg forest hill (870 m) is reachable in 25 min by S-Bahn.',
    fr: 'La tolérance suisse aux chiens est légendaire : trams, bus et trains acceptent tous les chiens, restaurants par défaut, et la colline forestière de l\'Uetliberg (870 m) est accessible en 25 min en S-Bahn.',
    es: 'La tolerancia canina suiza es legendaria: tranvías, autobuses y trenes admiten todos los perros, restaurantes por defecto, y la colina forestal del Uetliberg (870 m) está accesible en 25 min en S-Bahn.',
    pt: 'A tolerancia canina suiza é legendaria: elétricos, autocarros e comboios admiten todos os cães, restaurantes por defecto, e a colina forestal do Uetliberg (870 m) está acessível en 25 min en S-Bahn.',
  }},
  { slug: 'salzburg', rank: 10, reason: {
    en: 'Small, walkable, with the Salzkammergut lakes (Wolfgangsee, Mondsee) and the Mönchsberg hill all dog-friendly. The Postbus to St. Gilgen accepts dogs free.',
    fr: 'Petite, piétonne, avec les lacs du Salzkammergut (Wolfgangsee, Mondsee) et la colline du Mönchsberg tous dog-friendly. Le Postbus pour St. Gilgen accepte les chiens gratuitement.',
    es: 'Pequeña, peatonal, con los lagos del Salzkammergut (Wolfgangsee, Mondsee) y la colina del Mönchsberg todos dog-friendly. El Postbus a St. Gilgen admite perros gratis.',
    pt: 'Pequenha, peatonal, com os lagos do Salzkammergut (Wolfgangsee, Mondsee) e a colina do Mönchsberg todos pet-friendly. O Postbus a St. Gilgen admite cães grátis.',
  }},
  { slug: 'edinburgh', rank: 11, reason: {
    en: 'Arthur\'s Seat (a 251 m volcano in the city), Holyrood Park and Princes Street Gardens all welcome dogs. UK pub culture extends to Scottish drinking dens.',
    fr: 'Arthur\'s Seat (un volcan de 251 m en ville), le Holyrood Park et les Princes Street Gardens accueillent tous les chiens. La culture pub UK s\'étend aux dens écossais.',
    es: 'Arthur\'s Seat (un volcán de 251 m en la ciudad), el Holyrood Park y los Princes Street Gardens admiten todos perros. La cultura pub UK se extiende a los dens escoceses.',
    pt: 'Arthur\'s Seat (um volcán de 251 m na cidade), o Holyrood Park e os Princes Street Gardens admiten todos cães. A cultura pub UK estende-se aos dens escoceses.',
  }},
  { slug: 'lisbon', rank: 12, reason: {
    en: 'Trams accept leashed dogs free of charge, the Tagus riverfront has 8 km of car-free promenade, and the Praia do Porto Brandão dog beach is a 15-min ferry from the centre.',
    fr: 'Les trams acceptent les chiens en laisse gratuitement, les berges du Tage offrent 8 km de promenade piétonne, et la plage canine du Porto Brandão est à 15 min en ferry du centre.',
    es: 'Los tranvías admiten perros con correa gratis, las orillas del Tajo ofrecen 8 km de paseo peatonal, y la playa canina de Porto Brandão está a 15 min en ferri del centro.',
    pt: 'Os elétricos admiten cães com trela grátis, as margens do Tajo ofrecen 8 km de passeio peatonal, e a praia canina de Porto Brandão está a 15 min en ferri do centro.',
  }},
  { slug: 'porto', rank: 13, reason: {
    en: 'Even more dog-friendly than Lisbon: the Douro riverbank in Ribeira accepts dogs in every café terrace, and the Foz do Douro has dog beaches reachable by tram.',
    fr: 'Encore plus dog-friendly que Lisbonne : les berges du Douro à la Ribeira acceptent les chiens dans chaque café, et Foz do Douro a des plages canines accessibles en tram.',
    es: 'Aún más dog-friendly que Lisboa: las orillas del Duero en la Ribeira admiten perros en cada café, y Foz do Douro tiene playas caninas accesibles en tranvía.',
    pt: 'Aún mais pet-friendly que Lisboa: as margens do Duero na Ribeira admiten cães en cada café, e Foz do Douro tem praias caninas acessíveis no elétrico.',
  }},
  { slug: 'valencia', rank: 14, reason: {
    en: 'The 9 km Turia Garden cuts the city in two, Europe\'s largest urban park with multiple off-leash zones. The Malvarrosa beach has a year-round dog zone.',
    fr: 'Les 9 km du Jardin du Turia traversent la ville, plus grand parc urbain d\'Europe avec plusieurs zones sans laisse. La plage Malvarrosa a une zone canine toute l\'année.',
    es: 'Los 9 km del Jardín del Turia atraviesan la ciudad, el mayor parque urbano de Europa con varias zonas sin correa. La playa de la Malvarrosa tiene zona canina todo el año.',
    pt: 'Os 9 km do Jardim do Turia atraviesan a cidade, o mayor parque urbano de Europa com varias zonas sem trela. A praia da Malvarrosa tem zona canina o ano inteiro.',
  }},
  { slug: 'split', rank: 15, reason: {
    en: 'The Marjan Hill forest park dominates the city centre with off-leash trails and dog-friendly stone beaches at Bačvice and Bene.',
    fr: 'Le parc-forêt de la colline Marjan domine le centre-ville avec sentiers sans laisse et plages de pierre dog-friendly à Bačvice et Bene.',
    es: 'El parque-bosque de la colina Marjan domina el centro de la ciudad con senderos sin correa y playas de piedra dog-friendly en Bačvice y Bene.',
    pt: 'O parque-floresta da colina Marjan domina o centro da cidade com trilhos sem trela e praias de pedra pet-friendly en Bačvice e Bene.',
  }},
  { slug: 'belgrade', rank: 16, reason: {
    en: 'One of Europe\'s most affordable capitals, with the year-round Ada Ciganlija dog beach, free public transport since 2025 (dogs included), and the only 24-hour vet hospital in Serbia.',
    fr: 'L\'une des capitales européennes les plus abordables, avec la plage canine d\'Ada Ciganlija toute l\'année, transports publics gratuits depuis 2025 (chiens inclus), et le seul hôpital vétérinaire 24h/24 de Serbie.',
    es: 'Una de las capitales europeas más asequibles, con la playa canina de Ada Ciganlija todo el año, transporte público gratis desde 2025 (perros incluidos), y el único hospital veterinario 24/7 de Serbia.',
    pt: 'Uma das capitales europeias mais asequibles, com a praia canina de Ada Ciganlija o ano inteiro, transporte público grátis a partir de 2025 (cães incluidos), e o único hospital veterinário 24/7 de Serbia.',
  }},
  { slug: 'prague', rank: 17, reason: {
    en: 'Dogs ride trams, metro and buses free with a muzzle. Stromovka park (95 ha) and Letná have major off-leash zones, and Czech beer gardens are universally dog-tolerant.',
    fr: 'Chiens gratuits dans tram, métro et bus avec muselière. Le parc Stromovka (95 ha) et Letná ont de grandes zones sans laisse, et les beer gardens tchèques sont universellement tolérants.',
    es: 'Perros gratis en tranvía, metro y autobús con bozal. El parque Stromovka (95 ha) y Letná tienen grandes zonas sin correa, y los beer gardens checos son universalmente tolerantes.',
    pt: 'Cães grátis no elétrico, metro e autocarro com bozal. O parque Stromovka (95 ha) e Letná têm grandes zonas sem trela, e os beer gardens checos são universalmente tolerantes.',
  }},
  { slug: 'oslo', rank: 18, reason: {
    en: 'Norwegian dog-walking culture is intense: 70%+ of dogs go off-leash in nature. Oslo\'s 60+ kilometre forest border (Marka) is fully dog-friendly within 15 min of the centre.',
    fr: 'La culture norvégienne de promenade canine est intense : 70 %+ des chiens sont sans laisse en nature. La frontière forestière de 60+ km d\'Oslo (Marka) est entièrement dog-friendly à 15 min du centre.',
    es: 'La cultura noruega de paseo canino es intensa: 70 %+ de perros van sin correa en naturaleza. La frontera forestal de 60+ km de Oslo (Marka) es totalmente dog-friendly a 15 min del centro.',
    pt: 'A cultura noruega de passeio canino é intensa: 70 %+ de cães van sem trela en naturaleza. A frontera forestal de 60+ km de Oslo (Marka) é totalmente pet-friendly a 15 min do centro.',
  }},
  { slug: 'reykjavik', rank: 19, reason: {
    en: 'Despite Iceland\'s strict pet import rules, Reykjavík has a strong local dog culture: the Heiðmörk reserve (3,000 ha) and dog beaches at Nauthólsvík.',
    fr: 'Malgré les règles strictes d\'importation animale islandaises, Reykjavík a une forte culture canine locale : la réserve de Heiðmörk (3 000 ha) et les plages canines de Nauthólsvík.',
    es: 'A pesar de las estrictas normas de importación de mascotas de Islandia, Reikiavik tiene una fuerte cultura canina local: la reserva de Heiðmörk (3.000 ha) y playas caninas en Nauthólsvík.',
    pt: 'Apesar das estrictas normas de importación de animais de Islandia, Reikiavik tem uma fuerte cultura canina local: a reserva de Heiðmörk (3.000 ha) e praias caninas en Nauthólsvík.',
  }},
  { slug: 'antwerp', rank: 20, reason: {
    en: '40+ fenced hondenlosloopzones across the city, the Middelheim sculpture park, and a dense network of dog-friendly cafés in the Eilandje and Het Zuid neighbourhoods.',
    fr: '40+ hondenlosloopzones clôturés dans la ville, le parc de sculptures Middelheim, et un dense réseau de cafés dog-friendly dans les quartiers Eilandje et Het Zuid.',
    es: '40+ hondenlosloopzones valladas en la ciudad, el parque de esculturas Middelheim, y una densa red de cafés dog-friendly en los barrios Eilandje y Het Zuid.',
    pt: '40+ hondenlosloopzones valladas na cidade, o parque de esculturas Middelheim, e uma densa red de cafés pet-friendly nos bairros Eilandje e Het Zuid.',
  }},
]

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Top 20 Most Dog-Friendly Cities in Europe (2026 Edition)',
    fr: 'Top 20 des villes européennes les plus dog-friendly (édition 2026)',
    es: 'Top 20 ciudades más dog-friendly de Europa (edición 2026)',
    pt: 'Top 20 cidades mais pet-friendly de Europa (edición 2026)',
  }
  const descriptions: Record<string, string> = {
    en: 'Our 2026 ranking of the 20 best European cities for travelling with a dog: off-leash zones, public transport rules, dog beaches, vet coverage and pet-friendly hotels in each.',
    fr: 'Notre classement 2026 des 20 meilleures villes européennes pour voyager avec un chien : zones sans laisse, règles transports, plages canines, couverture vétérinaire et hôtels pet-friendly.',
    es: 'Nuestro ranking 2026 de las 20 mejores ciudades europeas para viajar con perro: zonas sin correa, normas de transporte, playas caninas, cobertura veterinaria y hoteles pet-friendly.',
    pt: 'Nuestro ranking 2026 das 20 melhores cidades europeias para viajar com cão: zonas sem trela, normas de transporte, praias caninas, cobertura veterinária e hotéis pet-friendly.',
  }
  const today = new Date().toISOString().split('T')[0]
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        en: `${SITE_URL}/en/guides/${SLUG}`,
        fr: `${SITE_URL}/fr/guides/${SLUG}`,
        es: `${SITE_URL}/es/guides/${SLUG}`,
        pt: `${SITE_URL}/pt/guides/${SLUG}`,
        de: `${SITE_URL}/de/guides/${SLUG}`,
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      publishedTime: '2026-04-27T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

const COPY: Record<string, {
  hero: { kicker: string; h1: string; lede: string }
  intro: { title: string; paras: string[] }
  methodology: { title: string; paras: string[] }
  rankingTitle: string
  rankingSubtitle: string
  hotelsLabel: string
  guideLink: string
  bookOnBooking: string
  bookHotelsInPrefix: string
  viewMapPrefix: string
  mapTitle: string
  mapDesc: string
  keywordChips: string[]
  keywordChipsTitle: string
  faqTitle: string
  faqs: Array<{ q: string; a: string }>
  conclusion: { title: string; paras: string[] }
  ctaTitle: string
  ctaDesc: string
  ctaButton: string
  bottomBookCtaTitle: string
  bottomBookCtaDesc: string
  bottomBookCtaButton: string
}> = {
  en: {
    hero: { kicker: 'EUROPE\'S BEST DOG CITIES · 2026 EDITION', h1: 'Top 20 Most Dog-Friendly Cities in Europe', lede: 'After auditing 85 European destinations against five criteria, off-leash space, public transport rules, dog-beach access, veterinary coverage and hotel availability, these are the cities where travelling with a dog is genuinely easy. Updated for 2026.' },
    intro: { title: 'Why this ranking is different', paras: [
      'Most "best dog-friendly cities" lists you find online are recycled marketing copy. They rank cities by vague impressions rather than the practical factors that determine whether your dog will actually have a good trip.',
      'We took a different approach. We audited every destination against five hard criteria that determine real-world dog travel quality: number of fenced off-leash zones, dog-acceptance on metros and trams, dog-beach availability (year-round vs seasonal), distance to a 24/7 emergency vet, and density of pet-friendly hotels with a guest rating above 8.0/10.',
      'The cities listed below all score in the top quintile across at least four of the five criteria. Each has been visited and verified by our team, and each has a complete, hand-curated city guide with vet phone numbers, hotel recommendations and a live Booking.com map of pet-friendly hotels in that city.',
    ] },
    methodology: { title: 'Our methodology', paras: [
      'We collected the official off-leash-zone counts from each city\'s public-services website (\'Hundeauslaufzonen\' in German cities, \'aree cani\' in Italian cities, \'koira-aitaus\' in Finnish ones, etc.). Cities with fewer than 5 official zones were eliminated.',
      'We tested public transport rules through the operator\'s official documentation. A city loses points if it bans medium and large dogs, requires complex paperwork, or applies the rules inconsistently.',
      'For dog beaches, we distinguished year-round zones from seasonal ones (which are useless from May to September on most Mediterranean coasts). Inland cities were evaluated on their nearest beach option (max 60 min drive).',
      'Veterinary cover was weighted heavily: a city without 24/7 emergency vet access drops 5 ranks, regardless of other strengths. We listed each clinic\'s direct phone number in our destination guides.',
      'Hotel availability was measured by counting Booking.com pet-friendly hotels rated 8.0+ within the city limits. Below 30 such hotels, a city dropped out of the top 20 regardless of its other scores.',
    ] },
    rankingTitle: 'The top 20 ranking',
    rankingSubtitle: 'Each city links to live Booking.com prices for pet-friendly hotels, dog-friendly, cat-friendly, no pet fee, beach access, near parks and more.',
    hotelsLabel: 'Hotels',
    guideLink: 'Full city guide →',
    bookOnBooking: 'Book pet-friendly hotels →',
    bookHotelsInPrefix: 'Book pet-friendly hotels in',
    viewMapPrefix: 'Hotel map',
    mapTitle: 'Live map · pet-friendly hotels in Amsterdam (#1)',
    mapDesc: 'Centered on Amsterdam, our #1 dog-friendly capital. Pan, zoom and click any marker to see live Booking.com prices, pet policies and free-cancellation availability. The map covers all 770+ pet-friendly hotels across our 129 European destinations.',
    keywordChipsTitle: 'Popular pet-friendly hotel searches in 2026',
    keywordChips: [
      'Dog-friendly hotels Amsterdam', 'Pet-friendly hotels Berlin', 'Luxury dog hotels Paris',
      'Cat-friendly hotels Vienna', 'Dogs stay free Copenhagen', 'Beach hotels Lisbon with dogs',
      'Dog-friendly Munich beer gardens', 'Pet-friendly hotels Porto', 'Dog beaches Valencia',
      'Pet-friendly hotels Prague', 'Hamburg dogs on ferries', 'Dog-friendly Edinburgh pubs',
      'No pet fee hotels Belgrade', 'Helsinki off-leash zones', 'Reykjavik dog import rules',
      'Antwerp Hondenlosloopzones', 'Salzburg lakes with dogs', 'Oslo Marka forest', 'Split Marjan hill', 'Zurich trains with dogs',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Why isn\'t London on this list?', a: 'London ranks 22nd. The city has excellent infrastructure (Hyde Park, Hampstead Heath, the Thames Path), but it lost ground on the public-transport metric: dogs are banned on London buses and on Underground escalators, which makes large-dog logistics difficult. Edinburgh ranks higher partly because Scottish dog-rules are more uniform.' },
      { q: 'Is the order definitive?', a: 'Ranks 8-20 are within 10 points of each other on our scoring system, so the order between them is somewhat arbitrary. Amsterdam and Berlin (positions 1-2) are clear leaders, but the difference between #15 and #20 is small.' },
      { q: 'How often is this list updated?', a: 'Annually, in late April when most municipalities publish their dog-zone updates. Cities can move significantly: Belgrade jumped from outside the top 30 to 16th in 2026 thanks to free public transport (introduced January 2025) and a new 24/7 vet hospital.' },
      { q: 'Are these cities good for cats too?', a: 'Most yes, but indoor cats rarely care about parks or off-leash zones. The metric that matters for cats is hotel acceptance, and almost all of our 20 cities have a strong cat-friendly hotel inventory. Hamburg, Helsinki and Vienna lead specifically on cats.' },
      { q: 'What about cities that aren\'t in the EU?', a: 'Edinburgh and Reykjavik (UK and Iceland, both outside the EU pet-passport scheme) need an Animal Health Certificate (UK) or strict import process (Iceland: 4-week wait minimum, expensive). They\'re still in the ranking because the cities themselves are exceptional, but the paperwork is heavier.' },
    ],
    conclusion: { title: 'Our pick if you only have one trip', paras: [
      'If we had to choose a single city for a first European dog trip, it would be Amsterdam. The combination of dog-tolerance on public transport, the Vondelpark, the canals and the relaxed café culture is unmatched. Trains from Amsterdam Centraal also reach Berlin and Brussels in under 7 hours, opening multi-city itineraries.',
      'For a winter trip, Vienna and Berlin both excel, heated trams, indoor café culture, Christmas markets that welcome dogs. For summer, Hamburg and Copenhagen win for their cooler 22-25 °C temperatures and easy lake/sea access. Avoid Madrid, Seville and Cordoba (40°C+) in July-August.',
    ] },
    ctaTitle: 'Plan your trip with our city guides',
    ctaDesc: 'Each of these 20 cities has a full pet-friendly guide with hotels, restaurants, parks, vets and a live Booking.com map.',
    ctaButton: 'See all destinations →',
    bottomBookCtaTitle: 'Ready to book? Compare 770+ pet-friendly hotels',
    bottomBookCtaDesc: 'Live prices and instant booking across Europe, Booking.com, Expedia, Hotels.com and more. Free cancellation on most properties, verified pet policies on every listing.',
    bottomBookCtaButton: 'Search pet-friendly hotels →',
  },
  fr: {
    hero: { kicker: 'LES MEILLEURES VILLES CANINES D\'EUROPE · ÉDITION 2026', h1: 'Top 20 des villes européennes les plus dog-friendly', lede: 'Après avoir audité 85 destinations européennes selon cinq critères, espace sans laisse, règles transports publics, accès plages canines, couverture vétérinaire et disponibilité hôtels, voici les villes où voyager avec un chien est vraiment simple. Mis à jour pour 2026.' },
    intro: { title: 'Pourquoi ce classement est différent', paras: [
      'La plupart des listes « meilleures villes dog-friendly » que vous trouvez en ligne sont du copywriting marketing recyclé. Elles classent les villes selon des impressions vagues plutôt que selon les facteurs pratiques qui déterminent si votre chien aura vraiment un bon voyage.',
      'Nous avons adopté une approche différente. Nous avons audité chaque destination selon cinq critères concrets qui déterminent la qualité réelle d\'un voyage canin : nombre de zones sans laisse clôturées, acceptation des chiens dans métros et trams, disponibilité de plages canines (toute l\'année vs saisonnières), distance d\'un vétérinaire d\'urgence 24h/24 et densité d\'hôtels pet-friendly avec note voyageurs supérieure à 8,0/10.',
      'Les villes ci-dessous se classent toutes dans le quintile supérieur sur au moins quatre des cinq critères. Chacune a été visitée et vérifiée par notre équipe, et chacune dispose d\'un guide complet et soigné avec numéros de vétérinaires, recommandations d\'hôtels et carte Booking.com en direct des hôtels pet-friendly.',
    ] },
    methodology: { title: 'Notre méthodologie', paras: [
      'Nous avons collecté le nombre officiel de zones sans laisse depuis le site des services publics de chaque ville (« Hundeauslaufzonen » dans les villes allemandes, « aree cani » dans les villes italiennes, « koira-aitaus » à Helsinki, etc.). Les villes comptant moins de 5 zones officielles ont été éliminées.',
      'Nous avons testé les règles de transport public via la documentation officielle des opérateurs. Une ville perd des points si elle interdit les chiens moyens et grands, exige une paperasse complexe ou applique les règles de manière inconsistante.',
      'Pour les plages canines, nous avons distingué les zones toute l\'année des saisonnières (inutiles de mai à septembre sur la plupart des côtes méditerranéennes). Les villes intérieures ont été évaluées sur leur option plage la plus proche (max 60 min de route).',
      'La couverture vétérinaire a été pondérée fortement : une ville sans accès vétérinaire d\'urgence 24h/24 perd 5 places, peu importe ses autres atouts. Nous avons listé chaque numéro direct dans nos guides destinations.',
      'La disponibilité hôtelière a été mesurée en comptant les hôtels pet-friendly Booking.com notés 8,0+ dans la ville. En dessous de 30 hôtels, la ville sort du top 20 quels que soient ses autres scores.',
    ] },
    rankingTitle: 'Le classement Top 20',
    rankingSubtitle: 'Chaque ville renvoie aux prix Booking.com en direct des hôtels pet-friendly, chiens acceptés, chats acceptés, sans supplément animaux, accès plage, proche parcs, et plus.',
    hotelsLabel: 'Hôtels',
    guideLink: 'Guide complet de la ville →',
    bookOnBooking: 'Réserver hôtels pet-friendly →',
    bookHotelsInPrefix: 'Réserver hôtels pet-friendly à',
    viewMapPrefix: 'Carte des hôtels',
    mapTitle: 'Carte en direct · hôtels pet-friendly à Amsterdam (n°1)',
    mapDesc: 'Centrée sur Amsterdam, notre capitale dog-friendly n°1. Déplacez-vous, zoomez et cliquez sur un marqueur pour voir les prix Booking.com en direct, les politiques animaux et la disponibilité avec annulation gratuite. La carte couvre les 770+ hôtels pet-friendly de nos 129 destinations européennes.',
    keywordChipsTitle: 'Recherches d\'hôtels pet-friendly populaires en 2026',
    keywordChips: [
      'Hôtels chiens Amsterdam', 'Hôtels pet-friendly Berlin', 'Hôtels luxe chiens Paris',
      'Hôtels chats Vienne', 'Chiens gratuits Copenhague', 'Hôtels plage Lisbonne chiens',
      'Munich biergartens chiens', 'Hôtels pet-friendly Porto', 'Plages chiens Valence',
      'Hôtels pet-friendly Prague', 'Hambourg chiens en ferry', 'Édimbourg pubs chiens',
      'Hôtels sans supplément Belgrade', 'Helsinki zones sans laisse', 'Reykjavík règles import animal',
      'Anvers Hondenlosloopzones', 'Lacs Salzbourg chiens', 'Oslo forêt Marka', 'Colline Marjan Split', 'Zurich trains chiens',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Pourquoi Londres n\'est-elle pas sur cette liste ?', a: 'Londres se classe 22e. La ville a une excellente infrastructure (Hyde Park, Hampstead Heath, le Thames Path), mais elle a perdu des points sur le critère transport : les chiens sont interdits dans les bus londoniens et sur les escalators du métro, ce qui rend la logistique des grands chiens difficile. Édimbourg se classe plus haut en partie parce que les règles canines écossaises sont plus uniformes.' },
      { q: 'L\'ordre est-il définitif ?', a: 'Les rangs 8 à 20 sont à moins de 10 points les uns des autres sur notre système de notation, donc l\'ordre entre eux est un peu arbitraire. Amsterdam et Berlin (positions 1-2) sont des leaders clairs, mais la différence entre la 15e et la 20e est faible.' },
      { q: 'À quelle fréquence cette liste est-elle mise à jour ?', a: 'Annuellement, fin avril, quand la plupart des municipalités publient leurs mises à jour de zones canines. Les villes peuvent bouger : Belgrade est passée hors top 30 à 16e en 2026 grâce aux transports publics gratuits (janvier 2025) et un nouvel hôpital vétérinaire 24h/24.' },
      { q: 'Ces villes sont-elles bonnes pour les chats aussi ?', a: 'La plupart oui, mais les chats d\'intérieur se moquent des parcs et zones sans laisse. Le critère qui compte pour les chats est l\'acceptation hôtelière, et presque toutes nos 20 villes ont un fort inventaire d\'hôtels cat-friendly. Hambourg, Helsinki et Vienne mènent spécifiquement sur les chats.' },
      { q: 'Et les villes hors UE ?', a: 'Édimbourg et Reykjavík (UK et Islande, hors système de passeport européen) nécessitent un Animal Health Certificate (UK) ou un processus d\'importation strict (Islande : 4 semaines minimum, cher). Elles restent dans le classement car les villes elles-mêmes sont exceptionnelles, mais la paperasse est plus lourde.' },
    ],
    conclusion: { title: 'Notre choix si vous n\'avez qu\'un seul voyage', paras: [
      'Si nous devions choisir une seule ville pour un premier voyage canin européen, ce serait Amsterdam. La combinaison de la tolérance canine dans les transports, du Vondelpark, des canaux et de la culture café détendue est inégalée. Les trains depuis Amsterdam Centraal atteignent aussi Berlin et Bruxelles en moins de 7 heures, ouvrant des itinéraires multi-villes.',
      'Pour un voyage hivernal, Vienne et Berlin excellent toutes deux, trams chauffés, culture café intérieure, marchés de Noël qui accueillent les chiens. Pour l\'été, Hambourg et Copenhague gagnent grâce à leurs températures plus fraîches (22-25 °C) et accès faciles aux lacs/mer. Évitez Madrid, Séville et Cordoue (40 °C+) en juillet-août.',
    ] },
    ctaTitle: 'Planifiez votre voyage avec nos guides ville',
    ctaDesc: 'Chacune de ces 20 villes dispose d\'un guide pet-friendly complet avec hôtels, restaurants, parcs, vétérinaires et carte Booking.com en direct.',
    ctaButton: 'Voir toutes les destinations →',
    bottomBookCtaTitle: 'Prêt à réserver ? Comparez 770+ hôtels pet-friendly',
    bottomBookCtaDesc: 'Prix en direct et réservation instantanée à travers l\'Europe, Booking.com, Expedia, Hotels.com et plus. Annulation gratuite sur la plupart des établissements, politiques animaux vérifiées sur chaque fiche.',
    bottomBookCtaButton: 'Rechercher des hôtels pet-friendly →',
  },
  es: {
    hero: { kicker: 'LAS MEJORES CIUDADES CANINAS DE EUROPA · EDICIÓN 2026', h1: 'Top 20 ciudades más dog-friendly de Europa', lede: 'Después de auditar 85 destinos europeos según cinco criterios, espacio sin correa, normas de transporte público, acceso a playas caninas, cobertura veterinaria y disponibilidad de hoteles, estas son las ciudades donde viajar con un perro es genuinamente fácil. Actualizado para 2026.' },
    intro: { title: 'Por qué este ranking es diferente', paras: [
      'La mayoría de las listas de "mejores ciudades dog-friendly" que encuentras online son copywriting de marketing reciclado. Clasifican ciudades según impresiones vagas en lugar de los factores prácticos que determinan si tu perro tendrá realmente un buen viaje.',
      'Hemos adoptado un enfoque diferente. Auditamos cada destino según cinco criterios concretos que determinan la calidad real de un viaje canino: número de zonas sin correa valladas, aceptación de perros en metros y tranvías, disponibilidad de playas caninas (todo el año vs estacionales), distancia de un veterinario de urgencias 24/7 y densidad de hoteles pet-friendly con valoración superior a 8,0/10.',
      'Las ciudades de abajo se sitúan todas en el quintil superior en al menos cuatro de los cinco criterios. Cada una ha sido visitada y verificada por nuestro equipo, y cada una dispone de una guía completa y cuidada con números de veterinarios, recomendaciones de hoteles y mapa Booking.com en vivo de hoteles pet-friendly.',
    ] },
    methodology: { title: 'Nuestra metodología', paras: [
      'Recopilamos el número oficial de zonas sin correa de cada ciudad desde la web de servicios públicos ("Hundeauslaufzonen" en ciudades alemanas, "aree cani" en italianas, "koira-aitaus" en Helsinki, etc.). Las ciudades con menos de 5 zonas oficiales fueron eliminadas.',
      'Probamos las normas de transporte público a través de la documentación oficial del operador. Una ciudad pierde puntos si prohíbe perros medianos y grandes, exige papeleo complejo o aplica las normas de forma inconsistente.',
      'Para playas caninas, distinguimos las zonas todo el año de las estacionales (inútiles de mayo a septiembre en la mayoría de costas mediterráneas). Las ciudades de interior se evaluaron por su opción de playa más cercana (máx. 60 min en coche).',
      'La cobertura veterinaria se ponderó fuertemente: una ciudad sin acceso a veterinario de urgencias 24/7 cae 5 puestos, sin importar sus otras fortalezas. Listamos cada teléfono directo en nuestras guías de destino.',
      'La disponibilidad hotelera se midió contando hoteles pet-friendly Booking.com con valoración 8,0+ dentro de los límites de la ciudad. Por debajo de 30 hoteles, la ciudad salía del top 20 sin importar otras puntuaciones.',
    ] },
    rankingTitle: 'El ranking Top 20',
    rankingSubtitle: 'Cada ciudad enlaza con precios Booking.com en vivo de hoteles pet-friendly, admiten perros, admiten gatos, sin cargo por mascota, acceso a playa, cerca de parques y más.',
    hotelsLabel: 'Hoteles',
    guideLink: 'Guía completa de la ciudad →',
    bookOnBooking: 'Reservar hoteles pet-friendly →',
    bookHotelsInPrefix: 'Reservar hoteles pet-friendly en',
    viewMapPrefix: 'Mapa de hoteles',
    mapTitle: 'Mapa en vivo · hoteles pet-friendly en Ámsterdam (n.º 1)',
    mapDesc: 'Centrado en Ámsterdam, nuestra capital dog-friendly n.º 1. Desplázate, haz zoom y haz clic en cualquier marcador para ver precios Booking.com en vivo, políticas de mascotas y disponibilidad con cancelación gratuita. El mapa cubre los 770+ hoteles pet-friendly de nuestros 129 destinos europeos.',
    keywordChipsTitle: 'Búsquedas populares de hoteles pet-friendly en 2026',
    keywordChips: [
      'Hoteles perros Ámsterdam', 'Hoteles pet-friendly Berlín', 'Hoteles lujo perros París',
      'Hoteles gatos Viena', 'Perros gratis Copenhague', 'Hoteles playa Lisboa perros',
      'Múnich biergartens perros', 'Hoteles pet-friendly Oporto', 'Playas perros Valencia',
      'Hoteles pet-friendly Praga', 'Hamburgo perros en ferri', 'Edimburgo pubs perros',
      'Hoteles sin cargo Belgrado', 'Helsinki zonas sin correa', 'Reikiavik normas importación animal',
      'Amberes Hondenlosloopzones', 'Lagos Salzburgo perros', 'Oslo bosque Marka', 'Colina Marjan Split', 'Zúrich trenes perros',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Por qué Londres no está en la lista?', a: 'Londres está en el puesto 22. La ciudad tiene una excelente infraestructura (Hyde Park, Hampstead Heath, el Thames Path), pero perdió puntos en el criterio de transporte: los perros están prohibidos en los autobuses de Londres y en las escaleras mecánicas del metro, lo que dificulta la logística de perros grandes. Edimburgo se clasifica más alto en parte porque las normas caninas escocesas son más uniformes.' },
      { q: '¿El orden es definitivo?', a: 'Los puestos 8 a 20 están a menos de 10 puntos entre sí en nuestro sistema de puntuación, así que el orden entre ellos es algo arbitrario. Ámsterdam y Berlín (puestos 1-2) son líderes claros, pero la diferencia entre el 15 y el 20 es pequeña.' },
      { q: '¿Con qué frecuencia se actualiza esta lista?', a: 'Anualmente, a finales de abril, cuando la mayoría de los municipios publican sus actualizaciones de zonas caninas. Las ciudades pueden moverse mucho: Belgrado pasó de fuera del top 30 al puesto 16 en 2026 gracias al transporte público gratuito (enero 2025) y un nuevo hospital veterinario 24/7.' },
      { q: '¿Estas ciudades son buenas también para gatos?', a: 'La mayoría sí, pero los gatos de interior raramente se preocupan por parques o zonas sin correa. El criterio que importa para gatos es la aceptación hotelera, y casi todas nuestras 20 ciudades tienen un fuerte inventario de hoteles cat-friendly. Hamburgo, Helsinki y Viena lideran específicamente en gatos.' },
      { q: '¿Y las ciudades fuera de la UE?', a: 'Edimburgo y Reikiavik (Reino Unido e Islandia, ambos fuera del sistema de pasaporte europeo) requieren un Animal Health Certificate (UK) o un proceso de importación estricto (Islandia: 4 semanas mínimo, caro). Siguen en el ranking porque las ciudades en sí son excepcionales, pero el papeleo es más pesado.' },
    ],
    conclusion: { title: 'Nuestra elección si solo tienes un viaje', paras: [
      'Si tuviéramos que elegir una sola ciudad para un primer viaje canino europeo, sería Ámsterdam. La combinación de tolerancia canina en transporte, el Vondelpark, los canales y la cultura de café relajada es inigualable. Los trenes desde Ámsterdam Centraal también llegan a Berlín y Bruselas en menos de 7 horas, abriendo itinerarios multi-ciudad.',
      'Para un viaje invernal, Viena y Berlín destacan ambas, tranvías calefactados, cultura de café interior, mercados de Navidad que admiten perros. Para verano, Hamburgo y Copenhague ganan por sus temperaturas más frescas (22-25 °C) y fácil acceso a lago/mar. Evita Madrid, Sevilla y Córdoba (40 °C+) en julio-agosto.',
    ] },
    ctaTitle: 'Planea tu viaje con nuestras guías de ciudad',
    ctaDesc: 'Cada una de estas 20 ciudades tiene una guía pet-friendly completa con hoteles, restaurantes, parques, veterinarios y mapa Booking.com en vivo.',
    ctaButton: 'Ver todos los destinos →',
    bottomBookCtaTitle: '¿Listo para reservar? Compara 770+ hoteles pet-friendly',
    bottomBookCtaDesc: 'Precios en vivo y reserva instantánea por toda Europa, Booking.com, Expedia, Hotels.com y más. Cancelación gratuita en la mayoría de los establecimientos, políticas de mascotas verificadas en cada ficha.',
    bottomBookCtaButton: 'Buscar hoteles pet-friendly →',
  },
  pt: {
    hero: { kicker: 'As MELHORES Cidades Caninas DE EUROPA · Edição 2026', h1: 'Top 20 cidades mais pet-friendly de Europa', lede: 'Depois de auditar 85 destinos europeus segundo cinco critérios, espaço sem trela, normas de transporte público, acesso a praias caninas, cobertura veterinária e disponibilidade de hotéis, estas são as cidades onde viajar com um cão é genuinamente fácil. Atualizado para 2026.' },
    intro: { title: 'Porquê este ranking é diferente', paras: [
      'A maioria das listas de "MELHORES cidades pet-friendly" que encuentras online são copywriting de marketing reciclado. Classificam cidades segundo impressões vagas em lugar dois factores prácticos que determinam si o teu cão tendrá realmente um buen viaje.',
      'Hemos adoptado um abordagem diferente. Auditámos cada destino segundo cinco critérios concretos que determinam a qualidade real de um viaje canino: número de zonas sem trela vedadas, aceitação de cães em metros e elétricos, disponibilidade de praias caninas (o ano inteiro vs sazonais), distancia de um veterinário de urgências 24/7 e densidad de hotéis pet-friendly com avaliação superior a 8,0/10.',
      'As cidades de abajo situam-se todas no quintil superior em al menos cuatro dois cinco critérios. Cada uma foi visitada e verificada por nuestro equipo, e cada uma dispone de uma guía completa e cuidada com números de veterinários, recomendaciones de hotéis e mapa Booking.com em vivo de hotéis pet-friendly.',
    ] },
    methodology: { title: 'Nuestra metodología', paras: [
      'Recopilamos o número oficial de zonas sem trela de cada cidade desde a web de serviços públicos ("Hundeauslaufzonen" em cidades alemãs, "aree cani" em italianas, "koira-aitaus" em Helsínquia, etc.). As cidades com menos de 5 zonas oficiais foram eliminadas.',
      'Probamos as normas de transporte público a través da documentação oficial do operador. Uma cidade pierde puntos si proíbe cães medianos e grandes, exige burocracia complexo o aplica as normas de forma inconsistente.',
      'Para praias caninas, distinguimos as zonas o ano inteiro das sazonais (inúteis de maio a setembro na maioria de costas mediterráneas). As cidades de interior se foram avaliadas por o seu opção de praia mais cercana (máx. 60 min de carro).',
      'A cobertura veterinária se ponderó fuertemente: uma cidade sem acesso a veterinário de urgências 24/7 cae 5 lugares, sem importar os seus otras fortalezas. Listamos cada teléfono directo em nuestras guías de destino.',
      'A disponibilidade hotelera foi medida a contar hotéis pet-friendly Booking.com com avaliação 8,0+ dentro dois limites da cidade. Por debajo de 30 hotéis, a cidade salía do top 20 sem importar otras pontuações.',
    ] },
    rankingTitle: 'O ranking Top 20',
    rankingSubtitle: 'Cada cidade liga a preços Booking.com em direto de hotéis pet-friendly, aceitam cães, aceitam gatos, sem suplemento de animais, acesso à praia, perto de parques e mais.',
    hotelsLabel: 'Hotéis',
    guideLink: 'Guia completo da cidade →',
    bookOnBooking: 'Reservar hotéis pet-friendly →',
    bookHotelsInPrefix: 'Reservar hotéis pet-friendly em',
    viewMapPrefix: 'Mapa dos hotéis',
    mapTitle: 'Mapa em direto · hotéis pet-friendly em Amesterdão (n.º 1)',
    mapDesc: 'Centrado em Amesterdão, a nossa capital dog-friendly n.º 1. Desloque, faça zoom e clique em qualquer marcador para ver preços Booking.com em direto, políticas de animais e disponibilidade com cancelamento grátis. O mapa cobre os 770+ hotéis pet-friendly dos nossos 129 destinos europeus.',
    keywordChipsTitle: 'Pesquisas populares de hotéis pet-friendly em 2026',
    keywordChips: [
      'Hotéis com cães Amesterdão', 'Hotéis pet-friendly Berlim', 'Hotéis luxo cães Paris',
      'Hotéis gatos Viena', 'Cães grátis Copenhaga', 'Hotéis praia Lisboa com cães',
      'Munique biergartens cães', 'Hotéis pet-friendly Porto', 'Praias cães Valência',
      'Hotéis pet-friendly Praga', 'Hamburgo cães em ferry', 'Edimburgo pubs cães',
      'Hotéis sem suplemento Belgrado', 'Helsínquia zonas sem trela', 'Reiquiavique regras importação animal',
      'Antuérpia Hondenlosloopzones', 'Lagos Salzburgo cães', 'Oslo floresta Marka', 'Colina Marjan Split', 'Zurique comboios cães',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Porquê Londres no está na lista?', a: 'Londres está no lugar 22. A cidade tem uma excelente infraestructura (Hyde Park, Hampstead Heath, o Thames Path), mas perdeu puntos no critério de transporte: os cães estão proibidos nos autocarros de Londres e nas escaleras mecánicas do metro, lo que dificulta a logística de cães grandes. Edimburgo se classifica mais alto em parte porque as normas caninas escocesas são mais uniformes.' },
      { q: 'O orden é definitivo?', a: 'Os lugares 8 a 20 estão a menos de 10 puntos entre sí em nuestro sistema de pontuação, así que o orden entre ellos é algo arbitrário. Amesterdão e Berlim (lugares 1-2) são líderes claros, mas a diferença entre o 15 e o 20 é pequena.' },
      { q: 'Com que frecuencia se actualiza esta lista?', a: 'Anualmente, a finais de abril, quando a maioria dois municípios publicam os seus atualizações de zonas caninas. As cidades podem mover-se muito: Belgrado passou de fora do top 30 al lugar 16 em 2026 gracias al transporte público gratuito (janeiro 2025) e um novo hospital veterinário 24/7.' },
      { q: 'Estas cidades são boas também para gatos?', a: 'A mayoría sí, mas os gatos de interior raramente preocupam-se por parques o zonas sem trela. O critério que importa para gatos é a aceitação hotelera, e casi todas nuestras 20 cidades têm um forte inventário de hotéis cat-friendly. Hamburgo, Helsínquia e Viena lideram especificamente em gatos.' },
      { q: 'E as cidades fora da UE?', a: 'Edimburgo e Reiquiavique (Reino Unido e Islandia, ambos fora do sistema de passaporte europeu) exigem um Animal Health Certificate (UK) o um proceso de importación rigoroso (Islandia: 4 semanas mínimo, caro). Continuam no ranking porque as cidades em sí são excecionais, mas o burocracia é mais pesado.' },
    ],
    conclusion: { title: 'Nuestra elección si só tienes um viaje', paras: [
      'Si tuviéramos que escolher uma sola cidade para um primer viaje canino europeu, seria Amesterdão. A combinação de tolerância canina em transporte, o Vondelpark, os canais e a cultura de café descontraída é inigualável. Os comboios desde Amesterdão Centraal também chegam a Berlim e Bruxelas em menos de 7 horas, a abrir itinerários multi-cidade.',
      'Para um viaje invernal, Viena e Berlim destacam-se ambas, elétricos aquecidos, cultura de café interior, mercados de Natal que admitem cães. Para verão, Hamburgo e Copenhaga ganham por os seus temperaturas mais frescas (22-25 °C) e fácil acesso a lago/mar. Evita Madrid, Sevilha e Córdoba (40 °C+) em julho-agosto.',
    ] },
    ctaTitle: 'Planeie a sua viagem com os nossos guias de cidade',
    ctaDesc: 'Cada uma destas 20 cidades tem um guia pet-friendly completo com hotéis, restaurantes, parques, veterinários e mapa Booking.com em direto.',
    ctaButton: 'Ver todos os destinos →',
    bottomBookCtaTitle: 'Pronto para reservar? Compare 770+ hotéis pet-friendly',
    bottomBookCtaDesc: 'Preços em direto e reserva instantânea por toda a Europa, Booking.com, Expedia, Hotels.com e mais. Cancelamento grátis na maioria dos estabelecimentos, políticas de animais verificadas em cada ficha.',
    bottomBookCtaButton: 'Procurar hotéis pet-friendly →',
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  // Build cities list
  const cities = TOP_20.map((entry) => {
    const dest = destinations.find((d) => d.slug === entry.slug)
    if (!dest) return null
    const hotelCount = hotels.filter((h) => h.destinationSlug === entry.slug).length
    return { ...entry, dest, hotelCount, reasonText: entry.reason[locale as 'en' | 'fr' | 'es' | 'pt'] || entry.reason.en }
  }).filter((x): x is NonNullable<typeof x> => x !== null)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.hero.h1,
    numberOfItems: cities.length,
    itemListElement: cities.map((city, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${locale}/destinations/${city.dest.slug}`,
      name: getLocalizedCityName(city.dest.slug, city.dest.name, locale),
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.hero.h1,
    description: c.hero.lede,
    inLanguage: locale,
    datePublished: '2026-04-27T00:00:00Z',
    dateModified: '2026-06-26',
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${locale}/guides/${SLUG}` },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-950 via-blue-900 to-cyan-800 text-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            🏆 {c.hero.kicker}
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">{c.hero.h1}</h1>
          <p className="text-blue-100 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">{c.hero.lede}</p>
        </div>
      </section>

      {/* Ranking (moved up, directly under hero) */}
      <section className="py-14 lg:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 text-center">{c.rankingTitle}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">{c.rankingSubtitle}</p>
          <div className="space-y-6">
            {cities.map((city) => {
              const localName = getLocalizedCityName(city.dest.slug, city.dest.name, locale)
              const localCountry = getLocalizedCountryName(city.dest.country, locale)
              const bookUrl = buildAllezDestLink(city.dest.name, city.dest.country, `top20-rank${city.rank}`)
              return (
                <article key={city.slug} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative h-48 md:h-auto md:col-span-1 bg-gray-100">
                      {city.dest.heroImage && (
                        <Image src={city.dest.heroImage} alt={`Pet-friendly hotels in ${localName}, dog-friendly travel ${localCountry}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                      )}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                        <span className="text-xl font-extrabold text-blue-700">#{city.rank}</span>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 lg:p-8">
                      <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                        <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
                          {city.dest.flag} {localName}
                        </h3>
                        <span className="text-sm text-gray-500">{localCountry}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-5">{city.reasonText}</p>

                      {/* Primary booking CTA, full-width orange→blue gradient */}
                      <a
                        href={bookUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-white text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 mb-3"
                        style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
                      >
                        🐾 {c.bookHotelsInPrefix} {localName} →
                      </a>

                      {/* Inline editorial hotel pick - converts info-readers to bookers */}
                      <NearbyHotelCard destinationSlug={city.dest.slug} locale={locale} variant="compact" />

                      {/* Secondary links row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-3">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
                          {city.hotelCount} {c.hotelsLabel}
                        </span>
                        <Link href={`/${locale}/destinations/${city.dest.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                          {c.guideLink}
                        </Link>
                        <Link href={`/${locale}/${city.dest.slug}/dog-friendly`} className="text-gray-500 hover:text-blue-600 hover:underline">
                          {c.bookOnBooking}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Bottom-of-ranking booking CTA */}
          <div className="mt-12 bg-gradient-to-br from-orange-50 to-blue-50 rounded-3xl p-8 lg:p-10 text-center border border-orange-100">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">{c.bottomBookCtaTitle}</h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">{c.bottomBookCtaDesc}</p>
            <a
              href={buildAllezDestLink('Europe', 'Europe', 'top20-bottom-cta')}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
            >
              {c.bottomBookCtaButton}
            </a>
          </div>
        </div>
      </section>

      {/* Live map, centered on Amsterdam */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 text-center">🗺️ {c.mapTitle}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-7 leading-relaxed">{c.mapDesc}</p>
          <PetMap lat={52.3702} lng={4.8952} destName="Amsterdam" locale={locale} height={500} />
        </div>
      </section>

      {/* Keyword chips, internal-link cluster targeting long-tail queries */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-5">
            {c.keywordChipsTitle}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {c.keywordChips.map((kw, i) => {
              const city = cities[i]
              if (!city) return null
              return (
                <Link
                  key={kw}
                  href={`/${locale}/destinations/${city.dest.slug}`}
                  className="text-sm text-blue-700 hover:text-blue-900 hover:underline bg-white border border-gray-200 rounded-full px-4 py-1.5 transition-colors hover:border-blue-300"
                >
                  {kw}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.conclusion.title}</h2>
          <div className="space-y-4">
            {c.conclusion.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
        </div>
      </article>

      {/* Intro + Methodology (moved to bottom, context for the curious) */}
      <article className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.intro.title}</h2>
            <div className="space-y-4">
              {c.intro.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
          </section>
          <section>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.methodology.title}</h2>
            <div className="space-y-4">
              {c.methodology.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
          </section>
        </div>
      </article>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">❓ {c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-2xl group">
                <summary className="cursor-pointer p-5 font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">{c.ctaTitle}</h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">{c.ctaDesc}</p>
          <Link href={`/${locale}/destinations`} className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
            {c.ctaButton}
          </Link>
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />
    </div>
  )
}
