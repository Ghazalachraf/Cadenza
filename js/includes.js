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

document.addEventListener('DOMContentLoaded', async () => {
  await loadAllIncludes();
  initBurgerMenu();
  initPromoSlider();
  initFixedHeader();
});
