import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Notes } from "../components/Notes";

export const NotesPage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);

  const pinnedNotes = notes.filter((note) => note.status === "pinned");
  const activeNotes = notes.filter((note) => note.status === "active");

  return (
    <section>
      {pinnedNotes.length > 0 && <Notes title="Закріплені" notes={pinnedNotes} />}
      <Notes title="Нотатки" notes={activeNotes} />
    </section>
  );
};
