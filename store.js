import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./src/slices/navigationSlice";
import uiToggleReducer from "./src/slices/uiToggleSlice";
import editGroupReducer from "./src/slices/editGroupSlice";
import groupsReducer from "./src/slices/groupsSlice";
import selectedGroupReducer from "./src/slices/selectedGroupSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    uiToggle: uiToggleReducer,
    group: editGroupReducer,
    groups: groupsReducer,
    selectedGroup: selectedGroupReducer,
  },
});
