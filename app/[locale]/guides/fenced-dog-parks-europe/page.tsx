import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'
import destinations from '@/data/destinations.json'

const SLUG = 'fenced-dog-parks-europe'

type Locale = 'en' | 'fr' | 'es'

type Park = {
  citySlug: string
  name: string
  neighborhood?: string
  size?: string
  photo?: string
  descEn: string
  descFr: string
  descEs: string
}

const PARKS: Park[] = [
  {
    citySlug: "aarhus",
    name: "Marselisborg Hundeskov",
    neighborhood: "Marselisborg Forest",
    size: "25 ha / 62 acres",
    photo: "/images/city-places/aarhus-parks-marselisborg-hundeskov.jpg",
    descEn: `Aarhus's largest official off-leash dog forest (hundeskov) — 25 hectares of fenced beech and oak woodland inside the larger Marselisborg Forest. Multiple walking trails, a small clearing for ball games, and direct access to the rest of the 1,400-hectare forest on leash.`,
    descFr: `Plus grande forêt sans laisse officielle d'Aarhus (hundeskov) — 25 hectares de hêtraie et chênaie clôturées à l'intérieur de la grande forêt de Marselisborg. Plusieurs sentiers, petite clairière pour jouer à la balle, et accès direct au reste des 1 400 hectares en laisse.`,
    descEs: `El mayor bosque sin correa oficial de Aarhus (hundeskov) — 25 hectáreas de hayedo y robledal vallados dentro del mayor bosque de Marselisborg. Varios senderos, pequeño claro para jugar a la pelota, y acceso directo al resto de las 1.400 hectáreas con correa.`,
  },
  {
    citySlug: "basel",
    name: "Tierpark Lange Erlen",
    neighborhood: "Kleinh\u00fcningen / German border",
    photo: "/images/city-places/basel-parks-tierpark-lange-erlen.jpg",
    descEn: `A free animal park set in floodplain forest, with paddocks for deer, ibex and Highland cattle alongside leashed walking paths and a small river beach. Dogs are welcome on a leash inside the park itself, and the surrounding woods (signposted Bannwald) offer off-leash freedom on th`,
    descFr: `Un parc animalier gratuit installé dans la forêt alluviale, avec enclos pour cerfs, bouquetins et vaches Highland le long de sentiers en laisse et d'une petite plage de rivière. Les chiens sont les bienvenus en laisse dans le parc, et les bois environnants (Bannwald, signalé) off`,
    descEs: `Un parque de animales gratuito en pleno bosque aluvial, con recintos para ciervos, íbices y vacas Highland junto a senderos con correa y una pequeña playa fluvial. Los perros son bienvenidos con correa dentro del parque, y los bosques colindantes (señalizados Bannwald) ofrecen li`,
  },
  {
    citySlug: "basel",
    name: "Kannenfeldpark",
    neighborhood: "St. Johann",
    photo: "/images/city-places/basel-parks-kannenfeldpark.jpg",
    descEn: `A 6-hectare central park laid out on a former cemetery, with mature plane trees, wide lawns and a small lake. Dogs must stay on the leash but the park is open all night, the lawns are vast and shaded, and a fenced playground area helps families keep things calm. The closest serio`,
    descFr: `Un parc central de 6 hectares aménagé sur un ancien cimetière, avec platanes centenaires, pelouses ouvertes et un petit étang. Les chiens doivent rester en laisse, mais le parc est ouvert toute la nuit, les pelouses sont vastes et ombragées, et une aire de jeu clôturée permet de `,
    descEs: `Un parque central de 6 hectáreas trazado sobre un antiguo cementerio, con plátanos centenarios, amplios céspedes y un pequeño estanque. Los perros deben ir con correa, pero el parque está abierto toda la noche, los céspedes son amplios y sombreados, y una zona de juegos vallada a`,
  },
  {
    citySlug: "belgrade",
    name: "Ta\u0161majdan Park",
    neighborhood: "Stari Grad",
    size: "9 hectares",
    photo: "/images/city-places/belgrade-parks-tasmajdan-park.jpg",
    descEn: `A 9-hectare central park around the St Mark's Church, with a fenced municipal dog park on the south side that opened in 2018. Mature plane trees, gravel paths, and several café-kiosks; the dog enclosure has agility equipment and water taps. Three blocks east of the Skadarlija boh`,
    descFr: `Parc central de 9 hectares autour de l'église Saint-Marc, avec un parc canin municipal clôturé du côté sud, ouvert en 2018. Platanes anciens, allées de gravier et plusieurs kiosques-cafés ; l'enclos canin dispose d'agility et de robinets. À trois pâtés de maisons à l'est de Skada`,
    descEs: `Parque central de 9 hectáreas en torno a la iglesia de San Marcos, con un parque canino municipal vallado en el lado sur, inaugurado en 2018. Plátanos maduros, paseos de grava y varios kioskos-café; el recinto canino tiene agility y fuentes. A tres manzanas al este de Skadarlija.`,
  },
  {
    citySlug: "berlin",
    name: "Volkspark Friedrichshain",
    photo: "/images/city-places/berlin-parks-volkspark-friedrichshain.jpg",
    descEn: `Berlin's oldest public park (1848), Volkspark Friedrichshain occupies 52 hectares in the heart of East Berlin's most vibrant neighbourhoods. The park has several large off-leash areas including the Hundewiese (dog meadow) near the north entrance, which is one of the best-maintain`,
    descFr: `Le plus ancien parc public de Berlin (1848), le Volkspark Friedrichshain occupe 52 hectares au cœur des quartiers les plus animés de Berlin-Est. Le parc dispose de plusieurs grandes zones de liberté, dont la Hundewiese (prairie pour chiens) près de l'entrée nord, l'une des zones `,
    descEs: `El parque público más antiguo de Berlín (1848), el Volkspark Friedrichshain ocupa 52 hectáreas en el corazón de los barrios más vibrantes del Berlín del Este. El parque tiene varias zonas grandes sin correa, incluida la Hundewiese (pradera para perros) cerca de la entrada norte, `,
  },
  {
    citySlug: "bologna",
    name: "Parco del Velodromo",
    photo: "/images/city-places/bologna-parks-parco-del-velodromo.jpg",
    descEn: `A neighbourhood park in the Savena district with a fully fenced off-leash area specifically designed for dogs. The fenced enclosure makes it ideal for dogs with unreliable recall or those who need to exercise in a secure space. Smaller than Giardini Margherita but well-maintained`,
    descFr: `Un parc de quartier dans le district de Savena avec une zone de liberté entièrement clôturée spécifiquement conçue pour les chiens. L'enclos clôturé le rend idéal pour les chiens dont le rappel est peu fiable ou ceux qui ont besoin de s'exercer dans un espace sécurisé. Plus petit`,
    descEs: `Un parque de barrio en el distrito de Savena con una zona de libertad completamente vallada diseñada específicamente para perros. El recinto vallado lo hace ideal para perros con vuelta poco fiable o aquellos que necesitan ejercitarse en un espacio seguro. Más pequeño que los Gia`,
  },
  {
    citySlug: "bordeaux",
    name: "Darwin Ecosyst\u00e8me",
    neighborhood: "Bastide (Rive Droite)",
    photo: "/images/city-places/bordeaux-parks-darwin-ecosysteme.jpg",
    descEn: `Strictly speaking Darwin is not a park — it is a converted military complex — but it functions as Bordeaux's most dog-permissive open space. The vast courtyard, rooftop terrace garden, and riverside access combine to create a sprawling urban environment where dogs move freely. Th`,
    descFr: `À strictement parler, Darwin n'est pas un parc — c'est un ancien complexe militaire reconverti — mais il fonctionne comme l'espace le plus dog-permissif de Bordeaux. La vaste cour intérieure, la terrasse-jardin sur les toits et l'accès aux berges se combinent pour créer un enviro`,
    descEs: `Estrictamente hablando, Darwin no es un parque — es un complejo militar reconvertido — pero funciona como el espacio más permisivo para perros de Burdeos. El vasto patio, el jardín en la azotea y el acceso al río se combinan para crear un entorno urbano extenso donde los perros s`,
  },
  {
    citySlug: "bratislava",
    name: "Sad Janka Kr\u00e1\u013ea",
    neighborhood: "Petr\u017ealka (south Danube bank)",
    size: "About 11 hectares",
    photo: "/images/city-places/bratislava-parks-sad-janka-krala.jpg",
    descEn: `Central Europe's oldest public park, opened in 1776 in Baroque style on the south bank of the Danube — directly opposite the Old Town and reachable in five minutes over the SNP Bridge. Wide gravel paths, mature plane trees, and a small fenced playground at the centre. Dogs are we`,
    descFr: `Plus vieux parc public d'Europe centrale, ouvert en 1776 en style baroque sur la rive sud du Danube — juste en face de la vieille ville, à cinq minutes par le pont SNP. Larges allées de gravier, platanes anciens et une petite aire de jeux clôturée au centre. Les chiens y sont les`,
    descEs: `El parque público más antiguo de Europa Central, inaugurado en 1776 en estilo barroco en la orilla sur del Danubio, justo enfrente del casco antiguo y a cinco minutos cruzando el puente SNP. Amplios paseos de grava, plátanos maduros y una pequeña zona de juegos vallada en el cent`,
  },
  {
    citySlug: "brno",
    name: "Lu\u017e\u00e1nky Park",
    neighborhood: "Brno-st\u0159ed",
    size: "Approx. 23 hectares",
    photo: "/images/city-places/brno-parks-luzanky-park.jpg",
    descEn: `Brno's oldest public park (opened 1786) — formal allées, mature trees, a pond, ornamental fountains. Two fenced psí louka zones in the south and east corners. Free public WiFi, café, summer concerts.`,
    descFr: `Le plus ancien parc public de Brno (ouvert en 1786) — allées formelles, arbres mûrs, étang, fontaines ornementales. Deux zones psí louka clôturées dans les coins sud et est. WiFi public gratuit, café, concerts d'été.`,
    descEs: `El parque público más antiguo de Brno (abierto en 1786) — paseos formales, árboles maduros, estanque, fuentes ornamentales. Dos zonas psí louka valladas en las esquinas sur y este. WiFi público gratuito, café, conciertos de verano.`,
  },
  {
    citySlug: "bucharest",
    name: "King Mihai I Park (Herastrau)",
    neighborhood: "Aviatorilor / Floreasca (north of centre)",
    size: "187 hectares",
    photo: "/images/city-places/bucharest-parks-king-mihai-i-park-herastrau.jpg",
    descEn: `Bucharest's largest park, 187 hectares around the central Herastrau Lake, with two fully fenced municipal dog parks (the larger near the Aviator entrance, a medium-sized one near the Mioriță fountain). Beyond the enclosures, the park's footpaths are leash-friendly and the lakesid`,
    descFr: `Plus grand parc de Bucarest, 187 hectares autour du lac central de Herastrau, avec deux parcs canins municipaux entièrement clôturés (le plus grand près de l'entrée Aviator, un de taille moyenne près de la fontaine Mioriță). Au-delà des enclos, les sentiers du parc sont accessibl`,
    descEs: `El mayor parque de Bucarest, 187 hectáreas alrededor del lago central de Herastrau, con dos parques caninos municipales totalmente vallados (el mayor cerca de la entrada Aviator, otro mediano junto a la fuente Mioriță). Más allá de los recintos, los caminos del parque son accesib`,
  },
  {
    citySlug: "bucharest",
    name: "Tineretului Park",
    neighborhood: "Tineretului (south of centre)",
    size: "86 hectares",
    photo: "/images/city-places/bucharest-parks-tineretului-park.jpg",
    descEn: `An 86-hectare park around the Tineretului Lake, less crowded than Herastrau or Cismigiu. The wide open lawns are popular with dog owners for ball-throwing; a fenced municipal dog park sits on the eastern edge. Metro M2 stops at Tineretului station, two minutes from the park gate.`,
    descFr: `Parc de 86 hectares autour du lac de Tineretului, moins fréquenté que Herastrau ou Cismigiu. Les vastes pelouses ouvertes sont prisées des propriétaires pour le lancer de balle ; un parc canin municipal clôturé se trouve sur la rive est. Le métro M2 s'arrête à la station Tineretu`,
    descEs: `Parque de 86 hectáreas alrededor del lago Tineretului, menos concurrido que Herastrau o Cismigiu. Las amplias praderas abiertas son favoritas para lanzar pelotas; hay un parque canino municipal vallado en el extremo este. El metro M2 para en la estación Tineretului, a dos minutos`,
  },
  {
    citySlug: "cordoba",
    name: "Parque Cruz Conde",
    neighborhood: "Centro",
    size: "37 ha / 91 acres",
    photo: "/images/city-places/cordoba-parks-parque-cruz-conde.jpg",
    descEn: `Cordoba's largest urban park (37 ha), a short walk south of the historic centre. Features a fenced Área de Esparcimiento Canino (off-leash zone), wide tree-lined avenues, fountains, and a small lake. Locally beloved for early-morning dog walks before the summer heat builds up.`,
    descFr: `Plus grand parc urbain de Cordoue (37 ha), à courte distance à pied au sud du centre historique. Possède une Área de Esparcimiento Canino clôturée (zone sans laisse), de larges avenues arborées, des fontaines et un petit lac. Apprécié des locaux pour les promenades canines au pet`,
    descEs: `El mayor parque urbano de Córdoba (37 ha), a poca distancia a pie al sur del centro histórico. Cuenta con un Área de Esparcimiento Canino vallada (zona sin correa), amplias avenidas arboladas, fuentes y un pequeño lago. Muy querido por los locales para paseos caninos a primera ho`,
  },
  {
    citySlug: "dublin",
    name: "Phoenix Park",
    neighborhood: "Dublin 7 / 8",
    size: "1,750 acres",
    photo: "/images/city-places/dublin-parks-phoenix-park.jpg",
    descEn: ``,
    descFr: `Avec ses 710 hectares, Phoenix Park est l'un des plus grands parcs urbains enclos d'Europe — plus grand que Central Park et Hyde Park réunis. C'est la destination de promenade canine par excellence pour les Dublinois. Les vastes prairies ouvertes, les longues allées bordées d'arb`,
    descEs: `Con 710 hectáreas, Phoenix Park es uno de los parques urbanos cerrados más grandes de Europa — más grande que Central Park y Hyde Park juntos. Es el destino de paseo canino definitivo para los dublineses. Las vastas praderas abiertas, las largas avenidas arboladas y las tranquila`,
  },
  {
    citySlug: "dusseldorf",
    name: "Hofgarten",
    neighborhood: "Stadtmitte",
    size: "28 hectares",
    photo: "/images/city-places/dusseldorf-parks-hofgarten.jpg",
    descEn: `Germany's first public park (1769), 28 hectares of English-landscape lawns and ponds in the very centre of Düsseldorf, between the Königsallee and the Rhine. Dogs must be leashed throughout the park; an off-leash Hundewiese borders the eastern edge along the Inselstraße for free `,
    descFr: `Premier parc public d'Allemagne (1769), 28 hectares de pelouses paysagères à l'anglaise et d'étangs au cœur même de Düsseldorf, entre la Königsallee et le Rhin. Les chiens doivent être tenus en laisse dans tout le parc ; une Hundewiese sans laisse longe le côté est, le long de la`,
    descEs: `Primer parque público de Alemania (1769), 28 hectáreas de praderas paisajísticas al estilo inglés y estanques en el mismo centro de Düsseldorf, entre la Königsallee y el Rin. Los perros deben ir con correa en todo el parque; una Hundewiese sin correa bordea el lado este a lo larg`,
  },
  {
    citySlug: "dusseldorf",
    name: "Volksgarten",
    neighborhood: "Oberbilk / Bilk",
    size: "70 hectares",
    photo: "/images/city-places/dusseldorf-parks-volksgarten.jpg",
    descEn: `A 70-hectare landscape park south of the centre, designed in the late 19th century around two ponds and a wooded ridge. Dogs must be leashed on paths, but a large fenced Hundewiese near the Auf'm Hennekamp entrance gives off-leash space; the southern wood section connects to the `,
    descFr: `Parc paysager de 70 hectares au sud du centre, conçu à la fin du XIXe siècle autour de deux étangs et d'une crête boisée. Les chiens doivent être tenus en laisse sur les sentiers, mais une grande Hundewiese clôturée près de l'entrée Auf'm Hennekamp offre un espace sans laisse ; l`,
    descEs: `Parque paisajístico de 70 hectáreas al sur del centro, diseñado a finales del siglo XIX en torno a dos estanques y una cresta boscosa. Los perros deben ir con correa en los senderos, pero una gran Hundewiese vallada cerca de la entrada de Auf'm Hennekamp ofrece espacio sin correa`,
  },
  {
    citySlug: "dusseldorf",
    name: "Nordpark",
    neighborhood: "Stockum (north)",
    size: "36 hectares",
    photo: "/images/city-places/dusseldorf-parks-nordpark.jpg",
    descEn: `A 36-hectare formal park laid out in 1937, near the Messe trade fair grounds and the EKŌ-Haus Japanese centre. The park's main lawns and rose garden require dogs on leash, but the wooded northern section near the Kaiserswerther Straße has an off-leash Hundewiese. The aquazoo Löbb`,
    descFr: `Parc à la française de 36 hectares aménagé en 1937, près du parc des expositions Messe et du centre japonais EKŌ-Haus. Les pelouses principales et la roseraie imposent la laisse, mais la section boisée nord près de la Kaiserswerther Straße abrite une Hundewiese sans laisse. L'aqu`,
    descEs: `Parque formal de 36 hectáreas trazado en 1937, cerca del recinto ferial Messe y del centro japonés EKŌ-Haus. Las praderas principales y la rosaleda exigen correa, pero la sección boscosa del norte, cerca de la Kaiserswerther Straße, alberga una Hundewiese sin correa. El aquazoo L`,
  },
  {
    citySlug: "frankfurt",
    name: "Gr\u00fcneburgpark",
    neighborhood: "Westend-Nord",
    size: "29 ha / 72 acres",
    photo: "/images/city-places/frankfurt-parks-gruneburgpark.jpg",
    descEn: `A 29-hectare English-style park in the Westend district featuring a fenced Hundeauslauffläche (off-leash zone) — one of the few official off-leash areas inside the city ring. The rest of the park requires a leash, but the wide lawns and shaded paths make it one of the most pleasa`,
    descFr: `Parc de 29 hectares à l'anglaise dans le Westend, doté d'un Hundeauslauffläche clôturé (zone sans laisse) — l'une des rares aires officielles sans laisse à l'intérieur de la ceinture urbaine. Le reste du parc impose la laisse, mais les vastes pelouses et allées ombragées en font `,
    descEs: `Parque de 29 hectáreas de estilo inglés en el Westend, con una Hundeauslauffläche vallada (zona sin correa), una de las pocas áreas oficiales sin correa dentro del anillo urbano. El resto del parque requiere correa, pero sus amplios céspedes y senderos sombreados lo convierten en`,
  },
  {
    citySlug: "gdansk",
    name: "Park Oliwski",
    neighborhood: "Oliwa",
    size: "Approx. 11 hectares",
    photo: "/images/city-places/gdansk-parks-park-oliwski.jpg",
    descEn: `Gdansk's most beautiful park — a 17th-century landscaped garden adjoining the Oliwa Cathedral, palm house, ornamental ponds, the Pałac Opatów art museum. Free entry, dog-friendly with leashed dogs and a fenced dog zone in the south-east corner.`,
    descFr: `Le plus beau parc de Gdansk — jardin paysager du XVIIe siècle attenant à la cathédrale d'Oliwa, palmeraie, étangs ornementaux, musée d'art Pałac Opatów. Entrée libre, dog-friendly avec chiens en laisse et zone canine clôturée au coin sud-est.`,
    descEs: `El parque más bello de Gdansk — jardín paisajístico del siglo XVII contiguo a la catedral de Oliwa, palmera, estanques ornamentales, museo de arte Pałac Opatów. Entrada libre, dog-friendly con perros con correa y zona canina vallada en la esquina sureste.`,
  },
  {
    citySlug: "gothenburg",
    name: "Slottsskogen",
    neighborhood: "Slottsskogen",
    photo: "/images/city-places/gothenburg-parks-slottsskogen.jpg",
    descEn: `Gothenburg's most-loved urban park — 137 hectares of mixed forest, open meadow, and formal gardens with free-roaming deer, moose, and flamingos (in the open animal enclosures). Dogs are permitted throughout most of the park. The northern section has designated off-leash areas whe`,
    descFr: `Le parc urbain le plus aimé de Göteborg — 137 hectares de forêt mixte, prairies ouvertes et jardins formels avec cerfs, élans et flamants roses en liberté (dans des enclos ouverts). Les chiens sont autorisés dans la majeure partie du parc. La section nord dispose de zones désigné`,
    descEs: `El parque urbano más querido de Gotemburgo — 137 hectáreas de bosque mixto, prados abiertos y jardines formales con ciervos, alces y flamencos en libertad (en recintos abiertos). Los perros están permitidos en la mayor parte del parque. La sección norte tiene zonas designadas sin`,
  },
  {
    citySlug: "gothenburg",
    name: "Tr\u00e4dg\u00e5rdsf\u00f6reningen",
    neighborhood: "City Centre",
    photo: "/images/city-places/gothenburg-parks-tradgardsforeningen.jpg",
    descEn: `The 19th-century Garden Society park in the heart of Gothenburg — an enclosed formal garden with a Victorian palm house, an extensive rose garden (one of the finest in Scandinavia), and a popular outdoor café. Dogs on leads are permitted in the park and on the café terrace. Admis`,
    descFr: `Le parc de la Société du Jardin du XIXe siècle au cœur de Göteborg — un jardin formel clos avec une serre palmier victorienne, une vaste roseraie (l'une des plus belles de Scandinavie) et un café en plein air très fréquenté. Les chiens en laisse sont autorisés dans le parc et sur`,
    descEs: `El parque de la Sociedad del Jardín del siglo XIX en el corazón de Gotemburgo — un jardín formal cerrado con un invernadero victoriano de palmeras, un extenso jardín de rosas (uno de los más hermosos de Escandinavia) y un popular café al aire libre. Los perros con correa están pe`,
  },
  {
    citySlug: "granada",
    name: "Parque Ana Orantes",
    neighborhood: "Arabial",
    photo: "/images/city-places/granada-parks-parque-ana-orantes.jpg",
    descEn: `A fully enclosed off-leash dog park with a perimeter fence, agility obstacles, a drinking fountain, and night lighting that extends its usability into summer evenings. One of the best-maintained pipicanes in Granada, it is popular with residents of the Arabial and Zaidín neighbou`,
    descFr: `Un parc canin entièrement clôturé, en accès libre, avec une clôture périmétrique, des obstacles d'agility, une fontaine à eau et un éclairage nocturne qui permet de l'utiliser lors des soirées estivales. L'un des pipicanes les mieux entretenus de Grenade, très apprécié des habita`,
    descEs: `Un parque canino completamente vallado y sin correa, con valla perimetral, obstáculos de agility, fuente de agua e iluminación nocturna que amplía su uso a las noches de verano. Uno de los pipicanes mejor mantenidos de Granada, muy popular entre los vecinos de los barrios de Arab`,
  },
  {
    citySlug: "granada",
    name: "Parque para Perros La Virgencica",
    neighborhood: "Zaid\u00edn",
    photo: "/images/city-places/granada-parks-parque-para-perros-la-virgencica.jpg",
    descEn: `A dedicated fenced dog park in the residential Zaidín neighbourhood, popular with local dog owners for its off-leash area, drinking fountain, and agility obstacles. Well-lit in the evenings, which makes it a practical option when summer temperatures finally cool after 20:00. The `,
    descFr: `Un parc canin clôturé dans le quartier résidentiel du Zaidín, apprécié des propriétaires de chiens pour sa zone en liberté, sa fontaine à eau et ses obstacles d'agility. Bien éclairé le soir, ce qui en fait une option pratique quand les températures estivales baissent enfin après`,
    descEs: `Un parque canino vallado en el barrio residencial del Zaidín, muy popular entre los propietarios de perros del barrio por su zona sin correa, fuente de agua y obstáculos de agility. Bien iluminado por las noches, lo que lo convierte en una opción práctica cuando las temperaturas `,
  },
  {
    citySlug: "graz",
    name: "Stadtpark Graz",
    neighborhood: "East of Altstadt",
    size: "23 ha",
    photo: "/images/city-places/graz-parks-stadtpark-graz.jpg",
    descEn: `Graz's main central park (23 ha), laid out in 1869 on the site of the old defensive walls. Mature trees, a pond, the Forum Stadtpark cultural centre, and a signed fenced Hundezone in the eastern corner.`,
    descFr: `Le parc central principal de Graz (23 ha), aménagé en 1869 sur les anciennes murailles. Arbres matures, étang, centre culturel Forum Stadtpark et zone canine clôturée signalée dans le coin est.`,
    descEs: `El parque central principal de Graz (23 ha), trazado en 1869 sobre las antiguas murallas. Árboles maduros, estanque, centro cultural Forum Stadtpark y zona canina vallada señalizada en el extremo este.`,
  },
  {
    citySlug: "hamburg",
    name: "Stadtpark Hamburg",
    neighborhood: "Winterhude",
    size: "148 ha / 366 acres",
    photo: "/images/city-places/hamburg-parks-stadtpark-hamburg.jpg",
    descEn: `Hamburg's central 148-hectare people's park designed in the 1910s. Features two Hundeauslaufzonen — a large one near the Planetarium and a smaller fenced one to the south — plus wide lawns where leashed dogs are welcome. Summer open-air concerts at the Freilichtbühne; dogs are ad`,
    descFr: `Parc populaire central de 148 hectares, dessiné dans les années 1910. Deux Hundeauslaufzonen — une grande près du Planétarium et une petite clôturée au sud — plus de vastes pelouses où les chiens en laisse sont bienvenus. Concerts d'été à la Freilichtbühne ; les chiens sont admis`,
    descEs: `Parque popular central de 148 hectáreas, diseñado en la década de 1910. Dispone de dos Hundeauslaufzonen — una grande junto al Planetario y otra más pequeña vallada al sur — además de amplios céspedes donde los perros con correa son bienvenidos. Conciertos al aire libre en verano`,
  },
  {
    citySlug: "hamburg",
    name: "Altonaer Volkspark",
    neighborhood: "Altona-Nord",
    size: "205 ha / 507 acres",
    photo: "/images/city-places/hamburg-parks-altonaer-volkspark.jpg",
    descEn: `At 205 hectares, Hamburg's largest public park — woodland, meadows, a rose garden and three large fenced Hundeauslaufzonen make it the city's top destination for off-leash romping. Extensive wooded trails; often quieter than the central Stadtpark.`,
    descFr: `Avec ses 205 hectares, le plus grand parc public de Hambourg — forêt, prairies, roseraie et trois grandes Hundeauslaufzonen clôturées en font la destination n°1 pour les chiens sans laisse. Larges sentiers forestiers ; souvent plus calme que le Stadtpark central.`,
    descEs: `Con 205 hectáreas, el mayor parque público de Hamburgo — bosque, praderas, rosaleda y tres grandes Hundeauslaufzonen valladas lo convierten en el destino nº1 para perros sin correa. Amplios senderos forestales; a menudo más tranquilo que el Stadtpark central.`,
  },
  {
    citySlug: "lecce",
    name: "Parco di Belloluogo",
    neighborhood: "North-east",
    size: "Approx. 100 hectares",
    photo: "/images/city-places/lecce-parks-parco-di-belloluogo.jpg",
    descEn: `A protected agricultural-natural park ringing the north-east of the city — olive groves, the medieval Belloluogo tower, walking trails. Lecce's only large green space; a fenced losloop-style dog zone is in the south corner.`,
    descFr: `Parc agricole-naturel protégé qui ceint le nord-est de la ville — oliveraies, tour médiévale de Belloluogo, sentiers de promenade. Le seul grand espace vert de Lecce ; une zone canine clôturée façon losloop se trouve au coin sud.`,
    descEs: `Parque agrícola-natural protegido que rodea el noreste de la ciudad — olivares, torre medieval de Belloluogo, senderos. El único gran espacio verde de Lecce; una zona canina vallada estilo losloop está en la esquina sur.`,
  },
  {
    citySlug: "leipzig",
    name: "Clara-Zetkin-Park",
    neighborhood: "Zentrum-S\u00fcd",
    size: "Approx. 124 hectares",
    photo: "/images/city-places/leipzig-parks-clara-zetkin-park.jpg",
    descEn: `Leipzig's largest central park — 124 hectares of meadows, ponds and the Auenwald forest tributaries. The fenced south-west off-leash zone (Hundeauslaufzone Clara-Zetkin-Park) is one of the largest in Saxony, with dog-agility equipment.`,
    descFr: `Le plus grand parc central de Leipzig — 124 hectares de prairies, étangs et bras de l'Auenwald. La Hundeauslaufzone clôturée du sud-ouest est l'une des plus grandes de Saxe, avec équipements d'agility.`,
    descEs: `El mayor parque central de Leipzig — 124 hectáreas de praderas, estanques y brazos del Auenwald. La Hundeauslaufzone vallada del suroeste es una de las mayores de Sajonia, con equipo de agility.`,
  },
  {
    citySlug: "lille",
    name: "Caniparc Jules Vall\u00e8s",
    neighborhood: "Lille-Sud",
    size: "Small fenced enclosures (~0.4 hectare combined)",
    photo: "/images/city-places/lille-parks-caniparc-jules-valles.jpg",
    descEn: `A fully fenced municipal dog park in the Lille-Sud neighbourhood, at the intersection of rue Jules Vallès and rue Alexandra David-Néel. Two separate enclosures (small/large dogs), agility equipment, water taps, and shaded benches. Free, open year-round, with €135 fouling fines en`,
    descFr: `Parc canin municipal entièrement clôturé dans le quartier Lille-Sud, au croisement de la rue Jules Vallès et de la rue Alexandra David-Néel. Deux enclos séparés (petits/grands chiens), agility, robinets et bancs ombragés. Gratuit, ouvert toute l'année, avec amendes de 135 € pour `,
    descEs: `Parque canino municipal totalmente vallado en el barrio Lille-Sud, en la intersección de la rue Jules Vallès con la rue Alexandra David-Néel. Dos recintos separados (perros pequeños/grandes), agility, fuentes y bancos con sombra. Gratis, abierto todo el año, con multas de 135 € p`,
  },
  {
    citySlug: "luxembourg",
    name: "Parc de la P\u00e9trusse",
    neighborhood: "P\u00e9trusse Valley (city centre)",
    size: "30 hectares",
    photo: "/images/city-places/luxembourg-parks-parc-de-la-petrusse.jpg",
    descEn: `A 30-hectare river-valley park slicing through the heart of Luxembourg City, with leafy paths beneath the UNESCO fortifications, two fenced municipal dog enclosures (enclos pour chiens), and the Adolphe Bridge soaring overhead. Leashed dogs are welcome the full length of the vall`,
    descFr: `Parc en vallée fluviale de 30 hectares qui traverse le cœur de Luxembourg, avec sentiers ombragés sous les fortifications UNESCO, deux enclos canins municipaux clôturés et le pont Adolphe qui surplombe l'ensemble. Les chiens en laisse sont les bienvenus sur toute la longueur de l`,
    descEs: `Parque en valle fluvial de 30 hectáreas que atraviesa el corazón de Luxemburgo, con senderos sombreados bajo las fortificaciones UNESCO, dos recintos caninos municipales vallados y el puente Adolphe sobrevolando el conjunto. Los perros con correa son bienvenidos en toda la longit`,
  },
  {
    citySlug: "luxembourg",
    name: "Parc de Merl-Belair",
    neighborhood: "Merl",
    size: "14 hectares",
    photo: "/images/city-places/luxembourg-parks-parc-de-merl-belair.jpg",
    descEn: `A 14-hectare landscaped park in the western Merl district, with mature trees, a small lake with ducks, and a fenced dog enclosure on the north-east side. Leashed dogs welcome throughout the park; off-leash inside the enclosure. The Belair area concentrates a quiet residential dog`,
    descFr: `Parc paysager de 14 hectares dans le quartier ouest de Merl, avec arbres anciens, petit lac aux canards et un enclos canin clôturé sur le côté nord-est. Chiens en laisse acceptés dans tout le parc ; sans laisse à l'intérieur de l'enclos. Le quartier de Belair concentre une commun`,
    descEs: `Parque paisajista de 14 hectáreas en el barrio occidental de Merl, con árboles maduros, un pequeño lago con patos y un recinto canino vallado en el lado noreste. Perros con correa admitidos en todo el parque; sin correa dentro del recinto. La zona de Belair concentra una tranquil`,
  },
  {
    citySlug: "maastricht",
    name: "Stadspark Maastricht",
    neighborhood: "Centre",
    size: "Approx. 9 hectares",
    photo: "/images/city-places/maastricht-parks-stadspark-maastricht.jpg",
    descEn: `A landscaped 19th-century park hugging the western medieval city walls — formal lawns, the river Jeker, mature trees, ornamental ponds and a fenced losloopgebied in the south corner. Connects directly to the Helpoort medieval gate.`,
    descFr: `Parc paysagé du XIXe siècle qui longe les remparts médiévaux ouest — pelouses formelles, rivière Jeker, arbres mûrs, étangs ornementaux et un losloopgebied clôturé au coin sud. Connecte directement à la porte médiévale Helpoort.`,
    descEs: `Parque paisajístico del siglo XIX que bordea las murallas medievales del oeste — céspedes formales, río Jeker, árboles maduros, estanques ornamentales y un losloopgebied vallado en la esquina sur. Conecta directamente con la puerta medieval Helpoort.`,
  },
  {
    citySlug: "maastricht",
    name: "Maas Riverside Path",
    neighborhood: "South Maas bank",
    size: "Approx. 14 km one way",
    photo: "/images/city-places/maastricht-parks-maas-riverside-path.jpg",
    descEn: `The car-free Maas towpath runs uninterrupted from the city centre south through Sint Pieter to the Belgian border at Smeermaas — flat, paved, with the Albert Canal mirror on the west side. The Pietersplas lake (5 km south) has a designated dog-swimming bay.`,
    descFr: `Le chemin de halage de la Meuse, sans voiture, court sans interruption depuis le centre via Sint Pieter jusqu'à la frontière belge à Smeermaas — plat, pavé, avec le Canal Albert qui le double à l'ouest. Le lac Pietersplas (5 km au sud) a une baie de baignade canine désignée.`,
    descEs: `El camino de sirga del Mosa, sin coches, corre sin interrupción desde el centro vía Sint Pieter hasta la frontera belga en Smeermaas — plano, asfaltado, con el Canal Alberto reflejándolo al oeste. El lago Pietersplas (5 km al sur) tiene una bahía designada para el baño canino.`,
  },
  {
    citySlug: "madrid",
    name: "Retiro Park (Parque del Buen Retiro)",
    neighborhood: "Jer\u00f3nimos / Retiro",
    size: "125 hectares",
    photo: "/images/city-places/madrid-parks-retiro-park-parque-del-buen-retiro.jpg",
    descEn: `Madrid's iconic central park and a UNESCO World Heritage Site. Dogs must be kept on a leash in most areas, but there is a designated off-leash enclosure near the Puerta de Hierro entrance on the northern side of the park. The paths around the Estanque Grande (the rowing lake) are`,
    descFr: `Le parc central emblématique de Madrid et site classé au patrimoine mondial de l'UNESCO. Les chiens doivent être tenus en laisse dans la plupart des zones, mais il existe un enclos de liberté désigné près de l'entrée de la Puerta de Hierro, côté nord du parc. Les allées autour de`,
    descEs: `El icónico parque central de Madrid y Patrimonio Mundial de la UNESCO. Los perros deben ir con correa en la mayoría de las zonas, pero hay un recinto designado sin correa cerca de la entrada de la Puerta de Hierro en el lado norte del parque. Los caminos alrededor del Estanque Gr`,
  },
  {
    citySlug: "malaga",
    name: "Parque del Oeste",
    neighborhood: "West Malaga",
    size: "Medium-large",
    photo: "/images/city-places/malaga-parks-parque-del-oeste.jpg",
    descEn: `Parque del Oeste is the main green lung of western Malaga, a large and well-maintained park with wide tree-lined paths, a dedicated dog area, and a relaxed neighbourhood atmosphere. It lacks the scenic drama of Monte de Gibralfaro or the botanical interest of La Concepción, but a`,
    descFr: `Le Parque del Oeste est le principal poumon vert de l'ouest de Malaga, un grand parc bien entretenu avec de larges allées bordées d'arbres, une zone dédiée aux chiens et une atmosphère détendue de quartier. Il manque du drame scénique du Monte de Gibralfaro ou de l'intérêt botani`,
    descEs: `El Parque del Oeste es el principal pulmón verde del oeste de Málaga, un parque grande y bien mantenido con amplios senderos arbolados, una zona dedicada a perros y un ambiente relajado de barrio. Carece del drama escénico del Monte de Gibralfaro o del interés botánico de La Conc`,
  },
  {
    citySlug: "manchester",
    name: "Fletcher Moss Botanical Gardens",
    neighborhood: "Didsbury (south Manchester)",
    size: "36 hectares",
    photo: "/images/city-places/manchester-parks-fletcher-moss-botanical-gardens.jpg",
    descEn: `A 90-acre estate of woodland, water gardens, and meadows along the Mersey in leafy Didsbury. Dogs on leash are welcome on every path; off-leash is tolerated on the back meadows and the riverside path along the Mersey. The botanical alpine garden has its own small fenced section t`,
    descFr: `Domaine de 90 acres (36 hectares) de forêt, jardins aquatiques et prairies le long de la Mersey, dans le verdoyant Didsbury. Les chiens en laisse sont les bienvenus sur tous les sentiers ; le sans laisse est toléré sur les prairies du fond et le sentier riverain de la Mersey. Le `,
    descEs: `Finca de 90 acres (36 hectáreas) de bosque, jardines acuáticos y praderas a lo largo del Mersey en el frondoso Didsbury. Los perros con correa son bienvenidos en todos los senderos; soltarlos se tolera en las praderas del fondo y en el sendero ribereño del Mersey. El jardín alpin`,
  },
  {
    citySlug: "marseille",
    name: "Colline Saint-Joseph \u2014 Canisite",
    neighborhood: "12e arrondissement",
    photo: "/images/city-places/marseille-parks-colline-saint-joseph-canisite.jpg",
    descEn: `A rare combination in Marseille: a 15 m² enclosed canisite (for off-leash play) adjacent to a 3,000 m² open dog-walking area. Less known and therefore less crowded than Longchamp.`,
    descFr: `Une combinaison rare à Marseille : un canisite clôturé de 15 m² (pour les jeux en liberté) adjacent à une zone de promenade canine de 3 000 m². Moins connu et donc moins fréquenté que Longchamp.`,
    descEs: `Una combinación rara en Marsella: un canisite cerrado de 15 m² (para juego suelto) junto a una zona de paseo canino de 3.000 m². Menos conocido y por tanto menos concurrido que Longchamp.`,
  },
  {
    citySlug: "modena",
    name: "Parco Ducale Estense",
    neighborhood: "North of centre",
    size: "13 ha",
    photo: "/images/city-places/modena-parks-parco-ducale-estense.jpg",
    descEn: `The city's main park, designed for the Este dukes in the 17th century behind the Palazzo Ducale. Plane trees, ponds, a children's playground and a fenced off-leash dog area in the north-west corner.`,
    descFr: `Le parc principal de la ville, dessiné pour les ducs d'Este au XVIIe s. derrière le Palazzo Ducale. Platanes, étangs, aire de jeux et zone canine clôturée sans laisse dans le coin nord-ouest.`,
    descEs: `El parque principal de la ciudad, diseñado para los duques de Este en el s. XVII tras el Palazzo Ducale. Plátanos, estanques, zona infantil y área canina vallada sin correa en el extremo noroeste.`,
  },
  {
    citySlug: "modena",
    name: "Parco Novi Sad",
    neighborhood: "North of station",
    size: "23 ha",
    photo: "/images/city-places/modena-parks-parco-novi-sad.jpg",
    descEn: `Modern park built on former rail yards (2009), 23 ha north of the train station. Open lawns, jogging loop, large fenced sgambamento, and the city's main weekend market on Mondays.`,
    descFr: `Parc moderne aménagé sur d'anciennes voies ferrées (2009), 23 ha au nord de la gare. Pelouses dégagées, boucle de jogging, grande zone sgambamento clôturée, et le principal marché du lundi de la ville.`,
    descEs: `Parque moderno construido sobre antiguas vías de tren (2009), 23 ha al norte de la estación. Praderas abiertas, circuito para correr, gran zona sgambamento vallada, y el principal mercado del lunes de la ciudad.`,
  },
  {
    citySlug: "montpellier",
    name: "Parc M\u00e9ric \u2014 Grand Caniparc",
    photo: "/images/city-places/montpellier-parks-parc-meric-grand-caniparc.jpg",
    descEn: `Montpellier's best dedicated dog park — a 6,000 m² enclosed off-leash area beside the Lez River with canine play equipment, benches, and shaded areas. The riverside setting is beautiful and the park itself is one of the largest purpose-built dog spaces in southern France, popular`,
    descFr: `Le meilleur parc canin de Montpellier — un espace hors laisse clôturé de 6 000 m² en bordure du Lez avec des équipements canins, des bancs et des zones ombragées. Le cadre en bord de rivière est magnifique et le parc lui-même est l'un des plus grands espaces canins aménagés du su`,
    descEs: `El mejor parque canino de Montpellier: una zona sin correa de 6.000 m² junto al río Lez con equipamiento canino, bancos y zonas con sombra. El entorno fluvial es precioso y el parque en sí es uno de los mayores espacios caninos de uso específico del sur de Francia, frecuentado di`,
  },
  {
    citySlug: "montpellier",
    name: "Berges du Lez \u2014 Riverside Walk",
    photo: "/images/city-places/montpellier-parks-berges-du-lez-riverside-walk.jpg",
    descEn: `The banks of the Lez River running through Montpellier offer several kilometres of walking path with off-leash sections where dogs can cool off in the water. The Montcalm and Aiguelongue sections are particularly popular and have formal caniparcs nearby — a complete loop through `,
    descFr: `Les berges du Lez traversant Montpellier offrent plusieurs kilomètres de chemin de promenade avec des sections hors laisse où les chiens peuvent se rafraîchir dans l'eau. Les sections Montcalm et Aiguelongue sont particulièrement populaires et disposent de caniparcs à proximité —`,
    descEs: `Las orillas del río Lez que atraviesa Montpellier ofrecen varios kilómetros de caminos con zonas sin correa donde los perros pueden refrescarse en el agua. Los tramos de Montcalm y Aiguelongue son especialmente populares y tienen caniparcs cercanos: un recorrido completo por amba`,
  },
  {
    citySlug: "munich",
    name: "Englischer Garten",
    photo: "/images/city-places/munich-parks-englischer-garten.jpg",
    descEn: `At 373 hectares, the Englischer Garten is larger than Central Park and one of the world's great urban parks. For dogs, it is the ultimate Munich destination: multiple designated off-leash areas, the Isar river and Eisbach stream for swimming, the famous artificial surf wave, and `,
    descFr: `Avec 373 hectares, l'Englischer Garten est plus grand que Central Park et l'un des grands parcs urbains du monde. Pour les chiens, c'est la destination ultime à Munich : plusieurs zones de liberté désignées, la rivière Isar et le ruisseau Eisbach pour la baignade, la célèbre vagu`,
    descEs: `Con 373 hectáreas, el Englischer Garten es más grande que el Central Park y uno de los grandes parques urbanos del mundo. Para los perros, es el destino definitivo en Múnich: múltiples zonas sin correa designadas, el río Isar y el arroyo Eisbach para nadar, la famosa ola de surf `,
  },
  {
    citySlug: "nantes",
    name: "Parc de Proc\u00e9",
    neighborhood: "Proc\u00e9 / Dervalli\u00e8res",
    photo: "/images/city-places/nantes-parks-parc-de-proce.jpg",
    descEn: `Nantes' most beloved dog park has an official caniparc (fenced off-leash area) and sweeping lawns where dogs can run freely in designated zones, just 15 minutes on foot from the city centre. Tree-lined alleys, a rose garden, and scenic views over a tributary of the Erdre make it `,
    descFr: `Le parc pour chiens le plus apprécié de Nantes dispose d'un caniparc officiel (zone close sans laisse) et de grandes pelouses où les chiens peuvent courir librement dans les zones désignées, à 15 minutes à pied du centre-ville. Les allées bordées d'arbres, la roseraie et les vues`,
    descEs: `El parque para perros más querido de Nantes tiene un caniparc oficial (zona vallada sin correa) y amplias praderas donde los perros pueden correr en las zonas designadas, a 15 minutos a pie del centro. Los paseos arbolados, el jardín de rosas y las vistas sobre un afluente del Er`,
  },
  {
    citySlug: "nantes",
    name: "Parc Naturel de Beaulieu",
    neighborhood: "\u00cele de Nantes / Beaulieu",
    photo: "/images/city-places/nantes-parks-parc-naturel-de-beaulieu.jpg",
    descEn: `A vast natural meadow along the Loire River on Île Beaulieu — described as the last testament of Loire's humid meadows — with a new caniparc opened in January 2025. Wild grassy expanses and riverside views of the Loire make it perfect for a free-running session away from the city`,
    descFr: `Un vaste espace naturel le long de la Loire sur l'Île Beaulieu — décrit comme le dernier témoignage des prairies humides de la Loire — avec un nouveau caniparc ouvert en janvier 2025. Grandes étendues sauvages et vues sur la Loire en font l'endroit idéal pour une session en liber`,
    descEs: `Un vasto espacio natural junto al Loira en la Île Beaulieu — descrito como el último testimonio de las praderas húmedas del Loira — con un nuevo caniparque inaugurado en enero de 2025. Las extensiones de hierba salvaje y las vistas del Loira lo hacen perfecto para una sesión de c`,
  },
  {
    citySlug: "naples",
    name: "Parco Virgiliano",
    neighborhood: "Posillipo",
    size: "9 ha / 22 acres",
    photo: "/images/city-places/naples-parks-parco-virgiliano.jpg",
    descEn: `A terraced cliff-top park on Posillipo offering some of the most spectacular views in Naples — Vesuvius, the Gulf, and the islands of Procida, Ischia and Capri. Wide paved walking loops, benches, shaded pine avenues, and an Area Cani fenced dog run near the upper terrace.`,
    descFr: `Parc en terrasses au sommet de la falaise de Posillipo, offrant certaines des plus belles vues de Naples — Vésuve, Golfe et îles de Procida, Ischia et Capri. Vastes boucles pavées, bancs, allées ombragées de pins et une Area Cani clôturée près de la terrasse supérieure.`,
    descEs: `Parque en terrazas en lo alto del acantilado de Posillipo que ofrece algunas de las vistas más espectaculares de Nápoles — Vesubio, Golfo e islas de Procida, Ischia y Capri. Amplios circuitos pavimentados, bancos, avenidas sombreadas de pinos y un Area Cani vallada cerca de la te`,
  },
  {
    citySlug: "nuremberg",
    name: "Stadtpark N\u00fcrnberg",
    neighborhood: "North of Altstadt",
    size: "35 ha",
    photo: "/images/city-places/nuremberg-parks-stadtpark-nurnberg.jpg",
    descEn: `Nuremberg's main central park, laid out 1903–1905 on the site of old defensive ditches. Plane trees, rose garden, ponds, and a small fenced dog meadow in the western corner. 10 min walk north of the Altstadt.`,
    descFr: `Le parc central principal de Nuremberg, aménagé entre 1903 et 1905 sur d'anciens fossés défensifs. Platanes, roseraie, étangs et petite prairie canine clôturée dans le coin ouest. 10 min à pied au nord de l'Altstadt.`,
    descEs: `El parque central principal de Núremberg, trazado entre 1903 y 1905 sobre antiguos fosos defensivos. Plátanos, rosaleda, estanques y pequeña pradera canina vallada en el rincón oeste. 10 min a pie al norte de la Altstadt.`,
  },
  {
    citySlug: "oxford",
    name: "University Parks",
    neighborhood: "Norham Manor",
    size: "37 hectares",
    photo: "/images/city-places/oxford-parks-university-parks.jpg",
    descEn: `37 hectares of grassland and woodland between the Cherwell and Parks Road, owned by Oxford University and open free to the public — King Charles II walked his dogs here in the 1680s. Dogs must stay on a lead at all times and are excluded from the cricket pitch enclosure in the ce`,
    descFr: `37 hectares de pelouses et bois entre le Cherwell et Parks Road, propriété de l'Université d'Oxford et ouverts gratuitement au public — le roi Charles II y promenait ses chiens dans les années 1680. Les chiens doivent rester en laisse en permanence et sont exclus de l'enclos du t`,
    descEs: `37 hectáreas de césped y bosque entre el Cherwell y Parks Road, propiedad de la Universidad de Oxford y abiertas gratis al público — el rey Carlos II paseaba aquí a sus perros en la década de 1680. Los perros deben llevar correa en todo momento y están excluidos del recinto del c`,
  },
  {
    citySlug: "palma",
    name: "Parc de Krekovic",
    neighborhood: "Son Armadans",
    photo: "/images/city-places/palma-parks-parc-de-krekovic.jpg",
    descEn: `Parc de Krekovic is a tranquil residential park in the Son Armadans neighbourhood, a short walk from Castell de Bellver. It features a dedicated enclosed dog run (pipican) which is genuinely off-leash, making it one of the better urban parks in Palma for dogs to socialise freely.`,
    descFr: `Le Parc de Krekovic est un parc résidentiel tranquille dans le quartier de Son Armadans, à deux pas du Castell de Bellver. Il dispose d'un espace canin clôturé (pipican) réellement sans laisse, ce qui en fait l'un des meilleurs parcs urbains de Palma pour la socialisation des chi`,
    descEs: `El Parc de Krekovic es un tranquilo parque residencial en el barrio de Son Armadans, a poca distancia del Castell de Bellver. Cuenta con un pipican cerrado genuinamente sin correa, lo que lo convierte en uno de los mejores parques urbanos de Palma para que los perros socialicen l`,
  },
  {
    citySlug: "pisa",
    name: "Parco Pinerolo Stazione",
    neighborhood: "Behind Pisa Centrale station",
    size: "Small fenced enclosure (~0.2 hectare)",
    photo: "/images/city-places/pisa-parks-parco-pinerolo-stazione.jpg",
    descEn: `A small but useful neighbourhood park behind Pisa Centrale, the city's only fully fenced municipal area dedicated to dogs. Off-leash inside the enclosure with benches and water taps; the wider park around it requires a leash. The location is ideal for a dog stretch between trains`,
    descFr: `Petit parc de quartier mais utile derrière la gare Centrale, seul espace municipal entièrement clôturé dédié aux chiens à Pise. Sans laisse à l'intérieur de l'enclos, avec bancs et robinets ; le parc autour exige la laisse. Emplacement idéal pour dégourdir un chien entre deux tra`,
    descEs: `Pequeño parque de barrio pero útil detrás de la estación Centrale, el único espacio municipal totalmente vallado dedicado a perros en Pisa. Sin correa dentro del recinto, con bancos y fuentes; el parque alrededor exige correa. Ubicación ideal para que el perro estire las patas en`,
  },
  {
    citySlug: "porto",
    name: "Parque das Virtudes",
    neighborhood: "Ribeira / Bairro de Miragaia",
    photo: "/images/city-places/porto-parks-parque-das-virtudes.jpg",
    descEn: `A multi-terraced park high above the Douro River in one of Porto's oldest neighbourhoods. The park has a fully fenced off-leash dog enclosure with a double-gated entrance and a small pool where dogs can cool off in summer. The viewpoint terraces overlook the rooftops of Ribeira a`,
    descFr: `Un parc en terrasses dominant le Douro dans l'un des quartiers les plus anciens de Porto. Il dispose d'un espace canin entièrement clôturé avec une entrée à double portail et un bassin où les chiens peuvent se rafraîchir en été. Les terrasses panoramiques surplombent les toits de`,
    descEs: `Un parque en terrazas elevado sobre el Duero en uno de los barrios más antiguos de Oporto. El parque cuenta con un recinto canino completamente vallado, con entrada de doble portón para mayor seguridad, y un pequeño estanque donde los perros pueden refrescarse en verano. Las terr`,
  },
  {
    citySlug: "reims",
    name: "Parc de Champagne",
    neighborhood: "Centre south",
    size: "22 hectares",
    photo: "/images/city-places/reims-parks-parc-de-champagne.jpg",
    descEn: `22-hectare landscaped park immediately south of the cathedral. Fenced dog zone in the south-east corner.`,
    descFr: `Parc paysage de 22 hectares au sud de la cathedrale. Zone canine cloturee au coin sud-est.`,
    descEs: `Parque paisajistico de 22 hectareas al sur de la catedral. Zona canina vallada en la esquina sureste.`,
  },
  {
    citySlug: "riga",
    name: "Lucavsala Recreational Park & Dog Area",
    photo: "/images/city-places/riga-parks-lucavsala-recreational-park-dog-area.jpg",
    descEn: `Lucavsala is a river island in the Daugava, reachable via the Salu Bridge. The northern part of the island hosts what the municipality designates as the largest dog walking park in Riga — a fenced off-leash area adjacent to a riverside swimming spot where dogs can enter the water`,
    descFr: `Lucavsala est une île fluviale dans la Daugava, accessible via le pont Salu. La partie nord de l'île abrite ce que la municipalité désigne comme le plus grand parc de promenade pour chiens de Riga — une zone sans laisse clôturée adjacente à un point de baignade en rivière où les `,
    descEs: `Lucavsala es una isla fluvial en el Daugava, accesible a través del puente Salu. La parte norte de la isla alberga lo que el municipio designa como el mayor parque de paseo para perros de Riga — un área cercada sin correa adyacente a un punto de baño en el río donde los perros pu`,
  },
  {
    citySlug: "riga",
    name: "Viesturd\u0101rzs Dog Park",
    photo: "/images/city-places/riga-parks-viesturdarzs-dog-park.jpg",
    descEn: `One of Riga's best equipped urban dog parks, located across from the historic Viesturdārzs park near Eksporta iela. The fenced enclosure features a full agility course — table, barriers, soft tunnel, walls, arrows — making it a favourite for owners who want to train or simply let`,
    descFr: `L'un des parcs canins urbains les mieux équipés de Riga, situé en face du parc historique Viesturdārzs près d'Eksporta iela. L'enclos clôturé comprend un parcours d'agilité complet — table, barrières, tunnel souple, murs, flèches — ce qui en fait un favori pour les propriétaires `,
    descEs: `Uno de los mejores parques caninos urbanos de Riga, situado frente al histórico parque Viesturdārzs cerca de Eksporta iela. El recinto cercado cuenta con un circuito de agilidad completo — mesa, barreras, túnel blando, paredes, flechas — lo que lo convierte en el favorito de los `,
  },
  {
    citySlug: "riga",
    name: "Gr\u012bzi\u0146kalns Park Dog Area",
    photo: "/images/city-places/riga-parks-grizinkalns-park-dog-area.jpg",
    descEn: `A neighbourhood park in central Riga on Pērnavas iela with a specially equipped fenced enclosure for dogs, featuring obstacles and training equipment. Popular with local dog owners for evening runs. The surrounding Grīziņkalns hill area is one of Riga's older neighbourhoods with `,
    descFr: `Un parc de quartier dans le centre de Riga sur Pērnavas iela avec un enclos spécialement équipé et clôturé pour les chiens, comprenant des obstacles et des équipements d'entraînement. Populaire auprès des propriétaires de chiens locaux pour les courses du soir. La zone environnan`,
    descEs: `Un parque de barrio en el centro de Riga en Pērnavas iela con un recinto cercado especialmente equipado para perros, con obstáculos y equipos de entrenamiento. Popular entre los dueños de perros locales para las carreras de tarde. La zona circundante de la colina Grīziņkalns es u`,
  },
  {
    citySlug: "rotterdam",
    name: "Zuiderpark \u2014 Hondeneiland",
    neighborhood: "Zuid",
    photo: "/images/city-places/rotterdam-parks-zuiderpark-hondeneiland.jpg",
    descEn: `Rotterdam's largest park (235 ha) contains the 'Hondeneiland' (Dog Island) — a fenced off-leash island specifically designed for dogs to play and socialise. Great for dog owners in the south of the city.`,
    descFr: `Le plus grand parc de Rotterdam (235 ha) abrite le 'Hondeneiland' (l'île aux chiens) — une île clôturée spécialement conçue pour les jeux et la socialisation canine. Idéal pour les propriétaires du sud de la ville.`,
    descEs: `El parque más grande de Rotterdam (235 ha) alberga el 'Hondeneiland' (isla de los perros): una isla vallada diseñada específicamente para que los perros jueguen y socialicen. Ideal para los dueños del sur de la ciudad.`,
  },
  {
    citySlug: "salamanca",
    name: "Parque de los Jesuitas",
    neighborhood: "South-east of centre",
    size: "13 ha",
    photo: "/images/city-places/salamanca-parks-parque-de-los-jesuitas.jpg",
    descEn: `The largest park in central Salamanca, 13 ha of lawns, mature trees, and a fenced dog area in the south-east corner. Popular with local dog owners morning and evening.`,
    descFr: `Le plus grand parc du centre de Salamanque, 13 ha de pelouses, arbres mûrs et zone canine clôturée dans le coin sud-est. Apprécié des propriétaires locaux matin et soir.`,
    descEs: `El parque más grande del centro de Salamanca, 13 ha de césped, árboles maduros y zona canina vallada en el extremo sureste. Popular entre los dueños locales mañana y tarde.`,
  },
  {
    citySlug: "san-sebastian",
    name: "Parque Cristina Enea",
    photo: "/images/city-places/san-sebastian-parks-parque-cristina-enea.jpg",
    descEn: `San Sebastián's most elegant park — a 17-hectare woodland donated to the city in 1898 by the Duke of Mandas in memory of his wife. Shaded paths wind through exotic trees, ponds, and peacock enclosures along the river Urumea. Dogs are welcome throughout on leads, and the riverbank`,
    descFr: `Le parc le plus élégant de Saint-Sébastien — un bois de 17 hectares offert à la ville en 1898 par le duc de Mandas en mémoire de son épouse. Des allées ombragées serpentent parmi des arbres exotiques, des étangs et des enclos à paons le long de la rivière Urumea. Les chiens sont `,
    descEs: `El parque más elegante de San Sebastián — un bosque de 17 hectáreas donado a la ciudad en 1898 por el Duque de Mandas en memoria de su esposa. Senderos sombreados serpentean entre árboles exóticos, estanques y recintos de pavos reales a lo largo del río Urumea. Los perros son bie`,
  },
  {
    citySlug: "sofia",
    name: "Yuzhen Park (South Park)",
    neighborhood: "Lozenets / Hladilnika",
    size: "70 hectares",
    photo: "/images/city-places/sofia-parks-yuzhen-park-south-park.jpg",
    descEn: `A 70-hectare park south of the centre, famous as the city's most permissive off-leash dog space. Long winding paths, open lawns, two fenced enclosures dedicated to dogs (around Emil Berzinski and Petko Y. Todorov), and a route up to the Vitosha foothills. Trams 4 and 6 stop on th`,
    descFr: `Parc de 70 hectares au sud du centre, célèbre comme l'espace canin le plus souple sans laisse de la ville. Longs sentiers sinueux, pelouses ouvertes, deux enclos clôturés dédiés aux chiens (rues Emil Berzinski et Petko Y. Todorov) et un itinéraire qui rejoint les contreforts du V`,
    descEs: `Parque de 70 hectáreas al sur del centro, famoso como el espacio canino más permisivo sin correa de la ciudad. Largos senderos sinuosos, praderas abiertas, dos recintos vallados dedicados a perros (calles Emil Berzinski y Petko Y. Todorov) y una ruta que llega a las estribaciones`,
  },
  {
    citySlug: "stockholm",
    name: "Tantolunden",
    neighborhood: "S\u00f6dermalm",
    photo: "/images/city-places/stockholm-parks-tantolunden.jpg",
    descEn: `A large park on Södermalm's western waterfront with a designated off-leash dog area (hundrastgård) near the allotment gardens. The park slopes down to Lake Mälaren with lovely views across the water. Popular with locals and their dogs year-round, it is especially lively on summer`,
    descFr: `Un grand parc sur le front de mer ouest de Södermalm avec une zone dog-park (hundrastgård) désignée près des jardins ouvriers. Le parc descend vers le lac Mälaren avec de belles vues sur l'eau. Populaire auprès des locaux et de leurs chiens toute l'année, il est particulièrement `,
    descEs: `Un gran parque en el frente marítimo oeste de Södermalm con una zona designada para perros sin correa (hundrastgård) cerca de los jardines familiares. El parque desciende hasta el lago Mälaren con bonitas vistas al agua. Popular entre los locales y sus perros durante todo el año,`,
  },
  {
    citySlug: "strasbourg",
    name: "Parc de l'Orangerie",
    neighborhood: "Orangerie / European Quarter",
    photo: "/images/city-places/strasbourg-parks-parc-de-l-orangerie.jpg",
    descEn: `Strasbourg's most beloved park, dating back to the 17th century and adjacent to the European Parliament, features a Napoleon III pavilion, a small deer park with Alsatian storks, a lake, and a miniature train. The 0.3-acre fenced off-leash dog area in the northeast corner of the `,
    descFr: `Le parc le plus aimé de Strasbourg, remontant au XVIIe siècle et jouxtant le Parlement Européen, comprend un pavillon Napoléon III, un petit parc aux cerfs avec des cigognes alsaciennes, un lac et un petit train. L'espace canin clôturé de 1 200 m² dans le coin nord-est est le plu`,
    descEs: `El parque más querido de Estrasburgo, que data del siglo XVII y es adyacente al Parlamento Europeo, cuenta con un pabellón Napoleón III, un pequeño parque de ciervos con cigüeñas alsacianas, un lago y un pequeño tren. La zona vallada sin correa de 1.200 m² en la esquina noreste e`,
  },
  {
    citySlug: "stuttgart",
    name: "Schlossgarten Hundeauslauf",
    neighborhood: "Mitte",
    photo: "/images/city-places/stuttgart-parks-schlossgarten-hundeauslauf.jpg",
    descEn: `The 61-hectare ribbon of Schlossgarten links the city centre to the Neckar at Bad Cannstatt and is the most central walking option. A fenced off-leash meadow (Hundeauslauf) sits in the middle Schlossgarten section between the Eckensee and the Mineralbad Berg.`,
    descFr: `Le ruban du Schlossgarten (61 ha) relie le centre-ville au Neckar à Bad Cannstatt et constitue la promenade la plus centrale. Une prairie clôturée sans laisse (Hundeauslauf) se trouve dans le Mittelschlossgarten, entre l'Eckensee et le Mineralbad Berg.`,
    descEs: `El cinturón del Schlossgarten (61 ha) une el centro con el Neckar en Bad Cannstatt y es la opción de paseo más céntrica. Una pradera vallada sin correa (Hundeauslauf) está en el Schlossgarten medio, entre el Eckensee y el Mineralbad Berg.`,
  },
  {
    citySlug: "tallinn",
    name: "Tiigiveski Park",
    photo: "/images/city-places/tallinn-parks-tiigiveski-park.jpg",
    descEn: `One of Tallinn's best-equipped urban dog parks, located south of the Old Town. Tiigiveski features a proper agility course within its off-leash area — a significant upgrade from a basic fenced enclosure. Popular with local dog owners for training and socialisation. The park is cl`,
    descFr: `L'un des parcs canins urbains les mieux équipés de Tallinn, situé au sud de la vieille ville. Tiigiveski dispose d'un véritable parcours d'agilité dans sa zone de liberté — une amélioration significative par rapport à un simple enclos clôturé. Populaire auprès des propriétaires d`,
    descEs: `Uno de los mejores parques caninos urbanos de Tallinn, ubicado al sur del casco antiguo. Tiigiveski cuenta con un circuito de agilidad completo dentro de su área sin correa — una mejora significativa respecto a un simple recinto cercado. Popular entre los dueños de perros locales`,
  },
  {
    citySlug: "tampere",
    name: "Kauppi Forest",
    neighborhood: "North-east",
    size: "Approx. 700 hectares",
    photo: "/images/city-places/tampere-parks-kauppi-forest.jpg",
    descEn: `Tampere's largest urban forest — 700 ha of pine and spruce north-east of the centre, 30 km of marked summer hiking and winter cross-country ski trails, 4 fenced koira-aitaus, and direct access to Lake Näsijärvi.`,
    descFr: `La plus grande forêt urbaine de Tampere — 700 ha de pins et d'épicéas au nord-est du centre, 30 km de sentiers de randonnée estivale et de ski de fond hivernal balisés, 4 koira-aitaus clôturés, et accès direct au lac Näsijärvi.`,
    descEs: `El mayor bosque urbano de Tampere — 700 ha de pinos y abetos al noreste del centro, 30 km de senderos balizados de senderismo estival y esquí de fondo invernal, 4 koira-aitaus vallados, y acceso directo al lago Näsijärvi.`,
  },
  {
    citySlug: "toledo",
    name: "Parque de la Vega",
    neighborhood: "North",
    size: "Approx. 13 hectares",
    photo: "/images/city-places/toledo-parks-parque-de-la-vega.jpg",
    descEn: `Toledo's largest urban green space — 13 hectares with fountains, ornamental gardens, the Río Tajo riverside section. Free, dog-friendly with leashed dogs on main paths and a fenced dog zone in the north corner.`,
    descFr: `Le plus grand espace vert urbain de Toledo — 13 hectares avec fontaines, jardins d'agrément, section riveraine du Tage. Gratuit, dog-friendly avec chiens en laisse sur les allées principales et une zone canine clôturée au coin nord.`,
    descEs: `El mayor espacio verde urbano de Toledo — 13 hectáreas con fuentes, jardines ornamentales, sección ribereña del Tajo. Gratis, dog-friendly con perros con correa en los paseos principales y una zona canina vallada en la esquina norte.`,
  },
  {
    citySlug: "toulouse",
    name: "Jardins Compans-Caffarelli",
    photo: "/images/city-places/toulouse-parks-jardins-compans-caffarelli.jpg",
    descEn: `A 7-hectare formal garden near the Toulouse-Matabiau train station with alleys, lawns, and a Japanese garden section. Dogs can walk in the alleys and use the lawns for picnics, though the Japanese garden is restricted. A caniparc (fenced dog area) is available within the garden. `,
    descFr: `Un jardin formel de 7 hectares près de la gare Toulouse-Matabiau avec allées, pelouses et un jardin japonais. Les chiens peuvent se promener dans les allées et utiliser les pelouses pour les pique-niques, bien que le jardin japonais soit restreint. Un caniparc (espace canin clôtu`,
    descEs: `Un jardín formal de 7 hectáreas cerca de la estación de Toulouse-Matabiau con paseos, céspedes y un jardín japonés. Los perros pueden pasear por los senderos y usar los céspedes para picnics, aunque el jardín japonés está restringido. Hay un caniparc (área canina vallada) disponi`,
  },
  {
    citySlug: "turin",
    name: "Parco del Valentino",
    neighborhood: "San Salvario / Valentino",
    size: "84 ha / 208 acres",
    photo: "/images/city-places/turin-parks-parco-del-valentino.jpg",
    descEn: `Turin's most beloved public park, 84 hectares stretched along the Po river from Corso Vittorio to the Borgo Medievale. Two fenced Aree Cani (one near the castle, one at the southern end), shaded riverside paths, and a dog-friendly gelateria on the promenade.`,
    descFr: `Le parc public le plus aimé de Turin, 84 hectares étirés le long du Pô, du Corso Vittorio au Borgo Medievale. Deux Aree Cani clôturées (une près du château, une à l'extrémité sud), sentiers ombragés le long du fleuve et une gelateria dog-friendly sur la promenade.`,
    descEs: `El parque público más querido de Turín, 84 hectáreas a lo largo del Po, desde Corso Vittorio hasta el Borgo Medievale. Dos Aree Cani valladas (una cerca del castillo, otra en el extremo sur), senderos sombreados junto al río y una gelatería dog-friendly en el paseo.`,
  },
  {
    citySlug: "utrecht",
    name: "Griftpark",
    neighborhood: "Vogelenbuurt / Wittevrouwen",
    size: "\u2248 16 hectares",
    photo: "/images/city-places/utrecht-parks-griftpark.jpg",
    descEn: `A 16-hectare urban park north of the centre with a clearly marked off-leash zone, a fenced playground, a pet-friendly café, and a steady stream of local dogs from the Vogelenbuurt and Wittevrouwen neighbourhoods. It's the easiest off-leash run for anyone staying in central Utrech`,
    descFr: `Parc urbain de 16 hectares au nord du centre, avec zone sans laisse clairement balisée, plaine de jeu clôturée, café dog-friendly, et un défilé constant de chiens locaux des quartiers Vogelenbuurt et Wittevrouwen. C'est le terrain sans laisse le plus accessible pour quiconque log`,
    descEs: `Parque urbano de 16 hectáreas al norte del centro, con zona sin correa bien señalizada, parque infantil vallado, cafetería pet-friendly y un goteo constante de perros locales de los barrios Vogelenbuurt y Wittevrouwen. Es la salida sin correa más accesible para quien se aloja en `,
  },
  {
    citySlug: "verona",
    name: "Area Cani Via Andrea Doria",
    neighborhood: "Golosine",
    photo: "/images/city-places/verona-parks-area-cani-via-andrea-doria.jpg",
    descEn: `An official municipal dog park in the Golosine district with a fully fenced off-leash area featuring separate sections for large and small dogs. Equipped with water fountains, shaded seating, and double-gated entrances for security. Free parking is available nearby. Consistently `,
    descFr: `Un parc canin municipal officiel dans le quartier Golosine, avec une zone hors laisse entièrement clôturée divisée en sections pour grands et petits chiens. Équipé de fontaines d'eau, de sièges ombragés et de doubles portails de sécurité. Parking gratuit à proximité. Régulièremen`,
    descEs: `Un parque canino municipal oficial en el barrio Golosine, con una zona sin correa totalmente vallada con secciones separadas para perros grandes y pequeños. Equipado con fuentes de agua, asientos a la sombra y doble puerta de seguridad. Aparcamiento gratuito cerca. Constantemente`,
  },
  {
    citySlug: "vilnius",
    name: "Purina Dog Park (\u0160nipi\u0161k\u0117s)",
    neighborhood: "\u0160nipi\u0161k\u0117s (north bank, business district)",
    size: "Small fenced enclosure (~0.3 hectare)",
    photo: "/images/city-places/vilnius-parks-purina-dog-park-snipiskes.jpg",
    descEn: `Vilnius's only dedicated, fenced municipal dog park, sponsored by Purina and located on the north bank of the Neris in the modern Šnipiškės business district. Two separate fenced sections (small/large), agility equipment, water taps, and shaded benches. The Constitution Square is`,
    descFr: `Seul parc canin clôturé municipal dédié de Vilnius, sponsorisé par Purina et situé sur la rive nord de la Neris dans le quartier d'affaires moderne de Šnipiškės. Deux sections clôturées séparées (petits/grands), agility, robinets et bancs ombragés. La place de la Constitution est`,
    descEs: `El único parque canino municipal cerrado y dedicado de Vilna, patrocinado por Purina y situado en la orilla norte del Neris, en el moderno distrito de negocios de Šnipiškės. Dos secciones valladas separadas (pequeños/grandes), agility, fuentes y bancos con sombra. La Plaza de la `,
  },
  {
    citySlug: "wroclaw",
    name: "Park Grabiszy\u0144ski",
    neighborhood: "Grabiszyn / southwest",
    size: "About 50 hectares",
    photo: "/images/city-places/wroclaw-parks-park-grabiszynski.jpg",
    descEn: `A large, lived-in residential park covering roughly 50 hectares on the southwest side of the city, and arguably the most popular dog park in Wroclaw. Inside, the well-known Dog Meadow (Łąka dla psów) is a fully fenced off-leash zone with agility equipment, tunnels, ramps, and sla`,
    descFr: `Un grand parc résidentiel vivant d'environ 50 hectares au sud-ouest de la ville, sans doute le parc canin le plus populaire de Wroclaw. À l'intérieur, la fameuse Prairie aux Chiens (Łąka dla psów) est une zone clôturée sans laisse avec agility, tunnels, rampes et slalom, où les p`,
    descEs: `Un gran parque residencial muy vivo de unas 50 hectáreas en el suroeste de la ciudad, posiblemente el parque canino más popular de Wroclaw. Dentro, la conocida Pradera de Perros (Łąka dla psów) es una zona vallada sin correa con equipamiento de agility, túneles, rampas y eslalon,`,
  },
  {
    citySlug: "wroclaw",
    name: "Wyspa S\u0142odowa",
    neighborhood: "Old Town islands / Odra river",
    size: "Around 1 hectare",
    photo: "/images/city-places/wroclaw-parks-wyspa-s-odowa.jpg",
    descEn: `A small grassy island in the middle of the Odra river, a five-minute walk from the Rynek and the most beloved hangout in central Wroclaw. The lawn is open, shaded, and ringed by floating bars and views of the baroque University. Dogs are welcome everywhere on leash and the rivers`,
    descFr: `Une petite île herbeuse au milieu de l'Odra, à cinq minutes à pied du Rynek et le coin préféré du centre de Wroclaw. La pelouse est ouverte, ombragée et entourée de bars flottants avec vue sur l'Université baroque. Les chiens sont les bienvenus partout en laisse et les chemins en`,
    descEs: `Una pequeña isla con césped en medio del río Odra, a cinco minutos a pie del Rynek y el lugar favorito del centro de Wroclaw. La pradera es abierta, sombreada y está rodeada de bares flotantes y vistas a la Universidad barroca. Los perros son bienvenidos en todas partes con corre`,
  },
  {
    citySlug: "zagreb",
    name: "Maksimir Park",
    neighborhood: "Maksimir",
    photo: "/images/city-places/zagreb-parks-maksimir-park.jpg",
    descEn: `Zagreb's flagship 316-hectare park with five lakes and the city's main fenced off-leash dog zone near the second lake. Tram lines 4, 7, 11, and 12 stop at the entrance. The 4 km perimeter loop is the classic long walk; the woodland sections beyond the lakes stay quiet even on wee`,
    descFr: `Parc emblématique de Zagreb (316 ha) avec cinq lacs et la principale zone sans laisse clôturée de la ville, près du deuxième lac. Les trams 4, 7, 11 et 12 desservent l'entrée. La boucle périmétrique de 4 km est la grande promenade classique ; les sections boisées au-delà des lacs`,
    descEs: `Parque emblemático de Zagreb (316 ha) con cinco lagos y la principal zona sin correa vallada de la ciudad, cerca del segundo lago. Los tranvías 4, 7, 11 y 12 paran en la entrada. El bucle perimetral de 4 km es el paseo largo clásico; las zonas boscosas más allá de los lagos sigue`,
  },
  {
    citySlug: "zagreb",
    name: "Bundek Park",
    neighborhood: "Novi Zagreb",
    photo: "/images/city-places/zagreb-parks-bundek-park.jpg",
    descEn: `A 54-hectare modern park south of the Sava river with a designated fenced dog zone, two lakes, jogging paths, and broad open meadows. Quieter than Maksimir on weekdays. Tram lines 7 and 14 cross the river to the park edge, then a 5-minute walk.`,
    descFr: `Parc moderne de 54 hectares au sud de la Sava, avec une zone canine clôturée dédiée, deux lacs, des chemins de jogging et de larges prairies ouvertes. Plus calme que Maksimir en semaine. Les trams 7 et 14 traversent le fleuve jusqu'au bord du parc, puis 5 minutes à pied.`,
    descEs: `Parque moderno de 54 hectáreas al sur del río Sava, con una zona canina vallada, dos lagos, senderos para correr y amplias praderas abiertas. Más tranquilo que Maksimir entre semana. Los tranvías 7 y 14 cruzan el río hasta el borde del parque, luego 5 minutos a pie.`,
  },
  {
    citySlug: "zaragoza",
    name: "Parque del T\u00edo Jorge",
    photo: "/images/city-places/zaragoza-parks-parque-del-tio-jorge.jpg",
    descEn: `On the north bank of the Ebro, opposite the Casco Histórico across the Pilar Bridge. Hosts one of the city's largest fenced canine recreation zones: 4,725 m² split into two perimeter-fenced areas — 2,050 m² for calm dogs and 2,675 m² for active dogs — with double security gates, `,
    descFr: `Sur la rive nord de l'Ebre, face au Casco Histórico via le Pont du Pilar. Abrite l'une des plus grandes zones canines clôturées de la ville : 4 725 m² divisés en deux espaces — 2 050 m² pour chiens calmes et 2 675 m² pour chiens actifs — avec doubles portails de sécurité, fontain`,
    descEs: `En la orilla norte del Ebro, frente al Casco Histórico cruzando el Puente del Pilar. Alberga una de las mayores zonas caninas valladas de la ciudad: 4.725 m² divididos en dos espacios — 2.050 m² para perros tranquilos y 2.675 m² para perros activos — con dobles puertas de segurid`,
  },
  {
    citySlug: "zaragoza",
    name: "Parque de los Poetas",
    photo: "/images/city-places/zaragoza-parks-parque-de-los-poetas.jpg",
    descEn: `A 4-hectare neighbourhood park in the Almozara district with one of Zaragoza's most popular fenced dog enclosures — a flat, fully gated grass and gravel zone with two entrances, water fountains for dogs, and shade from mature pines. The enclosure is unrestricted by hour; the surr`,
    descFr: `Un parc de quartier de 4 hectares dans le district de l'Almozara, avec l'un des enclos à chiens clôturés les plus populaires de Saragosse — une zone plate, entièrement fermée, mêlant herbe et gravier, avec deux entrées, fontaines à eau pour chiens et ombrage de pins matures. L'en`,
    descEs: `Un parque de barrio de 4 hectáreas en el distrito de la Almozara con uno de los recintos caninos vallados más populares de Zaragoza — una zona plana, totalmente cerrada, con hierba y gravilla, dos entradas, fuentes de agua para perros y sombra de pinos maduros. El recinto no tien`,
  },]

