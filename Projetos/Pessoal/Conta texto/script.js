// Adiciona um evento para contar palavras e caracteres sempre que o texto for alterado
document.getElementById('texto').addEventListener('input', contarPalavrasECaracteres);

// Função que realiza a contagem de palavras, caracteres e espaços
function contarPalavrasECaracteres() {
    const texto = document.getElementById('texto').value; // Obtém o texto inserido no textarea
    
    // Dividindo o texto em palavras com base em espaços e removendo espaços extras
    const palavras = texto.trim().split(/\s+/).filter(Boolean);
    const numeroDePalavras = palavras.length; // Número de palavras
    const numeroDeCaracteres = texto.length;  // Número total de caracteres
    const numeroDeEspacos = (texto.match(/\s/g) || []).length; // Contando quantos espaços existem no texto

    // Atualizando o conteúdo da área de resultado
    document.getElementById('resultado').innerHTML = 
        `Número de palavras: ${numeroDePalavras}<br>` +
        `Número de caracteres: ${numeroDeCaracteres}<br>` +
        `Número de espaços: ${numeroDeEspacos}`;
}
