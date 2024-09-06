const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Rota principal para servir o frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para processar o download
app.post('/download-video', (req, res) => {
    const videoURL = req.body.video_url;
    
    if (!ytdl.validateURL(videoURL)) {
        return res.status(400).send('URL do YouTube inválido');
    }

    const videoID = ytdl.getURLVideoID(videoURL);
    const outputFileName = `${videoID}.mp4`;

    res.header('Content-Disposition', `attachment; filename="${outputFileName}"`);

    const stream = ytdl(videoURL, { quality: 'highestvideo' });

    ffmpeg(stream)
        .videoCodec('libx264')
        .audioCodec('aac')
        .format('mp4')
        .on('error', (err) => {
            console.error('Erro ao processar o vídeo:', err);
            res.status(500).send('Erro ao processar o vídeo');
        })
        .pipe(res, { end: true });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
