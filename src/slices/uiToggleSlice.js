import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGroupSelected: false,
  isUserInvited: false,
  userJoined: false,
  isInvitationSent: false,
  routeStarted: false,
  groupRouteStarted: false,
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
    setIsInvitationSent: (state, actions) => {
      state.isInvitationSent = actions.payload;
    },
    setRouteStarted: (state, actions) => {
      state.routeStarted = actions.payload;
    },
    setGroupRouteStarted: (state, actions) => {
      state.groupRouteStarted = actions.payload;
    },
  },
});

export const {
  toggleIsGroupSelected,
  setIsUserInvited,
  setUserJoined,
  setIsInvitationSent,
  setRouteStarted,
  setGroupRouteStarted,
} = uiToggleSlice.actions;

export const selectIsGroupSelected = (state) => state.uiToggle.isGroupSelected;
export const selectIsUserInvited = (state) => state.uiToggle.isUserInvited;
export const selectUserJoined = (state) => state.uiToggle.userJoined;
export const selectInvitationSent = (state) => state.uiToggle.isInvitationSent;
export const selectRouteStarted = (state) => state.uiToggle.routeStarted;
export const selectGroupRouteStarted = (state) =>
  state.uiToggle.groupRouteStarted;

export default uiToggleSlice.reducer;
