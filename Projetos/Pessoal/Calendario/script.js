 const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        const days = ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"];

        function generateCalendar(year) {
            const calendarContainer = document.getElementById('calendarContainer');
            const yearLabel = document.getElementById('yearLabel');
            calendarContainer.innerHTML = '';
            yearLabel.textContent = year;

            for (let month = 0; month < 12; month++) {
                const table = document.createElement('table');
                table.className = 'calendar';
                table.innerHTML = `
                    <caption>${months[month]}</caption>
                    <thead>
                        <tr>
                            ${days.map(day => `<th>${day}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${generateMonthDays(year, month)}
                    </tbody>
                `;
                calendarContainer.appendChild(table);
            }
        }

        function generateMonthDays(year, month) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDay = new Date(year, month, 1).getDay();
            let rows = '';
            let day = 1;

            for (let i = 0; i < 6; i++) {
                let cells = '';
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay) {
                        cells += '<td></td>';
                    } else if (day > daysInMonth) {
                        break;
                    } else {
                        cells += `<td>${day}</td>`;
                        day++;
                    }
                }
                rows += `<tr>${cells}</tr>`;
            }
            return rows;
        }

        function changeYear(offset) {
            const currentYear = parseInt(document.getElementById('yearLabel').textContent);
            generateCalendar(currentYear + offset);
        }

        document.getElementById('prevYear').addEventListener('click', (e) => {
            e.preventDefault();
            changeYear(-1);
        });
        document.getElementById('nextYear').addEventListener('click', (e) => {
            e.preventDefault();
            changeYear(1);
        });

        document.addEventListener('DOMContentLoaded', () => {
            const currentYear = new Date().getFullYear();
            generateCalendar(currentYear);
        });