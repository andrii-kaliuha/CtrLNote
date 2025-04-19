import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Note as NoteType, restoreNote, clearTrash } from "../store/slices/notesSlice";
import { Note } from "../components/Note";
import { selectDeletedNotes } from "../store/notesSelectors";

export const TrashPage = () => {
  const deletedNotes = useSelector(selectDeletedNotes);
  const dispatch = useDispatch();
  const restoreAll = () => deletedNotes.forEach((note) => dispatch(restoreNote(note.id)));
  const deleteAll = () => dispatch(clearTrash());

  return (
    <section className="flex flex-col items-center w-full h-full">
      <section className="flex flex-col items-center w-full h-full">
        {deletedNotes.length > 0 ? (
          <>
            <div className="flex gap-3 h-12 self-end items-center">
              <Button variant="text" sx={{ color: "var(--color-primary)" }} onClick={restoreAll}>
                Відновити все
              </Button>
              <Button variant="text" sx={{ color: "var(--color-primary)" }} onClick={deleteAll}>
                Видалити все
              </Button>
            </div>
            <Trash notes={deletedNotes} />
          </>
        ) : (
          <EmptyTrash />
        )}
      </section>
    </section>
  );
};

const EmptyTrash = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <DeleteIcon sx={{ fontSize: 128 }} />
    <p>У кошику немає жодних нотаток</p>
    <p>Видалені нотатки автоматично зникнуть через 7 днів</p>
  </div>
);

type TrashProps = { notes: NoteType[] };

const Trash: React.FC<TrashProps> = ({ notes }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    {notes.map((note) => (
      <Note key={note.id} {...note} isTrash={true} />
    ))}
  </ul>
);
