// ==========================================================================
// includes.js — injects shared components (header/footer) into pages,
// then wires up their behavior (burger menu, promo slider, dropdowns).
// ==========================================================================

async function loadInclude(el) {
  const name = el.dataset.include;
  const res = await fetch(`components/${name}.html`);
  el.innerHTML = await res.text();
}

async function loadAllIncludes() {
  const targets = document.querySelectorAll('[data-include]');
  await Promise.all(Array.from(targets, loadInclude));
}

// --------------------------------------------------------------------------
// Menu mobile plein écran (451:782) — ouvert par le burger, accordéon
// Home/Shop/New Arrivals/Collection/About, un seul panneau ouvert à la fois.
// --------------------------------------------------------------------------
function initMobileMenu() {
  const burger = document.querySelector('[data-burger-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const closeBtn = document.querySelector('[data-mobile-menu-close]');
  if (!burger || !menu) return;

  const close = () => {
    menu.hidden = true;
    burger.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  const open = () => {
    menu.hidden = false;
    burger.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  burger.addEventListener('click', () => {
    if (menu.hidden) open();
    else close();
  });

  closeBtn?.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) close();
  });

  const accordions = menu.querySelectorAll('[data-mobile-accordion]');
  const closeAllAccordions = () => {
    accordions.forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('[data-mobile-accordion-panel]').hidden = true;
      item.querySelector('[data-mobile-accordion-toggle]').setAttribute('aria-expanded', 'false');
    });
  };

  accordions.forEach((item) => {
    const toggle = item.querySelector('[data-mobile-accordion-toggle]');
    const panel = item.querySelector('[data-mobile-accordion-panel]');

    toggle.addEventListener('click', () => {
      const willOpen = panel.hidden;
      closeAllAccordions();
      if (willOpen) {
        item.classList.add('is-open');
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initPromoSlider() {
  const prev = document.querySelector('[data-promo-prev]');
  const next = document.querySelector('[data-promo-next]');
  const text = document.querySelector('.promo-header__slider-text');
  if (!prev || !next || !text) return;

  const messages = [
    'New customers 10% off with WELCOME',
    'Free shipping on orders over $150',
    'Join our newsletter for early access',
  ];
  let index = 0;

  const render = () => {
    text.textContent = messages[index];
  };

  prev.addEventListener('click', () => {
    index = (index - 1 + messages.length) % messages.length;
    render();
  });

  next.addEventListener('click', () => {
    index = (index + 1) % messages.length;
    render();
  });
}

// Le designer renvoie vers le frame Fixed_Header : passé la hauteur de la
// barre promo + du header, celui-ci se fige en blanc et ses actions passent
// en icônes. Le basculement est purement visuel, la classe fait le reste.
function initFixedHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Position du header dans le document : passé ce point, il sortirait du
  // cadre, c'est là qu'il se fige.
  const trigger = header.getBoundingClientRect().top + window.scrollY;

  const sync = () => {
    header.classList.toggle('site-header--fixed', window.scrollY > trigger);
  };

  sync();
  window.addEventListener('scroll', sync, { passive: true });
}

// « move Up » : la pastille du footer ramène en haut de page en douceur.
// Elle vit dans le composant injecté, d'où son câblage ici.
function initBackToTop() {
  const button = document.querySelector('.site-footer__top');
  if (!button) return;

  button.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --------------------------------------------------------------------------
// Panneaux Recherche et Panier
// --------------------------------------------------------------------------
// Les deux tiroirs partagent la même mécanique : un seul ouvert à la fois,
// fermeture par la croix, par le voile ou par Échap.
function initPanels() {
  const overlay = document.querySelector('[data-panel-overlay]');
  const panels = document.querySelectorAll('[data-panel]');
  if (!overlay || !panels.length) return;

  let lastTrigger = null;

  const closeAll = () => {
    panels.forEach((panel) => {
      panel.hidden = true;
    });
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  };

  const open = (name, trigger) => {
    const target = document.querySelector(`[data-panel="${name}"]`);
    if (!target) return;

    panels.forEach((panel) => {
      panel.hidden = panel !== target;
    });
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    lastTrigger = trigger || null;

    const focusable = target.querySelector('input, button, a');
    if (focusable) focusable.focus();
  };

  document.querySelectorAll('[data-panel-open]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      open(trigger.dataset.panelOpen, trigger);
    });
  });

  document.querySelectorAll('[data-panel-close]').forEach((button) => {
    button.addEventListener('click', closeAll);
  });

  overlay.addEventListener('click', closeAll);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });

  syncCartState();
}

// L'état vide du panier (114:565) prend la place de la liste et du récapitulatif
// dès que celle-ci ne contient plus d'article.
function syncCartState() {
  const list = document.querySelector('[data-cart-items]');
  const empty = document.querySelector('[data-cart-empty]');
  const summary = document.querySelector('[data-cart-summary]');
  const count = document.querySelector('[data-cart-count]');
  if (!list || !empty || !summary) return;

  const items = list.querySelectorAll('.cart-item').length;
  const isEmpty = items === 0;

  list.hidden = isEmpty;
  empty.hidden = !isEmpty;
  summary.hidden = isEmpty;

  const suggestions = list.parentElement.querySelectorAll('.panel__section-title, .panel__slider');
  suggestions.forEach((node) => {
    node.hidden = isEmpty;
  });

  if (count) {
    count.textContent = isEmpty ? '' : `(${items} Item${items > 1 ? 's' : ''})`;
  }

  document.querySelectorAll('[data-cart-badge]').forEach((badge) => {
    badge.textContent = items;
    badge.hidden = isEmpty;
  });
}

