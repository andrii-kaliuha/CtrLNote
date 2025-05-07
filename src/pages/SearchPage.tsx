import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/slices/notesSlice";
import type { NoteProps, NotesState } from "../types";
import { Note } from "../components/Note";
import { useTranslation } from "react-i18next";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  const filteredNotes =
    query.trim().length > 0
      ? notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()) || note.text.toLowerCase().includes(query.toLowerCase()))
      : [];

  const pinnedNotes = filteredNotes.filter((note) => note.status === "pinned");
  const activeNotes = filteredNotes.filter((note) => note.status === "active");
  const archivedNotes = filteredNotes.filter((note) => note.status === "archived");
  const deletedNotes = filteredNotes.filter((note) => note.status === "deleted");

  const renderNoteGroup = (notes: NoteProps[], title: string) => {
    if (notes.length > 0) {
      return (
        <>
          <h2 className="text-lg p-3">{title}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <Note key={note.id} {...note} />
            ))}
          </ul>
        </>
      );
    }
  };

  return (
    <>
      <input
        name="search-note"
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder={t("search_placeholder")}
        className="p-3 outline-none border border-transparent rounded-md caret-[var(--color-primary)]
                   focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]
                   hover:border-[var(--color-primary)] transition w-full"
      />
      {/* Перевіряємо чи є запит */}
      {query.trim().length > 0 ? (
        // Якщо є запит, перевіряємо, чи щось знайдено
        filteredNotes.length > 0 ? (
          <>
            {/* Рендеримо групи тільки якщо в них є нотатки (renderNoteGroup вже це робить) */}
            {renderNoteGroup(pinnedNotes, t("pinned"))}
            {renderNoteGroup(activeNotes, t("notes"))}
            {renderNoteGroup(archivedNotes, t("archive"))}
            {renderNoteGroup(deletedNotes, t("trash"))}
          </>
        ) : (
          // Якщо є запит, але нічого не знайдено
          <p className="text-[var(--text-secondary)] text-center p-3">{t("search_no_results", { query })}</p>
        )
      ) : (
        // Якщо запиту немає (поле пошуку порожнє)
        <p className="text-[var(--text-secondary)] text-center p-3">{t("search_instruction")}</p>
      )}
    </>
  );
};
