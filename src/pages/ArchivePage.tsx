import ArchiveIcon from "@mui/icons-material/Archive";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Notes } from "../components/Notes";
import { useTranslation } from "react-i18next";
import { NoteProps } from "../shared/types/types";
import { EmptyState } from "../shared/ui/EmptyState";

export const ArchivePage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const archivedNotes = notes.filter((note) => note.status === "archived");
  const { t } = useTranslation();

  return (
    // <section className="flex flex-col min-h-full w-full">
    <section className="flex flex-col h-full w-full">
      {archivedNotes.length > 0 ?
        <Archive text={t("archive")} notes={archivedNotes} />
      : <EmptyState icon={ArchiveIcon} title={t("archive_empty_message")} />}
    </section>
  );
};

const Archive = ({ text, notes }: { text: string; notes: NoteProps[] }) => (
  <>
    <h2 className="pl-3 pb-3 sm:p-3 self-start">{text}</h2>
    <div className="overflow-y-auto">
      <Notes notes={notes} />
    </div>
  </>
);
