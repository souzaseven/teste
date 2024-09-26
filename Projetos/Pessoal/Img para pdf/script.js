document.getElementById('imageInput').addEventListener('change', handleImageUpload);
document.getElementById('generatePDF').addEventListener('click', generatePDF);
document.getElementById('previewPDF').addEventListener('click', previewPDF);
document.getElementById('downloadPDF').addEventListener('click', downloadPDF);
document.getElementById('clearStorage').addEventListener('click', clearLocalStorage);
document.getElementById('closeModal').addEventListener('click', closeModal);

let imageArray = [];
let pdfBlob = null;

// Carrega imagens armazenadas localmente, se houver
window.onload = function() {
    const storedImages = localStorage.getItem('images');
    if (storedImages) {
        imageArray = JSON.parse(storedImages);
        updateThumbnails();
        toggleClearButton(true);
    }
}

// Função para lidar com o upload de imagens
function handleImageUpload(event) {
    const files = event.target.files;
    const thumbnailContainer = document.getElementById('thumbnailPreview');
    thumbnailContainer.innerHTML = ''; // Limpa a pré-visualização anterior
    imageArray = []; // Limpa o array de imagens

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.dataset.index = index; // Guarda o índice da imagem
            img.draggable = true; // Habilita arrastar

            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.appendChild(img);

            // Seletor de posição para escolher a ordem da imagem
            const selectPosition = document.createElement('select');
            selectPosition.className = 'select-position';
            selectPosition.dataset.index = index;
            selectPosition.innerHTML = generatePositionOptions(files.length);
            selectPosition.value = index + 1; // Define a posição automaticamente
            selectPosition.addEventListener('change', handlePositionChange);

            wrapper.appendChild(selectPosition);
            thumbnailContainer.appendChild(wrapper);

            imageArray.push(img.src); // Armazena as imagens no array
        };

        reader.readAsDataURL(file);
    });

    document.getElementById('generatePDF').style.display = 'inline';
    toggleClearButton(true);
    localStorage.setItem('images', JSON.stringify(imageArray));
}

// Função para gerar as opções de posição
function generatePositionOptions(length) {
    let options = '';
    for (let i = 1; i <= length; i++) {
        options += `<option value="${i}">Posição ${i}</option>`;
    }
    return options;
}

// Função para manipular a mudança de posição
function handlePositionChange(event) {
    const movedImage = imageArray.splice(event.target.dataset.index, 1)[0];
    const selectedPosition = event.target.value - 1;
    imageArray.splice(selectedPosition, 0, movedImage);

    updateThumbnails();
    localStorage.setItem('images', JSON.stringify(imageArray));
}

// Atualiza a visualização das imagens após movimentação
function updateThumbnails() {
    const thumbnailContainer = document.getElementById('thumbnailPreview');
    thumbnailContainer.innerHTML = '';

    imageArray.forEach((src, index) => {
        const img = new Image();
        img.src = src;

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.appendChild(img);

        const selectPosition = document.createElement('select');
        selectPosition.className = 'select-position';
        selectPosition.dataset.index = index;
        selectPosition.innerHTML = generatePositionOptions(imageArray.length);
        selectPosition.value = index + 1;
        selectPosition.addEventListener('change', handlePositionChange);

        wrapper.appendChild(selectPosition);
        thumbnailContainer.appendChild(wrapper);
    });
}

// Função para gerar o PDF a partir das imagens
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth() - 20;
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 10;
    let imgCount = 0;

    imageArray.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        const ratio = img.width / img.height;
        const imgHeight = imgWidth / ratio;

        if (imgCount === 2) {
            pdf.addPage();
            yPosition = 10;
            imgCount = 0;
        }

        pdf.addImage(img.src, 'JPEG', 10, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 10;
        imgCount++;
    });

    pdfBlob = pdf.output('blob');
    document.getElementById('previewPDF').style.display = 'inline';
    document.getElementById('downloadPDF').style.display = 'inline';
}

// Função para pré-visualizar o PDF
function previewPDF() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfPreview');
    iframe.src = URL.createObjectURL(pdfBlob);
    modal.style.display = 'flex';
}

// Função para download do PDF
function downloadPDF() {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'Imagens.pdf';
    link.click();
}

// Função para limpar localStorage e as imagens
function clearLocalStorage() {
    localStorage.removeItem('images');
    imageArray = [];
    updateThumbnails();
    document.getElementById('generatePDF').style.display = 'none';
    document.getElementById('previewPDF').style.display = 'none';
    document.getElementById('downloadPDF').style.display = 'none';
    toggleClearButton(false);
}

// Função para exibir ou ocultar o botão de limpar
function toggleClearButton(show) {
    const clearButton = document.getElementById('clearStorage');
    if (show) {
        clearButton.style.display = 'inline';
    } else {
        clearButton.style.display = 'none';
    }
}

// Função para fechar o modal de pré-visualização
function closeModal() {
    const modal = document.getElementById('pdfModal');
    modal.style.display = 'none';
}
