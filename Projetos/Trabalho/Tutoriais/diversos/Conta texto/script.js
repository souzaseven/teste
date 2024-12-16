 // Função que conta palavras, caracteres, etc.
        function contarPalavrasECaracteres() {
            const texto = document.getElementById('texto').value;

            const palavras = texto.trim().split(/\s+/).filter(Boolean);
            const numeroDePalavras = palavras.length;
            const numeroDeCaracteres = texto.length;
            const numeroDeEspacos = (texto.match(/\s/g) || []).length;
            const numeroDeParágrafos = texto.split(/\n+/).filter(Boolean).length;
            const numeroDeLinhas = texto.split(/\n/).length;
            const palavrasUnicas = [...new Set(palavras)].length;
            const numeroDeFrases = texto.split(/[.!?]+/).filter(Boolean).length;
            const quantidadeDeNumeros = (texto.match(/\d/g) || []).length;
            const tempoDeLeitura = Math.ceil(numeroDePalavras / 200);
            const tempoDeFala = Math.ceil(numeroDePalavras / 150);

            document.getElementById('resultado').innerHTML = `
                <div class="result-block">Número de palavras: ${numeroDePalavras}</div>
                <div class="result-block">Número de caracteres: ${numeroDeCaracteres}</div>
                <div class="result-block">Número de espaços: ${numeroDeEspacos}</div>
                <div class="result-block">Número de parágrafos: ${numeroDeParágrafos}</div>
                <div class="result-block">Número de linhas: ${numeroDeLinhas}</div>
                <div class="result-block">Número de palavras únicas: ${palavrasUnicas}</div>
                <div class="result-block">Número de frases: ${numeroDeFrases}</div>
                <div class="result-block">Quantidade de números: ${quantidadeDeNumeros}</div>
                <div class="result-block">Tempo de leitura: ${tempoDeLeitura} minutos</div>
                <div class="result-block">Tempo de fala: ${tempoDeFala} minutos</div>
            `;
        }

        // Função para copiar o texto
        function copiarTexto() {
            const textarea = document.getElementById('texto');
            textarea.select();
            document.execCommand('copy');
            alert('Texto copiado para a área de transferência!');
        }

        // Função para limpar o texto
        function limparTexto() {
            const textarea = document.getElementById('texto');
            textarea.value = '';
            contarPalavrasECaracteres();
        }

        // Eventos
        document.getElementById('copiar').addEventListener('click', copiarTexto);
        document.getElementById('limpar').addEventListener('click', limparTexto);
        document.getElementById('texto').addEventListener('input', contarPalavrasECaracteres);