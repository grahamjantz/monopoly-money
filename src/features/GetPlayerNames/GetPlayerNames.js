import React, { useState } from 'react'

import './GetPlayerNames.css'

import { useSelector, useDispatch } from 'react-redux'
// import { selectPlayersCount } from '../Players/PlayersCountSlice'
import { addPlayers,selectPlayersCount } from '../PlayersList/PlayersListSlice'
import { nextCard } from '../CurrentCard/CurrentCardSlice'

let checkPlayersCount = 0

const GetPlayerNames = () => {

  const dispatch = useDispatch();

  const playersCount = useSelector(selectPlayersCount)

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
    name: 'Bank',
    piece: 'bank',
    bank: 1000000000
},])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name !== '' && piece !== '' && piece !== '--Please Choose an Option--' && checkPlayersCount < playersCount) {
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

  const handleDone = () => {
    if (players.length === playersCount + 1) {
      dispatch(addPlayers(players))
      dispatch(nextCard('StartingAmount'))
    }
  }

  const checkPlayerNumber = () => {
    if (checkPlayersCount === playersCount) {
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
        <h3>{checkPlayersCount}/{playersCount} Players Selected</h3>
        <form className='get-player-names-form' onSubmit={handleSubmit}>

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