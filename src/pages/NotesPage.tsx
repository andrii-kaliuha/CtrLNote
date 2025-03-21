import { useEffect, useState, useMemo, useRef } from "react";
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
  reorderNotes,
} from "../store/slices/notesSlice";
import { Select, FormControl, InputLabel } from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type NotesProps = { title: string; notes: NoteProps[] };
type NoteProps = NoteType & { notes?: NoteType[]; isTrash?: boolean };
type NoteOperation = { title: string; action: () => void };
type MenuButtonProps = { title: string; onClick: () => void; action: () => void };
type NoteEditorProps = { closeModal: () => void };

export const NotesPage = () => {
  const { pinnedNotes, notes: allNotes } = useSelector((state: RootState) => state.notes);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="flex flex-col w-full">
        {pinnedNotes.length > 0 && <Notes title="Закріплені" notes={pinnedNotes} />}
        <Notes title="Нотатки" notes={allNotes} />
      </section>
    </DndProvider>
  );
};

export const Notes: React.FC<NotesProps> = ({ title, notes: initialNotes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState<"titleAsc" | "titleDesc" | "dateAsc" | "dateDesc">("dateDesc");
  const [sortedNotes, setSortedNotes] = useState(initialNotes);

  useEffect(() => {
    setSortedNotes(initialNotes);
  }, [initialNotes]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(clearNote());
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSortChange = (event: any) => {
    const value = event.target.value;
    setSortOption(value);

    let newSortedNotes = [...sortedNotes];

    switch (value) {
      case "titleAsc":
        newSortedNotes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        newSortedNotes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "dateAsc":
        newSortedNotes.sort((a, b) => a.date - b.date);
        break;
      case "dateDesc":
        newSortedNotes.sort((a, b) => b.date - a.date);
        break;
      default:
        break;
    }

    setSortedNotes(newSortedNotes);
  };

  return (
    <>
      <div className="p-3 flex justify-between items-center">
        <h2 className="p-0">{title}</h2>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel id="sort-select-label">Сортувати</InputLabel>
          <Select labelId="sort-select-label" id="sort-select" value={sortOption} onChange={handleSortChange} label="Сортувати">
            <MenuItem value={"titleAsc"}>Назва (А-Я)</MenuItem>
            <MenuItem value={"titleDesc"}>Назва (Я-А)</MenuItem>
            <MenuItem value={"dateAsc"}>Дата (Старі-Нові)</MenuItem>
            <MenuItem value={"dateDesc"}>Дата (Нові-Старі)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ul className="columns-1 md:columns-2 lg:columns-3 gap-3 w-full">
        {/* <ul className="grid grid-cols-3 gap-3 w-full"> */}
        {title === "Нотатки" && (
          <li className="break-inside-avoid aspect-[12/5] mb-3 p-3 rounded-lg relative bg-[#faedcd] flex justify-center items-center">
            <IconButton onClick={handleOpenModal}>
              <AddIcon style={{ width: "48px", height: "48px" }} />
            </IconButton>
          </li>
        )}
        {sortedNotes.map((note, index) => (
          <Note key={note.id} {...note} index={index} notes={sortedNotes} />
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

interface NoteItemProps extends NoteProps {
  index: number;
  notes: NoteType[];
}

export const Note: React.FC<NoteItemProps> = ({ id, title, text, date, status, isTrash, index }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

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

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "note",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "note",
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(reorderNotes({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  }));

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`break-inside-avoid inline-block w-full mb-3 p-3 rounded-lg relative bg-[#faedcd] ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      // className={`mb-3 p-3 rounded-lg relative bg-[#faedcd] ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
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
  const { title, text, editedNoteId, notes, pinnedNotes } = useSelector((state: RootState) => state.notes);
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
