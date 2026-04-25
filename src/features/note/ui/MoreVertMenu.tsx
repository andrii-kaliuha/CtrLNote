import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MoreVertMenuProps } from "../../../shared/types/types";
import { useNoteActions } from "../useNoteActions";
import { ConfirmDialog } from "../../../shared/ui/ConfirmDialog";
import { iconButtonSx, menuItemSx, menuSx } from "./style";

export const MoreVertMenu = ({ status, id }: MoreVertMenuProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { actions, isConfirmOpen, closeConfirm, handleConfirm } = useNoteActions(id, status);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={openMenu} sx={iconButtonSx(Boolean(anchorEl))} aria-label={t("notes.actions.menu")}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={menuSx}
        aria-label={t("notes.actions.menu")}
      >
        {actions.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.action();
              closeMenu();
            }}
            sx={menuItemSx}
          >
            {t(item.title)}
          </MenuItem>
        ))}
      </Menu>

      <ConfirmDialog
        open={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        title={t("trash.delete.one")}
        description={t("trash.delete.message_one")}
      />
    </>
  );
};
