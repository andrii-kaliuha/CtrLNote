import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteProps, NotesState, NoteStatus } from "../../shared/types/types";

const initialState: NotesState = { notes: [] };

const findNote = (state: NotesState, id: string) => state.notes.find((note) => note.id === id);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer: (state, action: PayloadAction<NoteProps>) => {
        state.notes.push(action.payload);
      },
      prepare: (payload: { title: string; text: string; tags: string[] }) => ({
        payload: {
          id: crypto.randomUUID(),
          title: payload.title,
          text: payload.text,
          tags: payload.tags,
          createdAt: Date.now(),
          status: "active" as NoteStatus,
        } as NoteProps,
      }),
    },
    editNote: (state, action: PayloadAction<{ id: string; title: string; text: string; tags: string[] }>) => {
      const note = findNote(state, action.payload.id);
      if (note && note.status !== "deleted") {
        note.title = action.payload.title;
        note.text = action.payload.text;
        note.tags = action.payload.tags;
      }
    },

    archiveNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note && note.status === "active") {
        note.status = "archived";
      }
    },

    unarchiveNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note && note.status === "archived") {
        note.status = "active";
      }
    },

    moveToTrash: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note && note.status !== "deleted") {
        note.status = "deleted";
        note.deletedAt = Date.now();
      }
    },

    restoreNote: (state, action: PayloadAction<string>) => {
      const note = findNote(state, action.payload);
      if (note && note.status === "deleted") {
        note.status = "active";
        delete note.deletedAt;
      }
    },

    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    clearTrash: (state) => {
      state.notes = state.notes.filter((note) => note.status !== "deleted");
    },

    restoreAllNotes: (state) => {
      state.notes.forEach((note) => {
        if (note.status === "deleted") {
          note.status = "active";
          delete note.deletedAt;
        }
      });
    },

    setNotes: (state, action: PayloadAction<NoteProps[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { addNote, editNote, archiveNote, unarchiveNote, moveToTrash, restoreNote, removeNote, clearTrash, restoreAllNotes, setNotes } =
  notesSlice.actions;

export default notesSlice.reducer;
