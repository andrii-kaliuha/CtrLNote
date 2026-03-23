import { Menu, MenuItem, Box } from "@mui/material";
import { Sort } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { SortBy, NotesSorterProps } from "../shared/types/types";
import { menuItemStyles } from "../shared/style/style";

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
        // Позіціонування меню відносно кнопки
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // Стилізація самого випадаючого списку
        slotProps={{
          paper: {
            sx: {
              marginTop: "8px",
              backgroundColor: "var(--color-secondary)",
              color: "var(--text-primary)",
              borderRadius: "8px",
              minWidth: "180px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
              "& .MuiList-root": { padding: 0 },
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleSelect("titleAsc")}
          sx={{
            ...menuItemStyles,
            color: sortBy === "titleAsc" ? "var(--color-primary)" : "inherit",
            fontWeight: sortBy === "titleAsc" ? 600 : 400,
          }}
        >
          {t("titleAsc")}
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("titleDesc")}
          sx={{
            ...menuItemStyles,
            color: sortBy === "titleDesc" ? "var(--color-primary)" : "inherit",
            fontWeight: sortBy === "titleDesc" ? 600 : 400,
          }}
        >
          {t("titleDesc")}
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("dateAsc")}
          sx={{
            ...menuItemStyles,
            color: sortBy === "dateAsc" ? "var(--color-primary)" : "inherit",
            fontWeight: sortBy === "dateAsc" ? 600 : 400,
          }}
        >
          {t("dateAsc")}
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("dateDesc")}
          sx={{
            ...menuItemStyles,
            color: sortBy === "dateDesc" ? "var(--color-primary)" : "inherit",
            fontWeight: sortBy === "dateDesc" ? 600 : 400,
          }}
        >
          {t("dateDesc")}
        </MenuItem>
      </Menu>
    </Box>
  );
};
