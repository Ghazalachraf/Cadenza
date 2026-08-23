// ==========================================================================
// main.js — page content behaviour (accordion, compare slider, carousels)
// ==========================================================================

// --- Cartes New Arrivals : taille, couleur et favoris ---------------------
// Même mécanique de sélection que product-details : un bouton actif par
// groupe, scopé à chaque carte.
function initProductCards() {
  document.querySelectorAll('.product-card').forEach((card) => {
    const sizes = card.querySelectorAll('.product-card__size');
    sizes.forEach((button) => {
      button.addEventListener('click', () => {
        sizes.forEach((other) => other.classList.remove('product-card__size--active'));
        button.classList.add('product-card__size--active');
      });
    });

    wireSwatchGroup(card.querySelectorAll('.product-card__color'), 'product-card__color--active');
    wireWishlistToggle(card);
  });
}

// --- Favoris : bascule partagée par toutes les familles de cartes ---------
function wireWishlistToggle(card) {
  const button = card.querySelector('[data-wishlist-toggle]');
  const icon = button?.querySelector('img');
  if (!button || !icon) return;

  button.addEventListener('click', () => {
    const isActive = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!isActive));
    icon.src = isActive
      ? 'assets/icons/icon-wishlist-btn.svg'
      : 'assets/icons/icon-wishlist-btn-active.svg';
  });
}

// --- Sélection d'une pastille de couleur ----------------------------------
function wireSwatchGroup(swatches, activeClass) {
  swatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      swatches.forEach((other) => {
        other.classList.remove(activeClass);
        other.setAttribute('aria-pressed', 'false');
      });
      swatch.classList.add(activeClass);
      swatch.setAttribute('aria-pressed', 'true');
    });
  });
}

// --- Ajout au panier depuis une carte sans variante nommée ----------------
// Réutilise le contrat cart-item/wireCartItem/updateCartInstance déjà en
// place pour product-details, mais sans les lignes Color/Size : ces cartes
// n'exposent pas de variante nommée côté Figma (les pastilles ne portent
// qu'une valeur hexadécimale, pas de libellé). La correspondance panier se
// fait donc seulement sur le nom.
function addUnnamedVariantToCart({ name, unitPrice, image }) {
  // Récupérés au clic plutôt qu'à l'initialisation : le panneau panier
  // (components/panels.html) est injecté de façon asynchrone par
  // includes.js, dont le DOMContentLoaded n'attend pas celui de main.js
  // (deux gestionnaires distincts, l'un async) — au chargement de la page
  // ces éléments n'existent pas encore dans le DOM.
  const cartList = document.querySelector('[data-cart-items]');
  const cartInstance = document.querySelector('[data-cart-instance][data-panel]');
  if (!cartList || !cartInstance) return;

  const existing = Array.from(cartList.querySelectorAll('.cart-item')).find((item) => (
    item.querySelectorAll('.cart-item__attr').length === 0
    && item.querySelector('.cart-item__name')?.textContent === name
  ));

  if (existing) {
    const existingQty = existing.querySelector('[data-qty]');
    existingQty.textContent = parseInt(existingQty.textContent, 10) + 1;
  } else {
    const item = document.createElement('li');
    item.className = 'cart-item';
    item.dataset.unitPrice = unitPrice;
    item.innerHTML = `
      <img class="cart-item__image" src="${image}" alt="">
      <div class="cart-item__body">
        <p class="cart-item__name">${name}</p>
        <div class="cart-item__quantity">
          <button type="button" class="cart-item__step" data-qty-inc aria-label="Augmenter la quantité">
            <img src="assets/icons/icon-plus-small.svg" alt="" width="22" height="22">
          </button>
          <span class="cart-item__qty" data-qty>1</span>
          <button type="button" class="cart-item__step" data-qty-dec aria-label="Diminuer la quantité">
            <img src="assets/icons/icon-minus-small.svg" alt="" width="22" height="22">
          </button>
        </div>
      </div>
      <button type="button" class="cart-item__remove" data-cart-remove aria-label="Retirer ${name}">
        <img src="assets/icons/icon-trash.svg" alt="" width="16" height="16">
      </button>
      <p class="cart-item__price" data-line-price></p>
    `;
    cartList.appendChild(item);
    wireCartItem(item, cartInstance);
  }

  updateCartInstance(cartInstance);
  document.querySelector('[data-panel-open="cart"]')?.click();
}

// --- Cartes Best Seller : favoris, Add to Cart, Quick View ----------------
// Quick View est un vrai lien vers product.html (markup converti depuis
// <button>, cf. product-card).
function initBestSellerCards() {
  document.querySelectorAll('.best-seller-card').forEach((card) => {
    wireWishlistToggle(card);

    const cartBtn = card.querySelector('.best-seller-card__quickshop-btn--cart');
    const name = card.querySelector('.best-seller-card__name')?.textContent;
    const priceText = card.querySelector('.best-seller-card__price')?.textContent;
    const image = card.querySelector('.best-seller-card__image')?.getAttribute('src');
    if (!cartBtn || !name || !priceText || !image) return;

    const unitPrice = parseFloat(priceText.replace(',', '.'));
    cartBtn.addEventListener('click', () => addUnnamedVariantToCart({ name, unitPrice, image }));
  });
}

// --- Cartes Latest Articles : favoris, couleurs, Add to Cart --------------
// Contrairement aux cartes New Arrivals, les pastilles ne sont plus une image
// assemblée : chaque cercle des fichiers swatches-*.svg est devenu un bouton,
// donc sélectionnable.
function initArticleCards() {
  document.querySelectorAll('.article-card').forEach((card) => {
    wireWishlistToggle(card);
    wireSwatchGroup(card.querySelectorAll('.article-card__swatch'), 'article-card__swatch--active');

    const cartBtn = card.querySelector('.article-card__cart');
    const name = card.querySelector('.article-card__name')?.textContent;
    const priceText = card.querySelector('.article-card__price')?.textContent;
    const image = card.querySelector('.article-card__image')?.getAttribute('src');
    if (!cartBtn || !name || !priceText || !image) return;

    const unitPrice = parseFloat(priceText.replace(',', '.'));
    cartBtn.addEventListener('click', () => addUnnamedVariantToCart({ name, unitPrice, image }));
  });
}

// --- Accordion (collectionsMoreInfo) --------------------------------------
// Un seul panneau ouvert à la fois. Seul « Outwears » a un paragraphe dans
// la maquette (406:213) : les 3 autres catégories (Trending Tops, latest
// brand, Gym Suits) n'en ont aucun côté Figma. Avant ce correctif, cliquer
// dessus ne faisait rien (`if (!body) return`) et le paragraphe d'Outwears
// restait affiché en permanence, donnant l'impression que chaque titre
// montrait le même texte. Désormais, cliquer sur l'un d'eux ferme
// correctement le panneau ouvert plutôt que de laisser un contenu qui ne
// lui correspond pas — sans inventer de texte pour les 3 catégories vides.
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  const closeAll = () => {
    items.forEach((item) => {
      const body = item.querySelector('.accordion-item__body');
      const icon = item.querySelector('.accordion-item__icon');
      if (body) body.style.display = 'none';
      if (icon) icon.src = 'assets/icons/icon-plus.svg';
    });
  };

  items.forEach((item) => {
    const toggle = item.querySelector('[data-accordion-toggle]');
    const body = item.querySelector('.accordion-item__body');
    const icon = item.querySelector('.accordion-item__icon');

    toggle.addEventListener('click', () => {
      const wasOpen = body ? body.style.display !== 'none' : false;
      closeAll();
      if (body && !wasOpen) {
        body.style.display = '';
        icon.src = 'assets/icons/icon-minus.svg';
      }
    });
  });
}

