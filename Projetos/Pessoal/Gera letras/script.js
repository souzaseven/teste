function generateImage() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const textInput = document.getElementById('textInput').value;
    const circleColor = document.getElementById('circleColor').value;
    const textColor = document.getElementById('textColor').value;

    // Set canvas size to fit the display area
    canvas.width = 512;
    canvas.height = 512;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, Math.PI * 2, false);
    ctx.fillStyle = circleColor;
    ctx.fill();

    // Determine font size based on text length
    let fontSize = 200; // Default font size
    let textWidth;

    do {
        ctx.font = `bold ${fontSize}px Arial`;
        textWidth = ctx.measureText(textInput).width;
        fontSize -= 10; // Reduce font size until text fits
    } while (textWidth > 2 * 200 && fontSize > 20);

    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textInput, canvas.width / 2, canvas.height / 2);

    // Set up download links
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = canvas.toDataURL('image/png');
    
    const iconDownloadLink = document.getElementById('iconDownloadLink');
    iconDownloadLink.href = canvas.toDataURL('image/x-icon');
}

// Event listeners for automatic updates
document.getElementById('textInput').addEventListener('input', generateImage);
document.getElementById('circleColor').addEventListener('input', generateImage);
document.getElementById('textColor').addEventListener('input', generateImage);

// Initial image generation
generateImage();
