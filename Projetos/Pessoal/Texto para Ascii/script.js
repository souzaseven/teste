document.getElementById('textInput').addEventListener('input', () => {
    const textInput = document.getElementById('textInput').value;
    const output = document.getElementById('output');

    if (textInput) {
        const asciiCodes = Array.from(textInput)
            .map(char => `${char}: ${char.charCodeAt(0)}`)
            .join('\n');
        output.textContent = asciiCodes;
    } else {
        output.textContent = ''; // Limpa a área de saída quando o campo está vazio
    }
});