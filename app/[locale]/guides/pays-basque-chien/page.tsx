import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezLink, buildAllezDestLink, buildStay22MapSrc } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'pays-basque-chien'
const CAMPAIGN_BASE = 'pays-basque-itinerary'

// Map centered between Bayonne, San Sebastián, Vitoria-Gasteiz, Bilbao.
const MAP_LAT = 43.15
const MAP_LNG = -2.27

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Basque Country dog-friendly road trip hotels', cta: 'See hotels' },
  fr: { label: `Hôtels du road trip au Pays basque avec chien`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles del road trip por el País Vasco con perro', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis do road trip pelo País Basco com cão', cta: 'Ver hotéis' },
  de: { label: 'Hundefreundliche Hotels für den Roadtrip durchs Baskenland', cta: 'Hotels ansehen' },
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
    en: `5-Day Pet-Friendly Basque Country Road Trip: Bayonne, San Sebastián, Vitoria-Gasteiz & Bilbao (2026)`,
    fr: `Road trip au Pays basque avec son chien en 5 jours : Bayonne, Saint-Sébastien, Vitoria-Gasteiz et Bilbao (2026)`,
    es: `Road trip pet-friendly por el País Vasco en 5 días: Bayona, San Sebastián, Vitoria-Gasteiz y Bilbao (2026)`,
    pt: `Road trip pet-friendly pelo País Basco em 5 dias: Bayonne, San Sebastián, Vitoria-Gasteiz e Bilbao (2026)`,
    de: `5-tägiger Roadtrip mit Hund durchs Baskenland: Bayonne, San Sebastián, Vitoria-Gasteiz und Bilbao (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `A 5-day cross-border pet-friendly road trip from French Bayonne through San Sebastián and Vitoria-Gasteiz to Bilbao and Getxo. The Vauban ramparts, the Concha bay, the European Green Capital's 5-park Anillo Verde, and the UNESCO Vizcaya Bridge - all with a leashed dog on the leash.`,
    fr: `Un road trip pet-friendly transfrontalier de 5 jours, de Bayonne à Bilbao en passant par Saint-Sébastien et Vitoria-Gasteiz. Les remparts Vauban, la baie de la Concha, l'Anillo Verde aux 5 parcs de la Green Capital européenne, et le Pont de Biscaye UNESCO - tout avec son chien en laisse.`,
    es: `Un road trip pet-friendly transfronterizo de 5 días, desde Bayona francesa pasando por San Sebastián y Vitoria-Gasteiz hasta Bilbao y Getxo. Las murallas Vauban, la bahía de la Concha, el Anillo Verde de 5 parques de la Capital Verde europea, y el Puente Vizcaya UNESCO - todo con perro con correa.`,
    pt: `Um road trip pet-friendly transfronteiriço de 5 dias, desde Bayonne francesa passando por San Sebastián e Vitoria-Gasteiz até Bilbao e Getxo. As muralhas Vauban, a baía da Concha, o Anillo Verde de 5 parques da Capital Verde europeia, e a Ponte Vizcaya UNESCO - tudo com cão à trela.`,
    de: `Ein 5-tägiger grenzüberschreitender Roadtrip mit Hund vom französischen Bayonne über San Sebastián und Vitoria-Gasteiz bis nach Bilbao und Getxo. Die Vauban-Stadtmauern, die Bucht von La Concha, der Anillo Verde mit 5 Parks der Europäischen Grünen Hauptstadt und die Vizcaya-Brücke, UNESCO-Welterbe, alles mit Hund an der Leine.`,
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

type Stop = {
  slug: string
  name: string
  country: string
  countryCode: 'FR' | 'ES'
  nights: number
  drive: { fr: string; en: string; es: string; pt: string; de: string }
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  whyDe: string
  highlightsEn: string[]
  highlightsFr: string[]
  highlightsEs: string[]
  highlightsPt: string[]
  highlightsDe: string[]
  hotels: { name: string; pitchEn: string; pitchFr: string; pitchEs: string; pitchPt: string; pitchDe: string }[]
  hasDestPage?: boolean
}

