import { setNotes } from "../../features/note/notesSlice";
import { setStorageError } from "./uiSlice";
import { AppDispatch } from "./store";
import { db } from "../db";

export const initializeApp = async (dispatch: AppDispatch): Promise<void> => {
  try {
    const savedNotes = await db.notes.toArray();
    if (savedNotes.length > 0) {
      dispatch(setNotes(savedNotes));
    }
  } catch (error) {
    dispatch(setStorageError("management.storage_error"));
  }
};
