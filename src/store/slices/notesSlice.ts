import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import rawNotes from "../../notes.json";

type NoteStatus = "active" | "pinned" | "archived" | "deleted";
export type Note = { id: string; title: string; text: string; createdAt: number; status: NoteStatus; deletedAt?: number };

export type NotesState = { notes: Note[]; searchQuery: string; searchHistory: string[] };

const TRASH_AUTO_DELETE_PERIOD = 30 * 24 * 60 * 60 * 1000;

const notesList: Note[] = rawNotes.map((note) => ({
  ...note,
  status: note.status as NoteStatus,
}));

const initialState: NotesState = { notes: notesList, searchQuery: "", searchHistory: [] };

const findNote = (state: NotesState, id: string) => state.notes.find((note) => note.id === id);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ title: string; text: string }>) => {
      const newNote: Note = {
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

    // cleanupTrash: (state, action: PayloadAction<number | undefined>) => {
    //   const currentTime = Date.now();
    //   const deleteThreshold = action.payload || TRASH_AUTO_DELETE_PERIOD;

    //   console.log(`Cleanup trash: ${currentTime} - ${deleteThreshold}`);

    //   state.notes = state.notes.filter((note) => {
    //     return note.status !== "deleted" || !note.deletedAt || currentTime - note.deletedAt < deleteThreshold;
    //   });
    // },

    cleanupTrash: (state, action: PayloadAction<number | undefined>) => {
      const currentTime = Date.now();
      const deleteThreshold = action.payload || TRASH_AUTO_DELETE_PERIOD;

      console.log("🔥 Running cleanupTrash");

      state.notes = state.notes.filter((note) => {
        const shouldDelete = note.status === "deleted" && note.deletedAt && currentTime - note.deletedAt >= deleteThreshold;
        if (shouldDelete) {
          console.log("🗑️ Deleting:", note.id);
        }
        return !shouldDelete;
      });
    },
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
  cleanupTrash,
} = notesSlice.actions;

export default notesSlice.reducer;
