const players = [
  { name: "Player 1", symbol: "X", score: 0 },
  { name: "Player 2", symbol: "O", score: 0 },
];
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//Factory Function όπου δημιουργούμε τον παίκτη και ορίζουμε το όνομα και το σύμβολο του
function createPlayer() {
  let _name = "Player 1";
  let _symbol = null;
  let _score = 0;

  const getPlayer = () => {
    return { name: _name, symbol: _symbol, score: _score };
  };

  const setPlayer = (newName, newSymbol) => {
    _name = newName;
    _symbol = newSymbol;
    _score = 0;
  };

  return { getPlayer, setPlayer };
}

//μέθοδος για την προσθήκη παίκτη στον πίνακα
function addPlayer(index, name, symbol) {
  const player = createPlayer();
  player.setPlayer(name, symbol);
  players[index] = player.getPlayer();
}

//μέθοδος με την οποία δηλώνουμε το σύμβολο στο κελί που επιλέγει ο εκάστοτε παίκτης
function addSymbol(indexRow, indexCol, symbol) {
  board[indexRow][indexCol] = symbol;
}

const app = {
  playerData: players,
  boardData: board,
  currentPlayer: players[0],
  winningCombinations: [
    // οριζόντιες
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // κάθετες
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // διαγώνιες
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ],
  init() {
    const addPlayerBtn = document.querySelector("#editPlayer");
    addPlayerBtn.addEventListener("click", () => {
      document.querySelector("#edit-players").classList.add("showing");
    });
    //Καλώ την μέθοδο για την επεξεργασία των παικτών
    this.editPlayer();

    //εδώ θα βάζουμε το σύμβολο του κάθε παίκτη στον πίνακα
    const board = document.querySelectorAll(".board-row button");
    const playerTurn = document.querySelector("#player-turn span");
    //αρχική δήλωση για το ποιος παίκτης έχει σειρά στο παιχνίδι
    playerTurn.textContent = `${this.currentPlayer.name} has turn`;
    board.forEach((element) => {
      element.addEventListener("click", (e) => {
        //εδώ πρώτα θα τσεκάρουμε ποιανού παίκτη σειρά είναι και μετά θα βάζουμε το
        //αντίστοιχο σύμβολο στο σωστό κελί
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        //προσθήκη συμβόλου στον πίνακα
        addSymbol(row, col, this.currentPlayer.symbol);
        //απενεργοποίηση κάθε κουμπιού μετά από κάθε κλικ
        e.target.disabled = true;

        //έλεγχος εάν υπάρχει νικητής στο παιχνίδι
        const winnerTag = document.querySelector("#winnerSection span");
        if (this.checkWinner()) {
          winnerTag.textContent = `${this.currentPlayer.name} win!`;
        }

        //εναλλαγή της σειράς του παίκτη
        this.currentPlayer =
          this.currentPlayer === this.playerData[0]
            ? this.playerData[1]
            : this.playerData[0];
        //εμφάνιση ποιος παίκτης έχει σειρά στο παιχνίδι
        playerTurn.textContent = `${this.currentPlayer.name} has turn`;
        this.renderBoard();
      });
    });
  },
  renderPalyers() {
    //Αλλαγή ονομάτων παικτών στον πίνακα από
    const playersName = document.querySelectorAll("#score .player");
    playersName.forEach((element, index) => {
      element.textContent = this.playerData[index].name;
      index++;
    });
  },
  renderBoard() {
    //εμφάνιση του συμβόλου του κάθε παίκτη μετά από κάθε κλικ
    const board = document.querySelectorAll(".board-row button");
    board.forEach((element) => {
      const cellValue =
        this.boardData[element.dataset.row][element.dataset.col];
      element.textContent = cellValue ?? "";
    });
  },
  editPlayer() {
    //εδώ γίνεται η αλλαγή των ονομάτων των παικτών
    const saveBtn = document.querySelector(".saveBtn");
    saveBtn.addEventListener("click", () => {
      const inputsData = [...document.querySelectorAll(".playerEditedData")];
      const values = inputsData.map((input) => input.value);
      //-------εδώ τώρα θα καλεί την μέθοδο για την αποθήκευση των παικτών στον πίνακα
      addPlayer(0, values[0], values[1]);
      addPlayer(1, values[2], values[3]);
      //--------------------------------------------------------
      document.querySelector("#edit-players").classList.remove("showing");
      this.renderPalyers();
    });
  },
  checkWinner() {
    return this.winningCombinations.some((combinations) => {
      return combinations.every(([row, col]) => {
        return this.boardData[row][col] === this.currentPlayer.symbol;
      });
    });
  },
};

app.init();
