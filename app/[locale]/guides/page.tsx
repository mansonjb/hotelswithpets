import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}

  const titles: Record<string, string> = {
    en: 'Pet Travel Guides for Europe',
    fr: 'Guides pratiques pour voyager avec son animal en Europe',
    es: 'Guías prácticas para viajar con mascota en Europa',
    pt: 'Guias práticos para viajar com o seu animal pela Europa',
    de: 'Praktische Ratgeber für Reisen mit Haustier in Europa',
    nl: 'Praktische gidsen voor reizen met je huisdier in Europa',
    it: 'Guide pratiche per viaggiare con animale in Europa',
  }
  const descriptions: Record<string, string> = {
    en: 'All our pet-travel guides, organised by what you need to know before, during and after the trip: passports, transport, hotels, destinations and seasonal planning.',
    fr: `Tous nos guides de voyage avec animal, organisés selon ce dont vous avez besoin avant, pendant et après le voyage : passeport, transport, hôtels, destinations et planification saisonnière.`,
    es: 'Todas nuestras guías de viaje con mascota, organizadas según lo que necesitas antes, durante y después del viaje: pasaporte, transporte, hoteles, destinos y planificación estacional.',
    pt: `Todos os nossos guias de viagem com animal, organizados segundo o que precisa antes, durante e depois da viagem: passaporte, transporte, hotéis, destinos e planeamento sazonal.`,
    de: 'All unsere Ratgeber fürs Reisen mit Haustier, geordnet nach dem, was du vor, während und nach der Reise wissen musst: Pässe, Transport, Hotels, Reiseziele und saisonale Planung.',
    nl: 'Al onze gidsen voor reizen met je huisdier, geordend naar wat je moet weten voor, tijdens en na de reis: paspoorten, vervoer, hotels, bestemmingen en seizoensplanning.',
    it: 'Tutte le nostre guide di viaggio con animale, organizzate in base a ciò che ti serve prima, durante e dopo il viaggio: passaporti, trasporti, hotel, destinazioni e pianificazione stagionale.',
  }

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides`,
      languages: {
        en: `${SITE_URL}/en/guides`,
        fr: `${SITE_URL}/fr/guides`,
        es: `${SITE_URL}/es/guides`,
        pt: `${SITE_URL}/pt/guides`,
        de: `${SITE_URL}/de/guides`,
        nl: `${SITE_URL}/nl/guides`,
        it: `${SITE_URL}/it/guides`,
        'x-default': `${SITE_URL}/en/guides`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `${SITE_URL}/${locale}/guides`,
      siteName: 'HotelsWithPets.com',
      type: 'website',
    },
  }
}

type Guide = {
  slug: string
  emoji: string
  title: string
  desc: string
  tag: string
}

type Section = {
  heading: string
  intro: string
  guides: Guide[]
}

type LocaleCopy = {
  hero: { kicker: string; title: string; subtitle: string }
  sectionLabels: { destinations: string; itineraries: string; logistics: string; hotels: string; seasonal: string }
  sections: {
    destinations: Section
    itineraries: Section
    logistics: Section
    hotels: Section
    seasonal: Section
  }
}

const COPY: Record<string, LocaleCopy> = {
  en: {
    hero: {
      kicker: 'PRACTICAL RESOURCES',
      title: 'Pet travel guides for Europe',
      subtitle: 'All our pet-travel guides, organised by what you need before, during and after the trip. Edited by humans, fact-checked against official sources, updated for 2026.',
    },
    sectionLabels: {
      destinations: 'Top destinations & rankings',
      itineraries: 'Trip itineraries',
      logistics: 'Travel logistics',
      hotels: 'Hotels & booking',
      seasonal: 'Seasonal & themed',
    },
    sections: {
      destinations: {
        heading: 'Top destinations & rankings',
        intro: 'Where to go with your dog. City and island rankings, curated beach lists and off-leash spaces, all audited.',
        guides: [
          { slug: 'top-dog-friendly-cities-europe', emoji: '🏙️', title: 'Top dog-friendly cities in Europe', desc: 'The 15 European cities ranked highest for dog welcome: parks, transport, restaurant access and hotel density.', tag: 'Ranking' },
          { slug: 'top-dog-friendly-islands-europe', emoji: '🏝️', title: 'Top dog-friendly islands in Europe', desc: 'Mediterranean, Atlantic and Nordic islands compared on beach access, ferry rules and hotel selection.', tag: 'Ranking' },
          { slug: 'dog-beaches-france', emoji: '🏖️', title: 'Dog-friendly beaches in France', desc: 'Every officially dog-friendly beach along the French coast, with seasonal rules and on-leash/off-leash zones.', tag: 'Destinations' },
          { slug: 'best-dog-beaches-europe-2026', emoji: '🌊', title: 'Best dog beaches in Europe 2026', desc: 'Our curated shortlist of European dog beaches, with water quality, leash rules and nearby pet-friendly stays.', tag: 'Destinations' },
          { slug: 'fenced-dog-parks-europe', emoji: '🌳', title: 'Fenced dog parks in Europe', desc: 'Where to find safe off-leash enclosures in 30+ European cities, mapped and audited.', tag: 'Destinations' },
          { slug: 'high-energy-dog-destinations-europe', emoji: '🥾', title: 'Best destinations for a high-energy dog', desc: 'Alpine and lake destinations built for a working dog: real trails, distances and lift policies, verified. Chamonix, Windermere, Interlaken, Zell am See, Annecy, Innsbruck.', tag: 'By dog · new' },
          { slug: 'water-loving-dog-destinations-europe', emoji: '💧', title: 'Best destinations for a water-loving dog', desc: 'Lake and sea destinations with real, verified dog swimming spots: seasonal rules and leash zones. Aix-les-Bains, Annecy, Biarritz, Salcombe, Split, Cadiz.', tag: 'By dog · new' },
        ],
      },
      itineraries: {
        heading: 'Trip itineraries',
        intro: 'Ready-to-book multi-city routes designed around pet rules, train compatibility and dog-friendly stops.',
        guides: [
          { slug: 'brittany-pet-friendly-road-trip', emoji: '🦴', title: 'Brittany road trip: Rennes → Saint-Malo → Dinard → Cancale', desc: 'A 5-day, 200 km north-Brittany loop with dog-friendly hotels at every stop. Map, day-by-day plan and seasonal beach rules.', tag: '5 days · new' },
          { slug: 'cote-dazur-chien', emoji: '🌴', title: `Côte d'Azur road trip: Nice → Antibes → Cannes → Menton`, desc: 'A 5-day, 100 km French Riviera loop. Year-round Sentier du Littoral coastal trail, Île Sainte-Marguerite ferry, the rare Menton dog beach open all summer.', tag: '5 days · new' },
          { slug: 'provence-chien', emoji: '💜', title: 'Provence road trip: Avignon → Arles → Aix → Marseille', desc: 'A 5-day, 150 km Provençal loop. Avignon ramparts, Arles Roman heritage + Camargue, Sainte-Victoire hikes from Aix, Marseille Calanques. Optional Nîmes day trip.', tag: '5 days · new' },
          { slug: 'pays-basque-chien', emoji: '🟢', title: 'Basque Country road trip: Bayonne → San Sebastián → Vitoria → Bilbao', desc: 'A 5-day, 280 km cross-border loop. Vauban ramparts, Concha bay, the European Green Capital Anillo Verde, Guggenheim + UNESCO Vizcaya Bridge that accepts dogs up to 40 kg.', tag: '5 days · new' },
          { slug: 'city-trip-chien', emoji: '🚂', title: 'European city trip: Paris → Brussels → Amsterdam → Berlin', desc: 'A 10-day train itinerary through four iconic capitals. Hotels, train rules between cities, paperwork and emergency vets.', tag: '10 days' },
          { slug: 'cote-mediterraneenne-chien', emoji: '🌊', title: 'Mediterranean coast: Nice → Genoa → Florence → Rome', desc: 'A 10-day train itinerary along the Ligurian coast and central Italy. Dog beaches, pet-welcoming hotels, summer-heat tips.', tag: '10 days' },
          { slug: 'iberique-chien', emoji: '🌅', title: 'Iberian peninsula: Lisbon → Porto → Madrid → Barcelona', desc: 'A 12-day train itinerary through Portugal and Spain. Pet-friendly hotels, dog beaches, AVE/Alfa Pendular, PPP breed rules.', tag: '12 days' },
          { slug: 'alpes-chien', emoji: '🏔️', title: 'Alpine cities: Geneva → Zurich → Munich → Salzburg', desc: 'A 10-day train itinerary through Switzerland, Germany and Austria. Lakes, hikes, biergartens, ICE/CFF/ÖBB rules.', tag: '10 days' },
        ],
      },
      logistics: {
        heading: 'Travel logistics',
        intro: 'Paperwork, transport modes and border rules. The non-negotiable stuff to sort before you leave home.',
        guides: [
          { slug: 'passeport-animal', emoji: '📋', title: 'Pet passport by country', desc: 'Microchip, rabies vaccination, tapeworm treatment. Entry requirements country by country for the EU, UK, Finland, Norway, Iceland.', tag: 'Essential' },
          { slug: 'animal-health-certificate-vs-pet-passport-2026', emoji: '📜', title: 'Animal Health Certificate vs EU Pet Passport', desc: 'Which document you need post-Brexit, validity period, vet cost and what happens at the border if you get it wrong.', tag: 'Essential' },
          { slug: 'avion-animal', emoji: '✈️', title: 'Flying with your pet', desc: 'Cabin vs hold, which airlines accept pets, brachycephalic breed bans, IATA dimensions. Ryanair & easyJet: the truth.', tag: 'Transport' },
          { slug: 'train-avec-chien', emoji: '🚂', title: 'Travelling by train with your dog', desc: 'SNCF, Deutsche Bahn, Renfe, Trenitalia, fares, muzzle rules, carrier dimensions, how to book. Fact-checked per operator.', tag: 'Transport' },
          { slug: 'eurostar-with-dog', emoji: '🚄', title: 'Eurostar with a dog', desc: 'Service-dog policy, hidden routes via Calais ferry + train, and how to combine Eurotunnel + train across the Channel.', tag: 'Transport' },
          { slug: 'road-trip-chien', emoji: '🚗', title: 'Road tripping with your dog', desc: 'Laws by country, car safety, Eurotunnel, ferries and first-aid kit. Fines and legal obligations.', tag: 'Transport' },
        ],
      },
      hotels: {
        heading: 'Hotels & booking',
        intro: 'How to pick, book and price a genuinely pet-welcoming hotel, not just one that tolerates pets on paper.',
        guides: [
          { slug: 'pet-friendly-hotels-europe-guide', emoji: '📘', title: 'Pet-friendly hotels in Europe: the complete 2026 guide', desc: 'The pillar guide: chains, country rules, fees, what to ask before booking, and our 460+ audited hotels.', tag: 'Pillar' },
          { slug: 'hotel-pet-friendly', emoji: '🏨', title: 'Choosing a truly pet-friendly hotel', desc: 'Red flags to spot, green flags that matter, questions to ask before booking, the real cost of pet fees.', tag: 'Tips' },
          { slug: 'honeymoon-with-pet', emoji: '💍', title: 'Honeymoon with your dog: 6 romantic European destinations', desc: 'Lakeside palaces, walled medieval towns and Riviera capes that genuinely welcome dogs for a week of pet-friendly romance.', tag: 'Romantic · new' },
          { slug: 'cool-summer-with-dog', emoji: '❄️', title: 'Travel with your dog at under 25°C in July: 8 cool European picks', desc: 'For brachycephalic, senior and heat-sensitive dogs. Reykjavík, Bergen, Stockholm, Helsinki, Tallinn, Edinburgh, Galway, Bern, ranked from coolest.', tag: 'Summer · new' },
          { slug: 'wine-tourism-with-dog', emoji: '🍷', title: 'Wine tourism with your dog: 5 European wine regions', desc: 'Bordeaux Médoc, Tuscany Chianti, Rioja Alta, Douro Valley, Burgundy: verified pet-friendly châteaux, palaces and quintas. Cellar policies included.', tag: 'Wine · new' },
          { slug: 'christmas-markets-with-dog', emoji: '🎄', title: `Dog-friendly Christmas markets: 6 European cities`, desc: 'Strasbourg + Colmar, Vienna, Cologne, Prague, Bruges. Wooden-stall etiquette with a leashed dog, crowd-avoidance windows and warm indoor escape plans.', tag: 'Winter · new' },
          { slug: 'travel-with-cat-europe', emoji: '🐈', title: `Travel with your cat in Europe: complete guide`, desc: 'EU passport for cats, IATA cabin carriers, train rules per country, 14-day Feliway anti-stress protocol, and 6 cities with verified cat-friendly hotels (window screens + thick walls).', tag: 'Cat · new' },
          { slug: 'pet-travel-cost-index-europe-2026', emoji: '💶', title: 'Pet travel cost index Europe 2026', desc: 'What pet travel actually costs across 30 European cities: hotel fees, transport, vet, sitter rates, sorted and compared.', tag: 'Data' },
        ],
      },
      seasonal: {
        heading: 'Seasonal & themed',
        intro: 'When to go and what to plan around the calendar: heat waves, beach bans, tick season, indoor cafés.',
        guides: [
          { slug: 'autumn-destinations-with-dog-2026', emoji: '🍂', title: 'Best autumn destinations to travel with your dog', desc: 'Shoulder-season warmth across Spain, Portugal and Italy, where dog beaches reopen after 30 September and crowds and prices drop.', tag: 'Autumn · new' },
          { slug: 'winter-destinations-with-dog-2026', emoji: '❄️', title: 'Best winter destinations to travel with your dog', desc: 'Winter-sun Canary Islands, mild southern coast and an Alpine spa town: where a dog stays warm and welcome from December to February.', tag: 'Winter · new' },
          { slug: 'dog-friendly-europe-by-month', emoji: '📅', title: 'Dog-friendly Europe by month', desc: 'A month-by-month planner: where to go in January vs July, beach-ban windows, ferry seasons, tick alerts.', tag: 'Planner' },
        ],
      },
    },
  },
  fr: {
    hero: {
      kicker: 'RESSOURCES PRATIQUES',
      title: `Guides de voyage avec animal en Europe`,
      subtitle: `Tous nos guides de voyage avec animal, organisés selon ce dont vous avez besoin avant, pendant et après le voyage. Édités par des humains, vérifiés sur sources officielles, à jour pour 2026.`,
    },
    sectionLabels: {
      destinations: `Destinations & classements`,
      itineraries: `Itinéraires de voyage`,
      logistics: `Logistique de voyage`,
      hotels: `Hôtels & réservation`,
      seasonal: `Saisonnier & thématique`,
    },
    sections: {
      destinations: {
        heading: `Top destinations & classements`,
        intro: `Où aller avec votre chien. Classements de villes et d'îles, listes de plages soignées et espaces sans laisse, tous audités.`,
        guides: [
          { slug: 'top-dog-friendly-cities-europe', emoji: '🏙️', title: `Top villes dog-friendly d'Europe`, desc: `Les 15 villes européennes les mieux classées pour l'accueil canin : parcs, transports, accès restaurants et densité hôtelière.`, tag: 'Classement' },
          { slug: 'top-dog-friendly-islands-europe', emoji: '🏝️', title: `Top îles dog-friendly d'Europe`, desc: `Îles méditerranéennes, atlantiques et nordiques comparées sur les plages, règles ferries et choix hôtelier.`, tag: 'Classement' },
          { slug: 'dog-beaches-france', emoji: '🏖️', title: `Plages dog-friendly en France`, desc: `Toutes les plages officiellement dog-friendly du littoral français, avec règles saisonnières et zones avec/sans laisse.`, tag: 'Destinations' },
          { slug: 'best-dog-beaches-europe-2026', emoji: '🌊', title: `Meilleures plages canines d'Europe 2026`, desc: `Notre sélection éditoriale de plages canines européennes, qualité de l'eau, règles de laisse et hôtels pet-friendly proches.`, tag: 'Destinations' },
          { slug: 'fenced-dog-parks-europe', emoji: '🌳', title: `Parcs canins clôturés en Europe`, desc: `Où trouver des enclos sans laisse sécurisés dans 30+ villes européennes, cartographiés et audités.`, tag: 'Destinations' },
          { slug: 'high-energy-dog-destinations-europe', emoji: '🥾', title: `Meilleures destinations pour un chien très actif`, desc: `Destinations alpines et lacustres pensées pour un chien de travail : vrais sentiers, distances et règles de remontées, vérifiés. Chamonix, Windermere, Interlaken, Zell am See, Annecy, Innsbruck.`, tag: 'Par chien · nouveau' },
          { slug: 'water-loving-dog-destinations-europe', emoji: '💧', title: `Meilleures destinations pour un chien qui adore l'eau`, desc: `Destinations lacustres et maritimes avec de vrais points de baignade pour chiens, vérifiés : règles saisonnières et zones de laisse. Aix-les-Bains, Annecy, Biarritz, Salcombe, Split, Cadix.`, tag: 'Par chien · nouveau' },
        ],
      },
      itineraries: {
        heading: `Itinéraires de voyage`,
        intro: `Des itinéraires multi-villes prêts à réserver, conçus autour des règles animales, de la compatibilité train et des étapes dog-friendly.`,
        guides: [
          { slug: 'brittany-pet-friendly-road-trip', emoji: '🦴', title: `Road trip en Bretagne : Rennes → Saint-Malo → Dinard → Cancale`, desc: `Boucle de 5 jours et 200 km dans le nord de la Bretagne avec hôtels pet-friendly à chaque étape. Carte, plan jour par jour et règles saisonnières de plages.`, tag: '5 jours · nouveau' },
          { slug: 'cote-dazur-chien', emoji: '🌴', title: `Road trip Côte d'Azur : Nice → Antibes → Cannes → Menton`, desc: `Boucle de 5 jours et 100 km sur la French Riviera. Sentier du Littoral toute l'année, ferry pour l'Île Sainte-Marguerite, la rare plage canine de Menton ouverte tout l'été.`, tag: '5 jours · nouveau' },
          { slug: 'provence-chien', emoji: '💜', title: `Road trip en Provence : Avignon → Arles → Aix → Marseille`, desc: `Boucle de 5 jours et 150 km en Provence. Remparts d'Avignon, Arles romaine + Camargue, randos Sainte-Victoire depuis Aix, Calanques de Marseille. Day trip Nîmes en option.`, tag: '5 jours · nouveau' },
          { slug: 'pays-basque-chien', emoji: '🟢', title: `Road trip au Pays basque : Bayonne → Saint-Sébastien → Vitoria → Bilbao`, desc: `Boucle transfrontalière de 5 jours et 280 km. Remparts Vauban, baie de la Concha, Anillo Verde de la Capitale verte européenne, Guggenheim + Pont de Biscaye UNESCO qui accepte les chiens jusqu'à 40 kg.`, tag: '5 jours · nouveau' },
          { slug: 'city-trip-chien', emoji: '🚂', title: `City trip européen : Paris → Bruxelles → Amsterdam → Berlin`, desc: `Itinéraire de 10 jours en train à travers quatre capitales. Hôtels, règles de train entre villes, paperasse, vétérinaires d'urgence.`, tag: '10 jours' },
          { slug: 'cote-mediterraneenne-chien', emoji: '🌊', title: `Côte méditerranéenne : Nice → Gênes → Florence → Rome`, desc: `Itinéraire de 10 jours en train le long de la côte ligure et de l'Italie centrale. Plages canines, hôtels pet-friendly, anti-canicule.`, tag: '10 jours' },
          { slug: 'iberique-chien', emoji: '🌅', title: `Péninsule ibérique : Lisbonne → Porto → Madrid → Barcelone`, desc: `Itinéraire de 12 jours en train à travers le Portugal et l'Espagne. Hôtels pet-friendly, plages canines, AVE/Alfa Pendular, règles PPP.`, tag: '12 jours' },
          { slug: 'alpes-chien', emoji: '🏔️', title: `Villes alpines : Genève → Zurich → Munich → Salzbourg`, desc: `Itinéraire de 10 jours en train à travers la Suisse, l'Allemagne et l'Autriche. Lacs, randonnées, biergartens, règles ICE/CFF/ÖBB.`, tag: '10 jours' },
        ],
      },
      logistics: {
        heading: `Logistique de voyage`,
        intro: `Paperasse, modes de transport et règles frontalières. L'incontournable à régler avant de partir.`,
        guides: [
          { slug: 'passeport-animal', emoji: '📋', title: `Passeport animal par pays`, desc: `Puce électronique, vaccin antirabique, traitement échinococcose. Conditions d'entrée pays par pays UE, UK, Finlande, Norvège, Islande.`, tag: 'Essentiel' },
          { slug: 'animal-health-certificate-vs-pet-passport-2026', emoji: '📜', title: `Animal Health Certificate vs passeport européen`, desc: `Quel document choisir post-Brexit, durée de validité, coût vétérinaire et ce qui se passe à la frontière en cas d'erreur.`, tag: 'Essentiel' },
          { slug: 'avion-animal', emoji: '✈️', title: `Prendre l'avion avec son animal`, desc: `Cabine ou soute, compagnies qui acceptent les animaux, races brachycéphales interdites, dimensions IATA. Ryanair & easyJet : la vérité.`, tag: 'Transport' },
          { slug: 'train-avec-chien', emoji: '🚂', title: `Voyager en train avec son chien`, desc: `SNCF, Deutsche Bahn, Renfe, Trenitalia, tarifs, règles muselière, dimensions transportins, comment réserver. Vérifié par compagnie.`, tag: 'Transport' },
          { slug: 'eurostar-with-dog', emoji: '🚄', title: `Eurostar avec un chien`, desc: `Politique chiens d'assistance, contournements ferry de Calais + train, et comment combiner Eurotunnel + train à travers la Manche.`, tag: 'Transport' },
          { slug: 'road-trip-chien', emoji: '🚗', title: `Road trip avec son chien`, desc: `Lois par pays, sécurité en voiture, Eurotunnel, ferries, trousse de premiers secours. Amendes et obligations légales.`, tag: 'Transport' },
        ],
      },
      hotels: {
        heading: `Hôtels & réservation`,
        intro: `Comment choisir, réserver et budgéter un hôtel vraiment pet-welcoming, pas juste pet-toléré sur le papier.`,
        guides: [
          { slug: 'pet-friendly-hotels-europe-guide', emoji: '📘', title: `Hôtels pet-friendly en Europe : le guide complet 2026`, desc: `Le guide pilier : chaînes, règles par pays, suppléments, questions à poser, et nos 460+ hôtels audités.`, tag: 'Pilier' },
          { slug: 'hotel-pet-friendly', emoji: '🏨', title: `Choisir un vrai hôtel pet-friendly`, desc: `Les red flags à repérer, les green flags qui comptent, les bonnes questions à poser et le vrai coût des frais animaux.`, tag: 'Conseils' },
          { slug: 'honeymoon-with-pet', emoji: '💍', title: `Lune de miel avec son chien : 6 destinations romantiques européennes`, desc: `Palais en bord de lac, villes médiévales remparées et caps de la Côte d'Azur qui accueillent vraiment les chiens pour une semaine romantique pet-friendly.`, tag: 'Romantique · nouveau' },
          { slug: 'cool-summer-with-dog', emoji: '❄️', title: `Voyager avec son chien à moins de 25°C en juillet : 8 destinations européennes fraîches`, desc: `Pour les chiens brachycéphales, âgés et sensibles à la chaleur. Reykjavík, Bergen, Stockholm, Helsinki, Tallinn, Édimbourg, Galway, Berne, classés du plus frais au moins frais.`, tag: 'Été · nouveau' },
          { slug: 'wine-tourism-with-dog', emoji: '🍷', title: `Tourisme œnologique avec son chien : 5 régions viticoles européennes`, desc: `Bordeaux Médoc, Toscane Chianti, Rioja Alta, vallée du Douro, Bourgogne : châteaux, palaces et quintas pet-friendly vérifiés. Politiques caves incluses.`, tag: 'Vin · nouveau' },
          { slug: 'christmas-markets-with-dog', emoji: '🎄', title: `Marchés de Noël dog-friendly : 6 villes européennes`, desc: `Strasbourg + Colmar, Vienne, Cologne, Prague, Bruges. Étiquette des chalets en bois avec un chien en laisse, fenêtres anti-foule et plans d'évasion intérieure chauds.`, tag: 'Hiver · nouveau' },
          { slug: 'travel-with-cat-europe', emoji: '🐈', title: `Voyager avec son chat en Europe : le guide complet`, desc: `Passeport UE pour chat, sacs cabine IATA, règles train par pays, protocole anti-stress Feliway 14 jours, et 6 villes avec hôtels cat-friendly vérifiés (moustiquaires + murs épais).`, tag: 'Chat · nouveau' },
          { slug: 'pet-travel-cost-index-europe-2026', emoji: '💶', title: `Indice coût voyage animal Europe 2026`, desc: `Ce que coûte vraiment un voyage avec animal dans 30 villes européennes : suppléments hôteliers, transport, véto, sitter.`, tag: 'Données' },
        ],
      },
      seasonal: {
        heading: `Saisonnier & thématique`,
        intro: `Quand partir et comment caler le calendrier : canicules, interdictions de plage, saison des tiques, cafés couverts.`,
        guides: [
          { slug: 'autumn-destinations-with-dog-2026', emoji: '🍂', title: `Meilleures destinations d'automne avec son chien`, desc: `La douceur de l'arrière-saison en Espagne, au Portugal et en Italie, où les plages rouvrent aux chiens après le 30 septembre, foule et prix en baisse.`, tag: 'Automne · nouveau' },
          { slug: 'winter-destinations-with-dog-2026', emoji: '❄️', title: `Meilleures destinations d'hiver avec son chien`, desc: `Soleil d'hiver aux Canaries, côte sud douce et une ville thermale alpine : où un chien reste au chaud et bienvenu de décembre à février.`, tag: 'Hiver · nouveau' },
          { slug: 'dog-friendly-europe-by-month', emoji: '📅', title: `Europe dog-friendly mois par mois`, desc: `Un planificateur mois par mois : où aller en janvier vs juillet, fenêtres d'interdiction plage, saisons ferries, alertes tiques.`, tag: 'Planificateur' },
        ],
      },
    },
  },
  es: {
    hero: {
      kicker: 'RECURSOS PRÁCTICOS',
      title: 'Guías de viaje con mascota en Europa',
      subtitle: 'Todas nuestras guías de viaje con mascota, organizadas según lo que necesitas antes, durante y después del viaje. Editadas por humanos, verificadas en fuentes oficiales, actualizadas para 2026.',
    },
    sectionLabels: {
      destinations: 'Destinos y rankings',
      itineraries: 'Itinerarios de viaje',
      logistics: 'Logística de viaje',
      hotels: 'Hoteles y reserva',
      seasonal: 'Estacional y temático',
    },
    sections: {
      destinations: {
        heading: 'Top destinos y rankings',
        intro: 'Dónde ir con tu perro. Rankings de ciudades e islas, listas de playas cuidadas y espacios sin correa, todos auditados.',
        guides: [
          { slug: 'top-dog-friendly-cities-europe', emoji: '🏙️', title: 'Top ciudades dog-friendly de Europa', desc: 'Las 15 ciudades europeas mejor clasificadas para acogida canina: parques, transporte, acceso a restaurantes y densidad hotelera.', tag: 'Ranking' },
          { slug: 'top-dog-friendly-islands-europe', emoji: '🏝️', title: 'Top islas dog-friendly de Europa', desc: 'Islas mediterráneas, atlánticas y nórdicas comparadas en playas, normas de ferry y oferta hotelera.', tag: 'Ranking' },
          { slug: 'dog-beaches-france', emoji: '🏖️', title: 'Playas dog-friendly en Francia', desc: 'Todas las playas oficialmente dog-friendly del litoral francés, con normas estacionales y zonas con/sin correa.', tag: 'Destinos' },
          { slug: 'best-dog-beaches-europe-2026', emoji: '🌊', title: 'Mejores playas caninas de Europa 2026', desc: 'Nuestra selección editorial de playas caninas europeas, calidad del agua, normas de correa y hoteles pet-friendly cercanos.', tag: 'Destinos' },
          { slug: 'fenced-dog-parks-europe', emoji: '🌳', title: 'Parques caninos vallados en Europa', desc: 'Dónde encontrar recintos sin correa seguros en 30+ ciudades europeas, mapeados y auditados.', tag: 'Destinos' },
          { slug: 'high-energy-dog-destinations-europe', emoji: '🥾', title: 'Mejores destinos para un perro muy activo', desc: 'Destinos alpinos y de lago pensados para un perro de trabajo: senderos reales, distancias y normas de remontes, verificados. Chamonix, Windermere, Interlaken, Zell am See, Annecy, Innsbruck.', tag: 'Por perro · nuevo' },
          { slug: 'water-loving-dog-destinations-europe', emoji: '💧', title: 'Mejores destinos para un perro que ama el agua', desc: 'Destinos de lago y mar con puntos de baño reales y verificados para perros: normas de temporada y zonas de correa. Aix-les-Bains, Annecy, Biarritz, Salcombe, Split, Cádiz.', tag: 'Por perro · nuevo' },
        ],
      },
      itineraries: {
        heading: 'Itinerarios de viaje',
        intro: 'Rutas multi-ciudad listas para reservar, diseñadas en torno a las normas para mascotas, la compatibilidad con el tren y paradas dog-friendly.',
        guides: [
          { slug: 'brittany-pet-friendly-road-trip', emoji: '🦴', title: 'Road trip por Bretaña: Rennes → Saint-Malo → Dinard → Cancale', desc: 'Circuito de 5 días y 200 km por el norte de Bretaña con hoteles pet-friendly en cada parada. Mapa, plan día a día y normativa estacional de playas.', tag: '5 días · nuevo' },
          { slug: 'cote-dazur-chien', emoji: '🌴', title: `Road trip Costa Azul: Niza → Antibes → Cannes → Menton`, desc: `Circuito de 5 días y 100 km por la Riviera Francesa. Sentier du Littoral todo el año, ferri a la Île Sainte-Marguerite, la rara playa canina de Menton abierta todo el verano.`, tag: '5 días · nuevo' },
          { slug: 'provence-chien', emoji: '💜', title: `Road trip por Provenza: Aviñón → Arlés → Aix → Marsella`, desc: `Circuito de 5 días y 150 km por Provenza. Murallas de Aviñón, Arlés romana + Camarga, rutas Sainte-Victoire desde Aix, Calanques de Marsella. Excursión a Nimes opcional.`, tag: '5 días · nuevo' },
          { slug: 'pays-basque-chien', emoji: '🟢', title: `Road trip por el País Vasco: Bayona → San Sebastián → Vitoria → Bilbao`, desc: `Circuito transfronterizo de 5 días y 280 km. Murallas Vauban, bahía de la Concha, Anillo Verde de la Capital Verde Europea, Guggenheim + Puente Vizcaya UNESCO que admite perros hasta 40 kg.`, tag: '5 días · nuevo' },
          { slug: 'city-trip-chien', emoji: '🚂', title: 'City trip europeo: París → Bruselas → Ámsterdam → Berlín', desc: 'Itinerario de 10 días en tren por cuatro capitales. Hoteles, normas de tren entre ciudades, papeleo, veterinarios de urgencias.', tag: '10 días' },
          { slug: 'cote-mediterraneenne-chien', emoji: '🌊', title: 'Costa mediterránea: Niza → Génova → Florencia → Roma', desc: 'Itinerario de 10 días en tren por la costa ligur y la Italia central. Playas caninas, hoteles pet-friendly, consejos antical.', tag: '10 días' },
          { slug: 'iberique-chien', emoji: '🌅', title: 'Península ibérica: Lisboa → Oporto → Madrid → Barcelona', desc: 'Itinerario de 12 días en tren por Portugal y España. Hoteles pet-friendly, playas caninas, AVE/Alfa Pendular, normas PPP.', tag: '12 días' },
          { slug: 'alpes-chien', emoji: '🏔️', title: 'Ciudades alpinas: Ginebra → Zúrich → Múnich → Salzburgo', desc: 'Itinerario de 10 días en tren por Suiza, Alemania y Austria. Lagos, rutas, biergartens, normas ICE/CFF/ÖBB.', tag: '10 días' },
        ],
      },
      logistics: {
        heading: 'Logística de viaje',
        intro: 'Papeleo, modos de transporte y normas fronterizas. Lo imprescindible que resolver antes de salir de casa.',
        guides: [
          { slug: 'passeport-animal', emoji: '📋', title: 'Pasaporte de mascota por país', desc: 'Microchip, vacuna antirrábica, tratamiento contra tenias. Requisitos de entrada país a país para UE, RU, Finlandia, Noruega, Islandia.', tag: 'Esencial' },
          { slug: 'animal-health-certificate-vs-pet-passport-2026', emoji: '📜', title: 'Animal Health Certificate vs pasaporte europeo', desc: 'Qué documento elegir tras el Brexit, validez, coste veterinario y qué ocurre en la frontera si te equivocas.', tag: 'Esencial' },
          { slug: 'avion-animal', emoji: '✈️', title: 'Volar con tu mascota', desc: 'Cabina o bodega, qué aerolíneas aceptan mascotas, razas braquicéfalas prohibidas, dimensiones IATA. Ryanair & easyJet: la verdad.', tag: 'Transporte' },
          { slug: 'train-avec-chien', emoji: '🚂', title: 'Viajar en tren con tu perro', desc: 'SNCF, Deutsche Bahn, Renfe, Trenitalia, tarifas, normas de bozal, dimensiones del transportín, cómo reservar. Verificado por operador.', tag: 'Transporte' },
          { slug: 'eurostar-with-dog', emoji: '🚄', title: 'Eurostar con perro', desc: 'Política de perros de asistencia, rodeos vía ferry de Calais + tren, y cómo combinar Eurotunnel + tren cruzando el Canal.', tag: 'Transporte' },
          { slug: 'road-trip-chien', emoji: '🚗', title: 'Road trip con tu perro', desc: 'Leyes por país, seguridad en el coche, Eurotunnel, ferrys, botiquín. Multas y obligaciones legales.', tag: 'Transporte' },
        ],
      },
      hotels: {
        heading: 'Hoteles y reserva',
        intro: 'Cómo elegir, reservar y presupuestar un hotel realmente pet-welcoming, no solo uno que tolera mascotas sobre el papel.',
        guides: [
          { slug: 'pet-friendly-hotels-europe-guide', emoji: '📘', title: 'Hoteles pet-friendly en Europa: la guía completa 2026', desc: 'La guía pilar: cadenas, normas por país, cargos, qué preguntar antes de reservar, y nuestros 460+ hoteles auditados.', tag: 'Pilar' },
          { slug: 'hotel-pet-friendly', emoji: '🏨', title: 'Elegir un hotel realmente pet-friendly', desc: 'Red flags a detectar, green flags que importan, preguntas clave antes de reservar y el coste real de las tarifas por mascota.', tag: 'Consejos' },
          { slug: 'honeymoon-with-pet', emoji: '💍', title: 'Luna de miel con tu perro: 6 destinos románticos europeos', desc: 'Palacios a orillas del lago, ciudades medievales amuralladas y cabos de la Costa Azul que admiten perros para una semana romántica pet-friendly.', tag: 'Romántico · nuevo' },
          { slug: 'cool-summer-with-dog', emoji: '❄️', title: 'Viajar con tu perro a menos de 25°C en julio: 8 destinos europeos frescos', desc: 'Para perros braquicéfalos, mayores y sensibles al calor. Reikiavik, Bergen, Estocolmo, Helsinki, Tallin, Edimburgo, Galway, Berna, ordenados del más fresco al menos fresco.', tag: 'Verano · nuevo' },
          { slug: 'wine-tourism-with-dog', emoji: '🍷', title: 'Enoturismo con tu perro: 5 regiones vinícolas europeas', desc: 'Burdeos Médoc, Toscana Chianti, Rioja Alta, valle del Duero, Borgoña: châteaux, palacios y quintas pet-friendly verificados. Políticas de bodega incluidas.', tag: 'Vino · nuevo' },
          { slug: 'christmas-markets-with-dog', emoji: '🎄', title: 'Mercados navideños dog-friendly: 6 ciudades europeas', desc: 'Estrasburgo + Colmar, Viena, Colonia, Praga, Brujas. Etiqueta de los puestos de madera con perro con correa, ventanas anti-multitud y planes de escape interior cálidos.', tag: 'Invierno · nuevo' },
          { slug: 'travel-with-cat-europe', emoji: '🐈', title: 'Viajar con tu gato en Europa: la guía completa', desc: 'Pasaporte UE para gato, transportines cabina IATA, normas de tren por país, protocolo anti-estrés Feliway 14 días, y 6 ciudades con hoteles cat-friendly verificados (mosquiteras + muros gruesos).', tag: 'Gato · nuevo' },
          { slug: 'pet-travel-cost-index-europe-2026', emoji: '💶', title: 'Índice de coste de viaje con mascota Europa 2026', desc: 'Lo que cuesta de verdad viajar con mascota en 30 ciudades europeas: cargos hoteleros, transporte, veterinario, cuidador.', tag: 'Datos' },
        ],
      },
      seasonal: {
        heading: 'Estacional y temático',
        intro: 'Cuándo ir y cómo planificar según el calendario: olas de calor, prohibiciones de playa, temporada de garrapatas, cafés cubiertos.',
        guides: [
          { slug: 'autumn-destinations-with-dog-2026', emoji: '🍂', title: 'Mejores destinos de otoño con tu perro', desc: 'La suavidad de la temporada media por España, Portugal e Italia, donde las playas reabren a los perros tras el 30 de septiembre, con menos gente y precios más bajos.', tag: 'Otoño · nuevo' },
          { slug: 'winter-destinations-with-dog-2026', emoji: '❄️', title: 'Mejores destinos de invierno con tu perro', desc: 'Sol de invierno en Canarias, costa sur templada y un pueblo termal alpino: donde un perro sigue caliente y bienvenido de diciembre a febrero.', tag: 'Invierno · nuevo' },
          { slug: 'dog-friendly-europe-by-month', emoji: '📅', title: 'Europa dog-friendly mes a mes', desc: 'Un planificador mes a mes: dónde ir en enero vs julio, ventanas de prohibición de playa, temporadas de ferry, alertas de garrapatas.', tag: 'Planificador' },
        ],
      },
    },
  },
  pt: {
    hero: {
      kicker: 'RECURSOS PRÁTICOS',
      title: `Guias de viagem com animal pela Europa`,
      subtitle: `Todos os nossos guias de viagem com animal, organizados segundo o que precisa antes, durante e depois da viagem. Editados por humanos, verificados em fontes oficiais, actualizados para 2026.`,
    },
    sectionLabels: {
      destinations: `Destinos e rankings`,
      itineraries: `Itinerários de viagem`,
      logistics: `Logística de viagem`,
      hotels: `Hotéis e reserva`,
      seasonal: `Sazonal e temático`,
    },
    sections: {
      destinations: {
        heading: `Top destinos e rankings`,
        intro: `Onde ir com o seu cão. Rankings de cidades e ilhas, listas de praias cuidadas e espaços sem trela, todos auditados.`,
        guides: [
          { slug: 'top-dog-friendly-cities-europe', emoji: '🏙️', title: `Top cidades dog-friendly da Europa`, desc: `As 15 cidades europeias melhor classificadas para acolhimento canino: parques, transportes, acesso a restaurantes e densidade hoteleira.`, tag: 'Ranking' },
          { slug: 'top-dog-friendly-islands-europe', emoji: '🏝️', title: `Top ilhas dog-friendly da Europa`, desc: `Ilhas mediterrânicas, atlânticas e nórdicas comparadas em praias, regras de ferry e oferta hoteleira.`, tag: 'Ranking' },
          { slug: 'dog-beaches-france', emoji: '🏖️', title: `Praias dog-friendly em França`, desc: `Todas as praias oficialmente dog-friendly do litoral francês, com regras sazonais e zonas com/sem trela.`, tag: 'Destinos' },
          { slug: 'best-dog-beaches-europe-2026', emoji: '🌊', title: `Melhores praias caninas da Europa 2026`, desc: `A nossa selecção editorial de praias caninas europeias, qualidade da água, regras de trela e hotéis pet-friendly próximos.`, tag: 'Destinos' },
          { slug: 'fenced-dog-parks-europe', emoji: '🌳', title: `Parques caninos vedados na Europa`, desc: `Onde encontrar recintos sem trela seguros em 30+ cidades europeias, mapeados e auditados.`, tag: 'Destinos' },
          { slug: 'high-energy-dog-destinations-europe', emoji: '🥾', title: `Melhores destinos para um cão muito ativo`, desc: `Destinos alpinos e de lago pensados para um cão de trabalho: trilhos reais, distâncias e regras de teleféricos, verificados. Chamonix, Windermere, Interlaken, Zell am See, Annecy, Innsbruck.`, tag: 'Por cão · novo' },
          { slug: 'water-loving-dog-destinations-europe', emoji: '💧', title: `Melhores destinos para um cão que adora água`, desc: `Destinos de lago e mar com pontos de banho reais e verificados para cães: regras sazonais e zonas de trela. Aix-les-Bains, Annecy, Biarritz, Salcombe, Split, Cádis.`, tag: 'Por cão · novo' },
        ],
      },
      itineraries: {
        heading: `Itinerários de viagem`,
        intro: `Rotas multi-cidade prontas a reservar, desenhadas em torno das regras para animais, da compatibilidade com o comboio e de paragens dog-friendly.`,
        guides: [
          { slug: 'brittany-pet-friendly-road-trip', emoji: '🦴', title: `Road trip pela Bretanha: Rennes → Saint-Malo → Dinard → Cancale`, desc: `Circuito de 5 dias e 200 km pelo norte da Bretanha com hotéis pet-friendly em cada paragem. Mapa, plano dia a dia e regras sazonais de praias.`, tag: '5 dias · novo' },
          { slug: 'cote-dazur-chien', emoji: '🌴', title: `Road trip Riviera Francesa: Nice → Antibes → Cannes → Menton`, desc: `Circuito de 5 dias e 100 km pela Riviera Francesa. Sentier du Littoral todo o ano, ferry para a Île Sainte-Marguerite, a rara praia canina de Menton aberta todo o verão.`, tag: '5 dias · novo' },
          { slug: 'provence-chien', emoji: '💜', title: `Road trip pela Provença: Avinhão → Arles → Aix → Marselha`, desc: `Circuito de 5 dias e 150 km pela Provença. Muralhas de Avignon, Arles romana + Camarga, trilhos Sainte-Victoire desde Aix, Calanques de Marseille. Excursão a Nîmes opcional.`, tag: '5 dias · novo' },
          { slug: 'pays-basque-chien', emoji: '🟢', title: `Road trip pelo País Basco: Bayonne → San Sebastián → Vitoria → Bilbao`, desc: `Circuito transfronteiriço de 5 dias e 280 km. Muralhas Vauban, baía da Concha, Anillo Verde da Capital Verde Europeia, Guggenheim + Ponte Vizcaya UNESCO que aceita cães até 40 kg.`, tag: '5 dias · novo' },
          { slug: 'city-trip-chien', emoji: '🚂', title: `City trip europeu: Paris → Bruxelas → Amesterdão → Berlim`, desc: `Itinerário de 10 dias de comboio por quatro capitais. Hotéis, regras de comboio entre cidades, papelada, veterinários de urgência.`, tag: '10 dias' },
          { slug: 'cote-mediterraneenne-chien', emoji: '🌊', title: `Costa mediterrânica: Nice → Génova → Florença → Roma`, desc: `Itinerário de 10 dias de comboio pela costa lígure e Itália central. Praias caninas, hotéis pet-friendly, dicas anti-calor.`, tag: '10 dias' },
          { slug: 'iberique-chien', emoji: '🌅', title: `Península ibérica: Lisboa → Porto → Madrid → Barcelona`, desc: `Itinerário de 12 dias de comboio por Portugal e Espanha. Hotéis pet-friendly, praias caninas, AVE/Alfa Pendular, regras PPP.`, tag: '12 dias' },
          { slug: 'alpes-chien', emoji: '🏔️', title: `Cidades alpinas: Genebra → Zurique → Munique → Salzburgo`, desc: `Itinerário de 10 dias de comboio pela Suíça, Alemanha e Áustria. Lagos, caminhadas, biergartens, regras ICE/CFF/ÖBB.`, tag: '10 dias' },
        ],
      },
      logistics: {
        heading: `Logística de viagem`,
        intro: `Papelada, modos de transporte e regras fronteiriças. O essencial a resolver antes de sair de casa.`,
        guides: [
          { slug: 'passeport-animal', emoji: '📋', title: `Passaporte para animais por país`, desc: `Microchip, vacina antirrábica, tratamento contra ténias. Requisitos de entrada país a país para UE, RU, Finlândia, Noruega, Islândia.`, tag: 'Essencial' },
          { slug: 'animal-health-certificate-vs-pet-passport-2026', emoji: '📜', title: `Animal Health Certificate vs passaporte europeu`, desc: `Que documento escolher pós-Brexit, validade, custo veterinário e o que acontece na fronteira em caso de erro.`, tag: 'Essencial' },
          { slug: 'avion-animal', emoji: '✈️', title: `Voar com o seu animal`, desc: `Cabina ou porão, que companhias aceitam animais, raças braquicefálicas proibidas, dimensões IATA. Ryanair & easyJet: a verdade.`, tag: 'Transporte' },
          { slug: 'train-avec-chien', emoji: '🚂', title: `Viajar de comboio com o seu cão`, desc: `SNCF, Deutsche Bahn, Renfe, Trenitalia, tarifas, regras de açaime, dimensões de transportadora, como reservar. Verificado por operador.`, tag: 'Transporte' },
          { slug: 'eurostar-with-dog', emoji: '🚄', title: `Eurostar com cão`, desc: `Política de cães de assistência, alternativas via ferry de Calais + comboio, e como combinar Eurotúnel + comboio através do Canal.`, tag: 'Transporte' },
          { slug: 'road-trip-chien', emoji: '🚗', title: `Road trip com o seu cão`, desc: `Leis por país, segurança no carro, Eurotúnel, ferries, kit de primeiros socorros. Multas e obrigações legais.`, tag: 'Transporte' },
        ],
      },
      hotels: {
        heading: `Hotéis e reserva`,
        intro: `Como escolher, reservar e orçamentar um hotel realmente pet-welcoming, não apenas um que tolera animais no papel.`,
        guides: [
          { slug: 'pet-friendly-hotels-europe-guide', emoji: '📘', title: `Hotéis pet-friendly na Europa: o guia completo 2026`, desc: `O guia pilar: cadeias, regras por país, suplementos, perguntas a fazer antes de reservar, e os nossos 460+ hotéis auditados.`, tag: 'Pilar' },
          { slug: 'hotel-pet-friendly', emoji: '🏨', title: `Escolher um verdadeiro hotel pet-friendly`, desc: `Red flags a detectar, green flags que importam, perguntas-chave antes de reservar e o custo real das taxas por animal.`, tag: 'Dicas' },
          { slug: 'honeymoon-with-pet', emoji: '💍', title: `Lua de mel com o seu cão: 6 destinos românticos europeus`, desc: `Palácios à beira do lago, cidades medievais muralhadas e cabos da Riviera Francesa que aceitam cães para uma semana romântica pet-friendly.`, tag: 'Romântico · novo' },
          { slug: 'cool-summer-with-dog', emoji: '❄️', title: `Viajar com o seu cão a menos de 25°C em julho: 8 destinos europeus frescos`, desc: `Para cães braquicefálicos, idosos e sensíveis ao calor. Reiquiavique, Bergen, Estocolmo, Helsínquia, Tallinn, Edimburgo, Galway, Berna, ordenados do mais fresco ao menos fresco.`, tag: 'Verão · novo' },
          { slug: 'wine-tourism-with-dog', emoji: '🍷', title: `Enoturismo com o seu cão: 5 regiões vinícolas europeias`, desc: `Bordeaux Médoc, Toscana Chianti, Rioja Alta, Vale do Douro, Borgonha: châteaux, palaces e quintas pet-friendly verificados. Políticas de cave incluídas.`, tag: 'Vinho · novo' },
          { slug: 'christmas-markets-with-dog', emoji: '🎄', title: `Mercados de Natal dog-friendly: 6 cidades europeias`, desc: `Estrasburgo + Colmar, Viena, Colónia, Praga, Bruges. Etiqueta das barracas de madeira com cão à trela, janelas anti-multidão e planos de fuga interior quentes.`, tag: 'Inverno · novo' },
          { slug: 'travel-with-cat-europe', emoji: '🐈', title: `Viajar com o seu gato na Europa: o guia completo`, desc: `Passaporte UE para gato, transportadoras cabine IATA, regras de comboio por país, protocolo anti-stress Feliway 14 dias, e 6 cidades com hotéis cat-friendly verificados (redes mosquiteiras + paredes espessas).`, tag: 'Gato · novo' },
          { slug: 'pet-travel-cost-index-europe-2026', emoji: '💶', title: `Índice de custo de viagem com animal Europa 2026`, desc: `O que custa realmente viajar com animal em 30 cidades europeias: taxas hoteleiras, transporte, veterinário, cuidador.`, tag: 'Dados' },
        ],
      },
      seasonal: {
        heading: `Sazonal e temático`,
        intro: `Quando ir e como planear consoante o calendário: ondas de calor, interdições de praia, época das carraças, cafés cobertos.`,
        guides: [
          { slug: 'autumn-destinations-with-dog-2026', emoji: '🍂', title: `Melhores destinos de outono com o seu cão`, desc: `A suavidade da época intermédia por Espanha, Portugal e Itália, onde as praias reabrem aos cães depois de 30 de setembro, com menos gente e preços mais baixos.`, tag: 'Outono · novo' },
          { slug: 'winter-destinations-with-dog-2026', emoji: '❄️', title: `Melhores destinos de inverno com o seu cão`, desc: `Sol de inverno nas Canárias, costa sul amena e uma vila termal alpina: onde um cão se mantém quente e bem-vindo de dezembro a fevereiro.`, tag: 'Inverno · novo' },
          { slug: 'dog-friendly-europe-by-month', emoji: '📅', title: `Europa dog-friendly mês a mês`, desc: `Um planeador mês a mês: onde ir em Janeiro vs Julho, janelas de interdição de praia, épocas de ferry, alertas de carraças.`, tag: 'Planeador' },
        ],
      },
    },
  },
  de: {
    hero: {
      kicker: 'PRAKTISCHE RESSOURCEN',
      title: `Reiseratgeber für Reisen mit Haustier in Europa`,
      subtitle: `All unsere Reiseratgeber fürs Reisen mit Haustier, geordnet nach dem, was du vor, während und nach der Reise wissen musst. Von Menschen redigiert, anhand offizieller Quellen geprüft, aktualisiert für 2026.`,
    },
    sectionLabels: {
      destinations: `Reiseziele & Rankings`,
      itineraries: `Reiserouten`,
      logistics: `Reiselogistik`,
      hotels: `Hotels & Buchung`,
      seasonal: `Saisonal & thematisch`,
    },
    sections: {
      destinations: {
        heading: `Top-Reiseziele & Rankings`,
        intro: `Wohin mit deinem Hund. Städte- und Insel-Rankings, sorgfältig gepflegte Strandlisten und Freilaufflächen, alle geprüft.`,
        guides: [
          { slug: 'top-dog-friendly-cities-europe', emoji: '🏙️', title: `Top hundefreundliche Städte in Europa`, desc: `Die 15 europäischen Städte mit der besten Bewertung für den Empfang von Hunden: Parks, Nahverkehr, Restaurantzugang und Hoteldichte.`, tag: 'Ranking' },
          { slug: 'top-dog-friendly-islands-europe', emoji: '🏝️', title: `Top hundefreundliche Inseln in Europa`, desc: `Mittelmeer-, Atlantik- und Nordseeinseln im Vergleich: Strandzugang, Fährregeln und Hotelauswahl.`, tag: 'Ranking' },
          { slug: 'dog-beaches-france', emoji: '🏖️', title: `Hundestrände in Frankreich`, desc: `Alle offiziell hundefreundlichen Strände an der französischen Küste, mit saisonalen Regeln und Zonen mit/ohne Leine.`, tag: 'Reiseziele' },
          { slug: 'best-dog-beaches-europe-2026', emoji: '🌊', title: `Beste Hundestrände in Europa 2026`, desc: `Unsere redaktionelle Auswahl europäischer Hundestrände, mit Wasserqualität, Leinenregeln und hundefreundlichen Unterkünften in der Nähe.`, tag: 'Reiseziele' },
          { slug: 'fenced-dog-parks-europe', emoji: '🌳', title: `Eingezäunte Hundeauslaufplätze in Europa`, desc: `Wo du sichere, umzäunte Freilaufflächen in mehr als 30 europäischen Städten findest, kartiert und geprüft.`, tag: 'Reiseziele' },
          { slug: 'high-energy-dog-destinations-europe', emoji: '🥾', title: `Beste Reiseziele für einen sehr aktiven Hund`, desc: `Alpen- und Seenziele für einen echten Arbeitshund: reale Wege, Distanzen und Seilbahnregeln, geprüft. Chamonix, Windermere, Interlaken, Zell am See, Annecy, Innsbruck.`, tag: 'Nach Hund · neu' },
          { slug: 'water-loving-dog-destinations-europe', emoji: '💧', title: `Beste Reiseziele für einen wasserliebenden Hund`, desc: `See- und Meeresziele mit echten, geprüften Badestellen für Hunde: saisonale Regeln und Leinenzonen. Aix-les-Bains, Annecy, Biarritz, Salcombe, Split, Cádiz.`, tag: 'Nach Hund · neu' },
        ],
      },
      itineraries: {
        heading: `Reiserouten`,
        intro: `Buchfertige Routen durch mehrere Städte, konzipiert rund um Haustierregeln, Bahntauglichkeit und hundefreundliche Zwischenstopps.`,
        guides: [
          { slug: 'brittany-pet-friendly-road-trip', emoji: '🦴', title: `Roadtrip durch die Bretagne: Rennes → Saint-Malo → Dinard → Cancale`, desc: `Eine 5-tägige Rundreise über 200 km durch die Nordbretagne mit hundefreundlichen Hotels an jeder Etappe. Karte, Tagesplan und saisonale Strandregeln.`, tag: '5 Tage · neu' },
          { slug: 'cote-dazur-chien', emoji: '🌴', title: `Roadtrip Côte d'Azur: Nizza → Antibes → Cannes → Menton`, desc: `Eine 5-tägige Rundreise über 100 km an der französischen Riviera. Der Küstenweg Sentier du Littoral das ganze Jahr, Fähre zur Île Sainte-Marguerite, der seltene Hundestrand von Menton, den ganzen Sommer geöffnet.`, tag: '5 Tage · neu' },
          { slug: 'provence-chien', emoji: '💜', title: `Roadtrip durch die Provence: Avignon → Arles → Aix → Marseille`, desc: `Eine 5-tägige Rundreise über 150 km durch die Provence. Stadtmauern von Avignon, das römische Arles + Camargue, Wanderungen an der Sainte-Victoire ab Aix, die Calanques von Marseille. Tagesausflug nach Nîmes optional.`, tag: '5 Tage · neu' },
          { slug: 'pays-basque-chien', emoji: '🟢', title: `Roadtrip durchs Baskenland: Bayonne → San Sebastián → Vitoria → Bilbao`, desc: `Eine 5-tägige, grenzüberschreitende Rundreise über 280 km. Vauban-Wälle, die Bucht La Concha, der Anillo Verde der Grünen Hauptstadt Europas, Guggenheim + die UNESCO-Biskaya-Brücke, die Hunde bis 40 kg mitnimmt.`, tag: '5 Tage · neu' },
          { slug: 'city-trip-chien', emoji: '🚂', title: `Europäischer Städtetrip: Paris → Brüssel → Amsterdam → Berlin`, desc: `Eine 10-tägige Bahnroute durch vier ikonische Hauptstädte. Hotels, Bahnregeln zwischen den Städten, Papierkram und Notfalltierärzte.`, tag: '10 Tage' },
          { slug: 'cote-mediterraneenne-chien', emoji: '🌊', title: `Mittelmeerküste: Nizza → Genua → Florenz → Rom`, desc: `Eine 10-tägige Bahnroute entlang der ligurischen Küste und durch Mittelitalien. Hundestrände, hundefreundliche Hotels, Tipps gegen die Sommerhitze.`, tag: '10 Tage' },
          { slug: 'iberique-chien', emoji: '🌅', title: `Iberische Halbinsel: Lissabon → Porto → Madrid → Barcelona`, desc: `Eine 12-tägige Bahnroute durch Portugal und Spanien. Hundefreundliche Hotels, Hundestrände, AVE/Alfa Pendular, Regeln für Listenhunde.`, tag: '12 Tage' },
          { slug: 'alpes-chien', emoji: '🏔️', title: `Alpenstädte: Genf → Zürich → München → Salzburg`, desc: `Eine 10-tägige Bahnroute durch die Schweiz, Deutschland und Österreich. Seen, Wanderungen, Biergärten, Regeln von ICE/SBB/ÖBB.`, tag: '10 Tage' },
        ],
      },
      logistics: {
        heading: `Reiselogistik`,
        intro: `Papierkram, Verkehrsmittel und Grenzregeln. Das Unverzichtbare, das du vor der Abreise klären musst.`,
        guides: [
          { slug: 'passeport-animal', emoji: '📋', title: `Heimtierausweis nach Land`, desc: `Mikrochip, Tollwutimpfung, Bandwurmbehandlung. Einreisebestimmungen Land für Land für die EU, das Vereinigte Königreich, Finnland, Norwegen, Island.`, tag: 'Wichtig' },
          { slug: 'animal-health-certificate-vs-pet-passport-2026', emoji: '📜', title: `Animal Health Certificate vs. EU-Heimtierausweis`, desc: `Welches Dokument du nach dem Brexit brauchst, Gültigkeitsdauer, Tierarztkosten und was an der Grenze passiert, wenn du dich vertust.`, tag: 'Wichtig' },
          { slug: 'avion-animal', emoji: '✈️', title: `Fliegen mit deinem Haustier`, desc: `Kabine oder Frachtraum, welche Airlines Tiere akzeptieren, Verbote für kurznasige Rassen, IATA-Maße. Ryanair & easyJet: die Wahrheit.`, tag: 'Transport' },
          { slug: 'train-avec-chien', emoji: '🚂', title: `Mit dem Zug reisen mit deinem Hund`, desc: `SNCF, Deutsche Bahn, Renfe, Trenitalia, Tarife, Maulkorbregeln, Transportboxmaße, wie man bucht. Pro Anbieter geprüft.`, tag: 'Transport' },
          { slug: 'eurostar-with-dog', emoji: '🚄', title: `Eurostar mit Hund`, desc: `Regeln für Assistenzhunde, versteckte Umwege per Fähre ab Calais + Zug, und wie man Eurotunnel + Zug über den Ärmelkanal kombiniert.`, tag: 'Transport' },
          { slug: 'road-trip-chien', emoji: '🚗', title: `Roadtrip mit deinem Hund`, desc: `Gesetze nach Land, Sicherheit im Auto, Eurotunnel, Fähren und Erste-Hilfe-Set. Bußgelder und gesetzliche Pflichten.`, tag: 'Transport' },
        ],
      },
      hotels: {
        heading: `Hotels & Buchung`,
        intro: `Wie du ein wirklich haustierfreundliches Hotel auswählst, buchst und budgetierst, nicht nur eines, das Tiere auf dem Papier duldet.`,
        guides: [
          { slug: 'pet-friendly-hotels-europe-guide', emoji: '📘', title: `Haustierfreundliche Hotels in Europa: der komplette Ratgeber 2026`, desc: `Der Pfeiler-Ratgeber: Hotelketten, Länderregeln, Gebühren, was du vor der Buchung fragen solltest, und unsere über 460 geprüften Hotels.`, tag: 'Pfeiler' },
          { slug: 'hotel-pet-friendly', emoji: '🏨', title: `Ein wirklich haustierfreundliches Hotel wählen`, desc: `Warnsignale, die du erkennen solltest, die grünen Signale, die zählen, die richtigen Fragen vor der Buchung und die wahren Kosten der Tiergebühren.`, tag: 'Tipps' },
          { slug: 'honeymoon-with-pet', emoji: '💍', title: `Flitterwochen mit deinem Hund: 6 romantische europäische Reiseziele`, desc: `Palais am Seeufer, ummauerte mittelalterliche Städte und Kaps der Côte d'Azur, die Hunde wirklich willkommen heißen, für eine Woche haustierfreundlicher Romantik.`, tag: 'Romantisch · neu' },
          { slug: 'cool-summer-with-dog', emoji: '❄️', title: `Mit deinem Hund im Juli unter 25 °C reisen: 8 kühle europäische Ziele`, desc: `Für kurznasige, ältere und hitzeempfindliche Hunde. Reykjavík, Bergen, Stockholm, Helsinki, Tallinn, Edinburgh, Galway, Bern, sortiert vom kühlsten Ziel an.`, tag: 'Sommer · neu' },
          { slug: 'wine-tourism-with-dog', emoji: '🍷', title: `Weintourismus mit deinem Hund: 5 europäische Weinregionen`, desc: `Bordeaux Médoc, Toskana Chianti, Rioja Alta, Douro-Tal, Burgund: geprüfte haustierfreundliche Châteaux, Palais und Quintas. Kellerregeln inklusive.`, tag: 'Wein · neu' },
          { slug: 'christmas-markets-with-dog', emoji: '🎄', title: `Hundefreundliche Weihnachtsmärkte: 6 europäische Städte`, desc: `Straßburg + Colmar, Wien, Köln, Prag, Brügge. Etikette an den Holzständen mit angeleintem Hund, ruhige Zeitfenster ohne Gedränge und warme Rückzugsorte im Inneren.`, tag: 'Winter · neu' },
          { slug: 'travel-with-cat-europe', emoji: '🐈', title: `Mit deiner Katze in Europa reisen: der komplette Ratgeber`, desc: `EU-Pass für Katzen, IATA-Kabinentaschen, Zugregeln pro Land, 14-tägiges Feliway-Anti-Stress-Protokoll und 6 Städte mit geprüften katzenfreundlichen Hotels (Fliegengitter + dicke Wände).`, tag: 'Katze · neu' },
          { slug: 'pet-travel-cost-index-europe-2026', emoji: '💶', title: `Kostenindex fürs Reisen mit Haustier in Europa 2026`, desc: `Was das Reisen mit Haustier in 30 europäischen Städten wirklich kostet: Hotelgebühren, Transport, Tierarzt, Betreuung, sortiert und verglichen.`, tag: 'Daten' },
        ],
      },
      seasonal: {
        heading: `Saisonal & thematisch`,
        intro: `Wann du reisen und was du rund um den Kalender einplanen solltest: Hitzewellen, Strandverbote, Zeckensaison, überdachte Cafés.`,
        guides: [
          { slug: 'autumn-destinations-with-dog-2026', emoji: '🍂', title: `Beste Herbstziele fürs Reisen mit deinem Hund`, desc: `Milde Übergangssaison in Spanien, Portugal und Italien, wo die Hundestrände nach dem 30. September wieder öffnen und Andrang und Preise sinken.`, tag: 'Herbst · neu' },
          { slug: 'winter-destinations-with-dog-2026', emoji: '❄️', title: `Beste Winterziele fürs Reisen mit deinem Hund`, desc: `Wintersonne auf den Kanaren, milde Südküste und ein alpiner Kurort: wo ein Hund von Dezember bis Februar warm und willkommen bleibt.`, tag: 'Winter · neu' },
          { slug: 'dog-friendly-europe-by-month', emoji: '📅', title: `Hundefreundliches Europa Monat für Monat`, desc: `Ein Planer Monat für Monat: wohin im Januar gegenüber Juli, Zeitfenster für Strandverbote, Fährsaisons, Zeckenwarnungen.`, tag: 'Planer' },
        ],
      },
    },
  },
  nl: {
    hero: {
      kicker: 'PRAKTISCHE BRONNEN',
      title: `Reisgidsen voor reizen met je huisdier in Europa`,
      subtitle: `Al onze reisgidsen voor reizen met je huisdier, geordend naar wat je moet weten voor, tijdens en na de reis. Door mensen geredigeerd, gecontroleerd aan officiële bronnen, bijgewerkt voor 2026.`,
    },
    sectionLabels: {
      destinations: `Bestemmingen & ranglijsten`,
      itineraries: `Reisroutes`,
      logistics: `Reislogistiek`,
      hotels: `Hotels & boeken`,
      seasonal: `Seizoensgebonden & thematisch`,
    },
    sections: {
      destinations: {
        heading: `Top bestemmingen & ranglijsten`,
        intro: `Waar je naartoe kunt met je hond. Ranglijsten van steden en eilanden, zorgvuldig samengestelde strandlijsten en losloopgebieden, allemaal gecontroleerd.`,
        guides: [
          { slug: 'top-dog-friendly-cities-europe', emoji: '🏙️', title: `Top hondvriendelijke steden in Europa`, desc: `De 15 hoogst scorende Europese steden voor het onthaal van honden: parken, openbaar vervoer, toegang tot restaurants en hoteldichtheid.`, tag: 'Ranglijst' },
          { slug: 'top-dog-friendly-islands-europe', emoji: '🏝️', title: `Top hondvriendelijke eilanden in Europa`, desc: `Mediterrane, Atlantische en Noordse eilanden vergeleken op strandtoegang, veerregels en hotelaanbod.`, tag: 'Ranglijst' },
          { slug: 'dog-beaches-france', emoji: '🏖️', title: `Hondenstranden in Frankrijk`, desc: `Alle officieel hondvriendelijke stranden langs de Franse kust, met seizoensregels en zones met/zonder lijn.`, tag: 'Bestemmingen' },
          { slug: 'best-dog-beaches-europe-2026', emoji: '🌊', title: `Beste hondenstranden in Europa 2026`, desc: `Onze redactionele selectie van Europese hondenstranden, met waterkwaliteit, lijnregels en huisdiervriendelijke verblijven in de buurt.`, tag: 'Bestemmingen' },
          { slug: 'fenced-dog-parks-europe', emoji: '🌳', title: `Omheinde hondenlosloopparken in Europa`, desc: `Waar je veilige, omheinde losloopgebieden vindt in meer dan 30 Europese steden, in kaart gebracht en gecontroleerd.`, tag: 'Bestemmingen' },
          { slug: 'high-energy-dog-destinations-europe', emoji: '🥾', title: `Beste bestemmingen voor een heel actieve hond`, desc: `Alpen- en meerbestemmingen gemaakt voor een werkhond: echte wandelpaden, afstanden en liftregels, geverifieerd. Chamonix, Windermere, Interlaken, Zell am See, Annecy, Innsbruck.`, tag: 'Per hond · nieuw' },
          { slug: 'water-loving-dog-destinations-europe', emoji: '💧', title: `Beste bestemmingen voor een waterliefhebbende hond`, desc: `Meer- en zeebestemmingen met echte, geverifieerde zwemplekken voor honden: seizoensregels en lijnzones. Aix-les-Bains, Annecy, Biarritz, Salcombe, Split, Cádiz.`, tag: 'Per hond · nieuw' },
        ],
      },
      itineraries: {
        heading: `Reisroutes`,
        intro: `Kant-en-klare routes langs meerdere steden, ontworpen rond huisdierregels, treincompatibiliteit en hondvriendelijke haltes.`,
        guides: [
          { slug: 'brittany-pet-friendly-road-trip', emoji: '🦴', title: `Roadtrip door Bretagne: Rennes → Saint-Malo → Dinard → Cancale`, desc: `Een rondreis van 5 dagen en 200 km door Noord-Bretagne met huisdiervriendelijke hotels bij elke halte. Kaart, dag-tot-dagplan en seizoensregels voor stranden.`, tag: '5 dagen · nieuw' },
          { slug: 'cote-dazur-chien', emoji: '🌴', title: `Roadtrip Côte d'Azur: Nice → Antibes → Cannes → Menton`, desc: `Een rondreis van 5 dagen en 100 km langs de Franse Rivièra. Het kustpad Sentier du Littoral het hele jaar, veerboot naar de Île Sainte-Marguerite, het zeldzame hondenstrand van Menton dat de hele zomer open is.`, tag: '5 dagen · nieuw' },
          { slug: 'provence-chien', emoji: '💜', title: `Roadtrip door de Provence: Avignon → Arles → Aix → Marseille`, desc: `Een rondreis van 5 dagen en 150 km door de Provence. Stadsmuren van Avignon, het Romeinse Arles + Camargue, wandelingen op de Sainte-Victoire vanuit Aix, de Calanques van Marseille. Dagtrip naar Nîmes optioneel.`, tag: '5 dagen · nieuw' },
          { slug: 'pays-basque-chien', emoji: '🟢', title: `Roadtrip door Baskenland: Bayonne → San Sebastián → Vitoria → Bilbao`, desc: `Een grensoverschrijdende rondreis van 5 dagen en 280 km. Vauban-wallen, de baai van La Concha, de Anillo Verde van de Groene Hoofdstad van Europa, Guggenheim + de UNESCO-brug van Biskaje die honden tot 40 kg toelaat.`, tag: '5 dagen · nieuw' },
          { slug: 'city-trip-chien', emoji: '🚂', title: `Europese stedentrip: Parijs → Brussel → Amsterdam → Berlijn`, desc: `Een treinroute van 10 dagen door vier iconische hoofdsteden. Hotels, treinregels tussen steden, papierwerk en nooddierenartsen.`, tag: '10 dagen' },
          { slug: 'cote-mediterraneenne-chien', emoji: '🌊', title: `Middellandse Zeekust: Nice → Genua → Florence → Rome`, desc: `Een treinroute van 10 dagen langs de Ligurische kust en Midden-Italië. Hondenstranden, huisdiervriendelijke hotels, tips tegen de zomerhitte.`, tag: '10 dagen' },
          { slug: 'iberique-chien', emoji: '🌅', title: `Iberisch schiereiland: Lissabon → Porto → Madrid → Barcelona`, desc: `Een treinroute van 12 dagen door Portugal en Spanje. Huisdiervriendelijke hotels, hondenstranden, AVE/Alfa Pendular, regels voor risicohonden.`, tag: '12 dagen' },
          { slug: 'alpes-chien', emoji: '🏔️', title: `Alpensteden: Genève → Zürich → München → Salzburg`, desc: `Een treinroute van 10 dagen door Zwitserland, Duitsland en Oostenrijk. Meren, wandelingen, biergartens, regels van ICE/SBB/ÖBB.`, tag: '10 dagen' },
        ],
      },
      logistics: {
        heading: `Reislogistiek`,
        intro: `Papierwerk, vervoerswijzen en grensregels. Het onmisbare dat je moet regelen voordat je van huis vertrekt.`,
        guides: [
          { slug: 'passeport-animal', emoji: '📋', title: `Dierenpaspoort per land`, desc: `Microchip, rabiësvaccinatie, lintwormbehandeling. Invoervoorwaarden land per land voor de EU, het VK, Finland, Noorwegen, IJsland.`, tag: 'Essentieel' },
          { slug: 'animal-health-certificate-vs-pet-passport-2026', emoji: '📜', title: `Animal Health Certificate vs. EU-dierenpaspoort`, desc: `Welk document je nodig hebt na de Brexit, geldigheidsduur, kosten bij de dierenarts en wat er aan de grens gebeurt als je het misloopt.`, tag: 'Essentieel' },
          { slug: 'avion-animal', emoji: '✈️', title: `Vliegen met je huisdier`, desc: `Cabine of bagageruim, welke luchtvaartmaatschappijen huisdieren accepteren, verboden voor kortsnuitige rassen, IATA-afmetingen. Ryanair & easyJet: de waarheid.`, tag: 'Vervoer' },
          { slug: 'train-avec-chien', emoji: '🚂', title: `Met de trein reizen met je hond`, desc: `SNCF, Deutsche Bahn, Renfe, Trenitalia, tarieven, muilkorfregels, afmetingen van de reismand, hoe je boekt. Per vervoerder gecontroleerd.`, tag: 'Vervoer' },
          { slug: 'eurostar-with-dog', emoji: '🚄', title: `Eurostar met een hond`, desc: `Beleid voor assistentiehonden, verborgen omwegen via de veerboot vanuit Calais + trein, en hoe je Eurotunnel + trein over het Kanaal combineert.`, tag: 'Vervoer' },
          { slug: 'road-trip-chien', emoji: '🚗', title: `Roadtrip met je hond`, desc: `Wetten per land, veiligheid in de auto, Eurotunnel, veerboten en eerstehulpkit. Boetes en wettelijke verplichtingen.`, tag: 'Vervoer' },
        ],
      },
      hotels: {
        heading: `Hotels & boeken`,
        intro: `Hoe je een echt huisdiervriendelijk hotel kiest, boekt en begroot, niet zomaar een dat huisdieren op papier toelaat.`,
        guides: [
          { slug: 'pet-friendly-hotels-europe-guide', emoji: '📘', title: `Huisdiervriendelijke hotels in Europa: de complete gids 2026`, desc: `De pijlergids: ketens, landregels, kosten, wat je moet vragen voor je boekt, en onze 460+ gecontroleerde hotels.`, tag: 'Pijler' },
          { slug: 'hotel-pet-friendly', emoji: '🏨', title: `Een echt huisdiervriendelijk hotel kiezen`, desc: `Waarschuwingssignalen die je moet herkennen, groene signalen die tellen, de juiste vragen voor je boekt en de echte kosten van huisdiertoeslagen.`, tag: 'Tips' },
          { slug: 'honeymoon-with-pet', emoji: '💍', title: `Huwelijksreis met je hond: 6 romantische Europese bestemmingen`, desc: `Paleizen aan het meer, ommuurde middeleeuwse stadjes en kapen aan de Côte d'Azur die honden echt verwelkomen voor een week huisdiervriendelijke romantiek.`, tag: 'Romantisch · nieuw' },
          { slug: 'cool-summer-with-dog', emoji: '❄️', title: `Reizen met je hond onder 25 °C in juli: 8 koele Europese keuzes`, desc: `Voor kortsnuitige, oudere en hittegevoelige honden. Reykjavik, Bergen, Stockholm, Helsinki, Tallinn, Edinburgh, Galway, Bern, gerangschikt van koelst naar minst koel.`, tag: 'Zomer · nieuw' },
          { slug: 'wine-tourism-with-dog', emoji: '🍷', title: `Wijntoerisme met je hond: 5 Europese wijnregio's`, desc: `Bordeaux Médoc, Toscane Chianti, Rioja Alta, Douro-vallei, Bourgogne: geverifieerde huisdiervriendelijke châteaux, paleizen en quintas. Kelderbeleid inbegrepen.`, tag: 'Wijn · nieuw' },
          { slug: 'christmas-markets-with-dog', emoji: '🎄', title: `Hondvriendelijke kerstmarkten: 6 Europese steden`, desc: `Straatsburg + Colmar, Wenen, Keulen, Praag, Brugge. Etiquette bij de houten kraampjes met een aangelijnde hond, rustige tijdvensters zonder drukte en warme schuilplekken binnen.`, tag: 'Winter · nieuw' },
          { slug: 'travel-with-cat-europe', emoji: '🐈', title: `Reizen met je kat in Europa: de complete gids`, desc: `EU-paspoort voor katten, IATA-cabinemanden, treinregels per land, 14-daags Feliway-antistressprotocol, en 6 steden met geverifieerde katvriendelijke hotels (horren + dikke muren).`, tag: 'Kat · nieuw' },
          { slug: 'pet-travel-cost-index-europe-2026', emoji: '💶', title: `Kostenindex reizen met huisdier Europa 2026`, desc: `Wat reizen met een huisdier echt kost in 30 Europese steden: hotelkosten, vervoer, dierenarts, oppastarieven, gesorteerd en vergeleken.`, tag: 'Data' },
        ],
      },
      seasonal: {
        heading: `Seizoensgebonden & thematisch`,
        intro: `Wanneer je gaat en wat je rond de kalender plant: hittegolven, strandverboden, tekenseizoen, overdekte cafés.`,
        guides: [
          { slug: 'autumn-destinations-with-dog-2026', emoji: '🍂', title: `Beste herfstbestemmingen om te reizen met je hond`, desc: `De zachte tussenseizoenswarmte in Spanje, Portugal en Italië, waar de hondenstranden na 30 september heropenen en drukte en prijzen dalen.`, tag: 'Herfst · nieuw' },
          { slug: 'winter-destinations-with-dog-2026', emoji: '❄️', title: `Beste winterbestemmingen om te reizen met je hond`, desc: `Winterzon op de Canarische Eilanden, milde zuidkust en een alpien kuuroord: waar een hond warm en welkom blijft van december tot februari.`, tag: 'Winter · nieuw' },
          { slug: 'dog-friendly-europe-by-month', emoji: '📅', title: `Hondvriendelijk Europa maand per maand`, desc: `Een planner maand per maand: waar je naartoe gaat in januari versus juli, tijdvensters voor strandverboden, veerseizoenen, tekenwaarschuwingen.`, tag: 'Planner' },
        ],
      },
    },
  },
  it: {
    hero: {
      kicker: 'RISORSE PRATICHE',
      title: `Guide di viaggio con animale in Europa`,
      subtitle: `Tutte le nostre guide di viaggio con animale, organizzate in base a ciò che ti serve prima, durante e dopo il viaggio. Curate da persone, verificate su fonti ufficiali, aggiornate al 2026.`,
    },
    sectionLabels: {
      destinations: `Destinazioni e classifiche`,
      itineraries: `Itinerari di viaggio`,
      logistics: `Logistica di viaggio`,
      hotels: `Hotel e prenotazione`,
      seasonal: `Stagionale e tematico`,
    },
    sections: {
      destinations: {
        heading: `Top destinazioni e classifiche`,
        intro: `Dove andare con il tuo cane. Classifiche di città e isole, liste di spiagge curate e spazi senza guinzaglio, tutti verificati.`,
        guides: [
          { slug: 'top-dog-friendly-cities-europe', emoji: '🏙️', title: `Top città dog-friendly d'Europa`, desc: `Le 15 città europee con il punteggio più alto per l'accoglienza dei cani: parchi, trasporti, accesso ai ristoranti e densità di hotel.`, tag: 'Classifica' },
          { slug: 'top-dog-friendly-islands-europe', emoji: '🏝️', title: `Top isole dog-friendly d'Europa`, desc: `Isole mediterranee, atlantiche e nordiche a confronto su accesso alle spiagge, regole dei traghetti e scelta degli hotel.`, tag: 'Classifica' },
          { slug: 'dog-beaches-france', emoji: '🏖️', title: `Spiagge dog-friendly in Francia`, desc: `Tutte le spiagge ufficialmente dog-friendly della costa francese, con regole stagionali e zone con/senza guinzaglio.`, tag: 'Destinazioni' },
          { slug: 'best-dog-beaches-europe-2026', emoji: '🌊', title: `Migliori spiagge per cani d'Europa 2026`, desc: `La nostra selezione editoriale di spiagge per cani europee, con qualità dell'acqua, regole del guinzaglio e soggiorni pet-friendly nelle vicinanze.`, tag: 'Destinazioni' },
          { slug: 'fenced-dog-parks-europe', emoji: '🌳', title: `Aree cani recintate in Europa`, desc: `Dove trovare recinti sicuri senza guinzaglio in oltre 30 città europee, mappati e verificati.`, tag: 'Destinazioni' },
          { slug: 'high-energy-dog-destinations-europe', emoji: '🥾', title: `Migliori destinazioni per un cane molto attivo`, desc: `Destinazioni alpine e lacustri pensate per un cane da lavoro: sentieri reali, distanze e regole degli impianti di risalita, verificati. Chamonix, Windermere, Interlaken, Zell am See, Annecy, Innsbruck.`, tag: 'Per cane · nuovo' },
          { slug: 'water-loving-dog-destinations-europe', emoji: '💧', title: `Migliori destinazioni per un cane che ama l'acqua`, desc: `Destinazioni di lago e mare con veri punti di balneazione per cani, verificati: regole stagionali e zone del guinzaglio. Aix-les-Bains, Annecy, Biarritz, Salcombe, Split, Cadice.`, tag: 'Per cane · nuovo' },
        ],
      },
      itineraries: {
        heading: `Itinerari di viaggio`,
        intro: `Itinerari multi-città pronti da prenotare, pensati attorno alle regole per animali, alla compatibilità con il treno e alle tappe dog-friendly.`,
        guides: [
          { slug: 'brittany-pet-friendly-road-trip', emoji: '🦴', title: `Road trip in Bretagna: Rennes → Saint-Malo → Dinard → Cancale`, desc: `Un anello di 5 giorni e 200 km nel nord della Bretagna con hotel pet-friendly a ogni tappa. Mappa, piano giorno per giorno e regole stagionali delle spiagge.`, tag: '5 giorni · nuovo' },
          { slug: 'cote-dazur-chien', emoji: '🌴', title: `Road trip Costa Azzurra: Nizza → Antibes → Cannes → Menton`, desc: `Un anello di 5 giorni e 100 km sulla Riviera francese. Il Sentier du Littoral tutto l'anno, traghetto per l'Île Sainte-Marguerite, la rara spiaggia per cani di Menton aperta tutta l'estate.`, tag: '5 giorni · nuovo' },
          { slug: 'provence-chien', emoji: '💜', title: `Road trip in Provenza: Avignone → Arles → Aix → Marsiglia`, desc: `Un anello di 5 giorni e 150 km in Provenza. Le mura di Avignone, Arles romana + Camargue, escursioni sulla Sainte-Victoire da Aix, le Calanques di Marsiglia. Gita a Nîmes facoltativa.`, tag: '5 giorni · nuovo' },
          { slug: 'pays-basque-chien', emoji: '🟢', title: `Road trip nei Paesi Baschi: Bayonne → San Sebastián → Vitoria → Bilbao`, desc: `Un anello transfrontaliero di 5 giorni e 280 km. Mura di Vauban, baia della Concha, l'Anillo Verde della Capitale Verde Europea, Guggenheim + il ponte di Biscaglia UNESCO che accetta cani fino a 40 kg.`, tag: '5 giorni · nuovo' },
          { slug: 'city-trip-chien', emoji: '🚂', title: `City trip europeo: Parigi → Bruxelles → Amsterdam → Berlino`, desc: `Un itinerario di 10 giorni in treno attraverso quattro capitali iconiche. Hotel, regole del treno tra le città, documenti e veterinari d'emergenza.`, tag: '10 giorni' },
          { slug: 'cote-mediterraneenne-chien', emoji: '🌊', title: `Costa mediterranea: Nizza → Genova → Firenze → Roma`, desc: `Un itinerario di 10 giorni in treno lungo la costa ligure e l'Italia centrale. Spiagge per cani, hotel pet-friendly, consigli contro il caldo estivo.`, tag: '10 giorni' },
          { slug: 'iberique-chien', emoji: '🌅', title: `Penisola iberica: Lisbona → Porto → Madrid → Barcellona`, desc: `Un itinerario di 12 giorni in treno attraverso Portogallo e Spagna. Hotel pet-friendly, spiagge per cani, AVE/Alfa Pendular, regole sui cani pericolosi.`, tag: '12 giorni' },
          { slug: 'alpes-chien', emoji: '🏔️', title: `Città alpine: Ginevra → Zurigo → Monaco → Salisburgo`, desc: `Un itinerario di 10 giorni in treno attraverso Svizzera, Germania e Austria. Laghi, escursioni, biergarten, regole di ICE/FFS/ÖBB.`, tag: '10 giorni' },
        ],
      },
      logistics: {
        heading: `Logistica di viaggio`,
        intro: `Documenti, mezzi di trasporto e regole di frontiera. Ciò che non puoi rimandare e devi sistemare prima di partire.`,
        guides: [
          { slug: 'passeport-animal', emoji: '📋', title: `Passaporto per animali per Paese`, desc: `Microchip, vaccino antirabbico, trattamento contro la tenia. Requisiti d'ingresso Paese per Paese per UE, Regno Unito, Finlandia, Norvegia, Islanda.`, tag: 'Essenziale' },
          { slug: 'animal-health-certificate-vs-pet-passport-2026', emoji: '📜', title: `Animal Health Certificate vs passaporto europeo`, desc: `Quale documento ti serve dopo la Brexit, durata di validità, costo dal veterinario e cosa succede alla frontiera se sbagli.`, tag: 'Essenziale' },
          { slug: 'avion-animal', emoji: '✈️', title: `Volare con il tuo animale`, desc: `Cabina o stiva, quali compagnie accettano gli animali, divieti per le razze brachicefale, dimensioni IATA. Ryanair & easyJet: la verità.`, tag: 'Trasporto' },
          { slug: 'train-avec-chien', emoji: '🚂', title: `Viaggiare in treno con il tuo cane`, desc: `SNCF, Deutsche Bahn, Renfe, Trenitalia, tariffe, regole sulla museruola, dimensioni del trasportino, come prenotare. Verificato per operatore.`, tag: 'Trasporto' },
          { slug: 'eurostar-with-dog', emoji: '🚄', title: `Eurostar con un cane`, desc: `Politica sui cani d'assistenza, percorsi alternativi via traghetto da Calais + treno, e come combinare Eurotunnel + treno attraverso la Manica.`, tag: 'Trasporto' },
          { slug: 'road-trip-chien', emoji: '🚗', title: `Road trip con il tuo cane`, desc: `Leggi per Paese, sicurezza in auto, Eurotunnel, traghetti e kit di primo soccorso. Multe e obblighi di legge.`, tag: 'Trasporto' },
        ],
      },
      hotels: {
        heading: `Hotel e prenotazione`,
        intro: `Come scegliere, prenotare e mettere a budget un hotel davvero accogliente per gli animali, non solo uno che li tollera sulla carta.`,
        guides: [
          { slug: 'pet-friendly-hotels-europe-guide', emoji: '📘', title: `Hotel pet-friendly in Europa: la guida completa 2026`, desc: `La guida pilastro: catene, regole per Paese, supplementi, cosa chiedere prima di prenotare e i nostri oltre 460 hotel verificati.`, tag: 'Pilastro' },
          { slug: 'hotel-pet-friendly', emoji: '🏨', title: `Scegliere un hotel davvero pet-friendly`, desc: `I segnali d'allarme da riconoscere, i segnali positivi che contano, le domande giuste prima di prenotare e il vero costo dei supplementi per animali.`, tag: 'Consigli' },
          { slug: 'honeymoon-with-pet', emoji: '💍', title: `Luna di miele con il tuo cane: 6 destinazioni romantiche europee`, desc: `Palazzi in riva al lago, borghi medievali cinti da mura e capi della Costa Azzurra che accolgono davvero i cani per una settimana di romanticismo pet-friendly.`, tag: 'Romantico · nuovo' },
          { slug: 'cool-summer-with-dog', emoji: '❄️', title: `Viaggiare con il tuo cane sotto i 25 °C a luglio: 8 mete europee fresche`, desc: `Per cani brachicefali, anziani e sensibili al caldo. Reykjavík, Bergen, Stoccolma, Helsinki, Tallinn, Edimburgo, Galway, Berna, ordinate dalla più fresca.`, tag: 'Estate · nuovo' },
          { slug: 'wine-tourism-with-dog', emoji: '🍷', title: `Enoturismo con il tuo cane: 5 regioni vinicole europee`, desc: `Bordeaux Médoc, Toscana Chianti, Rioja Alta, Valle del Douro, Borgogna: châteaux, palazzi e quinte pet-friendly verificati. Regole delle cantine incluse.`, tag: 'Vino · nuovo' },
          { slug: 'christmas-markets-with-dog', emoji: '🎄', title: `Mercatini di Natale dog-friendly: 6 città europee`, desc: `Strasburgo + Colmar, Vienna, Colonia, Praga, Bruges. Il galateo tra le casette di legno con un cane al guinzaglio, le fasce orarie senza folla e i rifugi caldi al chiuso.`, tag: 'Inverno · nuovo' },
          { slug: 'travel-with-cat-europe', emoji: '🐈', title: `Viaggiare con il tuo gatto in Europa: la guida completa`, desc: `Passaporto UE per gatti, trasportini da cabina IATA, regole del treno per Paese, protocollo antistress Feliway di 14 giorni e 6 città con hotel cat-friendly verificati (zanzariere + muri spessi).`, tag: 'Gatto · nuovo' },
          { slug: 'pet-travel-cost-index-europe-2026', emoji: '💶', title: `Indice dei costi di viaggio con animale Europa 2026`, desc: `Quanto costa davvero viaggiare con un animale in 30 città europee: supplementi in hotel, trasporto, veterinario, tariffe del sitter, ordinati e confrontati.`, tag: 'Dati' },
        ],
      },
      seasonal: {
        heading: `Stagionale e tematico`,
        intro: `Quando partire e cosa pianificare in base al calendario: ondate di calore, divieti in spiaggia, stagione delle zecche, caffè al coperto.`,
        guides: [
          { slug: 'autumn-destinations-with-dog-2026', emoji: '🍂', title: `Migliori destinazioni d'autunno con il tuo cane`, desc: `Il tepore della mezza stagione tra Spagna, Portogallo e Italia, dove le spiagge riaprono ai cani dopo il 30 settembre e folla e prezzi calano.`, tag: 'Autunno · nuovo' },
          { slug: 'winter-destinations-with-dog-2026', emoji: '❄️', title: `Migliori destinazioni d'inverno con il tuo cane`, desc: `Sole invernale alle Canarie, mite costa meridionale e una cittadina termale alpina: dove un cane resta al caldo e benvenuto da dicembre a febbraio.`, tag: 'Inverno · nuovo' },
          { slug: 'dog-friendly-europe-by-month', emoji: '📅', title: `Europa dog-friendly mese per mese`, desc: `Un pianificatore mese per mese: dove andare a gennaio rispetto a luglio, finestre di divieto in spiaggia, stagioni dei traghetti, allerte zecche.`, tag: 'Pianificatore' },
        ],
      },
    },
  },
}

