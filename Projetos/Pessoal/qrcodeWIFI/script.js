 function generateQRCode() {
            var network = document.getElementById('wifi-network').value.trim(); // Remove espaços desnecessários
            var password = document.getElementById('wifi-password').value.trim();
            var security = document.getElementById('wifi-security').value;

            // Verifica se o nome da rede está preenchido
            if (!network) {
                alert('Por favor, insira o nome da rede.');
                return;
            }

            // Escapa espaços no nome da rede
            var escapedNetwork = network.replace(/ /g, "\\ ");  // Trata os espaços no nome da rede

            // Monta o conteúdo do QR Code conforme o tipo de segurança
            var qrContent = '';
            if (security === 'nopass') {
                qrContent = `WIFI:T:nopass;S:${escapedNetwork};;`;
            } else {
                qrContent = `WIFI:T:${security};S:${escapedNetwork};P:${password};;`;
            }

            // Limpa o QR Code existente
            document.getElementById('qrcode').innerHTML = '';

            // Gera o QR Code com o conteúdo correto
            $('#qrcode').qrcode({
                text: qrContent
            });

            // Mostra os botões de ação (copiar, salvar, compartilhar)
            document.getElementById('actions').style.display = 'flex';
        }

        document.getElementById('copy').addEventListener('click', function() {
            html2canvas(document.getElementById('qrcode')).then(canvas => {
                canvas.toBlob(blob => {
                    const item = new ClipboardItem({ 'image/png': blob });
                    navigator.clipboard.write([item]);
                });
            });
        });

        document.getElementById('save').addEventListener('click', function() {
            html2canvas(document.getElementById('qrcode')).then(canvas => {
                const link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        });

        document.getElementById('share').addEventListener('click', async function() {
            try {
                const canvas = await html2canvas(document.getElementById('qrcode'));
                canvas.toBlob(async (blob) => {
                    const file = new File([blob], 'qrcode.png', { type: 'image/png' });
                    const shareData = {
                        files: [file],
                    };
                    await navigator.share(shareData);
                });
            } catch (err) {
                alert('O compartilhamento não é suportado ou ocorreu um erro.');
            }
        });