import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthLoading: false,
};

export const loadersSlice = createSlice({
  name: "loaders",
  initialState,
  reducers: {
    setIsAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { setIsAuthLoading } = loadersSlice.actions;

export const selectIsAuthLoading = (state) => state.loaders.isAuthLoading;

export default loadersSlice.reducer;
