# SPECS-DESKTOP — Typographie & layout pixel-perfect (Home, 1440 px)

Référence extraite du frame Figma `Home` (`3:2`, 1440×13729) du fichier
`PoREWwJw9y93DuJlApSDfv`, via le dev mode (`get_design_context` par nœud).
Complète SPECS.md (audit des hauteurs) et fait le pendant de SPECS-MOBILE.md.

Conventions identiques à SPECS-MOBILE.md : les hauteurs Figma des textes
sont des **hauteurs de capitale** (`text-box-trim`), et DM Sans existe en
deux coupes optiques (`opsz 14` par défaut, `opsz 9` notée « 9pt » pour les
descriptions) que la webfont statique ne distingue pas.

**Couleurs** — identiques au mobile : `--black #252324`, `--primary
#cb9274`, `--light_brown #eae3db`, gris barré `#b9b9b9`, descriptions
`rgba(37,35,36,0.8)`, timeline `#737373`, footer `#ddddde`, lien actif
footer `#ffb86d`. Gouttière type des sections : **102 px**.

---

## 0. Styles types récurrents

| Style | Police | Taille / interligne | Tracking | Couleur / casse | Employé par |
|---|---|---|---|---|---|
| Titre de section | Jost Medium | 34 (cap 24) | −0,68 | noir, centré | New Arrivals, Our Collections, Accessories |
| Titre de section semibold | Jost SemiBold | 32/40 | — | noir | Best Seller, Latest Articles, Compare |
| Accroche couleur | DM Sans Medium | 18 (cap 13) | — | `#cb9274`, MAJUSCULES | Best Seller, Latest Articles, Compare, Product Details (NEW) ; Gallery : 16 |
| Description de section | DM Sans 9pt Regular | 18 (cap 13) | — | `rgba(37,35,36,.8)` | Our Collections, Accessories, Gallery |
| Nom produit | Jost Medium | 16 (cap 11) | −0,32 | noir | toutes les cartes |
| Prix | DM Sans Medium | 16 (cap 11) | −0,32 | `#cb9274` | toutes les cartes |
| Prix barré | DM Sans Medium | 12 (cap 8) | — | `#b9b9b9` | cartes New Arrivals |
| Bouton principal | DM Sans Regular ou Medium | 18 (cap 13) | — | capitalize, radius 4 | padding 20-22×34, fond blanc/`#cb9274` |
| Titre de tuile | Jost Medium | 34, blanc, centré | — | centre optique −12 px | Our Collections, Accessories |
| Ticker | Jost Medium | 16 | −0,32 | noir | bandeaux Elevate (h=41, py 15) |
| Nav / promo header | Jost Medium | 14 | — | blanc | header, barre promo |

---

## 1. PromoHeader — `6:5` (1440×42)

- `flex space-between`, padding **2×102**, fond `#cb9274`, h fixe 42.
- Réseaux sociaux : 4 icônes 18, gap 26. Slider : chevrons 24, gap 80,
  texte Jost Medium 14 blanc (`13:59`). Langue/devise : Jost Medium 14,
  chevrons 16, gap 24 (2 entre libellé et chevron).

## 2. Header nav — `29:5` (1440×80)

- Filet bas `rgba(255,255,255,.4)`. Liens **Jost Medium 14 blanc** :
  menu à x=102 (gap 30, chevrons 16), actions à droite (Search / Sign in /
  Bag + pastille compteur 10), gap 30. Logo 156,5×30 centré (x=642).

## 3. Hero — `56:116` (1440×873)

- Accroche `319:741` : **Jost Medium 24, MAJUSCULES**, blanc (y=270).
- Titre `319:740` : **DM Sans Bold 64/70, −1,28**, blanc, centré, w=801
  (y=318).
- Bouton `319:738` : blanc, padding 20×34, radius 4, **DM Sans Medium 18
  capitalize** noir (y=551). Voile : dégradé `rgba(0,0,0,.7)` → transparent.

## 4. Promo banner — `144:168` (1440×175)

- `flex space-between`, padding 30×102, fond `#eae3db`.
- « SHOP 20% off » `144:173` : Jost Medium 40 (cap 28), −0,8.
- Texte `144:172` : DM Sans 9pt 14 (cap 10), −0,28, à +12.
- Bouton `144:170` : 138×37, `#cb9274`, radius 2, DM Sans Regular 14
  capitalize blanc.
- Bloc droit : visuel 208×115 radius 4 (pictogramme 40 centré) + à 18 px :
  « New Arrivals Sale » Jost Medium 30 (cap 21), −0,6 puis texte DM Sans
  9pt 17/26 w=295.

