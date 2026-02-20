import { Modal, Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { closeNoteEditor, setTitle, setText, setNoteToEdit } from "../store/slices/noteEditorSlice";
import { addNote, editNote } from "../store/slices/notesSlice";
import { Button } from "..//shared/ui/Button";
import { TextField } from "..//shared/ui/TextField";
import { useTranslation } from "react-i18next";

export const NoteEditor2 = () => {
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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setText(e.target.value));

  const handleClose = () => dispatch(closeNoteEditor());

  const handleSave = () => {
    if (noteId) {
      dispatch(editNote({ id: noteId, title: editorTitle, text: editorText }));
    } else {
      dispatch(addNote({ title: editorTitle, text: editorText }));
    }
    dispatch(closeNoteEditor());
  };

  return (
    // <Modal open={isOpen} onClose={handleClose}>
    <Box
      sx={{
        position: "sticky",
        top: 0,
        right: 0,
        // transform: "translate(-50%, -50%)",
        height: "calc(100vh - 24px)",
        bgcolor: "var(--color-surface)",
        // boxShadow: 24,
        borderRadius: isMobile ? 0 : "12px",
        padding: "24px",
        outline: "none",
        flexGrow: 1,
        display: isOpen ? "block" : "none",
      }}
    >
      <TextField label={t("note_editor_title_label")} text={editorTitle} action={handleTitleChange} rows={1} />
      <Typography>Tags</Typography>
      <TextField label={t("note_editor_text_label")} text={editorText} action={handleTextChange} rows={6} />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button action={handleClose} text={t("note_editor_cancel")} />
        <Button action={handleSave} text={t("note_editor_save")} />
      </Box>
    </Box>
    // </Modal>
  );
};
