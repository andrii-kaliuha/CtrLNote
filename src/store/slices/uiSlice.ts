import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = { storageError: string | null };

const initialState: UIState = { storageError: null };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setStorageError: (state, action: PayloadAction<string | null>) => {
      state.storageError = action.payload;
    },
  },
});

export const { setStorageError } = uiSlice.actions;

export default uiSlice.reducer;