## 5. New Arrivals — `206:1193` (1440×789)

- Gouttières 94/80 ; titre → onglets 34, onglets → cartes 34.
- Titre `206:1194` : titre de section (34, −0,68).
- Onglets `206:1195` : centrés, gap 40, h=41 (py 15) — DM Sans Regular
  **16** MAJUSCULES noir ; actif : **DM Sans SemiBold 16 souligné
  `#cb9274`**.
- Carte 342×482 (`274:99`) : visuel 408, radius 10 haut / 11 bas, filet
  `#f5f4f2` (hover : `#eaeaea`) ; nom (17, 429), prix (17, 452), barré
  à droite — styles §0 ; panier 36 à (286, 427).
- Panneau hover : dégradé bas `rgba(255,255,255,.8)` à 77 % ; Size DM Sans
  Medium 14 / Color Jost Medium 14 ; pastilles 20 (texte 9) ; actions
  favori/loupe 42 à x=282.

## 6. Sale banner — `224:54` (1440×359)

- Fond `#f5f4f2`, masque diagonal + voile `.6`. Centré.
- Accroche `224:60` : DM Sans Regular 14 MAJUSCULES blanc (y=71).
- Titre `224:61` : **Jost Medium 54/52, MAJUSCULES** (y=106).
- Note `224:59` : DM Sans 9pt 18 (y=174).
- Bouton `224:62` : blanc, padding 22×34, radius 4, DM Sans Regular 18
  capitalize (y=227).

## 7. Our Collections — `240:370` (1440×945)

- Gouttières 100/… ; en-tête centré : titre 34 (y=100), description
  DM Sans 9pt 18 (y=152). Grille y=215, tuiles 690 de haut, radius 10,
  voile `.2` ; titre de tuile **Jost Medium 34 blanc** au centre optique
  (−12 px). Compteur au survol : DM Sans Medium 24 (« 21 Items »).

## 8. Best Seller — `264:609` (1440×1310)

- Gouttières 94/63, padding latéral 102.
- Accroche `264:612` : DM Sans Medium 18 MAJUSCULES `#cb9274` (y=94).
- Titre `264:613` : **Jost SemiBold 32/40**, w=369 (y=127).
- Rangées y=223 et y=672 (conteneurs 449 = cartes 433 + 2×8), gap 8,
  cartes 303 (visuel 381 radius 10, nom y=399, prix y=422 — centrés dans
  la maquette, laissés à gauche sur demande).
- Quickshop hover : 263×52, radius 4, DM Sans Medium 17 (blanc `.9` /
  `#cb9274` `.9`).
- « All products » `264:743` : 211×59, **contour 2 px `#cb9274`**, radius
  4, padding 23×54, DM Sans Medium 18 capitalize `#cb9274` (y=1188,
  centré).

## 9. Ticker + Elevate — `440:156` (1440×646 = 41 + 564 + 41)

- Ticker `440:148` : fond `#eae3db`, py 15 (h=41), gap 40, **Jost Medium
  16, −0,32**.
- Elevate : fond `#f5f4f2` + tracé ; texte **Jost Medium 50, interligne
  1,8**, centré, w=1216, deux blocs de 180 px collés (gouttières 102) ;
  pastilles photo 100×45 radius 24 dans le fil du texte.

## 10. Product Details — `264:415` (1440×687)

Galerie à gauche (664×487 : vignettes 74 + visuel principal), infos à
droite (625, à x=713) :

| Élément | Node | y (bloc) | Typo |
|---|---|---|---|
| NEW | `264:496` | 0 | DM Sans Medium 18, MAJUSCULES, `#cb9274` |
| Titre | `264:425` | 39 | **Jost SemiBold 45/40** (cap 32) |
| Description | `264:427` | 97 (h=88) | DM Sans Regular 18/25, w=581 |
| Prix barré / prix | `264:437/436` | 207 | DM Sans Medium 18 −0,36 `#b9b9b9` / **25 −0,5 `#cb9274`** |
| Labels | `264:441/450/484` | 244 / 322 | Size : DM Sans Medium 14 · Color/Quantity : Jost Medium 14, +26 vers contrôles |
| Pastilles taille | `264:443…` | 270 | 30 px, filet 0,5 |
| Boutons | `264:500/506` | 404 | **307×57**, radius 2, padding 22×30, DM Sans Medium 18 blanc — `#cb9274` / `#252324`, gap 10 |

## 11. Latest Articles — `242:1416` (1440×1447)

