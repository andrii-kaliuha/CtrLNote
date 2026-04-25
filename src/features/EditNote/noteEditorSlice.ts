import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { NoteProps, NoteEditorState } from "../../shared/types/types";

const initialState: NoteEditorState = { isOpen: false, noteId: null, title: "", text: "", tags: [] };

const noteEditorSlice = createSlice({
  name: "noteEditor",
  initialState,
  reducers: {
    openNoteEditor: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.noteId = action.payload;
    },
    openEmptyNoteEditor: (state) => {
      state.isOpen = true;
      state.noteId = null;
      state.title = "";
      state.text = "";
      state.tags = [];
    },
    closeNoteEditor: (state) => {
      state.isOpen = false;
      state.noteId = null;
      state.title = "";
      state.text = "";
      state.tags = [];
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter((tag) => tag !== action.payload);
    },
    setNoteToEdit: (state, action: PayloadAction<NoteProps>) => {
      state.title = action.payload.title;
      state.text = action.payload.text;
      state.tags = action.payload.tags ?? [];
    },
  },
});

export const { openNoteEditor, openEmptyNoteEditor, closeNoteEditor, setTitle, setText, addTag, removeTag, setNoteToEdit } =
  noteEditorSlice.actions;

export default noteEditorSlice.reducer;
