import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, STAY22_AID } from '@/lib/site'
import { CityTripGuide, type RouteCopy, type StickyConfig } from '../_components/CityTripGuide'

const SLUG = 'alpes-chien'
const ROUTE_SLUGS = ['geneva', 'zurich', 'munich', 'salzburg'] as const

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Alpine Cities With Your Dog: Geneva → Zurich → Munich → Salzburg (10-Day Itinerary)',
    fr: 'Villes alpines avec son chien : Genève → Zurich → Munich → Salzbourg (itinéraire 10 jours)',
    es: 'Ciudades alpinas con tu perro: Ginebra → Zúrich → Múnich → Salzburgo (itinerario 10 días)',
    pt: 'Cidades alpinas com tu cão: Genebra → Zurique → Munique → Salzburgo (itinerario 10 dias)',
    de: 'Alpenstädte mit Ihrem Hund: Genf → Zürich → München → Salzburg (10-Tage-Reiseroute)',
    nl: 'Alpensteden met jouw hond: Genève → Zürich → München → Salzburg (route van 10 dagen)',
  }
  const descriptions: Record<string, string> = {
    en: 'A 10-day Alpine train itinerary with your dog through Switzerland, Germany and Austria. Lake walks, Alpine hikes, dog-friendly hotels, ICE/CFF rules and live Booking.com maps for every stop.',
    fr: "Itinéraire alpin de 10 jours en train avec votre chien à travers la Suisse, l'Allemagne et l'Autriche. Promenades au bord des lacs, randonnées alpines, hôtels acceptant les animaux, règles ICE/CFF et cartes Booking.com en direct.",
    es: 'Itinerario alpino de 10 días en tren con tu perro por Suiza, Alemania y Austria. Paseos junto a lagos, rutas alpinas, hoteles que admiten mascotas, normas ICE/CFF y mapas Booking.com en vivo para cada parada.',
    pt: 'Itinerario alpino de 10 dias de comboio com tu cão por Suiza, Alemania e Austria. Passeios junto a lagos, rutas alpinas, hotéis que admiten animais, normas ICE/CFF e mapas Booking.com en vivo para cada parada.',
    de: 'Eine 10-tägige alpine Zugreise mit Ihrem Hund durch die Schweiz, Deutschland und Österreich. Spaziergänge am See, alpine Wanderungen, hundefreundliche Hotels, ICE-/CFF-Regeln und Live-Karten von Booking.com für jeden Halt.',
    nl: 'Een 10-daagse alpenroute per trein met jouw hond door Zwitserland, Duitsland en Oostenrijk. Wandelingen langs meren, alpenwandelingen, hondvriendelijke hotels, ICE/CFF-regels en live Booking.com-kaarten voor elke stop.',
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
        nl: `${SITE_URL}/nl/guides/${SLUG}`,
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: { title: titles[locale] ?? titles.en, description: descriptions[locale] ?? descriptions.en, type: 'article', publishedTime: '2026-04-27T00:00:00Z', modifiedTime: `${today}T00:00:00Z` },
  }
}

