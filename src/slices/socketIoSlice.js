import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketId: null,
};

export const socketIoSlice = createSlice({
  name: "socketIo",
  initialState,
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
  },
});

export const { setSocketId } = socketIoSlice.actions;

export const selectSocketId = (state) => state.socketIo.socketId;

export default socketIoSlice.reducer;
