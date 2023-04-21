import { createSlice } from "@reduxjs/toolkit";
// const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
  user: null,
  search:null,
  check:null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setSearch: (state, action) =>{
      state.search = action.payload.search
    },
    setCheck:(state, action) =>{
      state.check = action.payload.check
    }
  },
});

export const { setLogin,setSearch,setCheck } =
  authSlice.actions;
export default authSlice.reducer;