// --- Before/after colour comparison slider --------------------------------
function initCompare() {
  const viewer = document.querySelector('[data-compare]');
  const handle = document.querySelector('[data-compare-handle]');
  if (!viewer || !handle) return;

  let dragging = false;

  const setPosition = (clientX) => {
    const rect = viewer.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const percent = Math.min(Math.max(ratio, 0), 1) * 100;
    viewer.style.setProperty('--compare-pos', `${percent}%`);
    handle.setAttribute('aria-valuenow', Math.round(percent));
  };

  handle.addEventListener('pointerdown', (event) => {
    dragging = true;
    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener('pointermove', (event) => {
    if (dragging) setPosition(event.clientX);
  });

  handle.addEventListener('pointerup', (event) => {
    dragging = false;
    handle.releasePointerCapture(event.pointerId);
  });

  handle.addEventListener('keydown', (event) => {
    const current = Number(handle.getAttribute('aria-valuenow'));
    if (event.key === 'ArrowLeft') {
      const next = Math.max(current - 5, 0);
      viewer.style.setProperty('--compare-pos', `${next}%`);
      handle.setAttribute('aria-valuenow', next);
    }
    if (event.key === 'ArrowRight') {
      const next = Math.min(current + 5, 100);
      viewer.style.setProperty('--compare-pos', `${next}%`);
      handle.setAttribute('aria-valuenow', next);
    }
  });
}

// --- Product carousel arrows ----------------------------------------------
function initProductCarousel() {
  const carousels = document.querySelectorAll('.product-carousel');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.product-carousel__track');
    const prev = carousel.querySelector('.product-carousel__arrow--prev');
    const next = carousel.querySelector('.product-carousel__arrow--next');
    if (!track) return;

    const step = 350;
    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step, behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: step, behavior: 'smooth' }));
  });
}

// --- Accordéon FAQ (mobile) -----------------------------------------------
// Un seul bloc ouvert à la fois, comme pour l'accordéon collectionsMoreInfo.
// Seule la première question a une réponse dans la maquette (451:966) : les
// 4 autres n'en ont aucune côté Figma. Avant ce correctif, `if (!answer)
// return` faisait que cliquer dessus ne produisait rien du tout — chevron
// compris. Elles referment désormais le bloc ouvert, sans qu'on invente de
// texte pour autant.
function initFaq() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  const closeAll = () => {
    items.forEach((item) => {
      const answer = item.querySelector('.faq__answer');
      const chevron = item.querySelector('.faq__chevron');
      if (answer) answer.style.display = 'none';
      if (chevron) chevron.src = 'assets/icons/icon-faq-chevron-right.svg?v=2';
    });
  };

  items.forEach((item) => {
    const toggle = item.querySelector('[data-faq-toggle]');
    const answer = item.querySelector('.faq__answer');
    const chevron = item.querySelector('.faq__chevron');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const wasOpen = answer ? answer.style.display !== 'none' : false;
      closeAll();
      if (answer && !wasOpen) {
        answer.style.display = '';
        chevron.src = 'assets/icons/icon-faq-chevron-down.svg?v=2';
      }
    });
  });
}

// --- Hero carousel --------------------------------------------------------
// Commentaire du designer : « onClick : change the hero section image and
// content ». Chaque puce bascule donc le slide entier — visuel, accroche et
// boutons — et non la seule image de fond.
function initHeroCarousel() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const slides = hero.querySelectorAll('[data-hero-slide]');
  const dots = hero.querySelectorAll('[data-hero-dot]');
  const playback = hero.querySelector('[data-hero-playback]');
  if (!slides.length || !dots.length) return;

  // Chaque puce cible un slide via data-hero-target : plusieurs puces
  // peuvent pointer vers le même slide (la 3e puce reboucle sur la photo
  // du 1er slide), donc la position "courante" suit l'index de puce, pas
  // l'index de slide.
  const targets = [...dots].map((dot) => Number(dot.dataset.heroTarget ?? 0));

  let current = 0;
  let timer = null;

  const show = (dotIndex) => {
    current = dotIndex;
    const slideIndex = targets[dotIndex];
    slides.forEach((slide, i) => {
      slide.hidden = i !== slideIndex;
      slide.classList.toggle('hero__slide--active', i === slideIndex);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('hero__dot--active', i === dotIndex);
      dot.setAttribute('aria-current', i === dotIndex ? 'true' : 'false');
    });
  };

  const next = () => {
    show((current + 1) % dots.length);
  };

  const play = () => {
    if (timer || dots.length < 2) return;
    timer = setInterval(next, 5000);
    playback?.setAttribute('aria-pressed', 'true');
    playback?.setAttribute('aria-label', 'Pause slideshow');
  };

  const pause = () => {
    clearInterval(timer);
    timer = null;
    playback?.setAttribute('aria-pressed', 'false');
    playback?.setAttribute('aria-label', 'Play slideshow');
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      pause();
      show(index);
    });
  });

  playback?.addEventListener('click', () => {
    if (timer) pause();
    else play();
  });

  show(0);
  play();
}

// --- Galerie produit ------------------------------------------------------
// « onClick or Hover the main img change to the target img » : la vignette
// survolée ou cliquée devient l'image principale. Le survol se contente d'un
// aperçu, seul le clic fixe le choix.
function initProductGallery() {
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;

  const main = gallery.querySelector('[data-gallery-main]');
  const thumbs = gallery.querySelectorAll('[data-gallery-thumb]');
  if (!main || !thumbs.length) return;

  let pinned = main.dataset.default;

  const swap = (src) => {
    main.src = src;
  };

  thumbs.forEach((thumb) => {
    const source = thumb.querySelector('img');
    if (!source) return;

    thumb.addEventListener('mouseenter', () => swap(source.src));
    thumb.addEventListener('focus', () => swap(source.src));
    thumb.addEventListener('mouseleave', () => swap(pinned));
    thumb.addEventListener('blur', () => swap(pinned));

    thumb.addEventListener('click', () => {
      pinned = source.src;
      swap(pinned);
      thumbs.forEach((other) => other.classList.toggle('is-active', other === thumb));
    });
  });
}

// --- Spotlight : repères shoppables ---------------------------------------
// « onClick or Hover » : le repère révèle la carte produit de son panneau.
function initSpotlight() {
  const panels = document.querySelectorAll('.spotlight__panel');

  panels.forEach((panel) => {
    const card = panel.querySelector('.spotlight-card');
    const hotspots = panel.querySelectorAll('.spotlight__hotspot');
    if (!card || !hotspots.length) return;

    const reveal = (state) => panel.classList.toggle('is-revealed', state);

    hotspots.forEach((hotspot) => {
      hotspot.addEventListener('mouseenter', () => reveal(true));
      hotspot.addEventListener('click', () => reveal(true));
    });

    panel.addEventListener('mouseleave', () => reveal(false));
  });
}