// --------------------------------------------------------------------------
// Quantité produit — panneau panier et récapitulatif checkout
// --------------------------------------------------------------------------
// Contrat par attributs plutôt que par classe BEM, pour qu'une seule routine
// pilote à la fois le tiroir panier (`panels.html`) et le récapitulatif de
// la page checkout, dont les gabarits diffèrent :
//   [data-cart-instance]  racine d'un panier (tiroir OU récapitulatif)
//   [data-unit-price]     article, porte le prix unitaire
//   [data-qty]            son compteur
//   [data-qty-inc/-dec]   ses boutons + / -
//   [data-line-price]     sa ligne de prix, recalculée à chaque clic
//   [data-cart-remove]    retire l'article (bouton corbeille)
//   [data-cart-subtotal/-total]   cibles récapitulatif (peuvent apparaître
//                                 plusieurs fois, ex. le bouton Checkout)
//   [data-cart-shipping]  frais fixes optionnels, portés sur l'élément lui-même
function formatPrice(value) {
  return `${value.toFixed(2).replace('.', ',')}$`;
}

function updateCartInstance(instance) {
  const items = instance.querySelectorAll('[data-unit-price]');
  let subtotal = 0;

  items.forEach((item) => {
    const unit = parseFloat(item.dataset.unitPrice);
    const qty = parseInt(item.querySelector('[data-qty]').textContent, 10);
    const line = unit * qty;
    subtotal += line;

    const priceEl = item.querySelector('[data-line-price]');
    if (priceEl) priceEl.textContent = formatPrice(line);
  });

  const shippingEl = instance.querySelector('[data-cart-shipping]');
  const shipping = shippingEl ? parseFloat(shippingEl.dataset.cartShipping) : 0;

  instance.querySelectorAll('[data-cart-subtotal]').forEach((el) => {
    el.textContent = formatPrice(subtotal);
  });
  instance.querySelectorAll('[data-cart-total]').forEach((el) => {
    el.textContent = formatPrice(subtotal + shipping);
  });

  if (instance.hasAttribute('data-panel')) syncCartState();
}

// Câblage d'un seul article — extrait pour pouvoir être rappelé quand un
// article est ajouté dynamiquement après coup (cf. product-details dans
// main.js), sans re-parcourir/re-câbler ceux déjà en place.
function wireCartItem(item, instance) {
  const qtyEl = item.querySelector('[data-qty]');
  const step = (delta) => {
    const next = Math.max(1, parseInt(qtyEl.textContent, 10) + delta);
    qtyEl.textContent = next;
    updateCartInstance(instance);
  };

  item.querySelector('[data-qty-inc]')?.addEventListener('click', () => step(1));
  item.querySelector('[data-qty-dec]')?.addEventListener('click', () => step(-1));
  item.querySelector('[data-cart-remove]')?.addEventListener('click', () => {
    item.remove();
    updateCartInstance(instance);
  });
}

function initQuantityControls() {
  document.querySelectorAll('[data-cart-instance]').forEach((instance) => {
    instance.querySelectorAll('[data-unit-price]').forEach((item) => wireCartItem(item, instance));
    updateCartInstance(instance);
  });
}

// --------------------------------------------------------------------------
// Sélecteurs Langue / Devise (frames 87:2 et 87:82) — un seul ouvert à la
// fois, fermeture au clic extérieur ou à l'Échap.
// --------------------------------------------------------------------------
function initDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  if (!dropdowns.length) return;

  const closeAll = (except) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.querySelector('[data-dropdown-list]').hidden = true;
      dropdown.querySelector('[data-dropdown-toggle]').setAttribute('aria-expanded', 'false');
    });
  };

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('[data-dropdown-toggle]');
    const list = dropdown.querySelector('[data-dropdown-list]');
    const value = dropdown.querySelector('[data-dropdown-value]');

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = list.hidden;
      closeAll();
      list.hidden = !willOpen;
      toggle.setAttribute('aria-expanded', String(willOpen));
    });

    dropdown.querySelectorAll('[data-dropdown-option]').forEach((option) => {
      option.addEventListener('click', () => {
        dropdown.querySelector('.dropdown__item.is-active')?.classList.remove('is-active');
        option.classList.add('is-active');
        value.textContent = option.dataset.short || option.textContent;
        closeAll();
      });
    });
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });
}

// --------------------------------------------------------------------------
// Méga-menus New Arrivals / Collection (297:228, 297:237) — clic pour ouvrir,
// un seul ouvert à la fois, fermeture au clic extérieur ou à l'Échap.
// --------------------------------------------------------------------------
function initNavMegaMenus() {
  const items = document.querySelectorAll('[data-nav-dropdown]');
  if (!items.length) return;

  const closeAll = () => {
    items.forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('[data-nav-dropdown-panel]').hidden = true;
      item.querySelector('[data-nav-dropdown-toggle]').setAttribute('aria-expanded', 'false');
    });
  };

  items.forEach((item) => {
    const toggle = item.querySelector('[data-nav-dropdown-toggle]');
    const panel = item.querySelector('[data-nav-dropdown-panel]');

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = panel.hidden;
      closeAll();
      if (willOpen) {
        item.classList.add('is-open');
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadAllIncludes();
  initMobileMenu();
  initPromoSlider();
  initFixedHeader();
  initBackToTop();
  initPanels();
  initQuantityControls();
  initDropdowns();
  initNavMegaMenus();
});
