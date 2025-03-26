function addAccident() {
    const accidentsDiv = document.getElementById('accidents');
    const newEntry = document.createElement('div');
    newEntry.className = 'accident-entry';
    newEntry.innerHTML = `
        <label>Gravidade:</label>
        <select name="accidentSeverity">
            <option value="leve">Leve</option>
            <option value="moderado">Moderado</option>
            <option value="grave">Grave</option>
        </select>
        <label>Hora:</label>
        <input type="time" name="accidentTime">
        <label>Causa:</label>
        <input type="text" name="accidentCause">
        <label>Status:</label>
        <select name="accidentStatus">
            <option value="pendente">Pendente</option>
            <option value="resolvido">Resolvido</option>
        </select>
        <button type="button" onclick="removeEntry(this)">Remover</button>
    `;
    accidentsDiv.appendChild(newEntry);
}

function addQualityIssue() {
    const issuesDiv = document.getElementById('qualityIssues');
    const newEntry = document.createElement('div');
    newEntry.className = 'quality-entry';
    newEntry.innerHTML = `
        <label>Hora:</label>
        <input type="time" name="issueTime">
        <label>Descrição:</label>
        <input type="text" name="issueDescription">
        <label>Status:</label>
        <select name="issueStatus">
            <option value="pendente">Pendente</option>
            <option value="resolvido">Resolvido</option>
        </select>
        <button type="button" onclick="removeEntry(this)">Remover</button>
    `;
    issuesDiv.appendChild(newEntry);
}

function removeEntry(button) {
    button.parentElement.remove();
}

document.getElementById('productionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        accidents: [],
        qualityIssues: [],
        quantityProduced: parseInt(document.getElementById('quantityProduced').value),
        lineStops: parseInt(document.getElementById('lineStops').value),
        operators: document.getElementById('operators').value.split(',').map(op => op.trim()),
        operatorCount: parseInt(document.getElementById('operatorCount').value)
    };

    // Coletar acidentes
    document.querySelectorAll('.accident-entry').forEach(entry => {
        formData.accidents.push({
            severity: entry.querySelector('[name="accidentSeverity"]').value,
            time: entry.querySelector('[name="accidentTime"]').value,
            cause: entry.querySelector('[name="accidentCause"]').value,
            status: entry.querySelector('[name="accidentStatus"]').value
        });
    });

    // Coletar problemas de qualidade
    document.querySelectorAll('.quality-entry').forEach(entry => {
        formData.qualityIssues.push({
            time: entry.querySelector('[name="issueTime"]').value,
            description: entry.querySelector('[name="issueDescription"]').value,
            status: entry.querySelector('[name="issueStatus"]').value
        });
    });

    try {
        const response = await fetch('http://localhost:8080/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById('result').innerHTML = `
            <p>Dados enviados com sucesso!</p>
            <p>Produtividade por operador: ${result.productivity.toFixed(2)}</p>
        `;
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Erro ao enviar dados: ${error.message}</p>`;
    }
});