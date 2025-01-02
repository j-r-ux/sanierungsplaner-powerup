// Karten aus dem Board "Angebote" laden
function loadAngebote(t) {
  const angeboteSelect = document.getElementById('angebote');

  // Hole Karten aus dem Board "Angebote"
  t.board('all').then(function (board) {
    t.boards('all').then(function (boards) {
      const angeboteBoard = boards.find(b => b.name === "Angebote"); // Board "Angebote" finden
      if (angeboteBoard) {
        t.boards('all').then(function (allBoards) {
          t.cards('all', { board: angeboteBoard.id }).then(function (cards) {
            cards.forEach(function (card) {
              const option = document.createElement('option');
              option.value = card.url;
              option.text = card.name;
              angeboteSelect.add(option);
            });
          });
        });
      }
    });
  });
}

function saveData() {
  const bereich = document.getElementById('bereich').value;
  const kostenschaetzung = document.getElementById('kostenschaetzung').value;
  const angebote = document.getElementById('angebote').value;
  const tatsaechliche_kosten = document.getElementById('tatsaechliche_kosten').value;
  const foerderungsbetrag = document.getElementById('foerderungsbetrag').value;
  const zahlungstermin = document.getElementById('zahlungstermin').value;
  const deadline = document.getElementById('deadline').value;
  const todo_list = document.getElementById('todo_list').value;

  const data = {
    bereich,
    kostenschaetzung,
    angebote,
    tatsaechliche_kosten,
    foerderungsbetrag,
    zahlungstermin,
    deadline,
    todo_list,
  };

  TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
      return t.set('card', 'shared', 'sanierungsdaten', data).then(() => {
        alert('Daten gespeichert!');
        updateBudget(t);
      });
    }
  });
}

// Budget aktualisieren
function updateBudget(t) {
  calculateBudget(t).then(budget => {
    const budgetDiv = document.getElementById('budgetOverview');
    budgetDiv.innerHTML = `
      <p>Gesamtkostenschätzung: €${budget.totalBudget.toFixed(2)}</p>
      <p>Tatsächliche Kosten: €${budget.actualCosts.toFixed(2)}</p>
      <p>Verbleibendes Budget: €${budget.remainingBudget.toFixed(2)}</p>
    `;
  });
}

// Angebote beim Laden der Seite laden
document.addEventListener('DOMContentLoaded', function () {
  TrelloPowerUp.initialize({
    'card-buttons': function (t, options) {
      loadAngebote(t); // Angebote laden
      return [];
    }
  });
});
