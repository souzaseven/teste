document.querySelector('.btn-classic').addEventListener('click', generatePassword);
document.querySelector('.copy-btn').addEventListener('click', copyPassword);

function generatePassword() {
    const tamanho = parseInt(document.getElementById('tamanho').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const incluirNumeros = document.getElementById('numeros').checked;
    const incluirMinusculas = document.getElementById('minusculas').checked;
    const incluirMaiusculas = document.getElementById('maiusculas').checked;
    const incluirSimbolos = document.getElementById('simbolos').checked;

    const caracteres = {
        numeros: '0123456789',
        minusculas: 'abcdefghijklmnopqrstuvwxyz',
        maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        simbolos: '!@#$%^&*()_+-=[]{},.<>?/~'
    };

    let caracteresDisponiveis = '';
    if (incluirNumeros) caracteresDisponiveis += caracteres.numeros;
    if (incluirMinusculas) caracteresDisponiveis += caracteres.minusculas;
    if (incluirMaiusculas) caracteresDisponiveis += caracteres.maiusculas;
    if (incluirSimbolos) caracteresDisponiveis += caracteres.simbolos;

    let senhas = '';
    for (let i = 0; i < quantidade; i++) {
        let senha = '';
        for (let j = 0; j < tamanho; j++) {
            const randomIndex = Math.floor(Math.random() * caracteresDisponiveis.length);
            senha += caracteresDisponiveis[randomIndex];
        }
        senhas += senha + '\\n';
    }

    document.getElementById('result').value = senhas.trim();
}

function copyPassword() {
    const password = document.getElementById('result');
    password.select();
    document.execCommand('copy');
}