// // import { configureStore } from "@reduxjs/toolkit";
// // import noteEditorReducer from "./slices/noteEditorSlice";
// // import notesReducer from "./slices/notesSlice";
// // import settingsReducer from "./slices/settingsSlice";

// // export const store = configureStore({
// //   reducer: {
// //     noteEditor: noteEditorReducer,
// //     notes: notesReducer,
// //     settings: settingsReducer,
// //   },
// // });

// // export type RootState = ReturnType<typeof store.getState>;
// // export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import noteEditorReducer from "./slices/noteEditorSlice";
// import notesReducer from "./slices/notesSlice";
// import settingsReducer from "./slices/settingsSlice";

// // Завантаження стану settings з localStorage
// const loadSettingsFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem("settings");
//     if (serializedState === null) return undefined;
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.warn("Помилка при завантаженні settings з localStorage", e);
//     return undefined;
//   }
// };

// // Збереження стану settings у localStorage
// const saveSettingsToLocalStorage = (settingsState: any) => {
//   try {
//     const serializedState = JSON.stringify(settingsState);
//     localStorage.setItem("settings", serializedState);
//   } catch (e) {
//     console.warn("Помилка при збереженні settings в localStorage", e);
//   }
// };

// const preloadedSettings = loadSettingsFromLocalStorage();

// export const store = configureStore({
//   reducer: {
//     noteEditor: noteEditorReducer,
//     notes: notesReducer,
//     settings: settingsReducer,
//   },
//   preloadedState: {
//     settings: preloadedSettings, // використовуємо збережене
//   },
// });

// // Слухаємо зміни і зберігаємо settings
// store.subscribe(() => {
//   const state = store.getState();
//   saveSettingsToLocalStorage(state.settings);
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import noteEditorReducer from "./slices/noteEditorSlice";
import notesReducer from "./slices/notesSlice";
import settingsReducer from "./slices/settingsSlice";

// ======= LOCAL STORAGE HELPERS =======

// Завантаження зі сховища
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

// Збереження в сховище
const saveToLocalStorage = (key: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.warn(`Помилка при збереженні ${key} в localStorage`, e);
  }
};

// Завантаження початкових значень
const preloadedSettings = loadFromLocalStorage("settings");
const preloadedNotes = loadFromLocalStorage("notes");

// ======= СТВОРЕННЯ STORE =======
export const store = configureStore({
  reducer: {
    noteEditor: noteEditorReducer,
    notes: notesReducer,
    settings: settingsReducer,
  },
  preloadedState: {
    settings: preloadedSettings,
    notes: preloadedNotes,
  },
});

// ======= ЗБЕРЕЖЕННЯ ПРИ ЗМІНАХ =======
store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage("settings", state.settings);
  saveToLocalStorage("notes", state.notes);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
