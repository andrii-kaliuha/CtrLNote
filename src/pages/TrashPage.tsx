import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Note as NoteType, restoreNote, removeNotePermanently } from "../store/slices/notesSlice";
import { Note } from "../components/Note";
import { RootState } from "../store/store";

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
            <Button variant="text" sx={{ color: "var(--color-primary)" }} onClick={restoreAll}>
              Відновити все
            </Button>
            <Button variant="text" sx={{ color: "var(--color-primary)" }} onClick={removeAll}>
              Видалити все
            </Button>
          </div>
          <Trash notes={deletedNotes} />
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
    <p className="text-lg mt-4">У кошику немає жодних нотаток</p>
    <p className="text-sm text-[var(--text-secondary)]">Видалені нотатки автоматично зникнуть через 7 днів</p>
  </div>
);

type TrashProps = { notes: NoteType[] };

const Trash: React.FC<TrashProps> = ({ notes }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {notes.map((note) => (
      <Note key={note.id} {...note} isTrash={true} />
    ))}
  </ul>
);
