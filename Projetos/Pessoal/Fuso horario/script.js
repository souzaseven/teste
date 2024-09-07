function updateClock(clockId, timezoneOffset) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + (3600000 * timezoneOffset));
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    const seconds = String(localTime.getSeconds()).padStart(2, '0');
    const date = localTime.toLocaleDateString();

    document.getElementById(clockId + "-time").textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById(clockId + "-date").textContent = date;
}

function updateAllClocks() {
    updateClock('utc-12', -12);
    updateClock('utc-11', -11);
    updateClock('utc-10', -10);
    updateClock('utc-9', -9);
    updateClock('utc-8', -8);
    updateClock('utc-7', -7);
    updateClock('utc-6', -6);
    updateClock('utc-5', -5);
    updateClock('utc-4', -4);
    updateClock('tangara', -4);
    updateClock('utc-3', -3);
    updateClock('utc-2', -2);
    updateClock('utc-1', -1);
    updateClock('utc-0', 0);
    updateClock('utc1', 1);
    updateClock('utc2', 2);
    updateClock('utc3', 3);
    updateClock('utc4', 4);
    updateClock('utc5', 5);
    updateClock('utc6', 6);
    updateClock('utc7', 7);
    updateClock('utc8', 8);
    updateClock('utc9', 9);
    updateClock('utc10', 10);
    updateClock('utc11', 11);
    updateClock('utc12', 12);
}

setInterval(updateAllClocks, 1000);