- En-tête centré : accroche DM Sans Medium 18 MAJUSCULES `#cb9274` (y=30) ;
  titre **Jost SemiBold 32/40** w=521 (y=63). Grille y=185, gouttières 15.
- Tuile éditoriale 689×569 radius 10, voile `.3` : accroche **DM Sans
  SemiBold 14** MAJUSCULES ; titre **Jost Medium 38/48 MAJUSCULES** centré
  w=517 ; bouton blanc 18 capitalize (padding 20×34, radius 4).
- Carte produit 345×570 : visuel 485 radius 10 ; nom Jost Medium 16 −0,32
  à gauche, prix DM Sans Medium 16 `#cb9274` à droite (y=511) ; pastilles
  h=30 (y=538). Hover : « Add to Cart » 263, radius 14, blanc `.9`,
  DM Sans Medium 17.

## 12. Spotlight — `436:90` (1440×686)

- Deux panneaux 720×686. Carte 289×69 radius 4 (mêmes styles internes que
  le mobile : nom Jost Medium 14 −0,28, variante DM Sans 9pt 10 −0,2
  `#5b5859`, prix DM Sans Medium 14 `#cb9274`, barré 10 `#b1b1b1`, CTA
  22×22 `#cb9274`). Repères 34 (petit 28), voile `.3` sur le panneau
  gauche.

## 13. Collections More Info — `406:157` (1440×998)

- Gouttières 130, contenu 1308 (x=66). Photo à droite 535×788 radius 10.
- Titre `406:180` : **Jost Medium 79/77, capitalize** — « Our collection »
  `#cb9274`, reste noir, w=724.
- Accordéon y=310 : titre d'item **DM Sans Medium 28 MAJUSCULES `#201a1e`**,
  filet à +66, « + » 28 à x=673, item suivant à +106 (40 sous le filet).
- Description ouverte `406:213` : DM Sans 9pt **19/27** `rgba(37,35,36,.8)`,
  décalée de 41, w=493.

## 14. After & Before (Compare) — `406:209` (1440×1133)

- En-tête à x=102 : accroche DM Sans Medium 18 MAJUSCULES `#cb9274`
  (y=60) ; titre **Jost SemiBold 32/40** (y=93). Viewer y=193, 1440×860,
  curseur à 200 px ; libellé produit dans le viewer : Jost Medium 54/52
  MAJUSCULES blanc + bouton blanc « View product ».

## 15. Seasonal Sale — `287:32` (1440×268)

- Visuel plein cadre + voile `.4`.
- Titre `287:36` : **Jost Medium 44/52, MAJUSCULES**, w=660, à gauche
  (x=90, y=70) ; note DM Sans 9pt 18 (y=184).
- Boutons centrés verticalement à droite : « All collections » blanc
  (x≈1056) et « SHOP NOW » `#cb9274` blanc (x≈1200), padding 22×34,
  radius 4, DM Sans Regular 18.

## 16. Accessories — `287:62` (1440×979)

- Gouttières 94 ; en-tête centré (titre 34 y=94, description 18 y=146).
- Mosaïque y=189+20 : tuiles 690/342 de haut, radius 10, voile
  `rgba(203,146,116,.2)` (Rings : noir `.4`) ; titres **Jost Medium 34
  blanc** au centre optique ; compteur hover DM Sans Medium 24.

## 17. Timeline — `416:523` (1440×924, contenu 1216 à x=112)

- Colonne d'années à gauche : flèches 60 (haut/bas), inactives
  **Jost Regular 44 `#424041`**, active **Jost Medium 54, −1,08, noir** ;
  pas vertical 114.
- Panneau 2 colonnes de 440 (gap 30, py 24) : titre **Jost SemiBold
  40/50, +0,2** ; texte DM Sans 9pt **14/20 `#737373`** à +24 ; visuel
  440×538 radius 6 voile `.3` à +50 ; date **Jost Medium 22, −0,44**
  blanche ; logo surimprimé 278.

## 18. Gallery — `268:979` (1440×521)

- En-tête centré : accroche DM Sans Medium **16** MAJUSCULES `#cb9274`
  (y=100) ; « @Cadenza » **Jost Medium 44, −0,88** (y=130) ; description
  DM Sans 9pt 18 (y=182). Bande y=245 : tuiles 227×196, gap 8.

## 19. Newsletter — `268:952` (1440×366)

