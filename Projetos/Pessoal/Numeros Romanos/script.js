  document.addEventListener('DOMContentLoaded', function() {
            const decimalInput = document.getElementById('decimal');
            const romanoInput = document.getElementById('romano');
            const result1 = document.getElementById('result1');
            const result2 = document.getElementById('result2');

            function decimalToRoman(decimal) {
                const romanNumerals = [
                    { value: 1000, numeral: 'M' },
                    { value: 900, numeral: 'CM' },
                    { value: 500, numeral: 'D' },
                    { value: 400, numeral: 'CD' },
                    { value: 100, numeral: 'C' },
                    { value: 90, numeral: 'XC' },
                    { value: 50, numeral: 'L' },
                    { value: 40, numeral: 'XL' },
                    { value: 10, numeral: 'X' },
                    { value: 9, numeral: 'IX' },
                    { value: 5, numeral: 'V' },
                    { value: 4, numeral: 'IV' },
                    { value: 1, numeral: 'I' }
                ];

                let result = '';
                let num = parseInt(decimal, 10);

                if (isNaN(num)) return '';

                for (const { value, numeral } of romanNumerals) {
                    while (num >= value) {
                        result += numeral;
                        num -= value;
                    }
                }

                return result;
            }

            function romanToDecimal(roman) {
                const romanNumerals = {
                    'I': 1,
                    'V': 5,
                    'X': 10,
                    'L': 50,
                    'C': 100,
                    'D': 500,
                    'M': 1000
                };

                let num = 0;
                let prevValue = 0;

                for (const char of roman.toUpperCase()) {
                    const value = romanNumerals[char];
                    if (value === undefined) return 'Inválido';
                    if (value > prevValue) {
                        num += value - 2 * prevValue;
                    } else {
                        num += value;
                    }
                    prevValue = value;
                }

                return num;
            }

            decimalInput.addEventListener('input', function() {
                result1.textContent = decimalToRoman(decimalInput.value);
            });

            romanoInput.addEventListener('input', function() {
                result2.textContent = romanToDecimal(romanoInput.value);
            });

            document.getElementById('copyDecimal').addEventListener('click', function() {
                navigator.clipboard.writeText(result1.textContent)
                    .then(() => alert('Resultado copiado!'))
                    .catch(err => alert('Erro ao copiar: ' + err));
            });

            document.getElementById('copyRoman').addEventListener('click', function() {
                navigator.clipboard.writeText(result2.textContent)
                    .then(() => alert('Resultado copiado!'))
                    .catch(err => alert('Erro ao copiar: ' + err));
            });

            document.getElementById('clearDecimalButton').addEventListener('click', function() {
                decimalInput.value = '';
                result1.textContent = '';
            });

            document.getElementById('clearRomanButton').addEventListener('click', function() {
                romanoInput.value = '';
                result2.textContent = '';
            });
        });