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

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initCompare();
  initProductCarousel();
  initFaq();
});
