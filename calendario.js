
async function loadCalendar() {
  const cat = new URLSearchParams(location.search).get('categoria');
  const res = await fetch('dati.json');
  const dati = await res.json();
  const div = document.getElementById('calendario');

  const partite = dati[cat]?.partite || [];
  const finali = dati[cat]?.finali || [];

  // Raggruppa partite per giornata
  const giornate = {};
  partite.forEach(p => {
    if (!p.giornata) return;
    if (!giornate[p.giornata]) giornate[p.giornata] = [];
    giornate[p.giornata].push(p);
  });

  // Ordina per giornata
  Object.keys(giornate).sort((a, b) => a - b).forEach(giornata => {
    const sezione = document.createElement('div');
    sezione.innerHTML = `<h3>🗓️ Giornata ${giornata}</h3>`;
    const table = document.createElement('table');
    table.innerHTML = '<tr><th>Squadra A</th><th>Squadra B</th><th>Data</th><th>Ora</th><th>Campo</th><th>Risultato</th><th>Girone</th></tr>';
    giornate[giornata].forEach(p => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${p.squadraA}</td>
        <td>${p.squadraB}</td>
        <td>${p.data || ''}</td>
        <td>${p.orario || ''}</td>
        <td>${p.campo || ''}</td>
        <td>${p.golA != null && p.golB != null ? `${p.golA} - ${p.golB}` : ''}</td>
        <td>${p.girone || ''}</td>
      `;
      table.appendChild(row);
    });
    sezione.appendChild(table);
    div.appendChild(sezione);
  });

  // Sezione fase finale
  if (finali.length > 0) {
    const finaleDiv = document.createElement('div');
    finaleDiv.innerHTML = `<h3>🏆 Fase Finale</h3>`;
    const table = document.createElement('table');
    table.innerHTML = '<tr><th>Fase</th><th>Squadra A</th><th>Squadra B</th><th>Data</th><th>Ora</th><th>Campo</th></tr>';
    finali.forEach(f => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${f.fase}</td>
        <td>${f.squadraA}</td>
        <td>${f.squadraB}</td>
        <td>${f.data || ''}</td>
        <td>${f.orario || ''}</td>
        <td>${f.campo || ''}</td>
      `;
      table.appendChild(row);
    });
    finaleDiv.appendChild(table);
    div.appendChild(finaleDiv);
  }
}
document.addEventListener('DOMContentLoaded', loadCalendar);
