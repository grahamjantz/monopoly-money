import React, { useState } from 'react'
import '../Rent/Rent.css'

import { useDispatch, useSelector } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { selectCurrentPlayer, payToFreeParking } from '../PlayersList/PlayersListSlice'

const Tax = () => {

    const dispatch = useDispatch();
    const currentPlayer = useSelector(selectCurrentPlayer)

    const [amount, setAmount] = useState('')

    const handleDone = () => {
        if (
            currentPlayer !== null && 
            amount !== 0 && 
            currentPlayer.bank >= amount) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(payToFreeParking({amount: Number(amount)}))
        }
        dispatch(nextCard('Main'))
    }

  return (
    <div className='make-payment'>
        <h2>Tax</h2>
        <div>
            <h4>Player: {currentPlayer.name}</h4>
            <h5>Bank: ${currentPlayer.bank}</h5>
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
            currentPlayer.bank <= amount ? 
            <p>Invalid! Insufficient Funds!</p> : ''
        }
        <button onClick={handleDone}>{currentPlayer.bank > amount ? 'Done' : 'Go Back'}</button>
    </div>
  )
}

export default Tax