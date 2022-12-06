import React from 'react'

import './Main.css'

import { useSelector } from 'react-redux'

import { selectPlayersList } from '../PlayersList/PlayersListSlice'

const Main = () => {

  const playersList = useSelector(selectPlayersList)
  
  const playersListSorted = playersList.slice().sort((a, b) => b.bank - a.bank)

  return (
    <div className='main'>
      <div className='make-payment'>
        <button className='payment-button'>
          Make Payment
        </button>
      </div>
      <div className='leaderboard'>
        <ul>
          {playersListSorted.map((player) => {
            return (
              <div className='player' key={player.piece}>
                <h4>{player.name}</h4>
                <p>{player.bank}</p>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Main