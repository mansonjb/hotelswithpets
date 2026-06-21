const CDN = process.env.NEXT_PUBLIC_IMAGE_CDN || ''

/**
 * Absolute CDN URL for a local /images/... path (Supabase public bucket).
 * External URLs and already-absolute URLs pass through. Use this for raw image
 * URL strings that do NOT go through next/image (JSON-LD, og:image, etc.).
 */
export function imageUrl(src: string): string {
  if (!src) return src
  if (/^https?:\/\//.test(src)) return src
  if (CDN && src.startsWith('/images/')) return CDN + src.slice('/images'.length)
  return src
}
