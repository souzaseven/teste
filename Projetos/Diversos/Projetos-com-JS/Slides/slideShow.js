'use strict';

const images = [
    { 'id': '0', 'url': './img/nitro.jpg' },
    { 'id': '1', 'url': './img/1.jpg' },
    { 'id': '2', 'url': './img/2.png' },
    { 'id': '3', 'url': './img/3.jpg' },
    { 'id': '4', 'url': './img/4.png' },
    { 'id': '5', 'url': './img/5.gif' },
    { 'id': '6', 'url': './img/6.webp' },
    { 'id': '7', 'url': './img/7.webp' },
    { 'id': '8', 'url': './img/.8.jpeg' },
    { 'id': '9', 'url': './img/9.png' },
    { 'id': '10', 'url': './img/10.webp' },
    { 'id': '11', 'url': './img/11.webp' },
    { 'id': '12', 'url': './img/12.webp' },
    { 'id': '13', 'url': './img/13.png' },
    { 'id': '14', 'url': './img/14.webp' },
    { 'id': '15', 'url': './img/15.png' },
    { 'id': '16', 'url': './img/16.webp' },
    { 'id': '17', 'url': './img/17.webp' },
    { 'id': '18', 'url': './img/18.webp' },
    { 'id': '19', 'url': './img/19.webp' },
    { 'id': '20', 'url': './img/20.png' },
    { 'id': '21', 'url': './img/21.webp' },
    { 'id': '22', 'url': './img/22.webp' },
    { 'id': '23', 'url': './img/23.webp' },
    { 'id': '24', 'url': './img/24.webp' },
    { 'id': '25', 'url': './img/25.png' },
    { 'id': '26', 'url': './img/26.webp' },
    { 'id': '27', 'url': './img/27.webp' },
    { 'id': '28', 'url': './img/28.gif' },
    { 'id': '29', 'url': './img/29.webp' },
    { 'id': '30', 'url': './img/30.webp' },
    { 'id': '31', 'url': './img/31.jpg' },
    { 'id': '32', 'url': './img/32.gif' },
    { 'id': '33', 'url': './img/33.gif' },
    { 'id': '34', 'url': './img/34.webp' },
    { 'id': '35', 'url': './img/35.png' },
    { 'id': '36', 'url': './img/36.webp' },
];

const containerItems = document.querySelector('#container-items');

const loadImages = (images, container) => {
    images.forEach(image => {
        container.innerHTML += `
            <div class='item'>
                <img src='${image.url}' alt='Slideshow Image'>
            </div>
        `;
    });
};

loadImages(images, containerItems);

let items = document.querySelectorAll('.item');

// Auto-slide functionality
let autoSlideInterval;

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        next();
    }, 3000); // Change slide every 3 seconds
};

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

const previous = () => {
    const lastItem = items[items.length - 1];
    containerItems.insertBefore(lastItem, items[0]);
    items = document.querySelectorAll('.item');
};

const next = () => {
    const firstItem = items[0];
    containerItems.appendChild(firstItem);
    items = document.querySelectorAll('.item');
};

document.querySelector('#previous').addEventListener('click', () => {
    stopAutoSlide();
    previous();
    startAutoSlide();
});

document.querySelector('#next').addEventListener('click', () => {
    stopAutoSlide();
    next();
    startAutoSlide();
});

// Start automatic slide show when the page loads
startAutoSlide();
