function generateImage() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            const number = document.getElementById('numberInput').value;
            const letter = document.getElementById('letterInput').value;
            const combined = document.getElementById('combinedInput').value;

            const shape = document.getElementById('shape').value;
            const shapeColor = document.getElementById('circleColor').value;
            const textColor = document.getElementById('numberColor').value;

            let displayText = combined || (number + letter);

            canvas.width = 300;
            canvas.height = 300;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = shapeColor;
            if (shape === 'circle') {
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, 120, 0, Math.PI * 2, false);
                ctx.fill();
            } else if (shape === 'square') {
                ctx.fillRect((canvas.width / 2) - 120, (canvas.height / 2) - 120, 240, 240);
            }

            let fontSize = 120;
            let textWidth;
            let textHeight;

            // Ajuste para múltiplas linhas e para reduzir a fonte se exceder o limite
            function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
                const words = text.split('');
                let line = '';
                const lines = [];
                for (let i = 0; i < words.length; i++) {
                    const testLine = line + words[i];
                    const metrics = ctx.measureText(testLine);
                    const testWidth = metrics.width;
                    if (testWidth > maxWidth && i > 0) {
                        lines.push(line);
                        line = words[i];
                    } else {
                        line = testLine;
                    }
                }
                lines.push(line);
                return lines;
            }

            // Reduce font size and wrap text to fit within shape
            do {
                ctx.font = `bold ${fontSize}px Arial`;
                const lines = wrapText(ctx, displayText, 0, 0, 240, fontSize);
                textWidth = Math.max(...lines.map(line => ctx.measureText(line).width));
                textHeight = lines.length * fontSize;
                fontSize -= 10;
            } while ((textWidth > 2 * 120 || textHeight > 2 * 120) && fontSize > 20);

            const lines = wrapText(ctx, displayText, 0, 0, 240, fontSize);

            // Draw text (number/letter)
            ctx.fillStyle = textColor;
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            lines.forEach((line, index) => {
                ctx.fillText(line, canvas.width / 2, canvas.height / 2 - (lines.length - 1) * (fontSize / 2) + index * fontSize);
            });

            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = canvas.toDataURL('image/png');

            const iconDownloadLink = document.getElementById('iconDownloadLink');
            iconDownloadLink.href = canvas.toDataURL('image/x-icon');
        }

        document.getElementById('numberInput').addEventListener('input', generateImage);
        document.getElementById('letterInput').addEventListener('input', generateImage);
        document.getElementById('combinedInput').addEventListener('input', generateImage);
        document.getElementById('shape').addEventListener('input', generateImage);
        document.getElementById('circleColor').addEventListener('input', generateImage);
        document.getElementById('numberColor').addEventListener('input', generateImage);

        document.getElementById('clearButton').addEventListener('click', () => {
            document.getElementById('numberInput').value = '';
            document.getElementById('letterInput').value = '';
            document.getElementById('combinedInput').value = '';
            generateImage();
        });

        generateImage();