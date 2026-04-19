import Link from 'next/link'
import { GuideFooter } from '../_components/GuideFooter'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

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
    en: 'Do I Need a Pet Passport to Travel in Europe? Country-by-Country Guide | HotelsWithPets.com',
    fr: 'Ai-je besoin d\'un passeport animal pour voyager en Europe ? Guide par pays | HotelsWithPets.com',
    es: '¿Necesito un pasaporte de mascota para viajar en Europa? Guía por país | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'Complete guide to EU pet passport requirements when travelling in Europe with a dog or cat. Country-by-country rules: UK, Finland, Ireland, Norway, Iceland, Switzerland and all EU members.',
    fr: 'Guide complet sur le passeport européen pour animaux de compagnie. Règles pays par pays : Royaume-Uni, Finlande, Irlande, Norvège, Islande, Suisse et tous les pays de l\'UE.',
    es: 'Guía completa sobre el pasaporte europeo para mascotas al viajar por Europa. Normas país a país: Reino Unido, Finlandia, Irlanda, Noruega, Islandia, Suiza y todos los miembros de la UE.',
  }

  const today = new Date().toISOString().split('T')[0]

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/passeport-animal`,
      languages: {
        en: `${SITE_URL}/en/guides/passeport-animal`,
        fr: `${SITE_URL}/fr/guides/passeport-animal`,
        es: `${SITE_URL}/es/guides/passeport-animal`,
        'x-default': `${SITE_URL}/en/guides/passeport-animal`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      publishedTime: '2024-01-01T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

// ─── Country data ──────────────────────────────────────────────────────────

type Requirement = 'standard' | 'extra' | 'strict' | 'non-eu'

interface CountryRule {
  slug: string
  flag: string
  name: Record<string, string>
  requirement: Requirement
  summary: Record<string, string>
  details: Record<string, string[]>
  destinationSlug?: string  // link to our destination page if we cover a city there
  countrySiteSlug?: string  // link to our country page
}

const COUNTRY_RULES: CountryRule[] = [
  // ── Standard EU ──────────────────────────────────────────────────────────
  {
    slug: 'france',
    flag: '🇫🇷',
    name: { fr: 'France', en: 'France', es: 'Francia' },
    requirement: 'standard',
    countrySiteSlug: 'france',
    summary: {
      fr: 'Passeport européen standard. Puce, rage, 21 jours. Les chiens sont très bienvenus.',
      en: 'Standard EU pet passport. Microchip, rabies, 21-day wait. Dogs are very welcome.',
      es: 'Pasaporte UE estándar. Microchip, rabia, 21 días. Los perros son muy bienvenidos.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie obligatoire.',
        'Puce électronique ISO 11784/11785 obligatoire (implantée AVANT la vaccination antirabique).',
        'Vaccination antirabique à jour (primovaccination : attendre 21 jours avant le départ).',
        'Rappels de vaccins standards (CHPPi pour les chiens, typhus/leucose pour les chats) recommandés.',
        'Les chiens de catégorie 1 (type pitbull) sont interdits en France.',
      ],
      en: [
        'EU pet passport required.',
        'ISO 11784/11785 microchip mandatory (implanted BEFORE rabies vaccination).',
        'Valid rabies vaccination (first vaccination: 21-day wait before travel).',
        'Standard booster vaccinations recommended.',
        'Category 1 dogs (pit bull type) are banned in France.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO 11784/11785 obligatorio (implantado ANTES de la vacuna antirrábica).',
        'Vacunación antirrábica válida (primera vacunación: esperar 21 días antes de viajar).',
        'Vacunas de refuerzo estándar recomendadas.',
        'Los perros de categoría 1 (tipo pit bull) están prohibidos en Francia.',
      ],
    },
  },
  {
    slug: 'spain',
    flag: '🇪🇸',
    name: { fr: 'Espagne', en: 'Spain', es: 'España' },
    requirement: 'standard',
    countrySiteSlug: 'spain',
    summary: {
      fr: 'Passeport européen standard. Très accueillant pour les animaux, même sur les plages.',
      en: 'Standard EU pet passport. Very pet-welcoming, including many dog-friendly beaches.',
      es: 'Pasaporte UE estándar. Muy abierto a mascotas, incluso en muchas playas.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO 11784/11785 et vaccination antirabique valide.',
        'Certaines communautés autonomes ont des réglementations locales sur les races.',
        'Traitement antiparasitaire recommandé selon la saison (tiques, leishmaniose dans le Sud).',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Some autonomous communities have local breed restrictions.',
        'Anti-parasite treatment recommended depending on season (ticks, leishmaniasis in the south).',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Algunas comunidades autónomas tienen restricciones locales por raza.',
        'Tratamiento antiparasitario recomendado según temporada (garrapatas, leishmaniosis en el sur).',
      ],
    },
  },
  {
    slug: 'germany',
    flag: '🇩🇪',
    name: { fr: 'Allemagne', en: 'Germany', es: 'Alemania' },
    requirement: 'standard',
    countrySiteSlug: 'germany',
    summary: {
      fr: 'Passeport européen standard. L\'Allemagne est l\'un des pays les plus dog-friendly d\'Europe.',
      en: 'Standard EU pet passport. Germany is arguably Europe\'s most dog-friendly country.',
      es: 'Pasaporte UE estándar. Alemania es quizá el país más dog-friendly de Europa.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Les chiens voyagent dans les transports en commun (avec museau ou ticket enfant selon les villes).',
        'Certains Länder interdisent les races perçues comme dangereuses.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Dogs are allowed on public transport (muzzle or child ticket may be required).',
        'Some Länder have restrictions on certain breeds.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Los perros pueden viajar en transporte público (puede requerirse bozal o billete de niño).',
        'Algunos Länder tienen restricciones sobre ciertas razas.',
      ],
    },
  },
  {
    slug: 'netherlands',
    flag: '🇳🇱',
    name: { fr: 'Pays-Bas', en: 'Netherlands', es: 'Países Bajos' },
    requirement: 'standard',
    destinationSlug: 'amsterdam',
    summary: {
      fr: 'Passeport européen standard. Amsterdam est l\'une des villes les plus pet-friendly d\'Europe.',
      en: 'Standard EU pet passport. Amsterdam is one of Europe\'s most pet-friendly cities.',
      es: 'Pasaporte UE estándar. Ámsterdam es una de las ciudades más pet-friendly de Europa.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Pas d\'exigences spéciales au-delà du passeport EU standard.',
        'Les chiens sont très acceptés dans les cafés, restaurants et sur les vélos.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'No additional requirements beyond the standard EU passport.',
        'Dogs are widely accepted in cafés, restaurants, and even on bicycles.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Sin requisitos adicionales más allá del pasaporte UE estándar.',
        'Los perros son muy bienvenidos en cafés, restaurantes e incluso en bicicletas.',
      ],
    },
  },
  {
    slug: 'belgium',
    flag: '🇧🇪',
    name: { fr: 'Belgique', en: 'Belgium', es: 'Bélgica' },
    requirement: 'standard',
    countrySiteSlug: 'belgium',
    summary: {
      fr: 'Passeport européen standard. Bruges, Gand et Anvers sont très dog-friendly.',
      en: 'Standard EU pet passport. Bruges, Ghent and Antwerp are very dog-friendly.',
      es: 'Pasaporte UE estándar. Brujas, Gante y Amberes son muy dog-friendly.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Accès généreux des chiens dans les cafés et restaurants.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Dogs are generously welcomed in cafés and restaurants.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Los perros son bienvenidos en cafés y restaurantes.',
      ],
    },
  },
  {
    slug: 'portugal',
    flag: '🇵🇹',
    name: { fr: 'Portugal', en: 'Portugal', es: 'Portugal' },
    requirement: 'standard',
    countrySiteSlug: 'portugal',
    destinationSlug: 'lisbon',
    summary: {
      fr: 'Passeport européen standard. Idéal toute l\'année, avec plages dog-friendly.',
      en: 'Standard EU pet passport. Ideal year-round with dog-friendly beaches.',
      es: 'Pasaporte UE estándar. Ideal todo el año, con playas aptas para perros.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Traitement antiparasitaire fortement recommandé (tiques, leishmaniose).',
        'De nombreuses plages dog-friendly, surtout en dehors des mois estivaux.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Anti-parasite treatment strongly recommended (ticks, leishmaniasis).',
        'Many dog-friendly beaches, especially outside peak summer months.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Tratamiento antiparasitario muy recomendado (garrapatas, leishmaniosis).',
        'Muchas playas aptas para perros, especialmente fuera de los meses de verano.',
      ],
    },
  },
  {
    slug: 'italy',
    flag: '🇮🇹',
    name: { fr: 'Italie', en: 'Italy', es: 'Italia' },
    requirement: 'standard',
    countrySiteSlug: 'italy',
    summary: {
      fr: 'Passeport européen standard. Les chiens accompagnent partout : piazzas, restaurants, monuments.',
      en: 'Standard EU pet passport. Dogs go everywhere: piazzas, restaurants, monuments.',
      es: 'Pasaporte UE estándar. Los perros van a todas partes: plazas, restaurantes, monumentos.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Dans les villes italiennes, les chiens peuvent entrer dans beaucoup de magasins et cafés.',
        'Les plages payantes sont souvent réservées aux humains ; chercher les « spiagge per cani ».',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'In Italian cities, dogs can enter many shops and cafés.',
        'Paid beaches often exclude pets; look for designated "spiagge per cani".',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'En las ciudades italianas, los perros pueden entrar en muchas tiendas y cafés.',
        'Las playas de pago suelen excluir mascotas; busca "spiagge per cani" designadas.',
      ],
    },
  },
  {
    slug: 'austria',
    flag: '🇦🇹',
    name: { fr: 'Autriche', en: 'Austria', es: 'Austria' },
    requirement: 'standard',
    countrySiteSlug: 'austria',
    destinationSlug: 'vienna',
    summary: {
      fr: 'Passeport européen standard. Vienne est très accueillante pour les animaux.',
      en: 'Standard EU pet passport. Vienna is very welcoming to pets.',
      es: 'Pasaporte UE estándar. Viena es muy acogedora para las mascotas.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Les chiens sont bienvenus dans les transports en commun viennois avec un billet demi-tarif.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Dogs are welcome on Vienna public transport with a half-price ticket.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Los perros son bienvenidos en el transporte público de Viena con billete a mitad de precio.',
      ],
    },
  },
  {
    slug: 'czechia',
    flag: '🇨🇿',
    name: { fr: 'République tchèque', en: 'Czech Republic', es: 'República Checa' },
    requirement: 'standard',
    countrySiteSlug: 'czech-republic',
    destinationSlug: 'prague',
    summary: {
      fr: 'Passeport européen standard. Prague accueille bien les chiens.',
      en: 'Standard EU pet passport. Prague is quite dog-friendly.',
      es: 'Pasaporte UE estándar. Praga es bastante acogedora para los perros.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Les chiens sont permis dans le métro de Prague avec muselière.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Dogs are permitted on Prague metro with a muzzle.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Los perros pueden usar el metro de Praga con bozal.',
      ],
    },
  },
  {
    slug: 'hungary',
    flag: '🇭🇺',
    name: { fr: 'Hongrie', en: 'Hungary', es: 'Hungría' },
    requirement: 'standard',
    countrySiteSlug: 'hungary',
    destinationSlug: 'budapest',
    summary: {
      fr: 'Passeport européen standard.',
      en: 'Standard EU pet passport.',
      es: 'Pasaporte UE estándar.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
      ],
    },
  },
  {
    slug: 'croatia',
    flag: '🇭🇷',
    name: { fr: 'Croatie', en: 'Croatia', es: 'Croacia' },
    requirement: 'standard',
    countrySiteSlug: 'croatia',
    destinationSlug: 'dubrovnik',
    summary: {
      fr: 'Passeport européen standard. Les plages dog-friendly sont nombreuses hors saison.',
      en: 'Standard EU pet passport. Many dog-friendly beaches outside the peak season.',
      es: 'Pasaporte UE estándar. Muchas playas aptas para perros fuera de temporada.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Beaucoup de plages n\'acceptent pas les animaux en été ; chercher les plages spécifiques pour chiens.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Many beaches ban pets in summer; look for designated dog beaches.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Muchas playas prohíben mascotas en verano; busca playas designadas para perros.',
      ],
    },
  },
  {
    slug: 'greece',
    flag: '🇬🇷',
    name: { fr: 'Grèce', en: 'Greece', es: 'Grecia' },
    requirement: 'standard',
    countrySiteSlug: 'greece',
    destinationSlug: 'athens',
    summary: {
      fr: 'Passeport européen standard. Traitement antiparasitaire recommandé en été.',
      en: 'Standard EU pet passport. Anti-parasite treatment recommended in summer.',
      es: 'Pasaporte UE estándar. Tratamiento antiparasitario recomendado en verano.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Traitement antiparasitaire (tiques) fortement recommandé dans les zones forestières et rurales.',
        'Leishmaniose présente dans plusieurs régions du pays.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Anti-tick treatment strongly recommended in forested and rural areas.',
        'Leishmaniasis is present in several regions.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Tratamiento antigarrapatas muy recomendado en zonas forestales y rurales.',
        'La leishmaniosis está presente en varias regiones.',
      ],
    },
  },
  // ── Extra requirements ───────────────────────────────────────────────────
  {
    slug: 'finland',
    flag: '🇫🇮',
    name: { fr: 'Finlande', en: 'Finland', es: 'Finlandia' },
    requirement: 'extra',
    countrySiteSlug: 'finland',
    destinationSlug: 'helsinki',
    summary: {
      fr: 'UE, mais exigences supplémentaires : traitement obligatoire contre l\'échinocoque 1 à 5 jours avant l\'entrée.',
      en: 'EU member, but extra rules: mandatory Echinococcus treatment 1–5 days before entry.',
      es: 'Miembro de la UE, pero con requisitos adicionales: tratamiento obligatorio contra Echinococcus 1-5 días antes de la entrada.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie requis.',
        'Puce ISO et vaccination antirabique valide.',
        '⚠️ OBLIGATOIRE : traitement contre Echinococcus multilocularis (ver tapeworm) par un vétérinaire accrédité, administré entre 1 et 5 jours avant l\'entrée sur le territoire finlandais.',
        'Le traitement doit être enregistré dans le passeport européen par un vétérinaire.',
        'Sans ce traitement, l\'accès peut être refusé à la frontière.',
        'Certains ports d\'entrée (notamment depuis l\'Estonie et la Suède) font des contrôles renforcés.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        '⚠️ MANDATORY: Echinococcus multilocularis (tapeworm) treatment by an accredited vet, administered 1–5 days before entering Finland.',
        'The treatment must be recorded in the EU passport by the vet.',
        'Without this treatment, entry may be refused at the border.',
        'Some entry ports (especially from Estonia and Sweden) carry out enhanced checks.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        '⚠️ OBLIGATORIO: tratamiento contra Echinococcus multilocularis (tenia) por un veterinario acreditado, administrado entre 1 y 5 días antes de entrar en Finlandia.',
        'El tratamiento debe ser registrado en el pasaporte europeo por el veterinario.',
        'Sin este tratamiento, se puede denegar la entrada en la frontera.',
      ],
    },
  },
  {
    slug: 'ireland',
    flag: '🇮🇪',
    name: { fr: 'Irlande', en: 'Ireland', es: 'Irlanda' },
    requirement: 'extra',
    countrySiteSlug: 'ireland',
    destinationSlug: 'dublin',
    summary: {
      fr: 'UE, mais exigences supplémentaires : traitement tapeworm (chiens) 24 à 120h avant l\'arrivée, entrée par point approuvé uniquement.',
      en: 'EU member, but extra rules: tapeworm treatment (dogs) 24–120h before arrival, approved entry points only.',
      es: 'Miembro de la UE, pero con requisitos adicionales: tratamiento contra tenias (perros) 24-120h antes de la llegada, solo por puntos de entrada aprobados.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie requis.',
        'Puce ISO et vaccination antirabique valide.',
        '⚠️ OBLIGATOIRE pour les chiens : traitement contre Echinococcus (tapeworm) administré entre 24 et 120 heures avant l\'arrivée en Irlande.',
        'Traitement prescrit et enregistré par un vétérinaire agréé.',
        'L\'entrée n\'est autorisée que par les ports et aéroports approuvés (Dublin, Rosslare...).',
        'L\'Irlande n\'est pas dans l\'espace Schengen : les contrôles aux frontières sont effectifs.',
        'Les chats ne sont pas soumis au traitement tapeworm.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        '⚠️ MANDATORY for dogs: Echinococcus (tapeworm) treatment administered 24–120 hours before arrival in Ireland.',
        'Treatment must be prescribed and recorded by an authorised vet.',
        'Entry is only permitted via approved ports and airports (Dublin, Rosslare...).',
        'Ireland is not in the Schengen zone: border checks are actively carried out.',
        'Cats are not subject to the tapeworm treatment requirement.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        '⚠️ OBLIGATORIO para perros: tratamiento contra Echinococcus (tenia) administrado entre 24 y 120 horas antes de la llegada a Irlanda.',
        'El tratamiento debe ser prescrito y registrado por un veterinario autorizado.',
        'La entrada solo está permitida a través de puertos y aeropuertos aprobados (Dublín, Rosslare...).',
        'Irlanda no está en el espacio Schengen: se realizan controles fronterizos activos.',
        'Los gatos no están sujetos al requisito de tratamiento contra tenias.',
      ],
    },
  },
  // ── Non-EU, strict ───────────────────────────────────────────────────────
  {
    slug: 'uk',
    flag: '🇬🇧',
    name: { fr: 'Royaume-Uni', en: 'United Kingdom', es: 'Reino Unido' },
    requirement: 'strict',
    countrySiteSlug: 'united-kingdom',
    destinationSlug: 'edinburgh',
    summary: {
      fr: 'Hors UE (Brexit). Le passeport européen n\'est plus valide. Un Certificat Sanitaire Animal (AHC) est désormais obligatoire.',
      en: 'Non-EU (Brexit). EU pet passport no longer valid. An Animal Health Certificate (AHC) is now required.',
      es: 'Fuera de la UE (Brexit). El pasaporte europeo ya no es válido. Ahora se requiere un Certificado Sanitario Animal (AHC).',
    },
    details: {
      fr: [
        '⚠️ Le Royaume-Uni n\'accepte PLUS le passeport européen pour animaux de compagnie depuis le Brexit (31 décembre 2020).',
        'Puce ISO 11784/11785 obligatoire.',
        'Vaccination antirabique valide (avec délai de 21 jours après la primovaccination).',
        'Certificat sanitaire animal (AHC - Animal Health Certificate) délivré par un vétérinaire officiel dans les 10 jours précédant le voyage. Ce document remplace le passeport UE.',
        'Pour les chiens uniquement : traitement contre les vers tapeworm (Echinococcus), administré par un vétérinaire accrédité dans les 1 à 5 jours précédant l\'arrivée.',
        'L\'entrée doit se faire par un point d\'entrée approuvé (Dover, St Pancras, Eurostar, etc.).',
        'Voyager avec un transporteur approuvé (Eurostar, P&O, DFDS...).',
        'Les chats et furets ne sont pas soumis au traitement tapeworm mais ont besoin de l\'AHC.',
        'Délai de préparation : compter au minimum 3 semaines (si vaccination déjà à jour) ou plusieurs mois si primovaccination.',
      ],
      en: [
        '⚠️ The UK no longer accepts the EU pet passport post-Brexit (31 December 2020).',
        'ISO 11784/11785 microchip mandatory.',
        'Valid rabies vaccination (21-day wait after first vaccination).',
        'Animal Health Certificate (AHC) issued by an official vet within 10 days before travel. This replaces the EU passport.',
        'For dogs only: Echinococcus tapeworm treatment by an accredited vet within 1–5 days before arrival.',
        'Entry must be via an approved route (Dover, St Pancras, Eurostar, etc.).',
        'Travel with an approved carrier (Eurostar, P&O, DFDS...).',
        'Cats and ferrets do not need tapeworm treatment but do need an AHC.',
        'Preparation time: allow at least 3 weeks (if vaccination is up to date) or several months if starting from scratch.',
      ],
      es: [
        '⚠️ El Reino Unido ya NO acepta el pasaporte europeo para mascotas tras el Brexit (31 de diciembre de 2020).',
        'Microchip ISO 11784/11785 obligatorio.',
        'Vacunación antirrábica válida (espera de 21 días tras la primera vacunación).',
        'Certificado Sanitario Animal (AHC) emitido por un veterinario oficial en los 10 días anteriores al viaje. Este documento reemplaza al pasaporte UE.',
        'Solo para perros: tratamiento contra Echinococcus (tenia) por un veterinario acreditado entre 1 y 5 días antes de la llegada.',
        'La entrada debe realizarse por un punto de entrada aprobado (Dover, St Pancras, Eurostar, etc.).',
        'Viaja con un transportista aprobado (Eurostar, P&O, DFDS...).',
        'Los gatos y los hurones no necesitan tratamiento contra tenias pero sí necesitan el AHC.',
        'Tiempo de preparación: al menos 3 semanas (si la vacunación está al día) o varios meses si hay que empezar de cero.',
      ],
    },
  },
  {
    slug: 'norway',
    flag: '🇳🇴',
    name: { fr: 'Norvège', en: 'Norway', es: 'Noruega' },
    requirement: 'extra',
    countrySiteSlug: 'norway',
    destinationSlug: 'oslo',
    summary: {
      fr: 'Hors UE (EEE). Accepte les documents équivalents UE. Traitement tapeworm obligatoire avant l\'entrée.',
      en: 'Non-EU (EEA). Accepts EU-equivalent documents. Tapeworm treatment mandatory before entry.',
      es: 'Fuera de la UE (EEE). Acepta documentos equivalentes a la UE. Tratamiento contra tenias obligatorio antes de la entrada.',
    },
    details: {
      fr: [
        'Puce ISO 11784/11785 obligatoire.',
        'Vaccination antirabique valide.',
        'Passeport UE ou document de voyage équivalent accepté.',
        '⚠️ OBLIGATOIRE : traitement contre Echinococcus (tapeworm) 1 à 5 jours avant l\'entrée, enregistré par un vétérinaire.',
        'Pas de quarantaine si toutes les conditions sont remplies.',
      ],
      en: [
        'ISO 11784/11785 microchip mandatory.',
        'Valid rabies vaccination.',
        'EU passport or equivalent travel document accepted.',
        '⚠️ MANDATORY: Echinococcus (tapeworm) treatment 1–5 days before entry, recorded by a vet.',
        'No quarantine if all requirements are met.',
      ],
      es: [
        'Microchip ISO 11784/11785 obligatorio.',
        'Vacunación antirrábica válida.',
        'Se acepta pasaporte UE o documento de viaje equivalente.',
        '⚠️ OBLIGATORIO: tratamiento contra Echinococcus (tenia) 1-5 días antes de la entrada, registrado por un veterinario.',
        'Sin cuarentena si se cumplen todos los requisitos.',
      ],
    },
  },
  {
    slug: 'switzerland',
    flag: '🇨🇭',
    name: { fr: 'Suisse', en: 'Switzerland', es: 'Suiza' },
    requirement: 'non-eu',
    countrySiteSlug: 'switzerland',
    destinationSlug: 'zurich',
    summary: {
      fr: 'Hors UE mais accepte le passeport européen pour animaux. Procédure identique au standard UE.',
      en: 'Non-EU but accepts the EU pet passport. Same procedure as the standard EU process.',
      es: 'Fuera de la UE pero acepta el pasaporte europeo para mascotas. Mismo procedimiento que el estándar UE.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie ou document équivalent accepté.',
        'Puce ISO et vaccination antirabique valide.',
        'Pas de quarantaine, pas de traitement supplémentaire requis pour les voyageurs UE.',
        'Les règles de bien-être animal sont très strictes en Suisse.',
      ],
      en: [
        'EU pet passport or equivalent document accepted.',
        'ISO chip and valid rabies vaccination.',
        'No quarantine, no additional treatment required for EU travellers.',
        'Animal welfare rules are very strict in Switzerland.',
      ],
      es: [
        'Se acepta pasaporte europeo para mascotas o documento equivalente.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Sin cuarentena, sin tratamiento adicional requerido para viajeros de la UE.',
        'Las normas de bienestar animal son muy estrictas en Suiza.',
      ],
    },
  },
  {
    slug: 'iceland',
    flag: '🇮🇸',
    name: { fr: 'Islande', en: 'Iceland', es: 'Islandia' },
    requirement: 'strict',
    countrySiteSlug: 'iceland',
    destinationSlug: 'reykjavik',
    summary: {
      fr: 'Hors UE. Conditions très strictes : test de titration antirabique + permis d\'importation + quarantaine potentielle.',
      en: 'Non-EU. Very strict conditions: rabies titer test + import permit + potential quarantine.',
      es: 'Fuera de la UE. Condiciones muy estrictas: test de titulación antirrábica + permiso de importación + posible cuarentena.',
    },
    details: {
      fr: [
        '⚠️ L\'Islande a l\'une des réglementations les plus strictes d\'Europe pour les animaux de compagnie.',
        'Puce ISO obligatoire.',
        'Vaccination antirabique valide.',
        'Test de titration sérologique antirabique (test FAVN ou ELISA) avec résultat positif, effectué au moins 3 mois avant l\'entrée.',
        'Permis d\'importation préalable requis (délivré par l\'MAST - Icelandic Food and Veterinary Authority).',
        'Traitement antiparasitaire (tapeworm + puces + tiques) dans les 5 jours avant l\'arrivée.',
        'Examen vétérinaire obligatoire à l\'arrivée.',
        'Une quarantaine peut être imposée si les conditions ne sont pas parfaitement remplies.',
        'Délai de préparation : prévoir 6 mois à 1 an à l\'avance.',
      ],
      en: [
        '⚠️ Iceland has one of the strictest pet import regulations in Europe.',
        'ISO microchip mandatory.',
        'Valid rabies vaccination.',
        'Rabies antibody titer test (FAVN or ELISA) with a positive result, carried out at least 3 months before entry.',
        'Prior import permit required (issued by MAST - the Icelandic Food and Veterinary Authority).',
        'Anti-parasite treatment (tapeworm + fleas + ticks) within 5 days before arrival.',
        'Mandatory vet examination on arrival.',
        'Quarantine may be imposed if requirements are not perfectly met.',
        'Preparation time: allow 6 months to 1 year in advance.',
      ],
      es: [
        '⚠️ Islandia tiene uno de los reglamentos de importación de mascotas más estrictos de Europa.',
        'Microchip ISO obligatorio.',
        'Vacunación antirrábica válida.',
        'Test de titulación de anticuerpos antirrábicos (FAVN o ELISA) con resultado positivo, realizado al menos 3 meses antes de la entrada.',
        'Permiso de importación previo necesario (emitido por MAST - Autoridad de Alimentos y Veterinaria de Islandia).',
        'Tratamiento antiparasitario (tenia + pulgas + garrapatas) en los 5 días anteriores a la llegada.',
        'Examen veterinario obligatorio a la llegada.',
        'Se puede imponer cuarentena si los requisitos no se cumplen perfectamente.',
        'Tiempo de preparación: prevé entre 6 meses y 1 año de antelación.',
      ],
    },
  },
  {
    slug: 'sweden',
    flag: '🇸🇪',
    name: { fr: 'Suède', en: 'Sweden', es: 'Suecia' },
    requirement: 'standard',
    countrySiteSlug: 'sweden',
    destinationSlug: 'stockholm',
    summary: {
      fr: 'Passeport européen standard. Très accueillant pour les animaux.',
      en: 'Standard EU pet passport. Very pet-friendly country.',
      es: 'Pasaporte UE estándar. País muy abierto a las mascotas.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'La Suède est membre de l\'UE depuis 1995 et applique le passeport EU standard.',
        'Traitement tapeworm peut être requis selon votre pays de départ.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Sweden is an EU member and applies the standard EU passport rules.',
        'Tapeworm treatment may be required depending on your country of departure.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Suecia es miembro de la UE y aplica las normas estándar del pasaporte UE.',
        'El tratamiento contra tenias puede ser necesario según el país de origen.',
      ],
    },
  },
  {
    slug: 'denmark',
    flag: '🇩🇰',
    name: { fr: 'Danemark', en: 'Denmark', es: 'Dinamarca' },
    requirement: 'standard',
    countrySiteSlug: 'denmark',
    destinationSlug: 'copenhagen',
    summary: {
      fr: 'Passeport européen standard. Copenhague est très dog-friendly.',
      en: 'Standard EU pet passport. Copenhagen is very dog-friendly.',
      es: 'Pasaporte UE estándar. Copenhague es muy dog-friendly.',
    },
    details: {
      fr: [
        'Passeport européen pour animaux de compagnie.',
        'Puce ISO et vaccination antirabique valide.',
        'Les chiens sont très acceptés à Copenhague, dans les cafés et transports.',
      ],
      en: [
        'EU pet passport required.',
        'ISO chip and valid rabies vaccination.',
        'Dogs are widely accepted in Copenhagen, including in cafés and on public transport.',
      ],
      es: [
        'Se requiere pasaporte europeo para mascotas.',
        'Microchip ISO y vacunación antirrábica válida.',
        'Los perros son muy bienvenidos en Copenhague, incluidos cafés y transporte público.',
      ],
    },
  },
]

// ─── Copy ──────────────────────────────────────────────────────────────────

const COPY = {
  fr: {
    hero: 'Passeport animal : tout ce qu\'il faut savoir avant de partir',
    subtitle: 'Puce, vaccin antirabique, document officiel... Voici ce que la réglementation européenne exige pour chaque pays de destination, mis à jour et fact-checké.',
    lastUpdate: 'Mis à jour en',
    sources: 'Sources vérifiées',
    sourcesText: 'Ce guide est basé sur les informations officielles de la Commission européenne (TRACES), de l\'USDA (pour le Royaume-Uni post-Brexit), du MAST islandais, de la Finnish Food Authority et des autorités vétérinaires nationales. Nous recommandons toujours de vérifier directement avec votre vétérinaire et les autorités du pays de destination avant de voyager.',
    whatIs: 'Qu\'est-ce que le passeport européen pour animaux de compagnie ?',
    whatIsText: [
      'Le passeport européen pour animaux de compagnie (ou « pet passport ») est un document officiel délivré par un vétérinaire agréé. Il centralise les informations essentielles sur votre animal : identification par puce électronique, vaccinations (dont la rage) et traitements effectués.',
      'Il est valide dans tous les pays membres de l\'Union européenne, ainsi que dans certains pays tiers qui l\'acceptent (Suisse, pays EEE...). Depuis le Brexit, le Royaume-Uni n\'accepte plus ce document et exige un Certificat Sanitaire Animal (AHC) spécifique.',
      'Attention : la puce électronique doit impérativement être implantée AVANT la vaccination antirabique. Dans le cas contraire, la date de la vaccination ne sera pas reconnue et vous devrez revacciner votre animal.',
    ],
    checklistTitle: 'La checklist de base (valable dans toute l\'UE)',
    checklist: [
      { icon: '🔖', label: 'Puce électronique ISO 11784/11785', note: 'Implantée avant la vaccination rage' },
      { icon: '💉', label: 'Vaccination antirabique valide', note: 'Primovaccination : attendre 21 jours avant de voyager' },
      { icon: '📔', label: 'Passeport européen pour animaux', note: 'Délivré par un vétérinaire agréé' },
      { icon: '💊', label: 'Rappels de vaccins à jour', note: 'CHPPI pour chiens, typhus/leucose pour chats' },
      { icon: '🪱', label: 'Traitement parasitaire selon pays', note: 'Finlande, Irlande, Norvège, UK, Islande = obligatoire' },
    ],
    tableTitle: 'Règles pays par pays',
    levelStandard: 'Standard UE',
    levelExtra: 'Exigences supplémentaires',
    levelStrict: 'Très strict / Hors UE',
    levelNonEu: 'Hors UE',
    seeHotels: 'Voir les hôtels',
    seeCountry: 'Page pays',
    tipTitle: 'Le conseil de l\'expert',
    tipText: 'Planifiez votre voyage avec votre animal au moins 4 semaines à l\'avance si vous êtes dans l\'UE, et 3 à 6 mois à l\'avance pour le Royaume-Uni ou l\'Islande. Votre vétérinaire est votre meilleur allié pour préparer les documents nécessaires.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Mon passeport européen est-il valide pour toujours ?',
        a: 'Le passeport lui-même n\'a pas de date d\'expiration, mais les vaccinations qu\'il contient (notamment la rage) doivent être à jour. Un passeport avec un vaccin antirabique expiré n\'est plus valide pour voyager.',
      },
      {
        q: 'Mon chien est né en France. A-t-il automatiquement un passeport animal ?',
        a: 'Non. Le passeport européen doit être délivré par un vétérinaire agréé après implantation de la puce et vaccination antirabique. C\'est une démarche volontaire.',
      },
      {
        q: 'Est-ce qu\'un chat a besoin d\'un passeport pour voyager en Europe ?',
        a: 'Oui, les mêmes règles s\'appliquent aux chats (et aux furets) qu\'aux chiens. Puce ISO, vaccination antirabique et passeport européen sont requis.',
      },
      {
        q: 'Que se passe-t-il si j\'oublie mon passeport animal ?',
        a: 'Votre animal peut se voir refuser l\'entrée dans le pays de destination ou être mis en quarantaine. Ne prenez aucun risque et emportez toujours les documents originaux, jamais de photocopies.',
      },
      {
        q: 'Le Royaume-Uni est-il difficile à atteindre avec un animal depuis le Brexit ?',
        a: 'Oui, la procédure est plus complexe qu\'avant. Il faut un Certificat Sanitaire Animal (AHC) délivré dans les 10 jours avant le départ, plus un traitement tapeworm pour les chiens. Prévoyez du temps et consultez un vétérinaire officiel.',
      },
    ],
    relatedTitle: 'Destinations pet-friendly en Europe',
    relatedText: 'Trouvez les meilleurs hôtels acceptant les animaux dans ces destinations',
  },
  en: {
    hero: 'Pet passport: everything you need to know before you go',
    subtitle: 'Microchip, rabies vaccination, official document... Here is what European regulations require for each destination country — fact-checked and kept up to date.',
    lastUpdate: 'Updated in',
    sources: 'Verified sources',
    sourcesText: 'This guide is based on official information from the European Commission (TRACES), the USDA (for post-Brexit UK), Iceland\'s MAST, the Finnish Food Authority, and national veterinary authorities. We always recommend checking directly with your vet and the destination country\'s authorities before travelling.',
    whatIs: 'What is the EU pet passport?',
    whatIsText: [
      'The EU pet passport is an official document issued by an authorised vet. It centralises essential information about your pet: microchip identification, vaccinations (including rabies) and treatments carried out.',
      'It is valid in all EU member states, as well as certain third countries that accept it (Switzerland, EEA countries...). Since Brexit, the UK no longer accepts this document and requires a specific Animal Health Certificate (AHC).',
      'Important: the microchip must be implanted BEFORE the rabies vaccination. If not, the vaccination date will not be recognised and you will need to revaccinate your pet.',
    ],
    checklistTitle: 'The basic checklist (valid throughout the EU)',
    checklist: [
      { icon: '🔖', label: 'ISO 11784/11785 microchip', note: 'Implanted before the rabies vaccination' },
      { icon: '💉', label: 'Valid rabies vaccination', note: 'First vaccination: 21-day wait before travel' },
      { icon: '📔', label: 'EU pet passport', note: 'Issued by an authorised vet' },
      { icon: '💊', label: 'Up-to-date booster vaccinations', note: 'DHPPi for dogs, typhus/leukaemia for cats' },
      { icon: '🪱', label: 'Parasite treatment depending on country', note: 'Finland, Ireland, Norway, UK, Iceland = mandatory' },
    ],
    tableTitle: 'Country-by-country rules',
    levelStandard: 'EU standard',
    levelExtra: 'Extra requirements',
    levelStrict: 'Very strict / Non-EU',
    levelNonEu: 'Non-EU',
    tipTitle: 'Expert tip',
    tipText: 'Plan your trip with your pet at least 4 weeks in advance for EU destinations, and 3–6 months in advance for the UK or Iceland. Your vet is your best ally for preparing the necessary documents.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Is my EU pet passport valid forever?',
        a: 'The passport itself has no expiry date, but the vaccinations it contains (including rabies) must be up to date. A passport with an expired rabies vaccination is no longer valid for travel.',
      },
      {
        q: 'My dog was born in France. Does he automatically have a pet passport?',
        a: 'No. The EU pet passport must be issued by an authorised vet after microchipping and rabies vaccination. It is not automatic.',
      },
      {
        q: 'Does a cat need a passport to travel in Europe?',
        a: 'Yes, the same rules apply to cats (and ferrets) as to dogs. ISO microchip, rabies vaccination and EU passport are required.',
      },
      {
        q: 'What happens if I forget my pet passport?',
        a: 'Your pet may be refused entry to the destination country or placed in quarantine. Never take the risk — always carry original documents, never photocopies.',
      },
      {
        q: 'Is the UK difficult to reach with a pet post-Brexit?',
        a: 'Yes, the process is more complex than before. You need an Animal Health Certificate (AHC) issued within 10 days before departure, plus a tapeworm treatment for dogs. Allow plenty of time and consult an official vet.',
      },
    ],
    seeHotels: 'See hotels',
    seeCountry: 'Country page',
    relatedTitle: 'Pet-friendly destinations in Europe',
    relatedText: 'Find the best pet-friendly hotels in these destinations',
  },
  es: {
    hero: 'Pasaporte para mascotas: todo lo que necesitas saber antes de salir',
    subtitle: 'Microchip, vacuna antirrábica, documento oficial... Lo que exige la normativa europea para cada país de destino, actualizado y verificado.',
    lastUpdate: 'Actualizado en',
    sources: 'Fuentes verificadas',
    sourcesText: 'Esta guía está basada en información oficial de la Comisión Europea (TRACES), el USDA (para el Reino Unido post-Brexit), el MAST de Islandia, la Autoridad Alimentaria Finlandesa y las autoridades veterinarias nacionales. Siempre recomendamos verificar directamente con tu veterinario y las autoridades del país de destino antes de viajar.',
    whatIs: '¿Qué es el pasaporte europeo para mascotas?',
    whatIsText: [
      'El pasaporte europeo para mascotas es un documento oficial emitido por un veterinario autorizado. Centraliza la información esencial sobre tu mascota: identificación por microchip, vacunaciones (incluida la rabia) y tratamientos realizados.',
      'Es válido en todos los estados miembros de la UE, así como en ciertos terceros países que lo aceptan (Suiza, países del EEE...). Desde el Brexit, el Reino Unido ya no acepta este documento y exige un Certificado Sanitario Animal (AHC) específico.',
      'Importante: el microchip debe implantarse ANTES de la vacuna antirrábica. Si no es así, la fecha de vacunación no será reconocida y tendrás que vacunar de nuevo a tu mascota.',
    ],
    checklistTitle: 'La lista de verificación básica (válida en toda la UE)',
    checklist: [
      { icon: '🔖', label: 'Microchip ISO 11784/11785', note: 'Implantado antes de la vacuna antirrábica' },
      { icon: '💉', label: 'Vacunación antirrábica válida', note: 'Primera vacunación: esperar 21 días antes de viajar' },
      { icon: '📔', label: 'Pasaporte europeo para mascotas', note: 'Emitido por un veterinario autorizado' },
      { icon: '💊', label: 'Vacunas de refuerzo al día', note: 'DHPPi para perros, tifus/leucemia para gatos' },
      { icon: '🪱', label: 'Tratamiento antiparasitario según país', note: 'Finlandia, Irlanda, Noruega, Reino Unido, Islandia = obligatorio' },
    ],
    tableTitle: 'Normas país por país',
    levelStandard: 'Estándar UE',
    levelExtra: 'Requisitos adicionales',
    levelStrict: 'Muy estricto / Fuera de la UE',
    levelNonEu: 'Fuera de la UE',
    tipTitle: 'Consejo del experto',
    tipText: 'Planifica tu viaje con tu mascota con al menos 4 semanas de antelación para destinos de la UE, y 3-6 meses para el Reino Unido o Islandia. Tu veterinario es tu mejor aliado para preparar los documentos necesarios.',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Mi pasaporte europeo para mascotas es válido para siempre?',
        a: 'El pasaporte en sí no tiene fecha de caducidad, pero las vacunaciones que contiene (incluida la rabia) deben estar al día. Un pasaporte con una vacuna antirrábica caducada ya no es válido para viajar.',
      },
      {
        q: 'Mi perro nació en Francia. ¿Tiene automáticamente un pasaporte para mascotas?',
        a: 'No. El pasaporte europeo para mascotas debe ser emitido por un veterinario autorizado después de la implantación del microchip y la vacunación antirrábica. No es automático.',
      },
      {
        q: '¿Necesita un gato un pasaporte para viajar por Europa?',
        a: 'Sí, las mismas normas se aplican a los gatos (y hurones) que a los perros. Se requiere microchip ISO, vacunación antirrábica y pasaporte europeo.',
      },
      {
        q: '¿Qué pasa si olvido el pasaporte de mi mascota?',
        a: 'Tu mascota puede ser rechazada en el país de destino o puesta en cuarentena. Nunca corras ese riesgo: lleva siempre los documentos originales, nunca fotocopias.',
      },
      {
        q: '¿Es difícil llegar al Reino Unido con una mascota tras el Brexit?',
        a: 'Sí, el proceso es más complejo que antes. Necesitas un Certificado Sanitario Animal (AHC) emitido en los 10 días anteriores a la salida, más un tratamiento contra tenias para los perros. Date mucho tiempo y consulta a un veterinario oficial.',
      },
    ],
    seeHotels: 'Ver hoteles',
    seeCountry: 'Página país',
    relatedTitle: 'Destinos pet-friendly en Europa',
    relatedText: 'Encuentra los mejores hoteles con mascotas en estos destinos',
  },
}

const BADGE_COLORS: Record<Requirement, { bg: string; text: string; border: string; dot: string }> = {
  standard: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  extra: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  strict: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  'non-eu': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-400' },
}

const RELATED_DESTINATIONS = ['amsterdam', 'paris', 'barcelona', 'rome', 'lisbon', 'berlin', 'edinburgh', 'dublin', 'reykjavik', 'helsinki']

export default async function PetPassportGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const lang = locale === 'fr' || locale === 'es' ? locale : 'en'
  const copy = COPY[lang]
  const today = new Date()
  const monthYear = today.toLocaleDateString(locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : 'en-GB', { month: 'long', year: 'numeric' })

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: copy.hero,
    description: copy.subtitle,
    datePublished: '2024-01-01',
    dateModified: today.toISOString().split('T')[0],
    author: {
      '@type': 'Person',
      name: 'HotelsWithPets Editorial',
      url: `${SITE_URL}/${locale}/about`,
      jobTitle: 'Pet Travel Editor',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HotelsWithPets.com',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 192, height: 192 },
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/guides/passeport-animal`,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const standardCountries = COUNTRY_RULES.filter((c) => c.requirement === 'standard')
  const extraCountries = COUNTRY_RULES.filter((c) => c.requirement === 'extra')
  const strictCountries = COUNTRY_RULES.filter((c) => c.requirement === 'strict' || c.requirement === 'non-eu')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gray-50">

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Link href={`/${locale}/countries`} className="text-blue-300 hover:text-white text-sm transition-colors">
                {locale === 'fr' ? '← Pays' : locale === 'es' ? '← Países' : '← Countries'}
              </Link>
              <span className="text-blue-500 text-sm">/</span>
              <span className="text-blue-400 text-sm">{locale === 'fr' ? 'Passeport animal' : locale === 'es' ? 'Pasaporte de mascota' : 'Pet passport'}</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-medium mb-5">
              📋 {locale === 'fr' ? 'Guide pratique' : locale === 'es' ? 'Guía práctica' : 'Practical guide'} · {copy.lastUpdate} {monthYear}
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">{copy.hero}</h1>
            <p className="text-blue-200 text-base leading-relaxed max-w-3xl">{copy.subtitle}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Sources note */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-10 flex items-start gap-3">
            <span className="text-blue-500 text-xl flex-shrink-0">🔍</span>
            <div>
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">{copy.sources}</p>
              <p className="text-sm text-blue-800 leading-relaxed">{copy.sourcesText}</p>
            </div>
          </div>

          {/* What is it */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{copy.whatIs}</h2>
            <div className="space-y-4">
              {copy.whatIsText.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </section>

          {/* Checklist */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{copy.checklistTitle}</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {copy.checklist.map((item, i) => (
                <div key={i} className={`flex items-start gap-4 p-5 ${i < copy.checklist.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>
                  </div>
                  <span className="ml-auto flex-shrink-0 text-emerald-500 text-lg mt-0.5">✓</span>
                </div>
              ))}
            </div>
          </section>

          {/* Expert tip */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-12 flex items-start gap-3">
            <span className="text-amber-500 text-xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm font-bold text-amber-800 mb-1">{copy.tipTitle}</p>
              <p className="text-sm text-amber-800 leading-relaxed">{copy.tipText}</p>
            </div>
          </div>

          {/* Country rules */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">{copy.tableTitle}</h2>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { level: 'standard' as Requirement, label: copy.levelStandard },
                { level: 'extra' as Requirement, label: copy.levelExtra },
                { level: 'strict' as Requirement, label: copy.levelStrict },
              ].map(({ level, label }) => {
                const c = BADGE_COLORS[level]
                return (
                  <span key={level} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    {label}
                  </span>
                )
              })}
            </div>

            {/* Standard EU countries */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{copy.levelStandard}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {standardCountries.map((country) => {
                const colors = BADGE_COLORS[country.requirement]
                return (
                  <div key={country.slug} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl flex-shrink-0">{country.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="font-bold text-gray-900 text-sm">{country.name[lang]}</h4>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                            {copy.levelStandard}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{country.summary[lang]}</p>
                      </div>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {country.details[lang].map((d, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="flex-shrink-0 mt-0.5 text-emerald-500">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 flex-wrap">
                      {(country.countrySiteSlug || country.destinationSlug) && (
                        <Link
                          href={country.countrySiteSlug ? `/${locale}/countries/${country.countrySiteSlug}` : `/${locale}/destinations/${country.destinationSlug}`}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors">
                          {copy.seeHotels} →
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Extra requirements */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{copy.levelExtra}</h3>
            <div className="space-y-4 mb-8">
              {extraCountries.map((country) => {
                const colors = BADGE_COLORS[country.requirement]
                return (
                  <div key={country.slug} className="bg-white rounded-xl border border-amber-100 shadow-sm p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-3xl flex-shrink-0">{country.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="font-bold text-gray-900">{country.name[lang]}</h4>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                            {copy.levelExtra}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{country.summary[lang]}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {country.details[lang].map((d, i) => (
                        <li key={i} className={`text-sm flex items-start gap-2 ${d.startsWith('⚠️') ? 'font-semibold text-amber-800' : 'text-gray-600'}`}>
                          <span className="flex-shrink-0 mt-0.5">{d.startsWith('⚠️') ? '' : '•'}</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 flex-wrap">
                      {(country.countrySiteSlug || country.destinationSlug) && (
                        <Link
                          href={country.countrySiteSlug ? `/${locale}/countries/${country.countrySiteSlug}` : `/${locale}/destinations/${country.destinationSlug}`}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors">
                          {copy.seeHotels} →
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Strict / Non-EU */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{copy.levelStrict}</h3>
            <div className="space-y-4">
              {strictCountries.map((country) => {
                const colors = BADGE_COLORS[country.requirement]
                const levelLabel = country.requirement === 'non-eu' ? copy.levelNonEu : copy.levelStrict
                return (
                  <div key={country.slug} className={`bg-white rounded-xl border shadow-sm p-6 ${country.requirement === 'strict' ? 'border-red-100' : 'border-blue-100'}`}>
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-3xl flex-shrink-0">{country.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="font-bold text-gray-900">{country.name[lang]}</h4>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                            {levelLabel}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{country.summary[lang]}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {country.details[lang].map((d, i) => (
                        <li key={i} className={`text-sm flex items-start gap-2 ${d.startsWith('⚠️') ? 'font-semibold text-red-700' : 'text-gray-600'}`}>
                          <span className="flex-shrink-0 mt-0.5">{d.startsWith('⚠️') ? '' : '•'}</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 flex-wrap">
                      {(country.countrySiteSlug || country.destinationSlug) && (
                        <Link
                          href={country.countrySiteSlug ? `/${locale}/countries/${country.countrySiteSlug}` : `/${locale}/destinations/${country.destinationSlug}`}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors">
                          {copy.seeHotels} →
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">{copy.faqTitle}</h2>
            <div className="space-y-4">
              {copy.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related destinations */}
          <section className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">{copy.relatedTitle}</h2>
            <p className="text-sm text-gray-500 mb-6">{copy.relatedText}</p>
            <div className="flex flex-wrap gap-2">
              {RELATED_DESTINATIONS.map((slug) => {
                const rule = COUNTRY_RULES.find((c) => c.destinationSlug === slug)
                return (
                  <Link
                    key={slug}
                    href={`/${locale}/destinations/${slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full transition-all shadow-sm"
                  >
                    {rule?.flag ?? '🌍'} {slug.charAt(0).toUpperCase() + slug.slice(1)}
                  </Link>
                )
              })}
            </div>
          </section>

          <GuideFooter locale={locale} currentSlug="passeport-animal" />

        </div>
      </div>
    </>
  )
}
