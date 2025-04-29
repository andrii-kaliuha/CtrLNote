import { Note } from "./Note";
import { Note as NoteType } from "../store/slices/notesSlice";

type NotesProps = { notes: NoteType[] };

export const Notes: React.FC<NotesProps> = ({ notes }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </ul>
  );
};
