 function calcularIntervalo() {
            // Obtém as datas inseridas
            const dataInicial = new Date(document.getElementById("data-inicial").value);
            const dataFinal = new Date(document.getElementById("data-final").value);
            const limparBtn = document.getElementById("limpar-btn");

            // Verifica se ambas as datas são válidas
            if (isNaN(dataInicial) || isNaN(dataFinal)) {
                document.getElementById("resultado").innerText = "Por favor, insira datas válidas.";
                document.getElementById("resultado").classList.add("show");
                limparBtn.classList.add("hidden");
                return;
            }

            // Calcula a diferença em milissegundos entre as datas
            const diferencaEmMilissegundos = dataFinal - dataInicial;

            // Converte a diferença de milissegundos para dias
            const diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

            // Exibe o resultado
            if (diferencaEmDias >= 0) {
                document.getElementById("resultado").innerText = `A diferença é de ${diferencaEmDias} dia(s).`;
            } else {
                document.getElementById("resultado").innerText = "A data final deve ser posterior à data inicial.";
            }

            // Exibe o resultado com efeito de transição
            document.getElementById("resultado").classList.add("show");

            // Exibe o botão de limpar se as datas forem válidas
            if (document.getElementById("data-inicial").value && document.getElementById("data-final").value) {
                limparBtn.classList.remove("hidden");
            }
        }

        function limparConteudo() {
            // Limpa os campos de data e o resultado
            document.getElementById("data-inicial").value = '';
            document.getElementById("data-final").value = '';
            document.getElementById("resultado").innerText = '';
            document.getElementById("resultado").classList.remove("show");

            // Esconde o botão de limpar
            document.getElementById("limpar-btn").classList.add("hidden");
        }