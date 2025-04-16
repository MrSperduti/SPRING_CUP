document.getElementById('editor-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const partita = {
        giornata: document.getElementById('giornata').value,
        data: document.getElementById('data').value,
        orario: document.getElementById('orario').value,
        campo: document.getElementById('campo').value,
        squadra1: document.getElementById('squadra1').value,
        squadra2: document.getElementById('squadra2').value,
        golSquadra1: document.getElementById('golSquadra1').value,
        golSquadra2: document.getElementById('golSquadra2').value
    };

    fetch('dati.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(partita)
    }).then(response => response.json())
      .then(data => {
          alert('Partita aggiunta!');
          document.getElementById('editor-form').reset();
      });
});