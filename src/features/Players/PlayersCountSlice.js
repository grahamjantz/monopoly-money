import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 2
};

export const PlayersCountSlice = createSlice({
    name: 'players_count',
    initialState, 
    reducers: {
        increment: (state) => {
            if (state.value < 8) {
                state.value++
            }
        },
        decrement: (state) => {
            if (state.value > 2) {
                state.value--
            }
        }
    }
})

export const { increment, decrement } = PlayersCountSlice.actions

export const selectPlayersCount = (state) => state.players_count.value

export default PlayersCountSlice.reducer