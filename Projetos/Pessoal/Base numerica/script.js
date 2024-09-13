document.addEventListener('DOMContentLoaded', function() {
    const deciInput = document.getElementById('deci');
    const binInput = document.getElementById('bin');
    const octInput = document.getElementById('oct');
    const hdeciInput = document.getElementById('hdeci');

    function convertDecimalToOthers(decimal) {
        const decimalValue = parseInt(decimal, 10);
        if (!isNaN(decimalValue)) {
            binInput.value = decimalValue.toString(2);
            octInput.value = decimalValue.toString(8);
            hdeciInput.value = decimalValue.toString(16).toUpperCase();
        } else {
            binInput.value = '';
            octInput.value = '';
            hdeciInput.value = '';
        }
    }

    function convertBinaryToOthers(binary) {
        const decimalValue = parseInt(binary, 2);
        if (!isNaN(decimalValue)) {
            deciInput.value = decimalValue;
            octInput.value = decimalValue.toString(8);
            hdeciInput.value = decimalValue.toString(16).toUpperCase();
        } else {
            deciInput.value = '';
            octInput.value = '';
            hdeciInput.value = '';
        }
    }

    function convertOctalToOthers(octal) {
        const decimalValue = parseInt(octal, 8);
        if (!isNaN(decimalValue)) {
            deciInput.value = decimalValue;
            binInput.value = decimalValue.toString(2);
            hdeciInput.value = decimalValue.toString(16).toUpperCase();
        } else {
            deciInput.value = '';
            binInput.value = '';
            hdeciInput.value = '';
        }
    }

    function convertHexadecimalToOthers(hexadecimal) {
        const decimalValue = parseInt(hexadecimal, 16);
        if (!isNaN(decimalValue)) {
            deciInput.value = decimalValue;
            binInput.value = decimalValue.toString(2);
            octInput.value = decimalValue.toString(8);
        } else {
            deciInput.value = '';
            binInput.value = '';
            octInput.value = '';
        }
    }

    deciInput.addEventListener('input', function() {
        convertDecimalToOthers(deciInput.value);
    });

    binInput.addEventListener('input', function() {
        convertBinaryToOthers(binInput.value);
    });

    octInput.addEventListener('input', function() {
        convertOctalToOthers(octInput.value);
    });

    hdeciInput.addEventListener('input', function() {
        convertHexadecimalToOthers(hdeciInput.value);
    });
});