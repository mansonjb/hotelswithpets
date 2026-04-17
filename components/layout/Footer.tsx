import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'

interface FooterProps {
  locale: Locale
  dict: {
    footer: {
      explore: string
      destinations: string
      categories: string
      company: string
      about: string
      disclosure: string
      privacy?: string
      disclosureText: string
      copyright: string
    }
  }
}

export default function Footer({ locale, dict }: FooterProps) {
  const { footer } = dict
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <span>🐾</span>
              <span>HotelsWithPets</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {footer.disclosureText}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footer.explore}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/destinations`} className="hover:text-white transition-colors">{footer.destinations}</Link></li>
              <li><Link href={`/${locale}/categories`} className="hover:text-white transition-colors">{footer.categories}</Link></li>
              <li><Link href={`/${locale}/countries`} className="hover:text-white transition-colors">{locale === 'fr' ? 'Par pays' : locale === 'es' ? 'Por país' : 'By country'}</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {locale === 'fr' ? 'Populaires' : locale === 'es' ? 'Populares' : 'Popular'}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Amsterdam', slug: 'amsterdam' },
                { name: 'Paris', slug: 'paris' },
                { name: 'Barcelona', slug: 'barcelona' },
                { name: 'Berlin', slug: 'berlin' },
                { name: 'Lisbon', slug: 'lisbon' },
                { name: 'Rome', slug: 'rome' },
              ].map((city) => (
                <li key={city.slug}>
                  <Link href={`/${locale}/destinations/${city.slug}`} className="hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footer.company}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{footer.about}</Link></li>
              <li><Link href={`/${locale}/affiliate-disclosure`} className="hover:text-white transition-colors">{footer.disclosure}</Link></li>
              <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{footer.privacy ?? 'Privacy Policy'}</Link></li>
            </ul>
          </div>
        </div>

        {/* Country links */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
            {locale === 'fr' ? 'Par pays' : locale === 'es' ? 'Por país' : 'By country'}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {[
              { name: 'France', slug: 'france', flag: '🇫🇷' },
              { name: 'Spain', slug: 'spain', flag: '🇪🇸' },
              { name: 'Italy', slug: 'italy', flag: '🇮🇹' },
              { name: 'Germany', slug: 'germany', flag: '🇩🇪' },
              { name: 'Portugal', slug: 'portugal', flag: '🇵🇹' },
              { name: 'Belgium', slug: 'belgium', flag: '🇧🇪' },
              { name: 'Netherlands', slug: 'netherlands', flag: '🇳🇱' },
              { name: 'Austria', slug: 'austria', flag: '🇦🇹' },
              { name: 'Switzerland', slug: 'switzerland', flag: '🇨🇭' },
              { name: 'Denmark', slug: 'denmark', flag: '🇩🇰' },
              { name: 'Sweden', slug: 'sweden', flag: '🇸🇪' },
              { name: 'Norway', slug: 'norway', flag: '🇳🇴' },
              { name: 'Finland', slug: 'finland', flag: '🇫🇮' },
              { name: 'Poland', slug: 'poland', flag: '🇵🇱' },
              { name: 'Greece', slug: 'greece', flag: '🇬🇷' },
              { name: 'Croatia', slug: 'croatia', flag: '🇭🇷' },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/countries/${c.slug}`}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular guides */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
            {locale === 'fr' ? 'Guides populaires' : locale === 'es' ? 'Guías populares' : 'Popular guides'}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {[
              { en: 'Dog-friendly hotels Amsterdam', fr: 'Hôtels chiens Amsterdam', es: 'Hoteles perros Ámsterdam', href: 'amsterdam/dog-friendly' },
              { en: 'Luxury hotels Paris', fr: 'Hôtels luxe Paris', es: 'Hoteles lujo París', href: 'paris/luxury' },
              { en: 'Pet-friendly hotels Barcelona', fr: 'Hôtels animaux Barcelone', es: 'Hoteles mascotas Barcelona', href: 'barcelona/dog-friendly' },
              { en: 'Beach hotels Biarritz', fr: 'Hôtels plage Biarritz', es: 'Hoteles playa Biarritz', href: 'biarritz/beach-access' },
              { en: 'Dog-friendly hotels Berlin', fr: 'Hôtels chiens Berlin', es: 'Hoteles perros Berlín', href: 'berlin/dog-friendly' },
              { en: 'Dog-friendly hotels Rome', fr: 'Hôtels chiens Rome', es: 'Hoteles perros Roma', href: 'rome/dog-friendly' },
              { en: 'No pet fee hotels Amsterdam', fr: 'Hôtels sans frais animaux', es: 'Hoteles sin cargo mascota', href: 'amsterdam/dogs-stay-free' },
              { en: 'Beach hotels Malaga', fr: 'Hôtels plage Malaga', es: 'Hoteles playa Málaga', href: 'malaga/beach-access' },
              { en: 'Luxury hotels Milan', fr: 'Hôtels luxe Milan', es: 'Hoteles lujo Milán', href: 'milan/luxury' },
              { en: 'Dog-friendly hotels Oslo', fr: 'Hôtels chiens Oslo', es: 'Hoteles perros Oslo', href: 'oslo/dog-friendly' },
              { en: 'Beach hotels Split', fr: 'Hôtels plage Split', es: 'Hoteles playa Split', href: 'split/beach-access' },
              { en: 'Luxury hotels Brussels', fr: 'Hôtels luxe Bruxelles', es: 'Hoteles lujo Bruselas', href: 'brussels/luxury' },
            ].map((g) => (
              <Link
                key={g.href}
                href={`/${locale}/${g.href}`}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {locale === 'fr' ? g.fr : locale === 'es' ? g.es : g.en}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-sm text-gray-500">
          {footer.copyright}
        </div>
      </div>
    </footer>
  )
}