const COPY: Record<string, RouteCopy> = {
  en: {
    hero: { tagline: 'ALPINE ITINERARY · 10 DAYS · WITH YOUR DOG', title: 'An Alpine train trip with your dog: Geneva → Salzburg', subtitle: 'Geneva, Zurich, Munich, Salzburg, four cities at the foot of the Alps, connected by direct trains. Lakeside walks, mountain hikes, pet-welcoming hotels and live Booking.com maps for every stop.' },
    why: { title: 'Why this Alpine route works for dog owners', bullets: [
      'Switzerland, Germany and Austria are the three most dog-tolerant countries in Europe by official measure (DogFriendly.eu 2025 ranking).',
      'Direct CFF/SBB and Deutsche Bahn ICE trains all the way, your dog rides next to you, scenic Alpine views included.',
      'Every stop has world-class urban parks AND direct trains/buses to actual mountain hiking trails (Zugspitze, Säntis, Untersberg).',
      'Cooler summers (typically 22–28 °C), the easiest European route for short-snouted breeds in July–August.',
      'Switzerland is NOT in the EU but pet rules align with EU: pet passport + rabies vaccine accepted at the border. No quarantine.',
    ] },
    stats: { duration: 'Duration', cities: 'Cities', transport: 'Transport', budget: 'Budget', durationVal: '10 days', citiesVal: '4 cities', transportVal: 'Train (CFF / DB ICE / ÖBB Railjet)', budgetVal: '€1,400–€2,800' },
    citiesIntro: { kicker: 'CITY BY CITY', title: 'Your stops, your hotels, your map' },
    cities: {
      geneva: { days: 'Days 1–2', intro: "Start at the south-west tip of Lake Geneva. Switzerland is famously dog-tolerant: trams, buses and trains accept all dogs (small ones free, larger ones half-price), restaurants accept leashed dogs by default, and the Bois de la Bâtie is one of the only year-round off-leash forests in central Geneva. The Quai du Mont-Blanc and the lakeside path have benches every 100 m and water fountains every 500.", highlight: 'Must-do with your dog: a Mont-Salève cable car day trip', highlightDesc: 'Cross into France (no border check for EU pets) and take the Téléphérique du Salève to 1,100 m altitude in 5 minutes. Dogs travel free on a leash. Top has 30 km of marked trails, short loops are easy in 2 hours.' },
      zurich: { days: 'Days 3–4', intro: "Three hours by direct CFF train from Geneva, one of the most beautiful Alpine train rides in Europe. Zurich is dense with green: the Uetliberg (forest hill, 870 m) is reachable in 25 min by S-Bahn, and the lake shore has 4 km of car-free walking. The Old Town's narrow streets and the Bahnhofstrasse (most expensive shopping street in Europe) are dog-tolerant; many luxury boutiques explicitly welcome dogs.", highlight: 'Must-do with your dog: Uetliberg sunrise hike', highlightDesc: 'S10 from Hauptbahnhof to Uetliberg in 25 min (dog ticket CHF 12). The summit observation tower opens at 6 AM. The 5 km descent via Felsenegg gives you the city, the lake and the entire Glarus Alps in one shot.' },
      munich: { days: 'Days 5–7', intro: "Direct Deutsche Bahn EC from Zurich (4h, dog ticket €25). Munich is one of Germany's most dog-friendly cities: the 375-hectare English Garden is bigger than Central Park, dogs ride U-Bahn and S-Bahn for €3 (one-day Hundekarte), beer gardens explicitly welcome dogs (water bowls everywhere), and the Isar river path has 14 km of off-leash trails through the city.", highlight: 'Must-do with your dog: an Isar riverside walk + beer garden lunch', highlightDesc: 'Walk from the city centre south along the Isar to the Hirschau beer garden (4 km, off-leash beyond Wittelsbacher Brücke). The garden has 1,000+ shaded seats under chestnuts; dogs welcome at every table. Order a Brezel for both of you.' },
      salzburg: { days: 'Days 8–10', intro: "Direct ÖBB Railjet from Munich Hauptbahnhof in 1h30 (dog ticket €15). Salzburg is small, walkable, and the gateway to the Salzkammergut lakes (Wolfgangsee, Mondsee, Fuschlsee, all dog-friendly with car-free promenades). The Mönchsberg (542 m, accessible by lift from the old town) has dog-friendly trails. Mozart's birthplace doesn't admit dogs but everywhere else outside does.", highlight: 'Must-do with your dog: a Wolfgangsee day trip', highlightDesc: 'Postbus 150 from Salzburg-Mirabellplatz to St. Gilgen in 50 min (dogs free). The lake has 27 km of pedestrian trails around it, and the Zwölferhorn cable car (dog-friendly) takes you to 1,500 m for the panoramic view.' },
    },
    hotelsLabel: 'Recommended pet-friendly hotels',
    bookLabel: 'Book on Booking.com',
    detailsLabel: 'Details',
    mapLabel: 'Live map, all pet-friendly hotels',
    legsTitle: 'Transport between cities',
    legs: [
      { from: 'Geneva', to: 'Zurich', duration: '~2h45', service: 'CFF/SBB IC (direct, every hour)', petRule: 'Small dogs in carrier free. Larger dogs need a half-price ticket (~CHF 25). No muzzle required if leashed and calm. One of Europe\'s most dog-friendly trains.' },
      { from: 'Zurich', to: 'Munich', duration: '~4h', service: 'Deutsche Bahn EC (direct, 6 daily)', petRule: 'Small dogs in carrier free. Larger dogs need a Hundeticket (~€25, half adult fare). Leash + soft muzzle required for larger dogs.' },
      { from: 'Munich', to: 'Salzburg', duration: '~1h30', service: 'ÖBB Railjet (direct, every 1–2h)', petRule: 'Small dogs in carrier free. Larger dogs at half-price (~€15). Leash + muzzle required. Scenic Bavarian-Austrian countryside.' },
    ],
    practicalTitle: 'Before you go: paperwork, vaccines, vet contacts',
    practicalBullets: [
      'EU pet passport with valid rabies vaccine (21+ days). Switzerland accepts the EU passport (not in EU but in the pet-passport system).',
      'Microchip ISO 11784/11785, mandatory in all four countries.',
      'Switzerland and Austria have a Hundesteuer (dog tax) for residents. Visitors are exempt; some hotels require proof of liability insurance, call ahead if your home insurance is unusual.',
      'Bavaria and Austria have breed lists (Listenhunde): Am. Staff, Pit Bull, Bullterrier, Rottweiler, owners need a permit and dogs must be muzzled in public.',
      'Save 24/7 vets: Geneva (Centre Vétérinaire Rive-Gauche, +41 22 743 33 33), Zurich (Tierspital Zurich, +41 44 635 81 11), Munich (Tierärztliche Klinik Haar, +49 89 460 74 24), Salzburg (Tierklinik Land Salzburg, +43 662 870150).',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Do I need a special permit to enter Switzerland with my dog?', a: 'No, the EU pet passport with valid rabies vaccination is accepted at the Swiss border. No customs paperwork. Dogs must be microchipped and the rabies vaccine must be at least 21 days old.' },
      { q: 'How much does the trip cost?', a: 'Budget €1,400–€2,800. Switzerland is the priciest leg (hotels ~50% more than Germany/Austria). Train fares total ~€350–€550 for 2 adults + 1 dog if booked 4–6 weeks ahead.' },
      { q: 'Can I really take my dog up an Alpine cable car?', a: 'Yes, almost every Alpine cable car in Switzerland, Bavaria and Austria accepts leashed dogs. Some require a muzzle in the cabin. Salève, Uetliberg, Zugspitze, Untersberg, Zwölferhorn, all dog-friendly.' },
      { q: 'When is the best time of year?', a: 'Late May to early October. Summer is the easiest European route for dogs (cooler than south Europe). Winter has its own appeal (snow walks, Christmas markets) but Alpine passes are colder for short-haired breeds.' },
      { q: 'Are beer gardens really dog-friendly in Munich?', a: 'Yes, Bavarian beer-garden tradition explicitly welcomes leashed dogs. The Hofbräukeller, Augustiner-Keller, Hirschau, Chinesischer Turm all have water bowls at the entrance. Some indoor halls don\'t admit dogs; outdoor tables always do.' },
    ],
  },
  fr: {
    hero: { tagline: 'ITINÉRAIRE ALPIN · 10 JOURS · AVEC SON CHIEN', title: 'Un train à travers les Alpes avec son chien : Genève → Salzbourg', subtitle: "Genève, Zurich, Munich, Salzbourg, quatre villes au pied des Alpes, reliées par trains directs. Promenades au bord des lacs, randonnées en montagne, hôtels accueillant les animaux et cartes Booking.com en direct pour chaque étape." },
    why: { title: 'Pourquoi cet itinéraire alpin fonctionne avec un chien', bullets: [
      "Suisse, Allemagne et Autriche sont les trois pays les plus tolérants envers les chiens d'Europe selon les classements officiels (DogFriendly.eu 2025).",
      "Trains CFF/SBB et Deutsche Bahn ICE directs sur tout le parcours, votre chien voyage à côté de vous, vues alpines en bonus.",
      "Chaque étape a des parcs urbains de classe mondiale ET des trains/bus directs vers de vrais sentiers de montagne (Zugspitze, Säntis, Untersberg).",
      "Étés plus frais (typiquement 22–28 °C), le parcours européen le plus simple pour les races à museau court en juillet-août.",
      "La Suisse n'est PAS dans l'UE mais les règles animaux s'alignent : passeport européen + vaccin antirabique acceptés à la frontière. Pas de quarantaine.",
    ] },
    stats: { duration: 'Durée', cities: 'Villes', transport: 'Transport', budget: 'Budget', durationVal: '10 jours', citiesVal: '4 villes', transportVal: 'Train (CFF / DB ICE / ÖBB Railjet)', budgetVal: '1 400 €–2 800 €' },
    citiesIntro: { kicker: 'VILLE PAR VILLE', title: 'Vos étapes, vos hôtels, votre carte' },
    cities: {
      geneva: { days: 'Jours 1–2', intro: "Démarrez à l'extrémité sud-ouest du Lac Léman. La Suisse est célèbre pour sa tolérance canine : trams, bus et trains acceptent tous les chiens (petits gratuits, grands demi-tarif), les restaurants acceptent les chiens en laisse par défaut, et le Bois de la Bâtie est l'une des rares forêts sans laisse toute l'année du centre de Genève. Les quais du Mont-Blanc et le sentier du lac ont des bancs tous les 100 m et des fontaines tous les 500.", highlight: 'Incontournable avec son chien : journée au Mont-Salève en téléphérique', highlightDesc: "Passez en France (pas de contrôle frontière pour animaux UE) et prenez le Téléphérique du Salève jusqu'à 1 100 m d'altitude en 5 minutes. Chiens en laisse gratuits. Le sommet a 30 km de sentiers balisés, boucles courtes faisables en 2 heures." },
      zurich: { days: 'Jours 3–4', intro: "Trois heures de train CFF direct depuis Genève, l'un des plus beaux trajets alpins d'Europe. Zurich est dense en verdure : l'Uetliberg (colline forestière, 870 m) est accessible en 25 min en S-Bahn, et les rives du lac offrent 4 km de promenade sans voitures. Les ruelles de la Vieille Ville et la Bahnhofstrasse (rue commerçante la plus chère d'Europe) tolèrent les chiens ; beaucoup de boutiques de luxe les accueillent explicitement.", highlight: "Incontournable avec son chien : lever de soleil à l'Uetliberg", highlightDesc: "S10 depuis la Hauptbahnhof jusqu'à Uetliberg en 25 min (billet chien 12 CHF). La tour d'observation du sommet ouvre à 6h. Les 5 km de descente via Felsenegg offrent la ville, le lac et toutes les Alpes glaronnaises d'un coup." },
      munich: { days: 'Jours 5–7', intro: "EC Deutsche Bahn direct depuis Zurich (4h, billet chien 25 €). Munich est l'une des grandes villes les plus dog-friendly d'Allemagne : le Jardin Anglais (375 ha) est plus grand que Central Park, les chiens prennent U-Bahn et S-Bahn pour 3 € (Hundekarte journée), les biergartens accueillent explicitement les chiens (gamelles d'eau partout), et le sentier de l'Isar offre 14 km de trails sans laisse à travers la ville.", highlight: "Incontournable avec son chien : promenade le long de l'Isar + déjeuner en biergarten", highlightDesc: "Marchez depuis le centre vers le sud le long de l'Isar jusqu'au biergarten Hirschau (4 km, sans laisse au-delà du Wittelsbacher Brücke). Le jardin compte 1 000+ places ombragées sous les marronniers ; chiens bienvenus à chaque table. Commandez un Brezel pour vous deux." },
      salzburg: { days: 'Jours 8–10', intro: "Railjet ÖBB direct depuis Munich Hauptbahnhof en 1h30 (billet chien 15 €). Salzbourg est petite, marchable et la porte d'entrée du Salzkammergut (Wolfgangsee, Mondsee, Fuschlsee, tous dog-friendly avec promenades sans voitures). Le Mönchsberg (542 m, accessible par ascenseur depuis la vieille ville) a des sentiers dog-friendly. La maison natale de Mozart n'admet pas les chiens mais tout le reste à l'extérieur oui.", highlight: 'Incontournable avec son chien : escapade au Wolfgangsee', highlightDesc: "Postbus 150 de Salzburg-Mirabellplatz à St. Gilgen en 50 min (chiens gratuits). Le lac a 27 km de sentiers piétons, et le téléphérique du Zwölferhorn (dog-friendly) vous emmène à 1 500 m pour la vue panoramique." },
    },
    hotelsLabel: 'Hôtels recommandés acceptant les animaux',
    bookLabel: 'Réserver sur Booking.com',
    detailsLabel: 'Détails',
    mapLabel: 'Carte en direct, tous les hôtels pet-friendly',
    legsTitle: 'Transport entre les villes',
    legs: [
      { from: 'Genève', to: 'Zurich', duration: '~2h45', service: 'CFF/SBB IC (direct, toutes les heures)', petRule: "Petits chiens en cage gratuits. Grands chiens demi-tarif (~25 CHF). Pas de muselière requise si en laisse et calme. L'un des trains les plus dog-friendly d'Europe." },
      { from: 'Zurich', to: 'Munich', duration: '~4h', service: 'Deutsche Bahn EC (direct, 6 par jour)', petRule: 'Petits chiens en cage gratuits. Grands chiens : Hundeticket (~25 €, demi-tarif adulte). Laisse + muselière souple obligatoires.' },
      { from: 'Munich', to: 'Salzbourg', duration: '~1h30', service: 'Railjet ÖBB (direct, toutes les 1-2h)', petRule: 'Petits chiens en cage gratuits. Grands chiens demi-tarif (~15 €). Laisse + muselière obligatoires. Paysages bavaro-autrichiens superbes.' },
    ],
    practicalTitle: 'Avant de partir : paperasse, vaccins, contacts vétérinaires',
    practicalBullets: [
      "Passeport européen avec vaccin antirabique valide (21+ jours). La Suisse accepte le passeport européen (pas dans l'UE mais dans le système de passeport animal).",
      'Puce électronique ISO 11784/11785, obligatoire dans les quatre pays.',
      "Suisse et Autriche ont une Hundesteuer (taxe canine) pour les résidents. Les visiteurs en sont exemptés ; certains hôtels exigent une preuve d'assurance responsabilité, appelez avant si votre assurance domestique est inhabituelle.",
      'Bavière et Autriche ont des listes de races (Listenhunde) : Am. Staff, Pit Bull, Bullterrier, Rottweiler, permis requis et muselière obligatoire en public.',
      "Vétérinaires d'urgence 24h/24 : Genève (Centre Vétérinaire Rive-Gauche, +41 22 743 33 33), Zurich (Tierspital Zurich, +41 44 635 81 11), Munich (Tierärztliche Klinik Haar, +49 89 460 74 24), Salzbourg (Tierklinik Land Salzburg, +43 662 870150).",
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Faut-il un permis spécial pour entrer en Suisse avec mon chien ?', a: 'Non, le passeport européen avec vaccination antirabique valide est accepté à la frontière suisse. Pas de paperasse douanière. Le chien doit être pucé et le vaccin antirabique avoir au moins 21 jours.' },
      { q: 'Combien coûte le voyage ?', a: "Comptez 1 400 à 2 800 €. La Suisse est l'étape la plus chère (hôtels ~50 % plus chers qu'en Allemagne/Autriche). Billets de train ~350-550 € pour 2 adultes + 1 chien si réservés 4-6 semaines à l'avance." },
      { q: 'Puis-je vraiment emmener mon chien en téléphérique ?', a: 'Oui, presque tous les téléphériques alpins en Suisse, Bavière et Autriche acceptent les chiens en laisse. Certains exigent une muselière en cabine. Salève, Uetliberg, Zugspitze, Untersberg, Zwölferhorn, tous dog-friendly.' },
      { q: 'Quelle est la meilleure période ?', a: 'Fin mai à début octobre. L\'été est le parcours européen le plus simple pour les chiens (plus frais que le sud). L\'hiver a son charme (balades neige, marchés de Noël) mais les cols alpins sont rudes pour les chiens à poil court.' },
      { q: 'Les biergartens sont-ils vraiment dog-friendly à Munich ?', a: "Oui, la tradition bavaroise des biergartens accueille explicitement les chiens en laisse. Le Hofbräukeller, l'Augustiner-Keller, le Hirschau, le Chinesischer Turm ont tous des gamelles d'eau à l'entrée. Certaines salles intérieures n'admettent pas les chiens ; les tables extérieures toujours." },
    ],
  },
  es: {
    hero: { tagline: 'ITINERARIO ALPINO · 10 DÍAS · CON TU PERRO', title: 'Un viaje en tren por los Alpes con tu perro: Ginebra → Salzburgo', subtitle: 'Ginebra, Zúrich, Múnich, Salzburgo, cuatro ciudades a los pies de los Alpes, conectadas por trenes directos. Paseos junto a los lagos, rutas de montaña, hoteles que admiten mascotas y mapas Booking.com en vivo para cada parada.' },
    why: { title: 'Por qué este itinerario alpino funciona con perro', bullets: [
      'Suiza, Alemania y Austria son los tres países más tolerantes con perros de Europa según los rankings oficiales (DogFriendly.eu 2025).',
      'Trenes directos CFF/SBB y Deutsche Bahn ICE en todo el recorrido, tu perro viaja a tu lado, vistas alpinas incluidas.',
      'Cada parada tiene parques urbanos de primer nivel Y trenes/buses directos a verdaderas rutas de montaña (Zugspitze, Säntis, Untersberg).',
      'Veranos más frescos (típicamente 22–28 °C), la ruta europea más fácil para razas braquicéfalas en julio-agosto.',
      'Suiza NO está en la UE pero las normas de mascotas se alinean: pasaporte europeo + vacuna antirrábica admitidos en la frontera. Sin cuarentena.',
    ] },
    stats: { duration: 'Duración', cities: 'Ciudades', transport: 'Transporte', budget: 'Presupuesto', durationVal: '10 días', citiesVal: '4 ciudades', transportVal: 'Tren (CFF / DB ICE / ÖBB Railjet)', budgetVal: '1.400 €–2.800 €' },
    citiesIntro: { kicker: 'CIUDAD POR CIUDAD', title: 'Tus paradas, tus hoteles, tu mapa' },
    cities: {
      geneva: { days: 'Días 1–2', intro: 'Empieza en el extremo suroeste del Lago Lemán. Suiza es famosa por su tolerancia canina: tranvías, autobuses y trenes admiten todos los perros (pequeños gratis, grandes a media tarifa), los restaurantes admiten perros con correa por defecto, y el Bois de la Bâtie es uno de los pocos bosques sin correa todo el año del centro de Ginebra. Los muelles del Mont-Blanc y el sendero del lago tienen bancos cada 100 m y fuentes cada 500.', highlight: 'Imprescindible con tu perro: excursión en teleférico al Mont-Salève', highlightDesc: 'Pasa a Francia (sin control fronterizo para mascotas UE) y toma el Téléphérique du Salève hasta 1.100 m de altitud en 5 minutos. Perros con correa gratis. La cima tiene 30 km de senderos balizados, circuitos cortos en 2 horas.' },
      zurich: { days: 'Días 3–4', intro: 'Tres horas en tren CFF directo desde Ginebra, uno de los recorridos alpinos más bonitos de Europa. Zúrich es densa en verde: el Uetliberg (colina boscosa, 870 m) está accesible en 25 min en S-Bahn, y la orilla del lago ofrece 4 km de paseo peatonal. Las callejuelas del casco antiguo y la Bahnhofstrasse (la calle comercial más cara de Europa) toleran perros; muchas boutiques de lujo los reciben explícitamente.', highlight: 'Imprescindible con tu perro: amanecer en el Uetliberg', highlightDesc: 'S10 desde la Hauptbahnhof hasta Uetliberg en 25 min (billete canino 12 CHF). La torre de observación abre a las 6 h. Los 5 km de bajada vía Felsenegg ofrecen la ciudad, el lago y todos los Alpes de Glaris de una vez.' },
      munich: { days: 'Días 5–7', intro: 'EC Deutsche Bahn directo desde Zúrich (4h, billete canino 25 €). Múnich es una de las ciudades más dog-friendly de Alemania: el Jardín Inglés (375 ha) es más grande que Central Park, los perros viajan en U-Bahn y S-Bahn por 3 € (Hundekarte diaria), los biergarten admiten explícitamente perros (boles de agua por todas partes), y el sendero del Isar ofrece 14 km de rutas sin correa por la ciudad.', highlight: 'Imprescindible con tu perro: paseo junto al Isar + comida en biergarten', highlightDesc: 'Camina desde el centro hacia el sur por el Isar hasta el biergarten Hirschau (4 km, sin correa más allá del Wittelsbacher Brücke). El jardín tiene 1.000+ asientos sombreados bajo castaños; perros bienvenidos en cada mesa. Pide un Brezel para los dos.' },
      salzburg: { days: 'Días 8–10', intro: "Railjet ÖBB directo desde Múnich Hauptbahnhof en 1h30 (billete canino 15 €). Salzburgo es pequeña, peatonal y la puerta del Salzkammergut (Wolfgangsee, Mondsee, Fuschlsee, todos dog-friendly con paseos peatonales). El Mönchsberg (542 m, accesible por ascensor desde el casco antiguo) tiene rutas dog-friendly. La casa natal de Mozart no admite perros pero todo lo demás en el exterior sí.", highlight: 'Imprescindible con tu perro: excursión al Wolfgangsee', highlightDesc: 'Postbus 150 desde Salzburg-Mirabellplatz a St. Gilgen en 50 min (perros gratis). El lago tiene 27 km de senderos peatonales, y el teleférico del Zwölferhorn (dog-friendly) te lleva a 1.500 m para la vista panorámica.' },
    },
    hotelsLabel: 'Hoteles recomendados que admiten mascotas',
    bookLabel: 'Reservar en Booking.com',
    detailsLabel: 'Detalles',
    mapLabel: 'Mapa en vivo, todos los hoteles pet-friendly',
    legsTitle: 'Transporte entre ciudades',
    legs: [
      { from: 'Ginebra', to: 'Zúrich', duration: '~2h45', service: 'CFF/SBB IC (directo, cada hora)', petRule: 'Perros pequeños en transportín gratis. Grandes a media tarifa (~25 CHF). No se exige bozal si va con correa y tranquilo. Uno de los trenes más dog-friendly de Europa.' },
      { from: 'Zúrich', to: 'Múnich', duration: '~4h', service: 'Deutsche Bahn EC (directo, 6 al día)', petRule: 'Perros pequeños en transportín gratis. Grandes: Hundeticket (~25 €, media tarifa adulta). Correa + bozal flexible obligatorios.' },
      { from: 'Múnich', to: 'Salzburgo', duration: '~1h30', service: 'Railjet ÖBB (directo, cada 1-2h)', petRule: 'Perros pequeños en transportín gratis. Grandes a media tarifa (~15 €). Correa + bozal obligatorios. Paisajes bávaro-austríacos espectaculares.' },
    ],
    practicalTitle: 'Antes de salir: papeleo, vacunas, contactos veterinarios',
    practicalBullets: [
      'Pasaporte europeo con vacuna antirrábica vigente (21+ días). Suiza acepta el pasaporte europeo (no está en la UE pero sí en el sistema de pasaporte de mascota).',
      'Microchip ISO 11784/11785, obligatorio en los cuatro países.',
      'Suiza y Austria tienen Hundesteuer (impuesto canino) para residentes. Los visitantes están exentos; algunos hoteles exigen prueba de seguro de responsabilidad, llama antes si tu seguro doméstico es inusual.',
      'Baviera y Austria tienen listas de razas (Listenhunde): Am. Staff, Pit Bull, Bullterrier, Rottweiler, se requiere licencia y bozal obligatorio en público.',
      'Veterinarios de urgencias 24/7: Ginebra (Centre Vétérinaire Rive-Gauche, +41 22 743 33 33), Zúrich (Tierspital Zurich, +41 44 635 81 11), Múnich (Tierärztliche Klinik Haar, +49 89 460 74 24), Salzburgo (Tierklinik Land Salzburg, +43 662 870150).',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Necesito un permiso especial para entrar en Suiza con mi perro?', a: 'No, el pasaporte europeo con vacunación antirrábica vigente se acepta en la frontera suiza. Sin papeleo aduanero. El perro debe estar microchipado y la vacuna antirrábica tener al menos 21 días.' },
      { q: '¿Cuánto cuesta el viaje?', a: 'Presupuesta 1.400–2.800 €. Suiza es el tramo más caro (hoteles ~50 % más que Alemania/Austria). Los billetes de tren suman ~350-550 € para 2 adultos + 1 perro si se reservan con 4-6 semanas.' },
      { q: '¿Puedo realmente subir a un teleférico alpino con mi perro?', a: 'Sí, casi todos los teleféricos alpinos en Suiza, Baviera y Austria admiten perros con correa. Algunos exigen bozal en la cabina. Salève, Uetliberg, Zugspitze, Untersberg, Zwölferhorn, todos dog-friendly.' },
      { q: '¿Cuál es la mejor época?', a: 'Finales de mayo a principios de octubre. El verano es la ruta europea más fácil para perros (más fresco que el sur). El invierno tiene su encanto (paseos en nieve, mercados navideños) pero los pasos alpinos son duros para razas de pelo corto.' },
      { q: '¿Son realmente dog-friendly los biergartens en Múnich?', a: 'Sí, la tradición bávara de biergartens admite explícitamente perros con correa. Hofbräukeller, Augustiner-Keller, Hirschau, Chinesischer Turm, todos tienen boles de agua en la entrada. Algunas salas interiores no admiten perros; las mesas exteriores siempre.' },
    ],
  },
  pt: {
    hero: { tagline: 'Itinerário ALPINO · 10 Dias · Com O teu cão', title: 'Um viaje de comboio pelos Alpes com o teu cão: Genebra → Salzburgo', subtitle: 'Genebra, Zurique, Munique, Salzburgo, cuatro cidades aos pies dois Alpes, conectadas por comboios directos. Passeios junto aos lagos, rutas de montanha, hotéis que admitem animais e mapas Booking.com em vivo para cada parada.' },
    why: { title: 'Porquê este itinerário alpino funciona com cão', bullets: [
      'Suiza, Alemania e Austria são os tres países mais tolerantes com cães de Europa segundo os rankings oficiais (DogFriendly.eu 2025).',
      'Comboios directos CFF/SBB e Deutsche Bahn ICE em todo o recorrido, o teu cão viaja a tu lado, vistas alpinas incluidas.',
      'Cada parada tem parques urbanos de primer nivel E comboios/buses directos a verdaderas rutas de montanha (Zugspitze, Säntis, Untersberg).',
      'Veranos mais frescos (típicamente 22–28 °C), a ruta europeia mais fácil para razas braquicéfalas em julho-agosto.',
      'Suiza NO está na UE mas as normas de animais se alinean: passaporte europeu + vacuna antirrábica admitidos na frontera. Sem cuarentena.',
    ] },
    stats: { duration: 'Duración', cities: 'Cidades', transport: 'Transporte', budget: 'Presupuesto', durationVal: '10 dias', citiesVal: '4 cidades', transportVal: 'Comboio (CFF / DB ICE / ÖBB Railjet)', budgetVal: '1.400 €–2.800 €' },
    citiesIntro: { kicker: 'Cidade POR Cidade', title: 'Os teus paradas, os teus hotéis, tu mapa' },
    cities: {
      geneva: { days: 'Dias 1–2', intro: 'Empieza no extremo suroeste do Lago Lemán. Suiza é famosa por o seu tolerância canina: elétricos, autocarros e comboios admitem todos os cães (pequenos grátis, grandes a meio preço), os restaurantes admitem cães com trela por defecto, e o Bois da Bâtie é um dois os poucos florestas sem trela o ano inteiro do centro de Genebra. Os muelles do Mont-Blanc e o trilho do lago têm bancos cada 100 m e fuentes cada 500.', highlight: 'Imprescindible com o teu cão: excursión em teleférico al Mont-Salève', highlightDesc: 'Pasa a Francia (sem control fronterizo para animais UE) e toma o Téléphérique du Salève até 1.100 m de altitud em 1 minutos. Cães com trela grátis. A cima tem 30 km de trilhos balizados, circuitos curtos em 1 horas.' },
      zurich: { days: 'Dias 3–4', intro: 'Tres horas de comboio CFF directo desde Genebra, uno dois recorridos alpinos mais bonitos de Europa. Zurique é densa em verde: o Uetliberg (colina boscosa, 870 m) está acessível em 15 min em S-Bahn, e a margem do lago ofrece 4 km de passeio peatonal. As callejuelas do centro histórico e a Bahnhofstrasse (a rua comercial mais cara de Europa) toleran cães; muitas boutiques de lujo os reciben explícitamente.', highlight: 'Imprescindible com o teu cão: amanecer no Uetliberg', highlightDesc: 'S10 desde a Hauptbahnhof até Uetliberg em 15 min (bilhete canino 12 CHF). A torre de observación abre a as 6 h. Os 5 km de bajada vía Felsenegg ofrecen a cidade, o lago e todos os Alpes de Glaris de uma vez.' },
      munich: { days: 'Dias 5–7', intro: 'EC Deutsche Bahn directo desde Zurique (4h, bilhete canino 25 €). Munique é uma das as cidades mais pet-friendly de Alemania: o Jardim Inglês (375 ha) é mais GRANDE que Central Park, os cães viajan em U-Bahn e S-Bahn por 3 € (Hundekarte diaria), os biergarten admitem explícitamente cães (boles de água por todas partes), e o trilho do Isar ofrece 14 km de rutas sem trela pela cidade.', highlight: 'Imprescindible com o teu cão: passeio junto al Isar + comida em biergarten', highlightDesc: 'Camina desde o centro hacia o sur pelo Isar até o biergarten Hirschau (4 km, sem trela mais allá do Wittelsbacher Brücke). O jardim tem 1.000+ asientos sombreados sob castanhos; cães bem-vindos em cada mesa. Pide um Brezel para os dois.' },
      salzburg: { days: 'Dias 8–10', intro: "Railjet ÖBB directo desde Munique Hauptbahnhof em 1h30 (bilhete canino 15 €). Salzburgo é pequena, peatonal e a puerta do Salzkammergut (Wolfgangsee, Mondsee, Fuschlsee, todos pet-friendly com passeios peatonales). O Mönchsberg (542 m, acessível por ascensor desde o centro histórico) tem rutas pet-friendly. A casa natal de Mozart no admite cães mas todo lo demás no exterior sí.", highlight: 'Imprescindible com o teu cão: excursión al Wolfgangsee', highlightDesc: 'Postbus 150 desde Salzburg-Mirabellplatz a St. Gilgen em 10 min (cães grátis). O lago tem 27 km de trilhos peatonales, e o teleférico do Zwölferhorn (pet-friendly) te leva a 1.500 m para a vista panorámica.' },
    },
    hotelsLabel: 'Hotéis recomendados que admitem animais',
    bookLabel: 'Reservar em Booking.com',
    detailsLabel: 'Detalhes',
    mapLabel: 'Mapa em vivo, todos os hotéis pet-friendly',
    legsTitle: 'Transporte entre cidades',
    legs: [
      { from: 'Genebra', to: 'Zurique', duration: '~2h45', service: 'CFF/SBB IC (directo, cada hora)', petRule: 'Cães pequenos em transportadora grátis. Grandes a meio preço (~25 CHF). No se exige bozal si va com trela e tranquilo. Uno dois comboios mais pet-friendly de Europa.' },
      { from: 'Zurique', to: 'Munique', duration: '~4h', service: 'Deutsche Bahn EC (directo, 6 al dia)', petRule: 'Cães pequenos em transportadora grátis. Grandes: Hundeticket (~25 €, meio preço adulta). Trela + bozal flexible obrigatórios.' },
      { from: 'Munique', to: 'Salzburgo', duration: '~1h30', service: 'Railjet ÖBB (directo, cada 1-2h)', petRule: 'Cães pequenos em transportadora grátis. Grandes a meio preço (~15 €). Trela + bozal obrigatórios. Paisajes bávaro-austríacos espectaculares.' },
    ],
    practicalTitle: 'Antes de salir: burocracia, vacunas, contactos veterinários',
    practicalBullets: [
      'Passaporte europeu com vacuna antirrábica vigente (21+ dias). Suiza aceita o passaporte europeu (no está na UE mas sí no sistema de passaporte de animal).',
      'Microchip ISO 11784/11785, obrigatório nos cuatro países.',
      'Suiza e Austria têm Hundesteuer (impuesto canino) para residentes. Os visitantes estão exentos; algunos hotéis exigen prueba de seguro de responsabilidad, chama antes si tu seguro doméstico é inusual.',
      'Baviera e Austria têm listas de razas (Listenhunde): Am. Staff, Pit Bull, Bullterrier, Rottweiler, se exige licencia e bozal obrigatório em público.',
      'Veterinários de urgências 24/7: Genebra (Centre Vétérinaire Rive-Gauche, +41 22 743 33 33), Zurique (Tierspital Zurich, +41 44 635 81 11), Munique (Tierärztliche Klinik Haar, +49 89 460 74 24), Salzburgo (Tierklinik Land Salzburg, +43 662 870150).',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Necesito um permiso especial para entrar em Suiza com mi cão?', a: 'No, o passaporte europeu com vacinação antirrábica vigente se aceita na frontera suiza. Sem burocracia aduanero. O cão debe estar microchipado e a vacuna antirrábica tener al menos 21 dias.' },
      { q: 'Cuánto custa o viaje?', a: 'Presupuesta 1.400–2.800 €. Suiza é o tramo mais caro (hotéis ~50 % mais que Alemania/Austria). Os bilhetes de comboio suman ~350-550 € para 2 adultos + 1 cão si se reservan com 4-6 semanas.' },
      { q: 'Puedo realmente subir a um teleférico alpino com mi cão?', a: 'Sí, casi todos os teleféricos alpinos em Suiza, Baviera e Austria admitem cães com trela. Algunos exigen bozal na cabina. Salève, Uetliberg, Zugspitze, Untersberg, Zwölferhorn, todos pet-friendly.' },
      { q: 'Qual é a MELHOR época?', a: 'Finais de maio a principios de outubro. O verão é a ruta europeia mais fácil para cães (mais fresco que o sur). O inverno tem o seu encanto (passeios em nieve, mercados navidenhos) mas os pasos alpinos são duros para razas de pelo curto.' },
      { q: 'São realmente pet-friendly os biergartens em Munique?', a: 'Sí, a tradição bávara de biergartens admite explícitamente cães com trela. Hofbräukeller, Augustiner-Keller, Hirschau, Chinesischer Turm, todos têm boles de água na entrada. Algunas salas interiores no admitem cães; as mesas exteriores sempre.' },
    ],
  },
  de: {
    hero: { tagline: 'ALPINE REISEROUTE · 10 TAGE · MIT IHREM HUND', title: 'Eine alpine Zugreise mit Ihrem Hund: Genf → Salzburg', subtitle: 'Genf, Zürich, München und Salzburg, vier Städte am Fuß der Alpen, verbunden durch Direktzüge. Spaziergänge am See, Bergwanderungen, haustierfreundliche Hotels und Live-Karten von Booking.com für jeden Halt.' },
    why: { title: 'Warum diese Alpenroute für Hundebesitzer funktioniert', bullets: [
      'Die Schweiz, Deutschland und Österreich sind laut offizieller Bewertung (DogFriendly.eu 2025) die drei hundefreundlichsten Länder Europas.',
      'Durchgehend mit direkten CFF/SBB- und Deutsche-Bahn-ICE-Zügen, Ihr Hund reist neben Ihnen, malerische Alpenblicke inklusive.',
      'Jeder Halt bietet erstklassige Stadtparks UND direkte Züge/Busse zu echten Bergwanderwegen (Zugspitze, Säntis, Untersberg).',
      'Kühlere Sommer (typischerweise 22-28 °C), die einfachste europäische Route für kurznasige Rassen im Juli und August.',
      'Die Schweiz gehört NICHT zur EU, doch die Tiervorschriften entsprechen den EU-Regeln: Heimtierausweis und Tollwutimpfung werden an der Grenze akzeptiert. Keine Quarantäne.',
    ] },
    stats: { duration: 'Dauer', cities: 'Städte', transport: 'Transport', budget: 'Budget', durationVal: '10 Tage', citiesVal: '4 Städte', transportVal: 'Zug (CFF / DB ICE / ÖBB Railjet)', budgetVal: '1.400 €-2.800 €' },
    citiesIntro: { kicker: 'STADT FÜR STADT', title: 'Ihre Stopps, Ihre Hotels, Ihre Karte' },
    cities: {
      geneva: { days: 'Tag 1-2', intro: 'Starten Sie an der südwestlichen Spitze des Genfersees. Die Schweiz ist für ihre Hundefreundlichkeit bekannt: Trams, Busse und Züge nehmen alle Hunde mit (kleine kostenlos, größere zum halben Preis), Restaurants akzeptieren angeleinte Hunde standardmäßig, und der Bois de la Bâtie ist einer der wenigen ganzjährig leinenfreien Wälder im Zentrum Genfs. Der Quai du Mont-Blanc und der Uferweg haben alle 100 m Bänke und alle 500 m Trinkbrunnen.', highlight: 'Unbedingt mit Ihrem Hund: ein Tagesausflug mit der Mont-Salève-Seilbahn', highlightDesc: 'Überqueren Sie die Grenze nach Frankreich (keine Grenzkontrolle für EU-Haustiere) und fahren Sie mit dem Téléphérique du Salève in 5 Minuten auf 1.100 m Höhe. Hunde reisen angeleint kostenlos. Oben warten 30 km markierte Wege, kurze Rundwege sind in 2 Stunden machbar.' },
      zurich: { days: 'Tag 3-4', intro: 'Drei Stunden mit dem direkten CFF-Zug ab Genf, eine der schönsten alpinen Zugfahrten Europas. Zürich ist dicht begrünt: Der Uetliberg (Waldhügel, 870 m) ist in 25 Minuten mit der S-Bahn erreichbar, und das Seeufer bietet 4 km autofreie Spazierwege. Die engen Gassen der Altstadt und die Bahnhofstrasse (teuerste Einkaufsstraße Europas) sind hundetolerant; viele Luxusboutiquen heißen Hunde ausdrücklich willkommen.', highlight: 'Unbedingt mit Ihrem Hund: Sonnenaufgangswanderung auf dem Uetliberg', highlightDesc: 'S10 vom Hauptbahnhof zum Uetliberg in 25 Minuten (Hundeticket 12 CHF). Der Aussichtsturm auf dem Gipfel öffnet um 6 Uhr. Der 5 km lange Abstieg über die Felsenegg zeigt Ihnen die Stadt, den See und die gesamten Glarner Alpen auf einen Blick.' },
      munich: { days: 'Tag 5-7', intro: 'Direkter Deutsche-Bahn-EC ab Zürich (4 Std., Hundeticket 25 €). München zählt zu den hundefreundlichsten Städten Deutschlands: Der 375 Hektar große Englische Garten ist größer als der Central Park, Hunde fahren für 3 € mit U-Bahn und S-Bahn (Tages-Hundekarte), Biergärten heißen Hunde ausdrücklich willkommen (überall Wassernäpfe), und der Isarweg bietet 14 km leinenfreie Strecken mitten durch die Stadt.', highlight: 'Unbedingt mit Ihrem Hund: ein Spaziergang an der Isar mit Mittagessen im Biergarten', highlightDesc: 'Gehen Sie vom Stadtzentrum aus südlich der Isar entlang zum Biergarten Hirschau (4 km, leinenfrei ab der Wittelsbacherbrücke). Der Garten bietet über 1.000 schattige Plätze unter Kastanien; Hunde sind an jedem Tisch willkommen. Bestellen Sie eine Brezel für sich und Ihren Hund.' },
      salzburg: { days: 'Tag 8-10', intro: 'Direkter ÖBB-Railjet ab München Hauptbahnhof in 1 Std. 30 (Hundeticket 15 €). Salzburg ist klein, gut zu Fuß erkundbar und das Tor zum Salzkammergut (Wolfgangsee, Mondsee, Fuschlsee, alle hundefreundlich mit autofreien Uferpromenaden). Der Mönchsberg (542 m, per Lift von der Altstadt aus erreichbar) hat hundefreundliche Wege. Mozarts Geburtshaus lässt keine Hunde hinein, aber überall sonst im Freien schon.', highlight: 'Unbedingt mit Ihrem Hund: ein Tagesausflug zum Wolfgangsee', highlightDesc: 'Postbus 150 von Salzburg-Mirabellplatz nach St. Gilgen in 50 Minuten (Hunde kostenlos). Der See ist von 27 km Fußwegen umgeben, und die Zwölferhornbahn (hundefreundlich) bringt Sie auf 1.500 m Höhe zum Panoramablick.' },
    },
    hotelsLabel: 'Empfohlene haustierfreundliche Hotels',
    bookLabel: 'Auf Booking.com buchen',
    detailsLabel: 'Details',
    mapLabel: 'Live-Karte, alle haustierfreundlichen Hotels',
    legsTitle: 'Transport zwischen den Städten',
    legs: [
      { from: 'Genf', to: 'Zürich', duration: '~2h45', service: 'CFF/SBB IC (direkt, stündlich)', petRule: 'Kleine Hunde in der Transportbox kostenlos. Größere Hunde benötigen ein Ticket zum halben Preis (~25 CHF). Kein Maulkorb erforderlich, wenn angeleint und ruhig. Einer der hundefreundlichsten Züge Europas.' },
      { from: 'Zürich', to: 'München', duration: '~4h', service: 'Deutsche Bahn EC (direkt, 6x täglich)', petRule: 'Kleine Hunde in der Transportbox kostenlos. Größere Hunde benötigen ein Hundeticket (~25 €, halber Erwachsenenpreis). Leine und weicher Maulkorb für größere Hunde erforderlich.' },
      { from: 'München', to: 'Salzburg', duration: '~1h30', service: 'ÖBB Railjet (direkt, alle 1-2 Std.)', petRule: 'Kleine Hunde in der Transportbox kostenlos. Größere Hunde zum halben Preis (~15 €). Leine und Maulkorb erforderlich. Malerische bayerisch-österreichische Landschaft.' },
    ],
    practicalTitle: 'Vor der Abreise: Papiere, Impfungen, Tierarztkontakte',
    practicalBullets: [
      'EU-Heimtierausweis mit gültiger Tollwutimpfung (mindestens 21 Tage alt). Die Schweiz akzeptiert den EU-Heimtierausweis (nicht in der EU, aber im Heimtierausweissystem).',
      'Mikrochip nach ISO 11784/11785, in allen vier Ländern Pflicht.',
      'Die Schweiz und Österreich erheben eine Hundesteuer für Einwohner. Besucher sind davon befreit; manche Hotels verlangen einen Nachweis der Haftpflichtversicherung, rufen Sie vorab an, falls Ihre Hausratversicherung ungewöhnlich ist.',
      'Bayern und Österreich haben Rasselisten (Listenhunde): Am. Staff, Pit Bull, Bullterrier, Rottweiler, Halter benötigen eine Genehmigung, und die Hunde müssen in der Öffentlichkeit einen Maulkorb tragen.',
      'Notdienst-Tierärzte rund um die Uhr: Genf (Centre Vétérinaire Rive-Gauche, +41 22 743 33 33), Zürich (Tierspital Zürich, +41 44 635 81 11), München (Tierärztliche Klinik Haar, +49 89 460 74 24), Salzburg (Tierklinik Land Salzburg, +43 662 870150).',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Brauche ich eine besondere Genehmigung, um mit meinem Hund in die Schweiz einzureisen?', a: 'Nein, der EU-Heimtierausweis mit gültiger Tollwutimpfung wird an der Schweizer Grenze akzeptiert. Keine Zollpapiere nötig. Der Hund muss gechipt sein, und die Tollwutimpfung muss mindestens 21 Tage zurückliegen.' },
      { q: 'Wie viel kostet die Reise?', a: 'Planen Sie 1.400 bis 2.800 € ein. Die Schweiz ist der teuerste Abschnitt (Hotels rund 50 % teurer als in Deutschland/Österreich). Zugtickets kosten insgesamt rund 350-550 € für 2 Erwachsene plus 1 Hund, wenn 4-6 Wochen im Voraus gebucht wird.' },
      { q: 'Kann ich meinen Hund wirklich mit auf eine Alpenseilbahn nehmen?', a: 'Ja, fast jede Alpenseilbahn in der Schweiz, Bayern und Österreich nimmt angeleinte Hunde mit. Manche verlangen einen Maulkorb in der Kabine. Salève, Uetliberg, Zugspitze, Untersberg, Zwölferhorn, alle hundefreundlich.' },
      { q: 'Wann ist die beste Reisezeit?', a: 'Ende Mai bis Anfang Oktober. Der Sommer ist die einfachste europäische Route für Hunde (kühler als Südeuropa). Der Winter hat seinen eigenen Reiz (Schneespaziergänge, Weihnachtsmärkte), doch die Alpenpässe sind für kurzhaarige Rassen kälter.' },
      { q: 'Sind Biergärten in München wirklich hundefreundlich?', a: 'Ja, die bayerische Biergartentradition heißt angeleinte Hunde ausdrücklich willkommen. Der Hofbräukeller, der Augustiner-Keller, der Hirschau, der Chinesische Turm, alle haben Wassernäpfe am Eingang. Manche Innenräume lassen keine Hunde hinein; die Tische im Freien immer.' },
    ],
  },
  nl: {
    hero: { tagline: 'ALPENROUTE · 10 DAGEN · MET JOUW HOND', title: 'Een treinreis door de Alpen met jouw hond: Genève → Salzburg', subtitle: 'Genève, Zürich, München en Salzburg, vier steden aan de voet van de Alpen, verbonden door directe treinen. Wandelingen langs het meer, bergwandelingen, huisdiervriendelijke hotels en live kaarten van Booking.com voor elke stop.' },
    why: { title: 'Waarom deze alpenroute werkt voor hondenbezitters', bullets: [
      'Zwitserland, Duitsland en Oostenrijk zijn volgens officiële cijfers (DogFriendly.eu 2025) de drie hondvriendelijkste landen van Europa.',
      'Rechtstreeks met CFF/SBB- en Deutsche Bahn ICE-treinen, jouw hond reist naast je, met schitterende alpenuitzichten.',
      'Elke stop biedt eersteklas stadsparken EN directe treinen/bussen naar echte bergwandelpaden (Zugspitze, Säntis, Untersberg).',
      'Koelere zomers (doorgaans 22-28 °C), de makkelijkste Europese route voor kortsnuitige rassen in juli en augustus.',
      'Zwitserland zit NIET in de EU, maar de huisdierregels sluiten aan bij de EU: dierenpaspoort en rabiësvaccinatie worden aan de grens geaccepteerd. Geen quarantaine.',
    ] },
    stats: { duration: 'Duur', cities: 'Steden', transport: 'Vervoer', budget: 'Budget', durationVal: '10 dagen', citiesVal: '4 steden', transportVal: 'Trein (CFF / DB ICE / ÖBB Railjet)', budgetVal: '€1.400-€2.800' },
    citiesIntro: { kicker: 'STAD VOOR STAD', title: 'Jouw stops, jouw hotels, jouw kaart' },
    cities: {
      geneva: { days: 'Dag 1-2', intro: 'Begin aan de zuidwestpunt van het Meer van Genève. Zwitserland staat bekend om zijn hondvriendelijkheid: trams, bussen en treinen laten alle honden toe (kleine gratis, grotere tegen halve prijs), restaurants accepteren aangelijnde honden standaard, en het Bois de la Bâtie is een van de weinige bossen in het centrum van Genève waar honden het hele jaar los mogen lopen. De Quai du Mont-Blanc en het pad langs het meer hebben elke 100 m een bankje en elke 500 m een drinkfontein.', highlight: 'Een must met jouw hond: een dagtrip met de kabelbaan naar de Mont-Salève', highlightDesc: 'Steek de grens over naar Frankrijk (geen grenscontrole voor EU-huisdieren) en neem de Téléphérique du Salève, in 5 minuten naar 1.100 m hoogte. Honden reizen aangelijnd gratis mee. Bovenop liggen 30 km gemarkeerde paden, korte lussen zijn in 2 uur te doen.' },
      zurich: { days: 'Dag 3-4', intro: 'Drie uur met de directe CFF-trein vanuit Genève, een van de mooiste alpentreinritten van Europa. Zürich zit vol groen: de Uetliberg (bosheuvel, 870 m) is in 25 minuten met de S-Bahn te bereiken, en de oever van het meer heeft 4 km autovrije wandelpaden. De smalle straatjes van de oude stad en de Bahnhofstrasse (duurste winkelstraat van Europa) zijn hondvriendelijk; veel luxeboetieks verwelkomen honden uitdrukkelijk.', highlight: 'Een must met jouw hond: zonsopganghike op de Uetliberg', highlightDesc: 'S10 vanaf het Hauptbahnhof naar Uetliberg in 25 minuten (hondenticket 12 CHF). De uitkijktoren op de top opent om 6 uur. De afdaling van 5 km via Felsenegg geeft je in één keer de stad, het meer en de hele Glarner Alpen te zien.' },
      munich: { days: 'Dag 5-7', intro: 'Directe Deutsche Bahn EC vanuit Zürich (4 uur, hondenticket €25). München is een van de hondvriendelijkste steden van Duitsland: de 375 hectare grote Engelse Tuin is groter dan Central Park, honden reizen voor €3 mee met de U-Bahn en S-Bahn (Hundekarte voor één dag), biergartens verwelkomen honden uitdrukkelijk (overal waterbakjes), en het pad langs de Isar biedt 14 km aanlijnvrije route dwars door de stad.', highlight: 'Een must met jouw hond: een wandeling langs de Isar met lunch in een biergarten', highlightDesc: 'Loop vanuit het centrum zuidwaarts langs de Isar naar biergarten Hirschau (4 km, aanlijnvrij voorbij de Wittelsbacherbrücke). De tuin heeft meer dan 1.000 schaduwrijke zitplaatsen onder kastanjebomen; honden zijn welkom aan elke tafel. Bestel een Brezel voor jullie allebei.' },
      salzburg: { days: 'Dag 8-10', intro: 'Directe ÖBB Railjet vanuit München Hauptbahnhof in 1u30 (hondenticket €15). Salzburg is klein, goed te voet te doen en de poort naar het Salzkammergut (Wolfgangsee, Mondsee, Fuschlsee, allemaal hondvriendelijk met autovrije promenades). De Mönchsberg (542 m, met de lift te bereiken vanuit de oude stad) heeft hondvriendelijke paden. Het geboortehuis van Mozart laat geen honden binnen, maar verder overal buiten wel.', highlight: 'Een must met jouw hond: een dagtrip naar de Wolfgangsee', highlightDesc: 'Postbus 150 vanaf Salzburg-Mirabellplatz naar St. Gilgen in 50 minuten (honden gratis mee). Rondom het meer liggen 27 km wandelpaden, en de Zwölferhornbahn (hondvriendelijk) brengt je naar 1.500 m voor het panoramische uitzicht.' },
    },
    hotelsLabel: 'Aanbevolen huisdiervriendelijke hotels',
    bookLabel: 'Boek op Booking.com',
    detailsLabel: 'Details',
    mapLabel: 'Live kaart, alle huisdiervriendelijke hotels',
    legsTitle: 'Vervoer tussen de steden',
    legs: [
      { from: 'Genève', to: 'Zürich', duration: '~2u45', service: 'CFF/SBB IC (direct, elk uur)', petRule: 'Kleine honden in draagtas gratis. Grotere honden hebben een ticket tegen halve prijs nodig (~25 CHF). Geen muilkorf verplicht als de hond aangelijnd en rustig is. Een van de hondvriendelijkste treinen van Europa.' },
      { from: 'Zürich', to: 'München', duration: '~4u', service: 'Deutsche Bahn EC (direct, 6x per dag)', petRule: 'Kleine honden in draagtas gratis. Grotere honden hebben een Hundeticket nodig (~€25, halve volwassenprijs). Lijn en zachte muilkorf verplicht voor grotere honden.' },
      { from: 'München', to: 'Salzburg', duration: '~1u30', service: 'ÖBB Railjet (direct, elke 1-2u)', petRule: 'Kleine honden in draagtas gratis. Grotere honden tegen halve prijs (~€15). Lijn en muilkorf verplicht. Schilderachtig Beiers-Oostenrijks landschap.' },
    ],
    practicalTitle: 'Voor vertrek: papieren, vaccinaties, dierenartscontacten',
    practicalBullets: [
      'EU-dierenpaspoort met geldige rabiësvaccinatie (21+ dagen oud). Zwitserland accepteert het EU-paspoort (geen EU-lid, maar wel binnen het dierenpaspoortsysteem).',
      'Microchip ISO 11784/11785, verplicht in alle vier de landen.',
      'Zwitserland en Oostenrijk heffen een Hundesteuer (hondenbelasting) voor inwoners. Bezoekers zijn vrijgesteld; sommige hotels vragen om bewijs van aansprakelijkheidsverzekering, bel vooraf als jouw eigen verzekering ongebruikelijk is.',
      'Beieren en Oostenrijk hebben rassenlijsten (Listenhunde): Am. Staff, Pitbull, Bullterriër, Rottweiler, eigenaars hebben een vergunning nodig en de hond moet in het openbaar een muilkorf dragen.',
      'Bewaar deze 24/7-dierenartsen: Genève (Centre Vétérinaire Rive-Gauche, +41 22 743 33 33), Zürich (Tierspital Zürich, +41 44 635 81 11), München (Tierärztliche Klinik Haar, +49 89 460 74 24), Salzburg (Tierklinik Land Salzburg, +43 662 870150).',
    ],
    faqTitle: 'Veelgestelde vragen',
    faqs: [
      { q: 'Heb ik een speciale vergunning nodig om met mijn hond Zwitserland binnen te komen?', a: 'Nee, het EU-dierenpaspoort met geldige rabiësvaccinatie wordt geaccepteerd aan de Zwitserse grens. Geen douanepapieren nodig. De hond moet gechipt zijn en de rabiësvaccinatie moet minstens 21 dagen oud zijn.' },
      { q: 'Hoeveel kost de reis?', a: 'Reken op €1.400-€2.800. Zwitserland is het duurste deel (hotels ~50% duurder dan in Duitsland/Oostenrijk). Treinkaartjes kosten samen ~€350-€550 voor 2 volwassenen + 1 hond bij boeking 4-6 weken vooraf.' },
      { q: 'Kan ik mijn hond echt meenemen in een alpenkabelbaan?', a: 'Ja, bijna elke alpenkabelbaan in Zwitserland, Beieren en Oostenrijk accepteert aangelijnde honden. Sommige vereisen een muilkorf in de cabine. Salève, Uetliberg, Zugspitze, Untersberg, Zwölferhorn, allemaal hondvriendelijk.' },
      { q: 'Wat is de beste tijd van het jaar?', a: 'Eind mei tot begin oktober. De zomer is de makkelijkste Europese route voor honden (koeler dan Zuid-Europa). De winter heeft zijn eigen charme (sneeuwwandelingen, kerstmarkten), maar de alpenpassen zijn kouder voor kortharige rassen.' },
      { q: 'Zijn biergartens in München echt hondvriendelijk?', a: 'Ja, de Beierse biergarten-traditie verwelkomt aangelijnde honden uitdrukkelijk. Hofbräukeller, Augustiner-Keller, Hirschau en Chinesischer Turm hebben allemaal waterbakjes bij de ingang. Sommige binnenzalen laten geen honden toe; buitentafels altijd.' },
    ],
  },
}

function buildSticky(locale: string): StickyConfig {
  const address = encodeURIComponent('Geneva Zurich Munich Salzburg')
  const href = `https://www.stay22.com/allez/roam?aid=${STAY22_AID}&campaign=alpes-sticky&address=${address}`
  const labels: Record<string, string> = {
    en: 'Pet-friendly hotels Alpine route',
    fr: `Hôtels pet-friendly route alpine`,
    es: 'Hoteles pet-friendly ruta alpina',
    pt: `Hotéis pet-friendly rota alpina`,
    de: 'Haustierfreundliche Hotels Alpenroute',
    nl: 'Huisdiervriendelijke hotels alpenroute',
  }
  const ctas: Record<string, string> = { en: 'View', fr: 'Voir', es: 'Ver', pt: 'Ver', de: 'Ansehen', nl: 'Bekijk' }
  return { href, label: labels[locale] ?? labels.en, cta: ctas[locale] ?? ctas.en }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  return <CityTripGuide slug={SLUG} routeSlugs={ROUTE_SLUGS} locale={locale} copy={COPY[locale] ?? COPY.en} sticky={buildSticky(locale)} />
}
