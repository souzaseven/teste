 const container = document.getElementById('main-container');
        const resultadoElement = document.getElementById('resultado');
        const progressContainer = document.getElementById('progress-container');
        const progressCircle = document.getElementById('progress-circle');
        let isDarkMode = false;
        let intervalId;

        // Carrega dados salvos do LocalStorage ao abrir a página
        window.onload = function() {
            const savedData = localStorage.getItem('savedData');
            const savedDate = localStorage.getItem('birthDate');

            if (savedData && savedDate) {
                document.getElementById('data-nascimento').value = savedDate;
                resultadoElement.innerHTML = savedData;
                resultadoElement.classList.add('show');
                progressContainer.style.display = 'block';
                calcularIdade();
            }
        };

        function calcularIdade() {
            clearInterval(intervalId);
            const dataNascimento = new Date(document.getElementById('data-nascimento').value);
            const hoje = new Date();

            if (isNaN(dataNascimento) || dataNascimento > hoje) {
                resultadoElement.innerHTML = "<span class='error'>Por favor, insira uma data de nascimento válida.</span>";
                resultadoElement.classList.remove('show');
                progressContainer.style.display = 'none'; 
                return;
            }

            intervalId = setInterval(() => {
                const agora = new Date();
                const diferencaEmMilissegundos = agora - dataNascimento;
                const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
                const semanas = (diferencaEmDias / 7).toFixed(0);
                let mesesTotais = (diferencaEmDias / 30.44).toFixed(0);

                let anos = Math.floor(mesesTotais / 12);  // Adicionando cálculo de anos totais
                mesesTotais = mesesTotais % 12; // Pegando somente os meses restantes após os anos

                let meses = agora.getMonth() - dataNascimento.getMonth();
                let dias = agora.getDate() - dataNascimento.getDate();

                if (dias < 0) {
                    meses--;
                    const ultimoDiaDoMes = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
                    dias += ultimoDiaDoMes;
                }

                if (meses < 0) {
                    anos--;
                    meses += 12;
                }

                const horasTotais = diferencaEmDias * 24;
                const minutosTotais = horasTotais * 60;
                const segundosTotais = minutosTotais * 60;

                const proximoAniversario = new Date(agora.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate());
                if (agora > proximoAniversario) {
                    proximoAniversario.setFullYear(agora.getFullYear() + 1);
                }

                const ultimoAniversario = new Date(agora.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate());
                if (agora < ultimoAniversario) {
                    ultimoAniversario.setFullYear(agora.getFullYear() - 1);
                }

                const diferencaProximoAniversario = proximoAniversario - agora;
                const diasParaProximoAniversario = Math.ceil(diferencaProximoAniversario / (1000 * 60 * 60 * 24));
                const semanasProximoAniversario = (diasParaProximoAniversario / 7).toFixed(0);
                const mesesProximoAniversario = (diasParaProximoAniversario / 30.44).toFixed(1);
                const horasProximoAniversario = Math.floor((diferencaProximoAniversario / (1000 * 60 * 60)).toFixed(0));
                const minutosProximoAniversario = Math.floor((diferencaProximoAniversario / (1000 * 60)).toFixed(0));
                const segundosProximoAniversario = Math.floor((diferencaProximoAniversario / 1000).toFixed(0));

                const diferencaUltimoAniversario = agora - ultimoAniversario;
                const diasDesdeUltimoAniversario = Math.floor(diferencaUltimoAniversario / (1000 * 60 * 60 * 24));
                const semanasDesdeUltimoAniversario = Math.floor(diasDesdeUltimoAniversario / 7);
                const mesesDesdeUltimoAniversario = (diasDesdeUltimoAniversario / 30.44).toFixed(1);
                const horasDesdeUltimoAniversario = Math.floor((diferencaUltimoAniversario / (1000 * 60 * 60)).toFixed(0));
                const minutosDesdeUltimoAniversario = Math.floor((diferencaUltimoAniversario / (1000 * 60)).toFixed(0));
                const segundosDesdeUltimoAniversario = Math.floor((diferencaUltimoAniversario / 1000).toFixed(0));

                // Calcular o progresso até o próximo aniversário
                const diferencaTotalAno = proximoAniversario - ultimoAniversario;
                const progresso = (diferencaTotalAno - diferencaProximoAniversario) / diferencaTotalAno * 100;
                progressCircle.style.setProperty('--progress', progresso.toFixed(2));

                resultadoElement.innerHTML = `Você tem aproximadamente <br>
                    <span class="highlight">${diferencaEmDias.toLocaleString()}</span> dias, 
                    <span class="highlight">${semanas.toLocaleString()}</span> semanas,
                    <span class="highlight">${anos} anos e ${mesesTotais.toLocaleString()}</span> meses de vida.<br>
                    <span class="highlight">${horasTotais.toLocaleString()}</span> horas,
                    <span class="highlight">${minutosTotais.toLocaleString()}</span> minutos e 
                    <span class="highlight">${segundosTotais.toLocaleString()}</span> segundos de vida.<br><hr>
                    Seu último aniversário foi há <span class="highlight">${diasDesdeUltimoAniversario.toLocaleString()}</span> dias, 
                    <span class="highlight">${semanasDesdeUltimoAniversario.toLocaleString()}</span> semanas,
                    <span class="highlight">${mesesDesdeUltimoAniversario.toLocaleString()}</span> meses, 
                    <span class="highlight">${horasDesdeUltimoAniversario.toLocaleString()}</span> horas, 
                    <span class="highlight">${minutosDesdeUltimoAniversario.toLocaleString()}</span> minutos, 
                    <span class="highlight">${segundosDesdeUltimoAniversario.toLocaleString()}</span> segundos atrás.<br><hr>
                    Faltam <span class="highlight">${diasParaProximoAniversario.toLocaleString()}</span> dias, 
                    <span class="highlight">${semanasProximoAniversario.toLocaleString()}</span> semanas, 
                    <span class="highlight">${mesesProximoAniversario.toLocaleString()}</span> meses, 
                    <span class="highlight">${horasProximoAniversario.toLocaleString()}</span> horas, 
                    <span class="highlight">${minutosProximoAniversario.toLocaleString()}</span> minutos, 
                    <span class="highlight">${segundosProximoAniversario.toLocaleString()}</span> segundos 
                    para o seu próximo aniversário.<br>`;

                resultadoElement.classList.add('show');
                progressContainer.style.display = 'block';

                // Salvar os dados no LocalStorage
                localStorage.setItem('savedData', resultadoElement.innerHTML);
                localStorage.setItem('birthDate', document.getElementById('data-nascimento').value);
            }, 1000);
        }

        function copiarInformacoes() {
            const informacoes = resultadoElement.innerText;
            navigator.clipboard.writeText(informacoes).then(() => {
                alert('Informações copiadas para a área de transferência!');
            });
        }

        function limparInformacoes() {
            document.getElementById('data-nascimento').value = '';
            resultadoElement.innerHTML = '';
            resultadoElement.classList.remove('show');
            clearInterval(intervalId); // Para a atualização em tempo real
            progressContainer.style.display = 'none'; // Esconde o círculo de progresso ao limpar

            // Limpar dados do LocalStorage
            localStorage.removeItem('savedData');
            localStorage.removeItem('birthDate');
        }

        function toggleDarkMode() {
            isDarkMode = !isDarkMode;
            document.body.style.backgroundColor = isDarkMode ? '#1c1c1c' : '#007bff';
            container.classList.toggle('dark-mode');
        }