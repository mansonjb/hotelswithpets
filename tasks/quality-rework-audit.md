# HotelsWithPets — Audit qualité & plan de re-travail (récup update Google)

Date : 2026-10-24. Déclencheur : démotion algorithmique confirmée depuis le **13/10/2026**
(position moy. 9-10 → 11-13 sur tous les marchés, 10+ jours, ne remonte pas ; clics 22/10 = 444,
plus bas depuis juillet). Même signature que le site soeur **bestsnowhotels** frappé par le
September 2026 spam update (voir memory `project_bestsnowhotels_spam_recovery`). Démotion, PAS
désindexation (impressions stables ~28-32k/j, toujours page 1-2). **Récupérable par la QUALITÉ,
pas par le volume.**

## Pourquoi on a été vulnérable (la vérité qui fait mal)

Site = ~50 000 pages programmatiques, 431 city-guides × 8 sections × 7 langues. Les updates
"helpful content / spam" ciblent précisément : **scaled content + E-E-A-T faible + pages thin**.
Nos tells mesurés aujourd'hui :

1. **Auteur bidon** : `articleSchema.author = { Person, name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor' }` → personne fictive, zéro crédential, `/about` sans vraie personne. Google dévalue ça frontalement.
2. **96 sections à `places: []`** (beaches/parks/resto/vets/attractions avec 0 lieu listé) + **25 intros "coming soon"** + 29 intros <120 car = pages thin dans l'index.
3. **"Vérifié à la source" partout dans les meta, mais AUCUNE source visible** sur la page. Claim de confiance non prouvé = signal négatif post-helpful-update.
4. **Meta ultra-templatées** (`c => \`... ${c} ...\``) : même phrase pour 431 villes = quasi-duplicate à l'échelle.
5. **`dateModified = datePublished`** : la date de MAJ ne bouge jamais, beaucoup de pages "fraîches" mentent.

## Les 2 leviers qui comptent (80% du gain)

- **A. E-E-A-T sitewide** (1 changement, low-risk, 1 deploy) : vraie identité éditoriale + sources visibles + dates honnêtes. C'est le plus gros levier et le moins risqué.
- **B. Élaguer + enrichir le thin** : noindex/supprimer les 96 sections vides et "coming soon", enrichir les pages à fort trafic. Supprime le poids mort qui tire tout le domaine vers le bas.

**STOP** : plus aucune nouvelle ville programmatique tant qu'on n'a pas récupéré (ça aggrave le signal scaled-content). On gèle Warnemünde/Usedom comme dernières.

---

# AUDIT SECTION PAR SECTION

Pour chaque brique : état actuel → faiblesse → fix concret → priorité (P0 immédiat / P1 semaines / P2 ensuite).

## 0. Couche E-E-A-T (sitewide, touche TOUTES les pages) — **P0**

| Élément | État | Fix |
|---|---|---|
| Auteur schema | `Person "HotelsWithPets Editorial"` fictif | Créer une vraie identité : 1-2 éditeurs nommés (ex. JB + 1 relecteur), bio courte, photo, `sameAs` (LinkedIn), sur `/about`. Référencer ce `@id` Person réel dans `author` de chaque Article. |
| `/about` | Disclaimer affiliation only, pas de personne | Réécrire : qui écrit, méthode de vérification (2 sources/fait), depuis quand, pourquoi de confiance. C'est la page "trust" du domaine jeune. |
| Sources | "vérifié à la source" clamé, jamais montré | Ajouter un bloc **"Sources vérifiées"** en bas de chaque section (liens officiels : mairie/office tourisme/opérateur transport/annuaire véto). On LES A déjà à la recherche, il faut les stocker + afficher. |
| `dateModified` | = datePublished, figé | Afficher "Mis à jour {mois année}" visible + bumper `dateModified` seulement quand on retouche vraiment la page. |
| `/methodology` | inexistant | Créer une page méthodo ("comment on vérifie les politiques animaux") liée depuis chaque page. Signal E-E-A-T fort. |

## 1. Pages section city-guide `/[city]/[guide]` (restaurants, beaches, parks, vets, transport, attractions, tips, petsitting) — LE MOTEUR DE TRAFIC — **P0/P1**

C'est 90% du trafic organique (GSC : `bergen/restaurants`, `oviedo/restaurants`, `zaragoza/attractions`…). Donc priorité absolue sur les villes à trafic.

**Faiblesses communes :** 3 lieux max par section, descriptions 2 phrases, intros templatées, pas de sources affichées, 96 sections vides.

Sous-section par sous-section :

