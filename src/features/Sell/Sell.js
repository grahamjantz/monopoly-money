import React, { useState } from 'react'
import '../Rent/Rent.css'

import { useDispatch, useSelector } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { sell, selectCurrentPlayer } from '../PlayersList/PlayersListSlice'

const Sell = () => {

    const dispatch = useDispatch();
    const currentPlayer = useSelector(selectCurrentPlayer)

    // const from = 'Bank'
    // const [to, setTo] = useState(null);
    const [amount, setAmount] = useState('')

    const handleDone = () => {
        if (
            currentPlayer !== null && 
            amount !== 0 && 
            currentPlayer.property_value >= amount) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(sell({amount: Number(amount)}))
        }
        dispatch(nextCard('Main'))
    }

  return (
    <div className='make-payment'>
        <h2>Sell</h2>
        <div>
            <h4>Player: {currentPlayer.name}</h4>
            <h5>Property Value: ${currentPlayer.property_value}</h5>
        </div>
        <label htmlFor='amount'>Amount:</label>

        <input 
            type='number' 
            name='amount' 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder='0'
        />
        {
            currentPlayer && 
            currentPlayer.property_value === 0 ? 
            <p>Invalid! Nothing to Sell!</p> : ''
        }
        {
            currentPlayer.property_value < amount ?
            <p>Invalid! Insufficient Funds!</p> : ''
        }

        <button onClick={handleDone}>{currentPlayer.property_value < amount || currentPlayer.property_value === 0 ? 'Go Back' : 'Done'}</button>
    </div>
  )
}

export default Sell