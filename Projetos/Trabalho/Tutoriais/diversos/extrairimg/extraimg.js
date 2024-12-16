 const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const chat = document.getElementById('chat');

        // Abrir seletor de arquivos ao clicar na área de upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Lidar com a seleção de arquivos
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image')) {
                displayImage(file);
            }
        });

        // Lidar com evento de colar imagem
        document.addEventListener('paste', (event) => {
            const items = event.clipboardData.items;
            for (let item of items) {
                if (item.type.startsWith('image')) {
                    const file = item.getAsFile();
                    displayImage(file);
                }
            }
        });

        // Lidar com arrastar e soltar
        uploadArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            uploadArea.classList.add('hover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('hover');
        });

        uploadArea.addEventListener('drop', (event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (file && file.type.startsWith('image')) {
                displayImage(file);
            }
        });

        // Exibir imagem e extrair texto
        function displayImage(file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.innerHTML = `
                    <img src="${imageUrl}" alt="Imagem Enviada">
                    <p>Extraindo texto...</p>
                    <button class="copy-btn">Copiar Texto</button>
                `;
                chat.appendChild(messageDiv);
                extractTextFromImage(imageUrl, messageDiv);
            };
            reader.readAsDataURL(file);
        }

        // Extrair texto da imagem usando Tesseract.js
        function extractTextFromImage(imageUrl, messageDiv) {
            const textParagraph = messageDiv.querySelector('p');
            textParagraph.textContent = "Extraindo texto...";

            Tesseract.recognize(
                imageUrl, // URL da imagem
                'por',    // Idioma (Português)
                {
                    logger: info => {
                        console.log(info); // Opcional: Exibe progresso no console
                    }
                }
            ).then(({ data: { text } }) => {
                // Exibir texto extraído
                textParagraph.textContent = text;

                // Configurar botão de cópia
                const copyBtn = messageDiv.querySelector('.copy-btn');
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(text).then(() => {
                        alert('Texto copiado!');
                    });
                });
            }).catch(error => {
                console.error(error);
                textParagraph.textContent = "Erro ao extrair texto.";
            });
        }