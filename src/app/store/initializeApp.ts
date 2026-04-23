import { setNotes } from "../../widgets/Notes/notesSlice";
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
    console.error("[initializeApp] Помилка завантаження нотаток:", error);
    dispatch(setStorageError("Не вдалося завантажити нотатки з бази даних."));
  }
};
