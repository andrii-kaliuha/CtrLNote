import { FormControl, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import type { SortBy, NotesSorterProps } from "../shared/types/types";
import { useTranslation } from "react-i18next";
import { menuItemStyles } from "../shared/style/style";

export const NotesSorter: React.FC<NotesSorterProps> = ({ sortBy, changeSortBy }) => {
  const { t } = useTranslation();
  const handleSortChange = (event: SelectChangeEvent<SortBy>) => changeSortBy(event.target.value as SortBy);

  return (
    <FormControl>
      <Select
        name="sort-select"
        value={sortBy}
        onChange={handleSortChange}
        MenuProps={{
          PaperProps: { sx: { "& .MuiList-root": { padding: 0 }, backgroundColor: "var(--color-secondary)", color: "var(--text-primary)" } },
        }}
        sx={{
          color: "var(--text-primary)",
          height: 40,
          "& .MuiSelect-select": { padding: "0.5px 12px" },
          "& fieldset": { borderColor: "transparent !important" },
          "&:hover": { backgroundColor: "var(--color-hover) !important" },
          "&.Mui-focused": { backgroundColor: "var(--color-hover) !important" },
          "& .MuiSvgIcon-root": { color: "inherit" },
        }}
      >
        <MenuItem sx={menuItemStyles} value="titleAsc">
          {t("titleAsc")}
        </MenuItem>
        <MenuItem sx={menuItemStyles} value="titleDesc">
          {t("titleDesc")}
        </MenuItem>
        <MenuItem sx={menuItemStyles} value="dateAsc">
          {t("dateAsc")}
        </MenuItem>
        <MenuItem sx={menuItemStyles} value="dateDesc">
          {t("dateDesc")}{" "}
        </MenuItem>
      </Select>
    </FormControl>
  );
};
