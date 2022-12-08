import React, { useState } from 'react'
import './Main.css'

import { useSelector, useDispatch } from 'react-redux'
import { selectPlayersList, passGo, setCurrentPlayer, payOutFreeParking, selectCurrentPlayer, selectCurrentAction, setCurrentAction } from '../PlayersList/PlayersListSlice'

import Rent from '../Rent/Rent';
import Buy from '../Buy/Buy'
import Sell from '../Sell/Sell'
import Trade from '../Trade/Trade'
import Tax from '../Tax/Tax'

const Main = () => {

  const dispatch = useDispatch()
  
  const playersList = useSelector(selectPlayersList)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const currentAction = useSelector(selectCurrentAction)
  
  const [payOut, setPayOut] = useState(false)  
  const [displayAction, setDisplayAction] = useState(false)
  
  const playersListSorted = playersList.slice(1).sort((a, b) => b.net_worth - a.net_worth)
  const playersListActiveSorted = playersList.slice(1).sort((a, b) => b.active - a.active)

  const toggleActions = () => {
    setDisplayAction(true)
  }

  const handleClickRent = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(setCurrentAction('Rent'))
    toggleActions()
  }
  
  const handleClickBuy = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(setCurrentAction('Buy'))
    toggleActions()
  }
  
  const handleClickSell = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(setCurrentAction('Sell'))
    toggleActions()
  }
  
  const handleClickTrade = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(setCurrentAction('Trade'))
    toggleActions()
  }
  
  const handleClickTax =(player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(setCurrentAction('Tax'))
    toggleActions()
  }

  const handleTogglePayOut = () => {
    payOut === false ? setPayOut(true) : setPayOut(false)
  }

  const handlePayoutClick = (player) => {
    dispatch(setCurrentPlayer(player))
    dispatch(payOutFreeParking())
    setPayOut(false)
  }

  const displayActionButton = (action) => {
    if (action === 'Tax') {
      return <Tax setDisplayAction={setDisplayAction}/>
    } else if (action === 'Rent') {
      return <Rent setDisplayAction={setDisplayAction}/>
    } else if (action === 'Buy') {
      return <Buy setDisplayAction={setDisplayAction}/>
    } else if (action === 'Sell') {
      return <Sell setDisplayAction={setDisplayAction}/>
    } else if (action === 'Trade') {
      return <Trade setDisplayAction={setDisplayAction}/>
    }
  }

  return (
    <div className='main'>
      <div className='leaderboard'>
        <div className='main-header'>
          <div className='main-sub-header'>

{/**************** LEADERBOARD  ****************/}
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

{/**************** FREE PARKING DISPLAY ****************/}
            <div className='free-parking-display'>
                <div className='free-parking-sub-display'>
                  <h3>{playersList[0].name}</h3>
                  <h3>${playersList[0].bank}</h3>
                  <button onClick={handleTogglePayOut}>Pay Out</button>
                </div>
            </div>
          </div>

{/**************** FREE PARKING PAYOUT DISPLAY ****************/}
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

{/**************** PLAYLIST ACTIVE SORTED ****************/}
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

{/**************** ACTION BUTTONS ROW 1 ****************/}
                  <div className='action-buttons'>
                    <button className='go-button' onClick={() => dispatch(passGo(player.name))}>GO</button>
                    <button className='tax-button' onClick={() => handleClickTax(player)}>TAX</button>
                  </div>

                  {/* TAX ACTION */}
                  <div className={`${displayAction === true && player.name === currentPlayer.name ? 'display-action-true' : 'display-action-false'}`}>
                    {currentAction === 'Tax' ? displayActionButton('Tax') : ''}
                  </div>

{/**************** ACTION BUTTONS ROW 2 ****************/}
                  <div className='action-buttons'>
                    <button onClick={() => handleClickRent(player)}>RENT</button>
                    <button onClick={() => handleClickBuy(player)}>BUY</button>
                  </div>

                  {/* RENT ACTION */}
                  <div className={`${displayAction === true && player.name === currentPlayer.name ? 'display-action-true' : 'display-action-false'}`}>
                    {currentAction === 'Rent' ? displayActionButton('Rent') : ''}
                  </div>
                  {/* BUY ACTION */}
                  <div className={`${displayAction === true && player.name === currentPlayer.name ? 'display-action-true' : 'display-action-false'}`}>
                    {currentAction === 'Buy' ? displayActionButton('Buy') : ''}
                  </div>

{/**************** ACTION BUTTONS ROW 3 ****************/}
                  <div className='action-buttons'>
                    <button onClick={() => handleClickSell(player)}>SELL</button>
                    <button onClick={() => handleClickTrade(player)}>TRADE</button>
                  </div>

                  {/* SELL ACTION */}
                  <div className={`${displayAction === true && player.name === currentPlayer.name ? 'display-action-true' : 'display-action-false'}`}>
                    {currentAction === 'Sell' ? displayActionButton('Sell') : ''}
                  </div>
                  {/* TRADE ACTION */}
                  <div className={`${displayAction === true && player.name === currentPlayer.name ? 'display-action-true' : 'display-action-false'}`}>
                    {currentAction === 'Trade' ? displayActionButton('Trade') : ''}
                  </div>
                </div>
              </div>
            )
        })}
{/**************** END OF PLAYERSLIST ACTIVE SORTED ****************/}
      </div>
    </div>
  )
}

export default Main