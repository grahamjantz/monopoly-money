import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    players: [
        {
            name: 'Player One',
            piece: 'Racecar',
            bank: 1000
        },
        {
            name: 'Player Two',
            piece: 'Dog',
            bank: 1500
        },
    ]
};

export const PlayersListSlice = createSlice({
    name: 'players_list',
    initialState,
    reducers: {
        addPlayers: (state, action) => {
            state.players = action.payload
        }
    }
})

export const { addPlayers } = PlayersListSlice.actions

export const selectPlayersList = (state) => state.players_list;

export default PlayersListSlice.reducer