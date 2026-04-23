import { AppDispatch } from "../../store/store";
import { removeNote as removeNotePermanently } from "../../widgets/Notes/notesSlice";
import { NoteProps } from "../types/types";

export const autoDeleteNotes = (dispatch: AppDispatch, notes: NoteProps[], autoDeletePeriod: number) => {
  const currentTime = Date.now();
  const notesToDelete = notes.filter((note) => note.status === "deleted" && note.deletedAt && currentTime - note.deletedAt >= autoDeletePeriod);

  notesToDelete.forEach((note) => dispatch(removeNotePermanently(note.id)));
};
