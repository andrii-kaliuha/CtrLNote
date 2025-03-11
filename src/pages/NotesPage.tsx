import notes from "../notes.json";
import { Notes } from "./ArchivePage";
import { NoteEditor } from "../NoteEditor";

export const NotesPage = () => {
  return (
    <section className="flex flex-col w-full">
      <NoteEditor />
      <PinnedNotes />
      <NotesList />
    </section>
  );
};

const PinnedNotes = () => {
  return (
    <div>
      <h2 className="p-3 pl-7">Закріплене</h2>
      <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 px-3 w-full">
        {notes.map((note) => (
          <Notes key={note.id} title={note.title} description={note.description} color={note.color} date={note.date} />
        ))}
      </ul>
    </div>
  );
};

const NotesList = () => {
  return (
    <div>
      <h2 className="p-3 pl-7">Нотатки</h2>
      <ul className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 px-3 w-full">
        {notes.map((note) => (
          <Notes key={note.id} title={note.title} description={note.description} color={note.color} date={note.date} />
        ))}
      </ul>
    </div>
  );
};
