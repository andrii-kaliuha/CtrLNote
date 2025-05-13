import { configureStore } from "@reduxjs/toolkit";
import noteEditorReducer from "./slices/noteEditorSlice";
import notesReducer from "./slices/notesSlice";
import searchReducer from "./slices/searchSlice";
import settingsReducer from "./slices/settingsSlice";

const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(`Помилка при завантаженні ${key} з localStorage`, e);
    return undefined;
  }
};

const saveToLocalStorage = (key: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.warn(`Помилка при збереженні ${key} в localStorage`, e);
  }
};

const preloadedSettings = loadFromLocalStorage("settings");
const preloadedNotes = loadFromLocalStorage("notes");
const preloadedSearch = loadFromLocalStorage("search");

export const store = configureStore({
  reducer: {
    noteEditor: noteEditorReducer,
    notes: notesReducer,
    search: searchReducer,
    settings: settingsReducer,
  },
  preloadedState: {
    settings: preloadedSettings,
    notes: preloadedNotes,
    search: preloadedSearch,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage("settings", state.settings);
  saveToLocalStorage("notes", state.notes);
  saveToLocalStorage("search", state.search);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
