import React from 'react';
import './App.css';

import GetPlayersCount from './features/GetPlayersCount/GetPlayersCount';
import Main from './features/main/Main'
import Header from './features/header/Header';
import GetPlayerInfo from './features/GetPlayerInfo/GetPlayerInfo';
import StartingAmount from './features/StartingAmount/StartingAmount';
import JoinRoom from './features/JoinRoom/JoinRoom';
import Lobby from './features/Lobby/Lobby';

import { useSelector } from 'react-redux'
import { selectCurrentCard } from './features/CurrentCard/CurrentCardSlice';
import Footer from './features/Footer/Footer';
import InitializeApp from './features/InitializeApp/InitializeApp';

function App() {

  const currentCard = useSelector(selectCurrentCard)

  const renderCard = () => {
    if (currentCard === 'InitializeApp') {
      return <InitializeApp />
    } else if (currentCard === 'GetPlayersCount') {
      return <GetPlayersCount />
    } else if (currentCard === 'GetPlayerInfo') {
      return <GetPlayerInfo />
    } else if (currentCard ==='StartingAmount') {
      return <StartingAmount />
    } else if (currentCard === 'Main') {
      return <Main />
    } else if (currentCard === 'JoinRoom') {
      return <JoinRoom />
    } else if (currentCard === 'Lobby') {
      return <Lobby />
    }
  }

  return (
    <div className="App">
      <Header />
      <div className='render-section'>
        {renderCard()}
      </div>
      <Footer />
    </div>
  );
}

export default App;
