// ==========================================================================
// main.js — page content behaviour (accordion, compare slider, carousels)
// ==========================================================================

// --- Cartes New Arrivals : taille + favoris -------------------------------
// Même mécanique de sélection que product-details (un bouton actif par
// groupe, scopé à chaque carte). Les pastilles de couleur restent
// décoratives : icon-swatches-strip.svg est une seule image assemblée, sans
// pastille individuelle ni donnée de couleur extraite de Figma pour ces
// cartes (contrairement à product-details, qui a 3 cercles séparés) — les
// rendre cliquables demanderait d'inventer des couleurs.
function initProductCards() {
  document.querySelectorAll('.product-card').forEach((card) => {
    const sizes = card.querySelectorAll('.product-card__size');
    sizes.forEach((button) => {
      button.addEventListener('click', () => {
        sizes.forEach((other) => other.classList.remove('product-card__size--active'));
        button.classList.add('product-card__size--active');
      });
    });

    const wishlistBtn = card.querySelector('[data-wishlist-toggle]');
    const wishlistIcon = wishlistBtn?.querySelector('img');
    wishlistBtn?.addEventListener('click', () => {
      const isActive = wishlistBtn.getAttribute('aria-pressed') === 'true';
      wishlistBtn.setAttribute('aria-pressed', String(!isActive));
      wishlistIcon.src = isActive
        ? 'assets/icons/icon-wishlist-btn.svg'
        : 'assets/icons/icon-wishlist-btn-active.svg';
    });
  });
}

// --- Cartes Best Seller : favoris, Add to Cart, Quick View ----------------
// Favoris : même bascule que New Arrivals. Quick View est un vrai lien vers
// product.html (markup converti depuis <button>, cf. product-card). Add to
// Cart réutilise le contrat cart-item/wireCartItem/updateCartInstance déjà
// en place pour product-details, mais sans les lignes Color/Size : ces
// cartes n'ont pas de sélecteur de variante côté Figma (264:634 et
// analogues n'ont qu'un cœur, pas de pastilles ni de tailles) — la
// correspondance panier se fait donc seulement sur le nom.
function initBestSellerCards() {
  document.querySelectorAll('.best-seller-card').forEach((card) => {
    const wishlistBtn = card.querySelector('[data-wishlist-toggle]');
    const wishlistIcon = wishlistBtn?.querySelector('img');
    wishlistBtn?.addEventListener('click', () => {
      const isActive = wishlistBtn.getAttribute('aria-pressed') === 'true';
      wishlistBtn.setAttribute('aria-pressed', String(!isActive));
      wishlistIcon.src = isActive
        ? 'assets/icons/icon-wishlist-btn.svg'
        : 'assets/icons/icon-wishlist-btn-active.svg';
    });

    const cartBtn = card.querySelector('.best-seller-card__quickshop-btn--cart');
    const name = card.querySelector('.best-seller-card__name')?.textContent;
    const priceText = card.querySelector('.best-seller-card__price')?.textContent;
    const image = card.querySelector('.best-seller-card__image')?.getAttribute('src');
    if (!cartBtn || !name || !priceText || !image) return;

    const unitPrice = parseFloat(priceText.replace(',', '.'));

    cartBtn.addEventListener('click', () => {
      // Récupérés au clic plutôt qu'à l'initialisation : le panneau panier
      // (components/panels.html) est injecté de façon asynchrone par
      // includes.js, dont le DOMContentLoaded n'attend pas celui de main.js
      // (deux gestionnaires distincts, l'un async) — au chargement de la
      // page ces éléments n'existent pas encore dans le DOM.
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
    });
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
function initFaq() {
  const toggles = document.querySelectorAll('[data-faq-toggle]');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const item = toggle.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const chevron = toggle.querySelector('.faq__chevron');
      if (!answer) return;

      const isOpen = answer.style.display !== 'none';
      answer.style.display = isOpen ? 'none' : '';
      chevron.src = isOpen
        ? 'assets/icons/icon-faq-chevron-right.svg'
        : 'assets/icons/icon-faq-chevron-down.svg';
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
  if (!slides.length || !dots.length) return;

  const show = (index) => {
    slides.forEach((slide, i) => {
      slide.hidden = i !== index;
      slide.classList.toggle('hero__slide--active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('hero__dot--active', i === index);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => show(index));
  });

  show(0);
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
// Un seul volet ouvert à la fois ; l'étape 1 est ouverte par défaut, les
// étapes 2 à 4 n'exposent que leur en-tête tant qu'aucun contenu n'a été
// extrait de la maquette pour elles (cf. commentaire dans _checkout.scss).
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

// --- Checkout : afficher / masquer le mot de passe -------------------------
function initPasswordToggle() {
  const button = document.querySelector('[data-password-toggle]');
  const input = document.getElementById('checkout-password');
  if (!button || !input) return;

  button.addEventListener('click', () => {
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(isHidden));
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
  initAccordion();
  initCompare();
  initProductCarousel();
  initFaq();
  initHeroCarousel();
  initProductGallery();
  initSpotlight();
  initCheckoutSteps();
  initPasswordToggle();
  initProductDetails();
  initTimeline();
});
