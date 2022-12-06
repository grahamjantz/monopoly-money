import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectPlayersCount, increment, decrement } from '../PlayersList/PlayersListSlice'
import { nextCard } from '../CurrentCard/CurrentCardSlice'

import './GetPlayers.css'

const GetPlayers = () => {

    const dispatch = useDispatch();

    const count = useSelector(selectPlayersCount)

    const handleDecrement = () => {
        dispatch(decrement())
    }

    const handleIncrement = () => {
        dispatch(increment())
    }

    const renderMessage = () => {
        if (count === 8) {
            return (
                <h4>Maximum players reached!</h4>
            )
        } else if (count === 2) {
            return (
                <h4>Minimum players is 2!</h4>
            )
        }
    }

    const handleDone = () => {
        dispatch(nextCard('GetPlayerNames'))
    }

  return (
    <div className='get-players-card'>
        <h2>How Many Players?</h2>
        <div className='set-player-count'>
            <button onClick={handleDecrement}>-</button>
            <h3>{count}</h3>
            <button onClick={handleIncrement}>+</button>
        </div>
        {renderMessage()}
        <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default GetPlayers