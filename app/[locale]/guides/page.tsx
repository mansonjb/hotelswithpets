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
  }
  const descriptions: Record<string, string> = {
    en: 'All our pet-travel guides, organised by what you need to know before, during and after the trip: passports, transport, hotels, destinations and seasonal planning.',
    fr: `Tous nos guides de voyage avec animal, organisés selon ce dont vous avez besoin avant, pendant et après le voyage : passeport, transport, hôtels, destinations et planification saisonnière.`,
    es: 'Todas nuestras guías de viaje con mascota, organizadas según lo que necesitas antes, durante y después del viaje: pasaporte, transporte, hoteles, destinos y planificación estacional.',
    pt: `Todos os nossos guias de viagem com animal, organizados segundo o que precisa antes, durante e depois da viagem: passaporte, transporte, hotéis, destinos e planeamento sazonal.`,
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
