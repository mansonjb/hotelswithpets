import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import TopHotelsStrip from '@/components/TopHotelsStrip'
import StickyHotelCTA from '@/components/StickyHotelCTA'

const STICKY_LABELS_HOTELS_EU: Record<string, { label: string; cta: string }> = {
  en: { label: 'Pet-friendly hotels across Europe, live prices', cta: 'See hotels' },
  fr: { label: `Hôtels pet-friendly en Europe, prix en direct`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles pet-friendly en Europa, precios en directo', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis pet-friendly em Europa, preços em directo', cta: 'Ver hotéis' },
}
import { getLocalizedCountryName, getAllCountries } from '@/lib/countries'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import categories from '@/data/categories.json'

const SLUG = 'pet-friendly-hotels-europe-guide'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Pet-Friendly Hotels in Europe: The Complete 2026 Guide | HotelsWithPets.com',
    fr: 'Hôtels pet-friendly en Europe : le guide complet 2026 | HotelsWithPets.com',
    es: 'Hoteles pet-friendly en Europa: la guía completa 2026 | HotelsWithPets.com',
    pt: 'Hotéis pet-friendly en Europa: a guía completa 2026 | HotelsWithPets.com',
  }
  const totalHotels = hotels.length
  const totalDests = destinations.length
  const descriptions: Record<string, string> = {
    en: `The complete 2026 guide to ${totalHotels}+ pet-friendly hotels across ${totalDests} European destinations: chains that accept dogs, country-by-country pet rules, what to ask before booking, and the best categories for cats, beach access and budget travel.`,
    fr: `Le guide complet 2026 des ${totalHotels}+ hôtels acceptant les animaux dans ${totalDests} destinations européennes : chaînes qui acceptent les chiens, règles pays par pays, questions à poser avant de réserver, et les meilleures catégories pour chats, plages et budget.`,
    es: `La guía completa 2026 de ${totalHotels}+ hoteles que admiten mascotas en ${totalDests} destinos europeos: cadenas que admiten perros, normas país por país, qué preguntar antes de reservar, y las mejores categorías para gatos, playa y presupuesto.`,
    pt: `A guía completa 2026 de ${totalHotels}+ hotéis que admiten animais en ${totalDests} destinos europeus: cadenas que admiten cães, normas país por país, qué preguntar antes de reservar, e as melhores categorías para gatos, praia e presupuesto.`,
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

const COPY: Record<string, {
  hero: { kicker: string; h1: string; lede: string }
  toc: { title: string; items: Array<{ id: string; label: string }> }
  whatToLook: { id: string; h2: string; paras: string[]; checks: { title: string; items: string[] } }
  chains: { id: string; h2: string; paras: string[]; rows: Array<{ chain: string; policy: string; fee: string; note: string }> }
  byCategory: { id: string; h2: string; paras: string[]; intro: string }
  byCountry: { id: string; h2: string; paras: string[] }
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
}> = {
  en: {
    hero: {
      kicker: 'PILLAR GUIDE · UPDATED 2026',
      h1: 'Pet-Friendly Hotels in Europe: The Complete 2026 Guide',
      lede: 'Everything you need to know to find, evaluate and book a hotel that genuinely welcomes your dog or cat in Europe, chains that accept pets, country-by-country rules, what to ask before booking, and our handpicked selections across 85 destinations.',
    },
    toc: { title: 'In this guide', items: [
      { id: 'what-to-look', label: 'What to look for in a pet-friendly hotel' },
      { id: 'chains', label: 'Best pet-friendly hotel chains in Europe' },
      { id: 'by-category', label: 'By category: luxury, beach, budget, near-parks' },
      { id: 'by-country', label: 'By country: rules and pet-fee culture' },
      { id: 'booking-tips', label: 'Booking tips that save money' },
      { id: 'what-to-ask', label: 'What to ask before booking' },
      { id: 'faq', label: 'Frequently asked questions' },
    ] },
    whatToLook: {
      id: 'what-to-look',
      h2: 'What actually makes a hotel "pet-friendly"',
      paras: [
        'The phrase "pet-friendly" is unregulated. Booking.com, Hotels.com and Airbnb all let properties self-tag as pet-friendly without verification, which means a "pet-friendly" listing could be anything from a five-star with a dedicated pet concierge to a hostel that grudgingly accepts a dog after a £40 deposit. Our role is to filter the noise.',
        'A genuinely pet-friendly hotel, by our standard, meets at least four of these six criteria: pets accepted in standard rooms (not just a single "pet-allowed" room), no breed or weight discrimination beyond reasonable safety norms, a reasonable fee (€0-€30 per stay or per night, not £100+), water bowls or pet beds available on request, no requirement for the dog to be left in a kennel during the day, and proximity to off-leash green space (under 500 m walking distance).',
        'These criteria sound simple but they eliminate 60-70% of "pet-friendly" listings on Booking.com. The hotels we list across our 85 destination guides have all been audited against this checklist before being included.',
      ],
      checks: {
        title: 'The 6-point pet-friendly hotel checklist',
        items: [
          'Pets accepted in standard rooms (not segregated to one specific room)',
          'No breed-specific bans beyond local PPP/dangerous-dogs law',
          'Pet fee under €30 per stay (or under €15 per night)',
          'Water bowls or pet bed available on request',
          'Dog can stay in the room while you go out (no kennel-during-day rule)',
          'Off-leash green space within 500 m walk',
        ],
      },
    },
    chains: {
      id: 'chains',
      h2: 'The 12 most reliable pet-friendly hotel chains in Europe',
      paras: [
        'Chain hotels offer the safest pet-friendly bet because they apply the same policy across every property. If you book Hilton Pet Welcome at one location, the next location will follow the same rules, useful for multi-city itineraries.',
        'Below is a comparison of the 12 chains with the most consistent pet policies in Europe. We exclude chains where pet acceptance is left to individual property managers (which is most of them, including Marriott in some regions).',
      ],
      rows: [
        { chain: 'Adina Apartment Hotels', policy: 'Pets accepted in selected apartments', fee: '€15 per night', note: 'Apartments include kitchenette, useful for pet meals' },
        { chain: 'Apex Hotels (UK)', policy: 'Chain-wide pet welcome', fee: '£20 per stay', note: 'Indoor pools, central UK locations' },
        { chain: 'Hilton (Pet Welcome programme)', policy: 'Most properties accept; check individual', fee: '€30-€75 per stay', note: 'Higher fee but luxury level' },
        { chain: 'Holiday Inn / Holiday Inn Express (IHG)', policy: 'Most properties accept', fee: '€15-€20 per night', note: 'Reliable mid-range, ubiquitous' },
        { chain: 'Hospes Hotels', policy: 'All properties accept', fee: '€25 per stay', note: '5-star Spanish boutique chain' },
        { chain: 'Hotel Indigo (IHG)', policy: 'Chain-wide pet-welcome', fee: '€25 per stay', note: 'Boutique 4-star, urban locations' },
        { chain: 'Mercure (Accor)', policy: 'Most properties accept', fee: '€10-€20 per night', note: 'Strong French/Italian network' },
        { chain: 'Motel One', policy: 'Pet-friendly chain-wide since 2024', fee: '€10 per night', note: 'Budget design hotels, growing fast' },
        { chain: '25hours Hotels', policy: 'Pet welcome kit included', fee: '€20 per stay', note: 'Design-led 4-star, water bowls included' },
        { chain: 'Scandic Hotels', policy: 'Chain-wide pet acceptance', fee: '€20 per stay', note: 'Strong Nordic + German network' },
        { chain: 'Travelodge', policy: 'Pets accepted in most UK properties', fee: '£25 per stay', note: 'UK budget chain, max 2 pets per room' },
        { chain: 'NH Hotels / NH Collection', policy: 'Pet-friendly across the chain', fee: '€20-€25 per night', note: 'Strong Spain, Italy, Germany footprint' },
      ],
    },
    byCategory: {
      id: 'by-category',
      h2: 'By category: which type of pet-friendly hotel suits you',
      paras: [
        'Pet acceptance is just the entry ticket, the right category for you depends on your trip. A beach holiday with a dog needs different criteria than a city break with a cat. We\'ve organised our 460+ pet-friendly hotels into six categories that match common travel intents.',
        'Click any category below to browse our handpicked selection across all 85 destinations.',
      ],
      intro: 'Browse our 6 pet-friendly hotel categories',
    },
    byCountry: {
      id: 'by-country',
      h2: 'By country: pet-fee culture and local rules',
      paras: [
        'Hotel pet policies vary significantly across Europe, both the average pet fee and the average enforcement style. Below we\'ve summarised the practical realities country by country, drawing from our audit of 460+ hotels.',
      ],
    },
    countryNotes: {
      France: 'France is one of the most pet-tolerant countries, over 50% of hotels accept pets, average fee €15-€25 per stay. Independent hotels are typically cheaper than chains. EU pet passport rules apply standard.',
      Germany: 'Germany leads on dog-friendliness in Europe. Hotels rarely refuse, average fee €10-€20 per night. Berlin, Hamburg and Munich have the highest density of pet-welcome chains. Dogs in restaurants is the norm.',
      Spain: 'Spain pet-friendliness has grown rapidly, pet fee averages €15-€20 per night. Madrid and Barcelona lead on chains; Andalusia (Seville, Cordoba, Granada) is excellent in spring/autumn but extreme summer heat is the main constraint.',
      Italy: 'Italian law (Legge 281/1991) gives dogs strong access rights but hotels apply pet fees more aggressively than France or Germany, often €25-€40 per stay. Trains (Trenitalia) accept dogs with paperwork.',
      'United Kingdom': 'Post-Brexit: dogs entering the UK from the EU need an Animal Health Certificate (AHC, valid 10 days) plus mandatory tapeworm treatment. Pet fee average £25-£50 per stay. Pubs welcoming dogs is the British cultural baseline.',
      Netherlands: 'Pet-friendly culture is exceptional in Amsterdam, Rotterdam and The Hague. Hotels usually charge €15-€25 per stay. Dogs ride trams and trains for €3.40 day pass.',
      Belgium: 'Strong pet-acceptance, especially in Antwerp and Ghent. Hotel fees typically €15-€25. Belgian beer gardens and brasseries are universally dog-tolerant.',
      Portugal: 'Lisbon and Porto are exceptionally dog-friendly. Hotel fees often €10-€20 per stay (cheaper than Spain). Trams and trains accept dogs.',
      Switzerland: 'Most expensive country in Europe but most consistent pet-acceptance. Average fee CHF 30-50 per night. Trains and cable cars accept dogs free or half-price.',
      Austria: 'Very dog-friendly. Vienna and Salzburg lead. Average pet fee €10-€20 per night. Trains (ÖBB) accept dogs.',
      Denmark: 'Copenhagen leads Europe on pet welfare. Hotels typically charge DKK 150-300 per stay. Dogs ride metro and S-tog free with muzzle.',
      Sweden: 'Stockholm and Gothenburg both pet-welcoming. Hotel fees average SEK 200-400 per night. Dogs accepted on trains.',
      Norway: 'Oslo dog-friendly culture is intense. Hotel fees average NOK 200-500. Dogs free on most public transport.',
      Finland: 'Helsinki has the highest dog-density in Europe. Hotels typically free for small dogs, €10-€20 for large. Dogs free on all public transport.',
      Iceland: 'Strict pet import rules (4-week minimum quarantine bypass requires extensive paperwork and high fees). Once there, Reykjavík is welcoming. Hotels typically charge ISK 5000-8000 per stay.',
      Ireland: 'Dublin pet-friendliness has improved. Hotels charge €15-€25. Note: same rules as UK for entering Northern Ireland.',
      Greece: 'Athens and Thessaloniki improving. Hotels typically €10-€15 per stay. Beach restrictions tight in summer.',
      'Czech Republic': 'Prague very dog-friendly. Hotels charge CZK 200-500 per stay. Dogs accepted on metro and trams.',
      Hungary: 'Budapest welcoming. Hotels charge HUF 3000-6000 per stay. Dogs ride metro free with muzzle.',
      Slovenia: 'Ljubljana and Bled both pet-friendly. Hotels charge €10-€15 per stay.',
      Croatia: 'Dubrovnik and Split improving but Croatian beach bans (15 May–30 Sep) are strict. Hotels charge €10-€20.',
      Poland: 'Warsaw and Krakow have growing pet-welcome scene. Hotels charge PLN 50-100 per stay.',
      Latvia: 'Riga improving. Hotels typically €10-€15.',
      Estonia: 'Tallinn pet-friendly. Hotels typically €10.',
      Slovakia: 'Bratislava welcoming. Hotels typically €10-€15.',
      Romania: 'Bucharest improving rapidly. Hotels typically RON 30-60.',
      Bulgaria: 'Sofia welcoming. Hotels typically BGN 20-40.',
      Serbia: 'Belgrade welcoming, public transport free for dogs since 2025. Hotels typically RSD 1500-3000.',
      Lithuania: 'Vilnius welcoming. Hotels typically €10.',
      Luxembourg: 'Pet-friendly. Hotels charge €15-€25.',
    },
    bookingTips: {
      id: 'booking-tips',
      h2: 'Booking tips that save money',
      paras: [
        'Pet fees are negotiable more often than people realise. Hotel-direct booking (not via Booking.com) gives you leverage on the fee, about 30% of independent hotels will waive or reduce it for direct guests. Always email the hotel before booking to confirm exact terms.',
      ],
      bullets: [
        'Book direct (not Booking.com) for better pet-fee negotiation, independent hotels often waive 20-50% for direct bookings.',
        'For multi-night stays, ask about a flat pet rate vs nightly fee. A €15/night fee on 7 nights is €105; many hotels will switch to €60 flat if asked.',
        'Loyalty programmes pay off: Hilton Honors, IHG One Rewards and Accor Live Limitless members get pet-fee waivers at top tiers.',
        'Avoid "pet-allowed" rooms tagged as the only option, these are often cleaning-fee-loaded. Standard rooms with a pet-allowed-on-request setup are usually cheaper.',
        'Dog beach resorts: book in shoulder season (April-May, October-November), same hotel, 30-40% less expensive than peak summer.',
        'For trips longer than 7 nights, an Airbnb often beats hotels on total pet cost (one cleaning fee vs daily pet fee). Filter for "pets allowed" + verified reviews mentioning pets.',
      ],
    },
    whatToAsk: {
      id: 'what-to-ask',
      h2: 'What to ask before booking',
      intro: 'Before you confirm a booking, send a short email to the hotel with these questions. The reply tells you everything about whether the hotel is genuinely welcoming or just \'pet-allowed\' on paper.',
      questions: [
        'Are pets accepted in any standard room, or only specific ones?',
        'Is the pet fee per stay or per night? Does it include cleaning?',
        'Are there breed or weight restrictions beyond legal PPP/dangerous-dog rules?',
        'Can my dog stay in the room while I\'m at dinner / in the spa?',
        'Do you provide bowls, beds, or treats? Or should I bring my own?',
        'Is there a dog-walking area / off-leash space within walking distance?',
        'Do you accept multiple pets? If yes, is the fee per pet or capped?',
        'Where do dogs need to be on leash / muzzled inside the property?',
        'Do you have a recommended local vet (in case of emergency)?',
        'What\'s the cancellation policy if my pet is unwell on arrival day?',
      ],
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'What\'s the average pet fee in European hotels?', a: 'The European average is €15-€25 per stay for an independent hotel and €20-€30 per night for chains. Switzerland and the UK are at the high end (CHF 30-50 / £40-£60). Eastern Europe is at the low end (€5-€10).' },
      { q: 'Do all hotels accept cats too?', a: 'Most "dog-friendly" hotels also accept cats, but not always advertised. Always ask explicitly: about 80% of dog-accepting hotels also accept cats with prior notice.' },
      { q: 'What if my dog barks at night?', a: 'Hotels reserve the right to charge a disturbance fee or evict. Practical solutions: book a corner room, end-of-corridor room, or ground-floor room. Bring a familiar blanket or toy. ThunderShirts and Adaptil sprays help anxious dogs.' },
      { q: 'Are there pet-only floors in any chains?', a: 'Yes, Kimpton, Hilton (some properties) and 25hours have dedicated pet floors at select locations. Ask explicitly when booking.' },
      { q: 'How do I know if a hotel is genuinely pet-friendly vs just pet-tolerated?', a: 'Three indicators: (1) the hotel mentions specific pet amenities (bowls, beds, treats) on its website, (2) the pet fee is reasonable (€10-€25, not £75+), (3) the staff response to your pre-booking email is enthusiastic, not hesitant. We pre-screen all hotels in our destination guides.' },
      { q: 'What about service dogs / assistance dogs?', a: 'Service dogs are admitted free of charge to all EU hotels by law (Regulation 2016/679 + national implementations) and to all UK hotels (Equality Act 2010). The pet fee does not apply. Bring documentation.' },
      { q: 'Can I leave my dog alone in the hotel room?', a: 'Most pet-friendly European hotels prohibit unattended pets. Workarounds: book a Pawshake/Tailster sitter for the few hours you need, or use the in-room day-care service offered at Kimpton, 25hours and some Hilton properties.' },
      { q: 'Is it cheaper to book on Booking.com or direct?', a: 'For pet bookings, direct usually wins. Booking.com may have a slightly lower base rate but pet fees are usually identical and you lose flexibility on negotiation. Direct booking gives you leverage to ask "can the pet fee be waived for this 5-night stay?"' },
    ],
    ctaTitle: 'Ready to find your hotel?',
    ctaDesc: 'Browse our handpicked pet-friendly hotels across 85 European destinations, all audited for genuine pet-welcome policies, with verified guest ratings 8.0+.',
    ctaButton: 'See all destinations →',
    hotelLabel: 'hotels',
    destLabel: 'destinations',
    viewCategoryLabel: 'View category →',
  },
  fr: {
    hero: {
      kicker: 'GUIDE PILIER · MIS À JOUR 2026',
      h1: 'Hôtels pet-friendly en Europe : le guide complet 2026',
      lede: 'Tout ce que vous devez savoir pour trouver, évaluer et réserver un hôtel qui accueille vraiment votre chien ou chat en Europe, chaînes qui acceptent les animaux, règles pays par pays, questions à poser avant de réserver et nos sélections soignées dans 85 destinations.',
    },
    toc: { title: 'Dans ce guide', items: [
      { id: 'what-to-look', label: 'Ce qu\'il faut chercher dans un hôtel pet-friendly' },
      { id: 'chains', label: 'Les meilleures chaînes hôtelières pet-friendly d\'Europe' },
      { id: 'by-category', label: 'Par catégorie : luxe, plage, budget, près des parcs' },
      { id: 'by-country', label: 'Par pays : règles et culture du supplément animal' },
      { id: 'booking-tips', label: 'Astuces de réservation qui font économiser' },
      { id: 'what-to-ask', label: 'Quelles questions poser avant de réserver' },
      { id: 'faq', label: 'Questions fréquentes' },
    ] },
    whatToLook: {
      id: 'what-to-look',
      h2: 'Ce qui rend vraiment un hôtel « pet-friendly »',
      paras: [
        'L\'expression « pet-friendly » n\'est pas régulée. Booking.com, Hotels.com et Airbnb laissent les établissements s\'auto-tagger comme pet-friendly sans vérification, ce qui signifie qu\'une annonce « pet-friendly » peut aller du cinq étoiles avec concierge dédié au pet à l\'auberge qui accepte un chien à contrecœur après une caution de 40 £. Notre rôle est de filtrer le bruit.',
        'Un hôtel vraiment pet-friendly, selon notre standard, coche au moins quatre des six critères suivants : animaux acceptés dans toutes les chambres standard (pas seulement dans une chambre « pet-allowed » spécifique), pas de discrimination par race ou poids au-delà des normes de sécurité raisonnables, supplément raisonnable (0-30 € par séjour ou par nuit, pas 100 £+), gamelles ou paniers disponibles sur demande, pas d\'obligation de laisser le chien en chenil pendant la journée, et proximité d\'un espace vert sans laisse (à moins de 500 m à pied).',
        'Ces critères paraissent simples mais ils éliminent 60-70 % des annonces « pet-friendly » de Booking.com. Les hôtels listés dans nos 85 guides de destination ont tous été audités selon cette checklist avant inclusion.',
      ],
      checks: {
        title: 'La checklist en 6 points d\'un hôtel pet-friendly',
        items: [
          'Animaux acceptés dans toute chambre standard (pas dans une chambre spécifique)',
          'Pas d\'interdiction par race au-delà des règles locales PPP/chiens dangereux',
          'Supplément animal sous 30 € par séjour (ou sous 15 € par nuit)',
          'Gamelles ou panier disponibles sur demande',
          'Le chien peut rester en chambre pendant que vous sortez (pas de règle « chenil en journée »)',
          'Espace vert sans laisse à moins de 500 m à pied',
        ],
      },
    },
    chains: {
      id: 'chains',
      h2: 'Les 12 chaînes hôtelières pet-friendly les plus fiables d\'Europe',
      paras: [
        'Les hôtels de chaîne offrent le pari pet-friendly le plus sûr car ils appliquent la même politique sur chaque établissement. Si vous réservez Hilton Pet Welcome à un endroit, le suivant suivra les mêmes règles, pratique pour les itinéraires multi-villes.',
        'Voici une comparaison des 12 chaînes avec les politiques animaux les plus consistantes en Europe. Nous excluons les chaînes où l\'acceptation est laissée aux directeurs individuels (la majorité, dont Marriott dans certaines régions).',
      ],
      rows: [
        { chain: 'Adina Apartment Hotels', policy: 'Animaux acceptés dans appartements sélectionnés', fee: '15 €/nuit', note: 'Appartements avec kitchenette, pratique pour les repas du chien' },
        { chain: 'Apex Hotels (UK)', policy: 'Tout le réseau', fee: '20 £/séjour', note: 'Piscines couvertes, emplacements UK centraux' },
        { chain: 'Hilton (programme Pet Welcome)', policy: 'La plupart des hôtels ; vérifier individuellement', fee: '30-75 €/séjour', note: 'Plus cher mais niveau luxe' },
        { chain: 'Holiday Inn / Holiday Inn Express (IHG)', policy: 'La plupart des hôtels', fee: '15-20 €/nuit', note: 'Milieu de gamme fiable, omniprésent' },
        { chain: 'Hospes Hotels', policy: 'Tout le réseau', fee: '25 €/séjour', note: 'Chaîne boutique 5 étoiles espagnole' },
        { chain: 'Hotel Indigo (IHG)', policy: 'Tout le réseau', fee: '25 €/séjour', note: 'Boutique 4 étoiles, urbain' },
        { chain: 'Mercure (Accor)', policy: 'La plupart des hôtels', fee: '10-20 €/nuit', note: 'Fort réseau France/Italie' },
        { chain: 'Motel One', policy: 'Pet-friendly tout le réseau depuis 2024', fee: '10 €/nuit', note: 'Hôtels design budget en pleine croissance' },
        { chain: '25hours Hotels', policy: 'Kit pet inclus', fee: '20 €/séjour', note: 'Design 4 étoiles, gamelles fournies' },
        { chain: 'Scandic Hotels', policy: 'Tout le réseau', fee: '20 €/séjour', note: 'Fort réseau nordique + allemand' },
        { chain: 'Travelodge', policy: 'Animaux acceptés dans la plupart des hôtels UK', fee: '25 £/séjour', note: 'Chaîne budget UK, max 2 animaux/chambre' },
        { chain: 'NH Hotels / NH Collection', policy: 'Pet-friendly sur tout le réseau', fee: '20-25 €/nuit', note: 'Forte empreinte Espagne, Italie, Allemagne' },
      ],
    },
    byCategory: {
      id: 'by-category',
      h2: 'Par catégorie : quel type d\'hôtel pet-friendly vous convient',
      paras: [
        'L\'acceptation des animaux n\'est que le ticket d\'entrée, la bonne catégorie pour vous dépend de votre voyage. Des vacances plage avec un chien ont besoin de critères différents qu\'une escapade urbaine avec un chat. Nous avons organisé nos 460+ hôtels pet-friendly en six catégories qui correspondent aux intentions de voyage courantes.',
        'Cliquez sur une catégorie ci-dessous pour parcourir notre sélection soignée dans les 85 destinations.',
      ],
      intro: 'Parcourez nos 6 catégories d\'hôtels pet-friendly',
    },
    byCountry: {
      id: 'by-country',
      h2: 'Par pays : culture du supplément animal et règles locales',
      paras: [
        'Les politiques animales hôtelières varient significativement à travers l\'Europe, autant le tarif moyen que le style d\'application. Voici les réalités pratiques pays par pays, tirées de notre audit de 460+ hôtels.',
      ],
    },
    countryNotes: {
      France: 'La France est l\'un des pays les plus tolérants envers les animaux, plus de 50 % des hôtels acceptent, supplément moyen 15-25 €/séjour. Les hôtels indépendants sont généralement moins chers que les chaînes. Règles passeport européen standard.',
      Germany: 'L\'Allemagne mène l\'Europe sur la dog-friendliness. Les hôtels refusent rarement, supplément moyen 10-20 €/nuit. Berlin, Hambourg et Munich ont la plus forte densité de chaînes pet-welcome. Chiens en restaurant la norme.',
      Spain: 'La pet-friendliness espagnole a vite progressé, supplément moyen 15-20 €/nuit. Madrid et Barcelone mènent sur les chaînes ; l\'Andalousie (Séville, Cordoue, Grenade) excelle au printemps/automne mais la canicule est la contrainte principale.',
      Italy: 'La loi italienne (Legge 281/1991) donne aux chiens des droits d\'accès forts mais les hôtels appliquent les suppléments plus agressivement que France ou Allemagne, souvent 25-40 €/séjour. Les trains (Trenitalia) acceptent les chiens avec papiers.',
      'United Kingdom': 'Post-Brexit : chiens UE entrant au UK ont besoin d\'un Animal Health Certificate (AHC, 10 jours) plus traitement échinococcose obligatoire. Supplément moyen 25-50 £/séjour. Les pubs accueillant les chiens sont la base culturelle britannique.',
      Netherlands: 'La culture pet-friendly est exceptionnelle à Amsterdam, Rotterdam et La Haye. Les hôtels facturent généralement 15-25 €/séjour. Chiens dans tram et train pour 3,40 € jour.',
      Belgium: 'Forte acceptation animale, surtout à Anvers et Gand. Suppléments hôteliers généralement 15-25 €. Les beer-gardens et brasseries belges sont universellement tolérantes.',
      Portugal: 'Lisbonne et Porto sont exceptionnellement dog-friendly. Suppléments hôteliers souvent 10-20 €/séjour (moins chers qu\'Espagne). Trams et trains acceptent les chiens.',
      Switzerland: 'Pays le plus cher d\'Europe mais acceptation animale la plus consistante. Supplément moyen 30-50 CHF/nuit. Trains et téléphériques acceptent les chiens gratuitement ou demi-tarif.',
      Austria: 'Très dog-friendly. Vienne et Salzbourg mènent. Supplément moyen 10-20 €/nuit. Trains (ÖBB) acceptent les chiens.',
      Denmark: 'Copenhague mène l\'Europe sur le bien-être animal. Hôtels facturent généralement 150-300 DKK/séjour. Chiens gratuits dans métro et S-tog avec muselière.',
      Sweden: 'Stockholm et Göteborg toutes deux pet-welcoming. Supplément moyen 200-400 SEK/nuit. Chiens acceptés en train.',
      Norway: 'La culture canine d\'Oslo est intense. Supplément moyen 200-500 NOK. Chiens gratuits dans la plupart des transports.',
      Finland: 'Helsinki a la plus haute densité canine d\'Europe. Hôtels typiquement gratuits pour petits chiens, 10-20 € pour grands. Chiens gratuits dans tous les transports publics.',
      Iceland: 'Règles d\'importation animale strictes (4 semaines minimum, paperasse extensive et frais élevés). Une fois sur place, Reykjavík est accueillante. Hôtels facturent 5000-8000 ISK/séjour.',
      Ireland: 'La pet-friendliness de Dublin s\'est améliorée. Hôtels facturent 15-25 €. Note : mêmes règles que UK pour l\'Irlande du Nord.',
      Greece: 'Athènes et Thessalonique en progression. Hôtels typiquement 10-15 €/séjour. Restrictions plage strictes en été.',
      'Czech Republic': 'Prague très dog-friendly. Hôtels facturent 200-500 CZK/séjour. Chiens acceptés dans métro et trams.',
      Hungary: 'Budapest accueillante. Hôtels facturent 3000-6000 HUF/séjour. Chiens gratuits dans le métro avec muselière.',
      Slovenia: 'Ljubljana et Bled toutes deux pet-friendly. Hôtels facturent 10-15 €/séjour.',
      Croatia: 'Dubrovnik et Split en progression mais les interdictions de plage croates (15 mai-30 sep) sont strictes. Hôtels facturent 10-20 €.',
      Poland: 'Varsovie et Cracovie ont une scène pet-welcome en croissance. Hôtels facturent 50-100 PLN/séjour.',
      Latvia: 'Riga en progression. Hôtels typiquement 10-15 €.',
      Estonia: 'Tallinn pet-friendly. Hôtels typiquement 10 €.',
      Slovakia: 'Bratislava accueillante. Hôtels typiquement 10-15 €.',
      Romania: 'Bucarest progresse rapidement. Hôtels typiquement 30-60 RON.',
      Bulgaria: 'Sofia accueillante. Hôtels typiquement 20-40 BGN.',
      Serbia: 'Belgrade accueillante, transports publics gratuits depuis 2025. Hôtels typiquement 1500-3000 RSD.',
      Lithuania: 'Vilnius accueillante. Hôtels typiquement 10 €.',
      Luxembourg: 'Pet-friendly. Hôtels facturent 15-25 €.',
    },
    bookingTips: {
      id: 'booking-tips',
      h2: 'Astuces de réservation qui font économiser',
      paras: [
        'Les suppléments animaux sont négociables plus souvent qu\'on le pense. La réservation directe (pas via Booking.com) vous donne du levier, environ 30 % des hôtels indépendants annulent ou réduisent le supplément pour les clients directs. Email systématiquement l\'hôtel avant de réserver pour confirmer les conditions exactes.',
      ],
      bullets: [
        'Réservez direct (pas Booking.com) pour mieux négocier le supplément animal, les hôtels indépendants l\'annulent souvent à 20-50 %.',
        'Pour séjours multi-nuits, demandez un forfait plutôt qu\'un tarif/nuit. 15 €/nuit sur 7 nuits = 105 € ; beaucoup d\'hôtels passent à 60 € forfait sur demande.',
        'Les programmes fidélité paient : Hilton Honors, IHG One Rewards et Accor Live Limitless niveaux supérieurs ont des annulations de supplément animal.',
        'Évitez les chambres « pet-allowed » comme seule option, souvent grevées de frais de nettoyage. Les chambres standard avec animal-sur-demande sont moins chères.',
        'Resorts plage canine : réservez en mi-saison (avril-mai, octobre-novembre), même hôtel, 30-40 % moins cher qu\'en été.',
        'Pour des voyages de plus de 7 nuits, un Airbnb bat souvent les hôtels en coût animal total (un frais de ménage vs supplément quotidien).',
      ],
    },
    whatToAsk: {
      id: 'what-to-ask',
      h2: 'Quelles questions poser avant de réserver',
      intro: 'Avant de confirmer une réservation, envoyez un court email à l\'hôtel avec ces questions. La réponse vous dit tout sur la véritable hospitalité de l\'établissement.',
      questions: [
        'Les animaux sont-ils acceptés dans toute chambre standard, ou seulement dans des chambres spécifiques ?',
        'Le supplément est-il par séjour ou par nuit ? Inclut-il le ménage ?',
        'Y a-t-il des restrictions de race ou de poids au-delà des règles légales PPP ?',
        'Mon chien peut-il rester en chambre pendant que je suis au restaurant / au spa ?',
        'Fournissez-vous gamelles, paniers, friandises ? Ou dois-je apporter ?',
        'Y a-t-il une zone de promenade canine / espace sans laisse à proximité ?',
        'Acceptez-vous plusieurs animaux ? Si oui, le supplément est-il par animal ou plafonné ?',
        'Où le chien doit-il être en laisse / muselière dans l\'établissement ?',
        'Avez-vous un vétérinaire local recommandé (en cas d\'urgence) ?',
        'Quelle est la politique d\'annulation si mon animal est malade le jour d\'arrivée ?',
      ],
    },
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quel est le supplément animal moyen en hôtel européen ?', a: 'La moyenne européenne est de 15-25 €/séjour pour un hôtel indépendant et 20-30 €/nuit pour les chaînes. Suisse et UK sont en haut de fourchette (30-50 CHF / 40-60 £). Europe de l\'Est en bas (5-10 €).' },
      { q: 'Tous les hôtels acceptent-ils aussi les chats ?', a: 'La plupart des hôtels « dog-friendly » acceptent aussi les chats, pas toujours annoncé. Demandez explicitement : environ 80 % des hôtels qui acceptent les chiens acceptent aussi les chats avec préavis.' },
      { q: 'Et si mon chien aboie la nuit ?', a: 'Les hôtels se réservent le droit de facturer un supplément troubles ou d\'expulser. Solutions pratiques : chambre d\'angle, en bout de couloir ou rez-de-chaussée. Apportez couverture/jouet familier. ThunderShirts et Adaptil aident les chiens anxieux.' },
      { q: 'Y a-t-il des étages réservés aux animaux dans les chaînes ?', a: 'Oui, Kimpton, Hilton (certains hôtels) et 25hours ont des étages dédiés aux animaux dans certains emplacements. Demandez explicitement à la réservation.' },
      { q: 'Comment savoir si un hôtel est vraiment pet-friendly ou juste « pet-toléré » ?', a: 'Trois indicateurs : (1) l\'hôtel mentionne des équipements pets spécifiques (gamelles, paniers, friandises) sur son site, (2) le supplément est raisonnable (10-25 €, pas 75 £+), (3) la réponse du staff à votre email pré-réservation est enthousiaste, pas hésitante. Nous pré-filtrons tous les hôtels de nos guides destinations.' },
      { q: 'Et les chiens d\'assistance / chiens guides ?', a: 'Les chiens d\'assistance sont admis gratuitement dans tous les hôtels UE par la loi (Règlement 2016/679 + transpositions nationales) et dans tous les hôtels UK (Equality Act 2010). Le supplément ne s\'applique pas. Apportez les documents.' },
      { q: 'Puis-je laisser mon chien seul dans la chambre d\'hôtel ?', a: 'La plupart des hôtels pet-friendly européens interdisent les animaux seuls. Solutions : un sitter Pawshake/Tailster pour quelques heures, ou le service garderie en chambre de Kimpton, 25hours et certains Hilton.' },
      { q: 'Est-il moins cher de réserver sur Booking.com ou en direct ?', a: 'Pour les réservations animales, le direct gagne généralement. Booking.com peut avoir un tarif de base légèrement inférieur mais les suppléments sont identiques et vous perdez la flexibilité de négocier. Le direct vous donne le levier pour demander « le supplément animal peut-il être annulé pour ce séjour de 5 nuits ? »' },
    ],
    ctaTitle: 'Prêt à trouver votre hôtel ?',
    ctaDesc: 'Parcourez nos hôtels pet-friendly soigneusement sélectionnés dans 85 destinations européennes, tous audités pour de véritables politiques pet-welcome, avec notes voyageurs vérifiées 8,0+.',
    ctaButton: 'Voir toutes les destinations →',
    hotelLabel: 'hôtels',
    destLabel: 'destinations',
    viewCategoryLabel: 'Voir la catégorie →',
  },
  es: {
    hero: {
      kicker: 'GUÍA PILAR · ACTUALIZADO 2026',
      h1: 'Hoteles pet-friendly en Europa: la guía completa 2026',
      lede: 'Todo lo que necesitas saber para encontrar, evaluar y reservar un hotel que realmente acepta a tu perro o gato en Europa, cadenas que admiten mascotas, normas país por país, qué preguntar antes de reservar y nuestras selecciones cuidadas en 85 destinos.',
    },
    toc: { title: 'En esta guía', items: [
      { id: 'what-to-look', label: 'Qué buscar en un hotel pet-friendly' },
      { id: 'chains', label: 'Las mejores cadenas hoteleras pet-friendly de Europa' },
      { id: 'by-category', label: 'Por categoría: lujo, playa, presupuesto, cerca de parques' },
      { id: 'by-country', label: 'Por país: normas y cultura del cargo por mascota' },
      { id: 'booking-tips', label: 'Consejos de reserva que ahorran dinero' },
      { id: 'what-to-ask', label: 'Qué preguntar antes de reservar' },
      { id: 'faq', label: 'Preguntas frecuentes' },
    ] },
    whatToLook: {
      id: 'what-to-look',
      h2: 'Qué hace realmente "pet-friendly" a un hotel',
      paras: [
        'La expresión "pet-friendly" no está regulada. Booking.com, Hotels.com y Airbnb permiten que los establecimientos se etiqueten ellos mismos como pet-friendly sin verificación, lo que significa que un anuncio "pet-friendly" puede ir desde un cinco estrellas con conserjería pet dedicada hasta un albergue que admite un perro a regañadientes tras un depósito de 40 £. Nuestro papel es filtrar el ruido.',
        'Un hotel realmente pet-friendly, según nuestro estándar, cumple al menos cuatro de estos seis criterios: mascotas admitidas en cualquier habitación estándar (no solo en una específica "pet-allowed"), sin discriminación por raza o peso más allá de normas razonables de seguridad, cargo razonable (0-30 € por estancia o por noche, no 100 £+), boles o camas para mascotas disponibles a petición, sin obligación de dejar al perro en perrera durante el día, y proximidad a espacio verde sin correa (a menos de 500 m a pie).',
        'Estos criterios suenan simples pero eliminan el 60-70 % de los anuncios "pet-friendly" en Booking.com. Los hoteles listados en nuestras 85 guías de destino han sido todos auditados según esta checklist antes de incluirse.',
      ],
      checks: {
        title: 'La checklist de 6 puntos de un hotel pet-friendly',
        items: [
          'Mascotas admitidas en cualquier habitación estándar (no solo en una específica)',
          'Sin prohibiciones por raza más allá de las normas locales PPP',
          'Cargo por mascota inferior a 30 € por estancia (o inferior a 15 € por noche)',
          'Boles o cama disponibles a petición',
          'El perro puede quedarse en la habitación mientras sales (sin regla "perrera durante el día")',
          'Espacio verde sin correa a menos de 500 m a pie',
        ],
      },
    },
    chains: {
      id: 'chains',
      h2: 'Las 12 cadenas hoteleras pet-friendly más fiables de Europa',
      paras: [
        'Las cadenas hoteleras ofrecen la apuesta pet-friendly más segura porque aplican la misma política en cada propiedad. Si reservas Hilton Pet Welcome en una ubicación, la siguiente seguirá las mismas normas, útil para itinerarios multi-ciudad.',
        'A continuación una comparación de las 12 cadenas con las políticas de mascotas más consistentes en Europa. Excluimos las cadenas donde la aceptación se deja a los gestores individuales (la mayoría, incluido Marriott en algunas regiones).',
      ],
      rows: [
        { chain: 'Adina Apartment Hotels', policy: 'Mascotas admitidas en apartamentos seleccionados', fee: '15 €/noche', note: 'Apartamentos con cocinita, útil para comidas del perro' },
        { chain: 'Apex Hotels (UK)', policy: 'Toda la cadena', fee: '20 £/estancia', note: 'Piscinas cubiertas, ubicaciones UK céntricas' },
        { chain: 'Hilton (programa Pet Welcome)', policy: 'Mayoría de hoteles; verificar individualmente', fee: '30-75 €/estancia', note: 'Más caro pero nivel de lujo' },
        { chain: 'Holiday Inn / Holiday Inn Express (IHG)', policy: 'Mayoría de hoteles', fee: '15-20 €/noche', note: 'Gama media fiable, omnipresente' },
        { chain: 'Hospes Hotels', policy: 'Toda la cadena', fee: '25 €/estancia', note: 'Cadena boutique 5 estrellas española' },
        { chain: 'Hotel Indigo (IHG)', policy: 'Toda la cadena', fee: '25 €/estancia', note: 'Boutique 4 estrellas, urbano' },
        { chain: 'Mercure (Accor)', policy: 'Mayoría de hoteles', fee: '10-20 €/noche', note: 'Fuerte red Francia/Italia' },
        { chain: 'Motel One', policy: 'Pet-friendly toda la cadena desde 2024', fee: '10 €/noche', note: 'Hoteles diseño presupuesto en rápido crecimiento' },
        { chain: '25hours Hotels', policy: 'Kit pet incluido', fee: '20 €/estancia', note: 'Diseño 4 estrellas, boles incluidos' },
        { chain: 'Scandic Hotels', policy: 'Toda la cadena', fee: '20 €/estancia', note: 'Fuerte red nórdica + alemana' },
        { chain: 'Travelodge', policy: 'Mascotas admitidas en mayoría de hoteles UK', fee: '25 £/estancia', note: 'Cadena presupuesto UK, máx 2 mascotas/habitación' },
        { chain: 'NH Hotels / NH Collection', policy: 'Pet-friendly toda la cadena', fee: '20-25 €/noche', note: 'Fuerte presencia España, Italia, Alemania' },
      ],
    },
    byCategory: {
      id: 'by-category',
      h2: 'Por categoría: qué tipo de hotel pet-friendly te conviene',
      paras: [
        'La aceptación de mascotas es solo el billete de entrada, la categoría correcta para ti depende de tu viaje. Unas vacaciones de playa con perro requieren criterios diferentes que una escapada urbana con gato. Hemos organizado nuestros 460+ hoteles pet-friendly en seis categorías que se ajustan a las intenciones comunes de viaje.',
        'Haz clic en cualquier categoría a continuación para explorar nuestra selección cuidada en los 85 destinos.',
      ],
      intro: 'Explora nuestras 6 categorías de hoteles pet-friendly',
    },
    byCountry: {
      id: 'by-country',
      h2: 'Por país: cultura del cargo por mascota y normas locales',
      paras: [
        'Las políticas de mascotas hoteleras varían significativamente por Europa, tanto el cargo medio como el estilo de aplicación. A continuación, las realidades prácticas país por país, extraídas de nuestra auditoría de 460+ hoteles.',
      ],
    },
    countryNotes: {
      France: 'Francia es uno de los países más tolerantes con mascotas, más del 50 % de los hoteles las admiten, cargo medio 15-25 €/estancia. Los hoteles independientes son típicamente más baratos que las cadenas. Normas pasaporte UE estándar.',
      Germany: 'Alemania lidera Europa en dog-friendliness. Los hoteles raramente rechazan, cargo medio 10-20 €/noche. Berlín, Hamburgo y Múnich tienen la mayor densidad de cadenas pet-welcome. Perros en restaurantes la norma.',
      Spain: 'La pet-friendliness española ha crecido rápidamente, cargo medio 15-20 €/noche. Madrid y Barcelona lideran en cadenas; Andalucía (Sevilla, Córdoba, Granada) excelente en primavera/otoño pero el calor extremo estival es la principal restricción.',
      Italy: 'La ley italiana (Legge 281/1991) da a los perros derechos de acceso fuertes pero los hoteles aplican cargos más agresivamente que Francia o Alemania, a menudo 25-40 €/estancia. Los trenes (Trenitalia) admiten perros con papeleo.',
      'United Kingdom': 'Post-Brexit: perros UE entrando al UK necesitan un Animal Health Certificate (AHC, 10 días) más tratamiento obligatorio contra equinococosis. Cargo medio 25-50 £/estancia. Los pubs admitiendo perros son la base cultural británica.',
      Netherlands: 'La cultura pet-friendly es excepcional en Ámsterdam, Róterdam y La Haya. Los hoteles cobran típicamente 15-25 €/estancia. Perros en tranvía y tren por 3,40 € pase diario.',
      Belgium: 'Fuerte aceptación de mascotas, especialmente en Amberes y Gante. Cargos hoteleros típicamente 15-25 €. Beer-gardens y brasseries belgas universalmente tolerantes.',
      Portugal: 'Lisboa y Oporto excepcionalmente dog-friendly. Cargos hoteleros a menudo 10-20 €/estancia (más baratos que España). Tranvías y trenes admiten perros.',
      Switzerland: 'País más caro de Europa pero aceptación de mascotas más consistente. Cargo medio 30-50 CHF/noche. Trenes y teleféricos admiten perros gratis o media tarifa.',
      Austria: 'Muy dog-friendly. Viena y Salzburgo lideran. Cargo medio 10-20 €/noche. Trenes (ÖBB) admiten perros.',
      Denmark: 'Copenhague lidera Europa en bienestar animal. Hoteles cobran típicamente 150-300 DKK/estancia. Perros gratis en metro y S-tog con bozal.',
      Sweden: 'Estocolmo y Gotemburgo ambas pet-welcoming. Cargo medio 200-400 SEK/noche. Perros admitidos en tren.',
      Norway: 'Cultura canina de Oslo intensa. Cargo medio 200-500 NOK. Perros gratis en mayoría de transportes.',
      Finland: 'Helsinki tiene la mayor densidad canina de Europa. Hoteles típicamente gratis para perros pequeños, 10-20 € para grandes. Perros gratis en todo el transporte público.',
      Iceland: 'Normas estrictas de importación de mascotas (4 semanas mínimo, papeleo extenso, tarifas altas). Una vez allí, Reikiavik es acogedora. Hoteles cobran 5000-8000 ISK/estancia.',
      Ireland: 'La pet-friendliness de Dublín ha mejorado. Hoteles cobran 15-25 €. Nota: mismas normas que UK para Irlanda del Norte.',
      Greece: 'Atenas y Tesalónica mejorando. Hoteles típicamente 10-15 €/estancia. Restricciones de playa estrictas en verano.',
      'Czech Republic': 'Praga muy dog-friendly. Hoteles cobran 200-500 CZK/estancia. Perros admitidos en metro y tranvías.',
      Hungary: 'Budapest acogedora. Hoteles cobran 3000-6000 HUF/estancia. Perros gratis en metro con bozal.',
      Slovenia: 'Liubliana y Bled ambas pet-friendly. Hoteles cobran 10-15 €/estancia.',
      Croatia: 'Dubrovnik y Split mejorando pero las prohibiciones de playa croatas (15 mayo-30 sep) son estrictas. Hoteles cobran 10-20 €.',
      Poland: 'Varsovia y Cracovia tienen escena pet-welcome creciente. Hoteles cobran 50-100 PLN/estancia.',
      Latvia: 'Riga mejorando. Hoteles típicamente 10-15 €.',
      Estonia: 'Tallin pet-friendly. Hoteles típicamente 10 €.',
      Slovakia: 'Bratislava acogedora. Hoteles típicamente 10-15 €.',
      Romania: 'Bucarest mejorando rápidamente. Hoteles típicamente 30-60 RON.',
      Bulgaria: 'Sofía acogedora. Hoteles típicamente 20-40 BGN.',
      Serbia: 'Belgrado acogedora, transporte público gratis para perros desde 2025. Hoteles típicamente 1500-3000 RSD.',
      Lithuania: 'Vilna acogedora. Hoteles típicamente 10 €.',
      Luxembourg: 'Pet-friendly. Hoteles cobran 15-25 €.',
    },
    bookingTips: {
      id: 'booking-tips',
      h2: 'Consejos de reserva que ahorran dinero',
      paras: [
        'Los cargos por mascota son negociables más a menudo de lo que la gente cree. La reserva directa (no vía Booking.com) te da palanca, alrededor del 30 % de los hoteles independientes anularán o reducirán el cargo para huéspedes directos. Siempre envía un email al hotel antes de reservar para confirmar las condiciones exactas.',
      ],
      bullets: [
        'Reserva directo (no Booking.com) para mejor negociación de cargo por mascota, los hoteles independientes a menudo lo anulan al 20-50 % por reservas directas.',
        'Para estancias multi-noche, pide tarifa plana en vez de cargo por noche. 15 €/noche en 7 noches = 105 €; muchos hoteles cambiarán a 60 € plano si se les pide.',
        'Los programas de fidelidad valen la pena: miembros de Hilton Honors, IHG One Rewards y Accor Live Limitless niveles superiores tienen anulaciones de cargo por mascota.',
        'Evita habitaciones "pet-allowed" tildadas como única opción, suelen ir cargadas con tarifa de limpieza. Las habitaciones estándar con setup pet-allowed-on-request suelen ser más baratas.',
        'Resorts de playa canina: reserva en temporada media (abril-mayo, octubre-noviembre), mismo hotel, 30-40 % menos caro que en pico estival.',
        'Para viajes de más de 7 noches, un Airbnb suele superar a hoteles en coste total de mascota (una tarifa de limpieza vs cargo diario).',
      ],
    },
    whatToAsk: {
      id: 'what-to-ask',
      h2: 'Qué preguntar antes de reservar',
      intro: 'Antes de confirmar una reserva, envía un email corto al hotel con estas preguntas. La respuesta te dice todo sobre si el hotel es genuinamente acogedor o solo "pet-allowed" sobre el papel.',
      questions: [
        '¿Las mascotas se admiten en cualquier habitación estándar, o solo en específicas?',
        '¿El cargo por mascota es por estancia o por noche? ¿Incluye limpieza?',
        '¿Hay restricciones de raza o peso más allá de las normas legales PPP?',
        '¿Mi perro puede quedarse en la habitación mientras estoy en la cena / en el spa?',
        '¿Proporcionan boles, camas o golosinas? ¿O debería traerlos yo?',
        '¿Hay zona de paseo canino / espacio sin correa a poca distancia?',
        '¿Admiten varias mascotas? Si sí, ¿el cargo es por mascota o tope?',
        '¿Dónde debe ir el perro con correa / bozal dentro del establecimiento?',
        '¿Tienen un veterinario local recomendado (en caso de urgencia)?',
        '¿Cuál es la política de cancelación si mi mascota está enferma el día de llegada?',
      ],
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cuál es el cargo por mascota medio en hoteles europeos?', a: 'El promedio europeo es 15-25 €/estancia para un hotel independiente y 20-30 €/noche para cadenas. Suiza y UK están en el extremo alto (30-50 CHF / 40-60 £). Europa del Este en el bajo (5-10 €).' },
      { q: '¿Todos los hoteles admiten también gatos?', a: 'La mayoría de hoteles "dog-friendly" también admiten gatos, pero no siempre se anuncia. Pregunta siempre explícitamente: aproximadamente el 80 % de los hoteles que admiten perros también admiten gatos con preaviso.' },
      { q: '¿Y si mi perro ladra de noche?', a: 'Los hoteles se reservan el derecho de cobrar tarifa de molestia o expulsar. Soluciones prácticas: habitación de esquina, final de pasillo o planta baja. Trae manta o juguete familiar. ThunderShirts y Adaptil ayudan a perros ansiosos.' },
      { q: '¿Hay plantas reservadas para mascotas en alguna cadena?', a: 'Sí, Kimpton, Hilton (algunos hoteles) y 25hours tienen plantas dedicadas a mascotas en ubicaciones seleccionadas. Pregunta explícitamente al reservar.' },
      { q: '¿Cómo sé si un hotel es genuinamente pet-friendly o solo pet-tolerado?', a: 'Tres indicadores: (1) el hotel menciona equipamientos pet específicos (boles, camas, golosinas) en su web, (2) el cargo por mascota es razonable (10-25 €, no 75 £+), (3) la respuesta del staff a tu email pre-reserva es entusiasta, no vacilante. Pre-filtramos todos los hoteles en nuestras guías de destino.' },
      { q: '¿Y los perros de servicio / asistencia?', a: 'Los perros de servicio se admiten gratis en todos los hoteles UE por ley (Reglamento 2016/679 + transposiciones nacionales) y en todos los hoteles UK (Equality Act 2010). El cargo por mascota no aplica. Lleva la documentación.' },
      { q: '¿Puedo dejar a mi perro solo en la habitación del hotel?', a: 'La mayoría de hoteles pet-friendly europeos prohíben mascotas sin vigilancia. Soluciones: un cuidador Pawshake/Tailster por las horas que necesites, o el servicio de guardería en habitación que ofrecen Kimpton, 25hours y algunos Hilton.' },
      { q: '¿Es más barato reservar en Booking.com o directo?', a: 'Para reservas con mascota, lo directo suele ganar. Booking.com puede tener una tarifa base ligeramente inferior pero los cargos de mascota suelen ser idénticos y pierdes flexibilidad de negociación. La reserva directa te da palanca para preguntar "¿se puede anular el cargo por mascota para esta estancia de 5 noches?"' },
    ],
    ctaTitle: '¿Listo para encontrar tu hotel?',
    ctaDesc: 'Explora nuestros hoteles pet-friendly cuidadosamente seleccionados en 85 destinos europeos, todos auditados por políticas pet-welcome genuinas, con valoraciones verificadas 8,0+.',
    ctaButton: 'Ver todos los destinos →',
    hotelLabel: 'hoteles',
    destLabel: 'destinos',
    viewCategoryLabel: 'Ver categoría →',
  },
  pt: {
    hero: {
      kicker: 'GUÍA PILAR · Atualizado 2026',
      h1: 'Hotéis pet-friendly em Europa: a guía completa 2026',
      lede: 'Todo lo que necesitas saber para encontrar, avaliar e reservar um hotel que realmente aceita ao teu cão o gato em Europa, cadenas que admitem animais, normas país por país, que preguntar antes de reservar e nuestras selecciones cuidadas em 15 destinos.',
    },
    toc: { title: 'Em esta guía', items: [
      { id: 'what-to-look', label: 'Que buscar num hotel pet-friendly' },
      { id: 'chains', label: 'As MELHORES cadenas hoteleras pet-friendly de Europa' },
      { id: 'by-category', label: 'Por categoría: lujo, praia, presupuesto, perto de parques' },
      { id: 'by-country', label: 'Por país: normas e cultura do cargo por animal' },
      { id: 'booking-tips', label: 'Consejos de reserva que ahorran dinero' },
      { id: 'what-to-ask', label: 'Que preguntar antes de reservar' },
      { id: 'faq', label: 'Preguntas frecuentes' },
    ] },
    whatToLook: {
      id: 'what-to-look',
      h2: 'Que hace realmente "pet-friendly" a um hotel',
      paras: [
        'A expresión "pet-friendly" no está regulada. Booking.com, Hotels.com e Airbnb permiten que os establecimientos se etiqueten ellos mismos como pet-friendly sem verificación, lo que significa que um anuncio "pet-friendly" pode ir desde um cinco estrellas com conserjería pet dedicada até um albergue que admite um cão a reganhadientes tras um depósito de 40 £. Nuestro papel é filtrar o ruido.',
        'Um hotel realmente pet-friendly, segundo nuestro estándar, cumple al menos cuatro destes seis critérios: animais admitidas em cualquier habitación estándar (no só numa específica "pet-allowed"), sem discriminación por raza o peso mais allá de normas razonables de seguridad, cargo razonable (0-30 € por estadia o por noite, no 100 £+), boles o camas para animais disponibles a petición, sem obrigação de deixar al cão em perrera durante o dia, e proximidad a espaço verde sem trela (a menos de 500 m a pé).',
        'Estes critérios suenan simples mas eliminan o 60-70 % dois anuncios "pet-friendly" em Booking.com. Os hotéis listados em nuestras 85 guías de destino foram todos auditados segundo esta checklist antes de incluirse.',
      ],
      checks: {
        title: 'A checklist de 6 puntos de um hotel pet-friendly',
        items: [
          'Animais admitidas em cualquier habitación estándar (no só numa específica)',
          'Sem prohibiciones por raza mais allá das normas locales PPP',
          'Cargo por animal inferior a 30 € por estadia (o inferior a 15 € por noite)',
          'Boles o cama disponibles a petición',
          'O cão pode quedarse na habitación mientras sales (sem regla "perrera durante o dia")',
          'Espaço verde sem trela a menos de 500 m a pé',
        ],
      },
    },
    chains: {
      id: 'chains',
      h2: 'As 12 cadenas hoteleras pet-friendly mais fiables de Europa',
      paras: [
        'As cadenas hoteleras ofrecen a apuesta pet-friendly mais segura porque aplicam a misma política em cada propiedad. Si reservas Hilton Pet Welcome numa ubicación, a siguiente seguirá as mismas normas, útil para itinerários multi-cidade.',
        'A continuación uma comparación das 12 cadenas com as políticas de animais mais consistentes em Europa. Excluimos as cadenas onde a aceitação se deixa aos gestores individuales (a mayoría, incluido Marriott em algunas regiões).',
      ],
      rows: [
        { chain: 'Adina Apartment Hotels', policy: 'Animais admitidas em apartamentos seleccionados', fee: '15 €/noite', note: 'Apartamentos com cocinita, útil para comidas do cão' },
        { chain: 'Apex Hotels (UK)', policy: 'Toda a cadena', fee: '20 £/estadia', note: 'Piscinas cubiertas, ubicaciones UK céntricas' },
        { chain: 'Hilton (programa Pet Welcome)', policy: 'Mayoría de hotéis; verificar individualmente', fee: '30-75 €/estadia', note: 'Mais caro mas nivel de lujo' },
        { chain: 'Holiday Inn / Holiday Inn Express (IHG)', policy: 'Mayoría de hotéis', fee: '15-20 €/noite', note: 'Gama media fiable, omnipresente' },
        { chain: 'Hospes Hotels', policy: 'Toda a cadena', fee: '25 €/estadia', note: 'Cadena boutique 5 estrellas espanhola' },
        { chain: 'Hotel Indigo (IHG)', policy: 'Toda a cadena', fee: '25 €/estadia', note: 'Boutique 4 estrellas, urbano' },
        { chain: 'Mercure (Accor)', policy: 'Mayoría de hotéis', fee: '10-20 €/noite', note: 'Forte red Francia/Italia' },
        { chain: 'Motel One', policy: 'Pet-friendly toda a cadena desde 2024', fee: '10 €/noite', note: 'Hotéis design presupuesto em rápido crecimiento' },
        { chain: '25hours Hotels', policy: 'Kit pet incluido', fee: '20 €/estadia', note: 'Design 4 estrellas, boles incluidos' },
        { chain: 'Scandic Hotels', policy: 'Toda a cadena', fee: '20 €/estadia', note: 'Forte red nórdica + alemã' },
        { chain: 'Travelodge', policy: 'Animais admitidas em mayoría de hotéis UK', fee: '25 £/estadia', note: 'Cadena presupuesto UK, máx 2 animais/habitación' },
        { chain: 'NH Hotels / NH Collection', policy: 'Pet-friendly toda a cadena', fee: '20-25 €/noite', note: 'Forte presencia Espanha, Italia, Alemania' },
      ],
    },
    byCategory: {
      id: 'by-category',
      h2: 'Por categoría: que tipo de hotel pet-friendly te conviene',
      paras: [
        'A aceitação de animais é só o bilhete de entrada, a categoría correcta para ti depende da tua viagem. Umas vacaciones de praia com cão exigem critérios diferentes que uma escapada urbana com gato. Hemos organizado nuestros 460+ hotéis pet-friendly em seis categorías que se ajustan a as intenciones comunes de viaje.',
        'Haz clic em cualquier categoría a continuación para explorar nuestra seleção cuidada nos 85 destinos.',
      ],
      intro: 'Explora nuestras 6 categorías de hotéis pet-friendly',
    },
    byCountry: {
      id: 'by-country',
      h2: 'Por país: cultura do cargo por animal e normas locales',
      paras: [
        'As políticas de animais hoteleras varían significativamente por Europa, tanto o cargo medio como o estilo de aplicação. A continuación, as realidades prácticas país por país, extraídas de nuestra auditoría de 460+ hotéis.',
      ],
    },
    countryNotes: {
      France: 'Francia é um dois os países mais tolerantes com animais, mais do 50 % dois hotéis as admitem, cargo medio 15-25 €/estadia. Os hotéis independientes são típicamente mais baratos que as cadenas. Normas passaporte UE estándar.',
      Germany: 'Alemania lidera Europa em dog-friendliness. Os hotéis raramente rechazan, cargo medio 10-20 €/noite. Berlim, Hamburgo e Munique têm a mayor densidad de cadenas pet-welcome. Cães em restaurantes a norma.',
      Spain: 'A pet-friendliness espanhola tem crecido rápidamente, cargo medio 15-20 €/noite. Madrid e Barcelona lideram em cadenas; Andalucía (Sevilha, Córdoba, Granada) excelente em primavera/outono mas o calor extremo estival é a principal restricción.',
      Italy: 'A lei italiana (Legge 281/1991) da aos cães derechos de acesso fortes mas os hotéis aplicam cargos mais agresivamente que Francia o Alemania, frequentemente 25-40 €/estadia. Os comboios (Trenitalia) admitem cães com burocracia.',
      'United Kingdom': 'Post-Brexit: cães UE entrando al UK necesitan um Animal Health Certificate (AHC, 10 dias) mais tratamento obrigatório contra equinococose. Cargo medio 25-50 £/estadia. Os pubs admitiendo cães são a base cultural britânica.',
      Netherlands: 'A cultura pet-friendly é excecional em Amesterdão, Róterdam e A Haya. Os hotéis cobran típicamente 15-25 €/estadia. Cães no elétrico e comboio por 3,40 € pase diario.',
      Belgium: 'Forte aceitação de animais, especialmente em Antuérpia e Gante. Cargos hoteleros típicamente 15-25 €. Beer-gardens e brasseries belgas universalmente tolerantes.',
      Portugal: 'Lisboa e Porto excepcionalmente pet-friendly. Cargos hoteleros frequentemente 10-20 €/estadia (mais baratos que Espanha). Elétricos e comboios admitem cães.',
      Switzerland: 'País mais caro de Europa mas aceitação de animais mais consistente. Cargo medio 30-50 CHF/noite. Comboios e teleféricos admitem cães grátis o meio preço.',
      Austria: 'Muito pet-friendly. Viena e Salzburgo lideram. Cargo medio 10-20 €/noite. Comboios (ÖBB) admitem cães.',
      Denmark: 'Copenhaga lidera Europa em bienestar animal. Hotéis cobran típicamente 150-300 DKK/estadia. Cães grátis no metro e S-tog com bozal.',
      Sweden: 'Estocolmo e Gotemburgo ambas pet-welcoming. Cargo medio 200-400 SEK/noite. Cães admitidos de comboio.',
      Norway: 'Cultura canina de Oslo intensa. Cargo medio 200-500 NOK. Cães grátis em mayoría de transportes.',
      Finland: 'Helsínquia tem a mayor densidad canina de Europa. Hotéis típicamente grátis para cães pequenos, 10-20 € para grandes. Cães grátis em todo o transporte público.',
      Iceland: 'Normas rigorosas de importación de animais (4 semanas mínimo, burocracia extenso, tarifas altas). Uma vez ali, Reiquiavique é acogedora. Hotéis cobran 5000-8000 ISK/estadia.',
      Ireland: 'A pet-friendliness de Dublin tem mejorado. Hotéis cobran 15-25 €. Nota: mismas normas que UK para Irlanda do norte.',
      Greece: 'Atenas e Tesalónica mejorando. Hotéis típicamente 10-15 €/estadia. Restricciones de praia rigorosas em verão.',
      'Czech Republic': 'Praga muito pet-friendly. Hotéis cobran 200-500 CZK/estadia. Cães admitidos no metro e elétricos.',
      Hungary: 'Budapest acogedora. Hotéis cobran 3000-6000 HUF/estadia. Cães grátis no metro com bozal.',
      Slovenia: 'Liubliana e Bled ambas pet-friendly. Hotéis cobran 10-15 €/estadia.',
      Croatia: 'Dubrovnik e Split mejorando mas as prohibiciones de praia croatas (15 maio-30 sep) são rigorosas. Hotéis cobran 10-20 €.',
      Poland: 'Varsóvia e Cracóvia têm escena pet-welcome creciente. Hotéis cobran 50-100 PLN/estadia.',
      Latvia: 'Riga mejorando. Hotéis típicamente 10-15 €.',
      Estonia: 'Tallin pet-friendly. Hotéis típicamente 10 €.',
      Slovakia: 'Bratislava acogedora. Hotéis típicamente 10-15 €.',
      Romania: 'Bucareste mejorando rápidamente. Hotéis típicamente 30-60 RON.',
      Bulgaria: 'Sofía acogedora. Hotéis típicamente 20-40 BGN.',
      Serbia: 'Belgrado acogedora, transporte público grátis para cães desde 2025. Hotéis típicamente 1500-3000 RSD.',
      Lithuania: 'Vilna acogedora. Hotéis típicamente 10 €.',
      Luxembourg: 'Pet-friendly. Hotéis cobran 15-25 €.',
    },
    bookingTips: {
      id: 'booking-tips',
      h2: 'Consejos de reserva que ahorran dinero',
      paras: [
        'Os cargos por animal são negociables mais frequentemente de lo que a gente cree. A reserva directa (no vía Booking.com) te da palanca, alrededor do 30 % dois hotéis independientes anularán o reducirán o cargo para huéspedes directos. Sempre envía um email al hotel antes de reservar para confirmar as condições exactas.',
      ],
      bullets: [
        'Reserva directo (no Booking.com) para MELHOR negociación de cargo por animal, os hotéis independientes frequentemente lo anulan ao 10-50 % por reservas directas.',
        'Para estadias multi-noite, pide tarifa plana em vez de cargo por noite. 15 €/noite em 1 noites = 105 €; muitos hotéis cambiarán a 60 € plano si se les pide.',
        'Os programas de fidelidad valen a pena: miembros de Hilton Honors, IHG One Rewards e Accor Live Limitless niveles superiores têm anulaciones de cargo por animal.',
        'Evita habitaciones "pet-allowed" tildadas como única opção, costumam ir cargadas com tarifa de limpieza. As habitaciones estándar com setup pet-allowed-on-request costumam ser mais baratas.',
        'Resorts de praia canina: reserva em temporada media (abril-maio, outubro-novembro), mismo hotel, 30-40 % menos caro que em pico estival.',
        'Para viajes de mais de 7 noites, um Airbnb costuma superar a hotéis em coste total de animal (uma tarifa de limpieza vs cargo diario).',
      ],
    },
    whatToAsk: {
      id: 'what-to-ask',
      h2: 'Que preguntar antes de reservar',
      intro: 'Antes de confirmar uma reserva, envía um email curto al hotel com estas preguntas. A respuesta te dice todo sobre si o hotel é genuinamente acogedor o só "pet-allowed" sobre o papel.',
      questions: [
        'As animais se admitem em cualquier habitación estándar, o só em específicas?',
        'O cargo por animal é por estadia o por noite? Incluye limpieza?',
        'Hay restricciones de raza o peso mais allá das normas legales PPP?',
        'Mi cão pode quedarse na habitación mientras estoy na jantar / no spa?',
        'Proporcionan boles, camas o golosinas? O debería traerlos yo?',
        'Hay zona de passeio canino / espaço sem trela a pouca distancia?',
        'Admitem varias animais? Si sí, o cargo é por animal o tope?',
        'Dónde debe ir o cão com trela / bozal dentro do establecimiento?',
        'Têm um veterinário local recomendado (em caso de urgência)?',
        'Qual é a política de cancelación si mi animal está enferma o dia de chegada?',
      ],
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Qual é o cargo por animal medio em hotéis europeus?', a: 'O promedio europeu é 15-25 €/estadia para um hotel independiente e 20-30 €/noite para cadenas. Suiza e UK estão no extremo alto (30-50 CHF / 40-60 £). Europa do Este no sob (5-10 €).' },
      { q: 'Todos os hotéis admitem também gatos?', a: 'A maioria de hotéis "pet-friendly" também admitem gatos, mas no sempre se anuncia. Pregunta sempre explícitamente: aproximadamente o 80 % dois hotéis que admitem cães também admitem gatos com preaviso.' },
      { q: 'E si mi cão ladra de noite?', a: 'Os hotéis se reservan o derecho de cobrar tarifa de molestia o expulsar. Soluciones prácticas: habitación de esquina, final de pasillo o planta baja. Trae manta o juguete familiar. ThunderShirts e Adaptil ayudan a cães ansiosos.' },
      { q: 'Hay plantas reservadas para animais em alguna cadena?', a: 'Sí, Kimpton, Hilton (algunos hotéis) e 25hours têm plantas dedicadas a animais em ubicaciones seleccionadas. Pregunta explícitamente al reservar.' },
      { q: 'Como sé si um hotel é genuinamente pet-friendly o só pet-tolerado?', a: 'Tres indicadores: (1) o hotel menciona equipamientos pet específicos (boles, camas, golosinas) no seu web, (2) o cargo por animal é razonable (10-25 €, no 75 £+), (3) a respuesta do staff a tu email pre-reserva é entusiasta, no vacilante. Pre-filtramos todos os hotéis em nuestras guías de destino.' },
      { q: 'E os cães de serviço / asistencia?', a: 'Os cães de serviço se admitem grátis em todos os hotéis UE por lei (Reglamento 2016/679 + transposiciones nacionales) e em todos os hotéis UK (Equality Act 2010). O cargo por animal no aplica. Leva a documentação.' },
      { q: 'Puedo deixar a mi cão só na habitación do hotel?', a: 'A maioria de hotéis pet-friendly europeus proíbem animais sem vigilancia. Soluciones: um cuidador Pawshake/Tailster pelas horas que necesites, o serviço de guardería em habitación que ofrecen Kimpton, 25hours e algunos Hilton.' },
      { q: 'É mais barato reservar em Booking.com o directo?', a: 'Para reservas com animal, lo directo costuma ganar. Booking.com pode tener uma tarifa base ligeramente inferior mas os cargos de animal costumam ser idénticos e pierdes flexibilidad de negociación. A reserva directa te da palanca para preguntar "se pode anular o cargo por animal para esta estadia de 5 noites?"' },
    ],
    ctaTitle: 'Listo para encontrar o teu hotel?',
    ctaDesc: 'Explora nuestros hotéis pet-friendly cuidadosamente seleccionados em 15 destinos europeus, todos auditados por políticas pet-welcome genuinas, com avaliações verificadas 8,0+.',
    ctaButton: 'Ver todos os destinos →',
    hotelLabel: 'hotéis',
    destLabel: 'destinos',
    viewCategoryLabel: 'Ver categoría →',
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

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

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-blue-950 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            📘 {c.hero.kicker}
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">{c.hero.h1}</h1>
          <p className="text-blue-100 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">{c.hero.lede}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <span className="bg-white/10 px-4 py-2 rounded-full">🏨 {totalHotels}+ {c.hotelLabel}</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🌍 {totalDests} {c.destLabel}</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">📅 2026</span>
          </div>
        </div>
      </section>

      {/* TOC */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">{c.toc.title}</h2>
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

      {/* Chains */}
      <section id={c.chains.id} className="py-16 bg-gray-50 border-y border-gray-100 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{c.chains.h2}</h2>
          <div className="space-y-4 mb-8 max-w-3xl">
            {c.chains.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Chain</th>
                  <th className="px-4 py-3 text-left font-bold">Policy</th>
                  <th className="px-4 py-3 text-left font-bold">Fee</th>
                  <th className="px-4 py-3 text-left font-bold">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {c.chains.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{row.chain}</td>
                    <td className="px-4 py-3 text-gray-700">{row.policy}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{row.fee}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* By category */}
      <section id={c.byCategory.id} className="py-16 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{c.byCategory.h2}</h2>
          <div className="space-y-4 mb-8 max-w-3xl">
            {c.byCategory.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">{c.byCategory.intro}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${locale}/categories/${cat.slug}`}
                className={`bg-gradient-to-br ${cat.gradient} text-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}
              >
                <span className="text-4xl block mb-3">{cat.emoji}</span>
                <h4 className="font-extrabold text-lg mb-1">
                  {locale === 'fr' && cat.nameFr ? cat.nameFr : locale === 'es' && cat.nameEs ? cat.nameEs : cat.name}
                </h4>
                <p className="text-white/80 text-sm font-semibold">{c.viewCategoryLabel}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* By country */}
      <section id={c.byCountry.id} className="py-16 bg-gray-50 border-y border-gray-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{c.byCountry.h2}</h2>
          <div className="space-y-4 mb-8">
            {c.byCountry.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
          <div className="space-y-4">
            {allCountries.map((country) => {
              const note = c.countryNotes[country.name as keyof typeof c.countryNotes]
              if (!note) return null
              const localizedName = getLocalizedCountryName(country.name, locale)
              return (
                <details key={country.slug} className="bg-white border border-gray-200 rounded-2xl group">
                  <summary className="cursor-pointer p-5 list-none flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{localizedName}</h3>
                        <p className="text-xs text-gray-500">{country.destinations.length} {c.destLabel}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-5 pb-5 pt-2 text-sm text-gray-700 leading-relaxed border-t border-gray-100">
                    <p className="mb-3">{note}</p>
                    <Link href={`/${locale}/countries/${country.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold hover:underline text-sm">
                      → {localizedName}: all destinations
                    </Link>
                  </div>
                </details>
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
                <span className="text-amber-600 font-bold text-lg flex-shrink-0">💡</span>
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
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
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

      <TopHotelsStrip
        locale={locale}
        destinationSlugs={['paris', 'amsterdam', 'london', 'barcelona', 'rome', 'lisbon']}
        campaign="hotels-eu"
      />

      <GuideFooter locale={locale} currentSlug={SLUG} />

      <StickyHotelCTA
        href={buildAllezDestLink('Europe', 'Europe', 'hotels-eu-sticky')}
        label={(STICKY_LABELS_HOTELS_EU[locale] ?? STICKY_LABELS_HOTELS_EU.en).label}
        cta={(STICKY_LABELS_HOTELS_EU[locale] ?? STICKY_LABELS_HOTELS_EU.en).cta}
      />
    </div>
  )
}
