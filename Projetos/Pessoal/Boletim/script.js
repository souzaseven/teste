// Matérias padrão que são exibidas caso não haja dados salvos no localStorage
const materiasPadrao = ['Língua Portuguesa', 'Matemática', 'Biologia', 'Física', 'Química', 'Artes', 'Educação Física', 'Língua Inglesa', 'Filosofia', 'Sociologia'];

// Tenta carregar as matérias salvas no localStorage, caso não existam, usa as matérias padrão
let materias = JSON.parse(localStorage.getItem('boletimSalvo'))?.materias || [...materiasPadrao.map(nome => ({ nome, notas: [], faltas: [] }))];

// Seleciona o container onde o boletim será renderizado
const boletimContainer = document.getElementById('boletim-container');

// Variável para armazenar o elemento sendo arrastado durante o processo de reorganização dos cartões
let draggedElement = null;

// Função que gera o boletim com as matérias
function gerarBoletim() {
    boletimContainer.innerHTML = ''; // Limpa o conteúdo anterior do boletim
    materias.forEach((materia, index) => {
        criarMateriaContainer(index, materia.nome, materia.notas, materia.faltas, 4); // Cria um cartão para cada matéria
    });
}

// Função que cria o cartão de cada matéria
function criarMateriaContainer(index, nome, notas, faltas, numSemestres) {
    const container = document.createElement('div'); // Cria um elemento <div> para o cartão da matéria
    container.className = 'subject-container'; // Define a classe CSS para o cartão
    container.draggable = true; // Permite que o cartão seja arrastável
    container.dataset.index = index; // Armazena o índice da matéria no atributo data

    // Adiciona os eventos de arrastar e soltar
    container.addEventListener('dragstart', onDragStart); // Início do arrasto
    container.addEventListener('dragend', onDragEnd); // Fim do arrasto
    container.addEventListener('dragover', onDragOver); // Evento de arrastar sobre outro elemento
    container.addEventListener('drop', onDrop); // Evento de soltar o cartão

    // Monta o HTML do cartão da matéria
    container.innerHTML = `
        <h2 ondblclick="editarNomeMateria(this, ${index})" title="Dois cliques para alterar o nome da matéria">${nome}</h2>
        <div class="input-group">
            <label>Notas (Semestres)</label>
            <div class="nota-faltas-row">
                ${Array.from({ length: numSemestres }, (_, idx) => `
                    <input type="number" min="0" max="10" placeholder="Nota ${idx + 1}" value="${notas[idx] || ''}" class="nota-semestre" onchange="salvarNota(this, ${index}, ${idx})">
                `).join('')}
            </div>
        </div>
        <div class="input-group">
            <label>Faltas (Semestres)</label>
            <div class="nota-faltas-row">
                ${Array.from({ length: numSemestres }, (_, idx) => `
                    <input type="number" min="0" max="100" placeholder="Faltas ${idx + 1}" value="${faltas[idx] || ''}" class="faltas-semestre" onchange="salvarFaltas(this, ${index}, ${idx})">
                `).join('')}
            </div>
        </div>
        <button class="info-button faltas-button">Total de Faltas: <span class="total-faltas-valor">0</span></button>
        <button class="info-button media-button">Média: <span class="media-materia-valor">0</span></button>
        <button class="info-button status-button">Status: <span class="status-aprovacao-valor">Aguardando...</span></button>
        <button class="btn-delete" onclick="excluirMateria(${index})">Excluir</button>
    `;

    // Adiciona o cartão da matéria ao container do boletim
    boletimContainer.appendChild(container);

    // Calcula a média e as faltas ao gerar o cartão
    calcularMedia(container.querySelector('.nota-semestre'));
    calcularFaltas(container.querySelector('.faltas-semestre'));
}

// Salva a nota inserida pelo usuário e recalcula a média
function salvarNota(input, materiaIndex, semestreIndex) {
    const nota = parseFloat(input.value); // Converte a nota para número
    materias[materiaIndex].notas[semestreIndex] = nota; // Atualiza a nota da matéria no array
    salvarMaterias(); // Salva as matérias no localStorage
    calcularMedia(input); // Recalcula a média
}

