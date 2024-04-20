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
    this.$.p1Wins = this.qs('[data-id="p1Wins"]');
    this.$.p2Wins = this.qs('[data-id="p2Wins"]');
    this.$.ties = this.qs('[data-id="ties"]');
    this.$.menu = this.qs('[data-id="menu"]');
    this.$.menuBtn = this.qs('[data-id="menu-btn"]');

    //UI-only event
    this.$.menuBtn.addEventListener("click", () => {
      this.$.menu.classList.toggle("hidden");
    });
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

  updateScoreboard(p1Wins, p2Wins, ties) {
    this.$.p1Wins.innerText = `${p1Wins}`;
    this.$.p2Wins.innerText = `${p2Wins}`;
    this.$.ties.innerText = `${ties}`;
  }

  openModal(status) {
    this.$.modal.classList.remove("hidden");
    this.$.statusText.innerText = status;
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
      if (!el) throw new Error("Could not find elements");

      return el;
    }
    const el = document.querySelector(selector);

    if (!el) throw new Error("Could not find elements");

    return el;
  }
}
