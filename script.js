/* =========================================================
   Nosso Amor — interações
   ========================================================= */

/* ---- Abertura (veil) ---- */
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('veil').classList.add('hidden'), 1800);
});

/* ---- Navbar: muda ao rolar ---- */
const nav = document.getElementById('nav');
function onScroll() {
    if (window.scrollY > window.innerHeight - 90) {
        nav.classList.add('scrolled');
        nav.classList.remove('at-top');
    } else {
        nav.classList.remove('scrolled');
        nav.classList.add('at-top');
    }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Reveal on scroll ---- */
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---- Hero slideshow ---- */
const slides = Array.from(document.querySelectorAll('#heroSlides .slide'));
const dotsWrap = document.getElementById('heroDots');
let current = 0;
slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(b);
});
const dots = Array.from(dotsWrap.children);
function showSlide(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('on', idx === i));
    current = i;
}
function goToSlide(i) { showSlide(i); resetTimer(); }
let timer = setInterval(() => showSlide((current + 1) % slides.length), 5000);
function resetTimer() { clearInterval(timer); timer = setInterval(() => showSlide((current + 1) % slides.length), 5000); }
showSlide(0);

/* ---- Contadores ---- */
function diff(from) {
    const now = new Date();
    let years = now.getFullYear() - from.getFullYear();
    let months = now.getMonth() - from.getMonth();
    let days = now.getDate() - from.getDate();
    let hours = now.getHours() - from.getHours();
    let minutes = now.getMinutes() - from.getMinutes();
    let seconds = now.getSeconds() - from.getSeconds();
    if (seconds < 0) { minutes--; seconds += 60; }
    if (minutes < 0) { hours--; minutes += 60; }
    if (hours < 0) { days--; hours += 24; }
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    return { years, months, days, hours, minutes, seconds };
}

const togetherDate = new Date('2021-09-12T00:00:00');
const clockEl = document.getElementById('togetherClock');
const units = [
    ['years', 'anos'], ['months', 'meses'], ['days', 'dias'],
    ['hours', 'horas'], ['minutes', 'min'], ['seconds', 'seg']
];
function renderClock() {
    const d = diff(togetherDate);
    clockEl.innerHTML = units.map(([k, label]) =>
        `<div class="unit"><div class="num">${String(d[k]).padStart(2, '0')}</div><div class="cap">${label}</div></div>`
    ).join('');
}
renderClock();
setInterval(renderClock, 1000);

/* ---- "há quanto tempo" nos marcos ---- */
function humanAgo(dateStr) {
    const d = diff(new Date(dateStr + 'T00:00:00'));
    const parts = [];
    if (d.years)  parts.push(d.years + (d.years === 1 ? ' ano' : ' anos'));
    if (d.months) parts.push(d.months + (d.months === 1 ? ' mês' : ' meses'));
    if (!d.years && d.days) parts.push(d.days + (d.days === 1 ? ' dia' : ' dias'));
    if (!parts.length) return 'hoje mesmo 💛';
    return 'há ' + parts.join(' e ');
}
document.querySelectorAll('.ago').forEach(el => {
    el.textContent = humanAgo(el.dataset.ago);
});

/* ---- Surpresa: mensagens + confete ---- */
const messages = [
    "Você é a pessoa mais incrível da minha vida. Eu te amo mais do que tudo! 💖",
    "Cada dia com você é como um presente que nunca quero parar de abrir. 🎁",
    "Você faz meu coração bater mais rápido e o mundo parecer mais bonito. 🌍",
    "Te amar é a melhor aventura da minha vida. 🚀",
    "Do namoro ao altar, eu escolheria você em todas as vidas. 💍",
    "Prometo estar sempre ao seu lado, hoje e para sempre. 🤍"
];
let msgIndex = 0;
const secretCard = document.getElementById('secretCard');
const messageText = document.getElementById('messageText');
function fireConfetti() {
    confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 },
        colors: ['#C0A35B', '#7C8A66', '#E2BFB6', '#ffffff'] });
}
document.getElementById('secretButton').addEventListener('click', () => {
    secretCard.classList.add('show');
    messageText.textContent = messages[msgIndex];
    fireConfetti();
});
document.getElementById('nextMessage').addEventListener('click', () => {
    msgIndex = (msgIndex + 1) % messages.length;
    messageText.textContent = messages[msgIndex];
    fireConfetti();
});

/* ---- Curtir fotos ---- */
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('liked');
        btn.innerHTML = btn.classList.contains('liked')
            ? '<i class="fas fa-heart"></i> Curtido'
            : '<i class="fas fa-heart"></i> Curtir';
    });
});

/* ---- Lightbox ---- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCap');
document.querySelectorAll('.post .frame img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        const cap = img.closest('.post').querySelector('.body p');
        lightboxCap.textContent = cap ? cap.textContent : '';
        lightbox.classList.add('show');
    });
});
function closeLightbox() { lightbox.classList.remove('show'); }
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ---- Mensagem do visitante (localStorage) ---- */
const savedEl = document.getElementById('savedMessage');
document.getElementById('saveMessage').addEventListener('click', () => {
    const val = document.getElementById('userMessage').value.trim();
    if (val) {
        localStorage.setItem('savedMessage', val);
        savedEl.textContent = '“' + val + '”';
        document.getElementById('userMessage').value = '';
    }
});
const stored = localStorage.getItem('savedMessage');
if (stored) savedEl.textContent = '“' + stored + '”';

/* ---- Música ---- */
const music = document.getElementById('backgroundMusic');
const musicBtn = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play().then(() => {
            musicBtn.classList.add('playing');
            musicLabel.textContent = 'Pausar música';
        }).catch(() => {});
    } else {
        music.pause();
        musicBtn.classList.remove('playing');
        musicLabel.textContent = 'Tocar música';
    }
});

/* ---- Pétalas/corações flutuantes ---- */
(function petals() {
    const layer = document.createElement('div');
    layer.className = 'petals';
    document.body.appendChild(layer);
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('i');
        p.className = 'petal fas fa-heart';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = (9 + Math.random() * 12) + 'px';
        p.style.animationDuration = (12 + Math.random() * 12) + 's';
        p.style.animationDelay = (Math.random() * 12) + 's';
        layer.appendChild(p);
    }
})();
