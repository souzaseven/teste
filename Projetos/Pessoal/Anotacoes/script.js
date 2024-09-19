 window.onload = function () {
            const notepad = document.getElementById('notepad');
            const saveBtn = document.getElementById('saveBtn');
            const clearBtn = document.getElementById('clearBtn');
            const recoverBtn = document.getElementById('recoverBtn');
            const colorPicker = document.getElementById('colorPicker');

            let lastClearedContent = null; // Para armazenar o conteúdo antigo

            // Função para carregar conteúdo salvo do localStorage
            const loadNote = () => {
                const savedContent = localStorage.getItem('notepadContent');
                const savedColor = localStorage.getItem('notepadColor');
                if (savedContent) {
                    notepad.value = savedContent; // Carrega o conteúdo salvo
                }
                if (savedColor) {
                    notepad.style.color = savedColor; // Define a cor do texto salvo
                    colorPicker.value = savedColor; // Define o valor do seletor de cor
                }
            };

            // Carregar conteúdo salvo automaticamente ao carregar a página
            loadNote();

            // Função para salvar conteúdo e cor no localStorage
            const saveNote = () => {
                const content = notepad.value;
                const color = colorPicker.value;
                localStorage.setItem('notepadContent', content); // Salva o conteúdo
                localStorage.setItem('notepadColor', color); // Salva a cor
            };

            // Função para salvar como arquivo .txt
            const saveAsFile = () => {
                const blob = new Blob([notepad.value], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'meu-bloco-de-notas.txt';
                link.click();
            };

            // Salvar conteúdo ao clicar no botão "Salvar como .txt"
            saveBtn.addEventListener('click', saveAsFile);

            // Limpar conteúdo ao clicar em "Limpar"
            clearBtn.addEventListener('click', () => {
                if (confirm('Tem certeza de que deseja limpar o conteúdo?')) {
                    lastClearedContent = notepad.value; // Armazena o conteúdo antes de limpar
                    localStorage.removeItem('notepadContent');
                    localStorage.removeItem('notepadColor');
                    notepad.value = '';
                    notepad.style.color = '#000000'; // Reseta a cor para o padrão
                }
            });

            // Recuperar conteúdo salvo ao clicar no botão "Recuperar Conteúdo"
            recoverBtn.addEventListener('click', () => {
                if (lastClearedContent) {
                    notepad.value = lastClearedContent;
                    alert('Conteúdo recuperado!');
                } else {
                    alert('Não há conteúdo antigo para recuperar.');
                }
            });

            // Salvar automaticamente ao digitar
            notepad.addEventListener('input', saveNote);

            // Alterar a cor do texto conforme a escolha do usuário
            colorPicker.addEventListener('input', () => {
                notepad.style.color = colorPicker.value;
                saveNote(); // Salva automaticamente a cor escolhida
            });
        };