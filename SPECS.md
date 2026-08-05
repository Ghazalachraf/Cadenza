# SPECS — Référence pixel-perfect (Home desktop, 1440 px)

Relevé des dimensions, gouttières et écarts entre la maquette Figma
(`PoREWwJw9y93DuJlApSDfv`, frame `Home` = `3:2`) et le rendu réel du site.

**Méthode** — aucune valeur n'est estimée à l'œil :

1. Les géométries Figma sont extraites du dump de métadonnées du frame `Home`
   (629 nœuds : `id`, `name`, `x`, `y`, `width`, `height`).
2. Le rendu est mesuré dans Chrome à 1440×1000 via `getBoundingClientRect()` +
   `getComputedStyle()` (Playwright), après chargement complet des polices et
   défilement forcé pour déclencher les images hors écran.
3. Les gouttières Figma sont **dérivées** de la position des enfants directs
   (`padding-top` = `y` du premier enfant, `padding-bottom` = hauteur de la
   section − bas du dernier enfant).

---

## 1. Sections — hauteur et gouttières

`Figma` et `rendu` sont des hauteurs en px à 1440 de large. `pad-top` compare la
gouttière haute dérivée de Figma à celle réellement appliquée.

| Section | Frame | Figma W×H | Rendu W×H | Écart H | pad-top Figma | pad-top rendu | pad-left rendu |
|---|---|---|---|---|---|---|---|
| `.promo-header` | `6:5` | 1440×42 | 1440×28,0 | **−14,0** | 9 | 2 | 102 |
| `.hero` | `56:116` | 1440×873 | 1440×873,0 | ✅ | 0 | 0 | 0 |
| `.promo-banner` | `144:168` | 1440×175 | 1440×205,2 | **+30,2** | 30 | 30 | 102 |
| `.new-arrivals` | `206:1193` | 1440×789 | 1440×824,8 | **+35,8** | 94 | 94 | 102 |
| `.sale-banner` | `224:54` | 1440×359 | 1440×359,0 | ✅ | 0 | 0 | 0 |
| `.our-collections` | `240:370` | 1440×945 | 1440×960,8 | **+15,8** | 100 | 100 | 10 |
| `.best-seller` | `264:609` | 1440×1310 | 1440×1365,9 | **+55,9** | 94 | 94 | 102 |
| `.elevate` ¹ | `440:156` | 1440×564 | 1440×540,0 | **−24,0** | — | 90 | 40 |
| `.product-details` | `264:415` | 1440×687 | 1440×740,6 | **+53,6** | 100 | 100 | 42 |
| `.latest-articles` | `242:1416` | 1440×1447 | 1440×1451,2 | +4,2 | 30 | 30 | 10 |
| `.spotlight` | `436:90` | 1440×686 | 1440×686,0 | ✅ | 0 | 0 | 0 |
| `.collections-info` | `406:157` | 1440×998 | 1440×1006,8 | +8,8 | 130 | 130 | 10 |
| `.compare` | `406:209` | 1440×1133 | 1440×1151,2 | **+18,2** | 60 | 60 | 0 |
| `.seasonal-sale` | `287:32` | 1440×268 | 1440×268,0 | ✅ | 70 ² | 0 | 102 |
| `.accessories` | `287:62` | 1440×979 | 1440×974,8 | −4,2 | 94 | 94 | 10 |
| `.timeline` | `416:523` | 1440×924 | 1216×1010,0 | **+86,0** | 57 | 100 | 20 |
| `.gallery` | `268:979` | 1440×521 | 1440×543,2 | **+22,2** | 100 | 100 | 10 |
| `.newsletter` | `268:952` | 1440×366 | 1440×366,0 | ✅ | 0 | 0 | 0 |
| `.site-footer` | `268:854` | 1440×400 | 1440×434,0 | **+34,0** | 100 | 100 | 100 |
| `.bottom-footer` | `440:120` | 1440×48 | 1440×48,0 | ✅ | 12 | 12 | 90 |

¹ Le frame Figma `440:156` (646 px) **englobe les deux bandeaux ticker** (41 px
chacun), qui sont des éléments séparés (`.ticker`) dans le DOM. La ligne compare
donc le bloc central seul : 646 − 41 − 41 = 564. Mesuré bout à bout
(`ticker + .elevate + ticker`), l'ensemble fait **644,8 px contre 646 attendus,
soit −1,2 px** : c'est la répartition interne qui diffère, pas le total.

² `.seasonal-sale` positionne son contenu en absolu ; la gouttière dérivée n'est
pas comparable, mais la hauteur totale est exacte.

