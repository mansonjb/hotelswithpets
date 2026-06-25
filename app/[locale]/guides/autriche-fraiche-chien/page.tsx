import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'autriche-fraiche-chien'
const CAMPAIGN = 'autriche-fraiche'

type L4 = { en: string; fr: string; es: string; pt: string }
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
    id: 'salzburg',
    emoji: '🎼',
    title: { en: 'Salzburg & surroundings', fr: 'Salzbourg et environs', es: 'Salzburgo y alrededores', pt: 'Salzburgo e arredores' },
    cities: [
      {
        slug: 'salzburg',
        name: 'Salzburg',
        region: { en: 'Salzburg', fr: 'Salzbourg', es: 'Salzburgo', pt: 'Salzburgo' },
        julyTemp: 24,
        tag: { en: 'Mozart · Salzach river · Alpine parks · 24°C', fr: 'Mozart · Salzach · parcs alpins · 24°C', es: 'Mozart · río Salzach · parques alpinos · 24°C', pt: 'Mozart · rio Salzach · parques alpinos · 24°C' },
        why: {
          en: 'Salzburg at 424m on the Salzach river sits between the Berchtesgaden Alps and the Alpine foreland, keeping July at 24°C while Vienna hits 27°C and Budapest 30°C. The Mönchsberg plateau (500m, lift from the city centre) has 5 km of off-lead forest paths and the fortress ramparts. The Salzach riverbank (20 km of off-lead paths, flat, shaded by willows) is the city\'s great dog promenade. Dogs enter the Mirabellgarten (Mirabell Garden) on a lead and the Hellbrunn Palace grounds (268m, 5 km south) off-lead.',
          fr: "Salzbourg à 424m sur la Salzach est entre les Alpes de Berchtesgaden et le piémont alpin, maintenant juillet à 24°C pendant que Vienne atteint 27°C et Budapest 30°C. Le plateau du Mönchsberg (500m, ascenseur depuis le centre) a 5 km de chemins forestiers sans laisse et les remparts de la forteresse. La berge de la Salzach (20 km de chemins sans laisse, plat, ombragé par des saules) est la grande promenade canine de la ville.",
          es: 'Salzburgo a 424m sobre el Salzach está entre los Alpes de Berchtesgaden y el piedemonte alpino, manteniéndose a 24°C en julio mientras Viena llega a 27°C y Budapest a 30°C. La meseta del Mönchsberg (500m, ascensor desde el centro) tiene 5 km de senderos forestales sin correa y las murallas de la fortaleza. La orilla del Salzach (20 km de senderos sin correa, plana, sombreada por sauces) es el gran paseo canino de la ciudad.',
          pt: 'Salzburgo a 424m sobre o rio Salzach fica entre os Alpes de Berchtesgaden e o sopé alpino, mantendo-se a 24°C em julho enquanto Viena atinge 27°C e Budapeste 30°C. O planalto do Mönchsberg (500m, elevador desde o centro) tem 5 km de trilhos florestais sem trela e as muralhas da fortaleza. A margem do Salzach (20 km de caminhos sem trela, plano, sombreado por salgueiros) é o grande passeio canino da cidade.',
        },
        dogTip: {
          en: 'Mönchsberg lift: from the old town, 60 seconds to 500m, dogs travel free, 5 km of off-lead cliff-top forest paths with views over the city and Alps. The Museum der Moderne terrace café welcomes dogs. Coolest spot in the city on a hot day.',
          fr: "Ascenseur du Mönchsberg : depuis la vieille ville, 60 secondes jusqu'à 500m, chiens gratuits, 5 km de chemins forestiers sans laisse en haut des falaises avec vue sur la ville et les Alpes. Le café-terrasse du Museum der Moderne accueille les chiens. L'endroit le plus frais de la ville par temps chaud.",
          es: 'Ascensor del Mönchsberg: desde el casco histórico, 60 segundos hasta 500m, perros gratis, 5 km de senderos forestales sin correa en lo alto de los acantilados con vistas sobre la ciudad y los Alpes. El café-terraza del Museum der Moderne admite perros. El punto más fresco de la ciudad en un día caluroso.',
          pt: 'Elevador do Mönchsberg: da cidade velha, 60 segundos até 500m, cães de graça, 5 km de trilhos florestais sem trela no topo das falésias com vistas sobre a cidade e os Alpes. O café-terraço do Museum der Moderne aceita cães. O ponto mais fresco da cidade num dia quente.',
        },
        hotels: [
          {
            name: 'Hotel Sacher Salzburg',
            stars: 5,
            note: { en: 'Grand hotel on the Salzach opposite the festival halls, dogs of all sizes accepted with full amenities.', fr: 'Grand hôtel sur la Salzach face aux salles du festival, chiens de toute taille acceptés avec équipements complets.', es: 'Gran hotel sobre el Salzach frente a las salas del festival, perros de cualquier tamaño aceptados con amenities completos.', pt: 'Grande hotel sobre o Salzach em frente às salas do festival, cães de qualquer tamanho aceites com amenities completos.' },
          },
          {
            name: 'Hotel Goldener Hirsch',
            stars: 5,
            note: { en: 'Medieval inn in the Getreidegasse, Mozart\'s street, 500 years of history, dogs welcome.', fr: 'Auberge médiévale dans la Getreidegasse, la rue de Mozart, 500 ans d\'histoire, chiens bienvenus.', es: 'Posada medieval en la Getreidegasse, la calle de Mozart, 500 años de historia, perros bienvenidos.', pt: 'Estalagem medieval na Getreidegasse, a rua de Mozart, 500 anos de história, cães bem-vindos.' },
          },
          {
            name: 'Schloss Mönchstein',
            stars: 5,
            note: { en: 'Castle hotel on the Mönchsberg at 500m above the city, private forest, dogs of any size accepted.', fr: 'Hôtel-château sur le Mönchsberg à 500m au-dessus de la ville, forêt privée, chiens de toute taille acceptés.', es: 'Hotel-castillo en el Mönchsberg a 500m sobre la ciudad, bosque privado, perros de cualquier tamaño aceptados.', pt: 'Hotel-castelo no Mönchsberg a 500m acima da cidade, floresta privada, cães de qualquer tamanho aceites.' },
          },
        ],
      },
    ],
  },
  {
    id: 'salzkammergut',
    emoji: '🏔️',
    title: { en: 'Salzkammergut lake district', fr: 'Salzkammergut (lacs alpins)', es: 'Salzkammergut (lagos alpinos)', pt: 'Salzkammergut (lagos alpinos)' },
    cities: [
      {
        slug: 'bad-ischl',
        name: 'Bad Ischl',
        region: { en: 'Salzkammergut', fr: 'Salzkammergut', es: 'Salzkammergut', pt: 'Salzkammergut' },
        julyTemp: 22,
        tag: { en: 'Emperor Franz Joseph · Traun river · 22°C', fr: 'Empereur François-Joseph · Traun · 22°C', es: 'Emperador Francisco José · río Traun · 22°C', pt: 'Imperador Francisco José · rio Traun · 22°C' },
        why: {
          en: 'Bad Ischl at 469m was the summer residence of Emperor Franz Joseph for 60 years and sits in the heart of the Salzkammergut at the confluence of the Traun and Ischl rivers. July averages 22°C thanks to the surrounding mountains. The Kaiservilla park (dogs on lead, grounds open) and the Traun riverbank path (10 km off-lead) are the classic routes. Hallstatt (20 km south, UNESCO) is a day trip: dogs walk the lake shore and the Echerntal valley trail off-lead.',
          fr: "Bad Ischl à 469m était la résidence estivale de l'Empereur François-Joseph pendant 60 ans, au coeur du Salzkammergut au confluent de la Traun et de l'Ischl. Juillet fait 22°C en moyenne grâce aux montagnes environnantes. Le parc de la Kaiservilla (chiens en laisse, domaine ouvert) et le chemin de berge de la Traun (10 km sans laisse) sont les itinéraires classiques. Hallstatt (20 km au sud, UNESCO) est une excursion d'une journée : les chiens parcourent la rive du lac et le sentier de la vallée de l'Echerntal sans laisse.",
          es: 'Bad Ischl a 469m fue la residencia de verano del Emperador Francisco José durante 60 años, en el corazón del Salzkammergut en la confluencia del Traun y el Ischl. Julio promedia 22°C gracias a las montañas circundantes. El parque de la Kaiservilla (perros con correa, dominio abierto) y el camino de ribera del Traun (10 km sin correa) son los itinerarios clásicos. Hallstatt (20 km al sur, UNESCO) es una excursión de un día.',
          pt: 'Bad Ischl a 469m foi a residência de verão do Imperador Francisco José durante 60 anos, no coração do Salzkammergut na confluência do Traun e do Ischl. Julho faz 22°C em média graças às montanhas circundantes. O parque da Kaiservilla (cães com trela, domínio aberto) e o caminho da margem do Traun (10 km sem trela) são os itinerários clássicos. Hallstatt (20 km a sul, UNESCO) é uma excursão de um dia.',
        },
        dogTip: {
          en: 'Echerntal valley (Hallstatt, 20 km): from the village car park, a 6 km off-lead valley trail through waterfalls and beech forest to the Waldbachstrub falls (72m). Cool and shaded all day even in July. Dogs may also take the Hallstatt funicular (dogs free).',
          fr: "Vallée de l'Echerntal (Hallstatt, 20 km) : depuis le parking du village, 6 km de sentier sans laisse dans une vallée avec cascades et forêt de hêtres jusqu'aux chutes du Waldbachstrub (72m). Frais et ombragé toute la journée même en juillet. Les chiens peuvent aussi prendre le funiculaire de Hallstatt (chiens gratuits).",
          es: 'Valle de Echerntal (Hallstatt, 20 km): desde el aparcamiento del pueblo, 6 km de sendero sin correa por un valle con cascadas y bosque de hayas hasta las cataratas de Waldbachstrub (72m). Fresco y sombreado todo el día incluso en julio.',
          pt: 'Vale do Echerntal (Hallstatt, 20 km): desde o parque de estacionamento da aldeia, 6 km de trilho sem trela num vale com cascatas e floresta de faias até às quedas do Waldbachstrub (72m). Fresco e sombreado o dia todo mesmo em julho.',
        },
        hotels: [
          {
            name: 'Hotel Goldenes Schiff',
            stars: 4,
            note: { en: 'Historic hotel on the Traun quay in Bad Ischl, riverside terrace, dogs accepted.', fr: 'Hôtel historique sur le quai de la Traun à Bad Ischl, terrasse en bord de rivière, chiens acceptés.', es: 'Hotel histórico en el muelle del Traun en Bad Ischl, terraza a orillas del río, perros aceptados.', pt: 'Hotel histórico no cais do Traun em Bad Ischl, terraço junto ao rio, cães aceites.' },
          },
          {
            name: 'Seehotel Das Traunsee',
            stars: 4,
            note: { en: 'Lakefront hotel on the Traunsee (15 km north), private dock, dogs welcome up to any size.', fr: 'Hôtel en bord de lac sur le Traunsee (15 km au nord), ponton privé, chiens bienvenus de toute taille.', es: 'Hotel frente al lago en el Traunsee (15 km al norte), embarcadero privado, perros bienvenidos de cualquier tamaño.', pt: 'Hotel à beira do lago no Traunsee (15 km a norte), cais privado, cães bem-vindos de qualquer tamanho.' },
          },
          {
            name: 'Pension Villa Schratt',
            stars: 3,
            note: { en: 'Charming guesthouse in the villa quarter of Bad Ischl, garden, dogs of all sizes accepted.', fr: 'Charmant gîte dans le quartier des villas de Bad Ischl, jardin, chiens de toute taille acceptés.', es: 'Encantadora pensión en el barrio de villas de Bad Ischl, jardín, perros de cualquier tamaño aceptados.', pt: 'Encantadora pensão no bairro das villas de Bad Ischl, jardim, cães de qualquer tamanho aceites.' },
          },
        ],
      },
    ],
  },
  {
    id: 'tyrol',
    emoji: '⛰️',
    title: { en: 'Tyrol', fr: 'Tyrol', es: 'Tirol', pt: 'Tirol' },
    cities: [
      {
        slug: 'innsbruck',
        name: 'Innsbruck',
        region: { en: 'Tyrol', fr: 'Tyrol', es: 'Tirol', pt: 'Tirol' },
        julyTemp: 24,
        tag: { en: 'Inn valley · Nordkette 2,334m · 24°C', fr: 'Vallée de l\'Inn · Nordkette 2 334m · 24°C', es: 'Valle del Inn · Nordkette 2.334m · 24°C', pt: 'Vale do Inn · Nordkette 2.334m · 24°C' },
        why: {
          en: 'Innsbruck at 574m sits in the Inn valley surrounded on all sides by 2,000-3,000m peaks that channel cool Alpine air into the city, keeping July at 24°C. The Nordkettenbahn cable car takes dogs (free) from the city centre to 2,334m in under 30 minutes. The Inn river promenade (15 km of off-lead paths east and west) is flat and shaded. The old town (Altstadt) is pedestrianised. Austria\'s most Alpine city, with the best mountain access of any European city centre.',
          fr: "Innsbruck à 574m est dans la vallée de l'Inn entourée de toutes parts par des sommets de 2 000-3 000m qui canalisent l'air alpin frais dans la ville, maintenant juillet à 24°C. Le téléphérique Nordkettenbahn emmène les chiens (gratuits) depuis le centre-ville jusqu'à 2 334m en moins de 30 minutes. La promenade de l'Inn (15 km de chemins sans laisse à l'est et à l'ouest) est plate et ombragée. La vieille ville (Altstadt) est piétonne.",
          es: 'Innsbruck a 574m está en el valle del Inn rodeada por todos lados de cimas de 2.000-3.000m que canalizan aire alpino fresco hacia la ciudad, manteniendo julio a 24°C. El teleférico Nordkettenbahn lleva a los perros (gratis) desde el centro de la ciudad hasta 2.334m en menos de 30 minutos. El paseo del río Inn (15 km de senderos sin correa al este y al oeste) es plano y sombreado.',
          pt: 'Innsbruck a 574m fica no vale do Inn rodeada por todos os lados por picos de 2.000-3.000m que canalizam ar alpino fresco para a cidade, mantendo julho a 24°C. O teleférico Nordkettenbahn leva os cães (de graça) do centro da cidade até 2.334m em menos de 30 minutos. O passeio do rio Inn (15 km de caminhos sem trela a leste e a oeste) é plano e sombreado.',
        },
        dogTip: {
          en: 'Nordkettenbahn cable car: dogs travel free, 4 stations from the Hungerburg funicular base to the Hafelekar summit (2,334m), off-lead trails at every station. The Seegrube station (1,905m) has a terrace restaurant welcoming dogs with a view of the Inn valley and Innsbruck below.',
          fr: "Téléphérique Nordkettenbahn : chiens gratuits, 4 stations depuis la base du funiculaire de Hungerburg jusqu'au sommet de Hafelekar (2 334m), sentiers sans laisse à chaque station. La station de Seegrube (1 905m) a un restaurant-terrasse accueillant les chiens avec vue sur la vallée de l'Inn et Innsbruck en contrebas.",
          es: 'Teleférico Nordkettenbahn: perros gratis, 4 estaciones desde la base del funicular de Hungerburg hasta la cima de Hafelekar (2.334m), senderos sin correa en cada estación. La estación de Seegrube (1.905m) tiene un restaurante-terraza que admite perros con vistas al valle del Inn e Innsbruck abajo.',
          pt: 'Teleférico Nordkettenbahn: cães de graça, 4 estações desde a base do funicular de Hungerburg até ao cume de Hafelekar (2.334m), trilhos sem trela em cada estação. A estação de Seegrube (1.905m) tem um restaurante-terraço que aceita cães com vistas para o vale do Inn e Innsbruck em baixo.',
        },
        hotels: [
          {
            name: 'Hotel Innsbruck',
            stars: 4,
            note: { en: 'Grand hotel facing the Inn river and the Nordkette directly, mountain view from every room, dogs accepted.', fr: 'Grand hôtel face à l\'Inn et directement sous la Nordkette, vue montagne depuis chaque chambre, chiens acceptés.', es: 'Gran hotel frente al río Inn y la Nordkette directamente, vistas a la montaña desde cada habitación, perros aceptados.', pt: 'Grande hotel em frente ao rio Inn e à Nordkette diretamente, vistas para a montanha de todos os quartos, cães aceites.' },
          },
          {
            name: 'Nala Individuell Hotel',
            stars: 4,
            note: { en: 'Design boutique hotel in a quiet street, 5 min walk to the Altstadt, dogs welcome up to 15 kg.', fr: 'Hôtel boutique design dans une rue calme, 5 min à pied de l\'Altstadt, chiens bienvenus jusqu\'à 15 kg.', es: 'Hotel boutique de diseño en una calle tranquila, a 5 min a pie del Altstadt, perros bienvenidos hasta 15 kg.', pt: 'Hotel boutique de design numa rua tranquila, 5 min a pé do Altstadt, cães bem-vindos até 15 kg.' },
          },
          {
            name: 'Schwarzer Adler Hotel',
            stars: 4,
            note: { en: 'Historic 16th-century inn in the old town, wine cellar, dogs of any size welcome.', fr: 'Auberge historique du XVIe siècle dans la vieille ville, cave à vin, chiens de toute taille bienvenus.', es: 'Histórica posada del siglo XVI en el casco histórico, bodega de vinos, perros de cualquier tamaño bienvenidos.', pt: 'Histórica estalagem do séc. XVI na cidade velha, adega de vinhos, cães de qualquer tamanho bem-vindos.' },
          },
        ],
      },
      {
        slug: 'mayrhofen',
        name: 'Mayrhofen',
        region: { en: 'Tyrol', fr: 'Tyrol', es: 'Tirol', pt: 'Tirol' },
        julyTemp: 21,
        tag: { en: 'Zillertal Alps · cable cars · 21°C', fr: 'Alpes du Zillertal · télécabines · 21°C', es: 'Alpes del Zillertal · telecabinas · 21°C', pt: 'Alpes do Zillertal · telecabines · 21°C' },
        why: {
          en: 'Mayrhofen at 627m is the valley base for the Zillertal Alps and records 21°C in July. The Ahornbahn cable car (dogs free, to 2,000m) drops visitors into a wide Alpine plateau with 30 km of off-lead summer trails. The Zillertal cycle path (52 km, flat, off-lead) runs from Jenbach to Mayrhofen through meadows and farmland. The village itself is entirely pedestrianised in the centre. The Hintersee waterfall trail (30 min, off-lead) is the classic local hike.',
          fr: "Mayrhofen à 627m est la base de vallée des Alpes du Zillertal et enregistre 21°C en juillet. Le téléphérique Ahornbahn (chiens gratuits, jusqu'à 2 000m) dépose les visiteurs sur un large plateau alpin avec 30 km de sentiers estivaux sans laisse. La piste cyclable du Zillertal (52 km, plat, sans laisse) relie Jenbach à Mayrhofen à travers prés et fermes. Le sentier de la cascade de Hintersee (30 min, sans laisse) est la randonnée locale classique.",
          es: 'Mayrhofen a 627m es la base de valle de los Alpes del Zillertal y registra 21°C en julio. El teleférico Ahornbahn (perros gratis, hasta 2.000m) lleva a los visitantes a una amplia meseta alpina con 30 km de senderos estivales sin correa. La vía ciclista del Zillertal (52 km, plana, sin correa) une Jenbach con Mayrhofen a través de prados y granjas.',
          pt: 'Mayrhofen a 627m é a base de vale dos Alpes do Zillertal e regista 21°C em julho. O teleférico Ahornbahn (cães de graça, até 2.000m) leva os visitantes a um amplo planalto alpino com 30 km de trilhos estivais sem trela. A ciclovia do Zillertal (52 km, plana, sem trela) liga Jenbach a Mayrhofen através de prados e quintas.',
        },
        dogTip: {
          en: 'Ahornbahn cable car: dogs free, arrives at the Filzalm plateau (2,000m), 360-degree Alpine panorama, 30 km of marked summer trails all off-lead, a mountain hut restaurant welcoming dogs (Penken Alm), temperature 10-12°C cooler than the valley floor.',
          fr: "Téléphérique Ahornbahn : chiens gratuits, arrivée sur le plateau du Filzalm (2 000m), panorama alpin à 360°, 30 km de sentiers estivaux balisés tous sans laisse, un restaurant de refuge accueillant les chiens (Penken Alm), température 10-12°C plus fraîche que le fond de la vallée.",
          es: 'Teleférico Ahornbahn: perros gratis, llegada al plateau de Filzalm (2.000m), panorama alpino de 360°, 30 km de senderos estivales marcados todos sin correa, un restaurante de refugio que admite perros (Penken Alm), temperatura 10-12°C más fresca que el fondo del valle.',
          pt: 'Teleférico Ahornbahn: cães de graça, chegada ao planalto do Filzalm (2.000m), panorama alpino de 360°, 30 km de trilhos estivais marcados todos sem trela, um restaurante de refúgio que aceita cães (Penken Alm), temperatura 10-12°C mais fresca do que o fundo do vale.',
        },
        hotels: [
          {
            name: 'Strass Sport & SPA Hotel',
            stars: 4,
            note: { en: 'Large wellness hotel in the village centre, spa, dogs accepted up to 20 kg.', fr: 'Grand hôtel bien-être au centre du village, spa, chiens acceptés jusqu\'à 20 kg.', es: 'Gran hotel de bienestar en el centro del pueblo, spa, perros aceptados hasta 20 kg.', pt: 'Grande hotel de bem-estar no centro da aldeia, spa, cães aceites até 20 kg.' },
          },
          {
            name: 'Hotel Berghof',
            stars: 4,
            note: { en: 'Alpine hotel with mountain view terrace and large garden, dogs of all sizes welcome.', fr: 'Hôtel alpin avec terrasse vue montagne et grand jardin, chiens de toute taille bienvenus.', es: 'Hotel alpino con terraza con vistas a la montaña y jardín amplio, perros de cualquier tamaño bienvenidos.', pt: 'Hotel alpino com terraço com vista para a montanha e jardim amplo, cães de qualquer tamanho bem-vindos.' },
          },
          {
            name: 'Landhaus Hubertus',
            stars: 3,
            note: { en: 'Family guesthouse 5 min walk from the Ahornbahn cable car, dogs free of charge, fenced garden.', fr: 'Gîte familial à 5 min à pied du téléphérique Ahornbahn, chiens gratuits, jardin clôturé.', es: 'Casa rural familiar a 5 min a pie del teleférico Ahornbahn, perros sin recargo, jardín vallado.', pt: 'Casa rural familiar a 5 min a pé do teleférico Ahornbahn, cães sem suplemento, jardim vedado.' },
          },
        ],
      },
    ],
  },
  {
    id: 'carinthie',
    emoji: '🏖️',
    title: { en: 'Carinthia (lake district)', fr: 'Carinthie (lacs alpins)', es: 'Carintia (lagos alpinos)', pt: 'Caríntia (lagos alpinos)' },
    cities: [
      {
        slug: 'velden-am-worthersee',
        name: 'Velden am Wörthersee',
        region: { en: 'Carinthia', fr: 'Carinthie', es: 'Carintia', pt: 'Caríntia' },
        julyTemp: 24,
        tag: { en: 'Wörthersee · warmest Alpine lake · 24°C', fr: 'Wörthersee · lac alpin le plus chaud · 24°C', es: 'Wörthersee · lago alpino más cálido · 24°C', pt: 'Wörthersee · lago alpino mais quente · 24°C' },
        why: {
          en: 'Velden am Wörthersee is Austria\'s glamour lake resort at 440m, with the Wörthersee reaching 26°C for swimming in July while air temperature stays at 24°C. The lake shore promenade (18 km round the lake, entirely off-lead) is the longest lakeside dog walk in Austria. The surrounding Karawanken mountains (2,000m) and the Villacher Alpe (2,166m cable car, 20 km south) offer off-lead Alpine trails accessible the same day. Dogs are welcome on the lake passenger ferry.',
          fr: "Velden am Wörthersee est la station lacustre glamour d'Autriche à 440m, avec le Wörthersee qui atteint 26°C pour la baignade en juillet pendant que la température de l'air reste à 24°C. La promenade du bord du lac (18 km autour du lac, entièrement sans laisse) est la plus longue promenade canine lacustre d'Autriche. Les montagnes Karawanken environnantes (2 000m) et la Villacher Alpe (téléphérique à 2 166m, 20 km au sud) offrent des sentiers alpins sans laisse accessibles le même jour.",
          es: 'Velden am Wörthersee es el glamuroso centro lacustre de Austria a 440m, con el Wörthersee alcanzando 26°C para bañarse en julio mientras la temperatura del aire se mantiene a 24°C. El paseo a orillas del lago (18 km alrededor del lago, completamente sin correa) es el mayor paseo canino lacustre de Austria. Los perros son bienvenidos en el ferry de pasajeros del lago.',
          pt: 'Velden am Wörthersee é o glamoroso resort lacustre da Áustria a 440m, com o Wörthersee a atingir 26°C para natação em julho enquanto a temperatura do ar se mantém a 24°C. O passeio à beira do lago (18 km à volta do lago, totalmente sem trela) é o maior passeio canino lacustre da Áustria. Os cães são bem-vindos no ferry de passageiros do lago.',
        },
        dogTip: {
          en: 'Wörthersee ferry: dogs travel free on all lake ferry lines, 7 stops around the lake, the ideal way to explore without a car. Velden to Klagenfurt Strandbad (main beach, dogs allowed before 9am and after 6pm) in 45 min by boat.',
          fr: "Ferry du Wörthersee : chiens gratuits sur toutes les lignes du ferry lacustre, 7 arrêts autour du lac, la façon idéale d'explorer sans voiture. Velden à la Strandbad de Klagenfurt (plage principale, chiens autorisés avant 9h et après 18h) en 45 min en bateau.",
          es: 'Ferry del Wörthersee: perros gratis en todas las líneas del ferry lacustre, 7 paradas alrededor del lago, la forma ideal de explorar sin coche. Velden a la Strandbad de Klagenfurt (playa principal, perros permitidos antes de las 9h y después de las 18h) en 45 min en barco.',
          pt: 'Ferry do Wörthersee: cães de graça em todas as linhas do ferry lacustre, 7 paragens à volta do lago, a forma ideal de explorar sem carro. Velden para a Strandbad de Klagenfurt (praia principal, cães permitidos antes das 9h e depois das 18h) em 45 min de barco.',
        },
        hotels: [
          {
            name: 'Casino Hotel Velden',
            stars: 5,
            note: { en: 'Iconic castle-hotel on the Wörthersee shore, private beach, dogs of any size accepted.', fr: 'Iconique hôtel-château sur la rive du Wörthersee, plage privée, chiens de toute taille acceptés.', es: 'Icónico hotel-castillo a orillas del Wörthersee, playa privada, perros de cualquier tamaño aceptados.', pt: 'Icónico hotel-castelo à beira do Wörthersee, praia privada, cães de qualquer tamanho aceites.' },
          },
          {
            name: 'Falkensteiner Hotel & SPA Carinzia',
            stars: 4,
            note: { en: 'Modern resort hotel with spa and lake access, dogs up to 15 kg accepted.', fr: 'Hôtel-resort moderne avec spa et accès au lac, chiens jusqu\'à 15 kg acceptés.', es: 'Hotel-resort moderno con spa y acceso al lago, perros hasta 15 kg aceptados.', pt: 'Hotel-resort moderno com spa e acesso ao lago, cães até 15 kg aceites.' },
          },
          {
            name: 'Hotel Mosser',
            stars: 4,
            note: { en: 'Traditional lakefront hotel, family-run for 4 generations, dogs welcome of any size.', fr: 'Hôtel traditionnel en bord de lac, géré en famille depuis 4 générations, chiens bienvenus de toute taille.', es: 'Hotel tradicional a orillas del lago, familiar desde hace 4 generaciones, perros bienvenidos de cualquier tamaño.', pt: 'Hotel tradicional à beira do lago, gerido pela família há 4 gerações, cães bem-vindos de qualquer tamanho.' },
          },
        ],
      },
    ],
  },
  {
    id: 'vorarlberg',
    emoji: '🌄',
    title: { en: 'Vorarlberg & Bregenz', fr: 'Vorarlberg et Bregenz', es: 'Vorarlberg y Bregenz', pt: 'Vorarlberg e Bregenz' },
    cities: [
      {
        slug: 'bregenz',
        name: 'Bregenz',
        region: { en: 'Vorarlberg', fr: 'Vorarlberg', es: 'Vorarlberg', pt: 'Vorarlberg' },
        julyTemp: 23,
        tag: { en: 'Lake Constance · Pfänder 1,064m · 23°C', fr: 'Lac de Constance · Pfänder 1 064m · 23°C', es: 'Lago Constanza · Pfänder 1.064m · 23°C', pt: 'Lago Constança · Pfänder 1.064m · 23°C' },
        why: {
          en: 'Bregenz is Austria\'s westernmost city, on Lake Constance at 398m, with the Pfänder mountain (1,064m) rising directly behind. July averages 23°C, moderated by the lake. The Pfänderbahn cable car (dogs free) reaches 1,022m in 7 minutes with 15 km of Alpine trails off-lead and one of the best wildlife parks in Austria (deer, wild boar, marmots). The Lake Constance cycle path (273 km around the lake crossing Germany, Austria and Switzerland) starts in Bregenz. Dogs are permitted on the lake ferries.',
          fr: "Bregenz est la ville la plus à l'ouest de l'Autriche, sur le lac de Constance à 398m, avec le Pfänder (1 064m) qui s'élève directement derrière. Juillet fait 23°C en moyenne, modéré par le lac. Le téléphérique de la Pfänderbahn (chiens gratuits) atteint 1 022m en 7 minutes avec 15 km de sentiers alpins sans laisse et l'un des meilleurs parcs animaliers d'Autriche (cerfs, sangliers, marmottes). La piste cyclable du lac de Constance (273 km) part de Bregenz.",
          es: 'Bregenz es la ciudad más occidental de Austria, en el lago Constanza a 398m, con el Pfänder (1.064m) elevándose directamente detrás. Julio promedia 23°C, moderado por el lago. El teleférico de la Pfänderbahn (perros gratis) alcanza 1.022m en 7 minutos con 15 km de senderos alpinos sin correa y uno de los mejores parques de vida silvestre de Austria (ciervos, jabalíes, marmotas). La vía ciclista del lago Constanza (273 km) parte de Bregenz.',
          pt: 'Bregenz é a cidade mais ocidental da Áustria, no Lago Constança a 398m, com o Pfänder (1.064m) a subir diretamente atrás. Julho faz 23°C em média, moderado pelo lago. O teleférico do Pfänderbahn (cães de graça) atinge 1.022m em 7 minutos com 15 km de trilhos alpinos sem trela e um dos melhores parques de vida selvagem da Áustria (veados, javalis, marmotas).',
        },
        dogTip: {
          en: 'Pfänderbahn cable car: 7 minutes, dogs free, wildlife park at the top (deer and marmots viewable from paths, no fences), 15 km of off-lead Alpine trails, a Berggasthof terrace welcoming dogs, and a view covering the entire lake plus the German and Swiss shores.',
          fr: "Téléphérique Pfänderbahn : 7 minutes, chiens gratuits, parc animalier au sommet (cerfs et marmottes visibles depuis les chemins, sans clôtures), 15 km de sentiers alpins sans laisse, une terrasse de Berggasthof accueillant les chiens, et une vue couvrant tout le lac ainsi que les rives allemandes et suisses.",
          es: 'Teleférico Pfänderbahn: 7 minutos, perros gratis, parque de vida silvestre en la cima (ciervos y marmotas visibles desde los caminos, sin vallas), 15 km de senderos alpinos sin correa, una terraza de Berggasthof que admite perros, y una vista que cubre todo el lago más las orillas alemanas y suizas.',
          pt: 'Teleférico Pfänderbahn: 7 minutos, cães de graça, parque de vida selvagem no cume (veados e marmotas visíveis dos caminhos, sem cercas), 15 km de trilhos alpinos sem trela, uma esplanada de Berggasthof que aceita cães, e uma vista cobrindo todo o lago mais as margens alemã e suíça.',
        },
        hotels: [
          {
            name: 'Deuring Schlössle',
            stars: 5,
            note: { en: 'Medieval castle hotel above the old town, private garden, dogs of any size welcome.', fr: 'Hôtel-château médiéval au-dessus de la vieille ville, jardin privé, chiens de toute taille bienvenus.', es: 'Hotel-castillo medieval sobre el casco histórico, jardín privado, perros de cualquier tamaño bienvenidos.', pt: 'Hotel-castelo medieval acima da cidade velha, jardim privado, cães de qualquer tamanho bem-vindos.' },
          },
          {
            name: 'Hotel Schwärzler',
            stars: 4,
            note: { en: 'Modern hotel near the festival hall, 5 min walk to the lake, dogs up to 25 kg accepted.', fr: 'Hôtel moderne près de la salle des fêtes, 5 min à pied du lac, chiens jusqu\'à 25 kg acceptés.', es: 'Hotel moderno cerca del recinto ferial, a 5 min del lago a pie, perros hasta 25 kg aceptados.', pt: 'Hotel moderno perto do recinto das festividades, 5 min a pé do lago, cães até 25 kg aceites.' },
          },
          {
            name: 'Hotel Messmer',
            stars: 4,
            note: { en: 'Historic lakefront hotel on the Bregenz harbour promenade, panoramic views, pets welcome.', fr: 'Hôtel historique en bord de lac sur la promenade du port de Bregenz, vues panoramiques, animaux bienvenus.', es: 'Hotel histórico a orillas del lago en el paseo del puerto de Bregenz, vistas panorámicas, mascotas bienvenidas.', pt: 'Hotel histórico à beira do lago no passeio do porto de Bregenz, vistas panorâmicas, animais bem-vindos.' },
          },
        ],
      },
    ],
  },
]

