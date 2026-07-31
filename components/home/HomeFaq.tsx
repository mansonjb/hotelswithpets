import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'

type Faq = { q: string; a: string }

interface Copy {
  heading: string
  intro: string
  faqs: Faq[]
  citiesLabel: string
}

// Homepage SEO + FAQ block targeting the head query "dog-friendly hotels".
// Adds topical depth and a FAQPage rich result, in the four native locales.
const COPY: Record<Locale, Copy> = {
  en: {
    heading: 'Dog-friendly hotels in Europe: what to know before you book',
    intro:
      'A dog-friendly hotel is one that genuinely welcomes your dog, not just one that tolerates it. We list 2,400+ dog-friendly and pet-friendly hotels across 400+ European destinations, each with a verified pet policy: the real weight limit, the exact fee, whether dogs can be left alone in the room, and where the nearest park or dog beach is. Every listing links straight to Booking.com so you book the same rate, with your dog on the reservation.',
    faqs: [
      {
        q: 'What makes a hotel dog-friendly?',
        a: 'A truly dog-friendly hotel states its pet policy up front: how many dogs are allowed, any weight or breed limits, the nightly or per-stay fee, and which areas of the hotel dogs can access. We verify each of these rather than relying on a vague "pets allowed" tag, so you know before you book.',
      },
      {
        q: 'Do dog-friendly hotels charge a pet fee?',
        a: 'Many do, from a small nightly cleaning fee to a per-stay charge, but a growing number let dogs stay free. Each hotel page shows the exact fee we verified, and you can filter for hotels where dogs stay free.',
      },
      {
        q: 'How do you verify the pet policies?',
        a: 'We cross-check each hotel\'s own stated policy with its live Booking.com listing and recent guest reviews, and we re-check when policies change. If a detail cannot be confirmed, we say so rather than guess.',
      },
      {
        q: 'Can I bring a large dog or more than one dog?',
        a: 'It depends on the hotel: some cap the weight at 10 kg, others welcome large breeds and multiple dogs. Each listing shows the weight limit and how many dogs are accepted, so you can filter to the ones that fit your dog.',
      },
      {
        q: 'Which European cities have the most dog-friendly hotels?',
        a: 'Big pet-loving cities lead the way, with strong choice in Paris, Barcelona, Amsterdam, Rome and Berlin, plus lakeside and coastal spots where dogs can swim. Browse every destination to compare hotel density, parks and dog beaches.',
      },
    ],
    citiesLabel: 'Popular dog-friendly destinations:',
  },
  fr: {
    heading: 'Hôtels acceptant les chiens en Europe : ce qu\'il faut savoir avant de réserver',
    intro:
      'Un hôtel qui accepte vraiment les chiens ne se contente pas de tolérer votre animal, il l\'accueille pour de vrai. Nous référençons plus de 2 400 hôtels pour chiens et animaux dans plus de 400 destinations européennes, chacun avec une politique vérifiée : la vraie limite de poids, le montant exact du supplément, si le chien peut rester seul en chambre, et où se trouve le parc ou la plage canine la plus proche. Chaque fiche renvoie directement vers Booking.com, au même tarif, avec votre chien inscrit sur la réservation.',
    faqs: [
      {
        q: 'Qu\'est-ce qui rend un hôtel vraiment adapté aux chiens ?',
        a: 'Un hôtel vraiment adapté aux chiens affiche clairement sa politique : nombre de chiens admis, limites de poids ou de race éventuelles, montant du supplément par nuit ou par séjour, et zones accessibles aux chiens. Nous vérifions chaque point plutôt que de nous fier à une simple mention « animaux acceptés ».',
      },
      {
        q: 'Les hôtels pour chiens font-ils payer un supplément ?',
        a: 'Beaucoup appliquent un supplément, d\'un petit forfait ménage par nuit à un montant par séjour, mais de plus en plus laissent le chien séjourner gratuitement. Chaque fiche indique le supplément exact que nous avons vérifié, et vous pouvez filtrer les hôtels où le chien séjourne gratuitement.',
      },
      {
        q: 'Comment vérifiez-vous les politiques animaux ?',
        a: 'Nous recoupons la politique annoncée par l\'hôtel avec sa fiche Booking.com en direct et les avis récents des clients, et nous revérifions quand les règles changent. Si un détail ne peut pas être confirmé, nous le disons plutôt que de deviner.',
      },
      {
        q: 'Puis-je venir avec un grand chien ou plusieurs chiens ?',
        a: 'Cela dépend de l\'hôtel : certains limitent à 10 kg, d\'autres accueillent les grandes races et plusieurs chiens. Chaque fiche indique la limite de poids et le nombre de chiens admis, pour que vous puissiez filtrer selon votre chien.',
      },
      {
        q: 'Quelles villes européennes ont le plus d\'hôtels pour chiens ?',
        a: 'Les grandes villes pet-friendly arrivent en tête, avec un large choix à Paris, Barcelone, Amsterdam, Rome et Berlin, sans oublier les spots au bord des lacs et de la mer où le chien peut se baigner. Parcourez toutes les destinations pour comparer la densité d\'hôtels, les parcs et les plages canines.',
      },
    ],
    citiesLabel: 'Destinations populaires pour les chiens :',
  },
  es: {
    heading: 'Hoteles que admiten perros en Europa: lo que debes saber antes de reservar',
    intro:
      'Un hotel que admite perros de verdad da la bienvenida a tu perro, no solo lo tolera. Listamos más de 2.400 hoteles que admiten perros y mascotas en más de 400 destinos europeos, cada uno con una política verificada: el límite real de peso, el importe exacto del suplemento, si el perro puede quedarse solo en la habitación y dónde está el parque o la playa canina más cercana. Cada ficha enlaza directamente con Booking.com, a la misma tarifa, con tu perro en la reserva.',
    faqs: [
      {
        q: '¿Qué hace que un hotel admita perros de verdad?',
        a: 'Un hotel realmente pet-friendly indica su política de forma clara: cuántos perros admite, límites de peso o raza, el suplemento por noche o por estancia y a qué zonas del hotel pueden acceder los perros. Verificamos cada punto en lugar de fiarnos de una vaga etiqueta de "mascotas admitidas".',
      },
      {
        q: '¿Los hoteles que admiten perros cobran suplemento?',
        a: 'Muchos lo cobran, desde una pequeña tasa de limpieza por noche hasta un cargo por estancia, pero cada vez más dejan que el perro se aloje gratis. Cada ficha muestra el suplemento exacto que verificamos y puedes filtrar los hoteles donde el perro no paga.',
      },
      {
        q: '¿Cómo verificáis las políticas de mascotas?',
        a: 'Cruzamos la política que declara cada hotel con su ficha en vivo de Booking.com y las opiniones recientes, y volvemos a comprobarla cuando cambia. Si un detalle no se puede confirmar, lo decimos en lugar de suponerlo.',
      },
      {
        q: '¿Puedo llevar un perro grande o más de un perro?',
        a: 'Depende del hotel: algunos limitan a 10 kg, otros aceptan razas grandes y varios perros. Cada ficha muestra el límite de peso y cuántos perros se admiten, para que filtres los que encajan con tu perro.',
      },
      {
        q: '¿Qué ciudades europeas tienen más hoteles que admiten perros?',
        a: 'Las grandes ciudades amantes de los animales lideran, con gran oferta en París, Barcelona, Ámsterdam, Roma y Berlín, además de destinos de lago y costa donde el perro puede nadar. Explora todos los destinos para comparar densidad de hoteles, parques y playas caninas.',
      },
    ],
    citiesLabel: 'Destinos populares para perros:',
  },
  pt: {
    heading: 'Hotéis que aceitam cães na Europa: o que saber antes de reservar',
    intro:
      'Um hotel que aceita cães a sério dá as boas-vindas ao seu cão, não se limita a tolerá-lo. Listamos mais de 2.400 hotéis que aceitam cães e animais em mais de 400 destinos europeus, cada um com uma política verificada: o limite real de peso, o valor exato do suplemento, se o cão pode ficar sozinho no quarto e onde fica o parque ou a praia canina mais próxima. Cada ficha liga diretamente ao Booking.com, à mesma tarifa, com o seu cão na reserva.',
    faqs: [
      {
        q: 'O que torna um hotel realmente pet-friendly?',
        a: 'Um hotel verdadeiramente pet-friendly indica claramente a sua política: quantos cães aceita, limites de peso ou raça, o suplemento por noite ou por estadia e a que zonas do hotel os cães têm acesso. Verificamos cada ponto, em vez de confiar num vago rótulo de "animais aceites".',
      },
      {
        q: 'Os hotéis que aceitam cães cobram suplemento?',
        a: 'Muitos cobram, de uma pequena taxa de limpeza por noite a um valor por estadia, mas há cada vez mais onde o cão fica de graça. Cada ficha mostra o suplemento exato que verificámos e pode filtrar os hotéis onde o cão não paga.',
      },
      {
        q: 'Como verificam as políticas de animais?',
        a: 'Cruzamos a política declarada por cada hotel com a ficha ao vivo no Booking.com e as avaliações recentes, e voltamos a verificar quando as regras mudam. Se um detalhe não puder ser confirmado, dizemo-lo em vez de adivinhar.',
      },
      {
        q: 'Posso levar um cão grande ou mais do que um cão?',
        a: 'Depende do hotel: alguns limitam a 10 kg, outros acolhem raças grandes e vários cães. Cada ficha mostra o limite de peso e quantos cães são aceites, para filtrar os que servem ao seu cão.',
      },
      {
        q: 'Que cidades europeias têm mais hotéis que aceitam cães?',
        a: 'As grandes cidades que adoram animais lideram, com grande oferta em Paris, Barcelona, Amesterdão, Roma e Berlim, além de destinos de lago e costa onde o cão pode nadar. Explore todos os destinos para comparar densidade de hotéis, parques e praias caninas.',
      },
    ],
    citiesLabel: 'Destinos populares para cães:',
  },
}

