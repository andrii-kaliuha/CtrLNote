import notesList from "../notes.json";
import { NoteEditor } from "../components/NoteEditor";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const NotesPage = () => {
  const { notes } = useSelector((state: RootState) => state.note);

  return (
    <section className="flex flex-col w-full">
      <NoteEditor />
      <Notes title="Нотатки" notes={notes} />
      <Notes title="Збережені" notes={notesList} />
      <Notes title="Архів" notes={notesList} />
    </section>
  );
};

type NotesProps = { title: string; notes: NoteProps[] };
type NoteProps = { id: string; title: string; text: string; date: string | Date };

const Notes: React.FC<NotesProps> = ({ title, notes }) => {
  return (
    <>
      <h2 className="p-3">{title}</h2>
      <ul className="columns-1 md:columns-2 lg:columns-3 gap-3 w-full">
        {notes.map((note: NoteProps) => (
          <Note key={note.id} {...note} />
        ))}
      </ul>
    </>
  );
};

export const Note: React.FC<NoteProps> = ({ id, title, text, date }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLog = (id: string, title: string) => console.log({ id, title });

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
            "& .MuiPaper-root": { paddingBottom: 0, width: "200px", backgroundColor: "#2c2c2c", color: "white", borderRadius: "8px" },
            "& .MuiList-root": { padding: 0 },
          }}
        >
          <MenuButton title="Edit" onClick={handleClose} action={() => handleLog(id, "Edit")}></MenuButton>
          <MenuButton title="Pinned" onClick={handleClose} action={() => handleLog(id, "Pinned")}></MenuButton>
          <MenuButton title="Delete" onClick={handleClose} action={() => handleLog(id, "Delete")}></MenuButton>
          <MenuButton title="Archive" onClick={handleClose} action={() => handleLog(id, "Archive")}></MenuButton>
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
