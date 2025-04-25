import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
