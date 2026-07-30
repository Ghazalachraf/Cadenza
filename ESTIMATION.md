# Cadenza — Estimation section par section
## Périmètre : Home desktop (`3:2`) + Homepage mobile (`451:38`) uniquement

**Stack** : HTML5 sémantique / SCSS / JS vanilla, sans build tool.
**Ressource** : 1 développeur (solo).
**Base de chiffrage** : vélocité mesurée sur ce projet — la Home desktop a été intégrée et validée W3C (0 erreur HTML, 0 erreur CSS) en une session.

> État détaillé et niveaux de fidélité : voir [ETAT.md](ETAT.md).

---

## 1. Home desktop — `3:2` (1440 × 13 729 px)

21 blocs. **Tous intégrés**, ordre conforme aux coordonnées Y de la maquette.

| # | Section | Node | Hauteur | Points techniques | Est. | Statut |
|---|---|---|---|---|---|---|
| 1 | PromoHeader | `6:5` | 42 px | barre promo, slider JS, langue/devise | 0,25 h | ✅ |
| 2 | Header nav | `29:5` | 80 px | nav en overlay sur le hero, logo centré | 0,5 h | ✅ |
| 3 | Hero | `56:116` | 873 px | photo plein écran, dégradé, CTA, dots | 0,5 h | ✅ |
| 4 | Promo banner #1 | `144:168` | 175 px | bandeau scindé + vignette produit | 0,25 h | ✅ |
| 5 | New Arrivals | `206:1193` | 789 px | onglets + carrousel + variantes au survol | 0,75 h | ✅ |
| 6 | Sale banner | `224:54` | 359 px | bandeau photo pleine largeur | 0,2 h | ✅ |
| 7 | Our Collections | `240:370` | 945 px | grille 4 tuiles asymétrique | 0,4 h | ✅ |
| 8 | Best Seller | `264:609` | 1 310 px | 10 cartes, 2 rangées, quick-shop au survol | 0,6 h | ✅ |
| 9 | Ticker + Elevate | `440:156` | 646 px | 2 marquees CSS + pastilles photo en ligne | 0,4 h | ✅ |
| 10 | Product Details | `264:415` | 687 px | galerie, tailles, couleurs, quantité | 0,5 h | ✅ |
| 11 | Latest Articles | `242:1416` | 1 447 px | grille mixte : 2 tuiles éditoriales + 4 produits | 0,7 h | ✅ *(ordre corrigé)* |
| 12 | Spotlight | `436:90` | 686 px | 2 panneaux shoppables + hotspots positionnés | 0,4 h | ✅ |
| 13 | Collections More Info | `406:157` | 998 px | accordéon 4 entrées + JS | 0,4 h | ✅ |
| 14 | After & Before | `406:209` | 1 133 px | slider comparatif, drag + clavier, `clip-path` | 0,6 h | ✅ |
| 15 | Seasonal Sale *(promo #3)* | `287:32` | 268 px | variante à 2 boutons (SHOP NOW / All collections) | 0,25 h | ✅ |
| 16 | Accessories | `287:62` | 979 px | grille asymétrique 4 tuiles | 0,4 h | ✅ |
| 17 | Timeline *(desktop-content-3)* | `416:523` | 924 px | `timeline_years` + `timeline_content` — composant inédit | 0,75 h | ✅ |
| 18 | Gallery @Cadenza | `268:979` | 521 px | bande Instagram 5 tuiles | 0,25 h | ✅ |
| 19 | Newsletter | `268:952` | 366 px | formulaire e-mail sur photo sombre | 0,25 h | ✅ |
| 20 | Footer | `268:854` | 400 px | 4 colonnes de liens + réseaux + back-to-top | 0,4 h | ✅ |
| 21 | Bottom footer | `440:120` | 48 px | copyright + moyens de paiement | 0,1 h | ✅ |

**Total desktop : 8,85 h — réalisé.**

---

## 2. Homepage mobile — `451:38` (390 × 12 166 px)

19 sections, **toutes extraites au pixel** via `get_design_context` sur leur node — détail des relevés dans [ETAT.md](ETAT.md) §2. L'ordre des sections mobile **suit exactement celui du desktop** : pas de réorganisation structurelle, l'essentiel du travail a été de l'adaptation de mise en page.

| # | Section mobile | Node | Hauteur | Équivalent desktop | Est. |
|---|---|---|---|---|---|
| M01 | promo header | `451:39` | 30 px | PromoHeader | 0,1 h |
| M02 | hero + header burger | `451:47` | 519 px | Hero + Header | 0,4 h |
| M03 | new arrivals | `451:71` | 658 px | New Arrivals | 0,3 h |
| M04 | 20%PROMO_container | `451:157` | 304 px | Sale banner | 0,2 h |
| M05 | our collections | `451:168` | 710 px | Our Collections | 0,3 h |
| M06 | best seller | `451:289` | 650 px | Best Seller | 0,3 h |
| M07 | ticker + elevate | `451:202` | 396 px | Ticker + Elevate | 0,2 h |
| M08 | product details | `451:232` | 977 px | Product Details | 0,4 h |
| M09 | latest articles | `451:343` | 1 283 px | Latest Articles | 0,4 h |
| M10 | spotlight | `451:1239` | 470 px | Spotlight | 0,3 h |
| M11 | collections more info | `451:1167` | 827 px | Collections More Info | 0,3 h |
| M12 | after & before | `451:1118` | 569 px | After & Before | 0,3 h |
| M13 | seasonal sale | `451:432` | 249 px | Seasonal Sale | 0,2 h |
| M14 | accessories | `451:450` | 555 px | Accessories | 0,3 h |
| M15 | **FAQ** | `451:953` | 850 px | ❌ aucun — section créée | 0,75 h |
| M16 | timeline | `451:1019` | 951 px | Timeline | 0,3 h |
| M17 | gallery | `451:479` | 310 px | Gallery | 0,2 h |
| M18 | newsletter | `451:503` | 225 px | Newsletter | 0,15 h |
| M19 | footer + bottom | `451:515` | 1 238 px | Footer + bottom | 0,4 h |

**Sous-total sections mobile : 5,8 h** — auxquelles s'ajoutent 0,25 h d'atelier de correspondance (les frames mobiles portent des noms génériques du type `Frame 1618873136`, remontés par les noms d'enfants et les coordonnées Y).

**Total mobile : 6,05 h réalisées**, sur 6,55 h chiffrées — la validation W3C est faite, la recette sur appareil réel reste due.

---

## 3. Synthèse

| Lot | Chiffré | Réalisé | **Reste** |
|---|---|---|---|
| Home desktop (21 blocs) | 8,85 h | 8,85 h | — |
| Homepage mobile (19 sections) | 6,55 h | 6,05 h | 0,5 h *(recette appareil réel)* |
| Finitions post-intégration | — | — | 0,25 h |
| **TOTAL** | **15,4 h** | **14,9 h** | **0,75 h** |

### Détail du reste — 0,75 h

| Tâche | Est. |
|---|---|
| Défilement horizontal des cartes Latest Articles en mobile | 0,25 h |
| Recette sur appareil réel (iOS / Android) | 0,5 h |

Le reste du travail dépend des arbitrages du §4.

**Qualité à date** : W3C Nu **0 erreur / 0 avertissement** · CSS Jigsaw **0 erreur** · 91 assets résolus · 2 698 lignes de CSS.

---

## 4. Écarts desktop / mobile constatés

Aucun de ces points n'a été tranché unilatéralement — ce sont des décisions de conception.

| # | Écart | Constat | Décision attendue |
|---|---|---|---|
| **A01** | Promo banner #1 (`144:168`) | Présent sur desktop, absent du frame mobile | Le masquer en mobile, ou l'ajouter à la maquette ? |
| **A02** | Section FAQ (`451:953`) | Présente sur mobile uniquement | Actuellement **mobile-only** (masquée > 1024 px). La porter sur desktop ? *(+0,5 h)* |
| **A03** | `Group 1321314644` | ✅ **Résolu** — l'extraction de la Timeline desktop confirme les 5 années 2020-2024 | — |
| **A04** | Blocs nommés `video` | La maquette ne fournit que des images fixes | De vraies vidéos sont-elles attendues ? *(+0,5 h + sources)* |
| **A05** | Onglets New Arrivals | Desktop : Outwears, Dresses, Skirt, **Bottoms**, Sneakers, Gym Suits — Mobile : mêmes moins « Bottoms », ordre Gym Suits/Sneakers inversé | Quelle liste fait foi ? Le markup porte les 6 onglets desktop |
| **A06** | Best Seller | Desktop : 2 rangées / 10 produits — Mobile : 1 rangée / 4 produits | Masquer la 2ᵉ rangée en mobile ou la conserver ? Actuellement conservée |
| **A07** | Bottom footer | Moyens de paiement présents sur desktop, absents du frame mobile | Actuellement masqués sous 1024 px. À confirmer |
| **A08** | Filet du bottom footer mobile | Filet pleine largeur au-dessus du copyright ; couleur non remontée par l'extraction | Valeur provisoire `rgba(255,255,255,0.2)` |
| **A09** | Spotlight | Desktop : 2 panneaux — Mobile : le panneau accessoires est absent | Masquer le premier panneau en mobile ? Les deux restent empilés |
| **A10** | Timeline | Desktop : 2 colonnes, **2022** actif — Mobile : 1 carte, **2024** actif alors que le contenu est « First collaboration » | Quelle année et quel contenu font foi ? |

---

## 5. Trello — 2 listes suffisent

Sur un périmètre d'une journée, un tableau à 8 colonnes est contre-productif. Structure minimale (découpage complet dans [TRELLO.md](TRELLO.md)) :

| Liste | Contenu |
|---|---|
| `⬜ À faire` | 1 carte par tâche du §3 « Détail du reste » |
| `⚙️ En cours` | max 1 carte |
| `✅ Terminé` | validé W3C |
| `🚧 Arbitrage` | les 5 écarts ouverts du §4 |

**Étiquettes** : 🟢 `Desktop` · 🟡 `Mobile` · 🔴 `Qualité` · ⚫ `Arbitrage`
**Champs** : `Est. (h)` · `Réel (h)` · `Node Figma` · `W3C OK`

### Checklist par carte « section »

```
□ get_design_context sur le node
□ Assets téléchargés + optimisés (si nouveaux)
□ HTML sémantique
□ SCSS dans scss/layout/_xxx.scss (+ @use)
□ Compilation manuelle → css/main.css (bump ?v=N)
□ Rendu vérifié vs maquette
□ W3C Nu = 0 erreur
```

**Règles** : 1 seule carte en cours · pas de clôture sans `W3C OK` · valeur douteuse → `🚧 Arbitrage`, jamais d'invention.
