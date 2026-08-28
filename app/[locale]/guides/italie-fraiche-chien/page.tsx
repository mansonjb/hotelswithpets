import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'italie-fraiche-chien'
const CAMPAIGN = 'italie-fraiche'

type L4 = { en: string; fr: string; es: string; pt: string; de: string; nl: string; it: string }
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
    id: 'alto-adige',
    emoji: '🏔️',
    title: { en: 'South Tyrol', fr: 'Haut-Adige (Tyrol du Sud)', es: 'Alto Adigio (Tirol del Sur)', pt: 'Alto Ádige (Tirol do Sul)', de: 'Südtirol', nl: 'Zuid-Tirol', it: `Alto Adige` },
    cities: [
      {
        slug: 'bolzano',
        name: 'Bolzano',
        region: { en: 'South Tyrol', fr: 'Haut-Adige', es: 'Alto Adigio', pt: 'Alto Ádige', de: 'Südtirol', nl: 'Zuid-Tirol', it: `Alto Adige` },
        julyTemp: 24,
        tag: { en: 'Dolomites gateway · bilingual', fr: 'Porte des Dolomites · bilingue', es: 'Puerta de los Dolomitas · bilingüe', pt: 'Porta das Dolomitas · bilingue', de: 'Tor zu den Dolomiten · zweisprachig', nl: 'Poort naar de Dolomieten · tweetalig', it: `Porta delle Dolomiti · bilingue` },
        why: {
          en: 'Bolzano sits at 262m in the Isarco valley, 8°C cooler than Rome in July despite being further south. The Talvera riverside park (4 km, off-lead on the gravel banks) is the city\'s dog social hub. Piazza Walther terraces universally accept dogs. The South Tyrolean wine road starts 10 km south: vineyard trails at 400-600m, shaded and cool. Austria-style dog culture: dogs in shops, cable cars, mountain huts.',
          fr: "Bolzano est à 262m dans la vallée de l'Isarco, 8°C plus frais que Rome en juillet malgré une latitude plus au sud. Le parc fluvial Talvera (4 km, sans laisse sur les berges de gravier) est le hub social canin de la ville. Les terrasses de la Piazza Walther acceptent unanimement les chiens. La route des vins du Haut-Adige commence à 10 km : sentiers de vignobles à 400-600m, ombragés et frais. Culture canine à l'autrichienne : chiens dans les boutiques, téléphériques et refuges de montagne.",
          es: 'Bolzano se encuentra a 262m en el valle del Isarco, 8°C más fresco que Roma en julio a pesar de estar más al sur. El parque fluvial Talvera (4 km, sin correa en las orillas de grava) es el hub social canino de la ciudad. Las terrazas de la Piazza Walther aceptan perros sin excepción. La ruta del vino del Alto Adigio empieza a 10 km: senderos de viñedos a 400-600m, sombreados y frescos.',
          pt: 'Bolzano fica a 262m no vale do Isarco, 8°C mais fresca do que Roma em julho apesar de estar mais a sul. O parque fluvial Talvera (4 km, sem trela nas margens de cascalho) é o hub social canino da cidade. As esplanadas da Piazza Walther aceitam cães universalmente. A rota dos vinhos do Alto Ádige começa a 10 km: trilhos de vinha a 400-600m, ensombrados e frescos.',
          de: 'Bozen liegt auf 262m im Eisacktal, im Juli 8°C kühler als Rom, obwohl es weiter südlich liegt. Der Flusspark Talvera (4 km, ohne Leine auf den Kiesufern) ist der soziale Treffpunkt für Hunde in der Stadt. Die Terrassen am Piazza Walther heißen Hunde ausnahmslos willkommen. Die Südtiroler Weinstraße beginnt 10 km südlich: Weinbergwege auf 400-600m, schattig und kühl. Hundekultur nach österreichischem Vorbild: Hunde in Geschäften, Seilbahnen und Berghütten erlaubt.',
          nl: 'Bolzano ligt op 262m in het Isarcodal, in juli 8°C koeler dan Rome, ook al ligt het verder naar het zuiden. Het rivierpark Talvera (4 km, los van de lijn op de grindoevers) is de sociale ontmoetingsplek voor honden in de stad. De terrassen aan de Piazza Walther verwelkomen honden zonder uitzondering. De Zuid-Tiroolse wijnroute begint 10 km zuidelijker: wijngaardpaden op 400-600m, schaduwrijk en koel. Hondencultuur naar Oostenrijks voorbeeld: je hond mag mee winkelen, de kabelbaan in en berghutten binnen.', it: `Bolzano si trova a 262m nella valle dell'Isarco, 8°C più fresca di Roma a luglio nonostante sia più a sud. Il parco fluviale Talvera (4 km, il tuo cane può stare libero dal guinzaglio sulle rive di ghiaia) è il punto di ritrovo canino della città. Le terrazze di Piazza Walther accettano i cani senza eccezioni. La strada del vino dell'Alto Adige inizia a 10 km a sud: sentieri tra i vigneti a 400-600m, ombreggiati e freschi. Cultura del cane in stile austriaco: cani ammessi nei negozi, sulle funivie e nei rifugi di montagna.`,
        },
        dogTip: {
          en: 'Cable car to Colle (1,200m): dogs accepted in the gondola, summit meadows off-lead, 12°C in July while the city hits 24°C.',
          fr: 'Téléphérique vers le Colle (1 200m) : chiens acceptés dans la cabine, prairies sommitales sans laisse, 12°C en juillet pendant que la ville atteint 24°C.',
          es: 'Teleférico al Colle (1.200m): perros aceptados en la cabina, prados cumbres sin correa, 12°C en julio mientras la ciudad alcanza los 24°C.',
          pt: 'Teleférico para o Colle (1.200m): cães aceites na cabine, prados do cume sem trela, 12°C em julho enquanto a cidade atinge 24°C.',
          de: 'Seilbahn zum Kohlern (1.200m): Hunde in der Gondel erlaubt, Almwiesen am Gipfel ohne Leine, 12°C im Juli, während die Stadt 24°C erreicht.',
          nl: 'Kabelbaan naar Kohlern (1.200m): je hond mag mee de gondel in, alpenweiden op de top los van de lijn, 12°C in juli terwijl de stad 24°C haalt.', it: `Funivia per il Colle (1.200m): i cani sono ammessi in cabina, prati in vetta liberi dal guinzaglio, 12°C a luglio mentre la città arriva a 24°C.`,
        },
        hotels: [
          {
            name: 'Parkhotel Laurin',
            stars: 5,
            note: { en: 'Historic Art Nouveau villa with garden, central location, small pets accepted.', fr: 'Villa Art Nouveau historique avec jardin, emplacement central, petits animaux acceptés.', es: 'Villa histórica Art Nouveau con jardín, ubicación central, mascotas pequeñas aceptadas.', pt: 'Vila Art Nouveau histórica com jardim, localização central, animais pequenos aceites.', de: 'Historische Jugendstilvilla mit Garten, zentrale Lage, kleine Haustiere erlaubt.', nl: 'Historische art-nouveauvilla met tuin, centrale ligging, kleine huisdieren toegestaan.', it: `Storica villa Art Nouveau con giardino, posizione centrale, animali di piccola taglia accettati.` },
          },
          {
            name: 'Hotel Greif',
            stars: 4,
            note: { en: 'Design hotel directly on Piazza Walther, each room is a unique artwork, dogs under 15 kg welcome.', fr: 'Hôtel design directement sur la Piazza Walther, chaque chambre est une oeuvre d\'art unique, chiens sous 15 kg bienvenus.', es: 'Hotel de diseño directamente en la Piazza Walther, cada habitación es una obra de arte única, perros menores de 15 kg bienvenidos.', pt: 'Hotel de design diretamente na Piazza Walther, cada quarto é uma obra de arte única, cães abaixo de 15 kg bem-vindos.', de: 'Designhotel direkt am Piazza Walther, jedes Zimmer ist ein einzigartiges Kunstwerk, Hunde unter 15 kg willkommen.', nl: 'Designhotel direct aan de Piazza Walther, elke kamer is een uniek kunstwerk, honden onder 15 kg welkom.', it: `Hotel di design proprio su Piazza Walther, ogni camera è un'opera d'arte unica, cani sotto i 15 kg benvenuti.` },
          },
          {
            name: 'Stadt Hotel Città',
            stars: 4,
            note: { en: 'Central hotel with rooftop terrace overlooking the Dolomites, pets accepted up to 20 kg.', fr: 'Hôtel central avec terrasse panoramique sur les Dolomites, animaux acceptés jusqu\'à 20 kg.', es: 'Hotel central con terraza panorámica con vistas a los Dolomitas, mascotas aceptadas hasta 20 kg.', pt: 'Hotel central com terraço panorâmico com vista para as Dolomitas, animais aceites até 20 kg.', de: 'Zentrales Hotel mit Dachterrasse mit Blick auf die Dolomiten, Haustiere bis 20 kg erlaubt.', nl: 'Centraal hotel met dakterras met uitzicht op de Dolomieten, huisdieren tot 20 kg toegestaan.', it: `Hotel centrale con terrazza panoramica sulle Dolomiti, animali accettati fino a 20 kg.` },
          },
        ],
      },
      {
        slug: 'merano',
        name: 'Merano',
        region: { en: 'South Tyrol', fr: 'Haut-Adige', es: 'Alto Adigio', pt: 'Alto Ádige', de: 'Südtirol', nl: 'Zuid-Tirol', it: `Alto Adige` },
        julyTemp: 23,
        tag: { en: 'Spa town · Tappeiner promenade', fr: 'Ville thermale · promenade Tappeiner', es: 'Ciudad termal · paseo Tappeiner', pt: 'Cidade termal · passeio Tappeiner', de: 'Kurstadt · Tappeinerpromenade', nl: 'Kuuroord · Tappeinerpromenade', it: `Città termale · passeggiata Tappeiner` },
        why: {
          en: 'Merano is a thermal spa town encircled by 3,000m peaks that block summer heat. July average of 23°C. The Tappeiner promenade (3 km cliff path at 350m) is the most famous dog walk in northern Italy: entirely off-lead, carved into the rock face above the city, shaded by chestnut trees, views to the Ortles glacier. Merano 2000 ski resort (cable car from city) is open for hiking in summer: dogs free.',
          fr: "Merano est une ville thermale encerclée de sommets à 3 000m qui bloquent la chaleur estivale. Moyenne de 23°C en juillet. La promenade Tappeiner (3 km de chemin de falaise à 350m) est la plus célèbre balade canine du nord de l'Italie : entièrement sans laisse, taillée dans la paroi rocheuse au-dessus de la ville, ombragée de châtaigniers, vue sur le glacier de l'Ortles. Le domaine skiable Merano 2000 (téléphérique depuis la ville) est ouvert pour la randonnée en été : chiens gratuits.",
          es: 'Merano es una ciudad termal rodeada de cimas de 3.000m que bloquean el calor estival. Media de 23°C en julio. El paseo Tappeiner (3 km de camino de acantilado a 350m) es el paseo canino más famoso del norte de Italia: totalmente sin correa, tallado en la pared rocosa sobre la ciudad, sombreado por castaños, vistas al glaciar de Ortles.',
          pt: 'Merano é uma cidade termal rodeada de cumes a 3.000m que bloqueiam o calor estival. Média de 23°C em julho. O passeio Tappeiner (3 km de caminho de falésia a 350m) é o passeio canino mais famoso do norte de Itália: totalmente sem trela, talhado na parede rochosa acima da cidade, ensombrado por castanheiros, vistas para o glaciar Ortles.',
          de: 'Meran ist eine Kurstadt, umgeben von 3.000m hohen Gipfeln, die die Sommerhitze abhalten. Julidurchschnitt: 23°C. Die Tappeinerpromenade (3 km Klippenweg auf 350m) ist der bekannteste Hundespaziergang Norditaliens: vollständig ohne Leine, in die Felswand über der Stadt gehauen, von Kastanienbäumen beschattet, mit Blick auf den Ortlergletscher. Das Skigebiet Meran 2000 (Seilbahn ab der Stadt) ist im Sommer zum Wandern geöffnet: Hunde kostenlos.',
          nl: 'Meran is een kuuroord, omringd door 3.000m hoge toppen die de zomerhitte tegenhouden. Gemiddelde in juli: 23°C. De Tappeinerpromenade (3 km klifpad op 350m) is de bekendste hondenwandeling van Noord-Italië: helemaal los van de lijn, uitgehouwen in de rotswand boven de stad, beschaduwd door kastanjebomen, met uitzicht op de Ortlergletsjer. Het skigebied Meran 2000 (kabelbaan vanaf de stad) is in de zomer open om te wandelen: honden gratis mee.', it: `Merano è una città termale circondata da vette di 3.000m che bloccano il caldo estivo. Media di 23°C a luglio. La passeggiata Tappeiner (3 km di sentiero scavato nella roccia a 350m) è la passeggiata per cani più famosa del nord Italia: interamente libera dal guinzaglio, scavata nella parete rocciosa sopra la città, ombreggiata dai castagni, con vista sul ghiacciaio dell'Ortles. Il comprensorio sciistico di Merano 2000 (funivia dalla città) è aperto per le escursioni in estate: i cani entrano gratis.`,
        },
        dogTip: {
          en: 'Gîo Park (Gilfpromenade): riverside park below the Tappeiner, off-lead year-round, river pools for dogs to swim in, free entry.',
          fr: 'Gîo Park (Gilfpromenade) : parc fluvial en contrebas du Tappeiner, sans laisse toute l\'année, piscines naturelles pour que les chiens se baignent, entrée gratuite.',
          es: 'Gîo Park (Gilfpromenade): parque fluvial bajo el Tappeiner, sin correa todo el año, piscinas naturales para que los perros naden, entrada gratuita.',
          pt: 'Gîo Park (Gilfpromenade): parque fluvial abaixo do Tappeiner, sem trela durante todo o ano, piscinas naturais para os cães nadarem, entrada gratuita.',
          de: 'Gîo Park (Gilfpromenade): Flusspark unterhalb des Tappeinerwegs, das ganze Jahr über ohne Leine, Flusstümpel zum Schwimmen für Hunde, freier Eintritt.',
          nl: 'Gîo Park (Gilfpromenade): rivierpark onder de Tappeinerweg, het hele jaar door los van de lijn, riviertjes waar je hond kan zwemmen, gratis toegang.', it: `Gîo Park (Gilfpromenade): parco fluviale sotto il Tappeiner, libero dal guinzaglio tutto l'anno, pozze del fiume dove il tuo cane può nuotare, ingresso gratuito.`,
        },
        hotels: [
          {
            name: 'Hotel Terme Merano',
            stars: 4,
            note: { en: 'Connected to the thermal baths complex, large park, dogs accepted up to 15 kg.', fr: 'Connecté au complexe thermal, grand parc, chiens acceptés jusqu\'à 15 kg.', es: 'Conectado al complejo termal, gran parque, perros aceptados hasta 15 kg.', pt: 'Ligado ao complexo termal, grande parque, cães aceites até 15 kg.', de: 'An die Therme angeschlossen, großer Park, Hunde bis 15 kg erlaubt.', nl: 'Verbonden met het thermencomplex, groot park, honden tot 15 kg toegestaan.', it: `Collegato al complesso termale, grande parco, cani accettati fino a 15 kg.` },
          },
          {
            name: 'Hotel Castel Rundegg',
            stars: 4,
            note: { en: 'Historic castle-hotel surrounded by a private garden above the city, near Tappeiner, dogs welcome.', fr: 'Hôtel-château historique entouré d\'un jardin privé au-dessus de la ville, près du Tappeiner, chiens bienvenus.', es: 'Hotel-castillo histórico rodeado de jardín privado sobre la ciudad, cerca del Tappeiner, perros bienvenidos.', pt: 'Hotel-castelo histórico rodeado por jardim privado acima da cidade, perto do Tappeiner, cães bem-vindos.', de: 'Historisches Schlosshotel, umgeben von einem privaten Garten über der Stadt, nahe der Tappeinerpromenade, Hunde willkommen.', nl: 'Historisch kasteelhotel omringd door een privétuin boven de stad, dicht bij de Tappeinerpromenade, honden welkom.', it: `Storico hotel castello circondato da un giardino privato sopra la città, vicino al Tappeiner, cani benvenuti.` },
          },
          {
            name: 'Hotel Ottmanngut',
            stars: 4,
            note: { en: 'Boutique hotel in an Art Nouveau villa with pool, 5 min walk to Tappeiner, pets accepted.', fr: 'Hôtel boutique dans une villa Art Nouveau avec piscine, 5 min à pied du Tappeiner, animaux acceptés.', es: 'Hotel boutique en una villa Art Nouveau con piscina, a 5 min a pie del Tappeiner, mascotas aceptadas.', pt: 'Hotel boutique numa vila Art Nouveau com piscina, 5 min a pé do Tappeiner, animais aceites.', de: 'Boutique-Hotel in einer Jugendstilvilla mit Pool, 5 Gehminuten zur Tappeinerpromenade, Haustiere erlaubt.', nl: 'Boetiekhotel in een art-nouveauvilla met zwembad, 5 minuten lopen van de Tappeinerpromenade, huisdieren toegestaan.', it: `Hotel boutique in una villa Art Nouveau con piscina, 5 minuti a piedi dal Tappeiner, animali accettati.` },
          },
        ],
      },
    ],
  },
  {
    id: 'val-daosta',
    emoji: '🏔️',
    title: { en: "Aosta Valley", fr: "Vallée d'Aoste", es: 'Valle de Aosta', pt: "Vale de Aosta", de: 'Aostatal', nl: 'Aostavallei', it: `Valle d'Aosta` },
    cities: [
      {
        slug: 'aoste',
        name: 'Aoste',
        region: { en: "Aosta Valley", fr: "Vallée d'Aoste", es: 'Valle de Aosta', pt: "Vale de Aosta", de: 'Aostatal', nl: 'Aostavallei', it: `Valle d'Aosta` },
        julyTemp: 22,
        tag: { en: 'Roman ruins · Mont Blanc gateway', fr: 'Ruines romaines · porte du Mont Blanc', es: 'Ruinas romanas · puerta del Mont Blanc', pt: 'Ruínas romanas · porta do Mont Blanc', de: 'Römische Ruinen · Tor zum Mont Blanc', nl: 'Romeinse ruïnes · poort naar de Mont Blanc', it: `Rovine romane · porta del Monte Bianco` },
        why: {
          en: "Aosta sits at 583m in Italy's highest and smallest region, 22°C in July while Turin swelters at 30°C. The city centre is a remarkably intact Roman town: amphitheatre, triumphal arch, forum, all outdoor and dog-friendly. The Gran Paradiso National Park (Italy's first, 60 km of dog trails above 2,000m) is 45 min from the city. The main valley cycle path runs 74 km to Martigny in Switzerland, almost entirely flat and off-lead.",
          fr: "Aoste est à 583m dans la région la plus haute et la plus petite d'Italie, 22°C en juillet pendant que Turin suffoque à 30°C. Le centre-ville est une ville romaine remarquablement intacte : amphithéâtre, arc de triomphe, forum, tous en plein air et dog-friendly. Le Parc National du Grand Paradis (le premier d'Italie, 60 km de sentiers canins au-dessus de 2 000m) est à 45 min. La piste cyclable de la vallée principale fait 74 km jusqu'à Martigny en Suisse, presque entièrement plate et sans laisse.",
          es: 'Aosta se encuentra a 583m en la región más alta y pequeña de Italia, 22°C en julio mientras Turín se asfixia a 30°C. El centro histórico es una ciudad romana notablemente intacta: anfiteatro, arco de triunfo, foro, todos al aire libre y dog-friendly. El Parque Nacional Gran Paradiso (el primero de Italia, 60 km de senderos para perros por encima de 2.000m) está a 45 min.',
          pt: 'Aosta fica a 583m na região mais alta e mais pequena de Itália, 22°C em julho enquanto Turim sufoca a 30°C. O centro histórico é uma cidade romana notavelmente intacta: anfiteatro, arco do triunfo, fórum, todos ao ar livre e dog-friendly. O Parque Nacional Gran Paradiso (o primeiro de Itália, 60 km de trilhos para cães acima de 2.000m) fica a 45 min.',
          de: 'Aosta liegt auf 583m in Italiens höchster und kleinster Region, 22°C im Juli, während Turin bei 30°C schwitzt. Die Altstadt ist eine bemerkenswert gut erhaltene Römerstadt: Amphitheater, Triumphbogen, Forum, alles im Freien und hundefreundlich. Der Nationalpark Gran Paradiso (Italiens erster, 60 km Hundewege über 2.000m) liegt 45 Fahrminuten entfernt. Der Radweg durch das Haupttal führt 74 km bis Martigny in der Schweiz, fast durchgehend flach und ohne Leine.',
          nl: 'Aosta ligt op 583m in Italië\'s hoogste en kleinste regio, 22°C in juli terwijl Turijn zweet bij 30°C. Het centrum is een opvallend goed bewaarde Romeinse stad: amfitheater, triomfboog, forum, alles buiten en hondvriendelijk. Het Nationaal Park Gran Paradiso (Italië\'s eerste, 60 km hondenpaden boven 2.000m) ligt 45 rijminuten verderop. Het fietspad door het hoofddal loopt 74 km tot Martigny in Zwitserland, bijna helemaal vlak en los van de lijn.', it: `Aosta si trova a 583m, nella regione più alta e più piccola d'Italia, 22°C a luglio mentre Torino soffoca a 30°C. Il centro città è una città romana sorprendentemente intatta: anfiteatro, arco di trionfo, foro, tutto all'aperto e a misura di cane. Il Parco Nazionale del Gran Paradiso (il primo d'Italia, 60 km di sentieri per cani oltre i 2.000m) è a 45 minuti dalla città. La pista ciclabile della valle principale corre per 74 km fino a Martigny in Svizzera, quasi interamente piatta e libera dal guinzaglio.`,
        },
        dogTip: {
          en: 'Gran Paradiso National Park, Valsavarenche valley: park at Dégioz hamlet (1,537m) and walk to Pont (1,960m) through ibex country. Dogs on lead in the park but the valley floor is uncrowded and spectacular.',
          fr: "Parc National du Grand Paradis, vallée de Valsavarenche : garez-vous au hameau de Dégioz (1 537m) et marchez jusqu'à Pont (1 960m) dans le pays des bouquetins. Chiens en laisse dans le parc mais le fond de vallée est désert et spectaculaire.",
          es: 'Parque Nacional Gran Paradiso, valle de Valsavarenche: aparca en el caserío de Dégioz (1.537m) y camina hasta Pont (1.960m) por el territorio del íbice. Perros con correa en el parque pero el fondo del valle está despejado y es espectacular.',
          pt: 'Parque Nacional Gran Paradiso, vale de Valsavarenche: estacionar na aldeia de Dégioz (1.537m) e caminhar até Pont (1.960m) pelo território do íbice. Cães com trela no parque mas o fundo do vale está deserto e é espetacular.',
          de: 'Nationalpark Gran Paradiso, Valsavarenche-Tal: Parken beim Weiler Dégioz (1.537m) und Wanderung bis Pont (1.960m) durch Steinbock-Gebiet. Im Park gilt Leinenpflicht, aber der Talboden ist menschenleer und spektakulär.',
          nl: 'Nationaal Park Gran Paradiso, Valsavarenche-dal: parkeer bij het gehucht Dégioz (1.537m) en wandel naar Pont (1.960m) door steenbokgebied. In het park moet je hond aangelijnd, maar de vallei zelf is uitgestorven en spectaculair.', it: `Parco Nazionale del Gran Paradiso, valle di Valsavarenche: parcheggia alla frazione di Dégioz (1.537m) e cammina fino a Pont (1.960m) nel territorio degli stambecchi. Guinzaglio obbligatorio nel parco ma il fondovalle è poco frequentato e spettacolare.`,
        },
        hotels: [
          {
            name: 'Hotel Milleluci',
            stars: 4,
            note: { en: 'Hilltop hotel with panoramic views of Aosta and the Alps, garden, dogs accepted.', fr: 'Hôtel en hauteur avec vue panoramique sur Aoste et les Alpes, jardin, chiens acceptés.', es: 'Hotel en altura con vistas panorámicas de Aosta y los Alpes, jardín, perros aceptados.', pt: 'Hotel no alto com vistas panorâmicas de Aosta e dos Alpes, jardim, cães aceites.', de: 'Hotel auf einem Hügel mit Panoramablick auf Aosta und die Alpen, Garten, Hunde erlaubt.', nl: 'Hotel op een heuvel met panoramisch uitzicht op Aosta en de Alpen, tuin, honden toegestaan.', it: `Hotel in collina con vista panoramica su Aosta e le Alpi, giardino, cani accettati.` },
          },
          {
            name: 'Hotel Europe',
            stars: 4,
            note: { en: 'Central hotel 5 min walk from the Roman arch, modern rooms, pets welcome up to 20 kg.', fr: 'Hôtel central à 5 min à pied de l\'arc romain, chambres modernes, animaux bienvenus jusqu\'à 20 kg.', es: 'Hotel central a 5 min del arco romano, habitaciones modernas, mascotas bienvenidas hasta 20 kg.', pt: 'Hotel central a 5 min do arco romano, quartos modernos, animais bem-vindos até 20 kg.', de: 'Zentrales Hotel, 5 Gehminuten vom Römerbogen entfernt, moderne Zimmer, Haustiere bis 20 kg willkommen.', nl: 'Centraal hotel, 5 minuten lopen van de Romeinse boog, moderne kamers, huisdieren tot 20 kg welkom.', it: `Hotel centrale a 5 minuti a piedi dall'arco romano, camere moderne, animali benvenuti fino a 20 kg.` },
          },
          {
            name: 'Le Massif Hotel',
            stars: 4,
            note: { en: 'Mountain-style hotel with spa, ideal base for Gran Paradiso hikes, dogs accepted.', fr: 'Hôtel style montagne avec spa, base idéale pour les randonnées du Grand Paradis, chiens acceptés.', es: 'Hotel estilo montaña con spa, base ideal para las rutas del Gran Paradiso, perros aceptados.', pt: 'Hotel estilo montanha com spa, base ideal para as caminhadas do Gran Paradiso, cães aceites.', de: 'Hotel im Bergstil mit Spa, idealer Ausgangspunkt für Wanderungen im Gran Paradiso, Hunde erlaubt.', nl: 'Hotel in bergstijl met spa, ideale uitvalsbasis voor wandelingen in de Gran Paradiso, honden toegestaan.', it: `Hotel in stile montano con spa, base ideale per le escursioni nel Gran Paradiso, cani accettati.` },
          },
        ],
      },
    ],
  },
  {
    id: 'trentino',
    emoji: '🌿',
    title: { en: 'Trentino', fr: 'Trentin', es: 'Trentino', pt: 'Trentino', de: 'Trentino', nl: 'Trentino', it: `Trentino` },
    cities: [
      {
        slug: 'trento',
        name: 'Trento',
        region: { en: 'Trentino', fr: 'Trentin', es: 'Trentino', pt: 'Trentino', de: 'Trentino', nl: 'Trentino', it: `Trentino` },
        julyTemp: 26,
        tag: { en: 'Alpine university city · wine region', fr: 'Ville universitaire alpine · région viticole', es: 'Ciudad universitaria alpina · región vinícola', pt: 'Cidade universitária alpina · região vinícola', de: 'Alpine Universitätsstadt · Weinregion', nl: 'Alpiene universiteitsstad · wijnstreek', it: `Città universitaria alpina · zona vinicola` },
        why: {
          en: 'Trento lies in a steep-sided valley that channels cool mountain air down from the Brenta Dolomites, staying at 26°C while Verona 60 km south hits 32°C. The city has a dedicated off-lead dog park in the centro storico (Parco delle Albere) and a dog beach on the Adige river. The Trentino wine road (Teroldego, Nosiola, Gewurztraminer) has cellar doors that all welcome dogs in the tasting room.',
          fr: "Trento est dans une vallée encaissée qui canalise l'air frais des Dolomites de Brenta, tenant à 26°C pendant que Vérone 60 km plus au sud atteint 32°C. La ville dispose d'un parc canin sans laisse dans le centro storico (Parco delle Albere) et d'une plage pour chiens sur l'Adige. La route des vins du Trentin (Teroldego, Nosiola, Gewurztraminer) a des caves qui accueillent toutes les chiens en dégustation.",
          es: 'Trento está en un valle de laderas empinadas que canaliza aire fresco de las Dolomitas de Brenta, manteniéndose a 26°C mientras Verona, 60 km al sur, llega a 32°C. La ciudad tiene un parque canino sin correa en el centro histórico (Parco delle Albere) y una playa para perros en el Adigio.',
          pt: 'Trento fica num vale de encostas íngremes que canaliza ar fresco das Dolomitas de Brenta, mantendo-se a 26°C enquanto Verona, 60 km a sul, atinge 32°C. A cidade tem um parque canino sem trela no centro histórico (Parco delle Albere) e uma praia para cães no rio Adige.',
          de: 'Trient liegt in einem steilen Tal, das kühle Bergluft aus den Brenta-Dolomiten herableitet, und bleibt bei 26°C, während Verona 60 km südlich 32°C erreicht. Die Stadt hat einen eigenen Hundepark ohne Leinenpflicht in der Altstadt (Parco delle Albere) und einen Hundestrand am Etsch-Fluss. An der Trentiner Weinstraße (Teroldego, Nosiola, Gewürztraminer) heißen alle Weinkeller Hunde im Verkostungsraum willkommen.',
          nl: 'Trento ligt in een steil dal dat koele berglucht uit de Brenta-Dolomieten naar beneden leidt, en blijft op 26°C terwijl Verona, 60 km zuidelijker, 32°C haalt. De stad heeft een eigen hondenpark zonder aanlijnplicht in het historische centrum (Parco delle Albere) en een hondenstrand aan de Adige-rivier. Langs de Trentijnse wijnroute (Teroldego, Nosiola, Gewürztraminer) heten alle wijnkelders je hond welkom in de proeflokalen.', it: `Trento si trova in una valle stretta che convoglia l'aria fresca di montagna dalle Dolomiti di Brenta, restando a 26°C mentre Verona, 60 km a sud, arriva a 32°C. La città ha un'area cani libera dedicata nel centro storico (Parco delle Albere) e una spiaggia per cani sull'Adige. La strada del vino del Trentino (Teroldego, Nosiola, Gewürztraminer) ha cantine che accolgono tutte i cani nella sala degustazione.`,
        },
        dogTip: {
          en: 'Monte Bondone (15 min by cable car from the city): plateau at 1,700m, off-lead everywhere, 14°C when Trento is at 26°C, and alpine flowers in July.',
          fr: 'Monte Bondone (15 min en téléphérique depuis la ville) : plateau à 1 700m, sans laisse partout, 14°C quand Trento est à 26°C, et fleurs alpines en juillet.',
          es: 'Monte Bondone (15 min en teleférico desde la ciudad): meseta a 1.700m, sin correa en todas partes, 14°C cuando Trento está a 26°C, y flores alpinas en julio.',
          pt: 'Monte Bondone (15 min de teleférico desde a cidade): planalto a 1.700m, sem trela em todo o lado, 14°C quando Trento está a 26°C, e flores alpinas em julho.',
          de: 'Monte Bondone (15 Minuten mit der Seilbahn ab der Stadt): Hochebene auf 1.700m, überall ohne Leine, 14°C, während Trient bei 26°C liegt, und Alpenblumen im Juli.',
          nl: 'Monte Bondone (15 minuten met de kabelbaan vanaf de stad): hoogvlakte op 1.700m, overal los van de lijn, 14°C terwijl Trento op 26°C zit, en alpenbloemen in juli.', it: `Monte Bondone (15 minuti in funivia dalla città): altopiano a 1.700m, libero dal guinzaglio ovunque, 14°C mentre Trento è a 26°C, e fiori alpini a luglio.`,
        },
        hotels: [
          {
            name: 'Grand Hotel Trento',
            stars: 4,
            note: { en: 'Historic palazzo on Piazza Dante, elegant rooms, dogs accepted up to 15 kg.', fr: 'Palazzo historique sur la Piazza Dante, chambres élégantes, chiens acceptés jusqu\'à 15 kg.', es: 'Histórico palazzo en la Piazza Dante, habitaciones elegantes, perros aceptados hasta 15 kg.', pt: 'Palazzo histórico na Piazza Dante, quartos elegantes, cães aceites até 15 kg.', de: 'Historischer Palazzo am Piazza Dante, elegante Zimmer, Hunde bis 15 kg erlaubt.', nl: 'Historisch palazzo aan de Piazza Dante, elegante kamers, honden tot 15 kg toegestaan.', it: `Storico palazzo su Piazza Dante, camere eleganti, cani accettati fino a 15 kg.` },
          },
          {
            name: 'Hotel Buonconsiglio',
            stars: 4,
            note: { en: 'Steps from the Castello del Buonconsiglio, quiet location, pet-friendly rooms available.', fr: 'À deux pas du Castello del Buonconsiglio, emplacement calme, chambres pet-friendly disponibles.', es: 'A dos pasos del Castello del Buonconsiglio, ubicación tranquila, habitaciones pet-friendly disponibles.', pt: 'A dois passos do Castello del Buonconsiglio, localização tranquila, quartos pet-friendly disponíveis.', de: 'Nur wenige Schritte vom Castello del Buonconsiglio entfernt, ruhige Lage, haustierfreundliche Zimmer verfügbar.', nl: 'Op een steenworp afstand van het Castello del Buonconsiglio, rustige ligging, huisdiervriendelijke kamers beschikbaar.', it: `A due passi dal Castello del Buonconsiglio, posizione tranquilla, camere pet-friendly disponibili.` },
          },
          {
            name: 'NH Trento',
            stars: 4,
            note: { en: 'Modern hotel near the MUSE science museum and Parco delle Albere dog park, pets welcome.', fr: 'Hôtel moderne près du musée MUSE et du parc canin Parco delle Albere, animaux bienvenus.', es: 'Hotel moderno cerca del museo MUSE y el parque canino Parco delle Albere, mascotas bienvenidas.', pt: 'Hotel moderno perto do museu MUSE e do parque canino Parco delle Albere, animais bem-vindos.', de: 'Modernes Hotel nahe dem Wissenschaftsmuseum MUSE und dem Hundepark Parco delle Albere, Haustiere willkommen.', nl: 'Modern hotel bij het wetenschapsmuseum MUSE en het hondenpark Parco delle Albere, huisdieren welkom.', it: `Hotel moderno vicino al museo di scienze MUSE e all'area cani Parco delle Albere, animali benvenuti.` },
          },
        ],
      },
      {
        slug: 'riva-del-garda',
        name: 'Riva del Garda',
        region: { en: 'Trentino', fr: 'Trentin', es: 'Trentino', pt: 'Trentino', de: 'Trentino', nl: 'Trentino', it: `Trentino` },
        julyTemp: 25,
        tag: { en: "Northern Lake Garda · wind-cooled", fr: 'Nord du lac de Garde · refroidi par le vent', es: 'Norte del lago de Garda · refrigerado por el viento', pt: 'Norte do lago de Garda · arrefecido pelo vento', de: 'Nördlicher Gardasee · windgekühlt', nl: 'Noordelijke Gardameer · windgekoeld', it: `Nord del lago di Garda · rinfrescato dal vento` },
        why: {
          en: 'Riva del Garda sits at the northern tip of Lake Garda, enclosed by 2,000m cliffs that channel the Ora afternoon wind: a reliable 25-30 km/h breeze every day from noon, dropping the felt temperature by 5-6°C. The lakeside promenade is dog-friendly its full length. The Ponale road (historic mule track carved into the cliff, 7 km) is off-lead. Dogs can ride the ferries to Limone and Malcesine (small supplement).',
          fr: "Riva del Garda se trouve à la pointe nord du lac de Garde, encerclée de falaises à 2 000m qui canalisent le vent Ora l'après-midi : une brise de 25-30 km/h chaque jour à partir de midi, qui baisse la température ressentie de 5-6°C. La promenade lacustre est dog-friendly sur toute sa longueur. La route du Ponale (chemin muletier historique taillé dans la falaise, 7 km) est sans laisse. Les chiens peuvent prendre les ferries vers Limone et Malcesine (petit supplément).",
          es: 'Riva del Garda se encuentra en el extremo norte del lago de Garda, encerrada por acantilados de 2.000m que canalizan el viento Ora por la tarde: una brisa de 25-30 km/h cada día desde el mediodía, que reduce la temperatura sensible en 5-6°C. El paseo lacustre es dog-friendly en toda su longitud. La carretera del Ponale (camino de mulas tallado en el acantilado, 7 km) es sin correa.',
          pt: 'Riva del Garda fica na ponta norte do lago de Garda, rodeada de falésias de 2.000m que canalizam o vento Ora à tarde: uma brisa de 25-30 km/h todos os dias a partir do meio-dia, reduzindo a temperatura sentida em 5-6°C. O passeio lacustre é dog-friendly em toda a sua extensão. A estrada do Ponale (caminho de mulas histórico talhado na falésia, 7 km) é sem trela.',
          de: 'Riva del Garda liegt an der Nordspitze des Gardasees, umgeben von 2.000m hohen Klippen, die den Nachmittagswind Ora kanalisieren: eine zuverlässige Brise von 25-30 km/h täglich ab Mittag, die die gefühlte Temperatur um 5-6°C senkt. Die Uferpromenade ist auf ihrer gesamten Länge hundefreundlich. Die Ponale-Straße (historischer, in die Klippe gehauener Saumpfad, 7 km) ist ohne Leine begehbar. Hunde dürfen mit den Fähren nach Limone und Malcesine fahren (kleiner Aufpreis).',
          nl: 'Riva del Garda ligt aan de noordpunt van het Gardameer, omgeven door 2.000m hoge kliffen die de middagwind Ora kanaliseren: elke dag vanaf de middag een betrouwbare bries van 25-30 km/u, die de gevoelstemperatuur met 5-6°C verlaagt. De oeverpromenade is over de hele lengte hondvriendelijk. De Ponale-weg (historisch, in de klif uitgehouwen muilezelpad, 7 km) mag je hond los van de lijn. Honden mogen mee op de veerboten naar Limone en Malcesine (kleine toeslag).', it: `Riva del Garda si trova all'estremità nord del lago di Garda, racchiusa da pareti rocciose di 2.000m che incanalano il vento pomeridiano Ora: una brezza affidabile di 25-30 km/h ogni giorno da mezzogiorno, che abbassa la temperatura percepita di 5-6°C. La passeggiata lungolago è a misura di cane per tutta la sua lunghezza. La strada del Ponale (antica mulattiera scavata nella roccia, 7 km) è libera dal guinzaglio. I cani possono salire sui traghetti per Limone e Malcesine (piccolo supplemento).`,
        },
        dogTip: {
          en: 'Varone waterfall gorge (3 km from Riva): dogs off-lead on the canyon path, spray keeps the temperature at 15°C even in August, entirely free.',
          fr: 'Gorges de la cascade de Varone (3 km de Riva) : chiens sans laisse sur le chemin du canyon, les embruns maintiennent la température à 15°C même en août, entièrement gratuit.',
          es: 'Cascada de Varone (3 km de Riva): perros sin correa en el camino del cañón, el spray mantiene la temperatura a 15°C incluso en agosto, totalmente gratuito.',
          pt: 'Cascata de Varone (3 km de Riva): cães sem trela no caminho do cânion, o spray mantém a temperatura a 15°C mesmo em agosto, totalmente gratuito.',
          de: 'Wasserfallschlucht von Varone (3 km von Riva): Hunde ohne Leine auf dem Schluchtweg, die Gischt hält die Temperatur selbst im August bei 15°C, komplett kostenlos.',
          nl: 'Watervalkloof van Varone (3 km van Riva): je hond los van de lijn op het kloofpad, de nevel houdt de temperatuur zelfs in augustus op 15°C, helemaal gratis.', it: `Gola della cascata di Varone (3 km da Riva): cani liberi dal guinzaglio sul sentiero del canyon, gli spruzzi mantengono la temperatura a 15°C anche ad agosto, ingresso completamente gratuito.`,
        },
        hotels: [
          {
            name: 'Lido Palace',
            stars: 5,
            note: { en: 'Belle Époque palace directly on the lake with private beach, small pets accepted.', fr: 'Palais Belle Époque directement sur le lac avec plage privée, petits animaux acceptés.', es: 'Palacio Belle Époque directamente sobre el lago con playa privada, mascotas pequeñas aceptadas.', pt: 'Palácio Belle Époque diretamente no lago com praia privada, animais pequenos aceites.', de: 'Belle-Époque-Palast direkt am See mit Privatstrand, kleine Haustiere erlaubt.', nl: 'Belle-époquepaleis direct aan het meer met privéstrand, kleine huisdieren toegestaan.', it: `Palazzo Belle Époque proprio sul lago con spiaggia privata, animali di piccola taglia accettati.` },
          },
          {
            name: 'Hotel du Lac et du Parc',
            stars: 4,
            note: { en: 'Large resort with private park, lakefront position, dogs welcome up to 20 kg.', fr: 'Grand resort avec parc privé, position en bord de lac, chiens bienvenus jusqu\'à 20 kg.', es: 'Gran resort con parque privado, posición frente al lago, perros bienvenidos hasta 20 kg.', pt: 'Grande resort com parque privado, posição à beira do lago, cães bem-vindos até 20 kg.', de: 'Großes Resort mit privatem Park, Lage direkt am See, Hunde bis 20 kg willkommen.', nl: 'Groot resort met privépark, ligging direct aan het meer, honden tot 20 kg welkom.', it: `Grande resort con parco privato, posizione fronte lago, cani benvenuti fino a 20 kg.` },
          },
          {
            name: 'Hotel Centrale',
            stars: 3,
            note: { en: 'Affordable central hotel 100m from the lake, dogs accepted, ideal base for Ponale trail.', fr: 'Hôtel central abordable à 100m du lac, chiens acceptés, base idéale pour le sentier du Ponale.', es: 'Hotel central asequible a 100m del lago, perros aceptados, base ideal para el sendero del Ponale.', pt: 'Hotel central acessível a 100m do lago, cães aceites, base ideal para o trilho do Ponale.', de: 'Preiswertes zentrales Hotel, 100m vom See entfernt, Hunde erlaubt, idealer Ausgangspunkt für den Ponale-Weg.', nl: 'Betaalbaar centraal hotel, 100m van het meer, honden toegestaan, ideale uitvalsbasis voor het Ponale-pad.', it: `Hotel centrale ed economico a 100m dal lago, cani accettati, base ideale per il sentiero del Ponale.` },
          },
        ],
      },
    ],
  },
  {
    id: 'lacs-alpins',
    emoji: '💧',
    title: { en: 'Alpine Lakes', fr: 'Lacs alpins', es: 'Lagos alpinos', pt: 'Lagos alpinos', de: 'Alpenseen', nl: 'Alpenmeren', it: `Laghi alpini` },
    cities: [
      {
        slug: 'come',
        name: 'Côme',
        region: { en: 'Lake Como', fr: 'Lac de Côme', es: 'Lago de Como', pt: 'Lago de Como', de: 'Comer See', nl: 'Comomeer', it: `Lago di Como` },
        julyTemp: 25,
        tag: { en: 'Lake Como · ferry-hopping · villas', fr: 'Lac de Côme · ferries · villas', es: 'Lago de Como · ferries · villas', pt: 'Lago de Como · ferries · vilas', de: 'Comer See · Fährenhopping · Villen', nl: 'Comomeer · van veer naar veer · villa\'s', it: `Lago di Como · di traghetto in traghetto · ville` },
        why: {
          en: 'Lake Como has a microclimate moderated by 50 km of water and surrounding pre-Alps: 25°C in July when Milan 45 km south hits 33°C. The lake breezes are consistent from 10am. The Como city promenade accepts dogs its full length. Ferries to Bellagio, Varenna, and Tremezzo (45 min) all accept dogs at no charge. The lakeside trails between villages (sentiero del Viandante: 45 km, partially off-lead) are well-marked and shaded.',
          fr: "Le lac de Côme bénéficie d'un microclimat tempéré par 50 km d'eau et les Préalpes environnantes : 25°C en juillet quand Milan 45 km plus au sud atteint 33°C. Les brises lacustres sont constantes à partir de 10h. La promenade de Como accepte les chiens sur toute sa longueur. Les ferries vers Bellagio, Varenna et Tremezzo (45 min) acceptent tous les chiens sans supplément. Les sentiers lacustres entre villages (sentiero del Viandante : 45 km, partiellement sans laisse) sont bien balisés et ombragés.",
          es: 'El lago de Como tiene un microclima moderado por 50 km de agua y los Prealpes circundantes: 25°C en julio cuando Milán, a 45 km al sur, llega a 33°C. Las brisas lacustres son constantes a partir de las 10h. El paseo de Como acepta perros en toda su extensión. Los ferries a Bellagio, Varenna y Tremezzo (45 min) aceptan perros sin cargo adicional.',
          pt: 'O lago de Como tem um microclima moderado por 50 km de água e os Pré-Alpes circundantes: 25°C em julho quando Milão, a 45 km a sul, atinge 33°C. As brisas lacustres são constantes a partir das 10h. O passeio de Como aceita cães em toda a sua extensão. Os ferries para Bellagio, Varenna e Tremezzo (45 min) aceitam cães sem suplemento.',
          de: 'Der Comer See hat ein Mikroklima, das durch 50 km Wasserfläche und die umliegenden Voralpen gemildert wird: 25°C im Juli, während Mailand 45 km südlich 33°C erreicht. Die Seebrisen sind ab 10 Uhr beständig. Die Uferpromenade von Como akzeptiert Hunde auf ihrer gesamten Länge. Die Fähren nach Bellagio, Varenna und Tremezzo (45 Min.) nehmen alle Hunde kostenlos mit. Die Uferwege zwischen den Dörfern (Sentiero del Viandante: 45 km, teilweise ohne Leine) sind gut markiert und schattig.',
          nl: 'Het Comomeer heeft een microklimaat dat wordt getemperd door 50 km water en de omringende Voor-Alpen: 25°C in juli, terwijl Milaan, 45 km zuidelijker, 33°C haalt. De meerbriesjes zijn vanaf 10 uur constant. De oeverpromenade van Como accepteert honden over de hele lengte. De veerboten naar Bellagio, Varenna en Tremezzo (45 min) nemen alle honden gratis mee. De oeverpaden tussen de dorpen (Sentiero del Viandante: 45 km, deels los van de lijn) zijn goed gemarkeerd en schaduwrijk.', it: `Il lago di Como ha un microclima mitigato da 50 km d'acqua e dalle Prealpi circostanti: 25°C a luglio quando Milano, 45 km a sud, arriva a 33°C. Le brezze del lago sono costanti dalle 10 del mattino. La passeggiata di Como accetta i cani per tutta la sua lunghezza. I traghetti per Bellagio, Varenna e Tremezzo (45 minuti) accettano tutti i cani gratuitamente. I sentieri lungolago tra i paesi (sentiero del Viandante: 45 km, in parte libero dal guinzaglio) sono ben segnalati e ombreggiati.`,
        },
        dogTip: {
          en: 'Sentiero del Viandante, Varenna to Bellano (5 km): medieval pilgrim path above the lake at 400m, mostly off-lead, lake views the entire route, no cars.',
          fr: 'Sentiero del Viandante, Varenna à Bellano (5 km) : chemin médiéval de pèlerinage au-dessus du lac à 400m, majoritairement sans laisse, vue sur le lac sur tout le parcours, sans voitures.',
          es: 'Sentiero del Viandante, Varenna a Bellano (5 km): camino de peregrinación medieval sobre el lago a 400m, mayormente sin correa, vistas al lago en toda la ruta, sin coches.',
          pt: 'Sentiero del Viandante, Varenna a Bellano (5 km): caminho medieval de peregrinação acima do lago a 400m, maioritariamente sem trela, vistas para o lago em toda a rota, sem carros.',
          de: 'Sentiero del Viandante, Varenna bis Bellano (5 km): mittelalterlicher Pilgerweg über dem See auf 400m, größtenteils ohne Leine, auf der gesamten Strecke Seeblick, autofrei.',
          nl: 'Sentiero del Viandante, Varenna tot Bellano (5 km): middeleeuws pelgrimspad boven het meer op 400m, grotendeels los van de lijn, de hele route uitzicht op het meer, autovrij.', it: `Sentiero del Viandante, da Varenna a Bellano (5 km): antico cammino di pellegrinaggio sopra il lago a 400m, per lo più libero dal guinzaglio, vista sul lago per tutto il percorso, niente auto.`,
        },
        hotels: [
          {
            name: 'Grand Hotel Tremezzo',
            stars: 5,
            note: { en: 'Iconic lakefront palace with floating pool, private dock, small pets accepted.', fr: 'Palais iconique en bord de lac avec piscine flottante, ponton privé, petits animaux acceptés.', es: 'Icónico palacio frente al lago con piscina flotante, embarcadero privado, mascotas pequeñas aceptadas.', pt: 'Icónico palácio à beira do lago com piscina flutuante, cais privado, animais pequenos aceites.', de: 'Ikonischer Palast am Seeufer mit schwimmendem Pool, privatem Steg, kleine Haustiere erlaubt.', nl: 'Iconisch paleis aan de oever met drijvend zwembad, privésteiger, kleine huisdieren toegestaan.', it: `Iconico palazzo fronte lago con piscina galleggiante, pontile privato, animali di piccola taglia accettati.` },
          },
          {
            name: 'Hotel Barchetta Excelsior',
            stars: 4,
            note: { en: 'Central Como hotel with lake-view terrace, 2 min walk to the ferry, dogs under 10 kg welcome.', fr: 'Hôtel central de Como avec terrasse vue lac, 2 min à pied du ferry, chiens sous 10 kg bienvenus.', es: 'Hotel central de Como con terraza con vistas al lago, a 2 min del ferry, perros menores de 10 kg bienvenidos.', pt: 'Hotel central de Como com terraço com vista para o lago, 2 min a pé do ferry, cães abaixo de 10 kg bem-vindos.', de: 'Zentrales Hotel in Como mit Terrasse und Seeblick, 2 Gehminuten zur Fähre, Hunde unter 10 kg willkommen.', nl: 'Centraal hotel in Como met terras en uitzicht op het meer, 2 minuten lopen van de veerboot, honden onder 10 kg welkom.', it: `Hotel centrale di Como con terrazza vista lago, 2 minuti a piedi dal traghetto, cani sotto i 10 kg benvenuti.` },
          },
          {
            name: 'Hotel Terminus Como',
            stars: 4,
            note: { en: 'Belle Époque hotel on the lakefront promenade, walking distance to the ferry dock, pets accepted.', fr: 'Hôtel Belle Époque sur la promenade lacustre, à pied du quai du ferry, animaux acceptés.', es: 'Hotel Belle Époque en el paseo lacustre, a pie del embarcadero del ferry, mascotas aceptadas.', pt: 'Hotel Belle Époque no passeio lacustre, a pé do cais do ferry, animais aceites.', de: 'Belle-Époque-Hotel an der Uferpromenade, fußläufig zum Fähranleger, Haustiere erlaubt.', nl: 'Belle-époquehotel aan de oeverpromenade, lopend bereikbaar vanaf de veerbootsteiger, huisdieren toegestaan.', it: `Hotel Belle Époque sulla passeggiata lungolago, a pochi passi dal molo dei traghetti, animali accettati.` },
          },
        ],
      },
    ],
  },
  {
    id: 'ligurie',
    emoji: '🌊',
    title: { en: 'Liguria', fr: 'Ligurie', es: 'Liguria', pt: 'Ligúria', de: 'Ligurien', nl: 'Ligurië', it: `Liguria` },
    cities: [
      {
        slug: 'genes',
        name: 'Gênes',
        region: { en: 'Liguria', fr: 'Ligurie', es: 'Liguria', pt: 'Ligúria', de: 'Ligurien', nl: 'Ligurië', it: `Liguria` },
        julyTemp: 25,
        tag: { en: 'Maritime republic · Caruggi · Ligurian sea', fr: 'République maritime · Caruggi · mer Ligure', es: 'República marítima · Caruggi · mar de Liguria', pt: 'República marítima · Caruggi · mar da Ligúria', de: 'Seefahrerrepublik · Caruggi · Ligurisches Meer', nl: 'Zeevarende republiek · caruggi · Ligurische Zee', it: `Repubblica marinara · caruggi · mar Ligure` },
        why: {
          en: "Genoa is Italy's best-kept dog secret: 25°C in July thanks to consistent sea breezes from the Ligurian Sea, and arguably Europe's most dog-permissive urban culture. The caruggi (medieval alleyways of the old town, UNESCO World Heritage) are entirely pedestrian and dogs roam freely. The Nervi district (7 km east) has a famous cliff promenade above the sea, entirely off-lead. Ligurian restaurants: it is customary for dogs to sit under the table, no questions asked.",
          fr: "Gênes est le secret canin le mieux gardé d'Italie : 25°C en juillet grâce à des brises maritimes constantes de la mer Ligure, et probablement la culture urbaine la plus permissive d'Europe pour les chiens. Les caruggi (ruelles médiévales de la vieille ville, Patrimoine UNESCO) sont entièrement piétonnes et les chiens y circulent librement. Le quartier de Nervi (7 km à l'est) a une célèbre promenade en corniche au-dessus de la mer, entièrement sans laisse. Restaurants liguriens : il est d'usage que les chiens s'assoient sous la table, sans question.",
          es: 'Génova es el secreto canino más guardado de Italia: 25°C en julio gracias a las brisas marinas constantes del mar de Liguria, y probablemente la cultura urbana más permisiva de Europa para los perros. Los caruggi (callejuelas medievales del casco antiguo, Patrimonio UNESCO) son totalmente peatonales y los perros circulan libremente. El barrio de Nervi (7 km al este) tiene un famoso paseo de cornisa sobre el mar, totalmente sin correa.',
          pt: "Génova é o segredo canino mais bem guardado de Itália: 25°C em julho graças às brisas marítimas constantes do mar da Ligúria, e provavelmente a cultura urbana mais permissiva da Europa para cães. Os caruggi (vielas medievais da cidade velha, Património UNESCO) são totalmente pedonais e os cães circulam livremente. O bairro de Nervi (7 km a leste) tem um famoso passeio de cornija acima do mar, totalmente sem trela.",
          de: 'Genua ist Italiens bestgehütetes Hundegeheimnis: 25°C im Juli dank beständiger Brisen vom Ligurischen Meer, und wohl die hundefreundlichste Stadtkultur Europas. Die Caruggi (mittelalterliche Gassen der Altstadt, UNESCO-Weltkulturerbe) sind vollständig autofrei und Hunde bewegen sich dort frei. Das Viertel Nervi (7 km östlich) hat eine berühmte Klippenpromenade über dem Meer, vollständig ohne Leine. In ligurischen Restaurants ist es üblich, dass Hunde ohne Nachfrage unter dem Tisch liegen.',
          nl: 'Genua is Italië\'s best bewaarde hondengeheim: 25°C in juli dankzij constante briesjes vanaf de Ligurische Zee, en waarschijnlijk de meest hondvriendelijke stadscultuur van Europa. De caruggi (middeleeuwse steegjes van de oude stad, UNESCO-werelderfgoed) zijn volledig autovrij en je hond mag er vrij rondlopen. De wijk Nervi (7 km oostelijk) heeft een beroemde klifpromenade boven zee, helemaal los van de lijn. In Ligurische restaurants is het gewoon dat honden zonder te vragen onder de tafel liggen.', it: `Genova è il segreto canino meglio custodito d'Italia: 25°C a luglio grazie alle brezze marine costanti del mar Ligure, e probabilmente la cultura urbana più permissiva d'Europa verso i cani. I caruggi (i vicoli medievali del centro storico, patrimonio UNESCO) sono interamente pedonali e i cani girano liberamente. Il quartiere di Nervi (7 km a est) ha una famosa passeggiata a strapiombo sul mare, interamente libera dal guinzaglio. Nei ristoranti liguri è normale che il cane stia sotto il tavolo, senza fare domande.`,
        },
        dogTip: {
          en: 'Passeggiata di Nervi: 2 km cliff walk above the sea between Nervi and Bogliasco, entirely off-lead, rocks to jump on, dogs in the sea allowed at the ends of the promenade.',
          fr: 'Passeggiata di Nervi : 2 km de promenade en corniche au-dessus de la mer entre Nervi et Bogliasco, entièrement sans laisse, rochers à escalader, chiens dans la mer autorisés aux extrémités de la promenade.',
          es: 'Passeggiata di Nervi: 2 km de paseo de cornisa sobre el mar entre Nervi y Bogliasco, totalmente sin correa, rocas para saltar, perros en el mar permitidos en los extremos del paseo.',
          pt: 'Passeggiata di Nervi: 2 km de passeio de cornija acima do mar entre Nervi e Bogliasco, totalmente sem trela, rochas para saltar, cães no mar permitidos nas extremidades do passeio.',
          de: 'Passeggiata di Nervi: 2 km Klippenweg über dem Meer zwischen Nervi und Bogliasco, vollständig ohne Leine, Felsen zum Herumklettern, Hunde dürfen an den Enden der Promenade ins Meer.',
          nl: 'Passeggiata di Nervi: 2 km klifpad boven zee tussen Nervi en Bogliasco, helemaal los van de lijn, rotsen om op te klimmen, je hond mag aan de uiteinden van de promenade de zee in.', it: `Passeggiata di Nervi: 2 km di cammino a strapiombo sul mare tra Nervi e Bogliasco, interamente libero dal guinzaglio, scogli su cui saltare, il tuo cane può fare il bagno in mare alle estremità della passeggiata.`,
        },
        hotels: [
          {
            name: 'Grand Hotel Savoia',
            stars: 5,
            note: { en: 'Historic grand hotel facing the port and Piazza Principe station, small pets accepted.', fr: 'Grand hôtel historique face au port et à la gare Piazza Principe, petits animaux acceptés.', es: 'Histórico gran hotel frente al puerto y la estación Piazza Principe, mascotas pequeñas aceptadas.', pt: 'Grande hotel histórico em frente ao porto e à estação Piazza Principe, animais pequenos aceites.', de: 'Historisches Grand Hotel gegenüber dem Hafen und dem Bahnhof Piazza Principe, kleine Haustiere erlaubt.', nl: 'Historisch grand hotel tegenover de haven en het station Piazza Principe, kleine huisdieren toegestaan.', it: `Storico grand hotel di fronte al porto e alla stazione di Piazza Principe, animali di piccola taglia accettati.` },
          },
          {
            name: 'Hotel Bentley Genova',
            stars: 4,
            note: { en: 'Boutique hotel in the Nervi district, sea views, 5 min walk to the Passeggiata, dogs welcome.', fr: 'Hôtel boutique dans le quartier Nervi, vue mer, 5 min à pied de la Passeggiata, chiens bienvenus.', es: 'Hotel boutique en el barrio Nervi, vistas al mar, a 5 min a pie de la Passeggiata, perros bienvenidos.', pt: 'Hotel boutique no bairro Nervi, vistas para o mar, 5 min a pé da Passeggiata, cães bem-vindos.', de: 'Boutique-Hotel im Viertel Nervi, Meerblick, 5 Gehminuten zur Passeggiata, Hunde willkommen.', nl: 'Boetiekhotel in de wijk Nervi, uitzicht op zee, 5 minuten lopen van de Passeggiata, honden welkom.', it: `Hotel boutique nel quartiere di Nervi, vista mare, 5 minuti a piedi dalla Passeggiata, cani benvenuti.` },
          },
          {
            name: 'NH Collection Genova',
            stars: 4,
            note: { en: 'Modern hotel in the old port area, walking distance to the caruggi, pets up to 20 kg accepted.', fr: 'Hôtel moderne dans la zone du vieux port, à pied des caruggi, animaux jusqu\'à 20 kg acceptés.', es: 'Hotel moderno en la zona del puerto viejo, a pie de los caruggi, mascotas hasta 20 kg aceptadas.', pt: 'Hotel moderno na zona do porto velho, a pé dos caruggi, animais até 20 kg aceites.', de: 'Modernes Hotel im alten Hafenviertel, fußläufig zu den Caruggi, Haustiere bis 20 kg erlaubt.', nl: 'Modern hotel in de oude havenwijk, lopend bereikbaar naar de caruggi, huisdieren tot 20 kg toegestaan.', it: `Hotel moderno nella zona del porto antico, a pochi passi dai caruggi, animali fino a 20 kg accettati.` },
          },
        ],
      },
    ],
  },
]

