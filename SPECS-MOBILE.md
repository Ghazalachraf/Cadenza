# SPECS-MOBILE — Typographie & layout pixel-perfect (Homepage mobile, 390 px)

Référence extraite du frame Figma `Homepage mobile` (`451:38`, 390×12166) du
fichier `PoREWwJw9y93DuJlApSDfv`. Chaque valeur provient du **dev mode Figma**
(`get_design_context` par nœud) — aucune n'est estimée.

**Lecture des hauteurs** — Figma rogne tous ses textes à la hauteur de
capitale (`text-box-trim: trim-both` / `text-box-edge: cap alphabetic`).
Les hauteurs de boîte listées dans les tableaux « layout » sont donc des
hauteurs de capitale, pas des boîtes de ligne CSS. La conversion (flex-column
+ `line-height` + marges négatives) est documentée dans SPECS.md §3.

**DM Sans optique** — la maquette utilise deux coupes de DM Sans variable :
`opsz 14` (défaut) et `opsz 9` (notée « 9pt » ci-dessous, employée pour les
textes descriptifs). La webfont statique du projet n'expose pas l'axe
optique : les deux se rendent en DM Sans standard, écart visuel négligeable
aux tailles concernées.

**Couleurs** — `--black: #252324` · `--primary: #cb9274` ·
`--light_brown: #eae3db` · `--white: #fff` · gris barré `#b9b9b9`
(spotlight : `#b1b1b1`) · descriptions `rgba(37,35,36,0.8)` ·
timeline `#737373` · footer `#ddddde` · lien footer actif `#ffb86d`.

---

## 0. Styles types récurrents

| Style | Police | Taille / interligne | Tracking | Couleur / casse | Employé par |
|---|---|---|---|---|---|
| Titre de section | Jost Medium | 24 (cap 17) | −0,48 | noir, centré | New Arrivals, Our Collections, Accessories, @Cadenza |
| Titre de section semibold | Jost SemiBold | 24/30 | — | noir | Best Seller, Latest Articles ; Compare : 24/40 |
| Grand titre FAQ | Jost Medium | 34 (cap 24) | −0,68 | noir, centré | FAQ |
| Accroche couleur | DM Sans Medium | 14 (cap 10) | — | `#cb9274`, MAJUSCULES | Best Seller, Latest Articles, Compare ; Gallery : 12 |
| Accroche blanche | DM Sans Regular | 11 (cap 8) | — | blanc, MAJUSCULES | Sale banner ; tuiles éditoriales : SemiBold 11 ; Newsletter : SemiBold 12 |
| Description de section | DM Sans 9pt Regular | 12/17 | — | `rgba(37,35,36,.8)`, centrée | Our Collections, Accessories, Gallery ; FAQ : 15/23 |
| Nom produit | Jost Medium | 16 (cap 11) | −0,32 | noir | toutes les cartes produit |
| Prix | DM Sans Medium | 16 (cap 11) | −0,32 | `#cb9274` | toutes les cartes produit |
| Prix barré | DM Sans Medium | 12 (cap 8) | — | `#b9b9b9`, line-through | cartes New Arrivals |
| Bouton standard | DM Sans Regular | 12 (cap 8) | — | MAJUSCULES, radius 2 | padding 12×24 (héro : 12×20) fond blanc texte noir, ou fond `#cb9274` texte blanc |
| Ticker | Jost Medium | 13 | −0,26 | noir | bandeaux Elevate |

---

## 1. Promo header — `451:39` (390×30)

- Fond `#cb9274`. Contenu **centré** verticalement et horizontalement,
  `gap: 20` entre chevrons (20×20) et texte.
- Texte : Jost Medium 11, blanc (`451:43`).

## 2. Hero — `451:47` (390×519)

| Élément | Node | Layout | Typo |
|---|---|---|---|
| Barre de nav | `451:52` | h=44, filet bas `rgba(255,255,255,.2)` | — |
| Burger | `451:53` | 24×24 à (18, 10) | — |
| Logo | `451:55` | 94,5×18,3 centré | — |
| Icônes user/panier | `451:63` | 18×18, gap 10, à x=322 | — |
| Accroche | `451:70` | y=159, centrée | Jost Medium 11, MAJUSCULES, blanc |
| Titre | `451:49` | y=181, w=315, centré | **DM Sans Bold 24/30, −0,48**, blanc |
| Bouton | `451:50` | y=283, padding 12×20, radius 2, fond blanc | DM Sans Regular 12, MAJUSCULES, noir |

