import ArchiveIcon from "@mui/icons-material/Archive";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Notes } from "../components/Notes";
import { useTranslation } from "react-i18next";

export const ArchivePage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const archivedNotes = notes.filter((note) => note.status === "archived");

  return (
    <section className="flex flex-col items-center w-full h-full">
      {archivedNotes.length > 0 ? <Notes notes={archivedNotes} /> : <EmptyArchive />}
    </section>
  );
};

const EmptyArchive = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <ArchiveIcon sx={{ fontSize: 128 }} />
      <p className="mt-3 text-lg text-[var(--text-secondary)]">{t("archive_empty_message")}</p>
    </div>
  );
};
