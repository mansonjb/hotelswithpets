import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'honeymoon-with-pet'
const CAMPAIGN_BASE = 'honeymoon-pet'

const SISTER_SITE = {
  url: 'https://myhoneymoonhotel.com',
  name: 'MyHoneymoonHotel.com',
}

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Pet-friendly romantic European hotels', cta: 'See hotels' },
  fr: { label: `Hôtels romantiques pet-friendly en Europe`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles románticos pet-friendly en Europa', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis românticos pet-friendly na Europa', cta: 'Ver hotéis' },
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
    en: `Honeymoon with Your Dog: 6 Romantic Pet-Friendly Destinations in Europe (2026)`,
    fr: `Lune de miel avec son chien : 6 destinations romantiques pet-friendly en Europe (2026)`,
    es: `Luna de miel con tu perro: 6 destinos románticos pet-friendly en Europa (2026)`,
    pt: `Lua de mel com o seu cão: 6 destinos românticos pet-friendly na Europa (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `Six European destinations that work for a romantic honeymoon with a dog or a cat: lakeside hotels, palace-village pairings and seaside escapes that genuinely welcome pets in the room.`,
    fr: `Six destinations européennes parfaites pour une lune de miel avec son chien ou son chat : hôtels en bord de lac, villages-palais et escapades en bord de mer qui acceptent vraiment les animaux en chambre.`,
    es: `Seis destinos europeos perfectos para una luna de miel con perro o gato: hoteles a orillas del lago, palacios-pueblo y escapadas marítimas que admiten realmente a las mascotas en la habitación.`,
    pt: `Seis destinos europeus perfeitos para uma lua de mel com cão ou gato: hotéis à beira do lago, palácios-aldeia e escapadelas à beira-mar que aceitam realmente animais no quarto.`,
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
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
  hotelName: string
}

const PICKS: Pick[] = [
  {
    slug: 'sintra',
    name: 'Sintra',
    country: 'Portugal',
    destPath: '/destinations/sintra',
    whyEn: `Pena Palace, Quinta da Regaleira gardens and palm forests in a 90 km² UNESCO heritage zone. Mild Atlantic climate year-round, walkable Serra de Sintra trails accept leashed dogs, and Lisbon airport is 30 minutes away.`,
    whyFr: `Le Palais de Pena, les jardins de la Quinta da Regaleira et les forêts de palmiers d'une zone UNESCO de 90 km². Climat atlantique doux toute l'année, sentiers de la Serra de Sintra accessibles aux chiens en laisse, aéroport de Lisbonne à 30 minutes.`,
    whyEs: `El Palacio da Pena, los jardines de la Quinta da Regaleira y los bosques de palmeras en una zona UNESCO de 90 km². Clima atlántico suave todo el año, senderos de la Serra de Sintra abiertos a perros con correa, aeropuerto de Lisboa a 30 minutos.`,
    whyPt: `O Palácio da Pena, os jardins da Quinta da Regaleira e as florestas de palmeiras numa zona UNESCO de 90 km². Clima atlântico suave todo o ano, trilhos da Serra de Sintra abertos a cães à trela, aeroporto de Lisboa a 30 minutos.`,
    hotelName: 'Tivoli Palácio de Seteais',
    hotelEn: `Tivoli Palácio de Seteais - an 18th-century neoclassical palace turned 5-star hotel, framed by formal gardens with a Pena Palace view. Small pets welcome on request.`,
    hotelFr: `Tivoli Palácio de Seteais - palais néoclassique du XVIIIᵉ converti en 5 étoiles, jardins à la française avec vue sur le Palais de Pena. Petits animaux acceptés sur demande.`,
    hotelEs: `Tivoli Palácio de Seteais - palacio neoclásico del siglo XVIII reconvertido en 5 estrellas, jardines a la francesa con vista al Palacio da Pena. Mascotas pequeñas a petición.`,
    hotelPt: `Tivoli Palácio de Seteais - palácio neoclássico do século XVIII convertido em 5 estrelas, jardins à francesa com vista sobre o Palácio da Pena. Animais pequenos a pedido.`,
  },
  {
    slug: 'como',
    name: 'Lake Como',
    country: 'Italy',
    destPath: '/destinations/como',
    whyEn: `Pre-Alpine lake with grand villas at the foot of cypress mountains. Ferries between Bellagio, Varenna and Como accept leashed dogs free, lakeside promenades are entirely dog-walkable, and the climate stays bearable for short-snouted breeds even in July.`,
    whyFr: `Lac préalpin bordé de villas grandioses au pied des montagnes à cyprès. Les ferries entre Bellagio, Varenna et Côme acceptent les chiens en laisse gratuits, les promenades du lac sont entièrement praticables, et le climat reste supportable pour les races à museau court même en juillet.`,
    whyEs: `Lago prealpino con grandes villas al pie de montañas con cipreses. Los ferris entre Bellagio, Varenna y Como admiten perros con correa gratis, los paseos del lago son íntegramente caminables, y el clima sigue siendo soportable para razas de hocico corto incluso en julio.`,
    whyPt: `Lago pré-alpino com vilas grandiosas ao pé de montanhas com ciprestes. Os ferries entre Bellagio, Varenna e Como aceitam cães à trela gratuitamente, os passeios do lago são inteiramente percorríveis, e o clima permanece suportável para raças de focinho curto mesmo em julho.`,
    hotelName: 'Grand Hotel Tremezzo',
    hotelEn: `Grand Hotel Tremezzo - Belle Époque palace directly on the lake, with the most famous floating pool in Italy. Dogs welcomed with bed, bowls and a welcome amenity.`,
    hotelFr: `Grand Hotel Tremezzo - palace Belle Époque en bord de lac, avec la piscine flottante la plus célèbre d'Italie. Chiens accueillis avec panier, gamelles et amenity de bienvenue.`,
    hotelEs: `Grand Hotel Tremezzo - palacio Belle Époque a orillas del lago, con la piscina flotante más famosa de Italia. Perros bienvenidos con cama, comederos y obsequio de bienvenida.`,
    hotelPt: `Grand Hotel Tremezzo - palace Belle Époque à beira do lago, com a piscina flutuante mais famosa de Itália. Cães bem-vindos com cama, tigelas e amenity de boas-vindas.`,
  },
  {
    slug: 'antibes',
    name: `Cap d'Antibes`,
    country: 'France',
    destPath: '/destinations/antibes',
    whyEn: `The most discreet stretch of the French Riviera, between Cannes and Nice. The Cap's 5 km Sentier du Littoral coastal trail accepts leashed dogs year-round, the boutique-hotel inventory is dense, and you can fly into Nice (NCE) and skip cars entirely with the TER.`,
    whyFr: `La tranche la plus discrète de la Côte d'Azur, entre Cannes et Nice. Les 5 km du Sentier du Littoral du Cap acceptent les chiens en laisse toute l'année, l'offre boutique-hôtel est dense, et on peut atterrir à Nice (NCE) sans louer de voiture en utilisant le TER.`,
    whyEs: `El tramo más discreto de la Costa Azul, entre Cannes y Niza. Los 5 km del Sentier du Littoral del Cap admiten perros con correa todo el año, la oferta de hoteles boutique es densa, y puedes aterrizar en Niza (NCE) y prescindir del coche con el TER.`,
    whyPt: `O troço mais discreto da Riviera Francesa, entre Cannes e Nice. Os 5 km do Sentier du Littoral do Cap aceitam cães à trela todo o ano, a oferta de hotéis boutique é densa, e pode aterrar em Nice (NCE) sem alugar carro usando o TER.`,
    hotelName: `Hôtel Beau Site Cap d'Antibes`,
    hotelEn: `Hôtel Beau Site Cap d'Antibes - 200 m from the Sentier du Littoral trailhead, pets up to 10 kg welcomed at no extra charge, garden and pool, the calm Cap d'Antibes setting away from the summer crowds.`,
    hotelFr: `Hôtel Beau Site Cap d'Antibes - à 200 m du départ du Sentier du Littoral, chiens jusqu'à 10 kg acceptés sans supplément, jardin et piscine, le calme du Cap loin de l'agitation estivale.`,
    hotelEs: `Hôtel Beau Site Cap d'Antibes - a 200 m del inicio del Sentier du Littoral, perros hasta 10 kg admitidos sin coste, jardín y piscina, la calma del Cap lejos del bullicio veraniego.`,
    hotelPt: `Hôtel Beau Site Cap d'Antibes - a 200 m do início do Sentier du Littoral, cães até 10 kg aceites sem custo, jardim e piscina, a calma do Cap longe da multidão estival.`,
  },
  {
    slug: 'bruges',
    name: 'Bruges',
    country: 'Belgium',
    destPath: '/destinations/bruges',
    whyEn: `A medieval city where the old town is a UNESCO site and the canals are crossed by 50+ bridges. The horse-drawn carriages tolerate quiet dogs, the Markt's cobbled square hosts dog-friendly chocolate shops, and the Minnewater "Lake of Love" is the cliché-but-true romantic walk.`,
    whyFr: `Une ville médiévale dont la vieille ville est classée UNESCO et où les canaux sont franchis par plus de 50 ponts. Les fiacres à cheval tolèrent les chiens calmes, la place du Markt accueille des chocolatiers dog-friendly, et le Minnewater "lac d'amour" est la promenade romantique cliché-mais-vraie.`,
    whyEs: `Una ciudad medieval cuyo casco antiguo es UNESCO y donde los canales son cruzados por más de 50 puentes. Los carruajes a caballo toleran perros tranquilos, la plaza del Markt acoge chocolaterías dog-friendly, y el Minnewater "lago del amor" es el paseo romántico tópico-pero-real.`,
    whyPt: `Uma cidade medieval cuja zona antiga é UNESCO e onde os canais são atravessados por mais de 50 pontes. As carruagens puxadas a cavalo toleram cães calmos, a praça do Markt acolhe chocolatarias dog-friendly, e o Minnewater "lago do amor" é o passeio romântico clichê-mas-verdadeiro.`,
    hotelName: 'Boutique Hotel De Castillion',
    hotelEn: `Boutique Hotel De Castillion - 15-room townhouse in a former bishop's residence, walking distance to the Markt. Small dogs welcome, breakfast in the walled garden.`,
    hotelFr: `Boutique Hotel De Castillion - 15 chambres dans une ancienne résidence épiscopale, à pied du Markt. Petits chiens bienvenus, petit-déjeuner dans le jardin clos.`,
    hotelEs: `Boutique Hotel De Castillion - 15 habitaciones en una antigua residencia episcopal, andando al Markt. Perros pequeños bienvenidos, desayuno en el jardín tapiado.`,
    hotelPt: `Boutique Hotel De Castillion - 15 quartos numa antiga residência episcopal, a pé do Markt. Cães pequenos bem-vindos, pequeno-almoço no jardim murado.`,
  },
  {
    slug: 'hallstatt',
    name: 'Hallstatt',
    country: 'Austria',
    destPath: '/destinations/hallstatt',
    whyEn: `The Alpine fairytale most travel magazines won't shut up about, and for once it is justified. Lakeside village with wooden balconies, the Hallstätter See ferry accepts leashed dogs free, and the Salzberg salt mine trail is dog-friendly on the surface portion.`,
    whyFr: `Le conte de fées alpin dont les magazines voyage ne se lassent jamais, et pour une fois c'est mérité. Village au bord du lac avec balcons en bois, le ferry du Hallstätter See accepte les chiens en laisse gratuits, et le sentier du Salzberg est ouvert aux chiens en surface.`,
    whyEs: `El cuento de hadas alpino del que las revistas de viaje no paran, y por una vez está justificado. Pueblo a orillas del lago con balcones de madera, el ferri del Hallstätter See admite perros con correa gratis, y el sendero del Salzberg es dog-friendly en la parte exterior.`,
    whyPt: `O conto de fadas alpino do qual as revistas de viagem não se calam, e por uma vez é merecido. Aldeia à beira do lago com varandas de madeira, o ferry do Hallstätter See aceita cães à trela gratuitamente, e o trilho do Salzberg é dog-friendly na parte exterior.`,
    hotelName: 'Seehotel Grüner Baum',
    hotelEn: `Seehotel Grüner Baum - historic 4-star directly on the Marktplatz, pets welcomed in rooms with a lakeside terrace.`,
    hotelFr: `Seehotel Grüner Baum - 4 étoiles historique sur la Marktplatz, chiens acceptés en chambre avec terrasse en bord de lac.`,
    hotelEs: `Seehotel Grüner Baum - 4 estrellas histórico en la Marktplatz, perros admitidos en habitación con terraza junto al lago.`,
    hotelPt: `Seehotel Grüner Baum - 4 estrelas histórico na Marktplatz, cães aceites em quarto com esplanada à beira do lago.`,
  },
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    country: 'France',
    destPath: '/destinations/bordeaux',
    whyEn: `Wine and stone for a calmer honeymoon. The Quai des Chartrons riverside, the Place de la Bourse mirror, the trams accepting dogs free, and the Médoc châteaux 45 minutes away that welcome polite dogs on cellar tours. Two hours from Paris by TGV.`,
    whyFr: `Le vin et la pierre pour une lune de miel plus calme. Le Quai des Chartrons, le miroir d'eau de la Place de la Bourse, les trams gratuits pour les chiens, et les châteaux du Médoc à 45 minutes qui accueillent les chiens sages en visite cave. Deux heures de Paris en TGV.`,
    whyEs: `El vino y la piedra para una luna de miel más tranquila. El Quai des Chartrons, el espejo de agua de la Place de la Bourse, los tranvías gratis para perros, y los châteaux del Médoc a 45 minutos que admiten perros tranquilos en visitas de bodega. Dos horas de París en TGV.`,
    whyPt: `O vinho e a pedra para uma lua de mel mais calma. O Quai des Chartrons, o espelho de água da Place de la Bourse, os elétricos gratuitos para cães, e os châteaux do Médoc a 45 minutos que aceitam cães educados nas visitas de adega. Duas horas de Paris em TGV.`,
    hotelName: `InterContinental Bordeaux - Le Grand Hôtel`,
    hotelEn: `InterContinental Bordeaux - Le Grand Hôtel - Palace overlooking the Grand Théâtre. Pets up to 14 kg welcomed in deluxe rooms, dog bed and bowls provided, Spa Guerlain on site (humans only).`,
    hotelFr: `InterContinental Bordeaux - Le Grand Hôtel - palace face au Grand Théâtre. Chiens jusqu'à 14 kg en chambres deluxe, couchage et gamelles fournis, Spa Guerlain sur place (humains uniquement).`,
    hotelEs: `InterContinental Bordeaux - Le Grand Hôtel - palacio frente al Grand Théâtre. Perros hasta 14 kg en habitaciones deluxe, cama y comederos, Spa Guerlain (solo humanos).`,
    hotelPt: `InterContinental Bordeaux - Le Grand Hôtel - palace em frente ao Grand Théâtre. Cães até 14 kg em quartos deluxe, cama e tigelas, Spa Guerlain (apenas humanos).`,
  },
]

