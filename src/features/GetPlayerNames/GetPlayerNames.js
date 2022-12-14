import React, { useEffect, useState } from 'react'

import './GetPlayerNames.css'

import {  useDispatch } from 'react-redux'
// import { selectPlayersCount } from '../Players/PlayersCountSlice'
import { addPlayers,selectPlayersCount, selectRoomId } from '../PlayersList/PlayersListSlice'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { getRoom } from '../../utils/firebase'
import { db } from '../../utils/firebase'
import { roomId } from '../InitializeApp/InitializeApp'
import { updateDoc, doc } from 'firebase/firestore/lite'

let checkPlayersCount = 0

const GetPlayerNames = () => {
  const dispatch = useDispatch();

  // const playersCount = useSelector(selectPlayersCount)
  
  const [room, setRoom] = useState()
  const [playerCount, setPlayerCount] = useState(2)
  
  const func = async () => {
    const roomFetch = await getRoom()
    setRoom(roomFetch)
    setPlayerCount(roomFetch[0].playerCount)
    return roomFetch
  }
  
  useEffect(() => {
    func()
  }, [])
  
  const [options, setOptions] = useState(
    [
      {
        value: 'Racecar',
        text: 'Racecar'
      },
      {
        value: 'Top Hat',
        text: 'Top Hat'
      },
      {
        value: 'Dog',
        text: 'Dog'
      },
      {
        value: 'Thimble',
        text: 'Thimble'
      },
      {
        value: 'Boat',
        text: 'Boat'
      },
      {
        value: 'Shoe',
        text: 'Shoe'
      },
      {
        value: 'Iron',
        text: 'Iron'
      },
      {
        value: 'Wagon',
        text: 'Wagon'
      },
    ]
    )
    const [name, setName] = useState('');
    const [piece, setPiece] = useState('')
    const [players, setPlayers] = useState([{
      name: 'Free Parking',
      bank: 0
    },])
    
  const handleAddPlayer = (e) => {
    e.preventDefault()
    if (name !== '' && piece !== '' && piece !== '--Please Choose an Option--' && checkPlayersCount < playerCount) {
      setPlayers([...players, {
        name: name, 
        piece: piece, 
        bank: 1500, 
        property_value: 0,
        net_worth: 0,
        active: true,
      }
    ])
      const tempOptions = options.filter((option) => {
        if (option.value !== piece) {
          return option
        }
        return 0 
      })
      setOptions(tempOptions)
      setName('')
      setPiece('')
      checkPlayersCount++;
    }
  }

  const handleDone = async () => {
    if (players.length === playerCount + 1) {
      const data = {
        playersList: players
      }

      const docRef = doc(db, "projects", roomId)
      await updateDoc(docRef, data)

      dispatch(addPlayers(players))
      dispatch(nextCard('StartingAmount'))
    }
  }

  const checkPlayerNumber = () => {
    if (checkPlayersCount === playerCount) {
      return (
        <p>Maximum Number of Players reached!</p>
      )
    } else {
      return (
        <p>Please Enter all players!</p>
      )
    }
  }

  return (
    <div className='get-player-names'>
        <h2>Enter Player Names:</h2>
        <h3>{checkPlayersCount}/{playerCount} Players Selected</h3>
        <form className='get-player-names-form' onSubmit={handleAddPlayer}>

            <label htmlFor='name'>Enter Name:</label>
            <input type='text' placeholder='Name' name='name' value={name} onChange={(e) => setName(e.target.value)}/>

            <label htmlFor='select-piece'>Select Game Piece:</label>
            <select name='select-piece' onChange={(e) => setPiece(e.target.value)} value={piece}>
              <option defaultValue='defaultValue'>--Please Choose an Option--</option>
              {options.map((option) => {
                return (
                  <option 
                    value={option.value}
                    key={option.value}
                  >
                    {option.text}
                  </option>
                )
              })}
            </select>
            <input className='add-player-button' type='submit' value='Add Player'/>
            {checkPlayerNumber()}
        </form>
        {players.slice(1).map((player) => {
            return (
              <div key={player.piece} className='get-player-names-list'>
                <p>{player.name}</p>
                <p>{player.piece}</p>
              </div>
            )
        })}
        <button onClick={handleDone}>Done</button>
        {/* <button onClick={handleGoBack}>Go Back</button> */}
    </div>
  )
}

export default GetPlayerNames