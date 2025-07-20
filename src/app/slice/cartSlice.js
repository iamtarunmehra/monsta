import { createSlice } from "@reduxjs/toolkit";

export let cartSlice = createSlice({
    name: 'cartData',
    initialState: {
        cartAllData: [],
        totalAmount: 0,
        imageBasePath: '',
    },
    reducers: {
        showCart: function (state, reqData) {
            state.cartAllData = reqData.payload
        },
        totalAmount: function (state, reqData) {
            state.totalAmount = reqData.payload
        },
        imageBasePath: function (state, reqData) {
            state.imageBasePath = reqData.payload
        },

    }
})

export const { showCart, imageBasePath, totalAmount } = cartSlice.actions;
export default cartSlice.reducer