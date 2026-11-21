# Protocole de refonte éditoriale — "ultra qualitatif + à jour"

But : reprendre **chaque page de contenu** et la hisser à un niveau (a) factuellement vérifié et daté, (b) E-E-A-T fort (récup post-démotion Google 13/10/2026), (c) orienté conversion, (d) propre dans les 7 langues. Pas du re-remplissage : une passe de qualité, page par page, traçable.

Ce protocole complète `tasks/lessons.md` (toutes ses règles s'appliquent) et `tasks/quality-rework-audit.md`. Il ne remplace pas le pipeline des nouvelles villes (`daily-city-guides.md`) : ici on **retravaille l'existant**.

---

## 0. La barre de qualité (définition de "fait")

Une page est "refondue" seulement si TOUT est vrai :
1. **Zéro fait non sourcé.** Chaque donnée concrète (horaire, règle, prix, numéro, nom de lieu) est vérifiée sur **≥2 sources indépendantes** ou **1 source officielle** (mairie, office tourisme, opérateur transport, véto). YMYL = tolérance zéro (cf. lesson Swiss Life 31/10).
2. **Rien d'inventé, rien de répété.** Une idée = une section (feedback_no_repetition_no_invention). Si une section ne peut pas être vérifiée, elle passe en `coming-soon` (places vides), elle ne s'invente pas.
3. **À jour et daté.** La page porte une date de mise à jour visible + `dateModified` dans le schema. Les fenêtres saisonnières sont à l'année courante/suivante (ex. 2026 → bascule 2027).
4. **7 langues natives.** Pas de contamination ES↔PT, pas de fuite EN sur de/nl/it (lessons 28/08, template versus). Vérifié au build + `next start`.
5. **Pleine largeur, mobile-first, FAQ propre + FAQPage.** (feedback_full_width_text, feedback_faq_every_page). 80 % du trafic est mobile.
6. **Passe les 2 vérifs indépendantes** avant ship (feedback_double_verify) : build vert **ET** grep/parse direct **ET** rendu réel.

Si un seul point manque, la page n'est pas "faite".

---

## 1. Ordre de priorité (piloté par la data, pas au hasard)

Score de priorité par page = **trafic (GSC) × conversion (Stay22) × obsolescence**. Ce qu'on sait (nov 2026) :

| Priorité | Cible | Pourquoi |
|---|---|---|
| **P0** | `/{ville}/beaches` | 46 % du trafic, meilleure conversion (en/beaches 10 % d'annul), le plus périssable (règles saisonnières) |
| **P0** | `/{ville}/restaurants` | 21 % du trafic, 2e revenu, périssable (établissements ferment/changent politique) |
| **P1** | locale **PT** d'abord sur les 2 sections ci-dessus | meilleure locale (CTR 4,68 %, pos ~7) sous-exploitée |
| **P1** | `/{ville}/vets` | YMYL pur (urgence) : un numéro faux = danger + perte de confiance. Peu de trafic mais risque max |
| **P2** | `attractions`, `parks`, `transport` | trafic moyen, moins périssable |
| **P2** | guides versus/top evergreen (assurance, GPS, garde, Top-pays) | contre-saisonnalité (le trafic s'effondre hors été) |
| **P3** | `tips`, `petsitting` | faible trafic + faible conversion (garder pour la largeur SEO, pas prioritaire) |
| **Enquête à part** | capter "dog friendly hotels" (231k impressions / 3 clics) | potentiel dormant énorme |
| **Décision** | IT + NL (224 / 391 clics) | quasi morts : décider pousser vs attendre AVANT d'y investir une refonte |

Règle : on refond une **ville entière** à la fois (toutes ses sections) pour cohérence inter-pages et maillage, en commençant par les villes à fort trafic GSC. Top 30 pages GSC = la liste de départ.

---

## 2. Boucle de refonte d'UNE page (ou d'une ville)

### Étape A — Diagnostic (avant d'écrire)
- `git log --oneline -3` + `git status` propre (sinon finir/reset l'orphan, lesson 07/05).
- Sortir la perf GSC de la page (clics, CTR, position, requêtes qui la touchent) et sa conversion Stay22 (campagne = `{locale}, {section}`).
- Lister les requêtes réelles qui tombent dessus (fichier `Requêtes.csv` / GSC) → ce sont les questions auxquelles la page DOIT répondre mieux que le concurrent. Ex. beaches : "playa perros gandia 2026", "normativa perros playa", "hundestrand in der nähe".
- Repérer le périssable : fenêtres plage (dates + horaires), amendes, règles laisse, muselière transport, numéros/horaires véto, prix.

### Étape B — Recherche + vérification (le cœur)
- Source par section (chaîne fiable, lesson 28/05) :
  - **beaches** : office de tourisme + arrêté municipal (dates/zones/laisse/amendes) + 1 source carto/avis. Jamais "l'été" vague : donner les **dates exactes** et le **créneau horaire** (ex. Usedom 8h-20h, Linz 105 € d'amende).
  - **restaurants** : site/réseaux de l'établissement + 1 annuaire + recoupement politique animaux. Vérifier qu'il existe encore.
  - **vets** : site cabinet + annuaire ordinal + horaires garde. **Numéro jamais fabriqué** (lesson Toruń) ; un motif séquentiel = suspect → rejeter. `languages` = **array** (lessons Cork/Cardiff/Poznań).
  - **transport** : opérateur officiel (règle muselière, billet animal, dimensions). Prix en **EUR converti** (lesson devise).
  - **attractions/parks** : site du lieu (chiens admis ? laisse ? zones).
- `booking.com` via WebFetch renvoie du vide (bot-block) : recouper WebSearch + Hotels.com/KAYAK/Expedia/BringFido. 2/3 contradictoires → on saute.
- **Interdit** : Google Places API (feedback_no_google_places). Photos = Apify/Unsplash/partenaire, et vérifier que le sujet matche (feedback_image_subject_check).
- Tenir un **evidence log** par ville : `data/city-guides/_evidence/{slug}.md` (fait → source → date de vérif). C'est la preuve E-E-A-T et ça rend la page re-vérifiable.

### Étape C — Réécriture (la plume)
- Réécrire, pas rafistoler : angle honnête et différenciant (ce que le voyageur ignore et qui sauve/plante le séjour). Mentionner la règle spectaculaire locale à 3 endroits (lesson Cíes/Linz).
- **Pleine largeur**, pas de max-width en em sur le texte (feedback_full_width_text). Secondaires en bas.
- **Zéro répétition** entre sections d'une même ville.
- Micro-strings UI dans le dict COPY[locale], **aucune string EN en dur** dans le JSX (lesson Brittany 25/05).
- Ton : "vous" direct, concret, chiffré. Pas de remplissage. Pas d'anglicismes calqués (feedback_french_copy) ; mais `dog-friendly`/`pet-friendly` ne se traduisent pas.
- Interdits de forme : **tiret cadratin "—" = 0**, **"…" = 0** (couper en phrases entières).

### Étape D — E-E-A-T + fraîcheur
- Auteur réel (JB) + lien méthodo /about.
- Date de mise à jour visible ("Vérifié en {mois} {année}") + `dateModified` schema.
- Fenêtres/année : passer 2026 → formulation qui capte 2026 **et** 2027 (anti-cannibalisation, lesson hub soleil d'hiver).
- Stamp de confiance sur le périssable : "Règle plage vérifiée auprès de {source} le {date}".

### Étape E — Conversion
- CTA hôtel **inline** (pas seulement en bas) sur les templates à fort trafic (lesson 26/05 : beaches/restaurants = routes top, elles DOIVENT porter NearbyHotelCard/TopHotelsStrip/StickyHotelCTA).
- Deep-links partenaires : page produit exacte, **URL vérifiée qui résout** (curl -L ; 403/000 = blocage pas 404), entité qui vend bien le produit (lesson assurance 31/10). Stay22 aid FROZEN (ref_stay22_aid_vs_lmaid).

### Étape F — Traduction 7 langues
- Natif, pas machine. Attention densité d'accents es/pt (lesson trads : ~15 % des passes strippent les accents → re-scanner).
- hreflang = **7 locales + x-default** (lesson 23/05).
- Noms propres de lieux = nom pur, descripteurs en `desc` (lesson sights anglais).

### Étape G — Technique + maillage
- Schema par type : FAQPage (réponses réelles) + Article/Place selon la page + BreadcrumbList. `dateModified` à jour.
- Maillage : chaque page pointe vers ses voisines utiles (ville ↔ sections, ville → Top-pays, section → guide evergreen, tout → assurance via `insuranceHref`). Pas de lien nu vers une route dynamique sans param (lesson hub mois 28/05).
- Mobile : tout testé à 375px.

---

## 3. Portail de validation (AVANT chaque commit) — non négociable

Dans l'ordre (feedback_double_verify) :
1. `python3 -c "import json; json.load(open('data/city-guides/{slug}.json'))"` → JSON valide (double quotes, jamais backticks en JSON — lesson Uppsala).
2. Check `languages` = array partout (vets + petsitting) : le one-liner de la lesson Poznań.
3. `grep -c "—" {fichiers}` = 0 **et** `grep -c "…" {fichiers}` = 0.
4. `grep -rn "{slug}" app/ | grep href` → chaque lien a bien son segment dynamique.
5. URLs sortantes : `curl -sI -L` → 200 (ou 403/000 = blocage connu, pas 404).
6. `npx next typegen && npx tsc --noEmit` = 0.
7. `npm run build` complet exit 0 (le prerender attrape ce que tsc rate).
8. `find .next -type f | wc -l` < 60 000 (lesson deploy figé Vercel).
9. **Rendu réel** : `preview_start` → charger la page FR + une autre locale, screenshot, console sans erreur.
10. i18n ground truth sur de/nl/it si touchés : build + `next start` + curl la page rendue, grep marqueurs EN (lesson 28/08, check-i18n ne couvre que fr/es).

Un seul rouge = pas de commit.

---

## 4. Cadence & traçabilité

- **1 ville (toutes sections) par unité de travail.** Commit + push **immédiat** après la ville, avant la suivante (lesson Frankfurt : jamais tout en un bloc ; si la 2e crashe la 1re est live).
- JSON ville écrit en 1 `Write` (coque) + 1 `Edit` par section (lesson 32k tokens).
- Re-trier alpha tout fichier data après insertion (lessons tri).
- Attribution commit : `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Deploy : respecter 1 deploy/jour (vide le cache ISR 50k pages). Grouper plusieurs villes refondues dans un même deploy si possible.
- Journaliser dans un registre `tasks/content-rework-log.md` : ville | sections refaites | date | commit | sources clés. Sert de reprise et de preuve.
- Si un autre process (daily agent) tourne en parallèle : `git log` avant/après chaque étape (lesson Cascais).

---

## 5. Checklist copier-coller (1 par page/section)

```
[ ] Diagnostic GSC + Stay22 + requêtes réelles listées
[ ] Chaque fait ≥2 sources / 1 officielle — evidence log rempli
[ ] Périssable à jour (dates plage, horaires, amendes, n° véto, prix EUR)
[ ] Zéro invention, zéro répétition
[ ] Pleine largeur, mobile 375px OK
[ ] FAQ propre + FAQPage schema (réponses réelles)
[ ] E-E-A-T : auteur + date "Vérifié en {mois} {année}" + dateModified
[ ] Année saisonnière à jour (capte année N et N+1)
[ ] CTA hôtel inline + deep-links vérifiés (200)
[ ] 7 langues natives, hreflang 7 + x-default, accents es/pt OK
[ ] languages = array ; noms propres purs
[ ] Maillage voisines + assurance ; pas de lien nu route dynamique
[ ] — = 0 ; … = 0
[ ] JSON valide ; tsc 0 ; build 0 ; .next < 60k
[ ] Rendu réel screenshoté, console propre
[ ] Commit + push immédiat ; registre mis à jour
```

---

## 6. Première vague recommandée (à valider avec JB)

1. **Top 10-15 villes GSC** (Gandia, Tarifa, Annecy, Bergen, Burgos, Oviedo, Albufeira, Cannes, Lausanne, Aveiro, Cascais, Costa da Caparica, Zurich…) → sections **beaches + restaurants** d'abord, **PT en priorité** là où la ville est lusophone.
2. **vets** des mêmes villes (YMYL, risque max) en parallèle.
3. Puis élargir aux autres sections ville par ville.
4. En parallèle, chantiers transverses : enquête "dog friendly hotels", décision IT/NL.
