import { NotesProps } from "../shared/types/types";
import { Note } from "./Note";

export const Notes: React.FC<NotesProps> = ({ notes }) => (
  <ul className="grid grid-cols-1 gap-3">
    {notes.map((note) => (
      <Note key={note.id} {...note} />
    ))}
  </ul>
);