## 3. New Arrivals — `451:71` (390×658)

- Gouttières 44 / 50, gaps 20 (titre→onglets) et 20 (onglets→cartes).
- Titre `451:72` : style « titre de section » (Jost Medium 24, −0,48).
- Onglets `451:74` : conteneur h=25, `space-between`, padding 0 20.
  Inactif : DM Sans Regular 12 MAJUSCULES noir. **Actif : DM Sans SemiBold
  12, `#cb9274`, souligné.**
- Carte 342×482 : visuel 408 (radius 10 en haut), pied 74 (filet `#f5f4f2`).
  Nom à (17, 429), prix à (17, 452), barré décalé à droite (y 455) —
  **alignés à gauche**. Styles « nom / prix / barré » du §0.
- Panneau hover (carte Noya `451:104`) : label Size DM Sans Medium 14, label
  Color Jost Medium 14, pastilles 20 px (texte 9), bouton panier 36 px.

## 4. Sale banner — `451:157` (390×304)

- Fond `#f5f4f2`, visuel plein cadre + voile `rgba(0,0,0,.6)`. Tout centré.
- Accroche `451:164` : DM Sans Regular 11 MAJUSCULES blanc, y=73.
- Titre `451:165` : **Jost Medium 34/33, MAJUSCULES**, centré, w=272, y=95.
- Note `451:163` : DM Sans 9pt Regular 14, y=166.
- Bouton `451:166` : standard blanc (12×24), y=199.

## 5. Our Collections — `451:168` (390×710)

- Gouttières 50 / 50 ; en-tête → grille : 24 ; grille padding 10×8, gap 8.
- Titre `451:171` : titre de section. Description `451:170` : 12/17, w=228.
- Tuiles 374 de large, radius 10, voile `rgba(0,0,0,.2)`
  (tuile 240 : `.4`) ; hauteurs 80/80/240/80.
- Titre de tuile `451:179` etc. : **Jost Medium 24, blanc, centré**
  (centre optique à −12 px du centre géométrique).
- Compteur « 21 Items » `451:194` : DM Sans Medium 14 blanc, à +18 du centre.

## 6. Best Seller — `451:289` (390×650)

- Padding latéral 8 ; en-tête → rangée : 29.
- Accroche `451:293` : DM Sans Medium 14 MAJUSCULES `#cb9274` (cap 10).
- Titre `451:294` : **Jost SemiBold 24/30**, w=269, à +22 de l'accroche.
- Rangée unique y=98 (h=447, cartes 433 + 14 dessous), gap 8.
- Carte 303 : visuel 381 radius 10 ; nom/prix **à gauche** (x=0) à y=399 et
  y=422 ; cœur 42 px à (238, 20).
- Boutons quickshop (carte 2) : 263×52, radius 4, DM Sans Medium 17 —
  « Add to Cart » fond `rgba(255,255,255,.9)` noir, « Quick View » fond
  `rgba(203,146,116,.9)` blanc.
- Bouton « All products » `451:341` : 135×32 centré, DM Sans Regular 12
  MAJUSCULES.

## 7. Ticker + Elevate — `451:202` (390×396)

- Tickers 390×30, fond `#eae3db`, items **Jost Medium 13, −0,26**, gap 40,
  centrés verticalement.
- Elevate 336, fond `#f5f4f2` + tracé de fond : texte **Jost Medium 24,
  interligne 1,8**, centré, en deux blocs (y=31 et y=176) ; pastilles photo
  ~35 px de haut intégrées au fil du texte.

## 8. Product Details — `451:232` (390×977)

Galerie y=54 : cartes 303×381, gap 8, padding latéral 21.
Bloc infos (padding latéral 21) :

