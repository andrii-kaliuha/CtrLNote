import ArchiveIcon from "@mui/icons-material/Archive";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Notes } from "../components/Notes";
import { useTranslation } from "react-i18next";
import { NoteProps } from "../types";

export const ArchivePage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const archivedNotes = notes.filter((note) => note.status === "archived");
  const { t } = useTranslation();

  return (
    <section className="flex flex-col justify-center items-center h-full">
      {archivedNotes.length > 0 ? <Archive text={t("archive")} notes={archivedNotes} /> : <EmptyArchive text={t("archive_empty_message")} />}
    </section>
  );
};

const Archive = ({ text, notes }: { text: string; notes: NoteProps[] }) => (
  <section className="flex flex-col items-center w-full h-full">
    <h2 className="pl-3 pb-3 sm:p-3 self-start">{text}</h2>
    <Notes notes={notes} />
  </section>
);

const EmptyArchive = ({ text }: { text: string }) => (
  <section className="flex flex-col items-center justify-center">
    <ArchiveIcon sx={{ fontSize: 128 }} />
    <p className="mt-3 text-lg text-[var(--text-secondary)]">{text}</p>
  </section>
);
