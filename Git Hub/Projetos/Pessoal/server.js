// server.js
const express = require('express');
const os = require('os');
const path = require('path');

const app = express();

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para obter o IP local
app.get('/get-local-ip', (req, res) => {
    const networkInterfaces = os.networkInterfaces();
    let localIp = 'Não foi possível obter o IP local.';

    for (const interfaceKey in networkInterfaces) {
        const interface = networkInterfaces[interfaceKey];
        for (const alias of interface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                localIp = alias.address;
                break;
            }
        }
    }

    res.json({ ip: localIp });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

