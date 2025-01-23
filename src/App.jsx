import React, { useState, useEffect } from 'react'
import './App.css'
import Square from './Square/Square';

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const App = () => {

  const [gameState, setgameState] = useState(renderFrom);
  const [currPlayer, setcurrPlayer] = useState('circle');
  const [finishstate, setfinishstate] = useState(false);

  const checkWinner = () => {
    //row dynamic
    for (let row = 0; row < gameState.length; row++) {
      if (gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        return gameState[row][0];
      }
    }

    //col dynamic
    for (let col = 0; col < gameState.length; col++) {
      if (gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        return gameState[0][col];
      }
    }
  }
  useEffect(() => {
    //console.log(checkWinner());
    const winner = checkWinner();
    if (winner === 'circle' || winner === 'cross') {
      setfinishstate(winner);
      console.log(winner);
    }
  }, [gameState]);

  return (
    <div className='main-div'>
      <div className='move-detection'>
        <div className='left'>Yourself</div>
        <div className='right'>Opponent</div>
      </div>
      <div>
        <h1 className='heading-bg'>Tic Tac Toe</h1>
        <div className='square-wrapper'>
          {
            gameState.map((arr, rowIndex) =>
              arr.map((e, colIndex) => {
                return <Square
                  finishstate={finishstate}
                  currPlayer={currPlayer}
                  setcurrPlayer={setcurrPlayer}
                  setgameState={setgameState}
                  id={rowIndex * 3 + colIndex}
                  key={rowIndex * 3 + colIndex} />
              })
            )
          }
        </div>
        {finishstate && (<h3 className='finished-state'>{finishstate} won the game</h3>)}
      </div>
    </div>

  )
}

export default App