| Élément | Node | y | Typo |
|---|---|---|---|
| NEW | `451:283` | 465 | DM Sans Medium 12, MAJUSCULES, `#cb9274` |
| Titre | `451:243` | 489 | **Jost SemiBold 25/40** (cap 18) |
| Description | `451:244` | 535 (h=110) | DM Sans Regular 14/25, w=348 |
| Prix barré | `451:247` | 671 (+5) | DM Sans Medium 18, −0,36, `#b9b9b9` |
| Prix | `451:246` | 671 | DM Sans Medium 25, −0,5, `#cb9274` |
| Labels Size/Color/Quantity | `451:250` … | 714 / 792 | Size : DM Sans Medium 14 · Color/Quantity : Jost Medium 14 (cap 10), +26 vers contrôles |
| Pastilles taille | `451:252` … | 740 | 30 px, filet 0,5 noir, texte DM Sans 9 |
| Valeur quantité | `451:279` | 818 | Jost Medium 16, −0,32 |
| Boutons | `451:285/287` | 884 | 170,7×39, radius 2, DM Sans Medium 16 blanc — « Add to cart » `#cb9274`, « Buy it now » `#252324`, gap 6 |

## 9. Latest Articles — `451:343` (348×1283, à x=18)

- Aucune gouttière verticale ; en-tête centré.
- Accroche `451:345` : DM Sans Medium 14 MAJUSCULES `#cb9274`.
- Titre `451:346` : **Jost SemiBold 24/30**, w=267, y=23.
- Tuile éditoriale 348×267, radius 6, voile `.3` :
  accroche DM Sans **SemiBold** 11 MAJUSCULES blanc (y=55) ; titre
  **Jost Medium 24/28** centré w=272 (y=82) ; bouton standard blanc (y=181).
- Carte produit 344×570 : visuel 485 radius 10 ; à y=513 nom Jost Medium 16
  −0,32 **à gauche** et prix DM Sans Medium 16 `#cb9274` **à droite** ;
  pastilles 86×30 à y=540.

## 10. Spotlight — `451:1239` (390×470)

- Un seul panneau (blouse Eleanor). Repères 34 px à (67, 113) et (279, 345).
- Carte 289×69 à (84, 152), radius 4, ombre `1px 1px 4px rgba(0,0,0,.05)` :
  vignette 60×60 ; nom Jost Medium 14 −0,28 ; variante DM Sans 9pt 10 −0,2
  `#5b5859` ; prix DM Sans Medium 14 −0,28 `#cb9274` ; barré DM Sans Medium
  10 −0,2 `#b1b1b1` ; CTA 22×22 `#cb9274` radius 2 (flèche 17).

## 11. Collections More Info — `451:1167` (371×827, à x=10)

- Photo en tête 370×289, radius 10.
- Titre `451:1168` y=336 (h=74, 2 lignes) : **Jost Medium 32/37,
  capitalize** — « Our collection » en `#cb9274`, le reste en noir.
- Item d'accordéon : titre **DM Sans Medium 18, MAJUSCULES, `#201a1e`** ;
  filet à +49 ; « + » 28 px aligné droite ; item suivant à +30.
- Description ouverte `451:1189` : DM Sans 9pt Regular 14/24
  `rgba(37,35,36,.8)`, décalée de 10 px, w=359 (boîte cap 58).

## 12. After & Before (Compare) — `451:1118` (390×569)

- En-tête centré : accroche DM Sans Medium 14 MAJUSCULES `#cb9274` (y=0) ;
  titre **Jost SemiBold 24/40** (y=23, cap 17).
- Viewer y=98, 390×471 ; séparateur à x=301 (panneau droit 85 px,
  curseur à 77,2 %) ; poignée 42 px ; bouton « View product » 136×32
  standard blanc.

## 13. Seasonal Sale — `451:432` (390×249)

- Visuel plein cadre + voile `.4`. Centré.
- Titre `451:444` : **Jost Medium 24/33, MAJUSCULES**, w=233, y=37.
- Note `451:443` : DM Sans 9pt Regular 14, y=143.
- Deux boutons y=180 (padding 12×24) : « All collections » blanc/noir,
  « Shop now » `#cb9274`/blanc — DM Sans Regular 12 MAJUSCULES.

## 14. Accessories — `451:450` (390×555)

