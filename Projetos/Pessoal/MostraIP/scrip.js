 // Função para obter IP, localização, provedor e modelo do dispositivo
        async function fetchIPAndLocation() {
            const ipElement = document.getElementById('ip');
            const ipv6Element = document.getElementById('ipv6');
            const dnsSuffixElement = document.getElementById('dnsSuffix');
            const subnetMaskElement = document.getElementById('subnetMask');
            const gatewayElement = document.getElementById('gateway');
            const ispElement = document.getElementById('isp');
            const cityElement = document.getElementById('city');
            const regionElement = document.getElementById('region');
            const countryElement = document.getElementById('country');
            const deviceElement = document.getElementById('device');

            try {
                // API para obter o IP, localização, ISP e dados geográficos
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) throw new Error("Falha ao carregar dados da API");

                const data = await response.json();

                // Exibe as informações de IP, provedor e localização
                ipElement.textContent = data.ip || 'Não disponível';
                ipv6Element.textContent = data.ipv6 || 'IPv6 não disponível';
                ispElement.textContent = data.org || 'Não disponível';
                cityElement.textContent = data.city || 'Desconhecido';
                regionElement.textContent = data.region || 'Desconhecido';
                countryElement.textContent = data.country_name || 'Desconhecido';

                // Exibe sufixo DNS, máscara de sub-rede e gateway (simulados)
                dnsSuffixElement.textContent = 'meu.sufixo.dns';
                subnetMaskElement.textContent = '255.255.255.0';
                gatewayElement.textContent = '192.168.1.1';

                // Obter o modelo do dispositivo
                const deviceInfo = getDeviceModel();
                deviceElement.textContent = deviceInfo;

                // Exibe o mapa da localização
                showMap(data.latitude, data.longitude);

            } catch (error) {
                console.error('Erro ao obter dados:', error);
                handleErrorDisplay();
            }
        }

        // Função para obter o modelo do dispositivo
        function getDeviceModel() {
            const userAgent = navigator.userAgent;
            if (/android/i.test(userAgent)) return 'Android';
            if (/iPhone/i.test(userAgent)) return 'iPhone';
            if (/iPad/i.test(userAgent)) return 'iPad';
            if (/Windows/i.test(userAgent)) return 'Windows';
            if (/Mac/i.test(userAgent)) return 'Mac';
            if (/Linux/i.test(userAgent)) return 'Linux';
            return 'Desconhecido';
        }

        // Função para exibir o mapa com a localização
        function showMap(latitude, longitude) {
            const map = L.map('map').setView([latitude, longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            // Adiciona um marcador para a localização
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup(`Você está aqui!`)
                .openPopup();
        }

        // Função para tratar exibição de erro
        function handleErrorDisplay() {
            const elements = ['ip', 'ipv6', 'isp', 'city', 'region', 'country', 'device', 'dnsSuffix', 'subnetMask', 'gateway'];
            elements.forEach(id => {
                document.getElementById(id).textContent = 'Erro ao carregar';
            });
        }

        // Chama a função ao carregar a página
        document.addEventListener('DOMContentLoaded', fetchIPAndLocation);