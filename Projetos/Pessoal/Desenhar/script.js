const canvas = document.querySelector('.drawing-board canvas');
    const ctx = canvas.getContext('2d');

    let currentTool = 'brush';
    let currentColor = '#4A98F7';
    let fillColor = false;
    let size = 5;
    let isDrawing = false;
    let startX, startY;

    document.querySelectorAll('.tool').forEach(tool => {
        tool.addEventListener('click', () => {
            document.querySelectorAll('.tool').forEach(t => t.classList.remove('active'));
            tool.classList.add('active');
            currentTool = tool.id;
        });
    });

    document.getElementById('color-picker').addEventListener('input', (e) => {
        currentColor = e.target.value;
    });

    document.querySelector('.clear-canvas').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.querySelector('.save-img').addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        startX = e.offsetX;
        startY = e.offsetY;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        if (currentTool === 'brush') {
            ctx.lineWidth = size;
            ctx.strokeStyle = currentColor;
            ctx.lineCap = 'round';
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        } else if (currentTool === 'eraser') {
            ctx.clearRect(e.offsetX, e.offsetY, size, size);
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        if (currentTool !== 'brush' && currentTool !== 'eraser') {
            const endX = event.offsetX;
            const endY = event.offsetY;
            drawShape(currentTool, startX, startY, endX - startX, endY - startY);
        }
    });

    function drawShape(shape, x, y, width, height) {
        ctx.fillStyle = fillColor ? currentColor : 'transparent';
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (shape === 'rectangle') {
            ctx.rect(x, y, width, height);
        } else if (shape === 'circle') {
            ctx.arc(x + width / 2, y + height / 2, Math.abs(width) / 2, 0, Math.PI * 2);
        } else if (shape === 'triangle') {
            ctx.moveTo(x + width / 2, y);
            ctx.lineTo(x, y + height);
            ctx.lineTo(x + width, y + height);
            ctx.closePath();
        } else if (shape === 'line') {
            ctx.moveTo(x, y);
            ctx.lineTo(x + width, y + height);
        } else if (shape === 'pentagon') {
            drawPolygon(ctx, 5, x + width / 2, y + height / 2, Math.abs(width) / 2);
        } else if (shape === 'hexagon') {
            drawPolygon(ctx, 6, x + width / 2, y + height / 2, Math.abs(width) / 2);
        } else if (shape === 'star') {
            drawStar(ctx, x + width / 2, y + height / 2, Math.abs(width) / 2, Math.abs(width) / 4, 5);
        } else if (shape === 'arrow') {
            drawArrow(ctx, x, y, width, height);
        }
        if (fillColor) {
            ctx.fill();
        }
        ctx.stroke();
    }

    function drawPolygon(ctx, sides, centerX, centerY, radius) {
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
    }

    function drawStar(ctx, cx, cy, outerRadius, innerRadius, points) {
        const step = Math.PI / points;
        ctx.beginPath();
        for (let i = 0; i < 2 * points; i++) {
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const x = cx + r * Math.cos(i * step);
            const y = cy + r * Math.sin(i * step);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
    }

    function drawArrow(ctx, x, y, width, height) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y + height / 2);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x + width - 10, y + height / 2);
        ctx.closePath();
    }