import Link from 'next/link'

const ALL_GUIDES = [
  {
    slug: 'where-to-go-uk-school-holidays-2027',
    emoji: '🇬🇧',
    label: { fr: 'Où partir avec son chien selon les vacances scolaires 2027', en: 'Where to go for the 2027 UK school holidays', es: 'Dónde ir según las vacaciones escolares 2027', de: 'Wohin in den Schulferien 2027', nl: 'Waar naartoe tijdens de Britse schoolvakanties 2027', it: 'Dove andare con il tuo cane secondo le vacanze scolastiche 2027' },
    desc:  { fr: 'Chaque vacance et chaque pont, temps de trajet + hôtels par budget', en: 'Every UK holiday, travel times + hotels by budget', es: 'Cada vacación y puente, tiempos de viaje + hoteles por presupuesto', de: 'Jede Ferienzeit, Reisezeiten + Hotels nach Budget', nl: 'Elke vakantie, reistijden + hotels per budget', it: 'Ogni vacanza e ogni ponte, tempi di viaggio + hotel per budget' },
  },
  {
    slug: 'passeport-animal',
    emoji: '📋',
    label: { fr: 'Passeport animal par pays', en: 'Pet passport by country', es: 'Pasaporte de mascota por país', de: 'Tierpass nach Land', nl: 'Dierenpaspoort per land', it: 'Passaporto per animali per paese' },
    desc:  { fr: 'Puce, vaccin rage, règles par pays', en: 'Microchip, rabies vaccine, country rules', es: 'Microchip, vacuna, normas por país', de: 'Mikrochip, Tollwutimpfung, Länderregeln', nl: 'Chip, rabiësvaccinatie, regels per land', it: 'Microchip, vaccino antirabbico, regole per paese' },
  },
  {
    slug: 'train-avec-chien',
    emoji: '🚂',
    label: { fr: 'Voyager en train avec son chien', en: 'Train travel with your dog', es: 'Viajar en tren con tu perro', de: 'Mit Ihrem Hund im Zug reisen', nl: 'Met de trein reizen met je hond', it: 'Viaggiare in treno con il tuo cane' },
    desc:  { fr: 'SNCF, Eurostar, DB, Renfe, Trenitalia…', en: 'SNCF, Eurostar, DB, Renfe, Trenitalia…', es: 'SNCF, Eurostar, DB, Renfe, Trenitalia…', de: 'SNCF, Eurostar, DB, Renfe, Trenitalia…', nl: 'SNCF, Eurostar, DB, Renfe, Trenitalia…', it: 'SNCF, Eurostar, DB, Renfe, Trenitalia…' },
  },
  {
    slug: 'avion-animal',
    emoji: '✈️',
    label: { fr: 'Prendre l\'avion avec son animal', en: 'Flying with your pet', es: 'Volar con tu mascota', de: 'Mit Ihrem Haustier fliegen', nl: 'Vliegen met je huisdier', it: `Volare con il tuo animale` },
    desc:  { fr: 'Cabine vs soute, compagnies, IATA', en: 'Cabin vs hold, airlines, IATA', es: 'Cabina vs bodega, aerolíneas, IATA', de: 'Kabine vs. Frachtraum, Fluggesellschaften, IATA', nl: 'Cabine vs ruim, maatschappijen, IATA', it: 'Cabina vs stiva, compagnie aeree, IATA' },
  },
  {
    slug: 'road-trip-chien',
    emoji: '🚗',
    label: { fr: 'Road trip avec son chien', en: 'Road-tripping with your dog', es: 'Road trip con tu perro', de: 'Roadtrip mit Ihrem Hund', nl: 'Roadtrip met je hond', it: 'Viaggio su strada con il tuo cane' },
    desc:  { fr: 'Lois par pays, Eurotunnel, ferries', en: 'Laws by country, Eurotunnel, ferries', es: 'Leyes por país, Eurotunnel, ferrys', de: 'Gesetze nach Land, Eurotunnel, Fähren', nl: 'Wetgeving per land, Eurotunnel, veerboten', it: 'Leggi per paese, Eurotunnel, traghetti' },
  },
  {
    slug: 'hotel-pet-friendly',
    emoji: '🏨',
    label: { fr: 'Choisir un hôtel pet-friendly', en: 'Choosing a pet-friendly hotel', es: 'Elegir un hotel pet-friendly', de: 'Ein tierfreundliches Hotel auswählen', nl: 'Een diervriendelijk hotel kiezen', it: 'Scegliere un hotel pet-friendly' },
    desc:  { fr: 'Red flags, frais, questions clés', en: 'Red flags, fees, key questions', es: 'Red flags, tarifas, preguntas clave', de: 'Warnsignale, Gebühren, wichtige Fragen', nl: 'Rode vlaggen, kosten, belangrijke vragen', it: `Segnali d'allarme, costi, domande chiave` },
  },
  {
    slug: 'city-trip-chien',
    emoji: '🚂',
    label: { fr: 'City trip en Europe avec son chien', en: 'European city trip with your dog', es: 'City trip por Europa con tu perro', de: 'Städtereise durch Europa mit Ihrem Hund', nl: 'Citytrip door Europa met je hond', it: 'City trip in Europa con il tuo cane' },
    desc:  { fr: 'Paris → Bruxelles → Amsterdam → Berlin (10 j)', en: 'Paris → Brussels → Amsterdam → Berlin (10 days)', es: 'París → Bruselas → Ámsterdam → Berlín (10 días)', de: 'Paris → Brüssel → Amsterdam → Berlin (10 Tage)', nl: 'Parijs → Brussel → Amsterdam → Berlijn (10 dagen)', it: 'Parigi → Bruxelles → Amsterdam → Berlino (10 giorni)' },
  },
  {
    slug: 'cote-mediterraneenne-chien',
    emoji: '🌊',
    label: { fr: 'Côte méditerranéenne avec son chien', en: 'Mediterranean coast with your dog', es: 'Costa mediterránea con tu perro', de: 'Mittelmeerküste mit Ihrem Hund', nl: 'Middellandse Zeekust met je hond', it: 'Costa mediterranea con il tuo cane' },
    desc:  { fr: 'Nice → Gênes → Florence → Rome (10 j)', en: 'Nice → Genoa → Florence → Rome (10 days)', es: 'Niza → Génova → Florencia → Roma (10 días)', de: 'Nizza → Genua → Florenz → Rom (10 Tage)', nl: 'Nice → Genua → Florence → Rome (10 dagen)', it: 'Nizza → Genova → Firenze → Roma (10 giorni)' },
  },
  {
    slug: 'iberique-chien',
    emoji: '🌅',
    label: { fr: 'Péninsule ibérique avec son chien', en: 'Iberian peninsula with your dog', es: 'Península ibérica con tu perro', de: 'Iberische Halbinsel mit Ihrem Hund', nl: 'Iberisch schiereiland met je hond', it: 'Penisola iberica con il tuo cane' },
    desc:  { fr: 'Lisbonne → Porto → Madrid → Barcelone (12 j)', en: 'Lisbon → Porto → Madrid → Barcelona (12 days)', es: 'Lisboa → Oporto → Madrid → Barcelona (12 días)', de: 'Lissabon → Porto → Madrid → Barcelona (12 Tage)', nl: 'Lissabon → Porto → Madrid → Barcelona (12 dagen)', it: 'Lisbona → Porto → Madrid → Barcellona (12 giorni)' },
  },
  {
    slug: 'alpes-chien',
    emoji: '🏔️',
    label: { fr: 'Villes alpines avec son chien', en: 'Alpine cities with your dog', es: 'Ciudades alpinas con tu perro', de: 'Alpenstädte mit Ihrem Hund', nl: 'Alpensteden met je hond', it: 'Città alpine con il tuo cane' },
    desc:  { fr: 'Genève → Zurich → Munich → Salzbourg (10 j)', en: 'Geneva → Zurich → Munich → Salzburg (10 days)', es: 'Ginebra → Zúrich → Múnich → Salzburgo (10 días)', de: 'Genf → Zürich → München → Salzburg (10 Tage)', nl: 'Genève → Zürich → München → Salzburg (10 dagen)', it: 'Ginevra → Zurigo → Monaco → Salisburgo (10 giorni)' },
  },
  {
    slug: 'top-dog-friendly-cities-europe',
    emoji: '🏆',
    label: { fr: 'Top 20 villes dog-friendly d\'Europe', en: 'Top 20 most dog-friendly cities in Europe', es: 'Top 20 ciudades más dog-friendly de Europa', de: 'Top 20 hundefreundlichsten Städte Europas', nl: 'Top 20 meest hondvriendelijke steden van Europa', it: `Top 20 città dog-friendly d'Europa` },
    desc:  { fr: 'Classement 2026 audité sur 5 critères', en: '2026 ranking audited against 5 criteria', es: 'Ranking 2026 auditado por 5 criterios', de: 'Rangliste 2026, geprüft anhand von 5 Kriterien', nl: 'Ranglijst 2026, getoetst aan 5 criteria', it: 'Classifica 2026 verificata su 5 criteri' },
  },
  {
    slug: 'pet-friendly-hotels-europe-guide',
    emoji: '📘',
    label: { fr: 'Hôtels pet-friendly en Europe : guide complet', en: 'Pet-friendly hotels in Europe: complete guide', es: 'Hoteles pet-friendly en Europa: guía completa', de: 'Tierfreundliche Hotels in Europa: der komplette Ratgeber', nl: 'Diervriendelijke hotels in Europa: de complete gids', it: 'Hotel pet-friendly in Europa: guida completa' },
    desc:  { fr: 'Chaînes, règles pays, astuces réservation', en: 'Chains, country rules, booking tips', es: 'Cadenas, normas país, consejos de reserva', de: 'Hotelketten, Länderregeln, Buchungstipps', nl: 'Hotelketens, landenregels, boekingstips', it: 'Catene, regole per paese, consigli per la prenotazione' },
  },
  {
    slug: 'eurostar-with-dog',
    emoji: '🚆',
    label: { fr: 'Puis-je prendre mon chien dans l\'Eurostar ?', en: 'Can I take my dog on the Eurostar?', es: '¿Puedo llevar mi perro en el Eurostar?', de: 'Darf ich meinen Hund im Eurostar mitnehmen?', nl: 'Mag mijn hond mee in de Eurostar?', it: `Posso portare il mio cane sull'Eurostar?` },
    desc:  { fr: 'Réponse + 3 alternatives transmanche', en: 'Answer + 3 cross-Channel alternatives', es: 'Respuesta + 3 alternativas transmancha', de: 'Antwort + 3 Alternativen für die Ärmelkanal-Überquerung', nl: 'Antwoord + 3 alternatieven voor het Kanaal', it: 'Risposta + 3 alternative per attraversare la Manica' },
  },
  {
    slug: 'animal-health-certificate-vs-pet-passport-2026',
    emoji: '🛂',
    label: { fr: 'Passeport européen vs AHC : règles 2026', en: 'EU Pet Passport vs AHC: 2026 rules', es: 'Pasaporte europeo vs AHC: normas 2026', de: 'EU-Heimtierausweis vs. AHC: Regeln 2026', nl: 'Europees dierenpaspoort vs AHC: regels 2026', it: 'Passaporto europeo vs AHC: regole 2026' },
    desc:  { fr: 'L\'erreur à 100 € que font 78 % des voyageurs', en: 'The €100+ mistake 78% of travellers make', es: 'El error de 100 € que comete el 78 %', de: 'Der Fehler über 100 €, den 78 % der Reisenden machen', nl: 'De fout van meer dan 100 € die 78% van de reizigers maakt', it: `L'errore da 100 € che commette il 78% dei viaggiatori` },
  },
  {
    slug: 'pet-travel-cost-index-europe-2026',
    emoji: '📊',
    label: { fr: 'Pet Travel Cost Index Europe 2026', en: 'Pet Travel Cost Index Europe 2026', es: 'Pet Travel Cost Index Europa 2026', de: 'Pet Travel Cost Index Europa 2026', nl: 'Pet Travel Cost Index Europa 2026', it: 'Pet Travel Cost Index Europa 2026' },
    desc:  { fr: '611 hôtels audités · suppléments par pays + ville', en: '611 hotels audited · pet fees by country + city', es: '611 hoteles auditados · tarifas por país + ciudad', de: '611 geprüfte Hotels · Tiergebühren nach Land + Stadt', nl: '611 hotels doorgelicht · toeslagen per land + stad', it: '611 hotel verificati · supplementi per paese + città' },
  },
  {
    slug: 'dog-friendly-europe-by-month/may',
    emoji: '🗓️',
    label: { fr: 'Où voyager avec son chien, mois par mois', en: 'Best dog-friendly cities, month by month', es: 'Mejores ciudades dog-friendly, mes a mes', de: 'Die besten hundefreundlichen Städte, Monat für Monat', nl: 'Waar naartoe met je hond, maand voor maand', it: 'Dove viaggiare con il tuo cane, mese per mese' },
    desc:  { fr: '12 sélections saisonnières basées sur la météo réelle des 100 destinations', en: '12 seasonal picks based on the real weather of all 100 destinations', es: '12 selecciones estacionales basadas en el tiempo real de los 100 destinos', de: '12 saisonale Empfehlungen auf Basis der realen Wetterdaten aller 100 Ziele', nl: '12 seizoensgebonden selecties op basis van de echte weersgegevens van alle 100 bestemmingen', it: '12 selezioni stagionali basate sul meteo reale delle 100 destinazioni' },
  },
  {
    slug: 'best-dog-beaches-europe-2026',
    emoji: '🏖️',
    label: { fr: 'Les 25 meilleures plages dog-friendly d\'Europe 2026', en: 'The 25 Best Dog Beaches in Europe 2026', es: 'Las 25 mejores playas dog-friendly de Europa 2026', de: 'Die 25 besten Hundestrände Europas 2026', nl: 'De 25 beste hondenstranden van Europa 2026', it: `Le 25 migliori spiagge dog-friendly d'Europa 2026` },
    desc:  { fr: 'Sélection vérifiée · accès toute l\'année · Atlantique, Méditerranée, mer du Nord, Baltique, lacs', en: 'Verified picks · year-round access · Atlantic, Mediterranean, North Sea, Baltic, lakes', es: 'Selección verificada · acceso todo el año · Atlántico, Mediterráneo, Mar del Norte, Báltico, lagos', de: 'Geprüfte Auswahl · ganzjährig zugänglich · Atlantik, Mittelmeer, Nordsee, Ostsee, Seen', nl: 'Geverifieerde selectie · het hele jaar toegankelijk · Atlantische Oceaan, Middellandse Zee, Noordzee, Oostzee, meren', it: `Selezione verificata · accesso tutto l'anno · Atlantico, Mediterraneo, Mare del Nord, Baltico, laghi` },
  },
  {
    slug: 'fenced-dog-parks-europe',
    emoji: '🔒',
    label: { fr: 'Parcs canins clôturés en Europe', en: 'Fenced Dog Parks in Europe', es: 'Parques caninos vallados en Europa', de: 'Eingezäunte Hundeparks in Europa', nl: 'Omheinde hondenparken in Europa', it: 'Parchi recintati per cani in Europa' },
    desc:  { fr: 'Inventaire vérifié · 70+ Hundezone / sgambamento / caniparc dans 50+ villes', en: 'Verified inventory · 70+ Hundezone / sgambamento / caniparc across 50+ cities', es: 'Inventario verificado · 70+ Hundezone / sgambamento / caniparc en 50+ ciudades', de: 'Geprüfte Übersicht · 70+ Hundezone / sgambamento / caniparc in 50+ Städten', nl: 'Geverifieerd overzicht · 70+ Hundezone / sgambamento / caniparc in 50+ steden', it: 'Inventario verificato · 70+ Hundezone / sgambamento / caniparc in 50+ città' },
  },
  {
    slug: 'top-dog-friendly-islands-europe',
    emoji: '🏝️',
    label: { fr: `Top 25 îles dog-friendly d'Europe`, en: 'Top 25 dog-friendly islands in Europe', es: 'Top 25 islas dog-friendly de Europa', de: 'Top 25 hundefreundliche Inseln Europas', nl: 'Top 25 hondvriendelijke eilanden van Europa', it: `Top 25 isole dog-friendly d'Europa` },
    desc:  { fr: 'Mallorca, Madère, Crète, Sicile, Skye… 25 îles auditées', en: 'Mallorca, Madeira, Crete, Sicily, Skye… 25 islands audited', es: 'Mallorca, Madeira, Creta, Sicilia, Skye… 25 islas auditadas', de: 'Mallorca, Madeira, Kreta, Sizilien, Skye… 25 geprüfte Inseln', nl: 'Mallorca, Madeira, Kreta, Sicilië, Skye… 25 doorgelichte eilanden', it: 'Mallorca, Madeira, Creta, Sicilia, Skye… 25 isole verificate' },
  },
  {
    slug: 'dog-beaches-france',
    emoji: '🏖️',
    label: { fr: `Meilleures plages pour chien en France : 20 plages vérifiées`, en: 'Best dog-friendly beaches in France: 20 verified spots', es: 'Mejores playas para perros en Francia: 20 playas verificadas', de: 'Beste hundefreundliche Strände in Frankreich: 20 geprüfte Orte', nl: 'Beste hondenstranden in Frankrijk: 20 geverifieerde plekken', it: 'Le migliori spiagge per cani in Francia: 20 spiagge verificate' },
    desc:  { fr: `Côte d'Azur, Languedoc, Aquitaine, Vendée, Bretagne, Normandie, Nord`, en: `Côte d'Azur, Languedoc, Aquitaine, Vendée, Brittany, Normandy, North`, es: `Costa Azul, Languedoc, Aquitania, Vendée, Bretaña, Normandía, Norte`, de: `Côte d'Azur, Languedoc, Aquitanien, Vendée, Bretagne, Normandie, Norden`, nl: `Côte d'Azur, Languedoc, Aquitaine, Vendée, Bretagne, Normandië, Noord-Frankrijk`, it: `Costa Azzurra, Linguadoca, Aquitania, Vandea, Bretagna, Normandia, Nord` },
  },
  {
    slug: 'espagne-fraiche-chien',
    emoji: '🌊',
    label: { fr: 'Espagne fraîche avec son chien', en: 'Cool Spain with your dog', es: 'España fresca con tu perro', de: 'Kühles Spanien mit Ihrem Hund', nl: 'Koel Spanje met je hond', it: 'Spagna fresca con il tuo cane' },
    desc:  { fr: 'Pays basque · Cantabrie · Asturies · Galice · Pyrénées (8 villes)', en: 'Basque Country · Cantabria · Asturias · Galicia · Pyrenees (8 cities)', es: 'País Vasco · Cantabria · Asturias · Galicia · Pirineo (8 ciudades)', de: 'Baskenland · Kantabrien · Asturien · Galicien · Pyrenäen (8 Städte)', nl: 'Baskenland · Cantabrië · Asturië · Galicië · Pyreneeën (8 steden)', it: 'Paesi Baschi · Cantabria · Asturie · Galizia · Pirenei (8 città)' },
  },
  {
    slug: 'italie-fraiche-chien',
    emoji: '🏔️',
    label: { fr: 'Italie fraîche avec son chien', en: 'Cool Italy with your dog', es: 'Italia fresca con tu perro', de: 'Kühles Italien mit Ihrem Hund', nl: 'Koel Italië met je hond', it: 'Italia fresca con il tuo cane' },
    desc:  { fr: 'Haut-Adige · Val d\'Aoste · Trentin · Lacs alpins · Ligurie (7 villes)', en: 'South Tyrol · Aosta Valley · Trentino · Alpine Lakes · Liguria (7 cities)', es: 'Alto Adigio · Valle de Aosta · Trentino · Lagos alpinos · Liguria (7 ciudades)', de: 'Südtirol · Aostatal · Trentino · Alpenseen · Ligurien (7 Städte)', nl: 'Zuid-Tirol · Aostavallei · Trentino · Alpenmeren · Ligurië (7 steden)', it: `Alto Adige · Valle d'Aosta · Trentino · Laghi alpini · Liguria (7 città)` },
  },
  {
    slug: 'france-fraiche-chien',
    emoji: '🌊',
    label: { fr: 'France fraîche avec son chien', en: 'Cool France with your dog', es: 'Francia fresca con tu perro', de: 'Kühles Frankreich mit Ihrem Hund', nl: 'Koel Frankrijk met je hond', it: 'Francia fresca con il tuo cane' },
    desc:  { fr: 'Bretagne · Normandie · Alsace · Alpes · Côte basque (7 villes)', en: 'Brittany · Normandy · Alsace · Alps · Basque coast (7 cities)', es: 'Bretaña · Normandía · Alsacia · Alpes · Costa vasca (7 ciudades)', de: 'Bretagne · Normandie · Elsass · Alpen · Baskische Küste (7 Städte)', nl: 'Bretagne · Normandië · Elzas · Alpen · Baskische kust (7 steden)', it: 'Bretagna · Normandia · Alsazia · Alpi · Costa basca (7 città)' },
  },
  {
    slug: 'portugal-fraiche-chien',
    emoji: '🇵🇹',
    label: { fr: 'Portugal frais avec son chien', en: 'Cool Portugal with your dog', es: 'Portugal fresco con tu perro', de: 'Kühles Portugal mit Ihrem Hund', nl: 'Koel Portugal met je hond', it: 'Portogallo fresco con il tuo cane' },
    desc:  { fr: 'Porto · Viana do Castelo · Guimarães · Braga · Peneda-Gerês · Sagres (6 villes)', en: 'Porto · Viana do Castelo · Guimarães · Braga · Peneda-Gerês · Sagres (6 cities)', es: 'Oporto · Viana do Castelo · Guimarães · Braga · Peneda-Gerês · Sagres (6 ciudades)', de: 'Porto · Viana do Castelo · Guimarães · Braga · Peneda-Gerês · Sagres (6 Städte)', nl: 'Porto · Viana do Castelo · Guimarães · Braga · Peneda-Gerês · Sagres (6 steden)', it: 'Porto · Viana do Castelo · Guimarães · Braga · Peneda-Gerês · Sagres (6 città)' },
  },
  {
    slug: 'allemagne-fraiche-chien',
    emoji: '🇩🇪',
    label: { fr: 'Allemagne fraîche avec son chien', en: 'Cool Germany with your dog', es: 'Alemania fresca con tu perro', de: 'Kühles Deutschland mit Ihrem Hund', nl: 'Koel Duitsland met je hond', it: 'Germania fresca con il tuo cane' },
    desc:  { fr: 'Forêt-Noire · Bavière alpine · Lac de Constance · Baltique (6 villes)', en: 'Black Forest · Bavarian Alps · Lake Constance · Baltic (6 cities)', es: 'Selva Negra · Alpes bávaros · Lago Constanza · Báltico (6 ciudades)', de: 'Schwarzwald · Bayerische Alpen · Bodensee · Ostsee (6 Städte)', nl: 'Zwarte Woud · Beierse Alpen · Bodenmeer · Oostzee (6 steden)', it: 'Foresta Nera · Alpi bavaresi · Lago di Costanza · Baltico (6 città)' },
  },
  {
    slug: 'autriche-fraiche-chien',
    emoji: '🇦🇹',
    label: { fr: 'Autriche fraîche avec son chien', en: 'Cool Austria with your dog', es: 'Austria fresca con tu perro', de: 'Kühles Österreich mit Ihrem Hund', nl: 'Koel Oostenrijk met je hond', it: 'Austria fresca con il tuo cane' },
    desc:  { fr: 'Salzbourg · Salzkammergut · Tyrol · Carinthie · Vorarlberg (6 villes)', en: 'Salzburg · Salzkammergut · Tyrol · Carinthia · Vorarlberg (6 cities)', es: 'Salzburgo · Salzkammergut · Tirol · Carintia · Vorarlberg (6 ciudades)', de: 'Salzburg · Salzkammergut · Tirol · Kärnten · Vorarlberg (6 Städte)', nl: 'Salzburg · Salzkammergut · Tirol · Karinthië · Vorarlberg (6 steden)', it: 'Salisburgo · Salzkammergut · Tirolo · Carinzia · Vorarlberg (6 città)' },
  },
]

