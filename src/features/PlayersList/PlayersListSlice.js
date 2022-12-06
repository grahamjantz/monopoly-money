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
            state.players.map((player) => player.bank = action.payload)
            state.players.map((player) => player.net_worth = action.payload)
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
                    player.bank += 200
                    player.net_worth += 200
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
                if (player.name.toLowerCase() === action.payload.pOneName.toLowerCase()) {
                    player.net_worth -= Number(action.payload.pOnePropVal)

                    player.net_worth += Number(action.payload.pTwoPropval)
                } else if (player.name.toLowerCase() === action.payload.pTwoName.toLowerCase()) {
                    player.net_worth -= Number(action.payload.pTwoPropval)
                    player.net_worth += Number(action.payload.pOnePropVal)
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