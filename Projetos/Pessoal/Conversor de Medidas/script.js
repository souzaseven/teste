 // Esconde os campos de medida e o botão limpar ao carregar a página
        document.addEventListener('DOMContentLoaded', function() {
            toggleFields();
        });

        function toggleFields() {
            const tipo = document.getElementById('tipo').value;
            document.getElementById('comprimentoFields').style.display = tipo === 'comprimento' ? 'block' : 'none';
            document.getElementById('massaFields').style.display = tipo === 'massa' ? 'block' : 'none';
            document.getElementById('tempoFields').style.display = tipo === 'tempo' ? 'block' : 'none';
            document.getElementById('temperaturaFields').style.display = tipo === 'temperatura' ? 'block' : 'none';

            // Exibe o botão de limpar apenas quando uma medida for selecionada
            document.getElementById('clearButton').style.display = tipo ? 'inline-block' : 'none';
        }

        function clearFields() {
            document.querySelectorAll('.form-control').forEach(input => {
                input.value = '';
            });
            document.getElementById('tipo').value = '';
            toggleFields();
        }

        function convertLength(element) {
            const km = parseFloat(document.getElementById('km').value) || 0;
            const m = parseFloat(document.getElementById('m').value) || 0;
            const cm = parseFloat(document.getElementById('cm').value) || 0;
            const mi = parseFloat(document.getElementById('mi').value) || 0;
            const ft = parseFloat(document.getElementById('ft').value) || 0;
            const inches = parseFloat(document.getElementById('in').value) || 0;

            if (element.id === 'km') {
                document.getElementById('m').value = (km * 1000).toFixed(2);
                document.getElementById('cm').value = (km * 100000).toFixed(2);
                document.getElementById('mi').value = (km * 0.621371).toFixed(2);
                document.getElementById('ft').value = (km * 3280.84).toFixed(2);
                document.getElementById('in').value = (km * 39370.1).toFixed(2);
            } else if (element.id === 'm') {
                document.getElementById('km').value = (m / 1000).toFixed(2);
                document.getElementById('cm').value = (m * 100).toFixed(2);
                document.getElementById('mi').value = (m * 0.000621371).toFixed(2);
                document.getElementById('ft').value = (m * 3.28084).toFixed(2);
                document.getElementById('in').value = (m * 39.3701).toFixed(2);
            } else if (element.id === 'cm') {
                document.getElementById('km').value = (cm / 100000).toFixed(2);
                document.getElementById('m').value = (cm / 100).toFixed(2);
                document.getElementById('mi').value = (cm * 0.00000621371).toFixed(2);
                document.getElementById('ft').value = (cm * 0.0328084).toFixed(2);
                document.getElementById('in').value = (cm * 0.393701).toFixed(2);
            } else if (element.id === 'mi') {
                document.getElementById('km').value = (mi / 0.621371).toFixed(2);
                document.getElementById('m').value = (mi / 0.000621371).toFixed(2);
                document.getElementById('cm').value = (mi * 160934).toFixed(2);
                document.getElementById('ft').value = (mi * 5280).toFixed(2);
                document.getElementById('in').value = (mi * 63360).toFixed(2);
            } else if (element.id === 'ft') {
                document.getElementById('km').value = (ft / 3280.84).toFixed(2);
                document.getElementById('m').value = (ft / 3.28084).toFixed(2);
                document.getElementById('cm').value = (ft * 30.48).toFixed(2);
                document.getElementById('mi').value = (ft / 5280).toFixed(2);
                document.getElementById('in').value = (ft * 12).toFixed(2);
            } else if (element.id === 'in') {
                document.getElementById('km').value = (inches / 39370.1).toFixed(2);
                document.getElementById('m').value = (inches / 39.3701).toFixed(2);
                document.getElementById('cm').value = (inches * 2.54).toFixed(2);
                document.getElementById('mi').value = (inches * 0.0000157828).toFixed(2);
                document.getElementById('ft').value = (inches / 12).toFixed(2);
            }
        }

        function convertMass(element) {
            const kg = parseFloat(document.getElementById('kg').value) || 0;
            const g = parseFloat(document.getElementById('g').value) || 0;
            const lb = parseFloat(document.getElementById('lb').value) || 0;

            if (element.id === 'kg') {
                document.getElementById('g').value = (kg * 1000).toFixed(2);
                document.getElementById('lb').value = (kg * 2.20462).toFixed(2);
            } else if (element.id === 'g') {
                document.getElementById('kg').value = (g / 1000).toFixed(2);
                document.getElementById('lb').value = (g * 0.00220462).toFixed(2);
            } else if (element.id === 'lb') {
                document.getElementById('kg').value = (lb / 2.20462).toFixed(2);
                document.getElementById('g').value = (lb / 0.00220462).toFixed(2);
            }
        }

        function convertTime(element) {
            const seconds = parseFloat(document.getElementById('seconds').value) || 0;
            const minutes = parseFloat(document.getElementById('minutes').value) || 0;
            const hours = parseFloat(document.getElementById('hours').value) || 0;

            if (element.id === 'seconds') {
                document.getElementById('minutes').value = Math.floor(seconds / 60);
                document.getElementById('hours').value = Math.floor(seconds / 3600);
            } else if (element.id === 'minutes') {
                document.getElementById('seconds').value = minutes * 60;
                document.getElementById('hours').value = Math.floor(minutes / 60);
            } else if (element.id === 'hours') {
                document.getElementById('seconds').value = hours * 3600;
                document.getElementById('minutes').value = hours * 60;
            }
        }

        function convertTemperature(element) {
            const celsius = parseFloat(document.getElementById('celsius').value) || 0;
            const fahrenheit = parseFloat(document.getElementById('fahrenheit').value) || 0;
            const kelvin = parseFloat(document.getElementById('kelvin').value) || 0;

            if (element.id === 'celsius') {
                document.getElementById('fahrenheit').value = (celsius * 9/5 + 32).toFixed(2);
                document.getElementById('kelvin').value = (celsius + 273.15).toFixed(2);
            } else if (element.id === 'fahrenheit') {
                document.getElementById('celsius').value = ((fahrenheit - 32) * 5/9).toFixed(2);
                document.getElementById('kelvin').value = (((fahrenheit - 32) * 5/9) + 273.15).toFixed(2);
            } else if (element.id === 'kelvin') {
                document.getElementById('celsius').value = (kelvin - 273.15).toFixed(2);
                document.getElementById('fahrenheit').value = ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
            }
        }