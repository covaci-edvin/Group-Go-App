import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: {
    coordinates: {
      latitude: null,
      longitude: null,
    },
    description: null,
  },
  distance: null,
  travelTimeInformation: null,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setDistance,
  setTravelTimeInformation,
} = navigationSlice.actions;

export const selectOrigin = (state) => state.navigation.origin;
export const selectDestination = (state) => state.navigation.destination;
export const selectDistance = (state) => state.navigation.distance;
export const selectTravelTimeInformation = (state) =>
  state.navigation.travelTimeInformation;

export default navigationSlice.reducer;
