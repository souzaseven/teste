 let currentYear = new Date().getFullYear(); // Obtém o ano atual
        let intervalId; // Variável para armazenar o intervalo da contagem regressiva

        // Array com informações sobre as estações
        const stations = [
            {
                name: "Primavera",
                start: new Date(currentYear, 8, 22, 15, 20), // Data de início da primavera
                image: "./primavera.png", // Imagem da estação
                description: "A primavera começa em 22 de setembro e vai até 21 de dezembro.<br>Durante essa estação, a temperatura começa a subir, os dias ficam mais longos, e as plantas florescem."
            },
            {
                name: "Verão",
                start: new Date(currentYear, 11, 21, 13, 3), // Data de início do verão
                image: "./verao.png",
                description: "O verão é a estação mais quente do ano, iniciando em 21 de dezembro e terminando em 20 de março.<br>Durante o verão, os dias são mais longos e há maior evaporação da água, o que pode causar chuvas."
            },
            {
                name: "Outono",
                start: new Date(currentYear, 2, 20, 6, 1), // Data de início do outono
                image: "./outono.png",
                description: "O outono começa em 20 de março e vai até 20 de junho.<br>É a estação em que as temperaturas começam a cair, e as árvores perdem suas folhas.<br>O primeiro dia é marcado pelo equinócio de outono, quando o dia e a noite têm a mesma duração."
            },
            {
                name: "Inverno",
                start: new Date(currentYear, 5, 21, 23, 42), // Data de início do inverno
                image: "./inverno.png",
                description: "O inverno é a estação mais fria do ano, começando em 21 de junho e indo até 22 de setembro.<br>O primeiro dia do inverno é marcado pelo solstício de inverno, o dia mais curto do ano."
            }
        ];

        // Função para formatar a data das estações
        function formatDate(station) {
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }; // Define o formato da data
            return station.start.toLocaleDateString('pt-BR', options); // Retorna a data formatada
        }

        // Função para exibir as estações na página
        function displayStations() {
            const stationDisplay = document.getElementById("station-display");
            stationDisplay.innerHTML = ""; // Limpa o conteúdo atual

            stations.forEach(station => {
                const stationDiv = document.createElement("div");
                stationDiv.classList.add("station-card"); // Cria um cartão para cada estação

                // Define o conteúdo HTML do cartão
                const stationHTML = `
                    <div class="image-container">
                        <img src="${station.image}" alt="Imagem da ${station.name}">
                    </div>
                    <div class="station">${station.name}</div>
                    <div class="date">Início: ${formatDate(station)}</div>
                `;

                stationDiv.innerHTML = stationHTML; // Insere o HTML no cartão
                stationDiv.addEventListener("click", () => showPopup(station)); // Adiciona evento de clique no cartão
                stationDisplay.appendChild(stationDiv); // Adiciona o cartão ao contêiner
            });
        }

        // Função para alterar o ano e atualizar as datas
        function changeYear(direction) {
            currentYear += direction; // Incrementa ou decrementa o ano
            stations.forEach(station => station.start.setFullYear(currentYear)); // Atualiza o ano das estações
            displayStations(); // Exibe novamente as estações
            calculateNextStation(); // Calcula a próxima estação
        }

        // Função para calcular qual é a próxima estação
        function calculateNextStation() {
            const now = new Date();
            let nextStation = stations.find(station => station.start > now) || stations[0]; // Encontra a próxima estação ou volta para a primeira
            document.getElementById('next-station-name').innerText = nextStation.name; // Atualiza o nome da próxima estação
            calculateTimeRemaining(nextStation.start); // Calcula o tempo restante para a próxima estação
        }

        // Função para calcular o tempo restante até a próxima estação
        function calculateTimeRemaining(nextStationDate) {
            if (intervalId) clearInterval(intervalId); // Limpa o intervalo anterior, se existir

            intervalId = setInterval(() => {
                const now = new Date();
                const diffInMillis = nextStationDate - now; // Calcula a diferença em milissegundos
                if (diffInMillis <= 0) {
                    clearInterval(intervalId); // Se a data já passou, limpa o intervalo
                    return;
                }

                // Calcula a diferença em meses, dias, horas, minutos e segundos
                const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
                const diffInHours = Math.floor((diffInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const diffInMinutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60));
                const diffInSeconds = Math.floor((diffInMillis % (1000 * 60)) / 1000);
                const diffInMonths = Math.floor(diffInDays / 30);

                const remainingDays = diffInDays % 30;

                // Atualiza o tempo restante na página
                document.getElementById('time-remaining').innerHTML = `
                    Faltam <span>${diffInMonths}</span> meses, <span>${remainingDays}</span> dias, 
                    <span>${diffInHours}</span> horas, 
                    <span>${diffInMinutes}</span> minutos e <span>${diffInSeconds}</span> segundos para a próxima estação.
                `;
            }, 1000); // Atualiza a cada segundo
        }

        // Função para mostrar o popup com informações sobre a estação
        function showPopup(station) {
            document.getElementById('popup-title').innerText = station.name; // Define o título do popup
            document.getElementById('popup-description').innerHTML = station.description; // Define a descrição da estação
            document.getElementById('info-popup').style.display = "flex"; // Exibe o popup
        }

        // Função para fechar o popup
        function closePopup() {
            document.getElementById('info-popup').style.display = "none"; // Esconde o popup
        }

        // Exibe as estações ao carregar a página
        displayStations();
        // Calcula a próxima estação ao carregar a página
        calculateNextStation();