fetch('dati.json')
    .then(response => response.json())
    .then(data => {
        const partite = data.partite;
        const calendarioDiv = document.getElementById('calendario');
        const giornate = {};
        
        partite.forEach(partita => {
            if (!giornate[partita.giornata]) {
                giornate[partita.giornata] = [];
            }
            giornate[partita.giornata].push(partita);
        });

        for (let giornata in giornate) {
            const giornataDiv = document.createElement('div');
            giornataDiv.id = `giornata-${giornata}`;
            const giornataTitle = document.createElement('h3');
            giornataTitle.textContent = `Giornata ${giornata}`;
            giornataDiv.appendChild(giornataTitle);

            giornate[giornata].forEach(partita => {
                const partitaDiv = document.createElement('div');
                partitaDiv.textContent = `${partita.data} - ${partita.squadra1} vs ${partita.squadra2} (${partita.golSquadra1} - ${partita.golSquadra2})`;
                giornataDiv.appendChild(partitaDiv);
            });

            calendarioDiv.appendChild(giornataDiv);
        }
    });