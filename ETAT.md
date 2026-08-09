# Cadenza — État d'avancement

**Périmètre** : Home desktop (`3:2`) + Homepage mobile (`451:38`) + Checkout Page desktop (`544:13954`)
**Validation** : W3C Nu **0 erreur / 0 avertissement** · CSS Jigsaw **0 erreur** · aucun débordement horizontal de 320 à 2560 px (14 largeurs testées)

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

**Vérification pixel-perfect complète (audit Playwright vs frame `451:38`)** :
les 19 sections rendent à leur hauteur ET leur position Y exactes — page
totale **12 166 px = maquette**, dérive cumulée 1 px. Les écarts
inter-sections de la maquette (2 chevauchements, 8 respirations de +17 à
+85 px) sont reproduits par des `margin-top` documentés dans chaque
fichier SCSS. Sections retravaillées lors de cette passe : new arrivals,
best seller (1 rangée), spotlight (1 panneau), timeline (1 colonne +
« Read more »), product details, latest articles (cartes 344×570),
collections info, compare, FAQ, accessories, gallery, footer + copyright.

| # | Section mobile | Node | Points relevés à l'extraction |
|---|---|---|---|
| M01 | Promo header | `451:39` | h=30, slider seul, texte 11 px |
| — | *Promo banner* | *absent* | **Masqué en mobile** : la maquette `451:38` enchaîne le Hero directement sur les New Arrivals |
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
| M20 | Menu mobile (burger) | `451:782` | plein écran, accordéon Home/Shop/New Arrivals/Collection/About, suggestions + langue/devise. **About** affiche un chevron dans la maquette comme les autres entrées, mais n'a pas de mega-menu côté desktop : son sous-menu ne contient donc que le lien réel « About us » plutôt que des catégories inventées |

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
| « Onhaver : display the color name » | Product Details | ✅ **Résolu** — voir A13 (correction) |

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
| **A13** | Nom de la couleur au survol | ✅ **Corrigé** — constat initial erroné : `icon-color-swatches-pd.svg` contient en réalité 3 `<circle>` distincts (Ellipse10 noir #252324, Ellipse8 gris #989898, Ellipse9 violet #563f5f), pas un SVG assemblé. Reconstruites en 3 boutons cliquables (sélection + `title`/`aria-label` au survol, noms directement déduits des teintes) | — |

---

## 5. Écarts d'intégration assumés

| Section | Maquette | Implémentation | Raison |
|---|---|---|---|
| M09 Latest Articles | Cartes produit en défilement horizontal | Cartes empilées verticalement | Le défilement horizontal exigerait un conteneur dédié autour des seules cartes, incompatible avec la grille partagée desktop/mobile sans dupliquer le markup |
| M10 Spotlight — panneau accessoires | Absent du frame mobile | Repères transposés depuis les coordonnées desktop, en pourcentages de la largeur de panneau (720 px) ; carte calée à 84 px comme sur le panneau extrait | Faute de frame mobile pour ce panneau ; sa position desktop (56,7 %) déborderait du cadre en 390 px |

---

## 6. Système responsive fluide

Remplacement du point de rupture unique (1024 px, deux maquettes figées) par un système continu :

- `$bp-mobile: 768px` — bascule vers les valeurs mobiles extraites
- `fluid($cible, $plancher)` — `clamp()` qui interpole entre le plancher et la valeur desktop, base 1440 px (`fluid-m` en base 390 px pour les valeurs mobiles)
- `@include mobile { }` remplace les 21 `@media (max-width: 1024px)` dispersés
- Gouttières (`container-padding`), grilles à pistes fixes (Accessories, New Arrivals, Best Seller, Gallery, Product Details, Timeline, Compare, Spotlight, Hero) et valeurs mobiles calées sur 390 px converties en `clamp()`

Vérifié sans débordement horizontal sur 14 largeurs de 320 à 2560 px, Home et Checkout.

---

## 7. Checkout Page — `544:13954` (desktop uniquement)

Formulaire en 4 étapes repliables (accordéon, une seule ouverte à la fois) + récapitulatif de commande à droite, `position: sticky`.

| Élément | Détail |
|---|---|
| En-tête | Composant dédié `checkout-header` (PromoHeader + bandeau réduit nom/panier), la maquette n'affiche ni navigation ni recherche sur cette page |
| Étape 1 — Social Information | Entièrement extraite : civilité, nom/prénom, e-mail, mot de passe (afficher/masquer), anniversaire, 5 cases à cocher, bouton Next |
| Étapes 2 à 4 | En-têtes repliables fonctionnels (Addresses, Shipping Method, Payment) ; **aucun contenu** — la maquette ne fournit que les en-têtes collapsés, rien à extraire sans inventer |
| Récapitulatif | 2 articles avec **quantité +/- interactive** ajoutée à la demande (la maquette n'affichait que du texte statique « x2 »/« x1 ») ; Sous-total et Total recalculés en direct, frais de port fixes (17,00$) |
| Mobile | Récapitulatif placé avant le formulaire (`column-reverse`, même traitement que Product Details) ; **non extrait pixel par pixel** des frames `575:214` / `578:656` (3410 et 3806 px, contenu déjà connu par le desktop) — mise en page fluide seule |

**Coquille conservée telle quelle** : « Custmer data privacy » — texte de la maquette, non corrigé (règle : extraire, ne pas inventer).

---

## 8. Sélecteurs Langue et Devise — `87:2` / `87:82`

Menus déroulants dans la barre promo (desktop uniquement, masqués en mobile comme dans la maquette `451:39`). Un seul ouvert à la fois, fermeture au clic extérieur ou à l'Échap. 9 langues, 8 devises (la maquette n'affiche que ces listes, sans logique de traduction ou de conversion réelle — hors périmètre).

---

## 9bis. Méga-menus navbar — `297:228` (New Arrivals) / `297:237` (Collection)

Panneaux plein écran ancrés sous le header (fixe ou non), un seul ouvert à la fois, fermeture au clic extérieur ou à l'Échap. Desktop uniquement (le menu principal est déjà masqué en mobile au profit du burger, `451:52`).

- New Arrivals : 5 colonnes (catégories + 4 listes de liens), texte extrait tel quel — les liens pointent vers `shop.html`, page pas encore construite (cf. §9).
- Collection : 6 cartes image 227×264, overlay sombre appliqué uniquement là où la maquette en montre un (Lingerie 10 %, bottom 50 %) — les 4 autres cartes n'en ont pas dans le fichier source, gardé fidèle plutôt qu'uniformisé.
- Logo `checkout-header` : remplacé le texte "Cadenza" par `logo.svg`, pour rester cohérent avec le header principal.

Nœud `319:527` (variante "Best Sellers" au lieu de "Collection") repéré mais non implémenté : il appartient visiblement à l'état navbar d'une autre page (Shop ?) qui n'existe pas encore dans le projet — signalé, pas deviné.

## 9ter. Section Product Details — rendue fonctionnelle (`264:…`)

Le lien Figma `node-id=3-2` donné pour "la page Twilight Whisper Skirt" pointait en fait sur le frame `Home` entier (13 729 px) : il n'existe pas de page produit dédiée dans le fichier, seulement cette section déjà présente sur la homepage (`index.html`, déjà extraite au pixel dans une session précédente). Le screenshot fourni correspondait donc à elle. Câblée en JS (`initProductDetails`, `js/main.js`) :

- Taille : sélection au clic, un seul bouton actif.
- Quantité : +/-, minimum 1.
- Add to cart / Buy it now : ajoute (ou incrémente si même produit + taille déjà présents) une ligne dans le panier, avec le prix recalculé via le même contrat `data-*` que le tiroir panier et le récapitulatif checkout ; Buy it now enchaîne vers `checkout.html`.
- Couleur : **interactive** — sélection au clic entre les 3 teintes réelles (Black/Gray/Purple), incluse dans la ligne panier ; voir A13 (corrigé).

## 9quater. Bug logo corrigé + robustesse du curseur "Choose your colour"

**Logo cassé (régression signalée par l'utilisateur).** `assets/icons/logo.svg` n'a jamais été un export isolé du logo : le fichier embarquait tout le fond du frame `Home` (un rectangle blanc de 1440×13729), et les tracés du logo étaient eux-mêmes remplis en blanc — posés sur ce fond blanc, ils étaient invisibles (blanc sur blanc), d'où le rectangle vide vu par l'utilisateur. Corrigé en réextrayant l'asset isolé depuis Figma (`114:788`, noir `#252324`) :
- `logo.svg` (noir) : état par défaut, utilisé tel quel par le `checkout-header` (fond blanc) et par le header une fois figé au scroll (fond blanc).
- `logo-white.svg` (même tracé, blanc) : nouvel asset pour l'état initial du header, superposé au hero (texte de nav blanc).
- Les deux `<img>` coexistent dans `header.html`, basculés par `.site-header--fixed` en CSS — même mécanisme que le basculement libellés/icônes déjà en place.

**Carrousel "Neri Loungewear" (liens `401:99` / `401:26`).** Ces deux frames sont en réalité deux captures d'état (drag à 50 % et à 86 %) du *même* composant, déjà construit dans le projet : la section `.compare` ("Choose your colour", `js/main.js` → `initCompare`). Contenu, textes et bouton "View product" correspondent exactement. En testant le glisser-déposer j'ai ajouté `touch-action: none` sur `.compare__viewer` et `.compare__handle` — sans cette propriété, un geste tactile ou trackpad peut faire perdre la capture du pointeur en plein glissement (le navigateur interprète le geste comme un défilement de page). Correction standard pour tout composant à glisser basé sur Pointer Events.

## 9quinquies. `js/*.js` sans cache-busting — clic couleur signalé "ne marche pas"

`css/main.css` est chargé avec `?v=N` (bumpé à chaque compilation), mais `js/includes.js` et `js/main.js` étaient chargés sans aucun paramètre. Le serveur local (`http-server`) renvoie ces fichiers avec `Cache-Control: max-age=3600` : après une modification JS, le navigateur continue de servir l'ancien script pendant jusqu'à 1h, même sur un rechargement normal (pas seulement un cache obsolète ponctuel). C'est ce qui expliquait le retour « le clic sur une couleur ne fonctionne pas » alors que le code était correct et validé par test automatisé. Les deux scripts portent désormais `?v=19` dans `index.html` et `checkout.html`, à bumper avec `css/main.css` à chaque modification JS.

## 10. Reste à faire

| Tâche | Est. |
|---|---|
| Défilement horizontal des cartes Latest Articles en mobile | 0,25 h |
| Recette sur appareil réel (iOS / Android) | 0,5 h |
| Checkout — étapes 2 à 4 (Addresses / Shipping / Payment) | à chiffrer une fois les frames identifiés |
| Checkout — extraction pixel des frames mobiles | à chiffrer si le mobile checkout devient prioritaire |
| **Total connu** | **0,75 h** |

Le reste du travail dépend des arbitrages A01, A02, A05 → A13.

## 11. En attente — signalé par l'utilisateur, pas assez d'info pour agir

- **Carte New Arrivals ("Noya Slim Dress")** — ✅ **Résolu** : l'utilisateur a confirmé vouloir que l'effet complet de la carte Noya (panneau taille/couleur + bouton panier au survol) soit généralisé aux 5 cartes du carrousel, pas seulement celle qui l'avait dans la maquette (`206:1193`). Fait : les 5 cartes partagent désormais le même bloc `.product-card__variants` + `.product-card__cart-btn`, avec les mêmes valeurs de démonstration (Size M/S/L, `icon-swatches-strip.svg`) déjà utilisées par Noya — décision explicite de l'utilisateur, pas une extraction Figma supplémentaire.
- **Grille "Samantha Activewear" ×3 à prix différents** : composant introuvable dans le code actuel, aucun lien Figma fourni ne correspond. À localiser (bouton/page qui l'ouvre) avant de pouvoir agir.
