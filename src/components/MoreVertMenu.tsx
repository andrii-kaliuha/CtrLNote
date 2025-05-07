import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { JSX, useState } from "react";
import { useDispatch } from "react-redux";
import { openNoteEditor } from "../store/slices/noteEditorSlice";
import type { MoreVertMenuItemProps, MoreVertMenuProps } from "../types";
import { pinNote, unpinNote, archiveNote, unarchiveNote, moveToTrash, restoreNote, removeNotePermanently } from "../store/slices/notesSlice";
import { useTranslation } from "react-i18next";

const MoreVertMenuItem = ({ title, onClick, action }: MoreVertMenuItemProps): JSX.Element => {
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

export const MoreVertMenu: React.FC<MoreVertMenuProps> = ({ status, id }): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>): void => setAnchorEl(event.currentTarget);

  const closeMenu = (): void => setAnchorEl(null);

  const getAvailableActions = () => {
    switch (status) {
      case "active":
        return [
          { title: "note_action_edit", action: () => dispatch(openNoteEditor(id)) },
          { title: "note_action_pin", action: () => dispatch(pinNote(id)) },
          { title: "note_action_delete", action: () => dispatch(moveToTrash(id)) },
          { title: "note_action_archive", action: () => dispatch(archiveNote(id)) },
        ];
      case "pinned":
        return [
          { title: "note_action_unpin", action: () => dispatch(unpinNote(id)) },
          { title: "note_action_delete", action: () => dispatch(moveToTrash(id)) },
          { title: "note_action_archive", action: () => dispatch(archiveNote(id)) },
        ];
      case "archived":
        return [
          { title: "note_action_unarchive", action: () => dispatch(unarchiveNote(id)) },
          { title: "note_action_delete", action: () => dispatch(moveToTrash(id)) },
        ];
      case "deleted":
        return [
          { title: "note_action_restore", action: () => dispatch(restoreNote(id)) },
          { title: "note_action_delete_permanent", action: () => dispatch(removeNotePermanently(id)) },
        ];
      default:
        return [];
    }
  };

  const actions = getAvailableActions();

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
