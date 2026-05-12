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
    const form = document.querySelector('form');
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
