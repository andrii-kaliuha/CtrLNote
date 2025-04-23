import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Notes } from "../components/Notes";

export const NotesPage = () => {
  const { notes } = useSelector((state: RootState) => state.notes);

  // Фільтруємо закріплені нотатки
  const pinnedNotes = notes.filter((note) => note.status === "pinned");
  // Фільтруємо всі інші нотатки (які не закріплені)
  const allNotes = notes.filter((note) => note.status !== "pinned" && note.status !== "deleted");

  return (
    <section>
      {pinnedNotes.length > 0 && <Notes title="Закріплені" notes={pinnedNotes} />}
      <Notes title="Нотатки" notes={allNotes} />
    </section>
  );
};