**6 sections sur 20 sont déjà au pixel près.** Le `padding-top` dérivé de Figma
correspond **exactement** à celui appliqué sur 15 sections — les gouttières ne
sont donc pas la cause des écarts, le contenu l'est.

---

## 2. Composants — cartes produit

| Composant | Frame | Figma W×H | Rendu W×H | Écart W | Écart H |
|---|---|---|---|---|---|
| `.product-card` (New Arrivals) | `206:1204` | 342×482 | 342,0×508,8 | ✅ | **+26,8** |
| `.product-card__media` | `206:1205` | 342×408 | 340,0×408,0 | −2,0 | ✅ |
| `.best-seller-card` | `264:625` | 303×433 | 303,0×449,8 | ✅ | **+16,8** |
| `.best-seller-card__media` | `264:626` | 303×381 | 303,0×381,0 | ✅ | ✅ |

Les **zones image sont exactes au pixel** (408 et 381). Tout l'écart vient du
bloc de texte sous l'image. Décomposition de `.best-seller-card` :

| | Figma | Rendu |
|---|---|---|
| image | 381 | 381 |
| marge avant le nom | 18 | 18 |
| hauteur du nom (16 px Jost) | **11** (hauteur de capitale) | **22,4** (`line-height` 1,4) |
| espace nom → prix | 12 | 6 |
| hauteur du prix (16 px DM Sans) | **11** | **22,4** |
| **total** | **433** | **449,8** |

---

## 3. Cause racine des écarts

Figma applique `text-box-trim: trim-both` / `text-box-edge: cap alphabetic` à
tous ses textes : la boîte d'un texte est rognée à la **hauteur de capitale**.
Un titre de 34 px y occupe 24 px de haut, un nom de 16 px en occupe 11.

En CSS, la boîte d'une ligne vaut `line-height`. Le projet applique
`line-height: 1.4` globalement (`scss/base/_reset.scss`), d'où des boîtes ~2×
plus hautes que dans la maquette. Chaque bloc de texte pousse donc ce qui le
suit, et l'écart s'accumule : **la page se termine ~180 à 195 px plus bas que la
maquette** (mesuré par position absolue, cf. §4).

La propriété CSS qui reproduit exactement ce comportement (`text-box-trim`)
**est rejetée par le validateur W3C Jigsaw** (testée : « Property `text-box-trim`
doesn't exist »). Elle est donc écartée par la règle « 0 erreur Jigsaw » du
projet. La correction doit passer par des `line-height` explicites + marges
recalibrées, section par section.

---

## 4. Dérive cumulée (position absolue de chaque section)

Mesurée depuis le haut de la barre promo, comparée au `y` Figma dans le frame `Home`.

| Section | Figma y | Rendu y | Dérive |
|---|---|---|---|
| `.hero` | 42 | 28 | −14 |
| `.promo-banner` | 915 | 901 | −14 |
| `.new-arrivals` | 1090 | 1106 | +16 |
| `.our-collections` | 2238 | 2290 | +52 |
| `.best-seller` | 3183 | 3251 | +68 |
| `.product-details` | 5139 | 5261 | +122 |
| `.latest-articles` | 5826 | 6002 | +176 |
| `.spotlight` | 7283 | 7453 | +170 |
| `.collections-info` | 7973 | 8139 | +166 |
| `.compare` | 8971 | 9146 | +175 |
| `.accessories` | 10372 | 10565 | +193 |
| `.gallery` | 12355 | 12550 | **+195** |
| `.newsletter` | 12915 | 13093 | +178 |

---

## 5. Correctifs identifiés, chiffrés

Écarts de gouttière — indépendants du problème de `line-height`, donc corrigeables
directement et sans effet de bord :

| Section | Propriété | Actuel | Figma | Gain |
|---|---|---|---|---|
| `.promo-header` | `padding` vertical | 2 px | **9 px** | +14 px (comble le −14) |
| `.timeline` | `padding` vertical | 100 px | **57 px** | −86 px |
| `.best-seller` | `padding-bottom` | 80 px | **63 px** | −17 px |
| `.site-footer` | `padding-bottom` | 100 px | **66 px** | −34 px |

À eux seuls, ces 4 correctifs retirent **~123 px** de la dérive cumulée sans
toucher à la typographie.

Le reste (~70 px) tient au rognage à la hauteur de capitale et demande une
recalibration `line-height` + marges sur les blocs de texte des cartes
(`.product-card`, `.best-seller-card`, `.ticker`) et les titres de section.
