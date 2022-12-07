import React from 'react'

import './Main.css'

import { useSelector, useDispatch } from 'react-redux'
import { selectPlayersList, passGo } from '../PlayersList/PlayersListSlice'
import { nextCard } from '../CurrentCard/CurrentCardSlice'

const Main = () => {

  // const [userPayingRent, setUserPayingRent] = useState(null);

  // console.log(userPayingRent)

  const dispatch = useDispatch()

  const playersList = useSelector(selectPlayersList)
  
  const playersListSorted = playersList.slice(1).sort((a, b) => b.net_worth - a.net_worth)

  const handleClickRent = (player) => {
    dispatch(nextCard('MakePayment'))
  }
  
  const handleClickBuy = () => {
    dispatch(nextCard('Buy'))
  }

  const handleClickSell = () => {
    dispatch(nextCard('Sell'))
  }

  const handleClickTrade = () => {
    dispatch(nextCard('Trade'))
  }

  return (
    <div className='main'>
      <div className='leaderboard'>
        <div className='leaderboard-small'>
          <h2>Leaderboard</h2>
          <ol>
            {playersListSorted.map((player) => {
              return (
                <li key={player.piece}>
                  <h3>{player.name}</h3>
                  <h3>{player.net_worth}</h3>
                </li>
              )
            })}
          </ol>
        </div>
        {playersList.slice(1).map((player) => {
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
                      <button onClick={handleClickRent}>
                        RENT
                      </button>
                      <button onClick={handleClickBuy}>BUY</button>
                    </div>
                    <div className='action-buttons'>
                      <button onClick={handleClickSell}>SELL</button>
                      <button onClick={handleClickTrade}>TRADE</button>
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