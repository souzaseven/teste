 // Função para pular para o próximo campo apenas quando o campo atual estiver preenchido corretamente
        function verificarProximoCampo(campoAtual, proximoCampo) {
            const valor = document.getElementById(campoAtual).value;

            // Verifica se o campo está preenchido com o formato correto (HH:MM) e move para o próximo campo apenas ao sair do campo atual (onblur)
            if (valor.length === 5) {
                document.getElementById(proximoCampo).focus();
            }

            calcularHorasTrabalhadas();
        }

        // Função para calcular as horas trabalhadas e o intervalo
        function calcularHorasTrabalhadas() {
            const startTime1 = document.getElementById('start-time1').value;
            const endTime1 = document.getElementById('end-time1').value;
            const startTime2 = document.getElementById('start-time2').value;
            const endTime2 = document.getElementById('end-time2').value;

            if (!startTime1 || !endTime1) {
                document.getElementById('result').innerText = 'Insira os horários do primeiro turno.';
                return;
            }

            const start1 = new Date(`01/01/2000 ${startTime1}`);
            const end1 = new Date(`01/01/2000 ${endTime1}`);
            const diffTurno1 = (end1 - start1) / (1000 * 60); // Diferença em minutos do primeiro turno
            const horasTurno1 = Math.floor(diffTurno1 / 60);
            const minutosTurno1 = diffTurno1 % 60;

            document.getElementById('turno1-details').innerText = `Horas no primeiro turno: ${horasTurno1}h ${minutosTurno1}min`;

            let totalMinutosTrabalhados = diffTurno1;

            if (startTime2) {
                const start2 = new Date(`01/01/2000 ${startTime2}`);
                const diffIntervalo = (start2 - end1) / (1000 * 60); // Diferença em minutos do intervalo
                const horasIntervalo = Math.floor(diffIntervalo / 60);
                const minutosIntervalo = diffIntervalo % 60;

                document.getElementById('intervalo-details').innerText = `Intervalo: ${horasIntervalo}h ${minutosIntervalo}min`;

                if (endTime2) {
                    const end2 = new Date(`01/01/2000 ${endTime2}`);
                    const diffTurno2 = (end2 - start2) / (1000 * 60); // Diferença em minutos do segundo turno
                    const horasTurno2 = Math.floor(diffTurno2 / 60);
                    const minutosTurno2 = diffTurno2 % 60;

                    document.getElementById('turno2-details').innerText = `Horas no segundo turno: ${horasTurno2}h ${minutosTurno2}min`;
                    totalMinutosTrabalhados += diffTurno2;
                } else {
                    document.getElementById('turno2-details').innerText = '';
                }
            } else {
                document.getElementById('turno2-details').innerText = '';
                document.getElementById('intervalo-details').innerText = '';
            }

            // Converte o total de minutos trabalhados em horas e minutos
            const horasTrabalhadas = Math.floor(totalMinutosTrabalhados / 60);
            const minutosTrabalhadas = totalMinutosTrabalhados % 60;

            document.getElementById('result').innerText = `Total de horas trabalhadas: ${horasTrabalhadas}h ${minutosTrabalhadas}min`;

            // Verifica se há horas extras
            if (horasTrabalhadas > 8 || (horasTrabalhadas === 8 && minutosTrabalhadas > 0)) {
                const minutosExtras = (horasTrabalhadas - 8) * 60 + minutosTrabalhadas;
                const horasExtras = Math.floor(minutosExtras / 60);
                const minutosRestantes = minutosExtras % 60;

                if (minutosExtras < 60) {
                    document.getElementById('horas-extras').innerText = `Horas extras: ${minutosExtras} minutos`;
                } else {
                    document.getElementById('horas-extras').innerText = `Horas extras: ${horasExtras}h ${minutosRestantes}min`;
                }
            } else {
                document.getElementById('horas-extras').innerText = '';
            }
        }

        // Função para limpar os campos
        function limparCampos() {
            document.getElementById('start-time1').value = '';
            document.getElementById('end-time1').value = '';
            document.getElementById('start-time2').value = '';
            document.getElementById('end-time2').value = '';
            document.getElementById('result').innerText = 'Total de horas trabalhadas: 0h 0min';
            document.getElementById('turno1-details').innerText = '';
            document.getElementById('intervalo-details').innerText = '';
            document.getElementById('turno2-details').innerText = '';
            document.getElementById('horas-extras').innerText = '';
        }