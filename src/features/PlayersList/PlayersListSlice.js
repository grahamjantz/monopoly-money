import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    count: 2,
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
        },
        setStartingAmount: (state, action) => {
            state.players.map((player) => player.bank = action.payload)
        },
        increment: (state) => {
            if (state.count < 8) {
                state.count++
            }
        },
        decrement: (state) => {
            if (state.count > 2) {
                state.count--
            }
        }
    }
})

export const { addPlayers, setStartingAmount, increment, decrement } = PlayersListSlice.actions

export const selectPlayersList = (state) => state.players_list.players;
export const selectPlayersCount = (state) => state.players_list.count;

export default PlayersListSlice.reducer