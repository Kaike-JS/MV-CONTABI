// =========================================
// FORMULÁRIO — Envio via WhatsApp
// =========================================
// =========================================
// FORMULÁRIO — Envio via WhatsApp
// =========================================
function enviarWhatsApp(event) {
    event.preventDefault();

    const nome     = document.getElementById('nome').value;
    const email    = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const empresa  = document.getElementById('empresa').value;
    const assunto  = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!nome || !email || !telefone || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const mensagemCompleta = encodeURIComponent(
        `Olá, sou ${nome}!\n\n` +
        `Email: ${email}\n` +
        `Telefone: ${telefone}\n` +
        (empresa ? `Empresa: ${empresa}\n` : '') +
        (assunto ? `Assunto: ${assunto}\n` : '') +
        `\nMensagem:\n${mensagem}\n\n` +
        `Gostaria de mais informações sobre os serviços da MV Contabi.`
    );

    const url = `https://wa.me/5574981080549?text=${mensagemCompleta}`;

    alert('Mensagem preparada! Você será redirecionado para o WhatsApp.');
    window.open(url, '_blank');

    // Limpa o formulário após envio
    ['nome', 'email', 'telefone', 'empresa', 'assunto', 'mensagem'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = el.tagName === 'SELECT' ? '' : '';
    });
}

// =========================================
// PHOTO STACK — Toggle de imagens (#time)
// =========================================
function toggleStack() {
    document.getElementById('photoStack').classList.toggle('active');
}

// =========================================
// INICIALIZAÇÃO
// =========================================
document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.client-img').forEach(img => {
        const fallback = 'assets/mvcontabi.png';

        img.addEventListener('error', () => {
            if (!img.src.endsWith(fallback)) img.src = fallback;
        });

        if (img.complete && img.naturalWidth === 0) {
            img.src = fallback;
        }
    });

    // 1. Formulário
    const form = document.querySelector('#contatoForm');
    if (form) form.addEventListener('submit', enviarWhatsApp);

    // 2. Animações imediatas dos elementos do hero — independem de scroll
    const addVisible = (selector, delay = 0) => {
        const el = document.querySelector(selector);
        if (el) setTimeout(() => requestAnimationFrame(() => el.classList.add('visible')), delay);
    };

    addVisible('.hero-left', 300);
    addVisible('.hero-right', 500);

    // 3. IntersectionObserver para demais elementos .fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in:not(.hero):not(.hero-left):not(.hero-right):not(.footer-premium)')
        .forEach(el => observer.observe(el));

    const heroCard = document.querySelector('.mv-card-img-wrap');
    if (heroCard) {
        // Para desktop: hover
        heroCard.addEventListener('mouseenter', () => heroCard.classList.add('flipped'));
        heroCard.addEventListener('mouseleave', () => heroCard.classList.remove('flipped'));
        heroCard.addEventListener('focusin', () => heroCard.classList.add('flipped'));
        heroCard.addEventListener('focusout', () => heroCard.classList.remove('flipped'));

        // Para mobile: toque para flip/unflip
        let touchTimeout;
        heroCard.addEventListener('touchstart', (e) => {
            e.preventDefault();
            heroCard.classList.add('flipped');
            clearTimeout(touchTimeout);
            touchTimeout = setTimeout(() => heroCard.classList.remove('flipped'), 3000); // manter por 3s
        });
    }
});

// =========================================
// SERVIÇOS — Filtro por categoria
// =========================================
(function initServicosFilter() {
    const filterBtns = document.querySelectorAll('.srv-filter-btn');
    const items = document.querySelectorAll('.srv-item');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Atualiza estado dos botões
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Filtra os cards
            items.forEach(item => {
                const cats = item.dataset.category || 'all';
                const match = filter === 'all' || cats.includes(filter);
                item.classList.toggle('srv-hidden', !match);
            });
        });
    });
})();


