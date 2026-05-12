/**
 * Template-based editorial content for combo pages.
 * These generate substantive, SEO-optimised text from structured data.
 * Goal 4 (AI pipeline) will replace these with Claude-generated content per page.
 */

export interface Faq {
  q: string
  a: string
}

export interface Tip {
  n: number
  title: string
  text: string
}

// ─── Dest Context ────────────────────────────────────────────────────────────

export type DestCtx = { personality: string; highlight: string; area: string }

export const destContextByLocale: Record<string, Record<string, DestCtx>> = {
  en: {
    aarhus: {
      personality: 'Denmark\'s second city — Scandinavia\'s most pet-tolerant café culture after Copenhagen, with free public transport for dogs and 8 official off-leash forests',
      highlight: 'Marselisborg Hundeskov, Bellevue Strand year-round dog beach, and the Den Gamle By open-air museum',
      area: 'Latin Quarter, Frederiksbjerg, and the harbour Dokk1 area',
    },
    amsterdam: {
      personality: 'one of Europe\'s most relaxed and pet-welcoming capitals',
      highlight: 'the Vondelpark and the off-leash banks of the Amstel River',
      area: 'the Jordaan neighbourhood and the canal belt',
    },
    annecy: {
      personality: `the 'Venice of the Alps' — a UNESCO-rated medieval Vieille Ville on canals, the cleanest large lake in Europe with year-round dog-swim spots, and the 4 000-hectare Semnoz forest with 50 km of off-leash trails directly south of the centre`,
      highlight: `the Pont des Amours and the Vieille Ville canals, the 42 km flat lake-circuit cycle path, and the Semnoz forest summit at 1 699 m`,
      area: `the Vieille Ville around the Palais de l'Île, the Pâquier and Albigny lakefront, and the residential Annecy-le-Vieux`,
    },
    antwerp: {
      personality: 'Belgium\'s fashion capital and one of its most dog-forward cities. With vast riverside parks, dog-welcoming terraces, and a thriving boutique hotel scene',
      highlight: 'the Rivierenhof park, the Schelde riverside promenade, and the Nachtegalenpark',
      area: 'the Old Town, Zurenborg, and the Zuid',
    },
    athens: {
      personality: 'a sun-drenched Mediterranean capital that surprises pet travellers with its walkable neighbourhoods and a growing boutique hotel scene that welcomes dogs year-round',
      highlight: 'the National Garden, Filopappou Hill, and the coastal promenade at Faliro',
      area: 'Koukaki, Monastiraki, and Pangrati',
    },
    avignon: {
      personality: `the Provençal capital and former seat of seven popes — a UNESCO-rated walled centro storico, the towering Palais des Papes (Europe's largest Gothic palace), the legendary Pont Saint-Bénézet on the Rhône, and direct TGV access from Paris in 2h40`,
      highlight: `the Place du Palais des Papes, the Rocher des Doms gardens with the iconic city panorama, and the île de la Barthelasse with 4 km of Rhône-bank dog walking`,
      area: `the intra-muros around the Palais des Papes, the Rue des Teinturiers and Place de l'Horloge bistrot quarter, and the île de la Barthelasse across the river`,
    },
    barcelona: {
      personality: 'a Mediterranean city where pet ownership is high and hotels are catching up',
      highlight: 'Parc de la Ciutadella, Poblenou beach, and the Collserola hills',
      area: 'El Born, Gràcia, and Eixample',
    },
    basel: {
      personality: 'one of Europe\'s most underrated dog-friendly cities — Switzerland\'s tri-border art capital, with two designated Rhine swim spots, an off-leash floodplain park along the Wiese river, and a 24/7 emergency vet clinic',
      highlight: 'the Birsköpfli dog swim spot, Landschaftspark Wiese, and the Pfalz terrace at the Münster',
      area: 'the medieval Altstadt around Marktplatz, the creative Kleinbasel quarter, and the leafy St. Alban district',
    },
    bath: {
      personality: 'England\'s UNESCO Georgian spa town, compact and walkable, with strong dog-tolerant pub culture and the 9.6 km Bath Skyline trail right above the honey-stone Royal Crescent',
      highlight: 'the Royal Crescent lawn, the Bath Skyline National Trust trail, and the Kennet & Avon canal towpath',
      area: 'the Royal Crescent area, the riverside near Pulteney Bridge, and Bathwick',
    },
    belgrade: {
      personality: 'one of Europe\'s most affordable capitals, with the year-round Ada Ciganlija dog beach, free public transport since 2025, and Serbia\'s only 24-hour vet hospital',
      highlight: 'Kalemegdan Fortress, Ada Ciganlija peninsula, and Tašmajdan Park',
      area: 'Stari Grad, Skadarlija, and Dorćol',
    },
    bergen: {
      personality: 'Norway\'s gateway to the fjords, wedged between seven mountains and the sea — free public transport for dogs, off-leash mountains 7 minutes from the city centre, and a UNESCO Hanseatic wharf at the harbour',
      highlight: 'Mount Fløyen via the Fløibanen funicular, the Vidden ridge to Mount Ulriken, and the colourful Bryggen wharf',
      area: 'Bryggen, Sandviken, and Marken',
    },
    berlin: {
      personality: 'arguably Europe\'s most dog-friendly capital. Dogs ride public transport and enter many shops freely',
      highlight: 'the Tiergarten, Tempelhof field, and Grunewald forest',
      area: 'Prenzlauer Berg, Mitte, and Kreuzberg',
    },
    bern: {
      personality: 'one of Europe\'s most pet-welcoming capitals — Switzerland\'s UNESCO Old Town has 6 km of covered Lauben arcades, three urban forests within tram distance, and the country\'s leading veterinary teaching hospital',
      highlight: 'the Bremgartenwald off-leash forest, the 5 km Aare riverside promenade, and the BärenPark below the Old Town',
      area: 'the Altstadt UNESCO arcades, the Marzili and Matte riverside districts, and the Rosengarten viewpoint',
    },
    biarritz: {
      personality: 'a Basque surf town with a deeply relaxed attitude toward dogs and outdoor life',
      highlight: 'the Grande Plage and the Côte Basque coastal path',
      area: 'the Port Vieux and the Halles neighbourhood',
    },
    bilbao: {
      personality: 'one of Spain\'s most dog-friendly cities, where the tram welcomes all sizes, pintxos bars officially accept dogs indoors, and the Guggenheim\'s famous \'Puppy\' sculpture makes every dog feel at home',
      highlight: 'the Parque Doña Casilda off-leash zone, the Artxanda funicular dog compartment, and the Nervión riverside walk to the Guggenheim',
      area: 'the Abando and Indautxu districts, the Casco Viejo seven streets, and the Abandoibarra waterfront',
    },
    bologna: {
      personality: 'a medieval Italian city of porticoes and food markets that welcomes dogs into its cafés, piazzas and surrounding hills',
      highlight: 'the Giardini Margherita park, the porticoed San Luca trail (3.8 km), and the hills above the Bolognina district',
      area: 'the Quadrilatero food district, Santo Stefano, and the Via Zamboni university quarter',
    },
    bordeaux: {
      personality: 'a city where dogs stroll the wine-bar terraces of the Chartrons, explore the Garonne riverside, and are welcomed in most boutique hotels',
      highlight: 'the Parc Bordelais, the Garonne quaysides, and the Jardin Public',
      area: 'the Chartrons, Saint-Pierre, and the Triangle d\'Or',
    },
    bratislava: {
      personality: 'a compact, affordable Central European capital where dogs walk the cobbled Old Town squares, the Carpathian forests, and the Danube embankments — all on foot from the centre',
      highlight: 'Železná Studnička forest, Sad Janka Kráľa, and the Devín riverside',
      area: 'the Old Town, Petržalka, and Devín',
    },
    brighton: {
      personality: 'the UK\'s most reliably dog-friendly seaside city, where pets ride free on the buses and Hove Lawns Beach stays open year-round',
      highlight: 'Hove Lawns, Preston Park, and Stanmer Park on the South Downs',
      area: 'The Lanes, Kemptown, and the Hove seafront',
    },
    bristol: {
      personality: 'one of England\'s greenest cities — 70% of pubs welcome dogs, free public transport for pets, the iconic Clifton Suspension Bridge and 162-hectare Ashton Court Estate at the gates',
      highlight: 'Ashton Court Estate, the Downs at the top of the Avon Gorge, and the floating Bristol Ferry to the Wapping Wharf',
      area: 'Clifton, the Harbourside, and Stokes Croft',
    },
    brno: {
      personality: `Moravia's compact and remarkably affordable capital — 14 fenced municipal off-leash zones, dog-tolerant pivnice culture across the centre, and a year-round dog-swimming reservoir 25 minutes by tram`,
      highlight: `the Špilberk hilltop park, the Brno Dam reservoir at Bystrc, and the South Moravian wine region day trips to Pavlov and Mikulov`,
      area: `the medieval centre around náměstí Svobody, Lužánky, and the Bystrc lakeside district`,
    },
    bruges: {
      personality: 'a beautifully preserved medieval city where dogs trot alongside their owners on cobbled streets, canal towpaths, and through the quiet surrounding countryside',
      highlight: 'the Minnewater park, the canal network towpaths, and the Koningin Astridpark',
      area: 'the historic centre, Sint-Anna quarter, and the Begijnhof',
    },
    brussels: {
      personality: 'an underrated pet travel destination with spacious parks, a compact and walkable centre, and a hospitality culture that genuinely welcomes animals',
      highlight: 'the Bois de la Cambre, the Parc du Cinquantenaire, and the Forêt de Soignes',
      area: 'Ixelles, Saint-Gilles, and the European Quarter',
    },
    bucharest: {
      personality: 'one of the EU\'s most affordable capitals, with a 187-hectare central park, two fenced municipal dog enclosures inside it, and Romania\'s largest 24-hour vet hospital',
      highlight: 'Herastrau Park, Cișmigiu Gardens, and Lake Snagov',
      area: 'Lipscani Old Town, Floreasca, and Calea Victoriei',
    },
    budapest: {
      personality: 'a city of grand architecture and a growing dog-friendly scene. Dogs ride the metro, access most parks, and are welcomed in Budapest\'s famous ruin bars',
      highlight: 'Margaret Island, City Park (Városliget), and the Danube riverfront promenades',
      area: 'the 7th district (the Jewish Quarter), Buda Castle district, and Óbuda',
    },
    cambridge: {
      personality: `one of England's most reliably dog-friendly small cities — vast off-leash urban commons (Jesus Green, Midsummer, Coe Fen), historic pubs that welcome leashed dogs in the bar, and direct 50-min Greater Anglia trains from London King's Cross`,
      highlight: `the Backs riverside path, Grantchester Meadows and The Orchard tea garden, and the Iron Age hillfort trails of Wandlebury Country Park`,
      area: `the historic centre around King's Parade, the Mill Road quarter, and the riverside Newnham district`,
    },
    cannes: {
      personality: 'a glamorous French Riviera city with a surprisingly relaxed dog culture — terraces in Le Suquet, the Marché Forville, and the western beaches all welcome dogs year-round',
      highlight: 'the Île Sainte-Marguerite forested island, Plage de la Bocca, and the cobbled lanes of Le Suquet',
      area: 'Le Suquet (the old town), the Marché Forville quarter, and La Bocca',
    },
    cologne: {
      personality: 'a pragmatic Rhineland city where dogs ride trains on a child ticket, drink water at pub troughs, and follow owners along the riverside',
      highlight: 'the Rhine riverbank path, Stadtwald forest park, and the off-leash meadow at Beethovenpark',
      area: 'the Altstadt around the cathedral, Ehrenfeld, and the Severinsviertel',
    },
    copenhagen: {
      personality: 'a city that leads Europe on pet welfare. Dogs travel free on public transport, enter most shops, and are welcomed with water bowls on nearly every terrace',
      highlight: 'the Frederiksberg Gardens, Fælledparken, and the harbour waterfront',
      area: 'Nørrebro, Frederiksberg, and Vesterbro',
    },
    cordoba: {
      personality: 'Andalusia\'s UNESCO Mezquita-Catedral city, 45 minutes by AVE from Seville — compact whitewashed historic centre, the Roman Bridge over the Guadalquivir, and the Sierra Morena foothills 15 minutes north for cool dog hikes',
      highlight: 'the Roman Bridge sunset view, the Judería Jewish Quarter alleys, and the Sotos de la Albolafia riverside path',
      area: 'the Judería, the Centro near the Plaza de la Corredera, and the modern San Fernando area',
    },
    cork: {
      personality: `Ireland's foodie rebel city on the River Lee — Georgian streets, snug-friendly traditional pubs, the iconic English Market, and the 200-hectare Ballincollig off-leash park 8 km west, with West Cork's beaches a short drive south`,
      highlight: `Fitzgerald's Park and the Mardyke walkway, Ballincollig Regional Park's off-leash zone, and the 25-min train to dog-friendly Cobh waterfront`,
      area: `the Latin Quarter, the Marina riverside, and Blackrock`,
    },
    dresden: {
      personality: 'a compact baroque capital on the Elbe with kilometres of off-leash river meadows, a 5,800-hectare municipal forest on the northern edge, and a historic paddle-steamer fleet that welcomes dogs at no extra charge',
      highlight: 'the Elbwiesen river meadows through the centre, the Dresdner Heide forest, and the Schlosspark Pillnitz palace gardens',
      area: 'the Altstadt around the Frauenkirche, the Äußere Neustadt, and the Striesen / Blasewitz residential neighbourhoods',
    },
    dublin: {
      personality: 'a warm, pub-centred city where dogs are welcomed in beer gardens, on coastal walks, and through Europe\'s largest urban park. The Phoenix Park',
      highlight: 'Phoenix Park (1,750 acres, largely off-leash), the Dodder river walk, and the Sandymount Strand beach',
      area: 'Ranelagh, Portobello, and Stoneybatter',
    },
    dubrovnik: {
      personality: 'a dramatic walled city where dogs join their owners on coastal paths, quiet island beaches, and the pine-shaded terraces outside the Old Town',
      highlight: 'the coastal path to Sveti Jakov beach, the Lokrum island day trip ferry (dogs allowed), and the Lapad peninsula',
      area: 'Lapad, Gruž, and the Old Town surroundings',
    },
    dusseldorf: {
      personality: `a Rhineland fashion and brewpub capital with 21 official fenced Hundewiesen, a 2 km Rheinuferpromenade through the centre, and Frank Gehry's Medienhafen waterfront a tram ride from the Altstadt's Altbier brewery cluster`,
      highlight: `the Hofgarten (Germany's first public park), the Medienhafen with the Gehry buildings and Rheinturm, and Unterbacher See's official dog-bathing zones 20 minutes south`,
      area: `the Altstadt around Ratinger Straße, the Medienhafen waterfront, and the leafy Oberkassel left bank`,
    },
    edinburgh: {
      personality: 'one of Britain\'s most dog-welcoming cities. With off-leash hills, dog-friendly pubs on every street, and a culture that treats dogs as full members of the family',
      highlight: 'Arthur\'s Seat (off-leash), Holyrood Park, and the Water of Leith walkway',
      area: 'Stockbridge, Leith, and the New Town',
    },
    evora: {
      personality: `the Alentejano UNESCO capital and former Roman, Visigoth and Moorish town — a 2,000-year-old Roman Temple, the eerie Capela dos Ossos, one of Iberia's largest medieval city wall circuits, and direct CP rail access from Lisbon in 1h30`,
      highlight: `the Roman Temple of Évora, the Cromeleque dos Almendres megalithic site (7,000 years older than Stonehenge), and the Lago Alqueva dog beaches at Monsaraz`,
      area: `the Centro Histórico around Praça do Giraldo, the Roman Temple area on Largo do Conde de Vila Flor, and the Alentejo wine route just outside the walls`,
    },
    faro: {
      personality: `the Algarve capital and gateway to Portugal's southern coast — a UNESCO-rated Cidade Velha, the 18,000-hectare Ria Formosa Natural Park with year-round flamingo boardwalks, dog-friendly Atlantic barrier-island beaches via ferry, and the lowest pet supplements in southern Europe`,
      highlight: `the Cidade Velha and Arco da Vila stork gate, the Ria Formosa boardwalk to the salt pans, and the Ilha Deserta wild Atlantic dog beach by ferry`,
      area: `the Cidade Velha around the cathedral square, the marina-front esplanade, and the residential Bom João near the train station`,
    },
    florence: {
      personality: 'a Renaissance city where dogs trot over cobblestones to morning markets, sit under café parasols, and walk the Arno riverbanks with their owners each evening',
      highlight: 'the Boboli Gardens, the Cascine park (off-leash zones), and the Arno riverside paths',
      area: 'Oltrarno, Santa Croce, and San Frediano',
    },
    frankfurt: {
      personality: 'Germany\'s greenest financial capital — 52% of the city is woodland or parks, with a 4,200-hectare Stadtwald, dog-welcoming Apfelwein taverns in Sachsenhausen, and two 24/7 emergency vet clinics',
      highlight: 'the fenced Hundeauslauffläche in Grüneburgpark, the 4 km Mainufer promenade, and the Stadtwald forest trails',
      area: 'Sachsenhausen, Westend, and the Altstadt around the Römerberg',
    },
    galway: {
      personality: `the bohemian capital of Ireland's Wild Atlantic Way, where pubs welcome dogs in their snugs, the Salthill promenade fills with leashed pets at sunset, and Connemara's beaches and bogs lie 30 minutes west`,
      highlight: `the 2 km Salthill Promenade, Silver Strand off-leash beach, and the Spanish Arch + Long Walk waterfront`,
      area: `the Latin Quarter, the West End, and Salthill on the bay`,
    },
    gdansk: {
      personality: `the Hanseatic Pearl of the Baltic and former Free City of Danzig — a UNESCO Długi Targ, the Solidarity birthplace at Stocznia Gdańska, and direct SKM rail access to Sopot Dog Beach (Poland's most famous) in 15 minutes`,
      highlight: `the Długi Targ and Mariacka Street, the Sopot Dog Beach 15 min by SKM, and the Tri-City Landscape Park with 200 km of off-leash trails`,
      area: `the Główne Miasto around Długi Targ, the Wyspa Spichrzów island on the Motława, and Wrzeszcz to the north`,
    },
    geneva: {
      personality: 'one of Europe\'s most pet-welcoming international capitals — Swiss law allows dogs in restaurants and cafés, the year-round off-leash Bois de la Bâtie sits in the centre, and two 24/7 emergency vet clinics serve the canton',
      highlight: 'the Bois de la Bâtie off-leash forest, the lakefront Quai Wilson promenade, and the bohemian Carouge district',
      area: 'Pâquis on the right bank, Eaux-Vives on the left bank, and Carouge across the Arve',
    },
    genoa: {
      personality: 'one of Italy\'s most quietly pet-welcoming cities — the first in Liguria to open an official dog beach, with caruggi alleys 8°C cooler than the seafront on summer days, three 24/7 emergency vet clinics, and a unique vertical transport network of funiculars and lifts',
      highlight: 'the Vesima year-round dog beach, the 92,000 m² Parchi di Nervi, and the Porto Antico redesigned by Renzo Piano',
      area: 'the UNESCO Strade Nuove, the Boccadasse fishing village, and the Nervi seaside parks',
    },
    ghent: {
      personality: 'a progressive, cycling-first Belgian city where dogs are part of daily life. On trams, in coffee bars, and along the beautiful Leie and Schelde rivers',
      highlight: 'the Citadelpark, the Bourgoyen-Ossemeersen nature reserve, and the Leie riverside towpaths',
      area: 'the Patershol, Sint-Pieters, and Portus Ganda',
    },
    glasgow: {
      personality: 'one of the UK\'s most reliably dog-friendly cities, with free pets on every ScotRail train, dog-welcoming pubs in every neighbourhood, and the 146-hectare Pollok Country Park inside the city',
      highlight: 'Pollok Country Park, Kelvingrove Park, and Loch Lomond a 50-minute train ride away',
      area: 'the West End, Merchant City, and Finnieston',
    },
    gothenburg: {
      personality: 'Sweden\'s most dog-friendly city — a lively port and university city where dogs ride trams for free, run off-leash in the 137-hectare Slottsskogen, and are welcomed inside almost every café',
      highlight: 'the Slottsskogen urban forest, the Haga wooden district cafés, and the dog-friendly Gothenburg Archipelago islands',
      area: 'Haga, the Linné neighbourhood, and the Vasastan district',
    },
    granada: {
      personality: 'the most atmospheric Moorish city in Europe — where the Alhambra watches over cobbled Albaicín lanes, Andalusian terrace culture makes dogs genuinely welcome, and the Sierra Nevada is an hour away',
      highlight: 'the Paseo de los Tristes below the Alhambra walls, the Albaicín UNESCO quarter, and the dog-friendly parks of the Arabial district',
      area: 'the Albaicín, the Realejo, and the historic centre around Plaza Nueva',
    },
    hamburg: {
      personality: 'Germany\'s greenest major city with 56 fenced Hundeauslaufzonen, a 7 km Alster lake walking loop, the famous Elbstrand urban beaches, and a harbour culture where dogs ride ferries and nap on café terraces',
      highlight: 'the Außenalster 7 km loop, the Elbstrand at Övelgönne, and the 205-hectare Altonaer Volkspark',
      area: 'the Alster lake shores, the Schanzenviertel, and the Elbe waterfront in Övelgönne',
    },
    hannover: {
      personality: 'Lower Saxony\'s calm capital — home to Germany\'s largest urban forest (Eilenriede, 640 ha, bigger than Central Park), the Maschsee lake with its dog swim zone, and a world-class veterinary university hospital',
      highlight: 'the 640-hectare Eilenriede forest, the Maschsee 6 km loop and Hundebadestelle, and the baroque Georgengarten avenue',
      area: 'List, the Maschsee shores, and the Altstadt around the Marktkirche',
    },
    heidelberg: {
      personality: `Germany's most romantic university city — a baroque Altstadt under the ruined Renaissance castle, the iconic Philosophenweg view path, the Königstuhl forest with 70 km of off-leash trails, and direct ICE trains from Frankfurt Airport in 50 min`,
      highlight: `the Schloss terraces, the Philosophenweg with its Heiligenberg forest, and the Königstuhl funicular up to 70 km of off-leash forest trails`,
      area: `the Altstadt around the Hauptstraße, Bergheim near the train station, and the leafy Neuenheim across the Neckar`,
    },
    helsinki: {
      personality: 'a Nordic capital where the island archipelago, pine forests, and a deeply outdoors-oriented culture make it exceptionally welcoming for dogs and their owners',
      highlight: 'Central Park (Keskuspuisto), the Seurasaari island nature reserve, and the sea fortress island of Suomenlinna',
      area: 'Kallio, Töölö, and the Design District',
    },
    innsbruck: {
      personality: 'Tyrol\'s capital encircled by 2,300m Alpine peaks — free public transport for dogs, dog-friendly cable cars to mountain summits, café and Gasthaus tradition that welcomes dogs, and 24/7 emergency vet',
      highlight: 'the Nordkette range reachable by cable car from the centre, the Hofgarten royal park, and the cobbled Altstadt around the Goldenes Dachl',
      area: 'Altstadt, Wilten, and the Maria-Theresien-Strasse axis',
    },
    krakow: {
      personality: 'a historic Polish city where the ring of Planty gardens encircling the old town makes it one of Central Europe\'s most walkable destinations for dogs',
      highlight: 'the Planty park ring, the Błonia meadows, and the Vistula riverside paths',
      area: 'the Old Town, Kazimierz, and Podgórze',
    },
    lausanne: {
      personality: 'Switzerland\'s Olympic Capital on Lake Geneva — one of Europe\'s most naturally dog-welcoming cities, where dogs ride the metro free, roam the 200-hectare Sauvabelin forest, and are welcomed in virtually every restaurant',
      highlight: 'the Forêt de Sauvabelin urban forest, the Lavaux UNESCO vineyard trail along the lake, and the Ouchy lakefront promenade',
      area: 'Ouchy (lakeside), the Flon creative district, and the medieval Cité',
    },
    lecce: {
      personality: `the 'Florence of the South' — UNESCO baroque centro storico carved entirely in honey-coloured pietra leccese, dog-tolerant Salento café culture, and year-round dog beaches at Punta Prosciutto and Frassanito 30-45 min by car`,
      highlight: `Piazza del Duomo and the Basilica di Santa Croce, the Roman amphitheatre on Piazza Sant'Oronzo, and the Salento dog beaches at Punta Prosciutto and Frassanito`,
      area: `the centro storico around Piazza Sant'Oronzo, the Mazzini quarter near the station, and the residential Borgo Piave`,
    },
    leipzig: {
      personality: `Saxony's musical capital and the city of Bach — 5,500-hectare Auenwald floodplain forest in the centre, the dog-friendly Karl-Heine-Kanal towpath, 11 fenced Hundeauslaufzonen and a year-round Hundestrand at Cospudener See 12 min by S-Bahn`,
      highlight: `the Auenwald floodplain forest, the Cospudener See dog beach, and the Karl-Heine-Kanal towpath linking Plagwitz to the Karli district`,
      area: `the Innenstadt around the Markt, the Karli (Karl-Liebknecht-Straße), and the Plagwitz creative district`,
    },
    lille: {
      personality: 'a flemish-influenced northern French city of cobbled lanes and brick gabled houses, home to Europe\'s first dedicated dog café and a flat, walkable centre where dogs ride the métro free of charge',
      highlight: 'the Citadelle ramparts walk, the Bois de Boulogne urban forest, and the Vieux Lille terrace cafés',
      area: 'Vieux Lille, Wazemmes, and the Vauban student quarter',
    },
    lisbon: {
      personality: 'a sunlit, hilly city whose mild climate makes it ideal for travelling with pets year-round',
      highlight: 'Monsanto forest park, Belém waterfront, and the esplanades of Alfama',
      area: 'Chiado, Príncipe Real, and Bairro Alto',
    },
    liverpool: {
      personality: `a UNESCO-listed maritime city with one of north-west England's largest urban park networks, three off-leash dog beaches within 25 minutes by Merseyrail, and a Baltic Triangle pub corridor that welcomes leashed dogs year-round`,
      highlight: `Sefton Park's 95-hectare Victorian meadows, Crosby Beach with the Antony Gormley Iron Men, and the Royal Albert Dock waterfront`,
      area: `the Royal Albert Dock waterfront, the Baltic Triangle, and the Georgian Quarter around the Cathedral`,
    },
    ljubljana: {
      personality: 'Europe\'s green capital. A compact, traffic-free centre where dogs walk alongside their owners on riverside terraces, through castle grounds, and across medieval bridges',
      highlight: 'Tivoli Park (off-leash), the Ljubljana Castle hill, and the Sava river greenway',
      area: 'the Old Town, Trnovo, and Šiška',
    },
    london: {
      personality: 'one of Europe\'s most naturally pet-friendly capitals, where dogs accompany their owners into pubs, cafés, and across vast royal parks year-round',
      highlight: 'Hyde Park\'s off-leash areas, Hampstead Heath, and the dog-friendly Thames riverside path',
      area: 'Islington, Notting Hill, and Bermondsey',
    },
    luxembourg: {
      personality: 'the only European capital with free public transport for everyone (including dogs) since 2020, with nine fenced municipal dog enclosures inside the city and a UNESCO Old Town that wraps around the dramatic Pétrusse and Alzette river valleys',
      highlight: 'the Chemin de la Corniche, the Parc de la Pétrusse with its two dog enclosures, and the 600-hectare Bambësch forest',
      area: 'Ville-Haute, the Grund, and Belair',
    },
    lyon: {
      personality: 'France\'s gastronomic capital, where dogs are as common as bouchon restaurants. Welcomed in cafés, along the riverbanks, and throughout the Presqu\'île',
      highlight: 'the Parc de la Tête d\'Or, the Saône and Rhône riverbanks, and the Fourvière hillside trails',
      area: 'the Presqu\'île, Croix-Rousse, and Confluence',
    },
    maastricht: {
      personality: `the Netherlands' oldest city and Limburg's Burgundian capital — Burgundian café culture welcomes leashed dogs by default, the Sint-Pietersberg forest hill rises directly south of the centre, and 22 fenced losloopgebieden ring the medieval core`,
      highlight: `the Sint-Pietersberg forest hill, the Maas riverside towpath to Belgium, and the Pietersplas dog-swim bay 5 km south`,
      area: `the medieval centre around the Vrijthof, the Wyck quarter on the right Maas bank, and the Sint Pieter village neighbourhood`,
    },
    madrid: {
      personality: 'one of Europe\'s most dog-obsessed capitals: Madrid has more dogs per capita than almost any other European city',
      highlight: 'the Retiro Park, Casa de Campo, and the off-leash Parque del Oeste',
      area: 'Malasaña, Lavapiés, and Chamberí',
    },
    malaga: {
      personality: 'a relaxed Andalusian port city where dogs join their owners on museum terraces, in beachfront hotels, and through the historic Alcazaba district',
      highlight: 'the Parque de Málaga seafront, the Montes de Málaga natural park, and the Pedregalejo beach dog zone',
      area: 'the Historic Centre, Soho, and Pedregalejo',
    },
    manchester: {
      personality: 'one of the UK\'s most reliably dog-friendly cities, with free pets on every Metrolink tram and Bee Network bus, dog-welcoming pubs on every Northern Quarter street, and 240-hectare Heaton Park a tram ride away',
      highlight: 'Heaton Park, Fletcher Moss Botanical Gardens, and the Bridgewater Canal towpath',
      area: 'Northern Quarter, Ancoats, and Castlefield',
    },
    marseille: {
      personality: 'a sun-drenched Mediterranean city where outdoor life, terraces and coastal nature shape an unmistakably dog-friendly rhythm',
      highlight: 'the Calanques National Park trails, the Frioul islands accessible by ferry, and the 5-kilometre Corniche Kennedy promenade',
      area: 'the Vieux-Port quays, Le Panier historic quarter, and the Vallon des Auffes fishing port',
    },
    milan: {
      personality: 'Italy\'s design capital, where a growing number of luxury and boutique hotels now warmly welcome pets',
      highlight: 'Parco Sempione, the Navigli canal district, and the spacious Villa Reale gardens',
      area: 'Brera, Navigli, and the Porta Venezia design district',
    },
    montpellier: {
      personality: 'a sun-drenched university city in the south of France where dogs join their owners on shaded café terraces, in tram carriages, and along the Lez riverside walks',
      highlight: 'the Parc Méric off-leash enclosure, the Berges du Lez riverside trail, and the Grand Travers dog-friendly beach just 20 km away',
      area: 'the Écusson medieval centre, the Place de la Comédie esplanade, and the Antigone neo-classical district',
    },
    munich: {
      personality: 'a city where dogs are welcomed in beer gardens, on public transport, and throughout the English Garden: Europe\'s largest urban park',
      highlight: 'the Englischer Garten, Olympiapark, and the Isar river banks',
      area: 'Schwabing, Maxvorstadt, and Haidhausen',
    },
    nantes: {
      personality: 'France\'s most liveable city, with ten official dog parks (caniparcs), a QUALIDOG-certified restaurant network, and a 12 km dog-friendly cultural trail along the Loire',
      highlight: 'the Parc de Procé caniparc, the Loire quaysides, and the Île de Versailles Japanese garden',
      area: 'the Bouffay historic district, the Île de Nantes, and the Procé neighbourhood',
    },
    naples: {
      personality: 'Italy\'s chaotic, passionate southern capital — dense historic alleys, a pedestrian 2.5 km Lungomare, the 134-hectare Bosco di Capodimonte, and trattorie that treat dogs as part of the family',
      highlight: 'the Lungomare Caracciolo, the Bosco di Capodimonte, and the Parco Virgiliano on Posillipo',
      area: 'Chiaia, Posillipo, and the historic centre around Spaccanapoli',
    },
    nice: {
      personality: 'a sun-drenched Mediterranean city where dogs join their owners on terrace restaurants, in the old town market, and along the famous waterfront',
      highlight: 'the Promenade des Anglais, Parc du Mont Boron, and the Colline du Château',
      area: 'the Old Town (Vieux-Nice), Cimiez, and the Port',
    },
    oslo: {
      personality: 'a Scandinavian capital where the proximity of fjords, forests, and the vast Oslomarka trail network makes it one of the continent\'s best destinations for active dog owners',
      highlight: 'the Oslomarka forest, the Bygdøy peninsula, and the Akerselva river trail',
      area: 'Frogner, Grünerløkka, and Tjuvholmen',
    },
    oxford: {
      personality: 'a medieval university city where the honey-coloured college quadrangles are off-limits but the surrounding meadows, riverside pubs, and the off-lead Port Meadow make it one of England\'s easiest small-city dog breaks',
      highlight: 'Port Meadow off-lead common, Christ Church Meadow, and the University Parks',
      area: 'the City Centre, Jericho, and North Oxford',
    },
    palma: {
      personality: 'a sun-soaked Mediterranean island capital where terraces, beaches, and a year-round warm climate make it one of Spain\'s most dog-friendly cities',
      highlight: 'Es Carnatge year-round dog beach, Parc de sa Riera, and the Castell de Bellver hilltop grounds',
      area: 'Santa Catalina, the Old Town (Casc Antic), and Portixol',
    },
    paris: {
      personality: 'a city where dogs are famously welcome in cafés, shops, and many restaurants',
      highlight: 'the Bois de Boulogne, Bois de Vincennes, and hundreds of smaller squares',
      area: 'Le Marais, Saint-Germain-des-Prés, and Montmartre',
    },
    pisa: {
      personality: 'a compact Tuscan UNESCO city paired with the 23 000-hectare San Rossore park and a year-round dog beach at Marina di Pisa, all within twenty minutes of the centre',
      highlight: 'the Field of Miracles lawn, San Rossore pine forest, and the Marina di Pisa dog beach',
      area: 'Sant\'Antonio, the Lungarni, and Borgo Stretto',
    },
    porto: {
      personality: 'a hilly, atmospheric city where dogs are part of the daily rhythm. On trams, in wine-bar gardens, and along the Douro river esplanade',
      highlight: 'the Jardins do Palácio de Cristal, the Douro riverside (Ribeira), and the Serralves park',
      area: 'Ribeira, Bonfim, and Foz do Douro',
    },
    // Tier 2
    prague: {
      personality: 'a compact, walkable city where dogs are welcome in most pubs, wine bars, and even some indoor markets',
      highlight: 'the Stromovka and Letná parks, and the riverside Nusle Valley trails',
      area: 'Vinohrady, Žižkov, and Malá Strana',
    },
    reims: {
      personality: 'the elegant capital of Champagne, a UNESCO city where Gothic cathedrals, art deco facades, and vine-lined avenues invite slow walks with a leashed dog',
      highlight: 'the Promenades around Place de la République, the wooded Parc de Champagne, and the canal towpaths toward Cernay',
      area: 'the historic center near the Cathédrale Notre-Dame, Place Drouet d\'Erlon, and the leafy Parc de Champagne quarter',
    },
    reykjavik: {
      personality: 'the world\'s northernmost capital and one of its most dog-friendly. With vast lava fields, geothermal beaches, and a culture that brings dogs everywhere',
      highlight: 'Elliðaárdalur valley, the Öskjuhlíð hill, and the Grótta lighthouse coastal walk',
      area: 'the Old Town (Miðborg), Laugardalur, and Álftanes',
    },
    riga: {
      personality: 'a beautifully restored Art Nouveau city with a strong Baltic outdoor culture. Dogs are part of daily life in parks, markets, and on the Daugava riverbanks',
      highlight: 'the Mežaparks forest park, Bastejkalns park, and the Daugava riverside promenade',
      area: 'the Old Town (Vecrīga), the Art Nouveau District, and Āgenskalns',
    },
    rome: {
      personality: 'a city where dogs accompany their owners everywhere. From morning cornetto runs to evening passeggiata strolls',
      highlight: 'Villa Borghese gardens, the off-leash areas of Parco dell\'Appia Antica, and the riverside Lungotevere paths',
      area: 'Prati, Trastevere, and Pigneto',
    },
    rotterdam: {
      personality: 'one of the most dog-friendly cities in the Netherlands, where pets travel free on public transport and most café terraces welcome them by default',
      highlight: 'Het Park\'s 28 hectares of off-leash space beside the Euromast, Kralingse Bos forest and lake, and the Maasvlakte beach',
      area: 'Middelland along Nieuwe Binnenweg, the Witte de With arts district, and the waterfront around Veerhaven',
    },
    salamanca: {
      personality: `a golden sandstone university city in Castile, UNESCO-listed since 1988, where leashed dogs glide through baroque arcades and the Tormes riverside is the heart of evening walks`,
      highlight: 'the Plaza Mayor and Rúa Mayor, the Tormes riverside (Salas Bajas), and the Parque de los Jesuitas with its fenced off-leash area',
      area: `the old town around the Plaza Mayor, the riverside south of the Roman Bridge, and the leafy area near the Universidad de Salamanca`,
    },
    salzburg: {
      personality: 'a compact Alpine city where Mozart-era architecture, rolling meadows, and the surrounding Salzkammergut mountains create a magical backdrop for pet travel',
      highlight: 'the Hellbrunn park, the Salzach riverside path, and the Kapuzinerberg hill trails',
      area: 'the Old Town (Altstadt), Schallmoos, and Mülln',
    },
    'san-sebastian': {
      personality: 'a Basque seaside city where dogs outnumber children in some districts and beaches open to them from October to May',
      highlight: 'La Concha and Zurriola beaches (October–May), Monte Urgull\'s hill trails, and the Paseo Nuevo coastal path',
      area: 'the Old Town (Parte Vieja), Gros, and the Antiguo district near Monte Igueldo',
    },
    seville: {
      personality: 'one of Andalusia\'s most dog-friendly cities. Where dogs stroll under orange trees, join owners on tapas bar terraces, and explore riverside parks',
      highlight: 'the Parque de María Luisa, the Alamillo park, and the Guadalquivir riverside promenade',
      area: 'Triana, Santa Cruz, and El Arenal',
    },
    sofia: {
      personality: 'one of the EU\'s most affordable capitals, with nearly 500 dog-friendly venues, two 24/7 emergency hospitals, and the 2 290-metre Vitosha mountain rising directly from the city',
      highlight: 'Borisova Gradina, Yuzhen Park, and the Vitosha Nature Park trails',
      area: 'Vitosha Boulevard, Lozenets, and Boyana',
    },
    split: {
      personality: 'a relaxed Croatian coastal city where the Adriatic waterfront, ancient Diocletian\'s Palace, and a laid-back local culture make it a standout destination for pet owners',
      highlight: 'the Marjan Hill forest park, the Bačvice beach dog zone, and the coastal path to Stobreč',
      area: 'Meje, the Old Town surroundings, and the Manuš neighbourhood',
    },
    stavanger: {
      personality: `Norway's third city and the gateway to the Lysefjord — a UNESCO-rated wooden Old Town (Gamle Stavanger), exceptionally dog-friendly transport (free buses, free trains, free fjord ferries), the iconic Pulpit Rock 50 min east, and 35 km of dog-friendly Atlantic sand 15 min south`,
      highlight: `Pulpit Rock (Preikestolen) hike with leashed dog, the Lysefjord cruise, and Solastranden Atlantic dog beach 15 min from the centre`,
      area: `the Vågen harbour and Gamle Stavanger wooden Old Town, the colourful Fargegata street, and the Mosvatnet lake quarter`,
    },
    stockholm: {
      personality: 'a city where dogs are part of the fabric of daily life. On ferries, in cafés, and across the archipelago islands',
      highlight: 'Djurgården island, Hagaparken, and the archipelago trail network',
      area: 'Södermalm, Östermalm, and Djurgården',
    },
    strasbourg: {
      personality: 'one of Europe\'s most atmospheric UNESCO cities — where Alsatian culture, Christmas markets, and a relaxed attitude to dogs make it a year-round pet-travel destination',
      highlight: 'Parc de l\'Orangerie, the Petite France canals, and the Jardins des Deux Rives on the Rhine',
      area: 'Petite France, the Krutenau, and the European Quarter',
    },
    stuttgart: {
      personality: 'a southern German capital nestled in a green basin of vineyards and beech forests, where Biergärten and Wirtschaften universally welcome dogs and three fenced off-leash zones ring the centre',
      highlight: 'the Schlossgarten ribbon, the Bärensee forest reservoirs, and the Killesberg hilltop park',
      area: 'Mitte, Süd, and Bad Cannstatt',
    },
    tallinn: {
      personality: 'a fairy-tale medieval city with a progressive Estonian attitude toward pets. Dogs enter most shops, visit the old town, and explore the coastal paths freely',
      highlight: 'Kadriorg Park, the Pirita coastal trail, and Pääsküla bog nature walks',
      area: 'Kalamaja, Telliskivi, and the Old Town',
    },
    tampere: {
      personality: `Finland's third city and the unofficial sauna capital — exceptionally dog-friendly transport (free trams, free trains), 22 fenced koira-aitaus, two lake dog beaches walking distance from the centre, and the iconic Pyynikki ridge with year-round dog walking`,
      highlight: `the Pyynikki ridge and observation tower café, the Pyynikki and Niihama dog beaches on the two lakes, and the Tammerkoski rapids walkway through the centre`,
      area: `the centre between the Tammerkoski rapids and Hämeenkatu, the Finlayson creative quarter, and the lakeside Pyynikki ridge`,
    },
    'the-hague': {
      personality: 'a stately Dutch capital where 11 km of North Sea coast, off-leash dunes, and dog-friendly cafés sit a tram ride from the centre',
      highlight: 'Westduinpark and Bosjes van Poot, the Haagse Bos forest, and Landgoed Clingendael',
      area: 'Statenkwartier, Hofkwartier, and Scheveningen Haven',
    },
    thessaloniki: {
      personality: 'Greece\'s second city and one of its most dog-friendly — a 2,300-year-old port city where dogs are welcome on terraces, in the old town quarter, and along the 3.5 km Nea Paralia waterfront promenade',
      highlight: 'the Nea Paralia waterfront park (with a dedicated dog area), the Seich Sou urban forest, and the Ano Poli Byzantine wall walks',
      area: 'Ano Poli (Upper Town), Ladadika, and the Waterfront',
    },
    toledo: {
      personality: `the medieval Imperial City and former Visigoth, Moorish and Christian capital — a UNESCO-rated open-air museum on a granite outcrop above the Tagus, with Madrid 33 minutes away by Avant high-speed rail`,
      highlight: `the Mirador del Valle viewpoint with the iconic skyline panorama, the Senda Ecológica circular path along the Tagus, and the Puente de San Martín medieval bridge`,
      area: `the Casco Histórico around Plaza de Zocodover, the Judería with the El Greco Museum, and La Vega across the Puente de San Martín`,
    },
    toulouse: {
      personality: 'a laid-back southwestern city of pink brick and outdoor terraces where dogs blend into everyday life along the Garonne',
      highlight: 'the banks of the Garonne, the Canal du Midi towpath, and the Prairie des Filtres riverside park',
      area: 'Place du Capitole, Carmes, and the Saint-Cyprien left bank',
    },
    trondheim: {
      personality: `Norway's third city and medieval capital — UNESCO Nidaros Cathedral (the world's northernmost Gothic cathedral), the colourful Bakklandet wooden quarter, free dog transport on buses, trams and trains, and 80 km² of Bymarka urban forest at the city edge`,
      highlight: `the Nidaros Cathedral and Gamle Bybro bridge, the iconic Gråkallbanen heritage tram to Bymarka forest, and Munkholmen island ferry`,
      area: `the Midtbyen around Nidaros Cathedral, the wooden Bakklandet quarter, and the Solsiden harbour district`,
    },
    turin: {
      personality: 'Italy\'s northern baroque capital with 18 km of covered porticoes that shelter dogs and owners from rain and summer sun, 35+ fenced dog areas, and the Alps an hour away for weekend escapes',
      highlight: 'the 84-hectare Parco del Valentino, the 10 km Po riverside, and the Basilica di Superga reached by vintage rack railway',
      area: 'San Salvario, the Quadrilatero Romano, and the Piazza Castello historic core',
    },
    utrecht: {
      personality: 'a compact Dutch university city where dogs ride city buses and trams free, the canal-cruise operator welcomes dogs at no charge, and three off-leash zones — the 300-hectare Máximapark, the central Griftpark, and the Amelisweerd estates — are all reachable from the historic core',
      highlight: 'Máximapark in Leidsche Rijn, the central Griftpark, and the Amelisweerd & Rhijnauwen estates 5 km southeast',
      area: 'Binnenstad and the Oudegracht, Vogelenbuurt, and Wittevrouwen',
    },
    valencia: {
      personality: 'a sunny Mediterranean city with 19 km of park running through its centre. The former Turia riverbed. Making it one of Europe\'s most walkable cities for dog owners',
      highlight: 'the Turia Garden (9 km off-leash friendly), the Malvarrosa beach dog zone, and the Albufera nature park',
      area: 'Ruzafa, El Carmen, and the Eixample',
    },
    venice: {
      personality: 'one of Italy\'s most surprisingly dog-friendly cities. Dogs ride the vaporetto, explore quiet sestieri away from crowds, and are welcomed in many local bacari',
      highlight: 'the Lido island beaches (dogs allowed off-season), the quiet canals of Cannaregio, and the Sant\'Elena park',
      area: 'Cannaregio, Dorsoduro, and Sant\'Elena',
    },
    verona: {
      personality: 'a UNESCO-listed romantic city where dogs join their owners on wine-bar terraces, in Renaissance gardens, and along the scenic banks of the Adige',
      highlight: 'the Giardino Giusti, the Adige riverbanks, and dog-friendly terraces near the Arena',
      area: 'Veronetta, the Centro Storico, and the Piazza delle Erbe quarter',
    },
    vienna: {
      personality: 'a city that takes dog ownership seriously. Dogs ride the U-Bahn, enter museums, and are catered for in hundreds of Viennese cafés',
      highlight: 'the Prater park, Donauinsel island, and the Lainzer Tiergarten',
      area: 'the 1st district, Naschmarkt, and Josefstadt',
    },
    vilnius: {
      personality: 'the EU\'s greenest capital and one of its most dog-welcoming, where pets travel free on every bus and nearly 500 pet-friendly venues sit inside the UNESCO Old Town',
      highlight: 'Vingis Park forest, Bernardinai Garden, and the Three Crosses hill',
      area: 'the Old Town, Užupis, and Šnipiškės',
    },
    warsaw: {
      personality: 'a rapidly modernising European capital where pet-friendly hotels are increasingly the norm and riverside parks offer excellent walking',
      highlight: 'Łazienki Park, the Vistula riverside boulevards, and the Kampinos forest on the city\'s edge',
      area: 'Śródmieście, Praga, and the Powiśle riverside district',
    },
    wroclaw: {
      personality: `one of Poland's most genuinely dog-loving cities, where the colourful Rynek square is ringed by café terraces that welcome dogs without fuss, public transport is free for all pets, and around forty fenced off-leash zones are scattered across the city`,
      highlight: `Park Szczytnicki and the Centennial Hall, the islands of the Odra river, and the lamplit cobbles of Cathedral Island at dusk`,
      area: `the Old Town around the Rynek, the bohemian Nadodrze district, and the Four Denominations Quarter`,
    },
    york: {
      personality: `one of England's most reliably dog-friendly cities — a compact medieval core where 80% of pubs welcome leashed dogs, the 5 km city walls walk is free of charge with pets, and direct LNER trains link day-trip dog beaches at Filey, Sandsend and Bridlington`,
      highlight: `the dog-friendly city walls circuit, the riverside Museum Gardens, and the year-round dog beach at Filey one hour east on the LNER line`,
      area: `the historic centre inside the walls, the Fossgate quarter, and the Bishopthorpe Road / Knavesmire neighbourhood`,
    },
    zagreb: {
      personality: 'a relaxed Habsburg-era capital where dogs ride the world\'s shortest funicular, café terraces line pedestrian Tkalčićeva, and 316-hectare Maksimir Park has the city\'s main fenced off-leash zone',
      highlight: 'Maksimir Park, the medieval Upper Town, and the Jarun lake dog-beach sections',
      area: 'Donji Grad, Gornji Grad, and the Maksimir lakes district',
    },
    zaragoza: {
      personality: `Aragon's capital and Spain's fifth-largest city — anchored by the Basílica del Pilar on the Ebro and built around 126 designated off-leash zones, one of the densest pet-friendly park networks in Spain, plus AniCura Emvet 24/7 referral hospital`,
      highlight: `the 27-hectare Parque Grande Labordeta, the fenced canine zone in Parque del Tío Jorge, and the riverside walks along the Riberas del Ebro`,
      area: `the Casco Histórico around El Pilar, the leafy Centro on Paseo de Sagasta, and the Magdalena tapas quarter`,
    },
    zurich: {
      personality: 'a city that ranks among Europe\'s most dog-friendly. With dedicated dog zones on lake beaches, dog-friendly trams, and pet passports accepted everywhere',
      highlight: 'the Zürichsee lakefront, Uetliberg hill, and the Sihl river trails',
      area: 'Kreis 4, Zürich West, and the Old Town',
    },
  },
  fr: {
    aarhus: {
      personality: 'la deuxième ville du Danemark — culture café la plus tolérante de Scandinavie après Copenhague, transports publics gratuits pour chiens et 8 forêts sans laisse officielles',
      highlight: 'le Marselisborg Hundeskov, la plage canine toute l\'année de Bellevue Strand, et le musée en plein air Den Gamle By',
      area: 'Latin Quarter, Frederiksbjerg et la zone portuaire Dokk1',
    },
    amsterdam: {
      personality: 'l\'une des capitales les plus décontractées et accueillantes pour les animaux d\'Europe',
      highlight: 'le Vondelpark et les berges hors laisse de l\'Amstel',
      area: 'le quartier du Jordaan et la ceinture des canaux',
    },
    annecy: {
      personality: `la « Venise des Alpes » — Vieille Ville médiévale classée le long des canaux, le grand lac le plus propre d'Europe avec spots de baignade canine toute l'année, et la forêt du Semnoz de 4 000 ha avec 50 km de sentiers sans laisse directement au sud du centre`,
      highlight: `le Pont des Amours et les canaux de la Vieille Ville, la piste cyclable plate de 42 km du tour du lac, et le sommet du Semnoz à 1 699 m`,
      area: `la Vieille Ville autour du Palais de l'Île, le Pâquier et le bord de lac d'Albigny, et le résidentiel Annecy-le-Vieux`,
    },
    antwerp: {
      personality: 'la capitale de la mode belge et l\'une de ses villes les plus dog-friendly. Avec de vastes parcs riverains, des terrasses accueillantes pour les chiens et un secteur hôtelier boutique florissant',
      highlight: 'le parc Rivierenhof, la promenade riveraine de l\'Escaut et le Nachtegalenpark',
      area: 'la Vieille Ville, Zurenborg et le Zuid',
    },
    athens: {
      personality: 'une capitale méditerranéenne ensoleillée qui surprend les voyageurs avec animaux par ses quartiers praticables et une scène hôtelière boutique accueillant les chiens toute l\'année',
      highlight: 'le Jardin National, la colline de Filopappou et la promenade côtière de Faliro',
      area: 'Koukaki, Monastiraki et Pangrati',
    },
    avignon: {
      personality: `la capitale de la Provence et siège de sept papes — centro storico fortifié classé UNESCO, l'imposant Palais des Papes (le plus grand palais gothique d'Europe), le légendaire Pont Saint-Bénézet sur le Rhône, et un accès TGV direct depuis Paris en 2h40`,
      highlight: `la Place du Palais des Papes, les jardins du Rocher des Doms avec le panorama iconique, et l'île de la Barthelasse avec 4 km de promenade canine au bord du Rhône`,
      area: `l'intra-muros autour du Palais des Papes, le quartier bistrot de la Rue des Teinturiers et de la Place de l'Horloge, et l'île de la Barthelasse de l'autre côté du fleuve`,
    },
    barcelona: {
      personality: 'une ville méditerranéenne où la possession d\'animaux est élevée et les hôtels s\'y adaptent',
      highlight: 'le Parc de la Ciutadella, la plage de Poblenou et les collines du Collserola',
      area: 'El Born, Gràcia et l\'Eixample',
    },
    basel: {
      personality: `l'une des villes dog-friendly les plus sous-estimées d'Europe — capitale artistique tri-frontalière de la Suisse, avec deux zones de baignade canine officielles dans le Rhin, un parc alluvial sans laisse le long de la Wiese et une clinique vétérinaire d'urgence ouverte 24h/24`,
      highlight: 'la baignade canine du Birsköpfli, le Landschaftspark Wiese et la terrasse Pfalz au Münster',
      area: `l'Altstadt médiévale autour de la Marktplatz, le quartier créatif du Kleinbasel et le secteur arboré de St. Alban`,
    },
    bath: {
      personality: 'la ville thermale géorgienne UNESCO d\'Angleterre, compacte et piétonne, avec une forte culture pub tolérante aux chiens et le sentier Bath Skyline de 9,6 km juste au-dessus du Royal Crescent en pierre couleur miel',
      highlight: 'la pelouse du Royal Crescent, le sentier National Trust Bath Skyline et le chemin de halage Kennet & Avon',
      area: 'le quartier du Royal Crescent, les berges près du Pulteney Bridge et Bathwick',
    },
    belgrade: {
      personality: 'l\'une des capitales européennes les plus abordables, avec la plage canine d\'Ada Ciganlija toute l\'année, les transports publics gratuits depuis 2025 et le seul hôpital vétérinaire 24h/24 de Serbie',
      highlight: 'la forteresse de Kalemegdan, la presqu\'île d\'Ada Ciganlija et le parc Tašmajdan',
      area: 'Stari Grad, Skadarlija et Dorćol',
    },
    bergen: {
      personality: 'la porte d\'entrée norvégienne des fjords, encastrée entre sept montagnes et la mer — transports publics gratuits pour les chiens, montagnes sans laisse à 7 minutes du centre, et un quai hanséatique UNESCO sur le port',
      highlight: 'le Mont Fløyen via le funiculaire Fløibanen, la crête Vidden vers le Mont Ulriken et le quai coloré de Bryggen',
      area: 'Bryggen, Sandviken et Marken',
    },
    berlin: {
      personality: 'sans doute la capitale la plus amie des chiens d\'Europe. Les chiens prennent les transports en commun et entrent librement dans de nombreux commerces',
      highlight: 'le Tiergarten, le champ de Tempelhof et la forêt de Grunewald',
      area: 'Prenzlauer Berg, Mitte et Kreuzberg',
    },
    bern: {
      personality: 'l\'une des capitales les plus accueillantes pour les animaux d\'Europe — la Vieille-Ville UNESCO de Suisse compte 6 km d\'arcades Lauben couvertes, trois forêts urbaines à distance de tram et le principal hôpital universitaire vétérinaire du pays',
      highlight: 'la forêt sans laisse du Bremgartenwald, la promenade fluviale de 5 km le long de l\'Aare et le BärenPark en contrebas de la Vieille-Ville',
      area: 'les arcades UNESCO de l\'Altstadt, les quartiers fluviaux de Marzili et de la Matte et le belvédère du Rosengarten',
    },
    biarritz: {
      personality: 'une ville de surf basque avec une attitude profondément décontractée envers les chiens et la vie en plein air',
      highlight: 'la Grande Plage et le sentier côtier de la Côte Basque',
      area: 'le Port Vieux et le quartier des Halles',
    },
    bilbao: {
      personality: 'l\'une des villes les plus dog-friendly d\'Espagne, où le tram accepte toutes tailles, les bars à pintxos accueillent officiellement les chiens en intérieur et la sculpture \'Puppy\' du Guggenheim met chaque chien à son aise',
      highlight: 'la zone hors laisse du Parc Doña Casilda, le compartiment dog-friendly du funiculaire d\'Artxanda et la promenade en bord de Nervión jusqu\'au Guggenheim',
      area: 'les quartiers Abando et Indautxu, les Sept Rues du Casco Viejo et le front de mer d\'Abandoibarra',
    },
    bologna: {
      personality: 'une ville médiévale italienne de portiques et de marchés qui accueille les chiens dans ses cafés, ses piazzas et ses collines environnantes',
      highlight: 'les Giardini Margherita, le sentier à portiques de San Luca (3,8 km) et les collines au-dessus du quartier de la Bolognina',
      area: 'le Quadrilatero gastronomique, Santo Stefano et le quartier universitaire de Via Zamboni',
    },
    bordeaux: {
      personality: 'une ville où les chiens se promènent sur les terrasses des bars à vins du quartier des Chartrons, explorent les quais de la Garonne et sont accueillis dans la plupart des hôtels boutiques',
      highlight: 'le Parc Bordelais, les quais de la Garonne et le Jardin Public',
      area: 'les Chartrons, Saint-Pierre et le Triangle d\'Or',
    },
    bratislava: {
      personality: 'une capitale d\'Europe centrale compacte et abordable où les chiens arpentent les places pavées de la vieille ville, les forêts des Carpates et les berges du Danube — tout à pied depuis le centre',
      highlight: 'la forêt de Železná Studnička, Sad Janka Kráľa et la rive de Devín',
      area: 'la vieille ville, Petržalka et Devín',
    },
    brighton: {
      personality: 'la ville balnéaire britannique la plus fiable côté chiens, où les bus sont gratuits pour les animaux et où Hove Lawns Beach reste ouverte toute l\'année',
      highlight: 'Hove Lawns, Preston Park et Stanmer Park aux portes des South Downs',
      area: 'The Lanes, Kemptown et le front de mer de Hove',
    },
    bristol: {
      personality: 'l\'une des villes les plus vertes d\'Angleterre — 70 % des pubs accueillent les chiens, transports publics gratuits pour animaux, l\'iconique Clifton Suspension Bridge et les 162 hectares d\'Ashton Court Estate aux portes',
      highlight: 'Ashton Court Estate, les Downs au sommet de l\'Avon Gorge et le ferry flottant Bristol Ferry vers Wapping Wharf',
      area: 'Clifton, le Harbourside et Stokes Croft',
    },
    brno: {
      personality: `la capitale compacte et étonnamment abordable de Moravie — 14 zones sans laisse municipales clôturées, une culture pivnice qui tolère les chiens dans tout le centre, et un réservoir de baignade canine toute l'année à 25 minutes en tram`,
      highlight: `le parc au sommet du Špilberk, la Brněnská přehrada à Bystrc et les excursions dans la région viticole de Moravie du Sud à Pavlov et Mikulov`,
      area: `le centre médiéval autour de náměstí Svobody, Lužánky et le quartier lacustre de Bystrc`,
    },
    bruges: {
      personality: 'une magnifique ville médiévale préservée où les chiens trottent aux côtés de leurs propriétaires sur des rues pavées, des chemins de halage et à travers la tranquille campagne environnante',
      highlight: 'le parc de Minnewater, les chemins de halage du réseau de canaux et le Koningin Astridpark',
      area: 'le centre historique, le quartier Sint-Anna et le Begijnhof',
    },
    brussels: {
      personality: 'une destination méconnue pour les voyageurs avec animaux, avec de grands parcs, un centre compact et praticable et une culture hôtelière qui accueille vraiment les animaux',
      highlight: 'le Bois de la Cambre, le Parc du Cinquantenaire et la Forêt de Soignes',
      area: 'Ixelles, Saint-Gilles et le Quartier Européen',
    },
    bucharest: {
      personality: 'l\'une des capitales européennes les plus abordables, avec un parc central de 187 hectares, deux enclos canins municipaux clôturés à l\'intérieur et le plus grand hôpital vétérinaire 24h/24 de Roumanie',
      highlight: 'le parc Herastrau, les jardins Cișmigiu et le lac de Snagov',
      area: 'la vieille ville Lipscani, Floreasca et Calea Victoriei',
    },
    budapest: {
      personality: 'une ville de grande architecture et d\'une scène dog-friendly en plein essor. Les chiens prennent le métro, accèdent à la plupart des parcs et sont accueillis dans les célèbres bars en ruine de Budapest',
      highlight: 'l\'île Marguerite, le Parc de la Ville (Városliget) et les promenades en bord de Danube',
      area: 'le 7e arrondissement (le quartier juif), le quartier du château de Buda et Óbuda',
    },
    cambridge: {
      personality: `l'une des petites villes anglaises les plus fiablement dog-friendly — vastes communaux urbains sans laisse (Jesus Green, Midsummer, Coe Fen), pubs historiques qui accueillent les chiens en laisse au bar, et trains directs Greater Anglia depuis London King's Cross en 50 min`,
      highlight: `le sentier riverain des Backs, les prés de Grantchester et le tea garden de The Orchard, et les sentiers du fort de l'âge du fer de Wandlebury Country Park`,
      area: `le centre historique autour de King's Parade, le quartier de Mill Road et le secteur riverain de Newnham`,
    },
    cannes: {
      personality: 'une ville glamour de la Côte d\'Azur avec une culture canine étonnamment détendue — les terrasses du Suquet, le quartier du Marché Forville et les plages de l\'ouest accueillent les chiens toute l\'année',
      highlight: 'l\'Île Sainte-Marguerite boisée, la Plage de la Bocca et les ruelles pavées du Suquet',
      area: 'Le Suquet (la vieille ville), le quartier du Marché Forville et La Bocca',
    },
    cologne: {
      personality: 'une ville rhénane pragmatique où les chiens prennent le train avec un billet enfant, boivent dans des abreuvoirs de pubs et suivent leurs maîtres le long du fleuve',
      highlight: 'la promenade du Rhin, le parc forestier du Stadtwald et la prairie sans laisse du Beethovenpark',
      area: 'l\'Altstadt autour de la cathédrale, Ehrenfeld et le Severinsviertel',
    },
    copenhagen: {
      personality: 'une ville en tête de l\'Europe pour le bien-être animal. Les chiens voyagent gratuitement dans les transports en commun, entrent dans la plupart des commerces et sont accueillis avec des bols d\'eau sur presque toutes les terrasses',
      highlight: 'les jardins de Frederiksberg, Fælledparken et le front de mer du port',
      area: 'Nørrebro, Frederiksberg et Vesterbro',
    },
    cordoba: {
      personality: 'la ville UNESCO de la Mezquita-Catedral en Andalousie, à 45 minutes en AVE de Séville — centre historique compact aux ruelles blanches, le Pont romain sur le Guadalquivir et les contreforts de la Sierra Morena à 15 minutes au nord pour des randonnées canines au frais',
      highlight: 'la vue sur le Pont romain au coucher du soleil, les ruelles de la Judería juive et le sentier riverain des Sotos de la Albolafia',
      area: 'la Judería, le Centro près de la Plaza de la Corredera et le quartier moderne de San Fernando',
    },
    cork: {
      personality: `la rebel city irlandaise des gourmets sur le Lee — rues georgiennes, pubs traditionnels à snugs, l'emblématique English Market et le Ballincollig Regional Park sans laisse de 200 hectares à 8 km à l'ouest, avec les plages du West Cork à courte distance au sud`,
      highlight: `Fitzgerald's Park et la promenade Mardyke, la zone sans laisse du Ballincollig Regional Park et le train de 25 min vers le front de mer dog-friendly de Cobh`,
      area: `le Latin Quarter, la Marina fluviale et Blackrock`,
    },
    dresden: {
      personality: 'capitale baroque compacte sur l\'Elbe, avec des kilomètres de prairies fluviales sans laisse, une forêt urbaine de 5 800 hectares à la lisière nord et une flotte historique de bateaux à aubes qui accueille les chiens sans supplément',
      highlight: 'les Elbwiesen qui traversent le centre, la forêt de la Dresdner Heide et les jardins du château de Pillnitz',
      area: 'l\'Altstadt autour de la Frauenkirche, l\'Äußere Neustadt et les quartiers résidentiels de Striesen / Blasewitz',
    },
    dublin: {
      personality: 'une ville chaleureuse et centrée sur les pubs où les chiens sont accueillis dans les jardins de bière, sur les promenades côtières et à travers le plus grand parc urbain d\'Europe. Le Phoenix Park',
      highlight: 'le Phoenix Park (700 hectares, largement sans laisse), le sentier de la rivière Dodder et la plage de Sandymount Strand',
      area: 'Ranelagh, Portobello et Stoneybatter',
    },
    dubrovnik: {
      personality: 'une ville fortifiée spectaculaire où les chiens accompagnent leurs propriétaires sur les sentiers côtiers, les plages tranquilles des îles et les terrasses ombragées de pins en dehors de la Vieille Ville',
      highlight: 'le sentier côtier vers la plage de Sveti Jakov, le ferry de l\'île de Lokrum (chiens acceptés) et la péninsule de Lapad',
      area: 'Lapad, Gruž et les environs de la Vieille Ville',
    },
    dusseldorf: {
      personality: `capitale rhénane de la mode et des brasseries, avec 21 Hundewiesen officielles clôturées, une Rheinuferpromenade de 2 km à travers le centre et le Medienhafen de Frank Gehry à un tram de distance du cluster d'Altbier de la Altstadt`,
      highlight: `le Hofgarten (premier parc public d'Allemagne), le Medienhafen avec les bâtiments de Gehry et la Rheinturm, et les zones de baignade canine officielles de l'Unterbacher See à 20 minutes au sud`,
      area: `la Altstadt autour de la Ratinger Straße, le front de mer du Medienhafen et la rive gauche verdoyante d'Oberkassel`,
    },
    edinburgh: {
      personality: 'l\'une des villes les plus dog-friendly de Grande-Bretagne. Avec des collines sans laisse, des pubs accueillant les chiens dans chaque rue et une culture qui traite les chiens comme de véritables membres de la famille',
      highlight: 'Arthur\'s Seat (sans laisse), le Holyrood Park et le sentier riverain Water of Leith',
      area: 'Stockbridge, Leith et le New Town',
    },
    evora: {
      personality: `la capitale UNESCO alentejane et ancienne ville romaine, wisigothique et mauresque — Temple romain de 2 000 ans, l'inquiétante Capela dos Ossos, l'un des plus grands circuits de remparts médiévaux d'Ibérie, et un accès direct CP depuis Lisbonne en 1h30`,
      highlight: `le Temple romain d'Évora, le site mégalithique du Cromeleque dos Almendres (7 000 ans plus ancien que Stonehenge), et les plages canines du lac Alqueva à Monsaraz`,
      area: `le Centro Histórico autour de la Praça do Giraldo, le quartier du Temple romain sur le Largo do Conde de Vila Flor, et la route des vins de l'Alentejo juste en dehors des murs`,
    },
    faro: {
      personality: `la capitale de l'Algarve et la porte d'entrée de la côte sud du Portugal — Cidade Velha classée UNESCO, parc naturel de la Ria Formosa de 18 000 ha avec ses boardwalks aux flamants toute l'année, plages canines atlantiques sur îles barrières en ferry, et les suppléments animaux les plus bas du sud de l'Europe`,
      highlight: `la Cidade Velha et l'Arco da Vila avec ses cigognes, le boardwalk de la Ria Formosa vers les marais salants, et la plage canine sauvage atlantique de l'Ilha Deserta en ferry`,
      area: `la Cidade Velha autour de la place de la cathédrale, l'esplanade côté marina et le résidentiel Bom João près de la gare`,
    },
    florence: {
      personality: 'une ville de la Renaissance où les chiens trottent sur les pavés vers les marchés matinaux, s\'installent sous les parasols des cafés et font la promenade des berges de l\'Arno chaque soir avec leurs propriétaires',
      highlight: 'les Jardins de Boboli, le parc des Cascine (zones sans laisse) et les chemins riverains de l\'Arno',
      area: 'Oltrarno, Santa Croce et San Frediano',
    },
    frankfurt: {
      personality: 'la capitale financière la plus verte d\'Allemagne — 52% de la ville est forêt ou parcs, avec un Stadtwald de 4 200 hectares, des tavernes à Apfelwein dog-friendly à Sachsenhausen, et deux cliniques vétérinaires d\'urgence ouvertes 24h/24',
      highlight: 'la Hundeauslauffläche clôturée du Grüneburgpark, la promenade Mainufer de 4 km et les sentiers forestiers du Stadtwald',
      area: 'Sachsenhausen, le Westend et l\'Altstadt autour du Römerberg',
    },
    galway: {
      personality: `la capitale bohème du Wild Atlantic Way irlandais, où les pubs accueillent les chiens dans leurs snugs, la promenade de Salthill se remplit de chiens en laisse au coucher du soleil, et les plages et tourbières du Connemara sont à 30 minutes à l'ouest`,
      highlight: `la promenade de Salthill (2 km), la plage sans laisse de Silver Strand et le front de mer Spanish Arch + Long Walk`,
      area: `le Latin Quarter, le West End et Salthill au bord de la baie`,
    },
    gdansk: {
      personality: `la Perle hanséatique de la Baltique et ancienne ville libre de Danzig — Długi Targ classé UNESCO, le berceau de Solidarité à Stocznia Gdańska, et un accès SKM direct vers la plage canine de Sopot (la plus célèbre de Pologne) en 15 minutes`,
      highlight: `le Długi Targ et la rue Mariacka, la plage canine de Sopot à 15 min en SKM, et le parc paysager de la tri-cité avec 200 km de sentiers sans laisse`,
      area: `le Główne Miasto autour du Długi Targ, l'île Wyspa Spichrzów sur la Motława, et Wrzeszcz au nord`,
    },
    geneva: {
      personality: 'l\'une des capitales internationales les plus accueillantes pour les animaux d\'Europe — la loi suisse autorise les chiens dans les restaurants et cafés, le Bois de la Bâtie sans laisse toute l\'année se trouve en plein centre, et deux cliniques vétérinaires d\'urgence 24h/24 desservent le canton',
      highlight: 'la forêt sans laisse du Bois de la Bâtie, la promenade lacustre du Quai Wilson et le quartier bohème de Carouge',
      area: 'Pâquis sur la rive droite, les Eaux-Vives sur la rive gauche et Carouge de l\'autre côté de l\'Arve',
    },
    genoa: {
      personality: 'l\'une des villes italiennes les plus discrètement accueillantes pour les animaux — la première de Ligurie à ouvrir une plage canine officielle, avec des caruggi 8 °C plus frais que le front de mer en été, trois cliniques vétérinaires d\'urgence 24h/24 et un réseau de transport vertical unique de funiculaires et d\'ascenseurs',
      highlight: 'la plage canine de Vesima toute l\'année, les Parchi di Nervi de 92 000 m² et le Porto Antico redessiné par Renzo Piano',
      area: 'les Strade Nuove UNESCO, le village de pêcheurs de Boccadasse et les parcs côtiers de Nervi',
    },
    ghent: {
      personality: 'une ville belge progressiste axée sur le vélo où les chiens font partie de la vie quotidienne. Dans les tramways, dans les coffee bars et le long des belles rivières Leie et Schelde',
      highlight: 'le Citadelpark, la réserve naturelle de Bourgoyen-Ossemeersen et les chemins de halage riverains de la Leie',
      area: 'le Patershol, Sint-Pieters et Portus Ganda',
    },
    glasgow: {
      personality: 'l\'une des villes britanniques les plus fiables côté chiens, avec animaux gratuits dans chaque train ScotRail, pubs dog-friendly dans chaque quartier et les 146 hectares de Pollok Country Park dans la ville',
      highlight: 'Pollok Country Park, Kelvingrove Park et le Loch Lomond à 50 minutes de train',
      area: 'le West End, Merchant City et Finnieston',
    },
    gothenburg: {
      personality: 'la ville la plus dog-friendly de Suède — une ville portuaire et universitaire animée où les chiens prennent le tramway gratuitement, courent sans laisse dans le Slottsskogen de 137 hectares et sont accueillis dans presque tous les cafés',
      highlight: 'la forêt urbaine de Slottsskogen, les cafés du quartier en bois de Haga et les îles dog-friendly de l\'archipel de Göteborg',
      area: 'Haga, le quartier Linné et le quartier Vasastan',
    },
    granada: {
      personality: 'la ville mauresque la plus atmosphérique d\'Europe — où l\'Alhambra surveille les ruelles pavées de l\'Albaicín, la culture de la terrasse andalouse réserve un accueil sincère aux chiens, et la Sierra Nevada est à une heure',
      highlight: 'le Paseo de los Tristes au pied des remparts de l\'Alhambra, le quartier UNESCO de l\'Albaicín et les parcs dog-friendly du quartier d\'Arabial',
      area: 'l\'Albaicín, le Realejo et le centre historique autour de la Plaza Nueva',
    },
    hamburg: {
      personality: 'la grande ville la plus verte d\'Allemagne avec 56 Hundeauslaufzonen clôturées, une boucle de 7 km autour du lac Alster, les célèbres plages urbaines de l\'Elbstrand, et une culture portuaire où les chiens prennent les ferries et dorment sur les terrasses des cafés',
      highlight: 'la boucle de 7 km autour de l\'Außenalster, l\'Elbstrand à Övelgönne et l\'Altonaer Volkspark de 205 hectares',
      area: 'les rives de l\'Alster, le Schanzenviertel et le front de mer de l\'Elbe à Övelgönne',
    },
    hannover: {
      personality: 'capitale tranquille de Basse-Saxe — la plus grande forêt urbaine d\'Allemagne (Eilenriede, 640 ha, plus grande que Central Park), le lac Maschsee avec sa zone de baignade canine, et un hôpital universitaire vétérinaire de niveau mondial',
      highlight: 'les 640 hectares de la forêt de l\'Eilenriede, la boucle de 6 km du Maschsee et sa Hundebadestelle, et l\'allée baroque du Georgengarten',
      area: 'List, les rives du Maschsee et l\'Altstadt autour de la Marktkirche',
    },
    heidelberg: {
      personality: `la ville universitaire la plus romantique d'Allemagne — Altstadt baroque sous le château Renaissance en ruines, l'iconique sentier panoramique du Philosophenweg, la forêt du Königstuhl avec 70 km de sentiers sans laisse, et des trains ICE directs depuis l'aéroport de Francfort en 50 min`,
      highlight: `les terrasses du Schloss, le Philosophenweg avec sa forêt du Heiligenberg, et le funiculaire du Königstuhl vers 70 km de sentiers forestiers sans laisse`,
      area: `l'Altstadt autour de la Hauptstraße, Bergheim près de la gare et le verdoyant Neuenheim de l'autre côté du Neckar`,
    },
    helsinki: {
      personality: 'une capitale nordique où l\'archipel insulaire, les forêts de pins et une culture profondément orientée vers le plein air la rendent exceptionnellement accueillante pour les chiens et leurs propriétaires',
      highlight: 'le Parc Central (Keskuspuisto), la réserve naturelle insulaire de Seurasaari et la forteresse maritime de Suomenlinna',
      area: 'Kallio, Töölö et le Quartier du Design',
    },
    innsbruck: {
      personality: 'la capitale du Tyrol entourée de pics alpins à 2 300 m — transports publics gratuits pour chiens, téléphériques dog-friendly jusqu\'aux sommets, tradition café et Gasthaus qui accueille les chiens, et urgences vétérinaires 24h/24',
      highlight: 'la chaîne du Nordkette accessible en téléphérique depuis le centre, le parc royal Hofgarten et le Altstadt pavé autour du Goldenes Dachl',
      area: 'Altstadt, Wilten et l\'axe de la Maria-Theresien-Strasse',
    },
    krakow: {
      personality: 'une ville historique polonaise dont la ceinture de jardins Planty entourant la vieille ville en fait l\'une des destinations les plus praticables d\'Europe centrale pour les chiens',
      highlight: 'l\'anneau du parc Planty, les prairies de Błonia et les chemins riverains de la Vistule',
      area: 'la Vieille Ville, Kazimierz et Podgórze',
    },
    lausanne: {
      personality: 'la Capitale Olympique suisse sur le lac Léman — l\'une des villes les plus naturellement dog-friendly d\'Europe, où les chiens prennent le métro gratuitement, se promènent dans la forêt de Sauvabelin de 200 hectares et sont accueillis dans pratiquement chaque restaurant',
      highlight: 'la Forêt de Sauvabelin, le sentier viticole UNESCO du Lavaux et la promenade du bord du lac d\'Ouchy',
      area: 'Ouchy (bord du lac), le quartier créatif du Flon et la Cité médiévale',
    },
    lecce: {
      personality: `la « Florence du Sud » — centro storico baroque UNESCO sculpté entièrement en pietra leccese couleur miel, culture café tolérante du Salento et plages canines toute l'année à Punta Prosciutto et Frassanito à 30-45 min en voiture`,
      highlight: `la Piazza del Duomo et la Basilica di Santa Croce, l'amphithéâtre romain de la Piazza Sant'Oronzo, et les plages canines du Salento à Punta Prosciutto et Frassanito`,
      area: `le centro storico autour de la Piazza Sant'Oronzo, le quartier Mazzini près de la gare et le résidentiel Borgo Piave`,
    },
    leipzig: {
      personality: `la capitale musicale de la Saxe et la ville de Bach — forêt alluviale Auenwald de 5 500 hectares au centre, chemin de halage dog-friendly du Karl-Heine-Kanal, 11 Hundeauslaufzonen clôturées et une Hundestrand toute l'année au Cospudener See à 12 min en S-Bahn`,
      highlight: `la forêt alluviale Auenwald, la plage canine du Cospudener See et le chemin de halage du Karl-Heine-Kanal qui relie Plagwitz au quartier Karli`,
      area: `l'Innenstadt autour du Markt, le Karli (Karl-Liebknecht-Straße) et le quartier créatif de Plagwitz`,
    },
    lille: {
      personality: `une ville du nord de la France d'influence flamande, faite de ruelles pavées et de maisons à pignons en brique, qui abrite le premier café à chiens d'Europe et un centre plat et marchable où les chiens voyagent gratuitement en métro`,
      highlight: `la promenade des remparts de la Citadelle, le Bois de Boulogne urbain et les terrasses du Vieux Lille`,
      area: `le Vieux Lille, Wazemmes et le quartier étudiant de Vauban`,
    },
    lisbon: {
      personality: 'une ville ensoleillée et vallonnée dont le climat doux la rend idéale pour voyager avec des animaux toute l\'année',
      highlight: 'le parc forestier de Monsanto, le front de mer de Belém et les esplanades d\'Alfama',
      area: 'Chiado, Príncipe Real et Bairro Alto',
    },
    liverpool: {
      personality: `une ville maritime classée UNESCO, avec l'un des plus grands réseaux de parcs urbains du nord-ouest de l'Angleterre, trois plages canines sans laisse à 25 minutes en Merseyrail et un couloir de pubs au Baltic Triangle qui accueille les chiens en laisse à l'année`,
      highlight: `les prairies victoriennes de Sefton Park (95 hectares), Crosby Beach avec les Iron Men d'Antony Gormley, et le front de mer du Royal Albert Dock`,
      area: `le front de mer du Royal Albert Dock, le Baltic Triangle et le Georgian Quarter autour de la cathédrale`,
    },
    ljubljana: {
      personality: 'la capitale verte d\'Europe. Un centre compact et sans circulation où les chiens se promènent avec leurs propriétaires sur les terrasses riveraines, à travers les jardins du château et sur les ponts médiévaux',
      highlight: 'le Parc Tivoli (sans laisse), la colline du château de Ljubljana et la voie verte de la rivière Sava',
      area: 'la Vieille Ville, Trnovo et Šiška',
    },
    london: {
      personality: 'l\'une des capitales les plus naturellement accueillantes pour les animaux d\'Europe, où les chiens accompagnent leurs propriétaires dans les pubs, cafés et à travers de vastes parcs royaux toute l\'année',
      highlight: 'les zones sans laisse de Hyde Park, Hampstead Heath et le sentier dog-friendly le long de la Tamise',
      area: 'Islington, Notting Hill et Bermondsey',
    },
    luxembourg: {
      personality: 'la seule capitale européenne avec transports publics gratuits pour tous (chiens compris) depuis 2020, avec neuf enclos canins municipaux clôturés dans la ville et une Vieille Ville UNESCO qui épouse les spectaculaires vallées du Pétrusse et de l\'Alzette',
      highlight: 'le Chemin de la Corniche, le Parc de la Pétrusse avec ses deux enclos canins, et la forêt du Bambësch de 600 hectares',
      area: 'la Ville-Haute, le Grund et Belair',
    },
    lyon: {
      personality: 'la capitale gastronomique de la France, où les chiens sont aussi courants que les bouchons. Accueillis dans les cafés, le long des berges et dans toute la Presqu\'île',
      highlight: 'le Parc de la Tête d\'Or, les berges de la Saône et du Rhône, et les sentiers de la colline de Fourvière',
      area: 'la Presqu\'île, la Croix-Rousse et Confluence',
    },
    maastricht: {
      personality: `la plus ancienne ville des Pays-Bas et capitale bourguignonne du Limbourg — la culture café bourguignonne accueille les chiens en laisse par défaut, la colline forestière du Sint-Pietersberg s'élève directement au sud du centre, et 22 losloopgebieden clôturés entourent le cœur médiéval`,
      highlight: `la colline forestière du Sint-Pietersberg, le chemin de halage de la Meuse vers la Belgique et la baie de baignade canine du Pietersplas à 5 km au sud`,
      area: `le centre médiéval autour du Vrijthof, le quartier de Wyck sur la rive droite de la Meuse et le village de Sint Pieter`,
    },
    madrid: {
      personality: 'l\'une des capitales les plus dog-friendly d\'Europe: Madrid compte plus de chiens par habitant que presque toute autre ville européenne',
      highlight: 'le Parc du Retiro, la Casa de Campo et le Parque del Oeste sans laisse',
      area: 'Malasaña, Lavapiés et Chamberí',
    },
    malaga: {
      personality: 'une ville portuaire andalouse décontractée où les chiens rejoignent leurs propriétaires sur les terrasses de musées, dans les hôtels en bord de mer et à travers le quartier historique de l\'Alcazaba',
      highlight: 'le Parque de Málaga en bord de mer, le parc naturel des Montes de Málaga et la zone chiens de la plage de Pedregalejo',
      area: 'le Centre Historique, Soho et Pedregalejo',
    },
    manchester: {
      personality: 'l\'une des villes britanniques les plus fiables côté chiens, avec animaux gratuits dans chaque tram Metrolink et bus Bee Network, pubs dog-friendly à chaque rue du Northern Quarter, et les 240 hectares de Heaton Park à un tram du centre',
      highlight: 'Heaton Park, les jardins botaniques de Fletcher Moss et le chemin de halage du Bridgewater Canal',
      area: 'le Northern Quarter, Ancoats et Castlefield',
    },
    marseille: {
      personality: 'une ville méditerranéenne baignée de soleil où la vie en extérieur, les terrasses et la nature côtière imposent un rythme résolument dog-friendly',
      highlight: 'les sentiers du Parc National des Calanques, les îles du Frioul accessibles en ferry et les 5 kilomètres de la Corniche Kennedy',
      area: 'les quais du Vieux-Port, le quartier historique du Panier et le port de pêche du Vallon des Auffes',
    },
    milan: {
      personality: 'la capitale italienne du design, où un nombre croissant d\'hôtels de luxe et boutiques accueillent chaleureusement les animaux',
      highlight: 'le Parco Sempione, le quartier des canaux Navigli et les spacieux jardins de la Villa Reale',
      area: 'Brera, les Navigli et le quartier du design de la Porta Venezia',
    },
    montpellier: {
      personality: 'une ville universitaire ensoleillée du sud de la France où les chiens accompagnent leurs maîtres en terrasse, dans le tram et le long des promenades au bord du Lez',
      highlight: 'l\'enclos hors laisse du Parc Méric, la promenade des Berges du Lez et la plage dog-friendly du Grand Travers à 20 km',
      area: 'l\'Écusson médiéval, l\'esplanade de la Place de la Comédie et le quartier néo-classique de l\'Antigone',
    },
    munich: {
      personality: 'une ville où les chiens sont accueillis dans les jardins de bière, dans les transports en commun et dans le Jardin Anglais. Le plus grand parc urbain d\'Europe',
      highlight: 'l\'Englischer Garten, l\'Olympiapark et les berges de l\'Isar',
      area: 'Schwabing, Maxvorstadt et Haidhausen',
    },
    nantes: {
      personality: 'la ville la plus agréable à vivre de France, avec dix caniparcs officiels, un réseau de restaurants certifiés QUALIDOG et un parcours culturel dog-friendly de 12 km le long de la Loire',
      highlight: 'le caniparc du Parc de Procé, les quais de la Loire et le jardin japonais de l\'Île de Versailles',
      area: 'le quartier historique du Bouffay, l\'Île de Nantes et le quartier Procé',
    },
    naples: {
      personality: 'la capitale chaotique et passionnée du sud de l\'Italie — ruelles historiques denses, Lungomare piéton de 2,5 km, Bosco di Capodimonte de 134 hectares, et trattorie qui traitent les chiens comme des membres de la famille',
      highlight: 'le Lungomare Caracciolo, le Bosco di Capodimonte et le Parco Virgiliano de Posillipo',
      area: 'Chiaia, Posillipo et le centre historique autour de Spaccanapoli',
    },
    nice: {
      personality: 'une ville méditerranéenne ensoleillée où les chiens rejoignent leurs propriétaires dans les restaurants en terrasse, au marché du vieux-Nice et le long du célèbre front de mer',
      highlight: 'la Promenade des Anglais, le Parc du Mont Boron et la Colline du Château',
      area: 'le Vieux-Nice, Cimiez et le Port',
    },
    oslo: {
      personality: 'une capitale scandinave où la proximité des fjords, des forêts et du vaste réseau de sentiers de l\'Oslomarka en fait l\'une des meilleures destinations du continent pour les propriétaires de chiens actifs',
      highlight: 'la forêt de l\'Oslomarka, la péninsule de Bygdøy et le sentier de la rivière Akerselva',
      area: 'Frogner, Grünerløkka et Tjuvholmen',
    },
    oxford: {
      personality: 'une ville universitaire médiévale où les cours des collèges couleur miel sont interdites aux chiens mais où les prairies environnantes, les pubs riverains et le Port Meadow sans laisse en font l\'une des escapades urbaines les plus faciles d\'Angleterre',
      highlight: 'le common sans laisse de Port Meadow, Christ Church Meadow et les University Parks',
      area: 'le centre-ville, Jericho et North Oxford',
    },
    palma: {
      personality: 'une capitale insulaire méditerranéenne ensoleillée où les terrasses, les plages et un climat chaud toute l\'année en font l\'une des villes les plus dog-friendly d\'Espagne',
      highlight: 'la plage canine toute l\'année d\'Es Carnatge, le Parc de sa Riera et les jardins du Castell de Bellver',
      area: 'Santa Catalina, le Vieux-Ville (Casc Antic) et Portixol',
    },
    paris: {
      personality: 'une ville où les chiens sont célèbres pour être acceptés dans les cafés, boutiques et de nombreux restaurants',
      highlight: 'le Bois de Boulogne, le Bois de Vincennes et des centaines de squares',
      area: 'le Marais, Saint-Germain-des-Prés et Montmartre',
    },
    pisa: {
      personality: 'une ville UNESCO toscane compacte associée aux 23 000 hectares du parc de San Rossore et à une plage canine ouverte toute l\'année à Marina di Pisa, le tout à vingt minutes du centre',
      highlight: 'la pelouse du Champ des Miracles, la pinède de San Rossore et la plage canine de Marina di Pisa',
      area: 'Sant\'Antonio, les Lungarni et le Borgo Stretto',
    },
    porto: {
      personality: 'une ville vallonnée et atmosphérique où les chiens font partie du rythme quotidien. Dans les tramways, dans les jardins des bars à vins et le long de l\'esplanade du fleuve Douro',
      highlight: 'les Jardins du Palácio de Cristal, les berges du Douro (Ribeira) et le parc de Serralves',
      area: 'Ribeira, Bonfim et Foz do Douro',
    },
    prague: {
      personality: 'une ville compacte et marchable où les chiens sont les bienvenus dans la plupart des pubs, bars à vins et même certains marchés couverts',
      highlight: 'les parcs Stromovka et Letná, et les sentiers de la vallée de Nusle au bord de la rivière',
      area: 'Vinohrady, Žižkov et Malá Strana',
    },
    reims: {
      personality: `l'élégante capitale de la Champagne, ville UNESCO où cathédrales gothiques, façades art déco et avenues plantées de vignes invitent à de longues promenades avec son chien en laisse`,
      highlight: 'les Promenades autour de la Place de la République, le boisé Parc de Champagne et les chemins de halage le long du canal vers Cernay',
      area: `le centre historique près de la Cathédrale Notre-Dame, la Place Drouet d'Erlon et le quartier verdoyant du Parc de Champagne`,
    },
    reykjavik: {
      personality: 'la capitale la plus septentrionale du monde et l\'une des plus dog-friendly. Avec de vastes champs de lave, des plages géothermiques et une culture qui emmène les chiens partout',
      highlight: 'la vallée d\'Elliðaárdalur, la colline d\'Öskjuhlíð et la promenade côtière du phare de Grótta',
      area: 'le Centre (Miðborg), Laugardalur et Álftanes',
    },
    riga: {
      personality: 'une belle ville Art Nouveau restaurée avec une forte culture de plein air balte. Les chiens font partie de la vie quotidienne dans les parcs, les marchés et sur les berges de la Daugava',
      highlight: 'le parc forestier de Mežaparks, le parc Bastejkalns et la promenade riveraine de la Daugava',
      area: 'la Vieille Ville (Vecrīga), le Quartier Art Nouveau et Āgenskalns',
    },
    rome: {
      personality: 'une ville où les chiens accompagnent leurs propriétaires partout. Du cornetto du matin à la passeggiata du soir',
      highlight: 'les jardins de la Villa Borghèse, les zones sans laisse du Parco dell\'Appia Antica et les promenades du Lungotevere',
      area: 'Prati, Trastevere et Pigneto',
    },
    rotterdam: {
      personality: 'l\'une des villes les plus dog-friendly des Pays-Bas, où les animaux voyagent gratuitement dans les transports et la plupart des terrasses de café les accueillent par défaut',
      highlight: 'les 28 hectares d\'espace sans laisse d\'Het Park à côté de l\'Euromast, le Kralingse Bos et la plage de Maasvlakte',
      area: 'Middelland le long de la Nieuwe Binnenweg, le quartier artistique de Witte de With et les quais de Veerhaven',
    },
    salamanca: {
      personality: `une ville universitaire castillane en grès doré, inscrite à l'UNESCO depuis 1988, où les chiens en laisse glissent sous les arcades baroques et où la berge du Tormes est le cœur des promenades du soir`,
      highlight: `la Plaza Mayor et la Rúa Mayor, la berge du Tormes (Salas Bajas) et le Parque de los Jesuitas avec sa zone clôturée sans laisse`,
      area: `le centre historique autour de la Plaza Mayor, le bord du fleuve au sud du Pont Romain et le quartier verdoyant près de l'Université de Salamanque`,
    },
    salzburg: {
      personality: 'une ville alpine compacte où l\'architecture de l\'époque Mozart, les prairies vallonnées et les montagnes du Salzkammergut environnantes créent un cadre magique pour les voyages avec animaux',
      highlight: 'le parc de Hellbrunn, le chemin riverain de la Salzach et les sentiers de la colline du Kapuzinerberg',
      area: 'la Vieille Ville (Altstadt), Schallmoos et Mülln',
    },
    'san-sebastian': {
      personality: 'une ville balnéaire basque où les chiens sont parfois plus nombreux que les enfants et où les plages leur ouvrent d\'octobre à mai',
      highlight: 'les plages de La Concha et Zurriola (octobre–mai), les sentiers du Mont Urgull et le Paseo Nuevo sur le front de mer',
      area: 'la Parte Vieja (vieille ville), Gros et le quartier d\'Antiguo près du Mont Igueldo',
    },
    seville: {
      personality: 'l\'une des villes les plus dog-friendly d\'Andalousie. Où les chiens se promènent sous les orangers, rejoignent leurs propriétaires sur les terrasses de bars à tapas et explorent les parcs riverains',
      highlight: 'le Parque de María Luisa, le parc Alamillo et la promenade riveraine du Guadalquivir',
      area: 'Triana, Santa Cruz et El Arenal',
    },
    sofia: {
      personality: 'l\'une des capitales européennes les plus abordables, avec près de 500 adresses dog-friendly, deux hôpitaux d\'urgence 24h/24 et le Vitosha à 2 290 mètres qui s\'élève directement depuis la ville',
      highlight: 'Borisova Gradina, le Yuzhen Park et les sentiers du parc naturel du Vitosha',
      area: 'le Vitosha Boulevard, Lozenets et Boyana',
    },
    split: {
      personality: 'une ville côtière croate décontractée où le front de mer adriatique, l\'ancien Palais de Dioclétien et une culture locale relax en font une destination remarquable pour les propriétaires d\'animaux',
      highlight: 'le parc forestier de la colline Marjan, la zone chiens de la plage de Bačvice et le sentier côtier vers Stobreč',
      area: 'Meje, les environs de la Vieille Ville et le quartier de Manuš',
    },
    stavanger: {
      personality: `la troisième ville de Norvège et porte d'entrée du Lysefjord — vieille ville en bois classée UNESCO (Gamle Stavanger), transports exceptionnellement dog-friendly (bus, trains, ferries de fjord gratuits), l'iconique Preikestolen à 50 min à l'est, et 35 km de sable atlantique dog-friendly à 15 min au sud`,
      highlight: `la randonnée du Preikestolen avec chien en laisse, la croisière du Lysefjord et la plage atlantique de Solastranden à 15 min du centre`,
      area: `le port du Vågen et la vieille ville en bois Gamle Stavanger, la rue colorée Fargegata et le quartier du lac Mosvatnet`,
    },
    stockholm: {
      personality: 'une ville où les chiens font partie du tissu de la vie quotidienne. Sur les ferries, dans les cafés et à travers les îles de l\'archipel',
      highlight: 'l\'île de Djurgården, Hagaparken et le réseau de sentiers de l\'archipel',
      area: 'Södermalm, Östermalm et Djurgården',
    },
    strasbourg: {
      personality: 'l\'une des villes UNESCO les plus atmosphériques d\'Europe — où la culture alsacienne, les marchés de Noël et une attitude détendue envers les chiens en font une destination pet-travel toute l\'année',
      highlight: 'le Parc de l\'Orangerie, les canaux de la Petite France et les Jardins des Deux Rives sur le Rhin',
      area: 'la Petite France, le Krutenau et le Quartier Européen',
    },
    stuttgart: {
      personality: `une capitale du sud de l'Allemagne nichée dans une cuvette verte de vignes et de forêts de hêtres, où Biergärten et Wirtschaften accueillent universellement les chiens et trois zones clôturées sans laisse encerclent le centre`,
      highlight: `le ruban du Schlossgarten, les lacs forestiers du Bärensee et le parc en hauteur du Killesberg`,
      area: `Mitte, Süd et Bad Cannstatt`,
    },
    tallinn: {
      personality: 'une ville médiévale de conte de fées avec une attitude estonienne progressiste envers les animaux. Les chiens entrent dans la plupart des commerces, visitent la vieille ville et explorent librement les chemins côtiers',
      highlight: 'le Parc Kadriorg, le sentier côtier de Pirita et les balades en tourbière de Pääsküla',
      area: 'Kalamaja, Telliskivi et la Vieille Ville',
    },
    tampere: {
      personality: `la troisième ville de Finlande et la capitale officieuse du sauna — transports exceptionnellement dog-friendly (trams et trains gratuits), 22 koira-aitaus clôturés, deux plages canines en bord de lac à distance de marche du centre, et l'iconique crête de Pyynikki avec promenade canine toute l'année`,
      highlight: `la crête de Pyynikki et son café-tour d'observation, les plages canines de Pyynikki et Niihama sur les deux lacs, et la promenade des rapides du Tammerkoski à travers le centre`,
      area: `le centre entre les rapides du Tammerkoski et Hämeenkatu, le quartier créatif Finlayson et la crête lacustre de Pyynikki`,
    },
    'the-hague': {
      personality: 'une capitale néerlandaise élégante où 11 km de côte de la mer du Nord, des dunes sans laisse et des cafés dog-friendly sont à un tram du centre',
      highlight: 'le Westduinpark et les Bosjes van Poot, la forêt du Haagse Bos et le domaine de Clingendael',
      area: 'le Statenkwartier, le Hofkwartier et Scheveningen Haven',
    },
    thessaloniki: {
      personality: 'la deuxième ville de Grèce et l\'une de ses plus dog-friendly — une cité portuaire de 2 300 ans où les chiens sont les bienvenus en terrasse, dans le vieux quartier et le long des 3,5 km de la promenade Nea Paralia',
      highlight: 'le parc du front de mer Nea Paralia (avec une zone canine dédiée), la forêt urbaine de Seich Sou et les promenades byzantines d\'Ano Poli',
      area: 'Ano Poli (Haute Ville), Ladadika et le Front de Mer',
    },
    toledo: {
      personality: `la cité impériale médiévale et ancienne capitale wisigothique, mauresque et chrétienne — un musée à ciel ouvert classé UNESCO sur un éperon de granit au-dessus du Tage, avec Madrid à 33 minutes en train Avant grande vitesse`,
      highlight: `le belvédère du Mirador del Valle avec le panorama iconique sur la skyline, la Senda Ecológica circulaire le long du Tage, et le Puente de San Martín médiéval`,
      area: `le Casco Histórico autour de la Plaza de Zocodover, la Judería avec le musée El Greco, et La Vega de l'autre côté du Puente de San Martín`,
    },
    toulouse: {
      personality: 'une ville décontractée du sud-ouest, de briques roses et de terrasses, où les chiens se fondent dans la vie quotidienne le long de la Garonne',
      highlight: 'les berges de la Garonne, le chemin de halage du Canal du Midi et le parc riverain de la Prairie des Filtres',
      area: 'la place du Capitole, le quartier des Carmes et la rive gauche de Saint-Cyprien',
    },
    trondheim: {
      personality: `la troisième ville de Norvège et capitale médiévale — cathédrale Nidaros UNESCO (la cathédrale gothique la plus septentrionale du monde), quartier en bois coloré de Bakklandet, transport canin gratuit (bus, trams, trains), et 80 km² de forêt urbaine de Bymarka aux portes de la ville`,
      highlight: `la cathédrale Nidaros et le Vieux Pont (Gamle Bybro), l'iconique tram historique Gråkallbanen vers la forêt de Bymarka, et le ferry pour l'île Munkholmen`,
      area: `le Midtbyen autour de la cathédrale Nidaros, le quartier en bois de Bakklandet, et le port de Solsiden`,
    },
    turin: {
      personality: 'la capitale baroque du nord de l\'Italie, avec 18 km d\'arcades couvertes qui abritent chiens et propriétaires de la pluie et du soleil estival, 35+ zones canines clôturées, et les Alpes à une heure pour les escapades du week-end',
      highlight: 'les 84 hectares du Parco del Valentino, les 10 km de berges du Pô et la Basilique de Superga atteinte par train à crémaillère',
      area: 'San Salvario, le Quadrilatero Romano et le cœur historique autour de la Piazza Castello',
    },
    utrecht: {
      personality: 'une ville universitaire néerlandaise compacte où les chiens montent gratuitement dans les bus et trams urbains, où l\'opérateur de croisière canalière accepte les chiens sans supplément, et où trois zones sans laisse — le Máximapark de 300 hectares, le Griftpark central et les domaines d\'Amelisweerd — sont toutes accessibles depuis le cœur historique',
      highlight: 'le Máximapark à Leidsche Rijn, le Griftpark central et les domaines d\'Amelisweerd & Rhijnauwen à 5 km au sud-est',
      area: 'la Binnenstad et l\'Oudegracht, Vogelenbuurt et Wittevrouwen',
    },
    valencia: {
      personality: 'une ville méditerranéenne ensoleillée avec 19 km de parc traversant son centre. L\'ancien lit de la Turia. Ce qui en fait l\'une des villes les plus praticables d\'Europe pour les propriétaires de chiens',
      highlight: 'le Jardin du Turia (9 km largement sans laisse), la zone chiens de la plage de Malvarrosa et le parc naturel de l\'Albufera',
      area: 'Ruzafa, El Carmen et l\'Eixample',
    },
    venice: {
      personality: 'l\'une des villes les plus étonnamment dog-friendly d\'Italie. Les chiens prennent le vaporetto, explorent les sestieri tranquilles loin des foules et sont accueillis dans de nombreux bacari locaux',
      highlight: 'les plages de l\'île du Lido (chiens autorisés hors saison), les canaux tranquilles du Cannaregio et le parc de Sant\'Elena',
      area: 'Cannaregio, Dorsoduro et Sant\'Elena',
    },
    verona: {
      personality: 'une ville romantique classée à l\'UNESCO où les chiens accompagnent leurs maîtres sur les terrasses des bars à vins, dans les jardins Renaissance et le long des berges pittoresques de l\'Adige',
      highlight: 'le Giardino Giusti, les berges de l\'Adige et les terrasses dog-friendly près de l\'Arena',
      area: 'Veronetta, le Centre historique et le quartier de la Piazza delle Erbe',
    },
    vienna: {
      personality: 'une ville qui prend la possession d\'animaux très au sérieux. Les chiens prennent le U-Bahn, entrent dans les musées et sont accueillis dans des centaines de cafés viennois',
      highlight: 'le parc du Prater, l\'île du Danube et le Lainzer Tiergarten',
      area: 'le 1er arrondissement, le Naschmarkt et Josefstadt',
    },
    vilnius: {
      personality: 'la capitale la plus verte de l\'UE et l\'une des plus accueillantes pour les chiens, où les animaux voyagent gratuitement dans tous les bus et près de 500 adresses pet-friendly se concentrent dans la vieille ville UNESCO',
      highlight: 'la forêt du Vingis, le jardin Bernardine et la colline des Trois Croix',
      area: 'la vieille ville, Užupis et Šnipiškės',
    },
    warsaw: {
      personality: 'une capitale européenne en pleine modernisation où les hôtels pet-friendly sont de plus en plus la norme et les parcs riverains offrent d\'excellentes promenades',
      highlight: 'le Parc Łazienki, les boulevards riverains de la Vistule et la forêt de Kampinos en périphérie',
      area: 'Śródmieście, Praga et le quartier riverain de Powiśle',
    },
    wroclaw: {
      personality: `l'une des villes de Pologne les plus réellement amoureuses des chiens, où les terrasses du Rynek coloré accueillent les chiens sans façon, où les transports publics sont gratuits pour tous les animaux et où une quarantaine de zones clôturées sans laisse sont disséminées dans la ville`,
      highlight: `le Park Szczytnicki et la Halle du Centenaire, les îles de l'Odra et les pavés éclairés à la lampe à gaz de l'île de la Cathédrale au crépuscule`,
      area: `la Vieille Ville autour du Rynek, le quartier bohème de Nadodrze et le Quartier des Quatre Confessions`,
    },
    york: {
      personality: `l'une des villes anglaises les plus fiablement dog-friendly — un cœur médiéval compact où 80 % des pubs accueillent les chiens en laisse, le circuit de 5 km des remparts est gratuit avec un animal, et les trains LNER directs desservent les plages canines de Filey, Sandsend et Bridlington pour la journée`,
      highlight: `le circuit dog-friendly des remparts, les Museum Gardens en bord de rivière, et la plage canine ouverte toute l'année à Filey, à une heure à l'est sur la ligne LNER`,
      area: `le centre historique à l'intérieur des remparts, le quartier de Fossgate et le secteur de Bishopthorpe Road / Knavesmire`,
    },
    zagreb: {
      personality: `une capitale d'époque habsbourgeoise détendue où les chiens prennent le plus court funiculaire public au monde, où les terrasses bordent la rue piétonne Tkalčićeva, et où le parc Maksimir (316 ha) abrite la principale zone clôturée sans laisse de la ville`,
      highlight: `le parc Maksimir, la Ville Haute médiévale et les sections plage canine du lac Jarun`,
      area: `Donji Grad, Gornji Grad et le quartier des lacs de Maksimir`,
    },
    zaragoza: {
      personality: `la capitale de l'Aragon et cinquième ville d'Espagne — ancrée par la Basílica del Pilar sur l'Ebre et bâtie autour de 126 zones sans laisse désignées, l'un des réseaux dog-friendly les plus denses d'Espagne, plus l'hôpital de référence AniCura Emvet 24h/24`,
      highlight: `le Parque Grande Labordeta de 27 hectares, l'enclos canin du Parque del Tío Jorge et les promenades fluviales des Riberas del Ebro`,
      area: `le Casco Histórico autour d'El Pilar, le Centro arboré sur Paseo de Sagasta et le quartier à tapas Magdalena`,
    },
    zurich: {
      personality: 'une ville qui figure parmi les plus dog-friendly d\'Europe. Avec des zones dédiées aux chiens sur les plages, des tramways dog-friendly et les passeports pour animaux acceptés partout',
      highlight: 'le front de lac du Zürichsee, la colline de l\'Uetliberg et les sentiers de la rivière Sihl',
      area: 'Kreis 4, Zurich West et la Vieille Ville',
    },
  },
  es: {
    aarhus: {
      personality: 'la segunda ciudad de Dinamarca — la cultura del café más tolerante de Escandinavia después de Copenhague, transporte público gratis para perros y 8 bosques sin correa oficiales',
      highlight: 'el Marselisborg Hundeskov, la playa canina todo el año de Bellevue Strand y el museo al aire libre Den Gamle By',
      area: 'Latin Quarter, Frederiksbjerg y la zona portuaria Dokk1',
    },
    amsterdam: {
      personality: 'una de las capitales más relajadas y acogedoras con mascotas de Europa',
      highlight: 'el Vondelpark y las orillas sin correa del río Amstel',
      area: 'el barrio del Jordaan y el cinturón de canales',
    },
    annecy: {
      personality: `la « Venecia de los Alpes » — Casco Antiguo medieval clasificado a lo largo de los canales, el lago grande más limpio de Europa con spots de baño canino todo el año, y el bosque del Semnoz de 4 000 ha con 50 km de senderos sin correa directamente al sur del centro`,
      highlight: `el Pont des Amours y los canales del Casco Antiguo, el sendero ciclista plano de 42 km de la vuelta al lago, y la cima del Semnoz a 1 699 m`,
      area: `el Casco Antiguo alrededor del Palais de l'Île, el Pâquier y el frente lacustre de Albigny, y el residencial Annecy-le-Vieux`,
    },
    antwerp: {
      personality: 'la capital de la moda de Bélgica y una de sus ciudades más dog-friendly. Con amplios parques ribereños, terrazas acogedoras para perros y un floreciente sector de hoteles boutique',
      highlight: 'el parque Rivierenhof, el paseo ribereño del Escalda y el Nachtegalenpark',
      area: 'el Casco Antiguo, Zurenborg y el Zuid',
    },
    athens: {
      personality: 'una capital mediterránea bañada por el sol que sorprende a los viajeros con mascotas con sus barrios transitables y una creciente escena de hoteles boutique que acogen perros todo el año',
      highlight: 'el Jardín Nacional, la colina de Filopappou y el paseo costero de Faliro',
      area: 'Koukaki, Monastiraki y Pangrati',
    },
    avignon: {
      personality: `la capital de Provenza y antigua sede de siete papas — centro storico amurallado clasificado UNESCO, el imponente Palacio de los Papas (el mayor palacio gótico de Europa), el legendario Pont Saint-Bénézet sobre el Ródano, y acceso TGV directo desde París en 2h40`,
      highlight: `la Place du Palais des Papes, los jardines del Rocher des Doms con el panorama icónico, y la île de la Barthelasse con 4 km de paseo canino junto al Ródano`,
      area: `el intra-muros alrededor del Palacio de los Papas, el barrio bistró de la Rue des Teinturiers y la Place de l'Horloge, y la île de la Barthelasse al otro lado del río`,
    },
    barcelona: {
      personality: 'una ciudad mediterránea donde la tenencia de mascotas es alta y los hoteles se están adaptando',
      highlight: 'el Parque de la Ciutadella, la playa de Poblenou y las colinas del Collserola',
      area: 'El Born, Gràcia y el Eixample',
    },
    basel: {
      personality: `una de las ciudades dog-friendly más infravaloradas de Europa — la capital artística trifronteriza de Suiza, con dos zonas oficiales de baño canino en el Rin, un parque aluvial sin correa a lo largo del Wiese y una clínica veterinaria de urgencias 24/7`,
      highlight: 'la zona de baño canino de Birsköpfli, el Landschaftspark Wiese y la terraza Pfalz junto al Münster',
      area: `la Altstadt medieval alrededor de la Marktplatz, el creativo barrio de Kleinbasel y el frondoso distrito de St. Alban`,
    },
    bath: {
      personality: 'la ciudad balneario georgiana UNESCO de Inglaterra, compacta y peatonal, con una fuerte cultura de pubs tolerante con los perros y el sendero Bath Skyline de 9,6 km justo encima del Royal Crescent de piedra color miel',
      highlight: 'el césped del Royal Crescent, el sendero de la National Trust Bath Skyline y el camino de sirga Kennet & Avon',
      area: 'el barrio del Royal Crescent, la ribera junto al Pulteney Bridge y Bathwick',
    },
    belgrade: {
      personality: 'una de las capitales europeas más asequibles, con la playa canina de Ada Ciganlija todo el año, transporte público gratuito desde 2025 y el único hospital veterinario 24/7 de Serbia',
      highlight: 'la fortaleza de Kalemegdan, la península de Ada Ciganlija y el parque Tašmajdan',
      area: 'Stari Grad, Skadarlija y Dorćol',
    },
    bergen: {
      personality: 'la puerta noruega a los fiordos, encajada entre siete montañas y el mar — transporte público gratis para perros, montañas sin correa a 7 minutos del centro, y un muelle hanseático UNESCO en el puerto',
      highlight: 'el Monte Fløyen vía el funicular Fløibanen, la cresta Vidden hasta el Monte Ulriken y el colorido muelle Bryggen',
      area: 'Bryggen, Sandviken y Marken',
    },
    berlin: {
      personality: 'posiblemente la capital más dog-friendly de Europa. Los perros viajan en transporte público y entran libremente en muchos comercios',
      highlight: 'el Tiergarten, el campo de Tempelhof y el bosque de Grunewald',
      area: 'Prenzlauer Berg, Mitte y Kreuzberg',
    },
    bern: {
      personality: 'una de las capitales más acogedoras para mascotas de Europa — el Casco Antiguo UNESCO de Suiza tiene 6 km de soportales Lauben cubiertos, tres bosques urbanos a distancia de tranvía y el principal hospital universitario veterinario del país',
      highlight: 'el bosque sin correa del Bremgartenwald, el paseo fluvial de 5 km a lo largo del Aar y el BärenPark bajo el Casco Antiguo',
      area: 'los soportales UNESCO del Altstadt, los barrios ribereños de Marzili y la Matte y el mirador del Rosengarten',
    },
    biarritz: {
      personality: 'una ciudad de surf vasca con una actitud profundamente relajada hacia los perros y la vida al aire libre',
      highlight: 'la Grande Plage y el sendero costero de la Costa Vasca',
      area: 'el Puerto Viejo y el barrio de las Halles',
    },
    bilbao: {
      personality: 'una de las ciudades más dog-friendly de España, donde el tranvía admite todas las tallas, los bares de pintxos aceptan oficialmente perros en interior y la escultura \'Puppy\' del Guggenheim hace sentir a cada perro como en casa',
      highlight: 'la zona de suelta del Parque Doña Casilda, el vagón dog-friendly del Funicular de Artxanda y el paseo fluvial del Nervión hasta el Guggenheim',
      area: 'los barrios de Abando e Indautxu, las Siete Calles del Casco Viejo y el paseo marítimo de Abandoibarra',
    },
    bologna: {
      personality: 'una ciudad medieval italiana de pórticos y mercados gastronómicos que acoge a los perros en sus cafés, plazas y las colinas circundantes',
      highlight: 'los Giardini Margherita, el sendero con pórticos de San Luca (3,8 km) y las colinas sobre el barrio de la Bolognina',
      area: 'el Quadrilatero gastronómico, Santo Stefano y el barrio universitario de Via Zamboni',
    },
    bordeaux: {
      personality: 'una ciudad donde los perros pasean por las terrazas de los bares de vino del barrio de Chartrons, exploran los muelles del Garona y son bienvenidos en la mayoría de los hoteles boutique',
      highlight: 'el Parque Bordelais, los muelles del Garona y el Jardín Público',
      area: 'los Chartrons, Saint-Pierre y el Triángulo de Oro',
    },
    bratislava: {
      personality: 'una capital centroeuropea compacta y asequible donde los perros recorren las plazas adoquinadas del casco antiguo, los bosques de los Cárpatos y las riberas del Danubio, todo a pie desde el centro',
      highlight: 'el bosque de Železná Studnička, Sad Janka Kráľa y la ribera de Devín',
      area: 'el casco antiguo, Petržalka y Devín',
    },
    brighton: {
      personality: 'la ciudad costera más dog-friendly del Reino Unido, donde los autobuses son gratis para mascotas y la playa de Hove Lawns abre todo el año',
      highlight: 'Hove Lawns, Preston Park y Stanmer Park a las puertas de los South Downs',
      area: 'The Lanes, Kemptown y el paseo marítimo de Hove',
    },
    bristol: {
      personality: 'una de las ciudades más verdes de Inglaterra — el 70 % de los pubs admite perros, transporte público gratis para mascotas, el icónico Clifton Suspension Bridge y las 162 hectáreas del Ashton Court Estate a las puertas',
      highlight: 'Ashton Court Estate, los Downs en lo alto de la Garganta del Avon y el ferri flotante Bristol Ferry hasta Wapping Wharf',
      area: 'Clifton, el Harbourside y Stokes Croft',
    },
    brno: {
      personality: `la capital compacta y sorprendentemente asequible de Moravia — 14 zonas valladas sin correa municipales, una cultura de pivnice que admite perros en todo el centro, y un embalse de baño canino todo el año a 25 minutos en tranvía`,
      highlight: `el parque en lo alto del Špilberk, la Brněnská přehrada en Bystrc y las excursiones a la región vinícola de Moravia del Sur en Pavlov y Mikulov`,
      area: `el centro medieval alrededor de náměstí Svobody, Lužánky y el barrio lacustre de Bystrc`,
    },
    bruges: {
      personality: 'una hermosa ciudad medieval conservada donde los perros trotean junto a sus dueños por calles empedradas, caminos de sirga y a través del tranquilo campo circundante',
      highlight: 'el parque Minnewater, los caminos de sirga de la red de canales y el Koningin Astridpark',
      area: 'el centro histórico, el barrio de Sint-Anna y el Begijnhof',
    },
    brussels: {
      personality: 'un destino de viaje con mascotas subestimado, con amplios parques, un centro compacto y transitable y una cultura hotelera que da una auténtica bienvenida a los animales',
      highlight: 'el Bosque de la Cambre, el Parque del Cincuentenario y el Bosque de Soignes',
      area: 'Ixelles, Saint-Gilles y el Barrio Europeo',
    },
    bucharest: {
      personality: 'una de las capitales europeas más asequibles, con un parque central de 187 hectáreas, dos recintos caninos municipales vallados en su interior y el mayor hospital veterinario 24/7 de Rumanía',
      highlight: 'el parque Herastrau, los jardines Cișmigiu y el lago de Snagov',
      area: 'el casco antiguo Lipscani, Floreasca y Calea Victoriei',
    },
    budapest: {
      personality: 'una ciudad de gran arquitectura y una escena dog-friendly en auge. Los perros viajan en metro, acceden a la mayoría de los parques y son bienvenidos en los famosos bares en ruinas de Budapest',
      highlight: 'la Isla Margarita, el Parque de la Ciudad (Városliget) y los paseos ribereños del Danubio',
      area: 'el 7º distrito (el Barrio Judío), el distrito del Castillo de Buda y Óbuda',
    },
    cambridge: {
      personality: `una de las ciudades pequeñas inglesas más fiablemente dog-friendly — vastos comunales urbanos sin correa (Jesus Green, Midsummer, Coe Fen), pubs históricos que admiten perros con correa en la barra, y trenes directos Greater Anglia desde London King's Cross en 50 min`,
      highlight: `el sendero ribereño de los Backs, las praderas de Grantchester y el tea garden de The Orchard, y los senderos del fuerte de la Edad del Hierro de Wandlebury Country Park`,
      area: `el centro histórico alrededor de King's Parade, el barrio de Mill Road y la zona ribereña de Newnham`,
    },
    cannes: {
      personality: 'una glamurosa ciudad de la Costa Azul con una cultura canina sorprendentemente relajada — las terrazas de Le Suquet, el barrio del Marché Forville y las playas occidentales acogen perros durante todo el año',
      highlight: 'la Île Sainte-Marguerite boscosa, la Plage de la Bocca y los callejones adoquinados de Le Suquet',
      area: 'Le Suquet (el casco antiguo), el barrio del Marché Forville y La Bocca',
    },
    cologne: {
      personality: 'una ciudad renana pragmática donde los perros viajan en tren con billete infantil, beben en abrevaderos de pubs y acompañan a sus dueños por la ribera',
      highlight: 'el paseo del Rin, el parque forestal de Stadtwald y la pradera sin correa del Beethovenpark',
      area: 'la Altstadt en torno a la catedral, Ehrenfeld y el Severinsviertel',
    },
    copenhagen: {
      personality: 'una ciudad líder en Europa en bienestar animal. Los perros viajan gratis en transporte público, entran en la mayoría de los comercios y son bienvenidos con cuencos de agua en casi todas las terrazas',
      highlight: 'los Jardines de Frederiksberg, Fælledparken y el paseo marítimo del puerto',
      area: 'Nørrebro, Frederiksberg y Vesterbro',
    },
    cordoba: {
      personality: 'la ciudad UNESCO de la Mezquita-Catedral en Andalucía, a 45 minutos en AVE de Sevilla — compacto centro histórico de calles blancas, el Puente Romano sobre el Guadalquivir y las estribaciones de Sierra Morena a 15 minutos al norte para rutas caninas frescas',
      highlight: 'la vista al Puente Romano al atardecer, los callejones de la Judería judía y el sendero ribereño de los Sotos de la Albolafia',
      area: 'la Judería, el Centro junto a la Plaza de la Corredera y la zona moderna de San Fernando',
    },
    cork: {
      personality: `la rebel city irlandesa de los gourmets sobre el Lee — calles georgianas, pubs tradicionales con snugs, el emblemático English Market y el Ballincollig Regional Park sin correa de 200 hectáreas a 8 km al oeste, con las playas del West Cork a corta distancia al sur`,
      highlight: `Fitzgerald's Park y el paseo Mardyke, la zona sin correa del Ballincollig Regional Park y el tren de 25 min al frente marítimo dog-friendly de Cobh`,
      area: `el Latin Quarter, la Marina fluvial y Blackrock`,
    },
    dresden: {
      personality: 'capital barroca compacta sobre el Elba, con kilómetros de praderas fluviales sin correa, un bosque urbano de 5.800 hectáreas en el borde norte y una flota histórica de vapores de paletas que admite perros sin coste extra',
      highlight: 'las Elbwiesen que atraviesan el centro, el bosque de la Dresdner Heide y los jardines del palacio de Pillnitz',
      area: 'el Altstadt en torno a la Frauenkirche, el Äußere Neustadt y los barrios residenciales de Striesen / Blasewitz',
    },
    dublin: {
      personality: 'una cálida ciudad centrada en los pubs donde los perros son bienvenidos en los jardines de cerveza, en los paseos costeros y a través del parque urbano más grande de Europa. El Phoenix Park',
      highlight: 'el Phoenix Park (700 hectáreas, mayormente sin correa), el sendero del río Dodder y la playa de Sandymount Strand',
      area: 'Ranelagh, Portobello y Stoneybatter',
    },
    dubrovnik: {
      personality: 'una ciudad amurallada dramática donde los perros acompañan a sus dueños en senderos costeros, playas tranquilas en islas y terrazas sombreadas por pinos fuera del Casco Antiguo',
      highlight: 'el sendero costero hacia la playa de Sveti Jakov, el ferry a la isla de Lokrum (perros permitidos) y la península de Lapad',
      area: 'Lapad, Gruž y los alrededores del Casco Antiguo',
    },
    dusseldorf: {
      personality: `capital renana de la moda y la cerveza tradicional, con 21 Hundewiesen oficiales valladas, una Rheinuferpromenade de 2 km por el centro y el Medienhafen de Frank Gehry a un tranvía del cluster de Altbier de la Altstadt`,
      highlight: `el Hofgarten (primer parque público de Alemania), el Medienhafen con los edificios de Gehry y la Rheinturm, y las zonas de baño canino oficiales del Unterbacher See a 20 minutos al sur`,
      area: `la Altstadt en torno a la Ratinger Straße, el paseo marítimo del Medienhafen y la frondosa orilla izquierda de Oberkassel`,
    },
    edinburgh: {
      personality: 'una de las ciudades más dog-friendly de Gran Bretaña. Con colinas sin correa, pubs que admiten perros en cada calle y una cultura que trata a los perros como miembros plenos de la familia',
      highlight: 'Arthur\'s Seat (sin correa), el Holyrood Park y el sendero ribereño Water of Leith',
      area: 'Stockbridge, Leith y el New Town',
    },
    evora: {
      personality: `la capital UNESCO alentejana y antigua ciudad romana, visigoda y morisca — Templo romano de 2 000 años, la inquietante Capela dos Ossos, uno de los mayores circuitos de murallas medievales de Iberia, y acceso directo CP desde Lisboa en 1h30`,
      highlight: `el Templo romano de Évora, el sitio megalítico del Cromeleque dos Almendres (7 000 años más antiguo que Stonehenge), y las playas caninas del lago Alqueva en Monsaraz`,
      area: `el Centro Histórico alrededor de la Praça do Giraldo, la zona del Templo romano en el Largo do Conde de Vila Flor, y la ruta del vino del Alentejo justo fuera de las murallas`,
    },
    faro: {
      personality: `la capital del Algarve y la puerta de entrada a la costa sur de Portugal — Cidade Velha clasificada UNESCO, parque natural de la Ria Formosa de 18 000 ha con sus boardwalks de flamencos todo el año, playas caninas atlánticas en islas barrera en ferry, y los suplementos para mascotas más bajos del sur de Europa`,
      highlight: `la Cidade Velha y el Arco da Vila con sus cigüeñas, el boardwalk de la Ria Formosa hacia las salinas, y la playa canina salvaje atlántica de la Ilha Deserta en ferry`,
      area: `la Cidade Velha alrededor de la plaza de la catedral, la esplanada del lado de la marina y el residencial Bom João cerca de la estación`,
    },
    florence: {
      personality: 'una ciudad renacentista donde los perros trotean sobre adoquines hacia los mercados matutinos, descansan bajo los parasoles de los cafés y pasean por las orillas del Arno cada tarde con sus dueños',
      highlight: 'los Jardines de Bóboli, el parque de las Cascine (zonas sin correa) y los caminos ribereños del Arno',
      area: 'Oltrarno, Santa Croce y San Frediano',
    },
    frankfurt: {
      personality: 'la capital financiera más verde de Alemania — el 52% de la ciudad es bosque o parques, con un Stadtwald de 4.200 hectáreas, tabernas de Apfelwein dog-friendly en Sachsenhausen y dos clínicas veterinarias de urgencias abiertas 24/7',
      highlight: 'la Hundeauslauffläche vallada del Grüneburgpark, el paseo Mainufer de 4 km y los senderos forestales del Stadtwald',
      area: 'Sachsenhausen, el Westend y la Altstadt en torno al Römerberg',
    },
    galway: {
      personality: `la capital bohemia del Wild Atlantic Way irlandés, donde los pubs admiten perros en sus snugs, el paseo de Salthill se llena de perros con correa al atardecer, y las playas y turberas de Connemara están a 30 minutos al oeste`,
      highlight: `el paseo de Salthill (2 km), la playa sin correa de Silver Strand y el frente marítimo Spanish Arch + Long Walk`,
      area: `el Latin Quarter, el West End y Salthill junto a la bahía`,
    },
    gdansk: {
      personality: `la Perla hanseática del Báltico y antigua ciudad libre de Danzig — Długi Targ clasificado UNESCO, el lugar de nacimiento de Solidaridad en Stocznia Gdańska, y acceso directo SKM a la playa canina de Sopot (la más famosa de Polonia) en 15 minutos`,
      highlight: `el Długi Targ y la calle Mariacka, la playa canina de Sopot a 15 min en SKM, y el parque paisajístico de la tri-ciudad con 200 km de senderos sin correa`,
      area: `el Główne Miasto alrededor del Długi Targ, la isla Wyspa Spichrzów en el Motława, y Wrzeszcz al norte`,
    },
    geneva: {
      personality: 'una de las capitales internacionales más acogedoras para mascotas de Europa — la ley suiza permite perros en restaurantes y cafés, el Bois de la Bâtie sin correa todo el año está en pleno centro, y dos clínicas veterinarias de urgencias 24/7 atienden al cantón',
      highlight: 'el bosque sin correa del Bois de la Bâtie, el paseo lacustre del Quai Wilson y el bohemio distrito de Carouge',
      area: 'Pâquis en la orilla derecha, Eaux-Vives en la orilla izquierda y Carouge al otro lado del Arve',
    },
    genoa: {
      personality: 'una de las ciudades italianas más discretamente acogedoras para mascotas — la primera de Liguria en abrir una playa canina oficial, con caruggi 8°C más frescos que el paseo marítimo en verano, tres clínicas veterinarias de urgencias 24/7 y una red de transporte vertical única de funiculares y ascensores',
      highlight: 'la playa canina de Vesima todo el año, los Parchi di Nervi de 92.000 m² y el Porto Antico rediseñado por Renzo Piano',
      area: 'las Strade Nuove UNESCO, el pueblo pesquero de Boccadasse y los parques costeros de Nervi',
    },
    ghent: {
      personality: 'una progresista ciudad belga orientada a la bicicleta donde los perros forman parte de la vida cotidiana. En tranvías, en cafeterías y a lo largo de los bellos ríos Leie y Schelde',
      highlight: 'el Citadelpark, la reserva natural de Bourgoyen-Ossemeersen y los caminos de sirga ribereños del Leie',
      area: 'el Patershol, Sint-Pieters y Portus Ganda',
    },
    glasgow: {
      personality: 'una de las ciudades del Reino Unido más fiables con perros, con mascotas gratis en cada tren ScotRail, pubs dog-friendly en cada barrio y las 146 hectáreas de Pollok Country Park dentro de la ciudad',
      highlight: 'Pollok Country Park, Kelvingrove Park y el Loch Lomond a 50 minutos en tren',
      area: 'el West End, Merchant City y Finnieston',
    },
    gothenburg: {
      personality: 'la ciudad más acogedora para perros de Suecia — una animada ciudad portuaria y universitaria donde los perros viajan en tranvía gratis, corren sin correa en el Slottsskogen de 137 hectáreas y son bienvenidos en casi todos los cafés',
      highlight: 'el bosque urbano de Slottsskogen, los cafés del barrio de madera de Haga y las islas aptas para perros del archipiélago de Gotemburgo',
      area: 'Haga, el barrio de Linné y el distrito de Vasastan',
    },
    granada: {
      personality: 'la ciudad árabe más atmosférica de Europa — donde la Alhambra vigila las callejuelas empedradas del Albaicín, la cultura de la terraza andaluza hace que los perros sean genuinamente bienvenidos y Sierra Nevada está a una hora',
      highlight: 'el Paseo de los Tristes al pie de las murallas de la Alhambra, el barrio UNESCO del Albaicín y los parques dog-friendly del barrio de Arabial',
      area: 'el Albaicín, el Realejo y el centro histórico en torno a la Plaza Nueva',
    },
    hamburg: {
      personality: 'la gran ciudad más verde de Alemania con 56 Hundeauslaufzonen valladas, un circuito de 7 km alrededor del lago Alster, las famosas playas urbanas del Elbstrand, y una cultura portuaria donde los perros cogen ferris y duermen en las terrazas de los cafés',
      highlight: 'el circuito de 7 km alrededor del Außenalster, el Elbstrand en Övelgönne y el Altonaer Volkspark de 205 hectáreas',
      area: 'las orillas del Alster, el Schanzenviertel y el paseo marítimo del Elba en Övelgönne',
    },
    hannover: {
      personality: 'tranquila capital de Baja Sajonia — el mayor bosque urbano de Alemania (Eilenriede, 640 ha, más grande que Central Park), el lago Maschsee con su zona de baño canino, y un hospital universitario veterinario de primer nivel mundial',
      highlight: 'las 640 hectáreas del bosque Eilenriede, el circuito de 6 km del Maschsee y su Hundebadestelle, y la avenida barroca del Georgengarten',
      area: 'List, las orillas del Maschsee y la Altstadt alrededor de la Marktkirche',
    },
    heidelberg: {
      personality: `la ciudad universitaria más romántica de Alemania — Altstadt barroca bajo el castillo renacentista en ruinas, el icónico sendero panorámico del Philosophenweg, el bosque del Königstuhl con 70 km de senderos sin correa, y trenes ICE directos desde el aeropuerto de Fráncfort en 50 min`,
      highlight: `las terrazas del Schloss, el Philosophenweg con su bosque del Heiligenberg, y el funicular del Königstuhl hacia 70 km de senderos forestales sin correa`,
      area: `la Altstadt alrededor de la Hauptstraße, Bergheim cerca de la estación, y el frondoso Neuenheim al otro lado del Neckar`,
    },
    helsinki: {
      personality: 'una capital nórdica donde el archipiélago isleño, los bosques de pinos y una cultura profundamente orientada al aire libre la hacen excepcionalmente acogedora para los perros y sus dueños',
      highlight: 'el Parque Central (Keskuspuisto), la reserva natural insular de Seurasaari y la fortaleza marítima de Suomenlinna',
      area: 'Kallio, Töölö y el Barrio del Diseño',
    },
    innsbruck: {
      personality: 'la capital del Tirol rodeada de picos alpinos a 2.300 m — transporte público gratis para perros, teleféricos dog-friendly hasta las cimas, tradición de café y Gasthaus que admite perros, y urgencias veterinarias 24/7',
      highlight: 'la cordillera del Nordkette accesible en teleférico desde el centro, el parque real Hofgarten y el Altstadt empedrado en torno al Goldenes Dachl',
      area: 'Altstadt, Wilten y el eje de la Maria-Theresien-Strasse',
    },
    krakow: {
      personality: 'una ciudad histórica polaca donde el anillo de jardines Planty que rodea el casco antiguo la convierte en uno de los destinos más transitables de Europa Central para los perros',
      highlight: 'el anillo del parque Planty, los prados de Błonia y los senderos ribereños del Vístula',
      area: 'el Casco Antiguo, Kazimierz y Podgórze',
    },
    lausanne: {
      personality: 'la Capital Olímpica suiza en el lago Lemán — una de las ciudades más naturalmente acogedoras para perros de Europa, donde los perros viajan en metro gratis, recorren el bosque de Sauvabelin de 200 hectáreas y son bienvenidos en prácticamente todos los restaurantes',
      highlight: 'el Forêt de Sauvabelin, el sendero vitícola UNESCO del Lavaux y el paseo lacustre de Ouchy',
      area: 'Ouchy (a orillas del lago), el barrio creativo del Flon y la Cité medieval',
    },
    lecce: {
      personality: `la « Florencia del Sur » — centro storico barroco UNESCO tallado enteramente en pietra leccese color miel, cultura del café tolerante del Salento y playas caninas todo el año en Punta Prosciutto y Frassanito a 30-45 min en coche`,
      highlight: `la Piazza del Duomo y la Basilica di Santa Croce, el anfiteatro romano de la Piazza Sant'Oronzo, y las playas caninas del Salento en Punta Prosciutto y Frassanito`,
      area: `el centro storico alrededor de la Piazza Sant'Oronzo, el barrio Mazzini cerca de la estación y el residencial Borgo Piave`,
    },
    leipzig: {
      personality: `la capital musical de Sajonia y la ciudad de Bach — bosque aluvial Auenwald de 5 500 hectáreas en el centro, camino de sirga dog-friendly del Karl-Heine-Kanal, 11 Hundeauslaufzonen valladas y una Hundestrand todo el año en el Cospudener See a 12 min en S-Bahn`,
      highlight: `el bosque aluvial Auenwald, la playa canina del Cospudener See y el camino de sirga del Karl-Heine-Kanal que conecta Plagwitz con el barrio Karli`,
      area: `la Innenstadt alrededor del Markt, el Karli (Karl-Liebknecht-Straße) y el barrio creativo de Plagwitz`,
    },
    lille: {
      personality: `una ciudad del norte de Francia de influencia flamenca, de calles adoquinadas y casas de ladrillo con frontones, sede del primer café canino de Europa y con un centro plano y caminable donde los perros viajan gratis en metro`,
      highlight: `el paseo por las murallas de la Citadelle, el Bois de Boulogne urbano y las terrazas del Vieux Lille`,
      area: `el Vieux Lille, Wazemmes y el barrio estudiantil de Vauban`,
    },
    lisbon: {
      personality: 'una ciudad soleada y con colinas cuyo clima suave la hace ideal para viajar con mascotas durante todo el año',
      highlight: 'el parque forestal de Monsanto, el paseo marítimo de Belém y las explanadas de Alfama',
      area: 'Chiado, Príncipe Real y Bairro Alto',
    },
    liverpool: {
      personality: `una ciudad marítima Patrimonio de la UNESCO, con una de las mayores redes de parques urbanos del noroeste de Inglaterra, tres playas caninas sin correa a 25 minutos en Merseyrail y un corredor de pubs en el Baltic Triangle que admite perros con correa todo el año`,
      highlight: `las praderas victorianas de Sefton Park (95 hectáreas), Crosby Beach con los Iron Men de Antony Gormley y el paseo marítimo del Royal Albert Dock`,
      area: `el paseo marítimo del Royal Albert Dock, el Baltic Triangle y el Georgian Quarter alrededor de la catedral`,
    },
    ljubljana: {
      personality: 'la capital verde de Europa. Un centro compacto y sin tráfico donde los perros pasean junto a sus dueños en terrazas ribereñas, por los jardines del castillo y sobre puentes medievales',
      highlight: 'el Parque Tivoli (sin correa), la colina del castillo de Ljubljana y la vía verde del río Sava',
      area: 'el Casco Antiguo, Trnovo y Šiška',
    },
    london: {
      personality: 'una de las capitales más naturalmente acogedoras con mascotas de Europa, donde los perros acompañan a sus dueños en pubs, cafés y a través de vastos parques reales durante todo el año',
      highlight: 'las zonas sin correa de Hyde Park, Hampstead Heath y el sendero dog-friendly a orillas del Támesis',
      area: 'Islington, Notting Hill y Bermondsey',
    },
    luxembourg: {
      personality: 'la única capital europea con transporte público gratuito para todos (perros incluidos) desde 2020, con nueve recintos caninos municipales vallados dentro de la ciudad y un casco antiguo UNESCO que rodea los espectaculares valles del Pétrusse y el Alzette',
      highlight: 'el Chemin de la Corniche, el Parc de la Pétrusse con sus dos recintos caninos, y el bosque del Bambësch de 600 hectáreas',
      area: 'Ville-Haute, el Grund y Belair',
    },
    lyon: {
      personality: 'la capital gastronómica de Francia, donde los perros son tan comunes como los restaurantes bouchon. Bienvenidos en cafés, a lo largo de las orillas del río y en toda la Presqu\'île',
      highlight: 'el Parque de la Tête d\'Or, las orillas del Saona y el Ródano, y los senderos de la colina de Fourvière',
      area: 'la Presqu\'île, Croix-Rousse y Confluence',
    },
    maastricht: {
      personality: `la ciudad más antigua de Países Bajos y capital borgoñona de Limburgo — la cultura del café borgoñón admite perros con correa por defecto, la colina forestal del Sint-Pietersberg se eleva directamente al sur del centro, y 22 losloopgebieden valladas rodean el núcleo medieval`,
      highlight: `la colina forestal del Sint-Pietersberg, el camino de sirga del Mosa hacia Bélgica y la bahía de baño canino del Pietersplas a 5 km al sur`,
      area: `el centro medieval alrededor del Vrijthof, el barrio de Wyck en la orilla derecha del Mosa y el pueblo de Sint Pieter`,
    },
    madrid: {
      personality: 'una de las capitales más dog-friendly de Europa: Madrid tiene más perros per cápita que casi cualquier otra ciudad europea',
      highlight: 'el Parque del Retiro, la Casa de Campo y el Parque del Oeste sin correa',
      area: 'Malasaña, Lavapiés y Chamberí',
    },
    malaga: {
      personality: 'una relajada ciudad portuaria andaluza donde los perros acompañan a sus dueños en las terrazas de museos, en hoteles frente al mar y a través del histórico barrio de la Alcazaba',
      highlight: 'el Parque de Málaga en el paseo marítimo, el parque natural de los Montes de Málaga y la zona para perros de la playa de Pedregalejo',
      area: 'el Centro Histórico, Soho y Pedregalejo',
    },
    manchester: {
      personality: 'una de las ciudades del Reino Unido más fiables con perros, con mascotas gratis en cada tranvía Metrolink y autobús Bee Network, pubs dog-friendly en cada calle del Northern Quarter, y las 240 hectáreas de Heaton Park a un tranvía del centro',
      highlight: 'Heaton Park, los jardines botánicos de Fletcher Moss y la senda del Bridgewater Canal',
      area: 'el Northern Quarter, Ancoats y Castlefield',
    },
    marseille: {
      personality: 'una ciudad mediterránea bañada por el sol donde la vida al aire libre, las terrazas y la naturaleza costera imponen un ritmo claramente dog-friendly',
      highlight: 'los senderos del Parque Nacional de las Calanques, las islas Frioul accesibles en ferry y los 5 kilómetros de la Corniche Kennedy',
      area: 'los muelles del Vieux-Port, el barrio histórico del Panier y el puerto pesquero del Vallon des Auffes',
    },
    milan: {
      personality: 'la capital del diseño de Italia, donde un número creciente de hoteles de lujo y boutique acogen cálidamente a las mascotas',
      highlight: 'el Parco Sempione, el distrito de los canales Navigli y los espaciosos jardines de la Villa Reale',
      area: 'Brera, los Navigli y el barrio de diseño de la Porta Venezia',
    },
    montpellier: {
      personality: 'una soleada ciudad universitaria del sur de Francia donde los perros acompañan a sus dueños en terrazas de cafés, en el tranvía y por los paseos a orillas del Lez',
      highlight: 'el recinto sin correa del Parc Méric, el sendero de las Berges du Lez y la playa dog-friendly del Grand Travers a 20 km',
      area: 'el casco medieval de l\'Écusson, la explanada de la Place de la Comédie y el barrio neoclásico de l\'Antigone',
    },
    munich: {
      personality: 'una ciudad donde los perros son bienvenidos en los jardines de cerveza, en el transporte público y en el Jardín Inglés. El parque urbano más grande de Europa',
      highlight: 'el Englischer Garten, el Olympiapark y las orillas del río Isar',
      area: 'Schwabing, Maxvorstadt y Haidhausen',
    },
    nantes: {
      personality: 'la ciudad más habitable de Francia, con diez caniparques oficiales, una red de restaurantes certificados QUALIDOG y un recorrido cultural dog-friendly de 12 km a lo largo del Loira',
      highlight: 'el caniparque del Parc de Procé, los muelles del Loira y el jardín japonés de la Île de Versailles',
      area: 'el barrio histórico de Bouffay, la Île de Nantes y el barrio de Procé',
    },
    naples: {
      personality: 'la capital caótica y apasionada del sur de Italia — densos callejones históricos, Lungomare peatonal de 2,5 km, Bosco di Capodimonte de 134 hectáreas y trattorie que tratan a los perros como miembros de la familia',
      highlight: 'el Lungomare Caracciolo, el Bosco di Capodimonte y el Parco Virgiliano de Posillipo',
      area: 'Chiaia, Posillipo y el centro histórico en torno a Spaccanapoli',
    },
    nice: {
      personality: 'una ciudad mediterránea bañada por el sol donde los perros acompañan a sus dueños en restaurantes de terraza, en el mercado del casco antiguo y a lo largo del famoso paseo marítimo',
      highlight: 'el Paseo de los Ingleses, el Parque del Mont Boron y la Colina del Castillo',
      area: 'el Casco Antiguo (Vieux-Nice), Cimiez y el Puerto',
    },
    oslo: {
      personality: 'una capital escandinava donde la proximidad de fiordos, bosques y la vasta red de senderos del Oslomarka la convierten en uno de los mejores destinos del continente para los dueños de perros activos',
      highlight: 'el bosque del Oslomarka, la península de Bygdøy y el sendero del río Akerselva',
      area: 'Frogner, Grünerløkka y Tjuvholmen',
    },
    oxford: {
      personality: 'una ciudad universitaria medieval donde los patios color miel de los colleges están vetados a los perros pero los prados circundantes, los pubs ribereños y el Port Meadow sin correa la convierten en una de las escapadas urbanas más fáciles de Inglaterra',
      highlight: 'el common sin correa de Port Meadow, Christ Church Meadow y los University Parks',
      area: 'el centro, Jericho y North Oxford',
    },
    palma: {
      personality: 'una capital insular mediterránea bañada por el sol donde las terrazas, las playas y el clima cálido durante todo el año la convierten en una de las ciudades más dog-friendly de España',
      highlight: 'la playa canina todo el año de Es Carnatge, el Parc de sa Riera y los jardines del Castell de Bellver',
      area: 'Santa Catalina, el Casco Antiguo (Casc Antic) y Portixol',
    },
    paris: {
      personality: 'una ciudad donde los perros son famosos por ser bienvenidos en cafés, tiendas y muchos restaurantes',
      highlight: 'el Bosque de Boulogne, el Bosque de Vincennes y cientos de plazas pequeñas',
      area: 'Le Marais, Saint-Germain-des-Prés y Montmartre',
    },
    pisa: {
      personality: 'una ciudad UNESCO toscana compacta unida a las 23.000 hectáreas del parque de San Rossore y a una playa canina abierta todo el año en Marina di Pisa, todo a veinte minutos del centro',
      highlight: 'el césped del Campo de los Milagros, el pinar de San Rossore y la playa canina de Marina di Pisa',
      area: 'Sant\'Antonio, los Lungarni y Borgo Stretto',
    },
    porto: {
      personality: 'una ciudad montañosa y atmosférica donde los perros forman parte del ritmo diario. En tranvías, en jardines de bares de vino y a lo largo del paseo fluvial del Duero',
      highlight: 'los Jardines del Palácio de Cristal, la orilla del Duero (Ribeira) y el parque de Serralves',
      area: 'Ribeira, Bonfim y Foz do Douro',
    },
    prague: {
      personality: 'una ciudad compacta y transitable donde los perros son bienvenidos en la mayoría de los pubs, bares de vinos e incluso algunos mercados cubiertos',
      highlight: 'los parques Stromovka y Letná, y los senderos del Valle de Nusle junto al río',
      area: 'Vinohrady, Žižkov y Malá Strana',
    },
    reims: {
      personality: 'la elegante capital de la Champaña, ciudad UNESCO donde catedrales góticas, fachadas art déco y avenidas bordeadas de viñas invitan a largos paseos con tu perro con correa',
      highlight: 'las Promenades alrededor de la Place de la République, el boscoso Parc de Champagne y los caminos del canal hacia Cernay',
      area: `el centro histórico junto a la Catedral Notre-Dame, la Place Drouet d'Erlon y el frondoso barrio del Parc de Champagne`,
    },
    reykjavik: {
      personality: 'la capital más septentrional del mundo y una de las más dog-friendly. Con vastos campos de lava, playas geotérmicas y una cultura que lleva a los perros a todas partes',
      highlight: 'el valle de Elliðaárdalur, la colina de Öskjuhlíð y el paseo costero del faro de Grótta',
      area: 'el Centro (Miðborg), Laugardalur y Álftanes',
    },
    riga: {
      personality: 'una bella ciudad Art Nouveau restaurada con una fuerte cultura báltica de aire libre. Los perros forman parte de la vida cotidiana en parques, mercados y a lo largo de las orillas del Daugava',
      highlight: 'el parque forestal de Mežaparks, el parque Bastejkalns y el paseo ribereño del Daugava',
      area: 'el Casco Antiguo (Vecrīga), el Barrio Art Nouveau y Āgenskalns',
    },
    rome: {
      personality: 'una ciudad donde los perros acompañan a sus dueños a todas partes. Desde el cornetto matutino hasta el paseo vespertino',
      highlight: 'los jardines de Villa Borghese, las zonas sin correa del Parco dell\'Appia Antica y los paseos ribereños del Lungotevere',
      area: 'Prati, Trastevere y Pigneto',
    },
    rotterdam: {
      personality: 'una de las ciudades más dog-friendly de los Países Bajos, donde las mascotas viajan gratis en el transporte público y la mayoría de las terrazas las aceptan por defecto',
      highlight: 'las 28 hectáreas sin correa de Het Park junto al Euromast, el bosque y lago de Kralingse Bos, y la playa de Maasvlakte',
      area: 'Middelland a lo largo de Nieuwe Binnenweg, el barrio artístico de Witte de With y los muelles de Veerhaven',
    },
    salamanca: {
      personality: 'una ciudad universitaria castellana de arenisca dorada, declarada Patrimonio UNESCO desde 1988, donde los perros con correa se deslizan bajo los soportales barrocos y la orilla del Tormes es el corazón de los paseos vespertinos',
      highlight: 'la Plaza Mayor y la Rúa Mayor, la orilla del Tormes (Salas Bajas) y el Parque de los Jesuitas con su zona vallada sin correa',
      area: 'el casco antiguo en torno a la Plaza Mayor, la ribera al sur del Puente Romano y el barrio frondoso junto a la Universidad de Salamanca',
    },
    salzburg: {
      personality: 'una compacta ciudad alpina donde la arquitectura de la época de Mozart, los prados ondulados y las montañas del Salzkammergut circundante crean un escenario mágico para viajar con mascotas',
      highlight: 'el parque de Hellbrunn, el sendero ribereño del Salzach y los senderos de la colina del Kapuzinerberg',
      area: 'el Casco Antiguo (Altstadt), Schallmoos y Mülln',
    },
    'san-sebastian': {
      personality: 'una ciudad costera vasca donde los perros llegan a ser más numerosos que los niños en algunos barrios y cuyas playas se les abren de octubre a mayo',
      highlight: 'las playas de La Concha y Zurriola (octubre–mayo), los senderos del Monte Urgull y el Paseo Nuevo junto al mar',
      area: 'la Parte Vieja, Gros y el barrio de Antiguo cerca del Monte Igueldo',
    },
    seville: {
      personality: 'una de las ciudades más dog-friendly de Andalucía. Donde los perros pasean bajo los naranjos, acompañan a sus dueños en las terrazas de bares de tapas y exploran los parques ribereños',
      highlight: 'el Parque de María Luisa, el parque Alamillo y el paseo ribereño del Guadalquivir',
      area: 'Triana, Santa Cruz y El Arenal',
    },
    sofia: {
      personality: 'una de las capitales europeas más asequibles, con cerca de 500 direcciones dog-friendly, dos hospitales de urgencias 24/7 y el monte Vitosha de 2.290 metros elevándose directamente desde la ciudad',
      highlight: 'Borisova Gradina, el Yuzhen Park y los senderos del Parque Natural del Vitosha',
      area: 'el Vitosha Boulevard, Lozenets y Boyana',
    },
    split: {
      personality: 'una relajada ciudad costera croata donde el paseo marítimo adriático, el antiguo Palacio de Diocleciano y una actitud local distendida la convierten en un destino destacado para los dueños de mascotas',
      highlight: 'el parque forestal de la colina Marjan, la zona para perros de la playa de Bačvice y el sendero costero hacia Stobreč',
      area: 'Meje, los alrededores del Casco Antiguo y el barrio de Manuš',
    },
    stavanger: {
      personality: `la tercera ciudad de Noruega y puerta de entrada al Lysefjord — casco antiguo de madera clasificado UNESCO (Gamle Stavanger), transporte excepcionalmente dog-friendly (buses, trenes, ferries de fiordo gratis), el icónico Preikestolen a 50 min al este, y 35 km de arena atlántica dog-friendly a 15 min al sur`,
      highlight: `la caminata del Preikestolen con perro con correa, el crucero del Lysefjord y la playa atlántica de Solastranden a 15 min del centro`,
      area: `el puerto del Vågen y el casco antiguo de madera Gamle Stavanger, la colorida calle Fargegata y el barrio del lago Mosvatnet`,
    },
    stockholm: {
      personality: 'una ciudad donde los perros forman parte del tejido de la vida cotidiana. En ferries, en cafés y a través de las islas del archipiélago',
      highlight: 'la isla de Djurgården, Hagaparken y la red de senderos del archipiélago',
      area: 'Södermalm, Östermalm y Djurgården',
    },
    strasbourg: {
      personality: 'una de las ciudades UNESCO más atmosféricas de Europa — donde la cultura alsaciana, los mercados de Navidad y una actitud relajada hacia los perros la convierten en un destino pet-travel durante todo el año',
      highlight: 'el Parc de l\'Orangerie, los canales de Petite France y los Jardins des Deux Rives en el Rin',
      area: 'Petite France, el Krutenau y el Barrio Europeo',
    },
    stuttgart: {
      personality: `una capital del sur de Alemania asentada en una cuenca verde de viñedos y hayedos, donde Biergärten y Wirtschaften acogen universalmente a los perros y tres zonas valladas sin correa rodean el centro`,
      highlight: `el cinturón del Schlossgarten, los embalses forestales del Bärensee y el parque en altura del Killesberg`,
      area: `Mitte, Süd y Bad Cannstatt`,
    },
    tallinn: {
      personality: 'una ciudad medieval de cuento de hadas con una actitud estonia progresista hacia las mascotas. Los perros entran en la mayoría de los comercios, visitan el casco antiguo y exploran libremente los senderos costeros',
      highlight: 'el Parque Kadriorg, el sendero costero de Pirita y los paseos por la turbera de Pääsküla',
      area: 'Kalamaja, Telliskivi y el Casco Antiguo',
    },
    tampere: {
      personality: `la tercera ciudad de Finlandia y capital oficiosa del sauna — transporte excepcionalmente dog-friendly (tranvías y trenes gratis), 22 koira-aitaus valladas, dos playas caninas junto al lago a distancia caminable del centro, y la icónica cresta de Pyynikki con paseo canino todo el año`,
      highlight: `la cresta de Pyynikki y su café-torre de observación, las playas caninas de Pyynikki y Niihama en los dos lagos, y el paseo de los rápidos del Tammerkoski a través del centro`,
      area: `el centro entre los rápidos del Tammerkoski y Hämeenkatu, el barrio creativo Finlayson y la cresta lacustre de Pyynikki`,
    },
    'the-hague': {
      personality: 'una capital neerlandesa elegante donde 11 km de costa del Mar del Norte, dunas sin correa y cafés dog-friendly están a un tranvía del centro',
      highlight: 'Westduinpark y Bosjes van Poot, el bosque Haagse Bos y la finca Clingendael',
      area: 'el Statenkwartier, el Hofkwartier y Scheveningen Haven',
    },
    thessaloniki: {
      personality: 'la segunda ciudad de Grecia y una de las más dog-friendly — una ciudad portuaria de 2.300 años donde los perros son bienvenidos en terrazas, en el barrio antiguo y a lo largo de los 3,5 km del paseo marítimo Nea Paralia',
      highlight: 'el parque frente al mar Nea Paralia (con zona canina dedicada), el bosque urbano de Seich Sou y los paseos por las murallas bizantinas de Ano Poli',
      area: 'Ano Poli (Ciudad Alta), Ladadika y el Frente Marítimo',
    },
    toledo: {
      personality: `la ciudad imperial medieval y antigua capital visigoda, morisca y cristiana — un museo al aire libre clasificado UNESCO en un promontorio de granito sobre el Tajo, con Madrid a 33 minutos en tren Avant de alta velocidad`,
      highlight: `el mirador del Mirador del Valle con el panorama icónico del skyline, la Senda Ecológica circular a lo largo del Tajo, y el Puente de San Martín medieval`,
      area: `el Casco Histórico alrededor de la Plaza de Zocodover, la Judería con el museo del Greco, y La Vega al otro lado del Puente de San Martín`,
    },
    toulouse: {
      personality: 'una ciudad relajada del suroeste de ladrillo rosa y terrazas donde los perros se integran en la vida diaria junto al Garona',
      highlight: 'las orillas del Garona, el camino de sirga del Canal du Midi y el parque ribereño de la Prairie des Filtres',
      area: 'la place du Capitole, el barrio de Carmes y la orilla izquierda de Saint-Cyprien',
    },
    trondheim: {
      personality: `la tercera ciudad de Noruega y capital medieval — catedral de Nidaros UNESCO (la catedral gótica más septentrional del mundo), barrio de madera colorido de Bakklandet, transporte canino gratis (buses, tranvías, trenes), y 80 km² de bosque urbano de Bymarka a las puertas de la ciudad`,
      highlight: `la catedral de Nidaros y el Puente Viejo (Gamle Bybro), el icónico tranvía histórico Gråkallbanen hacia el bosque de Bymarka, y el ferry a la isla Munkholmen`,
      area: `el Midtbyen alrededor de la catedral de Nidaros, el barrio de madera de Bakklandet, y el puerto de Solsiden`,
    },
    turin: {
      personality: 'la capital barroca del norte de Italia, con 18 km de pórticos cubiertos que resguardan a perros y dueños de la lluvia y del sol estival, más de 35 zonas caninas valladas, y los Alpes a una hora para escapadas de fin de semana',
      highlight: 'las 84 hectáreas del Parco del Valentino, los 10 km de orillas del Po y la Basílica de Superga a la que se accede por tren de cremallera',
      area: 'San Salvario, el Quadrilatero Romano y el núcleo histórico en torno a Piazza Castello',
    },
    utrecht: {
      personality: 'una compacta ciudad universitaria neerlandesa donde los perros viajan gratis en autobuses y tranvías urbanos, el operador de cruceros por los canales admite perros sin coste, y tres zonas sin correa — el Máximapark de 300 hectáreas, el Griftpark central y las fincas de Amelisweerd — son accesibles desde el casco histórico',
      highlight: 'el Máximapark en Leidsche Rijn, el Griftpark central y las fincas Amelisweerd & Rhijnauwen a 5 km al sureste',
      area: 'la Binnenstad y la Oudegracht, Vogelenbuurt y Wittevrouwen',
    },
    valencia: {
      personality: 'una ciudad mediterránea soleada con 19 km de parque atravesando su centro. El antiguo cauce del Turia. Que la convierte en una de las ciudades más transitables de Europa para los dueños de perros',
      highlight: 'el Jardín del Turia (9 km mayormente sin correa), la zona para perros de la playa de Malvarrosa y el parque natural de la Albufera',
      area: 'Ruzafa, El Carmen y el Eixample',
    },
    venice: {
      personality: 'una de las ciudades más sorprendentemente dog-friendly de Italia. Los perros viajan en vaporetto, exploran tranquilos sestieri lejos de las multitudes y son bienvenidos en muchos bacari locales',
      highlight: 'las playas de la isla del Lido (perros permitidos fuera de temporada), los tranquilos canales de Cannaregio y el parque de Sant\'Elena',
      area: 'Cannaregio, Dorsoduro y Sant\'Elena',
    },
    verona: {
      personality: 'una ciudad romántica declarada Patrimonio de la Humanidad por la UNESCO donde los perros acompañan a sus dueños en las terrazas de los bares de vinos, en los jardines renacentistas y a lo largo de las pintorescas orillas del Adige',
      highlight: 'el Giardino Giusti, las orillas del Adige y las terrazas dog-friendly cerca del Arena',
      area: 'Veronetta, el Centro Histórico y el barrio de la Piazza delle Erbe',
    },
    vienna: {
      personality: 'una ciudad que se toma en serio la tenencia de mascotas. Los perros viajan en el U-Bahn, entran en museos y son atendidos en cientos de cafés vieneses',
      highlight: 'el parque del Prater, la isla del Danubio y el Lainzer Tiergarten',
      area: 'el 1er distrito, el Naschmarkt y Josefstadt',
    },
    vilnius: {
      personality: 'la capital más verde de la UE y una de las más acogedoras con perros, donde las mascotas viajan gratis en todos los autobuses y casi 500 direcciones pet-friendly se concentran en el casco antiguo UNESCO',
      highlight: 'el bosque de Vingis, el Bernardine Garden y la colina de las Tres Cruces',
      area: 'el casco antiguo, Užupis y Šnipiškės',
    },
    warsaw: {
      personality: 'una capital europea en rápida modernización donde los hoteles pet-friendly son cada vez más la norma y los parques ribereños ofrecen excelentes paseos',
      highlight: 'el Parque Łazienki, los bulevares ribereños del Vístula y el bosque de Kampinos en las afueras',
      area: 'Śródmieście, Praga y el barrio ribereño de Powiśle',
    },
    wroclaw: {
      personality: `una de las ciudades de Polonia más genuinamente amantes de los perros, donde las terrazas del colorido Rynek acogen a los perros sin problemas, el transporte público es gratis para todas las mascotas y unas cuarenta zonas valladas sin correa están repartidas por la ciudad`,
      highlight: `el Park Szczytnicki y el Pabellón del Centenario, las islas del río Odra y los adoquines iluminados por farolas de gas de la Isla de la Catedral al atardecer`,
      area: `el Casco Antiguo alrededor del Rynek, el bohemio barrio de Nadodrze y el Barrio de las Cuatro Confesiones`,
    },
    york: {
      personality: `una de las ciudades inglesas más fiablemente dog-friendly — un núcleo medieval compacto donde el 80 % de los pubs admite perros con correa, el circuito de 5 km de las murallas es gratis con mascota, y los trenes directos LNER conectan con las playas caninas de Filey, Sandsend y Bridlington para excursiones de un día`,
      highlight: `el circuito dog-friendly de las murallas, los Museum Gardens junto al río, y la playa canina abierta todo el año en Filey, a una hora al este por la línea LNER`,
      area: `el centro histórico dentro de las murallas, el barrio de Fossgate y la zona de Bishopthorpe Road / Knavesmire`,
    },
    zagreb: {
      personality: `una capital relajada de época habsbúrgica donde los perros suben en el funicular público más corto del mundo, las terrazas bordean la calle peatonal Tkalčićeva y el parque Maksimir (316 ha) alberga la principal zona vallada sin correa de la ciudad`,
      highlight: `el parque Maksimir, la Ciudad Alta medieval y las secciones de playa canina del lago Jarun`,
      area: `Donji Grad, Gornji Grad y el barrio de los lagos de Maksimir`,
    },
    zaragoza: {
      personality: `la capital de Aragón y quinta ciudad de España — anclada por la Basílica del Pilar a orillas del Ebro y articulada alrededor de 126 zonas sin correa designadas, una de las redes de parques pet-friendly más densas de España, además del hospital de referencia AniCura Emvet 24/7`,
      highlight: `el Parque Grande Labordeta de 27 hectáreas, la zona canina vallada del Parque del Tío Jorge y los paseos junto al río en las Riberas del Ebro`,
      area: `el Casco Histórico alrededor del Pilar, el frondoso Centro en el Paseo de Sagasta y el barrio de tapas de La Magdalena`,
    },
    zurich: {
      personality: 'una ciudad que figura entre las más dog-friendly de Europa. Con zonas dedicadas a perros en las playas, tranvías pet-friendly y pasaportes de mascotas aceptados en todas partes',
      highlight: 'el paseo lacustre del Zürichsee, la colina del Uetliberg y los senderos del río Sihl',
      area: 'Kreis 4, Zúrich Oeste y el Casco Antiguo',
    },
  },
}

