import { useSelector } from "react-redux";
import type { NoteProps } from "../../../shared/types/domain";
import { MoreVertMenu } from "./MoreVertMenu";
import { formatDate } from "../../../shared/utils/formatDate";
import { RootState } from "../../../app/store/store";
import styles from "./Note.module.css";
import { useTranslation } from "react-i18next";

export const Note: React.FC<NoteProps> = ({ id, title, text, createdAt, status }) => {
  const language = useSelector((state: RootState) => state.settings.language);
  const { t } = useTranslation();

  return (
    <li className={styles.noteCard} aria-label={title || t("notes.untitled")}>
      <div>
        <h4 className={styles.title}>{title || t("notes.untitled")}</h4>
        <p className={styles.text}>{text}</p>
      </div>

      <div className={styles.footer}>
        <time className={styles.date} dateTime={new Date(createdAt).toISOString()} aria-label={formatDate(createdAt, language)}>
          {formatDate(createdAt, language)}
        </time>
        <MoreVertMenu status={status} id={id} />
      </div>
    </li>
  );
};