// --- Checkout : étapes repliables ------------------------------------------
// Un seul volet ouvert à la fois ; l'étape 1 est ouverte par défaut. Les
// quatre volets sont renseignés : 544:13954, 616:64, 617:144 et 617:230.
function initCheckoutSteps() {
  const toggles = document.querySelectorAll('[data-checkout-step-toggle]');
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const body = document.getElementById(toggle.getAttribute('aria-controls'));
      if (!body) return;

      const willOpen = body.hidden;

      toggles.forEach((other) => {
        const otherBody = document.getElementById(other.getAttribute('aria-controls'));
        other.classList.remove('is-active');
        other.setAttribute('aria-expanded', 'false');
        if (otherBody) otherBody.hidden = true;
      });

      if (willOpen) {
        toggle.classList.add('is-active');
        toggle.setAttribute('aria-expanded', 'true');
        body.hidden = false;
      }
    });
  });
}

// --- Checkout : bouton « Next » de chaque étape -----------------------------
// Les quatre étapes partagent un seul <form> : sans gestionnaire, chaque
// bouton "Next"/"Pay now" (type=submit) rechargeait la page en GET, avec les
// champs remplis dans l'URL. "Next" avance désormais à l'étape suivante par
// le même mécanisme que ses en-têtes (initCheckoutSteps) ; "Pay now" ne fait
// que bloquer le rechargement — aucune page de confirmation n'existe côté
// maquette, donc rien n'est simulé au-delà.
function initCheckoutNext() {
  const form = document.querySelector('.checkout__form');
  if (!form) return;

  form.querySelectorAll('.checkout-next').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      if (button.classList.contains('checkout-next--pay')) return;

      const steps = [...form.querySelectorAll('.checkout-step')];
      const currentIndex = steps.findIndex((step) => step.contains(button));
      const nextToggle = steps[currentIndex + 1]?.querySelector('[data-checkout-step-toggle]');
      nextToggle?.click();
      nextToggle?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// --- Checkout : code promo du récapitulatif ---------------------------------
// Même situation que le coupon du panier (569:490) mais un vrai <form> : sans
// gestionnaire, "Apply" rechargeait la page. Aucun code n'est valide côté
// maquette, faute d'état de succès défini ; on se contente de le signaler.
function initCheckoutDiscount() {
  const form = document.querySelector('.order-discount');
  if (!form) return;

  const input = form.querySelector('.order-discount__input');
  const submit = form.querySelector('.order-discount__submit');
  const defaultLabel = submit.textContent;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!input.value.trim()) return;

    submit.textContent = 'Invalid';
    submit.disabled = true;
    setTimeout(() => {
      submit.textContent = defaultLabel;
      submit.disabled = false;
    }, 2000);
  });
}

// --- Checkout : repli du récapitulatif (mobile) -----------------------------
// La barre n'existe qu'en mobile (575:383 replié, 575:490 déplié) ; au-delà du
// point de rupture le récapitulatif reste ouvert en permanence, la barre étant
// masquée en CSS. On suit donc la media query pour ne pas laisser le panneau
// fermé quand l'utilisateur repasse en desktop.
function initOrderSummaryToggle() {
  const toggle = document.querySelector('[data-order-toggle]');
  if (!toggle) return;

  const body = document.getElementById(toggle.getAttribute('aria-controls'));
  const label = toggle.querySelector('[data-order-toggle-text]');
  if (!body || !label) return;

  const mobile = window.matchMedia('(max-width: 768px)');

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    body.hidden = !open;
    label.textContent = `${open ? 'Hide' : 'Show'} order summry`;
  };

  const sync = () => {
    // En desktop le panneau est toujours ouvert et la barre inutilisable.
    setOpen(!mobile.matches);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  mobile.addEventListener('change', sync);
  sync();
}

// --- Checkout : adresse de facturation -------------------------------------
// La case « Use shipping address as billing address » est cochée par défaut
// (617:230) ; la décocher déplie le bloc d'adresse de facturation (569:94).
function initCheckoutBilling() {
  const toggle = document.querySelector('[data-billing-toggle]');
  if (!toggle) return;

  const panel = document.getElementById(toggle.getAttribute('aria-controls'));
  if (!panel) return;

  const sync = () => {
    panel.hidden = toggle.checked;
  };

  toggle.addEventListener('change', sync);
  sync();
}

// --- Checkout : afficher / masquer le mot de passe -------------------------
function initPasswordToggle() {
  document.querySelectorAll('[data-password-toggle]').forEach((button) => {
    // L'œil désigne son champ par `aria-controls` (pages de compte) ; à
    // défaut on prend celui qui l'accompagne dans le même bloc (checkout).
    const controls = button.getAttribute('aria-controls');
    const input = controls
      ? document.getElementById(controls)
      : button.parentElement.querySelector('input');
    if (!input) return;

    button.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      // `aria-pressed` porte l'état ; le libellé du bouton reste stable.
      button.setAttribute('aria-pressed', String(isHidden));
    });
  });
}

// --- Collection (page catégorie) -----------------------------------------
// Catalogue piloté par un jeu de données : les neuf gabarits ci-dessous sont
// ceux déjà posés dans le HTML statique (mêmes photos, noms, prix, dans le
// même ordre) — la page 1 sans filtre reste donc identique au rendu figé.
// Chaque gabarit est dupliqué en 9 variantes (prix, stock, tailles, couleurs
// dérivés de son index) pour peupler les pages suivantes, comme demandé :
// mêmes produits, dupliqués et déclinés plutôt qu'inventés.
const COLLECTION_TEMPLATES = [
  { key: 'samantha-a', name: 'Samantha Activewear', img: 'col-samantha-a.jpg', price: 99, oldPrice: 200 },
  { key: 'noya', name: 'Noya Slim Dress', img: 'col-noya.jpg', price: 79, oldPrice: 109 },
  { key: 'jelna-a', name: 'Jelna Split Dress', img: 'col-jelna-a.jpg', price: 100, oldPrice: 200 },
  { key: 'samantha-b', name: 'Samantha Activewear', img: 'col-samantha-b.jpg', price: 120, oldPrice: 200 },
  { key: 'jelna-b', name: 'Jelna Split Dress', img: 'col-jelna-b.jpg', price: 165, oldPrice: 200 },
  { key: 'skirt-a', name: 'Skirt Sets', img: 'col-skirt-a.jpg', price: 179, oldPrice: 450 },
  { key: 'samantha-c', name: 'Samantha Activewear', img: 'col-samantha-c.jpg', price: 99, oldPrice: 120 },
  { key: 'jelna-c', name: 'Jelna Split Dress', img: 'col-jelna-c.jpg', price: 40, oldPrice: 60 },
  { key: 'skirt-b', name: 'Skirt Sets', img: 'col-skirt-b.jpg', price: 79, oldPrice: 120 },
];

