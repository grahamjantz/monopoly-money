import React, { useState } from 'react'
import './Rent.css'

import { useDispatch, useSelector } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { selectPlayersList, makePayment, selectCurrentPlayer } from '../PlayersList/PlayersListSlice'

const MakePayment = () => {

    const dispatch = useDispatch();
    const playersList = useSelector(selectPlayersList);
    const currentPlayer = useSelector(selectCurrentPlayer)

    const [to, setTo] = useState(null);
    const [amount, setAmount] = useState('')

    const handleDone = () => {
        if (currentPlayer !== null && to !== null && amount !== 0) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(makePayment({to: to, amount: Number(amount)}))
        }
        dispatch(nextCard('Main'))
    }

  return (
    <div className='make-payment'>
        <h2>Pay Rent</h2> 
        <div>
            <h4>From: {currentPlayer ? currentPlayer.name : ''}</h4>
            <h5>Bank: ${currentPlayer.bank}</h5>
        </div>
        <div>
            <h4>To: {to ? to.name : ''}</h4>
            {playersList.slice(1).map((player) => {
                if (player.name !== currentPlayer.name) {
                    return (
                        <button 
                            key={player.piece} 
                            onClick={() => setTo(player)}
                        >
                            {player.name}
                        </button>
                    )
                }
                return ''
            })}
        </div>
        <label htmlFor='amount'>Amount:</label>
        <input type='number' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='0'/>
        <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default MakePayment