const STOPS: Stop[] = [
  {
    slug: 'bayonne',
    name: 'Bayonne',
    country: 'France',
    countryCode: 'FR',
    nights: 1,
    drive: {
      en: `Arrival: TGV from Paris to Bayonne (4h10) or fly to Biarritz airport (BIQ) 8 km away. Park at Parking Tour de Sault and walk the Vauban ramparts into the old town.`,
      fr: `Arrivée : TGV depuis Paris à Bayonne (4h10) ou aéroport de Biarritz (BIQ) à 8 km. Parking Tour de Sault puis on entre dans la vieille ville par les remparts Vauban à pied.`,
      es: `Llegada: TGV desde París a Bayona (4h10) o aeropuerto de Biarritz (BIQ) a 8 km. Aparca en Parking Tour de Sault y entra al casco antiguo a pie por las murallas Vauban.`,
      pt: `Chegada: TGV desde Paris a Bayonne (4h10) ou aeroporto de Biarritz (BIQ) a 8 km. Estacione no Parking Tour de Sault e entre na cidade velha a pé pelas muralhas Vauban.`,
      de: `Anreise: TGV von Paris nach Bayonne (4:10 Std.) oder Flug zum Flughafen Biarritz (BIQ), 8 km entfernt. Parken Sie am Parking Tour de Sault und gehen Sie über die Vauban-Stadtmauern in die Altstadt.`,
    },
    whyEn: `Bayonne is the French Basque capital and the gentle entry point of the loop. The 2.5 km Vauban ramparts loop is a leashed dog walk with the Adour river view, the Halles de Bayonne market opens at 6:00 with leashed dogs welcome on the cafe terrace side, and Petit Bayonne across the Nive is the cheese-jambon-chocolate-Cazenave quartier where Basque culture and Atlantic appetite meet.`,
    whyFr: `Bayonne, c'est la capitale basque française et l'entrée douce de la boucle. La boucle de 2,5 km des remparts Vauban se fait en laisse avec vue sur l'Adour, les Halles de Bayonne ouvrent à 6h et acceptent les chiens en laisse côté terrasses, et le Petit Bayonne de l'autre côté de la Nive est le quartier fromage-jambon-chocolat Cazenave où culture basque et appétit atlantique se rencontrent.`,
    whyEs: `Bayona es la capital vasco-francesa y la entrada amable del circuito. El circuito de 2,5 km de las murallas Vauban se hace con perro con correa con vista al Adour, las Halles de Bayonne abren a las 6h y admiten perros con correa en las terrazas, y el Petit Bayonne al otro lado del Nive es el barrio queso-jamón-chocolate Cazenave donde se cruzan cultura vasca y apetito atlántico.`,
    whyPt: `Bayonne é a capital basca francesa e a entrada gentil do circuito. O circuito de 2,5 km das muralhas Vauban faz-se com cão à trela com vista para o Adour, as Halles de Bayonne abrem às 6h e aceitam cães à trela nas esplanadas, e o Petit Bayonne do outro lado do Nive é o bairro queijo-presunto-chocolate Cazenave onde se cruzam cultura basca e apetite atlântico.`,
    whyDe: `Bayonne ist die französische baskische Hauptstadt und der sanfte Einstieg in die Rundreise. Die 2,5 km lange Runde entlang der Vauban-Stadtmauern ist ein Spaziergang mit Hund an der Leine mit Blick auf den Adour, die Markthalle Halles de Bayonne öffnet um 6:00 Uhr und Hunde an der Leine sind auf der Terrassenseite willkommen, und das Petit Bayonne jenseits der Nive ist das Käse-Schinken-Schokolade-Cazenave-Viertel, in dem baskische Kultur und atlantischer Appetit aufeinandertreffen.`,
    highlightsEn: [
      `Vauban ramparts loop: 2.5 km flat circuit, leashed dogs welcome`,
      `Halles de Bayonne: covered market terraces, dogs OK outdoor`,
      `Petit Bayonne quartier: jambon shops, Cazenave chocolate, Nive quays`,
      `Cathedrale Sainte-Marie exterior + cloister courtyard (no dogs inside)`,
    ],
    highlightsFr: [
      `Boucle des remparts Vauban : 2,5 km plats, chiens en laisse bienvenus`,
      `Halles de Bayonne : terrasses du marché couvert, chiens OK à l'extérieur`,
      `Petit Bayonne : jambonneries, Cazenave chocolat, quais de la Nive`,
      `Cathédrale Sainte-Marie extérieur + cloître (chiens non à l'intérieur)`,
    ],
    highlightsEs: [
      `Circuito murallas Vauban: 2,5 km llanos, perros con correa bienvenidos`,
      `Halles de Bayonne: terrazas del mercado cubierto, perros OK al aire libre`,
      `Petit Bayonne: jamonerías, chocolate Cazenave, muelles del Nive`,
      `Catedral Sainte-Marie exterior + claustro (perros no dentro)`,
    ],
    highlightsPt: [
      `Circuito muralhas Vauban: 2,5 km planos, cães à trela bem-vindos`,
      `Halles de Bayonne: esplanadas do mercado coberto, cães OK ao ar livre`,
      `Petit Bayonne: lojas de presunto, chocolate Cazenave, cais do Nive`,
      `Catedral Sainte-Marie exterior + claustro (cães não dentro)`,
    ],
    highlightsDe: [
      `Runde entlang der Vauban-Stadtmauern: 2,5 km flacher Rundweg, Hunde an der Leine willkommen`,
      `Halles de Bayonne: Terrassen der überdachten Markthalle, Hunde draußen erlaubt`,
      `Viertel Petit Bayonne: Schinkenläden, Schokolade Cazenave, Kais der Nive`,
      `Kathedrale Sainte-Marie außen + Kreuzgang (Hunde nicht im Innenraum)`,
    ],
    hotels: [
      {
        name: 'Hôtel des Basses Pyrénées Bayonne',
        pitchEn: `Boutique 3-star in a 16th-century mansion on Quai des Corsaires, 2 min walk to the Halles and the Petit Bayonne bridge. Pets up to 10 kg welcomed for a small fee.`,
        pitchFr: `Boutique 3 étoiles dans un hôtel particulier du XVIᵉ sur le Quai des Corsaires, 2 min des Halles et du pont du Petit Bayonne. Chiens jusqu'à 10 kg acceptés (petit supplément).`,
        pitchEs: `Boutique 3 estrellas en un palacete del siglo XVI en el Quai des Corsaires, 2 min de las Halles y del puente del Petit Bayonne. Perros hasta 10 kg admitidos (pequeño suplemento).`,
        pitchPt: `Boutique 3 estrelas num palacete do século XVI no Quai des Corsaires, 2 min das Halles e da ponte do Petit Bayonne. Cães até 10 kg aceites (pequena taxa).`,
        pitchDe: `Boutique-3-Sterne-Hotel in einem Stadtpalais aus dem 16. Jahrhundert am Quai des Corsaires, 2 Minuten von den Halles und der Brücke zum Petit Bayonne entfernt. Hunde bis 10 kg willkommen (kleiner Aufpreis).`,
      },
      {
        name: 'Ibis Bayonne Centre',
        pitchEn: `Budget-friendly 3-star opposite the SNCF station with covered parking. Pets up to 10 kg welcomed, easy 10-min walk over the Adour to the old town.`,
        pitchFr: `3 étoiles abordable face à la gare SNCF avec parking couvert. Chiens jusqu'à 10 kg acceptés, 10 min à pied au-dessus de l'Adour jusqu'à la vieille ville.`,
        pitchEs: `3 estrellas asequible frente a la estación SNCF con parking cubierto. Perros hasta 10 kg admitidos, 10 min andando sobre el Adour hasta el casco antiguo.`,
        pitchPt: `3 estrelas acessível em frente à estação SNCF com parking coberto. Cães até 10 kg aceites, 10 min a pé sobre o Adour até à cidade velha.`,
        pitchDe: `Preiswertes 3-Sterne-Hotel gegenüber dem Bahnhof SNCF mit überdachtem Parkplatz. Hunde bis 10 kg willkommen, 10 Minuten Fußweg über den Adour bis zur Altstadt.`,
      },
    ],
    hasDestPage: true,
  },
  {
    slug: 'san-sebastian',
    name: 'San Sebastián',
    country: 'Spain',
    countryCode: 'ES',
    nights: 2,
    drive: {
      en: `Bayonne to San Sebastián: 53 km, ~50 min via the A63/AP-8 (toll). Cross the Bidasoa river into Spain at Irún. Park at Parking Boulevard and walk along the Concha bay to the old town.`,
      fr: `Bayonne à Saint-Sébastien : 53 km, environ 50 min par l'A63/AP-8 (péage). On traverse la Bidassoa pour entrer en Espagne à Irun. Parking Boulevard puis à pied le long de la Concha jusqu'à la vieille ville.`,
      es: `Bayona a San Sebastián: 53 km, ~50 min por A63/AP-8 (peaje). Cruzas el Bidasoa entrando en España por Irún. Aparca en Parking Boulevard y a pie por la Concha hasta el casco antiguo.`,
      pt: `Bayonne a San Sebastián: 53 km, ~50 min pela A63/AP-8 (portagem). Atravessa o Bidasoa entrando em Espanha por Irún. Estacione em Parking Boulevard e a pé pela Concha até à cidade velha.`,
      de: `Bayonne nach San Sebastián: 53 km, ca. 50 Min. über die A63/AP-8 (mautpflichtig). Überqueren Sie den Fluss Bidasoa und erreichen Sie Spanien bei Irún. Parken Sie am Parking Boulevard und gehen Sie entlang der Bucht von La Concha zur Altstadt.`,
    },
    whyEn: `Two nights for the heart of Basque Spain: the 1.5 km Concha bay seafront where leashed dogs walk year-round (the beach itself is off-limits between Easter and 30 September), Mount Igueldo's panoramic walk, and the Parte Vieja pintxos quarter where every other terrace welcomes a polite dog under the table. Day trip option to Hondarribia (45 min east) or Pasaia harbour (15 min) for a different Basque flavour.`,
    whyFr: `Deux nuits pour le cœur de l'Espagne basque : 1,5 km de promenade sur la baie de la Concha où les chiens en laisse circulent toute l'année (la plage elle-même est interdite entre Pâques et le 30 septembre), la montée panoramique au Mont Igueldo, et la Parte Vieja des pintxos où une terrasse sur deux accueille un chien sage sous la table. Day trip possible à Hondarribia (45 min est) ou au port de Pasaia (15 min) pour une autre saveur basque.`,
    whyEs: `Dos noches para el corazón del País Vasco español: 1,5 km de paseo por la bahía de la Concha donde los perros con correa circulan todo el año (la playa en sí está prohibida entre Semana Santa y el 30 de septiembre), la subida panorámica al Monte Igueldo, y la Parte Vieja de pintxos donde una terraza de cada dos admite un perro tranquilo bajo la mesa. Excursión opcional a Hondarribia (45 min este) o al puerto de Pasaia (15 min) por otro sabor vasco.`,
    whyPt: `Duas noites para o coração do País Basco espanhol: 1,5 km de passeio pela baía da Concha onde os cães à trela circulam todo o ano (a praia em si está proibida entre Páscoa e 30 de setembro), a subida panorâmica ao Monte Igueldo, e a Parte Vieja de pintxos onde uma esplanada em cada duas aceita um cão calmo debaixo da mesa. Excursão opcional a Hondarribia (45 min leste) ou ao porto de Pasaia (15 min) por outro sabor basco.`,
    whyDe: `Zwei Nächte für das Herz des spanischen Baskenlands: die 1,5 km lange Strandpromenade an der Concha-Bucht, an der Hunde an der Leine das ganze Jahr über spazieren gehen (der Strand selbst ist zwischen Ostern und dem 30. September gesperrt), der Panoramaweg auf dem Monte Igueldo, und das Pintxos-Viertel Parte Vieja, in dem jede zweite Terrasse einen wohlerzogenen Hund unter dem Tisch willkommen heißt. Als Tagesausflug bieten sich Hondarribia (45 Min. östlich) oder der Hafen von Pasaia (15 Min.) für eine andere baskische Note an.`,
    highlightsEn: [
      `Concha bay 1.5 km seafront: leashed dogs year-round (beach itself banned Easter-30 Sept)`,
      `Monte Igueldo funicular + panoramic walk (dogs in arms accepted in cabin)`,
      `Parte Vieja pintxos quarter: dog-friendly terraces, water bowls on request`,
      `Day trip Hondarribia (45 min): walled fishing village, dog-friendly old town`,
    ],
    highlightsFr: [
      `Promenade de la Concha 1,5 km : chiens en laisse toute l'année (plage interdite Pâques-30 sept)`,
      `Funiculaire et belvédère du Mont Igueldo (chiens dans les bras dans la cabine)`,
      `Parte Vieja : terrasses pintxos tolérantes, gamelle d'eau sur demande`,
      `Day trip à Hondarribia (45 min) : village de pêcheurs remparé, vieille ville dog-friendly`,
    ],
    highlightsEs: [
      `Paseo de la Concha 1,5 km: perros con correa todo el año (playa prohibida Semana Santa-30 sept)`,
      `Funicular y mirador del Monte Igueldo (perros en brazos en la cabina)`,
      `Parte Vieja: terrazas de pintxos tolerantes, cuenco de agua a petición`,
      `Excursión a Hondarribia (45 min): pueblo pesquero amurallado, casco antiguo dog-friendly`,
    ],
    highlightsPt: [
      `Passeio da Concha 1,5 km: cães à trela todo o ano (praia proibida Páscoa-30 set)`,
      `Funicular e miradouro do Monte Igueldo (cães ao colo na cabine)`,
      `Parte Vieja: esplanadas de pintxos tolerantes, tigela de água a pedido`,
      `Excursão a Hondarribia (45 min): aldeia piscatória muralhada, cidade velha dog-friendly`,
    ],
    highlightsDe: [
      `Concha-Bucht, 1,5 km Strandpromenade: Hunde an der Leine ganzjährig (Strand selbst gesperrt Ostern-30. Sept.)`,
      `Standseilbahn und Panoramaweg auf dem Monte Igueldo (Hunde auf dem Arm in der Kabine erlaubt)`,
      `Pintxos-Viertel Parte Vieja: hundefreundliche Terrassen, Wassernapf auf Anfrage`,
      `Tagesausflug Hondarribia (45 Min.): ummauertes Fischerdorf, hundefreundliche Altstadt`,
    ],
    hotels: [
      {
        name: 'Hotel Maria Cristina, a Luxury Collection Hotel',
        pitchEn: `Belle Époque 5-star on the Urumea river, 5 min walk to the Concha. Pets up to 18 kg welcomed (mid fee), dog bed and bowl provided, the Bellas Artes lobby tolerates a quiet leashed dog.`,
        pitchFr: `5 étoiles Belle Époque en bord de l'Urumea, 5 min à pied de la Concha. Chiens jusqu'à 18 kg acceptés (supplément modéré), panier et gamelle fournis, le lobby Beaux-Arts tolère un chien en laisse calme.`,
        pitchEs: `5 estrellas Belle Époque junto al Urumea, 5 min andando a la Concha. Perros hasta 18 kg admitidos (suplemento moderado), cama y comedero, el lobby de Bellas Artes tolera un perro con correa tranquilo.`,
        pitchPt: `5 estrelas Belle Époque junto ao Urumea, 5 min a pé da Concha. Cães até 18 kg aceites (taxa moderada), cama e tigela, o lobby de Belas Artes tolera um cão à trela calmo.`,
        pitchDe: `Belle-Époque-5-Sterne-Hotel am Fluss Urumea, 5 Minuten Fußweg zur Concha. Hunde bis 18 kg willkommen (mittlerer Aufpreis), Hundebett und Napf werden gestellt, die Lobby Bellas Artes toleriert einen ruhigen Hund an der Leine.`,
      },
      {
        name: 'Hotel Niza',
        pitchEn: `4-star directly on the Concha boardwalk with sea-view rooms. Pets up to 10 kg welcomed (small fee), no need to use the car all weekend, you wake up across from the bay.`,
        pitchFr: `4 étoiles directement sur la promenade de la Concha avec chambres vue mer. Chiens jusqu'à 10 kg acceptés (petit supplément), pas besoin de reprendre la voiture du week-end, on se réveille face à la baie.`,
        pitchEs: `4 estrellas directamente en el paseo de la Concha con habitaciones vistas al mar. Perros hasta 10 kg admitidos (pequeño suplemento), sin necesidad de coche el fin de semana, te despiertas frente a la bahía.`,
        pitchPt: `4 estrelas diretamente no passeio da Concha com quartos vista mar. Cães até 10 kg aceites (pequena taxa), sem precisar de carro no fim-de-semana, acorda frente à baía.`,
        pitchDe: `4-Sterne-Hotel direkt an der Strandpromenade der Concha mit Zimmern mit Meerblick. Hunde bis 10 kg willkommen (kleiner Aufpreis), das ganze Wochenende ohne Auto, Sie wachen direkt gegenüber der Bucht auf.`,
      },
    ],
    hasDestPage: true,
  },
  {
    slug: 'vitoria-gasteiz',
    name: 'Vitoria-Gasteiz',
    country: 'Spain',
    countryCode: 'ES',
    nights: 1,
    drive: {
      en: `San Sebastián to Vitoria-Gasteiz: 100 km, ~1h10 via the AP-1 (toll) crossing the Alava plateau. Park at Parking Andra Mari and walk into the medieval old town on the hill.`,
      fr: `Saint-Sébastien à Vitoria-Gasteiz : 100 km, environ 1h10 par l'AP-1 (péage) à travers le plateau d'Alava. Parking Andra Mari puis à pied dans la vieille ville médiévale sur la colline.`,
      es: `San Sebastián a Vitoria-Gasteiz: 100 km, ~1h10 por la AP-1 (peaje) cruzando la meseta de Álava. Aparca en Parking Andra Mari y a pie al casco medieval en la colina.`,
      pt: `San Sebastián a Vitoria-Gasteiz: 100 km, ~1h10 pela AP-1 (portagem) atravessando o planalto de Álava. Estacione em Parking Andra Mari e a pé até à cidade medieval na colina.`,
      de: `San Sebastián nach Vitoria-Gasteiz: 100 km, ca. 1:10 Std. über die AP-1 (mautpflichtig) durch die Hochebene von Álava. Parken Sie am Parking Andra Mari und gehen Sie zu Fuß in die mittelalterliche Altstadt auf dem Hügel.`,
    },
    whyEn: `Vitoria-Gasteiz is the European Green Capital 2012 and the underrated jewel of the loop: the Anillo Verde is a ring of 5 large parks around the city (Salburua wetlands with European storks, Olarizu botanical garden, Zabalgana, Armentia oak forest, Zadorra reservoir) where leashed dogs walk on hundreds of km of paths and 4 of them have off-leash zones. The Casco Medieval almond-shaped hilltop is car-free, dog-friendly and gentle on tired paws.`,
    whyFr: `Vitoria-Gasteiz, c'est la Capitale verte européenne 2012 et le bijou sous-coté de la boucle : l'Anillo Verde est un anneau de 5 grands parcs autour de la ville (zones humides de Salburua avec ses cigognes, jardin botanique d'Olarizu, Zabalgana, forêt de chênes d'Armentia, réservoir du Zadorra) où les chiens en laisse circulent sur des centaines de km de sentiers, et 4 d'entre eux ont des zones sans laisse. Le Casco Medieval en amande sur la colline est piéton, dog-friendly et doux sur les coussinets fatigués.`,
    whyEs: `Vitoria-Gasteiz es la Capital Verde Europea 2012 y la joya infravalorada del circuito: el Anillo Verde es un anillo de 5 grandes parques alrededor de la ciudad (humedales de Salburua con cigüeñas, jardín botánico de Olarizu, Zabalgana, robledal de Armentia, embalse del Zadorra) donde los perros con correa circulan por cientos de km de senderos y 4 de ellos tienen zonas sin correa. El Casco Medieval almendrado en la colina es peatonal, dog-friendly y suave para almohadillas cansadas.`,
    whyPt: `Vitoria-Gasteiz é a Capital Verde Europeia 2012 e a joia subvalorizada do circuito: o Anillo Verde é um anel de 5 grandes parques à volta da cidade (zonas húmidas de Salburua com cegonhas, jardim botânico de Olarizu, Zabalgana, carvalhal de Armentia, albufeira do Zadorra) onde os cães à trela circulam por centenas de km de trilhos e 4 deles têm zonas sem trela. O Casco Medieval amendoado na colina é pedonal, dog-friendly e suave para almofadinhas cansadas.`,
    whyDe: `Vitoria-Gasteiz ist Europäische Grüne Hauptstadt 2012 und das unterschätzte Juwel der Rundreise: der Anillo Verde ist ein Ring aus 5 großen Parks rund um die Stadt (Feuchtgebiete Salburua mit europäischen Störchen, botanischer Garten Olarizu, Zabalgana, Eichenwald Armentia, Stausee Zadorra), auf dem Hunde an der Leine auf Hunderten von Kilometern Wegen spazieren gehen können, und 4 davon haben Freilaufzonen. Der mandelförmige Casco Medieval auf dem Hügel ist autofrei, hundefreundlich und schonend für müde Pfoten.`,
    highlightsEn: [
      `Anillo Verde: 5 parks ring, 4 with off-leash zones, storks at Salburua`,
      `Casco Medieval: almond hilltop, cobbled lanes, leashed dogs welcome`,
      `Plaza de la Virgen Blanca: covered arcaded square, dog-tolerant terraces`,
      `Cathedral of Santa María Restoration Tour (assistance dogs only inside)`,
    ],
    highlightsFr: [
      `Anillo Verde : 5 parcs en anneau, 4 avec zones sans laisse, cigognes à Salburua`,
      `Casco Medieval : amande en haut de colline, ruelles pavées, chiens en laisse OK`,
      `Plaza de la Virgen Blanca : place à arcades, terrasses tolérantes`,
      `Visite restauration Cathédrale Santa María (chiens d'assistance uniquement)`,
    ],
    highlightsEs: [
      `Anillo Verde: 5 parques en anillo, 4 con zonas sin correa, cigüeñas en Salburua`,
      `Casco Medieval: almendra en lo alto de la colina, callejuelas, perros con correa OK`,
      `Plaza de la Virgen Blanca: plaza porticada, terrazas tolerantes`,
      `Visita restauración Catedral Santa María (solo perros de asistencia dentro)`,
    ],
    highlightsPt: [
      `Anillo Verde: 5 parques em anel, 4 com zonas sem trela, cegonhas em Salburua`,
      `Casco Medieval: amêndoa no alto da colina, ruelas, cães à trela OK`,
      `Plaza de la Virgen Blanca: praça com arcadas, esplanadas tolerantes`,
      `Visita restauração Catedral Santa María (apenas cães de assistência dentro)`,
    ],
    highlightsDe: [
      `Anillo Verde: Ring aus 5 Parks, 4 mit Freilaufzonen, Störche in Salburua`,
      `Casco Medieval: Mandelform auf dem Hügel, Kopfsteinpflastergassen, Hunde an der Leine willkommen`,
      `Plaza de la Virgen Blanca: überdachter Arkadenplatz, hundetolerante Terrassen`,
      `Restaurierungsführung Kathedrale Santa María (nur Assistenzhunde im Innenraum)`,
    ],
    hotels: [
      {
        name: 'Silken Ciudad de Vitoria',
        pitchEn: `Modern 4-star opposite the Artium contemporary art museum, 8 min walk to the Casco Medieval. Pets up to 15 kg welcomed (small fee), private parking, walking distance to Salburua wetlands via Calle Postas.`,
        pitchFr: `4 étoiles moderne face au musée d'art contemporain Artium, 8 min à pied du Casco Medieval. Chiens jusqu'à 15 kg acceptés (petit supplément), parking privé, à pied jusqu'aux zones humides de Salburua par la Calle Postas.`,
        pitchEs: `4 estrellas moderno frente al museo de arte contemporáneo Artium, 8 min andando al Casco Medieval. Perros hasta 15 kg admitidos (pequeño suplemento), parking privado, andando hasta los humedales de Salburua por la Calle Postas.`,
        pitchPt: `4 estrelas moderno em frente ao museu de arte contemporânea Artium, 8 min a pé do Casco Medieval. Cães até 15 kg aceites (pequena taxa), parking privado, a pé até às zonas húmidas de Salburua pela Calle Postas.`,
        pitchDe: `Modernes 4-Sterne-Hotel gegenüber dem Museum für zeitgenössische Kunst Artium, 8 Minuten Fußweg zum Casco Medieval. Hunde bis 15 kg willkommen (kleiner Aufpreis), Privatparkplatz, zu Fuß erreichbar zu den Feuchtgebieten Salburua über die Calle Postas.`,
      },
      {
        name: 'NH Canciller Ayala Vitoria',
        pitchEn: `Reliable 4-star NH chain in front of the Florida park, 6 min walk to the medieval hilltop. Pets up to 15 kg welcomed (small fee), dog bed on request, easy access to the Anillo Verde via Avenida Gasteiz.`,
        pitchFr: `4 étoiles NH fiable face au parc de la Florida, 6 min à pied de la colline médiévale. Chiens jusqu'à 15 kg acceptés (petit supplément), panier sur demande, accès facile à l'Anillo Verde par l'Avenida Gasteiz.`,
        pitchEs: `4 estrellas NH fiable frente al parque de la Florida, 6 min andando a la colina medieval. Perros hasta 15 kg admitidos (pequeño suplemento), cama a petición, acceso fácil al Anillo Verde por Avenida Gasteiz.`,
        pitchPt: `4 estrelas NH fiável em frente ao parque da Florida, 6 min a pé da colina medieval. Cães até 15 kg aceites (pequena taxa), cama a pedido, acesso fácil ao Anillo Verde pela Avenida Gasteiz.`,
        pitchDe: `Zuverlässiges 4-Sterne-Hotel der NH-Kette vor dem Park Florida, 6 Minuten Fußweg zum mittelalterlichen Hügel. Hunde bis 15 kg willkommen (kleiner Aufpreis), Hundebett auf Anfrage, einfacher Zugang zum Anillo Verde über die Avenida Gasteiz.`,
      },
    ],
    hasDestPage: true,
  },
  {
    slug: 'bilbao',
    name: 'Bilbao',
    country: 'Spain',
    countryCode: 'ES',
    nights: 1,
    drive: {
      en: `Vitoria-Gasteiz to Bilbao: 65 km, ~50 min via the AP-68 dropping through the Ebro hills. Add 15 min for the Getxo day trip via Metro Line 1 (leashed dogs free up to 8 kg with muzzle).`,
      fr: `Vitoria-Gasteiz à Bilbao : 65 km, environ 50 min par l'AP-68 en descendant les collines de l'Èbre. Ajoutez 15 min pour le day trip à Getxo via la ligne 1 du métro (chien en laisse gratuit jusqu'à 8 kg avec muselière).`,
      es: `Vitoria-Gasteiz a Bilbao: 65 km, ~50 min por AP-68 bajando las colinas del Ebro. Añade 15 min para la excursión a Getxo por la línea 1 del metro (perro con correa gratis hasta 8 kg con bozal).`,
      pt: `Vitoria-Gasteiz a Bilbao: 65 km, ~50 min pela AP-68 descendo as colinas do Ebro. Adicione 15 min para a excursão a Getxo pela linha 1 do metro (cão à trela gratuito até 8 kg com açaime).`,
      de: `Vitoria-Gasteiz nach Bilbao: 65 km, ca. 50 Min. über die AP-68 durch die Hügel des Ebro. Rechnen Sie 15 Minuten zusätzlich für den Tagesausflug nach Getxo mit der Metro-Linie 1 (Hunde an der Leine bis 8 kg mit Maulkorb kostenlos).`,
    },
    whyEn: `Bilbao closes the loop with two cities for one: the Guggenheim with its mirror-pond and Jeff Koons puppy (the building exterior welcomes leashed dogs, the museum interior does not), the Casco Viejo Siete Calles for pintxos, and the Nervion riverside walk. Then Metro Line 1 to Getxo in 25 minutes for the UNESCO Vizcaya Bridge, which has accepted leashed dogs up to 40 kg on the high-level walkway since December 2017 - a remarkable Riviera rarity for a UNESCO World Heritage site.`,
    whyFr: `Bilbao clôt la boucle avec deux villes pour une : le Guggenheim avec son miroir d'eau et le Puppy de Jeff Koons (l'extérieur accueille les chiens en laisse, l'intérieur non), le Casco Viejo Siete Calles pour les pintxos, et la promenade du Nervión. Puis la ligne 1 du métro vers Getxo en 25 minutes pour le Pont de Biscaye UNESCO, qui accepte les chiens en laisse jusqu'à 40 kg sur la passerelle haute depuis décembre 2017 - une rareté pour un site UNESCO mondial.`,
    whyEs: `Bilbao cierra el circuito con dos ciudades en una: el Guggenheim con su espejo de agua y el Puppy de Jeff Koons (el exterior admite perros con correa, el interior no), el Casco Viejo de las Siete Calles para pintxos, y el paseo del Nervión. Luego la línea 1 del metro a Getxo en 25 minutos para el Puente Vizcaya UNESCO, que admite perros con correa hasta 40 kg en la pasarela alta desde diciembre de 2017 - una rareza para un sitio UNESCO mundial.`,
    whyPt: `Bilbao fecha o circuito com duas cidades em uma: o Guggenheim com o seu espelho de água e o Puppy de Jeff Koons (o exterior aceita cães à trela, o interior não), o Casco Viejo das Sete Ruas para pintxos, e o passeio do Nervión. Depois a linha 1 do metro a Getxo em 25 minutos para a Ponte Vizcaya UNESCO, que aceita cães à trela até 40 kg na passarela alta desde dezembro de 2017 - uma raridade para um sítio UNESCO mundial.`,
    whyDe: `Bilbao schließt die Rundreise mit zwei Städten in einer: das Guggenheim mit seinem Spiegelteich und dem Puppy von Jeff Koons (der Außenbereich heißt Hunde an der Leine willkommen, der Innenraum des Museums nicht), das Pintxos-Viertel Casco Viejo Siete Calles, und der Spaziergang entlang des Nervión. Danach mit der Metro-Linie 1 in 25 Minuten nach Getxo zur Vizcaya-Brücke, UNESCO-Welterbe, die seit Dezember 2017 Hunde an der Leine bis 40 kg auf dem hoch gelegenen Steg zulässt - eine bemerkenswerte Seltenheit für eine UNESCO-Welterbestätte.`,
    highlightsEn: [
      `Guggenheim Bilbao exterior + Puppy floral sculpture (leashed dogs welcome outside)`,
      `Casco Viejo Siete Calles: pintxos crawl, dog-friendly terraces`,
      `Nervion riverside walk: Zubizuri footbridge, Salve bridge, modernist promenade`,
      `Day trip Getxo via Metro Line 1: UNESCO Vizcaya Bridge dogs up to 40 kg + Punta Galea cliff trail`,
    ],
    highlightsFr: [
      `Guggenheim Bilbao extérieur + Puppy floral de Jeff Koons (chiens en laisse à l'extérieur)`,
      `Casco Viejo Siete Calles : tournée pintxos, terrasses dog-friendly`,
      `Promenade du Nervión : passerelle Zubizuri, pont Salve, promenade moderniste`,
      `Day trip Getxo par ligne 1 du métro : Pont de Biscaye UNESCO chiens jusqu'à 40 kg + sentier Punta Galea`,
    ],
    highlightsEs: [
      `Exterior del Guggenheim Bilbao + Puppy floral de Jeff Koons (perros con correa fuera)`,
      `Casco Viejo Siete Calles: ronda de pintxos, terrazas dog-friendly`,
      `Paseo del Nervión: pasarela Zubizuri, puente de la Salve, paseo modernista`,
      `Excursión Getxo por línea 1 del metro: Puente Vizcaya UNESCO perros hasta 40 kg + sendero Punta Galea`,
    ],
    highlightsPt: [
      `Exterior do Guggenheim Bilbao + Puppy floral de Jeff Koons (cães à trela fora)`,
      `Casco Viejo Sete Ruas: ronda de pintxos, esplanadas dog-friendly`,
      `Passeio do Nervión: passarela Zubizuri, ponte da Salve, passeio modernista`,
      `Excursão Getxo pela linha 1 do metro: Ponte Vizcaya UNESCO cães até 40 kg + trilho Punta Galea`,
    ],
    highlightsDe: [
      `Guggenheim Bilbao außen + Blumenskulptur Puppy (Hunde an der Leine draußen willkommen)`,
      `Casco Viejo Siete Calles: Pintxos-Tour, hundefreundliche Terrassen`,
      `Spaziergang entlang des Nervión: Fußgängerbrücke Zubizuri, Salve-Brücke, moderne Promenade`,
      `Tagesausflug Getxo mit Metro-Linie 1: Vizcaya-Brücke UNESCO, Hunde bis 40 kg + Klippenweg Punta Galea`,
    ],
    hotels: [
      {
        name: 'Gran Hotel Domine Bilbao',
        pitchEn: `5-star opposite the Guggenheim with a glass roof terrace overlooking Frank Gehry's titanium curves. Pets up to 10 kg welcomed (small fee), dog bed and welcome amenity, perfect base for the museum-by-day + Casco Viejo-by-night rhythm.`,
        pitchFr: `5 étoiles face au Guggenheim avec terrasse en verre vue sur les courbes en titane de Frank Gehry. Chiens jusqu'à 10 kg acceptés (petit supplément), panier et amenity de bienvenue, base parfaite pour rythme musée le jour + Casco Viejo le soir.`,
        pitchEs: `5 estrellas frente al Guggenheim con terraza acristalada sobre las curvas de titanio de Frank Gehry. Perros hasta 10 kg admitidos (pequeño suplemento), cama y obsequio de bienvenida, base perfecta para museo de día + Casco Viejo de noche.`,
        pitchPt: `5 estrelas em frente ao Guggenheim com esplanada envidraçada sobre as curvas de titânio de Frank Gehry. Cães até 10 kg aceites (pequena taxa), cama e amenity de boas-vindas, base perfeita para museu de dia + Casco Viejo à noite.`,
        pitchDe: `5-Sterne-Hotel gegenüber dem Guggenheim mit Glasdachterrasse mit Blick auf die Titan-Kurven von Frank Gehry. Hunde bis 10 kg willkommen (kleiner Aufpreis), Hundebett und Willkommensgeschenk, perfekte Basis für Museum am Tag und Casco Viejo am Abend.`,
      },
      {
        name: 'Hotel Carlton',
        pitchEn: `Belle Époque 5-star on Plaza Federico Moyua, equidistant from the Guggenheim and the Casco Viejo. Pets up to 12 kg welcomed (mid fee), the marble lobby and the Bar Aria tolerate a quiet leashed dog while you have a coffee.`,
        pitchFr: `5 étoiles Belle Époque sur la Plaza Federico Moyua, équidistant du Guggenheim et du Casco Viejo. Chiens jusqu'à 12 kg acceptés (supplément modéré), le lobby en marbre et le Bar Aria tolèrent un chien en laisse calme pendant un café.`,
        pitchEs: `5 estrellas Belle Époque en la Plaza Federico Moyua, equidistante del Guggenheim y del Casco Viejo. Perros hasta 12 kg admitidos (suplemento moderado), el lobby de mármol y el Bar Aria toleran un perro con correa tranquilo durante un café.`,
        pitchPt: `5 estrelas Belle Époque na Plaza Federico Moyua, equidistante do Guggenheim e do Casco Viejo. Cães até 12 kg aceites (taxa moderada), o lobby de mármore e o Bar Aria toleram um cão à trela calmo durante um café.`,
        pitchDe: `Belle-Époque-5-Sterne-Hotel an der Plaza Federico Moyua, gleich weit entfernt vom Guggenheim und vom Casco Viejo. Hunde bis 12 kg willkommen (mittlerer Aufpreis), die Marmorlobby und die Bar Aria tolerieren einen ruhigen Hund an der Leine bei einem Kaffee.`,
      },
    ],
    hasDestPage: true,
  },
]

