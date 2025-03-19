import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IconButton, Menu, MenuItem, Modal, Box, TextField } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import {
  pinNote,
  editNote,
  setEditedNoteId,
  setTitle,
  setContent,
  clearNote,
  addNote,
  unpinNote,
  moveToTrash,
  deleteNote,
  restoreNote,
  archiveNote,
  unarchiveNote,
  Note as NoteType,
} from "../store/slices/notesSlice";

type NotesProps = { title: string; notes: NoteProps[] };
type NoteProps = NoteType & { notes?: NoteType[]; isTrash?: boolean };
type NoteOperation = { title: string; action: () => void };
type MenuButtonProps = { title: string; onClick: () => void; action: () => void };
type NoteEditorProps = { closeModal: () => void };

export const NotesPage = () => {
  const { notes, pinnedNotes } = useSelector((state: RootState) => state.note);

  return (
    <section className="flex flex-col w-full">
      {pinnedNotes.length > 0 && <Notes title="Закріплені" notes={pinnedNotes} />}
      <Notes title="Нотатки" notes={notes} />
    </section>
  );
};

const Notes: React.FC<NotesProps> = ({ title, notes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(clearNote());
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <h2 className="p-3">{title}</h2>
      <ul className="columns-1 md:columns-2 lg:columns-3 gap-3 w-full">
        {title === "Нотатки" && (
          <li className="break-inside-avoid w-full h-[112px] mb-3 p-3 rounded-lg relative bg-[#faedcd] flex justify-center items-center">
            <IconButton onClick={handleOpenModal}>
              <AddIcon style={{ width: "48px", height: "48px" }} />
            </IconButton>
          </li>
        )}
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ul>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <NoteEditor closeModal={handleCloseModal} />
        </Box>
      </Modal>
    </>
  );
};

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
    <li className="break-inside-avoid inline-block w-full mb-3 p-3 rounded-lg relative bg-[#faedcd]">
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
            <MenuButton key={index} title={item.title} onClick={handleClose} action={item.action} />
          ))}
        </Menu>
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <NoteEditor closeModal={handleCloseModal} />
        </Box>
      </Modal>
    </li>
  );
};

const MenuButton: React.FC<MenuButtonProps> = ({ title, onClick, action }) => {
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

export const NoteEditor: React.FC<NoteEditorProps> = ({ closeModal }) => {
  const { title, text, editedNoteId, notes, pinnedNotes } = useSelector((state: RootState) => state.note);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (title || text) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [title, text]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value));
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(setContent(e.target.value));
  const handleSave = () => {
    if (isEditing && editedNoteId) {
      const noteToEdit = [...notes, ...pinnedNotes].find((note) => note.id === editedNoteId);
      if (noteToEdit) {
        dispatch(
          editNote({
            id: editedNoteId,
            title,
            text,
            date: noteToEdit.date,
            status: noteToEdit.status,
          })
        );
      }
    } else {
      dispatch(addNote());
    }
    dispatch(clearNote());
    closeModal();
  };

  const handleCancel = () => {
    dispatch(clearNote());
    closeModal();
  };

  return (
    <div>
      <TextField label="Заголовок" value={title} onChange={handleTitleChange} fullWidth margin="normal" />
      <TextField label="Текст нотатки" value={text} onChange={handleContentChange} multiline rows={4} fullWidth margin="normal" />
      <div className="flex justify-end">
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Зберегти
        </button>
        <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Скасувати
        </button>
      </div>
    </div>
  );
};
