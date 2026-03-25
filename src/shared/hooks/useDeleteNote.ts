import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSettings } from "./useSettings";
import { moveToTrash, removeNote as removeNotePermanently } from "../../store/slices/notesSlice";
import { NoteStatus } from "../types/types";

export const useDeleteNote = () => {
  const dispatch = useDispatch();
  const { trashEnabled } = useSettings();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const deleteNote = (id: string, status: NoteStatus) => {
    if (status === "deleted" || !trashEnabled) {
      setNoteToDelete(id);
      setIsConfirmOpen(true);
    } else {
      dispatch(moveToTrash(id));
    }
  };

  const handleConfirm = () => {
    if (noteToDelete) {
      dispatch(removeNotePermanently(noteToDelete));
      setIsConfirmOpen(false);
      setNoteToDelete(null);
    }
  };

  return { deleteNote, isConfirmOpen, closeConfirm: () => setIsConfirmOpen(false), handleConfirm };
};