// Douze teintes et six tailles, dans l'ordre où elles apparaissent dans la
// colonne de filtres (5127:364 et 5127:352) — les classes CSS correspondent
// déjà (.filter-color--black, .filter-size, etc.).
const COLLECTION_COLORS = ['black', 'white', 'tan', 'orange', 'flame', 'blue', 'pink', 'green', 'lime', 'purple', 'steel', 'sky'];
const COLLECTION_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const COLLECTION_PAGE_SIZE = 9; // grille 3 × 3
const COLLECTION_VARIANTS = 9; // 9 gabarits × 9 variantes = 81 articles, comme l'annonçait déjà le compteur

function buildCollectionCatalog() {
  const items = [];
  // v en boucle externe : les 9 variantes « v=0 » (identiques au HTML statique)
  // se retrouvent groupées en tête de tableau, dans leur ordre d'origine. Sans
  // cela, le filtrage par défaut affichait plusieurs variantes du même gabarit
  // avant de passer au suivant, au lieu des neuf produits distincts attendus
  // en page 1.
  for (let v = 0; v < COLLECTION_VARIANTS; v++) {
    COLLECTION_TEMPLATES.forEach((tpl, ti) => {
      // v = 0 reproduit exactement la carte statique (aucune variation).
      const priceDelta = v === 0 ? 0 : ((ti * 13 + v * 7) % 60) - 20;
      const price = Math.max(19, tpl.price + priceDelta);
      const oldPrice = v === 0 ? tpl.oldPrice : Math.round(price * 1.6);
      const stock = v === 0 ? true : (ti + v * 2) % 3 !== 0;
      const sizeStart = (ti + v) % COLLECTION_SIZES.length;
      const sizes = [0, 1, 2, 3].map((i) => COLLECTION_SIZES[(sizeStart + i) % COLLECTION_SIZES.length]);
      const colorStart = (ti * 2 + v) % COLLECTION_COLORS.length;
      const colors = [0, 1, 2].map((i) => COLLECTION_COLORS[(colorStart + i) % COLLECTION_COLORS.length]);

      items.push({
        template: tpl.key,
        name: tpl.name,
        img: tpl.img,
        price,
        oldPrice,
        stock,
        sizes,
        colors,
      });
    });
  }
  return items;
}

const collectionFormatPrice = (value) => `${value.toFixed(2).replace('.', ',')}$`;

function renderCollectionCard(item) {
  const article = document.createElement('article');
  // La classe de gabarit porte le cadrage exact de la photo (_collection.scss) ;
  // toutes les variantes d'un même gabarit réutilisent la même photo, donc le
  // même cadrage.
  article.className = `collection-card collection-card--${item.template}`;
  article.innerHTML = `
    <div class="collection-card__media">
      <img class="collection-card__img" src="assets/images/${item.img}" alt="${item.name}">
      <div class="collection-card__veil"></div>
      <div class="collection-card__options">
        <p class="collection-card__option-label">Size</p>
        <div class="collection-card__sizes">
          <button type="button" class="collection-card__size" aria-pressed="false">M</button>
          <button type="button" class="collection-card__size collection-card__size--active" aria-pressed="true">S</button>
          <button type="button" class="collection-card__size" aria-pressed="false">L</button>
        </div>
        <div class="collection-card__colors">
          <p class="collection-card__option-label collection-card__option-label--color">Color</p>
          <img class="collection-card__swatches" src="assets/icons/icon-collection-swatches.svg" alt="Available colours" width="150" height="32">
        </div>
      </div>
    </div>
    <div class="collection-card__actions">
      <button type="button" class="collection-card__action" aria-label="Add to wishlist" aria-pressed="false">
        <img src="assets/icons/icon-collection-heart.svg" alt="" width="42" height="42">
      </button>
      <button type="button" class="collection-card__action" data-panel-open="search" aria-label="Quick view">
        <img src="assets/icons/icon-collection-search.svg" alt="" width="42" height="42">
      </button>
    </div>
    <div class="collection-card__info">
      <h3 class="collection-card__name"><a href="product.html">${item.name}</a></h3>
      <p class="collection-card__prices">
        <span class="collection-card__price">${collectionFormatPrice(item.price)}</span>
        <span class="collection-card__price-old">${collectionFormatPrice(item.oldPrice)}</span>
      </p>
      <button type="button" class="collection-card__cart" aria-label="Add to cart">
        <img src="assets/icons/icon-collection-cart.svg" alt="" width="36" height="36">
      </button>
    </div>
  `;
  return article;
}

// Cartes de la grille collection : cœur, tailles et nuancier, mêmes contrats
// data-* que les cartes de l'accueil. Rejoué après chaque rendu, puisque le
// filtrage et la pagination remplacent les nœuds de la grille.
function wireCollectionCards(grid) {
  grid.querySelectorAll('.collection-card').forEach((card) => {
    wireSwatchGroup(
      card.querySelectorAll('.collection-card__size'),
      'collection-card__size--active',
    );

    const wishlist = card.querySelector('[aria-label="Add to wishlist"]');
    if (wishlist) {
      wishlist.addEventListener('click', () => {
        const on = wishlist.getAttribute('aria-pressed') === 'true';
        wishlist.setAttribute('aria-pressed', String(!on));
      });
    }

    const cart = card.querySelector('.collection-card__cart');
    if (!cart) return;

    cart.addEventListener('click', () => {
      addUnnamedVariantToCart({
        name: card.querySelector('.collection-card__name').textContent.trim(),
        unitPrice: parseInt(card.querySelector('.collection-card__price').textContent, 10),
        image: card.querySelector('.collection-card__img').getAttribute('src'),
      });
    });
  });
}

