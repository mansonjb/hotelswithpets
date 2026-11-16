import type { Locale } from '@/app/[locale]/dictionaries'
import { SITE_URL } from '@/lib/site'

/**
 * The pet-insurance ranking page uses a localized URL slug per language. This
 * map is the single source of truth, shared by every locale page (for its
 * hreflang alternates) and by the Header language switcher (so changing the
 * language on one of these pages lands on the same page in the new language
 * instead of a 404).
 */
export const INSURANCE_SLUGS: Record<Locale, string> = {
  en: 'pet-insurance',
  fr: 'assurance-animaux',
  es: 'seguro-mascotas',
  pt: 'seguro-animais',
  de: 'tierkrankenversicherung',
  nl: 'dierenverzekering',
  it: 'assicurazione-animali',
}

const SLUG_SET = new Set<string>(Object.values(INSURANCE_SLUGS))

/** Relative href to the insurance ranking page in the given locale. */
export function insuranceHref(locale: Locale): string {
  return `/${locale}/${INSURANCE_SLUGS[locale] ?? INSURANCE_SLUGS.en}`
}

/** Localized short label for linking to the insurance page (nav, footer, cross-links). */
export const INSURANCE_LABEL: Record<Locale, string> = {
  en: 'Pet insurance',
  fr: 'Assurance animaux',
  es: 'Seguro para mascotas',
  pt: 'Seguro para animais',
  de: 'Tierkrankenversicherung',
  nl: 'Dierenverzekering',
  it: 'Assicurazione animali',
}

/** True if a path segment is one of the localized insurance-page slugs. */
export function isInsuranceSlug(slug: string): boolean {
  return SLUG_SET.has(slug)
}

/** hreflang `languages` map (every locale + x-default) for the insurance page. */
export function insuranceLanguages(): Record<string, string> {
  const langs: Record<string, string> = { 'x-default': `${SITE_URL}/en/${INSURANCE_SLUGS.en}` }
  for (const loc of Object.keys(INSURANCE_SLUGS) as Locale[]) {
    langs[loc] = `${SITE_URL}/${loc}/${INSURANCE_SLUGS[loc]}`
  }
  return langs
}
