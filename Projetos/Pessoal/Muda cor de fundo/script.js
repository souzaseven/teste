document.getElementById('image-upload').addEventListener('change', handleImageUpload);
document.getElementById('color-picker').addEventListener('input', applyBackground);
document.getElementById('background-upload').addEventListener('change', handleBackgroundUpload);

let originalImageURL = '';
let newImageURL = '';
let customImageURL = '';

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('image-container').style.display = 'flex';
        document.getElementById('background-options').style.display = 'block';

        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('original-image').src = e.target.result;
            originalImageURL = e.target.result;
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('image_file', file);

        try {
            const apiKey = 'dJsGS6fMFpQ7pTszt4SbfEfC';  // Chave API
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': apiKey
                },
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert('Falha ao remover o fundo. Detalhes: ' + errorText);
                return;
            }

            const blob = await response.blob();
            const newImageURLObject = URL.createObjectURL(blob);
            document.getElementById('new-image').src = newImageURLObject;
            newImageURL = newImageURLObject;
        } catch (error) {
            alert('Erro ao conectar à API. Detalhes: ' + error.message);
        }
    }
}

function applyBackground() {
    const color = document.getElementById('color-picker').value;
    const img = new Image();
    img.src = newImageURL;

    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        customImageURL = canvas.toDataURL('image/png');
        document.getElementById('custom-image').src = customImageURL;
        document.getElementById('custom-image-preview').style.display = 'block';
    };
}

function handleBackgroundUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const backgroundImg = new Image();
            backgroundImg.src = e.target.result;

            backgroundImg.onload = function () {
                const img = new Image();
                img.src = newImageURL;

                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');

                    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);

                    customImageURL = canvas.toDataURL('image/png');
                    document.getElementById('custom-image').src = customImageURL;
                    document.getElementById('custom-image-preview').style.display = 'block';
                };
            };
        };
        reader.readAsDataURL(file);
    }
}

// Função para ampliar a imagem
function enlargeImage(img) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    modal.style.display = 'block';
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
}

// Funções de download
document.getElementById('download-original').addEventListener('click', () => {
    downloadImage(originalImageURL, 'imagem-original.png');
});

document.getElementById('download-new').addEventListener('click', () => {
    downloadImage(newImageURL, 'imagem-fundo-removido.png');
});

document.getElementById('download-custom').addEventListener('click', () => {
    downloadImage(customImageURL, 'imagem-novo-fundo.png');
});

function downloadImage(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}