// Colonne de filtres : chaque groupe se replie indépendamment, le bouton de
// la barre d'outils masque la colonne entière et bascule son libellé entre
// « Hide filters » et « Show filters ». Disponibilité, tailles, couleurs et
// prix filtrent réellement la grille ; la pagination duplique les mêmes
// produits sur les pages suivantes plutôt que de s'arrêter à la première.
function initCollectionFilters() {
  const panel = document.getElementById('filter-panel');
  const grid = document.querySelector('.collection__grid');
  const pagination = document.querySelector('.collection__pages');
  const prevLink = document.querySelector('.collection__page-link:first-of-type');
  const nextLink = document.querySelector('.collection__page-link:last-of-type');
  const countEl = document.querySelector('.collection__count');
  const chipsEl = document.querySelector('.filter-panel__chips');
  const clearLink = document.querySelector('.filter-panel__clear');
  if (!panel || !grid) return;

  // Repli d'un groupe : le chevron se retourne via aria-expanded (CSS).
  panel.querySelectorAll('[data-filter-toggle]').forEach((button) => {
    const body = document.getElementById(button.getAttribute('aria-controls'));
    if (!body) return;

    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      body.hidden = open;
    });
  });

  // Masquage de la colonne entière.
  const toggle = document.querySelector('[data-filters-toggle]');
  if (toggle) {
    // Seul le libellé desktop change ; celui du mobile reste « Filter ».
    const label = toggle.querySelector('[data-filters-label]');

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      if (label) label.textContent = open ? 'Show filters' : 'Hide filters';
    });
  }

  const catalog = buildCollectionCatalog();
  const priceMinInput = document.getElementById('price-min');
  const priceMaxInput = document.getElementById('price-max');

  // Le balisage statique pré-sélectionne S et XL (5127:352) : l'état de
  // départ suit ce que montre déjà la colonne plutôt que de l'ignorer.
  const state = {
    stock: 'in-stock',
    sizes: new Set([...panel.querySelectorAll('.filter-size[aria-pressed="true"]')].map((b) => b.textContent.trim())),
    colors: new Set([...panel.querySelectorAll('.filter-color[aria-pressed="true"]')].map((b) => [...b.classList].find((c) => c.startsWith('filter-color--'))?.replace('filter-color--', '')).filter(Boolean)),
    page: 1,
  };

  const getPriceRange = () => ({
    min: Math.max(0, parseInt(priceMinInput.value, 10) || 0),
    max: Math.max(0, parseInt(priceMaxInput.value, 10) || 0),
  });

  const filterCatalog = () => {
    const { min, max } = getPriceRange();
    return catalog.filter((item) => {
      if (state.stock === 'in-stock' && !item.stock) return false;
      if (state.stock === 'out-of-stock' && item.stock) return false;
      if (item.price < min || item.price > max) return false;
      if (state.sizes.size && ![...state.sizes].some((s) => item.sizes.includes(s))) return false;
      if (state.colors.size && ![...state.colors].some((c) => item.colors.includes(c))) return false;
      return true;
    });
  };

  const renderChips = () => {
    if (!chipsEl) return;
    chipsEl.innerHTML = '';
    const { min, max } = getPriceRange();

    const addChip = (text, onRemove) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'filter-chip';
      chip.innerHTML = `${text} <img src="assets/icons/icon-chip-cross.svg" alt="Remove filter" width="10" height="10">`;
      chip.addEventListener('click', () => {
        onRemove();
        applyFilters();
      });
      chipsEl.appendChild(chip);
    };

    if (min !== 15 || max !== 300) {
      addChip(`${min},00$ - ${max},00$`, () => {
        priceMinInput.value = 15;
        priceMaxInput.value = 300;
      });
    }
    state.colors.forEach((color) => {
      addChip(color.charAt(0).toUpperCase() + color.slice(1), () => {
        state.colors.delete(color);
        panel.querySelectorAll(`.filter-color--${color}`).forEach((btn) => {
          btn.setAttribute('aria-pressed', 'false');
          btn.classList.remove('filter-color--active');
        });
      });
    });
    state.sizes.forEach((size) => {
      addChip(size, () => {
        state.sizes.delete(size);
        panel.querySelectorAll('.filter-size').forEach((btn) => {
          if (btn.textContent.trim() === size) {
            btn.setAttribute('aria-pressed', 'false');
            btn.classList.remove('filter-size--active');
          }
        });
      });
    });
    if (state.stock === 'out-of-stock') {
      addChip('Out of stock', () => {
        state.stock = 'in-stock';
        panel.querySelector('input[name="availability"][value="in-stock"]').checked = true;
      });
    }
  };

  const renderPagination = (totalPages) => {
    if (!pagination) return;
    pagination.innerHTML = '';
    for (let p = 1; p <= totalPages; p++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'collection__page';
      if (p === state.page) {
        btn.classList.add('collection__page--active');
        btn.setAttribute('aria-current', 'page');
      }
      btn.textContent = String(p);
      btn.addEventListener('click', () => {
        state.page = p;
        renderGrid();
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      pagination.appendChild(btn);
    }

    const setLinkState = (link, disabled, onClick) => {
      if (!link) return;
      link.classList.toggle('is-disabled', disabled);
      link.setAttribute('aria-disabled', String(disabled));
      link.onclick = (event) => {
        event.preventDefault();
        if (disabled) return;
        onClick();
        renderGrid();
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    };
    setLinkState(prevLink, state.page <= 1, () => { state.page -= 1; });
    setLinkState(nextLink, state.page >= totalPages, () => { state.page += 1; });
  };

  const renderGrid = () => {
    const filtered = filterCatalog();
    const totalPages = Math.max(1, Math.ceil(filtered.length / COLLECTION_PAGE_SIZE));
    state.page = Math.min(Math.max(1, state.page), totalPages);

    const start = (state.page - 1) * COLLECTION_PAGE_SIZE;
    const pageItems = filtered.slice(start, start + COLLECTION_PAGE_SIZE);

    grid.innerHTML = '';
    pageItems.forEach((item) => grid.appendChild(renderCollectionCard(item)));
    wireCollectionCards(grid);

    if (countEl) countEl.textContent = `${filtered.length} item${filtered.length > 1 ? 's' : ''}`;
    renderPagination(totalPages);
  };

  const applyFilters = () => {
    state.page = 1;
    renderChips();
    renderGrid();
  };

  // Disponibilité.
  panel.querySelectorAll('input[name="availability"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        state.stock = radio.value;
        applyFilters();
      }
    });
  });

  // Tailles : sélection multiple, chaque pastille bascule pour elle-même.
  panel.querySelectorAll('.filter-size').forEach((button) => {
    button.addEventListener('click', () => {
      const on = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!on));
      button.classList.toggle('filter-size--active', !on);
      const size = button.textContent.trim();
      if (on) state.sizes.delete(size); else state.sizes.add(size);
      applyFilters();
    });
  });

  // Couleurs : même principe, avec un liseré pour marquer la sélection.
  panel.querySelectorAll('.filter-color').forEach((button) => {
    button.addEventListener('click', () => {
      const on = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!on));
      button.classList.toggle('filter-color--active', !on);
      // Le nom de la teinte est le dernier segment de la classe de modificateur.
      const color = [...button.classList].find((c) => c.startsWith('filter-color--'))?.replace('filter-color--', '');
      if (!color) return;
      if (on) state.colors.delete(color); else state.colors.add(color);
      applyFilters();
    });
  });

  // Prix : un court délai évite de refiltrer à chaque frappe.
  let priceTimer;
  [priceMinInput, priceMaxInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      clearTimeout(priceTimer);
      priceTimer = setTimeout(applyFilters, 400);
    });
  });

  // « Clear filter » réinitialise sans recharger la page.
  if (clearLink) {
    clearLink.addEventListener('click', (event) => {
      event.preventDefault();
      state.stock = 'in-stock';
      state.sizes.clear();
      state.colors.clear();
      state.page = 1;
      panel.querySelector('input[name="availability"][value="in-stock"]').checked = true;
      panel.querySelectorAll('.filter-size--active').forEach((btn) => {
        btn.classList.remove('filter-size--active');
        btn.setAttribute('aria-pressed', 'false');
      });
      panel.querySelectorAll('.filter-color--active').forEach((btn) => {
        btn.classList.remove('filter-color--active');
        btn.setAttribute('aria-pressed', 'false');
      });
      priceMinInput.value = 15;
      priceMaxInput.value = 300;
      applyFilters();
    });
  }

  // Rendu initial : identique à la page 1 statique (in-stock, aucun filtre).
  applyFilters();
}

