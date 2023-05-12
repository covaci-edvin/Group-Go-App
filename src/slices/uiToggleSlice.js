import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGroupSelected: false,
  isUserInvited: false,
  userJoined: false,
};

export const uiToggleSlice = createSlice({
  name: "uiToggle",
  initialState,
  reducers: {
    toggleIsGroupSelected: (state, actions) => {
      state.isGroupSelected = actions.payload;
    },
    setIsUserInvited: (state, actions) => {
      state.isUserInvited = actions.payload;
    },
    setUserJoined: (state, actions) => {
      state.userJoined = actions.payload;
    },
  },
});

export const { toggleIsGroupSelected, setIsUserInvited, setUserJoined } =
  uiToggleSlice.actions;

export const selectIsGroupSelected = (state) => state.uiToggle.isGroupSelected;
export const selectIsUserInvited = (state) => state.uiToggle.isUserInvited;
export const selectUserJoined = (state) => state.uiToggle.userJoined;

export default uiToggleSlice.reducer;
