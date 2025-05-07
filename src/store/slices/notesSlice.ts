import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { NoteProps, NoteStatus, NotesState } from "../../types";

import rawNotes from "../../assets/notes.json";
const notesList: NoteProps[] = rawNotes.map((note) => ({
  ...note,
  status: note.status as NoteStatus,
}));

export const clearExpiredTrash = createAsyncThunk("notes/clearExpiredTrash", async (_, { getState }) => {
  const { autoDeletePeriod } = (getState() as RootState).settings;
  const currentTime = Date.now();

  const notes = (getState() as RootState).notes.notes;

  return notes.filter((note) => {
    const shouldDelete = note.status === "deleted" && note.deletedAt && currentTime - note.deletedAt >= autoDeletePeriod;
    return !shouldDelete;
  });
});

const initialState: NotesState = { notes: notesList, searchQuery: "", searchHistory: [] };

const findNote = (state: NotesState, id: string) => state.notes.find((note) => note.id === id);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ title: string; text: string }>) => {
      const newNote: NoteProps = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        text: action.payload.text,
        createdAt: Date.now(),
        status: "active",
      };
      state.notes.push(newNote);
    },
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
      if (note) {
        note.status = "deleted";
        note.deletedAt = Date.now();
      }
    },
    restoreNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note?.status === "deleted") {
        note.status = "active";
        delete note.deletedAt;
      }
    },
    removeNotePermanently: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearExpiredTrash.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  },
});

export const {
  addNote,
  editNote,
  pinNote,
  unpinNote,
  archiveNote,
  unarchiveNote,
  moveToTrash,
  restoreNote,
  removeNotePermanently,
  setSearchQuery,
} = notesSlice.actions;

export default notesSlice.reducer;