// --- Page produit (product.html) -----------------------------------------
// Galerie : la vignette cliquée devient l'image principale et hérite de son
// cadrage ; les deux flèches font défiler la sélection. Onglets, options,
// quantité et ajout au panier reprennent les contrats data-* du site.
function initProductPage() {
  const page = document.querySelector('.product');
  if (!page) return;

  // ---- Galerie -----------------------------------------------------------
  // Les quatre vues sont dans le document ; on bascule celle qui s'affiche
  // plutôt que d'échanger la source, ce qui laisse le mobile les faire
  // défiler côte à côte sans traitement particulier.
  const slides = [...page.querySelectorAll('[data-gallery-slide]')];
  const thumbs = [...page.querySelectorAll('[data-gallery-thumb]')];

  const showThumb = (index) => {
    const i = (index + thumbs.length) % thumbs.length;
    thumbs.forEach((t, n) => t.classList.toggle('product__thumb--active', n === i));
    slides.forEach((s, n) => s.classList.toggle('product__slide--active', n === i));
  };

  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => showThumb(i)));

  const current = () => thumbs.findIndex((t) => t.classList.contains('product__thumb--active'));
  const prev = page.querySelector('[data-gallery-prev]');
  const next = page.querySelector('[data-gallery-next]');
  if (prev) prev.addEventListener('click', () => showThumb(current() - 1));
  if (next) next.addEventListener('click', () => showThumb(current() + 1));

  // ---- Couleurs, tailles, favori -----------------------------------------
  wireSwatchGroup(page.querySelectorAll('.product-info__color'), 'product-info__color--active');
  wireSwatchGroup(page.querySelectorAll('.product-info__size'), 'product-info__size--active');

  const wishlist = page.querySelector('[data-wishlist]');
  if (wishlist) {
    wishlist.addEventListener('click', () => {
      const on = wishlist.getAttribute('aria-pressed') === 'true';
      wishlist.setAttribute('aria-pressed', String(!on));
    });
  }

  // ---- Partage -------------------------------------------------------------
  // API Web Share quand le navigateur la propose (mobile, principalement) ;
  // à défaut, copie le lien dans le presse-papiers avec un accusé temporaire
  // porté par aria-label, faute d'icône « copié » dans la maquette.
  const share = page.querySelector('[data-pd-share]');
  if (share) {
    const defaultLabel = share.getAttribute('aria-label');
    const title = page.querySelector('.product-info__title')?.textContent.trim() || document.title;

    share.addEventListener('click', async () => {
      const url = window.location.href;
      try {
        if (navigator.share) {
          await navigator.share({ title, url });
          return;
        }
        await navigator.clipboard.writeText(url);
      } catch (error) {
        // L'utilisateur a annulé le partage natif, ou le presse-papiers a
        // refusé l'accès (contexte non sécurisé) : pas d'accusé dans ce cas.
        return;
      }
      share.setAttribute('aria-label', 'Link copied');
      setTimeout(() => share.setAttribute('aria-label', defaultLabel), 2000);
    });
  }

  // ---- Quantité ----------------------------------------------------------
  const qty = page.querySelector('[data-pd-qty]');
  const step = (delta) => {
    const value = Math.max(1, parseInt(qty.textContent, 10) + delta);
    qty.textContent = value;
  };
  const inc = page.querySelector('[data-pd-qty-inc]');
  const dec = page.querySelector('[data-pd-qty-dec]');
  if (inc) inc.addEventListener('click', () => step(1));
  if (dec) dec.addEventListener('click', () => step(-1));

  // ---- Ajout au panier -----------------------------------------------------
  // Contrairement aux cartes de la grille (couleurs sans libellé), cette fiche
  // porte de vraies variantes nommées : Color (aria-label) et Size (texte du
  // bouton). Le panier les affiche donc, comme pour la section produit de
  // l'accueil (initProductDetails).
  const addToCart = () => {
    const cartList = document.querySelector('[data-cart-items]');
    const cartInstance = document.querySelector('[data-cart-instance][data-panel]');
    if (!cartList || !cartInstance) return;

    const name = page.querySelector('.product-info__title').textContent.trim();
    const unitPrice = parseInt(
      page.querySelector('[data-product-price]').textContent.replace(/[^\d]/g, ''),
      10,
    ) / 100;
    const image = page.querySelector('.product__slide--active img').getAttribute('src');
    const color = page.querySelector('.product-info__color--active')?.getAttribute('aria-label') || '';
    const size = page.querySelector('.product-info__size--active')?.textContent.trim() || '';
    const times = parseInt(qty.textContent, 10);

    const existing = Array.from(cartList.querySelectorAll('.cart-item')).find((item) => {
      const attrs = Array.from(item.querySelectorAll('.cart-item__attr'), (a) => a.textContent);
      return item.querySelector('.cart-item__name')?.textContent === name
        && attrs.includes(`Color - ${color}`)
        && attrs.includes(`Size - ${size}`);
    });

    if (existing) {
      const existingQty = existing.querySelector('[data-qty]');
      existingQty.textContent = parseInt(existingQty.textContent, 10) + times;
    } else {
      const item = document.createElement('li');
      item.className = 'cart-item';
      item.dataset.unitPrice = unitPrice;
      item.innerHTML = `
        <img class="cart-item__image" src="${image}" alt="">
        <div class="cart-item__body">
          <p class="cart-item__name">${name}</p>
          <p class="cart-item__attr">Color - ${color}</p>
          <p class="cart-item__attr">Size - ${size}</p>
          <div class="cart-item__quantity">
            <button type="button" class="cart-item__step" data-qty-inc aria-label="Augmenter la quantité">
              <img src="assets/icons/icon-plus-small.svg" alt="" width="22" height="22">
            </button>
            <span class="cart-item__qty" data-qty>${times}</span>
            <button type="button" class="cart-item__step" data-qty-dec aria-label="Diminuer la quantité">
              <img src="assets/icons/icon-minus-small.svg" alt="" width="22" height="22">
            </button>
          </div>
        </div>
        <button type="button" class="cart-item__remove" data-cart-remove aria-label="Retirer ${name}">
          <img src="assets/icons/icon-trash.svg" alt="" width="16" height="16">
        </button>
        <p class="cart-item__price" data-line-price></p>
      `;
      cartList.appendChild(item);
      wireCartItem(item, cartInstance);
    }

    updateCartInstance(cartInstance);
  };

  const add = page.querySelector('[data-pd-add]');
  if (add) {
    add.addEventListener('click', () => {
      addToCart();
      document.querySelector('[data-panel-open="cart"]')?.click();
    });
  }

  // « Buy it now » ignorait jusqu'ici la couleur, la taille et la quantité
  // choisies : un simple lien vers checkout.html, sans rien ajouter au
  // panier. Il déclenche désormais le même ajout que « Add to cart » avant
  // de partir ; le href reste posé pour un repli sans JavaScript.
  const buyNow = page.querySelector('[data-pd-buy]');
  if (buyNow) {
    buyNow.addEventListener('click', (event) => {
      event.preventDefault();
      addToCart();
      window.location.href = buyNow.getAttribute('href');
    });
  }
}

