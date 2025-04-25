import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  dateFormat: string;
  timeFormat: string;
  theme: "light" | "dark";
  language: string;
  mainColor: string;
  trashEnabled: boolean;
};

const initialState: SettingsState = {
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24_hour",
  theme: "light",
  language: "ukrainian",
  mainColor: "purple",
  trashEnabled: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDateFormat: (state, action: PayloadAction<string>) => {
      state.dateFormat = action.payload;
    },
    setTimeFormat: (state, action: PayloadAction<string>) => {
      state.timeFormat = action.payload;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      const htmlElement = document.documentElement;
      if (action.payload === "dark") {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setMainColor: (state, action: PayloadAction<string>) => {
      state.mainColor = action.payload;
      const root = document.documentElement as HTMLElement; // Явне приведення типу

      root.style.setProperty("--color-primary", `var(--color-primary-${action.payload})`);

      // Оновлення --color-primary в .dark темі
      const darkThemeElement = root.querySelector(".dark") as HTMLElement | null;
      if (darkThemeElement) {
        darkThemeElement.style.setProperty("--color-primary", `var(--color-primary-${action.payload})`);
      }
    },
    toggleTrash: (state) => {
      state.trashEnabled = !state.trashEnabled;
    },
  },
});

export const { setDateFormat, setTimeFormat, setTheme, setLanguage, setMainColor, toggleTrash } = settingsSlice.actions;

export default settingsSlice.reducer;
