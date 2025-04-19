import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import notesList from "../../notes.json";
import { v4 as uuidv4 } from "uuid";

export type Note = { id: string; title: string; text: string; date: number; status: string; originalStatus?: string };

type NotesState = {
  notes: Note[];
  pinnedNotes: Note[];
  deletedNotes: Note[];
  archivedNotes: Note[];
  title: string;
  text: string;
  editedNoteId: string | null;
  searchQuery: string;
  searchHistory: string[];
};

const initialState: NotesState = {
  notes: notesList,
  pinnedNotes: [],
  deletedNotes: [],
  archivedNotes: [],
  title: "",
  text: "",
  editedNoteId: null,
  searchQuery: "",
  searchHistory: [],
};

const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state) => {
      const id = uuidv4();
      const newNote: Note = {
        id: id,
        title: state.title,
        text: state.text,
        date: new Date().getTime(),
        status: "active",
      };
      state.notes.push(newNote);
      state.title = "";
      state.text = "";
      console.log("Додана нотатка:", newNote);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const { id, title, text, date, status } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex].title = title;
        state.notes[noteIndex].text = text;
        state.notes[noteIndex].date = date;
        state.notes[noteIndex].status = status;
        console.log("Оновлена нотатка:", { id, title, text, date, status });
      } else {
        const pinnedNoteIndex = state.pinnedNotes.findIndex((note) => note.id === id);
        if (pinnedNoteIndex !== -1) {
          state.pinnedNotes[pinnedNoteIndex].title = title;
          state.pinnedNotes[pinnedNoteIndex].text = text;
          state.pinnedNotes[pinnedNoteIndex].date = date;
          state.pinnedNotes[pinnedNoteIndex].status = status;
          console.log("Оновлена закріплена нотатка:", { id, title, text, date, status });
        }
      }
      state.editedNoteId = null;
    },
    moveToTrash: (state, action: PayloadAction<string>) => {
      const noteToMove =
        state.notes.find((note) => note.id === action.payload) ||
        state.pinnedNotes.find((note) => note.id === action.payload) ||
        state.archivedNotes.find((note) => note.id === action.payload);

      if (noteToMove) {
        if (noteToMove.status === "active") {
          noteToMove.originalStatus = "active";
        } else if (noteToMove.status === "pinned") {
          noteToMove.originalStatus = "pinned";
        } else if (noteToMove.status === "archived") {
          noteToMove.originalStatus = "archived";
        }

        state.deletedNotes.push(noteToMove);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.pinnedNotes = state.pinnedNotes.filter((note) => note.id !== action.payload);
        state.archivedNotes = state.archivedNotes.filter((note) => note.id !== action.payload);
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.deletedNotes = state.deletedNotes.filter((note) => note.id !== action.payload);
    },
    pinNote: (state, action: PayloadAction<string>) => {
      const noteToPin = state.notes.find((note) => note.id === action.payload);
      if (noteToPin) {
        noteToPin.status = "pinned";
        state.pinnedNotes.push(noteToPin);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      }
    },
    unpinNote: (state, action: PayloadAction<string>) => {
      const noteToUnpin = state.pinnedNotes.find((note) => note.id === action.payload);
      if (noteToUnpin) {
        noteToUnpin.status = "active";
        state.notes.push(noteToUnpin);
        state.pinnedNotes = state.pinnedNotes.filter((note) => note.id !== action.payload);
      }
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    clearNote: (state) => {
      state.title = "";
      state.text = "";
      state.editedNoteId = null;
    },
    setEditedNoteId: (state, action: PayloadAction<string | null>) => {
      state.editedNoteId = action.payload;
    },
    restoreNote: (state, action: PayloadAction<string>) => {
      const noteToRestore = state.deletedNotes.find((note) => note.id === action.payload);
      if (noteToRestore) {
        if (noteToRestore.originalStatus === "active") {
          state.notes.push(noteToRestore);
        } else if (noteToRestore.originalStatus === "pinned") {
          state.pinnedNotes.push(noteToRestore);
        } else if (noteToRestore.originalStatus === "archived") {
          state.archivedNotes.push(noteToRestore);
        }

        state.deletedNotes = state.deletedNotes.filter((note) => note.id !== action.payload);
        noteToRestore.originalStatus = undefined;
      }
    },
    clearTrash: (state) => {
      state.deletedNotes = [];
    },
    archiveNote: (state, action: PayloadAction<string>) => {
      const noteToArchive =
        state.notes.find((note) => note.id === action.payload) || state.pinnedNotes.find((note) => note.id === action.payload);

      if (noteToArchive) {
        noteToArchive.status = "archived";
        state.archivedNotes.push(noteToArchive);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.pinnedNotes = state.pinnedNotes.filter((note) => note.id !== action.payload);
      }
    },
    unarchiveNote: (state, action: PayloadAction<string>) => {
      const noteToUnarchive = state.archivedNotes.find((note) => note.id === action.payload);

      if (noteToUnarchive) {
        noteToUnarchive.status = "active";
        state.notes.push(noteToUnarchive);
        state.archivedNotes = state.archivedNotes.filter((note) => note.id !== action.payload);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addSearchQueryToHistory: (state, action: PayloadAction<string>) => {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.push(action.payload);
      }
    },
    sortNotesByTitleAsc: (state) => {
      state.notes.sort((a, b) => a.title.localeCompare(b.title, "uk", { sensitivity: "base" }));
      state.pinnedNotes.sort((a, b) => a.title.localeCompare(b.title, "uk", { sensitivity: "base" }));
      state.archivedNotes.sort((a, b) => a.title.localeCompare(b.title, "uk", { sensitivity: "base" }));
      state.deletedNotes.sort((a, b) => a.title.localeCompare(b.title, "uk", { sensitivity: "base" }));
    },
    sortNotesByTitleDesc: (state) => {
      state.notes.sort((a, b) => b.title.localeCompare(a.title, "uk", { sensitivity: "base" }));
      state.pinnedNotes.sort((a, b) => b.title.localeCompare(a.title, "uk", { sensitivity: "base" }));
      state.archivedNotes.sort((a, b) => b.title.localeCompare(a.title, "uk", { sensitivity: "base" }));
      state.deletedNotes.sort((a, b) => b.title.localeCompare(a.title, "uk", { sensitivity: "base" }));
    },
    sortNotesByDateAsc: (state) => {
      state.notes.sort((a, b) => a.date - b.date);
      state.pinnedNotes.sort((a, b) => a.date - b.date);
      state.archivedNotes.sort((a, b) => a.date - b.date);
      state.deletedNotes.sort((a, b) => a.date - b.date);
    },
    sortNotesByDateDesc: (state) => {
      state.notes.sort((a, b) => b.date - a.date);
      state.pinnedNotes.sort((a, b) => b.date - a.date);
      state.archivedNotes.sort((a, b) => b.date - a.date);
      state.deletedNotes.sort((a, b) => b.date - a.date);
    },
  },
});

export const {
  addNote,
  editNote,
  deleteNote,
  pinNote,
  unpinNote,
  setTitle,
  moveToTrash,
  setContent,
  clearNote,
  setEditedNoteId,
  restoreNote,
  clearTrash,
  archiveNote,
  unarchiveNote,
  setSearchQuery,
  addSearchQueryToHistory,
  sortNotesByTitleAsc,
  sortNotesByTitleDesc,
  sortNotesByDateAsc,
  sortNotesByDateDesc,
} = notesSlice.actions;

export default notesSlice.reducer;
