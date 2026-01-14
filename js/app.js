// ===== Mobile nav =====
(() => {
  const header = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
})();

// ===== Footer year =====
(() => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// ===== Carousel (pixel-perfect snap) =====
(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.car-track');
    if (!track) return;
    const slides = Array.from(track.children);
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    let idx = 0, timer;

    function slideWidth() {
      return slides[0].getBoundingClientRect().width;
    }
    function go(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * slideWidth()}px)`;
      restart();
    }
    function restart() {
      if (prefersReducedMotion) return;
      clearInterval(timer);
      timer = setInterval(() => go(idx + 1), 7000);
    }
    function pause() { clearInterval(timer); }

    prev?.addEventListener('click', () => go(idx - 1));
    next?.addEventListener('click', () => go(idx + 1));

    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', restart);
    window.addEventListener('resize', () => go(idx));
    go(0);
  });
})();

// ===== Product filters =====
(() => {
  const filterGroup = document.querySelector('[data-filter-group]');
  if (!filterGroup) return;
  const buttons = Array.from(filterGroup.querySelectorAll('button[data-filter]'));
  const cards = Array.from(document.querySelectorAll('[data-category]'));
  const sections = Array.from(document.querySelectorAll('[data-section]'));

  const setActive = (filter) => {
    buttons.forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !matches);
    });
    sections.forEach((section) => {
      const visibleCards = section.querySelectorAll('[data-category]:not(.is-hidden)');
      section.classList.toggle('is-hidden', visibleCards.length === 0);
    });
  };

  buttons.forEach((btn) => btn.addEventListener('click', () => setActive(btn.dataset.filter)));
  setActive('all');
})();

