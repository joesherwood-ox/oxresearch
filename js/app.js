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

// ===== Carousel (snaps 100%, pauses on hover/hidden tab) =====
(() => {
  const track = document.querySelector('.car-track');
  const slides = track ? Array.from(track.children) : [];
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  if (!track || slides.length === 0) return;

  let idx = 0, timer;

  function go(i){
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    restart();
  }
  function restart(){ clearInterval(timer); timer = setInterval(()=>go(idx+1), 7000); }
  function pause(){ clearInterval(timer); }

  prev && prev.addEventListener('click', ()=>go(idx-1));
  next && next.addEventListener('click', ()=>go(idx+1));

  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', restart);
    carousel.addEventListener('focusin', pause);
    carousel.addEventListener('focusout', restart);
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e)=>{
      if (e.key === 'ArrowLeft') go(idx-1);
      if (e.key === 'ArrowRight') go(idx+1);
    });
  }

  document.addEventListener('visibilitychange', ()=> document.hidden ? pause() : restart());

  go(0); // align to first slide and start autoplay
})();

