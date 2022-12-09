import React from 'react';
import './App.css';

import GetPlayersCount from './features/GetPlayersCount/GetPlayersCount';
import Main from './features/main/Main'
import Header from './features/header/Header';
import GetPlayerNames from './features/GetPlayerNames/GetPlayerNames';
import StartingAmount from './features/StartingAmount/StartingAmount';

import { useSelector } from 'react-redux'
import { selectCurrentCard } from './features/CurrentCard/CurrentCardSlice';
import Footer from './features/Footer/Footer';

function App() {

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
    } 
  }

  return (
    <div className="App">
      <Header />
      {renderCard()}
      <Footer />
    </div>
  );
}

export default App;
