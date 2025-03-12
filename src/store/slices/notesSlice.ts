import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: number;
  title: string;
  content: string;
  date: number;
  pinned?: boolean;
  archive?: boolean;
  trash?: boolean;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    togglePinned: (state, action: PayloadAction<number>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state.notes[index].pinned = !state.notes[index].pinned;
      }
    },
    toggleArchive: (state, action: PayloadAction<number>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state.notes[index].archive = !state.notes[index].archive;
      }
    },
    toggleTrash: (state, action: PayloadAction<number>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state.notes[index].trash = !state.notes[index].trash;
      }
    },
    clearTrash: (state) => {
      state.notes = state.notes.filter((note) => !note.trash);
    },
  },
});

export const { addNote, updateNote, deleteNote, togglePinned, toggleArchive, toggleTrash, clearTrash } = notesSlice.actions;

export default notesSlice.reducer;
