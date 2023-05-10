import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGroup: null,
};

export const selectedGroupSlice = createSlice({
  name: "selectedGroup",
  initialState,
  reducers: {
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    resetSelectedGroup: () => initialState,
  },
});

export const { setSelectedGroup, resetSelectedGroup } =
  selectedGroupSlice.actions;

export const selectSelectedGroup = (state) => state.selectedGroup;

export default selectedGroupSlice.reducer;