const COPY = {
  en: {
    eyebrow: 'PET-FRIENDLY HONEYMOONS · EUROPE',
    title: `Honeymoon with Your Dog: 6 Romantic European Destinations`,
    intro: `Most honeymoon shortlists assume the dog stays home. But for couples who travel with their pet year-round, leaving them behind for the most symbolic trip of their relationship feels wrong. We picked six European destinations that genuinely work for a romantic week with a leashed dog at your feet: lakeside palaces, walled medieval towns and seaside cliffs where pet-friendly luxury inventory actually exists.`,
    pickHeading: 'The six picks',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    altHeading: 'Want a traditional honeymoon without your pet?',
    altIntro: `Some honeymoons want to be a true two-person bubble - no leash check at restaurant entrances, no kennel logistics for the spa day, no early morning walks. We get it. For curated honeymoon hotels (Maldives overwater, Bali clifftop, Greek Island villa, African safari lodges, French Riviera palaces), our sister site is built for exactly that:`,
    altLink: `Find traditional honeymoon hotels at ${SISTER_SITE.name}`,
    altOutro: `It is the same editorial team, same verification standard, no pets in scope. Use it to plan the honeymoon, use HotelsWithPets to plan everything before and after when your dog is back in the equation.`,
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Will a 5-star palace really accept my dog?', a: `More than you would expect. The Belmond, Mandarin Oriental, Four Seasons and Anantara groups all have pet policies in their major European properties. Maximum weight is the usual constraint (10-14 kg). Always confirm at booking with a direct email - Booking.com listings often lag the actual policy.` },
      { q: 'Best European seasons for a pet-friendly honeymoon?', a: `April-June and September-October hit the sweet spot: mild temperatures (16-24 °C), beach windows mostly open, terraces back in service, shoulder pricing. Avoid July-August in the Mediterranean (heat is brutal for dogs) and Christmas markets if your dog dislikes crowds.` },
      { q: 'Can I take my dog on the Eurostar / TGV / Frecciarossa?', a: `Eurostar accepts assistance dogs only. TGV: small dogs in carrier €7.10, larger leashed dogs €7.10, no restriction on number. Frecciarossa: small dogs free in carrier, larger dogs €5 in the last carriage. ICE (Germany) and AVE (Spain) both accept leashed dogs at half-fare.` },
      { q: 'What about flying for a honeymoon with a dog?', a: `Cabin accepts dogs up to 6-8 kg depending on airline (Air France, Lufthansa, KLM, Iberia, ITA). Larger dogs travel in the temperature-controlled hold, which is stressful - for honeymoons we recommend rail or driving when possible to keep the mood right.` },
    ],
    relatedHeading: 'Related guides',
  },
  fr: {
    eyebrow: `LUNE DE MIEL PET-FRIENDLY · EUROPE`,
    title: `Lune de miel avec son chien : 6 destinations romantiques en Europe`,
    intro: `La plupart des shortlists de lune de miel partent du principe que le chien reste à la maison. Mais pour les couples qui voyagent avec leur animal toute l'année, le laisser pour le voyage le plus symbolique de leur relation, ça coince. Nous avons sélectionné six destinations européennes qui marchent vraiment pour une semaine romantique avec un chien en laisse au pied du lit : palais en bord de lac, villes médiévales remparées et falaises côtières où l'offre hôtelière pet-friendly de luxe existe pour de vrai.`,
    pickHeading: 'Les six choix',
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Où dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilités →',
    altHeading: `Vous préférez une lune de miel classique, sans votre animal ?`,
    altIntro: `Certaines lunes de miel ont besoin d'être une vraie bulle à deux - pas de contrôle de laisse à l'entrée des restaurants, pas de logistique pension pour la journée spa, pas de promenade au lever du jour. On comprend. Pour des hôtels de lune de miel curés (Maldives sur pilotis, Bali sur falaise, villa des îles grecques, lodges safari africains, palaces de la Côte d'Azur), notre site partenaire est conçu exactement pour ça :`,
    altLink: `Trouver des hôtels de lune de miel classiques sur ${SISTER_SITE.name}`,
    altOutro: `Même équipe éditoriale, même standard de vérification, aucun animal dans la sélection. Utilisez-le pour planifier la lune de miel, et HotelsWithPets pour tout ce qui vient avant et après, quand votre chien rentre dans l'équation.`,
    faqHeading: 'Questions fréquentes',
    faqs: [
      { q: `Un palace 5 étoiles accepte vraiment mon chien ?`, a: `Plus que vous ne pensez. Les groupes Belmond, Mandarin Oriental, Four Seasons et Anantara ont tous une politique animaux dans leurs grandes adresses européennes. Le poids max est la contrainte habituelle (10-14 kg). Confirmez toujours à la réservation par email direct - les fiches Booking.com sont souvent en retard sur la vraie politique.` },
      { q: 'Meilleures saisons pour une lune de miel pet-friendly en Europe ?', a: `Avril-juin et septembre-octobre sont parfaits : températures douces (16-24 °C), plages encore largement accessibles, terrasses rouvertes, prix mi-saison. Évitez juillet-août en Méditerranée (canicule brutale pour les chiens) et les marchés de Noël si votre chien n'aime pas la foule.` },
      { q: `Peut-on prendre l'Eurostar / TGV / Frecciarossa avec son chien ?`, a: `Eurostar : chiens d'assistance uniquement. TGV : petit chien en sac 7,10 €, grand chien en laisse 7,10 €, pas de limite de nombre. Frecciarossa : petit chien gratuit en sac, grand chien 5 € dans la dernière voiture. ICE (Allemagne) et AVE (Espagne) acceptent les chiens en laisse à demi-tarif.` },
      { q: `Et l'avion pour une lune de miel avec son chien ?`, a: `La cabine accepte les chiens jusqu'à 6-8 kg selon la compagnie (Air France, Lufthansa, KLM, Iberia, ITA). Au-dessus, c'est la soute climatisée, ce qui est stressant - pour une lune de miel on recommande le train ou la voiture quand c'est possible, pour garder l'ambiance juste.` },
    ],
    relatedHeading: 'Guides liés',
  },
  es: {
    eyebrow: `LUNA DE MIEL PET-FRIENDLY · EUROPA`,
    title: `Luna de miel con tu perro: 6 destinos románticos en Europa`,
    intro: `La mayoría de las listas de luna de miel asume que el perro se queda en casa. Pero para parejas que viajan con su mascota todo el año, dejarlo atrás para el viaje más simbólico de su relación choca. Hemos seleccionado seis destinos europeos que funcionan de verdad para una semana romántica con un perro con correa a los pies de la cama: palacios a orillas del lago, ciudades medievales amuralladas y acantilados costeros donde la oferta hotelera pet-friendly de lujo existe realmente.`,
    pickHeading: 'Las seis elecciones',
    whyHere: 'Por qué aquí',
    hotelLabel: 'Dónde alojarse',
    seeDestCta: 'Guía completa →',
    hotelCta: 'Ver disponibilidad →',
    altHeading: '¿Prefieres una luna de miel clásica sin tu mascota?',
    altIntro: `Algunas lunas de miel necesitan ser una verdadera burbuja a dos - sin chequeo de correa a la entrada de los restaurantes, sin logística de guardería para el día de spa, sin paseo al amanecer. Lo entendemos. Para hoteles de luna de miel curados (Maldivas sobre pilotes, Bali en acantilado, villa de las islas griegas, lodges de safari africanos, palacios de la Costa Azul), nuestro sitio hermano está hecho exactamente para eso:`,
    altLink: `Encuentra hoteles de luna de miel clásicos en ${SISTER_SITE.name}`,
    altOutro: `El mismo equipo editorial, el mismo estándar de verificación, sin mascotas en el alcance. Úsalo para planificar la luna de miel, y HotelsWithPets para todo lo que viene antes y después, cuando tu perro vuelve a entrar en la ecuación.`,
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Un palacio de 5 estrellas admite de verdad a mi perro?', a: `Más de lo que crees. Los grupos Belmond, Mandarin Oriental, Four Seasons y Anantara tienen política de mascotas en sus grandes direcciones europeas. El peso máximo es la restricción habitual (10-14 kg). Confirma siempre por email directo al reservar - las fichas Booking.com suelen ir por detrás de la política real.` },
      { q: 'Mejores temporadas para una luna de miel pet-friendly en Europa?', a: `Abril-junio y septiembre-octubre son perfectos: temperaturas suaves (16-24 °C), playas aún ampliamente accesibles, terrazas reabiertas, precios de media temporada. Evita julio-agosto en el Mediterráneo (calor brutal para perros) y los mercados navideños si a tu perro no le gustan las multitudes.` },
      { q: '¿Se puede tomar el Eurostar / TGV / Frecciarossa con perro?', a: `Eurostar: solo perros de asistencia. TGV: perro pequeño en bolsa 7,10 €, perro grande con correa 7,10 €, sin límite de número. Frecciarossa: perro pequeño gratis en bolsa, perro grande 5 € en el último vagón. ICE (Alemania) y AVE (España) admiten perros con correa a media tarifa.` },
      { q: '¿Y el avión para una luna de miel con perro?', a: `La cabina admite perros hasta 6-8 kg según la aerolínea (Air France, Lufthansa, KLM, Iberia, ITA). Por encima, es la bodega climatizada, que es estresante - para una luna de miel recomendamos tren o coche cuando se pueda, para mantener el ambiente.` },
    ],
    relatedHeading: 'Guías relacionadas',
  },
  pt: {
    eyebrow: `LUA DE MEL PET-FRIENDLY · EUROPA`,
    title: `Lua de mel com o seu cão: 6 destinos românticos na Europa`,
    intro: `A maioria das listas de lua de mel parte do princípio que o cão fica em casa. Mas para casais que viajam com o seu animal todo o ano, deixá-lo para a viagem mais simbólica da relação não bate certo. Selecionámos seis destinos europeus que funcionam de verdade para uma semana romântica com um cão à trela aos pés da cama: palácios à beira do lago, cidades medievais muralhadas e falésias costeiras onde a oferta hoteleira pet-friendly de luxo existe realmente.`,
    pickHeading: 'As seis escolhas',
    whyHere: 'Porquê aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    altHeading: 'Prefere uma lua de mel clássica sem o seu animal?',
    altIntro: `Algumas luas de mel precisam de ser uma verdadeira bolha a dois - sem verificação de trela à entrada dos restaurantes, sem logística de pensão para o dia de spa, sem passeio ao amanhecer. Compreendemos. Para hotéis de lua de mel curados (Maldivas sobre estacas, Bali em falésia, villa nas ilhas gregas, lodges de safari africanos, palaces da Riviera Francesa), o nosso site irmão é feito exatamente para isso:`,
    altLink: `Encontre hotéis de lua de mel clássicos em ${SISTER_SITE.name}`,
    altOutro: `A mesma equipa editorial, o mesmo standard de verificação, sem animais no alcance. Use-o para planear a lua de mel, e HotelsWithPets para tudo o que vem antes e depois, quando o seu cão volta a entrar na equação.`,
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'Um palace 5 estrelas aceita mesmo o meu cão?', a: `Mais do que pensa. Os grupos Belmond, Mandarin Oriental, Four Seasons e Anantara têm políticas de animais nas suas grandes propriedades europeias. O peso máximo é a restrição habitual (10-14 kg). Confirme sempre por email direto na reserva - as fichas Booking.com costumam ir atrás da política real.` },
      { q: 'Melhores épocas para uma lua de mel pet-friendly na Europa?', a: `Abril-junho e setembro-outubro são perfeitos: temperaturas amenas (16-24 °C), praias ainda amplamente acessíveis, esplanadas reabertas, preços de época média. Evite julho-agosto no Mediterrâneo (calor brutal para cães) e os mercados de Natal se o seu cão não gosta de multidões.` },
      { q: 'Dá para apanhar o Eurostar / TGV / Frecciarossa com cão?', a: `Eurostar: apenas cães de assistência. TGV: cão pequeno em saco 7,10 €, cão grande à trela 7,10 €, sem limite de número. Frecciarossa: cão pequeno gratuito em saco, cão grande 5 € na última carruagem. ICE (Alemanha) e AVE (Espanha) aceitam cães à trela a metade do preço.` },
      { q: 'E o avião para uma lua de mel com cão?', a: `A cabine aceita cães até 6-8 kg conforme a companhia (Air France, Lufthansa, KLM, Iberia, ITA). Acima, é o porão climatizado, o que é stressante - para uma lua de mel recomendamos comboio ou carro quando possível, para manter o ambiente certo.` },
    ],
    relatedHeading: 'Guias relacionados',
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-700 via-pink-600 to-amber-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-rose-100 mb-3">💍 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-rose-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      {/* Picks */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-6">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-rose-50 to-amber-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-rose-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-rose-700">
                    {p.name}
                  </Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
              </header>
              <div className="px-5 sm:px-7 py-5 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.whyHere}</div>
                  <p className="text-stone-800 leading-relaxed">{pickWhy(p)}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.hotelLabel}</div>
                  <p className="text-stone-700 text-sm leading-relaxed">{pickHotel(p)}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href={`/${locale}${p.destPath}`}
                    className="text-sm font-semibold text-rose-700 hover:text-rose-900 hover:underline"
                  >
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 5)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-rose-700 hover:underline"
                  >
                    {t.hotelCta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sister-site contextual link */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-3">💌 {t.altHeading}</h2>
          <p className="text-stone-800 leading-relaxed mb-3">{t.altIntro}</p>
          <p className="mb-3">
            <a
              href={SISTER_SITE.url}
              target="_blank"
              rel="noopener"
              className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              {t.altLink}
            </a>
          </p>
          <p className="text-stone-700 text-sm leading-relaxed">{t.altOutro}</p>
        </div>
      </section>

      {/* FAQ */}
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
        href={buildAllezDestLink('Europe', 'Europe', `${CAMPAIGN_BASE}-sticky`, 5)}
      />
    </main>
  )
}