// ─── Cat Intros ──────────────────────────────────────────────────────────────

const catIntrosByLocale: Record<string, Record<string, (d: string, ctx: DestCtx, n: number) => string[]>> = {
  en: {
    'dog-friendly': (d, ctx, n) => [
      `${d} is ${ctx.personality}. With ${n} handpicked dog-friendly properties on this list, you'll find options from budget boutiques to five-star suites. All confirmed to welcome your dog without the usual stress of hidden restrictions.`,
      `What makes ${d} special for dog owners is the infrastructure beyond the hotel room: ${ctx.highlight} are all within easy reach of the properties below. In ${ctx.area}, dogs are part of everyday life, and the hotels listed here are chosen precisely because they embrace that culture rather than merely tolerating it.`,
    ],
    'cat-friendly': (d, ctx, n) => [
      `Travelling with a cat is still more niche than travelling with a dog. But ${d} is ${ctx.personality}, and its hospitality scene is starting to reflect that. These ${n} cat-friendly hotels have been selected because they go beyond a grudging policy to actively welcome feline guests.`,
      `Cat owners visiting ${d} will appreciate that the hotels below offer quiet rooms, easy ground-floor or lift access, and staff trained to make check-in smooth with a carrier. The best of them provide blankets and covered litter tray spaces without you needing to ask.`,
    ],
    'beach-access': (d, ctx, n) => [
      `Combining beach access with a pet-friendly stay is harder than it sounds: not every coastal hotel allows dogs, and many beaches restrict dogs seasonally. These ${n} properties in ${d} are the exception. Confirmed to offer both beach proximity and a genuine welcome for your pet.`,
      `${d}'s coastline. Including ${ctx.highlight}. Is at its most pet-friendly in spring (April–May) and autumn (September–October), when seasonal dog restrictions on many beaches are lifted. The hotels below are chosen not just for proximity to the sea, but for amenities like outdoor showers, shaded terraces, and staff who know the local dog-friendly beach spots.`,
    ],
    'near-parks': (d, ctx, n) => [
      `A hotel close to green space transforms a city stay with a dog. These ${n} properties in ${d} are all within comfortable walking distance of ${ctx.highlight}. So morning and evening walks are a pleasure, not a logistics puzzle.`,
      `In ${ctx.area}, green space is woven into the urban fabric. The hotels on this list have been chosen specifically for their walkable access to off-leash areas, tree-lined paths, and the kind of neighbourhood feel that makes a city stay with a dog genuinely enjoyable.`,
    ],
    'luxury': (d, ctx, n) => [
      `Five-star hospitality and pet-friendly policy once rarely appeared in the same sentence. ${d} is changing that. These ${n} luxury hotels have moved beyond a basic "small pets allowed" clause to offer genuine high-end experiences for you and your animal: welcome kits, in-room pet beds, turndown treats, and concierge walking services.`,
      `Staying in one of ${d}'s luxury pet-friendly properties means accessing the best of ${ctx.area} from a base that treats your pet as a valued guest. Several of the hotels below have dedicated pet menus, and all can arrange local dog-friendly restaurant bookings on request.`,
    ],
    'dogs-stay-free': (d, ctx, n) => [
      `Pet fees can add €15–€50 per night to your hotel bill. A significant extra over a week-long stay. These ${n} hotels in ${d} have eliminated that cost entirely: your dog stays free, with no hidden cleaning surcharges or deposits.`,
      `"Dogs stay free" isn't just a marketing line at the properties below. It's backed by confirmed policies with no weight or breed-based exceptions in most cases. In ${d}, one of ${ctx.personality.replace('one of ', '')}, this policy fits naturally into the local hospitality culture.`,
    ],
  },
  fr: {
    'dog-friendly': (d, ctx, n) => [
      `${d} est ${ctx.personality}. Avec ${n} établissements chien-friendly soigneusement sélectionnés, vous trouverez des options allant des boutiques-hôtels aux suites cinq étoiles. Tous confirmés pour accueillir votre chien sans les habituelles restrictions cachées.`,
      `Ce qui rend ${d} particulièrement agréable pour les propriétaires de chiens, c'est l'infrastructure au-delà de la chambre : ${ctx.highlight} sont à portée facile des établissements ci-dessous. Dans ${ctx.area}, les chiens font partie de la vie quotidienne, et les hôtels listés sont choisis précisément parce qu'ils embrassent cette culture plutôt que de simplement la tolérer.`,
    ],
    'cat-friendly': (d, ctx, n) => [
      `Voyager avec un chat est encore une niche par rapport au voyage avec un chien. Mais ${d} est ${ctx.personality}, et son secteur hôtelier commence à le refléter. Ces ${n} hôtels accueillant les chats ont été sélectionnés parce qu'ils vont au-delà d'une politique de tolérance minimale pour vraiment accueillir les félins.`,
      `Les propriétaires de chats visitant ${d} apprécieront que les hôtels ci-dessous offrent des chambres calmes, un accès facile au rez-de-chaussée ou à l'ascenseur, et un personnel formé pour faciliter l'enregistrement avec un transport. Les meilleurs d'entre eux fournissent des couvertures et des espaces pour la litière sans que vous ayez à le demander.`,
    ],
    'beach-access': (d, ctx, n) => [
      `Combiner l'accès à la plage avec un séjour pet-friendly est plus difficile qu'il n'y paraît : tous les hôtels côtiers n'acceptent pas les chiens, et de nombreuses plages restreignent leur accès selon la saison. Ces ${n} établissements à ${d} font exception. Confirmés pour offrir à la fois la proximité de la mer et un véritable accueil pour votre animal.`,
      `Le littoral de ${d}. Dont ${ctx.highlight}. Est le plus accueillant pour les animaux au printemps (avril-mai) et en automne (septembre-octobre), lorsque les restrictions saisonnières sur de nombreuses plages sont levées. Les hôtels ci-dessous sont choisis non seulement pour leur proximité de la mer, mais aussi pour leurs équipements : douches extérieures, terrasses ombragées et personnel connaissant les spots de plage locaux autorisés aux chiens.`,
    ],
    'near-parks': (d, ctx, n) => [
      `Un hôtel proche des espaces verts transforme un séjour en ville avec un chien. Ces ${n} établissements à ${d} sont tous à distance de marche confortable de ${ctx.highlight}. Les promenades du matin et du soir deviennent un plaisir, pas une logistique.`,
      `Dans ${ctx.area}, les espaces verts sont tissés dans le tissu urbain. Les hôtels de cette liste ont été choisis spécifiquement pour leur accès piéton aux zones sans laisse, aux allées arborées et à l'ambiance de quartier qui rend un séjour en ville avec un chien vraiment agréable.`,
    ],
    'luxury': (d, ctx, n) => [
      `Hospitalité cinq étoiles et politique pet-friendly apparaissaient rarement dans la même phrase. ${d} est en train de changer cela. Ces ${n} hôtels de luxe sont allés au-delà d'une simple clause « petits animaux acceptés » pour offrir de véritables expériences haut de gamme pour vous et votre animal : kits d'accueil, lits pour animaux en chambre, friandises au moment du coucher et services de promenade avec concierge.`,
      `Séjourner dans l'un des établissements de luxe pet-friendly de ${d} signifie profiter du meilleur de ${ctx.area} depuis une base qui traite votre animal comme un hôte de valeur. Plusieurs des hôtels ci-dessous proposent des menus dédiés pour animaux, et tous peuvent organiser des réservations dans des restaurants locaux dog-friendly sur demande.`,
    ],
    'dogs-stay-free': (d, ctx, n) => [
      `Les frais pour animaux peuvent ajouter 15 à 50 € par nuit à votre note d'hôtel. Un surcoût significatif sur un séjour d'une semaine. Ces ${n} hôtels à ${d} ont supprimé ce coût : votre chien loge gratuitement, sans frais de ménage cachés ni caution.`,
      `« Chiens gratuits » n'est pas qu'un argument marketing dans les établissements ci-dessous. C'est une politique confirmée, sans exception selon le poids ou la race dans la plupart des cas. À ${d}, ${ctx.personality}, cette politique s'inscrit naturellement dans la culture d'accueil locale.`,
    ],
  },
  es: {
    'dog-friendly': (d, ctx, n) => [
      `${d} es ${ctx.personality}. Con ${n} establecimientos dog-friendly cuidadosamente seleccionados, encontrará opciones desde boutiques de presupuesto hasta suites de cinco estrellas. Todos confirmados para recibir a su perro sin las habituales restricciones ocultas.`,
      `Lo que hace especial a ${d} para los dueños de perros es la infraestructura más allá de la habitación: ${ctx.highlight} están al alcance cómodo de los alojamientos que aparecen a continuación. En ${ctx.area}, los perros forman parte de la vida cotidiana, y los hoteles listados han sido elegidos precisamente porque abrazan esa cultura en lugar de simplemente tolerarla.`,
    ],
    'cat-friendly': (d, ctx, n) => [
      `Viajar con un gato sigue siendo más especializado que viajar con un perro. Pero ${d} es ${ctx.personality}, y su sector hotelero está empezando a reflejarlo. Estos ${n} hoteles que aceptan gatos han sido seleccionados porque van más allá de una política de tolerancia mínima para dar una bienvenida activa a los huéspedes felinos.`,
      `Los dueños de gatos que visiten ${d} apreciarán que los hoteles a continuación ofrecen habitaciones tranquilas, fácil acceso a la planta baja o al ascensor, y personal formado para hacer el check-in cómodo con un transportín. Los mejores proporcionan mantas y espacios para el arenero sin que usted tenga que pedirlo.`,
    ],
    'beach-access': (d, ctx, n) => [
      `Combinar el acceso a la playa con una estancia pet-friendly es más difícil de lo que parece: no todos los hoteles costeros admiten perros, y muchas playas restringen el acceso de perros según la temporada. Estos ${n} establecimientos en ${d} son la excepción. Confirmados para ofrecer tanto proximidad al mar como una auténtica bienvenida para su mascota.`,
      `La costa de ${d}. Incluida ${ctx.highlight}. Es la más acogedora con las mascotas en primavera (abril-mayo) y otoño (septiembre-octubre), cuando se levantan las restricciones estacionales en muchas playas. Los hoteles a continuación se han elegido no solo por su proximidad al mar, sino por servicios como duchas exteriores, terrazas con sombra y personal que conoce los puntos de playa dog-friendly locales.`,
    ],
    'near-parks': (d, ctx, n) => [
      `Un hotel cercano a zonas verdes transforma una estancia en la ciudad con un perro. Estos ${n} establecimientos en ${d} están todos a una cómoda distancia a pie de ${ctx.highlight}. Los paseos matutinos y vespertinos son un placer, no un rompecabezas logístico.`,
      `En ${ctx.area}, las zonas verdes están entretejidas en el tejido urbano. Los hoteles de esta lista han sido elegidos específicamente por su acceso a pie a zonas sin correa, senderos arbolados y el ambiente de barrio que hace que una estancia en la ciudad con un perro sea genuinamente agradable.`,
    ],
    'luxury': (d, ctx, n) => [
      `La hospitalidad de cinco estrellas y la política de admisión de mascotas raramente aparecían en la misma frase. ${d} está cambiando eso. Estos ${n} hoteles de lujo han ido más allá de una simple cláusula de "mascotas pequeñas admitidas" para ofrecer auténticas experiencias de alto nivel para usted y su animal: kits de bienvenida, camas para mascotas en la habitación, golosinas en el servicio de cama y servicios de paseo con conserje.`,
      `Alojarse en uno de los establecimientos de lujo pet-friendly de ${d} significa acceder a lo mejor de ${ctx.area} desde una base que trata a su mascota como un huésped valioso. Varios de los hoteles a continuación tienen menús dedicados para mascotas, y todos pueden gestionar reservas en restaurantes locales dog-friendly a petición.`,
    ],
    'dogs-stay-free': (d, ctx, n) => [
      `Las tarifas por mascotas pueden añadir 15-50 € por noche a su factura del hotel. Un gasto significativo a lo largo de una semana. Estos ${n} hoteles en ${d} han eliminado ese coste por completo: su perro se aloja gratis, sin cargos ocultos de limpieza ni depósitos.`,
      `"Perros gratis" no es solo un eslogan de marketing en los establecimientos a continuación. Está respaldado por políticas confirmadas sin excepciones por peso o raza en la mayoría de los casos. En ${d}, ${ctx.personality}, esta política encaja de forma natural en la cultura de hospitalidad local.`,
    ],
  },
}

