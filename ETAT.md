# Cadenza — État d'avancement

**Périmètre** : Home desktop (`3:2`) + Homepage mobile (`451:38`)
**Validation** : W3C Nu **0 erreur / 0 avertissement** · CSS Jigsaw **0 erreur** · 95 assets résolus · 2 844 lignes de CSS

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
| 15 | Seasonal Sale | `287:32` | ✅ |
| 16 | Accessories | `287:62` | ✅ |
| 17 | Timeline | `416:523` | ✅ |
| 18 | Gallery @Cadenza | `268:979` | ✅ |
| 19 | Newsletter | `268:952` | ✅ |
| 20 | Footer + bottom | `268:854` / `440:120` | ✅ |

---

## 2. Homepage mobile — 19/19 sections extraites au pixel ✅

Toutes les sections proviennent désormais d'un `get_design_context` sur leur node :
tailles, graisses, interlignes, rayons et espacements sont repris tels quels.
Il ne reste plus de section calée « au jugé » sur la seule hauteur de frame.

| # | Section mobile | Node | Points relevés à l'extraction |
|---|---|---|---|
| M01 | Promo header | `451:39` | h=30, slider seul, texte 11 px |
| M02 | Hero + header burger | `451:47` | h=519, burger, logo 94×18, icônes 18 px |
| M03 | New Arrivals | `451:71` | onglets space-between, cartes 342 px |
| M04 | Sale banner | `451:157` | h=304, voile 0,6, titre 34/33 sur 272 px |
| M05 | Our Collections | `451:168` | 4 tuiles empilées, 80 px / 240 px |
| M06 | Best Seller | `451:289` | cartes 303 px, titre 24/30 sur 269 px |
| M07 | Ticker + Elevate | `451:202` | ticker h=30 / 13 px, elevate h=336, 3 pastilles distinctes |
| M08 | Product Details | `451:232` | colonne inversée, galerie 303×381 |
| M09 | Latest Articles | `451:343` | éditorial en tête, cartes ensuite |
| M10 | Spotlight | `451:1239` | panneau 470 px, repères 17,2 % / 71,5 %, carte 289×69 |
| M11 | Collections More Info | `451:1167` | **photo en tête**, titre 32/37, pas de 79 px |
| M12 | After & Before | `451:1118` | viewer 471 px, curseur à 77,2 %, poignée 42 px |
| M13 | Seasonal Sale | `451:432` | h=249, titre 24/33 sur 233 px, 2 CTA en capitales |
| M14 | Accessories | `451:450` | tuiles 348×325, rayon 6 |
| M15 | **FAQ** | `451:953` | section créée, mobile-only |
| M16 | Timeline | `451:1019` | années en grille 5 colonnes, flèches en dessous à droite |
| M17 | Gallery | `451:479` | bande défilante, tuiles 227×196 (gabarit desktop) |
| M18 | Newsletter | `451:503` | h=225, **formulaire sur une ligne**, champ 181×30 |
| M19 | Footer | `451:515` | colonne, gouttières 40/60, filet + copyright centré |

---

## 3. Commentaires du designer — Home desktop

Quinze commentaires relevés sur le fichier d'origine (`uTq2yHeiZnMF1eJwvjIHwe`).

| Commentaire | Portée | Traitement |
|---|---|---|
| « You can use them as icons if you'd like; please check the fixed header above. » | Header | État **fixe au scroll** ajouté (`site-header--fixed`) d'après le frame `Fixed_Header` **294:114** : fond blanc, texte noir, actions en icônes de 24 px (recherche, compte, panier). Bascule pilotée par `initFixedHeader()` |
| « use video or images » | Hero | **Résout A04** : les images fixes de la maquette suffisent, aucune source vidéo à prévoir. Les contrôles de lecture du frame `HeroSection-video` (pause 54 px) ne sont donc pas repris |
| « onClick : change the hero section image and content » | Hero | Carrousel réel : chaque puce bascule le **slide entier** (visuel, accroche, titre, boutons) via `initHeroCarousel()`. Second slide extrait du frame **440:158** |
| « hover » | New Arrivals | Déjà en place : `.product-card:hover` révèle les actions (favori, aperçu) et le sélecteur de taille / couleur |
| « On click or on hover, the width will increase, the image will zoom and the item number will appear » | Our Collections | La tuile large de la maquette est désormais comprise comme l'**état survolé** : au repos les 4 tuiles sont égales, au survol `flex-grow: 3`, zoom 1,08, voile porté à 0,45 et compteur révélé |
| « zoom the image and make it more darker · Display the number of items on this category » | Accessories | Même principe : zoom 1,08, voile passant à `rgba(0,0,0,0.4)` et compteur révélé. Le voile sombre statique de la tuile *Rings* a été retiré du markup |
| « onHover : display add to cart button & Quick View · zoom on image » | Best Seller | Le bloc *Add to Cart / Quick View* est posé sur **chaque** carte, plus zoom 1,06 |
| « on hover : zoom · display add to cart button · display fav & quick view button » | Latest Articles | Bouton *Add to Cart* ajouté aux 4 cartes, zoom 1,06, actions favori / aperçu déjà présentes |
| « move left to right » | Ticker haut | `ticker--ltr` inverse le sens de l'animation |
| « move right to left » | Ticker bas | Sens par défaut, conservé |
| « onClick or Hover the main img change to the target img » | Product Details | Vignettes converties en boutons : le survol donne un aperçu, le clic fixe le choix (`initProductGallery()`) |
| « onClick or Hover » | Spotlight | Les repères deviennent des boutons ; la carte produit n'apparaît qu'à leur contact (`initSpotlight()`) |
| « onClick » | Collections More Info | Déjà en place : `initAccordion()` |
| « move Up » | Footer | Retour en haut fluide sur la pastille (`initBackToTop()`) |
| « Onhaver : display the color name » | Product Details | ⛔ **Non fait** — voir A13 |

