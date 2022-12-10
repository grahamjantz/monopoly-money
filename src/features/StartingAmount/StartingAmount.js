import React, { useState } from 'react'
import './StartingAmount.css'

import { useDispatch } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { setStartingAmount } from '../PlayersList/PlayersListSlice'

const StartingAmount = () => {

    const dispatch = useDispatch()

    const [amount, setAmount] = useState(1500)
    const [acceptPrice, setAcceptPrice] = useState(true)

    const handleYes = () => {
        setAcceptPrice(true)
        if (amount > 0) {
            dispatch(setStartingAmount(amount))
            dispatch(nextCard('Main'))
        }
    }
    
    const handleNo = () => {
        setAcceptPrice(false)
    }

    const handleChange = (e) => {
        setAmount(Math.round(e.target.value))
    }


    return (
        <div className='starting-amount'>
            <h2>Starting Amount: ${amount}</h2>
            <p>Accept?</p>
            <div>
                {!acceptPrice ? <input type='number' min='0' placeholder='1500' onChange={handleChange}/> : ''}
            </div>
            <div>
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>  
            </div>
            {
                amount && amount <= 0 ? <p>Invalid! Please enter positive number!</p> : ''
            }
        </div>
    )
}

export default StartingAmount