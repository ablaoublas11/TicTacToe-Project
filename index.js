const players = [];
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//Factory Function όπου δημιουργούμε τον παίκτη και ορίζουμε το όνομα και το σύμβολο του
function createPlayer() {
  let _name = "Player 1";
  let _symbol = null;

  const getPalyer = () => {
    return { name: _name, symbol: _symbol };
  };

  const setPlayer = (newName, newSymbol) => {
    _name = newName;
    _symbol = newSymbol;
  };

  return { getPalyer, setPlayer };
}

//μέθοδος για την προσθήκη παίκτη στον πίνακα
function addPlayer(name, symbol) {
  const player = createPlayer();
  player.setPlayer(name, symbol);
  players.push(player.getPalyer);
}

//μέθοδος με την οποία δηλώνουμε το σύμβολο στο κελί που επιλέγει ο εκάστοτε παίκτης
function addSymbol(indexRow, indexCol, symbol) {
  board[indexRow][indexCol] = symbol;
}

const app = {
  playerData: players,
  boardData: board,
  init() {
    const addPlayerBtn = document.querySelector("#editPlayer");
    addPlayerBtn.addEventListener("click", () => {
      document.querySelector("#edit-players").classList.toggle("showing");
    });
  },
  render() {},
  editPlayer() {},
};

app.init();
