import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { restoreNote, removeNote as removeNotePermanently } from "../store/slices/notesSlice";
import { Notes } from "../components/Notes";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "..//shared/ui/Button";
import { autoDeleteNotes } from "..//shared/utils/autoDeleteNotes";
import { NoteProps } from "../shared/types/types";

export const TrashPage = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const deletedNotes = notes.filter((note) => note.status === "deleted");
  const autoDeletePeriod = useSelector((state: RootState) => state.settings.autoDeletePeriod);
  const trashEnabled = useSelector((state: RootState) => state.settings.trashEnabled);
  const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
  const days = autoDeletePeriod / MILLISECONDS_IN_DAY;

  const dispatch = useDispatch();

  useEffect(() => {
    autoDeleteNotes(dispatch, deletedNotes, autoDeletePeriod);

    const interval = setInterval(() => {
      autoDeleteNotes(dispatch, deletedNotes, autoDeletePeriod);
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (trashEnabled === false) return <TrashDisabled />;

  return (
    <section className="flex flex-col justify-center items-center h-full">
      {deletedNotes.length > 0 ? <Trash notes={deletedNotes} /> : <EmptyTrash days={days} />}
    </section>
  );
};

const Trash = ({ notes }: { notes: NoteProps[] }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const restoreAll = () => notes.forEach((note) => dispatch(restoreNote(note.id)));
  const removeAll = () => notes.forEach((note) => dispatch(removeNotePermanently(note.id)));

  return (
    <div className="flex flex-col min-h-full gap-3">
      <div className="flex gap-3 self-end items-center">
        <Button action={restoreAll} text={t("trash_restore_all")} />
        <Button action={removeAll} text={t("trash_delete_all")} />
      </div>
      <div className="pb-3">
        <Notes notes={notes} />
      </div>
    </div>
  );
};

const EmptyTrash = ({ days }: { days: number }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <DeleteIcon sx={{ fontSize: 128 }} />
      <p className="text-lg mt-3">{t("trash_empty_message")}</p>
      <p className="text-sm text-[var(--text-secondary)]">{t("trash_auto_delete_message", { count: days })}</p>
    </div>
  );
};

const TrashDisabled = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center justify-center h-full text-center">
      <p className="text-lg mt-3">{t("trash_disabled_message")}</p>
      <p className="text-lg text-[var(--text-secondary)]">{t("trash_enable_instruction")}</p>
    </section>
  );
};
