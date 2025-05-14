import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { MoreVertMenuItemProps, MoreVertMenuProps } from "../types";
import { useTranslation } from "react-i18next";
import { RootState } from "../store/store";
import { getAvailableActions } from "../utils/noteActions";

const MoreVertMenuItem = ({ title, onClick, action }: MoreVertMenuItemProps) => {
  const handleClick = (): void => {
    action && action();
    onClick();
  };

  const { t } = useTranslation();

  return (
    <MenuItem
      onClick={handleClick}
      sx={{ padding: "10px 16px", color: "var(--text-primary)", fontSize: "14px", "&:hover": { backgroundColor: "var(--color-hover)" } }}
    >
      {t(title)}
    </MenuItem>
  );
};

export const MoreVertMenu: React.FC<MoreVertMenuProps> = ({ status, id }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>): void => setAnchorEl(event.currentTarget);
  const closeMenu = (): void => setAnchorEl(null);

  const trashEnabled = useSelector((state: RootState) => state.settings.trashEnabled);
  const actions = getAvailableActions(status, id, dispatch, trashEnabled);

  return (
    <>
      <IconButton onClick={openMenu} sx={{ borderRadius: "50%", ":hover": { backgroundColor: "var(--color-hover)" } }}>
        <MoreVert sx={{ color: "var(--text-primary)" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        sx={{
          "& .MuiPaper-root": { width: "200px", backgroundColor: "var(--color-secondary)", borderRadius: "8px" },
          "& .MuiList-root": { padding: 0 },
        }}
      >
        {actions.map((item, index) => (
          <MoreVertMenuItem key={index} title={item.title} onClick={closeMenu} action={item.action} />
        ))}
      </Menu>
    </>
  );
};
