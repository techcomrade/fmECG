import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import deviceReducer from "./deviceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