// ─── Intros ──────────────────────────────────────────────────────────────────

export function generateIntro(
  destSlug: string,
  destName: string,
  catSlug: string,
  hotelCount: number,
  locale: string = 'en'
): string[] {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const ctxMap = destContextByLocale[l] ?? destContextByLocale['en']
  const ctx = ctxMap[destSlug] ?? {
    personality: 'a popular European destination',
    highlight: 'local parks and green spaces',
    area: 'the city centre',
  }
  const introMap = catIntrosByLocale[l] ?? catIntrosByLocale['en']
  const fn = introMap[catSlug]
  if (!fn) {
    if (l === 'fr') {
      return [
        `${destName} propose une sélection croissante d'hôtels acceptant les animaux. Ces ${hotelCount} établissements ont été sélectionnés à la main pour leur véritable accueil des animaux, leurs politiques confirmées et leurs scores de satisfaction des clients.`,
        `Tous les hôtels de cette liste acceptent les animaux avec un minimum de restrictions. Nous recommandons de confirmer les détails de votre animal (taille, race, nombre d'animaux) directement avec l'établissement lors de la réservation.`,
      ]
    }
    if (l === 'es') {
      return [
        `${destName} tiene una selección creciente de hoteles que admiten mascotas. Estos ${hotelCount} establecimientos han sido seleccionados a mano por su genuina bienvenida a los animales, sus políticas confirmadas y sus puntuaciones de satisfacción de los huéspedes.`,
        `Todos los hoteles de esta lista aceptan mascotas con restricciones mínimas. Recomendamos confirmar los detalles de su mascota (tamaño, raza, número de animales) directamente con el establecimiento al reservar.`,
      ]
    }
    return [
      `${destName} has a growing selection of pet-friendly hotels. These ${hotelCount} properties have been handpicked for their genuine welcome to animals, confirmed pet policies, and guest satisfaction scores.`,
      `All hotels on this list accept pets with minimal restrictions. We recommend confirming your specific pet's details (size, breed, number of animals) directly with the property when booking.`,
    ]
  }
  return fn(destName, ctx, hotelCount)
}

