 const textoArea = document.getElementById('texto');
    const binarioArea = document.getElementById('binario');

    function encodeTextToBinary() {
        const texto = textoArea.value;
        const binario = texto.split('')
                             .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
                             .join(' ');
        binarioArea.value = binario;
    }

    function decodeBinaryToText() {
        const binario = binarioArea.value;
        const texto = binario.split(' ')
                              .map(bin => String.fromCharCode(parseInt(bin, 2)))
                              .join('');
        textoArea.value = texto;
    }

    function copyToClipboard(id) {
        const copyText = document.getElementById(id);
        copyText.select();
        document.execCommand("copy");
        alert(id.charAt(0).toUpperCase() + id.slice(1) + ' copiado para a área de transferência!');
    }

    function clearField(id) {
        document.getElementById(id).value = '';
    }

    textoArea.addEventListener('input', encodeTextToBinary);
    binarioArea.addEventListener('input', decodeBinaryToText);