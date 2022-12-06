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
  
  const playersListSorted = playersList.slice(1).sort((a, b) => b.bank - a.bank)


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
        <h2>Leaderboard</h2>
        {playersListSorted.map((player) => {
            return (
              <div className='player-row' key={player.piece}>
                <div>
                    <h3>{player.name}</h3>
                    
                </div>
                <div className='player-info'>
                  <h4>Bank: <br/>${player.bank}</h4>
                  <h4>Net Worth: <br/>${player.net_worth}</h4>
                </div>
                <button 
                    onClick={() => dispatch(passGo(player.name))}
                    className='go-button'
                  >
                    PASS GO
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