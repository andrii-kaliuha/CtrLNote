import { useTranslation } from "react-i18next";
import { Note } from "../../features/note/ui/Note";
import { NotesProps } from "../../shared/types/types";
import styles from "./NoteList.module.css";

export const NoteList: React.FC<NotesProps> = ({ notes }) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.noteList} aria-label={t("notes.title")}>
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </ul>
  );
};
