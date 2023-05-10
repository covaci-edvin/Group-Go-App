import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGroupSelected: false,
};

export const uiToggleSlice = createSlice({
  name: "uiToggle",
  initialState,
  reducers: {
    toggleIsGroupSelected: (state, actions) => {
      state.isGroupSelected = actions.payload;
    },
  },
});

export const { toggleIsGroupSelected } = uiToggleSlice.actions;

export const selectIsGroupSelected = (state) => state.uiToggle.isGroupSelected;

export default uiToggleSlice.reducer;
