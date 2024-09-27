  function flip() {
            const originalText = document.getElementById('original').value;
            const flippedText = originalText.split('').reverse().join('');
            document.getElementById('flipped').value = flippedText;
        }

        function limpar() {
            document.getElementById('original').value = '';
            document.getElementById('flipped').value = '';
        }

        function copiarResultado() {
            const resultado = document.getElementById('flipped');
            resultado.select();
            document.execCommand('copy');
            alert('Texto copiado para a área de transferência!');
        }