import React, { useState } from 'react'
import './MakePayment.css'

import { useDispatch, useSelector } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { selectPlayersList } from '../PlayersList/PlayersListSlice'

const MakePayment = () => {

    const dispatch = useDispatch();
    const playersList = useSelector(selectPlayersList);

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [amount, setAmount] = useState()

    const handleDone = () => {
        if (from !== null && to !== null && amount !== 0) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(nextCard('Main'))
        }
    }

  return (
    <div className='make-payment'>
        Make Payment 
        <div>
            <h4>From: {from ? from.name : ''}</h4>
            {playersList.map((player) => {
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
        <div>
            <h4>To: {to ? to.name : ''}</h4>
            {playersList.map((player) => {
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
        <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default MakePayment