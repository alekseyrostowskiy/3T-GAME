export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.turn = this.qs('[data-id="turn"]');
    this.$.resetBtn = this.qs('[data-id="reset"]');
    this.$.squares = this.qs('[data-id="square"]', "all");
    this.$.turnColor = this.qs('[data-id="turnColor"]');
    this.$.modal = this.qs('[data-id="modal"]');
    this.$.statusText = this.qs('[data-id="status"]');
    this.$.restart = this.qs('[data-id="restart"]');
    this.$.p1Score = this.qs('[data-id="p1Score"]');
    this.$.p2Score = this.qs('[data-id="p2Score"]');
    this.$.ties = this.qs('[data-id="ties"]');

    //UI-only event
  }

  bindPlayerMovement(handler) {
    this.$.squares.forEach((square) => {
      square.addEventListener("click", (el) => handler(square));
    });
  }

  handleSquareIcon(currentPlayer, square) {
    const icon = document.createElement("i");
    currentPlayer === 1
      ? icon.classList.add("fa-solid", "fa-x")
      : icon.classList.add("fa-solid", "fa-o");
    square.replaceChildren(icon);
  }

  setTurnIndicator(currentPlayer, players) {
    const index = currentPlayer.id === 1 ? 1 : 0;

    this.$.turnColor.classList.remove(players[index].colorClass);
    this.$.turn.classList.remove(players[index].iconClass);
    this.$.turnColor.classList.add(currentPlayer.colorClass);
    this.$.turn.classList.add(currentPlayer.iconClass);
  }

  handleResetGame(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.restart.addEventListener("click", handler);
  }

  handleGameStatus(winner, moves) {
    if (winner === 1 || winner === 2) {
      winner === 1
        ? localStorage.setItem("p1Score", +localStorage.getItem("p1Score") + 1)
        : localStorage.setItem("p2Score", +localStorage.getItem("p2Score") + 1);
      this.$.p1Score.innerText = localStorage.getItem("p1Score");
      this.$.p2Score.innerText = localStorage.getItem("p2Score");
      this.$.modal.classList.remove("hidden");
      this.$.statusText.innerText = `Player  ${winner}
       is the winner`;
    }
    if (moves.length === 9) {
      localStorage.setItem("ties", +localStorage.getItem("ties") + 1);
      this.$.ties.innerText = localStorage.getItem("ties");

      this.$.modal.classList.remove("hidden");
      this.$.statusText.innerText = `Draw!`;
    }
  }

  closeModal() {
    this.$.modal.classList.add("hidden");
  }

  wipeScoreboard() {
    this.$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  qs(selector, index = undefined) {
    if (index === "all") {
      const el = document.querySelectorAll(selector);
      console.log(el);
      if (!el) throw new Error("Could not find elements");

      return el;
    }
    const el = document.querySelector(selector);

    if (!el) throw new Error("Could not find elements");

    return el;
  }
}
