import Link from 'next/link'

export default function LocaleNotFound() {
  // Can't access params in not-found.tsx, default to EN links
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl mb-6 block">🐾</span>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Page introuvable</h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md">
        Cette page n'existe pas ou l'hôtel a déménagé.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/en"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          🏠 Home
        </Link>
        <Link
          href="/en/destinations"
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Browse destinations
        </Link>
      </div>
    </div>
  )
}
