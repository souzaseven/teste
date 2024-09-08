function calcularHorasTrabalhadas() {
    // Obter valores de entrada
    const startTime1 = document.getElementById('start-time1').value;
    const endTime1 = document.getElementById('end-time1').value;
    const startTime2 = document.getElementById('start-time2').value;
    const endTime2 = document.getElementById('end-time2').value;
    let breakTime = parseInt(document.getElementById('break-time').value) || 0;

    // Se a entrada ou saída do primeiro turno não estiverem preenchidas, não calcular
    if (!startTime1 || !endTime1) {
        document.getElementById('result').innerText = 'Insira os horários do primeiro turno.';
        return;
    }

    // Converta os horários para objetos Date para calcular a diferença
    const start1 = new Date(`01/01/2000 ${startTime1}`);
    const end1 = new Date(`01/01/2000 ${endTime1}`);
    let totalHorasTrabalhadas = 0;

    // Calcular as horas do primeiro turno
    const diffTurno1 = (end1 - start1) / (1000 * 60); // Diferença em minutos do primeiro turno
    const horasTurno1 = Math.floor(diffTurno1 / 60);
    const minutosTurno1 = Math.floor(diffTurno1 % 60);

    // Exibir horas trabalhadas no primeiro turno
    document.getElementById('turno1-details').innerText = `Horas no primeiro turno: ${horasTurno1}h ${minutosTurno1}min`;
    totalHorasTrabalhadas += diffTurno1;

    // Se a entrada e saída do segundo turno forem preenchidas, calcular o segundo turno
    if (startTime2 && endTime2) {
        const start2 = new Date(`01/01/2000 ${startTime2}`);
        const end2 = new Date(`01/01/2000 ${endTime2}`);
        const diffTurno2 = (end2 - start2) / (1000 * 60); // Diferença em minutos do segundo turno
        const horasTurno2 = Math.floor(diffTurno2 / 60);
        const minutosTurno2 = Math.floor(diffTurno2 % 60);

        document.getElementById('turno2-details').innerText = `Horas no segundo turno: ${horasTurno2}h ${minutosTurno2}min`;
        totalHorasTrabalhadas += diffTurno2;
    } else {
        document.getElementById('turno2-details').innerText = '';
    }

    // Se a pausa não for fornecida, calcular automaticamente o intervalo entre turnos
    if (!breakTime && startTime2) {
        const pausaAutomatica = (new Date(`01/01/2000 ${startTime2}`) - end1) / (1000 * 60); // Pausa em minutos
        if (pausaAutomatica > 0) {
            breakTime = pausaAutomatica;
            document.getElementById('break-result').innerText = `Pausa automática: ${breakTime.toFixed(0)} minutos`;
        } else {
            document.getElementById('break-result').innerText = 'Pausa inválida ou negativa.';
        }
    } else {
        document.getElementById('break-result').innerText = '';
    }

    // Subtrair o tempo de pausa, se houver
    totalHorasTrabalhadas = (totalHorasTrabalhadas - breakTime) / 60;

    // Exibir o resultado
    if (totalHorasTrabalhadas > 0) {
        document.getElementById('result').innerText = `Total de horas trabalhadas: ${totalHorasTrabalhadas.toFixed(2)} horas.`;
    } else {
        document.getElementById('result').innerText = 'Os horários são inválidos ou a pausa é muito longa.';
    }
}