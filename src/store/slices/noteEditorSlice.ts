import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "./notesSlice";

type NoteEditorState = { isOpen: boolean; noteId: string | null; title: string; text: string };

const initialState: NoteEditorState = { isOpen: false, noteId: null, title: "", text: "" };

const noteEditorSlice = createSlice({
  name: "noteEditor",
  initialState,
  reducers: {
    openNoteEditor: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.noteId = action.payload;
    },
    closeNoteEditor: (state) => {
      state.isOpen = false;
      state.noteId = null;
      state.title = "";
      state.text = "";
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setNoteToEdit: (state, action: PayloadAction<Note>) => {
      state.title = action.payload.title;
      state.text = action.payload.text;
    },
  },
});

export const { openNoteEditor, closeNoteEditor, setTitle, setText, setNoteToEdit } = noteEditorSlice.actions;

export default noteEditorSlice.reducer;
