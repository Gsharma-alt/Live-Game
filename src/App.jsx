import React, { useState, useEffect } from 'react'
import './App.css'
import Square from './Square/Square';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2';

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const App = () => {

  const [gameState, setgameState] = useState(renderFrom);
  const [currPlayer, setcurrPlayer] = useState('circle');
  const [finishstate, setfinishstate] = useState(false);
  const [finishedArrayState, setfinishedArrayState] = useState([]);
  const [playonline, setplayonline] = useState(false);
  const [socket, setsocket] = useState(null);
  const [player, setplayer] = useState('');

  const checkWinner = () => {
    //row dynamic
    for (let row = 0; row < gameState.length; row++) {
      if (gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setfinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    //col dynamic
    for (let col = 0; col < gameState.length; col++) {
      if (gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setfinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }

    if (gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]) {
      return gameState[0][0];
    }
    if (gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]) {
      return gameState[0][0];
    }

    const isdraw = gameState.flat().every(e => {
      if (e === 'circle' || e === 'cross')
        return true;
    });

    if (isdraw) return 'draw';
    return null;
  };
  useEffect(() => {
    //console.log(checkWinner());
    const winner = checkWinner();
    //   if (winner === 'circle' || winner === 'cross') {
    //     setfinishstate(winner);
    //   }
    if (winner) {
      setfinishstate(winner);
    }
  }, [gameState]);

  const takename = async () => {
    const result = await Swal.fire({
      title: "Enter your Name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    return result;
  }
  // useEffect(() => {
  //   // console.log(socket);
  //   if (socket && socket.connected) {
  //     setplayonline(true);
  //   }
  // }, [socket]);
  socket?.on('connect', function () {
    setplayonline(true);
  });

  async function playclick() {

    const result = await takename();
    console.log(result);

    if (!result.isConfirmed) {
      return;
    }

    const username = result.value;
    setplayonline(username);

    const newSocket = io("http://localhost:3000", {
      autoConnect: true,
    });
    setsocket(newSocket);
  }
  if (!playonline) {
    return <div className='main-div'>
      <button onClick={playclick} className='playOnline'>Play Online</button>
    </div>
  }
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
                  finishedArrayState={finishedArrayState}
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
        {finishstate && finishstate !== 'draw' && (<h3 className='finished-state'>{finishstate} won the game</h3>)}
        {finishstate && finishstate === 'draw' && (<h3 className='finished-state'>It's a draw</h3>)}
      </div>
    </div>

  )
}

export default App