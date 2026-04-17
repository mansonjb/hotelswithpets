import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl mb-6 block">🐾</span>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md">
        We couldn't find that page. The hotel may have moved or this URL is incorrect.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/en"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Go home
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
