// ==========================================================================
// main.js — page content behaviour (accordion, compare slider, carousels)
// ==========================================================================

// --- Accordion (collectionsMoreInfo) --------------------------------------
function initAccordion() {
  const toggles = document.querySelectorAll('[data-accordion-toggle]');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const item = toggle.closest('.accordion-item');
      const body = item.querySelector('.accordion-item__body');
      const icon = toggle.querySelector('.accordion-item__icon');
      if (!body) return;

      const isOpen = body.style.display !== 'none';
      body.style.display = isOpen ? 'none' : '';
      icon.src = isOpen
        ? 'assets/icons/icon-plus.svg'
        : 'assets/icons/icon-minus.svg';
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

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initCompare();
  initProductCarousel();
  initFaq();
  initHeroCarousel();
  initProductGallery();
  initSpotlight();
});
