import notes from "../notes.json";
import { NoteEditor } from "../NoteEditor";
import { useAppSelector } from "../store/hooks";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

export const NotesPage = () => {
  return (
    <section className="flex flex-col w-full">
      <NoteEditor />
      <PinnedNotes title="Закріплене" />
      <Notes title="Нотатки" />
    </section>
  );
};

const PinnedNotes = ({ title }: { title: string }) => {
  // const notes = useAppSelector((state) => state.notes.notes);
  return (
    <>
      <h2 className="p-3">{title}</h2>
      <ul className="columns-1 md:columns-2  gap-3 w-full">
        {notes.map((note) => (
          <Note key={note.id} title={note.title} description={note.description} date={note.date} />
        ))}
      </ul>
    </>
  );
};

const Notes = ({ title }: { title: string }) => {
  const notes = useAppSelector((state) => state.notes.notes);
  return (
    <>
      <h2 className="p-3">{title}</h2>
      <ul className="columns-1 md:columns-2  gap-3 w-full">
        {notes.map((note) => (
          <Note key={note.id} title={note.title} description={note.content} date={note.date} />
        ))}
      </ul>
    </>
  );
};

export const Note = ({ title, description, date }: { title: string; description: string; date: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <li className="break-inside-avoid inline-block w-full mb-3 p-3 rounded-lg relative bg-[#faedcd]">
      <div className="flex justify-between items-start">
        <h4 className="font-bold">{title}</h4>
      </div>
      <p className="text-sm">{description}</p>
      <div className="flex justify-between items-end">
        <p className="text-xs text-gray-600">{date}</p>
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
            "& .MuiList-root": {
              padding: 0,
            },
          }}
        >
          <MenuItem sx={{ "&:hover": { backgroundColor: "#444" } }} onClick={handleClose}>
            Edit
          </MenuItem>
          <MenuItem sx={{ "&:hover": { backgroundColor: "#444" } }} onClick={handleClose}>
            Pinned
          </MenuItem>
          <MenuItem sx={{ "&:hover": { backgroundColor: "#aa0000", color: "white" } }} onClick={handleClose}>
            Delete
          </MenuItem>
          <MenuItem sx={{ "&:hover": { backgroundColor: "#444" } }} onClick={handleClose}>
            Archive
          </MenuItem>
        </Menu>
      </div>
    </li>
  );
};
