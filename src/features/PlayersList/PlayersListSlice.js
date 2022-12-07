import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    count: 2,
    players: [
        {
            name: 'Bank',
            piece: 'bank',
            bank: 1000000000
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
            state.players.map((player) => player.bank = Number(action.payload))
            state.players.map((player) => player.net_worth = Number(action.payload))
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
        }, 
        makePayment: (state, action) => {
            state.players.map((player) => {
                if (player.name === action.payload.from.name){
                    player.bank -= action.payload.amount
                    player.net_worth -= action.payload.amount
                } 
                if(player.name === action.payload.to.name){
                    player.bank += Number(action.payload.amount)
                    player.net_worth += Number(action.payload.amount)
                }
                return 0
            })
        }, 
        passGo: (state, action) => {
            state.players.map((player) => {
                if (player.name === action.payload) {
                    player.bank += Number(200)
                    player.net_worth += Number(200)
                }
                return 0
            })
        },
        buyProperty: (state, action) => {
            state.players.map((player) => {
                if (player.name === action.payload.from.name) {
                    player.bank -= action.payload.amount
                }
                return 0
            })
        },
        sell: (state, action) => {
            state.players.map((player) => {
                if (player.name === action.payload.to.name) {
                    player.bank += Number(action.payload.amount)
                }
                return 0
            })
        },
        trade: (state, action) => {
            state.players.map((player) => {
                if (player.name === action.payload.pOneName.name) {
                    player.net_worth -= action.payload.pOnePropVal
                    player.net_worth += action.payload.pTwoPropVal
                } else if (player.name === action.payload.pTwoName.name) {
                    player.net_worth -= action.payload.pTwoPropVal
                    player.net_worth += action.payload.pOnePropVal
                }
                return 0
            })
        }
    }
})

export const { addPlayers, setStartingAmount, increment, decrement, makePayment, passGo, buyProperty, sell, trade } = PlayersListSlice.actions

export const selectPlayersList = (state) => state.players_list.players;
export const selectPlayersCount = (state) => state.players_list.count;

export default PlayersListSlice.reducer