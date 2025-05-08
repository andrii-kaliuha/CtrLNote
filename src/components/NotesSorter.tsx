import { FormControl, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import type { SortBy, NotesSorterProps } from "../types";
import { useTranslation } from "react-i18next";

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
