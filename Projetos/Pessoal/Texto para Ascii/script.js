  const textInput = document.getElementById('textInput');
        const output = document.getElementById('output');
        const clearButton = document.getElementById('clearButton');

        textInput.addEventListener('input', () => {
            const inputValue = textInput.value;

            if (inputValue) {
                const asciiCodes = Array.from(inputValue)
                    .map(char => `${char}: ${char.charCodeAt(0)}`)
                    .join('\n');
                output.textContent = asciiCodes;
                clearButton.style.display = 'inline-block'; // Mostra o botão de limpar quando há conteúdo
            } else {
                output.textContent = ''; // Limpa a área de saída quando o campo está vazio
                clearButton.style.display = 'none'; // Esconde o botão de limpar se não houver conteúdo
            }
        });

        clearButton.addEventListener('click', () => {
            textInput.value = '';
            output.textContent = '';
            clearButton.style.display = 'none'; // Esconde o botão de limpar
        });