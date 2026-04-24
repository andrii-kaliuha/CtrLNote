import { useSelector } from "react-redux";
import type { NoteProps } from "../../../shared/types/types";
import { MoreVertMenu } from "./MoreVertMenu";
import { formatDate } from "../../../shared/utils/formatDate";
import { RootState } from "../../../app/store/store";
import styles from "./Note.module.css";

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
