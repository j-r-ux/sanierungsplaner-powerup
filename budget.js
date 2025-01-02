function calculateBudget(t) {
  return t.cards('all').then(function(cards) {
    let totalBudget = 0;
    let actualCosts = 0;

    cards.forEach(function(card) {
      const data = card.shared.sanierungsdaten || {};
      if (data.kostenschaetzung) {
        totalBudget += parseFloat(data.kostenschaetzung) || 0;
      }
      if (data.tatsaechliche_kosten) {
        actualCosts += parseFloat(data.tatsaechliche_kosten) || 0;
      }
    });

    const remainingBudget = totalBudget - actualCosts;

    return {
      totalBudget,
      actualCosts,
      remainingBudget
    };
  });
}
