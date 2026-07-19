import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import TopHotelsStrip from '@/components/TopHotelsStrip'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { getLocalizedCountryName, getAllCountries } from '@/lib/countries'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import categories from '@/data/categories.json'

const SLUG = 'pet-friendly-hotels-europe-guide'

const STICKY_LABELS_HOTELS_EU: Record<string, { label: string; cta: string }> = {
  en: { label: 'Pet-friendly hotels across Europe, live prices', cta: 'See hotels' },
  fr: { label: `Hôtels pet-friendly en Europe, prix en direct`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles pet-friendly en Europa, precios en directo', cta: 'Ver hoteles' },
  pt: { label: `Hotéis pet-friendly na Europa, preços em directo`, cta: 'Ver hotéis' },
}

const SPONSORED_LABEL: Record<string, string> = {
  en: 'SPONSORED · OUR PARTNER SELECTION',
  fr: `PARTENAIRE · SÉLECTION SPONSORISÉE`,
  es: 'PATROCINADO · SELECCIÓN DE PARTNER',
  pt: `PATROCINADO · SELECÇÃO DE PARCEIRO`,
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Pet-Friendly Hotels in Europe: The Complete 2026 Guide',
    fr: 'Hôtels pet-friendly en Europe : le guide complet 2026',
    es: 'Hoteles pet-friendly en Europa: la guía completa 2026',
    pt: 'Hotéis pet-friendly na Europa: o guia completo 2026',
  }
  const totalHotels = hotels.length
  const totalDests = destinations.length
  const descriptions: Record<string, string> = {
    en: `The complete 2026 guide to ${totalHotels}+ pet-friendly hotels across ${totalDests} European destinations: chains that accept dogs, country-by-country pet rules, what to ask before booking, and the best categories for cats, beach access and budget travel.`,
    fr: `Le guide complet 2026 des ${totalHotels}+ hôtels acceptant les animaux dans ${totalDests} destinations européennes : chaînes qui acceptent les chiens, règles pays par pays, questions à poser avant de réserver, et les meilleures catégories pour chats, plages et budget.`,
    es: `La guía completa 2026 de ${totalHotels}+ hoteles que admiten mascotas en ${totalDests} destinos europeos: cadenas que admiten perros, normas país por país, qué preguntar antes de reservar, y las mejores categorías para gatos, playa y presupuesto.`,
    pt: `O guia completo 2026 de ${totalHotels}+ hotéis que aceitam animais em ${totalDests} destinos europeus: cadeias que aceitam cães, regras país a país, o que perguntar antes de reservar, e as melhores categorias para gatos, praia e orçamento.`,
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

type Copy = {
  hero: { kicker: string; h1: string; lede: string }
  toc: { title: string; items: Array<{ id: string; label: string }> }
  whatToLook: { id: string; h2: string; paras: string[]; checks: { title: string; items: string[] } }
  chains: { id: string; h2: string; intro: string; rows: Array<{ chain: string; policy: string; fee: string; note: string }>; columns: { chain: string; policy: string; fee: string; note: string } }
  byCategory: { id: string; h2: string; intro: string }
  byCountry: { id: string; h2: string; intro: string }
  countryNotes: Record<string, string>
  bookingTips: { id: string; h2: string; paras: string[]; bullets: string[] }
  whatToAsk: { id: string; h2: string; intro: string; questions: string[] }
  faqTitle: string
  faqs: Array<{ q: string; a: string }>
  ctaTitle: string
  ctaDesc: string
  ctaButton: string
  hotelLabel: string
  destLabel: string
  viewCategoryLabel: string
  countryDestinationsCta: string
}

const COPY: Record<string, Copy> = {
  en: {
    hero: {
      kicker: 'PILLAR GUIDE · UPDATED 2026',
      h1: 'Pet-Friendly Hotels in Europe: The Complete 2026 Guide',
      lede: 'How to find, evaluate and book a hotel that genuinely welcomes your dog or cat in Europe. Chains that accept pets, country-by-country rules, questions to ask, and our handpicked picks across 85+ destinations.',
    },
    toc: { title: 'In this guide', items: [
      { id: 'what-to-look', label: 'What "pet-friendly" really means' },
      { id: 'chains', label: 'The 12 most reliable chains' },
      { id: 'by-category', label: 'By trip category' },
      { id: 'by-country', label: 'By country: rules & fees' },
      { id: 'booking-tips', label: 'Booking tips that save money' },
      { id: 'what-to-ask', label: '10 questions to ask before booking' },
      { id: 'faq', label: 'FAQ' },
    ] },
    whatToLook: {
      id: 'what-to-look',
      h2: 'What "pet-friendly" really means',
      paras: [
        'The phrase is unregulated. Booking.com, Hotels.com and Airbnb all let properties self-tag as pet-friendly without verification, so a single listing can mean anything from a five-star with a pet concierge to a hostel that grudgingly accepts a dog after a £40 deposit. Our job is to filter the noise.',
        'By our standard, a genuinely pet-friendly hotel meets at least four of the six criteria below. These criteria eliminate roughly two-thirds of "pet-friendly" listings on Booking.com. Every hotel in our 85+ destination guides has been audited against the same checklist before inclusion.',
      ],
      checks: {
        title: 'Our 6-point pet-friendly checklist',
        items: [
          'Pets accepted in standard rooms, not segregated to one specific room',
          'No breed-specific bans beyond local PPP / dangerous-dog law',
          'Pet fee under €30 per stay, or under €15 per night',
          'Water bowls or a pet bed available on request',
          'Dog can stay in the room while you go out, no kennel-during-day rule',
          'Off-leash green space within a 500 m walk',
        ],
      },
    },
    chains: {
      id: 'chains',
      h2: 'The 12 most reliable pet-friendly hotel chains in Europe',
      intro: 'Chain hotels are the safest bet for multi-city itineraries because they apply the same pet policy at every property. We exclude chains where pet acceptance is delegated to individual managers (which, sadly, is most of them, including Marriott in many regions).',
      rows: [
        { chain: 'Adina Apartment Hotels', policy: 'Selected apartments', fee: '€15/night', note: 'Kitchenettes, useful for pet meals' },
        { chain: 'Apex Hotels (UK)', policy: 'Chain-wide', fee: '£20/stay', note: 'Indoor pools, central UK locations' },
        { chain: 'Hilton (Pet Welcome)', policy: 'Most properties; verify per hotel', fee: '€30–€75/stay', note: 'Higher fee, luxury level' },
        { chain: 'Holiday Inn / Express (IHG)', policy: 'Most properties', fee: '€15–€20/night', note: 'Reliable mid-range, ubiquitous' },
        { chain: 'Hospes Hotels', policy: 'Chain-wide', fee: '€25/stay', note: '5-star Spanish boutique chain' },
        { chain: 'Hotel Indigo (IHG)', policy: 'Chain-wide', fee: '€25/stay', note: 'Boutique 4-star, urban' },
        { chain: 'Mercure (Accor)', policy: 'Most properties', fee: '€10–€20/night', note: 'Strong France / Italy network' },
        { chain: 'Motel One', policy: 'Chain-wide since 2024', fee: '€10/night', note: 'Budget design hotels, growing fast' },
        { chain: '25hours Hotels', policy: 'Chain-wide, pet kit included', fee: '€20/stay', note: 'Design 4-star, bowls provided' },
        { chain: 'Scandic Hotels', policy: 'Chain-wide', fee: '€20/stay', note: 'Strong Nordic + German network' },
        { chain: 'Travelodge', policy: 'Most UK properties', fee: '£25/stay', note: 'UK budget chain, max 2 pets per room' },
        { chain: 'NH Hotels / NH Collection', policy: 'Chain-wide', fee: '€20–€25/night', note: 'Strong Spain, Italy, Germany footprint' },
      ],
      columns: { chain: 'Chain', policy: 'Policy', fee: 'Pet fee', note: 'Note' },
    },
    byCategory: {
      id: 'by-category',
      h2: 'By category: which type of stay suits your trip',
      intro: 'Pet acceptance is only the entry ticket. A beach holiday with a dog needs different criteria than a city break with a cat. Browse our six categories below, each filtered across 85+ destinations.',
    },
    byCountry: {
      id: 'by-country',
      h2: 'By country: rules and pet-fee culture',
      intro: 'Hotel pet policies vary across Europe, both the typical fee and the local enforcement style. Below is the practical reality country by country, drawn from our audit of 460+ hotels.',
    },
    countryNotes: {
      France: 'Over 50% of hotels accept pets, average fee €15–€25 per stay. Independent hotels typically cheaper than chains. EU pet-passport rules apply as standard.',
      Germany: 'Leads Europe on dog-friendliness. Hotels rarely refuse, average €10–€20 per night. Berlin, Hamburg and Munich have the highest chain density. Dogs in restaurants are normal.',
      Spain: 'Pet acceptance has grown fast; average fee €15–€20 per night. Madrid and Barcelona lead on chains. Andalusia is excellent in spring and autumn but summer heat is the main constraint.',
      Italy: 'Italian law (Legge 281/1991) gives dogs strong access rights but hotels apply higher fees than France or Germany, often €25–€40 per stay. Trenitalia accepts dogs with paperwork.',
      'United Kingdom': 'Post-Brexit, dogs entering from the EU need an Animal Health Certificate (10 days validity) plus mandatory tapeworm treatment. Pet fee £25–£50 per stay. Pubs welcoming dogs is the cultural baseline.',
      Netherlands: 'Exceptional pet-friendliness in Amsterdam, Rotterdam and The Hague. Hotels charge €15–€25 per stay. Dogs ride trams and trains for €3.40 day pass.',
      Belgium: 'Strong pet acceptance, especially Antwerp and Ghent. Hotel fees €15–€25. Belgian brasseries are universally dog-tolerant.',
      Portugal: 'Lisbon and Porto are exceptionally dog-friendly. Hotel fees €10–€20 per stay, cheaper than Spain. Trams and trains accept dogs.',
      Switzerland: 'Europe\'s most expensive country but the most consistent pet acceptance. Average CHF 30–50 per night. Trains and cable cars accept dogs free or half price.',
      Austria: 'Very dog-friendly. Vienna and Salzburg lead. Average €10–€20 per night. ÖBB trains accept dogs.',
      Denmark: 'Copenhagen leads Europe on pet welfare. Hotels typically DKK 150–300 per stay. Dogs ride metro and S-tog free with a muzzle.',
      Sweden: 'Stockholm and Gothenburg both pet-welcoming. Hotel fees SEK 200–400 per night. Dogs accepted on trains.',
      Norway: 'Oslo dog culture is intense. Fees NOK 200–500. Dogs free on most public transport.',
      Finland: 'Helsinki has the highest dog density in Europe. Hotels typically free for small dogs, €10–€20 for large. Dogs free on all public transport.',
      Iceland: 'Strict import rules (quarantine bypass needs paperwork and high fees). Once there, Reykjavík is welcoming. Hotels ISK 5,000–8,000 per stay.',
      Ireland: 'Dublin pet-friendliness has improved. Hotels €15–€25. Same UK paperwork rules apply for Northern Ireland.',
      Greece: 'Athens and Thessaloniki improving. Hotels €10–€15 per stay. Beach restrictions tight in summer.',
      'Czech Republic': 'Prague very dog-friendly. Hotels CZK 200–500 per stay. Dogs accepted on metro and trams.',
      Hungary: 'Budapest welcoming. Hotels HUF 3,000–6,000 per stay. Dogs ride metro free with a muzzle.',
      Slovenia: 'Ljubljana and Bled both pet-friendly. Hotels €10–€15.',
      Croatia: 'Dubrovnik and Split improving but beach bans (15 May–30 Sep) are strict. Hotels €10–€20.',
      Poland: 'Warsaw and Krakow have a growing pet-welcome scene. Hotels PLN 50–100 per stay.',
      Latvia: 'Riga improving. Hotels €10–€15.',
      Estonia: 'Tallinn pet-friendly. Hotels around €10.',
      Slovakia: 'Bratislava welcoming. Hotels €10–€15.',
      Romania: 'Bucharest improving rapidly. Hotels RON 30–60 per stay.',
      Bulgaria: 'Sofia welcoming. Hotels BGN 20–40.',
      Serbia: 'Belgrade welcoming, public transport free for dogs since 2025. Hotels RSD 1,500–3,000.',
      Lithuania: 'Vilnius welcoming. Hotels around €10.',
      Luxembourg: 'Pet-friendly. Hotels €15–€25.',
    },
    bookingTips: {
      id: 'booking-tips',
      h2: 'Booking tips that save money',
      paras: [
        'Pet fees are negotiable more often than people realise. Book a flexible-cancellation rate on Booking.com first to lock in your room, then email the hotel before arrival to confirm the exact pet terms. If the property quotes a different fee than the listing, you keep the cancellation option as a safety net.',
      ],
      bullets: [
        'Filter Booking.com for "free cancellation" + "pets allowed", then re-confirm the pet fee in writing before arrival. Pet fees vary by room category, the listing average is sometimes optimistic.',
        'For multi-night stays, ask about a flat pet rate vs nightly fee. A €15/night fee on 7 nights is €105; many hotels will switch to €60 flat if asked.',
        'Loyalty programmes pay off: Hilton Honors, IHG One Rewards and Accor Live Limitless members get pet-fee waivers at top tiers.',
        'Avoid "pet-allowed" rooms tagged as the only option, these are often cleaning-fee-loaded. Standard rooms with a pet-allowed-on-request setup are usually cheaper.',
        'Dog beach resorts: book in shoulder season (April-May, October-November), same hotel, 30-40% less expensive than peak summer.',
        'For trips longer than 7 nights, an Airbnb often beats hotels on total pet cost (one cleaning fee vs daily pet fee). Filter for "pets allowed" + verified reviews mentioning pets.',
      ],
    },
    whatToAsk: {
      id: 'what-to-ask',
      h2: '10 questions to ask before booking',
      intro: 'Before you confirm a booking, send a short email to the hotel with these questions. The tone of the reply tells you everything about whether the hotel is genuinely welcoming or just "pet-allowed" on paper.',
      questions: [
        'Are pets accepted in any standard room, or only specific ones?',
        'Is the pet fee per stay or per night? Does it include cleaning?',
        'Are there breed or weight restrictions beyond legal PPP / dangerous-dog rules?',
        'Can my dog stay in the room while I\'m at dinner or in the spa?',
        'Do you provide bowls, beds or treats? Or should I bring my own?',
        'Is there a dog-walking area or off-leash space within walking distance?',
        'Do you accept multiple pets? If yes, is the fee per pet or capped?',
        'Where do dogs need to be on leash or muzzled inside the property?',
        'Do you have a recommended local vet in case of emergency?',
        'What\'s the cancellation policy if my pet is unwell on arrival day?',
      ],
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'What\'s the average pet fee in European hotels?', a: 'The European average is €15–€25 per stay for an independent hotel and €20–€30 per night for chains. Switzerland and the UK are at the high end (CHF 30–50 / £40–£60). Eastern Europe is at the low end (€5–€10).' },
      { q: 'Do all hotels accept cats too?', a: 'Most "dog-friendly" hotels also accept cats, but not always advertised. Always ask explicitly: about 80% of dog-accepting hotels also accept cats with prior notice.' },
      { q: 'What if my dog barks at night?', a: 'Hotels reserve the right to charge a disturbance fee or evict. Practical solutions: book a corner room, end-of-corridor room or ground-floor room. Bring a familiar blanket or toy. ThunderShirts and Adaptil sprays help anxious dogs.' },
      { q: 'Are there pet-only floors in any chains?', a: 'Yes, Kimpton, Hilton (some properties) and 25hours have dedicated pet floors at select locations. Ask explicitly when booking.' },
      { q: 'How do I know if a hotel is genuinely pet-friendly vs just pet-tolerated?', a: 'Three indicators: (1) the hotel mentions specific pet amenities (bowls, beds, treats) on its website, (2) the pet fee is reasonable (€10–€25, not £75+), (3) the staff response to your pre-booking email is enthusiastic, not hesitant. We pre-screen all hotels in our destination guides.' },
      { q: 'What about service dogs / assistance dogs?', a: 'Service dogs are admitted free of charge to all EU hotels by law (Regulation 2016/679 + national implementations) and to all UK hotels (Equality Act 2010). The pet fee does not apply. Bring documentation.' },
      { q: 'Can I leave my dog alone in the hotel room?', a: 'Most pet-friendly European hotels prohibit unattended pets. Workarounds: book a Pawshake or Tailster sitter for the few hours you need, or use the in-room day-care service offered at Kimpton, 25hours and some Hilton properties.' },
    ],
    ctaTitle: 'Ready to find your hotel?',
    ctaDesc: 'Browse our handpicked pet-friendly hotels across 85+ European destinations, all audited for genuine pet-welcome policies, with verified guest ratings of 8.0 and above.',
    ctaButton: 'See all destinations →',
    hotelLabel: 'hotels',
    destLabel: 'destinations',
    viewCategoryLabel: 'View category →',
    countryDestinationsCta: 'See destinations →',
  },
  fr: {
    hero: {
      kicker: 'GUIDE PILIER · MIS À JOUR 2026',
      h1: `Hôtels pet-friendly en Europe : le guide complet 2026`,
      lede: `Comment trouver, évaluer et réserver un hôtel qui accueille vraiment votre chien ou chat en Europe. Chaînes qui acceptent les animaux, règles pays par pays, questions à poser, et nos sélections soignées dans 85+ destinations.`,
    },
    toc: { title: 'Dans ce guide', items: [
      { id: 'what-to-look', label: `Ce que « pet-friendly » veut vraiment dire` },
      { id: 'chains', label: `Les 12 chaînes les plus fiables` },
      { id: 'by-category', label: `Par catégorie de voyage` },
      { id: 'by-country', label: `Par pays : règles et tarifs` },
      { id: 'booking-tips', label: `Astuces de réservation qui font économiser` },
      { id: 'what-to-ask', label: `10 questions à poser avant de réserver` },
      { id: 'faq', label: 'FAQ' },
    ] },
    whatToLook: {
      id: 'what-to-look',
      h2: `Ce que « pet-friendly » veut vraiment dire`,
      paras: [
        `L'expression n'est pas régulée. Booking.com, Hotels.com et Airbnb laissent les établissements s'auto-tagger comme pet-friendly sans vérification, ce qui fait qu'une seule annonce peut aller du cinq étoiles avec concierge dédié à l'auberge qui accepte un chien à contrecœur après une caution de 40 £. Notre rôle est de filtrer le bruit.`,
        `Selon notre standard, un hôtel vraiment pet-friendly coche au moins quatre des six critères ci-dessous. Ces critères éliminent environ deux tiers des annonces « pet-friendly » de Booking.com. Tous les hôtels listés dans nos 85+ guides de destination ont été audités selon cette même checklist avant inclusion.`,
      ],
      checks: {
        title: `Notre checklist en 6 points`,
        items: [
          `Animaux acceptés dans toute chambre standard, pas dans une chambre spécifique`,
          `Pas d'interdiction par race au-delà des règles locales PPP / chiens dangereux`,
          `Supplément animal sous 30 € par séjour, ou sous 15 € par nuit`,
          `Gamelles ou panier disponibles sur demande`,
          `Le chien peut rester en chambre pendant que vous sortez, pas de règle « chenil en journée »`,
          `Espace vert sans laisse à moins de 500 m à pied`,
        ],
      },
    },
    chains: {
      id: 'chains',
      h2: `Les 12 chaînes hôtelières pet-friendly les plus fiables d'Europe`,
      intro: `Les hôtels de chaîne sont le pari le plus sûr pour les itinéraires multi-villes car ils appliquent la même politique animaux dans chaque établissement. Nous excluons les chaînes où l'acceptation est laissée aux directeurs individuels (la majorité, hélas, dont Marriott dans bien des régions).`,
      rows: [
        { chain: 'Adina Apartment Hotels', policy: `Appartements sélectionnés`, fee: '15 €/nuit', note: `Kitchenettes, pratique pour les repas du chien` },
        { chain: 'Apex Hotels (UK)', policy: `Tout le réseau`, fee: '20 £/séjour', note: `Piscines couvertes, emplacements UK centraux` },
        { chain: 'Hilton (Pet Welcome)', policy: `La plupart des hôtels ; vérifier individuellement`, fee: '30–75 €/séjour', note: `Plus cher, niveau luxe` },
        { chain: 'Holiday Inn / Express (IHG)', policy: `La plupart des hôtels`, fee: '15–20 €/nuit', note: `Milieu de gamme fiable, omniprésent` },
        { chain: 'Hospes Hotels', policy: `Tout le réseau`, fee: '25 €/séjour', note: `Chaîne boutique 5 étoiles espagnole` },
        { chain: 'Hotel Indigo (IHG)', policy: `Tout le réseau`, fee: '25 €/séjour', note: `Boutique 4 étoiles, urbain` },
        { chain: 'Mercure (Accor)', policy: `La plupart des hôtels`, fee: '10–20 €/nuit', note: `Fort réseau France / Italie` },
        { chain: 'Motel One', policy: `Tout le réseau depuis 2024`, fee: '10 €/nuit', note: `Hôtels design budget en pleine croissance` },
        { chain: '25hours Hotels', policy: `Tout le réseau, kit pet inclus`, fee: '20 €/séjour', note: `Design 4 étoiles, gamelles fournies` },
        { chain: 'Scandic Hotels', policy: `Tout le réseau`, fee: '20 €/séjour', note: `Fort réseau nordique + allemand` },
        { chain: 'Travelodge', policy: `La plupart des hôtels UK`, fee: '25 £/séjour', note: `Chaîne budget UK, max 2 animaux/chambre` },
        { chain: 'NH Hotels / NH Collection', policy: `Tout le réseau`, fee: '20–25 €/nuit', note: `Forte empreinte Espagne, Italie, Allemagne` },
      ],
      columns: { chain: 'Chaîne', policy: 'Politique', fee: 'Supplément', note: 'Note' },
    },
    byCategory: {
      id: 'by-category',
      h2: `Par catégorie : quel type de séjour pour votre voyage`,
      intro: `L'acceptation animale n'est que le ticket d'entrée. Des vacances plage avec un chien demandent d'autres critères qu'une escapade urbaine avec un chat. Parcourez nos six catégories ci-dessous, chacune filtrée sur 85+ destinations.`,
    },
    byCountry: {
      id: 'by-country',
      h2: `Par pays : règles et culture du supplément animal`,
      intro: `Les politiques animales hôtelières varient à travers l'Europe, autant le tarif moyen que le style d'application. Voici la réalité pratique pays par pays, tirée de notre audit de 460+ hôtels.`,
    },
    countryNotes: {
      France: `Plus de 50 % des hôtels acceptent les animaux, supplément moyen 15–25 €/séjour. Les hôtels indépendants sont généralement moins chers que les chaînes. Règles passeport européen standard.`,
      Germany: `Mène l'Europe sur la dog-friendliness. Les hôtels refusent rarement, supplément moyen 10–20 €/nuit. Berlin, Hambourg et Munich ont la plus forte densité de chaînes pet-welcome. Chiens en restaurant la norme.`,
      Spain: `L'acceptation a vite progressé, supplément moyen 15–20 €/nuit. Madrid et Barcelone mènent sur les chaînes. L'Andalousie excelle au printemps et automne mais la canicule est la contrainte principale.`,
      Italy: `La loi italienne (Legge 281/1991) donne aux chiens des droits d'accès forts mais les hôtels appliquent les suppléments plus agressivement que France ou Allemagne, souvent 25–40 €/séjour. Trenitalia accepte les chiens avec papiers.`,
      'United Kingdom': `Post-Brexit : chiens UE entrant au UK ont besoin d'un Animal Health Certificate (10 jours) plus traitement échinococcose obligatoire. Supplément moyen 25–50 £/séjour. Les pubs accueillant les chiens sont la base culturelle britannique.`,
      Netherlands: `Culture pet-friendly exceptionnelle à Amsterdam, Rotterdam et La Haye. Hôtels facturent 15–25 €/séjour. Chiens dans tram et train pour 3,40 € le pass jour.`,
      Belgium: `Forte acceptation animale, surtout à Anvers et Gand. Suppléments 15–25 €. Les brasseries belges sont universellement tolérantes.`,
      Portugal: `Lisbonne et Porto exceptionnellement dog-friendly. Suppléments 10–20 €/séjour, moins chers qu'en Espagne. Trams et trains acceptent les chiens.`,
      Switzerland: `Pays le plus cher d'Europe mais l'acceptation la plus consistante. Supplément moyen 30–50 CHF/nuit. Trains et téléphériques acceptent les chiens gratuitement ou demi-tarif.`,
      Austria: `Très dog-friendly. Vienne et Salzbourg mènent. Supplément 10–20 €/nuit. Trains ÖBB acceptent les chiens.`,
      Denmark: `Copenhague mène l'Europe sur le bien-être animal. Hôtels typiquement 150–300 DKK/séjour. Chiens gratuits dans métro et S-tog avec muselière.`,
      Sweden: `Stockholm et Göteborg toutes deux pet-welcoming. Supplément 200–400 SEK/nuit. Chiens acceptés en train.`,
      Norway: `Culture canine d'Oslo intense. Supplément 200–500 NOK. Chiens gratuits dans la plupart des transports.`,
      Finland: `Helsinki a la plus haute densité canine d'Europe. Hôtels souvent gratuits pour petits chiens, 10–20 € pour grands. Chiens gratuits dans tous les transports.`,
      Iceland: `Règles d'importation strictes (paperasse extensive et frais élevés). Une fois sur place, Reykjavík est accueillante. Hôtels 5 000–8 000 ISK/séjour.`,
      Ireland: `La pet-friendliness de Dublin s'est améliorée. Hôtels 15–25 €. Mêmes règles que UK pour l'Irlande du Nord.`,
      Greece: `Athènes et Thessalonique en progression. Hôtels 10–15 €/séjour. Restrictions plage strictes en été.`,
      'Czech Republic': `Prague très dog-friendly. Hôtels 200–500 CZK/séjour. Chiens acceptés dans métro et trams.`,
      Hungary: `Budapest accueillante. Hôtels 3 000–6 000 HUF/séjour. Chiens gratuits dans le métro avec muselière.`,
      Slovenia: `Ljubljana et Bled toutes deux pet-friendly. Hôtels 10–15 €.`,
      Croatia: `Dubrovnik et Split en progression, mais les interdictions de plage (15 mai–30 sep) sont strictes. Hôtels 10–20 €.`,
      Poland: `Varsovie et Cracovie ont une scène pet-welcome en croissance. Hôtels 50–100 PLN/séjour.`,
      Latvia: `Riga en progression. Hôtels 10–15 €.`,
      Estonia: `Tallinn pet-friendly. Hôtels environ 10 €.`,
      Slovakia: `Bratislava accueillante. Hôtels 10–15 €.`,
      Romania: `Bucarest progresse rapidement. Hôtels 30–60 RON/séjour.`,
      Bulgaria: `Sofia accueillante. Hôtels 20–40 BGN.`,
      Serbia: `Belgrade accueillante, transports publics gratuits pour chiens depuis 2025. Hôtels 1 500–3 000 RSD.`,
      Lithuania: `Vilnius accueillante. Hôtels environ 10 €.`,
      Luxembourg: `Pet-friendly. Hôtels 15–25 €.`,
    },
    bookingTips: {
      id: 'booking-tips',
      h2: `Astuces de réservation qui font économiser`,
      paras: [
        `Les suppléments animaux sont négociables plus souvent qu'on le pense. Réservez d'abord un tarif annulation gratuite sur Booking.com pour bloquer votre chambre, puis envoyez un email à l'hôtel avant l'arrivée pour confirmer les conditions précises. Si l'hôtel annonce un montant différent de la fiche, vous gardez l'option d'annulation comme filet de sécurité.`,
      ],
      bullets: [
        `Filtrez sur Booking.com « annulation gratuite » + « animaux acceptés », puis re-confirmez le supplément par écrit avant l'arrivée. Le supplément varie selon la catégorie de chambre, la moyenne affichée est parfois optimiste.`,
        `Pour séjours multi-nuits, demandez un forfait plutôt qu'un tarif/nuit. 15 €/nuit sur 7 nuits = 105 € ; beaucoup d'hôtels passent à 60 € forfait sur demande.`,
        `Les programmes fidélité paient : Hilton Honors, IHG One Rewards et Accor Live Limitless niveaux supérieurs ont des annulations de supplément animal.`,
        `Évitez les chambres « pet-allowed » comme seule option, souvent grevées de frais de nettoyage. Les chambres standard avec animal-sur-demande sont moins chères.`,
        `Resorts plage canine : réservez en mi-saison (avril-mai, octobre-novembre), même hôtel, 30-40 % moins cher qu'en été.`,
        `Pour des voyages de plus de 7 nuits, un Airbnb bat souvent les hôtels en coût animal total (un frais de ménage vs supplément quotidien).`,
      ],
    },
    whatToAsk: {
      id: 'what-to-ask',
      h2: `10 questions à poser avant de réserver`,
      intro: `Avant de confirmer une réservation, envoyez un court email à l'hôtel avec ces questions. Le ton de la réponse vous dit tout sur la véritable hospitalité de l'établissement.`,
      questions: [
        `Les animaux sont-ils acceptés dans toute chambre standard, ou seulement dans des chambres spécifiques ?`,
        `Le supplément est-il par séjour ou par nuit ? Inclut-il le ménage ?`,
        `Y a-t-il des restrictions de race ou de poids au-delà des règles légales PPP ?`,
        `Mon chien peut-il rester en chambre pendant que je suis au restaurant ou au spa ?`,
        `Fournissez-vous gamelles, paniers, friandises ? Ou dois-je apporter ?`,
        `Y a-t-il une zone de promenade canine ou espace sans laisse à proximité ?`,
        `Acceptez-vous plusieurs animaux ? Si oui, le supplément est-il par animal ou plafonné ?`,
        `Où le chien doit-il être en laisse ou muselière dans l'établissement ?`,
        `Avez-vous un vétérinaire local recommandé en cas d'urgence ?`,
        `Quelle est la politique d'annulation si mon animal est malade le jour d'arrivée ?`,
      ],
    },
    faqTitle: `Questions fréquentes`,
    faqs: [
      { q: `Quel est le supplément animal moyen en hôtel européen ?`, a: `La moyenne européenne est de 15–25 €/séjour pour un hôtel indépendant et 20–30 €/nuit pour les chaînes. Suisse et UK sont en haut de fourchette (30–50 CHF / 40–60 £). Europe de l'Est en bas (5–10 €).` },
      { q: `Tous les hôtels acceptent-ils aussi les chats ?`, a: `La plupart des hôtels « dog-friendly » acceptent aussi les chats, pas toujours annoncé. Demandez explicitement : environ 80 % des hôtels qui acceptent les chiens acceptent aussi les chats avec préavis.` },
      { q: `Et si mon chien aboie la nuit ?`, a: `Les hôtels se réservent le droit de facturer un supplément troubles ou d'expulser. Solutions pratiques : chambre d'angle, en bout de couloir ou rez-de-chaussée. Apportez couverture ou jouet familier. ThunderShirts et Adaptil aident les chiens anxieux.` },
      { q: `Y a-t-il des étages réservés aux animaux dans les chaînes ?`, a: `Oui, Kimpton, Hilton (certains hôtels) et 25hours ont des étages dédiés aux animaux dans certains emplacements. Demandez explicitement à la réservation.` },
      { q: `Comment savoir si un hôtel est vraiment pet-friendly ou juste « pet-toléré » ?`, a: `Trois indicateurs : (1) l'hôtel mentionne des équipements pets spécifiques (gamelles, paniers, friandises) sur son site, (2) le supplément est raisonnable (10–25 €, pas 75 £+), (3) la réponse du staff à votre email pré-réservation est enthousiaste, pas hésitante. Nous pré-filtrons tous les hôtels de nos guides destinations.` },
      { q: `Et les chiens d'assistance ou chiens guides ?`, a: `Les chiens d'assistance sont admis gratuitement dans tous les hôtels UE par la loi (Règlement 2016/679 + transpositions nationales) et dans tous les hôtels UK (Equality Act 2010). Le supplément ne s'applique pas. Apportez les documents.` },
      { q: `Puis-je laisser mon chien seul dans la chambre d'hôtel ?`, a: `La plupart des hôtels pet-friendly européens interdisent les animaux seuls. Solutions : un sitter Pawshake ou Tailster pour quelques heures, ou le service garderie en chambre de Kimpton, 25hours et certains Hilton.` },
    ],
    ctaTitle: `Prêt à trouver votre hôtel ?`,
    ctaDesc: `Parcourez nos hôtels pet-friendly soigneusement sélectionnés dans 85+ destinations européennes, tous audités pour de véritables politiques pet-welcome, avec notes voyageurs vérifiées 8,0+.`,
    ctaButton: `Voir toutes les destinations →`,
    hotelLabel: `hôtels`,
    destLabel: `destinations`,
    viewCategoryLabel: `Voir la catégorie →`,
    countryDestinationsCta: `Voir les destinations →`,
  },
  es: {
    hero: {
      kicker: 'GUÍA PILAR · ACTUALIZADO 2026',
      h1: 'Hoteles pet-friendly en Europa: la guía completa 2026',
      lede: 'Cómo encontrar, evaluar y reservar un hotel que realmente acepta a tu perro o gato en Europa. Cadenas que admiten mascotas, normas país por país, preguntas que hacer y nuestra selección cuidada en 85+ destinos.',
    },
    toc: { title: 'En esta guía', items: [
      { id: 'what-to-look', label: 'Qué significa realmente "pet-friendly"' },
      { id: 'chains', label: 'Las 12 cadenas más fiables' },
      { id: 'by-category', label: 'Por categoría de viaje' },
      { id: 'by-country', label: 'Por país: normas y cargos' },
      { id: 'booking-tips', label: 'Consejos de reserva que ahorran dinero' },
      { id: 'what-to-ask', label: '10 preguntas antes de reservar' },
      { id: 'faq', label: 'FAQ' },
    ] },
    whatToLook: {
      id: 'what-to-look',
      h2: 'Qué significa realmente "pet-friendly"',
      paras: [
        'La expresión no está regulada. Booking.com, Hotels.com y Airbnb permiten que los establecimientos se etiqueten ellos mismos como pet-friendly sin verificación, así que un mismo anuncio puede ir desde un cinco estrellas con conserjería pet dedicada hasta un albergue que admite un perro a regañadientes tras un depósito de 40 £. Nuestro papel es filtrar el ruido.',
        'Según nuestro estándar, un hotel realmente pet-friendly cumple al menos cuatro de los seis criterios siguientes. Estos criterios eliminan aproximadamente dos tercios de los anuncios "pet-friendly" en Booking.com. Todos los hoteles listados en nuestras 85+ guías de destino han sido auditados con esta misma checklist antes de incluirse.',
      ],
      checks: {
        title: 'Nuestra checklist de 6 puntos',
        items: [
          'Mascotas admitidas en cualquier habitación estándar, no en una específica',
          'Sin prohibiciones por raza más allá de las normas locales PPP',
          'Cargo por mascota inferior a 30 € por estancia, o inferior a 15 € por noche',
          'Boles o cama disponibles a petición',
          'El perro puede quedarse en la habitación mientras sales, sin regla "perrera durante el día"',
          'Espacio verde sin correa a menos de 500 m a pie',
        ],
      },
    },
    chains: {
      id: 'chains',
      h2: 'Las 12 cadenas hoteleras pet-friendly más fiables de Europa',
      intro: 'Las cadenas hoteleras son la apuesta más segura para itinerarios multi-ciudad porque aplican la misma política de mascotas en cada propiedad. Excluimos las cadenas donde la aceptación se deja a los gestores individuales (la mayoría, por desgracia, incluido Marriott en muchas regiones).',
      rows: [
        { chain: 'Adina Apartment Hotels', policy: 'Apartamentos seleccionados', fee: '15 €/noche', note: 'Cocinitas, útil para comidas del perro' },
        { chain: 'Apex Hotels (UK)', policy: 'Toda la cadena', fee: '20 £/estancia', note: 'Piscinas cubiertas, ubicaciones UK céntricas' },
        { chain: 'Hilton (Pet Welcome)', policy: 'Mayoría; verificar por hotel', fee: '30–75 €/estancia', note: 'Más caro, nivel lujo' },
        { chain: 'Holiday Inn / Express (IHG)', policy: 'Mayoría', fee: '15–20 €/noche', note: 'Gama media fiable, omnipresente' },
        { chain: 'Hospes Hotels', policy: 'Toda la cadena', fee: '25 €/estancia', note: 'Cadena boutique 5 estrellas española' },
        { chain: 'Hotel Indigo (IHG)', policy: 'Toda la cadena', fee: '25 €/estancia', note: 'Boutique 4 estrellas, urbano' },
        { chain: 'Mercure (Accor)', policy: 'Mayoría', fee: '10–20 €/noche', note: 'Fuerte red Francia / Italia' },
        { chain: 'Motel One', policy: 'Toda la cadena desde 2024', fee: '10 €/noche', note: 'Hoteles diseño presupuesto en crecimiento' },
        { chain: '25hours Hotels', policy: 'Toda la cadena, kit pet incluido', fee: '20 €/estancia', note: 'Diseño 4 estrellas, boles incluidos' },
        { chain: 'Scandic Hotels', policy: 'Toda la cadena', fee: '20 €/estancia', note: 'Fuerte red nórdica + alemana' },
        { chain: 'Travelodge', policy: 'Mayoría de hoteles UK', fee: '25 £/estancia', note: 'Cadena presupuesto UK, máx 2 mascotas/habitación' },
        { chain: 'NH Hotels / NH Collection', policy: 'Toda la cadena', fee: '20–25 €/noche', note: 'Fuerte presencia España, Italia, Alemania' },
      ],
      columns: { chain: 'Cadena', policy: 'Política', fee: 'Cargo', note: 'Nota' },
    },
    byCategory: {
      id: 'by-category',
      h2: 'Por categoría: qué tipo de estancia te conviene',
      intro: 'La aceptación de mascotas es solo el billete de entrada. Unas vacaciones de playa con perro requieren criterios diferentes que una escapada urbana con gato. Explora nuestras seis categorías abajo, cada una filtrada en 85+ destinos.',
    },
    byCountry: {
      id: 'by-country',
      h2: 'Por país: cultura del cargo por mascota y normas locales',
      intro: 'Las políticas de mascotas hoteleras varían por Europa, tanto el cargo medio como el estilo de aplicación. A continuación, la realidad práctica país por país, extraída de nuestra auditoría de 460+ hoteles.',
    },
    countryNotes: {
      France: 'Más del 50 % de los hoteles admiten mascotas, cargo medio 15–25 €/estancia. Los hoteles independientes son típicamente más baratos que las cadenas. Normas pasaporte UE estándar.',
      Germany: 'Lidera Europa en dog-friendliness. Los hoteles raramente rechazan, cargo medio 10–20 €/noche. Berlín, Hamburgo y Múnich tienen la mayor densidad de cadenas pet-welcome. Perros en restaurantes la norma.',
      Spain: 'La aceptación ha crecido rápidamente, cargo medio 15–20 €/noche. Madrid y Barcelona lideran en cadenas. Andalucía excelente en primavera y otoño pero el calor extremo estival es la principal restricción.',
      Italy: 'La ley italiana (Legge 281/1991) da a los perros derechos de acceso fuertes pero los hoteles aplican cargos más agresivamente que Francia o Alemania, a menudo 25–40 €/estancia. Trenitalia admite perros con papeleo.',
      'United Kingdom': 'Post-Brexit: perros UE entrando al UK necesitan un Animal Health Certificate (10 días) más tratamiento obligatorio contra equinococosis. Cargo medio 25–50 £/estancia. Los pubs admitiendo perros son la base cultural británica.',
      Netherlands: 'Cultura pet-friendly excepcional en Ámsterdam, Róterdam y La Haya. Los hoteles cobran 15–25 €/estancia. Perros en tranvía y tren por 3,40 € pase diario.',
      Belgium: 'Fuerte aceptación, especialmente en Amberes y Gante. Cargos 15–25 €. Brasseries belgas universalmente tolerantes.',
      Portugal: 'Lisboa y Oporto excepcionalmente dog-friendly. Cargos 10–20 €/estancia, más baratos que España. Tranvías y trenes admiten perros.',
      Switzerland: 'País más caro de Europa pero la aceptación más consistente. Cargo medio 30–50 CHF/noche. Trenes y teleféricos admiten perros gratis o media tarifa.',
      Austria: 'Muy dog-friendly. Viena y Salzburgo lideran. Cargo 10–20 €/noche. Trenes ÖBB admiten perros.',
      Denmark: 'Copenhague lidera Europa en bienestar animal. Hoteles típicamente 150–300 DKK/estancia. Perros gratis en metro y S-tog con bozal.',
      Sweden: 'Estocolmo y Gotemburgo ambas pet-welcoming. Cargo 200–400 SEK/noche. Perros admitidos en tren.',
      Norway: 'Cultura canina de Oslo intensa. Cargo 200–500 NOK. Perros gratis en mayoría de transportes.',
      Finland: 'Helsinki tiene la mayor densidad canina de Europa. Hoteles típicamente gratis para perros pequeños, 10–20 € para grandes. Perros gratis en todo el transporte público.',
      Iceland: 'Normas estrictas de importación (papeleo extenso, tarifas altas). Una vez allí, Reikiavik es acogedora. Hoteles 5.000–8.000 ISK/estancia.',
      Ireland: 'La pet-friendliness de Dublín ha mejorado. Hoteles 15–25 €. Mismas normas que UK para Irlanda del Norte.',
      Greece: 'Atenas y Tesalónica mejorando. Hoteles 10–15 €/estancia. Restricciones de playa estrictas en verano.',
      'Czech Republic': 'Praga muy dog-friendly. Hoteles 200–500 CZK/estancia. Perros admitidos en metro y tranvías.',
      Hungary: 'Budapest acogedora. Hoteles 3.000–6.000 HUF/estancia. Perros gratis en metro con bozal.',
      Slovenia: 'Liubliana y Bled ambas pet-friendly. Hoteles 10–15 €.',
      Croatia: 'Dubrovnik y Split mejorando pero las prohibiciones de playa (15 mayo–30 sep) son estrictas. Hoteles 10–20 €.',
      Poland: 'Varsovia y Cracovia tienen escena pet-welcome creciente. Hoteles 50–100 PLN/estancia.',
      Latvia: 'Riga mejorando. Hoteles 10–15 €.',
      Estonia: 'Tallin pet-friendly. Hoteles alrededor de 10 €.',
      Slovakia: 'Bratislava acogedora. Hoteles 10–15 €.',
      Romania: 'Bucarest mejorando rápidamente. Hoteles 30–60 RON/estancia.',
      Bulgaria: 'Sofía acogedora. Hoteles 20–40 BGN.',
      Serbia: 'Belgrado acogedora, transporte público gratis para perros desde 2025. Hoteles 1.500–3.000 RSD.',
      Lithuania: 'Vilna acogedora. Hoteles alrededor de 10 €.',
      Luxembourg: 'Pet-friendly. Hoteles 15–25 €.',
    },
    bookingTips: {
      id: 'booking-tips',
      h2: 'Consejos de reserva que ahorran dinero',
      paras: [
        `Los cargos por mascota son negociables más a menudo de lo que la gente cree. Reserva primero una tarifa con cancelación gratuita en Booking.com para asegurar la habitación, y envía un email al hotel antes de llegar para confirmar las condiciones exactas. Si el hotel indica un cargo distinto al de la ficha, mantienes la opción de cancelar como red de seguridad.`,
      ],
      bullets: [
        `Filtra en Booking.com por «cancelación gratuita» + «mascotas admitidas», y re-confirma el cargo por escrito antes de llegar. El cargo varía según la categoría de habitación, la media anunciada es a veces optimista.`,
        `Para estancias multi-noche, pide tarifa plana en vez de cargo por noche. 15 €/noche en 7 noches = 105 €; muchos hoteles cambiarán a 60 € plano si se les pide.`,
        `Los programas de fidelidad valen la pena: miembros de Hilton Honors, IHG One Rewards y Accor Live Limitless niveles superiores tienen anulaciones de cargo por mascota.`,
        `Evita habitaciones "pet-allowed" tildadas como única opción, suelen ir cargadas con tarifa de limpieza. Las habitaciones estándar con setup pet-allowed-on-request suelen ser más baratas.`,
        `Resorts de playa canina: reserva en temporada media (abril-mayo, octubre-noviembre), mismo hotel, 30-40 % menos caro que en pico estival.`,
        `Para viajes de más de 7 noches, un Airbnb suele superar a hoteles en coste total de mascota (una tarifa de limpieza vs cargo diario).`,
      ],
    },
    whatToAsk: {
      id: 'what-to-ask',
      h2: '10 preguntas antes de reservar',
      intro: 'Antes de confirmar una reserva, envía un email corto al hotel con estas preguntas. El tono de la respuesta te dice todo sobre si el hotel es genuinamente acogedor o solo "pet-allowed" sobre el papel.',
      questions: [
        '¿Las mascotas se admiten en cualquier habitación estándar, o solo en específicas?',
        '¿El cargo por mascota es por estancia o por noche? ¿Incluye limpieza?',
        '¿Hay restricciones de raza o peso más allá de las normas legales PPP?',
        '¿Mi perro puede quedarse en la habitación mientras estoy en la cena o en el spa?',
        '¿Proporcionan boles, camas o golosinas? ¿O debería traerlos yo?',
        '¿Hay zona de paseo canino o espacio sin correa a poca distancia?',
        '¿Admiten varias mascotas? Si sí, ¿el cargo es por mascota o tope?',
        '¿Dónde debe ir el perro con correa o bozal dentro del establecimiento?',
        '¿Tienen un veterinario local recomendado en caso de urgencia?',
        '¿Cuál es la política de cancelación si mi mascota está enferma el día de llegada?',
      ],
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cuál es el cargo por mascota medio en hoteles europeos?', a: 'El promedio europeo es 15–25 €/estancia para un hotel independiente y 20–30 €/noche para cadenas. Suiza y UK están en el extremo alto (30–50 CHF / 40–60 £). Europa del Este en el bajo (5–10 €).' },
      { q: '¿Todos los hoteles admiten también gatos?', a: 'La mayoría de hoteles "dog-friendly" también admiten gatos, pero no siempre se anuncia. Pregunta siempre explícitamente: aproximadamente el 80 % de los hoteles que admiten perros también admiten gatos con preaviso.' },
      { q: '¿Y si mi perro ladra de noche?', a: 'Los hoteles se reservan el derecho de cobrar tarifa de molestia o expulsar. Soluciones prácticas: habitación de esquina, final de pasillo o planta baja. Trae manta o juguete familiar. ThunderShirts y Adaptil ayudan a perros ansiosos.' },
      { q: '¿Hay plantas reservadas para mascotas en alguna cadena?', a: 'Sí, Kimpton, Hilton (algunos hoteles) y 25hours tienen plantas dedicadas a mascotas en ubicaciones seleccionadas. Pregunta explícitamente al reservar.' },
      { q: '¿Cómo sé si un hotel es genuinamente pet-friendly o solo pet-tolerado?', a: 'Tres indicadores: (1) el hotel menciona equipamientos pet específicos (boles, camas, golosinas) en su web, (2) el cargo por mascota es razonable (10–25 €, no 75 £+), (3) la respuesta del staff a tu email pre-reserva es entusiasta, no vacilante. Pre-filtramos todos los hoteles en nuestras guías de destino.' },
      { q: '¿Y los perros de servicio o asistencia?', a: 'Los perros de servicio se admiten gratis en todos los hoteles UE por ley (Reglamento 2016/679 + transposiciones nacionales) y en todos los hoteles UK (Equality Act 2010). El cargo por mascota no aplica. Lleva la documentación.' },
      { q: '¿Puedo dejar a mi perro solo en la habitación del hotel?', a: 'La mayoría de hoteles pet-friendly europeos prohíben mascotas sin vigilancia. Soluciones: un cuidador Pawshake o Tailster por las horas que necesites, o el servicio de guardería en habitación que ofrecen Kimpton, 25hours y algunos Hilton.' },
    ],
    ctaTitle: '¿Listo para encontrar tu hotel?',
    ctaDesc: 'Explora nuestros hoteles pet-friendly cuidadosamente seleccionados en 85+ destinos europeos, todos auditados por políticas pet-welcome genuinas, con valoraciones verificadas 8,0+.',
    ctaButton: 'Ver todos los destinos →',
    hotelLabel: 'hoteles',
    destLabel: 'destinos',
    viewCategoryLabel: 'Ver categoría →',
    countryDestinationsCta: 'Ver destinos →',
  },
  pt: {
    hero: {
      kicker: 'GUIA PILAR · ACTUALIZADO 2026',
      h1: `Hotéis pet-friendly na Europa: o guia completo 2026`,
      lede: `Como encontrar, avaliar e reservar um hotel que realmente acolhe o seu cão ou gato na Europa. Cadeias que aceitam animais, regras país a país, perguntas a fazer e a nossa selecção cuidada em 85+ destinos.`,
    },
    toc: { title: 'Neste guia', items: [
      { id: 'what-to-look', label: `O que "pet-friendly" significa realmente` },
      { id: 'chains', label: `As 12 cadeias mais fiáveis` },
      { id: 'by-category', label: `Por categoria de viagem` },
      { id: 'by-country', label: `Por país: regras e taxas` },
      { id: 'booking-tips', label: `Dicas de reserva que poupam dinheiro` },
      { id: 'what-to-ask', label: `10 perguntas antes de reservar` },
      { id: 'faq', label: 'FAQ' },
    ] },
    whatToLook: {
      id: 'what-to-look',
      h2: `O que "pet-friendly" significa realmente`,
      paras: [
        `A expressão não é regulada. Booking.com, Hotels.com e Airbnb permitem que os estabelecimentos se auto-etiquetem como pet-friendly sem verificação, pelo que um mesmo anúncio pode ir desde um cinco estrelas com concierge dedicado a animais até uma pousada que aceita um cão a contragosto após um depósito de 40 £. O nosso papel é filtrar o ruído.`,
        `Segundo o nosso padrão, um hotel verdadeiramente pet-friendly cumpre pelo menos quatro dos seis critérios abaixo. Estes critérios eliminam cerca de dois terços dos anúncios "pet-friendly" no Booking.com. Todos os hotéis listados nos nossos 85+ guias de destino foram auditados com a mesma checklist antes da inclusão.`,
      ],
      checks: {
        title: `A nossa checklist em 6 pontos`,
        items: [
          `Animais aceites em qualquer quarto padrão, não num quarto específico`,
          `Sem proibições por raça além das regras locais PPP / cães perigosos`,
          `Taxa por animal abaixo de 30 € por estadia, ou abaixo de 15 € por noite`,
          `Taças de água ou cama disponíveis a pedido`,
          `O cão pode ficar no quarto enquanto sai, sem regra "canil durante o dia"`,
          `Espaço verde sem trela a menos de 500 m a pé`,
        ],
      },
    },
    chains: {
      id: 'chains',
      h2: `As 12 cadeias hoteleiras pet-friendly mais fiáveis da Europa`,
      intro: `As cadeias hoteleiras são a aposta mais segura para itinerários multi-cidade porque aplicam a mesma política de animais em cada propriedade. Excluímos as cadeias onde a aceitação é deixada aos gerentes individuais (a maioria, infelizmente, incluindo Marriott em muitas regiões).`,
      rows: [
        { chain: 'Adina Apartment Hotels', policy: `Apartamentos seleccionados`, fee: '15 €/noite', note: `Kitchenettes, útil para refeições do cão` },
        { chain: 'Apex Hotels (UK)', policy: `Toda a cadeia`, fee: '20 £/estadia', note: `Piscinas cobertas, localizações centrais no UK` },
        { chain: 'Hilton (Pet Welcome)', policy: `Maioria; verificar por hotel`, fee: '30–75 €/estadia', note: `Mais caro, nível de luxo` },
        { chain: 'Holiday Inn / Express (IHG)', policy: `Maioria`, fee: '15–20 €/noite', note: `Gama média fiável, omnipresente` },
        { chain: 'Hospes Hotels', policy: `Toda a cadeia`, fee: '25 €/estadia', note: `Cadeia boutique 5 estrelas espanhola` },
        { chain: 'Hotel Indigo (IHG)', policy: `Toda a cadeia`, fee: '25 €/estadia', note: `Boutique 4 estrelas, urbano` },
        { chain: 'Mercure (Accor)', policy: `Maioria`, fee: '10–20 €/noite', note: `Forte rede França / Itália` },
        { chain: 'Motel One', policy: `Toda a cadeia desde 2024`, fee: '10 €/noite', note: `Hotéis design económicos em crescimento` },
        { chain: '25hours Hotels', policy: `Toda a cadeia, kit pet incluído`, fee: '20 €/estadia', note: `Design 4 estrelas, taças incluídas` },
        { chain: 'Scandic Hotels', policy: `Toda a cadeia`, fee: '20 €/estadia', note: `Forte rede nórdica + alemã` },
        { chain: 'Travelodge', policy: `Maioria dos hotéis UK`, fee: '25 £/estadia', note: `Cadeia económica UK, máx 2 animais/quarto` },
        { chain: 'NH Hotels / NH Collection', policy: `Toda a cadeia`, fee: '20–25 €/noite', note: `Forte presença Espanha, Itália, Alemanha` },
      ],
      columns: { chain: 'Cadeia', policy: 'Política', fee: 'Taxa', note: 'Nota' },
    },
    byCategory: {
      id: 'by-category',
      h2: `Por categoria: que tipo de estadia se adequa à sua viagem`,
      intro: `A aceitação de animais é apenas o bilhete de entrada. Umas férias de praia com um cão exigem critérios diferentes de uma escapadela urbana com um gato. Explore as nossas seis categorias abaixo, cada uma filtrada em 85+ destinos.`,
    },
    byCountry: {
      id: 'by-country',
      h2: `Por país: regras e cultura da taxa por animal`,
      intro: `As políticas de animais nos hotéis variam pela Europa, tanto a taxa típica como o estilo de aplicação. Em baixo, a realidade prática país a país, extraída da nossa auditoria a 460+ hotéis.`,
    },
    countryNotes: {
      France: `Mais de 50 % dos hotéis aceitam animais, taxa média 15–25 €/estadia. Os hotéis independentes são tipicamente mais baratos que as cadeias. Regras passaporte UE padrão.`,
      Germany: `Lidera a Europa em dog-friendliness. Os hotéis raramente recusam, taxa média 10–20 €/noite. Berlim, Hamburgo e Munique têm a maior densidade de cadeias pet-welcome. Cães em restaurantes é a norma.`,
      Spain: `A aceitação cresceu rapidamente, taxa média 15–20 €/noite. Madrid e Barcelona lideram nas cadeias. A Andaluzia é excelente na primavera e outono mas o calor extremo no verão é a principal restrição.`,
      Italy: `A lei italiana (Legge 281/1991) dá aos cães direitos de acesso fortes mas os hotéis aplicam taxas mais agressivamente que França ou Alemanha, frequentemente 25–40 €/estadia. Os comboios Trenitalia aceitam cães com papelada.`,
      'United Kingdom': `Pós-Brexit: cães da UE a entrar no UK precisam de um Animal Health Certificate (10 dias) mais tratamento obrigatório contra ténia. Taxa média 25–50 £/estadia. Os pubs que acolhem cães são a base cultural britânica.`,
      Netherlands: `Cultura pet-friendly excepcional em Amesterdão, Roterdão e Haia. Os hotéis cobram 15–25 €/estadia. Cães em elétrico e comboio por 3,40 € passe diário.`,
      Belgium: `Forte aceitação, especialmente em Antuérpia e Gante. Taxas 15–25 €. Brasseries belgas universalmente tolerantes.`,
      Portugal: `Lisboa e Porto excepcionalmente dog-friendly. Taxas 10–20 €/estadia, mais baratas que Espanha. Elétricos e comboios aceitam cães.`,
      Switzerland: `País mais caro da Europa mas a aceitação mais consistente. Taxa média 30–50 CHF/noite. Comboios e teleféricos aceitam cães grátis ou meio preço.`,
      Austria: `Muito dog-friendly. Viena e Salzburgo lideram. Taxa 10–20 €/noite. Comboios ÖBB aceitam cães.`,
      Denmark: `Copenhaga lidera a Europa no bem-estar animal. Hotéis tipicamente 150–300 DKK/estadia. Cães grátis no metro e S-tog com açaime.`,
      Sweden: `Estocolmo e Gotemburgo ambas pet-welcoming. Taxa 200–400 SEK/noite. Cães aceites no comboio.`,
      Norway: `Cultura canina de Oslo intensa. Taxa 200–500 NOK. Cães grátis na maioria dos transportes.`,
      Finland: `Helsínquia tem a maior densidade canina da Europa. Hotéis tipicamente grátis para cães pequenos, 10–20 € para grandes. Cães grátis em todos os transportes públicos.`,
      Iceland: `Regras rigorosas de importação (papelada extensa, taxas elevadas). Uma vez no destino, Reiquiavique é acolhedora. Hotéis 5 000–8 000 ISK/estadia.`,
      Ireland: `A pet-friendliness de Dublin melhorou. Hotéis 15–25 €. As mesmas regras do UK aplicam-se à Irlanda do Norte.`,
      Greece: `Atenas e Tessalónica a melhorar. Hotéis 10–15 €/estadia. Restrições de praia rigorosas no verão.`,
      'Czech Republic': `Praga muito dog-friendly. Hotéis 200–500 CZK/estadia. Cães aceites no metro e elétricos.`,
      Hungary: `Budapeste acolhedora. Hotéis 3 000–6 000 HUF/estadia. Cães grátis no metro com açaime.`,
      Slovenia: `Liubliana e Bled ambas pet-friendly. Hotéis 10–15 €.`,
      Croatia: `Dubrovnik e Split a melhorar mas as proibições de praia (15 maio–30 set) são rigorosas. Hotéis 10–20 €.`,
      Poland: `Varsóvia e Cracóvia têm cena pet-welcome em crescimento. Hotéis 50–100 PLN/estadia.`,
      Latvia: `Riga a melhorar. Hotéis 10–15 €.`,
      Estonia: `Tallin pet-friendly. Hotéis cerca de 10 €.`,
      Slovakia: `Bratislava acolhedora. Hotéis 10–15 €.`,
      Romania: `Bucareste a melhorar rapidamente. Hotéis 30–60 RON/estadia.`,
      Bulgaria: `Sófia acolhedora. Hotéis 20–40 BGN.`,
      Serbia: `Belgrado acolhedora, transportes públicos grátis para cães desde 2025. Hotéis 1 500–3 000 RSD.`,
      Lithuania: `Vilnius acolhedora. Hotéis cerca de 10 €.`,
      Luxembourg: `Pet-friendly. Hotéis 15–25 €.`,
    },
    bookingTips: {
      id: 'booking-tips',
      h2: `Dicas de reserva que poupam dinheiro`,
      paras: [
        `Os suplementos para animais são negociáveis mais vezes do que se pensa. Reserve primeiro uma tarifa com cancelamento grátis na Booking.com para garantir o quarto, e envie um email ao hotel antes de chegar para confirmar as condições exactas. Se o hotel indicar um valor diferente do anúncio, mantém a opção de cancelar como rede de segurança.`,
      ],
      bullets: [
        `Filtre na Booking.com por «cancelamento grátis» + «animais aceites», e re-confirme o suplemento por escrito antes de chegar. O suplemento varia consoante a categoria de quarto, a média anunciada é por vezes optimista.`,
        `Para estadias multi-noite, peça uma tarifa fixa em vez de taxa por noite. 15 €/noite em 7 noites = 105 €; muitos hotéis mudam para 60 € fixo se pedido.`,
        `Os programas de fidelidade compensam: membros Hilton Honors, IHG One Rewards e Accor Live Limitless em níveis superiores obtêm isenções da taxa por animal.`,
        `Evite quartos "pet-allowed" tagged como única opção, costumam ter taxa de limpeza acrescida. Os quartos padrão com animal-mediante-pedido são geralmente mais baratos.`,
        `Resorts de praia canina: reserve em meia-época (abril-maio, outubro-novembro), o mesmo hotel custa 30-40 % menos que no pico de verão.`,
        `Para viagens superiores a 7 noites, um Airbnb costuma bater os hotéis no custo total por animal (uma taxa de limpeza vs taxa diária).`,
      ],
    },
    whatToAsk: {
      id: 'what-to-ask',
      h2: `10 perguntas antes de reservar`,
      intro: `Antes de confirmar uma reserva, envie um email curto ao hotel com estas perguntas. O tom da resposta diz-lhe tudo sobre se o hotel é genuinamente acolhedor ou apenas "pet-allowed" no papel.`,
      questions: [
        `Os animais são aceites em qualquer quarto padrão, ou só em quartos específicos?`,
        `A taxa por animal é por estadia ou por noite? Inclui limpeza?`,
        `Há restrições de raça ou peso além das regras legais PPP?`,
        `O meu cão pode ficar no quarto enquanto estou no jantar ou no spa?`,
        `Fornecem taças, camas ou guloseimas? Ou devo levar as minhas?`,
        `Há zona de passeio canino ou espaço sem trela a curta distância?`,
        `Aceitam vários animais? Se sim, a taxa é por animal ou tem limite?`,
        `Onde é que o cão deve estar com trela ou açaime dentro do estabelecimento?`,
        `Têm um veterinário local recomendado em caso de emergência?`,
        `Qual é a política de cancelamento se o meu animal estiver doente no dia da chegada?`,
      ],
    },
    faqTitle: `Perguntas frequentes`,
    faqs: [
      { q: `Qual é a taxa média por animal nos hotéis europeus?`, a: `A média europeia é 15–25 €/estadia para um hotel independente e 20–30 €/noite para cadeias. Suíça e UK estão no extremo alto (30–50 CHF / 40–60 £). Europa de Leste no baixo (5–10 €).` },
      { q: `Todos os hotéis aceitam também gatos?`, a: `A maioria dos hotéis "dog-friendly" também aceita gatos, mas nem sempre o anuncia. Pergunte sempre explicitamente: cerca de 80 % dos hotéis que aceitam cães também aceitam gatos com pré-aviso.` },
      { q: `E se o meu cão ladrar à noite?`, a: `Os hotéis reservam-se o direito de cobrar taxa de perturbação ou expulsar. Soluções práticas: quarto de canto, fim de corredor ou rés-do-chão. Leve cobertor ou brinquedo familiar. ThunderShirts e Adaptil ajudam cães ansiosos.` },
      { q: `Há pisos reservados a animais em alguma cadeia?`, a: `Sim, Kimpton, Hilton (alguns hotéis) e 25hours têm pisos dedicados a animais em localizações seleccionadas. Pergunte explicitamente ao reservar.` },
      { q: `Como sei se um hotel é verdadeiramente pet-friendly ou apenas pet-tolerado?`, a: `Três indicadores: (1) o hotel menciona equipamentos pet específicos (taças, camas, guloseimas) no site, (2) a taxa por animal é razoável (10–25 €, não 75 £+), (3) a resposta do staff ao seu email pré-reserva é entusiasta, não hesitante. Pré-filtramos todos os hotéis nas nossas guias de destino.` },
      { q: `E os cães de serviço ou assistência?`, a: `Os cães de serviço são admitidos gratuitamente em todos os hotéis da UE por lei (Regulamento 2016/679 + transposições nacionais) e em todos os hotéis do UK (Equality Act 2010). A taxa por animal não se aplica. Leve a documentação.` },
      { q: `Posso deixar o meu cão sozinho no quarto do hotel?`, a: `A maioria dos hotéis pet-friendly europeus proíbe animais sem vigilância. Soluções: um cuidador Pawshake ou Tailster pelas horas que precisar, ou o serviço de creche em quarto oferecido por Kimpton, 25hours e alguns Hilton.` },
    ],
    ctaTitle: `Pronto para encontrar o seu hotel?`,
    ctaDesc: `Explore os nossos hotéis pet-friendly cuidadosamente seleccionados em 85+ destinos europeus, todos auditados por políticas pet-welcome genuínas, com avaliações verificadas 8,0+.`,
    ctaButton: `Ver todos os destinos →`,
    hotelLabel: `hotéis`,
    destLabel: `destinos`,
    viewCategoryLabel: `Ver categoria →`,
    countryDestinationsCta: `Ver destinos →`,
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en
  const sponsoredLabel = SPONSORED_LABEL[locale] ?? SPONSORED_LABEL.en

  const allCountries = getAllCountries()
  const totalHotels = hotels.length
  const totalDests = destinations.length

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-blue-950 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            📘 {c.hero.kicker}
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">{c.hero.h1}</h1>
          <p className="text-blue-100 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">{c.hero.lede}</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <span className="bg-white/10 px-4 py-2 rounded-full">🏨 {totalHotels}+ {c.hotelLabel}</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🌍 {totalDests} {c.destLabel}</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">📅 2026</span>
          </div>
        </div>
      </section>

      {/* TOC */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{c.toc.title}</h2>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {c.toc.items.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                → {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* What to look for */}
      <article id={c.whatToLook.id} className="py-16 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{c.whatToLook.h2}</h2>
          <div className="space-y-4 mb-8">
            {c.whatToLook.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 lg:p-8">
            <h3 className="text-xl font-extrabold text-gray-900 mb-5">✅ {c.whatToLook.checks.title}</h3>
            <ul className="space-y-3">
              {c.whatToLook.checks.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* Sponsored partner strip, clearly labelled */}
      <div className="border-t border-amber-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700/70">{sponsoredLabel}</p>
        </div>
        <TopHotelsStrip
          locale={locale}
          destinationSlugs={['paris', 'amsterdam', 'london', 'barcelona', 'rome', 'lisbon']}
          campaign="hotels-eu"
        />
      </div>

      {/* Chains */}
      <section id={c.chains.id} className="py-16 bg-gray-50 border-y border-gray-100 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{c.chains.h2}</h2>
          <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-8 max-w-3xl">{c.chains.intro}</p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">{c.chains.columns.chain}</th>
                  <th className="px-4 py-3 text-left font-bold">{c.chains.columns.policy}</th>
                  <th className="px-4 py-3 text-left font-bold">{c.chains.columns.fee}</th>
                  <th className="px-4 py-3 text-left font-bold">{c.chains.columns.note}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {c.chains.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{row.chain}</td>
                    <td className="px-4 py-3 text-gray-700">{row.policy}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{row.fee}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* By category, compact grid */}
      <section id={c.byCategory.id} className="py-16 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">{c.byCategory.h2}</h2>
          <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-8 max-w-3xl">{c.byCategory.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const catName = locale === 'fr' && cat.nameFr ? cat.nameFr
                : locale === 'es' && cat.nameEs ? cat.nameEs
                : locale === 'pt' && (cat as { namePt?: string }).namePt ? (cat as { namePt?: string }).namePt
                : cat.name
              return (
                <Link
                  key={cat.slug}
                  href={`/${locale}/categories/${cat.slug}`}
                  className={`bg-gradient-to-br ${cat.gradient} text-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}
                >
                  <span className="text-4xl block mb-3">{cat.emoji}</span>
                  <h4 className="font-extrabold text-lg mb-1">{catName}</h4>
                  <p className="text-white/80 text-sm font-semibold">{c.viewCategoryLabel}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* By country, compact 2-column grid */}
      <section id={c.byCountry.id} className="py-16 bg-gray-50 border-y border-gray-100 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">{c.byCountry.h2}</h2>
          <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-8 max-w-3xl">{c.byCountry.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allCountries.map((country) => {
              const note = c.countryNotes[country.name as keyof typeof c.countryNotes]
              if (!note) return null
              const localizedName = getLocalizedCountryName(country.name, locale)
              return (
                <article key={country.slug} className="bg-white border border-gray-200 rounded-2xl p-5">
                  <header className="flex items-center gap-3 mb-2">
                    <span className="text-2xl" aria-hidden="true">{country.flag}</span>
                    <div>
                      <h3 className="font-extrabold text-gray-900 leading-tight">{localizedName}</h3>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wide">{country.destinations.length} {c.destLabel}</p>
                    </div>
                  </header>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{note}</p>
                  <Link href={`/${locale}/countries/${country.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold hover:underline text-xs">
                    {c.countryDestinationsCta}
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Booking tips */}
      <section id={c.bookingTips.id} className="py-16 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{c.bookingTips.h2}</h2>
          <div className="space-y-4 mb-8">
            {c.bookingTips.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
          <ul className="space-y-3">
            {c.bookingTips.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <span className="text-amber-600 font-bold text-lg flex-shrink-0" aria-hidden="true">💡</span>
                <span className="text-gray-700 leading-relaxed text-sm lg:text-base">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What to ask */}
      <section id={c.whatToAsk.id} className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 border-y border-blue-200 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{c.whatToAsk.h2}</h2>
          <p className="text-gray-700 leading-relaxed text-base lg:text-lg mb-8">{c.whatToAsk.intro}</p>
          <div className="bg-white border border-blue-200 rounded-2xl shadow-sm p-6 lg:p-8">
            <ol className="space-y-4">
              {c.whatToAsk.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-gray-700 leading-relaxed">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">❓ {c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-2xl group">
                <summary className="cursor-pointer p-5 font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
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

      <StickyHotelCTA
        href={buildAllezDestLink('Europe', 'Europe', 'hotels-eu-sticky')}
        label={(STICKY_LABELS_HOTELS_EU[locale] ?? STICKY_LABELS_HOTELS_EU.en).label}
        cta={(STICKY_LABELS_HOTELS_EU[locale] ?? STICKY_LABELS_HOTELS_EU.en).cta}
      />
    </div>
  )
}
