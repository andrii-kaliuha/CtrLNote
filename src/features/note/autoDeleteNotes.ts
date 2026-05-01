import { AppDispatch } from "../../app/store/store";
import { removeNote as removeNotePermanently } from "./notesSlice";
import type { NoteProps } from "../../shared/types/domain";

export const autoDeleteNotes = (dispatch: AppDispatch, notes: NoteProps[], autoDeletePeriod: number) => {
  const currentTime = Date.now();
  const notesToDelete = notes.filter((note) => note.status === "deleted" && note.deletedAt && currentTime - note.deletedAt >= autoDeletePeriod);

  notesToDelete.forEach((note) => dispatch(removeNotePermanently(note.id)));
};
