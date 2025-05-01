import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { restoreNote, removeNotePermanently } from "../store/slices/notesSlice";
import { Notes } from "../components/Notes";
import { t } from "i18next";

export const TrashPage = () => {
  const allNotes = useSelector((state: RootState) => state.notes.notes);
  const deletedNotes = allNotes.filter((note) => note.status === "deleted");

  const dispatch = useDispatch();
  const restoreAll = () => deletedNotes.forEach((note) => dispatch(restoreNote(note.id)));
  const removeAll = () => deletedNotes.forEach((note) => dispatch(removeNotePermanently(note.id)));

  return (
    <section className="flex flex-col items-center w-full h-full">
      {deletedNotes.length > 0 ? (
        <>
          <div className="flex gap-3 h-12 self-end items-center">
            <Button variant="text" sx={{ color: "var(--color-primary)", borderRadius: "8px" }} onClick={restoreAll}>
              {t("trash_restore_all")}
            </Button>
            <Button variant="text" sx={{ color: "var(--color-primary)", borderRadius: "8px" }} onClick={removeAll}>
              {t("trash_delete_all")}
            </Button>
          </div>
          <Notes notes={deletedNotes} />
        </>
      ) : (
        <EmptyTrash />
      )}
    </section>
  );
};

const EmptyTrash = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <DeleteIcon sx={{ fontSize: 128 }} />
    <p className="text-lg mt-3">{t("trash_empty_message")}</p>
    <p className="text-sm text-[var(--text-secondary)]">{t("trash_auto_delete_message")}</p>
  </div>
);
