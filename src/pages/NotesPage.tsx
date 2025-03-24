import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Notes } from "../components/Notes";

export const NotesPage = () => {
  const { pinnedNotes, notes: allNotes } = useSelector((state: RootState) => state.notes);

  return (
    <section className="flex flex-col w-full">
      {pinnedNotes.length > 0 && <Notes title="Закріплені" notes={pinnedNotes} />}
      <Notes title="Нотатки" notes={allNotes} />
    </section>
  );
};