const TITLES: Record<string, string> = {
  fr: 'Tous nos guides pratiques',
  en: 'All practical guides',
  es: 'Todas nuestras guías prácticas',
  de: 'Alle Praxis-Ratgeber',
  nl: 'Alle praktische gidsen',
  it: 'Tutte le guide pratiche',
}

interface GuideFooterProps {
  locale: string
  currentSlug: string
}

export function GuideFooter({ locale, currentSlug }: GuideFooterProps) {
  const lang = locale === 'fr' || locale === 'es' || locale === 'de' || locale === 'nl' || locale === 'it' ? (locale as 'fr' | 'es' | 'de' | 'nl' | 'it') : 'en'
  const others = ALL_GUIDES.filter((g) => g.slug !== currentSlug)

  return (
    <section className="mt-12 mb-4 bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 rounded-3xl p-8">
      <h2 className="text-xl font-extrabold text-gray-900 mb-2">{TITLES[lang]}</h2>
      <p className="text-sm text-gray-500 mb-6">
        {lang === 'fr'
          ? 'Voyager sereinement avec votre animal en Europe, guide par guide.'
          : lang === 'es'
          ? 'Viaja tranquilo con tu mascota por Europa, guía a guía.'
          : lang === 'de'
          ? 'Reisen Sie entspannt mit Ihrem Haustier durch Europa, Ratgeber für Ratgeber.'
          : lang === 'nl'
          ? 'Reis met een gerust hart met je huisdier door Europa, gids voor gids.'
          : lang === 'it'
          ? 'Viaggia sereno in Europa con il tuo animale, guida dopo guida.'
          : 'Travel confidently with your pet across Europe, guide by guide.'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {others.map((guide) => (
          <Link
            key={guide.slug}
            href={`/${locale}/guides/${guide.slug}`}
            className="group flex items-start gap-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all p-4"
          >
            <span className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
              {guide.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors leading-tight">
                {guide.label[lang]}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{guide.desc[lang]}</p>
            </div>
            <span className="flex-shrink-0 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all text-lg mt-0.5">→</span>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href={`/${locale}/guides`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          📚 {lang === 'fr' ? 'Voir tous les guides' : lang === 'es' ? 'Ver todas las guías' : lang === 'de' ? 'Alle Ratgeber ansehen' : lang === 'nl' ? 'Alle gidsen bekijken' : lang === 'it' ? 'Vedi tutte le guide' : 'View all guides'} →
        </Link>
      </div>
    </section>
  )
}
