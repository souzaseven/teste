 // Função para escapar caracteres especiais de expressão regular
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        // Função para destacar palavras inteiras e não apenas partes
        function highlight(text, search) {
            const regex = new RegExp(`\\b(${escapeRegExp(search)})\\b`, 'gi');  // Alterado para buscar por palavras inteiras
            return text.replace(regex, '<mark>$1</mark>');
        }

        // Função para mostrar alerta
        function showAlert(message) {
            const alertBox = document.getElementById('alert');
            alertBox.textContent = message;
            alertBox.style.display = 'block';
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 3000);
        }

        // Função para localizar o texto e destacar
        function locateText() {
            const findText = document.getElementById('find').value.trim();
            const textDiv = document.getElementById('text');
            const originalText = textDiv.textContent;  // Use textContent para remover as marcações prévias

            if (!findText) {
                showAlert('Por favor, preencha o campo de localização.');
                return;
            }

            const highlightedText = highlight(originalText, findText);
            textDiv.innerHTML = highlightedText;
        }

        // Função para substituir o texto
        function replaceText() {
            const findText = document.getElementById('find').value.trim();
            const replaceText = document.getElementById('replace').value;
            const textDiv = document.getElementById('text');
            const originalText = textDiv.textContent; // Use textContent para remover as marcações prévias

            if (!findText || !replaceText) {
                showAlert('Por favor, preencha ambos os campos de localização e substituição.');
                return;
            }

            const regex = new RegExp(`\\b${escapeRegExp(findText)}\\b`, 'gi');  // Usando a busca por palavras inteiras
            const updatedText = originalText.replace(regex, replaceText);
            textDiv.textContent = updatedText;  // Atualiza com o texto substituído
        }

        // Função para limpar os campos de localizar e substituir
        function clearFindReplace() {
            document.getElementById('find').value = '';
            document.getElementById('replace').value = '';
        }

        // Função para limpar o texto inserido
        function clearText() {
            document.getElementById('text').textContent = '';
        }

        // Evento para localizar o texto enquanto é digitado
        document.getElementById('find').addEventListener('input', locateText);

        // Evento para substituir o texto
        document.getElementById('replace-btn').addEventListener('click', replaceText);

        // Evento para localizar e substituir o texto
        document.getElementById('process').addEventListener('click', function() {
            replaceText();
            locateText();
        });

        // Evento para limpar o destaque
        document.getElementById('clear-highlight').addEventListener('click', function() {
            const textDiv = document.getElementById('text');
            textDiv.textContent = textDiv.textContent; // Remove qualquer marcação <mark>
        });

        // Evento para limpar os campos de localizar e substituir
        document.getElementById('clear-find-replace').addEventListener('click', clearFindReplace);

        // Evento para limpar o texto inserido
        document.getElementById('clear-text').addEventListener('click', clearText);