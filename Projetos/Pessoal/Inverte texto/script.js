  // Function to reverse the text as the user types
        function inverterTexto() {
            const origem = document.querySelector('.origem').value;
            const destino = origem.split('').reverse().join('');
            document.querySelector('.destino').value = destino;
        }

        // Function to clear both text areas
        function limparTexto() {
            document.querySelector('.origem').value = '';
            document.querySelector('.destino').value = '';
        }

        // Function to copy the reversed text to the clipboard
        function copiarTexto() {
            const destino = document.querySelector('.destino');
            destino.select();
            document.execCommand('copy');
            alert('Texto copiado!');
        }