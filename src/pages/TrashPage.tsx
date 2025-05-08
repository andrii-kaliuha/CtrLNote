import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { restoreNote, removeNotePermanently, clearExpiredTrash } from "../store/slices/notesSlice";
import { Notes } from "../components/Notes";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";

export const TrashPage = () => {
  const allNotes = useSelector((state: RootState) => state.notes.notes);
  const deletedNotes = allNotes.filter((note) => note.status === "deleted");
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const restoreAll = () => deletedNotes.forEach((note) => dispatch(restoreNote(note.id)));
  const removeAll = () => deletedNotes.forEach((note) => dispatch(removeNotePermanently(note.id)));

  useEffect(() => {
    dispatch(clearExpiredTrash());

    const interval = setInterval(() => {
      dispatch(clearExpiredTrash());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <section className="flex flex-col items-center w-full h-full">
      {deletedNotes.length > 0 ? (
        <>
          <div className="flex gap-3 h-12 self-end items-center">
            <Button action={restoreAll} text={t("trash_restore_all")} />
            <Button action={removeAll} text={t("trash_delete_all")} />
          </div>
          <Notes notes={deletedNotes} />
        </>
      ) : (
        <EmptyTrash />
      )}
    </section>
  );
};

const EmptyTrash = () => {
  const { t } = useTranslation();
  const autoDeletePeriod = useSelector((state: RootState) => state.settings.autoDeletePeriod);

  const days = autoDeletePeriod / (1000 * 60 * 60 * 24);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <DeleteIcon sx={{ fontSize: 128 }} />
      <p className="text-lg mt-3">{t("trash_empty_message")}</p>
      <p className="text-sm text-[var(--text-secondary)]">{t("trash_auto_delete_message", { count: days })}</p>
    </div>
  );
};
