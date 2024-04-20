import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "blue",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const store = new Store(players);
  const view = new View();

  view.handleResetGame(() => {
    store.reset();
    view.updateScoreboard(
      store.stats.playerWithStats[0].wins,
      store.stats.playerWithStats[1].wins,
      store.stats.ties
    );
    view.wipeScoreboard();
    view.closeModal();
    view.setTurnIndicator(players[store.game.currentPlayer - 1], players);
  });

  view.bindPlayerMovement((square) => {
    if (store.hasMove(square)) return;

    view.handleSquareIcon(store.game.currentPlayer, square);

    store.playerMove(square);

    if (store.game.status.isComplete) {
      view.openModal(
        store.game.status.winner
          ? `${store.game.status.winner.name} wins!`
          : "Tie!"
      );
      return;
    }
    view.setTurnIndicator(players[store.game.currentPlayer - 1], players);
  });
}

window.addEventListener("load", init);