- **beaches** (requête n°1 `dog friendly beaches near me`, + variantes locales qui convertissent à 20-50% CTR) → **P0**. Enrichir : passer de 3 à 5-6 plages sur les villes côtières à trafic, ajouter règles saisonnières précises + accès transport + carte. Le gros ROI SEO.
- **restaurants** (gros driver : `comer en X con perro`, `restaurantes pet friendly X`) → **P0**. 3→5 adresses nommées + politique chien réelle (intérieur/terrasse) + "appeler avant". Zéro invention (règle absolue).
- **vets** → **P1** mais lever near-me énorme non capté (`vet near me` pos 122, `emergency vet near me` pos 23). Ajouter la clinique d'URGENCE 24/7 + numéro vérifié en tête ; c'est ce que les gens cherchent.
- **attractions** (`X mit hund` DE fort, pages inégales : amsterdam pos 19 vs haarlem pos 3) → **P1**. Enrichir les attractions DE faibles, politique chien par site.
- **parks** → **P2**. Ajouter zones sans laisse réelles (requête `parc canin autour de moi`).
- **transport** → **P1**. Les gens cherchent les règles exactes opérateur (`se pueden llevar perros en el autobús`). Rendre les noms d'opérateurs cliquables (dead-clicks Clarity) + politique chiffrée.
- **tips** → **P2**. OK tel quel, pas prioritaire.
- **petsitting** → **P2** / candidat NOINDEX si vide (souvent places:[]).

**Action thin (P0) :** les 96 sections à `places:[]` + 25 "coming soon" → soit enrichir (si ville à trafic), soit **noindex** (si ville obscure). Ne jamais laisser une section vide indexée.

## 2. Page destination `/[city]` (money page "X hôtels pet-friendly") — **P1**

État : H1 = compteur hôtels + liste hôtels + météo + liens sections. Faiblesse : rank pos 7-8 sur head terms (`dog friendly hotels` 212k impressions, **0 clic**) = mur concurrentiel, et contenu éditorial mince vs les sous-pages. Fix : NE PAS chasser le head term ; renforcer le contenu éditorial unique par ville (le `cityContent.history` + sights existe, l'exploiter mieux), afficher les sources, dateModified honnête. Les 5 villes ex-vides (honfleur/orvieto/ronda/sesimbra/sibiu) viennent d'être remplies.

## 3. Pages catégorie `/[city]/[category]` (dog-friendly, cat-friendly, near-parks…) — **P1**

État : liste hôtels filtrée + date affichée (bien). Faiblesse : près de duplicate entre catégories d'une même ville (même pool d'hôtels re-filtré). Fix : intro unique par (ville × catégorie), au moins 2-3 phrases éditoriales spécifiques, sinon noindex les combos à <3 hôtels. **cat-friendly** = levier croissance (voir memory), garder prioritaire.

## 4. Pages hôtel `/hotels/[slug]` — **P2**

État : 1 hôtel = 1 page × 7 langues (2645 hôtels = ~18k pages). Risque scaled-content majeur (GA4 : beaucoup de pages hôtel à 1 vue). Faiblesse : contenu quasi auto-généré depuis le scrape. Fix : **noindex les pages hôtel à faible contenu / 0 trafic** (garder indexées seulement celles qui rankent ou ont du contenu riche), OU les consolider. C'est probablement notre plus gros gisement de thin pages. À quantifier via GSC "Explorée non indexée".

## 5. Guides `/guides/*` — **P1 (atout E-E-A-T)**

État : ~48 guides longs, vrais, sourcés (christmas, winter, cat, cost-index 611 hôtels…) = nos meilleures pages qualité. Fix : les mettre EN AVANT (maillage GuideFooter déjà corrigé le 20/10), ajouter auteur réel + sources, les utiliser comme preuve E-E-A-T du domaine. Le `pet-travel-cost-index` (611 hôtels audités) = exactement le type de contenu "original research" que Google récompense → le pousser.

## 6. Meta & templating (transversal) — **P1**

Casser la duplication : varier les patterns de title/description par type de ville (côtière/montagne/capitale), pas une seule formule pour 431 villes. Prioriser les 7 langues des villes à trafic.

---

# PHASAGE (calqué sur la récup bestsnowhotels)

**Phase 0 — E-E-A-T + ménage thin (cette semaine, 1 deploy) — P0**
1. Vraie identité éditoriale (`/about` réécrit + Person schema réel + author référencé partout).
2. Page `/methodology` + lien sitewide.
3. Bloc "Sources" affiché en bas des sections (commencer par stocker les sources des nouvelles villes).
4. Noindex des 96 sections vides + 25 "coming soon" + audit des pages hôtel thin.
5. `dateModified` honnête.

**Phase 1 — enrichir le moteur de trafic (semaines) — P1**
6. beaches + restaurants des ~30 villes à plus fort trafic (GSC) : 3→5-6 lieux, sources affichées.
7. vets near-me : clinique urgence 24/7 en tête sur les villes à trafic.
8. attractions DE faibles.
9. Pousser les guides "original research" (cost-index) + maillage.

**Phase 2 — consolidation (ensuite) — P2**
10. Décision pages hôtel (noindex masse / consolidation).
11. Parks, transport, petsitting.
12. Dé-templatiser les meta.

**Règles dures pendant la récup :**
- STOP nouvelles villes programmatiques.
- 1 deploy/jour max (flush ISR 50k pages).
- Zéro invention (toute source réelle ou section retirée).
- Pas de tiret cadratin.
- Monitorer GSC ; pas de rebond attendu avant le prochain core/spam update (semaines-mois). Ne pas paniquer-déployer.

**Mesure du succès :** position moy. qui remonte vers 9-10 + "Explorée/Détectée non indexée" qui baisse dans GSC Coverage.
