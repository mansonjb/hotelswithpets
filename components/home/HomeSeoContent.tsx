import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'

interface Section {
  heading: string
  paragraphs: string[]
}

interface Copy {
  heading: string
  intro: string
  sections: Section[]
}

// Editorial SEO overview for the homepage, topical-depth and internal-linking
// support for the head term "dog-friendly hotels" and its cluster. Sits
// between PetTravelTips and HomeFaq, native copy in all four locales.
const linkCls = 'text-orange-700 font-medium underline decoration-orange-200 underline-offset-2 hover:decoration-orange-500'

const CITY_LABELS: Record<string, Record<string, string>> = {
  en: { paris: 'Paris', barcelona: 'Barcelona', amsterdam: 'Amsterdam', rome: 'Rome', berlin: 'Berlin', vienna: 'Vienna', lisbon: 'Lisbon' },
  fr: { paris: 'Paris', barcelona: 'Barcelone', amsterdam: 'Amsterdam', rome: 'Rome', berlin: 'Berlin', vienna: 'Vienne', lisbon: 'Lisbonne' },
  es: { paris: 'París', barcelona: 'Barcelona', amsterdam: 'Ámsterdam', rome: 'Roma', berlin: 'Berlín', vienna: 'Viena', lisbon: 'Lisboa' },
  pt: { paris: 'Paris', barcelona: 'Barcelona', amsterdam: 'Amesterdão', rome: 'Roma', berlin: 'Berlim', vienna: 'Viena', lisbon: 'Lisboa' },
  de: { paris: 'Paris', barcelona: 'Barcelona', amsterdam: 'Amsterdam', rome: 'Rom', berlin: 'Berlin', vienna: 'Wien', lisbon: 'Lissabon' },
}

const CITY_SLUGS = ['paris', 'barcelona', 'amsterdam', 'rome', 'berlin', 'vienna', 'lisbon'] as const

