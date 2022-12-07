import React, { useState } from 'react'
import './Main.css'

import { useSelector, useDispatch } from 'react-redux'
import { selectPlayersList, passGo, setCurrentPlayer, payOutFreeParking } from '../PlayersList/PlayersListSlice'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import Tax from '../Tax/Tax'

const Main = () => {

  const dispatch = useDispatch()
  const playersList = useSelector(selectPlayersList)
  const [payOut, setPayOut] = useState(false)
  const [displayTax, setDisplayTax] = useState(false);
  
  
  const playersListSorted = playersList.slice(1).sort((a, b) => b.net_worth - a.net_worth)

  const playersListActiveSorted = playersList.slice(1).sort((a, b) => b.active - a.active)

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

  const handleClickTax =(player) => {
    dispatch(setCurrentPlayer(player))
    displayTax === false ? setDisplayTax(true) : setDisplayTax(false)
    dispatch(nextCard('Tax'))
  }

  const handleTogglePayOut = () => {
    payOut === false ? setPayOut(true) : setPayOut(false)
  }

  const handlePayoutClick = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(payOutFreeParking())
    setPayOut(false)
  }

  return (
    <div className='main'>
      <div className='leaderboard'>
        <div className='main-header'>
          <div className='main-sub-header'>
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
                      <h3>${player.net_worth}</h3>
                    </li>
                  )
                })}
              </ol>
            </div>
            <div className='free-parking-display'>
                <div className='free-parking-sub-display'>
                  <h3>{playersList[0].name}</h3>
                  <h3>${playersList[0].bank}</h3>
                  <button onClick={handleTogglePayOut}>Pay Out</button>
                </div>
            </div>
          </div>
          <div className={`free-parking-pay-out-display ${payOut === false ? 'pay-out-inactive' : 'pay-out-active'}`}>
            <h3>Select player to receive payout:</h3>
            {playersList.slice(1).map((player) => {
              return (
                <button 
                  onClick={() => handlePayoutClick(player)}
                  key={player.piece}
                >
                  {player.name}
                </button>
              )
            })}
          </div>
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
                <div className='actions'>
                  <div className='action-buttons'>
                    <button 
                        onClick={() => dispatch(passGo(player.name))}
                        className='go-button'
                      >
                        GO
                    </button>
                    <button 
                        onClick={() => handleClickTax(player)}
                        className='tax-button'
                      >
                        TAX
                    </button>

                  </div>
                  {/*THIS DIV BELOW IS MEANT TO ACT AS A MODAL FOR ACCEPTING TAX PAYMENT. WHEN TAX BUTTON IS CLICKED APP IS CURRENTLY SHOWING THIS MODAL FOR ALL PLAYER. THIS NEEDS TO BE FIXED BUT MY BRAIN IS TOO FRIED AT THE MOMENT TO FIX IT. WILL RESORT BACK TO OLD WAY OF RENDERING NEW PAGE FOR TRANSACTIONS FOR THE TIME BEING. IN handleClickTax FUNCTION UNCOMMENT "displayTax === false ? setDisplayTax(true) : setDisplayTax(false)" AND COMMENT OUT "dispatch(nextCard('Tax'))"" TO BEGIN IMPLEMENTING MODALS*/}
                  <div className={`tax-action-button-display ${displayTax === true ? 'display-action-true' : 'display-action-false'}`}>
                    <Tax />
                  </div>
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