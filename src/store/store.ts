import { configureStore } from "@reduxjs/toolkit";
import noteEditorReducer from "./slices/noteEditorSlice";
import notesReducer from "./slices/notesSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    noteEditor: noteEditorReducer,
    notes: notesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
