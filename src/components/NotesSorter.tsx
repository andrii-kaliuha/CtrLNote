import { FormControl, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import type { NoteProps, SortBy, NotesSorterProps } from "../types";
import { useTranslation } from "react-i18next";

// utils/sortNotesArray.ts
export const sortNotesArray = (notes: NoteProps[], sortBy: SortBy): NoteProps[] => {
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

export const NotesSorter: React.FC<NotesSorterProps> = ({ sortBy, changeSortBy }) => {
  const { t } = useTranslation();
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