// Onglets de la fiche produit : un seul panneau visible à la fois.
function initProductTabs() {
  const list = document.querySelector('.product-tabs__inner');
  if (!list) return;

  const tabs = [...list.querySelectorAll('.product-tabs__tab')];

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((other) => {
        const active = other === tab;
        other.setAttribute('aria-selected', String(active));
        other.classList.toggle('product-tabs__tab--active', active);
        document.getElementById(other.getAttribute('aria-controls')).hidden = !active;
      });
    });
  });
}

// Carrousel « You may also like » : défilement d'une carte à la fois.
function initRelatedCarousel() {
  const track = document.querySelector('[data-related-track]');
  if (!track) return;

  // 342 de carte + 8 d'intervalle (frame 519:11563).
  const step = 350;
  const prev = document.querySelector('[data-related-prev]');
  const next = document.querySelector('[data-related-next]');
  if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step, behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => track.scrollBy({ left: step, behavior: 'smooth' }));
}

// --- Page panier (cart.html) ---------------------------------------------
// Quantités, suppression de ligne, total, et coupon. L'état d'erreur du
// coupon est celui du frame 569:490 : bordure et message en rouge.
function initCartPage() {
  const page = document.querySelector('[data-cart-page]');
  if (!page) return;

  const format = (value) => `${value.toFixed(2).replace('.', ',')}$`;

  const refresh = () => {
    const lines = [...page.querySelectorAll('.cart-line')];
    let total = 0;
    let items = 0;

    lines.forEach((line) => {
      const qty = parseInt(line.querySelector('[data-line-qty]').textContent, 10);
      const unit = parseFloat(line.dataset.unitPrice);
      line.querySelector('[data-line-total]').textContent = format(unit * qty);
      total += unit * qty;
      items += qty;
    });

    page.querySelector('[data-cart-total]').textContent = format(total);
    const count = page.querySelector('[data-cart-page-count]');
    count.textContent = `${items} item${items > 1 ? 's' : ''} in your cart`;
  };

  page.querySelectorAll('.cart-line').forEach((line) => {
    const qty = line.querySelector('[data-line-qty]');

    line.querySelector('[data-line-inc]').addEventListener('click', () => {
      qty.textContent = parseInt(qty.textContent, 10) + 1;
      refresh();
    });

    line.querySelector('[data-line-dec]').addEventListener('click', () => {
      qty.textContent = Math.max(1, parseInt(qty.textContent, 10) - 1);
      refresh();
    });

    line.querySelector('[data-line-remove]').addEventListener('click', () => {
      line.remove();
      refresh();
    });
  });

  // Repli de l'estimation de livraison.
  const estimate = page.querySelector('[data-estimate-toggle]');
  if (estimate) {
    const body = document.getElementById(estimate.getAttribute('aria-controls'));
    estimate.addEventListener('click', () => {
      const open = estimate.getAttribute('aria-expanded') === 'true';
      estimate.setAttribute('aria-expanded', String(!open));
      body.hidden = open;
    });
  }

  // Coupon : la maquette ne définit qu'un code invalide (569:490).
  const save = page.querySelector('[data-coupon-save]');
  if (save) {
    const input = page.querySelector('#cart-coupon');
    const note = page.querySelector('[data-coupon-note]');
    const defaultNote = note.textContent;

    save.addEventListener('click', () => {
      const invalid = input.value.trim().length > 0;
      input.classList.toggle('cart-summary__coupon-input--error', invalid);
      note.classList.toggle('cart-summary__note--error', invalid);
      note.textContent = invalid ? 'This code not exist' : defaultNote;
    });
  }

  refresh();
}

// --- Page contact (contact.html) -----------------------------------------
// Liste déroulante du sujet (553:15262) et contrôle de l'adresse e-mail,
// dont l'état fautif est décrit par le frame 569:476.
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const toggle = form.querySelector('[data-subject-toggle]');
  const list = form.querySelector('[data-subject-list]');
  const value = form.querySelector('[data-subject-value]');

  const closeList = () => {
    toggle.setAttribute('aria-expanded', 'false');
    list.hidden = true;
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    list.hidden = open;
  });

  list.querySelectorAll('[data-subject-option]').forEach((option) => {
    option.addEventListener('click', () => {
      value.textContent = option.textContent;
      // Le libellé n'est plus un espace réservé une fois le sujet choisi.
      value.classList.remove('contact-form__placeholder');
      closeList();
    });
  });

  // Un clic hors du champ referme la liste, comme les menus de la barre promo.
  document.addEventListener('click', (event) => {
    if (!form.contains(event.target)) closeList();
  });

  // Contrôle de l'e-mail à la validation.
  const field = form.querySelector('[data-email-field]');
  const input = form.querySelector('#contact-email');
  const error = form.querySelector('[data-email-error]');
  const submit = form.querySelector('.contact-form__submit');
  const defaultLabel = submit.textContent;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    field.classList.toggle('contact-form__field--invalid', invalid);
    error.hidden = !invalid;
    if (invalid) {
      input.focus();
      return;
    }

    // L'adresse est valide : rien ne se produisait jusqu'ici. Le site n'a pas
    // de back-end, donc pas de vrai envoi — on accuse réception comme les
    // autres formulaires sans destination réelle (newsletter, comptes).
    submit.textContent = 'Message sent';
    submit.disabled = true;
    form.reset();
    value.textContent = 'order';
    value.classList.add('contact-form__placeholder');
    setTimeout(() => {
      submit.textContent = defaultLabel;
      submit.disabled = false;
    }, 3000);
  });
}

// --- Formulaires de compte (login, signup, forgot-password) ----------------
// Les trois pages partagent la même classe .auth-form. Sans gestionnaire, la
// validation ne s'exécutait qu'à moitié (novalidate) et le clic rechargeait
// la page en GET — mot de passe compris dans l'URL. Le site n'a pas de
// back-end : chaque formulaire valide ses champs puis accuse réception par
// un changement temporaire du libellé du bouton, avant de repartir vers
// l'accueil pour Login/Create Account (le seul aboutissement plausible sans
// tableau de bord réel) ; Forget Your Password reste sur place, comme le
// ferait un vrai envoi d'e-mail.
function initAuthForms() {
  const form = document.querySelector('.auth-form');
  if (!form) return;

  const submit = form.querySelector('.auth-form__submit');
  if (!submit) return;
  const defaultLabel = submit.textContent;
  const redirect = !form.classList.contains('auth-form--reset');
  const successLabel = form.classList.contains('auth-form--signup')
    ? 'Account created'
    : form.classList.contains('auth-form--reset')
      ? 'Email sent'
      : 'Signed in';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submit.textContent = successLabel;
    submit.disabled = true;

    if (redirect) {
      setTimeout(() => { window.location.href = 'index.html'; }, 900);
    } else {
      setTimeout(() => {
        submit.textContent = defaultLabel;
        submit.disabled = false;
      }, 4000);
    }
  });
}

// --- Newsletter (bandeau réutilisé sur toutes les pages) --------------------
// Sans gestionnaire, "Send" soumettait le formulaire nativement : rechargement
// de la page, adresse en paramètre d'URL. Le site n'a pas de back-end : on se
// contente de valider puis d'accuser réception, comme le bouton de partage de
// la fiche produit.
function initNewsletterForms() {
  document.querySelectorAll('.newsletter__form').forEach((form) => {
    const input = form.querySelector('.newsletter__input');
    const submit = form.querySelector('.newsletter__submit');
    if (!input || !submit) return;
    const defaultLabel = submit.textContent;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }

      submit.textContent = 'Subscribed';
      submit.disabled = true;
      form.reset();
      setTimeout(() => {
        submit.textContent = defaultLabel;
        submit.disabled = false;
      }, 2000);
    });
  });
}

