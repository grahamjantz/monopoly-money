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
        dispatch(setStartingAmount(amount))
        dispatch(nextCard('Main'))
    }
    
    const handleNo = () => {
        setAcceptPrice(false)
    }

    const handleChange = (e) => {
        setAmount(e.target.value)
    }


    return (
        <div className='starting-amount'>
            <h2>Starting Amount: ${amount}</h2>
            <p>Accept?</p>
            <div>
                {!acceptPrice ? <input type='number'  placeholder='1500' onChange={handleChange}/> : ''}
            </div>
            <div>
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>  
            </div>
        </div>
    )
}

export default StartingAmount