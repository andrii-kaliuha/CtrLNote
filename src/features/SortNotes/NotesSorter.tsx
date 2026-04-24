import { Menu, MenuItem, Box } from "@mui/material";
import { Sort } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NotesSorterProps, SortBy } from "../../shared/types/types";
import { menuItemStyles, sortButtonSx, paperSx } from "./style";

const sortOptions: SortBy[] = ["titleAsc", "titleDesc", "dateAsc", "dateDesc"];

export const NotesSorter: React.FC<NotesSorterProps> = ({ sortBy, changeSortBy }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (value: SortBy) => {
    changeSortBy(value);
    handleClose();
  };

  return (
    <Box>
      <Box component="button" onClick={handleClick} sx={{ ...sortButtonSx, borderColor: open ? "var(--color-primary)" : "transparent" }}>
        <Sort sx={{ fontSize: 24 }} />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: paperSx } }}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleSelect(option)}
            sx={{ ...menuItemStyles, color: sortBy === option ? "var(--color-primary)" : "inherit" }}
          >
            {t(`notes.sort.${option}`)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