const CITY_LINKS = [
  { slug: 'paris', label: 'Paris' },
  { slug: 'barcelona', label: 'Barcelona' },
  { slug: 'amsterdam', label: 'Amsterdam' },
  { slug: 'rome', label: 'Rome' },
  { slug: 'berlin', label: 'Berlin' },
]

export default function HomeFaq({ locale }: { locale: Locale }) {
  const c = COPY[locale] ?? COPY.en

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="bg-white border-t border-gray-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4">{c.heading}</h2>
        <p className="text-gray-600 leading-relaxed mb-8">{c.intro}</p>

        <div className="divide-y divide-gray-100 border-y border-gray-100">
          {c.faqs.map((f, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-gray-900 list-none">
                {f.q}
                <span className="text-orange-500 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">{c.citiesLabel}</span>
          {CITY_LINKS.map((city) => (
            <Link
              key={city.slug}
              href={`/${locale}/${city.slug}/dog-friendly`}
              className="inline-block rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-700 hover:bg-orange-100 transition-colors"
            >
              {city.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/destinations`}
            className="inline-block rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {locale === 'fr' ? 'Toutes les destinations' : locale === 'es' ? 'Todos los destinos' : locale === 'pt' ? 'Todos os destinos' : 'All destinations'}
          </Link>
        </div>
      </div>
    </section>
  )
}
