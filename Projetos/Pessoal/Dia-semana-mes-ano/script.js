  const holidays = [
            { name: 'Ano Novo', date: new Date(new Date().getFullYear(), 0, 1) },
            { name: 'Carnaval', date: new Date(new Date().getFullYear(), 1, 12) },
            { name: 'Páscoa', date: new Date(new Date().getFullYear(), 3, 9) },
            { name: 'Dia do Trabalho', date: new Date(new Date().getFullYear(), 4, 1) },
            { name: 'Independência do Brasil', date: new Date(new Date().getFullYear(), 8, 7) },
            { name: 'Nossa Senhora Aparecida', date: new Date(new Date().getFullYear(), 9, 12) },
            { name: 'Finados', date: new Date(new Date().getFullYear(), 10, 2) },
            { name: 'Natal', date: new Date(new Date().getFullYear(), 11, 25) },
        ];

        function updateDateTime() {
            const now = new Date();

            // Data e hora formatadas
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = now.toLocaleDateString('pt-BR', options);
            const formattedTime = now.toLocaleTimeString('pt-BR');

            // Cálculo do dia do ano
            const start = new Date(now.getFullYear(), 0, 0);
            const diff = now - start + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
            const oneDay = 1000 * 60 * 60 * 24;
            const dayOfYear = Math.floor(diff / oneDay);

            // Cálculo da semana do ano
            const oneJan = new Date(now.getFullYear(), 0, 1);
            const numberOfDays = Math.floor((now - oneJan) / oneDay);
            const weekOfYear = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);

            // Cálculo do mês do ano
            const monthOfYear = now.getMonth() + 1;

            // Encontrar o próximo feriado
            const nextHoliday = holidays.find(holiday => holiday.date >= now);
            const diffHoliday = Math.ceil((nextHoliday.date - now) / oneDay);

            // Exibir as informações
            document.getElementById('current-date').textContent = `Data: ${formattedDate}`;
            document.getElementById('current-time').textContent = `Hora: ${formattedTime}`;
            document.getElementById('day-of-year').textContent = `Dia ${dayOfYear} de 365`;
            document.getElementById('week-of-year').textContent = `Semana ${weekOfYear} de 52`;
            document.getElementById('month-of-year').textContent = `Mês ${monthOfYear} de 12`;
            document.getElementById('next-holiday').textContent = `Próximo Feriado: ${nextHoliday.name} em ${diffHoliday} dias`;
        }

        setInterval(updateDateTime, 1000); // Atualizar a cada segundo
        updateDateTime(); // Atualizar imediatamente ao carregar