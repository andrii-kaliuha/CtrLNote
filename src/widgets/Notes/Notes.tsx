import { NotesProps } from "../../shared/types/types";
import { Note } from "../Notes/Note";
import styles from "./Notes.module.css";

export const Notes: React.FC<NotesProps> = ({ notes }) => (
  <ul className={styles.notesGrid}>
    {notes.map((note) => (
      <Note key={note.id} {...note} />
    ))}
  </ul>
);
