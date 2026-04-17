'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-7xl mb-6 block">🐾</span>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Something went wrong</h2>
      <p className="text-gray-500 text-lg mb-8 max-w-md">
        An unexpected error occurred. Try refreshing the page or return home.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
