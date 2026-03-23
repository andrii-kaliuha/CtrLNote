import { Dispatch } from "@reduxjs/toolkit";
import { openNoteEditor } from "../../store/slices/noteEditorSlice";
import { archiveNote, unarchiveNote, restoreNote } from "../../store/slices/notesSlice";
import { Action, NoteStatus } from "../types/types";

export const getAvailableActions = (
  status: NoteStatus,
  id: string,
  dispatch: Dispatch,
  onDelete: (id: string, status: NoteStatus) => void,
): Action[] => {
  switch (status) {
    case "active":
      return [
        { title: "note_action_edit", action: () => dispatch(openNoteEditor(id)) },
        { title: "note_action_archive", action: () => dispatch(archiveNote(id)) },
        { title: "note_action_delete", action: () => onDelete(id, status) },
      ];
    case "archived":
      return [
        { title: "note_action_unarchive", action: () => dispatch(unarchiveNote(id)) },
        { title: "note_action_delete", action: () => onDelete(id, status) },
      ];
    case "deleted":
      return [
        { title: "note_action_restore", action: () => dispatch(restoreNote(id)) },
        { title: "note_action_delete_permanent", action: () => onDelete(id, status) },
      ];
    default:
      return [];
  }
};
