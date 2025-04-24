// hooks/useNoteActions.ts
import { useDispatch } from "react-redux";
import {
  pinNote,
  unpinNote,
  moveToTrash,
  removeNotePermanently,
  restoreNote,
  archiveNote,
  unarchiveNote,
  setEditableNote,
  setTitle,
  setText,
  clearNote,
} from "../store/slices/notesSlice";

export const useNoteActions = () => {
  const dispatch = useDispatch();

  return {
    // Встановлення ID нотатки, яку редагуємо
    startEdit: (id: string) => dispatch(setEditableNote(id)),

    // Встановлення значень полів окремо
    setTitle: (title: string) => dispatch(setTitle(title)),
    setText: (text: string) => dispatch(setText(text)),

    // Очищення полів та editableNote
    clear: () => dispatch(clearNote()),

    // Інші дії
    pin: (id: string) => dispatch(pinNote(id)),
    unpin: (id: string) => dispatch(unpinNote(id)),
    moveToTrash: (id: string) => dispatch(moveToTrash(id)),
    delete: (id: string) => dispatch(removeNotePermanently(id)),
    restore: (id: string) => dispatch(restoreNote(id)),
    archive: (id: string) => dispatch(archiveNote(id)),
    unarchive: (id: string) => dispatch(unarchiveNote(id)),
  };
};

// utils/formatDate.ts
export const formatDate = (date: number): string => {
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// components/NoteActionItem.tsx
import { MenuItem } from "@mui/material";

type NoteActionItemProps = { title: string; onClick: () => void; action: () => void };

export const NoteActionItem: React.FC<NoteActionItemProps> = ({ title, onClick, action }) => {
  const handleClick = () => {
    onClick();
    action();
  };

  return <MenuItem onClick={handleClick}>{title}</MenuItem>;
};
import { useState } from "react";
import { IconButton, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NoteEditor } from "./NoteEditor";
// import { useNoteActions } from "../hooks/useNoteActions";
// import { NoteActionItem } from "./NoteActionItem";
// import { formatDate } from "../utils/formatDate";
import { Note as NoteType } from "../store/slices/notesSlice";

export type NoteProps = NoteType & { isTrash?: boolean };

export const Note: React.FC<NoteProps> = ({ id, title, text, createdAt, status }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    startEdit,
    setTitle: setNoteTitle,
    setText: setNoteText,
    clear,
    pin,
    unpin,
    moveToTrash,
    delete: deleteNote,
    restore,
    archive,
    unarchive,
  } = useNoteActions();

  const openMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const openEditModal = () => {
    startEdit(id);
    setNoteTitle(title);
    setNoteText(text);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    clear();
    setIsModalOpen(false);
  };

  const getAvailableActions = () => {
    switch (status) {
      case "active":
        return [
          { title: "Редагувати", action: openEditModal },
          { title: "Закріпити", action: () => pin(id) },
          { title: "Видалити", action: () => moveToTrash(id) },
          { title: "Архівувати", action: () => archive(id) },
        ];
      case "pinned":
        return [
          { title: "Відкріпити", action: () => unpin(id) },
          { title: "Видалити", action: () => moveToTrash(id) },
          { title: "Архівувати", action: () => archive(id) },
        ];
      case "archived":
        return [
          { title: "Роз-архівувати", action: () => unarchive(id) },
          { title: "Видалити", action: () => moveToTrash(id) },
        ];
      case "deleted":
        return [
          { title: "Відновити", action: () => restore(id) },
          { title: "Видалити назавжди", action: () => deleteNote(id) },
        ];
      default:
        return [];
    }
  };

  const actions = getAvailableActions();

  return (
    <li className="p-3 rounded-lg bg-[var(--color-surface)] h-[180px] overflow-hidden flex flex-col justify-between">
      <div>
        <h4 className="line-clamp-1">{title}</h4>
        {text && <p className="text-sm line-clamp-4">{text}</p>}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs leading-none">{formatDate(createdAt)}</p>
        <IconButton onClick={openMenu} sx={{ borderRadius: "50%", ":hover": { backgroundColor: "var(--color-hover)" } }}>
          <MoreVertIcon sx={{ color: "var(--text-primary)" }} />
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
            <NoteActionItem key={index} title={item.title} onClick={closeMenu} action={item.action} />
          ))}
        </Menu>
      </div>

      <NoteEditor state={isModalOpen} closeModal={closeEditModal} />
    </li>
  );
};