// Tally cities and countries for stats
const CITY_COUNT = new Set(PARKS.map((p) => p.citySlug)).size
const COUNTRY_TALLY: [string, number][] = Object.entries(
  PARKS.reduce<Record<string, number>>((acc, p) => {
    const c = destinations.find((d) => d.slug === p.citySlug)?.country
    if (c) acc[c] = (acc[c] ?? 0) + 1
    return acc
  }, {})
).sort((a, b) => b[1] - a[1])

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'es' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: `${PARKS.length} Fenced Dog Parks in Europe — Off-Leash Zones Verified (${new Date().getFullYear()}) | HotelsWithPets`,
    fr: `${PARKS.length} parcs canins clôturés en Europe — zones sans laisse vérifiées (${new Date().getFullYear()}) | HotelsWithPets`,
    es: `${PARKS.length} parques caninos vallados en Europa — zonas sin correa verificadas (${new Date().getFullYear()}) | HotelsWithPets`,
  }
  const descs: Record<string, string> = {
    en: `Verified list of ${PARKS.length} fenced dog parks across ${CITY_COUNT} European cities — secure off-leash zones, neighbourhood, size and the parent city guide for each park.`,
    fr: `Liste vérifiée de ${PARKS.length} parcs canins clôturés dans ${CITY_COUNT} villes européennes — zones sans laisse sécurisées, quartier, surface et guide de ville parent pour chacun.`,
    es: `Lista verificada de ${PARKS.length} parques caninos vallados en ${CITY_COUNT} ciudades europeas — zonas sin correa seguras, barrio, superficie y guía de la ciudad de cada parque.`,
  }
  const today = new Date().toISOString().split('T')[0]
  return {
    title: titles[locale] ?? titles.en,
    description: descs[locale] ?? descs.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        en: `${SITE_URL}/en/guides/${SLUG}`,
        fr: `${SITE_URL}/fr/guides/${SLUG}`,
        es: `${SITE_URL}/es/guides/${SLUG}`,
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descs[locale] ?? descs.en,
      type: 'article',
      publishedTime: '2026-05-13T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

const COPY: Record<Locale, {
  kicker: string; h1: string; lede: string
  introTitle: string; introParas: string[]
  countryTitle: string; countryIntro: string; countriesLabel: string
  listTitle: string
  parksLabel: string; citiesLabel: string; countriesStatLabel: string
  ctaTitle: string; ctaDesc: string; ctaButton: string
  faqTitle: string; faqs: { q: string; a: string }[]
  legalTitle: string; legalParas: string[]
}> = {
  en: {
    kicker: 'FENCED DOG PARKS · 2026 EDITION',
    h1: `${PARKS.length} Fenced Dog Parks in Europe`,
    lede: `Every European city has at least one fenced dog zone where your dog can run safely off-leash — locally called Hundezone (Austria, Germany), sgambamento (Italy), hundeskov (Denmark), caniparc (France), área canina (Spain) or parque para perros (Portugal). This is the verified inventory across our ${destinations.length} city guides.`,
    introTitle: 'Why fenced matters',
    introParas: [
      `In most European cities, leash law applies in all public spaces by default. Fenced dog zones are the legal exception: secure perimeters where a dog can run free without breaking municipal bylaws, without risking traffic, and without conflict with joggers, cyclists or other park users.`,
      `Each entry below links back to its parent city guide, where you'll find the exact address, transport, opening hours, the local off-leash rules, and verified pet-friendly hotels nearby — every recommendation drills down to the booking step.`,
    ],
    countryTitle: 'Distribution by country',
    countryIntro: `Germany, Austria and Italy lead Europe on fenced dog infrastructure thanks to strong municipal park culture. Spain and France follow with growing caniparc and área canina networks.`,
    countriesLabel: 'Top countries',
    listTitle: 'The full list — alphabetical by city',
    parksLabel: 'fenced parks',
    citiesLabel: 'cities',
    countriesStatLabel: 'countries',
    ctaTitle: 'Find a pet-friendly hotel near these dog parks',
    ctaDesc: 'Every park in the list links to its parent city guide, with 5+ verified pet-friendly hotels per city, pet fees in EUR and direct Booking.com affiliate links.',
    ctaButton: 'Browse all destinations →',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'What is a fenced dog park in Europe called?', a: 'Names vary by country: Hundezone or Hundewiese (Austria, Germany, Switzerland), sgambamento or area cani (Italy), hundeskov (Denmark), hondenuitlaatgebied or losloopgebied (Netherlands), caniparc or aire pour chiens (France), área canina or zona canina (Spain), parque para cães (Portugal). All refer to the same thing: a fenced perimeter where off-leash play is permitted.' },
      { q: 'Are fenced dog parks free to enter?', a: 'Yes, all the fenced dog zones on this list are public municipal infrastructure with free entry, 24/7 except where noted. A small minority of private commercial dog parks across Europe charge entry — none of those are included here.' },
      { q: 'Which European country has the best fenced dog park infrastructure?', a: 'By number per capita: Austria, Germany and Italy lead. Austrian cities like Vienna, Salzburg and Graz typically have 5+ fenced Hundezonen each. Italian cities maintain sgambamento areas in every major park. Spain has rapidly expanded its área canina network since 2018.' },
      { q: 'Are the fenced parks accessible by public transport?', a: 'Yes for all of them — every park in this list sits inside a city already served by our destination network, with tram, metro or bus access. Detailed transport info is in each parent city guide.' },
      { q: 'Can I bring more than one dog to a fenced park?', a: 'Yes in almost all cases. A small number of Italian sgambamento areas cap visitors at 2 dogs per owner during peak hours; signage on entry will state any local rules.' },
    ],
    legalTitle: 'Rules common to all fenced dog zones',
    legalParas: [
      `Sterile females, neutered males and well-socialised dogs are welcome. Aggressive or in-heat dogs should not be brought to a shared off-leash zone — this is a universal park-etiquette rule and not enforced by signage.`,
      `Poo bags are mandatory inside the fenced zone — most parks provide dispensers at the entrance. Fines range from 50 € to 750 € per missed pickup depending on the city and country.`,
      `Some parks separate small dogs (under 10 kg) from large dogs with a secondary fence. Look for "Small dogs" / "Petits chiens" / "Cani piccoli" signage at the gate.`,
    ],
  },
  fr: {
    kicker: 'PARCS CANINS CLÔTURÉS · ÉDITION 2026',
    h1: `${PARKS.length} parcs canins clôturés en Europe`,
    lede: `Toutes les grandes villes européennes ont au moins une zone canine clôturée où votre chien peut courir librement sans laisse — appelée localement Hundezone (Autriche, Allemagne), sgambamento (Italie), hundeskov (Danemark), caniparc (France), área canina (Espagne) ou parque para cães (Portugal). Voici l'inventaire vérifié issu de nos ${destinations.length} guides urbains.`,
    introTitle: 'Pourquoi la clôture compte',
    introParas: [
      `Dans la plupart des villes européennes, la laisse est obligatoire par défaut dans tout l'espace public. Les zones canines clôturées sont l'exception légale : un périmètre sécurisé où un chien peut courir sans enfreindre les arrêtés municipaux, sans risque de circulation, et sans conflit avec joggers, cyclistes ou autres usagers.`,
      `Chaque entrée ci-dessous renvoie au guide de sa ville parente, où vous trouverez l'adresse exacte, les transports, les horaires d'ouverture, les règles locales sans laisse et les hôtels pet-friendly vérifiés à proximité — chaque recommandation se prolonge jusqu'à l'étape réservation.`,
    ],
    countryTitle: 'Répartition par pays',
    countryIntro: `L'Allemagne, l'Autriche et l'Italie dominent l'Europe en infrastructure canine clôturée grâce à leur forte culture de parc municipal. L'Espagne et la France suivent avec leurs réseaux croissants de caniparcs et áreas caninas.`,
    countriesLabel: 'Pays en tête',
    listTitle: 'La liste complète — par ordre alphabétique de ville',
    parksLabel: 'parcs clôturés',
    citiesLabel: 'villes',
    countriesStatLabel: 'pays',
    ctaTitle: 'Trouvez un hôtel pet-friendly près de ces parcs canins',
    ctaDesc: `Chaque parc de la liste renvoie au guide de sa ville parente, avec 5+ hôtels pet-friendly vérifiés par ville, suppléments en EUR et liens d'affiliation Booking.com directs.`,
    ctaButton: 'Toutes les destinations →',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment appelle-t-on un parc canin clôturé en Europe ?', a: `Les noms varient selon les pays : Hundezone ou Hundewiese (Autriche, Allemagne, Suisse), sgambamento ou area cani (Italie), hundeskov (Danemark), hondenuitlaatgebied ou losloopgebied (Pays-Bas), caniparc ou aire pour chiens (France), área canina ou zona canina (Espagne), parque para cães (Portugal). Tous désignent la même chose : un périmètre clôturé où le sans laisse est autorisé.` },
      { q: 'Les parcs canins clôturés sont-ils gratuits ?', a: `Oui, toutes les zones canines clôturées de cette liste sont des équipements municipaux publics gratuits, ouverts 24h/24 sauf mention contraire. Une petite minorité de parcs canins privés payants existent en Europe — aucun n'est inclus ici.` },
      { q: 'Quel pays européen a la meilleure infrastructure de parcs canins clôturés ?', a: `Par nombre par habitant : Autriche, Allemagne et Italie en tête. Les villes autrichiennes (Vienne, Salzbourg, Graz) comptent typiquement 5+ Hundezonen chacune. Les villes italiennes maintiennent des sgambamento dans chaque grand parc. L'Espagne a rapidement étendu son réseau d'áreas caninas depuis 2018.` },
      { q: 'Les parcs clôturés sont-ils accessibles en transports ?', a: `Oui pour tous — chaque parc de cette liste se trouve dans une ville déjà couverte par notre réseau de destinations, avec accès tram, métro ou bus. Les informations détaillées sont dans chaque guide ville parent.` },
      { q: 'Puis-je amener plusieurs chiens dans un parc clôturé ?', a: `Oui dans la quasi-totalité des cas. Quelques sgambamenti italiens limitent les visiteurs à 2 chiens par maître aux heures de pointe ; la signalétique à l'entrée précise les règles locales.` },
    ],
    legalTitle: 'Règles communes à toutes les zones canines clôturées',
    legalParas: [
      `Les femelles stérilisées, mâles castrés et chiens bien socialisés sont les bienvenus. Les chiens agressifs ou en chaleur ne devraient pas entrer dans une zone sans laisse partagée — règle d'étiquette universelle non écrite.`,
      `Les sacs à déjections sont obligatoires dans la zone clôturée — la plupart des parcs ont des distributeurs à l'entrée. Les amendes vont de 50 € à 750 € par infraction selon la ville et le pays.`,
      `Certains parcs séparent les petits chiens (moins de 10 kg) des grands par une seconde clôture. Cherchez la signalétique « Small dogs » / « Petits chiens » / « Cani piccoli » à l'entrée.`,
    ],
  },
  es: {
    kicker: 'PARQUES CANINOS VALLADOS · EDICIÓN 2026',
    h1: `${PARKS.length} parques caninos vallados en Europa`,
    lede: `Toda gran ciudad europea tiene al menos una zona canina vallada donde tu perro puede correr libre sin correa — llamada Hundezone (Austria, Alemania), sgambamento (Italia), hundeskov (Dinamarca), caniparc (Francia), área canina (España) o parque para cães (Portugal). Este es el inventario verificado a partir de nuestras ${destinations.length} guías urbanas.`,
    introTitle: 'Por qué importa la valla',
    introParas: [
      `En la mayoría de las ciudades europeas, la correa es obligatoria por defecto en todo espacio público. Las zonas caninas valladas son la excepción legal: un perímetro seguro donde el perro puede correr libre sin violar las ordenanzas municipales, sin riesgo de tráfico y sin conflicto con corredores, ciclistas u otros usuarios.`,
      `Cada entrada abajo enlaza con la guía de su ciudad matriz, donde encontrarás la dirección exacta, el transporte, los horarios, las normas locales sin correa y los hoteles pet-friendly verificados cercanos — cada recomendación llega hasta el paso de reserva.`,
    ],
    countryTitle: 'Distribución por país',
    countryIntro: `Alemania, Austria e Italia lideran Europa en infraestructura canina vallada gracias a su fuerte cultura de parque municipal. España y Francia siguen con sus crecientes redes de áreas caninas y caniparcs.`,
    countriesLabel: 'Países líderes',
    listTitle: 'La lista completa — orden alfabético por ciudad',
    parksLabel: 'parques vallados',
    citiesLabel: 'ciudades',
    countriesStatLabel: 'países',
    ctaTitle: 'Encuentra un hotel pet-friendly cerca de estos parques caninos',
    ctaDesc: 'Cada parque de la lista enlaza con la guía de su ciudad matriz, con 5+ hoteles pet-friendly verificados por ciudad, suplementos en EUR y enlaces de afiliación Booking.com directos.',
    ctaButton: 'Todas las destinos →',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cómo se llama un parque canino vallado en Europa?', a: 'Los nombres varían según el país: Hundezone o Hundewiese (Austria, Alemania, Suiza), sgambamento o area cani (Italia), hundeskov (Dinamarca), hondenuitlaatgebied o losloopgebied (Países Bajos), caniparc o aire pour chiens (Francia), área canina o zona canina (España), parque para cães (Portugal). Todos designan lo mismo: un perímetro vallado donde se permite estar sin correa.' },
      { q: '¿Son gratuitos los parques caninos vallados?', a: 'Sí, todas las zonas caninas valladas de esta lista son equipamiento municipal público gratuito, abierto 24h salvo mención en contra. Una pequeña minoría de parques caninos privados de pago existen en Europa — ninguno está incluido aquí.' },
      { q: '¿Qué país europeo tiene la mejor infraestructura de parques caninos vallados?', a: 'Por número per cápita: Austria, Alemania e Italia en cabeza. Las ciudades austriacas (Viena, Salzburgo, Graz) suelen contar con 5+ Hundezonen cada una. Las ciudades italianas mantienen sgambamento en cada gran parque. España ha ampliado rápidamente su red de áreas caninas desde 2018.' },
      { q: '¿Son accesibles en transporte público los parques vallados?', a: 'Sí para todos — cada parque de la lista se encuentra en una ciudad ya cubierta por nuestra red de destinos, con acceso en tranvía, metro o autobús. La información detallada está en cada guía de ciudad matriz.' },
      { q: '¿Puedo llevar varios perros a un parque vallado?', a: 'Sí en casi todos los casos. Algunos sgambamenti italianos limitan a 2 perros por dueño en horas punta; la señalización en la entrada indica las normas locales.' },
    ],
    legalTitle: 'Reglas comunes a todas las zonas caninas valladas',
    legalParas: [
      `Las hembras esterilizadas, machos castrados y perros bien socializados son bienvenidos. Los perros agresivos o en celo no deberían entrar en una zona sin correa compartida — regla universal de etiqueta, no escrita.`,
      `Las bolsas para residuos son obligatorias en la zona vallada — la mayoría de parques tienen dispensadores en la entrada. Las multas van de 50 € a 750 € por infracción según la ciudad y el país.`,
      `Algunos parques separan los perros pequeños (menos de 10 kg) de los grandes con una segunda valla. Busca la señalización «Small dogs» / «Petits chiens» / «Cani piccoli» en la entrada.`,
    ],
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const l = locale as Locale
  const t = COPY[l]

  // Sort PARKS alphabetically by city name in the active locale
  const sorted = [...PARKS].sort((a, b) => {
    const an = getLocalizedCityName(a.citySlug, destinations.find((d) => d.slug === a.citySlug)?.name ?? a.citySlug, l)
    const bn = getLocalizedCityName(b.citySlug, destinations.find((d) => d.slug === b.citySlug)?.name ?? b.citySlug, l)
    return an.localeCompare(bn, l)
  })

  // Schema.org Article + ItemList + FAQPage
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t.h1,
      description: t.lede,
      datePublished: '2026-05-13T00:00:00Z',
      dateModified: new Date().toISOString(),
      author: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/${l}/guides/${SLUG}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      numberOfItems: PARKS.length,
      itemListElement: sorted.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/${l}/destinations/${p.citySlug}/parks`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-700">{t.kicker}</p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">{t.h1}</h1>
          <p className="text-lg leading-relaxed text-gray-700">{t.lede}</p>
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg bg-cyan-50 p-4 text-sm">
            <div><div className="text-2xl font-bold text-cyan-800">{PARKS.length}</div><div className="text-cyan-900/70">{t.parksLabel}</div></div>
            <div><div className="text-2xl font-bold text-cyan-800">{CITY_COUNT}</div><div className="text-cyan-900/70">{t.citiesLabel}</div></div>
            <div><div className="text-2xl font-bold text-cyan-800">{COUNTRY_TALLY.length}</div><div className="text-cyan-900/70">{t.countriesStatLabel}</div></div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{t.introTitle}</h2>
          {t.introParas.map((p, i) => (<p key={i} className="mb-4 leading-relaxed text-gray-700">{p}</p>))}
        </section>

        <section className="mb-12">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">{t.countryTitle}</h2>
          <p className="mb-4 leading-relaxed text-gray-700">{t.countryIntro}</p>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600"><tr>
                <th className="px-4 py-2 font-medium">{t.countriesLabel}</th>
                <th className="px-4 py-2 text-right font-medium">{t.parksLabel}</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {COUNTRY_TALLY.slice(0, 10).map(([c, n]) => (
                  <tr key={c}>
                    <td className="px-4 py-2 text-gray-900">{getLocalizedCountryName(c, l)}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-gray-700">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.listTitle}</h2>
          <ol className="space-y-5">
            {sorted.map((p, i) => {
              const dest = destinations.find((d) => d.slug === p.citySlug)
              if (!dest) return null
              const cityName = getLocalizedCityName(p.citySlug, dest.name, l)
              const countryName = getLocalizedCountryName(dest.country, l)
              const desc = l === 'fr' ? p.descFr : l === 'es' ? p.descEs : p.descEn
              return (
                <li key={`${p.citySlug}-${p.name}-${i}`} className="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                  <Link href={`/${l}/destinations/${p.citySlug}/parks`} className="flex flex-col sm:flex-row">
                    {p.photo && (
                      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-t-xl bg-gray-100 sm:h-auto sm:w-56 sm:rounded-l-xl sm:rounded-tr-none">
                        <Image src={p.photo} alt={p.name} fill sizes="(max-width:640px) 100vw, 224px" className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">🔒 Fenced</span>
                        {p.size && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{p.size}</span>}
                        {p.neighborhood && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{p.neighborhood}</span>}
                      </div>
                      <h3 className="mb-1 text-xl font-bold text-gray-900">{p.name}</h3>
                      <p className="mb-2 text-sm text-gray-500">{dest.flag} {cityName}, {countryName}</p>
                      <p className="text-sm leading-relaxed text-gray-700">{desc}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="mb-12 rounded-xl bg-cyan-50 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">{t.ctaTitle}</h2>
          <p className="mb-5 leading-relaxed text-gray-700">{t.ctaDesc}</p>
          <Link href={`/${l}/destinations`} className="inline-flex rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-800">{t.ctaButton}</Link>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{t.legalTitle}</h2>
          {t.legalParas.map((p, i) => (<p key={i} className="mb-3 leading-relaxed text-gray-700">{p}</p>))}
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faqs.map((f, i) => (
              <details key={i} className="group rounded-lg border border-gray-200 bg-white p-4 open:shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-gray-900">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <GuideFooter locale={l} currentSlug={SLUG} />
      </article>
    </>
  )
}