const SECTION_ORDER: Array<keyof LocaleCopy['sections']> = ['destinations', 'itineraries', 'logistics', 'hotels', 'seasonal']

function GuideCard({ guide, locale }: { guide: Guide; locale: string }) {
  return (
    <Link
      href={`/${locale}/guides/${guide.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
          {guide.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-extrabold text-gray-900 text-base lg:text-lg group-hover:text-blue-700 transition-colors leading-snug">
              {guide.title}
            </h3>
            <span className="flex-shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
              {guide.tag}
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{guide.desc}</p>
        </div>
        <span className="flex-shrink-0 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 text-xl">→</span>
      </div>
    </Link>
  )
}

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const copy = COPY[locale] ?? COPY.en

  // Collect all guides for CollectionPage schema
  const allGuides: Array<{ slug: string; title: string; desc: string }> = []
  for (const sectionKey of SECTION_ORDER) {
    for (const g of copy.sections[sectionKey].guides) {
      allGuides.push({ slug: g.slug, title: g.title, desc: g.desc })
    }
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: copy.hero.title,
    description: copy.hero.subtitle,
    inLanguage: locale,
    url: `${SITE_URL}/${locale}/guides`,
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allGuides.length,
      itemListElement: allGuides.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/${locale}/guides/${g.slug}`,
        name: g.title,
        description: g.desc,
      })),
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-5">
            📚 {copy.hero.kicker}
          </span>
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">{copy.hero.title}</h1>
          <p className="text-blue-200 text-base lg:text-lg leading-relaxed max-w-2xl">{copy.hero.subtitle}</p>
          <nav aria-label="Sections" className="mt-6 flex flex-wrap gap-2">
            {SECTION_ORDER.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full transition-colors"
              >
                {copy.sectionLabels[key]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Amazon accessories cross-link (FR only - pages exist only in FR) */}
        {locale === 'fr' && (
          <section className="bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300 rounded-2xl p-6">
            <div className="flex items-start gap-4 flex-wrap">
              <span className="text-4xl flex-shrink-0">🎒</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-extrabold text-stone-900 mb-1">Accessoires testés pour voyager</h2>
                <p className="text-sm text-stone-700 mb-3 leading-relaxed">
                  Notre sélection chien / chat / canicule - gourde nomade, tapis rafraîchissant,
                  harnais voiture, fontaine. Liens directs Amazon.fr.
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <a href="/fr/accessoires-chien" className="bg-white border border-amber-400 text-amber-900 font-semibold px-3 py-2 rounded-full hover:bg-amber-50">
                    Accessoires chien →
                  </a>
                  <a href="/fr/accessoires-chien-chaleur" className="bg-white border border-amber-400 text-amber-900 font-semibold px-3 py-2 rounded-full hover:bg-amber-50">
                    Spécial canicule 🔥 →
                  </a>
                  <a href="/fr/accessoires-chat" className="bg-white border border-stone-300 text-stone-700 px-3 py-2 rounded-full hover:bg-stone-50">
                    Accessoires chat →
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {SECTION_ORDER.map((sectionKey) => {
          const section = copy.sections[sectionKey]
          return (
            <section key={sectionKey} id={sectionKey} className="scroll-mt-20">
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">{section.heading}</h2>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed max-w-3xl">{section.intro}</p>
              </div>
              <div className="space-y-3">
                {section.guides.map((g) => (
                  <GuideCard key={g.slug} guide={g} locale={locale} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
