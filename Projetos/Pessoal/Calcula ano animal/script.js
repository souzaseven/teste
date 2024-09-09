function calcularIdade() {
    const petType = document.getElementById('pet-type').value;
    const petAge = parseInt(document.getElementById('pet-age').value) || 0;
    let humanAge = 0;

    if (petAge === 0) {
        document.getElementById('result').innerText = "Idade em anos humanos: 0 anos";
        return;
    }

    if (petType === 'cachorro' || petType === 'gato') {
        if (petAge <= 2) {
            humanAge = petAge * 12.5;
        } else {
            humanAge = 2 * 12.5 + (petAge - 2) * 4;
        }
    }

    document.getElementById('result').innerText = `Idade em anos humanos: ${humanAge.toFixed(1)} anos`;
}

function atualizarEmoji() {
    const petType = document.getElementById('pet-type').value;
    const emojiDiv = document.getElementById('emoji');

    if (petType === 'cachorro') {
        emojiDiv.innerHTML = "🐶"; // Emoji de cachorro
    } else if (petType === 'gato') {
        emojiDiv.innerHTML = "🐱"; // Emoji de gato
    }
}

// Atualizar a imagem ao carregar a página
window.onload = function () {
    atualizarEmoji();
};