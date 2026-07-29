# Cadenza — État d'avancement

**Périmètre** : Home desktop (`3:2`) + Homepage mobile (`451:38`)
**Validation** : W3C Nu **0 erreur / 0 avertissement** · CSS Jigsaw **0 erreur** · 92 assets résolus · 2 602 lignes de CSS

---

## 1. Home desktop — 20/20 sections ✅

Ordre conforme aux coordonnées Y de la maquette.

| # | Section | Node | Statut |
|---|---|---|---|
| 1 | PromoHeader | `6:5` | ✅ |
| 2 | Header nav | `29:5` | ✅ |
| 3 | Hero | `56:116` | ✅ |
| 4 | Promo banner #1 | `144:168` | ✅ |
| 5 | New Arrivals | `206:1193` | ✅ |
| 6 | Sale banner | `224:54` | ✅ |
| 7 | Our Collections | `240:370` | ✅ |
| 8 | Best Seller | `264:609` | ✅ |
| 9 | Ticker + Elevate | `440:156` | ✅ |
| 10 | Product Details | `264:415` | ✅ |
| 11 | Latest Articles | `242:1416` | ✅ *(ordre corrigé)* |
| 12 | Spotlight | `436:90` | ✅ |
| 13 | Collections More Info | `406:157` | ✅ |
| 14 | After & Before | `406:209` | ✅ |
| 15 | Seasonal Sale | `287:32` | ✅ *(ajouté)* |
| 16 | Accessories | `287:62` | ✅ |
| 17 | Timeline | `416:523` | ✅ *(ajouté)* |
| 18 | Gallery @Cadenza | `268:979` | ✅ |
| 19 | Newsletter | `268:952` | ✅ |
| 20 | Footer + bottom | `268:854` / `440:120` | ✅ |

---

## 2. Homepage mobile — 19/19 sections couvertes

**Niveau de fidélité** — toutes les sections sont responsives et validées, mais elles ne sont pas toutes issues d'une extraction Figma complète :

| Niveau | Sections | Méthode |
|---|---|---|
| 🟢 **Extrait au pixel** | M01, M02, M03, M05, M06, M08, M09, M14, M15 | `get_design_context` sur le node : tailles, graisses, interlignes et espacements repris tels quels |
| 🟡 **Calé sur la hauteur de frame** | M04, M07, M10, M11, M12, M13, M16, M17, M18, M19 | Hauteur exacte du frame + tokens typographiques du projet ; les valeurs intermédiaires sont déduites, non extraites |

| # | Section mobile | Node | Fidélité |
|---|---|---|---|
| M01 | Promo header | `451:39` | 🟢 |
| M02 | Hero + header burger | `451:47` | 🟢 |
| M03 | New Arrivals | `451:71` | 🟢 |
| M04 | Sale banner | `451:157` | 🟡 |
| M05 | Our Collections | `451:168` | 🟢 |
| M06 | Best Seller | `451:289` | 🟢 |
| M07 | Ticker + Elevate | `451:202` | 🟡 |
| M08 | Product Details | `451:232` | 🟢 |
| M09 | Latest Articles | `451:343` | 🟢 |
| M10 | Spotlight | `451:1239` | 🟡 |
| M11 | Collections More Info | `451:1167` | 🟡 |
| M12 | After & Before | `451:1118` | 🟡 |
| M13 | Seasonal Sale | `451:432` | 🟡 |
| M14 | Accessories | `451:450` | 🟢 |
| M15 | **FAQ** | `451:953` | 🟢 *(section créée)* |
| M16 | Timeline | `451:1019` | 🟡 |
| M17 | Gallery | `451:479` | 🟡 |
| M18 | Newsletter | `451:503` | 🟡 |
| M19 | Footer | `451:515` | 🟡 |

---

## 3. Écarts desktop / mobile — à arbitrer

Aucun de ces points n'a été tranché unilatéralement.

| # | Écart | Constat | Décision attendue |
|---|---|---|---|
| **A01** | Promo banner #1 (`144:168`) | Présent sur desktop, absent du frame mobile | Le masquer en mobile ou l'ajouter à la maquette ? |
| **A02** | Section FAQ (`451:953`) | Présente sur mobile uniquement | Actuellement **mobile-only** (masquée > 1024 px). La porter sur desktop ? *(+0,5 h)* |
| **A03** | `Group 1321314644` | ✅ **Résolu** — l'extraction de la Timeline desktop confirme les 5 années 2020-2024 | — |
| **A04** | Blocs nommés `video` | La maquette ne fournit que des images fixes | De vraies vidéos sont-elles attendues ? *(+0,5 h + sources)* |
| **A05** | Onglets New Arrivals | Desktop : Outwears, Dresses, Skirt, **Bottoms**, Sneakers, Gym Suits — Mobile : mêmes moins « Bottoms », ordre Gym Suits/Sneakers inversé | Quelle liste fait foi ? Le markup porte les 6 onglets desktop |
| **A06** | Best Seller | Desktop : 2 rangées / 10 produits — Mobile : 1 rangée / 4 produits | Masquer la 2ᵉ rangée en mobile ou la conserver ? Actuellement conservée |

---

## 4. Écarts d'intégration assumés

| Section | Maquette | Implémentation | Raison |
|---|---|---|---|
| M09 Latest Articles | Cartes produit en défilement horizontal | Cartes empilées verticalement | Le défilement horizontal exigerait un conteneur dédié autour des seules cartes, incompatible avec la grille partagée desktop/mobile sans dupliquer le markup |
| M10 Spotlight | Hotspots positionnés en pixels | Masqués sous 1024 px | Les coordonnées desktop (`left: 186px`…) sortent du cadre en 390 px ; un repositionnement en pourcentage nécessite les coordonnées mobiles, non extraites |

---

## 5. Reste à faire

| Tâche | Est. |
|---|---|
| Extraction fine des 10 sections mobiles 🟡 | 1,5 h |
| Repositionnement des hotspots Spotlight en mobile | 0,25 h |
| Défilement horizontal des cartes Latest Articles en mobile | 0,25 h |
| Recette sur appareil réel (iOS / Android) | 0,5 h |
| Commit + push vers `github.com/Ghazalachraf/Cadenza.git` | 0,25 h |
| **Total** | **2,75 h** |

> ⚠️ **Rien n'a encore été commité ni poussé** sur le dépôt distant.
