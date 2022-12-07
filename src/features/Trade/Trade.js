import React, { useState } from 'react'
import './Trade.css'
import '../Rent/Rent.css'

import { useDispatch, useSelector } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { selectPlayersList, trade, selectCurrentPlayer } from '../PlayersList/PlayersListSlice'

const Trade = () => {

    const dispatch = useDispatch()
    const playersList = useSelector(selectPlayersList)
    const currentPlayer = useSelector(selectCurrentPlayer)

    const [pTwoName, setPTwoName] = useState(null);
    const [pOnePropVal, setPOnePropVal] = useState('')
    const [pTwoPropVal, setPTwoPropVal] = useState('')

    const handleDone = () => {
      if (
        currentPlayer !== null && 
        pOnePropVal >= 0 && 
        currentPlayer.property_value > 0 &&
        pOnePropVal <= currentPlayer.net_worth && 
        pOnePropVal <= currentPlayer.property_value && 

        pTwoName !== null && 
        pTwoPropVal >= 0 && 
        pTwoName.property_value > 0 && 
        pTwoPropVal <= pTwoName.net_worth &&
        pTwoPropVal <= pTwoName.property_value 
        ) {
        dispatch(trade({
          currentPlayer: currentPlayer,
          pOnePropVal: Number(pOnePropVal),
          pTwoName: pTwoName,
          pTwoPropVal: Number(pTwoPropVal)
        }))
      }
        dispatch(nextCard('Main'))
    }

    const returnErrMessageInsufficientFunds = () => {
        return <p className='errMessage'>Invalid! Insufficient Funds!</p>
    }

  return (
    <div className='trade'>
        <div className='player-divs'>
            <div className='p-one-div'>
                <div className='p-header'>
                    {
                        currentPlayer ? (
                            <h4>From: {currentPlayer ? currentPlayer.name : ''}</h4>
                        ) : <h4>Please Select Player!</h4>
                    }
                </div>

                {playersList.slice(1).map((player) => {
                    if(player.name === currentPlayer.name) {
                        return (
                            <button 
                                key={player.piece}
                            >
                                {player.name}
                            </button>
                        )
                    }
                    return ''
                        })}

                <label htmlFor='p-one-amount'>{currentPlayer !== null ? currentPlayer.name : ''} Trade Amount:</label>
                <input 
                    type='number' 
                    name='p-one-amount' 
                    value={pOnePropVal} 
                    onChange={(e) => setPOnePropVal(e.target.value)} 
                />
                {
                    currentPlayer !== null && 
                    currentPlayer.property_value === 0 ?
                    returnErrMessageInsufficientFunds() :
                    ''
                }
                {
                    pOnePropVal !== '' &&
                    currentPlayer !== null &&
                    pOnePropVal > currentPlayer.property_value ?
                    returnErrMessageInsufficientFunds():
                    ''
                }
            </div>

            <div className='p-two-div'>
                <div className='p-header'>
                    {
                        pTwoName ? (
                            <h4>To: {pTwoName ? pTwoName.name : ''}</h4>
                        ) : <h4>Please Select Player!</h4>
                    }
                    <div className='p-buttons'>
                        {playersList.slice(1).map((player) => {
                            if(player.name !== currentPlayer.name) {
                                return (
                                    <button 
                                        key={player.piece} 
                                        onClick={() => setPTwoName(player)}
                                    >
                                        {player.name}
                                    </button>
                                )
                            }
                            return ''
                        })}
                    </div>
                </div>
                <label htmlFor='p-two-amount'>{pTwoName !== null ? pTwoName.name : ''} Trade Amount:</label>

                <input 
                    type='number' 
                    name='p-two-amount' 
                    value={pTwoPropVal} 
                    onChange={(e) => setPTwoPropVal(e.target.value)} 
                />
                {
                    pTwoName !== null && 
                    pTwoName.property_value === 0 ?
                    returnErrMessageInsufficientFunds() :
                    ''
                }
                {
                    pTwoPropVal !== '' &&
                    pTwoName !== null &&
                    pTwoPropVal > pTwoName.property_value ?
                    returnErrMessageInsufficientFunds():
                    ''
                }
            </div>
        </div>
        <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default Trade