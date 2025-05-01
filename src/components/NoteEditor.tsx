import { Modal, Box, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { closeNoteEditor, setTitle, setText, setNoteToEdit } from "../store/slices/noteEditorSlice";
import { editNote } from "../store/slices/notesSlice";
import { t } from "i18next";

export const NoteEditor = () => {
  const dispatch = useDispatch();
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
      dispatch(closeNoteEditor());
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "100%" : 600,
          height: isMobile ? "100%" : "auto",
          bgcolor: "var(--color-secondary)",
          boxShadow: 24,
          borderRadius: isMobile ? 0 : "12px",
          padding: "24px",
          outline: "none",
        }}
      >
        <TextField
          label={t("note_editor_title_label")}
          variant="outlined"
          fullWidth
          value={editorTitle}
          onChange={handleTitleChange}
          margin="normal"
          sx={{
            "& label.Mui-focused": { color: "var(--color-primary)" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--color-primary)",
            },
          }}
        />

        <TextField
          label={t("note_editor_text_label")}
          variant="outlined"
          fullWidth
          multiline
          rows={isMobile ? 12 : 6}
          value={editorText}
          onChange={handleTextChange}
          margin="normal"
          sx={{
            "& label.Mui-focused": { color: "var(--color-primary)" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--color-primary)",
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="text" sx={{ color: "var(--color-primary)", borderRadius: "8px" }} onClick={handleClose}>
            {t("note_editor_cancel")}
          </Button>
          <Button variant="text" sx={{ color: "var(--color-primary)", borderRadius: "8px" }} onClick={handleSave}>
            {t("note_editor_save")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
