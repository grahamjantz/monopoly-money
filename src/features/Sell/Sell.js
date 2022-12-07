import React, { useState } from 'react'
import '../Rent/Rent.css'

import { useDispatch, useSelector } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { selectPlayersList, sell } from '../PlayersList/PlayersListSlice'

const Buy = () => {

    const dispatch = useDispatch();
    const playersList = useSelector(selectPlayersList);

    const from = 'Bank'
    const [to, setTo] = useState(null);
    const [amount, setAmount] = useState('')

    const handleDone = () => {
        if (from !== null && to !== null && amount !== 0 && to.property_value >= amount) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(sell({from: from, to: to, amount: Number(amount)}))
        }
        dispatch(nextCard('Main'))
    }

  return (
    <div className='make-payment'>
        <h2>Sell</h2>
        <div>
            <h4>Player: {to ? to.name : ''}</h4>
            {playersList.slice(1).map((player) => {
                return (
                    <button 
                        key={player.piece} 
                        onClick={() => setTo(player)}
                    >
                        {player.name}
                    </button>
                )
            })}
        </div>
        <label htmlFor='amount'>Amount:</label>
        <input type='number' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='0'/>
        {to && to.property_value >= amount ? <p>Invalid! Nothing to Sell!</p> : ''}
        <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default Buy