// --- Product Details (section homepage "Twilight Whisper Skirt") ----------
// Taille et couleur : sélection simple, un seul bouton actif à la fois par
// groupe. Les nuances de icon-color-swatches-pd.svg sont 3 cercles séparés
// (Ellipse10/8/9), pas un SVG assemblé — rendues cliquables (correction de
// l'arbitrage A13).
// Quantité, Add to cart et Buy it now réutilisent le contrat data-* du
// panier (formatPrice/updateCartInstance, définis dans includes.js) plutôt
// que dupliquer la logique de calcul de prix.
function initProductDetails() {
  const section = document.querySelector('[data-product]');
  if (!section) return;

  const sizes = section.querySelectorAll('[data-product-sizes] .product-details__size');
  sizes.forEach((button) => {
    button.addEventListener('click', () => {
      sizes.forEach((other) => other.classList.remove('product-details__size--active'));
      button.classList.add('product-details__size--active');
    });
  });

  const colors = section.querySelectorAll('[data-product-colors] .product-details__color');
  colors.forEach((button) => {
    button.addEventListener('click', () => {
      colors.forEach((other) => {
        other.classList.remove('product-details__color--active');
        other.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('product-details__color--active');
      button.setAttribute('aria-pressed', 'true');
    });
  });

  const qtyEl = section.querySelector('[data-product-qty]');
  const stepQty = (delta) => {
    qtyEl.textContent = Math.max(1, parseInt(qtyEl.textContent, 10) + delta);
  };
  section.querySelector('[data-product-qty-inc]')?.addEventListener('click', () => stepQty(1));
  section.querySelector('[data-product-qty-dec]')?.addEventListener('click', () => stepQty(-1));

  const addToCart = () => {
    const cartList = document.querySelector('[data-cart-items]');
    const cartInstance = document.querySelector('[data-cart-instance][data-panel]');
    if (!cartList || !cartInstance) return;

    const name = section.dataset.productName;
    const unitPrice = section.dataset.productUnitPrice;
    const image = section.dataset.productImage;
    const size = section.querySelector('.product-details__size--active')?.textContent || '';
    const color = section.querySelector('.product-details__color--active')?.getAttribute('aria-label') || '';
    const qty = parseInt(qtyEl.textContent, 10);

    const existing = Array.from(cartList.querySelectorAll('.cart-item')).find((item) => {
      const attrs = Array.from(item.querySelectorAll('.cart-item__attr'), (a) => a.textContent);
      return item.querySelector('.cart-item__name')?.textContent === name
        && attrs.includes(`Color - ${color}`)
        && attrs.includes(`Size - ${size}`);
    });

    if (existing) {
      const existingQty = existing.querySelector('[data-qty]');
      existingQty.textContent = parseInt(existingQty.textContent, 10) + qty;
    } else {
      const item = document.createElement('li');
      item.className = 'cart-item';
      item.dataset.unitPrice = unitPrice;
      // name/unitPrice/image come from static data-* attributes on this section
      // (not user input); size is textContent of a fixed M/S/L/XL button set.
      item.innerHTML = `
        <img class="cart-item__image" src="${image}" alt="">
        <div class="cart-item__body">
          <p class="cart-item__name">${name}</p>
          <p class="cart-item__attr">Color - ${color}</p>
          <p class="cart-item__attr">Size - ${size}</p>
          <div class="cart-item__quantity">
            <button type="button" class="cart-item__step" data-qty-inc aria-label="Augmenter la quantité">
              <img src="assets/icons/icon-plus-small.svg" alt="" width="22" height="22">
            </button>
            <span class="cart-item__qty" data-qty>${qty}</span>
            <button type="button" class="cart-item__step" data-qty-dec aria-label="Diminuer la quantité">
              <img src="assets/icons/icon-minus-small.svg" alt="" width="22" height="22">
            </button>
          </div>
        </div>
        <button type="button" class="cart-item__remove" data-cart-remove aria-label="Retirer ${name}">
          <img src="assets/icons/icon-trash.svg" alt="" width="16" height="16">
        </button>
        <p class="cart-item__price" data-line-price></p>
      `;
      cartList.appendChild(item);
      wireCartItem(item, cartInstance);
    }

    updateCartInstance(cartInstance);
    document.querySelector('[data-panel-open="cart"]')?.click();
  };

  section.querySelector('[data-product-add-cart]')?.addEventListener('click', addToCart);
  section.querySelector('[data-product-buy-now]')?.addEventListener('click', () => {
    addToCart();
    window.location.href = 'checkout.html';
  });
}

// --- Timeline : sélecteur d'année ------------------------------------------
// Les flèches et les années font défiler le repère parmi les 5 boutons.
// Seules 2022 et 2024 ont un panneau réel extrait de la maquette (440:40
// pour 2024) ; le contenu de 2020/2021/2023 n'existe pas côté Figma. Le
// repère se déplace quand même sur ces années (comportement du sélecteur
// fidèle à la maquette), mais le panneau affiché ne change pas tant que
// leur contenu n'a pas été fourni — pas d'invention.
function initTimeline() {
  const years = Array.from(document.querySelectorAll('[data-timeline-year]'));
  const panels = document.querySelectorAll('[data-timeline-panel]');
  if (!years.length) return;

  const select = (year) => {
    years.forEach((btn) => {
      const isActive = btn.dataset.timelineYear === year;
      btn.classList.toggle('timeline__year--active', isActive);
      if (isActive) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });

    const panel = document.querySelector(`[data-timeline-panel="${year}"]`);
    if (panel) panels.forEach((p) => { p.hidden = p !== panel; });
  };

  years.forEach((btn) => {
    btn.addEventListener('click', () => select(btn.dataset.timelineYear));
  });

  const step = (delta) => {
    const current = years.findIndex((btn) => btn.classList.contains('timeline__year--active'));
    const next = Math.min(Math.max(current + delta, 0), years.length - 1);
    select(years[next].dataset.timelineYear);
  };

  document.querySelector('[data-timeline-prev]')?.addEventListener('click', () => step(-1));
  document.querySelector('[data-timeline-next]')?.addEventListener('click', () => step(1));
}

document.addEventListener('DOMContentLoaded', () => {
  initProductCards();
  initBestSellerCards();
  initArticleCards();
  initAccordion();
  initCompare();
  initProductCarousel();
  initFaq();
  initHeroCarousel();
  initProductGallery();
  initSpotlight();
  initCheckoutSteps();
  initCheckoutNext();
  initCheckoutDiscount();
  initCheckoutBilling();
  initOrderSummaryToggle();
  initPasswordToggle();
  initAuthForms();
  initNewsletterForms();
  initCollectionFilters();
  initProductPage();
  initProductTabs();
  initRelatedCarousel();
  initCartPage();
  initContactForm();
  initProductDetails();
  initTimeline();
});
