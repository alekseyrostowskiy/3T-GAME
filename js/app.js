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

  view.bindPlayerMovement((square) => {
    if (store.hasMove(square)) return;

    view.handleSquareIcon(store.game.currentPlayer, square);

    store.saveState({
      moves: [{ playerId: store.game.currentPlayer, squareId: +square.id }],
    });

    view.setTurnIndicator(players[store.game.currentPlayer - 1], players);

    view.handleGameStatus(store.game.status, store.game.moves);
  });

  view.handleResetGame(() => {
    store.reset();
    view.wipeScoreboard();
    view.closeModal();
  });
}

window.addEventListener("load", init);
