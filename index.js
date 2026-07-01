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

  const getPlayer = () => {
    return { name: _name, symbol: _symbol };
  };

  const setPlayer = (newName, newSymbol) => {
    _name = newName;
    _symbol = newSymbol;
  };

  return { getPlayer, setPlayer };
}

//μέθοδος για την προσθήκη παίκτη στον πίνακα
function addPlayer(index, name, symbol) {
  const player = createPlayer();
  player.setPlayer(name, symbol);
  players[index] = { name, symbol };
}

//μέθοδος με την οποία δηλώνουμε το σύμβολο στο κελί που επιλέγει ο εκάστοτε παίκτης
function addSymbol(indexRow, indexCol, symbol) {
  board[indexRow][indexCol] = symbol;
}

const app = {
  playerData: players,
  boardData: board,
  currentPlayer: players[0],
  init() {
    const addPlayerBtn = document.querySelector("#editPlayer");
    addPlayerBtn.addEventListener("click", () => {
      document.querySelector("#edit-players").classList.add("showing");
    });
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

    //εδώ θα βάζουμε το σύμβολο του κάθε παίκτη στον πίνακα
    const board = document.querySelectorAll(".board-row button");
    board.forEach((element) => {
      element.addEventListener("click", (e) => {
        //εδώ πρώτα θα τσεκάρουμε ποιανού παίκτη σειρά είναι και μετά θα βάζουμε το
        //αντίστοιχο σύμβολο στο σωστό κελί
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;

        addSymbol(row, col, this.currentPlayer.symbol);

        this.currentPlayer =
          this.currentPlayer === this.playerData[0]
            ? this.playerData[1]
            : this.playerData[0];
        this.renderBoard();
      });
    });
    //this.render();
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
    const board = document.querySelectorAll(".board-row button");
    board.forEach((element) => {
      const cellValue =
        this.boardData[element.dataset.row][element.dataset.col];
      element.textContent = cellValue ?? "";
    });
  },
  editPlayer() {},
};

app.init();
