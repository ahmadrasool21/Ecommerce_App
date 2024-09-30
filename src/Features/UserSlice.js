import { createSlice } from "@reduxjs/toolkit";
// import { Navigate } from "react-router-dom";    
const initialState = {
    current_User :null,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{                                //these are the actions//. 
        setCurrentUser:(state,action) => {
            if (action.payload){
            state.current_User=action.payload;
            }
            else{
                state.current_User = null
                alert("session expired");

            }
        },
        // Logout:(state,action)=>{
            // state.currentUser= null;
        //     <Navigate to="/signin"/>

        // }
    }

})

export const {setCurrentUser} = userSlice.actions;      //exporting reducer actions.

export default userSlice;         // exporting the whole slice.