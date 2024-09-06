const img = document.getElementById( 'img' );
const buttons = document.getElementById( 'buttons' );
let colorIndex = 0;
let intervalId = null;

const trafficLight = ( event ) => {
    stopAutomatic();
    turnOn[event.target.id]();
}

const nextIndex = () => colorIndex = colorIndex < 2 ? ++colorIndex : 0;

const changeColor = () => {
    const colors = ['red','yellow','green']
    const color = colors[ colorIndex ];
    turnOn[color]();
    nextIndex();
}

const stopAutomatic = () => {
    clearInterval ( intervalId );
}

const turnOn = {
    'red':      () => img.src = './img/vermelho.png',
    'yellow':   () => img.src = './img/amarelo.png',
    'green':    () => img.src = './img/verde.png',
    'automatic': () => intervalId = setInterval( changeColor, 1000 )
}

buttons.addEventListener('click', trafficLight );
// Obtendo referências para os botões
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const greenButton = document.getElementById('green');
const voltarButton = document.getElementById('voltar');
const buttonaut = document.getElementById('automatic');

// Adicionando eventos de clique aos botões
redButton.addEventListener('click', function() {
    document.body.style.backgroundColor = 'red'; // Altera o fundo para vermelho
});

yellowButton.addEventListener('click', function() {
    document.body.style.backgroundColor = 'yellow'; // Altera o fundo para amarelo
});

greenButton.addEventListener('click', function() {
    document.body.style.backgroundColor = 'greenyellow'; // Altera o fundo para verde
});

voltarButton.addEventListener('click', function() {
    document.body.style.backgroundColor = 'white'; // Altera o fundo para branco
});


buttonaut.addEventListener('click', function() {
    document.body.style.backgroundColor = 'linear-gradient(to right, red, yellow, greenyellow)';  
});

buttonaut.addEventListener('click', function() {
    let colors = ['red', 'yellow', 'greenyellow'];
    let index = 0;

    let intervalId = setInterval(function() {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Avança para a próxima cor
    }, 1000); // Define o intervalo para 1 segundo (1000 milissegundos)
});








