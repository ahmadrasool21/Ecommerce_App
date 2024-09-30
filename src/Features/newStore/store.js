import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {userSlice} from "./userSlice"; 
import cartSection from "./cart";

let allSection = combineReducers({

    cartSection:cartSection.reducer,
    userSlice:userSlice.reducer,
   
    
})  

export let meraStore = configureStore({reducer:allSection});

 