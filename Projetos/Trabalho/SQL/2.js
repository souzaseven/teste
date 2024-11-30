// Elementos do DOM
const addButton = document.getElementById("add-btn");
const textList = document.getElementById("text-list");
const textTitle = document.getElementById("text-title");
const textContent = document.getElementById("text-content");

// Recuperar textos do localStorage
let texts = JSON.parse(localStorage.getItem("texts")) || [];

// Exibir os textos salvos ao carregar a página
function exibirTextos() {
    textList.innerHTML = "";
    texts.forEach((text, index) => {
        const textBlock = document.createElement("div");
        textBlock.classList.add("text-block");
        
        // Destacar o título com base no termo de busca
        const highlightedTitle = destacarTexto(text.title, document.getElementById("search-input").value);
        
        // Criar HTML para o bloco de texto
        textBlock.innerHTML = `
            <h3>${highlightedTitle || "Sem Título"}</h3>
            <textarea readonly>${text.content}</textarea>
            <button class="edit-btn" onclick="editarTexto(${index})"><i class="fas fa-edit"></i> Editar</button>
            <button class="copy-btn" onclick="copiarTexto(${index})"><i class="fas fa-copy"></i> Copiar</button>
            <button class="delete-btn" onclick="excluirTexto(${index})"><i class="fas fa-trash"></i> Excluir</button>
        `;
        textList.appendChild(textBlock);
    });
}

// Salvar os textos no localStorage
function salvarTextos() {
    localStorage.setItem("texts", JSON.stringify(texts));
}

// Adicionar novo texto
addButton.addEventListener("click", () => {
    const title = textTitle.value.trim();
    const content = textContent.value.trim();
    if (title || content) {
        texts.push({ title, content });
        salvarTextos();
        exibirTextos();
        textTitle.value = "";
        textContent.value = "";
    }
});

// Editar texto
function editarTexto(index) {
    const title = prompt("Novo título", texts[index].title);
    const content = prompt("Novo conteúdo", texts[index].content);
    if (title !== null && content !== null) {
        texts[index].title = title;
        texts[index].content = content;
        salvarTextos();
        exibirTextos();
    }
}

// Copiar texto
function copiarTexto(index) {
    navigator.clipboard.writeText(texts[index].content);
}

// Excluir texto
function excluirTexto(index) {
    if (confirm("Você tem certeza que deseja excluir este texto?")) {
        texts.splice(index, 1);
        salvarTextos();
        exibirTextos();
    }
}

// Função para destacar o texto encontrado na pesquisa
function destacarTexto(text, termoDeBusca) {
    if (!termoDeBusca) return text; // Se não houver termo de busca, retorna o texto original
    const regex = new RegExp(`(${termoDeBusca})`, 'gi'); // Cria uma regex para destacar o termo
    return text.replace(regex, '<span class="highlight">$1</span>'); // Envolve o termo com a tag <span> para destacar
}

// Função de busca de texto em tempo real
function buscarTexto() {
    const termoDeBusca = document.getElementById("search-input").value.trim().toLowerCase();
    const textBlocks = document.querySelectorAll(".text-block");
    
    // Pesquisa em todos os campos, incluindo container2 e example-fields
    const searchFields = document.querySelectorAll("#container2, #example-fields, .text-block");

    searchFields.forEach(field => {
        const title = field.querySelector("h3") ? field.querySelector("h3").textContent.toLowerCase() : '';
        const content = field.querySelector("textarea") ? field.querySelector("textarea").value.toLowerCase() : '';
        
        if (title.includes(termoDeBusca) || content.includes(termoDeBusca)) {
            field.classList.add("highlight");
        } else {
            field.classList.remove("highlight");
        }

        // Destacar o título
        const highlightedTitle = destacarTexto(field.querySelector("h3") ? field.querySelector("h3").textContent : '', termoDeBusca);
        if (field.querySelector("h3")) {
            field.querySelector("h3").innerHTML = highlightedTitle; // Aplica o destaque no título
        }
    });
}

// Adicionar evento de busca ao campo de pesquisa
document.getElementById("search-btn").addEventListener("click", buscarTexto);
document.getElementById("search-input").addEventListener("input", buscarTexto);

// Filtrar textos com base na pesquisa
function filtrarTextos() {
    const termoDeBusca = document.getElementById("search-input").value.trim().toLowerCase();
    const textosFiltrados = texts.filter(text => 
        text.title.toLowerCase().includes(termoDeBusca) || text.content.toLowerCase().includes(termoDeBusca)
    );
    exibirTextosFiltrados(textosFiltrados);
}

// Modificar a função exibirTextos para aceitar uma lista personalizada de textos
function exibirTextosFiltrados(textosFiltrados = texts) {
    textList.innerHTML = "";
    textosFiltrados.forEach((text, index) => {
        const textBlock = document.createElement("div");
        textBlock.classList.add("text-block");
        
        // Destacar no título
        const highlightedTitle = destacarTexto(text.title, document.getElementById("search-input").value);

        // Criar HTML com título destacado
        textBlock.innerHTML = `
            <h3>${highlightedTitle || "Sem Título"}</h3>
            <textarea readonly>${text.content}</textarea>
            <button class="edit-btn" onclick="editarTexto(${index})"><i class="fas fa-edit"></i> Editar</button>
            <button class="copy-btn" onclick="copiarTexto(${index})"><i class="fas fa-copy"></i> Copiar</button>
            <button class="delete-btn" onclick="excluirTexto(${index})"><i class="fas fa-trash"></i> Excluir</button>
        `;
        textList.appendChild(textBlock);
    });
}

// Iniciar exibição dos textos ao carregar a página
window.onload = exibirTextos;