- Titre `451:453` (y=54) et description `451:452` (y=91, w=228) : styles §0.
- Tuiles 348×325 (y=146), gap 8, padding latéral 21, radius 6.
- Titre de tuile : Jost Medium 34 blanc centré (`451:463`, cap 24) ;
  compteur : 24 (cap 17).
- 84 px sous les tuiles (barre de progression à +30, gouttière 54).

## 15. FAQ — `451:953` (390×850)

- Fond `#f5f4f2` + tracé. Titre `451:1010` : Jost Medium 34 −0,68 (y=67).
- Intro `451:1011` : DM Sans 9pt Regular **15/23**, centrée, w=313 (y=117).
- Accordéon y=276, w=370, gap 8 ; bloc blanc radius 8, padding 22×24.
- Question `451:962` : **Jost SemiBold 16/19** ; chevron 16 px.
- Réponse `451:966` : DM Sans 9pt Regular 12/21 `rgba(37,35,36,.8)`,
  à +16 de l'en-tête.

## 16. Timeline — `451:1019` (350×951, à x=21)

- Flèches 34,8 px **au-dessus** de la ligne d'années, alignées à droite ;
  années à y=67 : inactives **Jost Regular 20 `#424041`**, active
  **Jost Medium 20 `#252324`** (2022 : tracking −0,4).
- Titre de panneau `451:1022` : **Jost SemiBold 30/50, tracking 0,2**
  (y=112) ; texte `451:1023` : DM Sans 9pt Regular **14/20 `#737373`**,
  w=347 (y=176, h=140).
- Visuel 348×538 radius 6, voile `.3` (y=346) ; surimpression collab :
  Jost SemiBold 30/40 blanc centré + logo 200×43.
- « Read more » `451:1034` : **DM Sans Medium 18** (cap 13), souligné,
  `#cb9274`, **aligné à droite** (y=914).

## 17. Gallery — `451:479` (374×310, à x=8)

- Accroche `451:483` : DM Sans Medium **12** MAJUSCULES `#cb9274` (y=0, cap 8).
- Titre `451:482` : titre de section (y=20). Description `451:481` : 12/17,
  w=267 (y=57).
- Bande y=114 : tuiles 227×196, gap 8.

## 18. Newsletter — `451:503` (390×225)

- Fond `#151515`, visuel + voile `.3`. Centré.
- Accroche `451:507` : **DM Sans SemiBold 12**, MAJUSCULES, blanc (y=51).
- Titre `451:509` : **Jost Medium 24/52, MAJUSCULES** (y=73).
- Note `451:508` : DM Sans Regular 14 (y=109).
- Formulaire y=145, sur une ligne : champ 181×30 (filet blanc 0,5, radius 2,
  padding 10×14, placeholder DM Sans Regular 12 `rgba(255,255,255,.6)`) +
  bouton « Send » 82×30 blanc (DM Sans Regular 12 MAJUSCULES, padding 10×34).

## 19. Footer — `451:515` (390×1238)

- Contenu à x=38, y=100, w=313. Logo 156,5×30.
- Description `451:533` : DM Sans 9pt Regular **16/1,5 `#ddddde`**, à +20.
- Réseaux sociaux : 4 icônes 28 px, gap 26, à +20.
- Colonnes à +70 des réseaux, espacées de 60 :
  intitulé **DM Sans Bold 20/1,5 blanc** ; liste à +20, liens
  **DM Sans 9pt Regular 16/1,5 `#ddddde`**, gap 16.
  Lien actif « Search » : **DM Sans SemiBold 16, souligné, `#ffb86d`**.
- Barre copyright `451:568` : filet pleine largeur à y=1185, texte à +22 :
  **Jost Regular 14, tracking 0,5, `#ddddde`**, centré ; 17 px dessous.

---

## Conformité de l'intégration

Vérifiée au computed style (Playwright, 390 px) sur 20 éléments
représentatifs : 19/20 conformes d'emblée. Seul écart trouvé et corrigé :
`.timeline__more` rendait 13 px Regular (confusion boîte de capitale /
corps) au lieu de **18 px Medium** — corrigé sans changer la hauteur de
section (951 px).
