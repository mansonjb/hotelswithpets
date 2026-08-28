import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
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
    pt: 'Sobre HotelsWithPets.com | Como encontramos hotéis que aceitam animais',
    de: 'Über HotelsWithPets.com | Wie wir tierfreundliche Hotels finden',
    nl: 'Over HotelsWithPets.com | Hoe wij diervriendelijke hotels vinden',
    it: 'Chi siamo | HotelsWithPets.com | Come troviamo hotel che accettano animali',
  }
  const descriptions: Record<string, string> = {
    en: 'HotelsWithPets.com helps pet owners find and book the best pet-friendly hotels in Europe. Learn how we select hotels and verify their pet policies.',
    fr: 'HotelsWithPets.com aide les propriétaires d\'animaux à trouver et réserver les meilleurs hôtels acceptant les animaux en Europe.',
    es: 'HotelsWithPets.com ayuda a los dueños de mascotas a encontrar y reservar los mejores hoteles que admiten mascotas en Europa.',
    pt: 'A HotelsWithPets.com ajuda os donos de animais a encontrar e reservar os melhores hotéis que aceitam animais na Europa. Saiba como selecionamos os hotéis e verificamos as suas políticas.',
    de: 'HotelsWithPets.com hilft Tierbesitzern, die besten tierfreundlichen Hotels in Europa zu finden und zu buchen. Erfahre, wie wir Hotels auswählen und ihre Tierrichtlinien prüfen.',
    nl: 'HotelsWithPets.com helpt huisdiereigenaren de beste diervriendelijke hotels in Europa te vinden en te boeken. Ontdek hoe wij hotels selecteren en hun huisdierbeleid controleren.',
    it: 'HotelsWithPets.com aiuta chi ha animali a trovare e prenotare i migliori hotel che accettano animali in Europa. Scopri come selezioniamo gli hotel e verifichiamo le loro politiche sugli animali.',
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
        pt: `${SITE_URL}/pt/about`,
        de: `${SITE_URL}/de/about`,
        nl: `${SITE_URL}/nl/about`,
        it: `${SITE_URL}/it/about`,
        'x-default': `${SITE_URL}/en/about`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `${SITE_URL}/${locale}/about`,
      siteName: 'HotelsWithPets.com',
      type: 'website',
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
    subtitle: 'We help pet owners travel Europe with confidence. Finding hotels that truly welcome animals.',
    mission: {
      title: 'Our Mission',
      text: 'Travelling with a pet shouldn\'t mean spending hours cross-checking hotel policies, calling ahead to confirm fees, or worrying whether your dog will actually be welcome. HotelsWithPets.com curates the best pet-friendly hotels across 43 European destinations so you can spend more time planning the adventure and less time on logistics.',
    },
    how: {
      title: 'How We Select Hotels',
      steps: [
        { title: 'Pet policy verification', text: 'We only list hotels that explicitly accept pets. We check official Booking.com pet policies and filter for genuine welcomes. Not just "small pets considered".' },
        { title: 'Guest ratings', text: 'Every hotel on our site has a minimum Booking.com guest score of 8.0. Pet-friendly doesn\'t mean compromising on quality.' },
        { title: 'Category tagging', text: 'We tag hotels by what matters to pet owners: dog-friendly, cat-friendly, beach access, proximity to parks, luxury, and no-pet-fee properties.' },
        { title: 'Regular updates', text: 'Pet policies change. We refresh our data regularly to ensure the information you see reflects current hotel policies.' },
      ],
    },
    affiliate: {
      title: 'Affiliate Disclosure',
      text: 'HotelsWithPets.com earns a commission when you book through our links to Booking.com. This comes at no extra cost to you and helps us maintain and improve the site. Our editorial choices are never influenced by affiliate relationships. We list hotels based on quality and genuine pet-friendliness.',
    },
    contact: {
      title: 'Contact & Corrections',
      text: 'Found incorrect pet policy information? Know a great pet-friendly hotel we\'ve missed? We want to hear from you. Our goal is to be the most accurate and useful resource for travelling pet owners in Europe.',
    },
  },
  fr: {
    title: 'À propos de HotelsWithPets.com',
    subtitle: 'Nous aidons les propriétaires d\'animaux à voyager en Europe en toute confiance. En trouvant des hôtels qui accueillent vraiment les animaux.',
    mission: {
      title: 'Notre Mission',
      text: 'Voyager avec un animal de compagnie ne devrait pas signifier passer des heures à vérifier les politiques d\'hôtels, appeler pour confirmer les frais ou s\'inquiéter de l\'accueil réservé à votre chien. HotelsWithPets.com sélectionne les meilleurs hôtels acceptant les animaux dans 43 destinations européennes.',
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
    subtitle: 'Ayudamos a los dueños de mascotas a viajar por Europa con confianza. Encontrando hoteles que realmente dan la bienvenida a los animales.',
    mission: {
      title: 'Nuestra Misión',
      text: 'Viajar con una mascota no debería significar pasar horas verificando políticas de hoteles o preocuparse por si tu perro será realmente bienvenido. HotelsWithPets.com selecciona los mejores hoteles que admiten mascotas en 43 destinos europeos.',
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
  pt: {
    title: 'Sobre a HotelsWithPets.com',
    subtitle: 'Ajudamos os donos de animais a viajar pela Europa com confiança, encontrando hotéis que acolhem mesmo os animais.',
    mission: {
      title: 'A nossa missão',
      text: 'Viajar com um animal não devia significar passar horas a comparar políticas de hotéis, telefonar para confirmar taxas ou preocupar-se se o teu cão será mesmo bem-vindo. A HotelsWithPets.com seleciona os melhores hotéis que aceitam animais em 43 destinos europeus, para que passes mais tempo a planear a aventura e menos tempo com a logística.',
    },
    how: {
      title: 'Como selecionamos os hotéis',
      steps: [
        { title: 'Verificação da política de animais', text: 'Só listamos hotéis que aceitam explicitamente animais. Verificamos as políticas oficiais da Booking.com e filtramos por acolhimentos genuínos. Não apenas "pequenos animais mediante pedido".' },
        { title: 'Avaliações dos hóspedes', text: 'Cada hotel no nosso site tem uma pontuação mínima de 8,0 na Booking.com. Aceitar animais não significa abdicar da qualidade.' },
        { title: 'Categorização', text: 'Marcamos os hotéis por aquilo que importa aos donos de animais: cães, gatos, acesso à praia, proximidade de parques, luxo e propriedades sem taxa para animais.' },
        { title: 'Atualizações regulares', text: 'As políticas de animais mudam. Atualizamos os nossos dados com regularidade para que a informação reflita as políticas atuais dos hotéis.' },
      ],
    },
    affiliate: {
      title: 'Divulgação de afiliação',
      text: 'A HotelsWithPets.com recebe uma comissão quando reservas através dos nossos links para a Booking.com. Isto não tem custo adicional para ti e ajuda-nos a manter e melhorar o site. As nossas escolhas editoriais nunca são influenciadas por relações de afiliação. Listamos hotéis com base na qualidade e no acolhimento genuíno de animais.',
    },
    contact: {
      title: 'Contacto e correções',
      text: 'Encontraste informação incorreta sobre a política de animais de um hotel? Conheces um excelente hotel que aceita animais e que nos escapou? Queremos ouvir-te. O nosso objetivo é ser o recurso mais rigoroso e útil para os donos de animais que viajam pela Europa.',
    },
  },
  de: {
    title: 'Über HotelsWithPets.com',
    subtitle: 'Wir helfen Tierbesitzern, mit Zuversicht durch Europa zu reisen. Indem wir Hotels finden, die Tiere wirklich willkommen heißen.',
    mission: {
      title: 'Unsere Mission',
      text: 'Mit einem Haustier zu reisen sollte nicht bedeuten, stundenlang Hotelrichtlinien zu vergleichen, wegen der Gebühren anzurufen oder sich zu sorgen, ob dein Hund wirklich willkommen ist. HotelsWithPets.com wählt die besten tierfreundlichen Hotels in 43 europäischen Reisezielen aus, damit du mehr Zeit für die Reiseplanung und weniger Zeit für die Logistik aufwenden musst.',
    },
    how: {
      title: 'Wie wir Hotels auswählen',
      steps: [
        { title: 'Prüfung der Tierrichtlinien', text: 'Wir listen nur Hotels, die Tiere ausdrücklich akzeptieren. Wir prüfen die offiziellen Tierrichtlinien von Booking.com und filtern nach echtem Willkommen. Nicht nur "kleine Tiere auf Anfrage".' },
        { title: 'Gästebewertungen', text: 'Jedes Hotel auf unserer Seite hat eine Mindestbewertung von 8,0 auf Booking.com. Tierfreundlich bedeutet keine Abstriche bei der Qualität.' },
        { title: 'Kategorisierung', text: 'Wir kennzeichnen Hotels nach dem, was Tierbesitzern wichtig ist: hundefreundlich, katzenfreundlich, Strandzugang, Nähe zu Parks, Luxus und Unterkünfte ohne Tiergebühr.' },
        { title: 'Regelmäßige Aktualisierungen', text: 'Tierrichtlinien ändern sich. Wir aktualisieren unsere Daten regelmäßig, damit die angezeigten Informationen die aktuellen Hotelrichtlinien widerspiegeln.' },
      ],
    },
    affiliate: {
      title: 'Affiliate-Hinweis',
      text: 'HotelsWithPets.com erhält eine Provision, wenn du über unsere Links auf Booking.com buchst. Für dich entstehen dabei keine zusätzlichen Kosten und du hilfst uns, die Seite zu pflegen und zu verbessern. Unsere redaktionellen Entscheidungen werden nie von Affiliate-Beziehungen beeinflusst. Wir listen Hotels nach Qualität und echter Tierfreundlichkeit.',
    },
    contact: {
      title: 'Kontakt und Korrekturen',
      text: 'Falsche Angaben zu einer Tierrichtlinie gefunden? Kennst du ein tolles tierfreundliches Hotel, das wir übersehen haben? Wir freuen uns, von dir zu hören. Unser Ziel ist es, die genaueste und nützlichste Ressource für reisende Tierbesitzer in Europa zu sein.',
    },
  },
  nl: {
    title: 'Over HotelsWithPets.com',
    subtitle: 'Wij helpen huisdiereigenaren om met vertrouwen door Europa te reizen. Door hotels te vinden die dieren echt welkom heten.',
    mission: {
      title: 'Onze missie',
      text: 'Reizen met een huisdier zou niet moeten betekenen dat je urenlang hotelbeleid vergelijkt, moet bellen om kosten te bevestigen of je zorgen maakt of je hond echt welkom is. HotelsWithPets.com selecteert de beste diervriendelijke hotels in 43 Europese bestemmingen, zodat je meer tijd hebt om het avontuur te plannen en minder tijd kwijt bent aan logistiek.',
    },
    how: {
      title: 'Hoe wij hotels selecteren',
      steps: [
        { title: 'Controle van het huisdierbeleid', text: 'Wij vermelden alleen hotels die dieren uitdrukkelijk accepteren. Wij controleren het officiële huisdierbeleid van Booking.com en filteren op een oprecht welkom. Niet alleen "kleine dieren op aanvraag".' },
        { title: 'Beoordelingen van gasten', text: 'Elk hotel op onze site heeft een minimale gastenscore van 8,0 op Booking.com. Diervriendelijk betekent geen concessies aan kwaliteit.' },
        { title: 'Categorisering', text: 'Wij labelen hotels op wat belangrijk is voor huisdiereigenaren: hondvriendelijk, katvriendelijk, strandtoegang, nabijheid van parken, luxe en accommodaties zonder huisdierkosten.' },
        { title: 'Regelmatige updates', text: 'Huisdierbeleid verandert. Wij verversen onze gegevens regelmatig, zodat de informatie die je ziet het huidige hotelbeleid weergeeft.' },
      ],
    },
    affiliate: {
      title: 'Affiliate-verklaring',
      text: 'HotelsWithPets.com ontvangt een commissie wanneer je boekt via onze links naar Booking.com. Dit kost jou niets extra en helpt ons de site te onderhouden en te verbeteren. Onze redactionele keuzes worden nooit beïnvloed door affiliate-relaties. Wij vermelden hotels op basis van kwaliteit en oprechte diervriendelijkheid.',
    },
    contact: {
      title: 'Contact en correcties',
      text: 'Onjuiste informatie over een huisdierbeleid gevonden? Ken je een geweldig diervriendelijk hotel dat wij hebben gemist? Wij horen graag van je. Ons doel is de meest accurate en nuttige bron te zijn voor reizende huisdiereigenaren in Europa.',
    },
  },
  it: {
    title: 'Chi siamo | HotelsWithPets.com',
    subtitle: 'Aiutiamo chi ha animali a viaggiare in Europa con serenità. Trovando hotel che accolgono davvero gli animali.',
    mission: {
      title: 'La nostra missione',
      text: 'Viaggiare con un animale non dovrebbe voler dire passare ore a confrontare le politiche degli hotel, telefonare per confermare i costi o preoccuparti se il tuo cane sarà davvero il benvenuto. HotelsWithPets.com seleziona i migliori hotel che accettano animali in 43 destinazioni europee, così puoi dedicare più tempo a pianificare l\'avventura e meno alla logistica.',
    },
    how: {
      title: 'Come selezioniamo gli hotel',
      steps: [
        { title: 'Verifica delle politiche sugli animali', text: 'Elenchiamo solo hotel che accettano esplicitamente gli animali. Controlliamo le politiche ufficiali di Booking.com e filtriamo per un benvenuto autentico. Non solo "piccoli animali su richiesta".' },
        { title: 'Valutazioni degli ospiti', text: 'Ogni hotel sul nostro sito ha un punteggio ospiti minimo di 8,0 su Booking.com. Accettare animali non significa rinunciare alla qualità.' },
        { title: 'Categorizzazione', text: 'Etichettiamo gli hotel in base a ciò che conta per chi ha animali: cani, gatti, accesso alla spiaggia, vicinanza ai parchi, lusso e strutture senza costi per gli animali.' },
        { title: 'Aggiornamenti regolari', text: 'Le politiche sugli animali cambiano. Aggiorniamo i nostri dati regolarmente affinché le informazioni che vedi riflettano le politiche attuali degli hotel.' },
      ],
    },
    affiliate: {
      title: 'Informativa sull\'affiliazione',
      text: 'HotelsWithPets.com riceve una commissione quando prenoti tramite i nostri link a Booking.com. Questo non comporta alcun costo aggiuntivo per te e ci aiuta a mantenere e migliorare il sito. Le nostre scelte editoriali non sono mai influenzate dai rapporti di affiliazione. Elenchiamo gli hotel in base alla qualità e a un\'autentica accoglienza degli animali.',
    },
    contact: {
      title: 'Contatti e correzioni',
      text: 'Hai trovato informazioni errate su una politica per gli animali? Conosci un ottimo hotel che accetta animali che ci è sfuggito? Vogliamo sentire la tua opinione. Il nostro obiettivo è essere la risorsa più accurata e utile per chi viaggia con animali in Europa.',
    },
  },
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = content[locale] ?? content.en

  // E-E-A-T signals: structured Organization + AboutPage schema for Google.
  // Helps the Search Console understand who runs the site and where the
  // editorial decisions come from, important for a young domain.
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: c.title,
    description: c.subtitle,
    url: `${SITE_URL}/${locale}/about`,
    inLanguage: locale,
    mainEntity: {
      '@type': 'Organization',
      name: 'HotelsWithPets',
      alternateName: 'HotelsWithPets.com',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` },
      description: 'A trip-planning platform for travellers with pets. We curate verified pet-friendly hotels and city guides across 66 European destinations.',
      foundingDate: '2026',
      areaServed: { '@type': 'Continent', name: 'Europe' },
      knowsLanguage: ['en', 'fr', 'es', 'pt', 'de'],
      knowsAbout: [
        'Pet-friendly hotels',
        'Travelling with dogs',
        'Travelling with cats',
        'European travel',
        'Pet policies',
        'Pet transport regulations',
      ],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
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
                <p className="text-4xl font-black">43</p>
                <p className="text-blue-200 text-sm mt-1">
                  {locale === 'fr' ? 'Destinations' : locale === 'es' ? 'Destinos' : locale === 'de' ? 'Reiseziele' : locale === 'nl' ? 'Bestemmingen' : locale === 'it' ? 'Destinazioni' : 'Destinations'}
                </p>
              </div>
              <div>
                <p className="text-4xl font-black">340+</p>
                <p className="text-blue-200 text-sm mt-1">
                  {locale === 'fr' ? 'Hôtels vérifiés' : locale === 'es' ? 'Hoteles verificados' : locale === 'de' ? 'Geprüfte Hotels' : locale === 'nl' ? 'Geverifieerde hotels' : locale === 'it' ? 'Hotel verificati' : 'Verified hotels'}
                </p>
              </div>
              <div>
                <p className="text-4xl font-black">6</p>
                <p className="text-blue-200 text-sm mt-1">
                  {locale === 'fr' ? 'Catégories animaux' : locale === 'es' ? 'Categorías' : locale === 'de' ? 'Tierkategorien' : locale === 'nl' ? 'Diercategorieën' : locale === 'it' ? 'Categorie di animali' : 'Pet categories'}
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
