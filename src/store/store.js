import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "@/app/slice/loginSlice";
import cartSlice from "@/app/slice/cartSlice";

let myStore = configureStore({
    reducer: {
        loginStore: loginSlice,
        cartStore: cartSlice
    }
})

export default myStore;