const initialValue = {
  moves: [],
  history: {
    currentRoundGames: [],
    allGames: [],
  },
};

export default class Store {
  #state = initialValue;
  constructor(players) {
    this.players = players;
  }

  get stats() {
    const state = this.#getState();

    return {
      playerWithStats: this.players.map((player) => {
        const wins = state.history.currentRoundGames.filter(
          (game) => game.status.winner?.id === player.id
        ).length;
        return {
          ...player,
          wins,
        };
      }),
      ties: state.history.currentRoundGames.filter(
        (game) => game.status.winner === null
      ).length,
    };
  }

  get game() {
    let state = this.#getState();
    let winner = null;
    const currentPlayer = +this.players[this.#state.moves.length % 2].id;
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

    for (const player of this.players) {
      const selectedSquareIds = state.moves
        .filter((move) => move.playerId === player.id)
        .map((move) => move.squareId);
      for (const pattern of winningPatterns) {
        if (pattern.every((v) => selectedSquareIds.includes(v))) {
          winner = player;
        }
      }
    }

    return {
      moves: state.moves,
      currentPlayer,
      status: {
        isComplete: winner != null || state.moves.length === 9,
        winner: winner,
      },
    };
  }

  reset() {
    const stateClone = structuredClone(this.#getState());

    const { status, moves } = this.game;

    if (status.isComplete) {
      stateClone.history.currentRoundGames.push({
        moves,
        status,
      });
    }

    stateClone.moves = [];

    this.saveState(stateClone);
  }

  hasMove(square) {
    const existingMove = this.game.moves.map((el) => +el.squareId);
    if (existingMove.length === 0) return 0;
    if (existingMove.some((el) => el === +square.id)) {
      return 1;
    }
    return 0;
  }

  playerMove(square) {
    const stateClone = structuredClone(this.#getState());
    stateClone.moves.push({
      playerId: this.game.currentPlayer,
      squareId: +square.id,
    });

    this.saveState(stateClone);
  }

  saveState(stateOrFn) {
    const prevState = structuredClone(this.#state);

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

    this.#state = newState;
  }

  #getState() {
    return this.#state;
  }
}
