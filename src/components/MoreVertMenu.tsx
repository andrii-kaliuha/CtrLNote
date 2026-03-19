import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getAvailableActions } from "../shared/utils/noteActions";
import { useDeleteNote } from "../shared/hooks/useDeleteNote";
import { ConfirmDialog } from "../shared/ui/ConfirmDialog";
import { MoreVertMenuProps } from "../shared/types/types";
import { useDispatch } from "react-redux";

export const MoreVertMenu = ({ status, id }: MoreVertMenuProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { deleteNote, isConfirmOpen, closeConfirm, handleConfirm } = useDeleteNote();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const actions = getAvailableActions(status, id, dispatch, deleteNote);

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
          <MenuItem
            key={index}
            onClick={() => {
              item.action();
              closeMenu();
            }}
            sx={{
              padding: "10px 16px",
              color: "var(--text-primary)",
              fontSize: "14px",
              "&:hover": { backgroundColor: "var(--color-hover)" },
            }}
          >
            {t(item.title)}
          </MenuItem>
        ))}
      </Menu>

      <ConfirmDialog
        open={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        title={t("confirm_delete_title")}
        description={t("confirm_delete_message")}
      />
    </>
  );
};
