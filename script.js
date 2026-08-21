// ===== Mobile nav toggle =====
const burger = document.querySelector('.burger');
const links = document.querySelector('nav.links');
if (burger && links) {
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    burger.textContent = links.classList.contains('open') ? '✕' : '☰';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.textContent = '☰';
  }));
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ===== Hero 3D stack parallax on mouse move =====
const stack = document.querySelector('.stack');
if (stack) {
  stack.addEventListener('mousemove', (e) => {
    const r = stack.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    stack.style.setProperty('--mx', x);
    stack.style.setProperty('--my', y);
    const c3 = stack.querySelector('.c3');
    if (c3) c3.style.transform = `rotateX(${8 - y * 14}deg) rotateY(${-2 + x * 20}deg) translateZ(60px) scale(1.01)`;
  });
  stack.addEventListener('mouseleave', () => {
    const c3 = stack.querySelector('.c3');
    if (c3) c3.style.transform = '';
  });
}

// ===== Generic search-filter for .card elements =====
function initSiteSearch(inputId, cardSelector, countId) {
  const input = document.getElementById(inputId);
  const count = document.getElementById(countId);
  if (!input) return;
  const cards = () => document.querySelectorAll(cardSelector);
  const run = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    cards().forEach(card => {
      const hay = (card.dataset.keywords || '') + ' ' + card.textContent;
      const match = hay.toLowerCase().includes(q);
      card.hidden = !match;
      if (match) shown++;
    });
    if (count) count.textContent = q ? `${shown} tool${shown === 1 ? '' : 's'} match "${q}"` : `${cards().length} tools available`;
  };
  input.addEventListener('input', run);
  run();
}

// ===== Copy to clipboard helper =====
function copyText(text, el) {
  navigator.clipboard?.writeText(text).then(() => {
    if (el) { const old = el.textContent; el.textContent = 'Copied ✓'; setTimeout(() => el.textContent = old, 1200); }
  });
}
