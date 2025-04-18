import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Note as NoteType, restoreNote, clearTrash } from "../store/slices/notesSlice";
import { Note } from "../components/Note";
import { selectDeletedNotes } from "../store/notesSelectors";

export const TrashPage = () => {
  const deletedNotes = useSelector(selectDeletedNotes);
  const dispatch = useDispatch();
  const handleRestoreAll = () => deletedNotes.forEach((note) => dispatch(restoreNote(note.id)));
  const handleDeleteAll = () => dispatch(clearTrash());

  return (
    <section className="flex flex-col items-center w-full h-full">
      {deletedNotes.length > 0 ? (
        <div className="flex gap-3 self-end ">
          <Button sx={{ height: 48 }} variant="text" color="primary" onClick={handleRestoreAll}>
            Відновити все
          </Button>
          <Button variant="text" color="primary" onClick={handleDeleteAll}>
            Видалити все
          </Button>
        </div>
      ) : null}
      {deletedNotes.length === 0 ? <EmptyTrash /> : <Trash notes={deletedNotes} />}
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
      <Note key={note.id} {...note} notes={notes} isTrash={true} />
    ))}
  </ul>
);
