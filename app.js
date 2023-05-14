let gameboard = ["", "", "","", "", "","", "", "",];
let currentPlayer = "X";
let gameOver = false;
let message = document.querySelector(".message");
message.setAttribute("class", "win-message"); 



const checkWin = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
      gameOver = true;
      message.innerHTML =`Player ${gameboard[a]} wins!`;
      break;
    }
  }
  if (!gameboard.includes("") && !gameOver) {
    gameOver = true;
    message.innerHTML =`It's a tie !  <br>
                          Play again !`;
  }
};

let cells = document.getElementsByClassName("cell");
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", (event) => {
    event.preventDefault();
    if (!gameOver && event.target.innerHTML === "") {
      event.target.innerHTML = currentPlayer;
      gameboard[i] = currentPlayer;
      checkWin();
      currentPlayer = currentPlayer === "X" ? "O" : "X";

      if (gameMode === "player-vs-computer" && !gameOver && currentPlayer === "O") {
        // Computer's turn
        const emptyCells = gameboard.reduce((emptyCells, cell, index) => {
          if (cell === "") {
            emptyCells.push(index);
          }
          return emptyCells;
        }, []);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];
        cells[computerMove].innerHTML = "O";
        gameboard[computerMove] = "O";
        checkWin();
        currentPlayer = "X";
      }
    }
  });
}
const playerVsPlayerButton = document.querySelector(".player-vs-player");
playerVsPlayerButton.addEventListener("click", () => {
  gameMode = "player-vs-player";
  if (!playerVsPlayerButton.classList.contains("hidden")) {
    playerVsPlayerButton.classList.add("hidden");
  }
  if (!playerVsComputerButton.classList.contains("hidden")) {
    playerVsComputerButton.classList.add("hidden");
  }
  playerVsPlayerButton.classList.remove("show");
  playerVsComputerButton.classList.remove("show");
});

const playerVsComputerButton = document.querySelector(".player-vs-computer");
playerVsComputerButton.addEventListener("click", () => {
  gameMode = "player-vs-computer";
  if (!playerVsPlayerButton.classList.contains("hidden")) {
    playerVsPlayerButton.classList.add("hidden");
  }
  if (!playerVsComputerButton.classList.contains("hidden")) {
    playerVsComputerButton.classList.add("hidden");
  }
  playerVsPlayerButton.classList.remove("show");
  playerVsComputerButton.classList.remove("show");
});

// Restart game

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  gameboard = ["", "", "","", "", "","", "", "",];
  currentPlayer = "X";
  gameOver = false;
  message.innerHTML = "";
  playerVsPlayerButton.classList.add("show");
  playerVsComputerButton.classList.add("show");
});

let gameMode = "player-vs-player";