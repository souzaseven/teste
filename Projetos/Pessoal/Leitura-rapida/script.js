const playButton = document.getElementById('play');
const clearButton = document.getElementById('clear');
const expandButton = document.getElementById('expand');
const collapseButton = document.getElementById('collapse');
const expandedPlayButton = document.getElementById('expanded-play');
const palavrasDiv = document.querySelector('.palavras');
const origemTextarea = document.querySelector('.origem');
const ppmInput = document.getElementById('ppm');
const corFundoInput = document.getElementById('cor-fundo');
const corTextoInput = document.getElementById('cor-texto');
const fonteInput = document.getElementById('fonte');
const overlayDiv = document.querySelector('.overlay');
const expandedOverlayDiv = document.getElementById('expanded-overlay');
const expandedPalavrasDiv = document.querySelector('.expanded-palavras');

let palavras = [];
let intervalo;
let index = 0;

const defaultSettings = {
    ppm: 400,
    corFundo: "#ffffff",
    corTexto: "#000000",
    fonte: 42,
};

function iniciarLeitura() {
    if (intervalo) {
        clearInterval(intervalo); // Para o intervalo caso já esteja em execução
    }

    palavras = origemTextarea.value.split(/\s+/); // Divide o texto em palavras
    index = 0;
    let ppm = parseInt(ppmInput.value); // Pega o valor de PPM
    let intervaloTempo = 60000 / ppm; // Calcula o intervalo entre palavras

    // Expandir automaticamente ao clicar em "Ler Rápido"
    expandirLeitura();

    intervalo = setInterval(() => {
        if (index < palavras.length) {
            palavrasDiv.textContent = palavras[index];
            expandedPalavrasDiv.textContent = palavras[index]; // Atualiza o texto no overlay expandido
            index++;
        } else {
            clearInterval(intervalo); // Para quando acabar as palavras
        }
    }, intervaloTempo);
}

function limparTexto() {
    origemTextarea.value = ''; // Limpa o campo de texto
    palavrasDiv.textContent = ''; // Limpa a área de exibição
    expandedPalavrasDiv.textContent = ''; // Limpa o texto expandido
    clearInterval(intervalo); // Para a leitura, se estiver em andamento

    // Resetar para os valores padrões
    ppmInput.value = defaultSettings.ppm;
    corFundoInput.value = defaultSettings.corFundo;
    corTextoInput.value = defaultSettings.corTexto;
    fonteInput.value = defaultSettings.fonte;

    ajustarEstilos(); // Aplica os valores padrão
}

function ajustarEstilos() {
    let corFundo = corFundoInput.value;
    let corTexto = corTextoInput.value;
    let fonte = parseInt(fonteInput.value);
    
    // Ajusta a cor de fundo e de texto
    overlayDiv.style.backgroundColor = corFundo;
    overlayDiv.style.color = corTexto;

    expandedOverlayDiv.style.backgroundColor = corFundo;
    expandedPalavrasDiv.style.color = corTexto;

    // Ajusta o tamanho da fonte
    palavrasDiv.style.fontSize = `${fonte}px`;
    expandedPalavrasDiv.style.fontSize = `${fonte}px`;
}

function expandirLeitura() {
    expandedOverlayDiv.classList.remove('hidden');
}

function fecharExpandido() {
    expandedOverlayDiv.classList.add('hidden');
}

// Eventos
playButton.addEventListener('click', iniciarLeitura);
clearButton.addEventListener('click', limparTexto);
expandButton.addEventListener('click', expandirLeitura);
expandedPlayButton.addEventListener('click', iniciarLeitura); // Adicionado botão "Ler Rápido" na expansão
collapseButton.addEventListener('click', fecharExpandido);
corFundoInput.addEventListener('change', ajustarEstilos);
corTextoInput.addEventListener('change', ajustarEstilos);
fonteInput.addEventListener('input', ajustarEstilos);

// Ajusta a página ao carregar
ajustarEstilos();
