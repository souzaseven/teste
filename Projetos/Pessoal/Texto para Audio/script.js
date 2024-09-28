   const voiceSelect = document.getElementById('voiceSelect');
        const textInput = document.getElementById('textInput');
        const outputText = document.getElementById('outputText');
        const clearButton = document.getElementById('clearButton');
        let voices = [];

        function populateVoiceList() {
            voices = window.speechSynthesis.getVoices();
            voiceSelect.innerHTML = '';

            voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;

                if (voice.default) {
                    option.textContent += ' [default]';
                }

                option.setAttribute('data-lang', voice.lang);
                option.setAttribute('data-name', voice.name);
                voiceSelect.appendChild(option);
            });
        }

        populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }

        document.getElementById('playButton').addEventListener('click', () => {
            const text = textInput.value;

            if (text) {
                outputText.innerHTML = text; // Exibe o texto na área de saída
                const speech = new SpeechSynthesisUtterance(text);
                const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
                speech.voice = voices.find(voice => voice.name === selectedVoice);

                speech.lang = 'pt-BR'; // Definindo o idioma para Português do Brasil

                // Destaca as palavras conforme são faladas
                let wordIndex = 0;
                const words = text.split(' ');

                speech.onboundary = (event) => {
                    if (event.name === 'word') {
                        wordIndex = event.charIndex;
                        const before = text.slice(0, wordIndex);
                        const word = text.slice(wordIndex, event.charIndex + event.charLength);
                        const after = text.slice(event.charIndex + event.charLength);

                        outputText.innerHTML = `${before}<span style="background-color: yellow;">${word}</span>${after}`;
                    }
                };

                window.speechSynthesis.speak(speech);
            } else {
                alert('Por favor, digite algum texto antes de ouvir.');
            }
        });

        // Limpa o conteúdo do texto e da área de saída
        clearButton.addEventListener('click', () => {
            textInput.value = '';
            outputText.textContent = '';
        });