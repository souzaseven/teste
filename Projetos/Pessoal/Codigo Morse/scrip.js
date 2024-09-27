  const morseCode = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
            'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
            'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
            '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': ' '
        };

        const morseToText = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));

        function encode() {
            const text = document.getElementById('texto').value.toUpperCase();
            let morse = '';

            for (let char of text) {
                if (morseCode[char]) {
                    morse += morseCode[char] + ' ';
                }
            }

            document.getElementById('morse').value = morse.trim();
        }

        function decode() {
            const morse = document.getElementById('morse').value;
            let text = '';

            morse.split(' ').forEach(code => {
                if (morseToText[code]) {
                    text += morseToText[code];
                } else {
                    text += '?'; // símbolo para código desconhecido
                }
            });

            document.getElementById('texto').value = text;
        }

        document.getElementById('texto').addEventListener('input', encode);
        document.getElementById('morse').addEventListener('input', decode);

        document.getElementById('copyText').addEventListener('click', function() {
            const textArea = document.getElementById('texto');
            textArea.select();
            document.execCommand('copy');
            alert('Texto copiado!');
        });

        document.getElementById('copyMorse').addEventListener('click', function() {
            const morseArea = document.getElementById('morse');
            morseArea.select();
            document.execCommand('copy');
            alert('Código Morse copiado!');
        });

        document.getElementById('clearText').addEventListener('click', function() {
            document.getElementById('texto').value = '';
            document.getElementById('morse').value = '';
        });

        document.getElementById('playSound').addEventListener('click', function() {
            const morse = document.getElementById('morse').value;
            playSound(morse);
        });

        document.getElementById('downloadSound').addEventListener('click', function() {
            const morse = document.getElementById('morse').value;
            const soundBlob = createSoundBlob(morse);
            const url = URL.createObjectURL(soundBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'codigo_morse.wav'; // Mudando para WAV
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });



        function createSoundBlob(morse) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
            const data = buffer.getChannelData(0);
            let offset = 0;

            morse.split(' ').forEach(code => {
                const duration = code === '.' ? 0.2 : 0.5; // Duração do ponto e do traço
                for (let i = 0; i < audioContext.sampleRate * duration; i++) {
                    data[offset++] = Math.sin(2 * Math.PI * (440) * (i / audioContext.sampleRate)); // Frequência de 440Hz
                }
                data[offset++] = 0; // Silêncio entre os sons
            });

            const wavBlob = new Blob([buffer], { type: 'audio/wav' });
            return wavBlob;
        }