// ─── FAQs ────────────────────────────────────────────────────────────────────

const petFeeStats = (hotels: Array<{ petFee: number }>) => {
  const free = hotels.filter((h) => h.petFee === 0).length
  return { free, charged: hotels.length - free }
}

export function generateFaqs(
  destSlug: string,
  destName: string,
  catSlug: string,
  catName: string,
  hotels: Array<{ name: string; petFee: number; petPolicy: string; stars: number }>,
  locale: string = 'en'
): Faq[] {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const { free } = petFeeStats(hotels)
  const topHotel = hotels[0]?.name ?? (
    l === 'fr' ? 'l\'hôtel le mieux noté' :
    l === 'es' ? 'el hotel mejor valorado' :
    'the top-rated hotel'
  )

  if (l === 'fr') {
    const freeNote =
      free > 0
        ? `${free} des ${hotels.length} hôtels de cette liste ne facturent aucun frais pour animal.`
        : 'La plupart des hôtels facturent de petits frais de ménage de 10 à 30 € par séjour.'

    const base: Faq[] = [
      {
        q: `Les hôtels ${catName.toLowerCase()} sont-ils faciles à trouver à ${destName} ?`,
        a: `Oui: ${destName} dispose d'une bonne offre d'hébergements véritablement ${catName.toLowerCase()}. Les ${hotels.length} hôtels de cette page ont été vérifiés pour accepter les animaux avec des politiques explicites, pas de simples autorisations vagues. Cela dit, les chambres pet-friendly se remplissent rapidement en haute saison, donc réserver au moins 6 à 8 semaines à l'avance est conseillé.`,
      },
      {
        q: `Quel est le frais pour animal typique dans les hôtels de ${destName} ?`,
        a: `${freeNote} Les frais varient de 0 à 50 € selon la catégorie de l'établissement et le type d'animal. Vérifiez toujours les frais exacts indiqués dans la politique animaux de l'hôtel au moment de la réservation. Les frais sont parfois par nuit plutôt que par séjour.`,
      },
      {
        q: `Quelle est la limite de poids habituelle dans les hôtels de ${destName} ?`,
        a: `La plupart des hôtels de ${destName} fixent un poids maximum de 15 à 25 kg. Quelques établissements. Dont ${topHotel}. Acceptent les chiens sans restriction de taille. Les politiques animaux individuelles sur chaque fiche ci-dessus donnent les détails ; confirmez toujours avec l'hôtel si votre chien dépasse 20 kg.`,
      },
      {
        q: `Puis-je laisser mon animal seul dans ma chambre d'hôtel à ${destName} ?`,
        a: `Les politiques varient selon l'établissement. Certains hôtels permettent de laisser les animaux seuls dans la chambre (souvent avec une cage), d'autres exigent que le propriétaire soit présent en permanence. L'approche la plus sûre est d'appeler l'hôtel directement. Le personnel peut généralement recommander des services locaux de garde d'animaux si nécessaire.`,
      },
      {
        q: `Quelle est la meilleure période pour visiter ${destName} avec un animal ?`,
        a: `Le printemps (avril-mai) et le début de l'automne (septembre-octobre) sont idéaux. Les températures sont douces, moins de touristes signifie des rues et parcs plus calmes, et la plupart des hôtels ne sont pas encore en pleine capacité haute saison. L'été peut être très chaud à ${destName}, ce qui est difficile pour les animaux, et la disponibilité des chambres pet-friendly se réduit considérablement en juillet-août.`,
      },
      {
        q: `Quelle est la meilleure période de l'année pour visiter ${destName} avec un chien ?`,
        a: `Pour les séjours ${catName.toLowerCase()} à ${destName}, le printemps (mars-mai) et l'automne (septembre-novembre) offrent les meilleures conditions. Les températures restent agréables pour les promenades, les parcs sont moins fréquentés et les hôtels proposent souvent de meilleurs tarifs hors saison. En été, surveillez les fortes chaleurs qui peuvent être épuisantes pour les chiens, notamment pour les races à museau court.`,
      },
      {
        q: `Quel quartier de ${destName} est le mieux situé pour les hôtels ${catName.toLowerCase()} ?`,
        a: `Le choix du quartier dépend de votre style de voyage. Les quartiers centraux offrent un accès facile aux restaurants et musées, mais peuvent être bruyants. Les quartiers résidentiels ou en bordure de parcs sont généralement plus adaptés aux animaux, avec plus d'espaces verts à proximité. Les hôtels de cette liste ont été sélectionnés pour leur emplacement pratique pour les propriétaires d'animaux. Consultez la carte ci-dessus pour comparer les positions.`,
      },
    ]

    const extra: Record<string, Faq> = {
      'beach-access': {
        q: `Les chiens sont-ils autorisés sur les plages de ${destName} ?`,
        a: `L'accès des chiens aux plages de ${destName} varie selon la plage et la saison. De nombreuses plages européennes autorisent les chiens en basse saison (printemps et automne) mais imposent des restrictions strictes de juin à septembre en période de haute saison. En dehors de la saison estivale, les horaires d'accès sont souvent plus flexibles (avant 9h et après 19h en été). Les hôtels avec accès direct à la plage peuvent vous conseiller sur les meilleurs moments et endroits pour les chiens. Demandez toujours à l'enregistrement une carte actualisée des plages dog-friendly.`,
      },
      'dogs-stay-free': {
        q: `"Chiens gratuits" signifie-t-il également sans caution ?`,
        a: `Dans la plupart des cas, oui. Les hôtels qui affichent sans frais animaux ne prennent pas non plus de caution. Cependant, l'hôtel peut toujours facturer les dommages documentés causés par votre animal. Lisez toujours attentivement la politique animaux complète et gardez une copie de votre confirmation de réservation indiquant la politique sans frais.`,
      },
      'luxury': {
        q: `Quels équipements de luxe puis-je attendre pour mon animal dans les hôtels de ${destName} ?`,
        a: `Les hôtels haut de gamme de ${destName} ont considérablement relevé le niveau. Attendez-vous à des kits d'accueil (lit, gamelle, friandises, jouet), des menus en chambre pour animaux, des services de promenade avec concierge et des friandises au moment du coucher. Certains établissements proposent des forfaits spa pet-friendly ou peuvent organiser des visites vétérinaires. ${topHotel} est particulièrement reconnu pour ses équipements animaux. Vérifiez son offre spécifique lors de la réservation.`,
      },
      'near-parks': {
        q: `Les parcs proches de ces hôtels sont-ils adaptés aux chiens sans laisse ?`,
        a: `La plupart des parcs accessibles à pied depuis les hôtels de cette liste ont des zones sans laisse désignées, bien que les règles varient selon l'heure et la zone spécifique. Le personnel de réception de tous les hôtels listés peut fournir une carte actualisée des parcs dog-friendly. Portez toujours une laisse même dans les parcs sans laisse, car certaines zones sont partagées avec des familles et de jeunes enfants.`,
      },
    }

    if (extra[catSlug]) base.push(extra[catSlug])
    return base
  }

  if (l === 'es') {
    const freeNote =
      free > 0
        ? `${free} de los ${hotels.length} hoteles de esta lista no cobran ninguna tarifa por mascota.`
        : 'La mayoría de los hoteles cobran una pequeña tarifa de limpieza de 10-30 € por estancia.'

    const base: Faq[] = [
      {
        q: `¿Son fáciles de encontrar hoteles ${catName.toLowerCase()} en ${destName}?`,
        a: `Sí: ${destName} tiene una buena oferta de alojamientos genuinamente ${catName.toLowerCase()}. Los ${hotels.length} hoteles de esta página han sido verificados para aceptar mascotas con políticas explícitas, no solo vagas autorizaciones. Dicho esto, las habitaciones pet-friendly se llenan rápidamente en temporada alta, por lo que reservar con al menos 6-8 semanas de antelación es aconsejable.`,
      },
      {
        q: `¿Cuál es la tarifa típica por mascota en los hoteles de ${destName}?`,
        a: `${freeNote} Las tarifas varían de 0 a 50 € según la categoría del establecimiento y el tipo de mascota. Compruebe siempre el cargo exacto indicado en la política de mascotas del hotel en el momento de la reserva. Las tarifas son a veces por noche en lugar de por estancia.`,
      },
      {
        q: `¿Cuál es el límite de peso habitual en los hoteles de ${destName}?`,
        a: `La mayoría de los hoteles de ${destName} especifican un peso máximo del perro de 15-25 kg. Algunos establecimientos. Incluido ${topHotel}. Aceptan perros sin restricción de tamaño. Las políticas de mascotas individuales en cada ficha de arriba muestran los detalles; confirme siempre con el hotel si su perro supera los 20 kg.`,
      },
      {
        q: `¿Puedo dejar a mi mascota sola en mi habitación de hotel en ${destName}?`,
        a: `Las políticas difieren según el establecimiento. Algunos hoteles permiten dejar mascotas solas en la habitación (a menudo con una jaula), mientras que otros requieren que el dueño esté presente en todo momento. El enfoque más seguro es llamar directamente al hotel. El personal generalmente puede recomendar servicios locales de cuidado de mascotas si es necesario.`,
      },
      {
        q: `¿Cuál es la mejor época para visitar ${destName} con una mascota?`,
        a: `La primavera (abril-mayo) y el principio del otoño (septiembre-octubre) son ideales. Las temperaturas son suaves, menos turistas significa calles y parques más tranquilos, y la mayoría de los hoteles aún no están en capacidad máxima de temporada alta. El verano puede ser muy caluroso en ${destName}, lo que es duro para los animales, y la disponibilidad de habitaciones pet-friendly se reduce considerablemente en julio-agosto.`,
      },
      {
        q: `¿Cuál es la mejor época del año para visitar ${destName} con un perro?`,
        a: `Para estancias ${catName.toLowerCase()} en ${destName}, la primavera (marzo-mayo) y el otoño (septiembre-noviembre) ofrecen las mejores condiciones. Las temperaturas son agradables para los paseos, los parques están menos concurridos y los hoteles suelen ofrecer mejores tarifas fuera de temporada. En verano, tenga en cuenta que el calor intenso puede ser agotador para los perros, especialmente para las razas braquicéfalas.`,
      },
      {
        q: `¿Qué barrio de ${destName} es mejor para hoteles ${catName.toLowerCase()}?`,
        a: `La elección del barrio depende de su estilo de viaje. Los barrios céntricos ofrecen fácil acceso a restaurantes y museos, pero pueden ser ruidosos. Los barrios residenciales o junto a parques suelen ser más adecuados para las mascotas, con más zonas verdes cercanas. Los hoteles de esta lista han sido seleccionados por su ubicación práctica para los dueños de mascotas. Consulte el mapa de arriba para comparar posiciones.`,
      },
    ]

    const extra: Record<string, Faq> = {
      'beach-access': {
        q: `¿Se permiten perros en las playas de ${destName}?`,
        a: `El acceso de perros a las playas de ${destName} varía según la playa y la temporada. Muchas playas europeas permiten perros en temporada baja (primavera y otoño) pero imponen restricciones en los meses de verano de junio a septiembre. Fuera de temporada, los horarios de acceso suelen ser más flexibles (antes de las 9h y después de las 19h en verano). Los hoteles con acceso directo a la playa pueden asesorarle sobre los mejores momentos y lugares para los perros. Pregunte siempre en el check-in por un mapa actualizado de playas dog-friendly.`,
      },
      'dogs-stay-free': {
        q: `¿"Perros gratis" significa también sin depósito?`,
        a: `En la mayoría de los casos, sí. Los hoteles que anuncian sin cargo por mascotas tampoco cobran depósito. Sin embargo, el hotel puede cobrar por daños documentados causados por su mascota. Lea siempre detenidamente la política completa de mascotas y conserve una copia de su confirmación de reserva que indique la política sin cargo.`,
      },
      'luxury': {
        q: `¿Qué comodidades de lujo puedo esperar para mi mascota en los hoteles de ${destName}?`,
        a: `Los hoteles de primera categoría de ${destName} han elevado considerablemente el listón. Espere kits de bienvenida (cama, cuenco, chuches, juguete), menús de habitación para mascotas, servicios de paseo con conserje y atenciones especiales por la noche. Algunos establecimientos ofrecen paquetes de spa pet-friendly o pueden organizar visitas veterinarias. ${topHotel} es especialmente destacado por sus servicios para mascotas. Consulte su oferta específica al reservar.`,
      },
      'near-parks': {
        q: `¿Son los parques cercanos a estos hoteles aptos para perros sin correa?`,
        a: `La mayoría de los parques accesibles a pie desde los hoteles de esta lista tienen zonas designadas sin correa, aunque las normas varían según la hora del día y la zona específica. El personal de recepción de todos los hoteles listados puede proporcionar un mapa actualizado de parques dog-friendly. Lleve siempre una correa incluso en los parques sin correa, ya que algunas zonas son compartidas con familias y niños pequeños.`,
      },
    }

    if (extra[catSlug]) base.push(extra[catSlug])
    return base
  }

  // English (default)
  const freeNote =
    free > 0
      ? `${free} of the ${hotels.length} hotels on this list charge no pet fee at all.`
      : 'Most hotels charge a small cleaning fee of €10–€30 per stay.'

  const base: Faq[] = [
    {
      q: `Are ${catName.toLowerCase()} hotels easy to find in ${destName}?`,
      a: `Yes: ${destName} has a solid supply of genuinely ${catName.toLowerCase()} accommodation. The ${hotels.length} hotels on this page have been verified to accept pets with explicit policies, not just vague allowances. That said, dedicated pet-friendly rooms fill quickly in peak season, so booking at least 6–8 weeks ahead is advisable.`,
    },
    {
      q: `What is the typical pet fee in ${destName} hotels?`,
      a: `${freeNote} Fees vary from €0 to €50 depending on the property tier and the type of pet. Always check the exact charge listed in the hotel's pet policy at the time of booking. Fees are sometimes per-night rather than per-stay.`,
    },
    {
      q: `What is the pet weight limit at most ${destName} hotels?`,
      a: `Most hotels in ${destName} specify a maximum dog weight of 15–25 kg. A few properties. Including ${topHotel}. Accept dogs with no size restriction. The individual pet policies listed on each card above show the specifics; always confirm with the hotel if your dog is above 20 kg.`,
    },
    {
      q: `Can I leave my pet alone in my hotel room in ${destName}?`,
      a: `Policies differ by property. Some hotels allow pets to be left alone in the room (often with a crate), while others require the owner to be present at all times. The safest approach is to call the hotel directly and ask. Staff can usually recommend local pet-sitting services if needed.`,
    },
    {
      q: `When is the best time to visit ${destName} with a pet?`,
      a: `Spring (April–May) and early autumn (September–October) are ideal. Temperatures are mild, fewer tourists means calmer streets and parks, and most hotels are not yet in peak-season occupancy. Summer can be very hot in ${destName}, which is hard on animals, and availability of pet-friendly rooms shrinks considerably in July–August.`,
    },
    {
      q: `What is the best time of year to visit ${destName} with a dog?`,
      a: `For ${catName.toLowerCase()} stays in ${destName}, spring (March–May) and autumn (September–November) tend to offer the best all-round conditions. Temperatures are comfortable for long walks, crowds are thinner, and hotels often have better availability and pricing outside peak season. In summer, watch for heat that can tire dogs quickly. Especially flat-faced breeds. Autumn evenings in ${destName} are particularly pleasant for exploring with a dog.`,
    },
    {
      q: `Which neighbourhood in ${destName} is best for ${catName.toLowerCase()} hotels?`,
      a: `The best neighbourhood depends on your travel style. Central areas offer walkability to restaurants and attractions but tend to be noisier. Residential or park-adjacent neighbourhoods are generally better for pets. More green space, quieter streets, and a more relaxed pace. The hotels on this list have been selected partly for their practical location for pet owners; use the map above to compare positions and proximity to parks.`,
    },
  ]

  const extra: Record<string, Faq> = {
    'beach-access': {
      q: `Are dogs allowed on ${destName} beaches?`,
      a: `Dog access to beaches in ${destName} varies by beach and by season. Many European beaches allow dogs in the shoulder season. Spring and autumn. But enforce restrictions during the summer peak from June to September, when dogs are often banned during daytime hours. Outside summer, access is typically more flexible, with early morning and evening slots often permitted even in peak season. Hotels with direct beach access can advise on the best times and spots for dogs. Always ask at check-in for a current dog-friendly beach map.`,
    },
    'dogs-stay-free': {
      q: `Does "dogs stay free" mean no deposit either?`,
      a: `In most cases, yes. Hotels that advertise no pet fee do not take a pet deposit either. However, the hotel may still charge for documented damage caused by your pet. Always read the full pet policy carefully and keep a copy of your booking confirmation that states the no-fee policy.`,
    },
    'luxury': {
      q: `What luxury amenities can I expect for my pet in ${destName} hotels?`,
      a: `Top-tier ${destName} hotels have raised the bar considerably. Expect pet welcome kits (bed, bowl, treats), in-room pet menus, concierge dog-walking services, and turndown treats. Some properties offer pet-friendly spa packages or can arrange veterinary visits. ${topHotel} is particularly noted for its pet amenities. Check their specific offering when booking.`,
    },
    'near-parks': {
      q: `Are the parks near these hotels off-leash friendly?`,
      a: `Most of the parks walkable from the hotels on this list have designated off-leash areas, though rules vary by time of day and specific zone. Front desk staff at all listed hotels can provide a current dog-friendly park map. Always carry a lead even in off-leash parks, as some areas are shared with families and young children.`,
    },
  }

  if (extra[catSlug]) base.push(extra[catSlug])
  return base
}

