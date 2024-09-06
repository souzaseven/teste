function filterProjects() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const projectItems = document.querySelectorAll('.project-item');
    let found = false;

    projectItems.forEach(function(item) {
        const text = item.textContent.toLowerCase();
        item.classList.remove('highlighted');

        if (text.includes(input)) {
            if (!found) {
                found = true;
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                item.classList.add('highlighted-temp');
            }
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });

    setTimeout(function() {
        document.querySelectorAll('.highlighted-temp').forEach(function(item) {
            item.classList.remove('highlighted-temp');
            item.classList.add('highlighted');
        });
    }, 2000); // O tempo pode ser ajustado
}

// Get the modal
const modal = document.getElementById('pdf-modal');
const modalContent = document.getElementById('pdf-modal-content');
const closeBtn = document.querySelector('.close-btn');

// Function to open the modal with a specific PDF
function openPdfModal(pdfSrc) {
modal.style.display = 'block';
modalContent.src = pdfSrc;
}

// Function to close the modal
function closeModal() {
modal.style.display = 'none';
}

// Attach event listeners
closeBtn.onclick = closeModal;
window.onclick = function(event) {
if (event.target === modal) {
closeModal();
}
};

// Add click event to PDF link to open the modal
document.querySelectorAll('.pdf-viewer-container a').forEach(function(link) {
link.addEventListener('click', function(e) {
e.preventDefault();
openPdfModal(this.getAttribute('href'));
});
});