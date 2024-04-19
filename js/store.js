const initialStore = { moves: [] };
const winningPatterns = [
  [1, 2, 3],
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];

export default class Store {
  #state = initialStore;
  constructor(players) {
    this.players = players;
    localStorage.setItem("p1Score", 0);
    localStorage.setItem("p2Score", 0);
    localStorage.setItem("ties", 0);
  }

  get game() {
    let state = this.#getState();

    let winner;
    const p1Moves = state.moves
      .filter((e) => e.playerId === 1)
      .map((e) => e.squareId);
    const p2Moves = state.moves
      .filter((e) => e.playerId === 2)
      .map((e) => e.squareId);

    for (const pattern of winningPatterns) {
      if (pattern.every((v) => p1Moves.includes(v))) {
        winner = 1;
      }
      if (pattern.every((v) => p2Moves.includes(v))) {
        winner = 2;
      }
    }
    if (winner) {
      state = this.#getState(winner);
    }

    return state;
  }

  reset() {
    this.saveState({ moves: [] });
  }

  hasMove(square) {
    const existingMove = this.game.moves.map((el) => +el.squareId);
    if (existingMove.length === 0) return 0;
    if (existingMove.some((el) => el === +square.id)) {
      return 1;
    }
    return 0;
  }

  saveState(stateOrFn) {
    const prevState = this.game;

    let newState;

    switch (typeof stateOrFn) {
      case "function":
        newState = stateOrFn(prevState);
        break;
      case "object":
        newState = stateOrFn;
        break;
      default:
        throw new Error("Invalid argument passed to saveState");
    }

    if (newState.moves.length === 0) {
      this.#state = newState;
    } else {
      this.#state.moves.push(newState.moves[0]);
    }
  }

  #getState(status = "in process") {
    return {
      currentPlayer: +this.players[this.#state.moves.length % 2].id,
      moves: this.#state.moves,
      status: status,
    };
  }
}
