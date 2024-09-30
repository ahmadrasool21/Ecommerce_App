import { createSlice } from "@reduxjs/toolkit";

let cartSection = createSlice({
    name: 'cartSection',
    initialState:{
      orderProducts:[],
    },
    reducers:{
        addToCard:(puraData, nyaData)=>{
            puraData?.orderProducts?.push(nyaData.payload)
            // console.log(".................",puraData);
        },
        removeFromCard:(puraData, nyaData)=>{
            puraData?.orderProducts?.splice(nyaData.payload,1);
            // console.log("Product deleted",nyaData.payload)
        },
    },
})

export default cartSection;
export let {addToCard, removeFromCard} = cartSection.actions;