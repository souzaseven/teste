 document.addEventListener('DOMContentLoaded', () => {
            const dropZone = document.getElementById('drop-zone');
            const fileInput = document.getElementById('file-upload');
            const downloadLink = document.getElementById('download-link');
            let selectedFiles = [];

            // Gerenciar o campo de upload de arquivo com arrastar e soltar
            dropZone.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', handleFileSelect);
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('hover');
            });
            dropZone.addEventListener('dragleave', () => dropZone.classList.remove('hover'));
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                handleFileSelect(e.dataTransfer);
            });

            // Lidar com a seleção de arquivo
            function handleFileSelect(e) {
                const files = e.files || e.target.files;
                if (files.length > 0) {
                    selectedFiles = files;
                    dropZone.textContent = `${files.length} arquivo(s) selecionado(s)`;
                    processFiles(selectedFiles); // Processa automaticamente após selecionar
                }
            }

            // Processar arquivos e compactar
            async function processFiles(files) {
                const zip = new JSZip();
                const status = document.getElementById('status');
                status.textContent = 'Processando...';

                // Adicionar cada arquivo ao arquivo ZIP
                Array.from(files).forEach(file => {
                    zip.file(file.name, file);
                });

                // Gerar o arquivo ZIP
                try {
                    const zipBlob = await zip.generateAsync({ type: 'blob' });
                    const url = URL.createObjectURL(zipBlob);
                    downloadLink.href = url;
                    downloadLink.download = 'arquivos_compactados.zip';
                    downloadLink.style.display = 'block';
                    downloadLink.click(); // Baixa automaticamente o arquivo ZIP
                    status.textContent = ''; // Limpa o status após concluir
                } catch (error) {
                    status.textContent = 'Erro ao compactar os arquivos.';
                }
            }
        });