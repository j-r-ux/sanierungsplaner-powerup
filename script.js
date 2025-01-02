function saveData() {
  const bereich = document.getElementById('bereich').value;
  const kostenschaetzung = document.getElementById('kostenschaetzung').value;
  const angebote = document.getElementById('angebote').value;
  const abhaengigkeiten = document.getElementById('abhaengigkeiten').value;
  const tatsaechliche_kosten = document.getElementById('tatsaechliche_kosten').value;
  const foerderungsbetrag = document.getElementById('foerderungsbetrag').value;
  const deadline = document.getElementById('deadline').value;
  const todo_list = document.getElementById('todo_list').value;

  const data = {
    bereich,
    kostenschaetzung,
    angebote,
    abhaengigkeiten,
    tatsaechliche_kosten,
    foerderungsbetrag,
    deadline,
    todo_list,
  };

  TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
      return t.set('card', 'shared', 'sanierungsdaten', data).then(() => {
        alert('Daten gespeichert!');
      });
    }
  });
}