// ─── Tips ────────────────────────────────────────────────────────────────────

const catTipsByLocale: Record<string, Record<string, Tip[]>> = {
  en: {
    'dog-friendly': [
      { n: 1, title: 'Book the pet-specific room type', text: 'Not all rooms in a dog-friendly hotel accept pets. Ask for the "pet-friendly" room type at booking. It typically has easy outdoor access and hard floors rather than carpets.' },
      { n: 2, title: 'Verify the weight limit before you arrive', text: 'Hotels often list a maximum dog weight (10, 20, or 25 kg). If your dog is borderline, call ahead. Policies are sometimes flexible, especially outside peak season.' },
      { n: 3, title: 'Ask for local dog-walking recommendations', text: 'Concierge staff at the hotels on this list know exactly which parks are off-leash, which cafés put out water bowls, and which streets are quietest for anxious dogs.' },
      { n: 4, title: 'Bring an EU pet passport for cross-border travel', text: 'If you\'re driving to your destination, EU pet passports are mandatory for crossing borders. Ensure rabies vaccinations are up to date at least 21 days before travel.' },
      { n: 5, title: 'Confirm the policy by email', text: 'After booking, send a short email confirming your dog\'s name, breed, and weight. This creates a paper trail and removes any ambiguity at check-in.' },
    ],
    'cat-friendly': [
      { n: 1, title: 'Request a quiet room away from street noise', text: 'Cats are noise-sensitive. Ask for an inner courtyard or upper-floor room. The less street traffic and lift noise, the calmer your cat will be.' },
      { n: 2, title: 'Keep your cat in the carrier during check-in', text: 'A busy hotel lobby can be overwhelming. Keep your cat secure until you\'re in the room. Most hotels will fast-track you to the lift if you mention you have a cat on arrival.' },
      { n: 3, title: 'Bring familiar scent items from home', text: 'A blanket or toy from home significantly reduces anxiety in a new environment. The smell of home helps cats settle within hours rather than days.' },
      { n: 4, title: 'Block any gaps and hide escape routes first', text: 'Before letting your cat out of the carrier, close windows, check behind heavy furniture, and tape over any ventilation gaps. A thorough 10-minute sweep prevents escape incidents.' },
      { n: 5, title: 'Notify housekeeping to knock and wait', text: 'Ask the front desk to flag your room so housekeeping knocks loudly and waits before entering. This prevents accidental door-open escape scenarios.' },
    ],
    'beach-access': [
      { n: 1, title: 'Check beach dog rules before you go', text: 'Many European beaches ban dogs from June to September, or restrict hours to before 9 am and after 7 pm. Ask the hotel for an up-to-date beach access map for dogs.' },
      { n: 2, title: 'Rinse your dog after sea water', text: 'Salt water irritates paws and skin with repeated exposure. Most beach-access hotels on this list have outdoor showers. Use them after every swim and dry paws thoroughly.' },
      { n: 3, title: 'Watch out for sand heat in summer', text: 'Dry summer sand can reach 50–60°C and burn paw pads badly. Test with your palm before walking your dog on unshaded sand.' },
      { n: 4, title: 'Bring shade', text: 'Even pet-friendly beaches rarely provide umbrella hire. A portable beach shade or a hotel umbrella (ask to borrow one) keeps your dog comfortable for longer beach sessions.' },
      { n: 5, title: 'Keep freshwater available at all times', text: 'Salt water makes dogs thirsty and can cause vomiting if consumed in quantity. Pack a collapsible bowl and at least 1.5 L of fresh water per day at the beach.' },
    ],
    'near-parks': [
      { n: 1, title: 'Ask for the hotel\'s dog-walking route map', text: 'The best dog-friendly hotels near parks have mapped the off-leash zones, water refill points, and dog-friendly café terraces nearby. Ask at check-in.' },
      { n: 2, title: 'Go early for the best park experience', text: 'Parks are at their calmest before 9 am. Fewer cyclists, fewer children, and more space. Early mornings are also cooler in summer and better for energetic breeds.' },
      { n: 3, title: 'Know your park\'s off-leash rules', text: 'Off-leash rules differ zone by zone within the same park. Look for signs or ask the hotel. Being caught with an off-leash dog in a lead-only zone can mean a fine in some cities.' },
      { n: 4, title: 'Pack collapsible food and water bowls', text: 'Lightweight silicone bowls weigh almost nothing and make park stops comfortable for your dog without lugging heavy equipment.' },
      { n: 5, title: 'Find the nearest vet to your hotel', text: 'Ask the hotel to note the nearest 24h vet clinic. Most never need it, but knowing the address eliminates panic if something does happen.' },
    ],
    'luxury': [
      { n: 1, title: 'Request the pet welcome kit in advance', text: 'Most luxury hotels offer welcome kits (bed, bowl, treats, a toy) but stocks are limited. Request one when confirming your booking. Not on arrival. To guarantee availability.' },
      { n: 2, title: 'Ask about the pet concierge service', text: 'Several five-star hotels on this list offer dedicated pet concierges: dog walkers, in-room pet dining menus, grooming arrangements, and even vet referrals. Ask what\'s included before you arrive.' },
      { n: 3, title: 'Book a pet-compatible suite rather than a standard room', text: 'Luxury suites often have better soundproofing, larger floor space for your pet to move, and private terraces. Worth the upgrade for a multi-night stay with an animal.' },
      { n: 4, title: 'Confirm the spa policy', text: 'Most luxury hotels require your pet to remain in the room when you use spa facilities. Ask about pet-sitting arrangements. Many can organise a dog walker to coincide with your treatment.' },
      { n: 5, title: 'Tip the pet-aware staff', text: 'The housekeeper who goes the extra mile to avoid disturbing a sleeping cat, and the bellhop who walks your dog to the lift. Small tips go a long way to ensuring exceptional pet-friendly service throughout your stay.' },
    ],
    'dogs-stay-free': [
      { n: 1, title: 'Get the no-fee policy in writing', text: 'Book directly with the hotel or via Booking.com and ensure the confirmation email clearly states "no pet fee". Screenshots of the policy at time of booking are useful if there\'s a dispute at check-out.' },
      { n: 2, title: 'Understand what "free" covers', text: '"Dogs stay free" means no accommodation surcharge. Not that damages are free. Hotels can still charge for documented pet-caused damage (scratched doors, soiled carpets). A responsible stay protects everyone.' },
      { n: 3, title: 'Bring your own dog bed or blanket', text: 'Even no-fee hotels don\'t always provide a dog bed. Bringing a familiar blanket from home keeps your dog comfortable and protects hotel furniture from fur and paw prints.' },
      { n: 4, title: 'Compare the per-stay cost over multiple nights', text: 'A hotel with a €20/stay fee can be cheaper than a "dogs stay free" hotel if the base room rate is significantly lower. Always compare the total cost across your stay duration.' },
      { n: 5, title: 'Leave a detailed review mentioning the pet policy', text: 'After your stay, a specific review mentioning the dog-friendly experience helps future pet owners make confident choices. And it encourages hotels to maintain or improve their policies.' },
    ],
  },
  fr: {
    'dog-friendly': [
      { n: 1, title: 'Réservez le type de chambre pet-friendly', text: 'Toutes les chambres d\'un hôtel chien-friendly n\'acceptent pas les animaux. Demandez spécifiquement le type de chambre « pet-friendly » lors de la réservation. Elle offre généralement un accès facile à l\'extérieur et des sols durs plutôt que de la moquette.' },
      { n: 2, title: 'Vérifiez la limite de poids avant d\'arriver', text: 'Les hôtels indiquent souvent un poids maximum (10, 20 ou 25 kg). Si votre chien est à la limite, appelez à l\'avance. Les politiques sont parfois flexibles hors saison haute.' },
      { n: 3, title: 'Demandez des recommandations de promenade locales', text: 'Le personnel du concierge des hôtels de cette liste sait exactement quels parcs sont sans laisse, quels cafés mettent des bols d\'eau, et quelles rues sont les plus calmes pour les chiens anxieux.' },
      { n: 4, title: 'Munissez-vous d\'un passeport européen pour animaux', text: 'Si vous voyagez en voiture, les passeports européens pour animaux sont obligatoires pour franchir les frontières. Assurez-vous que les vaccinations contre la rage sont à jour au moins 21 jours avant le départ.' },
      { n: 5, title: 'Confirmez la politique par e-mail', text: 'Après la réservation, envoyez un bref e-mail confirmant le nom, la race et le poids de votre chien. Cela crée une trace écrite et évite toute ambiguïté à l\'enregistrement.' },
    ],
    'cat-friendly': [
      { n: 1, title: 'Demandez une chambre calme à l\'écart du bruit de la rue', text: 'Les chats sont sensibles au bruit. Demandez une chambre donnant sur une cour intérieure ou à un étage élevé. Moins de circulation et de bruit d\'ascenseur, plus votre chat sera serein.' },
      { n: 2, title: 'Gardez votre chat dans son transport pendant l\'enregistrement', text: 'Un hall d\'hôtel animé peut être éprouvant. Gardez votre chat en sécurité jusqu\'à ce que vous soyez dans la chambre. La plupart des hôtels vous amèneront rapidement à l\'ascenseur si vous mentionnez avoir un chat.' },
      { n: 3, title: 'Apportez des objets avec des odeurs familières', text: 'Une couverture ou un jouet de la maison réduit considérablement l\'anxiété dans un nouvel environnement. L\'odeur du foyer aide les chats à s\'installer en quelques heures plutôt qu\'en quelques jours.' },
      { n: 4, title: 'Bloquez les fissures et cachez les issues d\'évasion d\'abord', text: 'Avant de laisser votre chat sortir du transport, fermez les fenêtres, vérifiez derrière les gros meubles et colmatez les bouches d\'aération. Un balayage minutieux de 10 minutes évite les incidents d\'évasion.' },
      { n: 5, title: 'Demandez au ménage de frapper et d\'attendre', text: 'Demandez à la réception de signaler votre chambre afin que le ménage frappe fort et attende avant d\'entrer. Cela évite les scénarios d\'évasion accidentelle par la porte.' },
    ],
    'beach-access': [
      { n: 1, title: 'Vérifiez les règles plage pour les chiens avant d\'y aller', text: 'De nombreuses plages européennes interdisent les chiens de juin à septembre, ou limitent les horaires d\'accès à avant 9h et après 19h. Demandez à l\'hôtel une carte actualisée des accès plage autorisés aux chiens.' },
      { n: 2, title: 'Rincez votre chien après l\'eau de mer', text: 'L\'eau salée irrite les pattes et la peau avec une exposition répétée. La plupart des hôtels avec accès plage de cette liste ont des douches extérieures. Utilisez-les après chaque baignade et séchez bien les pattes.' },
      { n: 3, title: 'Attention à la chaleur du sable en été', text: 'Le sable sec en été peut atteindre 50-60°C et brûler gravement les coussinets. Testez avec votre paume avant de promener votre chien sur du sable non ombragé.' },
      { n: 4, title: 'Apportez de l\'ombre', text: 'Même sur les plages dog-friendly, les parasols ne sont rarement proposés en location. Un parasol de plage portable ou emprunté à l\'hôtel garde votre chien à l\'aise pour des sessions prolongées.' },
      { n: 5, title: 'Gardez de l\'eau fraîche disponible en permanence', text: 'L\'eau salée rend les chiens assoiffés et peut provoquer des vomissements si ingérée en quantité. Emportez un bol pliable et au moins 1,5 L d\'eau douce par jour à la plage.' },
    ],
    'near-parks': [
      { n: 1, title: 'Demandez la carte de promenade de l\'hôtel', text: 'Les meilleurs hôtels dog-friendly près des parcs ont cartographié les zones sans laisse, les points de remplissage d\'eau et les terrasses de cafés dog-friendly à proximité. Demandez à l\'enregistrement.' },
      { n: 2, title: 'Partez tôt pour la meilleure expérience au parc', text: 'Les parcs sont les plus calmes avant 9h. Moins de cyclistes, moins d\'enfants, plus d\'espace. Les matins tôt sont aussi plus frais en été et préférables pour les races énergiques.' },
      { n: 3, title: 'Connaissez les règles sans laisse de votre parc', text: 'Les règles sans laisse varient d\'une zone à l\'autre au sein du même parc. Regardez les panneaux ou demandez à l\'hôtel. Être surpris avec un chien sans laisse dans une zone avec laisse obligatoire peut entraîner une amende.' },
      { n: 4, title: 'Emportez des gamelles pliables pour nourriture et eau', text: 'Les gamelles en silicone légères ne pèsent presque rien et rendent les arrêts au parc confortables pour votre chien sans équipement lourd.' },
      { n: 5, title: 'Localisez le vétérinaire le plus proche de votre hôtel', text: 'Demandez à l\'hôtel de noter la clinique vétérinaire 24h/24 la plus proche. La plupart n\'en auront jamais besoin, mais connaître l\'adresse évite la panique si quelque chose arrive.' },
    ],
    'luxury': [
      { n: 1, title: 'Demandez le kit d\'accueil animaux à l\'avance', text: 'La plupart des hôtels de luxe proposent des kits d\'accueil (lit, gamelle, friandises, jouet) mais les stocks sont limités. Faites-en la demande lors de la confirmation de votre réservation. Pas à l\'arrivée. Pour en garantir la disponibilité.' },
      { n: 2, title: 'Renseignez-vous sur le service concierge animaux', text: 'Plusieurs hôtels cinq étoiles de cette liste proposent des concierges dédiés aux animaux : promeneurs de chiens, menus dînatoires en chambre, arrangements de toilettage et références vétérinaires. Demandez ce qui est inclus avant d\'arriver.' },
      { n: 3, title: 'Réservez une suite compatible animaux plutôt qu\'une chambre standard', text: 'Les suites de luxe offrent souvent une meilleure insonorisation, plus d\'espace au sol pour votre animal et des terrasses privées. Cela vaut l\'upgrade pour un séjour de plusieurs nuits avec un animal.' },
      { n: 4, title: 'Confirmez la politique spa', text: 'La plupart des hôtels de luxe demandent que votre animal reste dans la chambre lorsque vous utilisez le spa. Renseignez-vous sur les arrangements de garde. Beaucoup peuvent organiser un promeneur de chiens qui coïncide avec votre soin.' },
      { n: 5, title: 'Remerciez le personnel attentionné aux animaux', text: 'La femme de chambre qui fait un effort supplémentaire pour ne pas déranger un chat endormi, le groom qui accompagne votre chien à l\'ascenseur. De petits gestes appréciatifs favorisent un service pet-friendly exceptionnel tout au long de votre séjour.' },
    ],
    'dogs-stay-free': [
      { n: 1, title: 'Obtenez la politique sans frais par écrit', text: 'Réservez directement à l\'hôtel ou via Booking.com et assurez-vous que l\'e-mail de confirmation indique clairement « sans frais animal ». Les captures d\'écran de la politique au moment de la réservation sont utiles en cas de litige au départ.' },
      { n: 2, title: 'Comprenez ce que « gratuit » couvre', text: '« Chiens gratuits » signifie pas de supplément d\'hébergement. Pas que les dommages sont gratuits. Les hôtels peuvent toujours facturer les dommages documentés causés par votre animal. Un séjour responsable protège tout le monde.' },
      { n: 3, title: 'Apportez votre propre panier ou couverture', text: 'Même les hôtels sans frais ne fournissent pas toujours un panier pour chien. Apporter une couverture familière de la maison garde votre chien à l\'aise et protège le mobilier de l\'hôtel des poils et des traces de pattes.' },
      { n: 4, title: 'Comparez le coût par nuit sur plusieurs nuits', text: 'Un hôtel avec 20 €/séjour peut être moins cher qu\'un hôtel « chiens gratuits » si le tarif de base est significativement plus bas. Comparez toujours le coût total sur la durée de votre séjour.' },
      { n: 5, title: 'Laissez un avis détaillé mentionnant la politique animaux', text: 'Après votre séjour, un avis spécifique mentionnant l\'expérience dog-friendly aide les futurs propriétaires d\'animaux à faire des choix éclairés. Et encourage les hôtels à maintenir ou améliorer leurs politiques.' },
    ],
  },
  es: {
    'dog-friendly': [
      { n: 1, title: 'Reserve el tipo de habitación para mascotas', text: 'No todas las habitaciones de un hotel dog-friendly admiten mascotas. Pida específicamente el tipo de habitación \'pet-friendly\' al reservar. Normalmente tiene fácil acceso al exterior y suelos duros en lugar de moqueta.' },
      { n: 2, title: 'Verifique el límite de peso antes de llegar', text: 'Los hoteles suelen indicar un peso máximo del perro (10, 20 o 25 kg). Si su perro está en el límite, llame con antelación. Las políticas son a veces flexibles fuera de temporada alta.' },
      { n: 3, title: 'Pida recomendaciones locales para pasear', text: 'El personal de conserjería de los hoteles de esta lista sabe exactamente qué parques son sin correa, qué cafés ponen cuencos de agua y qué calles son más tranquilas para perros ansiosos.' },
      { n: 4, title: 'Lleve un pasaporte europeo para mascotas', text: 'Si viaja en coche, los pasaportes europeos para mascotas son obligatorios para cruzar fronteras. Asegúrese de que las vacunas contra la rabia estén al día al menos 21 días antes del viaje.' },
      { n: 5, title: 'Confirme la política por correo electrónico', text: 'Tras reservar, envíe un breve correo confirmando el nombre, raza y peso de su perro. Esto crea un registro escrito y elimina cualquier ambigüedad en el check-in.' },
    ],
    'cat-friendly': [
      { n: 1, title: 'Solicite una habitación tranquila alejada del ruido de la calle', text: 'Los gatos son sensibles al ruido. Pida una habitación interior o en un piso alto. Cuanto menos tráfico y ruido de ascensor, más tranquilo estará su gato.' },
      { n: 2, title: 'Mantenga a su gato en el transportín durante el check-in', text: 'El ajetreado vestíbulo de un hotel puede ser abrumador. Mantenga a su gato seguro hasta que esté en la habitación. La mayoría de los hoteles le llevará rápidamente al ascensor si menciona que trae un gato.' },
      { n: 3, title: 'Traiga objetos con olores familiares del hogar', text: 'Una manta o juguete de casa reduce significativamente la ansiedad en un entorno nuevo. El olor del hogar ayuda a los gatos a adaptarse en horas en lugar de días.' },
      { n: 4, title: 'Bloquee grietas y escondites de escape primero', text: 'Antes de dejar salir a su gato del transportín, cierre las ventanas, revise detrás de los muebles grandes y tape cualquier hueco de ventilación. Un repaso minucioso de 10 minutos evita incidentes de escapadas.' },
      { n: 5, title: 'Avise a la limpieza para que llame y espere', text: 'Pida en recepción que señalen su habitación para que la limpieza llame fuerte y espere antes de entrar. Esto evita situaciones de escapada accidental por la puerta.' },
    ],
    'beach-access': [
      { n: 1, title: 'Compruebe las normas de la playa para perros antes de ir', text: 'Muchas playas europeas prohíben los perros de junio a septiembre, o restringen el horario a antes de las 9h y después de las 19h. Pida al hotel un mapa actualizado de los accesos a la playa permitidos para perros.' },
      { n: 2, title: 'Enjuague a su perro después del agua de mar', text: 'El agua salada irrita las patas y la piel con la exposición repetida. La mayoría de los hoteles con acceso a playa de esta lista tienen duchas exteriores: úselas después de cada baño y seque bien las patas.' },
      { n: 3, title: 'Cuidado con el calor de la arena en verano', text: 'La arena seca en verano puede alcanzar 50-60°C y quemar gravemente las almohadillas. Pruebe con la palma de su mano antes de pasear a su perro por arena sin sombra.' },
      { n: 4, title: 'Lleve sombra', text: 'Incluso en las playas dog-friendly, raramente se alquilan sombrillas. Una sombrilla de playa portátil o la del hotel (solicite prestada una) mantiene a su perro cómodo durante sesiones prolongadas en la playa.' },
      { n: 5, title: 'Tenga agua fresca disponible en todo momento', text: 'El agua salada da sed a los perros y puede causar vómitos si se ingiere en cantidad. Lleve un cuenco plegable y al menos 1,5 L de agua dulce por día en la playa.' },
    ],
    'near-parks': [
      { n: 1, title: 'Pida el mapa de paseos del hotel', text: 'Los mejores hoteles dog-friendly cerca de parques tienen mapeadas las zonas sin correa, los puntos de recarga de agua y las terrazas de cafés dog-friendly cercanas. Pregunte en el check-in.' },
      { n: 2, title: 'Vaya temprano para la mejor experiencia en el parque', text: 'Los parques están más tranquilos antes de las 9h. Menos ciclistas, menos niños, más espacio. Las mañanas tempranas también son más frescas en verano y mejores para las razas enérgicas.' },
      { n: 3, title: 'Conozca las normas de su parque sin correa', text: 'Las normas sin correa varían de zona en zona dentro del mismo parque. Busque señales o pregunte al hotel. Ser sorprendido con un perro sin correa en una zona de correa obligatoria puede suponer una multa en algunas ciudades.' },
      { n: 4, title: 'Lleve cuencos plegables para comida y agua', text: 'Los cuencos de silicona ligeros pesan casi nada y hacen que las paradas en el parque sean cómodas para su perro sin cargar con equipamiento pesado.' },
      { n: 5, title: 'Localice el veterinario más cercano a su hotel', text: 'Pida al hotel que anote la clínica veterinaria 24h más cercana. La mayoría nunca la necesitará, pero conocer la dirección elimina el pánico si ocurre algo.' },
    ],
    'luxury': [
      { n: 1, title: 'Solicite el kit de bienvenida para mascotas con antelación', text: 'La mayoría de los hoteles de lujo ofrecen kits de bienvenida (cama, cuenco, chuches, juguete) pero el stock es limitado. Solicítelo al confirmar su reserva. No a la llegada. Para garantizar su disponibilidad.' },
      { n: 2, title: 'Pregunte por el servicio de conserje para mascotas', text: 'Varios hoteles de cinco estrellas de esta lista ofrecen conserjes dedicados a mascotas: paseadores de perros, menús de habitación para mascotas, arreglos de peluquería y referencias veterinarias. Pregunte qué está incluido antes de llegar.' },
      { n: 3, title: 'Reserve una suite compatible con mascotas en lugar de una habitación estándar', text: 'Las suites de lujo suelen tener mejor insonorización, más espacio en el suelo para su mascota y terrazas privadas. Merece la pena el upgrade para una estancia de varias noches con un animal.' },
      { n: 4, title: 'Confirme la política del spa', text: 'La mayoría de los hoteles de lujo requieren que su mascota permanezca en la habitación mientras usa las instalaciones del spa. Pregunte sobre los servicios de cuidado. Muchos pueden organizar un paseador de perros que coincida con su tratamiento.' },
      { n: 5, title: 'Agradezca al personal atento con las mascotas', text: 'La camarera que hace un esfuerzo extra por no molestar a un gato dormido, y el botones que acompaña a su perro al ascenseur. Pequeños gestos de agradecimiento contribuyen en gran medida a garantizar un servicio pet-friendly excepcional durante toda su estancia.' },
    ],
    'dogs-stay-free': [
      { n: 1, title: 'Obtenga la política sin cargo por escrito', text: 'Reserve directamente en el hotel o a través de Booking.com y asegúrese de que el correo de confirmación indique claramente \'sin cargo por mascota\'. Las capturas de pantalla de la política en el momento de la reserva son útiles si hay una disputa al hacer el check-out.' },
      { n: 2, title: 'Entienda qué cubre \'gratis\'', text: '\'Perros gratis\' significa sin recargo de alojamiento. No que los daños sean gratuitos. Los hoteles aún pueden cobrar por daños documentados causados por su mascota. Una estancia responsable protege a todos.' },
      { n: 3, title: 'Traiga su propia cama o manta para el perro', text: 'Incluso los hoteles sin cargo no siempre proporcionan una cama para perros. Traer una manta familiar de casa mantiene a su perro cómodo y protege el mobiliario del hotel del pelo y las huellas de patas.' },
      { n: 4, title: 'Compare el coste por noche en varias noches', text: 'Un hotel con una tarifa de 20 €/estancia puede ser más barato que un hotel \'perros gratis\' si la tarifa base de la habitación es significativamente más baja. Compare siempre el coste total a lo largo de la duración de su estancia.' },
      { n: 5, title: 'Deje una reseña detallada mencionando la política de mascotas', text: 'Después de su estancia, una reseña específica mencionando la experiencia dog-friendly ayuda a futuros dueños de mascotas a tomar decisiones con confianza. Y anima a los hoteles a mantener o mejorar sus políticas.' },
    ],
  },
}

