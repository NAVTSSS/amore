// ============================================================
// ⏱️ CONTADOR DE TEMPO
// ✏️ EDITE AQUI — Mude a data de início do namoro
// Formato: ano, mês-1 (janeiro=0, fevereiro=1... dezembro=11), dia, hora, minuto
// ============================================================
const INICIO_NAMORO = new Date(2021, 4, 30, 0, 0, 0);
// Exemplos:
//   new Date(2021, 5, 15, 0, 0, 0)  → 15 de junho de 2021
//   new Date(2022, 11, 24, 20, 30, 0) → 24 de dezembro de 2022 às 20h30

function atualizarContador() {
  const agora = new Date();
  const diff = agora - INICIO_NAMORO;

  if (diff < 0) {
    document.getElementById('cnt-anos').textContent = '0';
    return;
  }

  // Calcula anos, meses, dias exatos
  let anos  = agora.getFullYear()  - INICIO_NAMORO.getFullYear();
  let meses = agora.getMonth()     - INICIO_NAMORO.getMonth();
  let dias  = agora.getDate()      - INICIO_NAMORO.getDate();

  if (dias < 0) {
    meses -= 1;
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += mesAnterior.getDate();
  }
  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }

  const totalMs  = diff;
  const totalSeg = Math.floor(totalMs / 1000);
  const totalMin = Math.floor(totalSeg / 60);
  const totalH   = Math.floor(totalMin / 60);

  const horas = totalH % 24;
  const min   = totalMin % 60;
  const seg   = totalSeg % 60;

  document.getElementById('cnt-anos').textContent  = anos;
  document.getElementById('cnt-meses').textContent = meses;
  document.getElementById('cnt-dias').textContent  = dias;
  document.getElementById('cnt-horas').textContent = String(horas).padStart(2,'0');
  document.getElementById('cnt-min').textContent   = String(min).padStart(2,'0');
  document.getElementById('cnt-seg').textContent   = String(seg).padStart(2,'0');
}

atualizarContador();
setInterval(atualizarContador, 1000);

// ===== LIGHTBOX para fotos =====
function openLightbox(card) {
  const img = card.querySelector('img');
  if (!img) return;
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ===== ANIMAÇÕES DE ENTRADA (scroll) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