const COPY = {
  en: {
    dayLabels: ['Day 1', 'Days 2 & 3', 'Day 4', 'Day 5'],
    dayLabelsShort: ['Day 1', 'Days 2-3', 'Day 4', 'Day 5'],
    checkAvailability: 'Check availability →',
    browseAll: (city: string) => `Browse all pet-friendly hotels in ${city} →`,
    eyebrow: '5-day pet-friendly Basque Country road trip',
    title: 'Basque Country Road Trip with Your Dog: Bayonne, San Sebastián, Vitoria & Bilbao',
    intro: `The Basque Country packs French Atlantic appetite, Spanish pintxos culture, the European Green Capital and a UNESCO bridge into a 280 km cross-border loop you can drive in five days. Bayonne for jambon and Vauban ramparts, San Sebastián for the Concha, Vitoria-Gasteiz for the Anillo Verde, Bilbao for the Guggenheim plus a day trip to Getxo's Vizcaya Bridge which uniquely accepts dogs up to 40 kg.`,
    stats: ['5 days', '~280 km total drive', '4 stops · 5 nights', 'Dogs welcome at every hotel'],
    routeHeading: 'The route at a glance',
    mapHeading: 'Interactive map',
    mapNote: 'Pan and zoom - every blue marker is a verified pet-friendly hotel.',
    itineraryHeading: 'Day-by-day itinerary',
    nightsLabel: (n: number) => `${n} night${n > 1 ? 's' : ''}`,
    driveLabel: 'Getting there',
    highlightsLabel: `Don't miss`,
    hotelsLabel: 'Where to sleep',
    practicalHeading: 'Practical info before you go',
    practical: [
      { h: 'Beach rules', p: `Most Basque municipal beaches ban dogs between Easter (or 1 May, varies by town) and 30 September. Notable exceptions: the Concha promenade is leashed-dog year-round, Getxo allows night access (20:00-09:30) even in summer, and several Cantabrian coves stay accessible off-season. Always check the local ordenanza municipal before descending.` },
      { h: 'Cross-border paperwork', p: `France and Spain are both EU, so the EU pet passport with up-to-date rabies vaccination is the only document needed (no border checks at Irún on the A63/AP-8). UK or non-EU dogs need an Animal Health Certificate from a vet within 10 days of travel - rare on this route but worth knowing.` },
      { h: 'Driving with a dog', p: `French and Spanish law both require dogs restrained (harness, crate or barrier). Tolls (A63/AP-8 in France, AP-1/AP-68 in Spain) accept dogs without restriction; aires de service have shaded grass strips. Never leave a dog in a parked car, even with a window cracked.` },
      { h: 'Emergency vet', p: `Bayonne: Hospital Vétérinaire Larrouque, +33 5 59 50 51 90. San Sebastián: Clínica Veterinaria Igeldo, +34 943 21 06 33 (24h). Vitoria-Gasteiz: Hospital Veterinario Gasteiz, +34 945 12 21 11 (24h). Bilbao: Hospital Veterinario Indautxu, +34 944 23 11 41 (24h).` },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      { q: 'Can I do this trip without a car?', a: `Yes. Bayonne, San Sebastián, Vitoria-Gasteiz and Bilbao are all on rail: TGV from Paris to Bayonne, Euskotren or ALSA bus Bayonne-San Sebastián (1h, dogs free), Renfe Media Distancia San Sebastián-Vitoria-Bilbao. Leashed dogs travel free with muzzle on Euskotren and Bizkaibus regional services; Renfe charges €10. Hertz and Sixt have pet-friendly rentals in Biarritz/Bilbao airports if you want flexibility for the Getxo day trip.` },
      { q: 'Best season with a dog?', a: `April-June and September-October. Atlantic mild 14-22 °C, beach windows still open in spring or reopening in autumn, pintxos terraces open, and you avoid the August Bayonne ferias which are loud and crowded. Summer is fine for short-coat heat-tolerant dogs but bring shade and water - the Vitoria interior reaches 32 °C in July.` },
      { q: 'Is the Vizcaya Bridge really dog-friendly?', a: `Yes - the high-level walkway (the iconic 50 m above the Nervion estuary) accepts leashed dogs up to 40 kg since December 2017, all year round. The transporter gondola at sea level is humans-only. Tickets are bought at either bank; the Portugalete side has a small dog-walking grass strip before the climb.` },
      { q: 'Will my dog be welcome at pintxos bars?', a: `Basque terraces are very dog-tolerant - bring water and a small mat. The Parte Vieja in San Sebastián, Casco Viejo in Bilbao, Casco Medieval in Vitoria-Gasteiz, and Petit Bayonne all default to yes on terrace. Indoor seating depends on the bar, ask. Many pintxos counters allow a quiet small dog at your feet during a quick stop.` },
    ],
  },
  fr: {
    dayLabels: [`Jour 1`, `Jours 2 & 3`, `Jour 4`, `Jour 5`],
    dayLabelsShort: [`Jour 1`, `Jours 2-3`, `Jour 4`, `Jour 5`],
    checkAvailability: `Voir les disponibilités →`,
    browseAll: (city: string) => `Voir tous les hôtels pet-friendly à ${city} →`,
    eyebrow: `Road trip de 5 jours au Pays basque avec son chien`,
    title: `Road trip au Pays basque avec son chien : Bayonne, Saint-Sébastien, Vitoria et Bilbao`,
    intro: `Le Pays basque réunit l'appétit atlantique français, la culture pintxos espagnole, la Capitale verte européenne et un pont UNESCO sur une boucle transfrontalière de 280 km, à faire en cinq jours. Bayonne pour le jambon et les remparts Vauban, Saint-Sébastien pour la Concha, Vitoria-Gasteiz pour l'Anillo Verde, Bilbao pour le Guggenheim plus un day trip à Getxo dont le Pont de Biscaye accepte uniquement les chiens jusqu'à 40 kg.`,
    stats: ['5 jours', '~280 km de route', '4 étapes · 5 nuits', 'Chiens acceptés dans tous les hôtels'],
    routeHeading: `L'itinéraire en un coup d'œil`,
    mapHeading: 'Carte interactive',
    mapNote: `Naviguez et zoomez - chaque marqueur bleu est un hôtel pet-friendly vérifié.`,
    itineraryHeading: 'Itinéraire jour par jour',
    nightsLabel: (n: number) => `${n} nuit${n > 1 ? 's' : ''}`,
    driveLabel: 'Comment y aller',
    highlightsLabel: 'À ne pas manquer',
    hotelsLabel: 'Où dormir',
    practicalHeading: 'À savoir avant de partir',
    practical: [
      { h: 'Règles de plage', p: `La plupart des plages municipales basques interdisent les chiens de Pâques (ou 1er mai selon les communes) au 30 septembre. Exceptions notables : promenade de la Concha toute l'année, Getxo autorise l'accès nocturne (20h-9h30) même en été, et plusieurs criques cantabriques restent accessibles hors saison. Vérifiez toujours l'ordenanza municipal avant de descendre.` },
      { h: 'Paperasse transfrontalière', p: `France et Espagne sont toutes deux UE, donc le passeport européen avec vaccin rage à jour suffit (pas de contrôle à Irún sur l'A63/AP-8). Les chiens britanniques ou hors UE ont besoin d'un Animal Health Certificate vétérinaire dans les 10 jours - rare sur ce parcours mais bon à savoir.` },
      { h: 'Conduire avec un chien', p: `Les lois française et espagnole imposent toutes deux le chien attaché (harnais, caisse ou grille). Les autoroutes à péage (A63/AP-8 en France, AP-1/AP-68 en Espagne) acceptent les chiens sans restriction ; les aires ont des bandes d'herbe ombragées. Ne jamais laisser un chien dans une voiture stationnée, même avec une vitre entrouverte.` },
      { h: `Vétérinaire d'urgence`, p: `Bayonne : Hôpital Vétérinaire Larrouque, +33 5 59 50 51 90. Saint-Sébastien : Clínica Veterinaria Igeldo, +34 943 21 06 33 (24h). Vitoria-Gasteiz : Hospital Veterinario Gasteiz, +34 945 12 21 11 (24h). Bilbao : Hospital Veterinario Indautxu, +34 944 23 11 41 (24h).` },
    ],
    faqHeading: 'Questions fréquentes',
    faq: [
      { q: 'Peut-on faire ce voyage sans voiture ?', a: `Oui. Bayonne, Saint-Sébastien, Vitoria-Gasteiz et Bilbao sont toutes desservies par le train : TGV Paris-Bayonne, Euskotren ou bus ALSA Bayonne-Saint-Sébastien (1h, chien gratuit), Renfe Media Distancia Saint-Sébastien-Vitoria-Bilbao. Chien en laisse gratuit avec muselière sur Euskotren et Bizkaibus régionaux ; Renfe facture 10 €. Hertz et Sixt ont des locations pet-friendly aux aéroports de Biarritz/Bilbao si vous voulez de la flexibilité pour Getxo.` },
      { q: 'Meilleure saison avec un chien ?', a: `Avril-juin et septembre-octobre. Atlantique doux 14-22 °C, plages encore ouvertes au printemps ou rouvertes à l'automne, terrasses pintxos ouvertes, et on évite les ferias d'août à Bayonne qui sont bruyantes. L'été est faisable pour chiens à poil court tolérants à la chaleur mais prévoyez ombre et eau - Vitoria-Gasteiz monte à 32 °C en juillet.` },
      { q: 'Le Pont de Biscaye accepte vraiment les chiens ?', a: `Oui - la passerelle haute (les 50 m emblématiques au-dessus de l'estuaire du Nervión) accepte les chiens en laisse jusqu'à 40 kg depuis décembre 2017, toute l'année. La nacelle au niveau de la mer est humains uniquement. Les billets s'achètent des deux côtés ; le côté Portugalete a une petite bande d'herbe canine avant la montée.` },
      { q: 'Mon chien sera-t-il bienvenu en bar à pintxos ?', a: `Les terrasses basques sont très tolérantes - amenez de l'eau et un petit tapis. La Parte Vieja à Saint-Sébastien, le Casco Viejo à Bilbao, le Casco Medieval à Vitoria-Gasteiz et le Petit Bayonne acceptent presque tous. La salle dépend du bar, demandez. Beaucoup de comptoirs pintxos acceptent un petit chien calme aux pieds pendant un arrêt rapide.` },
    ],
  },
  es: {
    dayLabels: ['Día 1', 'Días 2 y 3', 'Día 4', 'Día 5'],
    dayLabelsShort: ['Día 1', 'Días 2-3', 'Día 4', 'Día 5'],
    checkAvailability: 'Ver disponibilidad →',
    browseAll: (city: string) => `Ver todos los hoteles pet-friendly en ${city} →`,
    eyebrow: `Road trip de 5 días por el País Vasco con perro`,
    title: `Road trip por el País Vasco con tu perro: Bayona, San Sebastián, Vitoria y Bilbao`,
    intro: `El País Vasco reúne el apetito atlántico francés, la cultura pintxos española, la Capital Verde Europea y un puente UNESCO en un circuito transfronterizo de 280 km que se hace en cinco días. Bayona por el jamón y las murallas Vauban, San Sebastián por la Concha, Vitoria-Gasteiz por el Anillo Verde, Bilbao por el Guggenheim más una excursión a Getxo cuyo Puente Vizcaya admite perros hasta 40 kg.`,
    stats: ['5 días', '~280 km totales', '4 paradas · 5 noches', 'Perros admitidos en cada hotel'],
    routeHeading: 'El recorrido de un vistazo',
    mapHeading: 'Mapa interactivo',
    mapNote: `Desplázate y haz zoom - cada marcador azul es un hotel pet-friendly verificado.`,
    itineraryHeading: 'Itinerario día a día',
    nightsLabel: (n: number) => `${n} noche${n > 1 ? 's' : ''}`,
    driveLabel: 'Cómo llegar',
    highlightsLabel: 'No te pierdas',
    hotelsLabel: 'Dónde dormir',
    practicalHeading: 'Antes de salir',
    practical: [
      { h: 'Normas de playas', p: `La mayoría de las playas municipales vascas prohíben perros desde Semana Santa (o 1 de mayo según el municipio) al 30 de septiembre. Excepciones notables: el paseo de la Concha todo el año, Getxo permite acceso nocturno (20h-9h30) incluso en verano, y varias calas cántabras siguen accesibles fuera de temporada. Comprueba siempre la ordenanza municipal antes de bajar.` },
      { h: 'Papeleo transfronterizo', p: `Francia y España son ambas UE, así que el pasaporte europeo con vacuna antirrábica al día basta (sin control en Irún por A63/AP-8). Los perros del Reino Unido o no UE necesitan un Animal Health Certificate veterinario en los 10 días previos - raro en este recorrido pero conviene saberlo.` },
      { h: 'Conducir con perro', p: `Las leyes francesa y española exigen el perro sujeto (arnés, transportín o reja). Las autopistas de peaje (A63/AP-8 en Francia, AP-1/AP-68 en España) admiten perros sin restricción; las áreas tienen franjas de hierba sombreadas. Nunca dejes al perro en un coche aparcado, ni con la ventana entreabierta.` },
      { h: 'Veterinario de urgencia', p: `Bayona: Hospital Vétérinaire Larrouque, +33 5 59 50 51 90. San Sebastián: Clínica Veterinaria Igeldo, +34 943 21 06 33 (24h). Vitoria-Gasteiz: Hospital Veterinario Gasteiz, +34 945 12 21 11 (24h). Bilbao: Hospital Veterinario Indautxu, +34 944 23 11 41 (24h).` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faq: [
      { q: '¿Se puede hacer sin coche?', a: `Sí. Bayona, San Sebastián, Vitoria-Gasteiz y Bilbao tienen tren: TGV París-Bayona, Euskotren o bus ALSA Bayona-San Sebastián (1h, perro gratis), Renfe Media Distancia San Sebastián-Vitoria-Bilbao. Perro con correa gratis con bozal en Euskotren y Bizkaibus regionales; Renfe cobra 10 €. Hertz y Sixt tienen alquileres pet-friendly en aeropuertos Biarritz/Bilbao si quieres flexibilidad para Getxo.` },
      { q: 'Mejor temporada con perro?', a: `Abril-junio y septiembre-octubre. Atlántico suave 14-22 °C, playas aún abiertas en primavera o reabriendo en otoño, terrazas pintxos abiertas, y se evitan las ferias de agosto en Bayona (ruidosas). El verano es factible para perros de pelo corto tolerantes al calor pero lleva sombra y agua - Vitoria-Gasteiz llega a 32 °C en julio.` },
      { q: '¿El Puente Vizcaya admite perros de verdad?', a: `Sí - la pasarela alta (los emblemáticos 50 m sobre el estuario del Nervión) admite perros con correa hasta 40 kg desde diciembre de 2017, todo el año. La barquilla a nivel del mar es solo humanos. Las entradas se compran a ambos lados; el lado Portugalete tiene una pequeña franja de hierba canina antes de la subida.` },
      { q: '¿Aceptan perros en los bares de pintxos?', a: `Las terrazas vascas son muy tolerantes - lleva agua y una colchoneta. La Parte Vieja en San Sebastián, el Casco Viejo en Bilbao, el Casco Medieval en Vitoria-Gasteiz y el Petit Bayonne aceptan casi todos. La sala depende del bar, pregunta. Muchas barras de pintxos admiten un perrito tranquilo a tus pies durante una parada rápida.` },
    ],
  },
  pt: {
    dayLabels: ['Dia 1', 'Dias 2 e 3', 'Dia 4', 'Dia 5'],
    dayLabelsShort: ['Dia 1', 'Dias 2-3', 'Dia 4', 'Dia 5'],
    checkAvailability: 'Ver disponibilidade →',
    browseAll: (city: string) => `Ver todos os hotéis pet-friendly em ${city} →`,
    eyebrow: `Road trip de 5 dias pelo País Basco com cão`,
    title: `Road trip pelo País Basco com o seu cão: Bayonne, San Sebastián, Vitoria e Bilbao`,
    intro: `O País Basco junta o apetite atlântico francês, a cultura pintxos espanhola, a Capital Verde Europeia e uma ponte UNESCO num circuito transfronteiriço de 280 km que se faz em cinco dias. Bayonne pelo presunto e as muralhas Vauban, San Sebastián pela Concha, Vitoria-Gasteiz pelo Anillo Verde, Bilbao pelo Guggenheim mais uma excursão a Getxo cuja Ponte Vizcaya aceita cães até 40 kg.`,
    stats: ['5 dias', '~280 km totais', '4 paragens · 5 noites', 'Cães aceites em todos os hotéis'],
    routeHeading: 'O circuito num relance',
    mapHeading: 'Mapa interactivo',
    mapNote: `Desloque e amplie - cada marcador azul é um hotel pet-friendly verificado.`,
    itineraryHeading: 'Itinerário dia a dia',
    nightsLabel: (n: number) => `${n} noite${n > 1 ? 's' : ''}`,
    driveLabel: 'Como chegar',
    highlightsLabel: 'Não perca',
    hotelsLabel: 'Onde dormir',
    practicalHeading: 'Antes de partir',
    practical: [
      { h: 'Regras de praia', p: `A maioria das praias municipais bascas proíbe cães desde a Páscoa (ou 1 de maio conforme o município) a 30 de setembro. Exceções notáveis: passeio da Concha todo o ano, Getxo permite acesso nocturno (20h-9h30) mesmo no verão, e várias calas cantábricas permanecem acessíveis fora de época. Verifique sempre a ordenanza municipal antes de descer.` },
      { h: 'Papelada transfronteiriça', p: `França e Espanha são ambas UE, por isso o passaporte europeu com vacina antirrábica em dia basta (sem controlo em Irún na A63/AP-8). Cães do Reino Unido ou fora da UE precisam de um Animal Health Certificate veterinário nos 10 dias anteriores - raro neste percurso mas bom saber.` },
      { h: 'Conduzir com o cão', p: `As leis francesa e espanhola exigem ambas o cão preso (arnês, transportadora ou grelha). As autoestradas com portagem (A63/AP-8 em França, AP-1/AP-68 em Espanha) aceitam cães sem restrição; as áreas têm faixas de relva sombreadas. Nunca deixe um cão num carro estacionado, nem com janela entreaberta.` },
      { h: 'Veterinário de urgência', p: `Bayonne: Hospital Vétérinaire Larrouque, +33 5 59 50 51 90. San Sebastián: Clínica Veterinaria Igeldo, +34 943 21 06 33 (24h). Vitoria-Gasteiz: Hospital Veterinario Gasteiz, +34 945 12 21 11 (24h). Bilbao: Hospital Veterinario Indautxu, +34 944 23 11 41 (24h).` },
    ],
    faqHeading: 'Perguntas frequentes',
    faq: [
      { q: 'Dá para fazer sem carro?', a: `Sim. Bayonne, San Sebastián, Vitoria-Gasteiz e Bilbao têm comboio: TGV Paris-Bayonne, Euskotren ou autocarro ALSA Bayonne-San Sebastián (1h, cão grátis), Renfe Media Distancia San Sebastián-Vitoria-Bilbao. Cão à trela gratuito com açaime em Euskotren e Bizkaibus regionais; Renfe cobra 10 €. Hertz e Sixt têm alugueres pet-friendly nos aeroportos de Biarritz/Bilbao para flexibilidade na excursão a Getxo.` },
      { q: 'Melhor época com cão?', a: `Abril-junho e setembro-outubro. Atlântico ameno 14-22 °C, praias ainda abertas na primavera ou a reabrir no outono, esplanadas pintxos abertas, e evita-se as ferias de agosto em Bayonne (ruidosas). O verão é viável para cães de pelo curto tolerantes ao calor mas leve sombra e água - Vitoria-Gasteiz atinge 32 °C em julho.` },
      { q: 'A Ponte Vizcaya aceita mesmo cães?', a: `Sim - a passarela alta (os emblemáticos 50 m sobre o estuário do Nervión) aceita cães à trela até 40 kg desde dezembro de 2017, todo o ano. A gôndola ao nível do mar é apenas humanos. Os bilhetes compram-se de ambos os lados; o lado Portugalete tem uma pequena faixa de relva canina antes da subida.` },
      { q: 'Aceitam cães nos bares de pintxos?', a: `As esplanadas bascas são muito tolerantes - leve água e um tapete. A Parte Vieja em San Sebastián, o Casco Viejo em Bilbao, o Casco Medieval em Vitoria-Gasteiz e o Petit Bayonne aceitam quase todos. A sala depende do bar, pergunte. Muitos balcões de pintxos aceitam um pequeno cão calmo aos pés durante uma paragem rápida.` },
    ],
  },
  de: {
    dayLabels: [`Tag 1`, `Tage 2 & 3`, `Tag 4`, `Tag 5`],
    dayLabelsShort: [`Tag 1`, `Tage 2-3`, `Tag 4`, `Tag 5`],
    checkAvailability: `Verfügbarkeit prüfen →`,
    browseAll: (city: string) => `Alle haustierfreundlichen Hotels in ${city} ansehen →`,
    eyebrow: `5-tägiger Roadtrip mit Hund durchs Baskenland`,
    title: `Roadtrip durchs Baskenland mit Ihrem Hund: Bayonne, San Sebastián, Vitoria und Bilbao`,
    intro: `Das Baskenland vereint französischen atlantischen Appetit, spanische Pintxos-Kultur, die Europäische Grüne Hauptstadt und eine UNESCO-Brücke auf einer 280 km langen grenzüberschreitenden Rundreise, die sich in fünf Tagen fahren lässt. Bayonne für Schinken und die Vauban-Stadtmauern, San Sebastián für die Concha, Vitoria-Gasteiz für den Anillo Verde, Bilbao für das Guggenheim plus einen Tagesausflug zur Vizcaya-Brücke in Getxo, die als Besonderheit Hunde bis 40 kg zulässt.`,
    stats: ['5 Tage', '~280 km Gesamtstrecke', '4 Stopps · 5 Nächte', 'Hunde in jedem Hotel willkommen'],
    routeHeading: `Die Route auf einen Blick`,
    mapHeading: 'Interaktive Karte',
    mapNote: `Verschieben und zoomen Sie - jeder blaue Marker ist ein geprüftes haustierfreundliches Hotel.`,
    itineraryHeading: 'Tag-für-Tag-Reiseplan',
    nightsLabel: (n: number) => `${n} ${n === 1 ? 'Nacht' : 'Nächte'}`,
    driveLabel: 'Anreise',
    highlightsLabel: 'Nicht verpassen',
    hotelsLabel: 'Wo übernachten',
    practicalHeading: 'Praktische Infos vor der Abreise',
    practical: [
      { h: 'Strandregeln', p: `Die meisten baskischen Gemeindestrände verbieten Hunde zwischen Ostern (oder dem 1. Mai, je nach Ort) und dem 30. September. Bemerkenswerte Ausnahmen: die Promenade an der Concha ist ganzjährig für Hunde an der Leine geöffnet, Getxo erlaubt nächtlichen Zugang (20:00-9:30 Uhr) auch im Sommer, und mehrere kantabrische Buchten bleiben außerhalb der Saison zugänglich. Prüfen Sie immer die örtliche ordenanza municipal, bevor Sie an den Strand gehen.` },
      { h: 'Grenzüberschreitende Formalitäten', p: `Frankreich und Spanien sind beide EU-Mitglieder, daher genügt der EU-Heimtierausweis mit aktueller Tollwutimpfung (keine Grenzkontrollen bei Irún auf der A63/AP-8). Hunde aus Großbritannien oder Nicht-EU-Ländern benötigen eine tierärztliche Gesundheitsbescheinigung, ausgestellt innerhalb von 10 Tagen vor der Reise - auf dieser Route selten, aber gut zu wissen.` },
      { h: 'Autofahren mit Hund', p: `Sowohl das französische als auch das spanische Recht schreiben eine Sicherung des Hundes vor (Geschirr, Transportbox oder Trenngitter). Mautstraßen (A63/AP-8 in Frankreich, AP-1/AP-68 in Spanien) akzeptieren Hunde ohne Einschränkung, Raststätten haben schattige Grünstreifen. Lassen Sie einen Hund niemals in einem geparkten Auto zurück, auch nicht bei einem gekippten Fenster.` },
      { h: `Tierärztlicher Notdienst`, p: `Bayonne: Hôpital Vétérinaire Larrouque, +33 5 59 50 51 90. San Sebastián: Clínica Veterinaria Igeldo, +34 943 21 06 33 (24 Std.). Vitoria-Gasteiz: Hospital Veterinario Gasteiz, +34 945 12 21 11 (24 Std.). Bilbao: Hospital Veterinario Indautxu, +34 944 23 11 41 (24 Std.).` },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faq: [
      { q: 'Geht diese Reise auch ohne Auto?', a: `Ja. Bayonne, San Sebastián, Vitoria-Gasteiz und Bilbao sind alle mit der Bahn erreichbar: TGV von Paris nach Bayonne, Euskotren oder ALSA-Bus Bayonne-San Sebastián (1 Std., Hunde kostenlos), Renfe Media Distancia San Sebastián-Vitoria-Bilbao. Hunde an der Leine mit Maulkorb reisen kostenlos mit Euskotren und den regionalen Bizkaibus-Diensten; Renfe berechnet 10 €. Hertz und Sixt bieten haustierfreundliche Mietwagen an den Flughäfen Biarritz/Bilbao, falls Sie Flexibilität für den Tagesausflug nach Getxo möchten.` },
      { q: 'Beste Jahreszeit mit Hund?', a: `April-Juni und September-Oktober. Mildes Atlantikklima mit 14-22 °C, im Frühling sind die Strände noch geöffnet oder im Herbst wieder geöffnet, die Pintxos-Terrassen haben geöffnet, und Sie vermeiden die lauten und überfüllten Augustferien in Bayonne. Der Sommer eignet sich für hitzetolerante kurzhaarige Hunde, bringen Sie aber Schatten und Wasser mit - im Landesinneren von Vitoria werden im Juli bis zu 32 °C erreicht.` },
      { q: 'Ist die Vizcaya-Brücke wirklich hundefreundlich?', a: `Ja - der hoch gelegene Steg (die ikonischen 50 m über der Mündung des Nervión) lässt seit Dezember 2017 ganzjährig Hunde an der Leine bis 40 kg zu. Die Schwebefähre auf Meereshöhe ist nur für Menschen. Tickets gibt es an beiden Ufern, auf der Seite von Portugalete gibt es vor dem Aufstieg einen kleinen Grünstreifen zum Gassigehen.` },
      { q: 'Ist mein Hund in Pintxos-Bars willkommen?', a: `Baskische Terrassen sind sehr hundetolerant - bringen Sie Wasser und eine kleine Decke mit. Die Parte Vieja in San Sebastián, der Casco Viejo in Bilbao, der Casco Medieval in Vitoria-Gasteiz und das Petit Bayonne sagen auf der Terrasse meist ja. Der Innenbereich hängt von der Bar ab, fragen Sie nach. Viele Pintxos-Theken erlauben einen ruhigen kleinen Hund zu Ihren Füßen während eines kurzen Stopps.` },
    ],
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

  const mapSrc = buildStay22MapSrc(MAP_LAT, MAP_LNG, `${CAMPAIGN_BASE}-map`)

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Basque Country Pet-Friendly Road Trip',
    description: 'A 5-day cross-border road-trip itinerary through the Basque Country with a dog: Bayonne, San Sebastián, Vitoria-Gasteiz, Bilbao.',
    touristType: 'Pet owners',
    itinerary: STOPS.map((s, i) => ({
      '@type': 'Place',
      name: s.name,
      address: { '@type': 'PostalAddress', addressCountry: s.countryCode, addressLocality: s.name },
      position: i + 1,
    })),
  }

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
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const w = (s: Stop) => {
    if (locale === 'fr') return { why: s.whyFr, hl: s.highlightsFr, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchFr })) }
    if (locale === 'es') return { why: s.whyEs, hl: s.highlightsEs, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchEs })) }
    if (locale === 'pt') return { why: s.whyPt, hl: s.highlightsPt, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchPt })) }
    if (locale === 'de') return { why: s.whyDe, hl: s.highlightsDe, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchDe })) }
    return { why: s.whyEn, hl: s.highlightsEn, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchEn })) }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-red-700 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-100 mb-3">{t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-emerald-50 max-w-3xl">{t.intro}</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {t.stats.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-3 text-center text-sm font-medium">{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Route summary */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.routeHeading}</h2>
        <ol className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {STOPS.map((s, i) => (
            <li key={s.slug} className="bg-white rounded-xl p-4 border border-stone-200">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">{t.dayLabelsShort[i]}</div>
              <div className="text-lg font-bold text-stone-900">{s.name}</div>
              <div className="text-sm text-stone-600 mt-1">{t.nightsLabel(s.nights)}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Map */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">{t.mapHeading}</h2>
        <p className="text-sm text-stone-600 mb-4">{t.mapNote}</p>
        <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm">
          <iframe
            src={mapSrc}
            width="100%"
            height="520"
            style={{ border: 0 }}
            loading="lazy"
            title="Basque Country pet-friendly road trip map"
          />
        </div>
      </section>

      {/* Day-by-day */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.itineraryHeading}</h2>
        <div className="space-y-8">
          {STOPS.map((s, i) => {
            const localised = w(s)
            const dayLabel = t.dayLabels[i]
            return (
              <article key={s.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <header className="px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-emerald-50 to-red-50 border-b border-stone-200">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">{dayLabel}</span>
                    <h3 className="text-2xl font-bold text-stone-900">
                      {s.hasDestPage ? (
                        <Link href={`/${locale}/destinations/${s.slug}`} className="hover:text-emerald-700">
                          {s.name}
                        </Link>
                      ) : (
                        s.name
                      )}
                    </h3>
                    <span className="text-sm text-stone-600">{t.nightsLabel(s.nights)} · {s.country}</span>
                  </div>
                </header>
                <div className="px-5 py-5 sm:px-7 sm:py-6 space-y-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.driveLabel}</div>
                    <p className="text-stone-700 text-sm">{s.drive[locale]}</p>
                  </div>
                  <p className="text-stone-800 leading-relaxed">{localised.why}</p>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">{t.highlightsLabel}</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700">
                      {localised.hl.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-0.5">●</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">{t.hotelsLabel}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {localised.hotels.map((h, idx) => (
                        <a
                          key={idx}
                          href={buildAllezLink(h.name, s.name, s.country, `${CAMPAIGN_BASE}-${s.slug}-${idx + 1}`, s.nights)}
                          target="_blank"
                          rel="noopener sponsored"
                          className="block bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg p-4 transition"
                        >
                          <div className="font-semibold text-stone-900">{h.name}</div>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">{h.pitch}</p>
                          <div className="mt-2 text-xs font-semibold text-emerald-700">
                            {t.checkAvailability}
                          </div>
                        </a>
                      ))}
                    </div>
                    <a
                      href={buildAllezDestLink(s.name, s.country, `${CAMPAIGN_BASE}-${s.slug}-all`, s.nights)}
                      target="_blank"
                      rel="noopener sponsored"
                      className="inline-block mt-3 text-sm text-stone-600 hover:text-emerald-700 underline underline-offset-2"
                    >
                      {t.browseAll(s.name)}
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Practical info */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.practicalHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.practical.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-2">{p.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{p.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.faqHeading}</h2>
        <div className="space-y-4">
          {t.faq.map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-semibold text-stone-900 mb-2">{f.q}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />

      <StickyHotelCTA
        label={stickyLabel.label}
        cta={stickyLabel.cta}
        href={buildAllezDestLink('San Sebastián', 'Spain', `${CAMPAIGN_BASE}-sticky`, 2)}
      />
    </main>
  )
}
