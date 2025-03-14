import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/notesSlice";
import menuReducer from "./slices/menuSlice";

const store = configureStore({
  reducer: {
    note: noteReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
