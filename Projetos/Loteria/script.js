const logContainer = document.getElementById('log');
        const fullLogContainer = document.getElementById('fullLog');
        const logEntries = new Set();  // Armazena o histórico de entradas (números gerados)
        const fullLogEntries = [];     // Armazena todas as entradas para exibição completa

        // Evento para gerar números aleatórios
        document.getElementById('gerar').addEventListener('click', function() {
            const quantidade = parseInt(document.getElementById('numeros').value);  // Quantidade de números
            const maxValue = parseInt(document.getElementById('maxValue').value);   // Valor máximo
            const favoritos = document.getElementById('favoritos').value.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num) && num <= maxValue);
            const resultadoDiv = document.getElementById('resultado');

            // Verifica se os campos estão corretamente preenchidos
            if (isNaN(quantidade) || isNaN(maxValue) || quantidade < 1 || maxValue < 1) {
                alert("Preencha os campos corretamente!");
                return;
            }

            resultadoDiv.innerHTML = '';

            let numeros = [...new Set(favoritos)];  // Remove duplicatas dos números favoritos

            // Verifica se a quantidade de números não é maior que o valor máximo
            if (quantidade > maxValue) {
                alert("A quantidade de números a serem gerados não pode ser maior que o valor máximo permitido.");
                return;
            }

            // Gera números aleatórios até atingir a quantidade desejada
            while (numeros.length < quantidade) {
                const num = Math.floor(Math.random() * maxValue) + 1;
                if (!numeros.includes(num)) {
                    numeros.push(num);
                }
            }

            // Ordena os números e os exibe
            numeros = numeros.slice(0, quantidade);
            numeros.sort((a, b) => a - b);

            const resultStr = numeros.join(' - ');
            resultadoDiv.innerHTML = `<strong>Números Gerados:</strong><br>${resultStr}`;

            // Adiciona ao histórico se ainda não estiver presente
            if (!logEntries.has(resultStr)) {
                logEntries.add(resultStr);
                fullLogEntries.push(resultStr);
                updateLogDisplay();
            }
        });

        // Função para limpar o histórico de números gerados
        document.getElementById('limparLog').addEventListener('click', function() {
            logEntries.clear();
            fullLogEntries.length = 0;
            updateLogDisplay();
            updateFullLogDisplay();
        });

        // Função para mostrar ou esconder o histórico completo
        document.getElementById('mostrarLog').addEventListener('click', function() {
            const isFullLogVisible = fullLogContainer.style.display === 'block';
            fullLogContainer.style.display = isFullLogVisible ? 'none' : 'block';
            updateFullLogDisplay();
        });

        // Função para limpar os campos de entrada
        document.getElementById('limparConteudo').addEventListener('click', function() {
            document.getElementById('numeros').value = '';
            document.getElementById('maxValue').value = '';
            document.getElementById('favoritos').value = '';
            document.getElementById('resultado').innerHTML = '';
        });

        // Função para atualizar o histórico visualizado
        function updateLogDisplay() {
            logContainer.innerHTML = '<strong>Histórico:</strong>';
            const entriesToShow = Array.from(logEntries).slice(-10);  // Mostra os últimos 10 resultados
            entriesToShow.forEach(entry => {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-item';
                logEntry.textContent = entry;
                logContainer.appendChild(logEntry);
            });
        }

        // Função para exibir o histórico completo
        function updateFullLogDisplay() {
            fullLogContainer.innerHTML = '<strong>Histórico Completo:</strong>';
            fullLogEntries.forEach(entry => {
                const logEntry = document.createElement('div');
                logEntry.className = 'full-log-item';
                logEntry.textContent = entry;
                fullLogContainer.appendChild(logEntry);
            });
        }