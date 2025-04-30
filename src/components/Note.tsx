import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { JSX, useState } from "react";
import { useDispatch } from "react-redux";
import { openNoteEditor } from "../store/slices/noteEditorSlice";
import type { Note as NoteType } from "../store/slices/notesSlice";
import { pinNote, unpinNote, archiveNote, unarchiveNote, moveToTrash, restoreNote, removeNotePermanently } from "../store/slices/notesSlice";

export type MoreVertMenuItemProps = { title: string; onClick: () => void; action: () => void };
export type MoreVertMenuProps = { status: string; id: string };

export const Note: React.FC<NoteType> = ({ id, title, text, createdAt, status }) => {
  return (
    <li className="p-3 rounded-lg bg-[var(--color-surface)] h-[180px] overflow-hidden flex flex-col justify-between">
      <div>
        <h4 className="line-clamp-1">{title}</h4>
        <p className="text-sm line-clamp-4">{text}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs leading-none">{createdAt}</p>
        <MoreVertMenu status={status} id={id} />
      </div>
    </li>
  );
};

const MoreVertMenuItem = ({ title, onClick, action }: MoreVertMenuItemProps): JSX.Element => {
  const handleClick = (): void => {
    action ? action() : null;
    onClick();
  };

  return (
    <MenuItem
      onClick={handleClick}
      sx={{ padding: "10px 16px", color: "var(--text-primary)", fontSize: "14px", "&:hover": { backgroundColor: "var(--color-hover)" } }}
    >
      {title}
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
          { title: "Редагувати", action: () => dispatch(openNoteEditor(id)) },
          { title: "Закріпити", action: () => dispatch(pinNote(id)) },
          { title: "Видалити", action: () => dispatch(moveToTrash(id)) },
          { title: "Архівувати", action: () => dispatch(archiveNote(id)) },
        ];
      case "pinned":
        return [
          { title: "Відкріпити", action: () => dispatch(unpinNote(id)) },
          { title: "Видалити", action: () => dispatch(moveToTrash(id)) },
          { title: "Архівувати", action: () => dispatch(archiveNote(id)) },
        ];
      case "archived":
        return [
          { title: "Роз-архівувати", action: () => dispatch(unarchiveNote(id)) },
          { title: "Видалити", action: () => dispatch(moveToTrash(id)) },
        ];
      case "deleted":
        return [
          { title: "Відновити", action: () => dispatch(restoreNote(id)) },
          { title: "Видалити назавжди", action: () => dispatch(removeNotePermanently(id)) },
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
