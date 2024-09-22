// Função para converter o texto de acordo com a opção selecionada
function converterTexto() {
    const origem = document.querySelector('.origem').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    let destino;

    switch (tipo) {
        case 'maiusculas':
            destino = origem.toUpperCase();
            break;
        case 'minusculas':
            destino = origem.toLowerCase();
            break;
        case 'primeiraletra':
            destino = origem.split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');
            break;
        default:
            destino = origem;
    }

    document.querySelector('.destino').value = destino;
}

// Função para copiar o texto convertido
function copiarTexto() {
    const textoConvertido = document.querySelector('.destino');
    textoConvertido.select(); // Seleciona o texto
    document.execCommand('copy'); // Copia o texto para a área de transferência

    // Feedback para o usuário
    alert('Texto copiado para a área de transferência!');
}

// Função para limpar os campos
function limparConteudo() {
    document.querySelector('.origem').value = ''; // Limpa o campo de origem
    document.querySelector('.destino').value = ''; // Limpa o campo de destino
}
