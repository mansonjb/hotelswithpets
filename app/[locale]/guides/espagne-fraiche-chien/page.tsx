import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'espagne-fraiche-chien'
const CAMPAIGN = 'espagne-fraiche'

type L4 = { en: string; fr: string; es: string; pt: string; de: string; nl: string }
type Hotel = { name: string; stars: number; note: L4 }
type City = {
  slug: string
  name: string
  region: L4
  julyTemp: number
  tag: L4
  why: L4
  dogTip: L4
  hotels: Hotel[]
}
type Region = {
  id: string
  emoji: string
  title: L4
  cities: City[]
}

const REGIONS: Region[] = [
  {
    id: 'pays-basque',
    emoji: '🌊',
    title: { en: 'Basque Country', fr: 'Pays basque', es: 'País Vasco', pt: 'País Basco', de: 'Baskenland', nl: 'Baskenland' },
    cities: [
      {
        slug: 'san-sebastian',
        name: 'San Sebastián',
        region: { en: 'Basque Country', fr: 'Pays basque', es: 'País Vasco', pt: 'País Basco', de: 'Baskenland', nl: 'Baskenland' },
        julyTemp: 22,
        tag: { en: 'Atlantic surf coast', fr: 'Côte surf atlantique', es: 'Costa surf atlántica', pt: 'Costa surf atlântica', de: 'Atlantische Surfküste', nl: 'Atlantische surfkust' },
        why: {
          en: 'The Basque coast stays at 22°C while Madrid hits 38°C. La Concha beach allows dogs before 10am and after 8pm in summer, the most famous urban dog beach in Spain. Ondarreta beach is dog-friendly year-round. The pintxos bars on Calle 31 de Agosto accept dogs on terrace. The old town is fully walkable with dogs.',
          fr: "La côte basque tient à 22°C pendant que Madrid atteint 38°C. La plage de la Concha autorise les chiens avant 10h et après 20h en été, la plus célèbre plage urbaine dog-friendly d'Espagne. Ondarreta est ouverte aux chiens toute l'année. Les bars à pintxos de la Calle 31 de Agosto acceptent les chiens en terrasse.",
          es: 'La costa vasca se mantiene a 22°C mientras Madrid alcanza los 38°C. La playa de la Concha permite perros antes de las 10h y después de las 20h en verano, la playa urbana dog-friendly más famosa de España. Ondarreta es dog-friendly todo el año. Los bares de pintxos de la Calle 31 de Agosto aceptan perros en terraza.',
          pt: 'A costa basca mantém-se a 22°C enquanto Madrid atinge 38°C. A praia da Concha permite cães antes das 10h e depois das 20h no verão, a praia urbana dog-friendly mais famosa de Espanha. Ondarreta é dog-friendly durante todo o ano. Os bares de pintxos da Calle 31 de Agosto aceitam cães na esplanada.',
          de: `Die baskische Küste bleibt bei 22°C, während Madrid 38°C erreicht. Der Strand La Concha erlaubt Hunde vor 10 Uhr und nach 20 Uhr im Sommer, der berühmteste stadtnahe Hundestrand Spaniens. Der Strand Ondarreta ist ganzjährig hundefreundlich. Die Pintxos-Bars in der Calle 31 de Agosto akzeptieren Hunde auf der Terrasse. Die Altstadt ist komplett hundefreundlich zu Fuß erkundbar.`,
          nl: 'De Baskische kust blijft op 22°C terwijl Madrid 38°C haalt. Het strand La Concha staat honden toe voor 10 uur en na 20 uur in de zomer, het beroemdste stadsstrand voor honden van Spanje. Strand Ondarreta is het hele jaar hondvriendelijk. De pintxosbars aan de Calle 31 de Agosto laten honden toe op het terras. De oude stad is volledig te voet te verkennen met je hond.',
        },
        dogTip: {
          en: 'Monte Urgull summit trail: 30 min off-lead, 360° bay views, almost always deserted.',
          fr: 'Sentier du Monte Urgull : 30 min sans laisse, vue 360° sur la baie, presque toujours désert.',
          es: 'Sendero del Monte Urgull: 30 min sin correa, vistas 360° de la bahía, casi siempre desierto.',
          pt: 'Trilho do Monte Urgull: 30 min sem trela, vistas 360° da baía, quase sempre deserto.',
          de: 'Gipfelweg Monte Urgull: 30 min ohne Leine, 360°-Blick auf die Bucht, fast immer menschenleer.',
          nl: 'Wandelpad naar de top van de Monte Urgull: 30 min zonder lijn, 360°-uitzicht over de baai, bijna altijd verlaten.',
        },
        hotels: [
          {
            name: 'Hotel María Cristina',
            stars: 5,
            note: { en: 'Iconic Belle Époque palace on the Urumea river, small pets accepted.', fr: 'Palais Belle Époque iconique sur la rivière Urumea, petits animaux acceptés.', es: 'Icónico palacio Belle Époque junto al río Urumea, mascotas pequeñas aceptadas.', pt: 'Icónico palácio Belle Époque junto ao rio Urumea, animais pequenos aceites.', de: 'Ikonischer Belle-Époque-Palast am Fluss Urumea, kleine Haustiere erlaubt.', nl: 'Iconisch Belle-Époquepaleis aan de rivier de Urumea, kleine huisdieren toegestaan.' },
          },
          {
            name: 'Hotel de Londres y de Inglaterra',
            stars: 4,
            note: { en: 'Directly on La Concha bay, sea-view rooms, dogs accepted in most room types.', fr: 'Directement sur la baie de La Concha, chambres vue mer, chiens acceptés dans la plupart des catégories.', es: 'Directamente sobre la bahía de La Concha, habitaciones con vistas al mar, perros aceptados en la mayoría de tipos de habitación.', pt: 'Diretamente na baía da Concha, quartos com vista para o mar, cães aceites na maioria dos tipos de quarto.', de: 'Direkt an der Bucht La Concha, Zimmer mit Meerblick, Hunde in den meisten Zimmerkategorien erlaubt.', nl: 'Direct aan de baai van La Concha, kamers met zeezicht, honden toegestaan in de meeste kamertypes.' },
          },
          {
            name: 'NH Collection Aranzazu',
            stars: 4,
            note: { en: 'City-centre hotel, 5 min walk to La Concha, pets up to 20 kg welcome.', fr: 'Hôtel en centre-ville, 5 min à pied de La Concha, animaux jusqu\'à 20 kg acceptés.', es: 'Hotel en el centro, a 5 min a pie de La Concha, mascotas hasta 20 kg bienvenidas.', pt: 'Hotel no centro da cidade, 5 min a pé da Concha, animais até 20 kg bem-vindos.', de: `Hotel im Stadtzentrum, 5 Gehminuten zur Concha, Haustiere bis 20 kg willkommen.`, nl: 'Hotel in het stadscentrum, 5 minuten lopen van La Concha, huisdieren tot 20 kg welkom.' },
          },
        ],
      },
      {
        slug: 'bilbao',
        name: 'Bilbao',
        region: { en: 'Basque Country', fr: 'Pays basque', es: 'País Vasco', pt: 'País Basco', de: 'Baskenland', nl: 'Baskenland' },
        julyTemp: 22,
        tag: { en: 'Guggenheim city · Nervión river', fr: 'Ville Guggenheim · río Nervión', es: 'Ciudad Guggenheim · ría del Nervión', pt: 'Cidade Guggenheim · ria do Nervión', de: 'Guggenheim-Stadt · Fluss Nervión', nl: 'Guggenheimstad · rivier de Nervión' },
        why: {
          en: 'Bilbao benefits from the same Atlantic air that keeps the Basque coast cool. The Nervión riverbank walkway is 12 km of flat, shaded dog walking. Parque Etxebarria is off-lead from the car park to the viewpoint. The Mercado de la Ribera terrace restaurants allow dogs. Cable car up to Artxanda mountain: dogs free.',
          fr: "Bilbao bénéficie du même air atlantique qui maintient la côte basque fraîche. La promenade du río Nervión fait 12 km de marche plate et ombragée. Le Parque Etxebarria est sans laisse du parking au belvédère. Les restaurants-terrasse du Mercado de la Ribera acceptent les chiens. Téléphérique vers Artxanda : chiens gratuits.",
          es: 'Bilbao se beneficia del mismo aire atlántico que mantiene fresca la costa vasca. El paseo de la ría del Nervión son 12 km de paseo llano y sombreado. El Parque Etxebarria es sin correa desde el aparcamiento hasta el mirador. Los restaurantes-terraza del Mercado de la Ribera aceptan perros. Teleférico al monte Artxanda: perros gratis.',
          pt: 'Bilbau beneficia do mesmo ar atlântico que mantém a costa basca fresca. O passeio do rio Nervión tem 12 km de caminhada plana e ensombrada. O Parque Etxebarria é sem trela desde o parque até ao miradouro. Os restaurantes-esplanada do Mercado de la Ribera aceitam cães. Teleférico ao monte Artxanda: cães grátis.',
          de: `Bilbao profitiert von derselben atlantischen Luft, die die baskische Küste kühl hält. Der Uferweg am Nervión bietet 12 km flache, schattige Hundespaziergänge. Der Parque Etxebarria ist vom Parkplatz bis zum Aussichtspunkt leinenfrei. Die Terrassenrestaurants am Mercado de la Ribera erlauben Hunde. Seilbahn zum Berg Artxanda: Hunde kostenlos.`,
          nl: 'Bilbao profiteert van dezelfde Atlantische lucht die de Baskische kust koel houdt. De oeverpromenade langs de Nervión is 12 km vlakke, beschaduwde wandelroute voor honden. Het Parque Etxebarria is van de parkeerplaats tot het uitzichtpunt zonder lijn. De terrasrestaurants van de Mercado de la Ribera laten honden toe. Kabelbaan naar de berg Artxanda: honden gratis.',
        },
        dogTip: {
          en: 'Parque Natural Urkiola, 45 min by car: vast beech forest, off-lead, cool even in August.',
          fr: 'Parc Naturel Urkiola, 45 min en voiture : vaste forêt de hêtres, sans laisse, frais même en août.',
          es: 'Parque Natural de Urkiola, 45 min en coche: amplio hayedo, sin correa, fresco incluso en agosto.',
          pt: 'Parque Natural Urkiola, 45 min de carro: vasta floresta de faias, sem trela, fresco mesmo em agosto.',
          de: 'Naturpark Urkiola, 45 min mit dem Auto: weitläufiger Buchenwald, ohne Leine, kühl selbst im August.',
          nl: 'Natuurpark Urkiola, 45 min met de auto: uitgestrekt beukenbos, zonder lijn, koel zelfs in augustus.',
        },
        hotels: [
          {
            name: 'Gran Hotel Domine Bilbao',
            stars: 5,
            note: { en: 'Facing the Guggenheim, design hotel, small pets accepted.', fr: 'Face au Guggenheim, hôtel design, petits animaux acceptés.', es: 'Frente al Guggenheim, hotel de diseño, mascotas pequeñas aceptadas.', pt: 'Em frente ao Guggenheim, hotel de design, animais pequenos aceites.', de: 'Gegenüber dem Guggenheim, Designhotel, kleine Haustiere erlaubt.', nl: 'Tegenover het Guggenheim, designhotel, kleine huisdieren toegestaan.' },
          },
          {
            name: 'Hotel Miró',
            stars: 4,
            note: { en: 'Boutique hotel by the Nervión, 5 min to Guggenheim, dogs under 10 kg welcome.', fr: 'Hôtel boutique au bord du Nervión, 5 min du Guggenheim, chiens de moins de 10 kg bienvenus.', es: 'Hotel boutique junto al Nervión, a 5 min del Guggenheim, perros menores de 10 kg bienvenidos.', pt: 'Hotel boutique junto ao Nervión, 5 min do Guggenheim, cães abaixo de 10 kg bem-vindos.', de: 'Boutique-Hotel am Nervión, 5 Minuten zum Guggenheim, Hunde unter 10 kg willkommen.', nl: 'Boetiekhotel aan de Nervión, 5 min van het Guggenheim, honden onder 10 kg welkom.' },
          },
          {
            name: 'Hotel Ercilla',
            stars: 4,
            note: { en: 'Classic Bilbao hotel near the Old Town, dog-friendly rooms available on request.', fr: 'Hôtel classique de Bilbao près du quartier ancien, chambres dog-friendly sur demande.', es: 'Hotel clásico de Bilbao cerca del casco viejo, habitaciones dog-friendly disponibles bajo petición.', pt: 'Hotel clássico de Bilbau perto do bairro antigo, quartos dog-friendly disponíveis mediante pedido.', de: `Klassisches Hotel in Bilbao nahe der Altstadt, hundefreundliche Zimmer auf Anfrage verfügbar.`, nl: 'Klassiek hotel in Bilbao vlak bij de oude stad, hondvriendelijke kamers op aanvraag.' },
          },
        ],
      },
    ],
  },
  {
    id: 'cantabrie',
    emoji: '🏖️',
    title: { en: 'Cantabria', fr: 'Cantabrie', es: 'Cantabria', pt: 'Cantábria', de: 'Kantabrien', nl: 'Kantabrië' },
    cities: [
      {
        slug: 'santander',
        name: 'Santander',
        region: { en: 'Cantabria', fr: 'Cantabrie', es: 'Cantabria', pt: 'Cantábria', de: 'Kantabrien', nl: 'Kantabrië' },
        julyTemp: 20,
        tag: { en: 'Atlantic bay · royal summer city', fr: "Baie atlantique · ville royale d'été", es: 'Bahía atlántica · ciudad real de verano', pt: 'Baía atlântica · cidade real de verão', de: 'Atlantikbucht · königliche Sommerstadt', nl: 'Atlantische baai · koninklijke zomerstad' },
        why: {
          en: 'Santander sits on a peninsula between two bays, with sea breezes that rarely allow July to exceed 20°C. El Sardinero beach allows dogs before 10am and after 8pm. The Magdalena Peninsula park (former royal summer palace grounds) is 11 hectares of cliffs and gardens, mostly off-lead. Cantabria has the highest density of dog-friendly restaurants in northern Spain.',
          fr: "Santander occupe une péninsule entre deux baies, avec des brises marines qui dépassent rarement 20°C en juillet. El Sardinero autorise les chiens avant 10h et après 20h. La péninsule de la Magdalena (anciens jardins royaux) fait 11 hectares de falaises et jardins, majoritairement sans laisse. La Cantabrie a la plus haute densité de restaurants dog-friendly du Nord espagnol.",
          es: 'Santander ocupa una península entre dos bahías, con brisas marinas que rara vez superan los 20°C en julio. El Sardinero permite perros antes de las 10h y después de las 20h. La Península de la Magdalena (antigua residencia real de verano) tiene 11 hectáreas de acantilados y jardines, mayormente sin correa.',
          pt: 'Santander ocupa uma península entre duas baías, com brisas marítimas que raramente ultrapassam os 20°C em julho. El Sardinero permite cães antes das 10h e depois das 20h. A Península da Magdalena (antigos jardins reais) tem 11 hectares de falésias e jardins, maioritariamente sem trela.',
          de: `Santander liegt auf einer Halbinsel zwischen zwei Buchten, mit Meeresbrisen, die im Juli selten mehr als 20°C zulassen. Der Strand El Sardinero erlaubt Hunde vor 10 Uhr und nach 20 Uhr. Der Park der Halbinsel Magdalena (ehemaliges königliches Sommerschlossgelände) umfasst 11 Hektar Klippen und Gärten, größtenteils leinenfrei. Kantabrien hat die höchste Dichte an hundefreundlichen Restaurants in Nordspanien.`,
          nl: 'Santander ligt op een schiereiland tussen twee baaien, met zeewind waardoor juli zelden boven 20°C uitkomt. Strand El Sardinero staat honden toe voor 10 uur en na 20 uur. Het park op het schiereiland Magdalena (voormalig koninklijk zomerpaleisterrein) is 11 hectare kliffen en tuinen, grotendeels zonder lijn. Kantabrië heeft de hoogste dichtheid aan hondvriendelijke restaurants van Noord-Spanje.',
        },
        dogTip: {
          en: 'Playa del Puntal, reached by ferry from the port: long strip of sand, almost no rules on dogs in low season.',
          fr: 'Playa del Puntal, accessible en ferry depuis le port : longue bande de sable, presque aucune règle pour les chiens hors saison.',
          es: 'Playa del Puntal, accesible en ferry desde el puerto: larga franja de arena, casi sin restricciones para perros en temporada baja.',
          pt: 'Playa del Puntal, acessível de ferry a partir do porto: longa faixa de areia, quase sem restrições para cães na época baixa.',
          de: 'Playa del Puntal, erreichbar per Fähre vom Hafen: langer Sandstreifen, in der Nebensaison kaum Regeln für Hunde.',
          nl: 'Playa del Puntal, bereikbaar per veerboot vanaf de haven: lange zandstrook, buiten het hoogseizoen nauwelijks regels voor honden.',
        },
        hotels: [
          {
            name: 'Hotel Chiqui',
            stars: 4,
            note: { en: 'Right on El Sardinero beach, sea-view rooms, pets welcome.', fr: 'Directement sur la plage d\'El Sardinero, chambres vue mer, animaux bienvenus.', es: 'Justo en la playa del Sardinero, habitaciones con vistas al mar, mascotas bienvenidas.', pt: 'Mesmo na praia de El Sardinero, quartos com vista para o mar, animais bem-vindos.', de: 'Direkt am Strand El Sardinero, Zimmer mit Meerblick, Haustiere willkommen.', nl: 'Direct aan het strand El Sardinero, kamers met zeezicht, huisdieren welkom.' },
          },
          {
            name: 'Eurostars Real',
            stars: 5,
            note: { en: 'Belle Époque palace overlooking the bay, small pets accepted.', fr: 'Palais Belle Époque dominant la baie, petits animaux acceptés.', es: 'Palacio Belle Époque con vistas a la bahía, mascotas pequeñas aceptadas.', pt: 'Palácio Belle Époque com vista para a baía, animais pequenos aceites.', de: 'Belle-Époque-Palast mit Blick auf die Bucht, kleine Haustiere erlaubt.', nl: 'Belle-Époquepaleis met uitzicht op de baai, kleine huisdieren toegestaan.' },
          },
          {
            name: 'Hotel Palacio del Mar',
            stars: 4,
            note: { en: 'Facing the Pereda gardens and port, dog-friendly policy, walking distance to beach.', fr: 'Face aux jardins de Pereda et au port, politique dog-friendly, à pied de la plage.', es: 'Frente a los jardines de Pereda y el puerto, política dog-friendly, a pie de la playa.', pt: 'Em frente aos jardins de Pereda e ao porto, política dog-friendly, a pé da praia.', de: 'Gegenüber den Pereda-Gärten und dem Hafen, hundefreundliche Politik, fußläufig zum Strand.', nl: 'Tegenover de tuinen van Pereda en de haven, hondvriendelijk beleid, loopafstand van het strand.' },
          },
        ],
      },
    ],
  },
  {
    id: 'asturies',
    emoji: '🌿',
    title: { en: 'Asturias', fr: 'Asturies', es: 'Asturias', pt: 'Astúrias', de: 'Asturien', nl: 'Asturië' },
    cities: [
      {
        slug: 'gijon',
        name: 'Gijón',
        region: { en: 'Asturias', fr: 'Asturies', es: 'Asturias', pt: 'Astúrias', de: 'Asturien', nl: 'Asturië' },
        julyTemp: 18,
        tag: { en: 'Cider coast · 18°C', fr: 'Côte du cidre · 18°C', es: 'Costa de la sidra · 18°C', pt: 'Costa da sidra · 18°C', de: 'Cidre-Küste · 18°C', nl: 'Cider-kust · 18°C' },
        why: {
          en: 'Gijón is the coolest large city on the Iberian Peninsula at 18°C in July, on the same latitude as the Spanish Mediterranean coast but facing the Atlantic. San Lorenzo beach (3 km) allows dogs year-round in the early morning. The Cimadevilla historic quarter is dog-friendly throughout. Sidrería terraces are a cultural norm for dogs.',
          fr: "Gijón est la grande ville la plus fraîche de la péninsule ibérique à 18°C en juillet, à la même latitude que la côte méditerranéenne espagnole mais face à l'Atlantique. La plage San Lorenzo (3 km) accepte les chiens toute l'année le matin. Le quartier historique de Cimadevilla est dog-friendly partout. Les terrasses de sidrerias sont culturellement ouvertes aux chiens.",
          es: 'Gijón es la ciudad grande más fresca de la Península Ibérica a 18°C en julio, con la misma latitud que la costa mediterránea española pero cara al Atlántico. La playa San Lorenzo (3 km) admite perros todo el año por la mañana. El barrio histórico de Cimadevilla es dog-friendly en toda su extensión.',
          pt: 'Gijón é a maior cidade mais fresca da Península Ibérica a 18°C em julho, com a mesma latitude que a costa mediterrânica espanhola mas voltada para o Atlântico. A praia de San Lorenzo (3 km) aceita cães durante todo o ano de manhã. O bairro histórico de Cimadevilla é dog-friendly em toda a sua extensão.',
          de: `Gijón ist mit 18°C im Juli die kühlste Großstadt der iberischen Halbinsel, auf derselben Breite wie die spanische Mittelmeerküste, aber zum Atlantik gewandt. Der Strand San Lorenzo (3 km) erlaubt Hunde ganzjährig am frühen Morgen. Das historische Viertel Cimadevilla ist überall hundefreundlich. Sidrería-Terrassen sind kulturell für Hunde geöffnet.`,
          nl: 'Gijón is de koelste grote stad van het Iberisch Schiereiland met 18°C in juli, op dezelfde breedtegraad als de Spaanse Middellandse Zeekust maar gericht op de Atlantische Oceaan. Strand San Lorenzo (3 km) laat honden het hele jaar toe in de vroege ochtend. De historische wijk Cimadevilla is overal hondvriendelijk. Terrassen van sidrerías zijn cultureel gewend aan honden.',
        },
        dogTip: {
          en: 'Cabo Peñas, 30 min west: the northernmost point of Spain, dramatic cliffs, dogs off-lead on the heathland year-round.',
          fr: "Cabo Peñas, 30 min à l'ouest : le point le plus au nord d'Espagne, falaises spectaculaires, chiens sans laisse sur la lande toute l'année.",
          es: 'Cabo Peñas, 30 min al oeste: el punto más al norte de España, acantilados espectaculares, perros sin correa en el monte todo el año.',
          pt: 'Cabo Peñas, 30 min a oeste: o ponto mais a norte de Espanha, falésias espetaculares, cães sem trela na charneca durante todo o ano.',
          de: 'Cabo Peñas, 30 min westlich: der nördlichste Punkt Spaniens, dramatische Klippen, Hunde ganzjährig ohne Leine auf dem Heideland.',
          nl: 'Cabo Peñas, 30 min naar het westen: het meest noordelijke punt van Spanje, indrukwekkende kliffen, honden het hele jaar zonder lijn op de heide.',
        },
        hotels: [
          {
            name: 'Parador de Gijón',
            stars: 4,
            note: { en: 'National Parador in the El Molinón park, green setting, dogs welcome.', fr: 'Parador national dans le parc El Molinón, cadre verdoyant, chiens bienvenus.', es: 'Parador nacional en el parque El Molinón, entorno verde, perros bienvenidos.', pt: 'Parador nacional no parque El Molinón, ambiente verde, cães bem-vindos.', de: 'Staatlicher Parador im Park El Molinón, grüne Umgebung, Hunde willkommen.', nl: 'Nationaal Parador in het park El Molinón, groene omgeving, honden welkom.' },
          },
          {
            name: 'Hotel Hernán Cortés',
            stars: 4,
            note: { en: 'Classic hotel in the city centre, 5 min walk to San Lorenzo beach, pets accepted.', fr: 'Hôtel classique en centre-ville, 5 min à pied de la plage San Lorenzo, animaux acceptés.', es: 'Hotel clásico en el centro, a 5 min a pie de la playa San Lorenzo, mascotas aceptadas.', pt: 'Hotel clássico no centro da cidade, 5 min a pé da praia San Lorenzo, animais aceites.', de: 'Klassisches Hotel im Stadtzentrum, 5 Gehminuten zum Strand San Lorenzo, Haustiere erlaubt.', nl: 'Klassiek hotel in het stadscentrum, 5 min lopen van strand San Lorenzo, huisdieren toegestaan.' },
          },
          {
            name: 'Hotel Marqués de San Esteban',
            stars: 4,
            note: { en: 'Boutique hotel in the old port quarter, dog-friendly rooms on lower floors.', fr: 'Hôtel boutique dans le quartier de l\'ancien port, chambres dog-friendly aux étages inférieurs.', es: 'Hotel boutique en el barrio del puerto antiguo, habitaciones dog-friendly en plantas bajas.', pt: 'Hotel boutique no bairro do porto antigo, quartos dog-friendly nos andares inferiores.', de: `Boutique-Hotel im alten Hafenviertel, hundefreundliche Zimmer in den unteren Etagen.`, nl: 'Boetiekhotel in de oude havenwijk, hondvriendelijke kamers op de lagere verdiepingen.' },
          },
        ],
      },
      {
        slug: 'oviedo',
        name: 'Oviedo',
        region: { en: 'Asturias', fr: 'Asturies', es: 'Asturias', pt: 'Astúrias', de: 'Asturien', nl: 'Asturië' },
        julyTemp: 18,
        tag: { en: 'Pre-Romanesque capital · 18°C', fr: 'Capitale pré-romane · 18°C', es: 'Capital prerrománica · 18°C', pt: 'Capital pré-românica · 18°C', de: 'Vorromanische Hauptstadt · 18°C', nl: 'Pre-Romaanse hoofdstad · 18°C' },
        why: {
          en: 'Our top revenue signal for an inland Asturian city: a Portuguese user booked an August stay via our dog-friendly campaign. Oviedo sits at 228m with a constant Atlantic breeze, 18°C in July when Madrid suffocates at 36°C. Pre-Romanesque churches on the UNESCO Camino trail mean pedestrian streets are the norm. El Parque San Francisco (7 ha, city centre) is off-lead and densely shaded.',
          fr: "Notre meilleur signal revenu pour une ville intérieure asturienne : un utilisateur portugais a réservé un séjour d'août via notre campagne dog-friendly. Oviedo est à 228m avec une brise atlantique constante, 18°C en juillet quand Madrid étouffe à 36°C. Les rues piétonnes dog-friendly sont la norme. Le Parque San Francisco (7 ha, centre-ville) est sans laisse et densément ombragé.",
          es: 'Nuestra mejor señal de ingresos para una ciudad interior asturiana: un usuario portugués reservó una estancia de agosto a través de nuestra campaña dog-friendly. Oviedo está a 228m con brisa atlántica constante, 18°C en julio cuando Madrid se asfixia a 36°C. Las calles peatonales dog-friendly son la norma. El Parque San Francisco (7 ha, centro) es sin correa y muy sombreado.',
          pt: 'O nosso melhor sinal de receita para uma cidade interior asturiana: um utilizador português reservou uma estadia de agosto através da nossa campanha dog-friendly. Oviedo está a 228m com brisa atlântica constante, 18°C em julho quando Madrid sufoca a 36°C. As ruas pedonais dog-friendly são a norma. O Parque San Francisco (7 ha, centro) é sem trela e densamente ensombrado.',
          de: `Unser bestes Umsatzsignal für eine asturische Stadt im Landesinneren: eine portugiesische Nutzerin buchte einen August-Aufenthalt über unsere hundefreundliche Kampagne. Oviedo liegt auf 228m mit konstanter Atlantikbrise, 18°C im Juli, während Madrid bei 36°C erstickt. Vorromanische Kirchen auf dem UNESCO-Camino bedeuten, dass Fußgängerzonen die Norm sind. Der Parque San Francisco (7 ha, Stadtzentrum) ist leinenfrei und dicht beschattet.`,
          nl: 'Ons beste omzetsignaal voor een Asturische stad in het binnenland: een Portugese gebruiker boekte een augustusverblijf via onze hondvriendelijke campagne. Oviedo ligt op 228m met een constante Atlantische bries, 18°C in juli terwijl Madrid stikt bij 36°C. Pre-Romaanse kerken op de UNESCO-Camino betekenen dat voetgangersstraten de norm zijn. Het Parque San Francisco (7 ha, stadscentrum) is zonder lijn en dicht beschaduwd.',
        },
        dogTip: {
          en: 'Monte Naranco (3 km from centre): UNESCO pre-Romanesque churches at 680m altitude, nearly always cool, trail is off-lead.',
          fr: 'Monte Naranco (3 km du centre) : églises pré-romanes UNESCO à 680m, presque toujours frais, sentier sans laisse.',
          es: 'Monte Naranco (3 km del centro): iglesias prerrománicas UNESCO a 680m de altitud, casi siempre fresco, sendero sin correa.',
          pt: 'Monte Naranco (3 km do centro): igrejas pré-românicas UNESCO a 680m de altitude, quase sempre fresco, trilho sem trela.',
          de: 'Monte Naranco (3 km vom Zentrum): vorromanische UNESCO-Kirchen auf 680m Höhe, fast immer kühl, Weg ohne Leine.',
          nl: 'Monte Naranco (3 km van het centrum): UNESCO pre-Romaanse kerken op 680m hoogte, bijna altijd koel, pad zonder lijn.',
        },
        hotels: [
          {
            name: 'Hotel de la Reconquista',
            stars: 5,
            note: { en: 'State Parador in an 18th-century hospital, grand courtyard, dogs accepted.', fr: 'Parador d\'État dans un hôpital du XVIIIe siècle, grande cour intérieure, chiens acceptés.', es: 'Parador del Estado en un hospital del siglo XVIII, gran patio interior, perros aceptados.', pt: 'Parador do Estado num hospital do séc. XVIII, grande pátio interior, cães aceites.', de: 'Staatlicher Parador in einem Hospital aus dem 18. Jahrhundert, großer Innenhof, Hunde erlaubt.', nl: 'Staatsparador in een 18e-eeuws hospitaal, groots binnenplein, honden toegestaan.' },
          },
          {
            name: 'NH Collection Oviedo',
            stars: 4,
            note: { en: 'Modern hotel near the cathedral, central location, pets up to 10 kg welcome.', fr: 'Hôtel moderne près de la cathédrale, emplacement central, animaux jusqu\'à 10 kg bienvenus.', es: 'Hotel moderno cerca de la catedral, ubicación central, mascotas hasta 10 kg bienvenidas.', pt: 'Hotel moderno perto da catedral, localização central, animais até 10 kg bem-vindos.', de: 'Modernes Hotel nahe der Kathedrale, zentrale Lage, Haustiere bis 10 kg willkommen.', nl: 'Modern hotel bij de kathedraal, centrale ligging, huisdieren tot 10 kg welkom.' },
          },
          {
            name: 'Barceló Oviedo Cervantes',
            stars: 4,
            note: { en: 'Steps from the Camino route, dog-friendly rooms available, walking distance to Parque San Francisco.', fr: 'À deux pas du Camino, chambres dog-friendly disponibles, à pied du Parque San Francisco.', es: 'A dos pasos del Camino, habitaciones dog-friendly disponibles, a pie del Parque San Francisco.', pt: 'A dois passos do Caminho, quartos dog-friendly disponíveis, a pé do Parque San Francisco.', de: 'Nur einen Katzensprung vom Camino entfernt, hundefreundliche Zimmer verfügbar, fußläufig zum Parque San Francisco.', nl: 'Op steenworp afstand van de Camino-route, hondvriendelijke kamers beschikbaar, loopafstand van het Parque San Francisco.' },
          },
        ],
      },
    ],
  },
  {
    id: 'galice',
    emoji: '🌧️',
    title: { en: 'Galicia', fr: 'Galice', es: 'Galicia', pt: 'Galiza', de: 'Galicien', nl: 'Galicië' },
    cities: [
      {
        slug: 'santiago-de-compostela',
        name: 'Santiago de Compostela',
        region: { en: 'Galicia', fr: 'Galice', es: 'Galicia', pt: 'Galiza', de: 'Galicien', nl: 'Galicië' },
        julyTemp: 21,
        tag: { en: 'Camino end · granite city', fr: 'Fin du Camino · ville de granit', es: 'Fin del Camino · ciudad de granito', pt: 'Fim do Caminho · cidade de granito', de: 'Ziel des Camino · Granitstadt', nl: 'Einde van de Camino · granietstad' },
        why: {
          en: 'Santiago sits at 260m with the Atlantic rain system that keeps Galicia green year-round, peaking at 21°C in July. The Camino pilgrimage culture means dogs are deeply embedded in city life: the last 100 km section (Sarria to Santiago) is the world\'s most dog-walked long-distance trail. The historic centre is stone-paved and cool. Alameda park: 100,000 m² of oak, pine, and camellia forest, off-lead.',
          fr: "Saint-Jacques est à 260m avec le système de pluie atlantique qui maintient la Galice verte toute l'année, culminant à 21°C en juillet. La culture du Camino signifie que les chiens font partie de la vie : les 100 derniers km sont le sentier de randonnée longue distance le plus parcouru avec des chiens au monde. Le centre historique est pavé de granit et frais. Parc Alameda : 100 000 m² de forêt, sans laisse.",
          es: "Santiago está a 260m con el sistema atlántico que mantiene verde Galicia todo el año, con un máximo de 21°C en julio. La cultura del Camino hace que los perros formen parte de la vida: los últimos 100 km (Sarria-Santiago) son el sendero de larga distancia más transitado con perros del mundo. El casco histórico es de granito y fresco. Parque Alameda: 100.000 m² de bosque, sin correa.",
          pt: "Santiago está a 260m com o sistema atlântico que mantém a Galiza verde durante todo o ano, com pico de 21°C em julho. A cultura do Caminho faz com que os cães façam parte da vida: os últimos 100 km (Sarria-Santiago) são o trilho de longa distância mais percorrido com cães do mundo. O centro histórico é de granito e fresco. Parque Alameda: 100.000 m² de floresta, sem trela.",
          de: `Santiago liegt auf 260m mit dem atlantischen Regensystem, das Galicien ganzjährig grün hält, mit einem Höchstwert von 21°C im Juli. Die Camino-Pilgerkultur bedeutet, dass Hunde fest im Stadtleben verankert sind: der letzte 100-km-Abschnitt (Sarria bis Santiago) ist der weltweit meistbegangene Fernwanderweg mit Hunden. Das historische Zentrum ist steingepflastert und kühl. Park Alameda: 100.000 m² Eichen-, Kiefern- und Kamelienwald, ohne Leine.`,
          nl: 'Santiago ligt op 260m met het Atlantische regensysteem dat Galicië het hele jaar groen houdt, met een piek van 21°C in juli. Door de Camino-pelgrimscultuur zijn honden diep verweven met het stadsleven: het laatste traject van 100 km (Sarria naar Santiago) is de meest belopen lange-afstandsroute met honden ter wereld. Het historische centrum is met steen geplaveid en koel. Park Alameda: 100.000 m² eiken-, dennen- en camelliabos, zonder lijn.',
        },
        dogTip: {
          en: 'Forested paths to Monte Pedroso (10 km loop from the cathedral): entirely off-lead, shaded, rarely above 18°C.',
          fr: 'Sentiers forestiers vers Monte Pedroso (boucle 10 km depuis la cathédrale) : entièrement sans laisse, ombragés, rarement plus de 18°C.',
          es: 'Senderos forestales al Monte Pedroso (bucle 10 km desde la catedral): totalmente sin correa, sombreados, raramente más de 18°C.',
          pt: 'Trilhos florestais para o Monte Pedroso (circuito de 10 km desde a catedral): totalmente sem trela, ensombrados, raramente acima de 18°C.',
          de: 'Waldwege zum Monte Pedroso (10-km-Rundweg ab der Kathedrale): komplett ohne Leine, schattig, selten über 18°C.',
          nl: 'Boswandelpaden naar de Monte Pedroso (10 km rondwandeling vanaf de kathedraal): volledig zonder lijn, beschaduwd, zelden warmer dan 18°C.',
        },
        hotels: [
          {
            name: 'Parador de Santiago de Compostela',
            stars: 5,
            note: { en: 'One of Spain\'s most iconic paradors in a 15th-century royal hospital on Plaza del Obradoiro, pets welcome.', fr: 'L\'un des paradors les plus emblématiques d\'Espagne dans un hôpital royal du XVe siècle sur la Plaza del Obradoiro, animaux bienvenus.', es: 'Uno de los paradores más emblemáticos de España en un hospital real del siglo XV en la Plaza del Obradoiro, mascotas bienvenidas.', pt: 'Um dos paradores mais emblemáticos de Espanha num hospital real do séc. XV na Plaza del Obradoiro, animais bem-vindos.', de: `Einer der berühmtesten Paradores Spaniens in einem königlichen Hospital aus dem 15. Jahrhundert an der Plaza del Obradoiro, Haustiere willkommen.`, nl: 'Een van de meest iconische paradors van Spanje in een koninklijk hospitaal uit de 15e eeuw aan de Plaza del Obradoiro, huisdieren welkom.' },
          },
          {
            name: 'NH Collection Santiago de Compostela',
            stars: 4,
            note: { en: '5 min walk to the cathedral, modern rooms, dogs up to 20 kg accepted.', fr: '5 min à pied de la cathédrale, chambres modernes, chiens jusqu\'à 20 kg acceptés.', es: 'A 5 min a pie de la catedral, habitaciones modernas, perros hasta 20 kg aceptados.', pt: '5 min a pé da catedral, quartos modernos, cães até 20 kg aceites.', de: 'Fünf Gehminuten zur Kathedrale, moderne Zimmer, Hunde bis 20 kg erlaubt.', nl: '5 min lopen van de kathedraal, moderne kamers, honden tot 20 kg toegestaan.' },
          },
          {
            name: 'Hotel Monumento San Francisco',
            stars: 4,
            note: { en: 'In a former Franciscan convent next to the cathedral, historic atmosphere, pet-friendly rooms available.', fr: 'Dans un ancien couvent franciscain à côté de la cathédrale, atmosphère historique, chambres pet-friendly disponibles.', es: 'En un antiguo convento franciscano junto a la catedral, ambiente histórico, habitaciones pet-friendly disponibles.', pt: 'Num antigo convento franciscano junto à catedral, atmosfera histórica, quartos pet-friendly disponíveis.', de: 'In einem ehemaligen Franziskanerkloster neben der Kathedrale, historisches Ambiente, haustierfreundliche Zimmer verfügbar.', nl: 'In een voormalig franciscanenklooster naast de kathedraal, historische sfeer, dierenvriendelijke kamers beschikbaar.' },
          },
        ],
      },
      {
        slug: 'a-coruna',
        name: 'A Coruña',
        region: { en: 'Galicia', fr: 'Galice', es: 'Galicia', pt: 'Galiza', de: 'Galicien', nl: 'Galicië' },
        julyTemp: 18,
        tag: { en: 'Atlantic lighthouse city · 18°C', fr: 'Ville-phare atlantique · 18°C', es: 'Ciudad faro atlántica · 18°C', pt: 'Cidade farol atlântica · 18°C', de: 'Atlantische Leuchtturmstadt · 18°C', nl: 'Atlantische vuurtorenstad · 18°C' },
        why: {
          en: "A Coruña's glass-fronted buildings (galerías) are a vernacular response to Atlantic wind and rain. July average of 18°C. Riazor and Orzán beaches allow dogs before 10am and after 8pm in season, facing west into the ocean to catch an afternoon sea breeze that drops perceived temperature by 4°C. The maritime promenade (8 km around the peninsula) is flat and dog-friendly.",
          fr: "Les façades vitrées d'A Coruña (galerías) sont une réponse vernaculaire au vent et à la pluie atlantiques. Moyenne de 18°C en juillet. Les plages Riazor et Orzán acceptent les chiens avant 10h et après 20h en saison. La promenade maritime (8 km autour de la péninsule) est plate et dog-friendly.",
          es: 'Las galerías de A Coruña son una respuesta vernácula al viento y la lluvia atlánticos. Media de 18°C en julio. Las playas Riazor y Orzán admiten perros antes de las 10h y después de las 20h en temporada. La promenade marítima (8 km alrededor de la península) es llana y dog-friendly.',
          pt: 'As galerias de A Coruña são uma resposta vernácula ao vento e à chuva atlânticos. Média de 18°C em julho. As praias Riazor e Orzán admitem cães antes das 10h e depois das 20h na época. A promenade marítima (8 km à volta da península) é plana e dog-friendly.',
          de: `Die verglasten Fassaden A Coruñas (galerías) sind eine landestypische Antwort auf atlantischen Wind und Regen. Julidurchschnitt von 18°C. Die Strände Riazor und Orzán erlauben Hunde vor 10 Uhr und nach 20 Uhr in der Saison, nach Westen zum Ozean ausgerichtet, mit einer Nachmittagsbrise, die die gefühlte Temperatur um 4°C senkt. Die Meerespromenade (8 km rund um die Halbinsel) ist flach und hundefreundlich.`,
          nl: 'De glazen galerijgevels (galerías) van A Coruña zijn een streekeigen antwoord op Atlantische wind en regen. Juligemiddelde van 18°C. De stranden Riazor en Orzán staan honden toe voor 10 uur en na 20 uur in het seizoen, naar het westen gericht op de oceaan met een middagbries die de gevoelstemperatuur met 4°C verlaagt. De boulevard (8 km rond het schiereiland) is vlak en hondvriendelijk.',
        },
        dogTip: {
          en: 'Torre de Hércules lighthouse park: 5 ha of lawn around the Roman lighthouse, dogs off-lead, ocean on three sides.',
          fr: 'Parc du phare Torre de Hércules : 5 ha de pelouse autour du phare romain, chiens sans laisse, océan sur trois côtés.',
          es: 'Parque del faro Torre de Hércules: 5 ha de césped alrededor del faro romano, perros sin correa, océano por tres lados.',
          pt: 'Parque do farol Torre de Hércules: 5 ha de relvado à volta do farol romano, cães sem trela, oceano em três lados.',
          de: 'Leuchtturmpark Torre de Hércules: 5 ha Rasen rund um den römischen Leuchtturm, Hunde ohne Leine, Ozean auf drei Seiten.',
          nl: 'Vuurtorenpark Torre de Hércules: 5 ha gazon rond de Romeinse vuurtoren, honden zonder lijn, oceaan aan drie kanten.',
        },
        hotels: [
          {
            name: 'NH Collection A Coruña',
            stars: 4,
            note: { en: 'Tower hotel overlooking the port and Riazor beach, pets accepted.', fr: 'Hôtel tour dominant le port et la plage Riazor, animaux acceptés.', es: 'Hotel torre con vistas al puerto y la playa Riazor, mascotas aceptadas.', pt: 'Hotel torre com vista para o porto e a praia Riazor, animais aceites.', de: 'Turmhotel mit Blick auf den Hafen und den Strand Riazor, Haustiere erlaubt.', nl: 'Torenhotel met uitzicht op de haven en strand Riazor, huisdieren toegestaan.' },
          },
          {
            name: 'Eurostars Ciudad de La Coruña',
            stars: 4,
            note: { en: 'Walking distance to the maritime promenade, modern facilities, dogs up to 10 kg welcome.', fr: 'À pied de la promenade maritime, équipements modernes, chiens jusqu\'à 10 kg bienvenus.', es: 'A pie del paseo marítimo, instalaciones modernas, perros hasta 10 kg bienvenidos.', pt: 'A pé da promenade marítima, instalações modernas, cães até 10 kg bem-vindos.', de: 'Fußläufig zur Meerespromenade, moderne Ausstattung, Hunde bis 10 kg willkommen.', nl: 'Loopafstand van de boulevard, moderne voorzieningen, honden tot 10 kg welkom.' },
          },
          {
            name: 'Hotel Hesperia A Coruña',
            stars: 4,
            note: { en: 'City-centre hotel, 10 min walk to the Torre de Hércules park, pet-friendly on request.', fr: 'Hôtel en centre-ville, 10 min à pied du parc Torre de Hércules, pet-friendly sur demande.', es: 'Hotel en el centro, a 10 min a pie del parque Torre de Hércules, pet-friendly bajo petición.', pt: 'Hotel no centro da cidade, 10 min a pé do parque Torre de Hércules, pet-friendly mediante pedido.', de: 'Hotel im Stadtzentrum, 10 Gehminuten zum Park Torre de Hércules, haustierfreundlich auf Anfrage.', nl: 'Hotel in het stadscentrum, 10 min lopen van het park Torre de Hércules, dierenvriendelijk op aanvraag.' },
          },
        ],
      },
    ],
  },
  {
    id: 'pyrenees',
    emoji: '🏔️',
    title: { en: 'Aragonese Pyrenees', fr: 'Pyrénées aragonaises', es: 'Pirineo aragonés', pt: 'Pirenéus aragoneses', de: 'Aragonesische Pyrenäen', nl: 'Aragonese Pyreneeën' },
    cities: [
      {
        slug: 'jaca',
        name: 'Jaca',
        region: { en: 'Aragonese Pyrenees', fr: 'Pyrénées aragonaises', es: 'Pirineo aragonés', pt: 'Pirenéus aragoneses', de: 'Aragonesische Pyrenäen', nl: 'Aragonese Pyreneeën' },
        julyTemp: 23,
        tag: { en: '820m · Pyrenean gateway', fr: '820m · Porte des Pyrénées', es: '820m · Puerta del Pirineo', pt: '820m · Porta dos Pirenéus', de: '820m · Tor zu den Pyrenäen', nl: '820m · poort naar de Pyreneeën' },
        why: {
          en: 'Jaca sits at 820m in the Pyrenean foothills, 15°C below Zaragoza 120 km south. The Valle de Hecho and Valle de Ansó begin 30 km from the city: untouched beech forests at 1,200m, waterfalls, and mountain refuges that accept dogs. The city has a Romanesque cathedral and the best-preserved medieval citadel in Spain. Ordesa National Park is 1 hour away.',
          fr: "Jaca est à 820m dans le piémont pyrénéen, 15°C de moins que Saragosse 120 km au sud. La Valle de Hecho et la Valle de Ansó commencent à 30 km : forêts de hêtres vierges à 1200m, cascades et refuges de montagne qui acceptent les chiens. La ville possède une cathédrale romane et la citadelle médiévale la mieux conservée d'Espagne. Le Parc National d'Ordesa est à 1h.",
          es: 'Jaca está a 820m en el piedemonte pirenaico, 15°C menos que Zaragoza 120 km al sur. El Valle de Hecho y el Valle de Ansó empiezan a 30 km: hayedos vírgenes a 1200m, cascadas y refugios de montaña que admiten perros. La ciudad tiene una catedral románica y la ciudadela medieval mejor conservada de España. El Parque Nacional de Ordesa está a 1h.',
          pt: 'Jaca está a 820m no sopé dos Pirenéus, 15°C menos do que Saragoça 120 km a sul. O Vale de Hecho e o Vale de Ansó começam a 30 km: florestas de faias virgens a 1.200m, cascatas e refúgios de montanha que aceitam cães. A cidade tem uma catedral românica e a cidadela medieval melhor conservada de Espanha. O Parque Nacional de Ordesa fica a 1h.',
          de: `Jaca liegt auf 820m im Vorgebirge der Pyrenäen, 15°C kühler als Zaragoza 120 km südlich. Das Valle de Hecho und das Valle de Ansó beginnen 30 km von der Stadt entfernt: unberührte Buchenwälder auf 1.200m, Wasserfälle und Bergrefugien, die Hunde akzeptieren. Die Stadt hat eine romanische Kathedrale und die besterhaltene mittelalterliche Zitadelle Spaniens. Der Nationalpark Ordesa liegt eine Stunde entfernt.`,
          nl: 'Jaca ligt op 820m in de uitlopers van de Pyreneeën, 15°C koeler dan Zaragoza, 120 km zuidelijker. De Valle de Hecho en de Valle de Ansó beginnen 30 km van de stad: ongerepte beukenbossen op 1.200m, watervallen en berghutten die honden toelaten. De stad heeft een Romaanse kathedraal en de best bewaarde middeleeuwse citadel van Spanje. Het Nationaal Park Ordesa ligt op een uur rijden.',
        },
        dogTip: {
          en: 'Valle de Hecho: park at Siresa village (930m) and walk the GR-65.8 through beech forest to Selva de Oza, off-lead all the way, 10°C cooler than the valley floor.',
          fr: "Valle de Hecho : garez-vous au village de Siresa (930m) et marchez le GR-65.8 en forêt de hêtres jusqu'à la Selva de Oza, sans laisse tout du long, 10°C plus frais que le fond de vallée.",
          es: 'Valle de Hecho: aparcar en el pueblo de Siresa (930m) y recorrer el GR-65.8 por el hayedo hasta la Selva de Oza, sin correa todo el camino, 10°C más fresco que el fondo del valle.',
          pt: 'Valle de Hecho: estacionar no povo de Siresa (930m) e percorrer o GR-65.8 pela floresta de faias até à Selva de Oza, sem trela todo o caminho, 10°C mais fresco do que o fundo do vale.',
          de: 'Valle de Hecho: im Dorf Siresa (930m) parken und dem GR-65.8 durch den Buchenwald bis zur Selva de Oza folgen, den ganzen Weg ohne Leine, 10°C kühler als der Talboden.',
          nl: 'Valle de Hecho: parkeer bij het dorp Siresa (930m) en loop de GR-65.8 door het beukenbos naar de Selva de Oza, de hele weg zonder lijn, 10°C koeler dan de vallei beneden.',
        },
        hotels: [
          {
            name: 'Hotel Ciudad de Jaca',
            stars: 4,
            note: { en: 'Best-rated hotel in the city, near the citadel, dogs accepted.', fr: 'Hôtel le mieux noté de la ville, proche de la citadelle, chiens acceptés.', es: 'Hotel mejor valorado de la ciudad, cerca de la ciudadela, perros aceptados.', pt: 'Hotel melhor avaliado da cidade, perto da cidadela, cães aceites.', de: 'Bestbewertetes Hotel der Stadt, nahe der Zitadelle, Hunde erlaubt.', nl: 'Best beoordeelde hotel van de stad, bij de citadel, honden toegestaan.' },
          },
          {
            name: 'NH Jaca Oroel',
            stars: 4,
            note: { en: 'Mountain-view hotel on the edge of town, ideal base for Valle de Hecho hikes, pets welcome.', fr: 'Hôtel vue montagne en périphérie de ville, base idéale pour les randonnées en Valle de Hecho, animaux bienvenus.', es: 'Hotel con vistas a la montaña a las afueras, base ideal para senderismo en Valle de Hecho, mascotas bienvenidas.', pt: 'Hotel com vista para a montanha na periferia, base ideal para caminhadas no Valle de Hecho, animais bem-vindos.', de: 'Hotel mit Bergblick am Stadtrand, idealer Ausgangspunkt für Wanderungen im Valle de Hecho, Haustiere willkommen.', nl: 'Hotel met bergzicht aan de rand van de stad, ideale uitvalsbasis voor wandelingen in de Valle de Hecho, huisdieren welkom.' },
          },
          {
            name: 'Hotel Real',
            stars: 3,
            note: { en: 'Central, affordable, historic building, pet-friendly rooms on the ground floor.', fr: 'Central, abordable, bâtiment historique, chambres pet-friendly au rez-de-chaussée.', es: 'Central, asequible, edificio histórico, habitaciones pet-friendly en planta baja.', pt: 'Central, acessível, edifício histórico, quartos pet-friendly no rés-do-chão.', de: 'Zentral, erschwinglich, historisches Gebäude, haustierfreundliche Zimmer im Erdgeschoss.', nl: 'Centraal, betaalbaar, historisch pand, dierenvriendelijke kamers op de begane grond.' },
          },
        ],
      },
    ],
  },
]

