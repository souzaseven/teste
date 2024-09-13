document.getElementById('start').addEventListener('click', startCountdown);

function startCountdown() {
    const title = document.getElementById('title').value;
    const datetime = document.getElementById('datetime').value;
    const error = document.getElementById('error');
    const countdownDisplay = document.getElementById('countdown');

    if (!title || !datetime) {
        error.textContent = 'Por favor, preencha todos os campos.';
        error.style.display = 'block';
        return;
    }

    error.style.display = 'none';
    countdownDisplay.textContent = '';

    const endTime = new Date(datetime).getTime();
    if (isNaN(endTime)) {
        error.textContent = 'Data e horário inválidos.';
        error.style.display = 'block';
        return;
    }

    const countdownTitle = title;
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownDisplay.innerHTML = `${countdownTitle} já chegou!`;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownDisplay.innerHTML = `${countdownTitle} em ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}