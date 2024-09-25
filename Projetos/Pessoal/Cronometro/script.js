// Variáveis globais
let timerInterval;
let elapsedTime = 0; // Tempo decorrido em milissegundos
let isRunning = false; // Status do cronômetro

// Seleção de elementos
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsTable = document.querySelector('.laps');

// Função para atualizar a exibição do cronômetro
function updateTimerDisplay() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = elapsedTime % 1000;

    // Atualiza a tela
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(Math.floor(milliseconds / 10)).padStart(2, '0')}`;
}

// Função para iniciar o cronômetro
function startTimer() {
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay();
    }, 10);
    isRunning = true;
}

// Função para parar o cronômetro
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Função para resetar o cronômetro
function resetTimer() {
    elapsedTime = 0;
    updateTimerDisplay();
    lapsTable.innerHTML = ''; // Limpa a lista de voltas
    isRunning = false;
}

// Função para adicionar uma volta (lap)
function addLap() {
    const lapTime = timerDisplay.textContent;
    const lapElement = document.createElement('li');
    lapElement.textContent = `Volta: ${lapTime}`;
    lapsTable.appendChild(lapElement);
}

// Alternar entre iniciar/pausar o cronômetro
function toggleTimer() {
    if (isRunning) {
        stopTimer();
        startButton.textContent = 'Continuar';
    } else {
        startTimer();
        startButton.textContent = 'Parar';
    }
}

// Eventos para os botões
startButton.addEventListener('click', toggleTimer);
pauseButton.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
        startButton.textContent = 'Continuar';
    }
});
resetButton.addEventListener('click', () => {
    resetTimer();
    stopTimer();
    startButton.textContent = 'Iniciar';
});
lapButton.addEventListener('click', addLap);

// Controles por teclado
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        toggleTimer();
    } else if (event.code === 'Escape') {
        resetTimer();
        stopTimer();
        startButton.textContent = 'Iniciar';
    }
});
