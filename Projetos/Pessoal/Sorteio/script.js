 document.getElementById('qtd').addEventListener('input', function() {
            const qtd = parseInt(document.getElementById('qtd').value);
            const word = document.getElementById('word');
            word.textContent = qtd === 1 ? 'nome' : 'nomes';
        });

        document.getElementById('sortear').addEventListener('click', function() {
            const qtd = parseInt(document.getElementById('qtd').value);
            const lista = document.getElementById('lista').value.trim();
            const errorDiv = document.getElementById('error');
            const resultDiv = document.getElementById('result');
            const sortearBtn = document.getElementById('sortear');
            const btnLimpar = document.getElementById('btnLimpar');

            // Limpa o erro anterior e o resultado
            errorDiv.style.display = 'none';
            resultDiv.innerHTML = '';
            resultDiv.style.display = 'none'; // Oculta o resultado antes de exibir o novo

            if (isNaN(qtd) || qtd < 1) {
                errorDiv.textContent = 'Quantidade inválida.';
                errorDiv.style.display = 'block';
                return;
            }

            const items = lista.split('\n').map(item => item.trim()).filter(item => item);

            if (items.length < qtd) {
                errorDiv.textContent = 'Número de itens é menor que a quantidade solicitada.';
                errorDiv.style.display = 'block';
                return;
            }

            // Embaralha os itens e seleciona os primeiros 'qtd' itens
            const shuffled = items.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, qtd);

            // Exibe o resultado com destaque e animação
            resultDiv.innerHTML = '<strong>Resultado:</strong><br>' + selected.map(item => `<mark>${item}</mark>`).join('<br>');
            resultDiv.style.display = 'block'; // Mostra o resultado com animação
            
            // Oculta o botão de sortear e exibe o botão de limpar
            sortearBtn.style.display = 'none';
            btnLimpar.style.display = 'block';
        });

        // Função para limpar os campos e resetar a interface
        document.getElementById('btnLimpar').addEventListener('click', function() {
            document.getElementById('lista').value = '';
            document.getElementById('result').style.display = 'none';
            document.getElementById('sortear').style.display = 'block';
            document.getElementById('btnLimpar').style.display = 'none';
            document.getElementById('error').style.display = 'none';
            document.getElementById('lista').focus();
        });

        // Foco no campo de texto ao carregar
        window.onload = function() {
            document.getElementById('lista').focus();
        };