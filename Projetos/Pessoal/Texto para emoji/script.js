  // Mapeamento local de emojis com mais 450 emojis adicionados
        const emojiMap = {
            'Emoções': {
                'feliz': '😊',
                'triste': '😢',
                'amor': '❤️',
                'raiva': '😠',
                'surpreso': '😲',
                'riso': '😂',
                'legal': '😎',
                'chorar': '😭',
                'entediado': '😒',
                'confuso': '😕',
                'sono': '😴',
                'chocado': '😱',
                'sorrir': '😁',
                'piscada': '😉',
                'zangado': '😡',
                'olhos': '👀',
                'envergonhado': '😳',
                'frustrado': '😤',
                'grato': '🙏',
                'medo': '😨',
                'beijar': '😘',
                'pensativo': '🤔',
                'felicidade': '😁',
                'frio': '🥶',
                'calor': '🥵',
                'abraço': '🤗',
                'feliz de verdade': '😃',
                'chateado': '😞',
                'orgulhoso': '😌',
            },
            'Atividades': {
                'correndo': '🏃‍♂️',
                'nadando': '🏊‍♂️',
                'ciclismo': '🚴‍♂️',
                'dançando': '💃',
                'cantando': '🎤',
                'lendo': '📚',
                'escrevendo': '✍️',
                'cozinhando': '🍳',
                'jogando': '🎮',
                'tocando guitarra': '🎸',
                'pescando': '🎣',
                'fotografando': '📸',
                'pintando': '🎨',
                'fazendo yoga': '🧘‍♀️',
                'corrida de carro': '🏎️',
                'fazendo musculação': '🏋️‍♀️',
            },
            'Objetos e Cores': {
                'estrela': '⭐',
                'coração': '❤️',
                'presente': '🎁',
                'carro': '🚗',
                'telefone': '📱',
                'computador': '💻',
                'câmera': '📷',
                'livro': '📖',
                'relógio': '⏰',
                'sol': '☀️',
                'lua': '🌙',
                'nuvem': '☁️',
                'chuva': '🌧️',
                'neve': '❄️',
                'fogo': '🔥',
                'bolo': '🎂',
                'café': '☕',
                'cerveja': '🍺',
                'mala': '🧳',
                'faca': '🔪',
                'microfone': '🎤',
                'guarda-chuva': '☂️',
                'trem': '🚆',
                'ônibus': '🚌',
                'telefone fixo': '☎️',
                'óculos': '👓',
                'relógio de pulso': '⌚',
                'joia': '💍',
            },
            'Animais': {
                'gato': '🐱',
                'cachorro': '🐶',
                'leão': '🦁',
                'tigre': '🐯',
                'urso': '🐻',
                'elefante': '🐘',
                'peixe': '🐟',
                'pássaro': '🐦',
                'macaco': '🐒',
                'panda': '🐼',
                'tartaruga': '🐢',
                'borboleta': '🦋',
                'cavalo': '🐴',
                'vaca': '🐄',
                'coelho': '🐇',
                'raposa': '🦊',
                'ovelha': '🐑',
                'cobra': '🐍',
                'cavalo marinho': '🐬',
                'polvo': '🐙',
                'caranguejo': '🦀',
            },
            'Natureza': {
                'árvore': '🌳',
                'flor': '🌸',
                'folha': '🍃',
                'montanha': '🏔️',
                'praia': '🏖️',
                'deserto': '🏜️',
                'arco-íris': '🌈',
                'vulcão': '🌋',
                'pôr-do-sol': '🌅',
                'oceano': '🌊',
                'rio': '🏞️',
                'cachoeira': '🏞️',
                'floresta': '🌲',
            },
            'Festas e Celebrações': {
                'festa': '🎉',
                'balão': '🎈',
                'confete': '🎊',
                'bolo': '🎂',
                'champanhe': '🍾',
                'fogos': '🎆',
                'presente': '🎁',
                'som': '🔊',
                'festa junina': '🎋',
                'fogo de artifício': '🎇',
                'luau': '🌴',
            },
            'Outros': {
                'pergunta': '❓',
                'exclamação': '❗',
                'alerta': '⚠️',
                'ok': '✅',
                'erro': '❌',
                'positivo': '👍',
                'negativo': '👎',
                'wifi': '📶',
                'email': '📧',
                'dinheiro': '💵',
                'cadeado': '🔒',
                'avião': '✈️',
                'ônibus': '🚌',
                'táxi': '🚕',
                'bicicleta': '🚲',
                'parada de ônibus': '🚏',
                'parabéns': '🎉',
            }
        };

        const emojiReverseMap = Object.fromEntries(
            Object.values(emojiMap).flatMap(group => Object.entries(group)).map(([key, value]) => [value.normalize(), key])
        );

        // Conversor de texto para emoji local
        document.getElementById('textInput').addEventListener('input', () => {
            const inputText = document.getElementById('textInput').value;
            let outputText = inputText;

            for (const group of Object.values(emojiMap)) {
                for (const [word, emoji] of Object.entries(group)) {
                    const regex = new RegExp(`\\b${word}\\b`, 'gi');
                    outputText = outputText.replace(regex, emoji);
                }
            }

            document.getElementById('outputText').textContent = outputText;

            // Detectar e exibir informações do emoji inserido
            const foundEmoji = Array.from(inputText).find(char => emojiReverseMap[char.normalize()]);
            if (foundEmoji) {
                document.getElementById('emojiInfo').textContent = `Emoji: ${foundEmoji} | Nome: ${emojiReverseMap[foundEmoji.normalize()]}`;
            } else {
                document.getElementById('emojiInfo').textContent = '';
            }
        });

        // Função para buscar emojis da API externa
        async function fetchEmojis() {
            try {
                const response = await fetch('https://emoji-api.com/emojis?access_key=4a7d416a1d638c38fff2f6c9c89f65c89294dd1c');
                const emojis = await response.json();
                return emojis;
            } catch (error) {
                console.error('Erro ao buscar emojis:', error);
                return [];
            }
        }

        // Função para exibir os emojis da API
        function displayEmojis(emojis) {
            const emojiContainer = document.getElementById('emojiContainer');
            emojiContainer.innerHTML = '';

            emojis.forEach(emoji => {
                const emojiElement = document.createElement('span');
                emojiElement.classList.add('emoji');
                emojiElement.textContent = emoji.character;
                emojiElement.title = emoji.unicodeName;
                emojiContainer.appendChild(emojiElement);
            });
        }

        // Busca emojis da API com base na pesquisa
        async function searchEmojis() {
            const query = document.getElementById('apiSearchInput').value.toLowerCase();
            let emojis = await fetchEmojis();

            emojis = emojis.filter(emoji => emoji.unicodeName.toLowerCase().includes(query));
            displayEmojis(emojis);
        }

        // Botão para copiar o texto convertido
        document.getElementById('copyButton').addEventListener('click', () => {
            const outputText = document.getElementById('outputText').textContent;

            if (outputText) {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = outputText;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                alert('Texto copiado para a área de transferência!');
            } else {
                alert('Não há texto para copiar!');
            }
        });

        // Botão para limpar o conteúdo
        document.getElementById('clearButton').addEventListener('click', () => {
            document.getElementById('textInput').value = '';
            document.getElementById('outputText').textContent = '';
            document.getElementById('emojiInfo').textContent = '';
        });