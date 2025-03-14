import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Note = { id: string; title: string; text: string; date: string };
type Notes = { title: string; notes: Note[] };
type NoteEdit = { title: string; text: string };

const initialState: Notes & NoteEdit = {
  notes: [],
  title: "",
  text: "",
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    clearNote: (state) => {
      state.title = "";
      state.text = "";
    },
    addNote: (state) => {
      if (state.title.trim() || state.text.trim()) {
        state.notes.unshift({
          id: Date.now().toString(),
          title: state.title,
          text: state.text,
          date: new Date().toLocaleString(),
        });
      }
      state.title = "";
      state.text = "";
    },
  },
});

export const { setTitle, setContent, clearNote, addNote } = noteSlice.actions;
export default noteSlice.reducer;
