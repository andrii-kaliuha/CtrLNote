import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import rawNotes from "../../notes.json";

// export type Note = { id: string; title: string; text: string; createdAt: string; status: "active" | "pinned" | "archived" | "deleted" };
export type Note = { id: string; title: string; text: string; createdAt: number; status: "active" | "pinned" | "archived" | "deleted" };

type NotesState = { notes: Note[]; editedNoteId: string | null; title: string; text: string };

const notesList: Note[] = rawNotes.map((note) => ({
  ...note,
  status: note.status as "active" | "pinned" | "archived" | "deleted",
}));

const initialState: NotesState = { notes: notesList, editedNoteId: null, title: "", text: "" };

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setEditedNoteId(state, action: PayloadAction<string | null>) {
      state.editedNoteId = action.payload;
    },

    addNote(state) {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: state.title,
        text: state.text,
        // createdAt: new Date().toISOString(),
        createdAt: new Date().getTime(),
        status: "active",
      };
      state.notes.push(newNote);
      state.title = "";
      state.text = "";
    },

    editNote(state) {
      const note = state.notes.find((note) => note.id === state.editedNoteId);
      if (note) {
        note.title = state.title;
        note.text = state.text;
      }
      state.title = "";
      state.text = "";
      state.editedNoteId = null;
    },

    moveToTrash(state, action: PayloadAction<string>) {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.status = "deleted";
      }
    },

    restoreNote(state, action: PayloadAction<string>) {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note && note.status === "deleted") {
        note.status = "active";
      }
    },

    archiveNote(state, action: PayloadAction<string>) {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.status = "archived";
      }
    },

    unarchiveNote(state, action: PayloadAction<string>) {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note && note.status === "archived") {
        note.status = "active";
      }
    },

    pinNote(state, action: PayloadAction<string>) {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.status = "pinned";
      }
    },

    unpinNote(state, action: PayloadAction<string>) {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note && note.status === "pinned") {
        note.status = "active";
      }
    },

    clearNote(state) {
      state.title = "";
      state.text = "";
      state.editedNoteId = null;
    },

    removeNotePermanently(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    sortNotesByTitleAsc(state) {
      state.notes.sort((a, b) => a.title.localeCompare(b.title));
    },

    sortNotesByTitleDesc(state) {
      state.notes.sort((a, b) => b.title.localeCompare(a.title));
    },

    sortNotesByDateAsc(state) {
      state.notes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    },

    sortNotesByDateDesc(state) {
      state.notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
  },
});

export const {
  clearNote,
  setTitle,
  setText,
  setEditedNoteId,
  addNote,
  editNote,
  moveToTrash,
  restoreNote,
  archiveNote,
  unarchiveNote,
  pinNote,
  unpinNote,
  removeNotePermanently,
  sortNotesByTitleAsc,
  sortNotesByTitleDesc,
  sortNotesByDateAsc,
  sortNotesByDateDesc,
} = notesSlice.actions;

export default notesSlice.reducer;
