import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ArchiveIcon from "@mui/icons-material/Archive";
import { NoteProps } from "../shared/types/types";
import { NoteList } from "../widgets/noteList/NoteList";
import { EmptyState } from "../shared/ui/EmptyState";
import styles from "./ArchivePage.module.css";
import { RootState } from "../app/store/store";

export const ArchivePage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const archivedNotes = notes.filter((note) => note.status === "archived");
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {archivedNotes.length > 0 ?
        <Archive text={t("archive.title")} notes={archivedNotes} />
      : <EmptyState icon={ArchiveIcon} title={t("archive.empty_message")} />}
    </div>
  );
};

const Archive = ({ text, notes }: { text: string; notes: NoteProps[] }) => (
  <>
    <h2 className={styles.header}>{text}</h2>
    <div className={styles.notesWrapper}>
      <NoteList notes={notes} />
    </div>
  </>
);
