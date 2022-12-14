import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import playersListReducer from '../features/PlayersList/PlayersListSlice'
import CurrentCardReducer from '../features/CurrentCard/CurrentCardSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    current_card: CurrentCardReducer,
    players_list: playersListReducer,
  },
});
