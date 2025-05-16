import { AppDispatch } from "../../store/store";
import { moveToTrash, removeNote as removeNotePermanently } from "../../store/slices/notesSlice";

export const removeNote = (dispatch: AppDispatch, noteId: string, trashEnabled: boolean) => {
  if (trashEnabled === true) {
    dispatch(moveToTrash(noteId));
  } else {
    dispatch(removeNotePermanently(noteId));
  }
};
