import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import rawNotes from "../../notes.json";

export type Note = { id: string; title: string; text: string; createdAt: number; status: "active" | "pinned" | "archived" | "deleted" };

export type NotesState = { notes: Note[]; editableNote: string; title: string; text: string; searchQuery: string; searchHistory: string[] };

const notesList: Note[] = rawNotes.map((note) => ({
  ...note,
  status: note.status as "active" | "pinned" | "archived" | "deleted",
}));

const initialState: NotesState = { notes: notesList, editableNote: "", title: "", text: "", searchQuery: "", searchHistory: [] };

// Допоміжна функція пошуку нотатки
const findNote = (state: NotesState, id: string) => state.notes.find((note) => note.id === id);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setEditableNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note) {
        state.editableNote = note.id;
        state.title = note.title;
        state.text = note.text;
      }
    },

    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },

    addNote: (state) => {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: state.title,
        text: state.text,
        createdAt: Date.now(),
        status: "active",
      };
      state.notes.unshift(newNote);
      state.title = "";
      state.text = "";
    },

    editNote: (state) => {
      const note = findNote(state, state.editableNote);
      if (note) {
        note.title = state.title;
        note.text = state.text;
      }
      state.editableNote = "";
      state.title = "";
      state.text = "";
    },

    clearNote: (state) => {
      state.editableNote = "";
      state.title = "";
      state.text = "";
    },

    archiveNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note) note.status = "archived";
    },

    unarchiveNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note?.status === "archived") note.status = "active";
    },

    pinNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note) note.status = "pinned";
    },

    unpinNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note?.status === "pinned") note.status = "active";
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

    // sortNotesByTitle: (state, action: PayloadAction<"asc" | "desc">) => {
    //   state.notes.sort((a, b) => (action.payload === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
    // },

    // sortNotesByDate: (state, action: PayloadAction<"asc" | "desc">) => {
    //   state.notes.sort((a, b) => (action.payload === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));
    // },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setEditableNote,
  setTitle,
  setText,
  addNote,
  editNote,
  clearNote,
  pinNote,
  unpinNote,
  archiveNote,
  unarchiveNote,
  moveToTrash,
  restoreNote,
  removeNotePermanently,
  // sortNotesByTitle,
  // sortNotesByDate,
  setSearchQuery,
} = notesSlice.actions;

export default notesSlice.reducer;