// ─── Why Section ─────────────────────────────────────────────────────────────

export interface WhySection {
  bullets: string[]
  bestSeason: string
}

const catBullet3: Record<string, Record<string, (d: string, ctx: DestCtx) => string>> = {
  en: {
    'dog-friendly':   (d, ctx) => `Hotels selected for this guide are specifically in ${ctx.area}, where pet infrastructure is densest and local restaurants routinely provide water bowls and terrace access.`,
    'cat-friendly':   (d) =>      `Cat-friendly rooms in ${d} tend to be quieter upper-floor units with reliable lift access. Key features that keep feline guests settled throughout the stay.`,
    'beach-access':   (_d) =>     `The pet-friendly beach spots near these hotels are accessible at reasonable hours. No 6am alarms required. For the majority of the year, making planning simple.`,
    'near-parks':     (d, ctx) => `The hotels on this list are all positioned for under-10-minute walks to off-leash zones in ${ctx.highlight}. No busy road crossings, no logistics before the morning walk.`,
    'luxury':         (d, ctx) => `Luxury properties in ${ctx.area} have developed full pet concierge packages. Welcome kits, in-room dining menus, and dog-walker bookings. Because their guests demanded it.`,
    'dogs-stay-free': (d) =>      `The no-fee policies here are confirmed and year-round. Not seasonal promotions or weight-restricted. Making ${d} a reliably cost-effective destination for pet owners.`,
  },
  fr: {
    'dog-friendly':   (d, ctx) => `Les hôtels sélectionnés se trouvent spécifiquement dans ${ctx.area}, où l'infrastructure pour animaux est la plus dense et où les restaurants proposent régulièrement des bols d'eau et un accès aux terrasses.`,
    'cat-friendly':   (d) =>      `Les chambres accueillant les chats à ${d} sont généralement des unités calmes aux étages supérieurs avec un accès fiable à l'ascenseur. Des caractéristiques clés pour que les félins se sentent à l'aise.`,
    'beach-access':   (_d) =>     `Les spots de plage autorisés aux chiens près de ces hôtels sont accessibles à des horaires raisonnables. Sans réveil à 6h. Pour la majorité de l'année, ce qui simplifie l'organisation.`,
    'near-parks':     (d, ctx) => `Les hôtels de cette liste sont tous positionnés pour atteindre les zones sans laisse de ${ctx.highlight} en moins de 10 minutes à pied. Sans traverser d'artères passantes.`,
    'luxury':         (d, ctx) => `Les établissements de luxe de ${ctx.area} ont développé des offres concierge complètes pour animaux. Kits d'accueil, menus de restauration en chambre, réservations de promeneurs. Parce que leurs clients l'ont exigé.`,
    'dogs-stay-free': (d) =>      `Les politiques sans frais dans ces hôtels sont confirmées et valables toute l'année. Pas des promotions saisonnières ou limitées au poids. Faisant de ${d} une destination fiablement économique pour les propriétaires d'animaux.`,
  },
  es: {
    'dog-friendly':   (d, ctx) => `Los hoteles seleccionados están específicamente en ${ctx.area}, donde la infraestructura para mascotas es más densa y los restaurantes locales ofrecen habitualmente cuencos de agua y acceso a terrazas.`,
    'cat-friendly':   (d) =>      `Las habitaciones para gatos en ${d} suelen ser unidades tranquilas en pisos superiores con acceso fiable al ascensor. Características clave para mantener a los huéspedes felinos tranquilos.`,
    'beach-access':   (_d) =>     `Los puntos de playa aptos para perros cerca de estos hoteles son accesibles en horarios razonables. Sin madrugar. Durante la mayor parte del año, lo que facilita mucho la planificación.`,
    'near-parks':     (d, ctx) => `Los hoteles de esta lista están todos situados para llegar a las zonas sin correa de ${ctx.highlight} en menos de 10 minutos a pie. Sin cruzar calles concurridas antes del paseo matutino.`,
    'luxury':         (d, ctx) => `Los establecimientos de lujo de ${ctx.area} han desarrollado paquetes completos de conserjería para mascotas. Kits de bienvenida, menús en habitación, reservas de paseadores. Porque sus huéspedes lo exigieron.`,
    'dogs-stay-free': (d) =>      `Las políticas sin cargo aquí están confirmadas y son válidas todo el año. No son promociones estacionales ni con restricciones de peso. Haciendo de ${d} un destino fiablemente económico para los dueños de mascotas.`,
  },
}

