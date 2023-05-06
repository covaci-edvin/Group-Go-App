import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {},
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export const selectAccount = (state) => state.account;

export default accountSlice.reducer;
