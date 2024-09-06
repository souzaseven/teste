document.getElementById('imageInput').addEventListener('change', function() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];
    if (!file) {
        alert('Por favor, selecione uma imagem.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            
            // Configura o canvas para o tamanho desejado do ícone
            canvas.width = 64;
            canvas.height = 64;
            
            // Desenha a imagem no canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Obtém a imagem em formato PNG
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                
                // Atualiza a prévia do ícone
                const previewImage = document.getElementById('previewImage');
                previewImage.src = url;
                previewImage.style.display = 'inline';
                
                // Atualiza o link para download
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = url;
                downloadLink.style.display = 'inline';
            }, 'image/png');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});