const COPY: Record<string, Copy> = {
  en: {
    heading: 'Dog-friendly hotels, explained',
    intro:
      'Beyond individual listings, here is the bigger picture on travelling with a dog in Europe: how we check a hotel actually welcomes dogs, what fees to expect, where dogs are genuinely welcome, and how to get there.',
    sections: [
      {
        heading: 'How we verify dog-friendly hotels',
        paragraphs: [
          'A "pets allowed" tag on a booking site rarely tells the whole story. Before a hotel appears on our lists, we check its own stated pet policy against its live Booking.com listing and recent guest reviews mentioning dogs, so the weight limit, fee and in-room rules you see actually hold up at check-in.',
        ],
      },
      {
        heading: 'Pet fees: what to expect',
        paragraphs: [
          'Fees vary a lot from one hotel to the next: some charge a flat cleaning fee per stay, others a smaller amount per night, and a growing number let your dog stay completely free. There is no industry standard, which is exactly why we list the exact figure on every hotel page instead of a vague range.',
          'If budget matters, it is worth filtering hotels by category rather than city alone, and checking which destinations have the most dogs-stay-free options, Amsterdam is a strong example.',
        ],
      },
      {
        heading: 'The best European cities to travel with a dog',
        paragraphs: [
          'Some cities make dog ownership easy: wide parks, dog-friendly cafés and terraces, and hotels used to canine guests. Paris, Barcelona and Amsterdam consistently offer the deepest choice, while Rome, Berlin, Vienna and Lisbon each bring their own mix of green space and pet-friendly transport.',
        ],
      },
      {
        heading: 'Dog beaches, parks and off-leash spots',
        paragraphs: [
          'A hotel room is only half the trip. Most of our destination guides link out to nearby off-leash parks, and Europe has a growing number of proper dog beaches where your dog can swim without a lead.',
        ],
      },
      {
        heading: 'Travelling with your dog: transport and paperwork',
        paragraphs: [
          'Getting to your hotel is its own project: European trains generally welcome dogs but rules on size, muzzles and tickets differ by country and operator, and crossing a border means carrying the right paperwork, not just a chip.',
        ],
      },
    ],
  },
  fr: {
    heading: 'Hôtels acceptant les chiens : le mode d\'emploi',
    intro:
      'Au-delà des fiches individuelles, voici la vue d\'ensemble pour voyager avec un chien en Europe : comment nous vérifions qu\'un hôtel accueille vraiment les chiens, les suppléments à prévoir, où le chien est réellement bienvenu, et comment s\'y rendre.',
    sections: [
      {
        heading: 'Comment nous vérifions les hôtels acceptant les chiens',
        paragraphs: [
          'Une mention « animaux acceptés » sur un site de réservation ne dit pas tout. Avant qu\'un hôtel apparaisse dans nos listes, nous confrontons sa politique annoncée à sa fiche Booking.com en direct et aux avis récents des voyageurs qui mentionnent leur chien, pour que la limite de poids, le supplément et les règles en chambre tiennent vraiment le jour de l\'arrivée.',
        ],
      },
      {
        heading: 'Suppléments animaux : à quoi s\'attendre',
        paragraphs: [
          'Le montant varie beaucoup d\'un hôtel à l\'autre : certains appliquent un forfait ménage par séjour, d\'autres un petit montant par nuit, et de plus en plus laissent le chien séjourner gratuitement. Il n\'existe pas de norme, c\'est justement pour ça que chaque fiche hôtel affiche le chiffre exact plutôt qu\'une fourchette floue.',
          'Si le budget compte, mieux vaut filtrer par catégorie plutôt que par seule ville, et repérer les destinations où le chien séjourne gratuitement le plus souvent : Amsterdam en est un bon exemple.',
        ],
      },
      {
        heading: 'Les meilleures villes européennes pour voyager avec un chien',
        paragraphs: [
          'Certaines villes facilitent vraiment la vie avec un chien : grands parcs, cafés et terrasses qui l\'acceptent, hôtels habitués aux clients à quatre pattes. Paris, Barcelone et Amsterdam offrent le choix le plus large, tandis que Rome, Berlin, Vienne et Lisbonne apportent chacune leur propre équilibre d\'espaces verts et de transports adaptés.',
        ],
      },
      {
        heading: 'Plages et parcs pour chiens, espaces en liberté',
        paragraphs: [
          'La chambre d\'hôtel n\'est que la moitié du voyage. La plupart de nos guides de destination renvoient vers des parcs clôturés à proximité, et l\'Europe compte de plus en plus de vraies plages pour chiens où le vôtre peut nager sans laisse.',
        ],
      },
      {
        heading: 'Voyager avec son chien : transport et papiers',
        paragraphs: [
          'Se rendre à l\'hôtel est un sujet à part entière : les trains européens acceptent généralement les chiens, mais les règles sur la taille, la muselière et le billet changent selon le pays et l\'opérateur, et passer une frontière demande les bons papiers, pas seulement une puce.',
        ],
      },
    ],
  },
  es: {
    heading: 'Hoteles que admiten perros: cómo funciona',
    intro:
      'Más allá de las fichas individuales, aquí está el panorama completo para viajar con un perro por Europa: cómo verificamos que un hotel admite perros de verdad, qué suplementos esperar, dónde es realmente bienvenido y cómo llegar.',
    sections: [
      {
        heading: 'Cómo verificamos los hoteles que admiten perros',
        paragraphs: [
          'Una etiqueta de "mascotas admitidas" en una web de reservas rara vez cuenta toda la historia. Antes de que un hotel aparezca en nuestras listas, comparamos su política declarada con su ficha en vivo de Booking.com y las opiniones recientes de huéspedes que mencionan a su perro, para que el límite de peso, el suplemento y las normas en la habitación se cumplan de verdad al llegar.',
        ],
      },
      {
        heading: 'Suplementos para mascotas: qué esperar',
        paragraphs: [
          'El importe varía mucho de un hotel a otro: algunos cobran una tasa fija de limpieza por estancia, otros un pequeño cargo por noche, y cada vez más dejan que el perro se aloje totalmente gratis. No existe un estándar, por eso mostramos la cifra exacta en cada ficha en lugar de un rango impreciso.',
          'Si el presupuesto importa, conviene filtrar por categoría además de por ciudad, y ver qué destinos tienen más opciones donde el perro no paga: Ámsterdam es un buen ejemplo.',
        ],
      },
      {
        heading: 'Las mejores ciudades europeas para viajar con un perro',
        paragraphs: [
          'Algunas ciudades facilitan mucho la vida con un perro: parques amplios, cafeterías y terrazas que los admiten, y hoteles acostumbrados a huéspedes de cuatro patas. París, Barcelona y Ámsterdam ofrecen la oferta más amplia, mientras que Roma, Berlín, Viena y Lisboa aportan cada una su propio equilibrio de espacios verdes y transporte adaptado.',
        ],
      },
      {
        heading: 'Playas y parques para perros, zonas de esparcimiento libre',
        paragraphs: [
          'La habitación de hotel es solo la mitad del viaje. La mayoría de nuestras guías de destino enlazan con parques vallados cercanos, y Europa cuenta cada vez con más playas caninas de verdad donde tu perro puede nadar sin correa.',
        ],
      },
      {
        heading: 'Viajar con tu perro: transporte y papeleo',
        paragraphs: [
          'Llegar al hotel es un tema aparte: los trenes europeos suelen admitir perros, pero las normas sobre tamaño, bozal y billete cambian según el país y el operador, y cruzar una frontera exige llevar el papeleo correcto, no solo el chip.',
        ],
      },
    ],
  },
  pt: {
    heading: 'Hotéis que aceitam cães: como funciona',
    intro:
      'Para além das fichas individuais, aqui fica a visão de conjunto para viajar com um cão pela Europa: como verificamos que um hotel aceita mesmo cães, que suplementos esperar, onde o cão é genuinamente bem-vindo e como lá chegar.',
    sections: [
      {
        heading: 'Como verificamos os hotéis que aceitam cães',
        paragraphs: [
          'Um rótulo de "animais aceites" num site de reservas raramente conta toda a história. Antes de um hotel aparecer nas nossas listas, cruzamos a política que declara com a sua ficha ao vivo no Booking.com e as avaliações recentes de hóspedes que mencionam o cão, para que o limite de peso, o suplemento e as regras no quarto se confirmem mesmo na chegada.',
        ],
      },
      {
        heading: 'Suplementos para animais: o que esperar',
        paragraphs: [
          'O valor varia muito de hotel para hotel: alguns cobram uma taxa fixa de limpeza por estadia, outros um valor menor por noite, e há cada vez mais onde o cão fica completamente de graça. Não existe um padrão, por isso mostramos o valor exato em cada ficha em vez de um intervalo vago.',
          'Se o orçamento pesa, vale filtrar por categoria além da cidade, e ver que destinos têm mais opções onde o cão não paga: Amesterdão é um bom exemplo.',
        ],
      },
      {
        heading: 'As melhores cidades europeias para viajar com um cão',
        paragraphs: [
          'Algumas cidades facilitam mesmo a vida com um cão: parques amplos, cafés e esplanadas que os aceitam, e hotéis habituados a hóspedes de quatro patas. Paris, Barcelona e Amesterdão oferecem a escolha mais ampla, enquanto Roma, Berlim, Viena e Lisboa trazem cada uma o seu próprio equilíbrio de espaços verdes e transportes adaptados.',
        ],
      },
      {
        heading: 'Praias e parques para cães, zonas em liberdade',
        paragraphs: [
          'O quarto de hotel é só metade da viagem. A maioria dos nossos guias de destino remete para parques vedados nas proximidades, e a Europa tem cada vez mais praias caninas a sério onde o seu cão pode nadar sem trela.',
        ],
      },
      {
        heading: 'Viajar com o seu cão: transporte e documentação',
        paragraphs: [
          'Chegar ao hotel é um tema à parte: os comboios europeus geralmente aceitam cães, mas as regras sobre tamanho, açaime e bilhete mudam consoante o país e o operador, e atravessar uma fronteira exige a documentação certa, não só o chip.',
        ],
      },
    ],
  },
  de: {
    heading: 'Hundefreundliche Hotels: so funktioniert es',
    intro:
      'Über die einzelnen Hotelprofile hinaus hier der Überblick fürs Reisen mit Hund in Europa: wie wir prüfen, ob ein Hotel wirklich hundefreundlich ist, welche Gebühren Sie erwarten können, wo Hunde tatsächlich willkommen sind und wie Sie dorthin kommen.',
    sections: [
      {
        heading: 'Wie wir hundefreundliche Hotels prüfen',
        paragraphs: [
          'Ein Hinweis „Haustiere erlaubt" auf einer Buchungsseite erzählt selten die ganze Geschichte. Bevor ein Hotel in unseren Listen erscheint, gleichen wir seine angegebene Haustierrichtlinie mit dem aktuellen Booking.com-Eintrag und den jüngsten Bewertungen von Gästen ab, die ihren Hund erwähnen, damit Gewichtsgrenze, Gebühr und Zimmerregeln beim Check-in wirklich stimmen.',
        ],
      },
      {
        heading: 'Haustiergebühren: was Sie erwarten können',
        paragraphs: [
          'Die Gebühren variieren stark von Hotel zu Hotel: manche berechnen eine pauschale Reinigungsgebühr pro Aufenthalt, andere einen kleineren Betrag pro Nacht, und immer mehr Hotels lassen Ihren Hund komplett kostenlos übernachten. Es gibt keinen Branchenstandard, weshalb wir auf jeder Hotelseite den genauen Betrag angeben statt einer vagen Spanne.',
          'Wenn das Budget wichtig ist, lohnt es sich, Hotels nach Kategorie statt nur nach Stadt zu filtern und zu prüfen, welche Reiseziele die meisten Optionen bieten, bei denen Hunde gratis übernachten. Amsterdam ist dafür ein gutes Beispiel.',
        ],
      },
      {
        heading: 'Die besten europäischen Städte für Reisen mit Hund',
        paragraphs: [
          'Manche Städte machen das Leben mit Hund besonders leicht: weitläufige Parks, hundefreundliche Cafés und Terrassen sowie Hotels, die an vierbeinige Gäste gewöhnt sind. Paris, Barcelona und Amsterdam bieten durchweg die größte Auswahl, während Rom, Berlin, Wien und Lissabon jeweils ihre eigene Mischung aus Grünflächen und haustierfreundlichem Nahverkehr mitbringen.',
        ],
      },
      {
        heading: 'Hundestrände, Parks und Freilaufflächen',
        paragraphs: [
          'Das Hotelzimmer ist nur die halbe Reise. Die meisten unserer Reiseziel-Guides verlinken zu nahegelegenen eingezäunten Hundeausläufen, und Europa hat eine wachsende Zahl echter Hundestrände, an denen Ihr Hund ohne Leine schwimmen kann.',
        ],
      },
      {
        heading: 'Mit Hund unterwegs: Transport und Papiere',
        paragraphs: [
          'Die Anreise zum Hotel ist ein eigenes Thema: Europäische Züge nehmen Hunde in der Regel mit, doch die Regeln zu Größe, Maulkorb und Fahrkarten unterscheiden sich je nach Land und Betreiber, und beim Grenzübertritt braucht es die richtigen Papiere, nicht nur einen Chip.',
        ],
      },
    ],
  },
}

