import { IconButton } from "@mui/material";
import { NotesProps } from "../shared/types/types";
import { Note } from "./Note";
import { Add } from "@mui/icons-material";

export const Notes: React.FC<NotesProps> = ({ notes, addButton, action }) => (
  // <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
  <ul className="grid grid-cols-1 gap-3">
    {/* {addButton && (
      <li className="p-3 rounded-lg relative bg-[var(--color-surface)] flex justify-center items-center h-[180px]">
        <IconButton aria-label="Add note" onClick={action} sx={{ ":hover": { backgroundColor: "var(--color-hover)" } }}>
          <Add sx={{ width: 48, height: 48, color: "var(--text-primary)" }} />
        </IconButton>
      </li>
    )} */}
    {notes.map((note) => (
      <Note key={note.id} {...note} />
    ))}
  </ul>
);
