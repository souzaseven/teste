     document.getElementById('image-upload').addEventListener('change', handleImageUpload);

        let originalImageURL = '';
        let newImageURL = '';

        async function handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                document.getElementById('image-container').style.display = 'flex';
                document.getElementById('download-section').style.display = 'flex';

                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('original-image').src = e.target.result;
                    originalImageURL = e.target.result;
                };
                reader.readAsDataURL(file);

                const formData = new FormData();
                formData.append('image_file', file);

                try {
                    const apiKey = 'dJsGS6fMFpQ7pTszt4SbfEfC';  // Verifique a chave de API correta
//https://www.remove.bg/tools-api/api-commandline
                    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                        method: 'POST',
                        headers: {
                            'X-Api-Key': apiKey
                        },
                        body: formData
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('Erro na API:', errorText);
                        alert('Falha ao remover o fundo. Detalhes: ' + errorText);
                        return;
                    }

                    const blob = await response.blob();
                    const newImageURLObject = URL.createObjectURL(blob);
                    document.getElementById('new-image').src = newImageURLObject;
                    newImageURL = newImageURLObject;
                } catch (error) {
                    console.error('Erro de rede:', error);
                    alert('Erro ao conectar à API. Detalhes: ' + error.message);
                }
            }
        }

        document.getElementById('download-original').addEventListener('click', () => {
            downloadImage(originalImageURL, 'imagem-original.png');
        });

        document.getElementById('download-new').addEventListener('click', () => {
            downloadImage(newImageURL, 'imagem-fundo-removido.png');
        });

        function downloadImage(url, filename) {
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }