// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

export const { signInSuccess, signInFailure, signUpSuccess, signUpFailure, signOut } = userSlice.actions;

export const selectUser = (state) => state.user.currentUser;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectError = (state) => state.user.error;

export default userSlice;
