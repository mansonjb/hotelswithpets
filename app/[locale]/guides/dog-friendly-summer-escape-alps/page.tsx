import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'dog-friendly-summer-escape-alps'
const CAMPAIGN_BASE = 'alps-summer'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Alpine summer pet-friendly hotels', cta: 'See hotels' },
  fr: { label: 'Hotels pet-friendly ete alpin', cta: 'Voir les hotels' },
  es: { label: 'Hoteles pet-friendly verano alpino', cta: 'Ver hoteles' },
  pt: { label: 'Hoteis pet-friendly verao alpino', cta: 'Ver hoteis' },
}

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
    en: `Dog-Friendly Alpine Summer: 8 Mountain Towns Under 22C (2026)`,
    fr: `Ete en montagne avec son chien : 8 villes alpines a moins de 22C (2026)`,
    es: `Verano en los Alpes con tu perro: 8 pueblos de montana a menos de 22C (2026)`,
    pt: `Verao alpino com o seu cao: 8 cidades de montanha a menos de 22C (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `Eight Alpine mountain towns where July temperatures stay under 22C, with dog-friendly cable cars, mountain trails, and verified pet-friendly hotels in Switzerland, France, Italy, and Austria.`,
    fr: `Huit villes alpines ou les temperatures de juillet restent sous 22C, avec telepheriques acceptant les chiens, sentiers de montagne, et hotels pet-friendly verifies en Suisse, France, Italie et Autriche.`,
    es: `Ocho localidades alpinas donde las temperaturas de julio se mantienen bajo 22C, con telefericos que admiten perros, senderos de montana, y hoteles pet-friendly verificados en Suiza, Francia, Italia y Austria.`,
    pt: `Oito localidades alpinas onde as temperaturas de julho ficam abaixo dos 22C, com telecabines que aceitam caes, trilhos de montanha, e hoteis pet-friendly verificados na Suica, Franca, Italia e Austria.`,
  }
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
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
      siteName: 'HotelsWithPets.com',
    },
  }
}

type Pick = {
  slug: string
  name: string
  country: string
  destPath: string
  julyTemp: string
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  hotelName: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
}

const PICKS: Pick[] = [
  {
    slug: 'grindelwald',
    name: 'Grindelwald',
    country: 'Switzerland',
    destPath: '/destinations/grindelwald',
    julyTemp: '18C',
    whyEn: `Grindelwald sits directly beneath the north face of the Eiger at 1034m, keeping July highs around 18C even on warm continental days. The First cable car explicitly accepts leashed dogs for 12 CHF per dog, giving you access to the First plateau and its panoramic trail network. Mountain huts along the Firstbahn circuit (First Cliff Walk, Bachalpsee lake trail) are universally dog-welcoming, and the entire area is purpose-built for slow hiking with a dog. The valley trail from Grindelwald toward Grindel is flat, wide, and quiet in the mornings.`,
    whyFr: `Grindelwald est a 1034m sous la face nord de l'Eiger, ce qui maintient les maximales de juillet a environ 18C meme lors des journees chaudes du continent. Le telepherique First accepte explicitement les chiens en laisse pour 12 CHF par chien, donnant acces au plateau First et a son reseau de sentiers panoramiques. Les refuges de montagne du circuit Firstbahn (First Cliff Walk, sentier du lac Bachalpsee) sont tous dog-friendly, et la zone entiere est concue pour la randonnee tranquille avec un chien. Le sentier de vallee de Grindelwald vers Grindel est plat, large et calme le matin.`,
    whyEs: `Grindelwald esta a 1034m bajo la cara norte del Eiger, lo que mantiene las maximas de julio en torno a 18C incluso en los dias calurosos del continente. El teleferico First acepta explicitamente perros con correa por 12 CHF por perro, dando acceso al plateau First y su red de senderos panoramicos. Los refugios de montana del circuito Firstbahn (First Cliff Walk, sendero del lago Bachalpsee) son todos dog-friendly, y toda la zona esta disenada para senderismo tranquilo con perro. El sendero de valle de Grindelwald hacia Grindel es llano, ancho y tranquilo por las mananas.`,
    whyPt: `Grindelwald fica a 1034m sob a face norte do Eiger, mantendo as maximas de julho em torno de 18C mesmo em dias quentes do continente. O telecabine First aceita explicitamente caes a trela por 12 CHF por cao, dando acesso ao plateau First e a sua rede de trilhos panoramicos. Os refugios de montanha do circuito Firstbahn (First Cliff Walk, trilho do lago Bachalpsee) sao todos dog-friendly, e toda a zona foi pensada para caminhadas tranquilas com cao. O trilho do vale de Grindelwald para Grindel e plano, largo e calmo de manha.`,
    hotelName: 'Romantik Hotel Schweizerhof Grindelwald',
    hotelEn: `Romantik Hotel Schweizerhof Grindelwald is a 4-star mountain property with direct views of the Eiger and Wetterhorn. Dogs are welcomed at a modest fee, with the hotel providing a dog blanket and water bowl on arrival. The terrace and garden face the mountains directly, making it an ideal base for early starts on the First cable car trail.`,
    hotelFr: `Le Romantik Hotel Schweizerhof Grindelwald est un 4 etoiles de montagne avec vue directe sur l'Eiger et le Wetterhorn. Les chiens sont acceptes moyennant un supplement modere, avec couverture et gamelle fournis a l'arrivee. La terrasse et le jardin donnent directement sur les montagnes, base ideale pour partir tot sur le sentier du telepherique First.`,
    hotelEs: `El Romantik Hotel Schweizerhof Grindelwald es un 4 estrellas de montana con vistas directas al Eiger y Wetterhorn. Los perros son bienvenidos con una tasa modesta, con manta y comedero al llegar. La terraza y el jardin dan directamente a las montanas, base ideal para salidas tempranas al sendero del teleferico First.`,
    hotelPt: `O Romantik Hotel Schweizerhof Grindelwald e um 4 estrelas de montanha com vista direta para o Eiger e o Wetterhorn. Os caes sao aceites com uma taxa modesta, com cobertor e tigela fornecidos a chegada. O terraco e o jardim dao diretamente para as montanhas, base ideal para saidas cedo no trilho do telecabine First.`,
  },
  {
    slug: 'chamonix',
    name: 'Chamonix-Mont-Blanc',
    country: 'France',
    destPath: '/destinations/chamonix',
    julyTemp: '20C',
    whyEn: `Chamonix at 1035m stays around 20C in July, a genuine escape from the Lyon or Geneva heat below. The Aiguille du Midi gondola does not allow dogs, but this leaves dozens of excellent valley-level trails entirely open: the Mer de Glace approach from Montenvers (train accepts dogs on leash), the Brevent plateau trail from Plan de l'Aiguille (accessible via cable car that accepts dogs at a small fee), and the Arve riverside path through the town centre. The Plan de l'Aiguille at 2310m stays under 14C and is reached by the Brevent cable car lower section, which accepts leashed dogs.`,
    whyFr: `Chamonix a 1035m reste autour de 20C en juillet, une vraie echappatoire par rapport a la chaleur de Lyon ou Geneve en contrebas. La telepherique de l'Aiguille du Midi n'accepte pas les chiens, mais cela laisse des dizaines de sentiers de vallee entierement accessibles : l'approche de la Mer de Glace depuis Montenvers (train avec chiens en laisse), le sentier du plateau du Brevent depuis le Plan de l'Aiguille (accessible en telepherique qui accepte les chiens contre un petit supplement), et le chemin au bord de l'Arve en centre-ville. Le Plan de l'Aiguille a 2310m reste sous 14C et se rejoint par la section basse du telepherique du Brevent, qui accepte les chiens en laisse.`,
    whyEs: `Chamonix a 1035m se mantiene en torno a 20C en julio, un autentico escape del calor de Lyon o Ginebra abajo. El teleferico del Aiguille du Midi no admite perros, pero eso deja docenas de senderos de valle completamente accesibles: la aproximacion al Mer de Glace desde Montenvers (tren con perros con correa), el sendero del plateau Brevent desde Plan de l'Aiguille (accesible por teleferico que si acepta perros con pequena tarifa), y el camino junto al Arve por el centro. El Plan de l'Aiguille a 2310m se mantiene bajo 14C y se llega por la seccion baja del teleferico del Brevent, que acepta perros con correa.`,
    whyPt: `Chamonix a 1035m fica em torno dos 20C em julho, uma verdadeira fuga do calor de Lyon ou Genebra la em baixo. O telecabine do Aiguille du Midi nao aceita caes, mas isso deixa dezenas de trilhos de vale completamente abertos: a aproximacao ao Mer de Glace a partir de Montenvers (comboio aceita caes a trela), o trilho do plateau Brevent a partir do Plan de l'Aiguille (acessivel por telecabine que aceita caes com pequena taxa), e o caminho ao longo do Arve pelo centro da cidade. O Plan de l'Aiguille a 2310m mantem-se abaixo de 14C e chega-se pela seccao baixa do telecabine do Brevent, que aceita caes a trela.`,
    hotelName: 'Hotel Morgane',
    hotelEn: `Hotel Morgane is a 4-star boutique hotel near the Brevent cable car base, with a dog-welcome policy at 20 EUR per night fee. The location places you 5 minutes from the Plan de l'Aiguille cable car and a short walk from the Arve river trail. Rooms are compact but the garden terrace is generously sized for a dog to stretch.`,
    hotelFr: `L'Hotel Morgane est un boutique 4 etoiles pres de la base du telepherique du Brevent, avec une politique de bienvenue pour chiens a 20 EUR par nuit. La situation vous place a 5 minutes du telepherique du Plan de l'Aiguille et a deux pas du sentier de l'Arve. Les chambres sont compactes mais la terrasse-jardin est spacieuse pour qu'un chien se degourdisse.`,
    hotelEs: `El Hotel Morgane es un boutique 4 estrellas cerca de la base del teleferico del Brevent, con una politica de bienvenida para perros a 20 EUR por noche. La ubicacion te pone a 5 minutos del teleferico del Plan de l'Aiguille y a un paseo corto del sendero del rio Arve. Las habitaciones son compactas pero la terraza-jardin es suficientemente amplia para que un perro se estire.`,
    hotelPt: `O Hotel Morgane e um boutique 4 estrelas perto da base do telecabine do Brevent, com politica de boas-vindas para caes a 20 EUR por noite. A localizacao coloca-o a 5 minutos do telecabine do Plan de l'Aiguille e a uma curta caminhada do trilho do rio Arve. Os quartos sao compactos mas o terraco-jardim e suficientemente amplo para um cao esticar as pernas.`,
  },
  {
    slug: 'annecy',
    name: 'Annecy',
    country: 'France',
    destPath: '/destinations/annecy',
    julyTemp: '24C',
    whyEn: `Annecy's lake beaches ban dogs from June to September, but the smart move with a dog is to head up to the Semnoz plateau at 1700m where temperatures stay under 18C year-round, including August. The plateau is reached by car (D41 road) or by a marked trail from the town, and the forest tracks at the top are broad, quiet, and shaded. At town level, the Vieille Ville canal towpaths are year-round dog-friendly, and the Paquier park at the lake edge admits leashed dogs outside designated beach zones. Mornings on the Thiou canal with a dog are genuinely beautiful before the tourist crowds arrive.`,
    whyFr: `Les plages du lac d'Annecy interdisent les chiens de juin a septembre, mais la bonne strategie avec un chien est de monter au plateau du Semnoz a 1700m ou les temperatures restent sous 18C toute l'annee, y compris en aout. Le plateau est accessible en voiture (route D41) ou par un sentier balise depuis la ville, et les chemins forestiers au sommet sont larges, calmes et ombrages. Au niveau de la ville, les berges des canaux de la Vieille Ville sont dog-friendly toute l'annee, et le parc du Paquier en bord de lac accueille les chiens en laisse hors zones de plage. Les matins sur le canal du Thiou avec un chien sont vraiment sublimes avant l'arrivee des foules touristiques.`,
    whyEs: `Las playas del lago de Annecy prohiben los perros de junio a septiembre, pero la estrategia inteligente con un perro es subir al plateau del Semnoz a 1700m donde las temperaturas se mantienen bajo 18C todo el ano, incluso en agosto. El plateau se llega en coche (carretera D41) o por un sendero senalizado desde el pueblo, y los caminos forestales en la cima son anchos, tranquilos y con sombra. A nivel de la ciudad, los caminos de sirga de los canales de la Vieille Ville son dog-friendly todo el ano, y el parque Paquier al borde del lago admite perros con correa fuera de las zonas de playa. Las mananas en el canal del Thiou con un perro son genuinamente hermosas antes de que lleguen las multitudes.`,
    whyPt: `As praias do lago de Annecy proibem caes de junho a setembro, mas a estrategia inteligente com um cao e subir ao plateau do Semnoz a 1700m onde as temperaturas ficam abaixo de 18C o ano inteiro, incluindo agosto. O plateau e acessivel de carro (estrada D41) ou por um trilho sinalizado a partir da cidade, e os caminhos florestais no topo sao largos, calmos e com sombra. Ao nivel da cidade, os caminhos das margens dos canais da Vieille Ville sao dog-friendly todo o ano, e o parque Paquier na beira do lago admite caes a trela fora das zonas de praia. As manhas no canal do Thiou com um cao sao genuinamente belas antes de chegarem as multidoes.`,
    hotelName: "L'Imperial Palace",
    hotelEn: `L'Imperial Palace is a 4-star lakeside hotel set in its own park, one of Annecy's most iconic addresses. Pets are welcomed at a modest supplement, with direct garden access where the dog can walk freely before the morning guests appear. The hotel is 10 minutes from the old town canal towpaths and the Paquier park on foot.`,
    hotelFr: `L'Imperial Palace est un hotel 4 etoiles en bord de lac dans son propre parc, l'une des adresses les plus emblematiques d'Annecy. Les animaux sont acceptes moyennant un supplement modere, avec acces direct au jardin ou le chien peut se promener librement avant l'arrivee des autres clients le matin. L'hotel est a 10 minutes a pied des berges de la vieille ville et du parc du Paquier.`,
    hotelEs: `L'Imperial Palace es un hotel 4 estrellas a orillas del lago en su propio parque, una de las direcciones mas iconicas de Annecy. Las mascotas son bienvenidas con un suplemento modesto, con acceso directo al jardin donde el perro puede caminar libremente antes de que lleguen los demas clientes por la manana. El hotel esta a 10 minutos a pie de los caminos de sirga del casco antiguo y el parque Paquier.`,
    hotelPt: `O L'Imperial Palace e um hotel 4 estrelas a beira do lago no seu proprio parque, um dos enderecos mais iconicos de Annecy. Os animais sao aceites com um suplemento modesto, com acesso direto ao jardim onde o cao pode caminhar livremente antes de chegarem os outros hospedes de manha. O hotel fica a 10 minutos a pe dos caminhos das margens da cidade velha e do parque Paquier.`,
  },
  {
    slug: 'interlaken',
    name: 'Interlaken',
    country: 'Switzerland',
    destPath: '/destinations/interlaken',
    julyTemp: '22C',
    whyEn: `Interlaken sits between Lake Thun and Lake Brienz at 570m, serving as the gateway to the Bernese Oberland. July sits around 22C in the valley, but the surrounding trails climb quickly to cooler altitudes. The St Beatus Caves trail along Lake Thun accepts leashed dogs on the exterior path. Paddle boats on Lake Thun allow leashed dogs at no extra charge, providing a genuinely relaxing activity on hot afternoons. Swiss Federal Railways and most local boats accept dogs at half-fare, making day trips to Grindelwald or Lauterbrunnen easy and affordable.`,
    whyFr: `Interlaken est entre le lac de Thoune et le lac de Brienz a 570m, porte du Berner Oberland. Juillet est autour de 22C dans la vallee, mais les sentiers environnants montent vite vers des altitudes plus fraiches. Le sentier des Grottes de St-Beatus le long du lac de Thoune accepte les chiens en laisse sur le chemin exterieur. Les pedalos sur le lac de Thoune acceptent les chiens en laisse sans supplement, une activite vraiment relaxante les apres-midi chauds. Les CFF et la plupart des bateaux locaux acceptent les chiens a demi-tarif, rendant les excursions a Grindelwald ou Lauterbrunnen faciles et abordables.`,
    whyEs: `Interlaken esta entre el lago de Thun y el lago de Brienz a 570m, puerta del Oberland bernese. Julio ronda los 22C en el valle, pero los senderos circundantes suben rapidamente a altitudes mas frescas. El sendero de las Cuevas de St Beatus junto al lago de Thun acepta perros con correa en el camino exterior. Los botes de remos en el lago de Thun admiten perros con correa sin cargo extra, una actividad verdaderamente relajante las tardes calurosas. Los FFS y la mayoria de botes locales admiten perros a media tarifa, haciendo las excursiones a Grindelwald o Lauterbrunnen faciles y asequibles.`,
    whyPt: `Interlaken fica entre o lago Thun e o lago Brienz a 570m, porta de entrada para o Berner Oberland. Julho ronda os 22C no vale, mas os trilhos circundantes sobem rapidamente para altitudes mais frescas. O trilho das Grutas de St Beatus ao longo do lago Thun aceita caes a trela no caminho exterior. Os pedalos no lago Thun aceitam caes a trela sem custo extra, uma atividade verdadeiramente relaxante nas tardes quentes. Os CFF e a maioria dos barcos locais aceitam caes a meio preco, tornando as excursoes a Grindelwald ou Lauterbrunnen faceis e acessiveis.`,
    hotelName: 'Victoria-Jungfrau Grand Hotel and Spa',
    hotelEn: `Victoria-Jungfrau Grand Hotel and Spa is a legendary 5-star Interlaken address with a direct view of the Jungfrau massif from its garden. Pets are welcomed at a moderate fee, with the hotel's own park providing ample room for morning walks. The grand lobby and restaurant have a historically tolerant attitude toward well-behaved dogs on leads.`,
    hotelFr: `Le Victoria-Jungfrau Grand Hotel and Spa est une adresse 5 etoiles legendaire d'Interlaken avec vue directe sur le massif de la Jungfrau depuis son jardin. Les animaux sont acceptes moyennant un supplement modere, le parc de l'hotel offrant suffisamment de place pour les promenades matinales. Le grand lobby et le restaurant ont une attitude historiquement tolerante envers les chiens sages en laisse.`,
    hotelEs: `El Victoria-Jungfrau Grand Hotel and Spa es una legendaria direccion 5 estrellas de Interlaken con vista directa al macizo del Jungfrau desde su jardin. Las mascotas son bienvenidas con una tarifa moderada, con el parque propio del hotel ofreciendo amplio espacio para los paseos matutinos. El gran vestibulo y el restaurante tienen una actitud historicamente tolerante hacia perros bien educados con correa.`,
    hotelPt: `O Victoria-Jungfrau Grand Hotel and Spa e um legendario endereco 5 estrelas de Interlaken com vista direta para o macico do Jungfrau a partir do seu jardim. Os animais sao aceites com uma taxa moderada, com o proprio parque do hotel oferecendo espaco amplo para passeios matinais. O grande lobby e o restaurante tem uma atitude historicamente tolerante em relacao a caes bem-comportados a trela.`,
  },
  {
    slug: 'bolzano',
    name: 'Bolzano',
    country: 'Italy',
    destPath: '/destinations/bolzano',
    julyTemp: '22C',
    whyEn: `Bolzano's valley floor hits 22C but the Ritten cable car climbs to the plateau at 2000m where temperatures stay around 15C even in August, a 12-minute ride from the city centre. Dogs are explicitly welcomed on the Ritten cable car (Rittner Bahn), making this one of the easiest dog-friendly mountain escapes in the Alps. The plateau has a narrow-gauge railway connecting the villages, which also accepts dogs on leash. At valley level, Bolzano is bilingual Italian and German, vineyards line the paths out of town, and the Talvera riverside park is a wide shaded walk for morning and evening.`,
    whyFr: `Le fond de vallee de Bolzano atteint 22C mais le telepherique du Ritten monte au plateau a 2000m ou les temperatures restent autour de 15C meme en aout, a 12 minutes en telepherique du centre-ville. Les chiens sont explicitement acceptes sur le telepherique du Ritten (Rittner Bahn), faisant de cet endroit l'une des escapades de montagne dog-friendly les plus faciles des Alpes. Le plateau dispose d'un train a voie etroite reliant les villages, qui accepte aussi les chiens en laisse. Au niveau de la vallee, Bolzano est bilingue italien et allemand, des vignes bordent les chemins a la sortie de la ville, et le parc au bord de la Talvera est une belle promenade ombragee et spacieuse pour le matin et le soir.`,
    whyEs: `El fondo del valle de Bolzano alcanza los 22C pero el teleferico del Ritten sube al plateau a 2000m donde las temperaturas se mantienen en torno a 15C incluso en agosto, a 12 minutos en teleferico del centro. Los perros son explicitamente bienvenidos en el teleferico del Ritten (Rittner Bahn), lo que convierte a este lugar en una de las escapadas de montana dog-friendly mas faciles de los Alpes. El plateau tiene un tren de via estrecha que conecta los pueblos y que tambien acepta perros con correa. A nivel del valle, Bolzano es bilingue italiano y aleman, vinedos bordean los caminos a la salida de la ciudad, y el parque ribero del Talvera es un paseo amplio y sombreado para la manana y la tarde.`,
    whyPt: `O fundo do vale de Bolzano atinge os 22C mas o telecabine do Ritten sobe ao plateau a 2000m onde as temperaturas ficam em torno de 15C mesmo em agosto, a 12 minutos de telecabine do centro. Os caes sao explicitamente aceites no telecabine do Ritten (Rittner Bahn), tornando este um dos escapes de montanha dog-friendly mais faceis dos Alpes. O plateau tem um comboio de via estreita ligando as aldeias, que tambem aceita caes a trela. Ao nivel do vale, Bolzano e bilingue italiano e alemao, vinhas bordeiam os caminhos fora da cidade, e o parque ribeirao do Talvera e um passeio largo e sombreado para a manha e tarde.`,
    hotelName: 'Parkhotel Laurin',
    hotelEn: `Parkhotel Laurin is a 4-star hotel in the heart of Bolzano with a mature garden and central location ideal for a dog-owner base. The pet-friendly garden is shaded and spacious, and the hotel is a 5-minute walk from the Ritten cable car departure point. Dogs are welcomed with a standard supplement and a dedicated outdoor water bowl area.`,
    hotelFr: `Le Parkhotel Laurin est un 4 etoiles au coeur de Bolzano avec un beau jardin mature et une situation centrale ideale pour les proprietaires de chiens. Le jardin pet-friendly est ombrage et spacieux, et l'hotel est a 5 minutes a pied du depart du telepherique du Ritten. Les chiens sont acceptes avec un supplement standard et une zone de gamelles d'eau dediee en exterieur.`,
    hotelEs: `El Parkhotel Laurin es un 4 estrellas en el corazon de Bolzano con un jardin maduro y ubicacion central ideal para propietarios de perros. El jardin pet-friendly es sombreado y espacioso, y el hotel esta a 5 minutos a pie del punto de salida del teleferico del Ritten. Los perros son bienvenidos con un suplemento estandar y una zona de bebederos dedicada en el exterior.`,
    hotelPt: `O Parkhotel Laurin e um hotel 4 estrelas no coracao de Bolzano com um jardim maduro e localizacao central ideal para donos de caes. O jardim pet-friendly e sombreado e espacoso, e o hotel fica a 5 minutos a pe do ponto de partida do telecabine do Ritten. Os caes sao aceites com um suplemento padrao e uma zona de bebedouros dedicada no exterior.`,
  },
  {
    slug: 'trento',
    name: 'Trento',
    country: 'Italy',
    destPath: '/destinations/trento',
    julyTemp: '24C',
    whyEn: `Trento's valley floor reaches 24C in July, but the Sardagna cable car (just 3 minutes from Piazza Dante) carries dogs free of charge up to Monte Bondone at 2100m where July temperatures are around 12C. The cable car ride is short and affordable, making it a practical daily escape for heat-sensitive dogs. At town level, the evening walk around Piazza del Duomo is manageable from 19:00 when temperatures drop. Trento's compact old town is very walkable for early morning outings with a dog before the heat builds.`,
    whyFr: `Le fond de vallee de Trente atteint 24C en juillet, mais le telepherique de Sardagna (a 3 minutes de la Piazza Dante) monte gratuitement les chiens jusqu'au Monte Bondone a 2100m ou les temperatures de juillet sont autour de 12C. Le trajet en telepherique est court et abordable, ce qui en fait une echappatoire quotidienne pratique pour les chiens sensibles a la chaleur. Au niveau de la ville, la balade du soir autour de la Piazza del Duomo est praticable a partir de 19h quand les temperatures baissent. Le centre historique compact de Trente se parcourt tres bien en debut de matinee avec un chien avant que la chaleur s'installe.`,
    whyEs: `El fondo del valle de Trento alcanza los 24C en julio, pero el teleferico de Sardagna (a 3 minutos de la Piazza Dante) lleva a los perros gratis al Monte Bondone a 2100m donde las temperaturas de julio rondan los 12C. El trayecto en teleferico es corto y asequible, lo que lo convierte en un escape diario practico para perros sensibles al calor. A nivel de ciudad, el paseo vespertino por la Piazza del Duomo es factible desde las 19h cuando bajan las temperaturas. El compacto casco antiguo de Trento es muy transitable en las primeras horas de la manana con un perro antes de que llegue el calor.`,
    whyPt: `O fundo do vale de Trento atinge os 24C em julho, mas o telecabine de Sardagna (a 3 minutos da Piazza Dante) leva os caes gratuitamente ao Monte Bondone a 2100m onde as temperaturas de julho ficam em torno dos 12C. A viagem de telecabine e curta e acessivel, tornando-a uma fuga diaria pratica para caes sensiveis ao calor. Ao nivel da cidade, o passeio da tarde em redor da Piazza del Duomo e praticavel a partir das 19h quando as temperaturas descem. O compacto centro historico de Trento e muito percorrivel nas primeiras horas da manha com um cao antes de o calor se instalar.`,
    hotelName: 'Grand Hotel Trento',
    hotelEn: `Grand Hotel Trento is a central 4-star hotel on the Piazza Dante, steps from the Sardagna cable car base. Pets are accepted on request with a standard supplement. The hotel's central position means the dog can access the historic centre's morning streets before they fill, and the cable car is a 3-minute walk for the daily altitude escape.`,
    hotelFr: `Le Grand Hotel Trento est un 4 etoiles central sur la Piazza Dante, a deux pas de la base du telepherique de Sardagna. Les animaux sont acceptes sur demande avec un supplement standard. La position centrale de l'hotel permet au chien d'acceder aux rues du centre historique le matin avant qu'elles se remplissent, et le telepherique est a 3 minutes a pied pour l'echappatoire altitudinale quotidienne.`,
    hotelEs: `El Grand Hotel Trento es un 4 estrellas central en la Piazza Dante, a pasos de la base del teleferico de Sardagna. Las mascotas se aceptan bajo peticion con un suplemento estandar. La posicion central del hotel permite al perro acceder a las calles del centro historico por la manana antes de que se llenen, y el teleferico esta a 3 minutos andando para el escape de altitud diario.`,
    hotelPt: `O Grand Hotel Trento e um hotel central 4 estrelas na Piazza Dante, a passos da base do telecabine de Sardagna. Os animais sao aceites a pedido com um suplemento padrao. A posicao central do hotel permite ao cao aceder as ruas do centro historico de manha antes de encherem, e o telecabine fica a 3 minutos a pe para a fuga de altitude diaria.`,
  },
  {
    slug: 'zell-am-see',
    name: 'Zell am See',
    country: 'Austria',
    destPath: '/destinations/zell-am-see',
    julyTemp: '21C',
    whyEn: `Zell am See sits at 757m in the Hohe Tauern national park region, with July averages around 21C that feel cool on a breezy lake evening. The Schmittenhöhe cable car accepts dogs for 7 EUR per trip, taking you to 1965m where the temperature drops to 10-12C and panoramic ridge trails run for hours. The lakeside promenade is flat, wide, and explicitly dog-welcoming at all hours. Kaprun glacier with its access road is 8km away, providing a further cool-day option. The town is quiet in summer as an off-season ski resort, with none of the winter crowd density.`,
    whyFr: `Zell am See est a 757m dans la region du parc national du Hohe Tauern, avec des moyennes de juillet autour de 21C qui paraissent fraiches le soir en bord de lac avec de la brise. Le telepherique du Schmittenhöhe accepte les chiens pour 7 EUR par trajet, vous emmenant a 1965m ou la temperature descend a 10-12C et des sentiers de crete panoramiques s'etirent pendant des heures. La promenade au bord du lac est plate, large et explicitement dog-friendly a toute heure. Le glacier de Kaprun avec sa route d'acces est a 8km, offrant une autre option par temps tres chaud. La ville est calme en ete en tant que station de ski hors saison, sans aucune densite de foule hivernale.`,
    whyEs: `Zell am See esta a 757m en la region del parque nacional Hohe Tauern, con medias de julio en torno a 21C que se sienten frescas en las tardes de brisa junto al lago. El teleferico del Schmittenhöhe acepta perros por 7 EUR por trayecto, llevandote a 1965m donde la temperatura baja a 10-12C y senderos de cresta panoramicos se extienden durante horas. El paseo maritimo del lago es llano, ancho y explicitamente dog-friendly a todas horas. El glaciar de Kaprun con su carretera de acceso esta a 8km, ofreciendo otra opcion para dias muy calurosos. El pueblo esta tranquilo en verano como estacion de esqui fuera de temporada, sin ninguna de la densidad de multitud invernal.`,
    whyPt: `Zell am See fica a 757m na regiao do parque nacional Hohe Tauern, com medias de julho em torno de 21C que parecem frescas nas tardes ventosas junto ao lago. O telecabine do Schmittenhöhe aceita caes por 7 EUR por viagem, levando-o a 1965m onde a temperatura desce a 10-12C e trilhos de crista panoramicos estendem-se por horas. O passeio a beira do lago e plano, largo e explicitamente dog-friendly a todas as horas. O glaciar de Kaprun com a sua estrada de acesso fica a 8km, oferecendo outra opcao para dias muito quentes. A vila e calma no verao como estacao de esqui fora de temporada, sem nenhuma das multidoes de inverno.`,
    hotelName: 'Hotel Seewirt',
    hotelEn: `Hotel Seewirt is a lakeside hotel in Zell am See with a dog-friendly garden that opens directly onto the lake promenade. Dogs are welcomed with a modest fee, and the garden provides a quiet early-morning space while the town is still asleep. The hotel is a 10-minute walk from the Schmittenhöhe cable car base station.`,
    hotelFr: `L'Hotel Seewirt est un hotel en bord de lac a Zell am See avec un jardin dog-friendly qui s'ouvre directement sur la promenade du lac. Les chiens sont acceptes moyennant un supplement modeste, et le jardin offre un espace calme en debut de matinee pendant que la ville dort encore. L'hotel est a 10 minutes a pied de la station de base du telepherique du Schmittenhöhe.`,
    hotelEs: `El Hotel Seewirt es un hotel a orillas del lago en Zell am See con un jardin dog-friendly que se abre directamente al paseo del lago. Los perros son bienvenidos con una modesta tarifa, y el jardin ofrece un espacio tranquilo en las primeras horas de la manana mientras la ciudad todavia duerme. El hotel esta a 10 minutos andando de la estacion base del teleferico del Schmittenhöhe.`,
    hotelPt: `O Hotel Seewirt e um hotel a beira do lago em Zell am See com um jardim dog-friendly que se abre diretamente para o passeio do lago. Os caes sao aceites com uma taxa modesta, e o jardim oferece um espaco calmo nas primeiras horas da manha enquanto a cidade ainda dorme. O hotel fica a 10 minutos a pe da estacao base do telecabine do Schmittenhöhe.`,
  },
  {
    slug: 'kitzbuehel',
    name: 'Kitzbühel',
    country: 'Austria',
    destPath: '/destinations/kitzbuehel',
    julyTemp: '22C',
    whyEn: `Kitzbühel becomes a quiet hiking village in summer, empty of ski-season crowds and pleasant at 800m where July averages around 22C. Both the Hahnenkamm cable car and the Kitzbüheler Horn gondola accept dogs on leash for a small fee, opening up the high-alpine meadow trails above 1600m where temperatures drop to 12-15C. The meadow walks between the two summits are broad, grassy, and utterly quiet on weekdays. The old town is entirely walkable on foot with a dog on leash, and the Schwarzsee lake (2km from town) has a dog-accessible bank open in the morning before the swimming zone opens.`,
    whyFr: `Kitzbühel devient un village de randonnee tranquille en ete, vide des foules de la saison de ski et agreable a 800m ou les moyennes de juillet sont autour de 22C. Le telepherique du Hahnenkamm et le gondola du Kitzbüheler Horn acceptent tous les deux les chiens en laisse contre un petit supplement, ouvrant les sentiers de prairie de haute altitude au-dessus de 1600m ou les temperatures descendent a 12-15C. Les promenades en prairie entre les deux sommets sont larges, herbeuses et absolument calmes en semaine. Le vieux bourg est entierement praticable a pied avec un chien en laisse, et le lac Schwarzsee (2km de la ville) dispose d'une rive accessible aux chiens le matin avant l'ouverture de la zone de baignade.`,
    whyEs: `Kitzbühel se convierte en un tranquilo pueblo de senderismo en verano, vacio de las multitudes de la temporada de esqui y agradable a 800m donde las medias de julio rondan los 22C. Tanto el teleferico del Hahnenkamm como el gondola del Kitzbüheler Horn admiten perros con correa por una pequena tarifa, abriendo los senderos de prado de alta montana por encima de 1600m donde las temperaturas bajan a 12-15C. Los paseos por los prados entre las dos cumbres son anchos, cubiertos de hierba y completamente tranquilos entre semana. El casco antiguo es completamente recorrible a pie con un perro con correa, y el lago Schwarzsee (2km del pueblo) tiene una orilla accesible para perros por la manana antes de que abra la zona de bano.`,
    whyPt: `Kitzbühel torna-se uma tranquila aldeia de caminhadas no verao, vazia das multidoes da epoca de esqui e agradavel a 800m onde as medias de julho ficam em torno dos 22C. Tanto o telecabine do Hahnenkamm como o gondola do Kitzbüheler Horn aceitam caes a trela com uma pequena taxa, abrindo os trilhos de prado de alta montanha acima de 1600m onde as temperaturas descem a 12-15C. Os passeios nos prados entre os dois cumes sao largos, cobertos de erva e completamente calmos em dias de semana. A cidade velha e inteiramente percorrivel a pe com um cao a trela, e o lago Schwarzsee (2km da cidade) tem uma margem acessivel a caes de manha antes de abrir a zona de natacao.`,
    hotelName: 'Hotel Zur Tenne',
    hotelEn: `Hotel Zur Tenne is a boutique 4-star in the heart of Kitzbühel's old town, a stone's throw from the pedestrian zone and the Hahnenkamm cable car base. Dogs are welcomed at a standard fee, with a charming tiled hallway that has historically been dog-tolerant. The central location means zero car use needed for morning walks through the old town.`,
    hotelFr: `L'Hotel Zur Tenne est un boutique 4 etoiles au coeur du vieux bourg de Kitzbühel, a deux pas de la zone pietonne et de la base du telepherique du Hahnenkamm. Les chiens sont acceptes avec un supplement standard, avec un charmant couloir carele historiquement tolerant aux chiens. La situation centrale signifie zero voiture necessaire pour les promenades matinales dans le vieux bourg.`,
    hotelEs: `El Hotel Zur Tenne es un boutique 4 estrellas en el corazon del casco antiguo de Kitzbühel, a dos pasos de la zona peatonal y de la base del teleferico del Hahnenkamm. Los perros son bienvenidos con un suplemento estandar, con un encantador pasillo de azulejos historicamente tolerante con los perros. La ubicacion central significa cero uso del coche para los paseos matutinos por el casco antiguo.`,
    hotelPt: `O Hotel Zur Tenne e um boutique 4 estrelas no coracao da cidade velha de Kitzbühel, a dois passos da zona pedonal e da base do telecabine do Hahnenkamm. Os caes sao aceites com um suplemento padrao, com um encantador corredor de azulejos historicamente tolerante com caes. A localizacao central significa zero uso de carro para os passeios matinais pela cidade velha.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'PET-FRIENDLY SUMMER · ALPINE COOL EUROPE',
    title: `Dog-Friendly Alpine Summer: 8 Mountain Towns Under 22C`,
    intro: `When Mediterranean heat pushes July temperatures past 30C, the Alps are already sitting at 15-22C depending on altitude. For dogs with flat faces (French bulldogs, pugs, boxers), senior dogs, or simply any dog that pants heavily on warm days, an Alpine summer is not just pleasant: it is genuinely safe. These eight mountain towns offer verified dog-friendly cable cars, shaded trails, and pet-welcoming hotels in Switzerland, France, Italy, and Austria.`,
    pickHeading: 'The eight Alpine picks (ranked coolest to warmest)',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    julyLabel: 'July avg high',
    practicalHeading: 'Alpine dog travel: practical info',
    practical: [
      { h: 'Why altitude cools', p: `Temperature drops roughly 6.5C per 1000m of altitude gain (the standard atmospheric lapse rate). A valley at 500m sitting at 28C will be 21C at 1500m and only 14C at 2500m. This is why taking a cable car with your dog is not just a fun activity: on hot days it is the fastest way to drop 10C without driving anywhere. Most Alpine towns have a cable car or gondola within walking distance of the main street.` },
      { h: 'Cable cars with dogs in the Alps', p: `Most Swiss, Austrian, and some French and Italian Alpine cable cars accept leashed dogs, typically at 50-100% of the human ticket price. Policies vary: Swiss cable cars are the most consistently dog-friendly, Austrian lifts almost always accept dogs in summer, French lifts are more variable. Always check the specific lift operator's website before booking. In Switzerland, dogs travel at half the adult fare on most Jungfrau Region lifts.` },
      { h: 'Paw protection on rocky mountain trails', p: `High-altitude trails in the Alps often cross limestone scree, granite, and rough gravel that is far harder on paw pads than forest paths. On trails above 1800m, consider lightweight dog boots (Ruffwear Grip Trex is the most tested option) or at minimum paw wax (Musher's Secret) applied before the hike. Check paws after any trail longer than 3 hours for cuts or wear. Rocky approaches to glaciers and moraines are the highest-risk sections.` },
      { h: 'Water on mountain trails', p: `Mountain streams are abundant in the Alps and generally safe for dogs to drink, but carry at least 500ml in a collapsible bowl regardless. Glacial meltwater streams can be very cold in July (5-8C), which some dogs love and others avoid. Heat-stressed dogs should not drink icy cold water in large quantities: it can cause stomach cramps. Let an overheated dog cool down gradually before allowing a big drink. At altitude, dehydration happens faster than at sea level.` },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Can dogs go on Alpine cable cars?', a: `Most Alpine cable cars accept leashed dogs, but the policy varies by lift operator and country. Switzerland is the most consistently permissive: Jungfrau Region lifts, Titlis, and most Graubünden lifts accept dogs at half fare. In Austria, summer policies at Schmittenhöhe (Zell am See), Hahnenkamm (Kitzbühel), and Nordkette (Innsbruck) all accept dogs. French lifts are more variable: check each operator individually. The Aiguille du Midi in Chamonix is a notable exception that does not accept dogs. Italy's Ritten cable car (Bolzano) and Sardagna (Trento) accept dogs. Always check before arriving.` },
      { q: 'Is altitude safe for dogs?', a: `Most healthy dogs handle altitudes up to 3000m without issues. Symptoms of altitude sickness in dogs (lethargy, loss of appetite, labored breathing) typically only appear above 3000m. Below that level, the main concerns are temperature, UV radiation (dog noses can sunburn, especially on snow), and the physical demands of rocky terrain. Senior dogs and dogs with heart conditions should take altitude gains gradually. Descend immediately if your dog shows signs of distress, unusually fast breathing, or disorientation at altitude.` },
      { q: 'Are there off-leash areas in the Alps?', a: `Off-leash areas are less formalised in Alpine mountain areas than in Scandinavian cities, but in practice many high-altitude meadow trails are quiet enough to allow a well-recalled dog off leash with no conflict. Official off-leash parks exist in Annecy town, Zell am See, and Kitzbühel. On national park land (Hohe Tauern in Austria, Gran Paradiso in Italy) dogs must be on leash at all times. Switzerland's national park in Graubünden also requires leashes. Check the local park signage on arrival.` },
      { q: 'How hot do Alpine valleys get? The Foehn effect.', a: `Alpine valleys can get surprisingly hot due to the Foehn effect: warm, dry wind that descends from mountain passes and compresses, raising valley temperatures by 5-10C in hours. Innsbruck regularly hits 35C+ in July Foehn events, and Bolzano and Trento can spike to 37C in the same conditions. The cable-car-and-altitude strategy is specifically effective during Foehn events: while the valley swelters, the plateau 2000m above stays at 14C. Check Swiss and Austrian meteorological apps for Foehn forecasts before planning valley walks.` },
    ],
    relatedHeading: 'See also',
  },
  fr: {
    eyebrow: 'ETE PET-FRIENDLY · FRAICHEUR ALPINE',
    title: `Ete en montagne avec son chien : 8 villes alpines a moins de 22C`,
    intro: `Quand la chaleur mediterraneenne pousse les temperatures de juillet au-dessus de 30C, les Alpes sont deja a 15-22C selon l'altitude. Pour les chiens a face plate (bouledogues francais, carlins, boxers), les chiens ages, ou simplement tout chien qui halite beaucoup par temps chaud, un ete alpin n'est pas seulement agreable : il est genuinement sur. Ces huit villes de montagne proposent des telepheriques dog-friendly verifies, des sentiers ombres et des hotels accueillants en Suisse, France, Italie et Autriche.`,
    pickHeading: 'Les huit picks alpins (du plus frais au plus chaud)',
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Ou dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilites →',
    julyLabel: 'Max moyen juillet',
    practicalHeading: 'Voyage alpin avec son chien : infos pratiques',
    practical: [
      { h: "Pourquoi l'altitude rafraichit", p: `La temperature baisse d'environ 6,5C tous les 1000m de gain d'altitude (le gradient atmospherique standard). Une vallee a 500m et 28C sera a 21C a 1500m et seulement 14C a 2500m. C'est pourquoi prendre un telepherique avec votre chien n'est pas seulement une activite sympathique : par temps chaud, c'est le moyen le plus rapide de gagner 10C sans conduire nulle part. La plupart des villes alpines ont un telepherique ou une telecabine a distance a pied de la rue principale.` },
      { h: 'Telepheriques avec chiens dans les Alpes', p: `La plupart des telepheriques suisses, autrichiens, et certains francais et italiens acceptent les chiens en laisse, generalement a 50-100% du tarif adulte. Les politiques varient : les telepheriques suisses sont les plus systematiquement dog-friendly, les remontees autrichiennes acceptent presque toujours les chiens en ete, les remontees francaises sont plus variables. Verifiez toujours le site de l'exploitant avant de partir. En Suisse, les chiens voyagent a demi-tarif adulte sur la plupart des remontees de la region Jungfrau.` },
      { h: 'Protection des pattes sur les sentiers rocheux', p: `Les sentiers de haute altitude dans les Alpes traversent souvent des eboulis calcaires, du granit et des graviers rugueux beaucoup plus durs pour les coussinets que les chemins forestiers. Sur les sentiers au-dessus de 1800m, envisagez des chaussures legeres pour chien (Ruffwear Grip Trex est l'option la plus testee) ou au minimum une cire de patte (Musher's Secret) appliquee avant la randonnee. Verifiez les pattes apres tout sentier de plus de 3 heures pour des coupures ou de l'usure. Les approches rocheuses vers les glaciers et les moraines sont les sections a plus haut risque.` },
      { h: "L'eau sur les sentiers de montagne", p: `Les ruisseaux de montagne sont abondants dans les Alpes et generalement surs pour les chiens, mais emportez au moins 500ml dans une gamelle pliante quand meme. Les ruisseaux de fonte glaciaire peuvent etre tres froids en juillet (5-8C), ce que certains chiens adorent et d'autres evitent. Les chiens en stress thermique ne doivent pas boire de l'eau glacee en grande quantite : cela peut provoquer des crampes d'estomac. Laissez un chien surchauffe se refroidir progressivement avant de lui permettre une grande rasade. En altitude, la deshydratation survient plus vite qu'au niveau de la mer.` },
    ],
    faqHeading: 'Questions frequentes',
    faqs: [
      { q: 'Les chiens peuvent-ils prendre les telepheriques alpins ?', a: `La plupart des telepheriques alpins acceptent les chiens en laisse, mais la politique varie selon l'exploitant et le pays. La Suisse est la plus systematiquement permissive : les remontees de la region Jungfrau, Titlis et la plupart des remontees de Graubuenden acceptent les chiens a demi-tarif. En Autriche, les politiques estivales du Schmittenhöhe (Zell am See), Hahnenkamm (Kitzbuhel) et Nordkette (Innsbruck) acceptent tous les chiens. Les remontees francaises sont plus variables : verifiez chaque exploitant individuellement. L'Aiguille du Midi a Chamonix est une exception notable qui n'accepte pas les chiens. Le telepherique du Ritten (Bolzano) et de Sardagna (Trento) en Italie acceptent les chiens. Verifiez toujours avant d'arriver.` },
      { q: "L'altitude est-elle sans danger pour les chiens ?", a: `La plupart des chiens en bonne sante supportent les altitudes jusqu'a 3000m sans probleme. Les symptomes du mal des montagnes chez les chiens (lethargie, perte d'appetit, respiration difficile) n'apparaissent generalement qu'au-dessus de 3000m. En dessous de ce niveau, les principales preoccupations sont la temperature, les rayonnements UV (le nez des chiens peut bruler au soleil, surtout sur la neige) et les exigences physiques du terrain rocheux. Les chiens ages et ceux avec des problemes cardiaques doivent prendre les gains d'altitude progressivement. Redescendez immediatement si votre chien montre des signes de detresse, une respiration anormalement rapide ou de la desorientacion en altitude.` },
      { q: 'Y a-t-il des zones sans laisse dans les Alpes ?', a: `Les zones sans laisse sont moins formalisees dans les zones alpines de montagne que dans les villes scandinaves, mais en pratique de nombreux sentiers de prairies de haute altitude sont suffisamment calmes pour permettre a un chien bien rappele de se promener sans laisse sans conflit. Des parcs officiels sans laisse existent en ville d'Annecy, a Zell am See et a Kitzbuhel. Sur les terres des parcs nationaux (Hohe Tauern en Autriche, Grand Paradis en Italie) les chiens doivent etre en laisse a tout moment. Le parc national suisse en Graubuenden exige aussi la laisse. Verifiez les panneaux du parc local a votre arrivee.` },
      { q: 'A quelle temperature les vallees alpines peuvent-elles monter ? L\'effet Foehn.', a: `Les vallees alpines peuvent devenir surprenamment chaudes en raison de l'effet Foehn : un vent chaud et sec qui descend des cols de montagne et se comprime, elevant les temperatures en vallee de 5-10C en quelques heures. Innsbruck depasse regulierement 35C en juillet lors des episodes de Foehn, et Bolzano et Trente peuvent culminer a 37C dans les memes conditions. La strategie telepherique-altitude est particulierement efficace lors des episodes de Foehn : pendant que la vallee etouffe, le plateau 2000m plus haut reste a 14C. Consultez les applis meteo suisses et autrichiennes pour les previsions de Foehn avant de planifier les balades en vallee.` },
    ],
    relatedHeading: 'Voir aussi',
  },
  es: {
    eyebrow: 'VERANO PET-FRIENDLY · FRESCOR ALPINO',
    title: `Verano en los Alpes con tu perro: 8 pueblos de montana a menos de 22C`,
    intro: `Cuando el calor mediterraneo empuja las temperaturas de julio por encima de 30C, los Alpes ya estan a 15-22C segun la altitud. Para perros con cara chata (bulldogs franceses, carlinos, boxers), perros mayores, o simplemente cualquier perro que jadea mucho en dias calurosos, un verano alpino no es solo agradable: es genuinamente seguro. Estos ocho pueblos de montana ofrecen telefericos dog-friendly verificados, senderos sombreados y hoteles acogedores en Suiza, Francia, Italia y Austria.`,
    pickHeading: 'Las ocho elecciones alpinas (del mas fresco al mas calido)',
    whyHere: 'Por que aqui',
    hotelLabel: 'Donde alojarse',
    seeDestCta: 'Guia completa →',
    hotelCta: 'Ver disponibilidad →',
    julyLabel: 'Max media julio',
    practicalHeading: 'Info practica para viajar a la montana con tu perro',
    practical: [
      { h: 'Por que la altitud refresca', p: `La temperatura baja aproximadamente 6,5C por cada 1000m de ganancia de altitud (el gradiente atmosferico estandar). Un valle a 500m con 28C estara a 21C a 1500m y solo a 14C a 2500m. Por eso coger un teleferico con tu perro no es solo una actividad divertida: en dias calurosos es la forma mas rapida de bajar 10C sin conducir a ningun lado. La mayoria de los pueblos alpinos tienen un teleferico o gondola a distancia a pie de la calle principal.` },
      { h: 'Telefericos con perros en los Alpes', p: `La mayoria de los telefericos suizos, austriacos, y algunos franceses e italianos aceptan perros con correa, tipicamente al 50-100% del precio de la entrada adulto. Las politicas varian: los telefericos suizos son los mas sistematicamente dog-friendly, los remontes austriacos casi siempre admiten perros en verano, los remontes franceses son mas variables. Consulta siempre el sitio web del operador especifico antes de reservar. En Suiza, los perros viajan a la mitad del precio adulto en la mayoria de los remontes de la region Jungfrau.` },
      { h: 'Proteccion de las patas en senderos rochosos de montana', p: `Los senderos de alta altitud en los Alpes a menudo cruzan pedregales calizos, granito y grava rugosa que es mucho mas dura para las almohadillas que los caminos forestales. En senderos por encima de 1800m, considera botas ligeras para perro (Ruffwear Grip Trex es la opcion mas probada) o como minimo cera de pata (Musher's Secret) aplicada antes de la caminata. Revisa las patas despues de cualquier sendero de mas de 3 horas buscando cortes o desgaste. Los accesos rocosos a glaciares y morrenas son las secciones de mayor riesgo.` },
      { h: 'Agua en los senderos de montana', p: `Los arroyos de montana son abundantes en los Alpes y generalmente seguros para que los perros beban, pero lleva al menos 500ml en un bol plegable de todas formas. Los arroyos de deshielo glaciar pueden estar muy frios en julio (5-8C), lo que algunos perros adoran y otros evitan. Los perros con estres termico no deben beber agua muy fria en grandes cantidades: puede causar calambres de estomago. Deja que un perro recalentado se enfrie gradualmente antes de permitirle beber mucho. A gran altitud, la deshidratacion ocurre mas rapido que a nivel del mar.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: 'Pueden los perros subir en los telefericos alpinos?', a: `La mayoria de los telefericos alpinos admiten perros con correa, pero la politica varia segun el operador y el pais. Suiza es la mas sistematicamente permisiva: los remontes de la region Jungfrau, Titlis y la mayoria de los remontes de Graubunden admiten perros a tarifa reducida. En Austria, las politicas de verano del Schmittenhöhe (Zell am See), Hahnenkamm (Kitzbuhel) y Nordkette (Innsbruck) aceptan todos los perros. Los remontes franceses son mas variables: verifica cada operador individualmente. El Aiguille du Midi en Chamonix es una excepcion notable que no admite perros. Los telefericos del Ritten (Bolzano) y Sardagna (Trento) en Italia admiten perros. Comprueba siempre antes de llegar.` },
      { q: 'La altitud es segura para los perros?', a: `La mayoria de los perros sanos soportan altitudes de hasta 3000m sin problemas. Los sintomas del mal de altura en perros (letargia, perdida de apetito, respiracion dificultosa) tipicamente solo aparecen por encima de los 3000m. Por debajo de ese nivel, las principales preocupaciones son la temperatura, la radiacion UV (la nariz de los perros puede quemarse con el sol, especialmente en la nieve) y las exigencias fisicas del terreno rocoso. Los perros mayores y los que tienen problemas cardiacos deben tomar las ganancias de altitud gradualmente. Desciende inmediatamente si tu perro muestra signos de angustia, respiracion anormalmente rapida o desorientacion en altitud.` },
      { q: 'Hay zonas sin correa en los Alpes?', a: `Las zonas sin correa estan menos formalizadas en las zonas alpinas de montana que en las ciudades escandinavas, pero en la practica muchos senderos de prado de alta altitud son suficientemente tranquilos para permitir a un perro bien entrenado caminar sin correa sin conflictos. Existen parques oficiales sin correa en la ciudad de Annecy, Zell am See y Kitzbuhel. En terrenos de parque nacional (Hohe Tauern en Austria, Gran Paradiso en Italia) los perros deben ir siempre con correa. El parque nacional suizo en Graubunden tambien exige correa. Consulta la senalizacion del parque local a tu llegada.` },
      { q: 'Cuanto calor pueden llegar a hacer los valles alpinos? El efecto Foehn.', a: `Los valles alpinos pueden ponerse sorprendentemente calurosos por el efecto Foehn: un viento calido y seco que desciende desde los puertos de montana y se comprime, subiendo las temperaturas del valle 5-10C en horas. Innsbruck supera regularmente los 35C en julio durante los episodios de Foehn, y Bolzano y Trento pueden llegar a los 37C en las mismas condiciones. La estrategia teleferico-altitud es especificamente eficaz durante los episodios de Foehn: mientras el valle se abrasa, el plateau 2000m por encima permanece a 14C. Consulta las aplicaciones meteorologicas suizas y austriacas para los pronosticos de Foehn antes de planificar paseos por el valle.` },
    ],
    relatedHeading: 'Ver tambien',
  },
  pt: {
    eyebrow: 'VERAO PET-FRIENDLY · FRESCURA ALPINA',
    title: `Verao alpino com o seu cao: 8 cidades de montanha a menos de 22C`,
    intro: `Quando o calor mediterranico empurra as temperaturas de julho acima dos 30C, os Alpes ja estao a 15-22C dependendo da altitude. Para caes com cara achatada (bulldogs franceses, carlins, boxers), caes idosos, ou simplesmente qualquer cao que ofega muito em dias quentes, um verao alpino nao e apenas agradavel: e genuinamente seguro. Estas oito cidades de montanha oferecem telecabines dog-friendly verificadas, trilhos sombreados e hoteis acolhedores na Suica, Franca, Italia e Austria.`,
    pickHeading: 'As oito escolhas alpinas (da mais fresca a mais quente)',
    whyHere: 'Porque aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    julyLabel: 'Max media julho',
    practicalHeading: 'Info pratica para viajar a montanha com o seu cao',
    practical: [
      { h: 'Porque a altitude arrefece', p: `A temperatura desce cerca de 6,5C por cada 1000m de ganho de altitude (o gradiente atmosferico padrao). Um vale a 500m com 28C estara a 21C a 1500m e so a 14C a 2500m. E por isso que apanhar um telecabine com o seu cao nao e so uma atividade divertida: em dias quentes e a forma mais rapida de descer 10C sem conduzir para lado nenhum. A maioria das cidades alpinas tem um telecabine ou gondola a distancia a pe da rua principal.` },
      { h: 'Telecabines com caes nos Alpes', p: `A maioria dos telecabines suicos, austriacos, e alguns franceses e italianos aceitam caes a trela, tipicamente a 50-100% do preco do bilhete adulto. As politicas variam: os telecabines suicos sao os mais sistematicamente dog-friendly, os remontes austriacos aceitam quase sempre caes no verao, os remontes franceses sao mais variaveis. Verifique sempre o site do operador especifico antes de reservar. Na Suica, os caes viajam a meio preco do adulto na maioria dos remontes da regiao Jungfrau.` },
      { h: 'Protecao das patas em trilhos rochosos de montanha', p: `Os trilhos de alta altitude nos Alpes atravessam frequentemente cascalho calcario, granito e gravilha rugosa que e muito mais dura para as almofadinhas das patas do que os caminhos florestais. Em trilhos acima de 1800m, considere botas leves para cao (Ruffwear Grip Trex e a opcao mais testada) ou no minimo cera para patas (Musher's Secret) aplicada antes da caminhada. Verifique as patas apos qualquer trilho com mais de 3 horas a procura de cortes ou desgaste. As aproximacoes rochosas a glaciares e moreias sao as seccoes de maior risco.` },
      { h: 'Agua nos trilhos de montanha', p: `Os regatos de montanha sao abundantes nos Alpes e geralmente seguros para os caes beberem, mas leve pelo menos 500ml numa tigela dobravel de qualquer forma. Os regatos de degelo glaciar podem estar muito frios em julho (5-8C), o que alguns caes adoram e outros evitam. Caes com stress termico nao devem beber agua gelada em grandes quantidades: pode causar caibras no estomago. Deixe um cao sobreaquecido arrefecer gradualmente antes de lhe permitir beber muito. Ao nivel da altitude, a desidratacao acontece mais rapido do que ao nivel do mar.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'Os caes podem subir nos telecabines alpinos?', a: `A maioria dos telecabines alpinos aceita caes a trela, mas a politica varia consoante o operador e o pais. A Suica e a mais sistematicamente permissiva: os remontes da regiao Jungfrau, Titlis e a maioria dos remontes de Graubunden aceitam caes a meio preco. Na Austria, as politicas de verao do Schmittenhöhe (Zell am See), Hahnenkamm (Kitzbuhel) e Nordkette (Innsbruck) aceitam todos caes. Os remontes franceses sao mais variaveis: verifique cada operador individualmente. O Aiguille du Midi em Chamonix e uma excecao notavel que nao aceita caes. Os telecabines do Ritten (Bolzano) e Sardagna (Trento) em Italia aceitam caes. Verifique sempre antes de chegar.` },
      { q: 'A altitude e segura para os caes?', a: `A maioria dos caes saudaveis aguenta altitudes ate 3000m sem problemas. Os sintomas do mal de altitude nos caes (letargia, perda de apetite, respiracao dificultosa) tipicamente so aparecem acima dos 3000m. Abaixo desse nivel, as principais preocupacoes sao a temperatura, a radiacao UV (o nariz dos caes pode queimar-se com o sol, especialmente na neve) e as exigencias fisicas do terreno rochoso. Caes idosos e caes com problemas cardiacos devem ganhar altitude gradualmente. Desca imediatamente se o seu cao mostrar sinais de angustia, respiracao anormalmente rapida ou desorientacao em altitude.` },
      { q: 'Ha zonas sem trela nos Alpes?', a: `As zonas sem trela estao menos formalizadas nas areas alpinas de montanha do que nas cidades escandinavas, mas na pratica muitos trilhos de prado de alta altitude sao suficientemente calmos para permitir a um cao bem treinado caminhar sem trela sem conflitos. Existem parques oficiais sem trela na cidade de Annecy, Zell am See e Kitzbuhel. Em terrenos de parque nacional (Hohe Tauern na Austria, Gran Paradiso em Italia) os caes devem estar sempre a trela. O parque nacional suico em Graubunden tambem exige trela. Verifique a sinalizacao do parque local a chegada.` },
      { q: 'Quao quentes ficam os vales alpinos? O efeito Foehn.', a: `Os vales alpinos podem ficar surpreendentemente quentes devido ao efeito Foehn: um vento quente e seco que desce das passagens de montanha e se comprime, subindo as temperaturas do vale em 5-10C em horas. Innsbruck ultrapassa regularmente os 35C em julho durante os episodios de Foehn, e Bolzano e Trento podem atingir os 37C nas mesmas condicoes. A estrategia telecabine-altitude e especificamente eficaz durante os episodios de Foehn: enquanto o vale sufoca, o plateau 2000m acima fica a 14C. Consulte as aplicacoes meteorologicas suicas e austriacas para as previsoes de Foehn antes de planear passeios no vale.` },
    ],
    relatedHeading: 'Ver tambem',
  },
} as const

type Locale = keyof typeof COPY

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!hasLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  const t = COPY[locale] ?? COPY.en

  const stickyLabel = STICKY_LABELS[locale] ?? STICKY_LABELS.en

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/${locale}/guides` },
      { '@type': 'ListItem', position: 3, name: t.title, item: `${SITE_URL}/${locale}/guides/${SLUG}` },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.title,
    description: t.intro,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
  }

  const pickWhy = (p: Pick) => {
    if (locale === 'fr') return p.whyFr
    if (locale === 'es') return p.whyEs
    if (locale === 'pt') return p.whyPt
    return p.whyEn
  }
  const pickHotel = (p: Pick) => {
    if (locale === 'fr') return p.hotelFr
    if (locale === 'es') return p.hotelEs
    if (locale === 'pt') return p.hotelPt
    return p.hotelEn
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-cyan-600 to-emerald-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-100 mb-3">🏔️ {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-cyan-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-sky-50 to-emerald-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-sky-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-sky-700">{p.name}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
                <span className="ml-auto bg-sky-100 text-sky-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.julyLabel} {p.julyTemp}
                </span>
              </header>
              <div className="px-5 sm:px-7 py-5 space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.whyHere}</div>
                  <p className="text-stone-800 leading-relaxed">{pickWhy(p)}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.hotelLabel}</div>
                  <p className="text-stone-700 text-sm leading-relaxed">{pickHotel(p)}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-sky-700 hover:text-sky-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 5)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-sky-700 hover:underline"
                  >
                    {t.hotelCta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">🌡️ {t.practicalHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.practical.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-2">{p.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{p.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">❓ {t.faqHeading}</h2>
        <div className="space-y-4">
          {t.faqs.map((f, i) => (
            <details key={i} className="bg-white border border-stone-200 rounded-2xl group">
              <summary className="cursor-pointer p-5 font-semibold text-stone-900 list-none flex items-center justify-between">
                <span>{f.q}</span>
                <span className="text-stone-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-stone-700 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />

      <StickyHotelCTA
        label={stickyLabel.label}
        cta={stickyLabel.cta}
        href={buildAllezDestLink('Alps', 'Europe', `${CAMPAIGN_BASE}-sticky`, 5)}
      />
    </main>
  )
}
