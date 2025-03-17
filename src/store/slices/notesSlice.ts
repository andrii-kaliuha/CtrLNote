import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import notesList from "../../notes.json";

interface Note {
  id: string;
  title: string;
  text: string;
  date: Date | string;
}

interface NotesState {
  notes: Note[];
  pinnedNotes: Note[];
  archivedNotes: Note[];
  deletedNotes: Note[];
  title: string;
  text: string;
  editedNoteId: string | null;
}

const initialState: NotesState = {
  notes: notesList,
  pinnedNotes: [],
  archivedNotes: [],
  deletedNotes: [],
  title: "",
  text: "",
  editedNoteId: null,
};

const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state) => {
      const newNote: Note = {
        id: Date.now().toString(),
        title: state.title,
        text: state.text,
        date: new Date(),
      };
      state.notes.push(newNote);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const { id, title, text, date } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex].title = title;
        state.notes[noteIndex].text = text;
        state.notes[noteIndex].date = date;
      } else {
        const pinnedNoteIndex = state.pinnedNotes.findIndex((note) => note.id === id);
        if (pinnedNoteIndex !== -1) {
          state.pinnedNotes[pinnedNoteIndex].title = title;
          state.pinnedNotes[pinnedNoteIndex].text = text;
          state.pinnedNotes[pinnedNoteIndex].date = date;
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
        state.deletedNotes.push(noteToMove);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.pinnedNotes = state.pinnedNotes.filter((note) => note.id !== action.payload);
        state.archivedNotes = state.archivedNotes.filter((note) => note.id !== action.payload);
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.pinnedNotes = state.pinnedNotes.filter((note) => note.id !== action.payload);
      state.archivedNotes = state.archivedNotes.filter((note) => note.id !== action.payload);
      state.deletedNotes = state.deletedNotes.filter((note) => note.id !== action.payload);
    },
    pinNote: (state, action: PayloadAction<string>) => {
      const noteToPin = state.notes.find((note) => note.id === action.payload);
      if (noteToPin) {
        state.pinnedNotes.push(noteToPin);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      }
    },
    unpinNote: (state, action: PayloadAction<string>) => {
      const noteToUnpin = state.pinnedNotes.find((note) => note.id === action.payload);
      if (noteToUnpin) {
        state.notes.push(noteToUnpin);
        state.pinnedNotes = state.pinnedNotes.filter((note) => note.id !== action.payload);
      }
    },
    archiveNote: (state, action: PayloadAction<string>) => {
      const noteToArchive =
        state.notes.find((note) => note.id === action.payload) || state.pinnedNotes.find((note) => note.id === action.payload);
      if (noteToArchive) {
        state.archivedNotes.push(noteToArchive);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.pinnedNotes = state.pinnedNotes.filter((note) => note.id !== action.payload);
      }
    },
    restoreNote: (state, action: PayloadAction<string>) => {
      const noteToRestore = state.archivedNotes.find((note) => note.id === action.payload);
      if (noteToRestore) {
        state.notes.push(noteToRestore);
        state.archivedNotes = state.archivedNotes.filter((note) => note.id !== action.payload);
      } else {
        const deletedNoteToRestore = state.deletedNotes.find((note) => note.id === action.payload);
        if (deletedNoteToRestore) {
          state.notes.push(deletedNoteToRestore);
          state.deletedNotes = state.deletedNotes.filter((note) => note.id !== action.payload);
        }
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
  },
});

export const {
  addNote,
  editNote,
  deleteNote,
  pinNote,
  archiveNote,
  restoreNote,
  setTitle,
  moveToTrash,
  setContent,
  clearNote,
  setEditedNoteId,
  unpinNote,
} = notesSlice.actions;

export default notesSlice.reducer;
