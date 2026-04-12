import { Menu, MenuItem, Box } from "@mui/material";
import { Sort } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { SortBy, NotesSorterProps } from "../shared/types/types";
import { menuItemStyles } from "../shared/style/style";

const sortOptions: SortBy[] = ["titleAsc", "titleDesc", "dateAsc", "dateDesc"];

export const NotesSorter: React.FC<NotesSorterProps> = ({ sortBy, changeSortBy }) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (value: SortBy) => {
    changeSortBy(value);
    handleClose();
  };

  return (
    <Box>
      <Box
        component="button"
        onClick={handleClick}
        sx={{
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-surface)",
          color: "var(--text-primary)",
          borderRadius: "8px",
          cursor: "pointer",
          border: "2px solid transparent",
          outline: "none",
          "&:hover": { borderColor: "var(--color-border)" },

          borderColor: open ? "var(--color-primary)" : "transparent",
        }}
      >
        <Sort sx={{ fontSize: 24 }} />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "var(--color-surface)",
              color: "var(--text-primary)",

              marginTop: "4px",
              borderRadius: "8px",
              boxShadow: "none",
              border: "2px solid var(--color-primary)",

              "& .MuiList-root": { padding: 0 },
            },
          },
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleSelect(option)}
            sx={{ ...menuItemStyles, color: sortBy === option ? "var(--color-primary)" : "inherit" }}
          >
            {t(option)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
