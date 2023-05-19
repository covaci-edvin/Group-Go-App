import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminName: null,
  adminId: null,
  groupName: null,
  destination: null,
  groupId: null,
  joinedMembers: [],
  joinedMembersCoordinates: [],
};

export const invitedRouteSlice = createSlice({
  name: "invitedRoute",
  initialState,
  reducers: {
    setInvitedRouteAdminName: (state, action) => {
      state.adminName = action.payload;
    },
    setInvitedRouteAdminId: (state, action) => {
      state.adminId = action.payload;
    },
    setInvitedRouteGroupName: (state, action) => {
      state.groupName = action.payload;
    },
    setInvitedRouteDestination: (state, action) => {
      state.destination = action.payload;
    },
    addJoinedMember: (state, action) => {
      state.joinedMembers.push(action.payload);
    },
    removeJoinedMember: (state, action) => {
      state.joinedMembers = state.joinedMembers.filter(
        (member) => member.id !== action.payload
      );
    },
    setJoinedMembersCoordinates: (state, action) => {
      state.joinedMembersCoordinates.push(action.payload);
    },
    setInvitedRouteGroupId: (state, action) => {
      state.groupId = action.payload;
    },
    clearInvitedRoute: (state) => {
      state.adminName = null;
      state.adminId = null;
      state.groupName = null;
      state.destination = null;
      state.groupId = null;
      state.joinedMembers = [];
      state.joinedMembersCoordinates = [];
    },
  },
});

export const {
  setInvitedRouteAdminId,
  setInvitedRouteDestination,
  setInvitedRouteAdminName,
  setInvitedRouteGroupName,
  setInvitedRouteGroupId,
  addJoinedMember,
  setJoinedMembersCoordinates,
  removeJoinedMember,
  clearInvitedRoute,
} = invitedRouteSlice.actions;

export const selectInvitedRouteDestination = (state) =>
  state.invitedRoute.destination;
export const selectInvitedRouteAdminName = (state) =>
  state.invitedRoute.adminName;
export const selectInvitedRouteAdminId = (state) => state.invitedRoute.adminId;
export const selectInvitedRouteGroupName = (state) =>
  state.invitedRoute.groupName;
export const selectInvitedRouteGroupId = (state) => state.invitedRoute.groupId;
export const selectJoinedMembers = (state) => state.invitedRoute.joinedMembers;
export const selectJoinedMembersCoordinates = (state) =>
  state.invitedRoute.joinedMembersCoordinates;

export default invitedRouteSlice.reducer;
