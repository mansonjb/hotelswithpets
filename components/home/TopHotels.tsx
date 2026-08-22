import hotels from '@/data/hotels.json'
import destinations from '@/data/destinations.json'
import Image from 'next/image'
import type { Locale } from '@/app/[locale]/dictionaries'
import { buildAllezLink } from '@/lib/site'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'

interface TopHotelsProps {
  locale: Locale
}

export default function TopHotels({ locale }: TopHotelsProps) {
  // Hand-picked showcase of iconic five-star pet-friendly stays, each verified
  // for a genuinely beautiful hero image (a Marrakech palace, a Capri cliff
  // villa, a Budapest grand hotel...). Curated by id rather than sorted by
  // rating, because a raw rating sort surfaces tiny guesthouses with placeholder
  // prices and weak photos. Real hotels.json data is pulled by id below.
  const CURATED_IDS = ['marrakech-1', 'capri-2', 'budapest-3', 'porto-3', 'kazbegi-1', 'venice-3']
  const byId = new Map(hotels.map((h) => [h.id, h]))
  const topHotels = CURATED_IDS.map((id) => byId.get(id)).filter((h): h is (typeof hotels)[number] => Boolean(h))

  const headings: Record<string, string> = {
    en: 'The world\'s most beautiful pet-friendly hotels',
    fr: 'Les plus beaux hôtels du monde qui acceptent les animaux',
    es: 'Los hoteles más bonitos del mundo que admiten mascotas',
    pt: 'Os hotéis mais bonitos do mundo que aceitam animais',
    de: 'Die schönsten haustierfreundlichen Hotels der Welt',
    nl: 'De mooiste huisdiervriendelijke hotels ter wereld',
    it: 'I più bei hotel pet-friendly del mondo',
  }
  const subheadings: Record<string, string> = {
    en: 'A handpicked selection of five-star stays, from a Marrakech palace to a Capri cliffside villa, where your dog is welcome too.',
    fr: 'Une sélection de cinq-étoiles triés sur le volet, d\'un palace de Marrakech à une villa perchée sur les falaises de Capri, où votre chien est lui aussi le bienvenu.',
    es: 'Una selección de cinco estrellas elegidos con esmero, de un palacio en Marrakech a una villa sobre los acantilados de Capri, donde tu perro también es bienvenido.',
    pt: 'Uma seleção de cinco estrelas escolhidos a dedo, de um palácio em Marraquexe a uma villa sobre as falésias de Capri, onde o seu cão também é bem-vindo.',
    de: 'Eine handverlesene Auswahl an Fünf-Sterne-Aufenthalten, von einem Palast in Marrakesch bis zu einer Villa an den Klippen von Capri, wo auch Ihr Hund willkommen ist.',
    nl: 'Een zorgvuldig samengestelde selectie vijfsterrenverblijven, van een paleis in Marrakech tot een villa op de kliffen van Capri, waar ook jouw hond welkom is.',
    it: 'Una selezione di cinque stelle scelti con cura, da un palazzo a Marrakech a una villa sulle scogliere di Capri, dove anche il tuo cane è benvenuto.',
  }
  const bookLabel: Record<string, string> = {
    en: 'Book',
    fr: 'Réserver',
    es: 'Reservar',
    pt: 'Reservar',
    de: 'Buchen',
    nl: 'Boeken',
    it: 'Prenota',
  }
  const editorChoice: Record<string, string> = {
    en: "⭐ Editor's Choice",
    fr: '⭐ Coup de cœur de la rédaction',
    es: '⭐ Selección de la redacción',
    pt: '⭐ Escolha da redação',
    de: '⭐ Redaktionsempfehlung',
    nl: '⭐ Favoriet van de redactie',
    it: '⭐ Scelta della redazione',
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            {editorChoice[locale] ?? editorChoice.en}
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            {headings[locale] ?? headings.en}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {subheadings[locale] ?? subheadings.en}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topHotels.map((hotel, i) => {
            const dest = destinations.find(d => d.slug === hotel.destinationSlug)
            const ctaHref = dest
              ? buildAllezLink(hotel.name, dest.name, dest.country)
              : hotel.bookingUrl
            const isFree = hotel.petFee === 0
            const perNight = locale === 'fr' ? '/nuit' : locale === 'es' ? '/noche' : locale === 'pt' ? '/noite' : locale === 'de' ? '/Nacht' : locale === 'nl' ? '/nacht' : locale === 'it' ? '/notte' : '/night'
            const fromLabel = locale === 'fr' ? 'Dès' : locale === 'es' ? 'Desde' : locale === 'pt' ? 'Desde' : locale === 'de' ? 'Ab' : locale === 'nl' ? 'Vanaf' : locale === 'it' ? 'Da' : 'From'
            return (
              <article key={hotel.id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                {/* Image */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <Image
                    src={`/images/hotels/${hotel.id}.jpg`}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Rank badge, top left */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-sm">
                    <span className="text-amber-500 font-black text-xs">#{i + 1}</span>
                    <span className="text-blue-600 font-black text-sm leading-none">{hotel.rating}</span>
                  </div>
                  {/* Pet fee badge, top right */}
                  <div className="absolute top-3 right-3">
                    {isFree ? (
                      <span className="flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-sm">
                        🐾 {locale === 'fr' ? 'Gratuit' : locale === 'es' ? 'Gratis' : locale === 'pt' ? 'Grátis' : locale === 'de' ? 'Kostenlos' : locale === 'nl' ? 'Gratis' : locale === 'it' ? 'Gratis' : 'Free'}
                      </span>
                    ) : (
                      <span className="bg-amber-400 text-gray-900 text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-sm">
                        €{hotel.petFee}
                      </span>
                    )}
                  </div>
                  {/* Stars, bottom left */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-amber-400 text-sm tracking-tight drop-shadow-sm">
                      {'★'.repeat(hotel.stars)}{'☆'.repeat(Math.max(0, 5 - hotel.stars))}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-1 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {hotel.name}
                  </h3>
                  {dest && (
                    <p className="text-xs text-gray-400 mb-4">{dest.flag} {getLocalizedCityName(dest.slug, dest.name, locale)}, {getLocalizedCountryName(dest.country, locale)}</p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{fromLabel}</p>
                      <p className="text-xl font-black text-gray-900 leading-tight">
                        €{hotel.priceFrom}<span className="text-xs font-normal text-gray-400 ml-1">{perNight}</span>
                      </p>
                    </div>
                    <a
                      href={ctaHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs tracking-wide transition-all duration-150 shadow-sm hover:shadow-blue-200 hover:shadow-md whitespace-nowrap"
                    >
                      {bookLabel[locale] ?? bookLabel.en} →
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
