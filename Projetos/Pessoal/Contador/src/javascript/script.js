let intervalId;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let marks = [];
let isPaused = false;

const timerEl = document.getElementById('timer');
const powerButton = document.getElementById('power');
const powerIcon = document.getElementById('power-icon');
const resetButton = document.getElementById('reset');
const markButton = document.getElementById('mark'); // Botão que agora para o cronômetro
const pauseShowButton = document.getElementById('pause-show'); // Novo botão
const marksList = document.getElementById('marks-list');

// Função para formatar o tempo
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

// Função para atualizar o cronômetro
function updateTimer() {
    if (!isPaused) {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;

        timerEl.textContent = formatTime(elapsedTime);
    }
}

// Função para iniciar o cronômetro
function startTimer() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTimer, 10);
    powerIcon.classList.remove('fa-play');
    powerIcon.classList.add('fa-pause');
    isRunning = true;
}

// Função para parar o cronômetro
function stopTimer() {
    clearInterval(intervalId);
    powerIcon.classList.remove('fa-pause');
    powerIcon.classList.add('fa-play');
    isRunning = false;
}

// Alternar entre iniciar e parar
powerButton.addEventListener('click', function() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

// Função para resetar o cronômetro
resetButton.addEventListener('click', function() {
    clearInterval(intervalId);
    elapsedTime = 0;
    timerEl.textContent = '00:00:00:00';
    powerIcon.classList.remove('fa-pause');
    powerIcon.classList.add('fa-play');
    isRunning = false;
    marks = [];
    marksList.innerHTML = '';
});

// Função para parar completamente o cronômetro
markButton.addEventListener('click', function() {
    if (isRunning) {
        stopTimer(); // Parar o cronômetro
        marks.push(elapsedTime); // Registra o tempo final
        const finalTime = formatTime(elapsedTime);
        const finalMarkItem = document.createElement('p');
        finalMarkItem.textContent = `Parado em: ${finalTime}`;
        marksList.appendChild(finalMarkItem); // Mostra o tempo final
    }
});

// Função para parar temporariamente e mostrar o tempo (com pausa de 1 milissegundo)
pauseShowButton.addEventListener('click', function() {
    if (!isPaused && isRunning) {
        isPaused = true;
        clearInterval(intervalId); // Pausa o cronômetro

        // Adiciona o tempo atual à lista de marcas
        const pausedTime = formatTime(elapsedTime);
        const pausedMarkItem = document.createElement('p');
        pausedMarkItem.textContent = `Parado em: ${pausedTime}`;
        marksList.appendChild(pausedMarkItem);

        // Retoma a contagem depois de 1 milissegundo
        setTimeout(() => {
            isPaused = false;
            intervalId = setInterval(updateTimer, 10); // Continua a contagem
        }, 1); // Pausa de 1 milissegundo
    }
});
