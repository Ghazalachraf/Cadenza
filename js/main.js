// ==========================================================================
// main.js — page content behaviour (accordion, compare slider, carousels)
// ==========================================================================

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
// Ajoute (ou incrémente si même produit + couleur + taille déjà présents)
// une ligne au panier. Réutilisée par .product-details (fiche produit
// complète) et par les cartes New Arrivals / Best Seller / Latest Articles,
// qui n'ont ni sélecteur de couleur ni quantité dans la maquette : color/qty
// valent alors '' / 1 par défaut plutôt que d'inventer des contrôles absents
// du design.
function addCartLine({ name, unitPrice, image, color = '', size = '', qty = 1 }) {
  const cartList = document.querySelector('[data-cart-items]');
  const cartInstance = document.querySelector('[data-cart-instance][data-panel]');
  if (!cartList || !cartInstance || !name || !unitPrice || !image) return;

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
    // name/unitPrice/image/color/size come from static markup (product data
    // already rendered on the page), not user input.
    const attrRows = [
      color ? `<p class="cart-item__attr">Color - ${color}</p>` : '',
      size ? `<p class="cart-item__attr">Size - ${size}</p>` : '',
    ].join('');
    item.innerHTML = `
      <img class="cart-item__image" src="${image}" alt="">
      <div class="cart-item__body">
        <p class="cart-item__name">${name}</p>
        ${attrRows}
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
}

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
    addCartLine({
      name: section.dataset.productName,
      unitPrice: section.dataset.productUnitPrice,
      image: section.dataset.productImage,
      size: section.querySelector('.product-details__size--active')?.textContent || '',
      color: section.querySelector('.product-details__color--active')?.getAttribute('aria-label') || '',
      qty: parseInt(qtyEl.textContent, 10),
    });
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

// --- Favoris, tailles et ajout au panier sur les cartes produit ------------
// New Arrivals, Best Seller et Latest Articles n'ont ni sélecteur de couleur
// ni quantité dans la maquette (contrairement à .product-details) : addFromCard
// se limite donc au nom/prix/image/taille réellement présents dans chaque carte.
function initCardActions() {
  document.querySelectorAll('[data-wishlist-toggle]').forEach((btn) => {
    const img = btn.querySelector('img');
    btn.addEventListener('click', () => {
      const active = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(active));
      btn.setAttribute('aria-label', active ? 'Retirer des favoris' : 'Ajouter aux favoris');
      if (img) {
        img.src = active
          ? 'assets/icons/icon-wishlist-btn-active.svg'
          : 'assets/icons/icon-wishlist-btn.svg';
      }
    });
  });

  document.querySelectorAll('.product-card__sizes').forEach((group) => {
    const sizes = group.querySelectorAll('.product-card__size');
    sizes.forEach((button) => {
      button.addEventListener('click', () => {
        sizes.forEach((other) => other.classList.remove('product-card__size--active'));
        button.classList.add('product-card__size--active');
      });
    });
  });

  const parsePrice = (text) => parseFloat(text.replace(/[^\d,.-]/g, '').replace(',', '.'));

  const addFromCard = (card, { nameSel, priceSel, imageSel, sizeSel }) => {
    const priceEl = card.querySelector(priceSel);
    const name = card.querySelector(nameSel)?.textContent.trim();
    // .firstChild ignores a trailing <span> (ex. product-card__price-original) :
    // ne récupère que le prix courant, jamais le prix barré.
    const priceText = priceEl?.firstChild?.textContent?.trim() || priceEl?.textContent.trim();
    const image = card.querySelector(imageSel)?.getAttribute('src');
    const size = sizeSel ? (card.querySelector(sizeSel)?.textContent.trim() || '') : '';
    if (!name || !priceText || !image) return;
    addCartLine({ name, unitPrice: parsePrice(priceText), image, size });
  };

  document.querySelectorAll('.product-card__cart-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      if (!card) return;
      addFromCard(card, {
        nameSel: '.product-card__name',
        priceSel: '.product-card__price',
        imageSel: '.product-card__image',
        sizeSel: '.product-card__size--active',
      });
    });
  });

  document.querySelectorAll('.best-seller-card__quickshop-btn--cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.best-seller-card');
      if (!card) return;
      addFromCard(card, {
        nameSel: '.best-seller-card__name',
        priceSel: '.best-seller-card__price',
        imageSel: '.best-seller-card__image',
      });
    });
  });

  document.querySelectorAll('.article-card__cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.article-card');
      if (!card) return;
      addFromCard(card, {
        nameSel: '.article-card__name',
        priceSel: '.article-card__price',
        imageSel: '.article-card__image',
      });
    });
  });
}

// --- Onglets New Arrivals ---------------------------------------------------
// La maquette (206:1193) ne fournit qu'un seul jeu de 5 produits, commun aux
// 6 onglets (cf. SPECS.md A05) : basculer l'onglet actif est donc la seule
// interaction réelle possible sans inventer un catalogue par catégorie.
function initNewArrivalsTabs() {
  const tabs = document.querySelectorAll('.new-arrivals__tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      tabs.forEach((other) => other.classList.remove('new-arrivals__tab--active'));
      tab.classList.add('new-arrivals__tab--active');
    });
  });
}

// --- Formulaire newsletter ---------------------------------------------------
// Pas de backend : la validation et le retour visuel sont réels, l'envoi ne
// l'est pas (comme le panier, qui ne persiste pas non plus côté serveur).
function initNewsletterForm() {
  const form = document.querySelector('.newsletter__form');
  if (!form) return;

  const submit = form.querySelector('.newsletter__submit');
  const input = form.querySelector('.newsletter__input');
  const defaultLabel = submit.textContent;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submit.textContent = 'Subscribed!';
    submit.disabled = true;
    input.disabled = true;

    setTimeout(() => {
      form.reset();
      submit.textContent = defaultLabel;
      submit.disabled = false;
      input.disabled = false;
    }, 2500);
  });
}

// --- Checkout : bouton "Next" de l'étape 1 ----------------------------------
// `novalidate` sur .checkout__form désactive la validation auto du navigateur
// (le style d'erreur natif ne correspond pas à la maquette) mais l'API de
// validation reste utilisable manuellement : on s'en sert donc pour bloquer
// le passage à l'étape 2 tant que les champs requis (nom, e-mail, conditions)
// ne sont pas remplis, plutôt que de laisser "Next" recharger la page (submit
// sans action ni handler).
function initCheckoutNext() {
  const form = document.querySelector('.checkout__form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    document.querySelector('[data-checkout-step-toggle][aria-controls="step-2-body"]')?.click();
  });
}

// --- Checkout : code promo ---------------------------------------------------
// Pas de catalogue de codes réel côté projet (rien à extraire de la maquette
// sur ce point) : "Apply" valide donc réellement le champ (non vide) puis
// répond honnêtement qu'aucun code n'est reconnu, plutôt que de simuler une
// remise inventée ou de laisser le formulaire recharger la page.
function initDiscountForm() {
  const form = document.querySelector('.order-discount');
  if (!form) return;

  const input = form.querySelector('.order-discount__input');
  const submit = form.querySelector('.order-discount__submit');
  const defaultLabel = submit.textContent;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!input.value.trim()) {
      input.focus();
      return;
    }

    submit.textContent = 'Invalid code';
    setTimeout(() => {
      submit.textContent = defaultLabel;
    }, 2000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
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
  initCardActions();
  initNewArrivalsTabs();
  initNewsletterForm();
  initCheckoutNext();
  initDiscountForm();
});
