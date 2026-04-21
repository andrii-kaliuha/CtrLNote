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
      <IconButton
        onClick={openMenu}
        sx={{
          borderRadius: "50%",
          transition: "all 0.2s ease",
          color: "var(--text-primary)",

          "&:hover": {
            backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 90%)",
            color: "var(--color-primary)",
          },

          "&:active": {
            backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 80%)",
            transform: "scale(0.92)",
          },

          ...(Boolean(anchorEl) && {
            backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 85%)",
            color: "var(--color-primary)",
          }),
        }}
      >
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            width: "180px",
            backgroundColor: "var(--color-surface)",
            boxShadow: "none",
            borderRadius: "8px",
            border: "2px solid var(--color-primary) ",
          },
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
              padding: "8px 16px",
              color: "var(--text-primary)",
              fontSize: "14px",
              minHeight: "36px",

              "&:hover": {
                backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 85%) !important",
                color: "var(--color-primary)",
              },

              "&:active": {
                backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 75%) !important",
              },
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
