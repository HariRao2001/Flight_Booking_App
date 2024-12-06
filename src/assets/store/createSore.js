import {createStore} from "redux";

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name:"bookingApp",
    initialState : {
        userDetails : {},
        passengerDetails:{},
        passengerFlightBookingDetails:{},
        selectedFlightDetails : {},
        boardingDetailsArr : [],
        selectedSeats : []

    },
    reducers : {
        addUserDetails(state, action){            
            state.userDetails = {...action.payload}
        },

        addPassengerBookingDetails(state, action){
            state.passengerFlightBookingDetails = action.payload;
        },

        addSelectedFlightDetails(state, action){
            state.selectedFlightDetails = action.payload;
        },
        
        boardingHandler(state, action){
            state.boardingDetailsArr.unshift(action.payload);
        },
        boardingArrHandler(state, action){
            state.boardingDetailsArr = action.payload;
        },
       
        confirmSelectedSeats(state, action){
            state.selectedSeats = action.payload;
        },
        passengersDetailsHandler(state, action){
            state.passengerDetails = action.payload;
        },

        resetPassengersDetails(state){
            state.passengerFlightBookingDetails = {};
            state.selectedFlightDetails = {};
            state.selectedSeats = [];
        }

       
    }
})

const store = createStore(counterSlice.reducer);

export const bookingActions = counterSlice.actions;

export default store;
