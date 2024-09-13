document.addEventListener('DOMContentLoaded', function() {
    const gerarButton = document.getElementById('gerar');
    const iniciarButton = document.getElementById('iniciar');
    const numeroInput = document.getElementById('numero');
    const mensagemTextarea = document.getElementById('mensagem');
    const whatsappLink = document.getElementById('whatsapp-link');
    const whatsappWebLink = document.getElementById('whatsapp-web-link');

    // Define o código do país (Brasil - +55) - Pode ser modificado conforme necessário
    const codigoPais = '+55';

    function criarLink(numero, mensagem) {
        const mensagemFormatada = encodeURIComponent(mensagem);
        const numeroFormatado = numero.replace(/\D/g, ''); // Remove caracteres não numéricos
        return `https://wa.me/${codigoPais}${numeroFormatado}?text=${mensagemFormatada}`;
    }

    function criarLinkWeb(numero, mensagem) {
        const mensagemFormatada = encodeURIComponent(mensagem);
        const numeroFormatado = numero.replace(/\D/g, ''); // Remove caracteres não numéricos
        return `https://web.whatsapp.com/send?phone=${codigoPais}${numeroFormatado}&text=${mensagemFormatada}`;
    }

    gerarButton.addEventListener('click', function() {
        const numero = numeroInput.value;
        const mensagem = mensagemTextarea.value;
        const link = criarLink(numero, mensagem);
        const linkWeb = criarLinkWeb(numero, mensagem);

        whatsappLink.href = link;
        whatsappWebLink.href = linkWeb;

        whatsappLink.style.display = 'inline';
        whatsappLink.textContent = 'Clique aqui para conversar no WhatsApp';

        whatsappWebLink.style.display = 'inline';
        whatsappWebLink.textContent = 'Clique aqui para conversar no WhatsApp Web';
    });

    iniciarButton.addEventListener('click', function() {
        const numero = numeroInput.value;
        const mensagem = mensagemTextarea.value;
        const link = criarLink(numero, mensagem);

        window.open(link, '_blank');
    });
});

function alertaWhatsAppWeb() {
    alert('Se preferir, abra este link em um navegador onde o WhatsApp Web já está conectado.');
}