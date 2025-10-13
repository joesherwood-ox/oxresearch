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
  const track = document.querySelector('.car-track');
  if (!track) return;
  const slides = Array.from(track.children);
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  let idx = 0, timer;

  function slideWidth() {
    return slides[0].getBoundingClientRect().width;
  }
  function go(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * slideWidth()}px)`;
    restart();
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 7000); }
  function pause() { clearInterval(timer); }

  prev?.addEventListener('click', () => go(idx - 1));
  next?.addEventListener('click', () => go(idx + 1));

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', restart);
  }
  window.addEventListener('resize', () => go(idx));
  go(0);
})();