const T = {
  title: {
    en: 'Best Cities to Escape the Heat in Austria with Your Dog (2026)',
    fr: 'Meilleures villes pour éviter la chaleur en Autriche avec son chien (2026)',
    es: 'Mejores ciudades para evitar el calor en Austria con tu perro (2026)',
    pt: 'Melhores cidades para evitar o calor na Áustria com o seu cão (2026)',
  },
  metaTitle: {
    en: 'Cool Austria with Your Dog: 6 Alpine Cities Under 25°C in July (2026)',
    fr: 'Autriche fraîche avec son chien : 6 villes alpines sous 25°C en juillet (2026)',
    es: 'Austria fresca con tu perro: 6 ciudades alpinas con menos de 25°C en julio (2026)',
    pt: 'Áustria fresca com o seu cão: 6 cidades alpinas abaixo de 25°C em julho (2026)',
  },
  metaDesc: {
    en: 'Salzburg, Bad Ischl, Innsbruck, Mayrhofen, Velden and Bregenz: 6 Austrian cities under 25°C in July with off-lead Alpine trails, dog-friendly lake shores and cable cars that accept dogs for free.',
    fr: 'Salzbourg, Bad Ischl, Innsbruck, Mayrhofen, Velden et Bregenz : 6 villes autrichiennes sous 25°C en juillet avec des sentiers alpins sans laisse, des rives lacustres dog-friendly et des téléphériques qui acceptent les chiens gratuitement.',
    es: 'Salzburgo, Bad Ischl, Innsbruck, Mayrhofen, Velden y Bregenz: 6 ciudades austriacas por debajo de 25°C en julio con senderos alpinos sin correa, orillas lacustres dog-friendly y teleféricos que aceptan perros gratis.',
    pt: 'Salzburgo, Bad Ischl, Innsbruck, Mayrhofen, Velden e Bregenz: 6 cidades austríacas abaixo de 25°C em julho com trilhos alpinos sem trela, margens de lago dog-friendly e teleféricos que aceitam cães de graça.',
  },
  intro: {
    en: 'Austria is one of the most dog-friendly countries in Europe: dogs travel on all trains and trams, enter most restaurants and the café culture strongly welcomes them. The Alps keep every major city under 25°C in July. Six cities across five regions, from Salzburg\'s baroque centre to the Zillertal at 600m.',
    fr: "L'Autriche est l'un des pays les plus dog-friendly d'Europe : les chiens voyagent dans tous les trains et trams, entrent dans la plupart des restaurants et la culture des cafés les accueille fortement. Les Alpes maintiennent chaque grande ville sous 25°C en juillet. Six villes dans cinq régions, du centre baroque de Salzbourg au Zillertal à 600m.",
    es: 'Austria es uno de los países más dog-friendly de Europa: los perros viajan en todos los trenes y tranvías, entran en la mayoría de los restaurantes y la cultura del café los acoge ampliamente. Los Alpes mantienen cada ciudad importante por debajo de 25°C en julio. Seis ciudades en cinco regiones, desde el centro barroco de Salzburgo hasta el Zillertal a 600m.',
    pt: 'A Áustria é um dos países mais dog-friendly da Europa: os cães viajam em todos os comboios e eléctricos, entram na maioria dos restaurantes e a cultura dos cafés acolhe-os amplamente. Os Alpes mantêm cada grande cidade abaixo de 25°C em julho. Seis cidades em cinco regiões, do centro barroco de Salzburgo ao Zillertal a 600m.',
  },
  julyTemp: { en: 'July avg high', fr: 'Max moy. juillet', es: 'Máx. prom. julio', pt: 'Máx. méd. julho' },
  seeHotels: { en: 'All pet-friendly hotels', fr: 'Tous les hôtels pet-friendly', es: 'Todos los hoteles pet-friendly', pt: 'Todos os hotéis pet-friendly' },
  hotelsLabel: { en: 'Our hotel picks', fr: 'Nos hôtels recommandés', es: 'Nuestros hoteles recomendados', pt: 'Os nossos hotéis recomendados' },
  dogTipLabel: { en: 'Dog tip', fr: 'Conseil chien', es: 'Consejo para tu perro', pt: 'Dica para o seu cão' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias' },
  faq: {
    q1: { en: 'Which Austrian cities stay cool in summer?', fr: 'Quelles villes autrichiennes restent fraîches en été ?', es: '¿Qué ciudades austriacas permanecen frescas en verano?', pt: 'Que cidades austríacas se mantêm frescas no verão?' },
    a1: {
      en: 'All major Austrian cities are cooler than southern Europe, but within Austria: the coolest spots are high-altitude valley towns (Mayrhofen 21°C, Bad Ischl 22°C, Bregenz 23°C) versus Vienna (27°C) and Graz (26°C). The Tyrol and Vorarlberg are consistently the coolest provinces. The Carinthian lake district (Velden 24°C) is warmer but benefits from lake breezes. Mountain resorts above 1,000m are 6-8°C cooler than the valleys.',
      fr: "Toutes les grandes villes autrichiennes sont plus fraîches que l'Europe du Sud, mais au sein de l'Autriche : les endroits les plus frais sont les villes de fond de vallée en altitude (Mayrhofen 21°C, Bad Ischl 22°C, Bregenz 23°C) contre Vienne (27°C) et Graz (26°C). Le Tyrol et le Vorarlberg sont les provinces les plus fraîches. La région lacustre de Carinthie (Velden 24°C) est plus chaude mais bénéficie des brises du lac.",
      es: 'Todas las ciudades austriacas importantes son más frescas que el sur de Europa, pero dentro de Austria: los lugares más frescos son los pueblos de fondo de valle en altura (Mayrhofen 21°C, Bad Ischl 22°C, Bregenz 23°C) frente a Viena (27°C) y Graz (26°C). El Tirol y el Vorarlberg son las provincias más frescas.',
      pt: 'Todas as grandes cidades austríacas são mais frescas do que o sul da Europa, mas dentro da Áustria: os lugares mais frescos são as cidades de fundo de vale em altitude (Mayrhofen 21°C, Bad Ischl 22°C, Bregenz 23°C) contra Viena (27°C) e Graz (26°C). O Tirol e o Vorarlberg são as províncias mais frescas.',
    },
    q2: { en: 'Are dogs allowed on Austrian trains and public transport?', fr: 'Les chiens sont-ils autorisés dans les trains et transports en commun autrichiens ?', es: '¿Se permiten perros en los trenes y transporte público austriacos?', pt: 'São permitidos cães nos comboios e transportes públicos austríacos?' },
    a2: {
      en: 'ÖBB (Austrian Federal Railways) rules: dogs in carriers under 60x40x40 cm travel free. Dogs 60x40x40 cm and above require a half-price child\'s ticket, must be on a lead, muzzle required in long-distance trains (Railjet, Nightjet). Regional trains (R, REX): dogs on lead without muzzle. Trams and buses: dogs in carriers free, larger dogs at half-price with lead and muzzle. The Vorarlberg Cable Cars (Pfänderbahn, Lünersee, etc.): dogs free. The Zillertal railway: dogs free. Vienna U-Bahn: dogs in carriers free, larger dogs half-price with muzzle.',
      fr: "Règles ÖBB (chemins de fer fédéraux autrichiens) : chiens en panier sous 60x40x40 cm, gratuits. Chiens de plus grande taille : billet demi-tarif enfant, en laisse, muselière obligatoire dans les trains longue distance (Railjet, Nightjet). Trains régionaux (R, REX) : chiens en laisse sans muselière. Trams et bus : chiens en panier gratuits, grands chiens à demi-tarif avec laisse et muselière. Téléphériques du Vorarlberg : chiens gratuits. Chemin de fer du Zillertal : chiens gratuits.",
      es: 'Normas ÖBB (Ferrocarriles Federales Austriacos): perros en transportín bajo 60x40x40 cm, gratis. Perros de mayor tamaño: billete de niño a mitad de precio, con correa, bozal obligatorio en trenes de larga distancia (Railjet, Nightjet). Trenes regionales (R, REX): perros con correa sin bozal. Tranvías y autobuses: perros en transportín gratis, perros grandes a mitad de precio con correa y bozal.',
      pt: 'Regras ÖBB (Caminhos de Ferro Federais Austríacos): cães em caixa abaixo de 60x40x40 cm, de graça. Cães de maior tamanho: bilhete de criança a meio preço, com trela, focinheira obrigatória em comboios de longa distância (Railjet, Nightjet). Comboios regionais (R, REX): cães com trela sem focinheira. Eléctricos e autocarros: cães em caixa de graça, cães grandes a meio preço com trela e focinheira.',
    },
    q3: { en: 'Are dogs welcome in Austrian restaurants and cafés?', fr: 'Les chiens sont-ils bienvenus dans les restaurants et cafés autrichiens ?', es: '¿Son bienvenidos los perros en los restaurantes y cafés austriacos?', pt: 'Os cães são bem-vindos nos restaurantes e cafés austríacos?' },
    a3: {
      en: 'Austria is one of the most dog-welcoming countries in Europe for dining. Vienna coffee houses (Kaffeehäuser): dogs welcome inside almost universally, it is a centuries-old tradition. Alpine Gasthäuser and Hütten: dogs welcome inside with the owner\'s agreement, rarely refused. Beer gardens (Biergärten): dogs almost universally accepted. Restaurants: the Austrian food hygiene law (LMH 2006) leaves the decision to the owner, and dog refusals are uncommon except in fine dining and large hotel restaurants. Terraces: no restriction.',
      fr: "L'Autriche est l'un des pays les plus accueillants d'Europe pour les chiens dans les restaurants. Les cafés viennois (Kaffeehäuser) : chiens bienvenus à l'intérieur presque universellement, c'est une tradition séculaire. Gasthäuser et Hütten alpins : chiens bienvenus à l'intérieur avec l'accord du patron, rarement refusés. Brasseries (Biergärten) : chiens presque universellement acceptés. La loi autrichienne sur l'hygiène alimentaire laisse la décision au patron.",
      es: 'Austria es uno de los países más acogedores de Europa para los perros en restaurantes. Cafés vieneses (Kaffeehäuser): perros bienvenidos dentro casi universalmente, es una tradición secular. Gasthäuser y Hütten alpinos: perros bienvenidos dentro con el acuerdo del propietario, raramente rechazados. Cervecerías (Biergärten): perros casi universalmente aceptados. La ley austriaca de higiene alimentaria deja la decisión al propietario.',
      pt: 'A Áustria é um dos países mais acolhedores da Europa para cães em restaurantes. Cafés vienenses (Kaffeehäuser): cães bem-vindos no interior quase universalmente, é uma tradição secular. Gasthäuser e Hütten alpinos: cães bem-vindos no interior com o acordo do proprietário, raramente recusados. Cervejarias (Biergärten): cães quase universalmente aceites.',
    },
    q4: { en: 'Are dogs allowed in Austrian National Parks?', fr: 'Les chiens sont-ils autorisés dans les parcs nationaux autrichiens ?', es: '¿Se permiten perros en los parques nacionales austriacos?', pt: 'São permitidos cães nos parques nacionais austríacos?' },
    a4: {
      en: 'Austria has 6 national parks. Hohe Tauern (largest, across Tyrol, Salzburg and Carinthia): dogs allowed on marked trails on a lead, off-lead in the outer zones. Gesäuse (Styria): dogs on lead on all marked trails. Kalkalpen (Upper Austria): dogs on lead. Donau-Auen (Lower Austria): dogs on lead on marked paths. Thayatal and Neusiedler See: dogs on lead. In practice, the outer buffer zones (Vorzone) of each park allow dogs off-lead. Cable car access points to the parks (like the Glockner High Alpine Road) accept dogs.',
      fr: "L'Autriche a 6 parcs nationaux. Hohe Tauern (le plus grand, sur le Tyrol, Salzbourg et la Carinthie) : chiens autorisés sur les sentiers balisés en laisse, sans laisse dans les zones extérieures. Gesäuse (Styrie) : chiens en laisse sur tous les sentiers balisés. Kalkalpen (Haute-Autriche) : chiens en laisse. Dans la pratique, les zones tampons extérieures (Vorzone) de chaque parc autorisent les chiens sans laisse.",
      es: 'Austria tiene 6 parques nacionales. Hohe Tauern (el mayor, abarcando Tirol, Salzburgo y Carintia): perros permitidos en senderos marcados con correa, sin correa en las zonas exteriores. Gesäuse (Estiria): perros con correa en todos los senderos marcados. En la práctica, las zonas de amortiguación exteriores (Vorzone) de cada parque permiten perros sin correa.',
      pt: 'A Áustria tem 6 parques nacionais. Hohe Tauern (o maior, abrangendo Tirol, Salzburgo e Caríntia): cães permitidos em trilhos marcados com trela, sem trela nas zonas exteriores. Gesäuse (Estíria): cães com trela em todos os trilhos marcados. Na prática, as zonas tampão exteriores (Vorzone) de cada parque permitem cães sem trela.',
    },
    q5: { en: 'Do Austrian cable cars accept dogs?', fr: 'Les téléphériques autrichiens acceptent-ils les chiens ?', es: '¿Los teleféricos austriacos aceptan perros?', pt: 'Os teleféricos austríacos aceitam cães?' },
    a5: {
      en: 'Most Austrian cable cars (Seilbahnen) accept dogs, and many accept them for free. The standard rule is: dogs in a carrier travel at child rate or free; dogs larger than a carrier travel at child rate and require a lead. Confirmed free: Nordkettenbahn (Innsbruck), Pfänderbahn (Bregenz), Ahornbahn (Mayrhofen), Mönchsberg lift (Salzburg). Confirmed with lead at child rate: Hahnenkammbahn (Kitzbühel), Patscherkofelbahn (Innsbruck). Always check the operator\'s website as rules change seasonally. Dogs are never accepted on gondola lifts designed for skiers during ski season.',
      fr: "La plupart des téléphériques autrichiens (Seilbahnen) acceptent les chiens, et beaucoup les acceptent gratuitement. La règle standard est : les chiens en panier voyagent au tarif enfant ou gratuit ; les chiens plus grands que le panier voyagent au tarif enfant avec laisse obligatoire. Confirmés gratuits : Nordkettenbahn (Innsbruck), Pfänderbahn (Bregenz), Ahornbahn (Mayrhofen), ascenseur du Mönchsberg (Salzbourg). Toujours vérifier sur le site de l'opérateur.",
      es: 'La mayoría de los teleféricos austriacos (Seilbahnen) aceptan perros, y muchos los aceptan gratis. La regla estándar es: los perros en transportín viajan a tarifa infantil o gratis; los perros más grandes que el transportín viajan a tarifa infantil con correa obligatoria. Confirmados gratis: Nordkettenbahn (Innsbruck), Pfänderbahn (Bregenz), Ahornbahn (Mayrhofen), ascensor del Mönchsberg (Salzburgo). Siempre verificar en el sitio web del operador.',
      pt: 'A maioria dos teleféricos austríacos (Seilbahnen) aceita cães, e muitos aceitam-nos de graça. A regra padrão é: cães em caixa viajam a tarifa de criança ou de graça; cães maiores que a caixa viajam a tarifa de criança com trela obrigatória. Confirmados de graça: Nordkettenbahn (Innsbruck), Pfänderbahn (Bregenz), Ahornbahn (Mayrhofen), elevador do Mönchsberg (Salzburgo). Verifique sempre no site do operador.',
    },
  },
}

const p = (o: L4, locale: string) =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : o.en

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  return {
    title: `${p(T.metaTitle, locale)} | HotelsWithPets.com`,
    description: p(T.metaDesc, locale),
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/guides/${SLUG}`])),
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

export default async function AutricheFraicheChienPage({ params }: { params: Promise<{ locale: string }> }) {
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
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-red-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🇦🇹 {locale === 'fr' ? 'Salzbourg · Tyrol · Carinthie · Vorarlberg' : locale === 'es' ? 'Salzburgo · Tirol · Carintia · Vorarlberg' : locale === 'pt' ? 'Salzburgo · Tirol · Caríntia · Vorarlberg' : 'Salzburg · Tyrol · Carinthia · Vorarlberg'}
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
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 text-red-700 text-sm font-black flex items-center justify-center">
                            {cityIndex}
                          </div>
                          <div>
                            <h3 className="text-xl font-extrabold text-gray-900">{city.name}</h3>
                            <p className="text-xs text-gray-500">{p(city.region, locale)}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl font-black text-blue-600">{city.julyTemp}°C</div>
                          <div className="text-xs text-gray-400">{p(T.julyTemp, locale)}</div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                        {p(city.tag, locale)}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{p(city.why, locale)}</p>

                      <div className="flex items-start gap-2 bg-green-50 rounded-xl px-3 py-2 mb-5">
                        <span className="text-green-600 text-xs font-bold uppercase tracking-wide flex-shrink-0 mt-0.5">🐾 {p(T.dogTipLabel, locale)}</span>
                        <p className="text-green-800 text-xs leading-relaxed">{p(city.dogTip, locale)}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{p(T.hotelsLabel, locale)}</p>
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
                        href={buildAllezDestLink(city.name, 'Austria', `${CAMPAIGN}-${city.slug}`, 3)}
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
                  <span aria-hidden="true" className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
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
