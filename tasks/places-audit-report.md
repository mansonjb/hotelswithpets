# Audit des fiches lieux: claims pet-friendly non verifiables

Date: 2026-11-13. Branche chore/places-audit. Lecture seule, aucun guide modifie. Methode: scan automatique par mots-cles (heuristique, faux positifs possibles) de toutes les fiches de data/city-guides/*.json, score pondere x1.5 pour restaurants et attractions, puis verification web legere (WebSearch standard, 15 fiches).

## Resume

- Fichiers villes scannes: 431. Fiches lieux scannees: 6827 (restaurants 1334, parks 1290, attractions 1257, beaches 1080, vets 1066, petsitting 800).
- Risque ELEVE: 208 (restaurants 193, attractions 15). Risque MOYEN: 813. Risque FAIBLE: 5806.
- Constat structurel: le meme gabarit revient sur des dizaines de fiches ("Dogs are welcome inside" + "water bowl" + "since XXXX"), signe d une generation automatique plutot que de sources. Le cas Pingvinen n est pas isole.
- Pingvinen (Bergen) est TOUJOURS present dans data/city-guides/bergen.json sur origin/main au moment de l audit (le retrait annonce n y est pas visible). A verifier.
- Verification web (15 fiches): 0 confirmation officielle. 3 plausibles via sources tierces (Superfood Arles, Brunel Museum, Crown Liquor Saloon), 2 douteux de plus (Engel, Il Buco), le reste non verifiable. Aucune source du guide n est citee dans les fiches.

## Les 10 a corriger en priorite

1. bergen / restaurants / Pingvinen: Non verifiable: aucune source ne mentionne les chiens; le gerant dement. Reco: retirer (toujours present dans les donnees de cette branche, a verifier sur main).
2. lausanne / restaurants / Café Romand: Non verifiable (ouvert depuis 1951 confirme, mais rien sur les chiens). Reco: reformuler en prudent / verifier.
3. trento / restaurants / Loto Ristorante Pizzeria: Non verifiable (pas de mention chiens; "since 1997" correspond a la marque Loto 1997 mais pas le reste). Reco: retirer le claim bol d eau/staff, verifier.
4. bari / restaurants / Osteria delle Travi - Il Buco: Douteux: sources donnent l osteria ouverte depuis 1813 (le guide dit "since 1996"); chiens non mentionnes. Reco: verifier / corriger.
5. bristol / restaurants / The Old Duke: Non verifiable: absent de tous les guides dog-friendly de Bristol. Reco: retirer ou verifier.
6. bremen / restaurants / Engel Weincafé: Douteux: seul indice = 1 avis client isole (chien accepte, "no problem"); "explicitly welcome" et "treats" non sources. Reco: reformuler en prudent.
7. sanxenxo / restaurants / Restaurante La Trastienda: Non verifiable: aucune mention chiens; "since 2017" non confirme. Reco: retirer ou verifier.
8. kaunas / restaurants / YZY Bar: Non verifiable: aucune mention chiens. Reco: retirer ou verifier.
9. amsterdam / restaurants / Café Brecht: Non verifiable: aucune source ne mentionne Brecht et les chiens. Reco: retirer ou verifier.
10. linz / attractions / Pöstlingbergbasilika: Non verifiable: aucune source officielle; le texte dit aussi "only service dogs inside the nave" (incoherence avec "dogs allowed inside"). Reco: reformuler en prudent / verifier.

Autres a traiter ensuite: Hops & Barley (Berlin), Café Zähringer (Zurich), Crown Liquor Saloon (Belfast), puis tout le lot ELEVE ci-dessous.

## Tableau ELEVE (tri par score decroissant)

Verif web: fait pour 15 fiches, "-" sinon (non verifie). Reco par defaut hors verif: verifier sur le site officiel avant de garder; reformuler en prudent (terrasse, "a confirmer").

| Ville (fichier) | Section | Lieu | Claim problematique | Risque | Verif web | Recommandation |
|---|---|---|---|---|---|---|
| bergen | restaurants | Pingvinen | A laid-back Bergen institution since 2000, Pingvinen serves traditional Norwegian comfort food and craft beer in a wood-panelled room that explicitly welcomes dogs inside | ELEVE | Non verifiable: aucune source ne mentionne les chiens; le gerant dement | retirer (toujours present dans les donnees de cette branche, a verifier sur main) |
| lausanne | restaurants | Café Romand | Dogs are welcome inside at the quieter tables near the back, and on the small terrace on the Place Saint-François. | ELEVE | Non verifiable (ouvert depuis 1951 confirme, mais rien sur les chiens) | reformuler en prudent / verifier |
| trento | restaurants | Loto Ristorante Pizzeria | Dogs welcome inside and outside; water bowl offered. | ELEVE | Non verifiable (pas de mention chiens; "since 1997" correspond a la marque Loto 1997 mais pas le reste) | retirer le claim bol d eau/staff, verifier |
| berlin | restaurants | Hops & Barley | Dogs are welcome inside and on the small streetside terrace. | ELEVE | Non verifiable | reformuler en prudent / verifier |
| bremen | restaurants | Engel Weincafé | Dogs explicitly welcome inside and outside year-round; treat jar at the bar   | ELEVE | Douteux: seul indice = 1 avis client isole (chien accepte, "no problem"); "explicitly welcome" et "treats" non sources | reformuler en prudent |
| bristol | restaurants | The Old Duke | Dogs are welcome inside and on the small front terrace; the pub keeps a water bowl behind the bar and the wooden floor is dog-friendly even on rainy days. | ELEVE | Non verifiable: absent de tous les guides dog-friendly de Bristol | retirer ou verifier |
| dusseldorf | restaurants | Café Hüftgold | Dogs are welcome inside the cosy main room and on the pavement seating, and the staff keep water bowls available on request. | ELEVE | - | verifier / reformuler en prudent |
| kaunas | restaurants | YZY Bar | Leashed, calm dogs welcome inside and on terrace; water bowl on request. | ELEVE | Non verifiable: aucune mention chiens | retirer ou verifier |
| linz | restaurants | Die Bohne | Leashed dogs are welcome inside year-round; the half-dozen pavement tables open from April to October. | ELEVE | - | verifier / reformuler en prudent |
| oxford | restaurants | The Royal Oak | Dogs are welcome inside on a lead and outside, and staff hand out free treats to four-legged guests on arrival. | ELEVE | - | verifier / reformuler en prudent |
| sanxenxo | restaurants | Restaurante La Trastienda | A Sanxenxo restaurant open since 2017 that welcomes dogs of any size both indoors and on the terrace, with no weight limit and bowls provided. | ELEVE | Non verifiable: aucune mention chiens; "since 2017" non confirme | retirer ou verifier |
| vilnius | restaurants | In Vino | Dogs are welcome inside and on the cobbled inner courtyard terrace, where water bowls are kept by the door. | ELEVE | - | verifier / reformuler en prudent |
| zurich | restaurants | Café Zähringer | Dogs are welcome inside and the long wooden tables encourage settling in for a full afternoon. | ELEVE | Plausible: tag Dog Friendly sur un agregateur tiers; "since 1981" non confirme | reformuler en prudent |
| amsterdam | restaurants | Café Brecht | Dogs are explicitly welcome both inside and on the terrace. | ELEVE | Non verifiable: aucune source ne mentionne Brecht et les chiens | retirer ou verifier |
| arles | restaurants | Superfood Arles | Dogs on leash welcome inside and on terrace; water bowl on request   | ELEVE | Plausible: office de tourisme PACA "Animals accepted" + BringFido (bol d eau, terrasse); "inside" non confirme | garder en prudent (terrasse) |
| bari | restaurants | Osteria delle Travi - Il Buco | Dogs welcome on the small terrace and inside on quieter shifts. | ELEVE | Douteux: sources donnent l osteria ouverte depuis 1813 (le guide dit "since 1996"); chiens non mentionnes | verifier / corriger |
| belfast | restaurants | The Crown Liquor Saloon | Dogs are welcome throughout the ground floor, including inside the famous private snugs if available, water bowls supplied on request. | ELEVE | Plausible mais non officiel: listing Discover Northern Ireland "Dogs Accepted Inside" (snippet ambigu); "since 1978" et bol non sources | reformuler en prudent |
| bologna | restaurants | Trattoria Boni | Specifically registered as dog-friendly on Dogwelcome.it, dogs up to medium size are accepted inside, receive a snack, and get a water bowl on arrival. | ELEVE | - | verifier / reformuler en prudent |
| bratislava | restaurants | Urban House | Dogs are explicitly welcomed inside and on the courtyard terrace, with water bowls kept at the door. | ELEVE | - | verifier / reformuler en prudent |
| brno | restaurants | Lokál U Caipla | Dogs are explicitly welcome, with water bowls and house-made dog treats at the bar. | ELEVE | - | verifier / reformuler en prudent |
| bucharest | restaurants | J'ai Bistrot | Dogs are explicitly welcome both indoors and outdoors, and the team will bring a water bowl and a treat to the table on request. | ELEVE | - | verifier / reformuler en prudent |
| ghent | restaurants | Gruut Stadsbrouwerij | Gruut brews without hops, using a medieval blend of herbs, a genuine Ghent specialty since 2009. | ELEVE | - | verifier / reformuler en prudent |
| leuven | restaurants | Domus Leuven | Leashed dogs welcome inside and on the terrace; water bowls at the bar. | ELEVE | - | verifier / reformuler en prudent |
| poznan | restaurants | Weranda Caffe | Dogs welcome inside and on terrace; water bowl on request   | ELEVE | - | verifier / reformuler en prudent |
| sant-antoni | restaurants | Es Ventall | Shaded interior patio with bougainvillea, leashed dogs welcome at the patio tables, water bowls brought without asking. | ELEVE | - | verifier / reformuler en prudent |
| wroclaw | restaurants | Czarna Magia | Dogs are explicitly welcome inside at the table and on the patio, and staff bring a water bowl as a reflex. | ELEVE | - | verifier / reformuler en prudent |
| linz | attractions | Pöstlingbergbasilika | Leashed dogs welcome on the summit terrace and panoramic walkway; not allowed inside the basilica nave   | ELEVE | Non verifiable: aucune source officielle; le texte dit aussi "only service dogs inside the nave" (incoherence avec "dogs allowed inside") | reformuler en prudent / verifier |
| manchester | restaurants | Cane & Grain | Dogs are welcome inside on the ground floor and on every rooftop level. | ELEVE | - | verifier / reformuler en prudent |
| portland | restaurants | Lucky Labrador Brew Pub | Dogs are welcome on the outdoor patios but not inside the pub. | ELEVE | - | verifier / reformuler en prudent |
| rouen | restaurants | La Petite Auberge | Well-behaved dogs welcome inside and on terrace   | ELEVE | - | verifier / reformuler en prudent |
| vienna | restaurants | Café Hawelka | Dogs welcome inside   | ELEVE | - | verifier / reformuler en prudent |
| vienna | restaurants | Café Westend | Dogs are welcome inside and the clientele is reassuringly local. | ELEVE | - | verifier / reformuler en prudent |
| aarhus | restaurants | St. Pauls Apothek | Leashed dogs are welcome inside the bar area and on the heated outdoor terrace year-round. | ELEVE | - | verifier / reformuler en prudent |
| aix-en-provence | restaurants | Le Petit Verdot | Dogs are welcome inside the small wood-panelled salle and on the half-dozen pavement tables outside. | ELEVE | - | verifier / reformuler en prudent |
| ambleside | attractions | Bridge House (National Trust) | Outside, the steps and the garden are open 24 hours; only assistance dogs are allowed inside the tiny house. | ELEVE | - | verifier / reformuler en prudent |
| boulogne-sur-mer | restaurants | Chez Jules | Leashed dogs welcome at every table indoors and on the wide pavement terrace; the chef keeps water bowls behind the bar. | ELEVE | - | verifier / reformuler en prudent |
| brisbane | restaurants | Bosc | It is one of the few Brisbane venues where a dog is allowed inside, on the hardwood floor or on the couch, rather than being parked at an outdoor table. | ELEVE | - | verifier / reformuler en prudent |
| brussels | restaurants | Moeder Lambic Fontainas | Dogs are welcome inside and on the terrace at this Saint-Gilles institution. | ELEVE | - | verifier / reformuler en prudent |
| calais | restaurants | Histoire Ancienne | Leashed dogs welcome at every table indoors and on the pavement terrace; the chef keeps water bowls behind the bar. | ELEVE | - | verifier / reformuler en prudent |
| cardiff | restaurants | The Pen & Wig | Dogs are welcomed inside and out, with a dedicated doggy station offering toys, towels, water bowls and treats. | ELEVE | - | verifier / reformuler en prudent |
| delft | restaurants | Kobus Kuch | Dogs are welcome on the huge outdoor terrace (one of the largest in town) and inside the wooden interior; water bowls and even dog biscuits at the bar. | ELEVE | - | verifier / reformuler en prudent |
| dresden | restaurants | BrennNessel | Dogs are welcome inside and in the courtyard, and the kitchen serves seasonal vegetarian and vegan plates, regional beers, and a quietly priced lunch menu that fills with | ELEVE | - | verifier / reformuler en prudent |
| dunkerque | restaurants | Brasserie de la Digue | Leashed dogs welcome at every table indoors and on the wide seafront terrace; the chef keeps water bowls behind the bar. | ELEVE | - | verifier / reformuler en prudent |
| dusseldorf | restaurants | Brauerei Im Füchschen | Dogs are welcome inside the main pub area and on the small front terrace; the kitchen serves typical Rhenish brewery dishes including the famous house Schweinshaxe. | ELEVE | - | verifier / reformuler en prudent |
| gijon | restaurants | Sidrería Canteli | Dogs are welcome inside as well as out, which makes it a reliable rainy-day option when the north-coast weather turns. | ELEVE | - | verifier / reformuler en prudent |
| groningen | restaurants | De Pintelier | Dogs are welcome on every seat inside and on the handful of pavement tables in summer; the bartender keeps water bowls behind the bar and the kitchen runs a short menu of | ELEVE | - | verifier / reformuler en prudent |
| leiden | restaurants | Café de WW | Dogs are welcome on every seat inside and on the handful of pavement tables in summer; the kitchen runs a short menu of broodjes, soups and Dutch comfort food, and the ba | ELEVE | - | verifier / reformuler en prudent |
| leipzig | restaurants | Auerbachs Keller | Dogs welcome on leash in the Großer Keller and Mephisto Bar; a water bowl appears at every table. | ELEVE | - | verifier / reformuler en prudent |
| lignano-sabbiadoro | restaurants | Doggy Beach Snack Bar & Kiosk | The snack bar and kiosk inside Lignano's dedicated dog beach is the one place in town designed entirely around eating with your dog beside you. | ELEVE | - | verifier / reformuler en prudent |
| liverpool | restaurants | Bold Street Coffee | Dogs are welcome inside the bright ground-floor café and the kitchen runs a daily-changing menu built around a single-origin coffee roastery. | ELEVE | - | verifier / reformuler en prudent |
| london | restaurants | Bellanger | A grand Parisian brasserie on Islington Green that treats dogs as welcome guests rather than an afterthought. | ELEVE | - | verifier / reformuler en prudent |
| london | attractions | Brunel Museum | Dogs are welcome inside the exhibition space, making it one of the only museums in London where you can explore with your dog alongside you. | ELEVE | Plausible: Art Fund, BringFido, Accor listent le musee dog-friendly; pas de source officielle | garder, ajouter source |
| manchester | restaurants | The Bay Horse Tavern | Dogs welcome on every floor; treats at the bar   | ELEVE | - | verifier / reformuler en prudent |
| neringa | restaurants | Draugiski Gyvunams network venues | The Neringa filter shows seasonal cafes and bakeries in Nida and Juodkrante that explicitly welcome dogs indoors year-round. | ELEVE | - | verifier / reformuler en prudent |
| reykjavik | restaurants | Hlemmur Mathöll | The communal tables inside are busy but some stalls have dogs allowed on a case-by-case basis, and the area outside the building is completely dog-friendly. | ELEVE | - | verifier / reformuler en prudent |
| rotterdam | restaurants | Lilith | Dogs are welcomed inside and on the terrace; water bowls are always on hand. | ELEVE | - | verifier / reformuler en prudent |
| salzburg | restaurants | Gasthof Wilder Mann | Dogs are accepted inside; the staff are matter-of-fact about it in the way of authentic Austrian Gasthäuser. | ELEVE | - | verifier / reformuler en prudent |
| santa-eulalia | restaurants | Royalty 1933 | Large shaded terrace under plane trees in the middle of the pedestrian street, dogs welcome on the terrace with water bowls brought on request. | ELEVE | - | verifier / reformuler en prudent |
| seattle | restaurants | Stoup Brewing Ballard | One of the rare Seattle addresses where a dog is welcome indoors: the brewery states that kids and well behaved dogs are welcome in the main taproom, out front and in the | ELEVE | - | verifier / reformuler en prudent |
| sopot | restaurants | Dwie Zmiany | Dogs are welcome indoors, and the mixed crowd of artists, students and locals means yours will not be the only one. | ELEVE | - | verifier / reformuler en prudent |
| sopot | restaurants | Pub Błękitny Pudel | Leashed dogs welcome, water bowls provided   | ELEVE | - | verifier / reformuler en prudent |
| stockholm | restaurants | Omnipollos Hatt | Dogs are welcome inside without restriction and the outdoor seating area on Hökens gata is perfect in summer. | ELEVE | - | verifier / reformuler en prudent |
| stockholm | restaurants | Café String | Dogs welcome inside and outside   | ELEVE | - | verifier / reformuler en prudent |
| tallinn | restaurants | Café Boheem | Dogs are explicitly welcome, both inside and on the outdoor terrace. | ELEVE | - | verifier / reformuler en prudent |
| treviso | restaurants | Ristorantino Carbone | A Veneto-cuisine restaurant with zero-kilometre products that is one of the most explicitly dog-friendly tables in Treviso: dogs of any size, even more than one per guest | ELEVE | - | verifier / reformuler en prudent |
| uppsala | restaurants | Centralkonditoriet | Leashed dogs are explicitly welcome both inside the café and at the handful of pavement tables that open along the square from May to September. | ELEVE | - | verifier / reformuler en prudent |
| uppsala | attractions | Botaniska trädgården | Leashed dogs are welcome in the outdoor gardens and on the paths; only service dogs are allowed inside the glasshouses and the orangery. | ELEVE | - | verifier / reformuler en prudent |
| wroclaw | restaurants | Pierogarnia Stary Mlyn | Dogs are welcome inside at the wooden tables and the staff genuinely like them. | ELEVE | - | verifier / reformuler en prudent |
| zaragoza | restaurants | Palmaria Café | Dogs welcome on terrace and inside, water and treats provided   | ELEVE | - | verifier / reformuler en prudent |
| abu-dhabi | restaurants | Art Market | One of the more openly dog-welcoming spots on the waterfront, with leashed dogs accepted both on the terrace and inside, and water and treats often offered. | ELEVE | - | verifier / reformuler en prudent |
| aix-en-provence | restaurants | Côté Cour | Dogs are welcome on the courtyard terrace and water bowls are brought without being asked. | ELEVE | - | verifier / reformuler en prudent |
| asheville | restaurants | Twisted Laurel | Dogs welcome on the patio, which comes with a water bowl and even a dog menu of items like scrambled egg and veggies; indoors is service-animals only. | ELEVE | - | verifier / reformuler en prudent |
| bad-gastein | restaurants | Himmelwandhütte | Dogs welcome inside and on the terrace; the hut has resident dogs of its own. | ELEVE | - | verifier / reformuler en prudent |
| bad-ischl | attractions | Kaiservilla & Kaiserpark | Leashed dogs welcome throughout the park grounds; not permitted inside the villa's furnished rooms or the small garden pavilions. | ELEVE | - | verifier / reformuler en prudent |
| basel | restaurants | Restaurant Krafft | The kitchen leans modern Swiss with seasonal river-fish dishes, and the staff are unflappably dog-friendly: water bowls appear automatically and dogs are welcome on the t | ELEVE | - | verifier / reformuler en prudent |
| bayonne | restaurants | Influences | Dogs are explicitly welcomed on the terrace and the team provides a water bowl on arrival. | ELEVE | - | verifier / reformuler en prudent |
| bellagio | restaurants | Ristorante Bilacus | Leashed dogs welcome on the garden terrace and inside the vaulted dining room   | ELEVE | - | verifier / reformuler en prudent |
| bellagio | restaurants | Aperitivo et Al | Leashed dogs welcome inside and on the outdoor stair tables; water bowl on request   | ELEVE | - | verifier / reformuler en prudent |
| bergamo | restaurants | Da Mimmo | A historic Città Alta trattoria-pizzeria on the central Via Colleoni, in business since 1956 and a Bergamo institution. | ELEVE | - | verifier / reformuler en prudent |
| bonn | restaurants | Brauhaus Bönnsch | The wood-panelled dining room and the large beer-garden courtyard out back both welcome dogs on a lead, and staff routinely bring water bowls without being asked. | ELEVE | - | verifier / reformuler en prudent |
| braga | attractions | Bom Jesus do Monte | Inside the church itself dogs are not allowed. | ELEVE | - | verifier / reformuler en prudent |
| brasov | restaurants | Bistro de l'Arte | Dogs join their owners on the courtyard terrace year-round and indoors when seating allows; the team brings water bowls without prompting. | ELEVE | - | verifier / reformuler en prudent |
| brasov | restaurants | Sergiana Centru | Dogs on lead are welcome on the outdoor terrace only; the cellar interior is reserved for guests without pets due to space. | ELEVE | - | verifier / reformuler en prudent |
| bratislava | restaurants | LINOS Bistro & Coffee Shop | The window sticker explicitly welcomes leashed dogs, and the small interior keeps a couple of water bowls. | ELEVE | - | verifier / reformuler en prudent |
| bremen | restaurants | Ratskeller Bremen | Leashed dogs welcome inside year-round in the back vaults; water bowl on request   | ELEVE | - | verifier / reformuler en prudent |
| bremen | restaurants | Beck's am Markt | Dogs welcome on the terrace and inside off-peak; water bowl provided   | ELEVE | - | verifier / reformuler en prudent |
| bremen | attractions | Bremen Town Hall & Roland Statue | The exterior plaza is open to dogs; the interior Ratskeller restaurant welcomes them indoors. | ELEVE | - | verifier / reformuler en prudent |
| brno | restaurants | Pivnice U Čápa | Dogs welcome inside year-round on leash; water bowls behind the bar. | ELEVE | - | verifier / reformuler en prudent |
| bruges | restaurants | Café Vlissinghe | Leashed dogs welcome inside year-round and on the back terrace; water bowls at the bar. | ELEVE | - | verifier / reformuler en prudent |
| bruges | restaurants | 't Brugs Beertje | Tiny wooden room, candle-lit at night, leashed dogs welcome inside without question. | ELEVE | - | verifier / reformuler en prudent |
| brussels | restaurants | Café Belga | Dogs welcome on terrace, accepted inside during off-peak   | ELEVE | - | verifier / reformuler en prudent |
| brussels | restaurants | Brasserie L'Ours | Dogs welcome on terrace, well-behaved dogs accepted inside   | ELEVE | - | verifier / reformuler en prudent |
| bucharest | restaurants | Artichoke Coffee Shop | Dogs are welcomed indoors at the front tables and unconditionally on the terrace, with treats and water bowls kept behind the bar. | ELEVE | - | verifier / reformuler en prudent |
| burgos | restaurants | Flor de Escocia | The outdoor terrace explicitly welcomes dogs and the team is known for bringing a water bowl. | ELEVE | - | verifier / reformuler en prudent |
| cadiz | restaurants | Ultramar & Nos | It is one of the central Cadiz spots that explicitly welcomes dogs inside, not only on the terrace. | ELEVE | - | verifier / reformuler en prudent |
| caen | restaurants | L'Accolade | The cosy ground-floor room and the small front terrace both accept leashed dogs; staff routinely bring a water bowl on request. | ELEVE | - | verifier / reformuler en prudent |
| carcassonne | restaurants | Comte Roger | A stone-walled restaurant tucked inside the medieval walls of La Cité, with a quiet interior courtyard shaded by a giant plane tree where leashed dogs are welcome at the  | ELEVE | - | verifier / reformuler en prudent |
| chamonix | restaurants | MOÖ Bar Cuisine | Dogs welcome inside and on the terrace, water bowls provided   | ELEVE | - | verifier / reformuler en prudent |
| chicago | restaurants | Big Star (Wicker Park) | A One Off Hospitality honky-tonk taqueria at the Damen-Milwaukee-North six-corners in Wicker Park, with a large fenced outdoor patio that has been one of the city's most  | ELEVE | - | verifier / reformuler en prudent |
| ciutadella | attractions | Naveta des Tudons | Dogs on leash welcome on perimeter walk; not inside the funerary chamber   | ELEVE | - | verifier / reformuler en prudent |
| copenhagen | restaurants | Café Nørrebro | Dogs welcome on terraces and often inside   | ELEVE | - | verifier / reformuler en prudent |
| delft | restaurants | Stads-Koffyhuis | Dogs are welcome on the quay tables and inside the wood-panelled koffyhuis. | ELEVE | - | verifier / reformuler en prudent |
| denia | restaurants | El Raset | The shaded terrace facing the marina welcomes leashed dogs at all hours, and the staff routinely bring a water bowl without asking. | ELEVE | - | verifier / reformuler en prudent |
| dresden | restaurants | SchillerGarten | The Biergarten and the dining room both welcome dogs, with water bowls and a relaxed family atmosphere. | ELEVE | - | verifier / reformuler en prudent |
| dresden | restaurants | Café Neustadt | Dogs are welcomed inside and at the sidewalk tables, and water bowls are kept at the counter. | ELEVE | - | verifier / reformuler en prudent |
| edinburgh | restaurants | The Meadow Bar | The pub has fully leaned into this identity: water bowls at the door, dog treats at the bar, a sprawling beer garden in summer, and a genuinely warm welcome in winter. | ELEVE | - | verifier / reformuler en prudent |
| falmouth | attractions | National Maritime Museum Cornwall | Assistance dogs only are allowed inside, but there is a sheltered dog bed, tie-up and water bowl by the entrance for other dogs. | ELEVE | - | verifier / reformuler en prudent |
| formentera | restaurants | Can Carlos | Leashed dogs are welcome in the garden patio (not in the indoor dining room), and bowls of water appear at the table. | ELEVE | - | verifier / reformuler en prudent |
| frankfurt | restaurants | Apfelwein Wagner | The courtyard and wooden-bench interior both welcome dogs, and staff will bring a water bowl on request. | ELEVE | - | verifier / reformuler en prudent |
| gdynia | restaurants | Serwus Gdynia | Dogs welcome on terrace year-round and indoors outside peak service. | ELEVE | - | verifier / reformuler en prudent |
| gdynia | restaurants | Blizej Gdynia | Dogs welcome both inside and on the small fenced summer terrace, water and a treat brought on request. | ELEVE | - | verifier / reformuler en prudent |
| geneva | restaurants | Café Slatkine | Dogs are welcome at outside tables and inside on cooler days; the staff routinely bring a water bowl. | ELEVE | - | verifier / reformuler en prudent |
| genoa | restaurants | Il Covo Public House | Dogs on lead are welcomed inside and outside, with a water bowl produced on request. | ELEVE | - | verifier / reformuler en prudent |
| ghent | restaurants | Het Spijker | Leashed dogs welcome inside on the ground floor and on the terrace; water bowls at the bar. | ELEVE | - | verifier / reformuler en prudent |
| ghent | restaurants | Café Labath | Leashed dogs welcome inside on the wooden floor and on the small front terrace; water bowls at the bar. | ELEVE | - | verifier / reformuler en prudent |
| gothenburg | restaurants | Kafé Magasinet | Dogs welcome inside and on terrace   | ELEVE | - | verifier / reformuler en prudent |
| gothenburg | restaurants | Restaurang Kometen | Dogs are welcomed inside and the staff are genuinely fond of them, there are often regulars who bring their dogs on weekday lunches. | ELEVE | - | verifier / reformuler en prudent |
| graz | restaurants | Der Steirer | Dogs welcome indoors and on terrace, water bowl provided   | ELEVE | - | verifier / reformuler en prudent |
| grindelwald | restaurants | Restaurant Onkel Tom's Hütte | Leashed dogs welcome on the terrace and inside the Stube; water bowl on arrival   | ELEVE | - | verifier / reformuler en prudent |
| grindelwald | restaurants | Restaurant Bergrestaurant Brandegg | Leashed dogs welcome on the terrace and indoors; water bowls and a shaded corner under the bench   | ELEVE | - | verifier / reformuler en prudent |
| grindelwald | restaurants | Restaurant Memory | Leashed dogs welcome on the terrace and indoors; water bowl on arrival   | ELEVE | - | verifier / reformuler en prudent |
| groningen | restaurants | Café De Sigaar | Dogs welcome on canal-side terrace and inside the brown café; water bowls behind the bar   | ELEVE | - | verifier / reformuler en prudent |
| groningen | restaurants | Het Goudkantoor | Dogs welcome on the Waagplein terrace and inside; water bowls on arrival   | ELEVE | - | verifier / reformuler en prudent |
| haarlem | restaurants | Native Haarlem | Dogs are welcome on the sidewalk tables and in the relaxed back room, the kitchen sends out a water bowl on arrival, and the menu leans on seasonal Dutch vegetables, sour | ELEVE | - | verifier / reformuler en prudent |
| heidelberg | restaurants | Zum Roten Ochsen | Dogs welcome on leash inside; water bowls behind the bar. | ELEVE | - | verifier / reformuler en prudent |
| helsinki | restaurants | Bar Loose | Dogs welcome inside and on terrace   | ELEVE | - | verifier / reformuler en prudent |
| hyeres | restaurants | Le Vintage | Dogs on leads are explicitly welcome on the terrace, and the staff bring a water bowl without being asked. | ELEVE | - | verifier / reformuler en prudent |
| interlaken | restaurants | Restaurant Bären Sigriswil | Leashed dogs welcome on the terrace and inside the Stube; water bowl on arrival   | ELEVE | - | verifier / reformuler en prudent |
| interlaken | restaurants | Brasserie 17 | Dogs welcome inside year-round; water bowl provided   | ELEVE | - | verifier / reformuler en prudent |
| interlaken | restaurants | Restaurant Bel-Air | Leashed dogs welcome on the terrace and indoors; water bowl on arrival   | ELEVE | - | verifier / reformuler en prudent |
| jurmala | restaurants | Cafe 53 | The terrace is fenced off from the street and accepts well-behaved leashed dogs without issue, water bowls are brought on request. | ELEVE | - | verifier / reformuler en prudent |
| klagenfurt | restaurants | Café Moser | Dogs welcome inside and on the pedestrian terrace, water bowls on request   | ELEVE | - | verifier / reformuler en prudent |
| klaipeda | restaurants | The Seven Pub | Dogs are visibly welcomed: reviewers report staff bringing a water bowl unprompted on the terrace facing the riverside walk. | ELEVE | - | verifier / reformuler en prudent |
| kolobrzeg | restaurants | Pod Winogronami | Dogs are welcomed both on the terrace and, quietly, inside. | ELEVE | - | verifier / reformuler en prudent |
| kolobrzeg | restaurants | Masarnia Burger Bar | Dogs are welcome outside and staff bring water bowls in warm weather. | ELEVE | - | verifier / reformuler en prudent |
| kyoto | restaurants | Ran Hotei | A relaxed central Kyoto cafe that welcomes dogs and even makes handmade dog treats, including soy-milk cakes, cookies and jerky. | ELEVE | - | verifier / reformuler en prudent |
| larnaca | restaurants | Refuel | A laid-back cafe, juicery and ice creamery that locals recommend for travellers with dogs, with small dogs welcome both indoors and on the terrace. | ELEVE | - | verifier / reformuler en prudent |
| lecce | restaurants | Trattoria Le Zie - Cucina Casereccia | Dogs welcome on the front pavement terrace year-round, with prior agreement for inside seating. | ELEVE | - | verifier / reformuler en prudent |
| leiden | restaurants | Grand Café Pakhuis | The cavernous wood-and-brick interior, the long zinc bar and the heated outer terrace all welcome leashed dogs; water bowls and a basket of dog biscuits live at the bar. | ELEVE | - | verifier / reformuler en prudent |
| leiden | restaurants | Annie's Verjaardag | The huge waterfront terrace and the brick-vaulted cellar interior welcome leashed dogs; water bowls on arrival. | ELEVE | - | verifier / reformuler en prudent |
| leuven | restaurants | Notre Dame | Leashed dogs welcome inside without question. | ELEVE | - | verifier / reformuler en prudent |
| leuven | restaurants | Metafoor | Leashed dogs welcome inside on the wooden floor and on the small front terrace; water bowls at the bar. | ELEVE | - | verifier / reformuler en prudent |
| liepaja | restaurants | Miezis & Kompanija | Verified pet-friendly in TripAdvisor reviews, the bar regularly welcomes dogs both in the yard and inside on quieter evenings. | ELEVE | - | verifier / reformuler en prudent |
| lille | restaurants | La Bellezza | Dogs are welcomed with a smile inside and outside; staff routinely bring water bowls without being asked. | ELEVE | - | verifier / reformuler en prudent |
| linz | restaurants | Café Traxlmayr | Leashed dogs are welcome year-round inside the main saloon and on the summer terrace, with water bowls brought to the table. | ELEVE | - | verifier / reformuler en prudent |
| linz | restaurants | Die Donauwirtinnen | Dogs on a lead are welcome on the terrace year-round and inside the bar area; water bowls are kept by the entrance. | ELEVE | - | verifier / reformuler en prudent |
| ljubljana | restaurants | Druga Violina | Pets are explicitly welcomed both inside and on the terrace. | ELEVE | - | verifier / reformuler en prudent |
| locarno | restaurants | Ristorante Ascolago | The terrace welcomes leashed dogs throughout the season; staff bring a water bowl and dogs are routinely treated to a small biscuit. | ELEVE | - | verifier / reformuler en prudent |
| los-angeles | restaurants | Urth Caffé Melrose | The patio runs the full length of the corner lot, water bowls are produced the moment a dog sits down, and it is a fixture of WeHo dog-walking life from breakfast through | ELEVE | - | verifier / reformuler en prudent |
| los-angeles | restaurants | Lazy Dog Restaurant & Bar Westwood | A Californian chain that takes the name literally: every Lazy Dog patio has a dedicated dog menu (grilled chicken, brown rice, vegetables, all under 6 $) and free water b | ELEVE | - | verifier / reformuler en prudent |
| lucerne | restaurants | Restaurant Bündnerland | Dogs welcome inside year-round; water bowl served on arrival   | ELEVE | - | verifier / reformuler en prudent |
| luxembourg | restaurants | Café Villa | Dogs welcome inside front lounge and on terrace; full dog menu and amenities   | ELEVE | - | verifier / reformuler en prudent |
| lyon | restaurants | Le Bouchon des Filles | Dogs welcome on terrace, well-behaved dogs tolerated inside   | ELEVE | - | verifier / reformuler en prudent |
| maastricht | restaurants | Café Sjiek | Dogs welcome inside on leash and on the front terrace year-round; water bowls at the bar. | ELEVE | - | verifier / reformuler en prudent |
| madrid | restaurants | Bar Melo's | Dogs welcome on terrace and generally tolerated inside   | ELEVE | - | verifier / reformuler en prudent |
| miami | restaurants | Joe's Stone Crab | The sidewalk patio along Washington Avenue welcomes leashed dogs and bowls of water are produced on request. | ELEVE | - | verifier / reformuler en prudent |
| montreal | restaurants | Bulla Café | Part specialty coffee bar, part graphic-art boutique, this Saint-Denis address welcomes dogs both inside and on its small terrasse, and keeps water bowls on hand. | ELEVE | - | verifier / reformuler en prudent |
| montreal | attractions | Vieux-Port de Montréal | Leashed pets allowed on the promenade des Quais; prohibited inside Société buildings and at the Plage de l'Horloge, and may be refused during special events  | ELEVE | - | verifier / reformuler en prudent |
| nimes | restaurants | Cali Kitchen | Dogs on leads are explicitly welcome on the terrace, and the staff bring water bowls without being asked. | ELEVE | - | verifier / reformuler en prudent |
| ostend | restaurants | Cafe Botteltje | Wood-panelled room, candle-lit at night, leashed dogs welcome inside by default. | ELEVE | - | verifier / reformuler en prudent |
| palma | restaurants | Portixol Restaurant | Dogs are explicitly welcome outside and staff routinely bring water bowls. | ELEVE | - | verifier / reformuler en prudent |
| perugia | restaurants | La Taverna | Dogs welcome inside and out; water bowl offered on arrival   | ELEVE | - | verifier / reformuler en prudent |
| porto | restaurants | Baobab Craft Beer Pub | Rated the most dog-friendly bar in Porto by the local expat community, their own Instagram bio describes it as 'SUPER pet friendly.' Dogs are welcome both inside and at t | ELEVE | - | verifier / reformuler en prudent |
| poznan | restaurants | Pyra Bar | Dogs are welcome at indoor wooden tables and on the small front terrace, and a water bowl is brought without asking. | ELEVE | - | verifier / reformuler en prudent |
| poznan | restaurants | Cafe Lente | Dogs are explicitly welcome inside at the table and in the courtyard, and the regulars often bring their own. | ELEVE | - | verifier / reformuler en prudent |
| prague | restaurants | Café Sladkovský | Dogs are welcomed at all terrace tables and the staff reliably bring water bowls without being asked. | ELEVE | - | verifier / reformuler en prudent |
| riga | restaurants | Labietis Taproom | Dogs welcome in outdoor area and generally tolerated inside. | ELEVE | - | verifier / reformuler en prudent |
| riva-del-garda | restaurants | Ristorante Pizzeria San Nicolò | Right beside the little harbour of Porto San Nicolò at the eastern edge of town, this restaurant and pizzeria welcomes dogs of all sizes both inside and out, with the own | ELEVE | - | verifier / reformuler en prudent |
| ronda | restaurants | Tragatá | Dogs explicitly welcome, both on the terrace and inside; mention your dog when booking   | ELEVE | - | verifier / reformuler en prudent |
| rouen | restaurants | Le P'tit Zinc | Dogs welcome on terrace and inside brasserie   | ELEVE | - | verifier / reformuler en prudent |
| san-francisco | restaurants | The Grove Hayes Valley | Water bowls produced on arrival, treats kept behind the counter, and the patio runs the full block-corner so even a large dog has room to sprawl out under the table. | ELEVE | - | verifier / reformuler en prudent |
| san-sebastian | restaurants | Restaurante Igeldo | Dogs are welcome throughout the restaurant, on the terrace and inside, and staff provide water bowls on request. | ELEVE | - | verifier / reformuler en prudent |
| sankt-polten | restaurants | Gasthof Graf | The owners keep a water bowl by the door and welcome calm dogs both inside and out. | ELEVE | - | verifier / reformuler en prudent |
| santiago-de-compostela | restaurants | Café Latexo | Dogs welcome inside and on the terrace. | ELEVE | - | verifier / reformuler en prudent |
| scheveningen | restaurants | 't Pannekoekenhuisje Scheveningen | It is an easy, family-friendly stop after a beach walk and explicitly welcomes dogs. | ELEVE | - | verifier / reformuler en prudent |
| sofia | restaurants | Social Cafe Bar & Kitchen | Dogs are explicitly welcomed on the terrace and the front section of the indoor lounge, with bowls and a small bag of treats kept behind the bar. | ELEVE | - | verifier / reformuler en prudent |
| soller | restaurants | Es Canyís | Dogs are welcome on the terrace and the staff bring water bowls without being asked, this is a genuinely Mallorcan address that has watched the port evolve for seventy ye | ELEVE | - | verifier / reformuler en prudent |
| stockholm | restaurants | Café Saturnus | This Östermalm institution has a warm, literary atmosphere and welcomes dogs both at its outdoor tables and, when quiet, inside. | ELEVE | - | verifier / reformuler en prudent |
| stuttgart | restaurants | Restaurant Luftbad | Dogs welcome inside and in the front Biergarten   | ELEVE | - | verifier / reformuler en prudent |
| sylt | restaurants | Strandrestaurant Kap-Horn | Dogs are genuinely welcome both on the terrace and inside, and the staff put out water bowls. | ELEVE | - | verifier / reformuler en prudent |
| tampere | restaurants | Kahvila Runo | Dogs welcomed throughout the small interior; water bowls at the door. | ELEVE | - | verifier / reformuler en prudent |
| tokyo | restaurants | Castanet | Dogs accepted both indoors and on the terrace; booking advised. | ELEVE | - | verifier / reformuler en prudent |
| torun | restaurants | Manekin Rynek Staromiejski | Dogs welcome inside and on terrace; water bowl on request   | ELEVE | - | verifier / reformuler en prudent |
| treviso | restaurants | Pizzeria Da Pino | The first, historic branch of Treviso's best-known pizzeria family, where four-legged guests get their own water bowl and a proper welcome. | ELEVE | - | verifier / reformuler en prudent |
| usedom | restaurants | Ahlbecker Hof (terrace) | Holiday hosts note that dogs are welcome on the terrace, making it a genteel treat after a beach walk. | ELEVE | - | verifier / reformuler en prudent |
| utrecht | restaurants | The Colour Kitchen Zuilen | Dogs welcome on terrace; ask inside   | ELEVE | - | verifier / reformuler en prudent |
| vannes | restaurants | Crêperie Saint Guénaël | Calm leashed dogs welcome indoors and on terrace; water bowl provided   | ELEVE | - | verifier / reformuler en prudent |
| vilnius | restaurants | 12 Istorijų | Dogs welcome inside; treats and water provided   | ELEVE | - | verifier / reformuler en prudent |
| york | restaurants | The Hop | Dogs are welcome throughout the ground floor and the rear beer garden, with water bowls and dog treats kept behind the bar. | ELEVE | - | verifier / reformuler en prudent |
| zaragoza | restaurants | Café Botánico | Dogs welcome inside and on terrace, water bowls provided   | ELEVE | - | verifier / reformuler en prudent |
| zaragoza | restaurants | Justicia Café y Pasteles | Dogs are explicitly welcomed both on terrace and at the bar inside, the owner usually has her own dog asleep behind the counter. | ELEVE | - | verifier / reformuler en prudent |
| avignon | attractions | Palais des Papes (Square) | The largest Gothic palace in Europe, UNESCO since 1995, former seat of seven popes (1309-1377). | ELEVE | - | verifier / reformuler en prudent |
| bakewell | restaurants | The Manners | The staff love to make a fuss of visiting dogs and usually have treats to hand, and there is a resident pub dog to befriend. | ELEVE | - | verifier / reformuler en prudent |
| bath | restaurants | The Boater | Dogs welcome inside and on the riverside terrace   | ELEVE | - | verifier / reformuler en prudent |
| bibione | attractions | Bibione Thermae | Bibione Thermae is the resort's thermal spa, open since 1996, with large indoor and outdoor thermal pools, saunas, treatments and a Beauty Farm, all set within a pine for | ELEVE | - | verifier / reformuler en prudent |
| bordeaux | restaurants | Le Bouchon Bordelais | Dogs welcome on terrace, well-behaved dogs inside   | ELEVE | - | verifier / reformuler en prudent |
| brno | attractions | Villa Tugendhat (exterior) | Mies van der Rohe's 1930 modernist masterpiece, UNESCO since 2001. | ELEVE | - | verifier / reformuler en prudent |
| granada | restaurants | La Cochera | Listed on BringFido as one of Granada's standout dog-friendly venues, La Cochera has a proper beer garden and a terrace where dogs are explicitly welcomed. | ELEVE | - | verifier / reformuler en prudent |
| hamburg | restaurants | Fischereihafen Restaurant | Leashed dogs are welcome on the outdoor terrace and inside on request; the owner is a known dog lover. | ELEVE | - | verifier / reformuler en prudent |
| helsinki | restaurants | Kuuma | The terrace is broad, unhurried and genuinely dog-friendly, staff have been known to bring water bowls without being asked. | ELEVE | - | verifier / reformuler en prudent |
| kyoto | restaurants | Cafe DOnG by Sfera | A design-led cafe inside the Sfera Building on the edge of Gion, where small dogs are allowed indoors, unusual for central Kyoto. | ELEVE | - | verifier / reformuler en prudent |
| ljubljana | restaurants | Cafe Čokl | Dogs welcome inside and on the terrace   | ELEVE | - | verifier / reformuler en prudent |
| lyon | restaurants | Café Mokxa | Dogs welcome on terrace, small dogs welcome inside   | ELEVE | - | verifier / reformuler en prudent |
| pisa | restaurants | Anita Osteria | Dogs welcome inside and on terrace; water bowl provided   | ELEVE | - | verifier / reformuler en prudent |
| reims | attractions | Notre-Dame de Reims Cathedral | Gothic coronation cathedral, UNESCO since 1991, where 33 French kings were crowned (Clovis 496, Charles VII with Joan of Arc 1429). | ELEVE | - | verifier / reformuler en prudent |
| riga | attractions | Kalnciema kvartāla tirgus (Farmers Market) | Dogs are explicitly welcome, regulars bring their dogs every week, and the outdoor format and relaxed atmosphere make it one of the best dog-friendly outings in Riga. | ELEVE | - | verifier / reformuler en prudent |
| sydney | restaurants | Café Bones | Often described as the world's first dog café and the birthplace of the puppuccino, Café Bones sits inside the Hawthorne Canal Reserve, one of the biggest off-leash parks | ELEVE | - | verifier / reformuler en prudent |
| warnemunde | restaurants | Kettenkasten | Dogs welcome, indoors and on the terrace   | ELEVE | - | verifier / reformuler en prudent |

## Tableau MOYEN (liste condensee, 813 fiches)

Signaux plus faibles (une affirmation precise isolee, ou section non restaurant/attraction). Recommandation: verifier. Colonne claim = premier signal detecte.

| Ville (fichier) | Section | Lieu | Signaux | Risque | Recommandation |
|---|---|---|---|---|---|
| abu-dhabi | restaurants | Stars 'N' Bars | water bowl; dog-friendly venues, with leashed dogs welcome; 19:00 | MOYEN | verifier |
| ambleside | restaurants | The Golden Rule | water bowl; always; Dogs are welcome | MOYEN | verifier |
| ambleside | attractions | Windermere Lake Cruises (Waterhead) | water bowl; every; dogs welcome | MOYEN | verifier |
| amsterdam | restaurants | Pllek | bowls; every; Dogs welcome | MOYEN | verifier |
| annecy | restaurants | Café des Arts | water bowl; every; Dogs welcome | MOYEN | verifier |
| antwerp | restaurants | Paters Vaetje | interior is dark, warm, and full of wooden booths ; always; Dogs are genuinely welcome | MOYEN | verifier |
| austin | restaurants | The ABGB (Austin Beer Garden Brewing Company) | biscuit; every; Dogs welcome | MOYEN | verifier |
| avignon | restaurants | L'Épice et Love | water bowl; every; Dogs welcome | MOYEN | verifier |
| begur | attractions | Casc antic & cases indianas (Carrer Bonaventura Carreras Peralta) | interior assistance-dog; every; dogs welcome | MOYEN | verifier |
| bellagio | attractions | Lungolago Manzoni Lakefront Promenade | water bowl; every; dogs welcome | MOYEN | verifier |
| beziers | restaurants | L'Ambassade | water bowl; every; dogs are welcome | MOYEN | verifier |
| biarritz | restaurants | Bar Jean | since 1935; every; Dogs are welcome | MOYEN | verifier |
| boulogne-sur-mer | restaurants | Estaminet du Château | dogs welcome at every table indoors; every; dogs welcome | MOYEN | verifier |
| brighton | restaurants | The New Club | interior is spacious enough for medium dogs; treat; dog-welcome | MOYEN | verifier |
| brighton | attractions | Volk's Electric Railway | explicitly welcome; every; dogs are explicitly welcome | MOYEN | verifier |
| brno | restaurants | SKØG Urban Hub | water bowl; every; Dogs are welcome | MOYEN | verifier |
| cadaques | attractions | Església de Santa Maria | interior assistance-dog; every; dogs are welcome | MOYEN | verifier |
| cap-ferret | restaurants | Cabane 24 | water bowl; all sizes; dogs of all sizes accepted | MOYEN | verifier |
| carcassonne | restaurants | Le Bar à Vins | water bowl; always; Dogs on leads are welcome | MOYEN | verifier |
| cassis | attractions | AOC Cassis Vineyards | since 1936; always; dogs are generally welcome | MOYEN | verifier |
| catania | attractions | Via Crociferi & Via dei Crociferi | interiors of the churches do not admit dogs; Always; dogs welcome | MOYEN | verifier |
| como | attractions | Passeggiata Lino Gelpi & Lakefront | water bowl; every; dogs welcome | MOYEN | verifier |
| dublin | restaurants | The Dropping Well | treat; always; Dogs welcome | MOYEN | verifier |
| dublin | restaurants | Grogans Castle Lounge | decades; every; Dogs are welcome | MOYEN | verifier |
| dunkerque | restaurants | Estaminet Flamand | dogs welcome at every table indoors; every; dogs welcome | MOYEN | verifier |
| dunkerque | attractions | Beffroi Saint-Éloi (UNESCO) | interior staircase admits only assistance dogs; every; dogs welcome | MOYEN | verifier |
| edinburgh | restaurants | Hula Juice Bar & Kitchen | Dogs are welcome on the terrace and inside; every; Dogs are welcome | MOYEN | verifier |
| edinburgh | attractions | Edinburgh Castle Esplanade | Dogs on lead welcome on the esplanade; not permitt; every; Dogs are welcome | MOYEN | verifier |
| evora | restaurants | Café Alentejo | water bowl; every; Dogs welcome | MOYEN | verifier |
| freiburg | attractions | Münsterplatz & cathedral exterior | Interior closed to dogs except assistance dogs; dogs welcome; 07:30 | MOYEN | verifier |
| galway | restaurants | Tigh Neachtain | dogs welcome inside; every; dogs welcome | MOYEN | verifier |
| gdansk | restaurants | Pierogarnia Mandu | Dogs welcome on the front courtyard year-round and; Dogs welcome; 12:00 | MOYEN | verifier |
| gdansk | restaurants | Cafe Józef K | water bowl; every; Dogs welcome | MOYEN | verifier |
| ghent | restaurants | 't Dreupelkot | dog often sleeps near the bar; leashed dogs welcom; never; dogs welcome | MOYEN | verifier |
| granada | restaurants | Bodegas Castañeda | since 1927; every; dogs are welcome | MOYEN | verifier |
| groningen | attractions | Martinikerkhof & Vismarkt squares | interior and the tower stairs admit assistance dog; every; dogs are welcome | MOYEN | verifier |
| karlovy-vary | restaurants | Café Elefant | Dogs welcome on the terrace; calm dogs usually acc; every; Dogs are welcome | MOYEN | verifier |
| keswick | restaurants | The Wainwright | treats; every; Dogs are welcome | MOYEN | verifier |
| lecce | restaurants | Quanto Basta | water bowl; every; Dogs welcome | MOYEN | verifier |
| lille | attractions | Vieux Lille | interior admits only assistance dogs; every; Dogs welcome | MOYEN | verifier |
| los-angeles | restaurants | Mendocino Farms Downtown | water bowl; Every; dogs welcome | MOYEN | verifier |
| luxembourg | restaurants | Glow - Meal by Meal | water bowl; Dogs welcome; 7:30 | MOYEN | verifier |
| malaga | attractions | Muelle Uno Port Promenade | Dogs welcome throughout the promenade; not permitt; every; Dogs welcome | MOYEN | verifier |
| marbella | restaurants | Rosas Café | water bowl; every; Dogs welcome | MOYEN | verifier |
| miami | restaurants | Bayside Hut | bowls; every; dogs are welcome | MOYEN | verifier |
| miami | attractions | Wynwood Walls outdoor murals | dogs in a carrier allowed inside; every; dogs in a carrier allowed | MOYEN | verifier |
| narbonne | restaurants | Brasserie Co Narbonne | water bowl; every; dogs are welcome | MOYEN | verifier |
| narbonne | attractions | Cathédrale Saint-Just-et-Saint-Pasteur | interior admits only assistance dogs; never; dogs welcome | MOYEN | verifier |
| new-york | restaurants | Westville Hudson | bowls; every; Dogs welcome | MOYEN | verifier |
| nimes | restaurants | La Locanda Comptoir Italien | water bowl; every; Dogs on leash welcome | MOYEN | verifier |
| padua | restaurants | Bar Nazionale | water bowl; Dogs on a lead are welcome; 18:00 | MOYEN | verifier |
| palamos | attractions | Sant Joan de Palamós casc antic & Esglesia parish church | interior assistance-dog; every; dogs welcome | MOYEN | verifier |
| pisa | restaurants | ArtBurger | dog-welcome policy: dogs join guests indoors; biscuit; dog-welcome | MOYEN | verifier |
| portland | restaurants | Tin Shed Garden Cafe | since 2002; every; Dogs are welcome | MOYEN | verifier |
| portland | attractions | Multnomah Falls | Dogs are not allowed inside; every; dogs are allowed | MOYEN | verifier |
| poznan | attractions | Stary Rynek (Old Market Square) | Dogs welcome on leash everywhere in the square; no; every; dogs are welcome | MOYEN | verifier |
| poznan | attractions | Ostrow Tumski (Cathedral Island) | interior admits assistance dogs; every; Dogs on leash are welcome | MOYEN | verifier |
| pula | restaurants | Konoba Batelina | interior is dog; every; dogs welcome | MOYEN | verifier |
| pula | attractions | Pula Arena (Roman Amphitheatre) | interior; the interior visit follows the small-dog; every; dogs are welcome | MOYEN | verifier |
| ravenna | restaurants | Ca' de Vèn | since 1975; all sizes; Dogs of all sizes are welcome | MOYEN | verifier |
| rennes | restaurants | Le Café du Théâtre | water bowl; every; dogs are welcome | MOYEN | verifier |
| rennes | attractions | Cathédrale Saint-Pierre de Rennes | Dogs on leash welcome around the cathedral; not ad; every; Dogs on leash welcome | MOYEN | verifier |
| rimini | restaurants | Ristorante Bar del Bagno 81 (Rimini Dog No Problem) | water bowl; No Problem; Dogs are not just allowed | MOYEN | verifier |
| salzburg | restaurants | Café Tomaselli | Dogs welcome inside; always; Dogs are welcome | MOYEN | verifier |
| sant-antoni | attractions | Sunset Strip & Cafe del Mar | since 1980; dogs welcome; 19:00 | MOYEN | verifier |
| sant-josep | restaurants | Restaurante El Carmen | water bowl; every; dogs welcome | MOYEN | verifier |
| sanxenxo | restaurants | Jungle Café | dogs of all sizes indoors; all sizes; Dogs of all sizes welcome | MOYEN | verifier |
| saturnia | restaurants | Bar Drink & Food Library / Trattoria la Stellata | explicitly welcome; bowl; Pets program, which explicitly welcome | MOYEN | verifier |
| saturnia | restaurants | Enoteca La Torre in Cantina | water bowl; any size; dogs of any size are welcome | MOYEN | verifier |
| scheveningen | restaurants | Solbeach | bowl; always; dogs are always welcome | MOYEN | verifier |
| sete | restaurants | The Marcel | water bowl; every; dogs are welcome | MOYEN | verifier |
| siena | attractions | 17 contrade contrada fountains and museums | interiors admit dogs; every; dogs welcome | MOYEN | verifier |
| sitges | attractions | Església de Sant Bartomeu i Santa Tecla | interior assistance-dog; every; dogs are welcome | MOYEN | verifier |
| stavanger | restaurants | Café Sting | water bowl; every; Dogs welcome | MOYEN | verifier |
| texel | restaurants | Paal 17 Strandpaviljoen | water bowl; every; Dogs are welcome | MOYEN | verifier |
| toledo | restaurants | Café del Fin | water bowl; every; Dogs welcome | MOYEN | verifier |
| torun | attractions | Rynek Staromiejski (Old Market Square) | interior admit assistance dogs; every; dogs are welcome | MOYEN | verifier |
| trento | attractions | Castello del Buonconsiglio gardens | Inside the museum itself only small dogs; any size; dogs of any size are welcome | MOYEN | verifier |
| trondheim | restaurants | Folk og Røvere | water bowl; every; Dogs welcome | MOYEN | verifier |
| uppsala | restaurants | Storgatan Pizzeria | water bowl; every; Dogs on a lead are welcome | MOYEN | verifier |
| valencia | restaurants | El Federal Café | interior tolerates small dogs; every; Dogs welcome | MOYEN | verifier |
| valencia | restaurants | Bar Ricardo | Dogs always welcome inside; always; Dogs always welcome | MOYEN | verifier |
| vannes | attractions | Cathédrale Saint-Pierre | interior assistance dogs; every; dogs welcome | MOYEN | verifier |
| verona | attractions | Casa di Giulietta | Dogs are not permitted inside; always; dogs are welcome | MOYEN | verifier |
| warsaw | restaurants | Kufle i Kapsle | interior also accepts well-behaved dogs; every; Dogs welcome | MOYEN | verifier |
| windermere | attractions | Windermere Lake Cruises | water bowl; every; dogs welcome | MOYEN | verifier |
| wroclaw | attractions | Ostrów Tumski | interior itself is not dog; every; Dogs on leash are welcome | MOYEN | verifier |
| york | restaurants | Brew & Brownie | Dogs are welcomed on the front terrace and inside; Dogs are welcome; 11:00 | MOYEN | verifier |
| a-coruna | attractions | Torre de Hércules (UNESCO) | interior does not admit dogs (assistance dogs; Dogs on lead are welcome | MOYEN | verifier |
| a-coruna | attractions | Castillo de San Antón | interior does not admit dogs (assistance dogs; Dogs on lead are welcome | MOYEN | verifier |
| aarhus | restaurants | Aarhus Street Food | water bowl; dogs welcome | MOYEN | verifier |
| aarhus | attractions | Den Gamle By (Old Town outdoor section) | Dogs are not allowed inside; Dogs are not allowed | MOYEN | verifier |
| abu-dhabi | restaurants | The Lighthouse | bowls; dogs are welcome | MOYEN | verifier |
| aix-en-provence | restaurants | Bistrot Rotonde | water bowl; Dogs are welcome | MOYEN | verifier |
| aix-les-bains | attractions | Abbaye de Hautecombe (lake cruise) | dogs accepted on the boat (small supplement); not ; Dogs are accepted | MOYEN | verifier |
| ajaccio | restaurants | U Pampasgiolu | water bowl; dogs welcome | MOYEN | verifier |
| ajaccio | attractions | Citadelle Miollis & Boulevard Danièle Casanova | Interior visits are guided-only and exclude dogs; dogs welcome | MOYEN | verifier |
| alcudia | restaurants | Bodega d'es Port | water bowl; dogs are welcome | MOYEN | verifier |
| alcudia | attractions | Casc antic, Plaça de la Constitució & Mercat (Tue+Thu) | water bowl; dogs are welcome | MOYEN | verifier |
| alicante | restaurants | Nou Manolín | since 1971; Dogs welcome | MOYEN | verifier |
| alicante | restaurants | Cervecería Sento | inside, but the small outdoor counter welcomes lea; Dogs welcome | MOYEN | verifier |
| amsterdam | attractions | Jordaan & Nine Streets (De Negen Straatjes) | decades; Dogs welcome | MOYEN | verifier |
| angers | attractions | Château de Brissac | interior is reserved for guided tours where dogs; dogs are welcome | MOYEN | verifier |
| annecy | restaurants | L'Étage | Dogs on terrace; inside; Dogs welcome | MOYEN | verifier |
| antibes | restaurants | Le Brûlot | since 1971; Dogs on leash welcome | MOYEN | verifier |
| antibes | restaurants | Le Vauban | water bowl; Dogs on leash welcome | MOYEN | verifier |
| antwerp | restaurants | Café Beveren | Dogs welcome inside; Dogs are absolutely welcome | MOYEN | verifier |
| antwerp | attractions | Het Eilandje and MAS Exterior | Dogs are not allowed inside; Dogs are not allowed | MOYEN | verifier |
| arcachon | restaurants | Le Bistrot des Halles | water bowl; Dogs welcome | MOYEN | verifier |
| arles | restaurants | Le Café Van Gogh | water bowl; Dogs on leash welcome | MOYEN | verifier |
| arles | attractions | Exterior of the Arènes (Amphithéâtre romain) | dogs (other than guide and assistance dogs) are NO; every | MOYEN | verifier |
| asheville | restaurants | Highland Brewing Company | water bowl; dogs welcome | MOYEN | verifier |
| asheville | attractions | North Carolina Arboretum | inside buildings and the bonsai garden; no pets; dogs welcome | MOYEN | verifier |
| athens | restaurants | Café Avissinia | decades; Dogs welcome | MOYEN | verifier |
| auckland | restaurants | Good George North Wharf | water bowl; Dogs are welcome | MOYEN | verifier |
| avignon | restaurants | La Mirande | Dogs welcome on the cobbled front terrace year-rou; Dogs welcome | MOYEN | verifier |
| bad-ischl | restaurants | k.u.k. Hofwirt zu Ischl | explicitly welcome; pets are explicitly welcome | MOYEN | verifier |
| bakewell | restaurants | The Wheatsheaf Pub & Pantry | treat; Dogs are genuinely welcome | MOYEN | verifier |
| bakewell | restaurants | The Woodyard | dogs are welcomed both inside; dogs are welcome | MOYEN | verifier |
| barcelona | restaurants | Bar del Pla | water bowl; Dogs are welcome | MOYEN | verifier |
| barcelona | attractions | Park Güell - Exterior Gardens | dogs are NOT allowed inside; dogs are NOT allowed | MOYEN | verifier |
| bari | restaurants | Terranima | water bowl; Dogs welcome | MOYEN | verifier |
| basel | restaurants | St. Alban-Stübli | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| basel | attractions | Basel Münster & Pfalz Terrace | Inside the Münster, only assistance dogs; Dogs on leash are welcome | MOYEN | verifier |
| bath | restaurants | The Raven of Bath | interior has a relaxed pub-with-dogs; Dogs are welcome | MOYEN | verifier |
| bath | attractions | Bath Abbey Churchyard | interior admits only registered service dogs; dogs are welcome | MOYEN | verifier |
| bayonne | restaurants | Restaurant Le Loreak | Dogs accepted indoors; Dogs accepted | MOYEN | verifier |
| bayonne | attractions | Halles de Bayonne (covered market) | Dogs are not permitted inside; pets; surrounding terrace cafés welcome | MOYEN | verifier |
| bayreuth | restaurants | Liebesbier | water bowl; dogs are expressly welcome | MOYEN | verifier |
| begur | restaurants | L`Hostal de Sa Tuna | dogs welcome on the seafront terrace; indoor dinin; dogs welcome | MOYEN | verifier |
| begur | restaurants | Restaurant Es Dofí | dogs welcome on the seafront terrace under awnings; dogs welcome | MOYEN | verifier |
| belgrade | restaurants | Mama Shelter Restaurant | treats; Dogs welcome | MOYEN | verifier |
| belgrade | restaurants | Iguana | water bowl; Dogs are welcome | MOYEN | verifier |
| belgrade | attractions | Kalemegdan Fortress | dogs only inside; Dogs on leash are welcome | MOYEN | verifier |
| bellagio | attractions | Basilica di San Giacomo | dogs welcome on the square; not inside; dogs welcome | MOYEN | verifier |
| bergamo | attractions | Cittadella & Rocca di Bergamo | interior houses the Risorgimento museum (no dogs; Dogs on leash welcome | MOYEN | verifier |
| bergen | restaurants | Bryggeloftet & Stuene | inside the UNESCO Bryggen wharf, wooden floors, lo; Dogs welcome | MOYEN | verifier |
| bergen | attractions | Fish Market (Fisketorget) | scraps; dogs welcome | MOYEN | verifier |
| berlin | restaurants | Café Morgenrot | Dogs are welcome both inside; Dogs are welcome | MOYEN | verifier |
| berlin | restaurants | Roamers | bowls; Dogs are welcome | MOYEN | verifier |
| bern | restaurants | Altes Tramdepot | Dogs on lead are welcomed on the terrace year-roun; Dogs on lead are welcome | MOYEN | verifier |
| bern | attractions | Altstadt, Lauben & Zytglogge | Dogs on leash welcome throughout streets; not insi; Dogs on lead are welcome | MOYEN | verifier |
| beziers | restaurants | Le Pourquoi Pas | treats; dogs are welcome | MOYEN | verifier |
| beziers | attractions | Cathédrale Saint-Nazaire-et-Saint-Celse | interior admits only assistance dogs; dogs welcome | MOYEN | verifier |
| beziers | attractions | Pont Vieux and Saint-Aphrodise old town | since 1986; dogs welcome | MOYEN | verifier |
| biarritz | restaurants | Halles de Biarritz | water bowl; Dogs welcome | MOYEN | verifier |
| bilbao | restaurants | Happy River Bilbao | dog sizes welcome inside; dog sizes welcome | MOYEN | verifier |
| bled | restaurants | Gostilna Pri Planincu | water bowl; Dogs welcome | MOYEN | verifier |
| bled | restaurants | Ostarija Peglez'n | water bowl; Dogs welcome | MOYEN | verifier |
| bled | restaurants | Vila Prešeren | Dogs welcome on the lakeside terrace, not in the i; dogs are welcome | MOYEN | verifier |
| bled | attractions | Bled Castle (Blejski grad) | Dogs are not permitted inside; dogs welcome | MOYEN | verifier |
| bled | attractions | Bled Island & Pilgrimage Church of the Assumption (Blejski otok) | Dogs are not admitted inside; Dogs are accepted | MOYEN | verifier |
| bologna | attractions | Portico di San Luca | since 2021; Dogs on leads are welcome | MOYEN | verifier |
| bolzano | restaurants | Zur Kaiserkron | water bowl; Dogs are welcome | MOYEN | verifier |
| bolzano | restaurants | Hopfen & Co. | dogs; the upstairs dining room; Dogs welcome | MOYEN | verifier |
| bolzano | attractions | Castel Roncolo / Schloss Runkelstein | interior fresco rooms admit only small dogs; Dogs on leash welcome | MOYEN | verifier |
| bonn | attractions | Bonner Münster (exterior) | interior is closed to dogs; Dogs not allowed inside; welcome | MOYEN | verifier |
| bordeaux | restaurants | Bar à Vin CIVB | water bowl; Dogs welcome | MOYEN | verifier |
| bordeaux | restaurants | La Cave du Chai des Chartrons | Dogs welcome on terrace and inside; Dogs welcome | MOYEN | verifier |
| bordeaux | attractions | Cité du Vin Exterior Grounds | Dogs are not permitted inside; dogs are generally welcome | MOYEN | verifier |
| boston | restaurants | The Lower Depths Tap Room (Kenmore) | Water bowl; dogs welcome | MOYEN | verifier |
| boston | restaurants | Trillium Brewing Fort Point | Water bowl; dogs welcome | MOYEN | verifier |
| boston | attractions | Freedom Trail (full 4 km, Boston Common to USS Constitution) | inside historic buildings; all other dogs; dogs welcome | MOYEN | verifier |
| boulogne-sur-mer | restaurants | La Matelote | dining room admits only assistance dogs; dogs welcome | MOYEN | verifier |
| boulogne-sur-mer | attractions | Cathédrale Notre-Dame de Boulogne | interior and crypt admit only assistance dogs; dogs welcome | MOYEN | verifier |
| boulogne-sur-mer | attractions | Château-Musée de Boulogne | interior admits only assistance dogs; dogs welcome | MOYEN | verifier |
| boulogne-sur-mer | attractions | Nausicaá seafront facade and port de pêche | Dogs are NOT admitted inside; dogs welcome | MOYEN | verifier |
| bournemouth | restaurants | The Goat & Tricycle | water bowl; Dogs welcome | MOYEN | verifier |
| bournemouth | restaurants | The Larder House | Dogs welcome in the bar area and garden; not in th; Dogs welcome | MOYEN | verifier |
| bourton-on-the-water | restaurants | The Old New Inn | snack; Dogs are very welcome | MOYEN | verifier |
| bourton-on-the-water | restaurants | Bakery on the Water | indoors and a delightful riverside terrace where d; dogs are welcome | MOYEN | verifier |
| braga | restaurants | Cozinha da Sé | water bowl; Dogs welcome | MOYEN | verifier |
| brasov | restaurants | Casa Tâmpa | dining room is reserved for guests without pets; Dogs on lead welcome | MOYEN | verifier |
| brasov | attractions | Biserica Neagră (Black Church) exterior & courtyard | interior, with its 16th-century Ottoman carpet; Dogs on lead welcome | MOYEN | verifier |
| brasov | attractions | Bran Castle gardens (day trip) | interior pet; Dogs on lead welcome | MOYEN | verifier |
| bratislava | restaurants | The Red Lion Pub | dog-friendly inside; Dogs welcome | MOYEN | verifier |
| bratislava | attractions | Bratislava Old Town squares | water bowl; Dogs on leash are welcome | MOYEN | verifier |
| bregenz | restaurants | YachtHotel Helvetia | explicitly allow; Dogs allowed | MOYEN | verifier |
| bremen | attractions | Schnoor Quarter | water bowl; dogs welcome | MOYEN | verifier |
| brest | attractions | Tour Tanguy | interior reserved for assistance dogs; dogs welcome | MOYEN | verifier |
| brest | attractions | Château de Brest Exterior and Ramparts | interior assistance dogs; dogs welcome | MOYEN | verifier |
| brighton | restaurants | Rockwater Hove | treat; Dogs are welcome | MOYEN | verifier |
| brighton | attractions | The Lanes & North Laine | water bowl; Dogs welcome | MOYEN | verifier |
| bristol | restaurants | The Cloak and Dagger | treats; every | MOYEN | verifier |
| bristol | restaurants | The Apple | since 2003; Dogs are welcome | MOYEN | verifier |
| bruges | restaurants | De Republiek | dogs welcome inside; dogs welcome | MOYEN | verifier |
| bruges | attractions | Markt and Belfort Exterior | interior tower climb (366 steps) admits assistance; dogs welcome | MOYEN | verifier |
| bruges | attractions | Burg Square and Heilig Bloed Basiliek Exterior | interior admits assistance dogs; dogs welcome | MOYEN | verifier |
| brussels | restaurants | Brasserie de la Senne | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| brussels | restaurants | Le Berger | interior and pavement terrace both welcome dogs; Dogs welcome | MOYEN | verifier |
| bucharest | restaurants | Energiea | Dogs join guests indoors; Dogs welcome | MOYEN | verifier |
| bucharest | attractions | Village Museum (Muzeul Satului) | interiors admit only assistance dogs; Dogs on leash are welcome | MOYEN | verifier |
| budva | restaurants | Forsage Gastro Lounge | since 1991; dogs have been welcome | MOYEN | verifier |
| cadaques | restaurants | Compartir | since 2012; Dogs welcome | MOYEN | verifier |
| cadiz | restaurants | Saja River | Dogs are allowed both inside; Dogs are allowed | MOYEN | verifier |
| caen | restaurants | Café Mancel | Dogs welcome on full terrace; bar area only inside; Dogs welcome | MOYEN | verifier |
| caen | attractions | Château de Caen (outdoor enclosure) | inside are closed to dogs; dogs welcome | MOYEN | verifier |
| cagliari | restaurants | Sa Domu Sarda | since 1968; dogs welcome | MOYEN | verifier |
| cagliari | restaurants | Framento | water bowl; dogs welcome | MOYEN | verifier |
| calais | restaurants | Le Channel | dining room admits only assistance dogs; dogs are welcome | MOYEN | verifier |
| cambridge | restaurants | The Eagle | water bowl; Dogs welcome | MOYEN | verifier |
| cambridge | restaurants | Fitzbillies | since 1920; Dogs are welcome | MOYEN | verifier |
| cannes | restaurants | La Brouette de Grand-Mère | water bowl; Dogs welcome | MOYEN | verifier |
| cap-ferret | restaurants | Le Port d'Attache | Dogs welcome, terrace and indoors; Dogs are welcome | MOYEN | verifier |
| capri | restaurants | Da Gelsomina | water bowl; Dogs welcome | MOYEN | verifier |
| capri | restaurants | Le Arcate | since 1972; dogs welcome | MOYEN | verifier |
| capri | attractions | Villa San Michele | Dogs on leash in gardens; not inside; Dogs on leash welcome in the gardens; not allowed | MOYEN | verifier |
| cardiff | restaurants | Cosy Club Cardiff Bay | bowls; Dogs are welcome | MOYEN | verifier |
| cardiff | attractions | Cardiff Castle grounds | dogs only inside; Dogs on a lead are welcome | MOYEN | verifier |
| cardiff | attractions | Caerphilly Castle | water bowl; Dogs on a short lead are welcome | MOYEN | verifier |
| cartagena | attractions | Muralla Púnica | dogs only inside; dogs welcome | MOYEN | verifier |
| cascais | restaurants | Taberna da Praça | dogs welcome on the terrace; small dogs allowed in; dogs welcome on the terrace; small dogs allowed | MOYEN | verifier |
| cassis | restaurants | La Presqu'île | explicitly welcome; Dog owners are explicitly welcome | MOYEN | verifier |
| cassis | attractions | Cap Canaille & Route des Crêtes | since 2024; Dogs on a leash are welcome | MOYEN | verifier |
| catania | restaurants | Me Cumpari Turiddu | water bowl; dogs are welcome | MOYEN | verifier |
| catania | attractions | Piazza del Duomo | interior is not open to dogs; dogs welcome | MOYEN | verifier |
| cefalu | attractions | Cefalù Cathedral (Duomo, Norman Cathedral) | Dogs not allowed inside; Dogs not allowed inside; welcome | MOYEN | verifier |
| cesky-krumlov | restaurants | Krčma v Šatlavské | Water bowl; dogs welcome | MOYEN | verifier |
| chania | restaurants | To Maridaki | since 1996; Dogs welcome | MOYEN | verifier |
| chania | attractions | Firkas Fortress | dog-accessible; the small Maritime Museum inside; Dogs welcome | MOYEN | verifier |
| chania | attractions | Municipal Market (Agora) 1913 | dogs inside; Dogs not allowed | MOYEN | verifier |
| chicago | restaurants | Kaiser Tiger (West Loop) | Water bowl; dogs welcome | MOYEN | verifier |
| ciutadella | restaurants | Café Balear | water bowl; Dogs are welcome | MOYEN | verifier |
| ciutadella | attractions | Castell de Sant Nicolau lighthouse | interior is a small free museum, closed to dogs; Dogs on a leash are welcome | MOYEN | verifier |
| coimbra | attractions | Sé Velha (Old Cathedral) | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| colmar | restaurants | Café de la Lauch | Dogs welcome, indoors; Dogs are accepted | MOYEN | verifier |
| colmar | restaurants | Le Fer Rouge | explicitly welcome; Dogs welcome | MOYEN | verifier |
| cologne | attractions | Cologne Cathedral Exterior & Surroundings | Dogs are not admitted inside; dogs are welcome | MOYEN | verifier |
| como | restaurants | Osteria del Gallo | dogs welcome inside the small dining room; dogs welcome | MOYEN | verifier |
| como | restaurants | Ristorante Sociale | dogs welcome in the main dining room; dogs welcome | MOYEN | verifier |
| como | restaurants | Bar Caffè Rivetta | water bowl; dogs welcome | MOYEN | verifier |
| como | attractions | Villa del Balbianello (Tremezzina) | interior is off-limits to pets; dogs welcome | MOYEN | verifier |
| conwy | restaurants | Cantîn | treats; Dogs warmly welcome | MOYEN | verifier |
| conwy | attractions | Conwy Castle (from the quay) | Pet dogs are not admitted inside; dogs only inside the castle; pet dogs welcome | MOYEN | verifier |
| copenhagen | restaurants | Grød | bowls; Dogs welcome | MOYEN | verifier |
| cordoba | restaurants | Bodegas Mezquita Céspedes | Dogs welcome on patio; small dogs inside; dogs are welcome | MOYEN | verifier |
| cordoba | attractions | Roman Bridge & Mezquita Exterior | since 2008; dogs are welcome | MOYEN | verifier |
| corfu | restaurants | Rouvas | since 1954; dogs welcome | MOYEN | verifier |
| cork | restaurants | The Franciscan Well Brewpub | water bowl; dogs welcome | MOYEN | verifier |
| cork | restaurants | The Cornstore Cork | dogs welcome on the riverside outdoor terrace; not; dogs welcome | MOYEN | verifier |
| cork | attractions | Saint Fin Barre's Cathedral grounds | dogs welcome in the outdoor close and gardens; not; dogs welcome | MOYEN | verifier |
| delft | attractions | Oude Delft canal walk & Oostpoort | interior assistance dogs; dogs welcome | MOYEN | verifier |
| denver | restaurants | Improper City | dogs are not allowed inside; dogs are not allowed | MOYEN | verifier |
| denver | restaurants | Lowry Beer Garden | dogs are welcome in the outdoor garden, not indoor; dogs are welcome | MOYEN | verifier |
| dubai | restaurants | Reform Social & Grill | Water bowl; dogs are welcome | MOYEN | verifier |
| dubai | restaurants | Bridgewater Tavern (Cafe Artois terrace) | treats; dogs are welcome | MOYEN | verifier |
| dublin | restaurants | The Bernard Shaw | Dogs welcome in beer garden and often indoors; Dogs welcome | MOYEN | verifier |
| dublin | restaurants | Two Boys Brew | bowls; Dogs are welcome | MOYEN | verifier |
| dunkerque | restaurants | L'Estouffade | dining room admits only assistance dogs; dogs welcome | MOYEN | verifier |
| dunkerque | attractions | Mémorial du Souvenir / Mémorial Operation Dynamo | interior assistance dogs; dogs welcome | MOYEN | verifier |
| dunkerque | attractions | Musée Portuaire and Duchesse Anne sail-ship | interiors admit only assistance dogs; dogs welcome | MOYEN | verifier |
| dusseldorf | restaurants | Brauerei Schumacher Stammhaus | Dogs welcome inside; Dogs are welcome | MOYEN | verifier |
| edinburgh | restaurants | The Stockbridge Tap | biscuit; Dogs are welcome | MOYEN | verifier |
| edinburgh | restaurants | The Elm | Water bowl; Dogs are welcome | MOYEN | verifier |
| ericeira | restaurants | Mar à Vista | dogs accepted in the dining room; dogs welcome | MOYEN | verifier |
| ericeira | restaurants | Tik Tok Rice & Fish | dogs welcome on the pavement terrace; small dogs a; dogs welcome | MOYEN | verifier |
| essaouira | restaurants | Taros Café | since 1993; Dogs welcome | MOYEN | verifier |
| evora | restaurants | Tasquinha do Oliveira | Dogs welcomed on the front pavement terrace year-r; Dogs welcome | MOYEN | verifier |
| falmouth | restaurants | IndiDog | treats; Dogs are welcome | MOYEN | verifier |
| falmouth | attractions | Pendennis Castle | dogs on leads are welcome throughout, including in; dogs on leads are welcome | MOYEN | verifier |
| faro | restaurants | Vila Adentro | Dogs welcome on the cobblestone front terrace year; Dogs welcome | MOYEN | verifier |
| faro | restaurants | Tertúlia Algarvia | Dogs welcome throughout the front terrace year-rou; Dogs welcome | MOYEN | verifier |
| feldkirchen-in-karnten | attractions | Stift Ossiach - Cistercian Abbey | interior is dogs; Dogs are welcome | MOYEN | verifier |
| formentera | restaurants | Es Molí de Sal | water bowl; dogs are welcome | MOYEN | verifier |
| frankfurt | restaurants | Atschel | Dogs welcome on terrace and inside; Dogs welcome | MOYEN | verifier |
| frankfurt | restaurants | Fichtekränzi | Dogs welcome in courtyard and inside; Dogs welcome | MOYEN | verifier |
| freiburg | restaurants | Hausbrauerei Feierling | water bowl; dogs welcome | MOYEN | verifier |
| freiburg | restaurants | Großer Meyerhof | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| freiburg | restaurants | Schlappen | dogs welcome inside; dogs welcome | MOYEN | verifier |
| frejus | attractions | Arènes de Fréjus (Roman amphitheatre) | dogs on a leash are admitted inside; Dogs welcome | MOYEN | verifier |
| frejus | attractions | Vieille Ville and Place Formigé | interior and cloister are not dog; Dogs on leash welcome | MOYEN | verifier |
| fuengirola | restaurants | Chiringuito La Mar Salá | water bowl; dogs are welcome | MOYEN | verifier |
| fuengirola | restaurants | Chiringuito Botavara Playa | treat; Dogs welcome | MOYEN | verifier |
| fuerteventura | attractions | Betancuria | dogs welcome in the streets and viewpoints (not in; dogs welcome | MOYEN | verifier |
| fuerteventura | attractions | Faro del Tostón (El Cotillo) | dogs welcome on the headland and paths; not inside; dogs are welcome | MOYEN | verifier |
| funchal | restaurants | Hortênsia Gardens Tea House | bowls; dogs welcome | MOYEN | verifier |
| galway | restaurants | The Salthouse | water bowl; every | MOYEN | verifier |
| gandia | attractions | Palau Ducal dels Borja (old town surroundings) | Dogs welcome in the surrounding old-town streets; ; Dogs welcome | MOYEN | verifier |
| gdansk | restaurants | Brovarnia Gdańsk | Dogs welcome on the riverside terrace year-round, ; Dogs welcome | MOYEN | verifier |
| gdynia | attractions | Skwer Kosciuszki and South Pier (museum ships) | Dogs welcome on the entire square and pier exterio; Dogs welcome | MOYEN | verifier |
| geneva | restaurants | Café du Soleil | Dogs welcome on terrace year-round; inside; Dogs are welcome | MOYEN | verifier |
| geneva | attractions | Vieille-Ville et Cathédrale Saint-Pierre | Dogs on leash welcome in streets and squares; not ; Dogs on lead are welcome | MOYEN | verifier |
| genoa | restaurants | Xena Cucina di Sintesi | Dogs on lead are accepted at all tables (terrace a; Dogs on lead are accepted | MOYEN | verifier |
| ghent | restaurants | Het Vosken | dog; leashed dogs are genuinely welcome inside; dog; leashed dogs are genuinely welcome | MOYEN | verifier |
| ghent | attractions | Korenmarkt and Belfort Exterior | interior climb admits assistance dogs; dogs welcome | MOYEN | verifier |
| girona | attractions | El Call & Catedral steps | interiors are off-limits to dogs; every | MOYEN | verifier |
| glasgow | restaurants | The Clutha Bar | treats; Dogs welcome | MOYEN | verifier |
| glasgow | attractions | Glasgow Necropolis | treat; Dogs on leash are welcome | MOYEN | verifier |
| gothenburg | restaurants | Café Husaren | Dogs are welcomed both inside; Dogs are welcome | MOYEN | verifier |
| gozo | attractions | Ggantija Temples (surroundings) | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| gozo | attractions | Ta' Pinu Basilica (grounds) | Dogs are not allowed inside; Dogs are not allowed | MOYEN | verifier |
| gran-canaria | attractions | Faro de Maspalomas & dune boardwalks | Dogs are not allowed inside; Dogs are not allowed | MOYEN | verifier |
| granada | attractions | Alhambra | Dogs are NOT allowed inside; Dogs are NOT allowed | MOYEN | verifier |
| graz | restaurants | Glöckl Bräu | dogs welcome indoors; dogs welcome | MOYEN | verifier |
| groningen | attractions | Hoge der A canal & Akerk walk | interior is closed except for concerts (assistance; dogs welcome | MOYEN | verifier |
| groningen | attractions | Prinsentuin Renaissance garden & Academiegebouw | interior admits leashed dogs; tea pavilion interio; dogs are welcome | MOYEN | verifier |
| guimaraes | restaurants | Histórico by Papaboa | water bowl; dogs welcome | MOYEN | verifier |
| guimaraes | restaurants | Cor de Tangerina | water bowl; dogs welcome | MOYEN | verifier |
| guimaraes | attractions | Castelo de Guimarães | interior, where the small museum lives, is closed ; dogs welcome | MOYEN | verifier |
| guimaraes | attractions | Paço dos Duques de Bragança | interior assistance dogs; dogs welcome | MOYEN | verifier |
| guimaraes | attractions | Largo da Oliveira and Padrão do Salado | interior assistance dogs; dogs welcome | MOYEN | verifier |
| haarlem | restaurants | Restaurant ML by Mark Gratama | dog at booking; the indoor dining room; Dogs welcome | MOYEN | verifier |
| hallstatt | restaurants | Gasthof Simony | water bowl; dogs are warmly welcome | MOYEN | verifier |
| hallstatt | attractions | Hallstatt Charnel House (Beinhaus) | interior asks dogs; dogs welcome | MOYEN | verifier |
| hamburg | restaurants | Bodo's Bootssteg | water bowl; dogs are welcome | MOYEN | verifier |
| hannover | restaurants | Broyhan-Haus | interior accepts smaller dogs; dogs are welcome | MOYEN | verifier |
| heidelberg | restaurants | Schnitzelbank | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| heidelberg | restaurants | Café Knösel | Dogs welcome on the cobbled front terrace year-rou; Dogs welcome | MOYEN | verifier |
| helsinki | restaurants | Kaffa Roastery | Dogs welcome on terrace, tolerated inside; Dogs welcome | MOYEN | verifier |
| heraklion | restaurants | Karavitis | since 1960; Dogs welcome | MOYEN | verifier |
| heraklion | attractions | Koules Fortress | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| heraklion | attractions | Cathedral of Saint Minas | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| heviz | restaurants | Liget Royal Restaurant | explicitly welcome; Dogs are explicitly welcome | MOYEN | verifier |
| heviz | restaurants | Hofbräu Vendéglő (Sörsarok) | water bowl; Dogs welcome | MOYEN | verifier |
| hvar | restaurants | Konoba Bonj Hvar | Water bowl; dogs welcome | MOYEN | verifier |
| hvar | attractions | Saint Stephen`s Square, Cathedral & Arsenal | interior follow the small-dog; dogs are welcome | MOYEN | verifier |
| hvar | attractions | Franciscan Monastery & Harbour Cliffside | interior follows the small-dog; dogs are welcome | MOYEN | verifier |
| hvar | attractions | Stari Grad UNESCO Historic Centre | interiors follow small-dog; dogs welcome | MOYEN | verifier |
| ibiza | restaurants | Ca n'Alfredo | water bowl; Dogs welcome | MOYEN | verifier |
| ibiza | restaurants | S'Escalinata | water bowl; Dogs are welcome | MOYEN | verifier |
| ile-de-re | restaurants | Marché de La Flotte | water bowl; Dogs welcome | MOYEN | verifier |
| innsbruck | restaurants | Stiftskeller Innsbruck | dog-tolerant inside; Dogs welcome | MOYEN | verifier |
| interlaken | attractions | Beatushöhlen (St. Beatus Caves) | dogs welcome inside; dogs are welcome | MOYEN | verifier |
| interlaken | attractions | Schynige Platte Alpine Garden | since 1927; dogs welcome | MOYEN | verifier |
| inverness | attractions | Clava Cairns | treat; dogs are welcome | MOYEN | verifier |
| inverness | attractions | Loch Ness by Jacobite (dog-friendly cruise) | dogs per sailing, with both open deck and inside; dogs are welcome | MOYEN | verifier |
| ischia | attractions | Giardini Poseidon Terme | dogs are not allowed inside; dogs are not allowed | MOYEN | verifier |
| karlovy-vary | restaurants | Restaurace Pod Kaštanem | Dogs allowed inside; Dogs allowed | MOYEN | verifier |
| kaunas | restaurants | Vero Cafe Laisvės alėja | dogs accepted inside; dogs are welcome | MOYEN | verifier |
| keswick | restaurants | The Swinside Inn | water bowl; Dogs welcome | MOYEN | verifier |
| kitzbuehel | restaurants | Eggerwirt Restaurant | pet-friendly across hotel and dining room; Pet-friendly house; dogs welcome | MOYEN | verifier |
| klagenfurt | restaurants | Gasthaus im Landhauskeller | dogs welcome inside; dogs welcome | MOYEN | verifier |
| klagenfurt | restaurants | Maria Loretto Schloss-Restaurant | water bowl; Dogs welcome | MOYEN | verifier |
| klaipeda | attractions | Klaipeda Castle ruins | dogs at no charge; the small Castle Museum inside; dogs welcome | MOYEN | verifier |
| kolobrzeg | attractions | Latarnia Morska (Kolobrzeg Lighthouse) | interior stairs to the top are impractical for dog; Dogs welcome | MOYEN | verifier |
| kotor | attractions | Perast waterfront & Old Town | dogs welcome along the promenade and on cafe terra; dog is welcome | MOYEN | verifier |
| krakow | restaurants | Alchemia | interior accepts well-behaved dogs; Dogs are welcome | MOYEN | verifier |
| krakow | restaurants | Café Camelot | dog-friendly on its small terrace and occasionally; Dogs welcome | MOYEN | verifier |
| kyoto | attractions | Philosopher's Path (Tetsugaku-no-michi) | dogs inside; dog is welcome | MOYEN | verifier |
| la-rochelle | restaurants | Marché Central | water bowl; Dogs welcome | MOYEN | verifier |
| la-rochelle | restaurants | Terrasses du Vieux Port | water bowl; Dogs welcome | MOYEN | verifier |
| la-spezia | attractions | Castello San Giorgio | Dogs allowed on a leash on the outdoor terraces; n; Dogs allowed | MOYEN | verifier |
| lagos | restaurants | Casinha do Petisco | water bowl; dogs welcome | MOYEN | verifier |
| lagos | attractions | Old Town walls & Forte da Ponta da Bandeira | interior houses a small museum that allows only as; dogs welcome | MOYEN | verifier |
| lagos | attractions | Praça do Infante and Mercado de Escravos site | interior assistance dogs; dogs welcome | MOYEN | verifier |
| larnaca | restaurants | Tavernaki 13 | dogs also allowed inside; Dogs are welcome | MOYEN | verifier |
| las-palmas | restaurants | Casa Fataga | explicitly welcome; Dogs are explicitly welcome | MOYEN | verifier |
| las-palmas | restaurants | Fresquito Archipiélago | dogs both on the terrace and inside the dining roo; Dogs welcome | MOYEN | verifier |
| lausanne | restaurants | Café du Grütli | water bowl; Dogs are welcome | MOYEN | verifier |
| lecce | restaurants | Caffè Alvino | water bowl; Dogs welcome | MOYEN | verifier |
| leiden | attractions | Rapenburg canal & Pieterskerk square | interior assistance dogs; Dogs are welcome | MOYEN | verifier |
| leiden | attractions | Molen De Valk & Plantage park | interior admits only assistance dogs; dogs welcome | MOYEN | verifier |
| leipzig | restaurants | Kaffeehaus Riquet | water bowl; Dogs welcome | MOYEN | verifier |
| leuven | restaurants | De Hoorn | dogs welcome on the canal-side terrace and inside; dogs welcome | MOYEN | verifier |
| leuven | attractions | Stadhuis and Grote Markt | interior tour admits assistance dogs; dogs welcome | MOYEN | verifier |
| leuven | attractions | Groot Begijnhof Leuven (UNESCO) | interior admits assistance dogs; dogs welcome | MOYEN | verifier |
| liepaja | restaurants | Beach Cafe Mermaid (Nakras kafejnica) | water bowl; Dogs welcome | MOYEN | verifier |
| liepaja | attractions | Karosta Prison Museum (exterior) | dogs are not admitted inside; every | MOYEN | verifier |
| lignano-sabbiadoro | attractions | Terrazza a Mare | dog inside; Dogs welcome | MOYEN | verifier |
| limassol | attractions | Old Town & Limassol Castle Square | interior itself does not admit dogs; dogs are welcome | MOYEN | verifier |
| liverpool | restaurants | The Belvedere Arms | water bowl; Dogs are welcome | MOYEN | verifier |
| liverpool | attractions | Liverpool Cathedral grounds & St James's Cemetery | interior admits only assistance dogs; Dogs welcome | MOYEN | verifier |
| locarno | restaurants | Grotto Broggini | water bowl; dogs are welcome | MOYEN | verifier |
| london | restaurants | Los Mochis Notting Hill | water bowl; Dogs are welcome | MOYEN | verifier |
| los-angeles | attractions | Getty Center exterior gardens | interior galleries are off-limits to non-service d; dogs welcome | MOYEN | verifier |
| lucca | restaurants | Trattoria da Leo | since 1955; Dogs welcome | MOYEN | verifier |
| lucca | attractions | Cattedrale di San Martino | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| lucerne | restaurants | Brasserie Bodu | dogs welcome on the terrace and in the dining room; dogs welcome | MOYEN | verifier |
| lucerne | restaurants | Restaurant Wirtshaus Galliker | dogs welcome inside; dogs welcome | MOYEN | verifier |
| lugano | restaurants | Grotto della Salute | water bowl; dogs are welcome | MOYEN | verifier |
| lugano | restaurants | Bottegone del Vino | interior bar accepts well-behaved leashed dogs; dogs welcome | MOYEN | verifier |
| luxembourg | attractions | Place d'Armes & Grand Ducal Palace exterior | interior admits only assistance dogs; Dogs on leash are welcome | MOYEN | verifier |
| lyon | restaurants | Le Café des Fédérations | since 1929; dogs are accepted | MOYEN | verifier |
| maastricht | restaurants | Café Forum | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| maastricht | restaurants | Coffeelovers Dominicanen | water bowl; Dogs welcome | MOYEN | verifier |
| madrid | restaurants | El Jardín de El Paular | water bowl; Dogs welcome | MOYEN | verifier |
| madrid | restaurants | Taberna La Bola | bowl; every | MOYEN | verifier |
| madrid | restaurants | Café Comercial | Inside, well-behaved small dogs; dogs are welcome | MOYEN | verifier |
| madrid | restaurants | La Musa de Espronceda | explicitly welcome; Dogs are explicitly welcome | MOYEN | verifier |
| madrid | attractions | Templo de Debod and Parque de la Montaña | dogs inside; Dogs on leash welcome | MOYEN | verifier |
| mahon | restaurants | Es Molí de Foc | since 1995; Dogs welcome | MOYEN | verifier |
| mahon | restaurants | Jàgaro | water bowl; Dogs are welcome | MOYEN | verifier |
| makarska | attractions | Kačić Square & St Mark's Church | Dogs cannot go inside; Dogs welcome | MOYEN | verifier |
| makarska | attractions | Franciscan Monastery & seafront grounds | Dogs cannot go inside; Dogs welcome | MOYEN | verifier |
| malaga | restaurants | El Tintero | decades; Dogs welcome | MOYEN | verifier |
| malaga | restaurants | Café Central | since 1925; Dogs welcome | MOYEN | verifier |
| malaga | restaurants | La Deriva Soho | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| malmo | restaurants | Café Jesusbaren | dogs on a lead are welcomed inside; dogs on a lead are welcome | MOYEN | verifier |
| malmo | restaurants | Uggla Kaffebar | dogs are welcome both inside; dogs are welcome | MOYEN | verifier |
| malmo | attractions | Malmöhus Slottspark | interior houses Moderna Museet and is closed to do; Dogs welcome | MOYEN | verifier |
| manchester | restaurants | The Counter House | Dogs are welcomed on the terrace and inside; Dogs are welcome | MOYEN | verifier |
| manchester | attractions | Castlefield Basin | Bowl; Dogs on leash are welcome | MOYEN | verifier |
| marbella | restaurants | BREATHE Marbella | bowls; dogs welcome | MOYEN | verifier |
| marbella | restaurants | Luuma Beach | water bowl; dogs are welcome | MOYEN | verifier |
| marrakech | restaurants | Grand Café de la Poste | since 1925; Dogs welcome | MOYEN | verifier |
| marseille | restaurants | The Roof Kitchen | explicitly welcome; Dogs explicitly welcome | MOYEN | verifier |
| matera | restaurants | Trattoria Lucana | dogs welcome on Via Lucana pavement extension and ; dogs welcome | MOYEN | verifier |
| menton | restaurants | Mirazur | treat; dogs are accepted | MOYEN | verifier |
| menton | attractions | Vieille Ville & Basilique Saint-Michel-Archange | interior does not admit dogs; dogs are welcome | MOYEN | verifier |
| miami | attractions | Lincoln Road pedestrian mall | water bowl; dogs are welcome | MOYEN | verifier |
| milan | restaurants | Il Baretto al Baglioni | treat; dogs are genuinely welcome | MOYEN | verifier |
| modena | restaurants | Trattoria Aldina | since 1956; dogs accepted | MOYEN | verifier |
| modena | attractions | Piazza Grande & Duomo | since 1997; dogs welcome | MOYEN | verifier |
| modena | attractions | Torre della Ghirlandina | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| modena | attractions | Museo Casa Enzo Ferrari | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| monte-carlo | restaurants | Le Bar Américain | dogs are welcome both on the terrace and inside; dogs are welcome | MOYEN | verifier |
| monte-carlo | attractions | Le Rocher (Monaco-Ville) | dogs welcome on the streets and Palace square; not; dogs are welcome | MOYEN | verifier |
| montpellier | restaurants | Bonobo Brunch | Dogs welcome inside; dogs are accepted | MOYEN | verifier |
| montreal | restaurants | Café Maison Pawz | Dogs come inside; Dogs welcome | MOYEN | verifier |
| montreal | restaurants | 4 Origines Microbrasserie | water bowl; dogs are welcome | MOYEN | verifier |
| montreux | restaurants | Brasserie J5 | water bowl; Dogs are welcome | MOYEN | verifier |
| montreux | restaurants | Caveau des Vignerons de Chexbres | Dogs on leads are welcome at the terrace and insid; Dogs on leads are welcome | MOYEN | verifier |
| montreux | restaurants | Café du Grütli Montreux | Dogs are welcomed inside; Dogs are welcome | MOYEN | verifier |
| montreux | attractions | Château de Chillon | dogs welcome in outdoor courtyards and gardens, no; dogs welcome | MOYEN | verifier |
| munich | restaurants | Café Münchner Freiheit | treat; Dogs are welcome | MOYEN | verifier |
| munich | attractions | Nymphenburg Palace & Gardens | interior does not admit dogs; Dogs on a leash are welcome | MOYEN | verifier |
| nantes | attractions | Les Machines de l'Île | Dogs on leash welcome on outdoor esplanade; not pe; Dogs on leash welcome | MOYEN | verifier |
| nantes | attractions | Château des Ducs de Bretagne | inside is not accessible to dogs; Dogs on leash welcome | MOYEN | verifier |
| naples | restaurants | L'Antica Pizzeria da Michele | interior is too small for dogs; dogs are welcome | MOYEN | verifier |
| naples | restaurants | Sorbillo Lievito Madre al Mare | water bowl; Dogs welcome | MOYEN | verifier |
| naples | attractions | Lungomare Caracciolo | since 2012; every | MOYEN | verifier |
| narbonne | restaurants | Le Petit Comptoir | treats; dogs are welcome | MOYEN | verifier |
| nazare | restaurants | A Tasquinha | dogs accepted in the back dining room; dogs welcome | MOYEN | verifier |
| nazare | restaurants | Restaurante Rosa dos Ventos | interior table by the door for very small dogs; dogs welcome | MOYEN | verifier |
| neringa | restaurants | Tik pas Jona | for 20 years; dogs welcome | MOYEN | verifier |
| neringa | attractions | Thomas Mann House (garden) | interior bans dogs; Dogs welcome | MOYEN | verifier |
| nerja | restaurants | La Bottega Nerja | dogs may come inside; dogs are welcome | MOYEN | verifier |
| nerja | attractions | Cuevas de Nerja | Dogs are not allowed inside; Dogs are not allowed | MOYEN | verifier |
| new-york | restaurants | Boris & Horton | dogs are welcome to join you indoors; dogs are welcome | MOYEN | verifier |
| new-york | restaurants | Bark Hot Dogs | water bowl; Dogs are welcome | MOYEN | verifier |
| new-york | attractions | The High Line | water bowl; dogs are welcome | MOYEN | verifier |
| newquay | restaurants | The Fort Inn | water bowl; Dogs welcome | MOYEN | verifier |
| newquay | restaurants | Red Lion Newquay | treat; dogs are welcome | MOYEN | verifier |
| nice | restaurants | L'Acchiardo | since 1927; Dogs are accepted | MOYEN | verifier |
| nuremberg | restaurants | Bratwursthäusle bei St. Sebald | water bowl; Dogs welcome | MOYEN | verifier |
| nuremberg | restaurants | Gasthaus Behringer | dogs welcome indoors; dogs welcome | MOYEN | verifier |
| nuremberg | attractions | Albrecht Dürer's House | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| olbia | attractions | Basilica di San Simplicio | dogs are not taken inside; Dogs welcome | MOYEN | verifier |
| oropesa-del-mar | restaurants | Restaurante El Faro | water bowl; Dogs are welcome | MOYEN | verifier |
| oropesa-del-mar | attractions | Castillo de Oropesa | interior museum has limited dog; Dogs are welcome | MOYEN | verifier |
| orvieto | restaurants | Ristorante Al San Giovenale | any size; owners are know; Dogs of any size welcome | MOYEN | verifier |
| oslo | restaurants | Mathallen Oslo - Outdoor Terrace | Dogs are not permitted inside; Dogs welcome | MOYEN | verifier |
| oslo | restaurants | Kafé Fuglen | interior itself has been known to welcome well-beh; Dogs welcome | MOYEN | verifier |
| oslo | restaurants | Grünerløkka Brygghus | Dogs are welcome both inside; Dogs are welcome | MOYEN | verifier |
| ostend | restaurants | Brasserie du Parc | Dogs welcome inside; dogs welcome | MOYEN | verifier |
| ostend | restaurants | De Kombuis | dogs welcome inside; dogs welcome | MOYEN | verifier |
| ostend | attractions | Albert I-promenade and Kursaal Exterior | interior (gaming hall and concert hall) admits ass; dogs welcome | MOYEN | verifier |
| ostend | attractions | Visserskaai and Mercator Three-Master | interior admits assistance dogs; dogs welcome | MOYEN | verifier |
| oviedo | restaurants | Sidrería Tierra Astur Gascona | Water bowl; Dogs welcome | MOYEN | verifier |
| oviedo | restaurants | Sidrería La Pumarada | Water bowl; Dogs welcome | MOYEN | verifier |
| oviedo | attractions | Catedral de San Salvador & Plaza de Alfonso II | interior, Cámara Santa and cloister admit assistan; Dogs on lead are welcome | MOYEN | verifier |
| oviedo | attractions | Santa María del Naranco & San Miguel de Lillo | interiors admit assistance dogs; Dogs on lead are welcome | MOYEN | verifier |
| oxford | restaurants | The Kings Arms | snack; dogs are welcome | MOYEN | verifier |
| oxford | restaurants | The Head of the River | water bowl; Dogs are welcome | MOYEN | verifier |
| padstow | restaurants | The Old Custom House Inn | water bowl; dogs on leads are welcome | MOYEN | verifier |
| padua | restaurants | Enoteca dei Tadi | Dogs on a lead are welcome at the small terrace an; Dogs on a lead are welcome | MOYEN | verifier |
| padua | attractions | Basilica di Sant'Antonio (Il Santo) Piazza | Dogs are not allowed inside; Dogs are not allowed | MOYEN | verifier |
| palamos | restaurants | La Gamba | dogs welcome on the harbour-front terrace; indoor ; dogs welcome | MOYEN | verifier |
| palamos | restaurants | Restaurant La Salinera | dogs welcome on the seafront terrace; indoor dinin; dogs welcome | MOYEN | verifier |
| palamos | attractions | Port de Palamós & Llotja fish auction quay | interior of the Llotja auction hall is closed to d; dogs welcome | MOYEN | verifier |
| palermo | restaurants | Trattoria ai Cascinari | since 1916; dogs welcome | MOYEN | verifier |
| palermo | attractions | Palermo Cathedral | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| palma | restaurants | Can Eduardo | since 1942; Dogs are welcome | MOYEN | verifier |
| palma | attractions | Passeig des Born | explicitly welcome; Dogs on a leash are welcome | MOYEN | verifier |
| palma | attractions | La Seu Cathedral (exterior) | Dogs are not permitted inside; Dogs on leash welcome | MOYEN | verifier |
| pamplona | restaurants | Bodegón Sarría | since 1962; dogs welcome | MOYEN | verifier |
| pamplona | attractions | Citadel of Pamplona (Ciudadela) | dogs welcome on lead, fenced off-leash zone inside; dogs welcome | MOYEN | verifier |
| pamplona | attractions | Cathedral of Pamplona (Santa María la Real) | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| pamplona | attractions | Plaza de Toros (Bullring) | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| paris | restaurants | Le Progrès | Dogs are a fixture here, both inside; Dogs welcome | MOYEN | verifier |
| paris | restaurants | Chez Prune | Dogs welcome on canal terrace; dogs tolerated insi; dog will feel more welcome | MOYEN | verifier |
| paris | restaurants | Aux Deux Amis | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| paris | attractions | Notre-Dame de Paris, Parvis and Exterior | Dogs on lead welcome on the parvis and exterior; n; Dogs on lead welcome | MOYEN | verifier |
| paris | attractions | Montmartre and Sacré-Cœur, Exterior and Village Streets | dogs inside; Dogs on lead welcome | MOYEN | verifier |
| paros | attractions | Panagia Ekatontapiliani | interior, with its early-Christian baptistery, is ; Dogs welcome | MOYEN | verifier |
| peniche | restaurants | Mar & Sol Beach Bar | snack; dogs welcome | MOYEN | verifier |
| peniche | attractions | Fortaleza de Peniche | interior museum has restricted dog; Dogs are welcome | MOYEN | verifier |
| perth | restaurants | Little Creatures Brewery Fremantle | Dogs are not seated inside; dogs are welcome | MOYEN | verifier |
| perth | restaurants | Odyssea City Beach | dogs are admitted inside; dogs are welcome | MOYEN | verifier |
| piran | restaurants | Pri Mari | water bowl; Dogs welcome | MOYEN | verifier |
| pisa | restaurants | Ginger Lab La Cucina | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| pisa | attractions | Piazza dei Miracoli (exterior) | dogs only inside; dogs welcome | MOYEN | verifier |
| portland | restaurants | Breakside Brewery, Slabtown | Dogs are not admitted to the indoor dining room; dogs are welcome | MOYEN | verifier |
| portland | attractions | Pittock Mansion grounds | pets are permitted inside; Pets are allowed | MOYEN | verifier |
| porto | attractions | Parque de Serralves | Dogs welcome in park grounds on leash; not permitt; Dogs are allowed | MOYEN | verifier |
| portoroz | attractions | Piran Old Town | interiors do not admit dogs; Dogs welcome | MOYEN | verifier |
| portoroz | attractions | Portorož Spa Promenade | dog-free indoors; dogs welcome | MOYEN | verifier |
| prague | restaurants | Kavárna Místo | dogs are welcomed on the terrace and inside; dogs are welcome | MOYEN | verifier |
| prague | restaurants | Lokál Blok | Dogs welcome in beer garden (summer) and inside; Dogs are welcome | MOYEN | verifier |
| prague | attractions | Prague Castle (Hradčany), Outdoor Areas | interior require a ticket and do not allow dogs; Dogs on leash welcome | MOYEN | verifier |
| prague | attractions | Vyšehrad | inside the fortifications is excellent for dogs; Dogs on leash welcome | MOYEN | verifier |
| pula | restaurants | Jupiter Pizzeria | water bowl; Dogs welcome | MOYEN | verifier |
| pula | restaurants | Kantina Pula | interior is small and best skipped for the dog; dogs welcome | MOYEN | verifier |
| quimper | attractions | Vieux Quimper et cathédrale Saint-Corentin | interior is closed to dogs; Dogs welcome | MOYEN | verifier |
| regensburg | restaurants | Historische Wurstkuchl | water bowl; Dogs welcome | MOYEN | verifier |
| regensburg | restaurants | Spitalgarten | water bowl; Dogs welcome | MOYEN | verifier |
| regensburg | restaurants | Brauerei zum Hofbräuhaus Regensburg | dogs welcome inside; dogs welcome | MOYEN | verifier |
| regensburg | attractions | Steinerne Brücke | since 2008; Dogs welcome | MOYEN | verifier |
| reims | restaurants | Cafe du Palais | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| rennes | restaurants | Crêperie Saint-Georges | water bowl; Dogs are welcome | MOYEN | verifier |
| rennes | restaurants | Le Café Breton | water bowl; Dogs welcome | MOYEN | verifier |
| rethymno | restaurants | Cavo D'Oro | since 1988; dogs welcome | MOYEN | verifier |
| reykjavik | restaurants | Kaffivagninn | since 1935; Dogs welcome | MOYEN | verifier |
| rhodes | attractions | Medieval Old Town of Rhodes | dogs welcome in the open streets; not inside; dogs welcome | MOYEN | verifier |
| riga | restaurants | Zefīrs | Dogs welcome both inside; Dogs welcome | MOYEN | verifier |
| riga | restaurants | Ezītis miglā | Dogs and their people are accepted, both inside; Dogs and their people are accepted | MOYEN | verifier |
| ronda | restaurants | Taberna El Almacén | dog guides list it as welcoming pets both indoors; Dogs welcome | MOYEN | verifier |
| roses | restaurants | Die Insel | dogs welcome on the pavement terrace; indoor dinin; dogs welcome | MOYEN | verifier |
| roses | attractions | Ciutadella de Roses | interior museum building assistance-dog; dogs welcome | MOYEN | verifier |
| roses | attractions | Castell de la Trinitat & Punta Falconera headland | interior at the gatekeeper`s discretion (assistanc; guaranteed | MOYEN | verifier |
| rotterdam | restaurants | Wester Paviljoen | dogs are routinely welcomed on the terrace and oft; dogs are routinely welcome | MOYEN | verifier |
| rouen | attractions | Cathédrale Notre-Dame de Rouen | Dogs are not admitted inside; Dogs not admitted inside; welcome | MOYEN | verifier |
| rovinj | restaurants | Konoba Veli Jože | water bowl; dogs are welcome | MOYEN | verifier |
| rovinj | restaurants | Maestral | water bowl; Dogs welcome | MOYEN | verifier |
| rovinj | attractions | Crkva sv. Eufemije & Belltower | interior is small-dog; dogs welcome | MOYEN | verifier |
| rovinj | attractions | Balbi Arch & Grisia Street | since 1967; dogs welcome | MOYEN | verifier |
| rugen | restaurants | Oma's Küche & Quartier | Dogs welcome inside; Dogs are expressly welcome | MOYEN | verifier |
| rugen | restaurants | Strandhalle Binz | water bowl; dogs are welcome | MOYEN | verifier |
| rugen | restaurants | Zum Skipper | Dogs welcome inside; Dogs are welcome | MOYEN | verifier |
| saint-jean-de-luz | restaurants | Kaia Ostatua | water bowl; Dogs are genuinely welcome | MOYEN | verifier |
| saint-malo | restaurants | Deux Degrés Ouest | inside the walled town that explicitly states it w; Dogs welcome | MOYEN | verifier |
| saint-malo | restaurants | Les Chiens du Guet | inside the ramparts whose very name nods to the hi; Dogs welcome | MOYEN | verifier |
| saint-tropez | restaurants | Sénéquier | treat; Dogs on leash welcome | MOYEN | verifier |
| saint-tropez | restaurants | Le Girelier | since 1953; dogs are welcome | MOYEN | verifier |
| saint-tropez | restaurants | La Plage des Jumeaux | water bowl; Dogs on leash welcome | MOYEN | verifier |
| salamanca | restaurants | La Hoja 21 | dogs accepted at the bar area; not in the main din; dogs accepted | MOYEN | verifier |
| salamanca | attractions | Catedral Nueva & Vieja | Dogs not allowed inside; Dogs not allowed | MOYEN | verifier |
| salcombe | attractions | Salcombe Harbour and Whitestrand | water bowl; Dogs on a lead are welcome | MOYEN | verifier |
| san-diego | attractions | Balboa Park Gardens & El Prado | dog parks sit inside; dogs are welcome | MOYEN | verifier |
| san-francisco | restaurants | Park Tavern (Washington Square) | dining room itself is service-animal only but the ; dogs welcome | MOYEN | verifier |
| sankt-polten | restaurants | Steinerne Stiege | treats; dogs welcome | MOYEN | verifier |
| sankt-polten | attractions | Klangturm and Government Quarter | interiors assistance dogs; dogs welcome | MOYEN | verifier |
| sanremo | restaurants | Ristorante Da Nicò. Trattoria del Porto | since 1935; dogs generally welcome | MOYEN | verifier |
| sant-antoni | restaurants | Es Tragon | water bowl; dogs welcome | MOYEN | verifier |
| sant-josep | restaurants | Es Boldado | water bowl; dogs welcome | MOYEN | verifier |
| santander | restaurants | Bodega Cigaleña | water bowl; Dogs are welcome | MOYEN | verifier |
| santander | restaurants | La Bombi | since 1956; Dogs welcome | MOYEN | verifier |
| santander | restaurants | El Machi | since 1947; Dogs welcome | MOYEN | verifier |
| santander | attractions | Centro Botín & Jardines de Pereda | interior galleries do not admit dogs (assistance d; Dogs on lead are welcome | MOYEN | verifier |
| santander | attractions | Faro de Cabo Mayor & Clifftop Trail | inside does not admit dogs; Dogs on lead are welcome | MOYEN | verifier |
| santander | attractions | Catedral de Santander & Plaza Porticada | interior and crypt do not admit dogs; Dogs on lead are welcome | MOYEN | verifier |
| santiago-de-compostela | restaurants | O Sendeiro | Dogs are welcome on the courtyard terrace and in a; Dogs are welcome | MOYEN | verifier |
| santiago-de-compostela | attractions | Mercado de Abastos | Inside the hygiene-restricted fish hall, dogs; Dogs on leads are welcome | MOYEN | verifier |
| santiago-de-compostela | attractions | Cidade da Cultura de Galicia (Monte Gaiás) | Interior buildings (museum, library) do not admit ; dogs welcome | MOYEN | verifier |
| santorini | restaurants | Metaxi Mas | since 2003; dogs welcome | MOYEN | verifier |
| santorini | restaurants | Selene | since 1986; dogs welcome | MOYEN | verifier |
| sanxenxo | restaurants | Restaurante Cany Playa | indoors, with dogs; dogs welcome | MOYEN | verifier |
| scheveningen | restaurants | Strandtent 't Puntje | water bowl; Dogs are warmly welcome | MOYEN | verifier |
| seattle | restaurants | Chuck's Hop Shop Greenwood | Dogs are welcome both inside; Dogs are welcome | MOYEN | verifier |
| sesimbra | attractions | Cabo Espichel & Santuário de Nossa Senhora do Cabo Espichel | interiors as off-limits since no official pet; treat; official | MOYEN | verifier |
| sete | restaurants | La Coquerie | dogs are welcome on the terrace; the indoor dining; dogs are welcome | MOYEN | verifier |
| sete | restaurants | Le Petit Sète | treats; dogs are welcome | MOYEN | verifier |
| sete | attractions | Mont Saint-Clair and Notre-Dame de la Salette | interior assistance dogs; dogs welcome | MOYEN | verifier |
| setubal | restaurants | Tasca da Fatinha | water bowl; dogs are welcome | MOYEN | verifier |
| setubal | attractions | Forte de São Filipe | interior is closed to non-assistance dogs; dogs welcome | MOYEN | verifier |
| setubal | attractions | Igreja de Jesus and Praça Miguel Bombarda | interior admits only assistance dogs; dogs welcome | MOYEN | verifier |
| seville | attractions | Torre del Oro Riverside Walk | interior does not admit dogs; Dogs on leash welcome | MOYEN | verifier |
| sibenik | restaurants | Bistro More | water bowl; Dogs welcome | MOYEN | verifier |
| siena | restaurants | Enoteca I Terzi | dogs welcome on the cobbled pavement extension and; dogs welcome | MOYEN | verifier |
| sintra | restaurants | Tascantiga Sintra | water bowl; dogs welcome | MOYEN | verifier |
| sintra | restaurants | Cantinho Gourmet de São Pedro | dogs welcome on terrace and inside; dogs welcome | MOYEN | verifier |
| sintra | attractions | Palácio Nacional da Pena (exterior + park) | interior is restricted to assistance dogs; dogs welcome | MOYEN | verifier |
| sitges | restaurants | Beach House Sitges | water bowl; Dogs welcome | MOYEN | verifier |
| sliema | restaurants | The Black Sheep drink & dine | water bowl; dogs are welcome | MOYEN | verifier |
| sofia | restaurants | Raffy Bar & Gelato | Water bowl; Dogs welcome | MOYEN | verifier |
| sorrento | restaurants | Ristorante Bagni Delfino | since 1924; dogs welcome | MOYEN | verifier |
| st-moritz | restaurants | Hatecke (Engadin Deli & Wine) | since 1916; dogs are welcome | MOYEN | verifier |
| stavanger | restaurants | Bøker og Børst | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| stavanger | restaurants | Renaa Restauranter | dining room admits assistance dogs; Dogs welcome | MOYEN | verifier |
| stockholm | restaurants | Rosendals Trädgård | water bowl; Dogs welcome | MOYEN | verifier |
| strasbourg | restaurants | Mama Bubbele | Dogs welcome inside; Dogs are welcome | MOYEN | verifier |
| stuttgart | restaurants | Carls Brauhaus | Dogs welcome inside; dogs are welcome | MOYEN | verifier |
| swinoujscie | restaurants | Cafe & Restaurant Amsterdam | water bowl; Dogs welcome | MOYEN | verifier |
| swinoujscie | attractions | Latarnia Morska (Swinoujscie Lighthouse) | interior tower climb is impractical with most dogs; Dogs welcome | MOYEN | verifier |
| swinoujscie | attractions | Promenada do Ahlbeck (Usedom border promenade) | since 2023; Dogs welcome | MOYEN | verifier |
| sydney | restaurants | The Grounds of Alexandria | Dogs welcome in the gardens, terrace and Potting S; Dogs are welcome | MOYEN | verifier |
| syracuse | restaurants | Il Veliero | bowl; dogs are welcome | MOYEN | verifier |
| tampere | restaurants | Pyynikin Näkötornin Kahvila | Dogs welcome on the wraparound terrace year-round ; Dogs welcome | MOYEN | verifier |
| taormina | restaurants | Osteria Nero D'Avola | dogs year-round; the small indoor dining room; dogs welcome | MOYEN | verifier |
| taormina | restaurants | Trattoria Da Nino - Mazzaro | since 1962; dogs welcome | MOYEN | verifier |
| tarifa | restaurants | Café Azul | bowls; dogs are welcome | MOYEN | verifier |
| tarifa | restaurants | Surla Café | bowls; Dogs are welcome | MOYEN | verifier |
| tarifa | attractions | Conjunto Arqueológico de Baelo Claudia | Dogs are not allowed inside; Dogs are not allowed | MOYEN | verifier |
| tarragona | restaurants | Pletòric | dogs at lunch and dinner; the dining room; dogs welcome | MOYEN | verifier |
| tarragona | restaurants | The Lotus Bistro | water bowl; Dogs welcome | MOYEN | verifier |
| tarragona | attractions | Roman Amphitheatre (Amfiteatre Romà) | interior is closed to non-assistance dogs; dogs are welcome | MOYEN | verifier |
| tavira | restaurants | Aquasul | water bowl; dogs welcome | MOYEN | verifier |
| tavira | restaurants | Restaurante Avenida | water bowl; dogs welcome | MOYEN | verifier |
| tavira | attractions | Ponte Romana over Rio Gilão | since 2016; dogs welcome | MOYEN | verifier |
| tavira | attractions | Castelo de Tavira and Igreja de Santa Maria do Castelo | interior and gardens are dog; dogs welcome | MOYEN | verifier |
| tavira | attractions | Praça da República and Núcleo Islâmico | interior assistance dogs; dogs welcome | MOYEN | verifier |
| texel | restaurants | Brouwerij & Proeflokaal Texel | since 1999; Dogs are welcome | MOYEN | verifier |
| texel | restaurants | Restaurant Bij Jef | dog at booking; the indoor dining room; Dogs welcome | MOYEN | verifier |
| texel | attractions | Den Burg market square & 1517 Hervormde Kerk | interior admits assistance dogs; dogs welcome | MOYEN | verifier |
| the-hague | restaurants | Wine Bar Lemongrass | dogs are welcomed both outside and inside; dogs are welcome | MOYEN | verifier |
| the-hague | restaurants | Vigo Seafoodbar | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| the-hague | restaurants | Hoender en Hop | interior where dogs; Dogs welcome | MOYEN | verifier |
| thessaloniki | restaurants | Meze Bar en Plo | water bowl; Dogs are welcome | MOYEN | verifier |
| thessaloniki | attractions | White Tower | interior museum (7 floors, €8 entry) does not perm; Dogs are welcome | MOYEN | verifier |
| tirano | attractions | Basilica di Madonna di Tirano | interior requires your dog; Dogs welcome | MOYEN | verifier |
| torun | restaurants | Pierogarnia Stary Mlyn | Dogs welcome inside; Dogs on leash are welcome | MOYEN | verifier |
| torun | attractions | Leaning Tower of Torun (Krzywa Wieza) | interior houses a cafe and admits assistance dogs; Dogs welcome | MOYEN | verifier |
| tossa-de-mar | restaurants | La Cuina de Can Simon | dogs welcome on the outdoor slate terrace; indoor ; dogs welcome | MOYEN | verifier |
| tossa-de-mar | attractions | Vila Vella & Castell de Tossa de Mar | interior assistance-dog; dogs welcome | MOYEN | verifier |
| toulon | restaurants | Le M5 | bowls; Dogs on leash welcome | MOYEN | verifier |
| toulon | attractions | Quai Cronstadt + Place de la Liberté circuit | interior bans dogs; dogs welcome | MOYEN | verifier |
| toulouse | restaurants | Les 4 Z'Arts | water bowl; Dogs welcome | MOYEN | verifier |
| tours | restaurants | Le Vieux Murier | water bowl; dogs welcome | MOYEN | verifier |
| tours | attractions | Cathédrale Saint-Gatien | interior does not admit dogs; any size | MOYEN | verifier |
| tours | attractions | Château de Villandry Gardens | dogs welcome in 9 ha of gardens; small dogs in bag; dogs are welcome | MOYEN | verifier |
| trapani | attractions | Torre di Ligny | dogs cannot enter the small museum inside; Dogs welcome | MOYEN | verifier |
| trento | restaurants | Trattoria Dal Boccia | bowls; all sizes | MOYEN | verifier |
| treviso | restaurants | Habanero Mex Treviso | water bowl; Dogs welcome | MOYEN | verifier |
| trieste | attractions | Castello di Miramare | Dogs are not admitted inside; Dogs on leash welcome | MOYEN | verifier |
| trogir | restaurants | Konoba Toma | since 2002; dogs are welcome | MOYEN | verifier |
| trogir | restaurants | Caffe Bar Smokvica | inside, so keep your dog; Dogs welcome | MOYEN | verifier |
| trogir | attractions | Trogir Old Town & Cathedral Square | interior and bell tower do not admit pets; Dogs on leash welcome | MOYEN | verifier |
| tromso | attractions | Arctic Cathedral (Ishavskatedralen) Exterior | dogs allowed inside; dogs allowed | MOYEN | verifier |
| trondheim | restaurants | Baklandet Skydsstation | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| turin | restaurants | Caffè Al Bicerin | interior doesn't admit dogs but the portico tables; Dogs welcome | MOYEN | verifier |
| turin | restaurants | Affini Via Belfiore | water bowl; Dogs welcome | MOYEN | verifier |
| turin | attractions | Basilica di Superga | interior itself does not admit pets; dogs are welcome | MOYEN | verifier |
| uppsala | attractions | Uppsala Domkyrka | interior of the cathedral is dog-free except for s; dogs welcome on all outdoor paths; not allowed | MOYEN | verifier |
| utrecht | restaurants | Gys Voorstraat | Dogs are welcomed at the sidewalk tables and insid; Dogs are welcome | MOYEN | verifier |
| utrecht | restaurants | Dagger Coffee | Dogs are welcome on the sidewalk and inside; Dogs are welcome | MOYEN | verifier |
| valbona | restaurants | Guesthouse Marku | dining room; dogs; Dogs welcome | MOYEN | verifier |
| valencia | restaurants | Canalla Bistro by Ricard Camarena | bowls; Dogs are welcome | MOYEN | verifier |
| valencia | restaurants | Bodega Casa Montaña | decades; Dogs welcome | MOYEN | verifier |
| valencia | restaurants | La Fusteria | interior courtyard is entirely dog; Dogs welcome | MOYEN | verifier |
| valldemossa | restaurants | Ca'n Mario | water bowl; Dogs are welcome | MOYEN | verifier |
| valletta | attractions | Mdina, the Silent City | interiors of churches and museums admit only assis; dogs on leash are welcome | MOYEN | verifier |
| vancouver | restaurants | Bridges Restaurant | dogs welcome on the outdoor waterfront patio, not ; dogs welcome | MOYEN | verifier |
| vancouver | attractions | Granville Island | Dogs cannot go inside; dogs welcome | MOYEN | verifier |
| venice | restaurants | Cantina Do Spade | treat; Dogs welcome | MOYEN | verifier |
| venice | attractions | Murano Island | dogs indoors; Dogs on-leash welcome | MOYEN | verifier |
| vichy | restaurants | Restaurant Joséphine | since 1987; dogs welcome | MOYEN | verifier |
| vienna | restaurants | Café Landtmann | dogs accepted inside; Dogs are welcome | MOYEN | verifier |
| vienna | attractions | Schönbrunn Palace Gardens | Dogs on a leash are welcome throughout the gardens; Dogs on a leash are welcome | MOYEN | verifier |
| vigo | restaurants | Othilio Bar | Water bowl; Dogs welcome | MOYEN | verifier |
| vigo | restaurants | A Cabana do Polbo | bowls; dogs welcome | MOYEN | verifier |
| vigo | restaurants | Bagos Gastronomía | Dogs are welcome on the terrace and in the bar are; Dogs are welcome | MOYEN | verifier |
| vigo | attractions | Casco Vello | interior does not admit pets (assistance dogs; 20:30 | MOYEN | verifier |
| villach | restaurants | Gasthof Brauhof Villach | water bowl; dogs welcome | MOYEN | verifier |
| villach | restaurants | Restaurant Lagana | dogs welcome on terrace; well-behaved dogs accepte; dogs welcome on terrace; well-behaved dogs accepte | MOYEN | verifier |
| villach | attractions | Villach Stadtpfarrkirche Sankt Jakob | interior reserved for assistance dogs; Dogs welcome | MOYEN | verifier |
| villefranche-sur-mer | restaurants | La Mère Germaine | water bowl; dogs are welcome | MOYEN | verifier |
| villefranche-sur-mer | restaurants | L'Aparté | Dogs on leash welcome outside; small well-mannered; Dogs on leash welcome | MOYEN | verifier |
| villefranche-sur-mer | attractions | Chapelle Saint-Pierre des Pêcheurs (Cocteau, exterior) | interior does not admit dogs; dogs are welcome | MOYEN | verifier |
| villefranche-sur-mer | attractions | Villa Ephrussi de Rothschild (gardens, Cap Ferrat) | Dogs on leash welcome in the gardens and terraces;; dogs are welcome | MOYEN | verifier |
| vilnius | restaurants | The House Gastropub | Dogs are welcomed indoors; Dogs are welcome | MOYEN | verifier |
| vilnius | attractions | Cathedral Square & Gediminas Hill | interior, the museum, and the funicular admit only; Dogs on leash are welcome | MOYEN | verifier |
| vilnius | attractions | Užupis Republic | Dogs welcome on leash; many cafés and shops admit ; Dogs welcome | MOYEN | verifier |
| vitoria-gasteiz | restaurants | Bar Erkiaga | dogs welcome inside; dogs welcome | MOYEN | verifier |
| vitoria-gasteiz | restaurants | El Toloño (Plaza Virgen Blanca) | water bowl; dogs welcome | MOYEN | verifier |
| vitoria-gasteiz | attractions | Catedral de Santa María (exterior & Plaza Burullería) | interior is visitable only by guided tour with adv; pets not allowed | MOYEN | verifier |
| warsaw | restaurants | Piwna 47 | snack; dogs are welcome | MOYEN | verifier |
| whitby | restaurants | The Black Horse Inn | bowl; dogs are genuinely welcome | MOYEN | verifier |
| whitby | restaurants | Humble Pie 'n' Mash | Dogs welcome inside; Dogs welcome | MOYEN | verifier |
| windermere | restaurants | The Flying Pig | water bowl; Dogs welcome | MOYEN | verifier |
| windermere | restaurants | The Boathouse | dogs welcome inside; dogs welcome | MOYEN | verifier |
| windermere | attractions | Wray Castle (National Trust) | interior may restrict dogs; Dogs on leads are welcome | MOYEN | verifier |
| woolacombe | restaurants | The Red Barn | water bowl; Dogs very welcome | MOYEN | verifier |
| wroclaw | restaurants | Bułka z Masłem | Dogs welcome inside; Dogs are welcome | MOYEN | verifier |
| wroclaw | attractions | Hala Stulecia (Centennial Hall) | interior of the hall is not dog; Dogs welcome | MOYEN | verifier |
| yokohama | attractions | Yokohama Red Brick Warehouse (outdoor plaza) | interior shops and halls are indoor spaces where p; pets are generally not allowed | MOYEN | verifier |
| york | restaurants | The Blue Bell | biscuit; Dogs are welcome | MOYEN | verifier |
| york | attractions | Castle Howard Estate | dogs free of charge to ticketed guests; assistance; Dogs on-leash welcome | MOYEN | verifier |
| zadar | restaurants | Pet Bunara Dine & Wine | since 1981; Dogs are welcome | MOYEN | verifier |
| zadar | restaurants | Konoba Skoblar | bowl; dogs are welcome | MOYEN | verifier |
| zadar | attractions | Roman Forum & Church of St Donatus | dogs in carrier inside; dogs welcome | MOYEN | verifier |
| zagreb | restaurants | Cheese Bar | water bowl; pet owners for its warm welcome | MOYEN | verifier |
| zagreb | restaurants | Mali Bar | water bowl; Dogs welcome | MOYEN | verifier |
| zakynthos | restaurants | Taverna Akrotiri | since 1983; dogs welcome | MOYEN | verifier |
| zakynthos | restaurants | Dennis Taverna | since 1976; dogs welcome | MOYEN | verifier |
| zandvoort | restaurants | Year-round strandtenten (beach pavilions) | water bowl; Dogs on the lead welcome | MOYEN | verifier |
| zaragoza | restaurants | Sophia Bistró | treat; Dogs welcome | MOYEN | verifier |
| zaragoza | restaurants | Burukuca Café | Dogs welcome inside; Dogs are welcome | MOYEN | verifier |
| zermatt | restaurants | Restaurant Schäferstube (Hotel Julen) | dining room accepts leashed dogs; dogs welcome | MOYEN | verifier |
| zurich | restaurants | Kafi Dihei | Dogs are very welcome inside; Dogs are very welcome | MOYEN | verifier |
| aix-en-provence | attractions | Atelier de Cézanne (outdoor garden) | interior does not accept dogs | MOYEN | verifier |
| ajaccio | attractions | Maison Bonaparte (exterior) | interior is not dog | MOYEN | verifier |
| alcudia | attractions | Cap de Formentor lighthouse drive | every; dogs are welcome; 10:00 | MOYEN | verifier |
| amalfi | attractions | Duomo di Sant'Andrea & Piazza Duomo | interior and the Cloister of Paradise are off limi | MOYEN | verifier |
| annecy | attractions | Palais de l'Île | Interior museum admits assistance dogs | MOYEN | verifier |
| annecy | attractions | Château d'Annecy (Outer Terraces) | interior museum admits assistance dogs | MOYEN | verifier |
| arles | attractions | Espace Van Gogh courtyard | treat | MOYEN | verifier |
| auckland | restaurants | Vivace Restaurant & Bar at DeBretts | bowls | MOYEN | verifier |
| auckland | restaurants | Pocket Bar & Kitchen | every; Dogs are welcome; 14:30 | MOYEN | verifier |
| barcelona | restaurants | Antic Cafè de l'Acadèmia | Staff are unaffected about dogs on the terrace and; Dogs welcome | MOYEN | verifier |
| bari | restaurants | Panificio Fiore | since 1956 | MOYEN | verifier |
| bari | attractions | Castello Svevo (Norman-Swabian Castle exterior) | Interior is a museum and does not admit pets | MOYEN | verifier |
| bayonne | attractions | Cathédrale Sainte-Marie & Cloître | interior nave excludes pets | MOYEN | verifier |
| benidorm | attractions | Terra Mítica (no dogs, for reference) | Dogs are not admitted anywhere inside | MOYEN | verifier |
| bergen | restaurants | Daily Pot | bowl | MOYEN | verifier |
| bergen | attractions | Bryggen UNESCO Wharf | since 1979 | MOYEN | verifier |
| bilbao | restaurants | Copper Deli Museo | dog sizes officially welcomed inside; every; dog sizes officially welcome | MOYEN | verifier |
| bilbao | attractions | Guggenheim Museum Exterior & Puppy Sculpture | interior does not allow pets | MOYEN | verifier |
| bilbao | attractions | Casco Viejo, Seven Streets Walk | dog-friendly outdoor streets; many pintxos bars we | MOYEN | verifier |
| bodrum | attractions | Bodrum Antique Theatre | bowl | MOYEN | verifier |
| bregenz | attractions | Pfänder Wildpark | treat | MOYEN | verifier |
| brisbane | attractions | South Bank Parklands | water bowl | MOYEN | verifier |
| bristol | attractions | SS Great Britain (exterior + quayside) | interior tour does not accept dogs | MOYEN | verifier |
| brno | attractions | Špilberk Castle Grounds | interior museum admits assistance dogs | MOYEN | verifier |
| brno | attractions | Mendel Monastery Garden | Dogs in garden; assistance only inside | MOYEN | verifier |
| burgos | attractions | Cartuja de Miraflores (grounds) | interior (free entry) does not admit dogs | MOYEN | verifier |
| burgos | attractions | Monasterio de Las Huelgas (exterior) | interior is only visited on a guided tour without  | MOYEN | verifier |
| cadaques | attractions | Casa-Museu Salvador Dalí (Port Lligat exterior) | interior not pet | MOYEN | verifier |
| caen | attractions | Abbaye aux Hommes (Saint-Étienne) - exterior & cloister | interior is closed to dogs | MOYEN | verifier |
| caen | attractions | Bayeux - old town, cathedral exterior, river Aure | interior to dogs | MOYEN | verifier |
| calpe | attractions | Puerto Pesquero (Calpe fishing harbour and lonja) | every; dogs welcome; 16:00 | MOYEN | verifier |
| cannes | attractions | Musée de la Castre | Dogs are not permitted inside | MOYEN | verifier |
| carcassonne | attractions | Basilique Saint-Nazaire (exterior) | interior is closed to dogs | MOYEN | verifier |
| carnac | attractions | Alignements de Carnac (Ménec, Kermario, Kerlescan) | interiors are seen only on a paid guided tour, wit | MOYEN | verifier |
| carnac | attractions | Église Saint-Cornély & old town | dogs in the streets and square; not inside | MOYEN | verifier |
| catania | attractions | Castello Ursino (exterior) | inside the castle does not admit non-assistance do | MOYEN | verifier |
| chamonix | attractions | Chamonix old town & Rue du Docteur Paccard | Water bowl | MOYEN | verifier |
| ciutadella | restaurants | Es Tast de na Silvia | chef Silvia Anglada and know; Dogs are welcome | MOYEN | verifier |
| coimbra | attractions | Universidade de Coimbra (Paço das Escolas) | since 2013 | MOYEN | verifier |
| conil-de-la-frontera | attractions | Torre de Guzmán | Interior climb not suited to dogs | MOYEN | verifier |
| corfu | attractions | Palace of St Michael and St George | dogs inside | MOYEN | verifier |
| deauville | attractions | Villa Strassburger | dogs inside | MOYEN | verifier |
| delft | attractions | Markt & Nieuwe Kerk exterior | interior admits only assistance dogs, but leashed  | MOYEN | verifier |
| ericeira | attractions | Palácio Nacional de Mafra | interiors are off-limits to dogs | MOYEN | verifier |
| faro | attractions | Cidade Velha (Old Town) | interior admits assistance dogs | MOYEN | verifier |
| formentera | attractions | Sant Francesc Xavier village & church | interior is closed to dogs | MOYEN | verifier |
| gdansk | attractions | Westerplatte Memorial | interior admits assistance dogs | MOYEN | verifier |
| gjirokastra | attractions | Gjirokastër Castle (Kalaja e Gjirokastrës) | Dogs free on castle grounds; not permitted inside | MOYEN | verifier |
| glasgow | attractions | Glasgow Cathedral & Provand's Lordship | interior admits only assistance dogs | MOYEN | verifier |
| goreme | attractions | Uçhisar Castle | interior tunnels require a ticket and do not permi | MOYEN | verifier |
| gothenburg | attractions | Feskekôrka | Dogs not permitted inside | MOYEN | verifier |
| gozo | restaurants | Il Gabbiano | owner keeps several small dogs who greet; Dogs welcome | MOYEN | verifier |
| haarlem | attractions | Grote Markt & Grote Sint-Bavokerk exterior | interior admits only assistance dogs, but leashed  | MOYEN | verifier |
| heidelberg | attractions | Heidelberger Schloss (Castle Grounds) | interior tour admit assistance dogs | MOYEN | verifier |
| heviz | attractions | Festetics Palace Park, Keszthely | interior for service dogs | MOYEN | verifier |
| innsbruck | attractions | Goldenes Dachl + Altstadt | interior does not admit pets | MOYEN | verifier |
| innsbruck | attractions | Bergisel Ski Jump | interior does not admit pets | MOYEN | verifier |
| jurmala | attractions | Dubulti viewpoint and Lutheran church | Dogs are not admitted inside | MOYEN | verifier |
| kitzbuehel | attractions | Medieval old town (Vorderstadt & Hinterstadt) | Water bowl | MOYEN | verifier |
| klagenfurt | attractions | Landhaus courtyard & Alter Platz | interior closed to pets except assistance dogs | MOYEN | verifier |
| klaipeda | restaurants | Draugiski Gyvunams network venues | explicitly welcome; every; dogs explicitly welcome | MOYEN | verifier |
| kyoto | attractions | Gion & Higashiyama Historic Streets | interiors dog | MOYEN | verifier |
| larnaca | attractions | Larnaca Salt Lake & Hala Sultan Tekke | dogs inside | MOYEN | verifier |
| lausanne | attractions | Cathédrale de Lausanne | Dogs are not permitted inside | MOYEN | verifier |
| lausanne | attractions | Musée Olympique | Dogs are not permitted inside | MOYEN | verifier |
| lecce | attractions | Piazza del Duomo | interior admits assistance dogs | MOYEN | verifier |
| lecce | attractions | Basilica di Santa Croce (façade) | interior admits assistance dogs | MOYEN | verifier |
| leipzig | attractions | Völkerschlachtdenkmal Grounds | interior crypt and observation platform admit assi | MOYEN | verifier |
| leuven | attractions | Sint-Pieterskerk Exterior (Dirk Bouts Last Supper) | interior to see the Bouts altarpiece admits assist | MOYEN | verifier |
| leuven | attractions | KU Leuven Universiteitsbibliotheek and Sint-Donatuspark | interior and tower climb admit assistance dogs | MOYEN | verifier |
| liepaja | attractions | Holy Trinity Cathedral and tower viewpoint | Dogs are not admitted inside | MOYEN | verifier |
| ljubljana | restaurants | Riverfront Terraces, Cankarjevo nabrežje | water bowl | MOYEN | verifier |
| maastricht | attractions | Fort Sint Pieter | interior tunnels and museum tour admit assistance  | MOYEN | verifier |
| mahon | restaurants | Ses Forquilles | staff know; Dogs welcome | MOYEN | verifier |
| makarska | restaurants | Caffe bars on the Riva | water bowl | MOYEN | verifier |
| malaga | attractions | Alcazaba Fortress Gardens | Dogs are not permitted inside | MOYEN | verifier |
| matera | attractions | Belvedere Murgia Timone and rupestrian rock churches | dogs given the conservation of the Byzantine fresc | MOYEN | verifier |
| milan | restaurants | Frida, Isola | every; Dogs welcome; 18:00 | MOYEN | verifier |
| monte-carlo | attractions | Casino Square & Jardins des Boulingrins | dogs on the square and garden paths; not on the la | MOYEN | verifier |
| naples | attractions | Castel dell'Ovo and Borgo Marinari | interior exhibitions are pet | MOYEN | verifier |
| nazare | attractions | Forte de São Miguel Arcanjo lighthouse | interior museum charges €2 and stays off-limits to | MOYEN | verifier |
| neringa | restaurants | Nida Marina cafes | dogs inside | MOYEN | verifier |
| nimes | attractions | Maison Carrée (exterior square) | interior 3D cinema and exhibition (guide and assis | MOYEN | verifier |
| nuremberg | attractions | Kaiserburg (Imperial Castle) | interiors prohibit pets | MOYEN | verifier |
| olhao | attractions | Mercados de Olhão | inside the food halls; leashed dogs | MOYEN | verifier |
| olomouc | attractions | Sloup Nejsvětější Trojice | since 2000 | MOYEN | verifier |
| opatija | attractions | Villa Angiolina & gardens | Dogs cannot go inside | MOYEN | verifier |
| orvieto | attractions | Piazza Duomo and the Anello della Rupe | interior itself, like most Italian churches, does  | MOYEN | verifier |
| ostend | attractions | James Ensor House Exterior and Vlaanderenstraat | interior admits assistance dogs | MOYEN | verifier |
| padstow | attractions | National Lobster Hatchery | dogs only inside | MOYEN | verifier |
| paphos | attractions | Tombs of the Kings (surrounding area) | Dogs not permitted inside | MOYEN | verifier |
| paris | restaurants | Café de Flore | Inside, well-behaved dogs; never; Dogs welcome | MOYEN | verifier |
| parnu | attractions | Rüütli tänav | water bowl | MOYEN | verifier |
| perpignan | attractions | Le Castillet | interior assistance dogs | MOYEN | verifier |
| perpignan | attractions | Palais des Rois de Majorque (grounds) | interior galleries admit assistance dogs | MOYEN | verifier |
| perpignan | attractions | Cathédrale Saint-Jean & old town | interior admits assistance dogs | MOYEN | verifier |
| portofino | attractions | Abbazia di San Fruttuoso | dogs may go inside | MOYEN | verifier |
| positano | attractions | Piazza & Santa Maria Assunta | dogs in the square and lanes; not inside | MOYEN | verifier |
| pula | attractions | Kaštel Fortress & Historical Museum Hilltop | interior museum follows the small-dog | MOYEN | verifier |
| regensburg | attractions | Domplatz & Regensburg Cathedral exterior | Interior is closed to dogs (assistance dogs | MOYEN | verifier |
| regensburg | attractions | Walhalla memorial terraces | interior is closed to dogs | MOYEN | verifier |
| rimini | attractions | Tempio Malatestiano (exterior) & Piazza Cavour | Interior admits assistance dogs | MOYEN | verifier |
| saint-jean-de-luz | attractions | Église Saint-Jean-Baptiste | dogs are not taken inside | MOYEN | verifier |
| san-diego | restaurants | Stone Brewing World Bistro & Gardens - Liberty Station | pets welcome in all outdoor areas; indoors; never; pets are welcome | MOYEN | verifier |
| sanremo | attractions | Casino di Sanremo (exterior) | pets inside | MOYEN | verifier |
| sant-antoni | attractions | Església de Sant Antoni de Portmany | interior is closed to dogs | MOYEN | verifier |
| sant-josep | attractions | Església de Sant Josep de sa Talaia | interior is closed to dogs | MOYEN | verifier |
| santa-eulalia | attractions | Puig de Missa church-fortress | interior is off-limits to dogs | MOYEN | verifier |
| santiago-de-compostela | attractions | Praza do Obradoiro & Cathedral Squares | interior does not admit dogs | MOYEN | verifier |
| santorini | attractions | Akrotiri Archaeological Site | dogs inside | MOYEN | verifier |
| sirmione | restaurants | My Dog. Gelateria e Pasticceria per Cani | treats | MOYEN | verifier |
| sitges | attractions | Casc Antic & Palau Maricel exterior | interiors are assistance-dog | MOYEN | verifier |
| sofia | attractions | Alexander Nevsky Cathedral square | Pets are not admitted inside | MOYEN | verifier |
| sofia | attractions | Boyana Church & Waterfall trail | interior admits only assistance dogs | MOYEN | verifier |
| sopot | attractions | Opera Leśna & Łysa Góra | dogs on the surrounding forest trails; no dogs ins | MOYEN | verifier |
| spa | restaurants | La Source de la Géronstère | treat; every; Dogs reported accepted | MOYEN | verifier |
| spa | attractions | Les Thermes de Spa | Dogs not admitted inside | MOYEN | verifier |
| spa | attractions | Pouhon Pierre-le-Grand | interior and tourist office may accept a calm leas | MOYEN | verifier |
| toronto | restaurants | Bandit Brewery | inside the enclosed glass patio are not dog | MOYEN | verifier |
| toronto | restaurants | Maison Selby | Dogs stay on the outdoor terrace, not in the dinin | MOYEN | verifier |
| trondheim | attractions | Nidaros Cathedral (Exterior & Gardens) | Interior admits assistance dogs | MOYEN | verifier |
| trondheim | attractions | Kristiansten Fortress | interior tour admits assistance dogs | MOYEN | verifier |
| turin | attractions | Piazza Castello and Palazzo Reale Gardens | interior: no pets | MOYEN | verifier |
| utrecht | attractions | Domplein, Pandhof gardens & Domtoren views | interior admits only assistance dogs, but leashed  | MOYEN | verifier |
| verona | attractions | Arena di Verona | Dogs are not permitted inside | MOYEN | verifier |
| vichy | attractions | Opéra de Vichy / Palais des Congrès | interior does not admit dogs | MOYEN | verifier |
| vigo | attractions | Castelo do Castro | Interior galleries do not admit pets (assistance d | MOYEN | verifier |
| vigo | attractions | Pazo Quiñones de León Gardens | interior houses the Museo de Vigo (no pets | MOYEN | verifier |
| villefranche-sur-mer | restaurants | La Belle Étoile | owner-cook usually comes out to greet; dogs are welcome | MOYEN | verifier |
| warnemunde | attractions | Teepott | dog cannot come inside | MOYEN | verifier |
| zandvoort | attractions | Circuit Zandvoort (from the dunes) | Dogs are not admitted inside | MOYEN | verifier |
| zaragoza | attractions | Plaza del Pilar y Basílica del Pilar | interior does not admit pet dogs | MOYEN | verifier |
| zaragoza | attractions | Palacio de la Aljafería | Interior tours of the palace itself are not dog | MOYEN | verifier |
| zaragoza | attractions | Murallas Romanas y Mercado Central | dogs are not admitted inside | MOYEN | verifier |

## FAIBLE

5806 fiches sans signal d invention notable (non listees).