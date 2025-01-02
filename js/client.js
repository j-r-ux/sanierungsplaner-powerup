// Initialize Power-Up
window.TrelloPowerUp.initialize({
  // Button für die Sanierungsübersicht im Board
  'board-buttons': function (t) {
    return [{
      icon: {
        dark: './images/renovierung.png',
        light: './images/renovierung.png'
      },
      text: 'Sanierungsübersicht',
      callback: function (t) {
        return t.modal({
          title: 'Sanierungsübersicht',
          url: './views/dashboard.html',
          fullscreen: true
        });
      }
    }];
  },

  // Badges für Karten: Zeigt Budgetinformationen an
  'card-badges': async function (t) {
    const costs = await t.get('card', 'shared', 'costs');
    const badges = [];

    if (costs) {
      badges.push({
        text: `Plan: ${costs.estimated}€`,
        color: 'blue',
        icon: '💰'
      });
      if (costs.actual) {
        badges.push({
          text: `Ist: ${costs.actual}€`,
          color: costs.actual > costs.estimated ? 'red' : 'green',
          icon: '✅'
        });
      }
    }

    return badges;
  },

  // Button auf Karten: Verknüpfung zu Angeboten hinzufügen
  'card-buttons': function (t) {
    return [{
      icon: '🔗',
      text: 'Angebot verknüpfen',
      callback: async function (t) {
        const boards = await t.listBoards();
        const selectedBoard = await t.popup({
          title: 'Board auswählen',
          items: boards.map(board => ({
            text: board.name,
            callback: () => t.set('board', 'shared', 'selectedBoard', board.id)
          }))
        });

        if (selectedBoard) {
          const cards = await t.listCards(selectedBoard.id);
          return t.popup({
            title: 'Karte auswählen',
            items: cards.map(card => ({
              text: card.name,
              callback: () => t.attach({ url: `https://trello.com/c/${card.id}`, name: card.name })
            }))
          });
        }
      }
    }];
  },

  // Abschnitt auf der Rückseite von Karten
  'card-back-section': function (t) {
    return {
      title: 'Angebote & Budget',
      icon: '💼',
      content: {
        type: 'iframe',
        url: t.signUrl('./views/card-details.html'),
        height: 200
      }
    };
  },

  // Einstellungen für das Power-Up
  'show-settings': function (t) {
    return t.modal({
      title: 'Sanierungsplaner Einstellungen',
      url: './views/settings.html',
      height: 300
    });
  }
});
