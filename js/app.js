// ===== Aparición (Intersection Observer)
(() => {
  const el = document.querySelector('[data-animate]');
  if (!el) return;
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); }
  }, { threshold: .2 });
  io.observe(el);
})();

// ===== Tabs (solo estado visual)
document.querySelectorAll('.chip').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(x => x.classList.remove('is-active'));
    t.classList.add('is-active');
  });
});

// ===== Menú lateral: submenú con retardo
(() => {
  const group = document.querySelector('.menu-group');
  const submenu = document.querySelector('.submenu');
  if (!group || !submenu) return;

  let hideTimeout;
  group.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    submenu.classList.add('show');
  });
  group.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => submenu.classList.remove('show'), 100);
  });
})();

// ===== CTA Descargar CV
(() => {
  const btn = document.getElementById('btn-cv');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'assets/CV.pdf';
    link.download = 'Ricardo O. Bedrillana.pdf';
    link.click();
  });
})();

// ===== Acordeón + Toggle Tecnologías (delegado)
(() => {
  const accordion = document.querySelector('.accordion');
  if (!accordion) return;

  // Abre/cierra item (uno a la vez)
  accordion.addEventListener('click', (e) => {
    if (e.target.closest('.toggle')) return; // no interferir con toggle interno
    const clicked = e.target.closest('.accordion-item');
    if (!clicked) return;
    accordion.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    clicked.classList.add('open');
  });

  // Botón "Tecnologías" ⇄ Texto
  accordion.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle');
    if (!btn) return;
    e.stopPropagation();

    const overlay = btn.closest('.accordion-overlay');
    const desc   = overlay.querySelector('.desc');
    const logos  = overlay.querySelector('.tech-logos'); // usamos logos; si tuvieras <ul.tech>, añádelo

    const active = btn.getAttribute('aria-pressed') === 'true';
    if (active) {
      btn.setAttribute('aria-pressed', 'false');
      btn.textContent = 'Tecnologías';
      if (desc)  desc.hidden  = false;
      if (logos) logos.hidden = true;
    } else {
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = 'Volver';
      if (desc)  desc.hidden  = true;
      if (logos) logos.hidden = false;
    }
  });
})();
