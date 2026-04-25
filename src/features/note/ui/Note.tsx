import { useDispatch, useSelector } from "react-redux";
import type { NoteProps } from "../../../shared/types/types";
import { MoreVertMenu } from "./MoreVertMenu";
import { formatDate } from "../../../shared/utils/formatDate";
import { RootState } from "../../../app/store/store";
import styles from "./Note.module.css";
import { useTranslation } from "react-i18next";
import { setSearchQuery } from "../../searchNotes/searchSlice";

export const Note: React.FC<NoteProps> = ({ id, title, text, tags = [], createdAt, status }) => {
  const language = useSelector((state: RootState) => state.settings.language);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <li className={styles.noteCard} aria-label={title || t("notes.untitled")}>
      <div>
        <h4 className={styles.title}>{title || t("notes.untitled")}</h4>
        <p className={styles.text}>{text}</p>
      </div>

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <button key={tag} className={styles.tag} onClick={() => dispatch(setSearchQuery(`#${tag}`))}>
              #{tag}
            </button>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <time className={styles.date} dateTime={new Date(createdAt).toISOString()} aria-label={formatDate(createdAt, language)}>
          {formatDate(createdAt, language)}
        </time>
        <MoreVertMenu status={status} id={id} />
      </div>
    </li>
  );
};