// Salva as faltas inseridas pelo usuário e recalcula o total de faltas
function salvarFaltas(input, materiaIndex, semestreIndex) {
    const falta = parseInt(input.value); // Converte as faltas para número
    materias[materiaIndex].faltas[semestreIndex] = falta; // Atualiza as faltas da matéria no array
    salvarMaterias(); // Salva as matérias no localStorage
    calcularFaltas(input); // Recalcula o total de faltas
}

// Função que salva as matérias no localStorage
function salvarMaterias() {
    localStorage.setItem('boletimSalvo', JSON.stringify({ materias })); // Armazena as matérias no localStorage
}

// Função que permite ao usuário editar o nome da matéria
function editarNomeMateria(element, index) {
    const nomeAtual = element.innerText; // Obtém o nome atual
    const novoNome = prompt("Editar nome da matéria:", nomeAtual); // Solicita um novo nome ao usuário
    if (novoNome !== null && novoNome.trim() !== "") { // Se o novo nome for válido
        materias[index].nome = novoNome.trim(); // Atualiza o nome no array
        element.innerText = novoNome.trim(); // Atualiza o nome na interface
        salvarMaterias(); // Salva a alteração no localStorage
    }
}

// Função que exclui uma matéria do boletim
function excluirMateria(index) {
    if (confirm('Tem certeza que deseja excluir esta matéria?')) { // Confirma a exclusão
        materias.splice(index, 1); // Remove a matéria do array
        salvarMaterias(); // Salva a alteração no localStorage
        gerarBoletim(); // Regenera o boletim para refletir a mudança
    }
}

// Função que adiciona uma nova matéria ao boletim
function adicionarMateria() {
    const novaMateria = { nome: `Nova Matéria ${materias.length + 1}`, notas: [], faltas: [] }; // Cria uma nova matéria
    materias.push(novaMateria); // Adiciona a nova matéria ao array
    salvarMaterias(); // Salva a nova matéria no localStorage
    gerarBoletim(); // Regenera o boletim para refletir a mudança
}

// Função que calcula a média das notas e atualiza o status de aprovação
function calcularMedia(input) {
    const container = input.closest('.subject-container'); // Encontra o cartão de matéria correspondente
    const notas = container.querySelectorAll('.nota-semestre'); // Seleciona todas as notas
    const statusElement = container.querySelector('.status-aprovacao-valor'); // Elemento que exibe o status de aprovação
    const mediaElement = container.querySelector('.media-materia-valor'); // Elemento que exibe a média
    const statusButton = container.querySelector('.status-button'); // Botão de status
    const mediaButton = container.querySelector('.media-button'); // Botão de média
    let totalNotas = 0; // Inicializa o total de notas
    let countNotas = 0; // Inicializa o contador de notas

    // Soma as notas válidas
    notas.forEach(notaInput => {
        const nota = parseFloat(notaInput.value);
        if (!isNaN(nota)) { // Verifica se a nota é um número válido
            totalNotas += nota; // Soma a nota
            countNotas++; // Incrementa o contador de notas válidas
        }
    });

    const media = totalNotas / countNotas; // Calcula a média
    mediaElement.innerText = isNaN(media) ? '' : media.toFixed(2); // Exibe a média ou vazio se não for válida

    // Atualiza o status de acordo com a média
    if (media >= 6) {
        statusElement.innerText = 'Aprovado'; // Se a média for 6 ou mais, aprovado
        mediaButton.classList.remove('reprovado'); 
        statusButton.classList.remove('reprovado');
        mediaButton.style.backgroundColor = "#28a745"; // Verde para aprovado
        statusButton.style.backgroundColor = "#218838"; // Verde escuro para aprovado
    } else if (!isNaN(media)) {
        statusElement.innerText = 'Reprovado'; // Se a média for menor que 6, reprovado
        mediaButton.classList.add('reprovado');
        statusButton.classList.add('reprovado');
        mediaButton.style.backgroundColor = "#ff6666"; // Vermelho para reprovado
        statusButton.style.backgroundColor = "#ff3333"; // Vermelho para reprovado
    } else {
        // Mantém o padrão se não houver notas
        mediaButton.style.backgroundColor = "#ffc107"; // Amarelo para status indefinido
        statusButton.style.backgroundColor = "#007bff"; // Azul para status indefinido
    }
}

