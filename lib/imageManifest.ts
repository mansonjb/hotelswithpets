import manifest from '@/data/image-manifest.json'

const SET = new Set(manifest as string[])

/**
 * True if /images/<rel> was uploaded to the Supabase CDN. Pass the path WITH the
 * leading /images/. Replaces on-disk existsSync checks now that images no longer
 * live in public/ at deploy time.
 */
export function hasImage(relWithImages: string): boolean {
  return SET.has(relWithImages)
}