**Correctif induit** : le header était positionné en absolu sur le haut de page et recouvrait la barre promo. Il se cale désormais sous elle, conformément à la maquette où seul le header chevauche le hero.

**Défaut préexistant relevé** : la 5ᵉ carte Best Seller a un `__media` vide. Seuls 9 visuels sur 10 avaient été récupérés à l'intégration initiale, et aucun asset disponible ne correspond au manquant. La carte est laissée en l'état plutôt que supprimée, pour ne pas dévier des 10 cartes de la maquette.

---

## 4. Écarts desktop / mobile — à arbitrer

Aucun de ces points n'a été tranché unilatéralement.

| # | Écart | Constat | Décision attendue |
|---|---|---|---|
| **A01** | Promo banner #1 (`144:168`) | Présent sur desktop, absent du frame mobile | Le masquer en mobile ou l'ajouter à la maquette ? |
| **A02** | Section FAQ (`451:953`) | Présente sur mobile uniquement | Actuellement **mobile-only** (masquée > 1024 px). La porter sur desktop ? *(+0,5 h)* |
| **A03** | `Group 1321314644` | ✅ **Résolu** — c'est bien la Timeline (années 2020 → 2024) | — |
| **A04** | Blocs nommés `video` | ✅ **Résolu** — commentaire du designer : « use video or images » | — |
| **A05** | Onglets New Arrivals | Desktop : Outwears, Dresses, Skirt, **Bottoms**, Sneakers, Gym Suits — Mobile : les mêmes sans « Bottoms », ordre Gym Suits/Sneakers inversé | Quelle liste fait foi ? Le markup porte les 6 onglets desktop |
| **A06** | Best Seller | Desktop : 2 rangées / 10 produits — Mobile : 1 rangée / 4 produits | Masquer la 2ᵉ rangée en mobile ou la conserver ? Actuellement conservée |
| **A07** | Bottom footer | Les moyens de paiement figurent sur le desktop, pas sur le frame mobile | Actuellement **masqués sous 1024 px**. À confirmer |
| **A08** | Filet du bottom footer mobile | Le frame mobile ajoute un filet pleine largeur au-dessus du copyright ; sa couleur n'est pas remontée par l'extraction | Valeur provisoire `rgba(255,255,255,0.2)` — à confirmer |
| **A09** | Spotlight | Desktop : 2 panneaux (accessoires + blouse) — Mobile : le panneau accessoires est absent | Les deux panneaux restent empilés. Masquer le premier en mobile ? |
| **A10** | Timeline | Desktop : 2 colonnes / 2 cartes et **2022** actif — Mobile : 1 seule carte et **2024** actif, alors que le contenu affiché est « First collaboration » | Quelle année et quel contenu font foi ? La 2ᵉ colonne reste rendue |
| **A11** | Puces du hero | La maquette affiche **3 puces** mais le fichier ne contient que **2 frames de hero** (`56:116` et `440:158`) ; la puce active y est la deuxième | Contenu du 3ᵉ slide et ordre des slides. La 3ᵉ puce est rendue mais inactive |
| **A12** | Nombre d'articles par catégorie | La maquette ne donne le compteur que sur la tuile survolée : **Accessories 21** et **Rings 34**. Les 6 autres tuiles (Sets, Activewear, Lingerie, Necklaces, Glasses, Earrings) n'en ont aucun | Le mécanisme de révélation est en place ; il manque les valeurs pour les 6 autres catégories |
| **A13** | Nom de la couleur au survol | Les pastilles de couleur du bloc Product Details sont un **SVG unique** (`icon-color-swatches-pd.svg`), pas des éléments distincts. Impossible d'accrocher une infobulle par couleur sans la liste des teintes et de leurs noms | Fournir les noms et codes des couleurs, ou l'accord pour découper le SVG en pastilles individuelles *(+0,5 h)* |

---

## 5. Écarts d'intégration assumés

| Section | Maquette | Implémentation | Raison |
|---|---|---|---|
| M09 Latest Articles | Cartes produit en défilement horizontal | Cartes empilées verticalement | Le défilement horizontal exigerait un conteneur dédié autour des seules cartes, incompatible avec la grille partagée desktop/mobile sans dupliquer le markup |
| M10 Spotlight — panneau accessoires | Absent du frame mobile | Repères transposés depuis les coordonnées desktop, en pourcentages de la largeur de panneau (720 px) ; carte calée à 84 px comme sur le panneau extrait | Faute de frame mobile pour ce panneau ; sa position desktop (56,7 %) déborderait du cadre en 390 px |

---

## 6. Reste à faire

| Tâche | Est. |
|---|---|
| Défilement horizontal des cartes Latest Articles en mobile | 0,25 h |
| Recette sur appareil réel (iOS / Android) | 0,5 h |
| **Total** | **0,75 h** |

Le reste du travail dépend des arbitrages A01, A02, A05 → A13.