// Função que calcula o total de faltas
function calcularFaltas(input) {
    const container = input.closest('.subject-container'); // Encontra o cartão de matéria correspondente
    const faltas = container.querySelectorAll('.faltas-semestre'); // Seleciona todas as faltas
    const totalFaltasElement = container.querySelector('.total-faltas-valor'); // Elemento que exibe o total de faltas
    let totalFaltas = 0; // Inicializa o total de faltas

    // Soma as faltas válidas
    faltas.forEach(faltaInput => {
        const falta = parseInt(faltaInput.value); // Converte a falta para número
        if (!isNaN(falta)) { // Verifica se a falta é um número válido
            totalFaltas += falta; // Soma a falta
        }
    });

    totalFaltasElement.innerText = totalFaltas; // Exibe o total de faltas
}

// Função que limpa todas as matérias do boletim (mantém os cartões, mas reseta as notas e faltas)
function limparBoletim() {
    if (confirm('Tem certeza que deseja limpar todo o boletim?')) { // Confirma a ação de limpar
        materias.forEach(materia => {
            materia.notas = []; // Reseta as notas
            materia.faltas = []; // Reseta as faltas
        });
        salvarMaterias(); // Salva a alteração no localStorage
        gerarBoletim(); // Regenera o boletim para refletir a mudança
    }
}

// Funções que gerenciam o arrasto e reorganização dos cartões de matérias

// Função que é acionada quando o arrasto começa
function onDragStart(event) {
    event.target.classList.add('dragging'); // Adiciona a classe de arrasto ao elemento
    draggedElement = event.target; // Armazena o elemento que está sendo arrastado
}

// Função que é acionada quando o arrasto termina
function onDragEnd(event) {
    event.target.classList.remove('dragging'); // Remove a classe de arrasto
    draggedElement = null; // Limpa a variável que armazena o elemento arrastado
}

// Função que é acionada enquanto o elemento está sendo arrastado sobre outro
function onDragOver(event) {
    event.preventDefault(); // Impede o comportamento padrão
    const draggingOver = event.target.closest('.subject-container'); // Encontra o cartão sobre o qual está sendo arrastado
    if (draggingOver && draggingOver !== draggedElement) { // Se o cartão atual não for o mesmo que está sendo arrastado
        const allContainers = Array.from(boletimContainer.querySelectorAll('.subject-container')); // Seleciona todos os cartões
        const draggedIndex = allContainers.indexOf(draggedElement); // Obtém o índice do cartão arrastado
        const overIndex = allContainers.indexOf(draggingOver); // Obtém o índice do cartão sobre o qual está sendo arrastado
        if (draggedIndex > overIndex) {
            boletimContainer.insertBefore(draggedElement, draggingOver); // Move o cartão arrastado antes do outro cartão
        } else {
            boletimContainer.insertBefore(draggedElement, draggingOver.nextSibling); // Move o cartão arrastado depois do outro cartão
        }
    }
}

// Função que é acionada quando o elemento é solto
function onDrop(event) {
    const allContainers = Array.from(boletimContainer.querySelectorAll('.subject-container')); // Seleciona todos os cartões
    materias = allContainers.map(container => materias[container.dataset.index]); // Atualiza a ordem das matérias no array
    salvarMaterias(); // Salva a nova ordem no localStorage
}

// Função que carrega o boletim ao abrir a página
window.onload = function() {
    gerarBoletim(); // Gera o boletim ao carregar a página
};
