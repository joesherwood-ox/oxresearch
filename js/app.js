// mobile nav
const header = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// carousel
const track = document.querySelector('.car-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let idx = 0;
function go(i){ idx = (i + slides.length) % slides.length; track.style.transform = `translateX(-${idx * 100}%)`; }
prev?.addEventListener('click', ()=>go(idx-1));
next?.addEventListener('click', ()=>go(idx+1));
setInterval(()=>go(idx+1), 7000);
