import React, { useState } from 'react'
import '../Rent/Rent.css'

import { useDispatch, useSelector } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { selectPlayersList, buyProperty } from '../PlayersList/PlayersListSlice'

const Buy = () => {

    const dispatch = useDispatch();
    const playersList = useSelector(selectPlayersList);

    const [from, setFrom] = useState(null);
    const to = 'Bank'
    const [amount, setAmount] = useState('')

    const handleDone = () => {
        if (from !== null && to !== null && amount !== 0 && from.bank >= amount) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(buyProperty({from: from, to: to, amount: Number(amount)}))
        }
        dispatch(nextCard('Main'))
    }

  return (
    <div className='make-payment'>
        <h2>Buy</h2>
        <div>
            <h4>Player: {from ? from.name : ''}</h4>
            {playersList.slice(1).map((player) => {
                return (
                    <button 
                        key={player.piece} 
                        onClick={() => setFrom(player)}
                    >
                        {player.name}
                    </button>
                )
            })}
        </div>
        <label htmlFor='amount'>Amount:</label>
        <input type='number' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='0'/>
        {from && from.bank <= amount ? <p>Invalid! Insufficient Funds!</p> : ''}
        <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default Buy