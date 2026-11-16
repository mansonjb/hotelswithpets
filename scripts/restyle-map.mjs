#!/usr/bin/env node
// Remappe les classes Tailwind par defaut vers les tokens "On part ensemble" (redesign).
// Usage: node scripts/restyle-map.mjs <fichier>...   (visuel uniquement, ne touche que les classes)
import fs from 'node:fs'

const TOK = {
  'text-gray-900': 'text-ink', 'text-gray-800': 'text-ink', 'text-stone-900': 'text-ink', 'text-stone-700': 'text-ink', 'text-slate-900': 'text-ink',
  'text-gray-700': 'text-slate', 'text-gray-600': 'text-slate', 'text-gray-500': 'text-slate',
  'text-blue-500': 'text-electric', 'text-blue-600': 'text-electric', 'text-blue-700': 'text-electric', 'text-blue-800': 'text-electric',
  'text-indigo-600': 'text-electric', 'text-sky-700': 'text-electric',
  'text-blue-200': 'text-lavender', 'text-blue-300': 'text-lavender', 'text-blue-400': 'text-lavender', 'text-sky-200': 'text-lavender', 'text-sky-50': 'text-white', 'text-stone-300': 'text-lavender', 'text-indigo-400': 'text-electric',
  'text-amber-500': 'text-ink', 'text-amber-600': 'text-ink', 'text-amber-700': 'text-ink', 'text-amber-800': 'text-ink', 'text-amber-900': 'text-ink',
  'text-emerald-500': 'text-ink', 'text-emerald-600': 'text-ink', 'text-emerald-700': 'text-ink', 'text-green-600': 'text-ink', 'text-green-700': 'text-ink', 'text-orange-900': 'text-ink', 'text-orange-500': 'text-ink',
  'bg-gray-50': 'bg-cream', 'bg-gray-100': 'bg-lavender-soft', 'bg-blue-50': 'bg-lavender-soft', 'bg-blue-100': 'bg-lavender', 'bg-indigo-50': 'bg-lavender-soft',
  'bg-emerald-50': 'bg-lavender-soft', 'bg-green-50': 'bg-lavender-soft', 'bg-amber-50': 'bg-lime/30', 'bg-amber-100': 'bg-lime', 'bg-amber-200': 'bg-lime',
  'bg-amber-400': 'bg-lime', 'bg-amber-600': 'bg-coral',
  'bg-blue-600': 'bg-electric', 'bg-blue-700': 'bg-electric', 'bg-indigo-600': 'bg-electric', 'bg-purple-600': 'bg-electric',
  'bg-teal-500': 'bg-electric', 'bg-sky-500': 'bg-electric', 'bg-cyan-500': 'bg-electric', 'bg-green-500': 'bg-electric',
  'hover:bg-blue-700': 'hover:bg-ink', 'hover:bg-blue-600': 'hover:bg-ink', 'hover:bg-blue-50': 'hover:bg-lavender-soft', 'hover:bg-amber-200': 'hover:bg-lime', 'hover:bg-sky-50': 'hover:bg-lime', 'hover:bg-stone-100': 'hover:bg-lime',
  'hover:text-amber-900': 'hover:text-ink', 'hover:text-blue-800': 'hover:text-ink', 'hover:text-blue-700': 'hover:text-ink',
  'border-gray-100': 'border-line', 'border-gray-200': 'border-line', 'border-blue-100': 'border-line', 'border-blue-200': 'border-line', 'border-blue-300': 'border-line',
  'border-amber-100': 'border-line', 'border-amber-200': 'border-line', 'border-green-200': 'border-line', 'border-emerald-100': 'border-line',
  'shadow-md': 'shadow-hard-sm', 'shadow-lg': 'shadow-hard', 'shadow-xl': 'shadow-hard', 'shadow-blue-200': '',
  'rounded-2xl': 'rounded-[22px]', 'rounded-3xl': 'rounded-[28px]',
  'group-hover:text-blue-700': 'group-hover:text-electric', 'group-hover:text-blue-600': 'group-hover:text-electric', 'text-emerald-800': 'text-ink', 'bg-emerald-500': 'bg-electric', 'bg-emerald-600': 'bg-electric',
  'hover:shadow-xl': 'hover:shadow-hard', 'hover:shadow-md': '', 'hover:shadow-lg': 'hover:shadow-hard', 'hover:shadow-blue-200': '', 'hover:shadow-sm': '',
  'text-gray-400': 'text-slate', 'text-gray-300': 'text-white/70', 'border-emerald-200': 'border-line', 'border-gray-300': 'border-line',
  'font-black': 'font-bold', 'font-extrabold': 'font-bold',
}

function mapClassString(s) {
  let out = s
  const isCard = /rounded-(2xl|3xl)/.test(s)
  const hasBorder = /(^|\s)border(\s|$)|border-(gray|blue|amber)-/.test(s)
  const grad = /bg-gradient-to-(br|r|b|tr)\b/.test(s) && !/from-(black|transparent)/.test(s) && !/via-(black|transparent)/.test(s)
  if (grad) {
    const dark = /from-(stone|slate)-/.test(s)
    const white = /text-white/.test(s)
    out = out.replace(/(^|\s)(bg-gradient-to-(br|r|b|tr)|from-[^\s]+|via-[^\s]+|to-[^\s]+)(?=\s|$)/g, '$1')
    out = out.trim().replace(/\s{2,}/g, ' ') + ' ' + (dark ? 'bg-night' : white ? 'bg-electric' : 'bg-lavender-soft')
  }
  for (const [k, v] of Object.entries(TOK)) {
    const re = new RegExp('(^|[\\s"`\'])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=[\\s"`\']|$)', 'g')
    out = out.replace(re, (m, p) => (v ? p + v : p))
  }
  if (isCard && hasBorder) {
    out = out.replace(/(^|\s)border(?=\s|$)/g, '$1border-[1.6px]').replace(/(^|\s)border-line(?=\s|$)/g, '$1border-ink')
    if (!/shadow-hard/.test(out)) out = out.replace(/(^|\s)shadow-sm(?=\s|$)/g, '$1shadow-hard')
  }
  out = out.replace(/(^|\s)shadow-sm(?=\s|$)/g, '$1').replace(/ {2,}/g, ' ').replace(/ (?=["'`]$)/, '')
  return out
}

for (const f of process.argv.slice(2)) {
  const src = fs.readFileSync(f, 'utf8')
  // Chaines litterales qui ressemblent a des listes de classes Tailwind.
  const out = src.replace(/(["'`])((?:(?!\1)[^\n\\$]|\\.)*?)\1/g, (m, q, body) => {
    if (!/\b(bg|text|border|rounded|shadow|font|from|to|via)-/.test(body)) return m
    if (/^(\/|https?:|@|\.)/.test(body)) return m
    return q + mapClassString(body) + q
  })
  // Segments de template literals avec ${...}: remap des blocs de classes entre accolades.
  const out2 = out.replace(/`([^`\n]*\$\{[^`\n]*)`/g, (m, body) =>
    '`' + body.replace(/(^|\})([^${}]*)(?=\$\{|$)/g, (mm, a, b) => a + (/\b(bg|text|border|rounded|shadow|font)-/.test(b) ? mapClassString(b) : b)) + '`')
  if (out2 !== src) fs.writeFileSync(f, out2)
  console.log((out2 !== src ? 'changed ' : 'same    ') + f)
}
