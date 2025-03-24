import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import { NoteEditor } from "../components/NoteEditor";
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
  Note as NoteType,
} from "../store/slices/notesSlice";

export type NoteProps = NoteType & { notes?: NoteType[]; isTrash?: boolean };
type NoteOperation = { title: string; action: () => void };
type MoreVertItemProps = { title: string; onClick: () => void; action: () => void };

export const Note: React.FC<NoteProps> = ({ id, title, text, date, status, isTrash }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEdit = (id: string, title: string, text: string) => {
    dispatch(setTitle(title));
    dispatch(setContent(text));
    dispatch(setEditedNoteId(id));
  };

  const handlePin = (id: string) => dispatch(pinNote(id));
  const handleUnpin = (id: string) => dispatch(unpinNote(id));
  const handleDelete = (id: string) => dispatch(moveToTrash(id));
  const handleRestore = (id: string) => dispatch(restoreNote(id));
  const handleDeletePermanent = (id: string) => dispatch(deleteNote(id));
  const handleArchive = (id: string) => dispatch(archiveNote(id));
  const handleUnarchive = (id: string) => dispatch(unarchiveNote(id));

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleEdit(id, title, text);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearNote());
  };

  const noteOperations: { [key: string]: NoteOperation[] } = {
    active: [
      { title: "Редагувати", action: () => handleOpenModal() },
      { title: "Закріпити", action: () => handlePin(id) },
      { title: "Видалити", action: () => handleDelete(id) },
      { title: "Архівувати", action: () => handleArchive(id) },
    ],
    pinned: [
      { title: "Відкріпити", action: () => handleUnpin(id) },
      { title: "Видалити", action: () => handleDelete(id) },
      { title: "Архівувати", action: () => handleArchive(id) },
    ],
    archived: [
      { title: "Роз-архівувати", action: () => handleUnarchive(id) },
      { title: "Видалити", action: () => handleDelete(id) },
    ],
    deleted: [
      { title: "Відновити", action: () => handleRestore(id) },
      { title: "Видалити назавжди", action: () => handleDeletePermanent(id) },
    ],
  };

  const menuActions = useMemo(() => {
    if (isTrash) {
      return noteOperations.deleted;
    }
    if (status === "archived") {
      return noteOperations.archived;
    }
    return noteOperations[status];
  }, [status, noteOperations, isTrash]);

  return (
    <li className="p-3 rounded-lg relative bg-[#faedcd]">
      <div className="flex justify-between items-start">
        <h4 className="font-bold">{title}</h4>
      </div>
      <p className="text-sm">{text}</p>
      <div className="flex justify-between items-end">
        <p className="text-xs text-gray-600">{typeof date === "number" ? new Date(date).toLocaleDateString() : date}</p>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              paddingBottom: 0,
              width: "200px",
              backgroundColor: "#2c2c2c",
              color: "white",
              borderRadius: "8px",
            },
            "& .MuiList-root": { padding: 0 },
          }}
        >
          {menuActions.map((item, index) => (
            <MoreVertItem key={index} title={item.title} onClick={handleClose} action={item.action} />
          ))}
        </Menu>
      </div>
      <NoteEditor state={isModalOpen} closeModal={handleCloseModal} />
    </li>
  );
};

const MoreVertItem: React.FC<MoreVertItemProps> = ({ title, onClick, action }) => {
  return (
    <MenuItem
      sx={{ "&:hover": { backgroundColor: "#444" } }}
      onClick={() => {
        onClick();
        action();
      }}
    >
      {title}
    </MenuItem>
  );
};
