import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'About HotelsWithPets.com | How We Find Pet-Friendly Hotels',
    fr: 'À propos de HotelsWithPets.com | Comment nous trouvons les hôtels',
    es: 'Sobre HotelsWithPets.com | Cómo encontramos hoteles con mascotas',
  }
  const descriptions: Record<string, string> = {
    en: 'HotelsWithPets.com helps pet owners find and book the best pet-friendly hotels in Europe. Learn how we select hotels and verify their pet policies.',
    fr: 'HotelsWithPets.com aide les propriétaires d\'animaux à trouver et réserver les meilleurs hôtels acceptant les animaux en Europe.',
    es: 'HotelsWithPets.com ayuda a los dueños de mascotas a encontrar y reservar los mejores hoteles que admiten mascotas en Europa.',
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        en: `${SITE_URL}/en/about`,
        fr: `${SITE_URL}/fr/about`,
        es: `${SITE_URL}/es/about`,
        'x-default': `${SITE_URL}/en/about`,
      },
    },
  }
}

const content: Record<string, {
  title: string
  subtitle: string
  mission: { title: string; text: string }
  how: { title: string; steps: Array<{ title: string; text: string }> }
  affiliate: { title: string; text: string }
  contact: { title: string; text: string }
}> = {
  en: {
    title: 'About HotelsWithPets.com',
    subtitle: 'We help pet owners travel Europe with confidence — finding hotels that truly welcome animals.',
    mission: {
      title: 'Our Mission',
      text: 'Travelling with a pet shouldn\'t mean spending hours cross-checking hotel policies, calling ahead to confirm fees, or worrying whether your dog will actually be welcome. HotelsWithPets.com curates the best pet-friendly hotels across 34 European destinations so you can spend more time planning the adventure and less time on logistics.',
    },
    how: {
      title: 'How We Select Hotels',
      steps: [
        { title: 'Pet policy verification', text: 'We only list hotels that explicitly accept pets. We check official Booking.com pet policies and filter for genuine welcomes — not just "small pets considered".' },
        { title: 'Guest ratings', text: 'Every hotel on our site has a minimum Booking.com guest score of 8.0. Pet-friendly doesn\'t mean compromising on quality.' },
        { title: 'Category tagging', text: 'We tag hotels by what matters to pet owners: dog-friendly, cat-friendly, beach access, proximity to parks, luxury, and no-pet-fee properties.' },
        { title: 'Regular updates', text: 'Pet policies change. We refresh our data regularly to ensure the information you see reflects current hotel policies.' },
      ],
    },
    affiliate: {
      title: 'Affiliate Disclosure',
      text: 'HotelsWithPets.com earns a commission when you book through our links to Booking.com. This comes at no extra cost to you and helps us maintain and improve the site. Our editorial choices are never influenced by affiliate relationships — we list hotels based on quality and genuine pet-friendliness.',
    },
    contact: {
      title: 'Contact & Corrections',
      text: 'Found incorrect pet policy information? Know a great pet-friendly hotel we\'ve missed? We want to hear from you. Our goal is to be the most accurate and useful resource for travelling pet owners in Europe.',
    },
  },
  fr: {
    title: 'À propos de HotelsWithPets.com',
    subtitle: 'Nous aidons les propriétaires d\'animaux à voyager en Europe en toute confiance — en trouvant des hôtels qui accueillent vraiment les animaux.',
    mission: {
      title: 'Notre Mission',
      text: 'Voyager avec un animal de compagnie ne devrait pas signifier passer des heures à vérifier les politiques d\'hôtels, appeler pour confirmer les frais ou s\'inquiéter de l\'accueil réservé à votre chien. HotelsWithPets.com sélectionne les meilleurs hôtels acceptant les animaux dans 34 destinations européennes.',
    },
    how: {
      title: 'Comment Nous Sélectionnons les Hôtels',
      steps: [
        { title: 'Vérification des politiques animaux', text: 'Nous ne listons que les hôtels qui acceptent explicitement les animaux. Nous vérifions les politiques officielles et filtrons pour des accueils genuins.' },
        { title: 'Notes des clients', text: 'Chaque hôtel de notre site a un score minimum de 8,0 sur Booking.com. Accepter les animaux ne signifie pas compromettre la qualité.' },
        { title: 'Catégorisation', text: 'Nous tagons les hôtels selon ce qui compte pour les propriétaires : chiens, chats, accès plage, proche des parcs, luxe et sans frais animaux.' },
        { title: 'Mises à jour régulières', text: 'Les politiques animaux changent. Nous actualisons nos données régulièrement pour refléter les politiques actuelles des hôtels.' },
      ],
    },
    affiliate: {
      title: 'Mention Affilié',
      text: 'HotelsWithPets.com perçoit une commission lorsque vous réservez via nos liens vers Booking.com. Cela ne vous coûte rien de plus et nous aide à maintenir et améliorer le site. Nos choix éditoriaux ne sont jamais influencés par ces relations commerciales.',
    },
    contact: {
      title: 'Contact et Corrections',
      text: 'Vous avez trouvé des informations inexactes sur la politique animaux d\'un hôtel ? Vous connaissez un excellent hôtel pet-friendly que nous avons manqué ? Contactez-nous.',
    },
  },
  es: {
    title: 'Sobre HotelsWithPets.com',
    subtitle: 'Ayudamos a los dueños de mascotas a viajar por Europa con confianza — encontrando hoteles que realmente dan la bienvenida a los animales.',
    mission: {
      title: 'Nuestra Misión',
      text: 'Viajar con una mascota no debería significar pasar horas verificando políticas de hoteles o preocuparse por si tu perro será realmente bienvenido. HotelsWithPets.com selecciona los mejores hoteles que admiten mascotas en 34 destinos europeos.',
    },
    how: {
      title: 'Cómo Seleccionamos los Hoteles',
      steps: [
        { title: 'Verificación de política de mascotas', text: 'Solo listamos hoteles que aceptan mascotas explícitamente. Verificamos las políticas oficiales y filtramos por bienvenidas genuinas.' },
        { title: 'Valoraciones de huéspedes', text: 'Cada hotel de nuestro sitio tiene una puntuación mínima de 8,0 en Booking.com. Admitir mascotas no significa comprometer la calidad.' },
        { title: 'Categorización', text: 'Etiquetamos hoteles por lo que importa: perros, gatos, acceso a la playa, cercanía a parques, lujo y sin cargo por mascota.' },
        { title: 'Actualizaciones regulares', text: 'Las políticas de mascotas cambian. Actualizamos nuestros datos regularmente para reflejar las políticas actuales.' },
      ],
    },
    affiliate: {
      title: 'Declaración de Afiliación',
      text: 'HotelsWithPets.com gana una comisión cuando reservas a través de nuestros enlaces a Booking.com. Esto no te cuesta nada adicional y nos ayuda a mantener y mejorar el sitio.',
    },
    contact: {
      title: 'Contacto y Correcciones',
      text: '¿Encontraste información incorrecta sobre la política de mascotas de un hotel? ¿Conoces un excelente hotel pet-friendly que nos hemos perdido? Nos gustaría saberlo.',
    },
  },
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)
  const c = content[locale] ?? content.en

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-6">🐾</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{c.title}</h1>
          <p className="text-blue-200 text-lg leading-relaxed">{c.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{c.mission.title}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{c.mission.text}</p>
          </section>

          {/* How we select */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{c.how.title}</h2>
            <div className="grid gap-4">
              {c.how.steps.map((step, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-black">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="bg-blue-600 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-black">34</p>
                <p className="text-blue-200 text-sm mt-1">
                  {locale === 'fr' ? 'Destinations' : locale === 'es' ? 'Destinos' : 'Destinations'}
                </p>
              </div>
              <div>
                <p className="text-4xl font-black">100+</p>
                <p className="text-blue-200 text-sm mt-1">
                  {locale === 'fr' ? 'Hôtels vérifiés' : locale === 'es' ? 'Hoteles verificados' : 'Verified hotels'}
                </p>
              </div>
              <div>
                <p className="text-4xl font-black">6</p>
                <p className="text-blue-200 text-sm mt-1">
                  {locale === 'fr' ? 'Catégories animaux' : locale === 'es' ? 'Categorías' : 'Pet categories'}
                </p>
              </div>
            </div>
          </section>

          {/* Affiliate disclosure */}
          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">{c.affiliate.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{c.affiliate.text}</p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{c.contact.title}</h2>
            <p className="text-gray-600 leading-relaxed">{c.contact.text}</p>
          </section>

        </div>
      </div>
    </div>
  )
}
