import { useSelector } from "react-redux";
import type { NoteProps } from "../shared/types/types";
import { formatDate } from "../shared/utils/formatDate";
import { MoreVertMenu } from "./MoreVertMenu";
import { RootState } from "../store/store";
import styles from "./Notes.module.css";

export const Note: React.FC<NoteProps> = ({ id, title, text, createdAt, status }) => {
  const language = useSelector((state: RootState) => state.settings.language);

  return (
    <li className={styles.noteCard}>
      <div>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.text}>{text}</p>
      </div>

      <div className={styles.footer}>
        <time className={styles.date}>{formatDate(createdAt, language)}</time>
        <MoreVertMenu status={status} id={id} />
      </div>
    </li>
  );
};
