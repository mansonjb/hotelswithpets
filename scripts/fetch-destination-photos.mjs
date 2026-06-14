/**
 * Fetches hero photos for destinations missing images.
 * Targets a pet-travel relevant landmark in each city (park, waterfront, etc.)
 *
 * Usage: node scripts/fetch-destination-photos.mjs
 */
import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'destinations')

async function loadApiKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY
  const env = await readFile(path.join(ROOT, '.env.local'), 'utf-8')
  const match = env.match(/GOOGLE_PLACES_API_KEY=(.+)/)
  if (match) return match[1].trim()
  throw new Error('No GOOGLE_PLACES_API_KEY')
}

// Slug → query targeting a photogenic, pet-relevant landmark
const TARGETS = [
  { slug: 'bled',          query: 'Bled Slovenia Lake Bled emerald glacial alpine lake Blejski otok Bled Island Pilgrimage Church Assumption clifftop Blejski grad Bled Castle Julian Alps Karavanke pletna wooden rowboats Triglav National Park panorama sunset' },
  { slug: 'bruges',        query: 'Bruges Brugge Belgium West Flanders UNESCO medieval Markt belfry Belfort gabled guild houses Burg Stadhuis Heilig Bloed Basiliek Rozenhoedkaai canal view Reien Minnewater Lake of Love Begijnhof whitewashed Sint-Janshuismolen windmill ramparts Vesten panorama sunset' },
  { slug: 'ostend',        query: 'Ostend Oostende Belgium West Flanders Royal Resort North Sea Albert I-promenade Kursaal casino concert hall Visserskaai fishing quay Mercator three-master Lange Nelle lighthouse Marvin Gaye statue James Ensor house Maria Hendrika Park Marie-Jose park Atlantikwall Raversijde dunes Spuikom inland lake Kusttram coastal tram panorama sunset' },
  { slug: 'ghent',         query: 'Ghent Gent Belgium East Flanders UNESCO Korenmarkt Belfort belfry Sint-Niklaaskerk Saint Bavo Cathedral Sint-Baafskathedraal Van Eyck Mystic Lamb Graslei Korenlei medieval guild house quays Leie river Gravensteen Counts of Flanders moated castle Patershol oldest quarter Vrijdagmarkt cuberdon Sint-Michielsbrug three-tower view Citadelpark Blaarmeersen dog beach panorama sunset' },
  { slug: 'corfu',         query: 'Corfu Kerkyra Greece Ionian UNESCO Old Town Liston arcade Spianada esplanade Old Fortress Venetian fortress harbour Palace of St Michael and St George British neoclassical Mon Repos villa park Kanoni Pontikonisi Mouse Island Vlacherna monastery causeway Paleokastritsa cliffs turquoise coves panorama sunset' },
  { slug: 'santorini',     query: 'Santorini Thira Greece Cyclades caldera Fira capital whitewashed cliff-top village blue-domed church Oia sunset Imerovigli Skaros Rock Pyrgos hilltop village Kasteli castle Akrotiri Minoan Bronze Age archaeological site Red Beach Black Beach Perissa Vlychada lunar bluffs Aegean volcanic island panorama sunset' },
  { slug: 'haarlem',       query: 'Haarlem Netherlands Grote Markt Grote Sint-Bavokerk cathedral Frans Hals tomb Mozart Muller organ Spaarne river De Adriaan windmill hofjes Haarlemmerhout panorama sunset' },
  { slug: 'delft',         query: 'Delft Netherlands Markt Nieuwe Kerk William of Orange tomb Royal House mausoleum Stadhuis Renaissance city hall Oude Kerk Vermeer burial leaning tower Oude Delft oldest canal Beestenmarkt Royal Delft Koninklijke Porceleyne Fles porcelain manufactory Oostpoort medieval gate panorama sunset' },
  { slug: 'leiden',        query: 'Leiden Netherlands oldest university 1575 Rembrandt birthplace Burcht van Leiden 12th century circular castle artificial hill Hooglandse Kerk Pieterskerk Pilgrim Fathers Mayflower 1620 Rapenburg canal Universiteit Academiegebouw Hortus Botanicus oldest botanical garden 1590 Molen De Valk windmill Plantage oldest urban park 1656 Singelpark green ring panorama sunset' },
  { slug: 'groningen',     query: 'Groningen Netherlands northern capital Martinitoren 96m tallest church tower Dutch north 1469 1627 Grote Markt Martinikerk Vismarkt Korenbeurs 1865 Akerk Hoge der A canal merchants gabled houses Noorderplantsoen central park 1830 Stadspark Reitdiep waterway Rijksuniversiteit 1614 Academiegebouw Prinsentuin Renaissance garden 1626 cycling capital bakfiets panorama sunset' },
  { slug: 'texel',         query: 'Texel Netherlands Wadden island North Sea dunes Eierland lighthouse red Vuurtoren De Koog beach Paal 17 De Slufter salt marsh Den Burg cobbled square Duinen van Texel National Park panorama sunset' },
  { slug: 'sintra',        query: 'Sintra Portugal Palacio da Pena polychrome romantic palace Serra de Sintra UNESCO panorama sunset' },
  { slug: 'lagos',         query: 'Lagos Portugal Algarve Ponta da Piedade cliffs Atlantic golden coast panorama sunset' },
  { slug: 'guimaraes',     query: 'Guimaraes Portugal medieval castle Largo da Oliveira Paco dos Duques UNESCO birthplace panorama sunset' },
  { slug: 'setubal',       query: 'Setubal Portugal Sado estuary Serra da Arrabida Praia da Figueirinha bottlenose dolphins Troia ferry panorama sunset' },
  { slug: 'narbonne',      query: 'Narbonne France Cathedrale Saint-Just Gothic Canal de la Robine Cours Mirabeau Les Halles Languedoc panorama sunset' },
  { slug: 'beziers',       query: 'Beziers France Cathedrale Saint-Nazaire hilltop Pont Vieux Orb Neuf Ecluses Fonserannes Canal du Midi UNESCO panorama sunset' },
  { slug: 'sete',          query: 'Sete France Venice of Languedoc canals Mont Saint-Clair Cimetiere Marin Pointe Courte Etang de Thau Mediterranean panorama sunset' },
  { slug: 'calais',        query: 'Calais France Channel ferry port Hotel de Ville belfry UNESCO Tour du Guet lighthouse Plage de Calais Cap Blanc-Nez chalk cliffs Dover white cliffs panorama sunset' },
  { slug: 'boulogne-sur-mer', query: 'Boulogne-sur-Mer France Pas-de-Calais Cote d Opale Haute-Ville ramparts medieval walls Cathedrale Notre-Dame dome Chateau Musee port de peche Nausicaa aquarium seafront Cap d Alprech lighthouse panorama sunset' },
  { slug: 'dunkerque',     query: 'Dunkerque France Nord Cote d Opale Beffroi Saint-Eloi UNESCO belfry Place Jean Bart Bassin du Commerce Musee Portuaire Duchesse Anne three-masted ship Malo-les-Bains Digue de Mer beach Dune Marchand panorama sunset' },
  { slug: 'sorrento',      query: 'Sorrento Italy Campania Bay of Naples Amalfi Coast gateway cliff town Piazza Tasso Marina Grande old fishing port gozzi Villa Comunale clifftop gardens Vesuvius Vallone dei Mulini ravine Chiostro San Francesco Marina Piccola ferry hydrofoil Capri panorama sunset' },
  { slug: 'siena',         query: 'Siena Italy Tuscany UNESCO World Heritage shell-shaped Piazza del Campo Torre del Mangia Palazzo Pubblico Duomo Cathedral white black marble stripes Fortezza Medicea ramparts Crete Senesi rolling hills Palio horse race contrade medieval city panorama sunset' },
  { slug: 'matera',        query: 'Matera Italy Basilicata UNESCO World Heritage Sassi cave dwellings Sasso Caveoso Sasso Barisano limestone tufa cliffs Gravina ravine rupestrian rock churches Madonna de Idris San Pietro Caveoso Cattedrale Belvedere Murgia Timone Parco della Murgia Materana European Capital of Culture 2019 panorama sunset' },
  { slug: 'miami',         query: 'Miami Florida South Beach Art Deco pastel hotel facades Ocean Drive Lummus Park promenade Lincoln Road pedestrian mall Wynwood Walls outdoor murals Brickell waterfront skyline Biscayne Bay Vizcaya gardens Coconut Grove panorama sunset' },
  { slug: 'los-angeles',   query: 'Los Angeles California Griffith Observatory Art Deco Hollywood Sign view Mount Hollywood Griffith Park urban wilderness Runyon Canyon Hollywood Hills trails Santa Monica Pier Pacific Ocean Venice Boardwalk Abbot Kinney Getty Center travertine campus Downtown LA skyline Bunker Hill panorama sunset' },
  { slug: 'menton',        query: 'Menton France Cote dAzur eastern Riviera Italian border Baroque old town Vieille Ville ochre pink facades Basilique Saint-Michel-Archange Parvis Saint-Michel Grimaldi black white pebble mosaic Promenade du Soleil seafront Jardins Bioves citrus Fete du Citron lemon sculptures Cap Martin Sentier Le Corbusier coastal path panorama sunset' },
  { slug: 'saint-tropez',  query: 'Saint-Tropez France Var Cote dAzur western Riviera Provencal harbour Vieux Port red awning Senequier cafe ochre fishermen houses yachts pointu boats Citadelle hilltop 16th century Musee Histoire Maritime esplanade Place des Lices plane trees petanque market Tuesday Saturday Pampelonne 5 km beach Ramatuelle Sentier du Littoral coastal path Cap de Saint-Tropez Massif des Maures panorama sunset' },
  { slug: 'villefranche-sur-mer', query: 'Villefranche-sur-Mer France Alpes-Maritimes Cote dAzur deep natural harbour ochre amphitheatre Vieille Ville colorful houses Rue Obscure 13th century covered medieval passage Citadelle Saint-Elme 16th century Musee Volti Chapelle Saint-Pierre des Pecheurs Jean Cocteau frescoes 1957 Port de la Sante Port de la Darse Plage des Marinieres 1 km longest beach Cote dAzur Cap Ferrat Sentier du Littoral Pointe Saint-Hospice Plage de Passable Villa Ephrussi de Rothschild panorama sunset' },
  { slug: 'kaunas',        query: 'Kaunas Lithuania Old Town Town Hall Pažaislis Monastery Modernist UNESCO Laisvės Alėja panorama sunset' },
  { slug: 'regensburg',    query: 'Regensburg Germany Steinerne Brucke stone bridge Cathedral Danube UNESCO old town panorama sunset' },
  { slug: 'poznan',        query: 'Poznan Poland Stary Rynek Old Market Square Town Hall colorful tenements Renaissance panorama sunset' },
  { slug: 'freiburg',      query: 'Freiburg Germany Munsterplatz Cathedral Bachle cobbled streets Schwabentor Black Forest panorama sunset' },
  { slug: 'klagenfurt',    query: 'Klagenfurt Austria Worthersee lake Lindwurmbrunnen dragon fountain Carinthia panorama sunset' },
  { slug: 'klaipeda',      query: 'Klaipeda Lithuania Old Town Theatre Square Aennchen von Tharau Memel wooden houses Baltic panorama sunset' },
  { slug: 'neringa',       query: 'Nida Neringa Lithuania Parnidis dune sundial Curonian Spit colourful weathervane fisherman houses lagoon panorama sunset' },
  { slug: 'bayonne',       query: 'Bayonne France Vieux Bayonne Nive river red-shuttered Basque houses cathedral panorama sunset' },
  { slug: 'vitoria-gasteiz', query: 'Vitoria-Gasteiz Spain Plaza de la Virgen Blanca Casco Medieval Anillo Verde panorama sunset' },
  { slug: 'getxo',         query: 'Getxo Spain Vizcaya Bridge Puente Colgante Bay of Biscay Algorta old port panorama sunset' },
  { slug: 'arles',         query: 'Arles France Roman amphitheatre Arenes Provence Camargue Rhone Van Gogh panorama sunset' },
  { slug: 'nimes',         query: 'Nimes France Arenes Roman amphitheatre Maison Carree Jardins de la Fontaine Tour Magne panorama sunset' },
  { slug: 'toulon',        query: 'Toulon France Mediterranean port Mont Faron Mourillon beach Cote d\'Azur panorama sunset' },
  { slug: 'angers',        query: 'Angers France Chateau medieval fortress Maine river Loire Valley panorama' },
  { slug: 'ajaccio',       query: 'Ajaccio Corsica France marina old town Citadel Mediterranean panorama' },
  { slug: 'cadiz',         query: 'Cadiz Spain old town cathedral Atlantic ramparts La Caleta panorama' },
  { slug: 'albufeira',     query: 'Albufeira Portugal Algarve cliffs old town beach Atlantic panorama' },
  { slug: 'alcudia',       query: 'Alcudia Mallorca Spain medieval walls casc antic Pollentia Roman ruins Platja sandy beach S Albufera wetland panorama sunset' },
  { slug: 'alicante',      query: 'Alicante Spain Santa Bárbara castle Mediterranean Explanada palm trees panorama' },
  { slug: 'denia',         query: 'Denia Spain Costa Blanca Castillo Moorish fortress Montgo Natural Park port Marina Alta panorama sunset' },
  { slug: 'calpe',         query: 'Calpe Spain Costa Blanca Penon de Ifach limestone rock natural park Mediterranean bay marina panorama sunset' },
  { slug: 'bergamo',       query: 'Bergamo Italy Citta Alta Piazza Vecchia Venetian walls Lombardy panorama' },
  { slug: 'brasov',        query: 'Brasov Romania Council Square Black Church Carpathian mountains panorama' },
  { slug: 'marseille',     query: 'Vieux Port Marseille waterfront' },
  { slug: 'rotterdam',     query: 'Erasmus Bridge Rotterdam waterfront' },
  { slug: 'bologna',       query: 'Piazza Maggiore Bologna' },
  { slug: 'rimini',        query: 'Rimini Italy Ponte di Tiberio Roman bridge Borgo San Giuliano Adriatic panorama' },
  { slug: 'aveiro',        query: 'Aveiro Portugal canals colourful moliceiro boats Art Nouveau Venice of Portugal panorama' },
  { slug: 'perpignan',     query: 'Perpignan France Le Castillet red brick gateway Catalan old town canal panorama' },
  { slug: 'bolzano',       query: 'Bolzano Italy Piazza Walther Dolomites panorama' },
  { slug: 'zadar',         query: 'Zadar Croatia Sea Organ Greeting to the Sun sunset Adriatic Old Town' },
  { slug: 'tours',         query: 'Tours France Place Plumereau half-timbered houses Vieux-Tours panorama' },
  { slug: 'burgos',        query: 'Burgos Spain Cathedral Catedral Santa Maria Gothic spires Arlanzon river Castilla panorama sunset' },
  { slug: 'cologne',       query: 'Cologne Cathedral Rhine river' },
  { slug: 'san-sebastian', query: 'La Concha beach San Sebastian' },
  { slug: 'santander',    query: 'Santander Spain Cantabria Playa del Sardinero Magdalena peninsula bay panorama sunset' },
  { slug: 'a-coruna',     query: 'A Coruna Spain Galicia Torre de Hercules Roman lighthouse UNESCO Atlantic Paseo Maritimo Riazor Orzan Monte San Pedro Marina galleries panorama sunset' },
  { slug: 'toulouse',      query: 'Place du Capitole Toulouse' },
  { slug: 'torun',         query: 'Torun Poland UNESCO Old Town brick Gothic Town Hall Leaning Tower Vistula panorama sunset' },
  { slug: 'bilbao',        query: 'Guggenheim Museum Bilbao titanium exterior' },
  { slug: 'montpellier',  query: 'Place de la Comedie Montpellier fountain' },
  { slug: 'nantes',       query: 'Chateau des Ducs de Bretagne Nantes' },
  { slug: 'frankfurt',    query: 'Romerberg Frankfurt old town skyline' },
  { slug: 'verona',      query: 'Arena di Verona Roman amphitheatre Piazza Bra' },
  { slug: 'padua',       query: 'Prato della Valle Padova canal statues' },
  { slug: 'naples',      query: 'Naples skyline Vesuvius Castel dellOvo' },
  { slug: 'new-york',    query: 'Manhattan skyline Central Park New York' },
  { slug: 'strasbourg', query: 'Petite France Strasbourg half-timbered houses canals' },
  { slug: 'granada', query: 'Alhambra Granada Nasrid Palace aerial view' },
  { slug: 'hamburg', query: 'Speicherstadt Hamburg warehouse district canals' },
  { slug: 'turin',   query: 'Mole Antonelliana Turin Piazza Castello sunset' },
  { slug: 'hannover', query: 'Neues Rathaus Hannover Maschsee reflection' },
  { slug: 'palma', query: 'La Seu Cathedral Palma de Mallorca waterfront' },
  { slug: 'soller', query: 'Port de Soller Mallorca natural horseshoe bay Tramuntana lighthouse sunset panorama' },
  { slug: 'valldemossa', query: 'Valldemossa Mallorca village Real Cartuja Tramuntana stone houses bell tower cypress sunset panorama' },
  { slug: 'mahon', query: 'Port de Mao Mahon Menorca harbour whitewashed townhouses panorama sunset' },
  { slug: 'ciutadella', query: 'Ciutadella de Menorca Placa des Born Ajuntament Catedral honey-coloured port cliffs sunset Mediterranean panorama' },
  { slug: 'thessaloniki', query: 'White Tower Thessaloniki waterfront promenade' },
  { slug: 'cannes', query: 'Cannes La Croisette seafront promenade' },
  { slug: 'capri', query: 'Capri Italy Faraglioni rocks Marina Piccola Mediterranean panorama' },
  { slug: 'gothenburg', query: 'Gothenburg Haga district historic wooden houses' },
  { slug: 'lausanne', query: 'Lausanne Ouchy lakeside Lake Geneva panorama' },
  { slug: 'geneva', query: 'Geneva Jet d Eau Lake Geneva Mont Blanc bridge panorama' },
  { slug: 'bern', query: 'Bern Switzerland Altstadt Aare river UNESCO old town panorama' },
  { slug: 'genoa', query: 'Genoa Italy Porto Antico harbour Lanterna lighthouse panorama' },
  { slug: 'the-hague', query: 'Hofvijver Binnenhof The Hague reflection panorama' },
  { slug: 'brighton', query: 'Brighton seafront West Pier sunset i360 panorama' },
  { slug: 'bratislava', query: 'Bratislava Castle Danube sunset panorama Old Town' },
  { slug: 'vilnius', query: 'Vilnius Old Town panorama Gediminas Tower Cathedral sunset' },
  { slug: 'pisa', query: 'Pisa Leaning Tower Cathedral Piazza dei Miracoli sunset' },
  { slug: 'piran', query: 'Piran Slovenia Tartini Square Adriatic sunset' },
  { slug: 'sofia', query: 'Sofia Alexander Nevsky Cathedral Vitosha mountain panorama sunset' },
  { slug: 'bucharest', query: 'Bucharest Romanian Athenaeum Calea Victoriei panorama sunset' },
  { slug: 'belgrade', query: 'Belgrade Kalemegdan fortress Sava Danube confluence sunset panorama' },
  { slug: 'manchester', query: 'Manchester Castlefield basin canal Beetham Tower skyline' },
  { slug: 'glasgow', query: 'Glasgow Cathedral Necropolis skyline River Clyde panorama' },
  { slug: 'luxembourg', query: 'Luxembourg City Bock fortifications Alzette valley sunset panorama' },
  { slug: 'lille', query: 'Lille Grand Place Vieille Bourse flemish gabled architecture sunset' },
  { slug: 'zagreb', query: 'Zagreb Croatia St Marks Church colourful tiled roof Upper Town panorama sunset' },
  { slug: 'stuttgart', query: 'Stuttgart Germany Schlossplatz Neues Schloss panorama sunset vineyard hills' },
  { slug: 'bath', query: 'Bath England Royal Crescent Georgian terrace honey stone panorama sunset' },
  { slug: 'belfast', query: 'Belfast Northern Ireland city hall Titanic Quarter panorama sunset' },
  { slug: 'cordoba', query: 'Cordoba Spain Mezquita Cathedral Roman Bridge Guadalquivir sunset panorama' },
  { slug: 'wroclaw', query: 'Wroclaw Poland Rynek market square colourful gabled townhouses Town Hall sunset panorama' },
  { slug: 'bristol', query: 'Bristol England Clifton Suspension Bridge Avon Gorge sunset panorama' },
  { slug: 'bergen', query: 'Bergen Norway Bryggen colourful wooden Hanseatic wharf Fløyen panorama sunset' },
  { slug: 'utrecht', query: 'Utrecht Netherlands Domtoren cathedral tower Oudegracht canal werven sunset panorama' },
  { slug: 'dresden', query: 'Dresden Germany Frauenkirche Brühlsche Terrasse Elbe river Canaletto skyline sunset panorama' },
  { slug: 'aarhus', query: 'Aarhus Denmark ARoS rainbow rooftop Den Gamle By harbour panorama sunset' },
  { slug: 'ibiza', query: 'Ibiza Spain Dalt Vila old town harbour Mediterranean sunset panorama' },
  { slug: 'santa-eulalia', query: 'Santa Eulalia des Riu Ibiza Spain Puig de Missa whitewashed church-fortress hilltop Riu Santa Eulalia river Pont Vell Roman bridge mil de baix windmill Paseo Maritimo Marina Cala Llonga Es Canar Cala Nova east coast Mediterranean panorama sunset' },
  { slug: 'formentera', query: 'Formentera Ses Illetes beach lighthouse La Mola Balearic Mediterranean Posidonia panorama sunset' },
  { slug: 'innsbruck', query: 'Innsbruck Austria Goldenes Dachl Nordkette Alps skyline panorama sunset' },
  { slug: 'galway', query: 'Galway Ireland Spanish Arch Long Walk Claddagh harbour colourful houses panorama sunset' },
  { slug: 'cork', query: 'Cork Ireland Saint Fin Barre Cathedral River Lee Georgian skyline panorama sunset' },
  { slug: 'york', query: 'York England city walls York Minster Shambles medieval cobbled street panorama sunset' },
  { slug: 'cambridge', query: 'Cambridge England Kings College Chapel Backs River Cam punting bridge panorama sunset' },
  { slug: 'cagliari', query: 'Cagliari Sardinia Italy Castello hilltop bastione Mediterranean panorama' },
  { slug: 'brno', query: 'Brno Czech Republic Spilberk Castle namesti Svobody Petrov Cathedral old town panorama sunset' },
  { slug: 'leipzig', query: 'Leipzig Germany Markt square Augustusplatz Volkerschlachtdenkmal panorama sunset' },
  { slug: 'liepaja', query: 'Liepaja Latvia Baltic Sea beach Holy Trinity Cathedral Soviet Karosta panorama sunset' },
  { slug: 'jurmala', query: 'Jurmala Latvia Dzintari beach pier wooden Art Nouveau dachas Baltic panorama sunset' },
  { slug: 'gdynia', query: 'Gdynia Poland Skwer Kosciuszki marina Dar Pomorza Sea Towers Orlowo pier Baltic panorama sunset' },
  { slug: 'maastricht', query: 'Maastricht Netherlands Vrijthof square Sint Servaasbasiliek Maas river panorama sunset' },
  { slug: 'lecce', query: 'Lecce Italy Piazza Duomo Basilica Santa Croce baroque pietra leccese centro storico panorama sunset' },
  { slug: 'heidelberg', query: 'Heidelberg Germany Schloss castle Alte Brucke Neckar Philosophenweg Altstadt panorama sunset' },
  { slug: 'annecy', query: 'Annecy France Palais de l Isle Vieille Ville canals lake Alps panorama sunset' },
  { slug: 'tampere', query: 'Tampere Finland Tammerkoski rapids Pyynikki ridge tower lake panorama sunset' },
  { slug: 'basel', query: 'Basel Switzerland Munster cathedral red sandstone Rhine river Mittlere Brucke Altstadt panorama sunset' },
  { slug: 'faro', query: 'Faro Portugal Arco da Vila Cidade Velha Cathedral Ria Formosa Algarve panorama sunset' },
  { slug: 'avignon', query: 'Avignon France Palais des Papes Pont Saint Benezet Rocher des Doms Provence panorama sunset' },
  { slug: 'stavanger', query: 'Stavanger Norway Gamle Stavanger wooden Old Town Vågen harbour Lysefjord panorama sunset' },
  { slug: 'zaragoza', query: 'Zaragoza Spain Basilica del Pilar Ebro river Puente de Piedra panorama sunset' },
  { slug: 'toledo', query: 'Toledo Spain Mirador del Valle Casco Historico Cathedral Alcazar Tagus gorge panorama sunset' },
  { slug: 'evora', query: 'Evora Portugal Roman Temple Praca do Giraldo Cathedral Alentejo cork oak panorama sunset' },
  { slug: 'liverpool', query: 'Liverpool Royal Albert Dock Three Graces Pier Head waterfront Mersey panorama sunset' },
  { slug: 'dusseldorf', query: 'Dusseldorf Medienhafen Gehry buildings Rheinturm Rhine waterfront panorama sunset' },
  { slug: 'gdansk', query: 'Gdansk Poland Dlugi Targ Neptune Fountain Mariacka colourful gabled houses Hanseatic panorama sunset' },
  { slug: 'trondheim', query: 'Trondheim Norway Nidaros Cathedral Bakklandet Gamle Bybro wooden quarter Nidelva panorama sunset' },
  { slug: 'reims', query: 'Reims France Notre-Dame Cathedral Palais du Tau Place Drouet d Erlon Champagne UNESCO panorama sunset' },
  { slug: 'salamanca', query: 'Salamanca Spain Plaza Mayor golden sandstone Catedral Nueva Vieja Casa de las Conchas UNESCO panorama sunset' },
  { slug: 'oxford', query: 'Oxford England Radcliffe Camera All Souls dreaming spires honey limestone university panorama sunset' },
  { slug: 'aix-en-provence', query: 'Aix en Provence France Cours Mirabeau plane trees fountain hotels particuliers Provence panorama sunset' },
  { slug: 'coimbra', query: 'Coimbra Portugal University hilltop Se Velha Mondego river Pedro Ines bridge UNESCO panorama sunset' },
  { slug: 'modena', query: 'Modena Italy Piazza Grande Duomo Ghirlandina tower UNESCO Emilia Romagna Romanesque panorama sunset' },
  { slug: 'nuremberg', query: 'Nuremberg Germany Kaiserburg Imperial Castle Altstadt half-timbered Pegnitz river Bavaria panorama sunset' },
  { slug: 'graz', query: 'Graz Austria Schlossberg Uhrturm clock tower Altstadt red rooftops Mur river Styria UNESCO panorama sunset' },
  { slug: 'lucerne', query: 'Lucerne Switzerland Chapel Bridge Kapellbrucke Wasserturm Reuss river Mount Pilatus Vierwaldstattersee Altstadt panorama sunset' },
  { slug: 'interlaken', query: 'Interlaken Switzerland Bernese Oberland Bödeli Höhematte protected meadow Eiger Mönch Jungfrau panorama Harder Kulm funicular Two Lakes Bridge Lake Thun Lake Brienz turquoise Aare river Unterseen Jungfraubahn paragliders sunset' },
  { slug: 'grindelwald', query: 'Grindelwald Switzerland Bernese Oberland Jungfrau Region Eiger north face village Eigergletscher First Cliff Walk Tissot sky-walk 2168m Bachalpsee alpine lake mirror reflection Schreckhorn Wetterhorn Männlichen ridge Pfingstegg Bäregg glacier viewpoint Gletscherschlucht canyon wooden walkways Hauptstrasse chalet wooden houses Wetterhorn alpenglow panorama sunset' },
  { slug: 'montreux', query: 'Montreux Switzerland Swiss Riviera Lake Geneva Quais Fleuris flowered promenade Freddie Mercury statue Casino palm trees Château de Chillon Dents du Midi Lavaux UNESCO vineyards Belle Époque sunset panorama' },
  { slug: 'bremen', query: 'Bremen Germany Marktplatz Town Hall Roland Statue Stadtmusikanten Schnoor Hanseatic Weser river panorama sunset' },
  { slug: 'heraklion', query: 'Heraklion Crete Greece Koules Venetian fortress old harbour walls Lions Square Morosini Fountain panorama sunset' },
  { slug: 'lucca', query: 'Lucca Italy Renaissance walls Piazza Anfiteatro Guinigi Tower Tuscany medieval cobbled panorama sunset' },
  { slug: 'pamplona', query: 'Pamplona Spain Plaza del Castillo Citadel walls Navarra Hemingway Cathedral panorama sunset' },
  { slug: 'palermo', query: 'Palermo Sicily Italy Quattro Canti baroque Cathedral Arab-Norman Monte Pellegrino Mondello panorama sunset' },
  { slug: 'cascais', query: 'Cascais Portugal marina old town Cidadela fortress Atlantic seafront Estoril coast panorama sunset' },
  { slug: 'funchal', query: 'Funchal Madeira Portugal harbour bay marina cable car amphitheatre Atlantic panorama sunset' },
  { slug: 'bari', query: 'Bari Italy Old Town Bari Vecchia Basilica San Nicola Lungomare Adriatic sea harbour panorama sunset' },
  { slug: 'catania', query: 'Catania Sicily Italy Piazza Duomo Fontana dell Elefante cathedral Mount Etna panorama sunset' },
  { slug: 'cesky-krumlov', query: 'Cesky Krumlov Czech Republic castle Vltava river bend old town UNESCO panorama' },
  { slug: 'rovinj', query: 'Rovinj Croatia Istria Adriatic Venetian Stari Grad peninsula pastel houses harbour fishing port sv. Eufemije church 60m belltower San Marco Balbi Arch Grisia artist colony Punta Corrente forest park panorama sunset' },
  { slug: 'pula', query: 'Pula Croatia Istria Roman Arena amphitheatre 1st century Vespasian Forum Temple Augustus Arch Sergii Porta Gemina Kastel fortress harbour Verudela peninsula Adriatic panorama sunset' },
  { slug: 'hvar', query: 'Hvar Croatia Dalmatia sun island lavender Hvar Town Saint Stephen square cathedral Arsenal 1612 theatre Fortica Spanjola fortress Pakleni Islands archipelago Franciscan Monastery harbour cliffside Adriatic panorama sunset' },
  { slug: 'sitges', query: 'Sitges Spain Catalan seaside Sant Bartomeu cliff church Passeig Maritim Costa del Garraf sunset' },
  { slug: 'cadaques', query: 'Cadaques Spain Catalan Costa Brava pueblo blanco whitewashed houses Esglesia Santa Maria baroque church Cap de Creus headland Port Lligat Dali house bay sunset panorama' },
  { slug: 'tarragona', query: 'Tarragona Spain Roman amphitheatre Costa Daurada Mediterranean Balco del Mediterrani panorama sunset' },
  { slug: 'tarifa', query: 'Tarifa Spain Cadiz Strait of Gibraltar Castillo Guzman el Bueno casco antiguo Playa Los Lances kitesurf Morocco coast panorama sunset' },
  { slug: 'nazare', query: 'Nazaré Praia do Norte cliffs big wave Portugal Forte São Miguel Arcanjo lighthouse Sítio funicular Atlantic panorama sunset' },
  { slug: 'ericeira', query: 'Ericeira Portugal World Surfing Reserve Ribeira d Ilhas WSL clifftop old town Praia dos Pescadores fishermen harbour Atlantic sunset panorama' },
  { slug: 'tavira', query: 'Tavira Portugal eastern Algarve Ponte Romana seven arches Rio Gilao whitewashed centro historico Castelo de Tavira Igreja Santa Maria do Castelo Praca da Republica Mercado Municipal Ria Formosa salinas flamingos Ilha de Tavira ferry Quatro Aguas Atlantic barrier island panorama sunset' },
  { slug: 'cardiff', query: 'Cardiff Castle Wales city centre Bute Park River Taff panorama' },
  { slug: 'carcassonne', query: 'Carcassonne France medieval citadel ramparts UNESCO walled city sunset' },
  { slug: 'bonn', query: 'Bonn Germany Altes Rathaus Markt square Rhine river Beethoven city panorama sunset' },
  { slug: 'malmo', query: 'Malmö Sweden Turning Torso skyline Western Harbour Øresund coastline panorama sunset' },
  { slug: 'uppsala', query: 'Uppsala Sweden Cathedral Domkyrka twin spires Fyrisån river view sunset panorama' },
  { slug: 'linz', query: 'Linz Austria Hauptplatz baroque square Pöstlingberg basilica Danube river view panorama sunset' },
  { slug: 'valletta', query: 'Valletta Malta Grand Harbour Upper Barrakka Gardens sunset panorama' },
  { slug: 'braga', query: 'Braga Portugal Bom Jesus do Monte baroque staircase Sé Cathedral panorama' },
  { slug: 'como', query: 'Como Italy lake waterfront cathedral Duomo Alps panorama sunset' },
  { slug: 'bournemouth', query: 'Bournemouth Dorset England pier beach Jurassic coast panorama' },
  { slug: 'caen', query: 'Caen Normandy France Castle William Conqueror Abbey aux Hommes panorama' },
  { slug: 'trieste', query: 'Trieste Italy Piazza Unita d Italia seafront Castello Miramare Habsburg Adriatic Friuli panorama sunset' },
  { slug: 'rennes', query: 'Rennes Brittany France Parlement de Bretagne half-timbered medieval centre Place des Lices Vilaine panorama sunset' },
  { slug: 'hallstatt', query: 'Hallstatt Austria UNESCO lakeside village Salzkammergut Dachstein mountain reflection postcard panorama sunrise' },
  { slug: 'zermatt',   query: 'Zermatt Switzerland Matterhorn mountain village Alps Valais panorama sunrise' },
  { slug: 'st-moritz', query: 'St. Moritz Switzerland Engadin Graubünden alpine luxury resort Lej da San Murezzan frozen lake Cresta Run Muottas Muragl funicular panorama sunset' },
  { slug: 'lugano',    query: 'Lugano Switzerland Ticino lake Monte San Salvatore lakefront promenade palms panorama sunset' },
  { slug: 'locarno',   query: 'Locarno Switzerland Ticino Lago Maggiore Piazza Grande open square arcades pastel facades Madonna del Sasso pilgrimage sanctuary funicular Orselina hillside Cardada Cimetta cable car 1670m alpine panorama Castello Visconteo 12th century Città Vecchia medieval lanes Lungolago palms magnolias camellias Brissago Islands botanical garden Verzasca valley emerald river panorama sunset' },
  { slug: 'santiago-de-compostela', query: 'Santiago de Compostela Spain Cathedral Praza do Obradoiro Galicia old town granite spires panorama sunset' },
  { slug: 'vigo', query: 'Vigo Spain Ria de Vigo port harbour Castro park Cies Islands Galicia Atlantic panorama sunset' },
  { slug: 'marbella', query: 'Marbella Spain Casco Antiguo Plaza de los Naranjos whitewashed old town Andalusia Mediterranean panorama' },
  { slug: 'antibes', query: 'Antibes France Vieille Ville Vauban port Mediterranean ramparts Cap d Antibes panorama sunset' },
  { slug: 'hyeres', query: 'Hyeres France Vieille Ville medieval streets palm trees Var Mediterranean panorama sunset' },
  { slug: 'frejus', query: 'Frejus France Roman amphitheatre Provencal old town Esterel red rocks Mediterranean panorama sunset' },
  { slug: 'brest', query: 'Brest France Tanguy Tower harbour Penfeld river drawbridge Atlantic Brittany panorama sunset' },
  { slug: 'vannes', query: 'Vannes France medieval walls ramparts half-timbered houses Gulf of Morbihan Brittany panorama sunset' },
  { slug: 'tromso', query: 'Tromso Norway Arctic Cathedral Ishavskatedralen Tromsobrua bridge Fjellheisen cable car snowy mountains fjord panorama' },
  { slug: 'villach', query: 'Villach Austria Hauptplatz Drava river Faaker See lake Carinthia panorama sunset' },
  { slug: 'sankt-polten', query: 'Sankt Polten Austria Rathausplatz Baroque Altstadt Lower Austria Traisen Klangturm panorama sunset' },
  { slug: 'san-francisco', query: 'San Francisco California Golden Gate Bridge skyline Pacific bay Crissy Field panorama sunset' },
  { slug: 'chicago', query: 'Chicago Illinois skyline Lake Michigan lakefront Cloud Gate Bean Millennium Park Riverwalk panorama sunset' },
  { slug: 'boston', query: 'Boston Massachusetts New England historic skyline State House gold dome Beacon Hill Boston Common Public Garden swan boats Charles River Esplanade Hatch Shell Back Bay brownstones Freedom Trail red brick Faneuil Hall Quincy Market North End Old North Church Acorn Street cobblestone Harborwalk Seaport panorama sunset' },
  { slug: 'chania', query: 'Chania Crete Greece Venetian Harbour Egyptian Lighthouse Firkas Fortress Old Town Splantzia Yiali Tzami mosque White Mountains panorama sunset' },
  { slug: 'sant-antoni', query: 'Sant Antoni de Portmany Ibiza Spain Sunset Strip Cafe del Mar Hostal La Torre Cap Negret clifftop bars Port Deportiu Marina Passeig Maritim Esglesia Sant Antoni 14th century oldest church Egg sculpture roundabout Cala Bassa Cala Conta Cala Tarida Cala Salada Punta Galera Sa Talaia 475m highest peak panorama sunset' },
  { slug: 'sant-josep', query: 'Sant Josep de sa Talaia Ibiza village church plaza Es Vedra Cala d Hort Sa Talaia 475m Ses Salines flamingos Atlantis quarry Cala Vadella Cala Jondal Es Cubells Platja d en Bossa panorama sunset' },
]

