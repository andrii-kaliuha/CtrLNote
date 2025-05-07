import { NotesProps } from "../types";
import { Note } from "./Note";

export const Notes: React.FC<NotesProps> = ({ notes }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {notes.map((note) => (
      <Note key={note.id} {...note} />
    ))}
  </ul>
);
