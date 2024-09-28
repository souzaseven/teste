 // Função para calcular o salário baseado no valor mensal informado
        function calcularSalario() {
            const salarioMensal = parseFloat(document.getElementById("salario").value); // Obtém o valor do salário mensal

            // Elementos de exibição de resultados e botão de limpar
            const resultContainer = document.getElementById("result-container");
            const resultadoTitle = document.getElementById("resultado-title");
            const limparBtn = document.getElementById("limpar-btn");

            // Caso o valor seja inválido ou zero, esconde os resultados e o botão
            if (isNaN(salarioMensal) || salarioMensal <= 0) {
                resultContainer.style.display = 'none'; // Esconde o contêiner de resultados
                resultadoTitle.style.display = 'none'; // Esconde o título de "Resultado"
                limparBtn.style.display = 'none'; // Esconde o botão "Limpar"
                return; // Finaliza a função
            }

            // Definindo constantes para cálculos
            const diasPorMes = 30;
            const diasPorSemana = 7;
            const semanasPorMes = 4.33; // Número aproximado de semanas por mês
            const horasPorDia = 8;
            const minutosPorHora = 60;

            // Calculando os valores baseados no salário mensal
            const salarioDiario = salarioMensal / diasPorMes;
            const salarioSemanal = salarioMensal / semanasPorMes; // Cálculo correto
            const salarioPorHora = salarioDiario / horasPorDia;
            const salarioPorMinuto = salarioPorHora / minutosPorHora;

            // Atualiza os campos de resultado com os valores calculados
            document.getElementById("mensal").innerText = `Salário Mensal: R$ ${salarioMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.getElementById("semanal").innerText = `Salário Semanal: R$ ${salarioSemanal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.getElementById("diario").innerText = `Salário Diário: R$ ${salarioDiario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.getElementById("hora").innerText = `Salário por Hora: R$ ${salarioPorHora.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.getElementById("minuto").innerText = `Salário por Minuto: R$ ${salarioPorMinuto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            // Mostra o contêiner de resultados e o botão "Limpar"
            resultContainer.style.display = 'flex';
            resultadoTitle.style.display = 'block';
            limparBtn.style.display = 'inline-flex';
        }

        // Função para limpar o conteúdo do formulário e esconder os resultados
        function limparConteudo() {
            document.getElementById("salario").value = ""; // Limpa o campo de entrada
            document.getElementById("result-container").style.display = 'none'; // Esconde o contêiner de resultados
            document.getElementById("resultado-title").style.display = 'none'; // Esconde o título de "Resultado"
            document.getElementById("limpar-btn").style.display = 'none'; // Esconde o botão "Limpar"
        }