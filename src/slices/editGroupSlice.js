import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  group: {},
};

export const editGroupSlice = createSlice({
  name: "editGroup",
  initialState,
  reducers: {
    setEditGroup: (state, action) => {
      state.group = action.payload;
    },
  },
});

export const { setEditGroup } = editGroupSlice.actions;

export const selectEditGroup = (state) => state.group;

export default editGroupSlice.reducer;
