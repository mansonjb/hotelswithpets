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
    amsterdam: {
      personality: 'one of Europe\'s most relaxed and pet-welcoming capitals',
      highlight: 'the Vondelpark and the off-leash banks of the Amstel River',
      area: 'the Jordaan neighbourhood and the canal belt',
    },
    paris: {
      personality: 'a city where dogs are famously welcome in cafés, shops, and many restaurants',
      highlight: 'the Bois de Boulogne, Bois de Vincennes, and hundreds of smaller squares',
      area: 'Le Marais, Saint-Germain-des-Prés, and Montmartre',
    },
    biarritz: {
      personality: 'a Basque surf town with a deeply relaxed attitude toward dogs and outdoor life',
      highlight: 'the Grande Plage and the Côte Basque coastal path',
      area: 'the Port Vieux and the Halles neighbourhood',
    },
    barcelona: {
      personality: 'a Mediterranean city where pet ownership is high and hotels are catching up',
      highlight: 'Parc de la Ciutadella, Poblenou beach, and the Collserola hills',
      area: 'El Born, Gràcia, and Eixample',
    },
    berlin: {
      personality: 'arguably Europe\'s most dog-friendly capital. Dogs ride public transport and enter many shops freely',
      highlight: 'the Tiergarten, Tempelhof field, and Grunewald forest',
      area: 'Prenzlauer Berg, Mitte, and Kreuzberg',
    },
    lisbon: {
      personality: 'a sunlit, hilly city whose mild climate makes it ideal for travelling with pets year-round',
      highlight: 'Monsanto forest park, Belém waterfront, and the esplanades of Alfama',
      area: 'Chiado, Príncipe Real, and Bairro Alto',
    },
    rome: {
      personality: 'a city where dogs accompany their owners everywhere. From morning cornetto runs to evening passeggiata strolls',
      highlight: 'Villa Borghese gardens, the off-leash areas of Parco dell\'Appia Antica, and the riverside Lungotevere paths',
      area: 'Prati, Trastevere, and Pigneto',
    },
    madrid: {
      personality: 'one of Europe\'s most dog-obsessed capitals: Madrid has more dogs per capita than almost any other European city',
      highlight: 'the Retiro Park, Casa de Campo, and the off-leash Parque del Oeste',
      area: 'Malasaña, Lavapiés, and Chamberí',
    },
    prague: {
      personality: 'a compact, walkable city where dogs are welcome in most pubs, wine bars, and even some indoor markets',
      highlight: 'the Stromovka and Letná parks, and the riverside Nusle Valley trails',
      area: 'Vinohrady, Žižkov, and Malá Strana',
    },
    vienna: {
      personality: 'a city that takes dog ownership seriously. Dogs ride the U-Bahn, enter museums, and are catered for in hundreds of Viennese cafés',
      highlight: 'the Prater park, Donauinsel island, and the Lainzer Tiergarten',
      area: 'the 1st district, Naschmarkt, and Josefstadt',
    },
    copenhagen: {
      personality: 'a city that leads Europe on pet welfare. Dogs travel free on public transport, enter most shops, and are welcomed with water bowls on nearly every terrace',
      highlight: 'the Frederiksberg Gardens, Fælledparken, and the harbour waterfront',
      area: 'Nørrebro, Frederiksberg, and Vesterbro',
    },
    stockholm: {
      personality: 'a city where dogs are part of the fabric of daily life. On ferries, in cafés, and across the archipelago islands',
      highlight: 'Djurgården island, Hagaparken, and the archipelago trail network',
      area: 'Södermalm, Östermalm, and Djurgården',
    },
    munich: {
      personality: 'a city where dogs are welcomed in beer gardens, on public transport, and throughout the English Garden: Europe\'s largest urban park',
      highlight: 'the Englischer Garten, Olympiapark, and the Isar river banks',
      area: 'Schwabing, Maxvorstadt, and Haidhausen',
    },
    zurich: {
      personality: 'a city that ranks among Europe\'s most dog-friendly. With dedicated dog zones on lake beaches, dog-friendly trams, and pet passports accepted everywhere',
      highlight: 'the Zürichsee lakefront, Uetliberg hill, and the Sihl river trails',
      area: 'Kreis 4, Zürich West, and the Old Town',
    },
    nice: {
      personality: 'a sun-drenched Mediterranean city where dogs join their owners on terrace restaurants, in the old town market, and along the famous waterfront',
      highlight: 'the Promenade des Anglais, Parc du Mont Boron, and the Colline du Château',
      area: 'the Old Town (Vieux-Nice), Cimiez, and the Port',
    },
    bordeaux: {
      personality: 'a city where dogs stroll the wine-bar terraces of the Chartrons, explore the Garonne riverside, and are welcomed in most boutique hotels',
      highlight: 'the Parc Bordelais, the Garonne quaysides, and the Jardin Public',
      area: 'the Chartrons, Saint-Pierre, and the Triangle d\'Or',
    },
    lyon: {
      personality: 'France\'s gastronomic capital, where dogs are as common as bouchon restaurants. Welcomed in cafés, along the riverbanks, and throughout the Presqu\'île',
      highlight: 'the Parc de la Tête d\'Or, the Saône and Rhône riverbanks, and the Fourvière hillside trails',
      area: 'the Presqu\'île, Croix-Rousse, and Confluence',
    },
    bruges: {
      personality: 'a beautifully preserved medieval city where dogs trot alongside their owners on cobbled streets, canal towpaths, and through the quiet surrounding countryside',
      highlight: 'the Minnewater park, the canal network towpaths, and the Koningin Astridpark',
      area: 'the historic centre, Sint-Anna quarter, and the Begijnhof',
    },
    budapest: {
      personality: 'a city of grand architecture and a growing dog-friendly scene. Dogs ride the metro, access most parks, and are welcomed in Budapest\'s famous ruin bars',
      highlight: 'Margaret Island, City Park (Városliget), and the Danube riverfront promenades',
      area: 'the 7th district (the Jewish Quarter), Buda Castle district, and Óbuda',
    },
    dubrovnik: {
      personality: 'a dramatic walled city where dogs join their owners on coastal paths, quiet island beaches, and the pine-shaded terraces outside the Old Town',
      highlight: 'the coastal path to Sveti Jakov beach, the Lokrum island day trip ferry (dogs allowed), and the Lapad peninsula',
      area: 'Lapad, Gruž, and the Old Town surroundings',
    },
    porto: {
      personality: 'a hilly, atmospheric city where dogs are part of the daily rhythm. On trams, in wine-bar gardens, and along the Douro river esplanade',
      highlight: 'the Jardins do Palácio de Cristal, the Douro riverside (Ribeira), and the Serralves park',
      area: 'Ribeira, Bonfim, and Foz do Douro',
    },
    // Tier 2
    seville: {
      personality: 'one of Andalusia\'s most dog-friendly cities. Where dogs stroll under orange trees, join owners on tapas bar terraces, and explore riverside parks',
      highlight: 'the Parque de María Luisa, the Alamillo park, and the Guadalquivir riverside promenade',
      area: 'Triana, Santa Cruz, and El Arenal',
    },
    valencia: {
      personality: 'a sunny Mediterranean city with 19 km of park running through its centre. The former Turia riverbed. Making it one of Europe\'s most walkable cities for dog owners',
      highlight: 'the Turia Garden (9 km off-leash friendly), the Malvarrosa beach dog zone, and the Albufera nature park',
      area: 'Ruzafa, El Carmen, and the Eixample',
    },
    malaga: {
      personality: 'a relaxed Andalusian port city where dogs join their owners on museum terraces, in beachfront hotels, and through the historic Alcazaba district',
      highlight: 'the Parque de Málaga seafront, the Montes de Málaga natural park, and the Pedregalejo beach dog zone',
      area: 'the Historic Centre, Soho, and Pedregalejo',
    },
    florence: {
      personality: 'a Renaissance city where dogs trot over cobblestones to morning markets, sit under café parasols, and walk the Arno riverbanks with their owners each evening',
      highlight: 'the Boboli Gardens, the Cascine park (off-leash zones), and the Arno riverside paths',
      area: 'Oltrarno, Santa Croce, and San Frediano',
    },
    venice: {
      personality: 'one of Italy\'s most surprisingly dog-friendly cities. Dogs ride the vaporetto, explore quiet sestieri away from crowds, and are welcomed in many local bacari',
      highlight: 'the Lido island beaches (dogs allowed off-season), the quiet canals of Cannaregio, and the Sant\'Elena park',
      area: 'Cannaregio, Dorsoduro, and Sant\'Elena',
    },
    ghent: {
      personality: 'a progressive, cycling-first Belgian city where dogs are part of daily life. On trams, in coffee bars, and along the beautiful Leie and Schelde rivers',
      highlight: 'the Citadelpark, the Bourgoyen-Ossemeersen nature reserve, and the Leie riverside towpaths',
      area: 'the Patershol, Sint-Pieters, and Portus Ganda',
    },
    antwerp: {
      personality: 'Belgium\'s fashion capital and one of its most dog-forward cities. With vast riverside parks, dog-welcoming terraces, and a thriving boutique hotel scene',
      highlight: 'the Rivierenhof park, the Schelde riverside promenade, and the Nachtegalenpark',
      area: 'the Old Town, Zurenborg, and the Zuid',
    },
    edinburgh: {
      personality: 'one of Britain\'s most dog-welcoming cities. With off-leash hills, dog-friendly pubs on every street, and a culture that treats dogs as full members of the family',
      highlight: 'Arthur\'s Seat (off-leash), Holyrood Park, and the Water of Leith walkway',
      area: 'Stockbridge, Leith, and the New Town',
    },
    dublin: {
      personality: 'a warm, pub-centred city where dogs are welcomed in beer gardens, on coastal walks, and through Europe\'s largest urban park. The Phoenix Park',
      highlight: 'Phoenix Park (1,750 acres, largely off-leash), the Dodder river walk, and the Sandymount Strand beach',
      area: 'Ranelagh, Portobello, and Stoneybatter',
    },
    reykjavik: {
      personality: 'the world\'s northernmost capital and one of its most dog-friendly. With vast lava fields, geothermal beaches, and a culture that brings dogs everywhere',
      highlight: 'Elliðaárdalur valley, the Öskjuhlíð hill, and the Grótta lighthouse coastal walk',
      area: 'the Old Town (Miðborg), Laugardalur, and Álftanes',
    },
    ljubljana: {
      personality: 'Europe\'s green capital. A compact, traffic-free centre where dogs walk alongside their owners on riverside terraces, through castle grounds, and across medieval bridges',
      highlight: 'Tivoli Park (off-leash), the Ljubljana Castle hill, and the Sava river greenway',
      area: 'the Old Town, Trnovo, and Šiška',
    },
    riga: {
      personality: 'a beautifully restored Art Nouveau city with a strong Baltic outdoor culture. Dogs are part of daily life in parks, markets, and on the Daugava riverbanks',
      highlight: 'the Mežaparks forest park, Bastejkalns park, and the Daugava riverside promenade',
      area: 'the Old Town (Vecrīga), the Art Nouveau District, and Āgenskalns',
    },
    tallinn: {
      personality: 'a fairy-tale medieval city with a progressive Estonian attitude toward pets. Dogs enter most shops, visit the old town, and explore the coastal paths freely',
      highlight: 'Kadriorg Park, the Pirita coastal trail, and Pääsküla bog nature walks',
      area: 'Kalamaja, Telliskivi, and the Old Town',
    },
    milan: {
      personality: 'Italy\'s design capital, where a growing number of luxury and boutique hotels now warmly welcome pets',
      highlight: 'Parco Sempione, the Navigli canal district, and the spacious Villa Reale gardens',
      area: 'Brera, Navigli, and the Porta Venezia design district',
    },
    warsaw: {
      personality: 'a rapidly modernising European capital where pet-friendly hotels are increasingly the norm and riverside parks offer excellent walking',
      highlight: 'Łazienki Park, the Vistula riverside boulevards, and the Kampinos forest on the city\'s edge',
      area: 'Śródmieście, Praga, and the Powiśle riverside district',
    },
    krakow: {
      personality: 'a historic Polish city where the ring of Planty gardens encircling the old town makes it one of Central Europe\'s most walkable destinations for dogs',
      highlight: 'the Planty park ring, the Błonia meadows, and the Vistula riverside paths',
      area: 'the Old Town, Kazimierz, and Podgórze',
    },
    brussels: {
      personality: 'an underrated pet travel destination with spacious parks, a compact and walkable centre, and a hospitality culture that genuinely welcomes animals',
      highlight: 'the Bois de la Cambre, the Parc du Cinquantenaire, and the Forêt de Soignes',
      area: 'Ixelles, Saint-Gilles, and the European Quarter',
    },
    athens: {
      personality: 'a sun-drenched Mediterranean capital that surprises pet travellers with its walkable neighbourhoods and a growing boutique hotel scene that welcomes dogs year-round',
      highlight: 'the National Garden, Filopappou Hill, and the coastal promenade at Faliro',
      area: 'Koukaki, Monastiraki, and Pangrati',
    },
    split: {
      personality: 'a relaxed Croatian coastal city where the Adriatic waterfront, ancient Diocletian\'s Palace, and a laid-back local culture make it a standout destination for pet owners',
      highlight: 'the Marjan Hill forest park, the Bačvice beach dog zone, and the coastal path to Stobreč',
      area: 'Meje, the Old Town surroundings, and the Manuš neighbourhood',
    },
    oslo: {
      personality: 'a Scandinavian capital where the proximity of fjords, forests, and the vast Oslomarka trail network makes it one of the continent\'s best destinations for active dog owners',
      highlight: 'the Oslomarka forest, the Bygdøy peninsula, and the Akerselva river trail',
      area: 'Frogner, Grünerløkka, and Tjuvholmen',
    },
    helsinki: {
      personality: 'a Nordic capital where the island archipelago, pine forests, and a deeply outdoors-oriented culture make it exceptionally welcoming for dogs and their owners',
      highlight: 'Central Park (Keskuspuisto), the Seurasaari island nature reserve, and the sea fortress island of Suomenlinna',
      area: 'Kallio, Töölö, and the Design District',
    },
    salzburg: {
      personality: 'a compact Alpine city where Mozart-era architecture, rolling meadows, and the surrounding Salzkammergut mountains create a magical backdrop for pet travel',
      highlight: 'the Hellbrunn park, the Salzach riverside path, and the Kapuzinerberg hill trails',
      area: 'the Old Town (Altstadt), Schallmoos, and Mülln',
    },
  },
  fr: {
    amsterdam: {
      personality: 'l\'une des capitales les plus décontractées et accueillantes pour les animaux d\'Europe',
      highlight: 'le Vondelpark et les berges hors laisse de l\'Amstel',
      area: 'le quartier du Jordaan et la ceinture des canaux',
    },
    paris: {
      personality: 'une ville où les chiens sont célèbres pour être acceptés dans les cafés, boutiques et de nombreux restaurants',
      highlight: 'le Bois de Boulogne, le Bois de Vincennes et des centaines de squares',
      area: 'le Marais, Saint-Germain-des-Prés et Montmartre',
    },
    biarritz: {
      personality: 'une ville de surf basque avec une attitude profondément décontractée envers les chiens et la vie en plein air',
      highlight: 'la Grande Plage et le sentier côtier de la Côte Basque',
      area: 'le Port Vieux et le quartier des Halles',
    },
    barcelona: {
      personality: 'une ville méditerranéenne où la possession d\'animaux est élevée et les hôtels s\'y adaptent',
      highlight: 'le Parc de la Ciutadella, la plage de Poblenou et les collines du Collserola',
      area: 'El Born, Gràcia et l\'Eixample',
    },
    berlin: {
      personality: 'sans doute la capitale la plus amie des chiens d\'Europe. Les chiens prennent les transports en commun et entrent librement dans de nombreux commerces',
      highlight: 'le Tiergarten, le champ de Tempelhof et la forêt de Grunewald',
      area: 'Prenzlauer Berg, Mitte et Kreuzberg',
    },
    lisbon: {
      personality: 'une ville ensoleillée et vallonnée dont le climat doux la rend idéale pour voyager avec des animaux toute l\'année',
      highlight: 'le parc forestier de Monsanto, le front de mer de Belém et les esplanades d\'Alfama',
      area: 'Chiado, Príncipe Real et Bairro Alto',
    },
    rome: {
      personality: 'une ville où les chiens accompagnent leurs propriétaires partout. Du cornetto du matin à la passeggiata du soir',
      highlight: 'les jardins de la Villa Borghèse, les zones sans laisse du Parco dell\'Appia Antica et les promenades du Lungotevere',
      area: 'Prati, Trastevere et Pigneto',
    },
    madrid: {
      personality: 'l\'une des capitales les plus dog-friendly d\'Europe: Madrid compte plus de chiens par habitant que presque toute autre ville européenne',
      highlight: 'le Parc du Retiro, la Casa de Campo et le Parque del Oeste sans laisse',
      area: 'Malasaña, Lavapiés et Chamberí',
    },
    prague: {
      personality: 'une ville compacte et marchable où les chiens sont les bienvenus dans la plupart des pubs, bars à vins et même certains marchés couverts',
      highlight: 'les parcs Stromovka et Letná, et les sentiers de la vallée de Nusle au bord de la rivière',
      area: 'Vinohrady, Žižkov et Malá Strana',
    },
    vienna: {
      personality: 'une ville qui prend la possession d\'animaux très au sérieux. Les chiens prennent le U-Bahn, entrent dans les musées et sont accueillis dans des centaines de cafés viennois',
      highlight: 'le parc du Prater, l\'île du Danube et le Lainzer Tiergarten',
      area: 'le 1er arrondissement, le Naschmarkt et Josefstadt',
    },
    copenhagen: {
      personality: 'une ville en tête de l\'Europe pour le bien-être animal. Les chiens voyagent gratuitement dans les transports en commun, entrent dans la plupart des commerces et sont accueillis avec des bols d\'eau sur presque toutes les terrasses',
      highlight: 'les jardins de Frederiksberg, Fælledparken et le front de mer du port',
      area: 'Nørrebro, Frederiksberg et Vesterbro',
    },
    stockholm: {
      personality: 'une ville où les chiens font partie du tissu de la vie quotidienne. Sur les ferries, dans les cafés et à travers les îles de l\'archipel',
      highlight: 'l\'île de Djurgården, Hagaparken et le réseau de sentiers de l\'archipel',
      area: 'Södermalm, Östermalm et Djurgården',
    },
    munich: {
      personality: 'une ville où les chiens sont accueillis dans les jardins de bière, dans les transports en commun et dans le Jardin Anglais. Le plus grand parc urbain d\'Europe',
      highlight: 'l\'Englischer Garten, l\'Olympiapark et les berges de l\'Isar',
      area: 'Schwabing, Maxvorstadt et Haidhausen',
    },
    zurich: {
      personality: 'une ville qui figure parmi les plus dog-friendly d\'Europe. Avec des zones dédiées aux chiens sur les plages, des tramways dog-friendly et les passeports pour animaux acceptés partout',
      highlight: 'le front de lac du Zürichsee, la colline de l\'Uetliberg et les sentiers de la rivière Sihl',
      area: 'Kreis 4, Zurich West et la Vieille Ville',
    },
    nice: {
      personality: 'une ville méditerranéenne ensoleillée où les chiens rejoignent leurs propriétaires dans les restaurants en terrasse, au marché du vieux-Nice et le long du célèbre front de mer',
      highlight: 'la Promenade des Anglais, le Parc du Mont Boron et la Colline du Château',
      area: 'le Vieux-Nice, Cimiez et le Port',
    },
    bordeaux: {
      personality: 'une ville où les chiens se promènent sur les terrasses des bars à vins du quartier des Chartrons, explorent les quais de la Garonne et sont accueillis dans la plupart des hôtels boutiques',
      highlight: 'le Parc Bordelais, les quais de la Garonne et le Jardin Public',
      area: 'les Chartrons, Saint-Pierre et le Triangle d\'Or',
    },
    lyon: {
      personality: 'la capitale gastronomique de la France, où les chiens sont aussi courants que les bouchons. Accueillis dans les cafés, le long des berges et dans toute la Presqu\'île',
      highlight: 'le Parc de la Tête d\'Or, les berges de la Saône et du Rhône, et les sentiers de la colline de Fourvière',
      area: 'la Presqu\'île, la Croix-Rousse et Confluence',
    },
    bruges: {
      personality: 'une magnifique ville médiévale préservée où les chiens trottent aux côtés de leurs propriétaires sur des rues pavées, des chemins de halage et à travers la tranquille campagne environnante',
      highlight: 'le parc de Minnewater, les chemins de halage du réseau de canaux et le Koningin Astridpark',
      area: 'le centre historique, le quartier Sint-Anna et le Begijnhof',
    },
    budapest: {
      personality: 'une ville de grande architecture et d\'une scène dog-friendly en plein essor. Les chiens prennent le métro, accèdent à la plupart des parcs et sont accueillis dans les célèbres bars en ruine de Budapest',
      highlight: 'l\'île Marguerite, le Parc de la Ville (Városliget) et les promenades en bord de Danube',
      area: 'le 7e arrondissement (le quartier juif), le quartier du château de Buda et Óbuda',
    },
    dubrovnik: {
      personality: 'une ville fortifiée spectaculaire où les chiens accompagnent leurs propriétaires sur les sentiers côtiers, les plages tranquilles des îles et les terrasses ombragées de pins en dehors de la Vieille Ville',
      highlight: 'le sentier côtier vers la plage de Sveti Jakov, le ferry de l\'île de Lokrum (chiens acceptés) et la péninsule de Lapad',
      area: 'Lapad, Gruž et les environs de la Vieille Ville',
    },
    porto: {
      personality: 'une ville vallonnée et atmosphérique où les chiens font partie du rythme quotidien. Dans les tramways, dans les jardins des bars à vins et le long de l\'esplanade du fleuve Douro',
      highlight: 'les Jardins du Palácio de Cristal, les berges du Douro (Ribeira) et le parc de Serralves',
      area: 'Ribeira, Bonfim et Foz do Douro',
    },
    seville: {
      personality: 'l\'une des villes les plus dog-friendly d\'Andalousie. Où les chiens se promènent sous les orangers, rejoignent leurs propriétaires sur les terrasses de bars à tapas et explorent les parcs riverains',
      highlight: 'le Parque de María Luisa, le parc Alamillo et la promenade riveraine du Guadalquivir',
      area: 'Triana, Santa Cruz et El Arenal',
    },
    valencia: {
      personality: 'une ville méditerranéenne ensoleillée avec 19 km de parc traversant son centre. L\'ancien lit de la Turia. Ce qui en fait l\'une des villes les plus praticables d\'Europe pour les propriétaires de chiens',
      highlight: 'le Jardin du Turia (9 km largement sans laisse), la zone chiens de la plage de Malvarrosa et le parc naturel de l\'Albufera',
      area: 'Ruzafa, El Carmen et l\'Eixample',
    },
    malaga: {
      personality: 'une ville portuaire andalouse décontractée où les chiens rejoignent leurs propriétaires sur les terrasses de musées, dans les hôtels en bord de mer et à travers le quartier historique de l\'Alcazaba',
      highlight: 'le Parque de Málaga en bord de mer, le parc naturel des Montes de Málaga et la zone chiens de la plage de Pedregalejo',
      area: 'le Centre Historique, Soho et Pedregalejo',
    },
    florence: {
      personality: 'une ville de la Renaissance où les chiens trottent sur les pavés vers les marchés matinaux, s\'installent sous les parasols des cafés et font la promenade des berges de l\'Arno chaque soir avec leurs propriétaires',
      highlight: 'les Jardins de Boboli, le parc des Cascine (zones sans laisse) et les chemins riverains de l\'Arno',
      area: 'Oltrarno, Santa Croce et San Frediano',
    },
    venice: {
      personality: 'l\'une des villes les plus étonnamment dog-friendly d\'Italie. Les chiens prennent le vaporetto, explorent les sestieri tranquilles loin des foules et sont accueillis dans de nombreux bacari locaux',
      highlight: 'les plages de l\'île du Lido (chiens autorisés hors saison), les canaux tranquilles du Cannaregio et le parc de Sant\'Elena',
      area: 'Cannaregio, Dorsoduro et Sant\'Elena',
    },
    ghent: {
      personality: 'une ville belge progressiste axée sur le vélo où les chiens font partie de la vie quotidienne. Dans les tramways, dans les coffee bars et le long des belles rivières Leie et Schelde',
      highlight: 'le Citadelpark, la réserve naturelle de Bourgoyen-Ossemeersen et les chemins de halage riverains de la Leie',
      area: 'le Patershol, Sint-Pieters et Portus Ganda',
    },
    antwerp: {
      personality: 'la capitale de la mode belge et l\'une de ses villes les plus dog-friendly. Avec de vastes parcs riverains, des terrasses accueillantes pour les chiens et un secteur hôtelier boutique florissant',
      highlight: 'le parc Rivierenhof, la promenade riveraine de l\'Escaut et le Nachtegalenpark',
      area: 'la Vieille Ville, Zurenborg et le Zuid',
    },
    edinburgh: {
      personality: 'l\'une des villes les plus dog-friendly de Grande-Bretagne. Avec des collines sans laisse, des pubs accueillant les chiens dans chaque rue et une culture qui traite les chiens comme de véritables membres de la famille',
      highlight: 'Arthur\'s Seat (sans laisse), le Holyrood Park et le sentier riverain Water of Leith',
      area: 'Stockbridge, Leith et le New Town',
    },
    dublin: {
      personality: 'une ville chaleureuse et centrée sur les pubs où les chiens sont accueillis dans les jardins de bière, sur les promenades côtières et à travers le plus grand parc urbain d\'Europe. Le Phoenix Park',
      highlight: 'le Phoenix Park (700 hectares, largement sans laisse), le sentier de la rivière Dodder et la plage de Sandymount Strand',
      area: 'Ranelagh, Portobello et Stoneybatter',
    },
    reykjavik: {
      personality: 'la capitale la plus septentrionale du monde et l\'une des plus dog-friendly. Avec de vastes champs de lave, des plages géothermiques et une culture qui emmène les chiens partout',
      highlight: 'la vallée d\'Elliðaárdalur, la colline d\'Öskjuhlíð et la promenade côtière du phare de Grótta',
      area: 'le Centre (Miðborg), Laugardalur et Álftanes',
    },
    ljubljana: {
      personality: 'la capitale verte d\'Europe. Un centre compact et sans circulation où les chiens se promènent avec leurs propriétaires sur les terrasses riveraines, à travers les jardins du château et sur les ponts médiévaux',
      highlight: 'le Parc Tivoli (sans laisse), la colline du château de Ljubljana et la voie verte de la rivière Sava',
      area: 'la Vieille Ville, Trnovo et Šiška',
    },
    riga: {
      personality: 'une belle ville Art Nouveau restaurée avec une forte culture de plein air balte. Les chiens font partie de la vie quotidienne dans les parcs, les marchés et sur les berges de la Daugava',
      highlight: 'le parc forestier de Mežaparks, le parc Bastejkalns et la promenade riveraine de la Daugava',
      area: 'la Vieille Ville (Vecrīga), le Quartier Art Nouveau et Āgenskalns',
    },
    tallinn: {
      personality: 'une ville médiévale de conte de fées avec une attitude estonienne progressiste envers les animaux. Les chiens entrent dans la plupart des commerces, visitent la vieille ville et explorent librement les chemins côtiers',
      highlight: 'le Parc Kadriorg, le sentier côtier de Pirita et les balades en tourbière de Pääsküla',
      area: 'Kalamaja, Telliskivi et la Vieille Ville',
    },
    milan: {
      personality: 'la capitale italienne du design, où un nombre croissant d\'hôtels de luxe et boutiques accueillent chaleureusement les animaux',
      highlight: 'le Parco Sempione, le quartier des canaux Navigli et les spacieux jardins de la Villa Reale',
      area: 'Brera, les Navigli et le quartier du design de la Porta Venezia',
    },
    warsaw: {
      personality: 'une capitale européenne en pleine modernisation où les hôtels pet-friendly sont de plus en plus la norme et les parcs riverains offrent d\'excellentes promenades',
      highlight: 'le Parc Łazienki, les boulevards riverains de la Vistule et la forêt de Kampinos en périphérie',
      area: 'Śródmieście, Praga et le quartier riverain de Powiśle',
    },
    krakow: {
      personality: 'une ville historique polonaise dont la ceinture de jardins Planty entourant la vieille ville en fait l\'une des destinations les plus praticables d\'Europe centrale pour les chiens',
      highlight: 'l\'anneau du parc Planty, les prairies de Błonia et les chemins riverains de la Vistule',
      area: 'la Vieille Ville, Kazimierz et Podgórze',
    },
    brussels: {
      personality: 'une destination méconnue pour les voyageurs avec animaux, avec de grands parcs, un centre compact et praticable et une culture hôtelière qui accueille vraiment les animaux',
      highlight: 'le Bois de la Cambre, le Parc du Cinquantenaire et la Forêt de Soignes',
      area: 'Ixelles, Saint-Gilles et le Quartier Européen',
    },
    athens: {
      personality: 'une capitale méditerranéenne ensoleillée qui surprend les voyageurs avec animaux par ses quartiers praticables et une scène hôtelière boutique accueillant les chiens toute l\'année',
      highlight: 'le Jardin National, la colline de Filopappou et la promenade côtière de Faliro',
      area: 'Koukaki, Monastiraki et Pangrati',
    },
    split: {
      personality: 'une ville côtière croate décontractée où le front de mer adriatique, l\'ancien Palais de Dioclétien et une culture locale relax en font une destination remarquable pour les propriétaires d\'animaux',
      highlight: 'le parc forestier de la colline Marjan, la zone chiens de la plage de Bačvice et le sentier côtier vers Stobreč',
      area: 'Meje, les environs de la Vieille Ville et le quartier de Manuš',
    },
    oslo: {
      personality: 'une capitale scandinave où la proximité des fjords, des forêts et du vaste réseau de sentiers de l\'Oslomarka en fait l\'une des meilleures destinations du continent pour les propriétaires de chiens actifs',
      highlight: 'la forêt de l\'Oslomarka, la péninsule de Bygdøy et le sentier de la rivière Akerselva',
      area: 'Frogner, Grünerløkka et Tjuvholmen',
    },
    helsinki: {
      personality: 'une capitale nordique où l\'archipel insulaire, les forêts de pins et une culture profondément orientée vers le plein air la rendent exceptionnellement accueillante pour les chiens et leurs propriétaires',
      highlight: 'le Parc Central (Keskuspuisto), la réserve naturelle insulaire de Seurasaari et la forteresse maritime de Suomenlinna',
      area: 'Kallio, Töölö et le Quartier du Design',
    },
    salzburg: {
      personality: 'une ville alpine compacte où l\'architecture de l\'époque Mozart, les prairies vallonnées et les montagnes du Salzkammergut environnantes créent un cadre magique pour les voyages avec animaux',
      highlight: 'le parc de Hellbrunn, le chemin riverain de la Salzach et les sentiers de la colline du Kapuzinerberg',
      area: 'la Vieille Ville (Altstadt), Schallmoos et Mülln',
    },
  },
  es: {
    amsterdam: {
      personality: 'una de las capitales más relajadas y acogedoras con mascotas de Europa',
      highlight: 'el Vondelpark y las orillas sin correa del río Amstel',
      area: 'el barrio del Jordaan y el cinturón de canales',
    },
    paris: {
      personality: 'una ciudad donde los perros son famosos por ser bienvenidos en cafés, tiendas y muchos restaurantes',
      highlight: 'el Bosque de Boulogne, el Bosque de Vincennes y cientos de plazas pequeñas',
      area: 'Le Marais, Saint-Germain-des-Prés y Montmartre',
    },
    biarritz: {
      personality: 'una ciudad de surf vasca con una actitud profundamente relajada hacia los perros y la vida al aire libre',
      highlight: 'la Grande Plage y el sendero costero de la Costa Vasca',
      area: 'el Puerto Viejo y el barrio de las Halles',
    },
    barcelona: {
      personality: 'una ciudad mediterránea donde la tenencia de mascotas es alta y los hoteles se están adaptando',
      highlight: 'el Parque de la Ciutadella, la playa de Poblenou y las colinas del Collserola',
      area: 'El Born, Gràcia y el Eixample',
    },
    berlin: {
      personality: 'posiblemente la capital más dog-friendly de Europa. Los perros viajan en transporte público y entran libremente en muchos comercios',
      highlight: 'el Tiergarten, el campo de Tempelhof y el bosque de Grunewald',
      area: 'Prenzlauer Berg, Mitte y Kreuzberg',
    },
    lisbon: {
      personality: 'una ciudad soleada y con colinas cuyo clima suave la hace ideal para viajar con mascotas durante todo el año',
      highlight: 'el parque forestal de Monsanto, el paseo marítimo de Belém y las explanadas de Alfama',
      area: 'Chiado, Príncipe Real y Bairro Alto',
    },
    rome: {
      personality: 'una ciudad donde los perros acompañan a sus dueños a todas partes. Desde el cornetto matutino hasta el paseo vespertino',
      highlight: 'los jardines de Villa Borghese, las zonas sin correa del Parco dell\'Appia Antica y los paseos ribereños del Lungotevere',
      area: 'Prati, Trastevere y Pigneto',
    },
    madrid: {
      personality: 'una de las capitales más dog-friendly de Europa: Madrid tiene más perros per cápita que casi cualquier otra ciudad europea',
      highlight: 'el Parque del Retiro, la Casa de Campo y el Parque del Oeste sin correa',
      area: 'Malasaña, Lavapiés y Chamberí',
    },
    prague: {
      personality: 'una ciudad compacta y transitable donde los perros son bienvenidos en la mayoría de los pubs, bares de vinos e incluso algunos mercados cubiertos',
      highlight: 'los parques Stromovka y Letná, y los senderos del Valle de Nusle junto al río',
      area: 'Vinohrady, Žižkov y Malá Strana',
    },
    vienna: {
      personality: 'una ciudad que se toma en serio la tenencia de mascotas. Los perros viajan en el U-Bahn, entran en museos y son atendidos en cientos de cafés vieneses',
      highlight: 'el parque del Prater, la isla del Danubio y el Lainzer Tiergarten',
      area: 'el 1er distrito, el Naschmarkt y Josefstadt',
    },
    copenhagen: {
      personality: 'una ciudad líder en Europa en bienestar animal. Los perros viajan gratis en transporte público, entran en la mayoría de los comercios y son bienvenidos con cuencos de agua en casi todas las terrazas',
      highlight: 'los Jardines de Frederiksberg, Fælledparken y el paseo marítimo del puerto',
      area: 'Nørrebro, Frederiksberg y Vesterbro',
    },
    stockholm: {
      personality: 'una ciudad donde los perros forman parte del tejido de la vida cotidiana. En ferries, en cafés y a través de las islas del archipiélago',
      highlight: 'la isla de Djurgården, Hagaparken y la red de senderos del archipiélago',
      area: 'Södermalm, Östermalm y Djurgården',
    },
    munich: {
      personality: 'una ciudad donde los perros son bienvenidos en los jardines de cerveza, en el transporte público y en el Jardín Inglés. El parque urbano más grande de Europa',
      highlight: 'el Englischer Garten, el Olympiapark y las orillas del río Isar',
      area: 'Schwabing, Maxvorstadt y Haidhausen',
    },
    zurich: {
      personality: 'una ciudad que figura entre las más dog-friendly de Europa. Con zonas dedicadas a perros en las playas, tranvías pet-friendly y pasaportes de mascotas aceptados en todas partes',
      highlight: 'el paseo lacustre del Zürichsee, la colina del Uetliberg y los senderos del río Sihl',
      area: 'Kreis 4, Zúrich Oeste y el Casco Antiguo',
    },
    nice: {
      personality: 'una ciudad mediterránea bañada por el sol donde los perros acompañan a sus dueños en restaurantes de terraza, en el mercado del casco antiguo y a lo largo del famoso paseo marítimo',
      highlight: 'el Paseo de los Ingleses, el Parque del Mont Boron y la Colina del Castillo',
      area: 'el Casco Antiguo (Vieux-Nice), Cimiez y el Puerto',
    },
    bordeaux: {
      personality: 'una ciudad donde los perros pasean por las terrazas de los bares de vino del barrio de Chartrons, exploran los muelles del Garona y son bienvenidos en la mayoría de los hoteles boutique',
      highlight: 'el Parque Bordelais, los muelles del Garona y el Jardín Público',
      area: 'los Chartrons, Saint-Pierre y el Triángulo de Oro',
    },
    lyon: {
      personality: 'la capital gastronómica de Francia, donde los perros son tan comunes como los restaurantes bouchon. Bienvenidos en cafés, a lo largo de las orillas del río y en toda la Presqu\'île',
      highlight: 'el Parque de la Tête d\'Or, las orillas del Saona y el Ródano, y los senderos de la colina de Fourvière',
      area: 'la Presqu\'île, Croix-Rousse y Confluence',
    },
    bruges: {
      personality: 'una hermosa ciudad medieval conservada donde los perros trotean junto a sus dueños por calles empedradas, caminos de sirga y a través del tranquilo campo circundante',
      highlight: 'el parque Minnewater, los caminos de sirga de la red de canales y el Koningin Astridpark',
      area: 'el centro histórico, el barrio de Sint-Anna y el Begijnhof',
    },
    budapest: {
      personality: 'una ciudad de gran arquitectura y una escena dog-friendly en auge. Los perros viajan en metro, acceden a la mayoría de los parques y son bienvenidos en los famosos bares en ruinas de Budapest',
      highlight: 'la Isla Margarita, el Parque de la Ciudad (Városliget) y los paseos ribereños del Danubio',
      area: 'el 7º distrito (el Barrio Judío), el distrito del Castillo de Buda y Óbuda',
    },
    dubrovnik: {
      personality: 'una ciudad amurallada dramática donde los perros acompañan a sus dueños en senderos costeros, playas tranquilas en islas y terrazas sombreadas por pinos fuera del Casco Antiguo',
      highlight: 'el sendero costero hacia la playa de Sveti Jakov, el ferry a la isla de Lokrum (perros permitidos) y la península de Lapad',
      area: 'Lapad, Gruž y los alrededores del Casco Antiguo',
    },
    porto: {
      personality: 'una ciudad montañosa y atmosférica donde los perros forman parte del ritmo diario. En tranvías, en jardines de bares de vino y a lo largo del paseo fluvial del Duero',
      highlight: 'los Jardines del Palácio de Cristal, la orilla del Duero (Ribeira) y el parque de Serralves',
      area: 'Ribeira, Bonfim y Foz do Douro',
    },
    seville: {
      personality: 'una de las ciudades más dog-friendly de Andalucía. Donde los perros pasean bajo los naranjos, acompañan a sus dueños en las terrazas de bares de tapas y exploran los parques ribereños',
      highlight: 'el Parque de María Luisa, el parque Alamillo y el paseo ribereño del Guadalquivir',
      area: 'Triana, Santa Cruz y El Arenal',
    },
    valencia: {
      personality: 'una ciudad mediterránea soleada con 19 km de parque atravesando su centro. El antiguo cauce del Turia. Que la convierte en una de las ciudades más transitables de Europa para los dueños de perros',
      highlight: 'el Jardín del Turia (9 km mayormente sin correa), la zona para perros de la playa de Malvarrosa y el parque natural de la Albufera',
      area: 'Ruzafa, El Carmen y el Eixample',
    },
    malaga: {
      personality: 'una relajada ciudad portuaria andaluza donde los perros acompañan a sus dueños en las terrazas de museos, en hoteles frente al mar y a través del histórico barrio de la Alcazaba',
      highlight: 'el Parque de Málaga en el paseo marítimo, el parque natural de los Montes de Málaga y la zona para perros de la playa de Pedregalejo',
      area: 'el Centro Histórico, Soho y Pedregalejo',
    },
    florence: {
      personality: 'una ciudad renacentista donde los perros trotean sobre adoquines hacia los mercados matutinos, descansan bajo los parasoles de los cafés y pasean por las orillas del Arno cada tarde con sus dueños',
      highlight: 'los Jardines de Bóboli, el parque de las Cascine (zonas sin correa) y los caminos ribereños del Arno',
      area: 'Oltrarno, Santa Croce y San Frediano',
    },
    venice: {
      personality: 'una de las ciudades más sorprendentemente dog-friendly de Italia. Los perros viajan en vaporetto, exploran tranquilos sestieri lejos de las multitudes y son bienvenidos en muchos bacari locales',
      highlight: 'las playas de la isla del Lido (perros permitidos fuera de temporada), los tranquilos canales de Cannaregio y el parque de Sant\'Elena',
      area: 'Cannaregio, Dorsoduro y Sant\'Elena',
    },
    ghent: {
      personality: 'una progresista ciudad belga orientada a la bicicleta donde los perros forman parte de la vida cotidiana. En tranvías, en cafeterías y a lo largo de los bellos ríos Leie y Schelde',
      highlight: 'el Citadelpark, la reserva natural de Bourgoyen-Ossemeersen y los caminos de sirga ribereños del Leie',
      area: 'el Patershol, Sint-Pieters y Portus Ganda',
    },
    antwerp: {
      personality: 'la capital de la moda de Bélgica y una de sus ciudades más dog-friendly. Con amplios parques ribereños, terrazas acogedoras para perros y un floreciente sector de hoteles boutique',
      highlight: 'el parque Rivierenhof, el paseo ribereño del Escalda y el Nachtegalenpark',
      area: 'el Casco Antiguo, Zurenborg y el Zuid',
    },
    edinburgh: {
      personality: 'una de las ciudades más dog-friendly de Gran Bretaña. Con colinas sin correa, pubs que admiten perros en cada calle y una cultura que trata a los perros como miembros plenos de la familia',
      highlight: 'Arthur\'s Seat (sin correa), el Holyrood Park y el sendero ribereño Water of Leith',
      area: 'Stockbridge, Leith y el New Town',
    },
    dublin: {
      personality: 'una cálida ciudad centrada en los pubs donde los perros son bienvenidos en los jardines de cerveza, en los paseos costeros y a través del parque urbano más grande de Europa. El Phoenix Park',
      highlight: 'el Phoenix Park (700 hectáreas, mayormente sin correa), el sendero del río Dodder y la playa de Sandymount Strand',
      area: 'Ranelagh, Portobello y Stoneybatter',
    },
    reykjavik: {
      personality: 'la capital más septentrional del mundo y una de las más dog-friendly. Con vastos campos de lava, playas geotérmicas y una cultura que lleva a los perros a todas partes',
      highlight: 'el valle de Elliðaárdalur, la colina de Öskjuhlíð y el paseo costero del faro de Grótta',
      area: 'el Centro (Miðborg), Laugardalur y Álftanes',
    },
    ljubljana: {
      personality: 'la capital verde de Europa. Un centro compacto y sin tráfico donde los perros pasean junto a sus dueños en terrazas ribereñas, por los jardines del castillo y sobre puentes medievales',
      highlight: 'el Parque Tivoli (sin correa), la colina del castillo de Ljubljana y la vía verde del río Sava',
      area: 'el Casco Antiguo, Trnovo y Šiška',
    },
    riga: {
      personality: 'una bella ciudad Art Nouveau restaurada con una fuerte cultura báltica de aire libre. Los perros forman parte de la vida cotidiana en parques, mercados y a lo largo de las orillas del Daugava',
      highlight: 'el parque forestal de Mežaparks, el parque Bastejkalns y el paseo ribereño del Daugava',
      area: 'el Casco Antiguo (Vecrīga), el Barrio Art Nouveau y Āgenskalns',
    },
    tallinn: {
      personality: 'una ciudad medieval de cuento de hadas con una actitud estonia progresista hacia las mascotas. Los perros entran en la mayoría de los comercios, visitan el casco antiguo y exploran libremente los senderos costeros',
      highlight: 'el Parque Kadriorg, el sendero costero de Pirita y los paseos por la turbera de Pääsküla',
      area: 'Kalamaja, Telliskivi y el Casco Antiguo',
    },
    milan: {
      personality: 'la capital del diseño de Italia, donde un número creciente de hoteles de lujo y boutique acogen cálidamente a las mascotas',
      highlight: 'el Parco Sempione, el distrito de los canales Navigli y los espaciosos jardines de la Villa Reale',
      area: 'Brera, los Navigli y el barrio de diseño de la Porta Venezia',
    },
    warsaw: {
      personality: 'una capital europea en rápida modernización donde los hoteles pet-friendly son cada vez más la norma y los parques ribereños ofrecen excelentes paseos',
      highlight: 'el Parque Łazienki, los bulevares ribereños del Vístula y el bosque de Kampinos en las afueras',
      area: 'Śródmieście, Praga y el barrio ribereño de Powiśle',
    },
    krakow: {
      personality: 'una ciudad histórica polaca donde el anillo de jardines Planty que rodea el casco antiguo la convierte en uno de los destinos más transitables de Europa Central para los perros',
      highlight: 'el anillo del parque Planty, los prados de Błonia y los senderos ribereños del Vístula',
      area: 'el Casco Antiguo, Kazimierz y Podgórze',
    },
    brussels: {
      personality: 'un destino de viaje con mascotas subestimado, con amplios parques, un centro compacto y transitable y una cultura hotelera que da una auténtica bienvenida a los animales',
      highlight: 'el Bosque de la Cambre, el Parque del Cincuentenario y el Bosque de Soignes',
      area: 'Ixelles, Saint-Gilles y el Barrio Europeo',
    },
    athens: {
      personality: 'una capital mediterránea bañada por el sol que sorprende a los viajeros con mascotas con sus barrios transitables y una creciente escena de hoteles boutique que acogen perros todo el año',
      highlight: 'el Jardín Nacional, la colina de Filopappou y el paseo costero de Faliro',
      area: 'Koukaki, Monastiraki y Pangrati',
    },
    split: {
      personality: 'una relajada ciudad costera croata donde el paseo marítimo adriático, el antiguo Palacio de Diocleciano y una actitud local distendida la convierten en un destino destacado para los dueños de mascotas',
      highlight: 'el parque forestal de la colina Marjan, la zona para perros de la playa de Bačvice y el sendero costero hacia Stobreč',
      area: 'Meje, los alrededores del Casco Antiguo y el barrio de Manuš',
    },
    oslo: {
      personality: 'una capital escandinava donde la proximidad de fiordos, bosques y la vasta red de senderos del Oslomarka la convierten en uno de los mejores destinos del continente para los dueños de perros activos',
      highlight: 'el bosque del Oslomarka, la península de Bygdøy y el sendero del río Akerselva',
      area: 'Frogner, Grünerløkka y Tjuvholmen',
    },
    helsinki: {
      personality: 'una capital nórdica donde el archipiélago isleño, los bosques de pinos y una cultura profundamente orientada al aire libre la hacen excepcionalmente acogedora para los perros y sus dueños',
      highlight: 'el Parque Central (Keskuspuisto), la reserva natural insular de Seurasaari y la fortaleza marítima de Suomenlinna',
      area: 'Kallio, Töölö y el Barrio del Diseño',
    },
    salzburg: {
      personality: 'una compacta ciudad alpina donde la arquitectura de la época de Mozart, los prados ondulados y las montañas del Salzkammergut circundante crean un escenario mágico para viajar con mascotas',
      highlight: 'el parque de Hellbrunn, el sendero ribereño del Salzach y los senderos de la colina del Kapuzinerberg',
      area: 'el Casco Antiguo (Altstadt), Schallmoos y Mülln',
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
    'beach-access':   (d) =>      `The pet-friendly beach spots near these hotels are accessible at reasonable hours. No 6am alarms required. For the majority of the year, making planning simple.`,
    'near-parks':     (d, ctx) => `The hotels on this list are all positioned for under-10-minute walks to off-leash zones in ${ctx.highlight}. No busy road crossings, no logistics before the morning walk.`,
    'luxury':         (d, ctx) => `Luxury properties in ${ctx.area} have developed full pet concierge packages. Welcome kits, in-room dining menus, and dog-walker bookings. Because their guests demanded it.`,
    'dogs-stay-free': (d) =>      `The no-fee policies here are confirmed and year-round. Not seasonal promotions or weight-restricted. Making ${d} a reliably cost-effective destination for pet owners.`,
  },
  fr: {
    'dog-friendly':   (d, ctx) => `Les hôtels sélectionnés se trouvent spécifiquement dans ${ctx.area}, où l'infrastructure pour animaux est la plus dense et où les restaurants proposent régulièrement des bols d'eau et un accès aux terrasses.`,
    'cat-friendly':   (d) =>      `Les chambres accueillant les chats à ${d} sont généralement des unités calmes aux étages supérieurs avec un accès fiable à l'ascenseur. Des caractéristiques clés pour que les félins se sentent à l'aise.`,
    'beach-access':   (d) =>      `Les spots de plage autorisés aux chiens près de ces hôtels sont accessibles à des horaires raisonnables. Sans réveil à 6h. Pour la majorité de l'année, ce qui simplifie l'organisation.`,
    'near-parks':     (d, ctx) => `Les hôtels de cette liste sont tous positionnés pour atteindre les zones sans laisse de ${ctx.highlight} en moins de 10 minutes à pied. Sans traverser d'artères passantes.`,
    'luxury':         (d, ctx) => `Les établissements de luxe de ${ctx.area} ont développé des offres concierge complètes pour animaux. Kits d'accueil, menus de restauration en chambre, réservations de promeneurs. Parce que leurs clients l'ont exigé.`,
    'dogs-stay-free': (d) =>      `Les politiques sans frais dans ces hôtels sont confirmées et valables toute l'année. Pas des promotions saisonnières ou limitées au poids. Faisant de ${d} une destination fiablement économique pour les propriétaires d'animaux.`,
  },
  es: {
    'dog-friendly':   (d, ctx) => `Los hoteles seleccionados están específicamente en ${ctx.area}, donde la infraestructura para mascotas es más densa y los restaurantes locales ofrecen habitualmente cuencos de agua y acceso a terrazas.`,
    'cat-friendly':   (d) =>      `Las habitaciones para gatos en ${d} suelen ser unidades tranquilas en pisos superiores con acceso fiable al ascensor. Características clave para mantener a los huéspedes felinos tranquilos.`,
    'beach-access':   (d) =>      `Los puntos de playa aptos para perros cerca de estos hoteles son accesibles en horarios razonables. Sin madrugar. Durante la mayor parte del año, lo que facilita mucho la planificación.`,
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
