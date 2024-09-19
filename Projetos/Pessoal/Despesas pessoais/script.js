  // Evento de adicionar despesa
        document.getElementById('addExpense').addEventListener('click', addExpense);
        // Evento de limpar todas as despesas
        document.getElementById('clearAllBtn').addEventListener('click', clearAll);

        // Inicializar lista de despesas do localStorage ou criar uma nova
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        // Função para adicionar despesa
        function addExpense() {
            const expense = document.getElementById('expense').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const category = document.getElementById('category').value;

            // Validação de entradas
            if (expense && amount && category) {
                const expenseItem = { expense, amount, category, date: new Date().toLocaleDateString() };
                expenses.push(expenseItem); // Adiciona despesa na lista
                localStorage.setItem('expenses', JSON.stringify(expenses)); // Salva no localStorage
                renderExpenses(); // Atualiza lista de despesas na tela
                updateCharts(); // Atualiza gráficos
            } else {
                alert("Preencha todos os campos.");
            }
        }

        // Função para renderizar lista de despesas
        function renderExpenses() {
            const expenseList = document.getElementById('expense-list');
            expenseList.innerHTML = ''; // Limpa lista anterior

            // Exibe cada despesa na lista
            expenses.forEach((expenseItem, index) => {
                const expenseDiv = document.createElement('div');
                expenseDiv.classList.add('expense-item');
                expenseDiv.innerHTML = `
                    <strong>${expenseItem.expense}</strong> 
                    - R$ ${expenseItem.amount.toFixed(2)} 
                    <em>(${expenseItem.category})</em>
                    <span style="float: right;">${expenseItem.date}</span>
                `;

                // Permite editar a despesa ao clicar
                expenseDiv.addEventListener('click', () => {
                    const newDescription = prompt("Editar Descrição:", expenseItem.expense);
                    const newAmount = parseFloat(prompt("Editar Valor:", expenseItem.amount));
                    const newCategory = prompt("Editar Categoria:", expenseItem.category);

                    // Valida e atualiza a despesa
                    if (newDescription && !isNaN(newAmount) && newCategory) {
                        expenses[index] = { ...expenseItem, expense: newDescription, amount: newAmount, category: newCategory };
                        localStorage.setItem('expenses', JSON.stringify(expenses)); // Atualiza no localStorage
                        renderExpenses();
                        updateCharts();
                    }
                });

                expenseList.appendChild(expenseDiv); // Adiciona na lista
            });
        }

        // Criação dos gráficos
        let pieChart, barChart;

        function createCharts() {
            const pieCtx = document.getElementById('pieChart').getContext('2d');
            const barCtx = document.getElementById('barChart').getContext('2d');

            // Gráfico de Pizza
            pieChart = new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Despesas por Categoria',
                        data: [],
                        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0', '#f77825'],
                    }]
                },
                options: {}
            });

            // Gráfico de Barras
            barChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Despesas por Categoria',
                        data: [],
                        backgroundColor: '#36a2eb',
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Atualiza os gráficos com os dados de despesas
        function updateCharts() {
            const categoryTotals = {};

            // Soma os valores por categoria
            expenses.forEach(({ category, amount }) => {
                if (!categoryTotals[category]) categoryTotals[category] = 0;
                categoryTotals[category] += amount;
            });

            const categoryLabels = Object.keys(categoryTotals);
            const categoryValues = Object.values(categoryTotals);

            // Organiza os dados em ordem decrescente para o gráfico de barras
            const sortedCategories = categoryLabels.sort((a, b) => categoryTotals[b] - categoryTotals[a]);

            // Atualiza gráfico de pizza
            pieChart.data.labels = categoryLabels;
            pieChart.data.datasets[0].data = categoryValues;
            pieChart.update();

            // Atualiza gráfico de barras
            barChart.data.labels = sortedCategories;
            barChart.data.datasets[0].data = sortedCategories.map(cat => categoryTotals[cat]);
            barChart.update();
        }

        // Limpa todas as despesas e gráficos
        function clearAll() {
            if (confirm('Tem certeza que deseja limpar todas as despesas?')) {
                localStorage.removeItem('expenses'); // Remove do localStorage
                expenses = []; // Reseta a lista de despesas
                renderExpenses(); // Atualiza lista
                updateCharts(); // Atualiza gráficos
            }
        }

        // Redimensiona o gráfico ao clicar (expande para tela cheia)
        document.querySelectorAll('canvas').forEach(canvas => {
            canvas.addEventListener('click', function () {
                this.classList.toggle('fullscreen'); // Expande ou retorna ao normal
            });
        });

        // Carrega os dados salvos do localStorage ao abrir a página
        renderExpenses();
        createCharts();
        updateCharts();