 document.getElementById('gerar').addEventListener('click', generateCard);
        document.getElementById('limpar').addEventListener('click', clearForm);

        // Função que gera os detalhes do cartão
        function generateCard() {
            var bandeira = document.getElementById('bandeira').value;
            var cardNumber, cvv;

            // Define o número do cartão e CVV com base na bandeira selecionada
            switch(bandeira) {
                case 'visa16':
                    cardNumber = generateCardNumber(16, '4');
                    cvv = generateCVV(3);
                    break;
                case 'visa13':
                    cardNumber = generateCardNumber(13, '4');
                    cvv = generateCVV(3);
                    break;
                case 'mastercard':
                    cardNumber = generateCardNumber(16, '5');
                    cvv = generateCVV(3);
                    break;
                case 'amex':
                    cardNumber = generateCardNumber(15, '3');
                    cvv = generateCVV(4);
                    break;
                case 'discover':
                    cardNumber = generateCardNumber(16, '6');
                    cvv = generateCVV(3);
                    break;
                case 'diners':
                    cardNumber = generateCardNumber(14, '3');
                    cvv = generateCVV(3);
                    break;
                case 'enroute':
                    cardNumber = generateCardNumber(15, '2');
                    cvv = generateCVV(3);
                    break;
                case 'jcb':
                    cardNumber = generateCardNumber(16, '3');
                    cvv = generateCVV(3);
                    break;
                case 'voyager':
                    cardNumber = generateCardNumber(15, '8');
                    cvv = generateCVV(3);
                    break;
                default:
                    cardNumber = 'N/A';
                    cvv = 'N/A';
            }

            // Gera a data de validade do cartão
            var expiryDate = generateExpiryDate();

            // Atualiza os campos no formulário
            document.getElementById('numero').value = cardNumber;
            document.getElementById('validade').value = expiryDate;
            document.getElementById('codigo').value = cvv;

            // Atualiza a pré-visualização do cartão
            updateCardPreview(cardNumber, expiryDate, cvv);
        }

        // Função que gera o número do cartão
        function generateCardNumber(length, prefix) {
            var number = prefix;
            for (var i = 0; i < length - prefix.length - 1; i++) {
                number += Math.floor(Math.random() * 10);
            }
            number += calculateLuhnCheckDigit(number);
            return formatCardNumber(number);
        }

        // Algoritmo de Luhn para validar o número do cartão
        function calculateLuhnCheckDigit(number) {
            var sum = 0;
            for (var i = 0; i < number.length; i++) {
                var digit = parseInt(number[number.length - 1 - i]);
                if (i % 2 == 0) {
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
                sum += digit;
            }
            return (sum * 9) % 10;
        }

        // Função que formata o número do cartão
        function formatCardNumber(number) {
            return number.replace(/(\d{4})(?=\d)/g, '$1 ');
        }

        // Função que gera o CVV
        function generateCVV(length) {
            var cvv = '';
            for (var i = 0; i < length; i++) {
                cvv += Math.floor(Math.random() * 10);
            }
            return cvv;
        }

        // Função que gera a data de validade
        function generateExpiryDate() {
            var today = new Date();
            var year = today.getFullYear() + Math.floor(Math.random() * 5) + 1;
            var month = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);
            return month + '/' + year.toString().slice(-2);
        }

        // Função que atualiza a pré-visualização do cartão
        function updateCardPreview(number, expiry, cvv) {
            document.getElementById('cardNumber').textContent = number;
            document.getElementById('cardExpiry').textContent = expiry;
            document.getElementById('cardCVVBack').textContent = 'CVV: ' + cvv;
        }

        // Função que limpa o conteúdo do formulário e da pré-visualização
        function clearForm() {
            document.getElementById('numero').value = '';
            document.getElementById('validade').value = '';
            document.getElementById('codigo').value = '';
            document.getElementById('cardNumber').textContent = 'XXXX XXXX XXXX XXXX';
            document.getElementById('cardExpiry').textContent = 'XX/XX';
            document.getElementById('cardCVVBack').textContent = 'CVV: XXX';
        }

        // Função que atualiza a imagem do cartão com base na bandeira
        function updateCardImage() {
            var bandeira = document.getElementById('bandeira').value;
            var cardFrontImageUrl = '';

            switch(bandeira) {
                case 'visa16':
                case 'visa13':
                    cardFrontImageUrl = 'https://via.placeholder.com/400x200?text=Visa';
                    break;
                case 'mastercard':
                    cardFrontImageUrl = 'https://via.placeholder.com/400x200?text=MasterCard';
                    break;
                case 'amex':
                    cardFrontImageUrl = 'https://via.placeholder.com/400x200?text=American+Express';
                    break;
                case 'discover':
                    cardFrontImageUrl = 'https://via.placeholder.com/400x200?text=Discover';
                    break;
                case 'diners':
                    cardFrontImageUrl = 'https://via.placeholder.com/400x200?text=Diners+Club';
                    break;
                case 'enroute':
                    cardFrontImageUrl = 'https://via.placeholder.com/400x200?text=enRoute';
                    break;
                case 'jcb':
                    cardFrontImageUrl = 'https://via.placeholder.com/400x200?text=JCB';
                    break;
                case 'voyager':
                    cardFrontImageUrl = 'https://via.placeholder.com/400x200?text=Voyager';
                    break;
                default:
                    cardFrontImageUrl = 'https://via.placeholder.com/400x200';
            }

            document.getElementById('cardFront').style.backgroundImage = 'url(' + cardFrontImageUrl + ')';
        }