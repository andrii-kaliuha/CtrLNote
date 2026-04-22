import { Dispatch } from "@reduxjs/toolkit";
import { openNoteEditor } from "../../store/slices/noteEditorSlice";
import { archiveNote, unarchiveNote, restoreNote } from "../../store/slices/notesSlice";
import { NoteAction, NoteStatus } from "../types/types";

export const getAvailableActions = (
  status: NoteStatus,
  id: string,
  dispatch: Dispatch,
  onDelete: (id: string, status: NoteStatus) => void,
): NoteAction[] => {
  switch (status) {
    case "active":
      return [
        { title: "notes.actions.edit", action: () => dispatch(openNoteEditor(id)) },
        { title: "notes.actions.archive", action: () => dispatch(archiveNote(id)) },
        { title: "notes.actions.delete", action: () => onDelete(id, status) },
      ];
    case "archived":
      return [
        { title: "notes.actions.unarchive", action: () => dispatch(unarchiveNote(id)) },
        { title: "notes.actions.delete", action: () => onDelete(id, status) },
      ];
    case "deleted":
      return [
        { title: "notes.actions.restore", action: () => dispatch(restoreNote(id)) },
        { title: "notes.actions.delete_permanent", action: () => onDelete(id, status) },
      ];
    default:
      return [];
  }
};
