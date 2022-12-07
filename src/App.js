import React from 'react';
import './App.css';

import GetPlayersCount from './features/GetPlayersCount/GetPlayersCount';
import Main from './features/main/Main'
import Header from './features/header/Header';
import GetPlayerNames from './features/GetPlayerNames/GetPlayerNames';
import StartingAmount from './features/StartingAmount/StartingAmount';
import Rent from './features/Rent/Rent';
import Buy from './features/Buy/Buy'
import Sell from './features/Sell/Sell'
import Trade from './features/Trade/Trade'
import Tax from './features/Tax/Tax'

import { useSelector } from 'react-redux'
import { selectCurrentCard } from './features/CurrentCard/CurrentCardSlice';
// import { nextCard } from './features/CurrentCard/CurrentCardSlice'

function App() {

  // const dispatch = useDispatch();

  const currentCard = useSelector(selectCurrentCard)

  const renderCard = () => {
    if (currentCard === 'GetPlayers') {
      return <GetPlayersCount />
    } else if (currentCard === 'GetPlayerNames') {
      return <GetPlayerNames />
    } else if (currentCard ==='StartingAmount') {
      return <StartingAmount />
    } else if (currentCard === 'Main') {
      return <Main />
    } else if (currentCard === 'MakePayment') {
      return <Rent />
    } else if (currentCard === 'Buy') {
      return <Buy />
    } else if (currentCard === 'Sell') {
      return <Sell />
    } else if (currentCard === 'Trade') {
      return <Trade />
    } else if (currentCard === 'Tax') {
      return <Tax />
    }
  }

  // const handleStartOver = () => {
  //   dispatch(nextCard('GetPlayers'))
  // }

  return (
    <div className="App">
      <Header />
      {renderCard()}
      {/* <button onClick={handleStartOver}>Start Over</button> */}
    </div>
  );
}

export default App;