export default function HomeSeoContent({ locale }: { locale: Locale }) {
  const c = COPY[locale] ?? COPY.en
  const cityLabels = CITY_LABELS[locale] ?? CITY_LABELS.en

  const aboutLabel: Record<string, string> = {
    en: 'About page',
    fr: 'page À propos',
    es: 'página Quiénes somos',
    pt: 'página Sobre nós',
    de: 'Über-uns-Seite',
  }
  const guideLabel: Record<string, string> = {
    en: 'European pet-friendly hotel guide',
    fr: 'guide des hôtels acceptant les animaux en Europe',
    es: 'guía de hoteles pet-friendly en Europa',
    pt: 'guia de hotéis pet-friendly na Europa',
    de: 'Reiseführer für haustierfreundliche Hotels in Europa',
  }
  const categoriesLabel: Record<string, string> = {
    en: 'browsing by category',
    fr: 'parcourir par catégorie',
    es: 'explorar por categoría',
    pt: 'explorar por categoria',
    de: 'nach Kategorie',
  }
  const dogsStayFreeLabel: Record<string, string> = {
    en: 'dogs-stay-free hotels in Amsterdam',
    fr: 'hôtels où le chien séjourne gratuitement à Amsterdam',
    es: 'hoteles donde el perro no paga en Ámsterdam',
    pt: 'hotéis onde o cão não paga em Amesterdão',
    de: 'Hotels in Amsterdam, in denen Hunde gratis übernachten',
  }
  const destinationsLabel: Record<string, string> = {
    en: 'all destinations',
    fr: 'toutes les destinations',
    es: 'todos los destinos',
    pt: 'todos os destinos',
    de: 'alle Reiseziele',
  }
  const dogParksLabel: Record<string, string> = {
    en: 'our dog parks directory',
    fr: 'notre annuaire de parcs pour chiens',
    es: 'nuestro directorio de parques para perros',
    pt: 'o nosso diretório de parques para cães',
    de: 'unserem Verzeichnis der Hundeparks',
  }
  const dogBeachesLabel: Record<string, string> = {
    en: 'best dog beaches in Europe',
    fr: 'meilleures plages pour chiens en Europe',
    es: 'mejores playas para perros en Europa',
    pt: 'melhores praias para cães na Europa',
    de: 'echten Hundestränden in Europa',
  }
  const fencedParksLabel: Record<string, string> = {
    en: 'fenced dog parks across Europe',
    fr: 'parcs à chiens clôturés en Europe',
    es: 'parques vallados para perros en Europa',
    pt: 'parques vedados para cães na Europa',
    de: 'eingezäunte Hundeausläufe in Europa',
  }
  const trainLabel: Record<string, string> = {
    en: 'travelling by train with a dog',
    fr: 'voyager en train avec son chien',
    es: 'viajar en tren con tu perro',
    pt: 'viajar de comboio com o seu cão',
    de: 'das Reisen mit Hund im Zug',
  }
  const passportLabel: Record<string, string> = {
    en: 'the EU pet passport',
    fr: 'le passeport pour animaux',
    es: 'el pasaporte para mascotas',
    pt: 'o passaporte para animais',
    de: 'den EU-Heimtierausweis',
  }

  return (
    <section className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4">{c.heading}</h2>
        <p className="text-gray-600 leading-relaxed mb-10">{c.intro}</p>

        <div className="space-y-10">
          {/* 1. Verification */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{c.sections[0].heading}</h3>
            <p className="text-gray-600 leading-relaxed mb-2">{c.sections[0].paragraphs[0]}</p>
            <p className="text-gray-600 leading-relaxed">
              {locale === 'en' && (
                <>
                  Our full verification process, including what we do when a hotel&apos;s policy is unclear, is on our{' '}
                  <Link href={`/${locale}/about`} className={linkCls}>{aboutLabel.en}</Link>, alongside our{' '}
                  <Link href={`/${locale}/guides/pet-friendly-hotels-europe-guide`} className={linkCls}>{guideLabel.en}</Link>.
                </>
              )}
              {locale === 'fr' && (
                <>
                  Notre méthode complète de vérification, y compris ce que nous faisons quand une politique reste floue, est détaillée sur notre{' '}
                  <Link href={`/${locale}/about`} className={linkCls}>{aboutLabel.fr}</Link>, avec notre{' '}
                  <Link href={`/${locale}/guides/pet-friendly-hotels-europe-guide`} className={linkCls}>{guideLabel.fr}</Link>.
                </>
              )}
              {locale === 'es' && (
                <>
                  Nuestro proceso completo de verificación, incluido lo que hacemos cuando una política no está clara, está en nuestra{' '}
                  <Link href={`/${locale}/about`} className={linkCls}>{aboutLabel.es}</Link>, junto a nuestra{' '}
                  <Link href={`/${locale}/guides/pet-friendly-hotels-europe-guide`} className={linkCls}>{guideLabel.es}</Link>.
                </>
              )}
              {locale === 'pt' && (
                <>
                  O nosso processo completo de verificação, incluindo o que fazemos quando uma política não está clara, está na nossa{' '}
                  <Link href={`/${locale}/about`} className={linkCls}>{aboutLabel.pt}</Link>, junto com o nosso{' '}
                  <Link href={`/${locale}/guides/pet-friendly-hotels-europe-guide`} className={linkCls}>{guideLabel.pt}</Link>.
                </>
              )}
              {locale === 'de' && (
                <>
                  Unser vollständiger Prüfprozess, einschließlich dessen, was wir tun, wenn die Richtlinie eines Hotels unklar ist, steht auf unserer{' '}
                  <Link href={`/${locale}/about`} className={linkCls}>{aboutLabel.de}</Link>, zusammen mit unserem{' '}
                  <Link href={`/${locale}/guides/pet-friendly-hotels-europe-guide`} className={linkCls}>{guideLabel.de}</Link>.
                </>
              )}
            </p>
          </div>

          {/* 2. Fees */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{c.sections[1].heading}</h3>
            <p className="text-gray-600 leading-relaxed mb-2">{c.sections[1].paragraphs[0]}</p>
            <p className="text-gray-600 leading-relaxed">
              {locale === 'en' && (
                <>
                  If budget matters, it is worth{' '}
                  <Link href={`/${locale}/categories`} className={linkCls}>{categoriesLabel.en}</Link> rather than city alone, and checking{' '}
                  <Link href={`/${locale}/amsterdam/dogs-stay-free`} className={linkCls}>{dogsStayFreeLabel.en}</Link>, one of the strongest examples we track.
                </>
              )}
              {locale === 'fr' && (
                <>
                  Si le budget compte, mieux vaut{' '}
                  <Link href={`/${locale}/categories`} className={linkCls}>{categoriesLabel.fr}</Link> plutôt que par seule ville, et repérer les{' '}
                  <Link href={`/${locale}/amsterdam/dogs-stay-free`} className={linkCls}>{dogsStayFreeLabel.fr}</Link>, un des exemples les plus fournis que nous suivons.
                </>
              )}
              {locale === 'es' && (
                <>
                  Si el presupuesto importa, conviene{' '}
                  <Link href={`/${locale}/categories`} className={linkCls}>{categoriesLabel.es}</Link> además de por ciudad, y consultar los{' '}
                  <Link href={`/${locale}/amsterdam/dogs-stay-free`} className={linkCls}>{dogsStayFreeLabel.es}</Link>, uno de los ejemplos más completos que seguimos.
                </>
              )}
              {locale === 'pt' && (
                <>
                  Se o orçamento pesa, vale{' '}
                  <Link href={`/${locale}/categories`} className={linkCls}>{categoriesLabel.pt}</Link> além da cidade, e consultar os{' '}
                  <Link href={`/${locale}/amsterdam/dogs-stay-free`} className={linkCls}>{dogsStayFreeLabel.pt}</Link>, um dos exemplos mais completos que acompanhamos.
                </>
              )}
              {locale === 'de' && (
                <>
                  Wenn das Budget wichtig ist, lohnt es sich, Hotels{' '}
                  <Link href={`/${locale}/categories`} className={linkCls}>{categoriesLabel.de}</Link> statt nur nach Stadt zu filtern und die{' '}
                  <Link href={`/${locale}/amsterdam/dogs-stay-free`} className={linkCls}>{dogsStayFreeLabel.de}</Link> zu prüfen, eines der besten Beispiele, die wir kennen.
                </>
              )}
            </p>
          </div>

          {/* 3. Best cities */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{c.sections[2].heading}</h3>
            <p className="text-gray-600 leading-relaxed mb-2">
              {c.sections[2].paragraphs[0]}{' '}
              {locale === 'en' && 'Explore each city, or browse '}
              {locale === 'fr' && 'Explorez chaque ville, ou parcourez '}
              {locale === 'es' && 'Explora cada ciudad, o consulta '}
              {locale === 'pt' && 'Explore cada cidade, ou consulte '}
              {locale === 'de' && 'Entdecken Sie jede Stadt, oder durchstöbern Sie '}
              <Link href={`/${locale}/destinations`} className={linkCls}>{destinationsLabel[locale]}</Link>.
            </p>
            <div className="flex flex-wrap gap-2">
              {CITY_SLUGS.map((slug) => (
                <Link
                  key={slug}
                  href={`/${locale}/${slug}/dog-friendly`}
                  className="inline-block rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700 hover:bg-orange-100 transition-colors"
                >
                  {cityLabels[slug]}
                </Link>
              ))}
            </div>
          </div>

          {/* 4. Beaches / parks */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{c.sections[3].heading}</h3>
            <p className="text-gray-600 leading-relaxed">
              {locale === 'en' && (
                <>
                  A hotel room is only half the trip. Most of our destination guides link out to{' '}
                  <Link href={`/${locale}/dog-parks`} className={linkCls}>{dogParksLabel.en}</Link>, and Europe has a growing number of{' '}
                  <Link href={`/${locale}/guides/best-dog-beaches-europe-2026`} className={linkCls}>{dogBeachesLabel.en}</Link> where your dog can swim off the lead, alongside{' '}
                  <Link href={`/${locale}/guides/fenced-dog-parks-europe`} className={linkCls}>{fencedParksLabel.en}</Link> for safe off-leash time.
                </>
              )}
              {locale === 'fr' && (
                <>
                  La chambre d&apos;hôtel n&apos;est que la moitié du voyage. La plupart de nos guides de destination renvoient vers{' '}
                  <Link href={`/${locale}/dog-parks`} className={linkCls}>{dogParksLabel.fr}</Link>, et l&apos;Europe compte de plus en plus de{' '}
                  <Link href={`/${locale}/guides/best-dog-beaches-europe-2026`} className={linkCls}>{dogBeachesLabel.fr}</Link> où le vôtre peut nager sans laisse, ainsi que des{' '}
                  <Link href={`/${locale}/guides/fenced-dog-parks-europe`} className={linkCls}>{fencedParksLabel.fr}</Link> pour des sorties en liberté en toute sécurité.
                </>
              )}
              {locale === 'es' && (
                <>
                  La habitación de hotel es solo la mitad del viaje. La mayoría de nuestras guías de destino enlazan con{' '}
                  <Link href={`/${locale}/dog-parks`} className={linkCls}>{dogParksLabel.es}</Link>, y Europa cuenta cada vez con más{' '}
                  <Link href={`/${locale}/guides/best-dog-beaches-europe-2026`} className={linkCls}>{dogBeachesLabel.es}</Link> donde tu perro puede nadar sin correa, además de{' '}
                  <Link href={`/${locale}/guides/fenced-dog-parks-europe`} className={linkCls}>{fencedParksLabel.es}</Link> para un rato de libertad seguro.
                </>
              )}
              {locale === 'pt' && (
                <>
                  O quarto de hotel é só metade da viagem. A maioria dos nossos guias de destino remete para o{' '}
                  <Link href={`/${locale}/dog-parks`} className={linkCls}>{dogParksLabel.pt}</Link>, e a Europa tem cada vez mais{' '}
                  <Link href={`/${locale}/guides/best-dog-beaches-europe-2026`} className={linkCls}>{dogBeachesLabel.pt}</Link> onde o seu cão pode nadar sem trela, além de{' '}
                  <Link href={`/${locale}/guides/fenced-dog-parks-europe`} className={linkCls}>{fencedParksLabel.pt}</Link> para momentos de liberdade em segurança.
                </>
              )}
              {locale === 'de' && (
                <>
                  Das Hotelzimmer ist nur die halbe Reise. Die meisten unserer Reiseziel-Guides verlinken zu{' '}
                  <Link href={`/${locale}/dog-parks`} className={linkCls}>{dogParksLabel.de}</Link>, und Europa hat eine wachsende Zahl an{' '}
                  <Link href={`/${locale}/guides/best-dog-beaches-europe-2026`} className={linkCls}>{dogBeachesLabel.de}</Link>, an denen Ihr Hund ohne Leine schwimmen kann, sowie{' '}
                  <Link href={`/${locale}/guides/fenced-dog-parks-europe`} className={linkCls}>{fencedParksLabel.de}</Link> für sicheren Freilauf.
                </>
              )}
            </p>
          </div>

          {/* 5. Transport & paperwork */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{c.sections[4].heading}</h3>
            <p className="text-gray-600 leading-relaxed">
              {locale === 'en' && (
                <>
                  Getting to your hotel is its own project. Read up on{' '}
                  <Link href={`/${locale}/guides/train-avec-chien`} className={linkCls}>{trainLabel.en}</Link> in Europe, where rules on size, muzzles and tickets differ by country, and on{' '}
                  <Link href={`/${locale}/guides/passeport-animal`} className={linkCls}>{passportLabel.en}</Link> before crossing any border.
                </>
              )}
              {locale === 'fr' && (
                <>
                  Se rendre à l&apos;hôtel est un sujet à part entière. Renseignez-vous sur{' '}
                  <Link href={`/${locale}/guides/train-avec-chien`} className={linkCls}>{trainLabel.fr}</Link> en Europe, où les règles sur la taille, la muselière et le billet varient selon le pays, et sur{' '}
                  <Link href={`/${locale}/guides/passeport-animal`} className={linkCls}>{passportLabel.fr}</Link> avant de passer une frontière.
                </>
              )}
              {locale === 'es' && (
                <>
                  Llegar al hotel es un tema aparte. Consulta cómo es{' '}
                  <Link href={`/${locale}/guides/train-avec-chien`} className={linkCls}>{trainLabel.es}</Link> por Europa, donde las normas sobre tamaño, bozal y billete cambian según el país, y sobre{' '}
                  <Link href={`/${locale}/guides/passeport-animal`} className={linkCls}>{passportLabel.es}</Link> antes de cruzar una frontera.
                </>
              )}
              {locale === 'pt' && (
                <>
                  Chegar ao hotel é um tema à parte. Informe-se sobre{' '}
                  <Link href={`/${locale}/guides/train-avec-chien`} className={linkCls}>{trainLabel.pt}</Link> pela Europa, onde as regras sobre tamanho, açaime e bilhete mudam consoante o país, e sobre{' '}
                  <Link href={`/${locale}/guides/passeport-animal`} className={linkCls}>{passportLabel.pt}</Link> antes de atravessar uma fronteira.
                </>
              )}
              {locale === 'de' && (
                <>
                  Die Anreise zum Hotel ist ein eigenes Thema. Informieren Sie sich über{' '}
                  <Link href={`/${locale}/guides/train-avec-chien`} className={linkCls}>{trainLabel.de}</Link> in Europa, wo die Regeln zu Größe, Maulkorb und Fahrkarte je nach Land unterschiedlich sind, sowie über{' '}
                  <Link href={`/${locale}/guides/passeport-animal`} className={linkCls}>{passportLabel.de}</Link>, bevor Sie eine Grenze überqueren.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
