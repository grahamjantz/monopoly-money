import React, { useEffect, useState } from 'react'

import './GetPlayerInfo.css'

import {  useDispatch } from 'react-redux'
// import { selectPlayersCount } from '../Players/PlayersCountSlice'
import { addPlayers,selectPlayersCount, selectRoomId } from '../PlayersList/PlayersListSlice'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { getRoom } from '../../utils/firebase'
import { db } from '../../utils/firebase'
import { roomId } from '../InitializeApp/InitializeApp'
import { updateDoc, doc } from 'firebase/firestore/lite'

const GetPlayerInfo = () => {
  const dispatch = useDispatch();

  // const playersCount = useSelector(selectPlayersCount)
  
    const [room, setRoom] = useState(null)
    const [name, setName] = useState('');
    const [piece, setPiece] = useState('')
    const [playerSubmitted, setPlayerSubmitted] = useState(false)
    const [players, setPlayers] = useState([{
        name: 'Free Parking',
        bank: 0
    },])
  
  const func = async () => {
    const roomFetch = await getRoom()
    setRoom(roomFetch)
    // setPlayers(roomFetch[0].playersList)
    if (room !== null) {
        console.log(room[0].playersList)
    }
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
    
    
  const handleAddPlayer = async (e) => {
    e.preventDefault()
    if (name !== '' && piece !== '' && piece !== '--Please Choose an Option--') {

    //     setPlayers([...players, {
    //       name: name, 
    //       piece: piece, 
    //       bank: 1500, 
    //       property_value: 0,
    //       net_worth: 0,
    //       active: true,
    //     }
    //   ])
        const data = {
            "playersList": [...room[0].playersList, {
                name: name,
                piece: piece,
                bank: room[0].startingAmount,
                property_value: 0,
                net_worth: room[0].startingAmount,
                active: true
            }]
        }

        const docRef = doc(db, "projects", roomId)
        await updateDoc(docRef, data)

      const tempOptions = options.filter((option) => {
        if (option.value !== piece) {
          return option
        }
        return 0 
      })
      setOptions(tempOptions)
      setName('')
      setPiece('')
      setPlayerSubmitted(true)
    }
  }

  const handleDone = async () => {
      const data = {
        playersList: players
      }

      const docRef = doc(db, "projects", roomId)
      await updateDoc(docRef, data)

      dispatch(addPlayers(players))
      dispatch(nextCard('Main'))
  }


  return (
    <div >
        {
            playerSubmitted === false ? (
                <div className='get-player-names'>
                    <h2>Enter Player Name:</h2>
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
                    </form>
                </div>
            ) : (
                <div className='get-player-names'>
                    {
                        room !== null ? (
                            room[0].playersList.slice(1).map((player) => {
                                return (
                                <div key={player.piece} className='get-player-names-list'>
                                    <p>{player.name}</p>
                                    <p>{player.piece}</p>
                                </div>
                                )
                            })
                        ) : ''
                    }
                    <button onClick={handleDone}>Done</button>
                </div>
            )
        }
    </div>
  )
}

export default GetPlayerInfo