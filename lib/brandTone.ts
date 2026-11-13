/**
 * Redesign: les tuiles colorees pilotees par la donnee (data/categories.json, tableaux locaux) portent
 * des degrades Tailwind ("from-blue-500 to-cyan-500"). On les remplace par un aplat de la palette
 * (texte blanc sur toutes les options), choisi de facon deterministe selon le degrade d'origine.
 */
const TONES = ['bg-electric', 'bg-night', 'bg-ink'] as const

export function toneFromGradient(gradient: string | undefined): string {
  const key = gradient ?? ''
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return TONES[h % TONES.length]
}