- Fond sombre + voile `.3`. Centré.
- Accroche `268:957` : **DM Sans SemiBold 14** MAJUSCULES blanc (y=77).
- Titre `268:959` : **Jost Medium 40/52, MAJUSCULES** (y=117).
- Note `268:958` : DM Sans Regular 18 (y=175).
- Formulaire y=236 : champ **426 de large** (filet blanc 0,5, radius 4,
  padding 20×34, ombre portée, placeholder DM Sans 18
  `rgba(255,255,255,.6)`) + bouton « Send » blanc (padding 20×34, DM Sans
  Regular 18 capitalize).

## 20. Footer — `268:854` (1440×400) + bottom `440:120` (1440×48)

- Contenu à (100, 100), colonnes en `flex gap-120`. Logo 156,5×30 ;
  description DM Sans 9pt 16/1,5 `#ddddde` w=313 ; réseaux 28 gap 26.
- Intitulés **DM Sans Bold 20/1,5 blanc** ; liens DM Sans 9pt 16/1,5
  `#ddddde`, gap 16 (intitulé → liste : 20). « Search » : **DM Sans
  SemiBold 16 souligné `#ffb86d`**.
- Bottom footer : fond `#121212`, filet haut `#474747` 0,4, padding
  12×90, `space-between` — copyright **Open Sans Regular 16, capitalize,
  blanc** (`440:121`, seule occurrence d'Open Sans de la maquette) +
  moyens de paiement 283×24.

---

## Différences desktop ↔ mobile

Structurelles :

| Point | Desktop (`3:2`) | Mobile (`451:38`) |
|---|---|---|
| Promo banner `144:168` | présent (175 px) | **absent** |
| FAQ | **absente** | présente (850 px) |
| Best Seller | 2 rangées + bouton 211×59 contour | **1 rangée** + bouton 135×32 |
| Spotlight | 2 panneaux côte à côte | **1 panneau** (Eleanor) |
| Timeline | 2 colonnes, années verticales, flèches haut/bas | **1 colonne + « Read more »**, années horizontales, flèches au-dessus à droite |
| Latest Articles | tuiles éditoriales intercalées dans la grille | tuiles d'abord, cartes ensuite (344×570) |
| Collections info | photo à droite | **photo en tête** |
| Header | nav complète 80 px | burger + icônes 44 px |
| Bottom footer | copyright Open Sans 16 + paiements | copyright **Jost 14** centré, sans paiements |
| Promo header | réseaux + slider + langue/devise, 42 px | slider seul, 30 px |

Échelle typographique (desktop → mobile) :

| Rôle | Desktop | Mobile |
|---|---|---|
| Titre héro | DM Sans Bold 64/70, −1,28 | DM Sans Bold 24/30, −0,48 |
| Accroche héro | Jost Medium 24 | Jost Medium 11 |
| Titre de section | 34, −0,68 | 24, −0,48 |
| Titre semibold | 32/40 | 24/30 (Compare : 24/40) |
| Accroche couleur | 18 | 14 (Gallery : 16 → 12) |
| Description | 18 | 12/17 (FAQ : 15/23) |
| Boutons | 18, padding 20-22×34, radius 4 | 12, padding 12×24, radius 2 |
| Product details : titre / desc / boutons | 45/40 · 18/25 · 307×57 (18) | 25/40 · 14/25 · 170×39 (16) |
| Collections info : titre / items / desc | 79/77 · 28 · 19/27 | 32/37 · 18 · 14/24 |
| Timeline : années / titre / date | 44 & 54 · 40/50 · 22 | 20 & 20 · 30/50 · 18 |
| @Cadenza / Sale banner / Seasonal / Newsletter | 44 · 54/52 · 44/52 · 40/52 | 24 · 34/33 · 24/33 · 24/52 |
| Ticker | 16, −0,32 (h=41) | 13, −0,26 (h=30) |
| Elevate | 50/1,8 (w=1216) | 24/1,8 |

Invariants (identiques aux deux formats) : noms/prix des cartes (16/16/12),
carte spotlight (14/10/14/10), labels Size/Color/Quantity (14), pastilles
taille (texte 9), palette entière, familles Jost + DM Sans (+ Open Sans sur
le seul copyright desktop).

---

## Conformité de l'intégration

Vérifiée au computed style (Playwright, 1440 px) sur 25 éléments : 24/25
conformes d'emblée. Seul écart trouvé et corrigé : le copyright desktop
rendait DM Sans 14 `#ddddde` au lieu d'**Open Sans Regular 16 capitalize
blanc** (Open Sans ajoutée à l'import Google Fonts ; l'override mobile
Jost 14 `#ddddde` conservé). Hauteurs inchangées (48 / 53 px).
