  // Configuração do Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAQrNAKoebgCP0hoWeiC_kKyrCNBqTVeys",
            authDomain: "bloco-de-notas-33a84.firebaseapp.com",
            projectId: "bloco-de-notas-33a84",
            storageBucket: "bloco-de-notas-33a84.appspot.com",
            messagingSenderId: "172643861415",
            appId: "1:172643861415:web:03b693b7ac9321fdf06c82",
            measurementId: "G-GKFLFY85VC"
        };

        // Inicializar Firebase
        const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();


window.onload = function () {
    const notepad = document.getElementById('notepad');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const recoverBtn = document.getElementById('recoverBtn');
    const colorPicker = document.getElementById('colorPicker');

    // Referência ao documento no Firestore
    const docRef = db.collection('notes').doc('userNote');

    // Carregar o conteúdo salvo do Firebase ao abrir a página
    const loadNote = () => {
        docRef.get().then((doc) => {
            if (doc.exists) {
                notepad.value = doc.data().noteContent;
                notepad.style.color = doc.data().noteColor || '#000000'; // Define a cor do texto salva, se houver
                colorPicker.value = doc.data().noteColor || '#000000'; // Atualiza o picker com a cor salva
                alert('Conteúdo carregado do Firebase!');
            }
        }).catch((error) => {
            console.error('Erro ao carregar a nota: ', error);
        });
    };

    // Função para salvar automaticamente no Firebase
    const saveNote = () => {
        const content = notepad.value;
        const color = colorPicker.value; // Salva a cor escolhida
        docRef.set({
            noteContent: content,
            noteColor: color // Salva a cor do texto no Firebase
        }).then(() => {
            alert('Conteúdo salvo no Firebase!');
        }).catch((error) => {
            console.error('Erro ao salvar no Firebase: ', error);
        });
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

    // Carregar conteúdo salvo automaticamente
    loadNote();

    // Limpar o conteúdo ao clicar em "Limpar"
    clearBtn.addEventListener('click', () => {
        if (confirm('Tem certeza de que deseja limpar o conteúdo?')) {
            notepad.value = '';
        }
    });

    // Recuperar o conteúdo antigo ao clicar no botão "Recuperar Conteúdo Antigo"
    recoverBtn.addEventListener('click', loadNote);

    // Salvar automaticamente ao digitar
    notepad.addEventListener('input', () => {
        saveNote();
    });

    // Alterar a cor do texto conforme a escolha do usuário
    colorPicker.addEventListener('input', () => {
        notepad.style.color = colorPicker.value;
        saveNote(); // Salva automaticamente a cor escolhida
    });
};