const T = {
  title: {
    en: 'Best Cities to Escape the Heat in Spain with Your Dog (2026)',
    fr: 'Meilleures villes pour éviter la chaleur en Espagne avec son chien (2026)',
    es: 'Mejores ciudades para evitar el calor en España con tu perro (2026)',
    pt: 'Melhores cidades para evitar o calor em Espanha com o seu cão (2026)',
    de: 'Die besten Städte, um der Hitze in Spanien mit Ihrem Hund zu entgehen (2026)',
    nl: 'De beste steden om aan de hitte te ontsnappen in Spanje met je hond (2026)',
  },
  metaTitle: {
    en: 'Cool Spain with Your Dog: 8 Cities Under 23°C in July (2026)',
    fr: 'Espagne fraîche avec son chien : 8 villes sous 23°C en juillet (2026)',
    es: 'España fresca con tu perro: 8 ciudades con menos de 23°C en julio (2026)',
    pt: 'Espanha fresca com o seu cão: 8 cidades abaixo de 23°C em julho (2026)',
    de: 'Kühles Spanien mit Ihrem Hund: 8 Städte unter 23°C im Juli (2026)',
    nl: 'Koel Spanje met je hond: 8 steden onder 23°C in juli (2026)',
  },
  metaDesc: {
    en: 'While Madrid and Barcelona bake at 38°C, northern Spain stays cool. San Sebastián, Bilbao, Santander, Gijón, Oviedo, Santiago, A Coruña, Jaca: 8 dog-friendly cities under 23°C in July with hotel picks.',
    fr: "Pendant que Madrid et Barcelone cuisent à 38°C, le Nord de l'Espagne reste frais. 8 villes dog-friendly sous 23°C en juillet avec sélection d'hôtels.",
    es: 'Mientras Madrid y Barcelona se cuecen a 38°C, el norte de España se mantiene fresco. 8 ciudades dog-friendly con menos de 23°C en julio con selección de hoteles.',
    pt: 'Enquanto Madrid e Barcelona assam a 38°C, o norte de Espanha mantém-se fresco. 8 cidades dog-friendly abaixo de 23°C em julho com seleção de hotéis.',
    de: 'Während Madrid und Barcelona bei 38°C schmoren, bleibt Nordspanien kühl. San Sebastián, Bilbao, Santander, Gijón, Oviedo, Santiago, A Coruña, Jaca: 8 hundefreundliche Städte unter 23°C im Juli mit Hotelauswahl.',
    nl: 'Terwijl Madrid en Barcelona bakken op 38°C, blijft Noord-Spanje koel. San Sebastián, Bilbao, Santander, Gijón, Oviedo, Santiago, A Coruña, Jaca: 8 hondvriendelijke steden onder 23°C in juli met hotelselectie.',
  },
  intro: {
    en: "Spain's Mediterranean coast hits 36-40°C in July. But 800 km north, Green Spain (the Basque Country, Cantabria, Asturias, and Galicia) stays at 18-23°C, cooled by the same Atlantic system that keeps Ireland and Brittany mild. These 8 cities let you spend a Spanish holiday without overheating your dog.",
    fr: "La côte méditerranéenne espagnole atteint 36-40°C en juillet. Mais 800 km plus au nord, l'Espagne verte (Pays basque, Cantabrie, Asturies, Galice) reste à 18-23°C, refroidie par le même système atlantique qui maintient l'Irlande et la Bretagne clémentes. Ces 8 villes permettent de passer des vacances espagnoles sans surchauffer son chien.",
    es: 'La costa mediterránea española alcanza los 36-40°C en julio. Pero 800 km al norte, la España verde (el País Vasco, Cantabria, Asturias y Galicia) se mantiene a 18-23°C, refrescada por el mismo sistema atlántico que suaviza Irlanda y Bretaña. Estas 8 ciudades permiten pasar unas vacaciones españolas sin que tu perro se recaliente.',
    pt: 'A costa mediterrânica espanhola atinge 36-40°C em julho. Mas 800 km a norte, a Espanha verde (País Basco, Cantábria, Astúrias e Galiza) mantém-se a 18-23°C. Estas 8 cidades permitem passar umas férias espanholas sem sobreaquecer o seu cão.',
    de: `Spaniens Mittelmeerküste erreicht im Juli 36-40°C. Doch 800 km weiter nördlich bleibt das Grüne Spanien (Baskenland, Kantabrien, Asturien und Galicien) bei 18-23°C, gekühlt vom selben atlantischen System, das Irland und die Bretagne mild hält. Diese 8 Städte ermöglichen einen Spanienurlaub, ohne dass Ihr Hund überhitzt.`,
    nl: 'De Spaanse Middellandse Zeekust bereikt 36-40°C in juli. Maar 800 km noordelijker blijft Groen Spanje (het Baskenland, Kantabrië, Asturië en Galicië) op 18-23°C, gekoeld door hetzelfde Atlantische systeem dat Ierland en Bretagne mild houdt. Met deze 8 steden geniet je van een Spaanse vakantie zonder dat je hond oververhit raakt.',
  },
  julyTemp: { en: 'July avg high', fr: 'Max moy. juillet', es: 'Máx. prom. julio', pt: 'Máx. méd. julho', de: 'Julihöchstwert Ø', nl: 'Gem. max. juli' },
  seeHotels: { en: 'All pet-friendly hotels', fr: 'Tous les hôtels pet-friendly', es: 'Todos los hoteles pet-friendly', pt: 'Todos os hotéis pet-friendly', de: 'Alle haustierfreundlichen Hotels', nl: 'Alle dierenvriendelijke hotels' },
  hotelsLabel: { en: 'Our hotel picks', fr: 'Nos hôtels recommandés', es: 'Nuestros hoteles recomendados', pt: 'Os nossos hotéis recomendados', de: 'Unsere Hotelauswahl', nl: 'Onze hotelselectie' },
  dogTipLabel: { en: 'Dog tip', fr: 'Conseil chien', es: 'Consejo para tu perro', pt: 'Dica para o seu cão', de: 'Hundetipp', nl: 'Hondentip' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início', de: 'Start', nl: 'Home' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias', de: 'Ratgeber', nl: 'Gidsen' },
  faq: {
    q1: { en: 'Which Spanish cities stay cool in summer?', fr: 'Quelles villes espagnoles restent fraîches en été ?', es: '¿Qué ciudades españolas permanecen frescas en verano?', pt: 'Que cidades espanholas se mantêm frescas no verão?', de: 'Welche spanischen Städte bleiben im Sommer kühl?', nl: 'Welke Spaanse steden blijven koel in de zomer?' },
    a1: {
      en: 'Northern Spain (Basque Country, Cantabria, Asturias, Galicia) consistently stays 15-20°C cooler than the Mediterranean south in July. Gijón and A Coruña average 18°C, the same as Bergen, Norway. The Pyrenees at altitude (Jaca: 820m) peak at 23°C. The key is the Atlantic weather system: wet, cool, and dramatically different from southern Spain.',
      fr: "Le Nord de l'Espagne (Pays basque, Cantabrie, Asturies, Galice) reste systématiquement 15 à 20°C plus frais que le sud méditerranéen en juillet. Gijón et A Coruña affichent 18°C en moyenne, autant que Bergen en Norvège. Les Pyrénées en altitude (Jaca : 820m) plafonnent à 23°C.",
      es: 'El norte de España (País Vasco, Cantabria, Asturias, Galicia) se mantiene 15-20°C más fresco que el sur mediterráneo en julio. Gijón y A Coruña tienen una media de 18°C, igual que Bergen, Noruega. Los Pirineos en altitud (Jaca: 820m) alcanzan un máximo de 23°C.',
      pt: 'O norte de Espanha (País Basco, Cantábria, Astúrias, Galiza) mantém-se 15-20°C mais fresco do que o sul mediterrânico em julho. Gijón e A Coruña têm uma média de 18°C, igual a Bergen na Noruega. Os Pirenéus em altitude (Jaca: 820m) atingem um máximo de 23°C.',
      de: `Nordspanien (Baskenland, Kantabrien, Asturien, Galicien) bleibt im Juli durchgehend 15-20°C kühler als der mediterrane Süden. Gijón und A Coruña liegen im Schnitt bei 18°C, genau wie Bergen in Norwegen. Die Pyrenäen in der Höhe (Jaca: 820m) erreichen maximal 23°C. Entscheidend ist das atlantische Wettersystem: feucht, kühl und grundverschieden vom Süden Spaniens.`,
      nl: 'Noord-Spanje (Baskenland, Kantabrië, Asturië, Galicië) blijft in juli constant 15-20°C koeler dan het mediterrane zuiden. Gijón en A Coruña hebben een gemiddelde van 18°C, hetzelfde als Bergen in Noorwegen. De Pyreneeën op hoogte (Jaca: 820m) piekt op 23°C. Bepalend is het Atlantische weersysteem: vochtig, koel en compleet anders dan Zuid-Spanje.',
    },
    q2: { en: 'Are there dog-friendly beaches in northern Spain?', fr: "Y a-t-il des plages dog-friendly dans le Nord de l'Espagne ?", es: '¿Hay playas dog-friendly en el norte de España?', pt: 'Há praias dog-friendly no norte de Espanha?', de: 'Gibt es hundefreundliche Strände in Nordspanien?', nl: 'Zijn er hondvriendelijke stranden in Noord-Spanje?' },
    a2: {
      en: 'Yes, and far more liberal than the south. San Sebastián (Ondarreta, La Concha: before 10am/after 8pm in season), Santander (El Sardinero, Puntal), Gijón (San Lorenzo: mornings), and A Coruña (Riazor, Orzán: mornings) all have clear dog access. Outside July-August, most northern Spanish beaches are dog-friendly year-round without time restrictions.',
      fr: "Oui, et bien plus libérales que le sud. Saint-Sébastien (Ondarreta, La Concha : avant 10h/après 20h en saison), Santander (El Sardinero, Puntal), Gijón (San Lorenzo : le matin) et A Coruña (Riazor, Orzán : le matin) ont toutes des accès clairs. Hors juillet-août, la plupart des plages du nord sont dog-friendly toute l'année sans restriction horaire.",
      es: 'Sí, y mucho más permisivas que las del sur. San Sebastián (Ondarreta, La Concha: antes de las 10h/después de las 20h en temporada), Santander (El Sardinero, Puntal), Gijón (San Lorenzo: por la mañana) y A Coruña (Riazor, Orzán: por la mañana). Fuera de julio-agosto, la mayoría de las playas del norte son dog-friendly todo el año sin restricciones.',
      pt: 'Sim, e muito mais liberais do que as do sul. San Sebastián (Ondarreta, La Concha: antes das 10h/depois das 20h na época), Santander (El Sardinero, Puntal), Gijón (San Lorenzo: de manhã) e A Coruña (Riazor, Orzán: de manhã). Fora de julho-agosto, a maioria das praias do norte são dog-friendly durante todo o ano sem restrições.',
      de: `Ja, und deutlich liberaler als im Süden. San Sebastián (Ondarreta, La Concha: vor 10 Uhr/nach 20 Uhr in der Saison), Santander (El Sardinero, Puntal), Gijón (San Lorenzo: morgens) und A Coruña (Riazor, Orzán: morgens) bieten alle klaren Hundezugang. Außerhalb von Juli-August sind die meisten nordspanischen Strände ganzjährig ohne Zeitbeschränkungen hundefreundlich.`,
      nl: `Ja, en veel soepeler dan in het zuiden. San Sebastián (Ondarreta, La Concha: voor 10 uur/na 20 uur in het seizoen), Santander (El Sardinero, Puntal), Gijón (San Lorenzo: 's ochtends) en A Coruña (Riazor, Orzán: 's ochtends) hebben allemaal duidelijke toegang voor honden. Buiten juli-augustus zijn de meeste stranden in Noord-Spanje het hele jaar hondvriendelijk zonder tijdsbeperkingen.`,
    },
    q3: { en: 'How do I get to northern Spain with a dog by train?', fr: "Comment rejoindre le nord de l'Espagne avec un chien en train ?", es: '¿Cómo llegar al norte de España con un perro en tren?', pt: 'Como chegar ao norte de Espanha com um cão de comboio?', de: 'Wie komme ich mit dem Hund per Zug nach Nordspanien?', nl: 'Hoe kom ik met een hond met de trein naar Noord-Spanje?' },
    a3: {
      en: 'Renfe accepts dogs up to 10 kg in carriers (free) or any size on specific media-distancia trains (€10 supplement, muzzle required). From France: the Hendaye border crossing by TGV + Renfe connection reaches San Sebastián in 45 min. For Galicia, the Alvia high-speed train reaches Santiago in 2h30 from Madrid. The FEVE narrow-gauge coastal railway runs the entire Cantabrian coast and accepts dogs.',
      fr: "Renfe accepte les chiens jusqu'à 10 kg en panier (gratuit) ou de toute taille sur certains trains media-distancia (supplément 10€, muselière obligatoire). Depuis la France : Hendaye en TGV + correspondance Renfe, Saint-Sébastien à 45 min. Pour la Galice, l'Alvia atteint Saint-Jacques en 2h30 depuis Madrid. Le FEVE longe toute la côte cantabrique et accepte les chiens.",
      es: 'Renfe admite perros de hasta 10 kg en transportín (gratis) o de cualquier tamaño en ciertos trenes de media distancia (10€ de suplemento, bozal obligatorio). Desde Francia: Hendaya en TGV + conexión Renfe, San Sebastián a 45 min. Para Galicia, el Alvia llega a Santiago en 2h30 desde Madrid. El FEVE recorre toda la costa cantábrica y acepta perros.',
      pt: 'A Renfe aceita cães até 10 kg em caixa (grátis) ou de qualquer tamanho em certos comboios de média distância (suplemento 10€, focinheira obrigatória). Desde França: Hendaia em TGV + ligação Renfe, San Sebastián a 45 min. Para a Galiza, o Alvia chega a Santiago em 2h30 de Madrid. O FEVE percorre toda a costa cantábrica e aceita cães.',
      de: `Renfe erlaubt Hunde bis 10 kg in Transportboxen (kostenlos) oder jede Größe in bestimmten media-distancia-Zügen (Zuschlag 10€, Maulkorbpflicht). Von Frankreich aus: Grenzübergang Hendaye mit TGV + Renfe-Anschluss erreicht San Sebastián in 45 min. Für Galicien erreicht der Hochgeschwindigkeitszug Alvia Santiago in 2h30 ab Madrid. Die schmalspurige Küstenbahn FEVE befährt die gesamte kantabrische Küste und erlaubt Hunde.`,
      nl: 'Renfe laat honden tot 10 kg gratis toe in een reismand, of van elk formaat op bepaalde media-distancia-treinen (toeslag van 10€, muilkorf verplicht). Vanuit Frankrijk: via de grensovergang Hendaye met de TGV plus aansluiting op Renfe bereik je San Sebastián in 45 min. Voor Galicië bereikt de hogesnelheidstrein Alvia Santiago in 2u30 vanaf Madrid. De smalspoorlijn FEVE volgt de hele Cantabrische kust en laat honden toe.',
    },
    q4: { en: 'Is northern Spain dog-friendly in August specifically?', fr: "Le nord de l'Espagne est-il dog-friendly en août spécifiquement ?", es: '¿Es el norte de España dog-friendly en agosto específicamente?', pt: 'O norte de Espanha é dog-friendly especificamente em agosto?', de: 'Ist Nordspanien speziell im August hundefreundlich?', nl: 'Is Noord-Spanje specifiek in augustus hondvriendelijk?' },
    a4: {
      en: 'August is peak season in northern Spain, which means more crowds but also a region geared for summer tourism. Dog restrictions on beaches are strictest in July-August (time-based access, not bans). The Atlantic weather stays cool: Gijón averages 19°C in August, San Sebastián 22°C. Mountain areas (Jaca, Pyrenees) are ideal in August with cooler temperatures and lower humidity than the coast.',
      fr: "Août est la haute saison dans le nord de l'Espagne, donc plus de monde mais une région préparée au tourisme estival. Les restrictions pour chiens sur les plages sont strictes en juillet-août (accès horaire, pas d'interdiction totale). La météo atlantique reste fraîche : Gijón affiche 19°C en moyenne en août, Saint-Sébastien 22°C. Les zones de montagne (Jaca, Pyrénées) sont idéales en août.",
      es: 'Agosto es temporada alta en el norte de España, más aglomeración pero una región preparada para el turismo estival. Las restricciones para perros en playas son más estrictas en julio-agosto (acceso horario, no prohibición total). El clima atlántico se mantiene fresco: Gijón promedia 19°C en agosto, San Sebastián 22°C. Las zonas de montaña (Jaca, Pirineo) son ideales en agosto.',
      pt: 'Agosto é a época alta no norte de Espanha, mais movimento mas uma região preparada para o turismo estival. As restrições para cães nas praias são mais estritas em julho-agosto (acesso horário, não proibição total). O clima atlântico mantém-se fresco: Gijón tem uma média de 19°C em agosto, San Sebastián 22°C. As zonas de montanha (Jaca, Pirenéus) são ideais em agosto.',
      de: `August ist Hochsaison in Nordspanien, das bedeutet mehr Andrang, aber auch eine auf Sommertourismus ausgerichtete Region. Hundebeschränkungen an Stränden sind im Juli-August am strengsten (zeitbasierter Zugang, kein Verbot). Das atlantische Wetter bleibt kühl: Gijón liegt im August bei durchschnittlich 19°C, San Sebastián bei 22°C. Bergregionen (Jaca, Pyrenäen) sind im August ideal, mit kühleren Temperaturen und geringerer Luftfeuchtigkeit als an der Küste.`,
      nl: 'Augustus is hoogseizoen in Noord-Spanje, dus meer drukte, maar ook een regio die is ingericht op zomertoerisme. Beperkingen voor honden op stranden zijn het strengst in juli-augustus (toegang op basis van tijdstip, geen verbod). Het Atlantische weer blijft koel: Gijón heeft gemiddeld 19°C in augustus, San Sebastián 22°C. Berggebieden (Jaca, Pyreneeën) zijn ideaal in augustus, met koelere temperaturen en minder vochtigheid dan aan de kust.',
    },
    q5: { en: 'Can my dog hike in the Pyrenees in summer?', fr: 'Mon chien peut-il randonner dans les Pyrénées en été ?', es: '¿Puede mi perro hacer senderismo en los Pirineos en verano?', pt: 'O meu cão pode fazer caminhadas nos Pirenéus no verão?', de: 'Kann mein Hund im Sommer in den Pyrenäen wandern?', nl: 'Kan mijn hond in de zomer wandelen in de Pyreneeën?' },
    a5: {
      en: 'Yes, the Aragonese Pyrenees are among the best summer hiking destinations for dogs in Europe. Most trails above 1,000m are off-lead and free of specific dog regulations. Mountain refuges (refugios) generally accept dogs, particularly in the Hecho and Ansó valleys. Ordesa National Park requires a lead but allows dogs on all marked paths. Water sources are abundant above 1,200m. Paws should be checked on sharp limestone trails, but shaded forest sections are much gentler.',
      fr: "Oui, les Pyrénées aragonaises sont parmi les meilleures destinations de randonnée estivale pour les chiens en Europe. La plupart des sentiers au-dessus de 1000m sont sans laisse et sans réglementation spécifique pour les chiens. Les refuges de montagne acceptent généralement les chiens, particulièrement dans les vallées de Hecho et Ansó. Le Parc National d'Ordesa exige une laisse mais autorise les chiens sur tous les sentiers balisés. Les sources d'eau sont abondantes au-dessus de 1200m.",
      es: 'Sí, los Pirineos aragoneses son uno de los mejores destinos de senderismo estival para perros en Europa. La mayoría de los senderos por encima de 1000m son sin correa y sin normativa específica para perros. Los refugios de montaña aceptan generalmente perros, especialmente en los valles de Hecho y Ansó. El Parque Nacional de Ordesa exige correa pero permite perros en todos los senderos señalizados.',
      pt: 'Sim, os Pirenéus aragoneses são um dos melhores destinos de caminhada de verão para cães na Europa. A maioria dos trilhos acima de 1.000m é sem trela e sem regulamentação específica para cães. Os refúgios de montanha aceitam geralmente cães, especialmente nos vales de Hecho e Ansó. O Parque Nacional de Ordesa exige trela mas permite cães em todos os trilhos sinalizados.',
      de: `Ja, die aragonesischen Pyrenäen zählen zu den besten Sommerwanderzielen für Hunde in Europa. Die meisten Wege oberhalb von 1.000m sind ohne Leine und ohne spezielle Hunderegelungen begehbar. Bergrefugien (refugios) akzeptieren generell Hunde, besonders in den Tälern Hecho und Ansó. Der Nationalpark Ordesa verlangt eine Leine, erlaubt Hunde aber auf allen markierten Wegen. Wasserquellen sind oberhalb von 1.200m reichlich vorhanden. Pfoten sollten auf scharfkantigen Kalksteinwegen kontrolliert werden, schattige Waldabschnitte sind deutlich sanfter.`,
      nl: 'Ja, de Aragonese Pyreneeën behoren tot de beste zomerwandelbestemmingen voor honden in Europa. De meeste paden boven 1.000m zijn zonder lijn en zonder specifieke regels voor honden. Berghutten (refugios) laten over het algemeen honden toe, vooral in de valleien Hecho en Ansó. Het Nationaal Park Ordesa vereist een lijn maar laat honden toe op alle gemarkeerde paden. Waterbronnen zijn ruim aanwezig boven 1.200m. Controleer de pootjes op scherpe kalkstenen paden, maar beschaduwde bospaden zijn veel zachter.',
    },
  },
}

