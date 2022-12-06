import React from 'react';
import './App.css';

import GetPlayers from './features/GetPlayers/GetPlayers';
import Main from './features/main/Main'
import Header from './features/header/Header';
import GetPlayerNames from './features/GetPlayerNames/GetPlayerNames';
import StartingAmount from './features/StartingAmount/StartingAmount'

import { useSelector } from 'react-redux'
import { selectCurrentCard } from './features/CurrentCard/CurrentCardSlice';
// import { nextCard } from './features/CurrentCard/CurrentCardSlice'

function App() {

  // const dispatch = useDispatch();

  const currentCard = useSelector(selectCurrentCard)

  const renderCard = () => {
    if (currentCard === 'GetPlayers') {
      return <GetPlayers />
    } else if (currentCard === 'GetPlayerNames') {
      return <GetPlayerNames />
    } else if (currentCard ==='StartingAmount') {
      return <StartingAmount />
    } else if (currentCard === 'Main') {
      return <Main />
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
