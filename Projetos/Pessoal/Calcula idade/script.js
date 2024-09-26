// Função para calcular a idade em anos, meses e dias automaticamente
function calcularIdade() {
    const dataNascimento = new Date(document.getElementById('data-nascimento').value);
    const hoje = new Date();

    // Verifica se a data de nascimento é válida
    if (isNaN(dataNascimento) || dataNascimento > hoje) {
        document.getElementById('resultado').innerHTML = "<span class='error'>Por favor, insira uma data de nascimento válida.</span>";
        document.getElementById('resultado').classList.remove('show');
        return;
    }

    // Calcula a diferença em milissegundos entre hoje e a data de nascimento
    const diferencaEmMilissegundos = hoje - dataNascimento;
    const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

    let anos = hoje.getFullYear() - dataNascimento.getFullYear();
    let meses = hoje.getMonth() - dataNascimento.getMonth();
    let dias = hoje.getDate() - dataNascimento.getDate();

    // Ajusta dias e meses se necessário
    if (dias < 0) {
        meses--;
        const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
        dias += ultimoDiaDoMes;
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    // Exibe o resultado formatado
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `Você tem aproximadamente <br><span class="highlight">${diferencaEmDias}</span> dias (<span class="highlight">${anos}</span> anos e <span class="highlight">${meses}</span> meses).`;
    resultadoElement.classList.add('show'); // Exibe o resultado com transição suave
}