async function searchPhoto(query, apiKey) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.photos,places.displayName',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'en' }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)
  const data = await res.json()
  const photo = data.places?.[0]?.photos?.[0]?.name
  if (!photo) throw new Error('No photo found')
  return photo
}

async function fetchPhotoUri(photoName, apiKey) {
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1600&skipHttpRedirect=true&key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`photo HTTP ${res.status}`)
  const data = await res.json()
  return data.photoUri
}

async function downloadAndCompress(uri, outPath) {
  const res = await fetch(uri)
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf)
    .resize(1600, 900, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(outPath)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const apiKey = await loadApiKey()
  const results = []
  for (const { slug, query } of TARGETS) {
    const outPath = path.join(OUT_DIR, `${slug}.jpg`)
    if (existsSync(outPath)) {
      console.log(`⏩ ${slug}: exists, skip`)
      continue
    }
    try {
      console.log(`🔍 ${slug}: searching "${query}"`)
      const photoName = await searchPhoto(query, apiKey)
      const uri = await fetchPhotoUri(photoName, apiKey)
      await downloadAndCompress(uri, outPath)
      const kb = Math.round((await readFile(outPath)).length / 1024)
      console.log(`   ✅ ${slug}.jpg (${kb} KB)`)
      results.push({ slug, ok: true, kb })
      await new Promise(r => setTimeout(r, 300))
    } catch (e) {
      console.error(`   ❌ ${slug}: ${e.message}`)
      results.push({ slug, ok: false, err: e.message })
    }
  }
  const ok = results.filter(r => r.ok).length
  console.log(`\nDone: ${ok}/${results.length} succeeded`)
}

main().catch(err => { console.error(err); process.exit(1) })
