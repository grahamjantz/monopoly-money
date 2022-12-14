import React, { useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../../utils/firebase'
import { useDispatch } from 'react-redux'
import { addRoomId } from '../PlayersList/PlayersListSlice'
import { nextCard } from '../CurrentCard/CurrentCardSlice'

const JoinRoom = () => {

    const dispatch = useDispatch()

    const [roomCode, setRoomCode] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(roomCode)
        getRoom()
        dispatch(nextCard('GetPlayerInfo'))
        setRoomCode('')
    }

    async function getRoom() {
        const roomCol = collection(db, 'projects')
        const roomSnapshot = await getDocs(roomCol)
        const roomList = roomSnapshot.docs.map(doc => doc.data())
        const room = roomList.map((room) => {
          if (room.roomId === roomCode) {
            return room
          }
        })
        dispatch(addRoomId(roomCode.toUpperCase()))
        return room
      }
    

  return (
    <div className='join-room'>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='room-name'>Enter Room Code</label>
            <input name='room-name' type='text' onChange={(e) => setRoomCode(e.target.value)} value={roomCode}/>

            <input className='add-player-button' type='submit' value='Join'/>
        </form>
    </div>
  )
}

export default JoinRoom