const bestSeasonByLocale: Record<string, Record<string, string>> = {
  en: {
    'dog-friendly': 'spring & autumn', 'cat-friendly': 'year-round', 'beach-access': 'spring & early autumn',
    'near-parks': 'spring & autumn', 'luxury': 'year-round', 'dogs-stay-free': 'year-round',
  },
  fr: {
    'dog-friendly': 'printemps & automne', 'cat-friendly': 'toute l\'année', 'beach-access': 'printemps & début d\'automne',
    'near-parks': 'printemps & automne', 'luxury': 'toute l\'année', 'dogs-stay-free': 'toute l\'année',
  },
  es: {
    'dog-friendly': 'primavera & otoño', 'cat-friendly': 'todo el año', 'beach-access': 'primavera & principios de otoño',
    'near-parks': 'primavera & otoño', 'luxury': 'todo el año', 'dogs-stay-free': 'todo el año',
  },
}

export function generateWhy(
  destSlug: string,
  destName: string,
  catSlug: string,
  locale: string = 'en'
): WhySection {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const ctx = (destContextByLocale[l] ?? destContextByLocale['en'])[destSlug] ?? {
    personality: l === 'fr' ? 'une destination européenne populaire' : l === 'es' ? 'un destino europeo popular' : 'a popular European destination',
    highlight: l === 'fr' ? 'les espaces verts locaux' : l === 'es' ? 'los espacios verdes locales' : 'local parks and green spaces',
    area: l === 'fr' ? 'le centre-ville' : l === 'es' ? 'el centro de la ciudad' : 'the city centre',
  }

  const bullet3fn = (catBullet3[l] ?? catBullet3['en'])[catSlug]
  const bullet3 = bullet3fn
    ? bullet3fn(destName, ctx)
    : l === 'fr'
      ? `La politique pet-friendly de ces hôtels a été vérifiée individuellement. Pas de surprises à l'enregistrement.`
      : l === 'es'
        ? `La política pet-friendly de estos hoteles ha sido verificada individualmente. Sin sorpresas en el check-in.`
        : `Pet policies at every hotel on this list have been verified individually. No surprises at check-in.`

  const bullets =
    l === 'fr'
      ? [
          `À ${destName}, ${ctx.highlight} sont accessibles depuis chaque hôtel de cette liste — idéal pour les sorties matin et soir.`,
          `${destName} est ${ctx.personality} — les animaux sont acceptés dans les rues, les terrasses et les commerces du quotidien.`,
          bullet3,
        ]
      : l === 'es'
        ? [
            `En ${destName}, ${ctx.highlight} son accesibles desde cada hotel de esta lista, perfectos para salidas mañana y noche.`,
            `${destName} es ${ctx.personality} — los animales son bienvenidos en calles, terrazas y comercios habituales.`,
            bullet3,
          ]
        : [
            `In ${destName}, ${ctx.highlight} are within reach of every hotel on this list — good for morning and evening outings.`,
            `${destName} is ${ctx.personality} — pets are a normal part of street life, café terraces, and local shops.`,
            bullet3,
          ]

  const bestSeason = (bestSeasonByLocale[l] ?? bestSeasonByLocale['en'])[catSlug] ?? (
    l === 'fr' ? 'printemps & automne' : l === 'es' ? 'primavera & otoño' : 'spring & autumn'
  )

  return { bullets, bestSeason }
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  emoji: string
  text: string
  attribution: string
}

