const texts = [
    "O céu azul brilhava com um toque dourado enquanto o sol nascia no horizonte.",
    "A chuva batia suavemente na janela enquanto ela lia seu livro favorito.",
    "Os pássaros cantavam alegremente nas árvores, enchendo o ar com sua melodia.",
    "O gato deitou-se preguiçosamente no sofá, aproveitando o calor do sol.",
    "A cidade estava agitada, mas ele encontrou paz em seu pequeno jardim.",
    "Ele subiu a colina, sentindo o vento em seu rosto e o cheiro da terra úmida.",
    "As flores desabrochavam, colorindo o campo com tons vibrantes de vermelho, amarelo e roxo.",
    "A praia estava deserta, com apenas o som das ondas quebrando suavemente na areia.",
    "A lua cheia iluminava o céu noturno, criando sombras misteriosas nas ruas silenciosas.",
    "O café quente em suas mãos era o conforto que ele precisava naquela manhã fria."
];

let currentText = "";
let timer;
let timeLeft = 30; // 30 segundos para o desafio

function startChallenge() {
    // Escolhe um texto aleatório
    currentText = texts[Math.floor(Math.random() * texts.length)];
    
    // Exibe o texto aleatório
    document.getElementById("random-text").textContent = currentText;

    // Habilita a área de texto
    document.getElementById("user-input").disabled = false;
    document.getElementById("user-input").value = "";
    document.getElementById("user-input").focus();

    // Reseta o tempo e a mensagem
    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;
    document.getElementById("result-message").textContent = "Resultado será mostrado aqui em tempo real.";

    // Inicia o temporizador
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    // Se o tempo acabar, desativa a entrada de texto
    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("user-input").disabled = true;
        checkFinalResult();
    }
}

function checkTyping() {
    const userInput = document.getElementById("user-input").value;
    const resultMessage = document.getElementById("result-message");

    if (currentText.startsWith(userInput)) {
        resultMessage.textContent = "Você está indo bem!";
        resultMessage.classList.remove("incorrect");
        resultMessage.classList.add("correct");
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
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = "Ops! O texto não correspondeu. Tente novamente!";
        resultMessage.style.color = "red";
    }
}
