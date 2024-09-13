let timerInterval;
let elapsedTime = 0; // in milliseconds
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapsTable = document.querySelector('.laps');

function updateTimerDisplay() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = elapsedTime % 1000;

    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(Math.floor(milliseconds / 10)).padStart(2, '0')}`;
}

function startTimer() {
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay();
    }, 10);
    isRunning = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    elapsedTime = 0;
    updateTimerDisplay();
    lapsTable.innerHTML = '';
    isRunning = false;
}

function toggleTimer() {
    if (isRunning) {
        stopTimer();
        startButton.textContent = 'Continuar';
    } else {
        startTimer();
        startButton.textContent = 'Parar';
    }
}

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

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        toggleTimer();
    } else if (event.code === 'Escape') {
        resetTimer();
        stopTimer();
        startButton.textContent = 'Iniciar';
    }
});