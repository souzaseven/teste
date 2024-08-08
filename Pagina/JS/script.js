
/*criando um efeito de digitação de texto usando Typed.js*/
<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.10/typed.min.js"></script>

/**criando botão para mostrar e ocultar a barra de navegação**/
var togglebtn = document.querySelector(".togglebtn");
var nav = document.querySelector(".navlinks");
var links = document.querySelector(".navlinks li");

togglebtn.addEventListener("click", function(){
    this.classList.toggle("click");
    nav.classList.toggle("open");
})

var typed = new Typed(".input", {
    strings: ["Full stack Developer", "Web Developer"],
    typeSpeed: 70,
    backSpeed: 55,
    loop: true
})




 // JavaScript para alternar entre modos claro e escuro
 const modeToggle = document.getElementById('modeToggle');
 const body = document.body;
 const blackSection = document.querySelector('.black');
 const whiteSection = document.querySelector('.white');

 modeToggle.addEventListener('click', () => {
     body.classList.toggle('dark-mode');
     if (body.classList.contains('dark-mode')) {
         modeToggle.textContent = 'Modo Escuro';
         blackSection.style.display = 'block';
         whiteSection.style.display = 'none';
     } else {
         modeToggle.textContent = 'Modo Claro';
         blackSection.style.display = 'none';
         whiteSection.style.display = 'block';
     }
 });

 // Inicialmente exibe a seção clara e oculta a escura
 blackSection.style.display = 'none';
 whiteSection.style.display = 'block';