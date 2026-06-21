# Migration des images vers Supabase Storage (CDN)

But : sortir `public/images/**` (~373MB, 6800+ fichiers) du déploiement Vercel pour
supprimer définitivement le plafond de taille de déploiement, accélérer les builds et
réduire la facture (Image Optimization + transfer). Les images seront servies depuis
le CDN public de Supabase.

Durée : ~1-2h. Tout est réversible (rollback en bas).

> Convention du projet : pas de tiret cadratin dans les textes. Stay22 figé
> (`AID eijeanbaptistemanson`, `lmaID 69e08b99d5ab79f03e163885`) ne pas toucher.

---

## Vue d'ensemble (ce qu'on va changer)

1. Créer un bucket public `images` dans Supabase.
2. Uploader tout `public/images/**` dedans (script fourni) + générer un manifeste.
3. Brancher un **loader `next/image`** qui réécrit `/images/...` vers l'URL Supabase.
4. Remplacer les 2 gardes `existsSync` (qui lisent le disque) par une lecture du manifeste.
5. Réécrire les rares URLs d'images en dur (JSON-LD, og) via un helper `imageUrl()`.
6. `.gitignore` sur `public/images` pour que l'output Vercel chute.
7. Workflow futur : à chaque nouvelle ville, un `npm run images:sync` pousse les nouvelles images.

On **garde les images pré-compressées** (free tier Supabase = pas de transformation à la
volée). On sert directement les URLs d'objets. C'est suffisant, on compresse déjà.

---

## Étape 0 — Prérequis

```bash
cd "/Users/jean-baptistemanson/Desktop/CLAUDE NEW SESSION/hotelswithpets"
git checkout -b supabase-images        # branche dédiée, on merge à la fin
git status                              # doit être propre
```

---

## Étape 1 — Créer le bucket Supabase

1. https://supabase.com → ton projet (ou "New project", région **EU (Frankfurt)** pour la latence Europe).
2. Menu **Storage** → **New bucket**.
   - Name : `images`
   - **Public bucket : OUI** (coché). Indispensable pour servir sans signature.
   - Create.
3. (Optionnel mais conseillé) Storage → Policies : un bucket public a déjà une policy de
   lecture publique. Ne touche pas aux policies d'écriture (on uploade avec la service key).

Récupère tes clés : **Project Settings → API**
- `Project URL` (ex `https://abcdefgh.supabase.co`)
- `service_role` key (section "Project API keys" → **service_role**, "secret"). NE LA PARTAGE PAS.

---

## Étape 2 — Variables d'environnement

