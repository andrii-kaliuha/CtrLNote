import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  deleteNote,
  pinNote,
  archiveNote,
  restoreNote,
  editNote,
  setEditedNoteId,
  setTitle,
  setContent,
  clearNote,
  addNote,
  unpinNote,
  moveToTrash,
} from "../store/slices/notesSlice";

type NoteStatus = "active" | "pinned" | "archived" | "deleted";

export const NotesPage = () => {
  const { notes, pinnedNotes, archivedNotes, deletedNotes } = useSelector((state: RootState) => state.note);

  return (
    <section className="flex flex-col w-full">
      <NoteEditor />
      <Notes title="Нотатки" notes={notes} status="active" />
      <Notes title="Закріплені" notes={pinnedNotes} status="pinned" />
      <Notes title="Архів" notes={archivedNotes} status="archived" />
      <Notes title="Видалені" notes={deletedNotes} status="deleted" />
    </section>
  );
};

type NotesProps = { title: string; notes: NoteProps[]; status: NoteStatus };
type NoteProps = {
  id: string;
  title: string;
  text: string;
  date: string | Date;
};

const Notes: React.FC<NotesProps> = ({ title, notes, status }) => {
  return (
    <>
      <h2 className="p-3">{title}</h2>
      <ul className="columns-1 md:columns-2 lg:columns-3 gap-3 w-full">
        {notes.map((note: NoteProps) => (
          <Note key={note.id} {...note} status={status} />
        ))}
      </ul>
    </>
  );
};

export const Note: React.FC<NoteProps & { status: NoteStatus }> = ({ id, title, text, date, status }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEdit = (id: string, title: string, text: string) => {
    dispatch(setTitle(title));
    dispatch(setContent(text));
    dispatch(setEditedNoteId(id));
  };

  const handlePin = (id: string) => {
    dispatch(pinNote(id));
  };

  const handleArchive = (id: string) => {
    dispatch(archiveNote(id));
  };

  const handleRestore = (id: string) => {
    dispatch(restoreNote(id));
  };

  const handleUnpin = (id: string) => {
    dispatch(unpinNote(id));
  };

  const handleUnarchive = (id: string) => {
    dispatch(restoreNote(id));
  };

  const handleDelete = (id: string) => {
    dispatch(moveToTrash(id));
  };

  const handleFullDelete = (id: string) => {
    dispatch(deleteNote(id));
  };

  const noteOperations = {
    active: [
      { title: "Редагувати", action: () => handleEdit(id, title, text) },
      { title: "Закріпити", action: () => handlePin(id) },
      { title: "Архівувати", action: () => handleArchive(id) },
      { title: "Видалити", action: () => handleDelete(id) },
    ],
    pinned: [
      { title: "Відкріпити", action: () => handleUnpin(id) },
      { title: "Видалити", action: () => handleDelete(id) },
    ],
    archived: [
      { title: "Відновити", action: () => handleUnarchive(id) },
      { title: "Видалити", action: () => handleDelete(id) },
    ],
    deleted: [
      { title: "Відновити", action: () => handleRestore(id) },
      { title: "Видалити назавжди", action: () => handleFullDelete(id) },
    ],
  };

  const menuActions = noteOperations[status];

  return (
    <li className="break-inside-avoid inline-block w-full mb-3 p-3 rounded-lg relative bg-[#faedcd]">
      <div className="flex justify-between items-start">
        <h4 className="font-bold">{title}</h4>
      </div>
      <p className="text-sm">{text}</p>
      <div className="flex justify-between items-end">
        <p className="text-xs text-gray-600">{typeof date === "string" ? date : date.toLocaleDateString()}</p>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
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
    </li>
  );
};

type MenuButtonProps = { title: string; onClick: () => void; action: () => void };

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

export const NoteEditor = () => {
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setContent(e.target.value));
  };

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
          })
        );
      }
    } else {
      dispatch(addNote());
    }
    dispatch(clearNote());
  };

  const handleCancel = () => {
    dispatch(clearNote());
  };

  return (
    <div className="p-4 mb-4 bg-[#f8f9fa] rounded-lg">
      <input type="text" placeholder="Заголовок" value={title} onChange={handleTitleChange} className="w-full p-2 mb-2 border rounded-md" />
      <textarea
        placeholder="Текст нотатки"
        value={text}
        onChange={handleContentChange}
        className="w-full p-2 mb-2 border rounded-md"
        rows={4}
      />
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
