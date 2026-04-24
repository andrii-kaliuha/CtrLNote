import { configureStore } from "@reduxjs/toolkit";
import noteEditorReducer from "../../features/editNote/noteEditorSlice";
import notesReducer from "../../features/note/notesSlice";
import searchReducer from "../../features/searchNotes/searchSlice";
import settingsReducer from "../../features/settings/settingsSlice";
import uiReducer from "./uiSlice";
import { hydrateState } from "../../shared/utils/storage";
import { syncMiddleware } from "./syncMiddleware";
import { initialState as settingsInitialState } from "../../features/settings/settingsSlice";
import { initialState as searchInitialState } from "../../features/searchNotes/searchSlice";

const preloadedSettings = hydrateState("settings", settingsInitialState);
const preloadedSearch = hydrateState("search", searchInitialState);

export const store = configureStore({
  reducer: {
    noteEditor: noteEditorReducer,
    notes: notesReducer,
    search: searchReducer,
    settings: settingsReducer,
    ui: uiReducer,
  },
  preloadedState: {
    settings: preloadedSettings,
    search: preloadedSearch,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
