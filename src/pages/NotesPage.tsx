import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Note as NoteType } from "../store/slices/notesSlice";
import { NoteEditor } from "../components/NoteEditor"; //or EditNoteModal
import { Notes } from "../components/Notes";
import { t } from "i18next";

export type SortBy = "titleAsc" | "titleDesc" | "dateAsc" | "dateDesc";
export type NotesSorterProps = { sortBy: SortBy; changeSortBy: (newSortBy: SortBy) => void };

// utils/sortNotesArray.ts
const sortNotesArray = (notes: NoteType[], sortBy: SortBy): NoteType[] => {
  const sortedNotes = [...notes];
  switch (sortBy) {
    case "titleAsc":
      sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "titleDesc":
      sortedNotes.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "dateAsc":
      sortedNotes.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case "dateDesc":
      sortedNotes.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }
  return sortedNotes;
};

export const NotesPage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const [pinnedSortBy, setPinnedSortBy] = useState<SortBy>("dateDesc");
  const [activeSortBy, setActiveSortBy] = useState<SortBy>("dateDesc");

  const pinnedNotes = useMemo(() => {
    const filtered = notes.filter((note) => note.status === "pinned");

    return sortNotesArray(filtered, pinnedSortBy);
  }, [notes, pinnedSortBy]);

  const activeNotes = useMemo(() => {
    const filtered = notes.filter((note) => note.status === "active");

    return sortNotesArray(filtered, activeSortBy);
  }, [notes, activeSortBy]);

  return (
    <section>
      {pinnedNotes.length > 0 ? (
        <>
          <div className="p-3 flex justify-between items-center">
            <h2>{t("pinned")}</h2>
            <NotesSorter sortBy={pinnedSortBy} changeSortBy={setPinnedSortBy} />
          </div>
          <Notes notes={pinnedNotes} />
        </>
      ) : null}
      <div className="p-3 flex justify-between items-center">
        <h2>{t("notes")}</h2>
        <NotesSorter sortBy={activeSortBy} changeSortBy={setActiveSortBy} />
      </div>
      <Notes notes={activeNotes} />
      <NoteEditor />
    </section>
  );
};

export const NotesSorter: React.FC<NotesSorterProps> = ({ sortBy, changeSortBy }) => {
  const handleSortChange = (event: SelectChangeEvent<SortBy>) => changeSortBy(event.target.value as SortBy);

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
        <MenuItem value="titleAsc">{t("titleAsc")}</MenuItem>
        <MenuItem value="titleDesc">{t("titleDesc")}</MenuItem>
        <MenuItem value="dateAsc">{t("dateAsc")}</MenuItem>
        <MenuItem value="dateDesc">{t("dateDesc")}</MenuItem>
      </Select>
    </FormControl>
  );
};
