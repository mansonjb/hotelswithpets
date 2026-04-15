// Root page — proxy.ts redirects / → /en automatically
// This file exists only as a fallback and should never be reached in production
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en')
}
