import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import notesList from "../../notes.json";
import { v4 as uuidv4 } from "uuid";

type Note = { id: string; title: string; text: string; date: number; status: string };
type NotesState = { notes: Note[]; pinnedNotes: Note[]; deletedNotes: Note[]; title: string; text: string; editedNoteId: string | null };

const initialNotes = notesList.map((note) => ({
  ...note,
  date: new Date(note.date).getTime(),
}));

const initialState: NotesState = { notes: initialNotes, pinnedNotes: [], deletedNotes: [], title: "", text: "", editedNoteId: null };

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
      const noteToMove = state.notes.find((note) => note.id === action.payload) || state.pinnedNotes.find((note) => note.id === action.payload);

      if (noteToMove) {
        state.deletedNotes.push(noteToMove);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.pinnedNotes = state.pinnedNotes.filter((note) => note.id !== action.payload);
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.pinnedNotes = state.pinnedNotes.filter((note) => note.id !== action.payload);
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
  },
});

export const { addNote, editNote, deleteNote, pinNote, unpinNote, setTitle, moveToTrash, setContent, clearNote, setEditedNoteId } =
  notesSlice.actions;

export default notesSlice.reducer;
