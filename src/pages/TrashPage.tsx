import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useState } from "react";
import { Notes } from "./ArchivePage";
import notes from "../notes.json";

export const TrashPage = () => {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <section className="flex flex-col items-center w-full">
      {isEmpty === false ? (
        <div className="flex gap-3 self-end p-3">
          <Button variant="text" color="primary" onClick={() => setIsEmpty(true)}>
            Відновити
          </Button>
          <Button variant="text" color="primary" onClick={() => setIsEmpty(true)}>
            Видалити все
          </Button>
        </div>
      ) : null}
      {isEmpty ? <EmptyTrash /> : <Trash />}
    </section>
  );
};

const EmptyTrash = () => (
  <div className="flex flex-col items-center justify-center h-3/4">
    <DeleteIcon sx={{ fontSize: 128 }} />
    <p>У кошику немає жодних нотаток чи завдань</p>
    <p>Видалені нотатки автоматично зникнуть через 7 днів</p>
  </div>
);

const Trash = () => (
  <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 px-3 w-full">
    {notes.map((note) => (
      <Notes key={note.id} title={note.title} description={note.description} color={note.color} date={note.date} />
    ))}
  </ul>
);