// =========================================
// DIFERENCIAIS — Accordion expand/collapse
// =========================================
(function initDifAccordion() {
    const cards = document.querySelectorAll('.dif-card');
    if (!cards.length) return;

    cards.forEach(card => {
        const toggle = () => {
            const isOpen = card.classList.contains('open');
            // Fecha todos
            cards.forEach(c => {
                c.classList.remove('open');
                c.setAttribute('aria-expanded', 'false');
            });
            // Abre o clicado (se estava fechado)
            if (!isOpen) {
                card.classList.add('open');
                card.setAttribute('aria-expanded', 'true');
            }
        };

        card.addEventListener('click', toggle);
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });
})();


// =========================================
// DIFERENCIAIS — Contador animado
// =========================================
(function initCounters() {
    const counters = document.querySelectorAll('.dif-counter');
    if (!counters.length) return;

    const suffixes = { 98: '%', 200: '+', 8: (el) => el.closest('.dif-stat-item').querySelector('span').textContent.includes('Prêmio') ? 'x' : '+' };

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = 16;
        const steps = duration / step;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            el.textContent = Math.floor(current);
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
})();

// =========================================
// HISTÓRIA v2 — Timeline Accordion
// =========================================
(function initHistTimeline() {
    const items = document.querySelectorAll('.hist-tl-item');
    if (!items.length) return;

    items.forEach(item => {
        const btn  = item.querySelector('.hist-tl-btn');
        const body = item.querySelector('.hist-tl-body');
        if (!btn || !body) return;

        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Fecha todos
            items.forEach(i => {
                const b = i.querySelector('.hist-tl-btn');
                const d = i.querySelector('.hist-tl-body');
                if (b) b.setAttribute('aria-expanded', 'false');
                if (d) d.classList.remove('hist-tl-body--open');
                i.setAttribute('data-open', 'false');
                const icon = i.querySelector('.hist-tl-toggle-icon i');
                if (icon) { icon.className = 'fa-solid fa-plus'; }
            });

            // Abre o clicado (se estava fechado)
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                body.classList.add('hist-tl-body--open');
                item.setAttribute('data-open', 'true');
                const icon = btn.querySelector('.hist-tl-toggle-icon i');
                if (icon) icon.className = 'fa-solid fa-minus';
            }
        });

        // Keyboard
        btn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
})();


// =========================================
// DEPOIMENTOS v2 — Nav Dots Mobile Slider
// =========================================
(function initDepNav() {
    const wall    = document.getElementById('depWall');
    const prev    = document.getElementById('depPrev');
    const next    = document.getElementById('depNext');
    const dotsWrap = document.getElementById('depDots');

    if (!wall || !prev || !next || !dotsWrap) return;

    const isMobile = () => window.innerWidth <= 575;
    const cards    = () => Array.from(wall.querySelectorAll('.dep-card'));
    let currentIdx = 0;
    let dots       = [];

    function buildDots() {
        dotsWrap.innerHTML = '';
        dots = [];
        cards().forEach((_, i) => {
            const d = document.createElement('button');
            d.className = 'dep-nav-dot' + (i === 0 ? ' active' : '');
            d.setAttribute('role', 'tab');
            d.setAttribute('aria-label', `Depoimento ${i + 1}`);
            d.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(d);
            dots.push(d);
        });
    }

    function goTo(idx) {
        if (!isMobile()) return;
        const cs = cards();
        if (!cs.length) return;
        currentIdx = Math.max(0, Math.min(idx, cs.length - 1));

        // Oculta todos, mostra o atual
        cs.forEach((c, i) => {
            c.style.display = i === currentIdx ? 'inline-block' : 'none';
        });

        dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
    }

    function activateMobile() {
        buildDots();
        goTo(0);
    }

    function deactivateMobile() {
        cards().forEach(c => { c.style.display = ''; });
        dotsWrap.innerHTML = '';
    }

    prev.addEventListener('click', () => goTo(currentIdx - 1));
    next.addEventListener('click', () => goTo(currentIdx + 1));

    // Init
    if (isMobile()) activateMobile();

    // Resize
    let wasM = isMobile();
    window.addEventListener('resize', () => {
        const isM = isMobile();
        if (isM && !wasM) { activateMobile(); }
        if (!isM && wasM) { deactivateMobile(); }
        wasM = isM;
    });
})();
