import React from 'react'

import { useDispatch } from 'react-redux';
import { nextCard } from '../CurrentCard/CurrentCardSlice';
import { addRoomId } from '../PlayersList/PlayersListSlice';

import { doc, setDoc } from "firebase/firestore/lite"; 
import { db, getPlayersCount } from '../../utils/firebase'

const InitializeApp = () => {
    const dispatch = useDispatch()

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const generateRoomId = () => {
        let id = ''
        const ranIndex = () => {
            return Math.floor(Math.random() * 26)
        }
        for (let i = 0; i < 4; i++) {
            id += letters[ranIndex()]
        }
        return id
    }


    getPlayersCount()

    const handleHostRoom = async () => {
        const roomId = generateRoomId()
        await setDoc(doc(db, "projects", roomId),{
            roomId: roomId,
            playerCount: 2,
            playersList: [
                {
                    name: 'Free Parking',
                    bank: 0
                }
            ]
        });
        dispatch(nextCard('GetPlayersCount'))
        dispatch(addRoomId(roomId))
    }

    const handleJoinRoom = () => {

    }
  return (
    <div className='initialize-app'>
        <h2>Welcome!</h2>
        <h4>This web App is designed to replace paper Monopoly money. Please follow the set up instructions to begin using the app.</h4>
        <h5>For instructions please click <a href='https://github.com/grahamjantz/monopoly-money'>here</a></h5>
        <button onClick={handleHostRoom}>Host Room</button>
        <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  )
}

export default InitializeApp