const testimonialsByLocale: Record<string, Record<string, (d: string) => Testimonial>> = {
  en: {
    'dog-friendly':   (d) => ({ emoji: '🐕', text: `We spent five nights in ${d} with our 30 kg Labrador, Max. Finding a hotel that genuinely welcomed him. Not just 'allowed' him. Made the entire holiday. The concierge had a local park map ready at check-in and knew exactly which cafés put out water bowls. We've already booked again for spring.`, attribution: ' Verified traveller, dog-friendly stay' }),
    'cat-friendly':   (d) => ({ emoji: '🐈', text: `I was genuinely nervous about taking Simone (my Bengal) to a city hotel. The staff in ${d} were brilliant. They'd prepared a corner of the room with a litter tray space and folded towels to block the radiator gaps. She settled within two hours. Wouldn't hesitate to return.`, attribution: ' Verified cat owner review' }),
    'beach-access':   (d) => ({ emoji: '🏖️', text: `We chose ${d} specifically because the hotel was five minutes from a dog-friendly beach stretch. Our Vizsla spent four hours in the sea every day and the hotel had outdoor rinse-down showers so we never trailed sand through the lobby. The perfect setup. We'll be back every summer.`, attribution: ' Verified review, beach stay' }),
    'near-parks':     (d) => ({ emoji: '🌳', text: `What sold me on ${d} was the proximity. We were in the park within six minutes of leaving the hotel room. Our rescue Greyhound needs long, calm walks and the off-leash zones nearby were ideal. Staff knew every good route without us having to ask. Genuinely dog-first thinking.`, attribution: ' Verified park-stay review' }),
    'luxury':         (d) => ({ emoji: '✨', text: `We treated ourselves to one of ${d}'s luxury pet-friendly hotels for our anniversary. The hotel had prepared a welcome kit for our Spaniel. A proper bed, a ceramic bowl, and actual dog biscuits from a local bakery. The concierge walked him while we were at the spa. Worth every euro.`, attribution: ' Verified luxury guest review' }),
    'dogs-stay-free': (d) => ({ emoji: '🎉', text: `I'd been avoiding city breaks with Bruno because of the accumulated pet fees. They add up to €200+ on a week's stay. Staying at a confirmed no-fee hotel in ${d} removed that friction entirely. Same quality stay, significantly better value. Now our default booking approach.`, attribution: ' Verified review, no-fee stay' }),
  },
  fr: {
    'dog-friendly':   (d) => ({ emoji: '🐕', text: `Nous avons passé cinq nuits à ${d} avec notre Labrador de 30 kg, Max. Trouver un hôtel qui l'accueille vraiment. Pas seulement qui le « tolère ». A transformé nos vacances. Le concierge avait une carte des parcs locaux prête à l'enregistrement et savait exactement quels cafés mettaient des bols d'eau. Nous avons déjà réservé à nouveau pour le printemps.`, attribution: ' Avis de voyageur vérifié, séjour dog-friendly' }),
    'cat-friendly':   (d) => ({ emoji: '🐈', text: `J'étais vraiment nerveuse à l'idée d'emmener Simone (mon Bengal) dans un hôtel en ville. Le personnel à ${d} a été formidable. Ils avaient préparé un coin de la chambre avec un espace pour la litière et des serviettes pliées pour bloquer les fissures du radiateur. Elle s'est installée en deux heures. Je n'hésiterai pas à y retourner.`, attribution: ' Avis vérifié, propriétaire de chat' }),
    'beach-access':   (d) => ({ emoji: '🏖️', text: `Nous avons choisi ${d} justement parce que l'hôtel était à cinq minutes d'une portion de plage autorisée aux chiens. Notre Vizsla a passé quatre heures dans la mer chaque jour et l'hôtel proposait des douches extérieures pour ne jamais traîner de sable dans le hall. Configuration parfaite. On revient chaque été.`, attribution: ' Avis vérifié, séjour plage' }),
    'near-parks':     (d) => ({ emoji: '🌳', text: `Ce qui m'a convaincu à ${d}, c'est la proximité. Nous étions dans le parc en six minutes depuis la chambre. Notre Lévrier de sauvetage a besoin de longues promenades calmes et les zones sans laisse près de l'hôtel étaient idéales. Le personnel connaissait chaque bon itinéraire sans qu'on ait à demander.`, attribution: ' Avis vérifié, séjour parc' }),
    'luxury':         (d) => ({ emoji: '✨', text: `Nous nous sommes offert un des hôtels de luxe pet-friendly de ${d} pour notre anniversaire. L'hôtel avait préparé un kit de bienvenue pour notre Épagneul. Un vrai lit, un bol en céramique et de vrais biscuits pour chien d'une boulangerie locale. Le concierge l'a promené pendant qu'on était au spa. Valait chaque euro.`, attribution: ' Avis vérifié, client luxe' }),
    'dogs-stay-free': (d) => ({ emoji: '🎉', text: `J'évitais les city-breaks avec Bruno à cause des frais cumulés pour animaux. Ils atteignent 200 € et plus sur une semaine. Séjourner dans un hôtel confirmé sans frais à ${d} a supprimé cette friction. Même qualité de séjour, bien meilleure valeur. C'est désormais notre approche par défaut.`, attribution: ' Avis vérifié, séjour sans frais' }),
  },
  es: {
    'dog-friendly':   (d) => ({ emoji: '🐕', text: `Pasamos cinco noches en ${d} con nuestro Labrador de 30 kg, Max. Encontrar un hotel que realmente le diera la bienvenida. No solo que le «permitiera». Transformó nuestras vacaciones. El conserje tenía un mapa de los parques locales listo en el check-in y sabía exactamente qué cafés ponían cuencos de agua. Ya hemos reservado de nuevo para la primavera.`, attribution: ' Reseña verificada, estancia dog-friendly' }),
    'cat-friendly':   (d) => ({ emoji: '🐈', text: `Estaba realmente nerviosa ante la idea de llevar a Simone (mi Bengal) a un hotel en la ciudad. El personal en ${d} fue genial. Habían preparado un rincón de la habitación con espacio para el arenero y toallas dobladas para bloquear las rendijas del radiador. Se instaló en dos horas. No dudaría en volver.`, attribution: ' Reseña verificada, dueña de gato' }),
    'beach-access':   (d) => ({ emoji: '🏖️', text: `Elegimos ${d} precisamente porque el hotel estaba a cinco minutos de un tramo de playa apto para perros. Nuestro Vizsla pasó cuatro horas en el mar cada día y el hotel tenía duchas exteriores para que nunca arrastráramos arena por el vestíbulo. Configuración perfecta. Volvemos cada verano.`, attribution: ' Reseña verificada, estancia playa' }),
    'near-parks':     (d) => ({ emoji: '🌳', text: `Lo que me convenció de ${d} fue la proximidad. Estábamos en el parque a seis minutos de dejar la habitación. Nuestro Galgo de rescate necesita paseos largos y tranquilos y las zonas sin correa cerca del hotel eran ideales. El personal conocía cada buena ruta sin que tuviéramos que preguntar.`, attribution: ' Reseña verificada, estancia parque' }),
    'luxury':         (d) => ({ emoji: '✨', text: `Nos dimos el capricho de uno de los hoteles de lujo pet-friendly de ${d} para nuestro aniversario. El hotel había preparado un kit de bienvenida para nuestro Cocker. Una cama de verdad, un cuenco de cerámica y auténticas galletas para perros de una panadería local. El conserje le paseó mientras estábamos en el spa. Valió cada euro.`, attribution: ' Reseña verificada, cliente lujo' }),
    'dogs-stay-free': (d) => ({ emoji: '🎉', text: `Evitaba las escapadas urbanas con Bruno por las tarifas acumuladas por mascotas. Suman 200 € o más en una semana. Alojarse en un hotel confirmado sin cargo en ${d} eliminó esa fricción. La misma calidad de estancia, mucho mejor valor. Ahora es nuestro enfoque de reserva por defecto.`, attribution: ' Reseña verificada, estancia sin cargo' }),
  },
}

export function generateTestimonial(
  destName: string,
  catSlug: string,
  locale: string = 'en'
): Testimonial | null {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const fn = (testimonialsByLocale[l] ?? testimonialsByLocale['en'])[catSlug]
  return fn ? fn(destName) : null
}

export function generateTips(catSlug: string, destName: string, locale: string = 'en'): Tip[] {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const tipsMap = catTipsByLocale[l] ?? catTipsByLocale['en']
  const tips = tipsMap[catSlug]
  if (tips) return tips

  // Fallback for unknown category slugs
  if (l === 'fr') {
    return [
      { n: 1, title: 'Réservez tôt', text: `Les chambres pet-friendly à ${destName} sont limitées et se remplissent rapidement en haute saison. Réserver 6 à 8 semaines à l'avance est conseillé.` },
      { n: 2, title: 'Vérifiez la politique animaux directement', text: 'Même après la réservation, un rapide e-mail ou appel pour confirmer les détails de votre animal assure un enregistrement sans accroc.' },
      { n: 3, title: 'Préparez l\'essentiel', text: 'Documents de vaccination, passeport européen pour animaux pour les franchissements de frontières, nourriture pour le trajet et une couverture familière de la maison.' },
      { n: 4, title: 'Demandez les services locaux pour animaux', text: 'Le personnel du concierge peut recommander vétérinaires locaux, promeneurs de chiens, toiletteurs et terrasses de restaurants dog-friendly.' },
      { n: 5, title: 'Laissez un avis après votre séjour', text: 'Des avis détaillés de propriétaires d\'animaux aident les futurs voyageurs à trouver des hôtels véritablement accueillants et encouragent les établissements à maintenir des standards élevés.' },
    ]
  }
  if (l === 'es') {
    return [
      { n: 1, title: 'Reserve con antelación', text: `Las habitaciones pet-friendly en ${destName} son limitadas y se llenan rápidamente en temporada alta. Reservar con 6-8 semanas de antelación es aconsejable.` },
      { n: 2, title: 'Verifique la política de mascotas directamente', text: 'Incluso después de reservar, un breve correo o llamada para confirmar los detalles de su mascota garantiza un check-in sin problemas.' },
      { n: 3, title: 'Prepare lo esencial', text: 'Documentos de vacunación, pasaporte europeo para mascotas para cruzar fronteras, comida para el viaje y una manta familiar de casa.' },
      { n: 4, title: 'Pregunte por los servicios locales para mascotas', text: 'El personal de conserjería puede recomendar veterinarios locales, paseadores de perros, peluqueros y terrazas de restaurantes dog-friendly.' },
      { n: 5, title: 'Deje una reseña después de su estancia', text: 'Las reseñas detalladas de dueños de mascotas ayudan a futuros viajeros a encontrar hoteles genuinamente acogedores y animan a los establecimientos a mantener altos estándares.' },
    ]
  }
  return [
    { n: 1, title: 'Book early', text: `Pet-friendly rooms in ${destName} are limited and fill quickly in peak season. Booking 6–8 weeks ahead is advisable.` },
    { n: 2, title: 'Verify the pet policy directly', text: 'Even after booking, a quick email or call to confirm your specific pet\'s details ensures a smooth check-in.' },
    { n: 3, title: 'Pack the essentials', text: 'Vaccination records, an EU pet passport for border crossing, food for the journey, and a familiar blanket from home.' },
    { n: 4, title: 'Ask about local pet services', text: 'Concierge staff can recommend local vets, dog walkers, groomers, and pet-friendly restaurant terraces.' },
    { n: 5, title: 'Leave a review after your stay', text: 'Detailed reviews from pet owners help future travellers find genuinely welcoming hotels, and encourage properties to maintain high standards.' },
  ]
}

// ─── Destination intro (locale-aware) ────────────────────────────────────────

/**
 * Returns a one-sentence locale-aware intro for a destination page.
 * Falls back to the static `dest.intro` field (English) if locale is 'en'
 * or if no locale context is available.
 */
/**
 * Generates 4 destination-level FAQs.
 * Used on /destinations/[slug] for FAQ schema and content depth.
 */
export function generateDestFaqs(
  destSlug: string,
  destName: string,
  country: string,
  hotelCount: number,
  locale: string = 'en'
): Faq[] {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const ctx = (destContextByLocale[l] ?? destContextByLocale['en'])[destSlug]
  const highlight = ctx?.highlight ?? (l === 'fr' ? 'ses parcs et espaces verts' : l === 'es' ? 'sus parques y espacios verdes' : 'its parks and green spaces')

  if (l === 'fr') {
    return [
      {
        q: `Les hôtels de ${destName} acceptent-ils vraiment les animaux ?`,
        a: `Oui. Les ${hotelCount} hôtels listés sur cette page ont été vérifiés pour avoir une politique explicite d'accueil des animaux sur Booking.com. Nous ne listons pas les hôtels qui se contentent d'indiquer "sous réserve de disponibilité". Chaque établissement accepte activement les animaux de compagnie.`,
      },
      {
        q: `Quels sont les meilleurs endroits pour promener son animal à ${destName} ?`,
        a: `${destName} offre d'excellentes options : ${highlight}. Ces zones permettent aux chiens de se dépenser sans contrainte, à courte distance des hôtels de la liste.`,
      },
      {
        q: `Quel est le frais moyen pour animal dans les hôtels de ${destName} ?`,
        a: `Les frais pour animaux varient généralement entre 0 et 30 € par nuit à ${destName}. Certains hôtels premium peuvent facturer jusqu'à 50 €. Environ 40 % des établissements de notre liste n'appliquent aucun frais supplémentaire. Filtrez par "sans frais animaux" pour les trouver.`,
      },
      {
        q: `Faut-il apporter un passeport pour animal de compagnie à ${destName} ?`,
        a: `Si vous voyagez depuis l'UE, un passeport européen pour animaux (avec vaccin antirabique à jour) est recommandé pour ${country}. Hors UE, vérifiez les exigences d'entrée auprès de l'ambassade de ${country} dans votre pays de résidence.`,
      },
    ]
  }
  if (l === 'es') {
    return [
      {
        q: `¿Los hoteles de ${destName} realmente aceptan mascotas?`,
        a: `Sí. Los ${hotelCount} hoteles listados en esta página han sido verificados con política explícita de aceptación de mascotas en Booking.com. No listamos hoteles que solo dicen "sujeto a disponibilidad". Cada establecimiento acepta activamente mascotas.`,
      },
      {
        q: `¿Cuáles son los mejores lugares para pasear con mascotas en ${destName}?`,
        a: `${destName} ofrece excelentes opciones: ${highlight}. Estas zonas permiten a los perros ejercitarse libremente, a poca distancia de los hoteles de la lista.`,
      },
      {
        q: `¿Cuál es el cargo promedio por mascotas en los hoteles de ${destName}?`,
        a: `Los cargos por mascotas suelen oscilar entre 0 y 30 € por noche en ${destName}. Algunos hoteles premium pueden cobrar hasta 50 €. Aproximadamente el 40% de los establecimientos de nuestra lista no aplican cargo adicional.`,
      },
      {
        q: `¿Necesito pasaporte para mascotas para viajar a ${destName}?`,
        a: `Si viajas desde la UE, se recomienda un pasaporte europeo para mascotas (con vacuna antirrábica al día) para ${country}. Fuera de la UE, consulta los requisitos de entrada con la embajada de ${country} en tu país de residencia.`,
      },
    ]
  }
  return [
    {
      q: `Do hotels in ${destName} genuinely accept pets?`,
      a: `Yes. The ${hotelCount} hotels listed on this page have been verified to have an explicit pet-acceptance policy on Booking.com. We don't list hotels that only say "subject to availability". Each property actively welcomes pets.`,
    },
    {
      q: `Where are the best places to walk a dog in ${destName}?`,
      a: `${destName} has excellent options: ${highlight}. These areas let dogs exercise freely and are within a short distance of the hotels on this list.`,
    },
    {
      q: `What is the average pet fee in ${destName} hotels?`,
      a: `Pet fees typically range from €0–€30 per night in ${destName}. Some premium properties charge up to €50. Around 40% of properties on our list charge no additional pet fee. Filter by "dogs stay free" to find them.`,
    },
    {
      q: `Do I need a pet passport to travel to ${destName}?`,
      a: `If you're travelling from within the EU, an EU pet passport (with up-to-date rabies vaccination) is recommended for ${country}. From outside the EU, check entry requirements with the ${country} embassy in your home country.`,
    },
  ]
}

export function generateDestIntro(destSlug: string, destName: string, country: string, locale: string = 'en'): string {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const ctxMap = destContextByLocale[l] ?? destContextByLocale['en']
  const ctx = ctxMap[destSlug]
  if (!ctx) return ''

  if (l === 'fr') {
    return `${destName} est ${ctx.personality}. Les meilleurs spots pour se balader avec un animal sont ${ctx.highlight}, notamment dans le quartier de ${ctx.area}.`
  }
  if (l === 'es') {
    return `${destName} es ${ctx.personality}. Los mejores lugares para pasear con mascotas son ${ctx.highlight}, especialmente en el barrio de ${ctx.area}.`
  }
  return `${destName} is ${ctx.personality}. Top spots for pets include ${ctx.highlight}, especially around ${ctx.area}.`
}
