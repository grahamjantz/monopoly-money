import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    count: 2,
    players: [
        {
            name: 'Free Parking',
            bank: 0
        },
    ],
    currentPlayer: '',
    currentAction: '',
};

export const PlayersListSlice = createSlice({
    name: 'players_list',
    initialState,
    reducers: {
        addPlayers: (state, action) => {
            state.players = action.payload
        },
        setStartingAmount: (state, action) => {
            state.players.slice(1).map((player) => player.bank = Number(action.payload))
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
                if (player.name === state.currentPlayer.name){
                    player.bank -= action.payload.amount
                    player.net_worth -= action.payload.amount
                    player.net_worth === 0 ? player.active = false : player.active = true
                } 
                if(player.name === action.payload.to.name){
                    player.bank += action.payload.amount
                    player.net_worth += action.payload.amount
                }
                return ''
            })
        }, 
        passGo: (state, action) => {
            state.players.map((player) => {
                if (player.name === action.payload) {
                    player.bank += Number(200)
                    player.net_worth += Number(200)
                    player.net_worth === 0 ? player.active = false : player.active = true
                }
                return 0
            })
        },
        buyProperty: (state, action) => {
            state.players.map((player) => {
                if (player.name === state.currentPlayer.name) {
                    player.bank -= action.payload.amount
                    player.property_value += action.payload.amount
                    player.net_worth === 0 ? player.active = false : player.active = true
                }
                return ''
            })
        },
        payToFreeParking: (state, action) => {
            state.players.map((player) => {
                if (player.name === state.currentPlayer.name) {
                    player.bank -= action.payload.amount
                    player.net_worth -= action.payload.amount

                    player.net_worth === 0 ? player.active = false : player.active = true
                } 
                if (player.name === 'Free Parking') {
                    player.bank += action.payload.amount
                }
                return ''
            })
        },
        payOutFreeParking: (state) => {
            state.players.map((player) => {
                if (player.name === state.currentPlayer.name) {
                    player.bank += state.players[0].bank
                    player.net_worth += state.players[0].bank
                    state.players[0].bank = 0

                    player.net_worth === 0 ? player.active = false : player.active = true
                }
                return ''
            })
        },
        sell: (state, action) => {
            state.players.map((player) => {
                if (player.name === state.currentPlayer.name) {
                    player.bank += action.payload.amount
                    player.property_value -= action.payload.amount
                    player.net_worth === 0 ? player.active = false : player.active = true
                }
                return 0
            })
        },
        trade: (state, action) => {
            state.players.map((player) => {
                if (player.name === state.currentPlayer.name) {
                    player.net_worth -= action.payload.pOnePropVal
                    player.net_worth += action.payload.pTwoPropVal

                    player.property_value -= action.payload.pOnePropVal
                    player.property_value += action.payload.pTwoPropVal

                    player.net_worth === 0 ? player.active = false : player.active = true
                } else if (player.name === action.payload.pTwoName.name) {
                    player.net_worth -= action.payload.pTwoPropVal
                    player.net_worth += action.payload.pOnePropVal

                    player.property_value -= action.payload.pTwoPropVal
                    player.property_value += action.payload.pOnePropVal

                    player.net_worth === 0 ? player.active = false : player.active = true
                }
                return 0
            })
        },
        setCurrentPlayer: (state, action) => {
            state.currentPlayer = action.payload
        },
        setCurrentAction: (state, action) => {
            state.currentAction = action.payload
        }
    }
})

export const { addPlayers, setStartingAmount, increment, decrement, makePayment, payToFreeParking, payOutFreeParking, passGo, buyProperty, sell, trade, setCurrentPlayer, setCurrentAction } = PlayersListSlice.actions

export const selectPlayersList = (state) => state.players_list.players;
export const selectPlayersCount = (state) => state.players_list.count;
export const selectCurrentPlayer = (state) => state.players_list.currentPlayer
export const selectCurrentAction = (state) => state.players_list.currentAction

export default PlayersListSlice.reducer