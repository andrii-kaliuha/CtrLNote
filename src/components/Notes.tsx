import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Note, NoteProps } from "./Note";
import { NoteEditor } from "../components/NoteEditor";
import { clearNote } from "../store/slices/notesSlice";

type NotesProps = { title: string; notes: NoteProps[] };

export const Notes: React.FC<NotesProps> = ({ title, notes: initialNotes }) => {
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState<"titleAsc" | "titleDesc" | "dateAsc" | "dateDesc">("dateDesc");
  const [sortedNotes, setSortedNotes] = useState(initialNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSortedNotes(initialNotes);
  }, [initialNotes]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(clearNote());
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSortChange = (event: any) => {
    const value = event.target.value;
    setSortOption(value);

    let newSortedNotes = [...sortedNotes];

    switch (value) {
      case "titleAsc":
        newSortedNotes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        newSortedNotes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "dateAsc":
        newSortedNotes.sort((a, b) => a.date - b.date);
        break;
      case "dateDesc":
        newSortedNotes.sort((a, b) => b.date - a.date);
        break;
      default:
        break;
    }

    setSortedNotes(newSortedNotes);
  };

  return (
    <>
      <div className="p-3 flex justify-between items-center">
        <h2 className="p-0">{title}</h2>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel id="sort-select-label">Сортувати</InputLabel>
          <Select labelId="sort-select-label" id="sort-select" value={sortOption} onChange={handleSortChange} label="Сортувати">
            <MenuItem value={"titleAsc"}>Назва (А-Я)</MenuItem>
            <MenuItem value={"titleDesc"}>Назва (Я-А)</MenuItem>
            <MenuItem value={"dateAsc"}>Дата (Старі-Нові)</MenuItem>
            <MenuItem value={"dateDesc"}>Дата (Нові-Старі)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {title === "Нотатки" && (
          <li className="p-3 rounded-lg relative bg-[#faedcd] flex justify-center items-center">
            <IconButton onClick={handleOpenModal}>
              <AddIcon style={{ width: "48px", height: "48px" }} />
            </IconButton>
          </li>
        )}
        {sortedNotes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ul>
      <NoteEditor state={isModalOpen} closeModal={handleCloseModal} />
    </>
  );
};
