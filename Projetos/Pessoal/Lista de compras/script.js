let user = null;

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    user = {
        name: profile.getName(),
        email: profile.getEmail()
    };
    alert(`Bem-vindo, ${user.name}`);
    loadList(); // Carrega a lista do usuário após o login
}

function addItem() {
    const itemInput = document.getElementById('item-input');
    const itemText = itemInput.value.trim();
    if (itemText === '') return;

    let quantity = '';
    if (confirm('Deseja adicionar uma quantidade para o item?')) {
        quantity = prompt('Digite a quantidade:', '1');
    }

    const list = document.getElementById('shopping-list');
    const listItem = document.createElement('li');
    listItem.className = 'list-item';

    const itemContent = document.createElement('input');
    itemContent.type = 'text';
    itemContent.value = quantity ? `${itemText} (Quantidade: ${quantity})` : itemText;
    itemContent.readOnly = true;
    listItem.appendChild(itemContent);

    const confirmIcon = document.createElement('span');
    confirmIcon.className = 'confirm-icon';
    confirmIcon.textContent = '✅';
    confirmIcon.addEventListener('click', () => {
        listItem.classList.toggle('confirmed');
        saveList();
    });
    listItem.appendChild(confirmIcon);

    const removeIcon = document.createElement('span');
    removeIcon.className = 'remove-icon';
    removeIcon.textContent = '❌';
    removeIcon.addEventListener('click', () => {
        listItem.remove();
        saveList();
    });
    listItem.appendChild(removeIcon);

    list.appendChild(listItem);
    itemInput.value = '';
    saveList();
}

function clearAll() {
    const list = document.getElementById('shopping-list');
    list.innerHTML = '';
    saveList();
}

function saveList() {
    if (user) {
        const items = Array.from(document.querySelectorAll('.list-item')).map(item => ({
            text: item.querySelector('input[type="text"]').value,
            checked: item.classList.contains('confirmed')
        }));
        localStorage.setItem(`shopping-list-${user.email}`, JSON.stringify(items));
    }
}

function loadList() {
    if (user) {
        const savedItems = JSON.parse(localStorage.getItem(`shopping-list-${user.email}`) || '[]');
        const list = document.getElementById('shopping-list');
        savedItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-item';

            const itemContent = document.createElement('input');
            itemContent.type = 'text';
            itemContent.value = item.text;
            itemContent.readOnly = true;
            if (item.checked) listItem.classList.add('confirmed');
            listItem.appendChild(itemContent);

            const confirmIcon = document.createElement('span');
            confirmIcon.className = 'confirm-icon';
            confirmIcon.textContent = '✅';
            confirmIcon.addEventListener('click', () => {
                listItem.classList.toggle('confirmed');
                saveList();
            });
            listItem.appendChild(confirmIcon);

            const removeIcon = document.createElement('span');
            removeIcon.className = 'remove-icon';
            removeIcon.textContent = '❌';
            removeIcon.addEventListener('click', () => {
                listItem.remove();
                saveList();
            });
            listItem.appendChild(removeIcon);

            list.appendChild(listItem);
        });
    }
}

window.onload = loadList;
