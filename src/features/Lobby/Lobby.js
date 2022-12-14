import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { streamGroceryListItems } from '../../utils/firebase'

import { selectRoomId } from '../PlayersList/PlayersListSlice'

import './Lobby.css'


const Lobby = () => {

  const [room, setRoom] = useState()
  const [error, setError] = useState()

  const roomId = useSelector(selectRoomId)

  useEffect(() => {
    const unsubscribe = streamGroceryListItems(roomId,
        (querySnapshot) => {
            const updatedRoom = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
            setRoom(updatedRoom);
            console.log(room)
        },
        (error) => setError('grocery-list-item-get-fail')
    );
    return unsubscribe;
}, [roomId, setRoom]);

  return (
    <div className='lobby'>
        <h3>Lobby</h3>
    </div>
  )
}

export default Lobby