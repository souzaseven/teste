document.getElementById('imageInput').addEventListener('change', handleImageUpload);
document.getElementById('generatePDF').addEventListener('click', generatePDF);
document.getElementById('previewPDF').addEventListener('click', previewPDF);
document.getElementById('downloadPDF').addEventListener('click', downloadPDF);
document.getElementById('closeModal').addEventListener('click', closeModal);

let imageArray = [];
let pdfBlob = null;
let dragSrcElement = null; // Para controle de arrastar/soltar

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
            img.addEventListener('dragstart', handleDragStart);
            img.addEventListener('dragover', handleDragOver);
            img.addEventListener('drop', handleDrop);
            img.addEventListener('dragend', handleDragEnd);

            imageArray.push(img); // Armazena as imagens no array
            thumbnailContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    });

    document.getElementById('generatePDF').style.display = 'inline';
    document.getElementById('previewPDF').style.display = 'inline';
}

// Funções de arrastar e soltar para ordenar as imagens
function handleDragStart(e) {
    dragSrcElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDrop(e) {
    e.stopPropagation();
    if (dragSrcElement !== this) {
        dragSrcElement.outerHTML = this.outerHTML;
        this.outerHTML = e.dataTransfer.getData('text/html');
        updateImageArray();
        document.getElementById('previewPDF').style.display = 'inline'; // Mostrar "Pré-visualizar PDF" após reordenar
    }
    return false;
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

// Atualiza o array de imagens após reordenação
function updateImageArray() {
    const thumbnails = document.querySelectorAll('.thumbnail-preview img');
    imageArray = Array.from(thumbnails);
}

// Função para gerar o PDF a partir das imagens
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = (pdf.internal.pageSize.getWidth() - 20) / 2; // Ajuste para 2 imagens por página
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 10;
    let xPosition = 10;

    imageArray.forEach((img, index) => {
        const imgHeight = imgWidth * (img.naturalHeight / img.naturalWidth);

        if (xPosition + imgWidth > pdf.internal.pageSize.getWidth()) {
            xPosition = 10;
            yPosition += imgHeight + 10;

            if (yPosition + imgHeight > pageHeight) {
                pdf.addPage();
                yPosition = 10;
            }
        }

        pdf.addImage(img.src, 'JPEG', xPosition, yPosition, imgWidth, imgHeight);
        xPosition += imgWidth + 10;
    });

    pdfBlob = pdf.output('blob');

    document.getElementById('downloadPDF').style.display = 'inline'; // Mostrar botão de download após gerar PDF
}

// Função para pré-visualizar o PDF
function previewPDF() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfPreview');

    iframe.src = URL.createObjectURL(pdfBlob);
    modal.style.display = 'flex'; // Abre o modal
}

// Função para download do PDF
function downloadPDF() {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'Imagens.pdf';
    link.click();
}

// Função para fechar o modal de pré-visualização
function closeModal() {
    const modal = document.getElementById('pdfModal');
    modal.style.display = 'none';
}
