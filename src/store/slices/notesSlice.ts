import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import rawNotes from "../../notes.json";

export type Note = { id: string; title: string; text: string; createdAt: number; status: "active" | "pinned" | "archived" | "deleted" };

export type NotesState = { notes: Note[]; searchQuery: string; searchHistory: string[] };

const notesList: Note[] = rawNotes.map((note) => ({
  ...note,
  status: note.status as "active" | "pinned" | "archived" | "deleted",
}));

const initialState: NotesState = { notes: notesList, searchQuery: "", searchHistory: [] };

const findNote = (state: NotesState, id: string) => state.notes.find((note) => note.id === id);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    editNote: (state, action: PayloadAction<{ id: string; title: string; text: string }>) => {
      const note = findNote(state, action.payload.id);
      if (note) {
        note.title = action.payload.title;
        note.text = action.payload.text;
      }
    },
    pinNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note) note.status = "pinned";
    },
    unpinNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note?.status === "pinned") note.status = "active";
    },
    archiveNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note) note.status = "archived";
    },
    unarchiveNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note?.status === "archived") note.status = "active";
    },
    moveToTrash: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note) note.status = "deleted";
    },
    restoreNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note?.status === "deleted") note.status = "active";
    },
    removeNotePermanently: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { editNote, pinNote, unpinNote, archiveNote, unarchiveNote, moveToTrash, restoreNote, removeNotePermanently, setSearchQuery } =
  notesSlice.actions;

export default notesSlice.reducer;
