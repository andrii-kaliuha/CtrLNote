import { configureStore } from "@reduxjs/toolkit";
import noteEditorReducer from "./slices/noteEditorSlice";
import notesReducer from "./slices/notesSlice";
import searchReducer from "./slices/searchSlice";
import settingsReducer from "./slices/settingsSlice";
import uiReducer, { setStorageError } from "./slices/uiSlice";

const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    localStorage.removeItem(key);
    console.error(`Критична помилка даних у ${key}. Сховище очищено.`, e);
    return undefined;
  }
};

const hydrateState = (key: string, defaultValue: any) => {
  const saved = loadFromLocalStorage(key);
  if (saved === undefined) return defaultValue;
  return { ...defaultValue, ...saved };
};

const preloadedSettings = hydrateState("settings", {
  theme: "light",
  language: "english",
  mainColor: "green",
  trashEnabled: true,
  autoDeletePeriod: 2592000000,
});

const preloadedNotes = loadFromLocalStorage("notes");
const preloadedSearch = loadFromLocalStorage("search");

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
    notes: preloadedNotes,
    search: preloadedSearch,
  },
});

let saveTimeout: ReturnType<typeof setTimeout>;

store.subscribe(() => {
  if (saveTimeout) clearTimeout(saveTimeout);

  saveTimeout = setTimeout(() => {
    const state = store.getState();
    const currentError = state.ui.storageError;

    try {
      const settings = JSON.stringify(state.settings);
      const notes = JSON.stringify(state.notes);
      const search = JSON.stringify(state.search);

      localStorage.setItem("settings", settings);
      localStorage.setItem("notes", notes);
      localStorage.setItem("search", search);

      if (currentError) store.dispatch(setStorageError(null));

      console.log("Дані синхронізовано з LocalStorage");
    } catch (e: any) {
      const isQuotaError = e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED";

      const message =
        isQuotaError ? "Пам'ять заповнена. Будь ласка, видаліть старі нотатки або очистіть кошик." : "Не вдалося зберегти дані локально.";

      if (currentError !== message) store.dispatch(setStorageError(message));

      console.error("Помилка збереження:", e);
    }
  }, 1000);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
