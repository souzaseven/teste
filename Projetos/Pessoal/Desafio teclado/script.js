   const texts = {
        simple: [
            "O gato dormia no sofá.",
            "A casa é azul.",
            "A noite está estrelada.",
            "O carro vermelho passou.",
            "A criança riu alto.",
            "Ele jogou a bola.",
            "A água está gelada.",
            "O sol está brilhante.",
            "O cachorro correu.",
            "Ela leu um livro."
        ],
        medium: [
            "O vento soprava suavemente nas árvores altas.",
            "O gato brincava com a bola de lã no tapete.",
            "O pôr do sol pintou o céu de laranja e rosa.",
            "As folhas caíam lentamente das árvores no outono.",
            "Ela escreveu uma carta longa para seu amigo distante.",
            "Os alunos estudavam para a prova de matemática.",
            "O café estava quente e tinha um aroma delicioso.",
            "Ele correu pela rua para não perder o ônibus.",
            "As crianças brincavam de esconde-esconde no quintal.",
            "O pássaro cantava alegremente na janela."
        ],
        hard: [
            "Enquanto o vento soprava fortemente, as janelas rangiam.",
            "A complexidade dos cálculos envolvia conceitos abstratos.",
            "Ele descreveu com precisão a teoria da relatividade.",
            "As estradas sinuosas e cheias de curvas exigiam atenção constante.",
            "O livro de ciências avançadas exigia concentração total.",
            "Ela apresentou uma tese inovadora sobre física quântica.",
            "Os ingredientes da receita eram difíceis de encontrar no mercado.",
            "A análise crítica do poema envolvia várias interpretações complexas.",
            "A conferência sobre inteligência artificial atraiu especialistas de várias áreas.",
            "As mudanças climáticas foram discutidas em um nível altamente técnico."
        ]
    };

    let currentText = "";
    let timer;
    let timeLeft = 30;
    let hasFinished = false;
    let errorCount = 0; // Inicializa o contador de erros

    function startChallenge() {
        // Obtém o nível de dificuldade selecionado
        const difficulty = document.getElementById("difficulty-select").value;

        // Escolhe um texto aleatório baseado no nível de dificuldade
        currentText = texts[difficulty][Math.floor(Math.random() * texts[difficulty].length)];
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

        // Reseta o tempo, contador de erros, mensagem e estado
        timeLeft = 30;
        errorCount = 0;
        hasFinished = false;
        document.getElementById("timer").textContent = `Tempo restante: ${timeLeft}s`;
        document.getElementById("result-message").textContent = "Resultado será mostrado aqui em tempo real.";
        document.getElementById("error-count").textContent = "Erros cometidos: 0";
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

            // Incrementa o contador de erros
            errorCount++;
            document.getElementById("error-count").textContent = `Erros cometidos: ${errorCount}`;
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
            <button class="btn btn-success" onclick="trySameText()"><i class="fas fa-redo"></i> Tentar novamente</button>
            <button class="btn btn-primary" onclick="startChallenge()"><i class="fas fa-forward"></i> Próxima</button>
            <button class="btn btn-danger" onclick="exitToHome()"><i class="fas fa-home"></i> Sair</button>
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
        document.getElementById("error-count").textContent = "Erros cometidos: 0"; // Reseta os erros
        errorCount = 0;
        timer = setInterval(updateTimer, 1000);
    }

    function exitToHome() {
        window.location.reload();
    }

    // Monitoramento da digitação
    document.getElementById('user-input').addEventListener('input', checkTyping);