import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { closeNoteEditor, setTitle, setText, setNoteToEdit } from "../store/slices/noteEditorSlice";
import { addNote, editNote } from "../store/slices/notesSlice";
import { Button } from "..//shared/ui/Button";
import { useTranslation } from "react-i18next";

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setText(e.target.value));
  };

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
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: isMobile ? 0 : "12px",
        flexGrow: 1,
        minWidth: 0,
        height: "100%",
        display: isOpen ? "flex" : "none",
        flexDirection: "column",
        overflow: "hidden",
        minHeight: 0,
        boxSizing: "border-box",
      }}
    >
      <input
        type="text"
        value={editorTitle}
        onChange={(e) => handleTitleChange(e)}
        placeholder={t("note_editor_title_label")}
        style={{
          width: "100%",
          outline: "transparent",
          borderRadius: "8px",
          padding: "24px 24px 12px",
          color: "var(--text-primary)",
          background: "var(--color-surface)",
        }}
      />
      <textarea
        value={editorText}
        onChange={(e) => handleTextChange(e)}
        placeholder={t("note_editor_text_label")}
        style={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          resize: "none",
          outline: "transparent",

          color: "var(--text-primary)",
          background: "var(--color-surface)",
          padding: "12px 24px 24px",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          borderTop: "2px solid var(--color-primary)",
          padding: 3,
        }}
      >
        <Button action={handleClose} text={t("note_editor_cancel")} />
        <Button action={handleSave} text={t("note_editor_save")} />
      </Box>
    </div>
  );
};
