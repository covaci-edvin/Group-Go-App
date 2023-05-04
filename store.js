import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";
import uiToggleReducer from "./slices/uiToggleSlice";
import accountReducer from "./slices/accountSlice";

import editGroupReducer from "./slices/editGroupSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    uiToggle: uiToggleReducer,
    account: accountReducer,
    group: editGroupReducer,
  },
});
