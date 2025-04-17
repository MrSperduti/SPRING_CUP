let dati = {};
document.getElementById("fileInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    dati = JSON.parse(e.target.result);
    mostraAnteprima();
  };
  reader.readAsText(file);
});

function mostraAnteprima() {
  document.getElementById("anteprima").innerText = JSON.stringify(dati, null, 2);
}

function scaricaDati() {
  const blob = new Blob([JSON.stringify(dati, null, 2)], {type: "application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "dati.json";
  a.click();
}