Ajoute dans `.env.local` (NE PAS committer, c'est déjà gitignored) :

```
SUPABASE_URL=https://TON-PROJET.supabase.co
SUPABASE_SERVICE_KEY=eyJ... (service_role, secret)
NEXT_PUBLIC_IMAGE_CDN=https://TON-PROJET.supabase.co/storage/v1/object/public/images
```

`NEXT_PUBLIC_IMAGE_CDN` doit être préfixé `NEXT_PUBLIC_` pour être lisible côté client par
le loader. Sa valeur = URL publique du bucket (note le `/images` final = nom du bucket).

Ajoute aussi ces 3 clés dans Vercel : **Project → Settings → Environment Variables**
(Production + Preview). Sans `NEXT_PUBLIC_IMAGE_CDN` en prod, les images casseraient.

---

## Étape 3 — Dépendance d'upload

```bash
npm i -D @supabase/supabase-js mime-types
```

---

## Étape 4 — Script d'upload + manifeste

Crée `scripts/upload-images-supabase.mjs` avec EXACTEMENT ce contenu :

```js
/**
 * Upload public/images/** to the Supabase Storage bucket "images" and write
 * data/image-manifest.json (the list of every /images/... path that exists in
 * the bucket, used to replace on-disk existsSync checks).
 *
 *   node scripts/upload-images-supabase.mjs            # upload only new/changed
 *   node scripts/upload-images-supabase.mjs --all      # re-upload everything
 *   node scripts/upload-images-supabase.mjs --manifest # rebuild manifest only
 */
import { createClient } from '@supabase/supabase-js'
import { readFile, writeFile, readdir, stat } from 'fs/promises'
import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mime from 'mime-types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BUCKET = 'images'
const IMG_ROOT = path.join(ROOT, 'public', 'images')

function env(k) {
  if (process.env[k]) return process.env[k]
  const txt = existsSync(path.join(ROOT, '.env.local')) ? readFileSync(path.join(ROOT, '.env.local'), 'utf8') : ''
  const m = txt.match(new RegExp(`^${k}=(.+)$`, 'm'))
  if (!m) throw new Error(`Missing ${k} in env or .env.local`)
  return m[1].trim()
}

const ALL = process.argv.includes('--all')
const MANIFEST_ONLY = process.argv.includes('--manifest')
const supabase = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_KEY'), {
  auth: { persistSession: false },
})

// Recursively list every image file under public/images, as bucket keys
async function walk(dir, base = '') {
  const out = []
  for (const name of await readdir(dir)) {
    const fp = path.join(dir, name)
    const rel = base ? `${base}/${name}` : name
    const s = await stat(fp)
    if (s.isDirectory()) out.push(...await walk(fp, rel))
    else if (/\.(jpe?g|png|webp|avif|svg)$/i.test(name)) out.push({ fp, key: rel, size: s.size })
  }
  return out
}

const files = await walk(IMG_ROOT)
console.log(`Found ${files.length} local image files.`)

// Build the manifest first (paths the app will reference as /images/...)
const manifest = files.map((f) => `/images/${f.key}`).sort()
await writeFile(path.join(ROOT, 'data/image-manifest.json'), JSON.stringify(manifest, null, 0) + '\n')
console.log(`Wrote data/image-manifest.json (${manifest.length} entries).`)
if (MANIFEST_ONLY) process.exit(0)

// Which keys already exist in the bucket (skip them unless --all)
let existing = new Set()
if (!ALL) {
  async function listAll(prefix = '') {
    const acc = []
    let page = 0
    for (;;) {
      const { data, error } = await supabase.storage.from(BUCKET).list(prefix, { limit: 1000, offset: page * 1000 })
      if (error) throw error
      if (!data || data.length === 0) break
      for (const item of data) {
        if (item.id === null) acc.push(...await listAll(prefix ? `${prefix}/${item.name}` : item.name))
        else acc.push(prefix ? `${prefix}/${item.name}` : item.name)
      }
      if (data.length < 1000) break
      page++
    }
    return acc
  }
  existing = new Set(await listAll())
  console.log(`Bucket already has ${existing.size} objects.`)
}

let up = 0, skip = 0, fail = 0
for (const f of files) {
  if (!ALL && existing.has(f.key)) { skip++; continue }
  const body = await readFile(f.fp)
  const contentType = mime.lookup(f.fp) || 'image/jpeg'
  const { error } = await supabase.storage.from(BUCKET).upload(f.key, body, {
    contentType, upsert: true, cacheControl: '31536000',
  })
  if (error) { fail++; console.log(`  FAIL ${f.key}: ${error.message}`) }
  else { up++; if (up % 200 === 0) console.log(`  uploaded ${up}...`) }
}
console.log(`\nDone. uploaded=${up} skipped=${skip} failed=${fail}`)
```

Lance-le (premier upload = ~6800 fichiers, quelques minutes) :

```bash
node scripts/upload-images-supabase.mjs --all
```

Vérifie dans Supabase → Storage → bucket `images` que les dossiers `hotels/`,
`destinations/`, `city-places/`, `guides/` sont présents. Teste une URL publique dans le
navigateur, ex :
`https://TON-PROJET.supabase.co/storage/v1/object/public/images/destinations/tenerife.jpg`

---

## Étape 5 — Loader next/image

Crée `lib/image-loader.js` :

```js
// Custom next/image loader: rewrites local /images/... paths to the Supabase CDN.
// External absolute URLs (Unsplash, Amazon, Booking) pass through untouched.
module.exports = function imageLoader({ src }) {
  if (/^https?:\/\//.test(src)) return src
  const CDN = process.env.NEXT_PUBLIC_IMAGE_CDN || ''
  if (src.startsWith('/images/')) return CDN + src.slice('/images'.length) // CDN already ends with /images
  return src
}
```

Note : `NEXT_PUBLIC_IMAGE_CDN` finit déjà par `/images`, et les srcs commencent par
`/images/...`, donc on enlève le préfixe `/images` du src pour éviter le doublon. Résultat :
`https://projet.supabase.co/storage/v1/object/public/images/hotels/tenerife-1.jpg`. ✅

Édite `next.config.ts`, bloc `images` : ajoute `loader` + `loaderFile`, et tu peux retirer
`remotePatterns` (le loader custom court-circuite l'optimiseur Next, donc plus besoin de
whitelister unsplash) :

```ts
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
```

(Important : avec un loader custom, Next ne réoptimise plus les images lui-même, c'est le
CDN qui sert. C'est voulu, c'est ce qui fait chuter le coût Image Optimization.)

---

## Étape 6 — Remplacer les gardes existsSync par le manifeste

Ces 2 composants lisent le disque pour savoir si une photo d'hôtel existe. Après migration
les fichiers ne sont plus dans `public/`, donc `existsSync` renverrait toujours faux et
masquerait toutes les photos. On les bascule sur le manifeste.

Crée `lib/imageManifest.ts` :

```ts
import manifest from '@/data/image-manifest.json'
const SET = new Set(manifest as string[])
/** True if /images/<rel> was uploaded to the CDN. Pass the path WITH leading /images/. */
export function hasImage(relWithImages: string): boolean {
  return SET.has(relWithImages)
}
```

Dans `components/TopHotelsStrip.tsx` :
- Supprime `import { existsSync } from 'fs'` et `import { join } from 'path'` (s'ils ne
  servent plus qu'à ça).
- Ajoute `import { hasImage } from '@/lib/imageManifest'`.
- Remplace :
  ```ts
  const imgAbs = join(process.cwd(), 'public', imgRel)
  const hasPhoto = existsSync(imgAbs)
  ```
  par :
  ```ts
  const hasPhoto = hasImage(imgRel)   // imgRel = `/images/hotels/${hotel.id}.jpg`
  ```

Dans `components/NearbyHotelCard.tsx` : même remplacement (ligne ~103, `const hasPhoto =
existsSync(imgAbs)` → `const hasPhoto = hasImage(imgRel)`), et retire les imports fs/path
devenus inutiles.

> Vérifie que `imgRel` vaut bien `/images/hotels/<id>.jpg` dans ces 2 fichiers (c'est le
> cas aujourd'hui). Le manifeste stocke exactement ces chaînes.

---

## Étape 7 — URLs d'images en dur (hors next/image)

Quelques endroits construisent une URL d'image en string (pas via `<Image>`), surtout le
JSON-LD SEO et les balises og. Le loader ne les couvre pas. Ajoute un helper et applique-le.

Crée `lib/imageUrl.ts` :

```ts
const CDN = process.env.NEXT_PUBLIC_IMAGE_CDN || ''
/** Absolute CDN URL for a local /images/... path. External URLs pass through. */
export function imageUrl(src: string): string {
  if (!src) return src
  if (/^https?:\/\//.test(src)) return src
  if (src.startsWith('/images/')) return CDN + src.slice('/images'.length)
  return src
}
```

Repère les usages string et enveloppe-les. Pour les lister :

```bash
grep -rn "/images/" app components lib | grep -v "image-loader\|imageUrl\|imageManifest"
```

Les cas typiques à traiter (envelopper la valeur avec `imageUrl(...)`) :
- `app/[locale]/destinations/[slug]/[guide]/page.tsx` : le JSON-LD `image: \`${SITE_URL}/images/destinations/${slug}.jpg\``
  → `image: imageUrl(\`/images/destinations/${slug}.jpg\`)` (importe `imageUrl`).
- Idem partout où un `image:`/`og:image`/`url:` pointe vers `/images/...` dans un objet de
  metadata ou un script JSON-LD.
- Les `place.photo` rendus via `<Image src={placePhoto}>` (guide page ~714) passent DÉJÀ
  par le loader (c'est un `<Image>`), donc rien à faire là. Le helper ne sert que pour les
  strings hors `<Image>`.

> Astuce : après avoir tout enveloppé, `grep -rn "src={\`/images\|/images/" app components`
> ne doit plus montrer que des `<Image src=...>` (gérés par le loader) ou des appels
> `imageUrl(...)`.

---

## Étape 8 — Tester en local (AVANT de retirer les images du repo)

```bash
npm run dev
```

- Ouvre une page destination (ex `/en/destinations/tenerife`), une page de ville/guide, la
  home (TopHotelsStrip). Les images doivent charger depuis `*.supabase.co` (vérifie dans
  l'onglet Réseau du navigateur que les requêtes image vont bien vers Supabase).
- Vérifie une carte d'hôtel d'une ville récente (vraies photos) ET une ancienne.
- Vérifie une image externe (Amazon/Unsplash) : doit toujours charger (loader la laisse passer).
- Inspecte le HTML d'une page : le JSON-LD `image` doit être une URL `supabase.co`.

Si une image est cassée :
- 404 supabase → le fichier n'a pas été uploadé (relance l'upload) ou la clé diffère.
- double `/images/images/` dans l'URL → revois le `.slice('/images'.length)` du loader/helper.

---

## Étape 9 — Sortir les images du déploiement

Une fois le local OK :

```bash
echo "public/images/" >> .gitignore
git rm -r --cached public/images        # déréférence du repo SANS supprimer les fichiers locaux
```

`git rm --cached` retire les ~6800 images du suivi Git (elles restent sur ton disque et
dans Supabase). Le prochain build Vercel n'aura plus ces 373MB → output bien plus léger.

Commit :

```bash
git add -A
git commit -m "Serve images from Supabase Storage CDN instead of the Git deploy

Moves public/images (~373MB, 6800+ files) out of the Vercel deployment to clear
the deploy-size ceiling for good. Adds a custom next/image loader that rewrites
/images/... to NEXT_PUBLIC_IMAGE_CDN (Supabase public bucket), a manifest to
replace on-disk existsSync hotel-photo checks, and an imageUrl() helper for the
JSON-LD/og string URLs. Upload script: scripts/upload-images-supabase.mjs.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin supabase-images
```

Ouvre une **Preview deployment** Vercel sur la branche (n'oublie pas d'avoir mis les 3 env
vars en scope Preview). Vérifie la preview comme en étape 8. Si tout est bon, merge dans
`main` :

```bash
git checkout main && git merge supabase-images && git push origin main
```

Surveille le déploiement prod (build doit être plus rapide, output bien plus petit).

---

## Étape 10 — Workflow pour les prochaines villes

Le pipeline de ship reste identique (les scripts écrivent toujours dans `public/images/`,
qui est maintenant gitignored = local seulement). Tu ajoutes juste une étape "sync" avant
le commit. Ajoute dans `package.json` :

```json
"scripts": {
  "images:sync": "node scripts/upload-images-supabase.mjs"
}
```

Après avoir généré les images d'une nouvelle ville (héros + hôtels + city-places) :

```bash
npm run images:sync            # pousse uniquement les nouvelles images vers Supabase
node scripts/upload-images-supabase.mjs --manifest   # (le sync le fait déjà) régénère le manifeste
git add data/image-manifest.json data/ lib/   # le manifeste DOIT être commité (sert au rendu)
git commit -m "..." && git push
```

Important : `data/image-manifest.json` est suivi par Git et doit être commité à chaque
ajout d'images, sinon `hasImage()` renverra faux pour les nouvelles photos d'hôtels et les
cartes seront masquées. (Pense à l'ajouter à ton checklist de ship, ou à committer
`public/images`... non : public/images est gitignored, donc c'est le manifeste qui porte
l'info "cette photo existe".)

---

## Rollback (si problème)

Tant que les fichiers sont encore sur ton disque :

```bash
git revert <sha-du-commit-migration>     # remet next.config + composants en arrière
git rm .gitignore-entry... # ou édite .gitignore pour retirer la ligne public/images/
git add public/images && git commit -m "rollback: re-track images in deploy"
```

Comme les images n'ont jamais été supprimées localement (seulement `--cached`), un
`git add public/images` les re-track et tout revient à l'état d'avant.

---

## Récap des fichiers touchés

| Fichier | Action |
|---|---|
| `.env.local` | + SUPABASE_URL, SUPABASE_SERVICE_KEY, NEXT_PUBLIC_IMAGE_CDN |
| Vercel env vars | idem (Production + Preview) |
| `scripts/upload-images-supabase.mjs` | créer (upload + manifeste) |
| `data/image-manifest.json` | généré, à committer |
| `lib/image-loader.js` | créer (loader next/image) |
| `lib/imageManifest.ts` | créer (hasImage) |
| `lib/imageUrl.ts` | créer (helper strings) |
| `next.config.ts` | images.loader = custom + loaderFile |
| `components/TopHotelsStrip.tsx` | existsSync → hasImage |
| `components/NearbyHotelCard.tsx` | existsSync → hasImage |
| `app/.../[guide]/page.tsx` + autres | JSON-LD/og `/images/...` → imageUrl(...) |
| `.gitignore` | + public/images/ |
| `package.json` | + script images:sync |

Coût Supabase attendu : ~373MB stockage (1GB gratuit) + egress caché par le CDN → quasi nul
au début, ~$0.02/GB ensuite. Gain Vercel : output -373MB, builds plus rapides, Image
Optimization quasi supprimé.
