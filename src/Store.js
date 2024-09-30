import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Features/UserSlice';
import productSlice from "./Features/ProductSlice";
import CartSlice from "./Features/CartSlice";

/////  Here we  are registering the slices into the store /////


const Store = configureStore({

    reducer: {
        user: userSlice.reducer,      ////   this is the UserSlice in features..
        Ecom_Products:productSlice.reducer,
        Cart:CartSlice.reducer,     
    }

});

export default Store; 
