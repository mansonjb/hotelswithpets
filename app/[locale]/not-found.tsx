import Link from 'next/link'

export default function LocaleNotFound() {
  // Can't access params in not-found.tsx, default to EN links
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl mb-6 block">🐾</span>
      <h1 className="text-4xl font-bold text-ink mb-3">Page introuvable</h1>
      <p className="text-slate text-lg mb-8 max-w-md">
        Cette page n&apos;existe pas ou l&apos;hôtel a déménagé.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/en"
          className="bg-electric hover:bg-ink text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          🏠 Home
        </Link>
        <Link
          href="/en/destinations"
          className="bg-white border border-line hover:bg-cream text-slate font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Browse destinations
        </Link>
      </div>
    </div>
  )
}
