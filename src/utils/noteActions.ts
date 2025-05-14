import { Dispatch } from "@reduxjs/toolkit";
import { openNoteEditor } from "../store/slices/noteEditorSlice";
import { pinNote, unpinNote, archiveNote, unarchiveNote, restoreNote, removeNote as removeNotePermanently } from "../store/slices/notesSlice";
import { removeNote } from "./removeNote";
import { Action } from "../types";

export const getAvailableActions = (status: string, id: string, dispatch: Dispatch, trashEnabled: boolean): Action[] => {
  switch (status) {
    case "active":
      return [
        { title: "note_action_edit", action: () => dispatch(openNoteEditor(id)) },
        { title: "note_action_pin", action: () => dispatch(pinNote(id)) },
        { title: "note_action_delete", action: () => removeNote(dispatch, id, trashEnabled) },
        { title: "note_action_archive", action: () => dispatch(archiveNote(id)) },
      ];
    case "pinned":
      return [
        { title: "note_action_unpin", action: () => dispatch(unpinNote(id)) },
        { title: "note_action_delete", action: () => removeNote(dispatch, id, trashEnabled) },
        { title: "note_action_archive", action: () => dispatch(archiveNote(id)) },
      ];
    case "archived":
      return [
        { title: "note_action_unarchive", action: () => dispatch(unarchiveNote(id)) },
        { title: "note_action_delete", action: () => removeNote(dispatch, id, trashEnabled) },
      ];
    case "deleted":
      return [
        { title: "note_action_restore", action: () => dispatch(restoreNote(id)) },
        { title: "note_action_delete_permanent", action: () => dispatch(removeNotePermanently(id)) },
      ];
    default:
      return [];
  }
};
