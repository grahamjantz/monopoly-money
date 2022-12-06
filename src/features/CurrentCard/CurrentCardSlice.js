import { createSlice } from "@reduxjs/toolkit";
import GetPlayers from "../GetPlayers/GetPlayers";

const initialState = {
    value: 'GetPlayers'
}

export const CurrentCardSlice = createSlice({
    name: 'current_card',
    initialState,
    reducers: {
        nextCard: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { nextCard } = CurrentCardSlice.actions

export const selectCurrentCard = (state) => state.current_card.value;

export default CurrentCardSlice.reducer