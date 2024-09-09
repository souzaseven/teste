function generateTable() {
    const num = document.getElementById('numberInput').value;
    const tableDiv = document.getElementById('multiplicationTables');
    
    if (num === '') {
        tableDiv.innerHTML = "<p>Por favor, digite um número válido.</p>";
        return;
    }
    
    let allTablesHTML = '';
    
    // Gera tabelas de 10 em 10
    for (let start = 1; start <= 100; start += 10) {
        let end = start + 9;
        let tableHTML = `<div class="multiplication-div"><h3>${num}x${start} até ${num}x${end}</h3>`;
        tableHTML += `<table><tr><th>Multiplicador</th><th>Resultado</th></tr>`;
        for (let i = start; i <= end; i++) {
            tableHTML += `<tr><td>${num} x ${i}</td><td>${num * i}</td></tr>`;
        }
        tableHTML += "</table></div>";
        allTablesHTML += tableHTML;
    }
    
    tableDiv.innerHTML = `<div class="multiplication-container">${allTablesHTML}</div>`;
}
