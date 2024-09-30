import { createSlice } from "@reduxjs/toolkit";

export let userSlice = createSlice({
    name: 'users',
    initialState: {
        loggedUser: null
    },
    reducers: {
        login: (state, action) => {
            state.loggedUser = action.payload
        },
        logout: (state, action) => {
            state.loggedUser = null
        },
    }
})


export const {login, logout} = userSlice.actions