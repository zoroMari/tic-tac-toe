import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];

  for (let turn of gameTurns) {
    const { square, playerSymbol } = turn;
    const { row, col } = square;

    gameBoard[row][col] = playerSymbol;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (let combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol
    ) winner = players[firstSquareSymbol];
  }

  return winner;
}

function deriveActivePlayer(turns) {
  let activePlayerSymbol = 'X';
  if (turns.length > 0 && turns[0].playerSymbol === 'X') activePlayerSymbol = 'O';
  return activePlayerSymbol;
}


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayerSymbol = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerNameChange(symbol, name) {
    setPlayers((prevState) => {
      return {
        ...prevState,
        [symbol]: name,
      }
    })
  }

  const handleChangeTurn = (rowIndes, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayerSymbol = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndes, col: colIndex },
          playerSymbol: currentPlayerSymbol,
        }, 
        ...prevTurns,
      ];

      return updatedTurns;
    });   
  }

  function handleRematch() {
    setGameTurns((prev) => []);

  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayerSymbol === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayerSymbol === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} draw={hasDraw} onRematch={handleRematch} />}    
        <GameBoard onSelectSqueare={handleChangeTurn} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
