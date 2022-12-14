import React, { useState, useEffect } from 'react'
import './StartingAmount.css'

import { useDispatch } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { setStartingAmount } from '../PlayersList/PlayersListSlice'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { db, getRoom } from '../../utils/firebase'
import { roomId } from '../InitializeApp/InitializeApp'

const StartingAmount = () => {

    const dispatch = useDispatch()

    const [amount, setAmount] = useState(1500)
    const [acceptPrice, setAcceptPrice] = useState(true)
    const [playersList, setPlayersList] = useState()

    // const func = async () => {
    //     const roomFetch = await getRoom()
    //     setPlayersList(roomFetch[0].playersList)
    //     return roomFetch
    //   }
      
    //   useEffect(() => {
    //     func()
    //   }, [])


    const handleYes = async () => {
        setAcceptPrice(true)
        if (amount > 0) {
            // const playersListMap = playersList.map((player) => {
            //     if (player.name !== 'Free Parking') {
            //         player.bank = amount
            //     }
            //     return player
            // })

            const docRef = doc(db, "projects", roomId)
            await updateDoc(docRef, {
                "startingAmount": amount
            })

            dispatch(setStartingAmount(amount))
            dispatch(nextCard('GetPlayerInfo'))
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