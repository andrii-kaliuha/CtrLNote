import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addNote, clearNote, editNote, setContent, setTitle } from "../store/slices/notesSlice";
import { Box, Modal, TextField } from "@mui/material";

type NoteEditorProps = { state: boolean; closeModal: () => void };

export const NoteEditor: React.FC<NoteEditorProps> = ({ state, closeModal }) => {
  const { title, text, editedNoteId, notes, pinnedNotes } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(title || text ? true : false);
  }, [title, text]);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value));
  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(setContent(e.target.value));
  const saveNote = () => {
    if (isEditing && editedNoteId) {
      const noteToEdit = [...notes, ...pinnedNotes].find((note) => note.id === editedNoteId);
      if (noteToEdit) {
        dispatch(editNote({ id: editedNoteId, title, text, date: noteToEdit.date, status: noteToEdit.status }));
      }
    } else {
      dispatch(addNote());
    }
    dispatch(clearNote());
    closeModal();
  };

  const cancelNote = () => {
    dispatch(clearNote());
    closeModal();
  };

  return (
    <Modal open={state} onClose={closeModal} sx={{ outlineColor: "transparent" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "var(--color-secondary)",
          boxShadow: 24,
          padding: 3,
          borderRadius: "8px",
          outlineColor: "transparent",
        }}
      >
        <TextField
          label="Заголовок"
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--color-primary)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--color-primary)",
            },
          }}
          value={title}
          onChange={titleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Текст нотатки"
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--color-primary)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--color-primary)",
            },
          }}
          value={text}
          onChange={textChange}
          multiline
          rows={6}
          fullWidth
          margin="normal"
        />
        <div className="flex justify-end">
          <button
            onClick={saveNote}
            className="bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] text-white font-bold py-2 px-4 rounded mr-2"
          >
            Зберегти
          </button>
          <button
            onClick={cancelNote}
            className="bg-[var(--button-secondary)] hover:bg-[var(--button-secondary-hover)] text-gray-800 font-bold py-2 px-4 rounded"
          >
            Скасувати
          </button>
        </div>
      </Box>
    </Modal>
  );
};
