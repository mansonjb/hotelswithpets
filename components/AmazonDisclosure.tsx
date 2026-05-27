import Link from 'next/link'

/**
 * Short inline pointer to the global affiliate disclosure page.
 * Full text lives at /fr/mentions-affiliees per Amazon Operating Agreement
 * EU section 5 (clear and accessible from every page with affiliate links).
 */
export default function AmazonDisclosure() {
  return (
    <p className="text-xs text-stone-500 leading-relaxed">
      Liens sponsorisés Amazon. En savoir plus :{' '}
      <Link href="/fr/mentions-affiliees" className="text-stone-700 underline hover:text-amber-700">
        mentions affiliées
      </Link>
      .
    </p>
  )
}
