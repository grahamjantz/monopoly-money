import React, { useState } from 'react'
import './Trade.css'
import '../Rent/Rent.css'

import { useDispatch, useSelector } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { selectPlayersList, trade } from '../PlayersList/PlayersListSlice'

const Trade = () => {

    const dispatch = useDispatch()
    const playersList = useSelector(selectPlayersList)

    const [pOneName, setPOneName] = useState(null);
    const [pTwoName, setPTwoName] = useState(null);
    const [pOnePropVal, setPOnePropVal] = useState()
    const [pTwoPropVal, setPTwoPropVal] = useState()

    const handleDone = () => {
        dispatch(trade({
          pOneName: pOneName,
          pOnePropVal: Number(pOnePropVal),
          pTwoName: pTwoName,
          pTwoPropVal: Number(pTwoPropVal)
        }))
        dispatch(nextCard('Main'))
    }

  return (
    <div className='trade'>
        <div>
            <h4>From: {pOneName ? pOneName.name : ''}</h4>
            {playersList.slice(1).map((player) => {
                return (
                    <button 
                        key={player.piece} 
                        onClick={() => setPOneName(player)}
                    >
                        {player.name}
                    </button>
                )
            })}
        </div>
        <label htmlFor='p-one-amount'>{pOneName !== null ? pOneName.name : ''} Property Amount:</label>
        <input type='number' name='p-one-amount' value={pOnePropVal} onChange={(e) => setPOnePropVal(e.target.value)} />
        <div>
            <h4>To: {pTwoName ? pTwoName.name : ''}</h4>
            {playersList.slice(1).map((player) => {
                return (
                    <button 
                        key={player.piece} 
                        onClick={() => setPTwoName(player)}
                    >
                        {player.name}
                    </button>
                )
            })}
        </div>
        <label htmlFor='p-two-amount'>{pTwoName !== null ? pTwoName.name : ''} Property Amount:</label>
        <input type='number' name='p-two-amount' value={pTwoPropVal} onChange={(e) => setPTwoPropVal(e.target.value)} />
        <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default Trade