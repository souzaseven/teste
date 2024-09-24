// Variável para armazenar a imagem carregada
let uploadedImage = null;

// Carregar imagem para sobrepor no QR Code
document.getElementById('imageInput').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        uploadedImage = new Image();
        uploadedImage.src = reader.result;
        uploadedImage.onload = function() {
            generateQRCode(); // Gera o QR Code após a imagem ser carregada
        };
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Função para gerar o QR Code
function generateQRCode() {
    const qrCodeContainer = document.getElementById('qrcode');
    qrCodeContainer.innerHTML = ''; // Limpa o QR Code anterior
    const text = document.getElementById('text').value;

    if (text) {
        const qr = qrcode(0, 'L'); // Nível de correção de erro baixo
        qr.addData(text);
        qr.make();
        qrCodeContainer.innerHTML = qr.createImgTag(6); // Gera e exibe o QR Code

        // Adiciona a imagem sobreposta, se carregada
        if (uploadedImage) {
            const overlayImage = document.createElement('img');
            overlayImage.src = uploadedImage.src;
            overlayImage.className = 'overlay';
            qrCodeContainer.appendChild(overlayImage);
        }

        // Remove e adiciona novamente o título "Seu QR Code"
        document.querySelector('.qr-title')?.remove();
        const qrTitle = document.createElement('div');
        qrTitle.className = 'qr-title';
        qrTitle.innerText = 'Seu QR Code:';
        qrCodeContainer.insertAdjacentElement('beforebegin', qrTitle);
    }
}

// Função para copiar o QR Code
function copyQRCode() {
    const qrCodeContainer = document.getElementById('qrcode').querySelector('img:not(.overlay)');
    if (qrCodeContainer) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            if (uploadedImage) {
                context.drawImage(uploadedImage, (canvas.width - 40) / 2, (canvas.height - 40) / 2, 40, 40);
            }
            canvas.toBlob(function(blob) {
                const item = new ClipboardItem({'image/png': blob});
                navigator.clipboard.write([item]).then(function() {
                    alert('QR Code copiado para a área de transferência.');
                }).catch(function(error) {
                    alert('Falha ao copiar o QR Code.');
                    console.error('Erro ao copiar o QR Code:', error);
                });
            });
        };
        img.src = qrCodeContainer.src;
    } else {
        alert('Por favor, gere um QR Code primeiro.');
    }
}

// Função para compartilhar o QR Code
function shareQRCode() {
    const qrCodeContainer = document.getElementById('qrcode').querySelector('img:not(.overlay)');
    if (qrCodeContainer) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            if (uploadedImage) {
                context.drawImage(uploadedImage, (canvas.width - 40) / 2, (canvas.height - 40) / 2, 40, 40);
            }
            canvas.toBlob(function(blob) {
                const file = new File([blob], 'qrcode.png', {type: 'image/png'});
                if (navigator.share) {
                    navigator.share({
                        files: [file],
                        title: 'Meu QR Code',
                        text: 'Confira este QR Code!'
                    }).then(() => {
                        console.log('QR Code compartilhado com sucesso.');
                    }).catch((error) => {
                        console.error('Erro ao compartilhar o QR Code:', error);
                    });
                } else {
                    alert('Compartilhamento não suportado no seu navegador.');
                }
            });
        };
        img.src = qrCodeContainer.src;
    } else {
        alert('Por favor, gere um QR Code primeiro.');
    }
}

// Função para imprimir o QR Code
function printQRCode() {
    const qrCodeContainer = document.getElementById('qrcode').querySelector('img:not(.overlay)');
    if (qrCodeContainer) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Imprimir QR Code</title><style>body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }</style></head><body>');
        printWindow.document.write('<div style="position: relative; display: flex; justify-content: center; align-items: center;">');
        printWindow.document.write('<img src="' + qrCodeContainer.src + '">');
        if (uploadedImage) {
            printWindow.document.write('<img src="' + uploadedImage.src + '" style="position: absolute; width: 40px; height: 40px; opacity: 0.8;">');
        }
        printWindow.document.write('</div></body></html>');
        printWindow.document.close();
        printWindow.print();
    } else {
        alert('Por favor, gere um QR Code primeiro.');
    }
}
