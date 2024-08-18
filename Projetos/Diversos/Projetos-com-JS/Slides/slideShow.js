'use strict';

const images = [
    { 'id': '1', 'url': './img/1.jpg' },
    { 'id': '2', 'url': './img/2.png' },
    { 'id': '3', 'url': './img/3.jpg' },
    { 'id': '4', 'url': './img/4.png' },
    { 'id': '5', 'url': './img/5.gif' },
    { 'id': '6', 'url': './img/nitro.jpg' },
    { 'id': '1', 'url': './img/1.jpg' },
    { 'id': '2', 'url': './img/2.png' },
    { 'id': '3', 'url': './img/3.jpg' },
    { 'id': '4', 'url': './img/4.png' },
    { 'id': '5', 'url': './img/5.gif' },
    { 'id': '1', 'url': './img/1.jpg' },
    { 'id': '2', 'url': './img/2.png' },
    { 'id': '3', 'url': './img/3.jpg' },
    { 'id': '4', 'url': './img/4.png' },
    { 'id': '5', 'url': './img/5.gif' },
    { 'id': '1', 'url': './img/1.jpg' },
    { 'id': '2', 'url': './img/2.png' },
    { 'id': '3', 'url': './img/3.jpg' },
    { 'id': '4', 'url': './img/4.png' },
    { 'id': '5', 'url': './img/5.gif' },
    { 'id': '1', 'url': './img/1.jpg' },
    { 'id': '2', 'url': './img/2.png' },
    { 'id': '3', 'url': './img/3.jpg' },
    { 'id': '4', 'url': './img/4.png' },
    { 'id': '5', 'url': './img/5.gif' },
    { 'id': '6', 'url': './img/nitro.jpg' }
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
