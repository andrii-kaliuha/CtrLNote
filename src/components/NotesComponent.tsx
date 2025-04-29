import { useDispatch } from "react-redux";
import { useState } from "react";
import { IconButton, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Note } from "./Note";
import { NoteEditor } from "../components/NoteEditor";
import { clearNote } from "../store/slices/notesSlice";
import { Note as NoteType } from "../store/slices/notesSlice";

type NotesProps = { title: string; notes: NoteType[]; sortBy: SortBy; onSortChange: (newSortBy: SortBy) => void };

export const NotesComponent: React.FC<NotesProps> = ({ title, notes, sortBy, onSortChange }) => {
  const dispatch = useDispatch();
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
        {/* Передаємо стан сортування та обробник змін у NotesSorter */}
        <NotesSorter sortBy={sortBy} onChange={onSortChange} />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
        {/* Умова для кнопки додавання залишається */}
        {title === "Нотатки" && (
          <li className="p-3 rounded-lg relative bg-[var(--color-surface)] flex justify-center items-center h-[180px]">
            <IconButton onClick={openNoteEditor} sx={{ ":hover": { backgroundColor: "var(--color-hover)" } }}>
              <Add sx={{ width: 48, height: 48, color: "var(--text-primary)" }} />
            </IconButton>
          </li>
        )}
      </ul>

      <NoteEditor state={isNoteEditorOpen} closeModal={closeNoteEditor} />
    </>
  );
};

// Визначення типу для критеріїв сортування залишається
export type SortBy = "titleAsc" | "titleDesc" | "dateAsc" | "dateDesc";

type NotesSorterProps = {
  sortBy: SortBy; // Приймаємо поточне значення сортування
  onChange: (newSortBy: SortBy) => void; // Функція для зміни сортування
};

// Змінено: NotesSorter тепер приймає props
export const NotesSorter: React.FC<NotesSorterProps> = ({ sortBy, onChange }) => {
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as SortBy;
    onChange(selectedValue); // Викликаємо колбек замість dispatch
  };

  return (
    <FormControl>
      <Select
        name="sort-select"
        value={sortBy}
        onChange={handleSortChange}
        MenuProps={{ PaperProps: { sx: { "& .MuiList-root": { padding: 0 } } } }}
        sx={{
          color: "var(--text-primary)",
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
