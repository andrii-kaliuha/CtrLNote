import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = { theme: "light" | "dark"; language: string; mainColor: string; trashEnabled: boolean };

const initialState: SettingsState = { theme: "light", language: "ukrainian", mainColor: "purple", trashEnabled: true };

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
    setMainColor: (state, action: PayloadAction<string>) => {
      state.mainColor = action.payload;
    },
    toggleTrash: (state) => {
      state.trashEnabled = !state.trashEnabled;
    },
  },
});

export const { setTheme, setLanguage, setMainColor, toggleTrash } = settingsSlice.actions;

export default settingsSlice.reducer;