const p = (o: L4, locale: string) =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : locale === 'de' ? o.de : locale === 'nl' ? o.nl : o.en

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  return {
    title: `${p(T.metaTitle, locale)}`,
    description: p(T.metaDesc, locale),
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        ...Object.fromEntries(locales.filter((hl) => hl !== 'it').map((l) => [l, `${SITE_URL}/${l}/guides/${SLUG}`])),
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: p(T.metaTitle, locale),
      description: p(T.metaDesc, locale),
      type: 'article',
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
    },
  }
}

export default async function EspagneFraicheChienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: p(T.breadHome, locale), item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: p(T.breadGuides, locale), item: `${SITE_URL}/${locale}/guides` },
      { '@type': 'ListItem', position: 3, name: p(T.metaTitle, locale), item: `${SITE_URL}/${locale}/guides/${SLUG}` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: p(T.faq.q1, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a1, locale) } },
      { '@type': 'Question', name: p(T.faq.q2, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a2, locale) } },
      { '@type': 'Question', name: p(T.faq.q3, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a3, locale) } },
      { '@type': 'Question', name: p(T.faq.q4, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a4, locale) } },
      { '@type': 'Question', name: p(T.faq.q5, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a5, locale) } },
    ],
  }

  let cityIndex = 0

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-900 via-orange-900 to-yellow-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-yellow-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🇪🇸 {locale === 'fr' ? 'Espagne verte' : locale === 'es' ? 'España verde' : locale === 'pt' ? 'Espanha verde' : locale === 'de' ? 'Grünes Spanien' : locale === 'nl' ? 'Groen Spanje' : 'Green Spain'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            {p(T.title, locale)}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mb-8">
            {p(T.intro, locale)}
          </p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <a key={r.id} href={`#${r.id}`} className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors">
                {r.emoji} {p(r.title, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {REGIONS.map((region) => (
          <section key={region.id} id={region.id}>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
              <span className="text-3xl">{region.emoji}</span>
              <h2 className="text-2xl font-extrabold text-gray-900">{p(region.title, locale)}</h2>
            </div>
            <div className="space-y-6">
              {region.cities.map((city) => {
                cityIndex++
                return (
                  <div key={city.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-5 sm:p-6">
                      {/* City header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 text-sm font-black flex items-center justify-center">
                            {cityIndex}
                          </div>
                          <div>
                            <h3 className="text-xl font-extrabold text-gray-900">{city.name}</h3>
                            <p className="text-xs text-gray-500">{p(city.region, locale)}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl font-black text-blue-600">{city.julyTemp}°C</div>
                          <div className="text-xs text-gray-500">{p(T.julyTemp, locale)}</div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                        {p(city.tag, locale)}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{p(city.why, locale)}</p>

                      {/* Dog tip */}
                      <div className="flex items-start gap-2 bg-green-50 rounded-xl px-3 py-2 mb-5">
                        <span className="text-green-600 text-xs font-bold uppercase tracking-wide flex-shrink-0 mt-0.5">🐾 {p(T.dogTipLabel, locale)}</span>
                        <p className="text-green-800 text-xs leading-relaxed">{p(city.dogTip, locale)}</p>
                      </div>

                      {/* Hotel picks */}
                      <div className="mb-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{p(T.hotelsLabel, locale)}</p>
                        <div className="space-y-2">
                          {city.hotels.map((hotel) => (
                            <div key={hotel.name} className="flex items-start gap-2">
                              <span className="text-xs text-yellow-500 flex-shrink-0 mt-0.5">{'★'.repeat(hotel.stars)}</span>
                              <div>
                                <span className="text-sm font-semibold text-gray-900">{hotel.name}</span>
                                <span className="text-xs text-gray-500 ml-1.5">{p(hotel.note, locale)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a
                        href={buildAllezDestLink(city.name, 'Spain', `${CAMPAIGN}-${city.slug}`, 3)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                      >
                        🏨 {p(T.seeHotels, locale)}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section>
          <div className="space-y-3">
            {([
              { q: T.faq.q1, a: T.faq.a1 },
              { q: T.faq.q2, a: T.faq.a2 },
              { q: T.faq.q3, a: T.faq.a3 },
              { q: T.faq.q4, a: T.faq.a4 },
              { q: T.faq.q5, a: T.faq.a5 },
            ] as Array<{ q: L4; a: L4 }>).map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm group">
                <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  {p(f.q, locale)}
                  <span aria-hidden="true" className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">{p(f.a, locale)}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <GuideFooter locale={locale} currentSlug={SLUG} />
    </>
  )
}
