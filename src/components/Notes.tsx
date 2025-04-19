import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormControl, MenuItem, Select, IconButton, SelectChangeEvent, Box, Typography } from "@mui/material";
import { Add, Sort, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { Note, NoteProps } from "./Note";
import { NoteEditor } from "../components/NoteEditor";
import { clearNote } from "../store/slices/notesSlice";

type NotesProps = { title: string; notes: NoteProps[] };

export const Notes: React.FC<NotesProps> = ({ title, notes: initialNotes }) => {
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState<"title" | "date">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortedNotes, setSortedNotes] = useState(initialNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    sortNotes();
  }, [initialNotes, sortOption, sortDirection]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(clearNote());
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSortChange = (event: SelectChangeEvent<string>) => setSortOption(event.target.value as "title" | "date");

  const toggleSortDirection = () => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));

  const sortNotes = () => {
    let newSortedNotes = [...initialNotes];

    if (sortOption === "title") {
      newSortedNotes.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return sortDirection === "asc" ? comparison : -comparison;
      });
    } else if (sortOption === "date") {
      newSortedNotes.sort((a, b) => {
        const comparison = a.date - b.date;
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    setSortedNotes(newSortedNotes);
  };

  return (
    <>
      <div className="p-3 flex justify-between items-center">
        <h2 className="p-0">{title}</h2>
        <div className="flex items-center h-6">
          <FormControl sx={{ display: "flex" }}>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              renderValue={() => (
                <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sort sx={{ fontSize: 20 }} />
                  <Typography variant="body2">{sortOption === "title" ? "Назва" : "Дата"}</Typography>
                </Box>
              )}
              sx={{
                "& .MuiOutlinedInput-root": { padding: "0 !important", minHeight: "unset" },
                "& .MuiSelect-select": { padding: "0 12px !important", display: "flex", alignItems: "center" },
                "& .MuiSelect-icon": { display: "none" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                cursor: "pointer",
              }}
            >
              <MenuItem value="title">Назва</MenuItem>
              <MenuItem value="date">Дата</MenuItem>
            </Select>
          </FormControl>

          <IconButton onClick={toggleSortDirection} sx={{ padding: 0, width: "24px", height: "24px" }}>
            {sortDirection === "asc" ? <ArrowUpward sx={{ fontSize: 20 }} /> : <ArrowDownward sx={{ fontSize: 20 }} />}
          </IconButton>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {title === "Нотатки" && (
          <li className="p-3 rounded-lg relative bg-surface flex justify-center items-center">
            <IconButton onClick={handleOpenModal}>
              <Add style={{ width: "48px", height: "48px" }} />
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
