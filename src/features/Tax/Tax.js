import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import '../Tax/Tax.css'

import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPlayer, payToFreeParking } from '../PlayersList/PlayersListSlice'

const Tax = ({ setDisplayAction }) => {

    const dispatch = useDispatch();
    const currentPlayer = useSelector(selectCurrentPlayer)

    const [amount, setAmount] = useState('')

    const handleDone = () => {
        if (
            currentPlayer !== null && 
            amount > 0 && 
            currentPlayer.bank >= amount) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(payToFreeParking({amount: Number(amount)}))
        }
        setDisplayAction(false)
        setAmount('')
    }

  return (
    <div className='tax'>
            <AiOutlineClose className='tax-close-button' onClick={handleDone}/>
            <h2>Tax</h2>
        <div className='tax-header'>
            <h4>Player: <br/>{currentPlayer.name}</h4>
            <h4>Bank: <br/> ${currentPlayer.bank}</h4>
        </div>
        <label htmlFor='amount'>Amount:</label>

        <div className='tax-input'>
            <input 
                type='number' 
                name='amount' 
                value={amount} 
                onChange={(e) => setAmount(Math.round(e.target.value))} 
                placeholder='0'
            />
            <button onClick={handleDone}>{currentPlayer.bank >= amount ? 'Done' : 'Go Back'}</button>
        </div>
        {
            currentPlayer && 
            currentPlayer.bank <= amount ? 
            <p>Invalid! Insufficient Funds!</p> : ''
        }
        {
            amount && amount < 0 ? <p>Invalid! Please enter positive number!</p> : ''
        }
    </div>
  )
}

export default Tax