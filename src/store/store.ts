import { configureStore } from "@reduxjs/toolkit";
import noteEditorReducer from "./slices/noteEditorSlice";
import notesReducer, { setNotes } from "./slices/notesSlice";
import searchReducer from "./slices/searchSlice";
import settingsReducer from "./slices/settingsSlice";
import uiReducer, { setStorageError } from "./slices/uiSlice";
import { db } from "../db";

const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(`Помилка читання ${key}:`, e);
    return undefined;
  }
};

const hydrateState = (key: string, defaultValue: any) => {
  const saved = loadFromLocalStorage(key);
  return saved === undefined ? defaultValue : { ...defaultValue, ...saved };
};

const preloadedSettings = hydrateState("settings", {
  theme: "light",
  language: "english",
  mainColor: "green",
  trashEnabled: true,
  autoDeletePeriod: 2592000000,
});

const preloadedSearch = hydrateState("search", { searchQuery: "" });

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
});

export const initializeApp = async () => {
  try {
    const savedNotes = await db.notes.toArray();
    if (savedNotes.length > 0) {
      store.dispatch(setNotes(savedNotes));
      console.log("Нотатки завантажено з IndexedDB");
    }
  } catch (error) {
    console.error("Помилка завантаження нотаток:", error);
  }
};

initializeApp();

// --- Синхронізація (Middleware заміна) ---
let saveTimeout: ReturnType<typeof setTimeout>;

store.subscribe(() => {
  if (saveTimeout) clearTimeout(saveTimeout);

  saveTimeout = setTimeout(async () => {
    const state = store.getState();
    const currentError = state.ui.storageError;

    try {
      localStorage.setItem("settings", JSON.stringify(state.settings));
      localStorage.setItem("search", JSON.stringify(state.search));

      await db.transaction("rw", db.notes, async () => {
        await db.notes.clear();
        await db.notes.bulkAdd(state.notes.notes);
      });

      if (currentError) store.dispatch(setStorageError(null));
      console.log("Дані успішно синхронізовано (LocalStorage + IndexedDB)");
    } catch (e: any) {
      console.error("Помилка синхронізації:", e);
      const message = "Не вдалося зберегти дані у внутрішню базу.";
      if (currentError !== message) store.dispatch(setStorageError(message));
    }
  }, 1000);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
