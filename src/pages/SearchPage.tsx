import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesState, setSearchQuery } from "../store/slices/notesSlice";
import { Note as NoteComponent } from "../components/Note";
import type { Note as NoteType } from "../store/slices/notesSlice";

export const SearchPage = () => {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state: { notes: NotesState }) => state.notes.searchQuery);
  const notes = useSelector((state: { notes: NotesState }) => state.notes.notes);

  const [query, setQuery] = useState(() => searchQuery ?? "");

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value));
  };

  const filteredNotes = notes.filter(
    (note) => note.title.toLowerCase().includes(query.toLowerCase()) || note.text.toLowerCase().includes(query.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter((note) => note.status === "pinned");
  const activeNotes = filteredNotes.filter((note) => note.status === "active");
  const archivedNotes = filteredNotes.filter((note) => note.status === "archived");
  const deletedNotes = filteredNotes.filter((note) => note.status === "deleted");

  const renderNoteGroup = (notes: NoteType[], title: string) => {
    if (notes.length === 0) return null;

    return (
      <>
        <h2 className="text-lg p-3">{title}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteComponent key={note.id} {...note} />
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="search-note">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search notes..."
        className="p-3 outline-none border border-transparent rounded-md caret-[var(--color-primary)]
              focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]
              hover:border-[var(--color-primary)] transition"
      />
      {filteredNotes.length > 0 ? (
        <>
          {renderNoteGroup(pinnedNotes, "Закріплені")}
          {renderNoteGroup(activeNotes, "Нотатки")}
          {renderNoteGroup(archivedNotes, "Архівні")}
          {renderNoteGroup(deletedNotes, "Видалені")}
        </>
      ) : (
        <p className="text-[var(--text-secondary)]">Нічого не знайдено</p>
      )}
    </div>
  );
};
