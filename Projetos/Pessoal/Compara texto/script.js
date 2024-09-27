 document.getElementById('baseText').addEventListener('input', compareTexts);
        document.getElementById('newText').addEventListener('input', compareTexts);

        function compareTexts() {
            const baseText = document.getElementById('baseText').value;
            const newText = document.getElementById('newText').value;

            const baseLines = baseText.split('\n');
            const newLines = newText.split('\n');
            let outputHtml = '<table class="diff"><thead><tr><th>Texto Base</th><th>Novo Texto</th></tr></thead><tbody>';

            baseLines.forEach((line, index) => {
                const newLine = newLines[index] || '';
                if (line !== newLine) {
                    outputHtml += `<tr><td class="replace">${highlightDifferences(line, newLine)}</td><td class="replace">${highlightDifferences(newLine, line)}</td></tr>`;
                } else {
                    outputHtml += `<tr><td class="unchanged">${line}</td><td class="unchanged">${newLine}</td></tr>`;
                }
            });

            newLines.slice(baseLines.length).forEach(line => {
                outputHtml += `<tr><td class="insert"></td><td class="insert">${line}</td></tr>`;
            });

            outputHtml += '</tbody></table>';
            document.getElementById('diffoutput').innerHTML = outputHtml;
        }

        function highlightDifferences(text1, text2) {
            const words1 = text1.split(' ');
            const words2 = text2.split(' ');

            return words1.map((word, index) => {
                if (word !== words2[index]) {
                    return `<span class="highlight">${word}</span>`;
                }
                return word;
            }).join(' ');
        }