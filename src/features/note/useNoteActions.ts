import { useDispatch } from "react-redux";
import { openNoteEditor } from "../editNote/noteEditorSlice";
import { archiveNote, unarchiveNote, restoreNote } from "./notesSlice";
import { useDeleteNote } from "./useDeleteNote";
import { NoteStatus } from "../../shared/types/types";

export const useNoteActions = (id: string, status: NoteStatus) => {
  const dispatch = useDispatch();
  const { deleteNote, isConfirmOpen, closeConfirm, handleConfirm } = useDeleteNote();

  const actions = (() => {
    switch (status) {
      case "active":
        return [
          { title: "notes.actions.edit", action: () => dispatch(openNoteEditor(id)) },
          { title: "notes.actions.archive", action: () => dispatch(archiveNote(id)) },
          { title: "notes.actions.delete", action: () => deleteNote(id, status) },
        ];
      case "archived":
        return [
          { title: "notes.actions.unarchive", action: () => dispatch(unarchiveNote(id)) },
          { title: "notes.actions.delete", action: () => deleteNote(id, status) },
        ];
      case "deleted":
        return [
          { title: "notes.actions.restore", action: () => dispatch(restoreNote(id)) },
          { title: "notes.actions.delete_permanent", action: () => deleteNote(id, status) },
        ];
      default:
        return [];
    }
  })();

  return { actions, isConfirmOpen, closeConfirm, handleConfirm };
};
