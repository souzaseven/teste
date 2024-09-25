document.getElementById('imageInput').addEventListener('change', handleImageUpload);
document.getElementById('generatePDF').addEventListener('click', generatePDF);
document.getElementById('previewPDF').addEventListener('click', previewPDF);
document.getElementById('downloadPDF').addEventListener('click', downloadPDF);
document.getElementById('closeModal').addEventListener('click', closeModal);

let imageArray = [];
let pdfBlob = null;

// Função para lidar com o upload de imagens
function handleImageUpload(event) {
    const files = event.target.files;
    const thumbnailContainer = document.getElementById('thumbnailPreview');
    thumbnailContainer.innerHTML = ''; // Limpa a pré-visualização anterior
    imageArray = []; // Limpa o array de imagens

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            imageArray.push(img); // Armazena as imagens no array

            const thumbnail = new Image();
            thumbnail.src = e.target.result;
            thumbnailContainer.appendChild(thumbnail);
        };

        reader.readAsDataURL(file);
    }
}

// Função para gerar o PDF a partir das imagens
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth() - 20; // Largura da imagem (com margem)
    const pageHeight = pdf.internal.pageSize.getHeight(); // Altura da página
    let yPosition = 10;

    imageArray.forEach((img, index) => {
        const ratio = img.naturalWidth / img.naturalHeight;
        const imgHeight = imgWidth / ratio;

        if (yPosition + imgHeight > pageHeight) {
            pdf.addPage(); // Adiciona nova página se a imagem não couber
            yPosition = 10; // Reinicia a margem no topo
        }

        pdf.addImage(img.src, 'JPEG', 10, yPosition, imgWidth, imgHeight); // Ajusta a imagem
        yPosition += imgHeight + 10; // Incrementa a posição vertical para a próxima imagem
    });

    pdfBlob = pdf.output('blob'); // Armazena o PDF gerado como Blob

    document.getElementById('previewPDF').style.display = 'inline'; // Mostra o botão de pré-visualização
    document.getElementById('downloadPDF').style.display = 'inline'; // Mostra o botão de download
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
