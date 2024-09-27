   const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const secondHand = document.querySelector('.second-hand');
        const currentDateElem = document.getElementById('current-date');

        const getTime = () => {
            const date = new Date();
            return {
                hours: date.getHours() % 12,
                minutes: date.getMinutes(),
                seconds: date.getSeconds(),
                day: String(date.getDate()).padStart(2, '0'),
                month: String(date.getMonth() + 1).padStart(2, '0'),
                year: date.getFullYear(),
            }
        }

        const updateClock = () => {
            const { hours, minutes, seconds, day, month, year } = getTime();
            secondHand.style.transform = `translate(0, -50%) rotate(${seconds * 6}deg)`;
            minuteHand.style.transform = `translate(0, -50%) rotate(${minutes * 6 + seconds / 10}deg)`;
            hourHand.style.transform = `translate(0, -50%) rotate(${hours * 30 + minutes / 2}deg)`;
            currentDateElem.textContent = `${day}/${month}/${year}`;
        }

        setInterval(updateClock, 1000);
        updateClock();