import React from 'react'
import './Trade.css'

import { useDispatch } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'

const Trade = () => {

    const dispatch = useDispatch()

    const handleDone = () => {
        dispatch(nextCard('Main'))
    }

  return (
    <div className='trade'>
        Trade
        <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default Trade