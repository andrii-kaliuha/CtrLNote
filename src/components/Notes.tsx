// import { useSelector, useDispatch } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import { RootState } from "../store/store";
import { IconButton, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Note } from "./Note";
import { NoteEditor } from "../components/NoteEditor";
import { clearNote, sortNotesByTitleAsc, sortNotesByTitleDesc, sortNotesByDateAsc, sortNotesByDateDesc } from "../store/slices/notesSlice";
import { Note as NoteType } from "../store/slices/notesSlice";

type NotesProps = { title: string; notes: NoteType[] };

export const Notes: React.FC<NotesProps> = ({ title, notes }) => {
  const dispatch = useDispatch();
  // const notes = useSelector((state: RootState) => state.notes.notes);
  const [isNoteEditorOpen, setNoteEditorOpen] = useState(false);

  const openNoteEditor = () => {
    setNoteEditorOpen(true);
    dispatch(clearNote());
  };

  const closeNoteEditor = () => setNoteEditorOpen(false);

  return (
    <>
      <div className="p-3 flex justify-between items-center">
        <h2>{title}</h2>
        <NotesSorter />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {title === "Нотатки" && (
          <li className="p-3 rounded-lg relative bg-[var(--color-surface)] flex justify-center items-center h-[180px]">
            <IconButton onClick={openNoteEditor} sx={{ ":hover": { backgroundColor: "var(--color-hover)" } }}>
              <Add sx={{ width: 48, height: 48, color: "var(--text-primary)" }} />
            </IconButton>
          </li>
        )}

        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ul>

      <NoteEditor state={isNoteEditorOpen} closeModal={closeNoteEditor} />
    </>
  );
};

type SortBy = "titleAsc" | "titleDesc" | "dateAsc" | "dateDesc";

const NotesSorter = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState<SortBy>("dateDesc");

  const sortNotes = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as SortBy;
    setSortBy(selectedValue);

    switch (selectedValue) {
      case "titleAsc":
        dispatch(sortNotesByTitleAsc());
        break;
      case "titleDesc":
        dispatch(sortNotesByTitleDesc());
        break;
      case "dateAsc":
        dispatch(sortNotesByDateAsc());
        break;
      case "dateDesc":
        dispatch(sortNotesByDateDesc());
        break;
    }
  };

  return (
    <FormControl>
      <Select
        id="sort-select"
        value={sortBy}
        onChange={sortNotes}
        MenuProps={{ PaperProps: { sx: { "& .MuiList-root": { padding: 0 } } } }}
        sx={{
          "& .MuiSelect-select": { padding: "0.5px 12px" },
          "& fieldset": { borderColor: "transparent !important" },
          "&:hover fieldset": { borderColor: "var(--color-primary) !important" },
          "&.Mui-focused fieldset": { borderColor: "var(--color-primary) !important" },
          "& .MuiSvgIcon-root": { color: "inherit" },
          "&.Mui-focused .MuiSvgIcon-root": { color: "var(--color-primary)" },
          "&:hover .MuiSvgIcon-root": { color: "var(--color-primary)" },
        }}
      >
        <MenuItem value="titleAsc">За назвою (А-Я)</MenuItem>
        <MenuItem value="titleDesc">За назвою (Я-А)</MenuItem>
        <MenuItem value="dateAsc">За датою (спочатку старі)</MenuItem>
        <MenuItem value="dateDesc">За датою (спочатку нові)</MenuItem>
      </Select>
    </FormControl>
  );
};
