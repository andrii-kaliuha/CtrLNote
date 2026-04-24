import { Note } from "../../features/note/ui/Note";
import { NotesProps } from "../../shared/types/types";
import styles from "./NoteList.module.css";

export const NoteList: React.FC<NotesProps> = ({ notes }) => (
  <ul className={styles.noteList}>
    {notes.map((note) => (
      <Note key={note.id} {...note} />
    ))}
  </ul>
);