const T = {
  title: {
    en: 'Best Cities to Escape the Heat in Italy with Your Dog (2026)',
    fr: 'Meilleures villes pour éviter la chaleur en Italie avec son chien (2026)',
    es: 'Mejores ciudades para evitar el calor en Italia con tu perro (2026)',
    pt: 'Melhores cidades para evitar o calor em Itália com o seu cão (2026)',
    de: 'Die besten Städte, um mit Ihrem Hund der Hitze in Italien zu entkommen (2026)',
    nl: 'De beste steden om met je hond aan de hitte in Italië te ontsnappen (2026)', it: `Le migliori città per sfuggire al caldo in Italia con il tuo cane (2026)`,
  },
  metaTitle: {
    en: 'Cool Italy with Your Dog: 7 Cities Under 26°C in July (2026)',
    fr: 'Italie fraîche avec son chien : 7 villes sous 26°C en juillet (2026)',
    es: 'Italia fresca con tu perro: 7 ciudades con menos de 26°C en julio (2026)',
    pt: 'Itália fresca com o seu cão: 7 cidades abaixo de 26°C em julho (2026)',
    de: 'Kühles Italien mit Hund: 7 Städte unter 26°C im Juli (2026)',
    nl: 'Koel Italië met je hond: 7 steden onder 26°C in juli (2026)', it: `Italia fresca con il tuo cane: 7 città sotto i 26°C a luglio (2026)`,
  },
  metaDesc: {
    en: 'While Rome hits 34°C and Naples 33°C, northern Italy stays cool. Bolzano, Merano, Aosta, Trento, Riva del Garda, Lake Como, Genoa: 7 dog-friendly cities under 26°C in July with hotel picks.',
    fr: "Pendant que Rome atteint 34°C et Naples 33°C, le nord de l'Italie reste frais. Bolzano, Merano, Aoste, Trento, Riva del Garda, lac de Côme, Gênes : 7 villes dog-friendly sous 26°C en juillet avec sélection d'hôtels.",
    es: 'Mientras Roma alcanza los 34°C y Nápoles los 33°C, el norte de Italia se mantiene fresco. Bolzano, Merano, Aosta, Trento, Riva del Garda, lago de Como, Génova: 7 ciudades dog-friendly con menos de 26°C en julio.',
    pt: 'Enquanto Roma atinge 34°C e Nápoles 33°C, o norte de Itália mantém-se fresco. Bolzano, Merano, Aosta, Trento, Riva del Garda, lago de Como, Génova: 7 cidades dog-friendly abaixo de 26°C em julho.',
    de: 'Während Rom 34°C und Neapel 33°C erreichen, bleibt Norditalien kühl. Bozen, Meran, Aosta, Trient, Riva del Garda, Comer See, Genua: 7 hundefreundliche Städte unter 26°C im Juli mit Hotelempfehlungen.',
    nl: 'Terwijl Rome 34°C en Napels 33°C halen, blijft Noord-Italië koel. Bolzano, Meran, Aosta, Trento, Riva del Garda, Comomeer, Genua: 7 hondvriendelijke steden onder 26°C in juli met hoteltips.', it: `Mentre Roma arriva a 34°C e Napoli a 33°C, il nord Italia resta fresco. Bolzano, Merano, Aosta, Trento, Riva del Garda, lago di Como, Genova: 7 città a misura di cane sotto i 26°C a luglio, con hotel selezionati.`,
  },
  intro: {
    en: 'Rome, Naples and Florence hit 33-36°C in July. But northern Italy (the Alps, pre-Alps, and Ligurian coast) stays at 22-26°C, cooled by altitude, lake breezes, and mountain winds. These 7 cities let you spend a genuinely Italian holiday without overheating your dog.',
    fr: "Rome, Naples et Florence atteignent 33-36°C en juillet. Mais le nord de l'Italie (Alpes, Préalpes, côte ligure) reste à 22-26°C, refroidi par l'altitude, les brises lacustres et les vents de montagne. Ces 7 villes permettent de passer des vacances vraiment italiennes sans surchauffer son chien.",
    es: 'Roma, Nápoles y Florencia alcanzan los 33-36°C en julio. Pero el norte de Italia (Alpes, Prealpes y costa ligur) se mantiene a 22-26°C, refrescado por la altitud, las brisas lacustres y los vientos de montaña. Estas 7 ciudades permiten pasar unas vacaciones genuinamente italianas sin que tu perro se recaliente.',
    pt: 'Roma, Nápoles e Florença atingem 33-36°C em julho. Mas o norte de Itália (Alpes, Pré-Alpes e costa da Ligúria) mantém-se a 22-26°C, arrefecido pela altitude, brisas lacustres e ventos de montanha. Estas 7 cidades permitem passar umas férias genuinamente italianas sem sobreaquecer o seu cão.',
    de: 'Rom, Neapel und Florenz erreichen im Juli 33-36°C. Norditalien (die Alpen, Voralpen und die ligurische Küste) bleibt jedoch bei 22-26°C, gekühlt durch Höhenlage, Seebrisen und Bergwinde. In diesen 7 Städten verbringen Sie einen waschechten italienischen Urlaub, ohne dass Ihr Hund überhitzt.',
    nl: 'Rome, Napels en Florence halen in juli 33-36°C. Noord-Italië (de Alpen, Voor-Alpen en de Ligurische kust) blijft echter op 22-26°C, gekoeld door hoogte, meerbriesjes en bergwinden. In deze 7 steden breng je een echte Italiaanse vakantie door zonder dat je hond oververhit raakt.', it: `Roma, Napoli e Firenze arrivano a 33-36°C a luglio. Ma il nord Italia (le Alpi, le Prealpi e la costa ligure) resta a 22-26°C, rinfrescato dall'altitudine, dalle brezze dei laghi e dai venti di montagna. Queste 7 città ti permettono di vivere una vacanza davvero italiana senza far surriscaldare il tuo cane.`,
  },
  julyTemp: { en: 'July avg high', fr: 'Max moy. juillet', es: 'Máx. prom. julio', pt: 'Máx. méd. julho', de: 'Julihöchstwert Ø', nl: 'Gem. max. juli', it: `Max. media luglio` },
  seeHotels: { en: 'All pet-friendly hotels', fr: 'Tous les hôtels pet-friendly', es: 'Todos los hoteles pet-friendly', pt: 'Todos os hotéis pet-friendly', de: 'Alle haustierfreundlichen Hotels', nl: 'Alle huisdiervriendelijke hotels', it: `Tutti gli hotel pet-friendly` },
  hotelsLabel: { en: 'Our hotel picks', fr: 'Nos hôtels recommandés', es: 'Nuestros hoteles recomendados', pt: 'Os nossos hotéis recomendados', de: 'Unsere Hotelempfehlungen', nl: 'Onze hotelkeuzes', it: `I nostri hotel consigliati` },
  dogTipLabel: { en: 'Dog tip', fr: 'Conseil chien', es: 'Consejo para tu perro', pt: 'Dica para o seu cão', de: 'Hundetipp', nl: 'Hondentip', it: `Consiglio per il cane` },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início', de: 'Startseite', nl: 'Home', it: `Home` },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias', de: 'Ratgeber', nl: 'Gidsen', it: `Guide` },
  faq: {
    q1: { en: 'Which Italian cities stay cool in summer?', fr: 'Quelles villes italiennes restent fraîches en été ?', es: '¿Qué ciudades italianas permanecen frescas en verano?', pt: 'Que cidades italianas se mantêm frescas no verão?', de: 'Welche italienischen Städte bleiben im Sommer kühl?', nl: 'Welke Italiaanse steden blijven koel in de zomer?', it: `Quali città italiane restano fresche in estate?` },
    a1: {
      en: 'The coolest cities in Italy in July are in the Alpine foothills and pre-Alps: Merano (23°C), Aosta (22°C), Bolzano (24°C), Trento (26°C). Lake cities benefit from water microclimate: Como and Riva del Garda stay at 25°C while Milan reaches 33°C. Genoa is the coolest coastal city at 25°C due to Ligurian sea breezes. Rome, Florence, Naples, and Sicily regularly hit 34-38°C in July.',
      fr: "Les villes italiennes les plus fraîches en juillet se trouvent dans les contreforts alpins et préalpins : Merano (23°C), Aoste (22°C), Bolzano (24°C), Trento (26°C). Les villes lacustres bénéficient du microclimat de l'eau : Côme et Riva del Garda restent à 25°C pendant que Milan atteint 33°C. Gênes est la ville côtière la plus fraîche à 25°C grâce aux brises de la mer Ligure. Rome, Florence, Naples et la Sicile atteignent régulièrement 34-38°C en juillet.",
      es: 'Las ciudades italianas más frescas en julio están en las estribaciones alpinas y prealps: Merano (23°C), Aosta (22°C), Bolzano (24°C), Trento (26°C). Las ciudades lacustres se benefician del microclima del agua: Como y Riva del Garda se mantienen a 25°C mientras Milán alcanza los 33°C. Génova es la ciudad costera más fresca a 25°C gracias a las brisas del mar de Liguria.',
      pt: 'As cidades italianas mais frescas em julho encontram-se nas encostas alpinas e pré-alpes: Merano (23°C), Aosta (22°C), Bolzano (24°C), Trento (26°C). As cidades lacustres beneficiam do microclima da água: Como e Riva del Garda mantêm-se a 25°C enquanto Milão atinge 33°C. Génova é a cidade costeira mais fresca a 25°C graças às brisas do mar da Ligúria.',
      de: 'Die kühlsten Städte Italiens im Juli liegen in den Alpenausläufern und Voralpen: Meran (23°C), Aosta (22°C), Bozen (24°C), Trient (26°C). Seestädte profitieren vom Wasser-Mikroklima: Como und Riva del Garda bleiben bei 25°C, während Mailand 33°C erreicht. Genua ist mit 25°C dank der ligurischen Meeresbrisen die kühlste Küstenstadt. Rom, Florenz, Neapel und Sizilien erreichen im Juli regelmäßig 34-38°C.',
      nl: 'De koelste steden van Italië in juli liggen in de Alpenuitlopers en Voor-Alpen: Meran (23°C), Aosta (22°C), Bolzano (24°C), Trento (26°C). Steden aan een meer profiteren van het water-microklimaat: Como en Riva del Garda blijven op 25°C terwijl Milaan 33°C haalt. Genua is met 25°C dankzij de Ligurische zeebriesjes de koelste kuststad. Rome, Florence, Napels en Sicilië halen in juli regelmatig 34-38°C.', it: `Le città più fresche d'Italia a luglio si trovano ai piedi delle Alpi e nelle Prealpi: Merano (23°C), Aosta (22°C), Bolzano (24°C), Trento (26°C). Le città sui laghi beneficiano del microclima dell'acqua: Como e Riva del Garda restano a 25°C mentre Milano arriva a 33°C. Genova è la città costiera più fresca, a 25°C, grazie alle brezze del mar Ligure. Roma, Firenze, Napoli e la Sicilia arrivano regolarmente a 34-38°C a luglio.`,
    },
    q2: { en: 'Are dogs allowed in Italian restaurants and terraces?', fr: 'Les chiens sont-ils acceptés dans les restaurants et terrasses italiens ?', es: '¿Se permiten perros en los restaurantes y terrazas italianos?', pt: 'São permitidos cães nos restaurantes e esplanadas italianos?', de: 'Sind Hunde in italienischen Restaurants und auf Terrassen erlaubt?', nl: 'Zijn honden toegestaan in Italiaanse restaurants en op terrassen?', it: `I cani sono ammessi nei ristoranti e sulle terrazze italiane?` },
    a2: {
      en: 'Northern Italy is one of the most dog-tolerant dining cultures in Europe. In Liguria, Trentino, and the Alps it is customary to bring dogs inside restaurants. Terrace dining across the north has almost no restrictions on dogs. Italian law allows dogs in food establishments at the owner\'s discretion (DPR 54/1997 art.28). In South Tyrol and Aosta Valley, the Austrian/Swiss cultural influence means dogs in cafes and shops is the norm. Ask before entering inside in central and southern Italy, where the culture is less consistent.',
      fr: "Le nord de l'Italie est l'une des cultures gastronomiques les plus tolérantes envers les chiens en Europe. En Ligurie, au Trentin et dans les Alpes, il est courant d'amener les chiens dans les restaurants. Les terrasses du nord n'ont presque aucune restriction pour les chiens. La loi italienne autorise les chiens dans les établissements alimentaires à la discrétion du patron (DPR 54/1997 art.28). Dans le Haut-Adige et la Vallée d'Aoste, l'influence culturelle autrichienne/suisse fait que les chiens dans les cafés et boutiques est la norme.",
      es: 'El norte de Italia es una de las culturas gastronómicas más tolerantes con los perros de Europa. En Liguria, Trentino y los Alpes es costumbre llevar perros a los restaurantes. Las terrazas del norte no tienen casi ninguna restricción para perros. La ley italiana permite perros en establecimientos de comida a discreción del propietario (DPR 54/1997 art.28). En el Alto Adigio y el Valle de Aosta, la influencia cultural austriaca/suiza hace que los perros en cafés y tiendas sea la norma.',
      pt: 'O norte de Itália é uma das culturas gastronómicas mais tolerantes para cães na Europa. Na Ligúria, Trentino e nos Alpes é costume trazer cães para os restaurantes. As esplanadas do norte quase não têm restrições para cães. A lei italiana permite cães em estabelecimentos alimentares à discrição do proprietário (DPR 54/1997 art.28). No Alto Ádige e no Vale de Aosta, a influência cultural austríaca/suíça torna os cães em cafés e lojas uma norma.',
      de: 'Norditalien hat eine der hundefreundlichsten Restaurantkulturen Europas. In Ligurien, Trentino und den Alpen ist es üblich, Hunde mit ins Restaurant zu nehmen. Beim Essen auf der Terrasse gibt es im Norden fast keine Einschränkungen für Hunde. Das italienische Recht erlaubt Hunde in Lebensmittelbetrieben nach Ermessen des Inhabers (DPR 54/1997 Art. 28). In Südtirol und im Aostatal führt der österreichisch-schweizerische Kultureinfluss dazu, dass Hunde in Cafés und Geschäften die Norm sind. Fragen Sie in Mittel- und Süditalien vorher nach, dort ist die Handhabung weniger einheitlich.',
      nl: 'Noord-Italië heeft een van de meest hondvriendelijke restaurantculturen van Europa. In Ligurië, Trentino en de Alpen is het gewoon om je hond mee naar binnen te nemen. Bij het eten op het terras zijn er in het noorden bijna geen beperkingen voor honden. De Italiaanse wet staat honden in eetgelegenheden toe naar goeddunken van de eigenaar (DPR 54/1997 art. 28). In Zuid-Tirol en het Aostadal zorgt de Oostenrijks-Zwitserse culturele invloed ervoor dat honden in cafés en winkels de norm zijn. Vraag in Midden- en Zuid-Italië vooraf even na, daar is het minder eenduidig geregeld.', it: `Il nord Italia ha una delle culture della ristorazione più tolleranti verso i cani in Europa. In Liguria, Trentino e sulle Alpi è normale portare il cane dentro il ristorante. Sulle terrazze del nord non ci sono quasi restrizioni per i cani. La legge italiana consente i cani negli esercizi alimentari a discrezione del gestore (DPR 54/1997 art. 28). In Alto Adige e Valle d'Aosta, l'influenza culturale austriaca e svizzera fa sì che avere il cane nei bar e nei negozi sia la norma. Chiedi prima di entrare nell'Italia centrale e meridionale, dove la cultura è meno uniforme.`,
    },
    q3: { en: 'How do I get to northern Italy with a dog by train?', fr: "Comment rejoindre le nord de l'Italie avec un chien en train ?", es: '¿Cómo llegar al norte de Italia con un perro en tren?', pt: 'Como chegar ao norte de Itália com um cão de comboio?', de: 'Wie komme ich mit dem Hund per Bahn nach Norditalien?', nl: 'Hoe kom ik met de trein met je hond naar Noord-Italië?', it: `Come si arriva nel nord Italia con il cane in treno?` },
    a3: {
      en: 'Trenitalia accepts dogs under 10 kg in carriers for free, and dogs up to 30 kg on a lead with a muzzle for a flat fee of €3.50 (Intercity) or €5 (Frecciarossa). The Milan-Bolzano direct train takes 3h30 and runs hourly. From France: Paris-Milan by TGV (3h25 via Fréjus), then connect to the regional network for Aosta (2h), Genoa (45 min), or Lake Como (40 min). Italo trains (private operator) accept dogs under 10 kg in carriers only.',
      fr: "Trenitalia accepte les chiens de moins de 10 kg en panier gratuitement, et les chiens jusqu'à 30 kg en laisse avec muselière pour un forfait de 3,50€ (Intercity) ou 5€ (Frecciarossa). Le train direct Milan-Bolzano prend 3h30 et part toutes les heures. Depuis la France : Paris-Milan en TGV (3h25 via Fréjus), puis correspondance pour Aoste (2h), Gênes (45 min) ou le lac de Côme (40 min). Les trains Italo (opérateur privé) n'acceptent que les chiens de moins de 10 kg en panier.",
      es: 'Trenitalia acepta perros menores de 10 kg en transportín gratis, y perros hasta 30 kg con correa y bozal por una tarifa plana de 3,50€ (Intercity) o 5€ (Frecciarossa). El tren directo Milán-Bolzano tarda 3h30 y sale cada hora. Desde Francia: París-Milán en TGV (3h25 por Fréjus), luego conexión para Aosta (2h), Génova (45 min) o el lago de Como (40 min).',
      pt: 'A Trenitalia aceita cães abaixo de 10 kg em caixa de transporte gratuitamente, e cães até 30 kg com trela e focinheira por uma tarifa fixa de 3,50€ (Intercity) ou 5€ (Frecciarossa). O comboio direto Milão-Bolzano demora 3h30 e parte de hora a hora. Desde França: Paris-Milão em TGV (3h25 via Fréjus), depois ligação para Aosta (2h), Génova (45 min) ou lago de Como (40 min).',
      de: 'Trenitalia befördert Hunde unter 10 kg in der Transportbox kostenlos, und Hunde bis 30 kg an der Leine mit Maulkorb gegen eine Pauschale von 3,50€ (Intercity) oder 5€ (Frecciarossa). Der Direktzug Mailand-Bozen dauert 3:30 Std. und verkehrt stündlich. Ab Frankreich: Paris-Mailand mit dem TGV (3:25 Std. über den Fréjus-Tunnel), danach Anschluss ins Regionalnetz nach Aosta (2 Std.), Genua (45 Min.) oder an den Comer See (40 Min.). Italo-Züge (privater Anbieter) nehmen nur Hunde unter 10 kg in der Transportbox mit.',
      nl: 'Trenitalia neemt honden onder 10 kg gratis mee in een transportbox, en honden tot 30 kg aan de lijn met muilkorf voor een vaste prijs van 3,50€ (Intercity) of 5€ (Frecciarossa). De directe trein Milaan-Bolzano duurt 3u30 en rijdt elk uur. Vanuit Frankrijk: Parijs-Milaan met de TGV (3u25 via de Fréjustunnel), daarna aansluiting op het regionale net naar Aosta (2u), Genua (45 min) of het Comomeer (40 min). Italo-treinen (privémaatschappij) nemen alleen honden onder 10 kg in een transportbox mee.', it: `Trenitalia accetta gratuitamente i cani sotto i 10 kg nel trasportino, e i cani fino a 30 kg al guinzaglio con museruola per una tariffa fissa di 3,50€ (Intercity) o 5€ (Frecciarossa). Il treno diretto Milano-Bolzano impiega 3h30 e parte ogni ora. Dalla Francia: Parigi-Milano in TGV (3h25 via Fréjus), poi coincidenza sulla rete regionale per Aosta (2h), Genova (45 min) o il lago di Como (40 min). I treni Italo (operatore privato) accettano solo cani sotto i 10 kg nel trasportino.`,
    },
    q4: { en: 'Can dogs hike in the Dolomites?', fr: 'Les chiens peuvent-ils randonner dans les Dolomites ?', es: '¿Pueden los perros hacer senderismo en los Dolomitas?', pt: 'Os cães podem fazer caminhadas nas Dolomitas?', de: 'Dürfen Hunde in den Dolomiten wandern?', nl: 'Mogen honden wandelen in de Dolomieten?', it: `I cani possono fare escursioni nelle Dolomiti?` },
    a4: {
      en: 'Yes, the Dolomites are one of the best hiking regions for dogs in Europe. Most trails are off-lead and without dog restrictions. Mountain refuges (rifugi) in South Tyrol generally accept dogs (check in advance for sleeping overnight). Alta Via 1 and Alta Via 2 (long-distance Dolomite high routes) allow dogs on all sections. Notable exceptions: some National Park core zones (Fanes-Senes-Braies) require leads. Cable cars in South Tyrol almost all accept dogs; check individual operators for Veneto cable cars.',
      fr: "Oui, les Dolomites sont l'une des meilleures régions de randonnée pour les chiens en Europe. La plupart des sentiers sont sans laisse et sans restrictions pour les chiens. Les refuges de montagne (rifugi) du Haut-Adige acceptent généralement les chiens (vérifier à l'avance pour les nuitées). L'Alta Via 1 et l'Alta Via 2 (grandes traversées des Dolomites) permettent les chiens sur toutes les sections. Exceptions notables : certaines zones centrales du Parc National (Fanes-Senes-Braies) exigent une laisse. Les téléphériques du Haut-Adige acceptent presque tous les chiens.",
      es: 'Sí, los Dolomitas son una de las mejores regiones de senderismo para perros de Europa. La mayoría de los senderos son sin correa y sin restricciones para perros. Los refugios de montaña (rifugi) del Alto Adigio generalmente aceptan perros (verificar con antelación para pernoctaciones). La Alta Via 1 y la Alta Via 2 permiten perros en todos los tramos. Excepciones notables: algunas zonas centrales del Parque Nacional (Fanes-Senes-Braies) exigen correa.',
      pt: 'Sim, as Dolomitas são uma das melhores regiões de caminhada para cães na Europa. A maioria dos trilhos é sem trela e sem restrições para cães. Os refúgios de montanha (rifugi) do Alto Ádige geralmente aceitam cães (verificar com antecedência para pernoitar). A Alta Via 1 e a Alta Via 2 permitem cães em todos os troços. Exceções notáveis: algumas zonas centrais do Parque Nacional (Fanes-Senes-Braies) exigem trela.',
      de: 'Ja, die Dolomiten gehören zu den besten Wanderregionen Europas für Hunde. Die meisten Wege sind ohne Leine begehbar und ohne Einschränkungen für Hunde. Berghütten (Rifugi) in Südtirol nehmen Hunde in der Regel auf (für Übernachtungen vorab anfragen). Auf der Alta Via 1 und der Alta Via 2 (die großen Höhenwege der Dolomiten) sind Hunde auf allen Abschnitten erlaubt. Bemerkenswerte Ausnahmen: In einigen Kernzonen des Nationalparks (Fanes-Sennes-Prags) gilt Leinenpflicht. Seilbahnen in Südtirol nehmen fast alle Hunde mit; bei Seilbahnen im Veneto die jeweiligen Betreiber prüfen.',
      nl: 'Ja, de Dolomieten zijn een van de beste wandelgebieden van Europa voor honden. De meeste paden mag je hond los van de lijn en zonder beperkingen belopen. Berghutten (rifugi) in Zuid-Tirol accepteren honden meestal (voor overnachtingen vooraf navragen). Op de Alta Via 1 en de Alta Via 2 (de grote hoogtewegen van de Dolomieten) zijn honden op alle stukken toegestaan. Opvallende uitzonderingen: in sommige kernzones van het nationaal park (Fanes-Sennes-Prags) geldt aanlijnplicht. Kabelbanen in Zuid-Tirol nemen bijna allemaal honden mee; check bij kabelbanen in Veneto steeds de betreffende operator.', it: `Sì, le Dolomiti sono una delle migliori regioni d'Europa per fare escursioni con il cane. La maggior parte dei sentieri è libera dal guinzaglio e senza restrizioni per i cani. I rifugi di montagna in Alto Adige generalmente accettano i cani (verifica in anticipo per il pernottamento). L'Alta Via 1 e l'Alta Via 2 (i grandi trekking d'alta quota delle Dolomiti) permettono i cani su tutti i tratti. Eccezioni degne di nota: alcune zone centrali del Parco Nazionale (Fanes-Senes-Braies) richiedono il guinzaglio. Le funivie in Alto Adige accettano quasi tutte i cani; per le funivie del Veneto verifica con il singolo gestore.`,
    },
    q5: { en: 'Are dogs allowed on Lake Como and Lake Garda ferries?', fr: 'Les chiens sont-ils acceptés sur les ferries du lac de Côme et du lac de Garde ?', es: '¿Se permiten perros en los ferries del lago de Como y el lago de Garda?', pt: 'São permitidos cães nos ferries do lago de Como e do lago de Garda?', de: 'Sind Hunde auf den Fähren des Comer Sees und des Gardasees erlaubt?', nl: 'Zijn honden toegestaan op de veerboten van het Comomeer en het Gardameer?', it: `I cani sono ammessi sui traghetti del lago di Como e del lago di Garda?` },
    a5: {
      en: 'Yes on both lakes. Lake Como ferries (Navigazione Laghi): dogs accepted on all services, free of charge, on a lead. The boat from Como to Bellagio takes 45 min and runs every hour. Lake Garda ferries (also Navigazione Laghi): dogs accepted, small supplement (€1-2) on some routes. The Riva del Garda to Limone and Malcesine routes run every 30 min in summer. On busy summer days dogs travel on the open deck rather than the enclosed cabin, which is in practice much more pleasant anyway.',
      fr: "Oui sur les deux lacs. Ferries du lac de Côme (Navigazione Laghi) : chiens acceptés sur tous les services, gratuitement, en laisse. Le bateau de Côme à Bellagio prend 45 min et part toutes les heures. Ferries du lac de Garde (également Navigazione Laghi) : chiens acceptés, petit supplément (1-2€) sur certains trajets. Les lignes Riva del Garda-Limone et Malcesine partent toutes les 30 min en été. Par temps chargé, les chiens voyagent sur le pont ouvert plutôt que dans la cabine fermée, ce qui est en pratique bien plus agréable de toute façon.",
      es: 'Sí en ambos lagos. Ferries del lago de Como (Navigazione Laghi): perros aceptados en todos los servicios, sin cargo, con correa. El barco de Como a Bellagio tarda 45 min y sale cada hora. Ferries del lago de Garda (también Navigazione Laghi): perros aceptados, pequeño suplemento (1-2€) en algunas rutas. Las líneas Riva del Garda-Limone y Malcesine salen cada 30 min en verano.',
      pt: 'Sim em ambos os lagos. Ferries do lago de Como (Navigazione Laghi): cães aceites em todos os serviços, gratuitamente, com trela. O barco de Como a Bellagio demora 45 min e parte de hora a hora. Ferries do lago de Garda (também Navigazione Laghi): cães aceites, pequeno suplemento (1-2€) em algumas rotas. As linhas Riva del Garda-Limone e Malcesine partem de 30 em 30 min no verão.',
      de: 'Ja, auf beiden Seen. Fähren auf dem Comer See (Navigazione Laghi): Hunde auf allen Linien kostenlos erlaubt, an der Leine. Das Boot von Como nach Bellagio braucht 45 Min. und fährt stündlich. Fähren auf dem Gardasee (ebenfalls Navigazione Laghi): Hunde erlaubt, auf manchen Strecken kleiner Aufpreis (1-2€). Die Linien Riva del Garda-Limone und -Malcesine fahren im Sommer alle 30 Min. An belebten Sommertagen reisen Hunde eher auf dem offenen Deck als in der geschlossenen Kabine, was in der Praxis ohnehin viel angenehmer ist.',
      nl: 'Ja, op beide meren. Veerboten op het Comomeer (Navigazione Laghi): honden op alle lijnen gratis toegestaan, aangelijnd. De boot van Como naar Bellagio duurt 45 min en vaart elk uur. Veerboten op het Gardameer (eveneens Navigazione Laghi): honden toegestaan, op sommige routes kleine toeslag (1-2€). De lijnen Riva del Garda-Limone en -Malcesine varen \'s zomers elke 30 min. Op drukke zomerdagen reizen honden liever op het open dek dan in de gesloten cabine, wat in de praktijk sowieso veel prettiger is.', it: `Sì, su entrambi i laghi. Traghetti del lago di Como (Navigazione Laghi): cani accettati su tutti i collegamenti, gratuitamente, al guinzaglio. La barca da Como a Bellagio impiega 45 minuti e parte ogni ora. Traghetti del lago di Garda (sempre Navigazione Laghi): cani accettati, piccolo supplemento (1-2€) su alcune tratte. Le linee Riva del Garda-Limone e Malcesine partono ogni 30 minuti in estate. Nei giorni estivi più affollati i cani viaggiano sul ponte all'aperto invece che nella cabina chiusa, il che in pratica è comunque molto più piacevole.`,
    },
  },
}

