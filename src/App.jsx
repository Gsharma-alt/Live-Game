import React from 'react'
import './App.css'

const App = () => {
  return (
    <div className='main-div'>
      <div>
        <h1 className='heading-bg'>Tic Tac Toe</h1>
        <div className='square-wrapper'>
          <square />
        </div>
      </div>
    </div>

  )
}

export default App