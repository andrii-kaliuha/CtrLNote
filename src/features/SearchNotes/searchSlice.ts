import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SearchState } from "../../shared/types/types";

export const initialState: SearchState = { searchQuery: "" };

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