const p = (o: L4, locale: string) =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : locale === 'de' ? o.de : locale === 'nl' ? o.nl : locale === 'it' ? o.it : o.en

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

export default async function ItalieFraicheChienPage({ params }: { params: Promise<{ locale: string }> }) {
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
      <section className="bg-gradient-to-br from-green-900 via-emerald-900 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🇮🇹 {locale === 'fr' ? 'Italie alpine et ligure' : locale === 'es' ? 'Italia alpina y ligur' : locale === 'pt' ? 'Itália alpina e ligure' : locale === 'de' ? 'Alpines und ligurisches Italien' : locale === 'nl' ? 'Alpien en Ligurisch Italië' : locale === 'it' ? 'Italia alpina e ligure' : 'Alpine & Ligurian Italy'}
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
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 text-sm font-black flex items-center justify-center">
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
                      <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                        {p(city.tag, locale)}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{p(city.why, locale)}</p>

                      <div className="flex items-start gap-2 bg-green-50 rounded-xl px-3 py-2 mb-5">
                        <span className="text-green-600 text-xs font-bold uppercase tracking-wide flex-shrink-0 mt-0.5">🐾 {p(T.dogTipLabel, locale)}</span>
                        <p className="text-green-800 text-xs leading-relaxed">{p(city.dogTip, locale)}</p>
                      </div>

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
                        href={buildAllezDestLink(city.name, 'Italy', `${CAMPAIGN}-${city.slug}`, 3)}
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
