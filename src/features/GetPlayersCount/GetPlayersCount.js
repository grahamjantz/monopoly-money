import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectPlayersCount, increment, decrement, fetchPlayerCount, selectRoomId } from '../PlayersList/PlayersListSlice'
import { nextCard } from '../CurrentCard/CurrentCardSlice'

import './GetPlayersCount.css'

import { doc, updateDoc } from "firebase/firestore/lite"; 
import { db } from '../../utils/firebase'

const GetPlayers = () => {
    const [count, setCount] = useState(2)

    const dispatch = useDispatch();

    // const count = useSelector(selectPlayersCount)
    const roomId = useSelector(selectRoomId)

    const handleDecrement = () => {
        if (count > 2 ) {
            let cnt = count - 1
            setCount(cnt)
        }
        // dispatch(decrement())
    }

    const handleIncrement = () => {
        if (count < 8) {
            let cnt = count + 1
            setCount(cnt)
        }
        // dispatch(increment())
    }

    const renderMessage = () => {
        if (count === 8) {
            return (
                <h4>Maximum players reached!</h4>
            )
        } else if (count === 2) {
            return (
                <h4>Minimum players is 2!</h4>
            )
        }
    }

    const handleDone = async () => {
        const data = {
            playerCount: count
        }
        const docRef = doc(db, "projects", roomId)
        await updateDoc(docRef, data)
        dispatch(nextCard('GetPlayerNames'))
    }

  return (
    <div className='get-players-card'>
        <h2>How Many Players?</h2>
        <div className='set-player-count'>
            <button onClick={handleDecrement}>-</button>
            <h3>{count}</h3>
            <button onClick={handleIncrement}>+</button>
        </div>
        {renderMessage()}
        <button onClick={handleDone}>Accept</button>
    </div>
  )
}

export default GetPlayers