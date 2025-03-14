import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Note = { id: string; title: string; text: string; date: string };

interface MenuState {
  archived: Note[];
  deleted: Note[];
  pinned: Note[];
}

const initialState: MenuState = {
  archived: [],
  deleted: [],
  pinned: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    archiveNote: (state, action: PayloadAction<Note>) => {
      state.archived.unshift(action.payload);
    },
    deleteNote: (state, action: PayloadAction<Note>) => {
      state.deleted.unshift(action.payload);
    },
    pinnedNote: (state, action: PayloadAction<Note>) => {
      state.pinned.unshift(action.payload);
    },
    unarchiveNote: (state, action: PayloadAction<string>) => {
      state.archived = state.archived.filter((note) => note.id !== action.payload);
    },
    restoreNote: (state, action: PayloadAction<string>) => {
      state.deleted = state.deleted.filter((note) => note.id !== action.payload);
    },
    unpinnedNote: (state, action: PayloadAction<string>) => {
      state.pinned = state.pinned.filter((note) => note.id !== action.payload);
    },
  },
});

export const { archiveNote, deleteNote, pinnedNote, unarchiveNote, restoreNote, unpinnedNote } = menuSlice.actions;
export default menuSlice.reducer;
