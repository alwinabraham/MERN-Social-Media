import { createSlice } from "@reduxjs/toolkit";
// const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    }
  },
});

export const { setLogin } =
  authSlice.actions;
export default authSlice.reducer;