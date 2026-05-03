function enviarWhatsApp(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coletar dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const empresa = document.getElementById('empresa').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validar campos obrigatórios
    if (!nome || !email || !telefone || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Criar mensagem personalizada
    const mensagemCompleta = encodeURIComponent(
        `Olá, sou ${nome}!\n\n` +
        `Email: ${email}\n` +
        `Telefone: ${telefone}\n` +
        `${empresa ? `Empresa: ${empresa}\n` : ''}` +
        `\nMensagem:\n${mensagem}\n\n` +
        `Gostaria de mais informações sobre os serviços da MV Contabi.`
    );

    const numero = "5574981080549"; // Número correto do WhatsApp
    const url = `https://wa.me/${numero}?text=${mensagemCompleta}`;

    // Feedback visual
    alert('Mensagem preparada! Você será redirecionado para o WhatsApp.');

    // Abrir WhatsApp em nova aba
    window.open(url, '_blank');

    // Opcional: Limpar formulário após envio
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('empresa').value = '';
    document.getElementById('mensagem').value = '';

}

// Adicionar event listener quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', enviarWhatsApp);
    }
});

// Função para alternar as fotos no topo
function toggleStack() {
    const stack = document.getElementById('photoStack');
    stack.classList.toggle('active');
}