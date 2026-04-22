import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { closeNoteEditor, setTitle, setText, setNoteToEdit } from "../store/slices/noteEditorSlice";
import { addNote, editNote } from "../store/slices/notesSlice";
import { Button } from "../shared/ui/Button";
import { useTranslation } from "react-i18next";
import styles from "./NoteEditor.module.css";

export const NoteEditor = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isOpen, noteId, title: editorTitle, text: editorText } = useSelector((state: RootState) => state.noteEditor);
  const notes = useSelector((state: RootState) => state.notes.notes);

  useEffect(() => {
    if (isOpen && noteId) {
      const noteToEdit = notes.find((note) => note.id === noteId);
      if (noteToEdit) {
        dispatch(setNoteToEdit(noteToEdit));
      }
    }
  }, [isOpen, noteId, notes, dispatch]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value));
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(setText(e.target.value));
  const handleClose = () => dispatch(closeNoteEditor());

  const handleSave = () => {
    const originalNote = notes.find((note) => note.id === noteId);
    const isStillActive = originalNote && originalNote.status === "active";

    if (noteId && isStillActive) {
      dispatch(editNote({ id: noteId, title: editorTitle, text: editorText }));
    } else {
      dispatch(addNote({ title: editorTitle, text: editorText }));
    }
    dispatch(closeNoteEditor());
  };

  return (
    <Box className={styles.container} sx={{ borderRadius: isMobile ? 0 : "12px" }}>
      <input
        type="text"
        className={styles.titleInput}
        value={editorTitle}
        onChange={handleTitleChange}
        placeholder={t("notes.editor.title_placeholder")}
      />

      <textarea className={styles.textArea} value={editorText} onChange={handleTextChange} placeholder={t("notes.editor.text_placeholder")} />

      <div className={styles.actions}>
        <Button action={handleClose} text={t("actions.cancel")} />
        <Button action={handleSave} text={t("actions.save")} />
      </div>
    </Box>
  );
};
