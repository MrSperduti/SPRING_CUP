
async function loadCalendar() {
  const cat = new URLSearchParams(location.search).get('categoria');
  const res = await fetch('dati.json');
  const dati = await res.json();
  const div = document.getElementById('calendario');

  const partite = dati[cat]?.partite || [];
  const finali = dati[cat]?.finali || [];

  const giornate = {};
  partite.forEach(p => {
    if (!p.giornata) return;
    if (!giornate[p.giornata]) giornate[p.giornata] = [];
    giornate[p.giornata].push(p);
  });

  Object.keys(giornate).sort((a, b) => a - b).forEach(giornata => {
    const sezione = document.createElement('div');
    sezione.innerHTML = `<h3>🗓️ Giornata ${giornata}</h3>`;
    const table = document.createElement('table');
    table.innerHTML = '<tr><th>Squadra A</th><th>Squadra B</th><th>Data</th><th>Ora</th><th>Campo</th><th>Risultato</th><th>Girone</th><th>Portiere</th><th>Giocatore</th><th>Marcatori</th></tr>';
    giornate[giornata].forEach(p => {
      const row = document.createElement('tr');
      const marcatori = (p.marcatori || []).map(m => `${m.nome} (${m.gol})`).join(", ");
      row.innerHTML = `
        <td>${p.squadraA}</td>
        <td>${p.squadraB}</td>
        <td>${p.data || ''}</td>
        <td>${p.orario || ''}</td>
        <td>${p.campo || ''}</td>
        <td>${p.golA != null && p.golB != null ? `${p.golA} - ${p.golB}` : ''}</td>
        <td>${p.girone || ''}</td>
        <td>${p.portiere || ''}</td>
        <td>${p.giocatore || ''}</td>
        <td>${marcatori}</td>
      `;
      table.appendChild(row);
    });
    sezione.appendChild(table);
    div.appendChild(sezione);
  });

  if (finali.length > 0) {
    const finaleDiv = document.createElement('div');
    finaleDiv.innerHTML = `<h3>🏆 Fase Finale</h3>`;
    const table = document.createElement('table');
    table.innerHTML = '<tr><th>Fase</th><th>Squadra A</th><th>Squadra B</th><th>Data</th><th>Ora</th><th>Campo</th><th>Portiere</th><th>Giocatore</th><th>Marcatori</th></tr>';
    finali.forEach(f => {
      const marcatori = (f.marcatori || []).map(m => `${m.nome} (${m.gol})`).join(", ");
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${f.fase}</td>
        <td>${f.squadraA}</td>
        <td>${f.squadraB}</td>
        <td>${f.data || ''}</td>
        <td>${f.orario || ''}</td>
        <td>${f.campo || ''}</td>
        <td>${f.portiere || ''}</td>
        <td>${f.giocatore || ''}</td>
        <td>${marcatori}</td>
      `;
      table.appendChild(row);
    });
    finaleDiv.appendChild(table);
    div.appendChild(finaleDiv);
  }
}
document.addEventListener('DOMContentLoaded', loadCalendar);
