import { IconButton, Menu, MenuItem } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import PushPinIcon from "@mui/icons-material/PushPin";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import notes from "../notes.json";

export const ArchivePage = () => {
  const [isEmpty] = useState(false);
  return <section className="flex flex-col items-center w-full">{isEmpty ? <EmptyArchive /> : <Archive />}</section>;
};

const EmptyArchive = () => {
  return (
    <div className="flex flex-col items-center justify-center h-3/4">
      <ArchiveIcon sx={{ fontSize: 128 }} />
      <p>Архів ваших нотаток знаходиться тут</p>
    </div>
  );
};

const Archive = () => {
  return (
    <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 px-3 w-full">
      {notes.map((note) => (
        <Notes key={note.id} title={note.title} description={note.description} color={note.color} date={note.date} />
      ))}
    </ul>
  );
};

const colors: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  pink: "bg-pink-300",
  indigo: "bg-indigo-300",
  teal: "bg-teal-300",
};

export const Notes = ({ title, description, color, date }: { title: string; description: string; color: string; date: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <li className={`break-inside-avoid inline-block w-full mb-3 p-3 rounded-lg relative ${colors[color] || "bg-gray-200"}`}>
      <div className="flex justify-between items-start">
        <h4 className="font-bold">{title}</h4>
        <IconButton>
          <PushPinIcon />
        </IconButton>
      </div>
      <p className="text-sm">{description}</p>
      <div className="flex justify-between items-end">
        <p className="text-xs text-gray-600">{date}</p>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} slotProps={{ paper: { style: { width: "200px" } } }}>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Pinned</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
          <MenuItem onClick={handleClose}>Archive</MenuItem>
          <MenuItem onClick={handleClose}>Color</MenuItem>
        </Menu>
      </div>
    </li>
  );
};
