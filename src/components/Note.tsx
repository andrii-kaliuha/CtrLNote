// hooks/useNoteActions.ts
import { useDispatch } from "react-redux";
import {
  pinNote,
  setEditedNoteId,
  setTitle,
  setContent,
  clearNote,
  unpinNote,
  moveToTrash,
  deleteNote,
  restoreNote,
  archiveNote,
  unarchiveNote,
} from "../store/slices/notesSlice";

export const useNoteActions = () => {
  const dispatch = useDispatch();

  return {
    editNote: (id: string, title: string, content: string) => {
      dispatch(setTitle(title));
      dispatch(setContent(content));
      dispatch(setEditedNoteId(id));
    },
    clear: () => dispatch(clearNote()),
    pin: (id: string) => dispatch(pinNote(id)),
    unpin: (id: string) => dispatch(unpinNote(id)),
    moveToTrash: (id: string) => dispatch(moveToTrash(id)),
    delete: (id: string) => dispatch(deleteNote(id)),
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

// components/Note.tsx
import { useState } from "react";
import { IconButton, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NoteEditor } from "./NoteEditor";
// import { useNoteActions } from "../hooks/useNoteActions";
// import { NoteActionItem } from "./NoteActionItem";
// import { formatDate } from "../utils/formatDate";
import { Note as NoteType } from "../store/slices/notesSlice";

export type NoteProps = NoteType & { isTrash?: boolean };

export const Note: React.FC<NoteProps> = ({ id, title, text, date, status, isTrash }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { editNote, clear, pin, unpin, moveToTrash, delete: deleteNote, restore, archive, unarchive } = useNoteActions();

  const openMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const openEditModal = () => {
    setIsModalOpen(true);
    editNote(id, title, text);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    clear();
  };

  const getAvailableActions = () => {
    if (isTrash) {
      return [
        { title: "Відновити", action: () => restore(id) },
        { title: "Видалити назавжди", action: () => deleteNote(id) },
      ];
    }

    const actionsByStatus: Record<string, { title: string; action: () => void }[]> = {
      active: [
        { title: "Редагувати", action: openEditModal },
        { title: "Закріпити", action: () => pin(id) },
        { title: "Видалити", action: () => moveToTrash(id) },
        { title: "Архівувати", action: () => archive(id) },
      ],
      pinned: [
        { title: "Відкріпити", action: () => unpin(id) },
        { title: "Видалити", action: () => moveToTrash(id) },
        { title: "Архівувати", action: () => archive(id) },
      ],
      archived: [
        { title: "Роз-архівувати", action: () => unarchive(id) },
        { title: "Видалити", action: () => moveToTrash(id) },
      ],
    };

    return actionsByStatus[status] || [];
  };

  const actions = getAvailableActions();

  return (
    <li className="p-3 rounded-lg bg-[var(--color-surface)] h-[180px] overflow-hidden flex flex-col justify-between">
      <div>
        <h4 className="font-bold line-clamp-1">{title}</h4>
        {text && <p className="text-sm line-clamp-4">{text}</p>}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs leading-none">{formatDate(date)}</p>
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
