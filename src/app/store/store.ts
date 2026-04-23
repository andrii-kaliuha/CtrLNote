import { configureStore } from "@reduxjs/toolkit";
import noteEditorReducer from "../../features/EditNote/noteEditorSlice";
import notesReducer from "../../widgets/Notes/notesSlice";
import searchReducer from "../../features/SearchNotes/searchSlice";
import settingsReducer from "../../features/Settings/settingsSlice";
import uiReducer from "./uiSlice";
import { hydrateState } from "../../shared/utils/storage";
import { syncMiddleware } from "../../shared/utils/syncMiddleware";

import { initialState as settingsInitialState } from "../../features/Settings/settingsSlice";
import { initialState as searchInitialState } from "../../features/SearchNotes/searchSlice";

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
