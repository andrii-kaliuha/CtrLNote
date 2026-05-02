import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";

import { RootState } from "../../app/store/store";
import { addNote, editNote } from "../note/notesSlice";
import { closeNoteEditor, setTitle, setText, setNoteToEdit } from "./noteEditorSlice";
import { formatDate } from "../../shared/utils/formatDate";
import { ButtonSx } from "../../shared/style";
import styles from "./NoteEditor.module.css";

export const NoteEditor = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const language = useSelector((state: RootState) => state.settings.language);

  const { isOpen, noteId, title: editorTitle, text: editorText } = useSelector((state: RootState) => state.noteEditor);
  const notes = useSelector((state: RootState) => state.notes.notes);

  const currentNote = notes.find((note) => note.id === noteId);
  const createdAt = currentNote?.createdAt ?? Date.now();

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
    <Box className={styles.container} sx={{ borderRadius: isMobile ? 0 : "var(--radius-lg)" }}>
      <time className={styles.time} dateTime={new Date(createdAt).toISOString()}>
        {formatDate(createdAt, language, true)}
      </time>
      <input
        type="text"
        className={styles.titleInput}
        value={editorTitle}
        onChange={handleTitleChange}
        placeholder={t("notes.editor.title_placeholder")}
        name="title-editor"
      />
      <textarea
        className={styles.textArea}
        value={editorText}
        onChange={handleTextChange}
        placeholder={t("notes.editor.text_placeholder")}
        name="text-editor"
      />
      <div className={styles.actions}>
        <Button onClick={handleClose} disableRipple sx={ButtonSx}>
          {t("actions.cancel")}
        </Button>
        <Button onClick={handleSave} disableRipple sx={{ ...ButtonSx, color: "var(--color-primary) !important" }}>
          {t("actions.save")}
        </Button>
      </div>
    </Box>
  );
};
