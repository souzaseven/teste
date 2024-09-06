function filterProjects() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const projectItems = document.querySelectorAll('.project-item');
    let found = false;

    projectItems.forEach(function(item) {
        const text = item.textContent.toLowerCase();
        item.classList.remove('highlighted');

        if (text.includes(input)) {
            if (!found) {
                found = true;
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                item.classList.add('highlighted-temp');
            }
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });

    setTimeout(function() {
        document.querySelectorAll('.highlighted-temp').forEach(function(item) {
            item.classList.remove('highlighted-temp');
            item.classList.add('highlighted');
        });
    }, 2000); // O tempo pode ser ajustado
}