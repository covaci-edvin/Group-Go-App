import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./src/slices/navigationSlice";
import uiToggleReducer from "./src/slices/uiToggleSlice";
import accountReducer from "./src/slices/accountSlice";
import editGroupReducer from "./src/slices/editGroupSlice";
import groupsReducer from "./src/slices/groupsSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    uiToggle: uiToggleReducer,
    account: accountReducer,
    group: editGroupReducer,
    groups: groupsReducer,
  },
});
