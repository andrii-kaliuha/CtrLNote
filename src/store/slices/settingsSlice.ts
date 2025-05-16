import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SettingsState } from "../../shared/types/types";

const initialState: SettingsState = { theme: "light", language: "english", mainColor: "red", trashEnabled: true, autoDeletePeriod: 2592000000 };

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setAutoDeletePeriod: (state, action: PayloadAction<number>) => {
      state.autoDeletePeriod = action.payload;
    },
    setMainColor: (state, action: PayloadAction<string>) => {
      state.mainColor = action.payload;
    },
    toggleTrash: (state) => {
      state.trashEnabled = !state.trashEnabled;
    },
  },
});

export const { setTheme, setLanguage, setAutoDeletePeriod, setMainColor, toggleTrash } = settingsSlice.actions;

export default settingsSlice.reducer;
