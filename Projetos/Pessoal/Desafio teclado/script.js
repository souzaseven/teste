const texts = [
    "O sol estava brilhando intensamente.",
    "A casa era branca com janelas azuis.",
    "O vento soprava suavemente na praia.",
    "Ela leu o livro em uma tarde chuvosa.",
    "O gato dormia em cima do sofá.",
    "Eles jogaram futebol no parque.",
    "A noite estava estrelada e clara.",
    "Ele escreveu uma carta para sua amiga.",
    "A criança desenhou um sol amarelo.",
    "A montanha era alta e imponente."
];

let currentText = "";
let timer;
let timeLeft = 30;
let hasFinished = false;

function startChallenge() {
    // Escolhe um texto aleatório
    currentText = texts[Math.floor(Math.random() * texts.length)];
    document.getElementById("random-text").textContent = currentText;

    // Habilita a área de texto
    document.getElementById("user-input").disabled = false;
    document.getElementById("user-input").value = "";
    document.getElementById("user-input").focus();

    // Remove o botão "Iniciar Desafio"
    const startButton = document.getElementById("start-button");
    if (startButton) {
        startButton.style.display = "none"; // Esconde o botão após o início do desafio
    }

    // Reseta o tempo, mensagem e estado
    timeLeft = 30;
    hasFinished = false;
    document.getElementById("timer").textContent = `Tempo restante: ${timeLeft}s`;
    document.getElementById("result-message").textContent = "Resultado será mostrado aqui em tempo real.";
    document.getElementById("result-options").innerHTML = "";

    // Inicia o temporizador
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer").textContent = `Tempo restante: ${timeLeft}s`;
    } else {
        clearInterval(timer);
        document.getElementById("timer").textContent = "Tempo esgotado!";
        document.getElementById("user-input").disabled = true;
        checkFinalResult(); // Verifica o resultado final quando o tempo termina
    }
}

function checkTyping() {
    const userInput = document.getElementById("user-input").value;
    const resultMessage = document.getElementById("result-message");

    if (currentText.startsWith(userInput)) {
        resultMessage.textContent = "Você está indo bem!";
        resultMessage.classList.remove("incorrect");
        resultMessage.classList.add("correct");

        if (userInput === currentText && !hasFinished) {
            hasFinished = true;
            clearInterval(timer);
            document.getElementById("user-input").disabled = true;

            const timeSaved = 30 - timeLeft;
            resultMessage.textContent = `Parabéns! Você terminou ${timeSaved} segundos antes do tempo!`;
            resultMessage.classList.add("correct");
            showResultOptions();
        }
    } else {
        resultMessage.textContent = "Você cometeu um erro.";
        resultMessage.classList.remove("correct");
        resultMessage.classList.add("incorrect");
    }
}

function checkFinalResult() {
    const userInput = document.getElementById("user-input").value.trim();
    const resultMessage = document.getElementById("result-message");

    if (userInput === currentText) {
        resultMessage.textContent = "Parabéns! Você digitou o texto corretamente!";
        resultMessage.classList.add("correct");
    } else {
        resultMessage.textContent = "Ops! O texto não correspondeu. Tente novamente!";
        resultMessage.classList.add("incorrect");
    }
    showResultOptions();
}

function showResultOptions() {
    const resultOptions = document.getElementById("result-options");
    resultOptions.innerHTML = `
        <button onclick="trySameText()">Tentar novamente</button>
        <button onclick="startChallenge()">Próxima</button>
        <button onclick="exitToHome()">Sair</button>
    `;
}

function trySameText() {
    document.getElementById("user-input").value = "";
    document.getElementById("user-input").disabled = false;
    document.getElementById("user-input").focus();
    hasFinished = false;
    timeLeft = 30;
    document.getElementById("timer").textContent = `Tempo restante: ${timeLeft}s`;
    document.getElementById("result-message").textContent = "Resultado será mostrado aqui em tempo real.";
    timer = setInterval(updateTimer, 1000);
}

function exitToHome() {
    window.location.reload();
}
