import React from 'react'
import './Main.css'

import { useSelector, useDispatch } from 'react-redux'
import { selectPlayersList, passGo, setCurrentPlayer } from '../PlayersList/PlayersListSlice'
import { nextCard } from '../CurrentCard/CurrentCardSlice'

const Main = () => {

  const dispatch = useDispatch()
  const playersList = useSelector(selectPlayersList)
  
  const playersListSorted = playersList.slice(1).sort((a, b) => b.net_worth - a.net_worth)

  const playersListActiveSorted = playersListSorted.sort((a, b) => b.active - a.active)

  const handleClickRent = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(nextCard('MakePayment'))
  }
  
  const handleClickBuy = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(nextCard('Buy'))
  }

  const handleClickSell = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(nextCard('Sell'))
  }

  const handleClickTrade = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(nextCard('Trade'))
  }

  // playersListSorted.map((player) => {
  //   if (player.net_worth === 0) {
  //     console.log(player)
  //     player.active === true ? player.active = false : player.active = true
  //   } 
  //   return ''
  // })

  return (
    <div className='main'>
      <div className='leaderboard'>
        <div className='leaderboard-small'>
          <h2>Leaderboard</h2>
          <ol>
            {playersListSorted.map((player) => {
              return (
                <li 
                  key={player.piece}
                  className={player.active === false ? 'inactive' : ''}
                >
                  <h3>{player.name}</h3>
                  <h3>{player.net_worth}</h3>
                </li>
              )
            })}
          </ol>
        </div>
        {playersListActiveSorted.map((player) => {
            return (
              <div className={`player-row ${player.net_worth <= 0 ? 'lost' : ''}`} key={player.piece}>               
                <h3>{player.name}</h3>
                <div className='player-info'>
                  <h4>Bank: <br/>${player.bank}</h4>
                  <h4>Property Value: <br/> ${player.property_value}</h4>
                  <h4>Net Worth: <br/>${player.net_worth}</h4>
                </div>
                <button 
                    onClick={() => dispatch(passGo(player.name))}
                    className='go-button'
                  >
                    GO
                  </button>
                <div className='actions'>
                    <div className='action-buttons'>
                      <button onClick={() => handleClickRent(player)}>
                        RENT
                      </button>
                      <button onClick={() => handleClickBuy(player)}>BUY</button>
                    </div>
                    <div className='action-buttons'>
                      <button onClick={() => handleClickSell(player)}>SELL</button>
                      <button onClick={() => handleClickTrade(player)}>TRADE</button>
                    </div>
                  </div>
                  
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default Main