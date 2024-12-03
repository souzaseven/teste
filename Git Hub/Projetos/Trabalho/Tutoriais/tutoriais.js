document.addEventListener('DOMContentLoaded', function () {

    // Função para exibir ou ocultar seções com base na pesquisa
    function filterContent() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase();
        const sections = document.querySelectorAll('section');

        sections.forEach(function (section) {
            const title = section.querySelector('h2').innerText.toLowerCase();
            const videoItems = section.querySelectorAll('.video-item');
            let sectionVisible = title.includes(searchTerm);  // Verifica se o título da seção contém o termo

            // Filtra vídeos dentro de cada seção
            videoItems.forEach(function (videoItem) {
                const videoTitle = videoItem.querySelector('.video-title').innerText.toLowerCase();
                if (videoTitle.includes(searchTerm)) {
                    videoItem.style.display = 'block'; // Exibe o vídeo se o título contiver o termo
                } else {
                    videoItem.style.display = 'none'; // Oculta o vídeo se não contiver o termo
                }
            });

            // Exibe ou oculta a seção com base no título
            if (sectionVisible || Array.from(videoItems).some(item => item.style.display === 'block')) {
                section.style.display = 'block'; // Exibe a seção se ela corresponder à pesquisa
            } else {
                section.style.display = 'none'; // Oculta a seção se não houver correspondência
            }
        });
    }

    // Evento para filtrar conteúdo ao digitar na pesquisa
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterContent);

    // Função para mover o carrossel
    function moveCarousel(button, direction) {
        const carouselTrack = button.closest('.carousel-container').querySelector('.carousel-track');
        const videoItems = carouselTrack.querySelectorAll('.video-item');
        const itemWidth = videoItems[0].offsetWidth;
        const totalItems = videoItems.length;

        // Obtém o índice do primeiro item visível
        const currentTranslateX = parseInt(window.getComputedStyle(carouselTrack).transform.split(',')[4]) || 0;
        const currentIndex = Math.abs(currentTranslateX / itemWidth);
        
        let newIndex;

        // Define o novo índice baseado na direção
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % totalItems;  // Volta para o primeiro item se for o último
        } else if (direction === 'prev') {
            newIndex = (currentIndex - 1 + totalItems) % totalItems;  // Volta para o último item se for o primeiro
        }

        // Calcula a nova posição do carrossel
        const newTranslateX = -newIndex * itemWidth;

        // Move o carrossel
        carouselTrack.style.transition = 'transform 0.5s ease';
        carouselTrack.style.transform = `translateX(${newTranslateX}px)`;
    }

    // Função para iniciar o carrossel automático
   /* function startAutoCarousel() {
        const carousels = document.querySelectorAll('.carousel-container');
        carousels.forEach(carousel => {
            setInterval(function () {
                const nextButton = carousel.querySelector('.carousel-button.next');
                moveCarousel(nextButton, 'next');
            }, 5000); // Muda a cada 5 segundos
        });
    }

    // Inicia o carrossel automático
    startAutoCarousel();*/

    // Adiciona a funcionalidade de clicar nos botões
    const nextButtons = document.querySelectorAll('.carousel-button.next');
    const prevButtons = document.querySelectorAll('.carousel-button.prev');

    nextButtons.forEach(button => {
        button.addEventListener('click', function () {
            moveCarousel(button, 'next');
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function () {
            moveCarousel(button, 'prev');
        });
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");
    const items = document.querySelectorAll(".video-item");

    let currentPosition = 0;
    const itemsToShow = 5; // Número de itens visíveis por vez
    const totalItems = items.length;
    const itemWidth = items[0].offsetWidth;

    // Atualiza a largura total do track
    track.style.width = `${itemWidth * totalItems}px`;

    // Evento para botão "Avançar"
    nextButton.addEventListener("click", () => {
        if (currentPosition < totalItems - itemsToShow) {
            currentPosition++;
            updateCarousel();
        }
    });

    // Evento para botão "Voltar"
    prevButton.addEventListener("click", () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    });

    // Função para atualizar a posição do carrossel
    function updateCarousel() {
        const offset = currentPosition * itemWidth;
        track.style.transform = `translateX(-${offset}px)`;
    }
});
