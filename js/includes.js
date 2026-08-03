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

function initBurgerMenu() {
  const burger = document.querySelector('[data-burger-toggle]');
  const menu = document.querySelector('.site-header__menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    burger.classList.toggle('is-active', isOpen);
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
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadAllIncludes();
  initBurgerMenu();
  initPromoSlider();
  initFixedHeader();
  initBackToTop();
  initPanels();
});
